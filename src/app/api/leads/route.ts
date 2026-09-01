import { randomUUID } from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'
import { deliverLeadToZapier, LeadDeliveryError } from '@/lib/leads/delivery'
import { logLeadEvent } from '@/lib/leads/logger'
import { leadSubmissionSchema, type ValidatedLeadSubmission } from '@/lib/leads/schema'
import { sendMetaCapiEvent, type MetaServerUserData } from '@/lib/meta-capi-server'
import { isMetaQaAttribution } from '@/lib/meta-qa'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const MAX_BODY_BYTES = 16 * 1024
export const MIN_INTERACTION_MS = 750
const META_LEAD_TIMEOUT_MS = 800

class BodyTooLargeError extends Error {}

function normalizedOrigin(value: string | null | undefined): string | null {
  if (!value) return null
  try {
    return new URL(value).origin
  } catch {
    return null
  }
}

function vercelOrigin(value: string | undefined): string | null {
  if (!value) return null
  return normalizedOrigin(value.includes('://') ? value : `https://${value}`)
}

function localDevelopmentOrigin(value: string | null): string | null {
  const origin = normalizedOrigin(value)
  if (!origin) return null

  const url = new URL(origin)
  const isLoopback =
    url.hostname === 'localhost' ||
    url.hostname === '127.0.0.1' ||
    url.hostname === '[::1]'

  return isLoopback ? origin : null
}

export function allowedOrigins(request: NextRequest): Set<string> {
  const origins = new Set<string>([
    'https://clearedgehomebuyers.com',
    'https://www.clearedgehomebuyers.com',
  ])

  // Local ports vary, so accept only the exact loopback origin for this
  // request. Preview and production hosts must come from exact Vercel values
  // or the fixed ClearEdge domains below; arbitrary Host values are not
  // promoted into the allowlist.
  const localOrigin = localDevelopmentOrigin(request.nextUrl.origin)
  if (localOrigin) origins.add(localOrigin)

  for (const candidate of [
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ]) {
    const origin = vercelOrigin(candidate)
    if (origin) origins.add(origin)
  }

  return origins
}

export function hasAllowedOrigin(request: NextRequest): boolean {
  const origin = normalizedOrigin(request.headers.get('origin'))
  return origin !== null && allowedOrigins(request).has(origin)
}

export async function readBodyWithLimit(request: NextRequest): Promise<string> {
  if (!request.body) return ''

  const reader = request.body.getReader()
  const decoder = new TextDecoder()
  let totalBytes = 0
  let body = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    totalBytes += value.byteLength
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel()
      throw new BodyTooLargeError()
    }
    body += decoder.decode(value, { stream: true })
  }

  return body + decoder.decode()
}

function metaUserData(submission: ValidatedLeadSubmission): MetaServerUserData {
  if (submission.formVariant === 'sms_soft') {
    const { fields } = submission
    return {
      phone: fields.phone,
      firstName: fields.firstName,
      lastName: fields.lastName,
      city: fields.city,
      state: fields.state,
      zip: fields.zip,
    }
  }
  if (submission.formVariant === 'contact') {
    const { fields } = submission
    return {
      email: fields.email,
      phone: fields.phone,
      firstName: fields.firstName,
      lastName: fields.lastName,
    }
  }
  const { fields } = submission
  return {
    email: fields.email,
    phone: fields.phone,
    firstName: fields.firstName,
    lastName: fields.lastName,
    city: fields.city,
    state: fields.state,
    zip: fields.zip,
  }
}

function metaFormName(submission: ValidatedLeadSubmission): string {
  if (submission.formVariant === 'contact') return 'Contact Form'
  if (submission.formVariant === 'sms_soft') return 'SMS Soft Lead Form'
  return 'Multi-Step Lead Form'
}

function failedResponse(error: string, referenceId: string, status: number) {
  return NextResponse.json({ ok: false, error, referenceId }, { status })
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID()

  if (!hasAllowedOrigin(request)) {
    logLeadEvent({ event: 'request_rejected', requestId, errorCode: 'origin_not_allowed' })
    return failedResponse('submission_rejected', requestId, 403)
  }

  const contentType = request.headers.get('content-type')?.toLowerCase() ?? ''
  const mediaType = contentType.split(';', 1)[0].trim()
  if (mediaType !== 'application/json') {
    logLeadEvent({ event: 'request_rejected', requestId, errorCode: 'unsupported_content_type' })
    return failedResponse('invalid_request', requestId, 415)
  }

  const contentLength = Number(request.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    logLeadEvent({ event: 'request_rejected', requestId, errorCode: 'body_too_large' })
    return failedResponse('request_too_large', requestId, 413)
  }

  let rawBody: string
  try {
    rawBody = await readBodyWithLimit(request)
  } catch (error) {
    const code = error instanceof BodyTooLargeError ? 'body_too_large' : 'body_read_failed'
    logLeadEvent({ event: 'request_rejected', requestId, errorCode: code })
    return failedResponse(code === 'body_too_large' ? 'request_too_large' : 'invalid_request', requestId, code === 'body_too_large' ? 413 : 400)
  }

  let parsedJson: unknown
  try {
    parsedJson = JSON.parse(rawBody)
  } catch {
    logLeadEvent({ event: 'request_rejected', requestId, errorCode: 'invalid_json' })
    return failedResponse('invalid_request', requestId, 400)
  }

  const parsed = leadSubmissionSchema.safeParse(parsedJson)
  if (!parsed.success) {
    logLeadEvent({ event: 'request_rejected', requestId, errorCode: 'validation_failed' })
    return failedResponse('invalid_submission', requestId, 422)
  }

  const submission = parsed.data
  const elapsedMs = Date.now() - submission.formStartedAt
  if (elapsedMs < MIN_INTERACTION_MS || elapsedMs < 0) {
    logLeadEvent({
      event: 'request_rejected',
      requestId,
      formVariant: submission.formVariant,
      trafficSource: submission.attribution.trafficSource,
      errorCode: 'interaction_too_fast',
    })
    return failedResponse('submission_rejected', requestId, 400)
  }

  const leadId = randomUUID()
  logLeadEvent({
    event: 'delivery_started',
    requestId,
    leadId,
    formVariant: submission.formVariant,
    trafficSource: submission.attribution.trafficSource,
  })

  let delivery
  try {
    delivery = await deliverLeadToZapier(submission, leadId)
  } catch (error) {
    if (error instanceof LeadDeliveryError) {
      logLeadEvent({
        event: 'delivery_failed',
        requestId,
        leadId,
        formVariant: submission.formVariant,
        trafficSource: submission.attribution.trafficSource,
        destination: error.destination,
        downstreamStatus: error.downstreamStatus,
        errorCode: error.code,
      })
      const configurationFailure =
        error.code === 'destination_not_configured' || error.code === 'destination_invalid'
      const status = configurationFailure ? 503 : error.code === 'downstream_timeout' ? 504 : 502
      return failedResponse(configurationFailure ? 'service_unavailable' : 'delivery_failed', requestId, status)
    }

    logLeadEvent({
      event: 'delivery_failed',
      requestId,
      leadId,
      formVariant: submission.formVariant,
      trafficSource: submission.attribution.trafficSource,
      errorCode: 'internal_error',
    })
    return failedResponse('service_unavailable', requestId, 503)
  }

  logLeadEvent({
    event: 'delivery_accepted',
    requestId,
    leadId,
    formVariant: submission.formVariant,
    trafficSource: submission.attribution.trafficSource,
    destination: delivery.destination,
    downstreamStatus: delivery.downstreamStatus,
    durationMs: delivery.durationMs,
  })

  // Zapier acceptance governs the lead response. Meta is attempted only after
  // that acceptance and is bounded so it cannot materially delay confirmation.
  const metaEventId = randomUUID()
  let metaStatus = 'failed'
  try {
    const metaResult = await sendMetaCapiEvent(
      request,
      {
        eventName: 'Lead',
        eventId: metaEventId,
        eventSourceUrl: submission.attribution.submissionPage,
        customData: {
          content_name: metaFormName(submission),
          lead_id: leadId,
        },
        userData: metaUserData(submission),
        qaTraffic: isMetaQaAttribution(submission.attribution),
      },
      META_LEAD_TIMEOUT_MS,
    )
    metaStatus = metaResult.ok ? 'accepted' : metaResult.skipped ?? metaResult.error ?? 'failed'
  } catch {
    metaStatus = 'internal_error'
  }

  logLeadEvent({
    event: 'meta_completed',
    requestId,
    leadId,
    formVariant: submission.formVariant,
    trafficSource: submission.attribution.trafficSource,
    metaStatus,
  })

  return NextResponse.json(
    {
      ok: true,
      delivery: 'zapier_accepted',
      leadId,
      metaEventId,
    },
    { status: 201 },
  )
}
