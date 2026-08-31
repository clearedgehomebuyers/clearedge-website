import 'server-only'

import type { ValidatedLeadSubmission } from './schema'
import type { TrafficSource } from './types'

const ZAPIER_TIMEOUT_MS = 8_000

export type DestinationKey =
  | 'seo'
  | 'direct'
  | 'sms'
  | 'facebook'
  | 'unknown_fallback'

const DESTINATIONS: Record<TrafficSource, { key: DestinationKey; envName: string }> = {
  seo: { key: 'seo', envName: 'LEAD_WEBHOOK_SEO_URL' },
  direct: { key: 'direct', envName: 'LEAD_WEBHOOK_DIRECT_URL' },
  sms: { key: 'sms', envName: 'LEAD_WEBHOOK_SMS_URL' },
  facebook: { key: 'facebook', envName: 'LEAD_WEBHOOK_FACEBOOK_URL' },
  unknown: { key: 'unknown_fallback', envName: 'LEAD_WEBHOOK_UNKNOWN_FALLBACK_URL' },
}

export type DeliveryErrorCode =
  | 'destination_not_configured'
  | 'destination_invalid'
  | 'downstream_rejected'
  | 'downstream_timeout'
  | 'downstream_unreachable'

export class LeadDeliveryError extends Error {
  constructor(
    public readonly code: DeliveryErrorCode,
    public readonly destination: DestinationKey,
    public readonly downstreamStatus?: number,
  ) {
    super(code)
    this.name = 'LeadDeliveryError'
  }
}

function destinationFor(source: TrafficSource): {
  key: DestinationKey
  url: string
} {
  const config = DESTINATIONS[source]
  const value = process.env[config.envName]
  if (!value) {
    throw new LeadDeliveryError('destination_not_configured', config.key)
  }

  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') {
      throw new Error('HTTPS required')
    }
    return { key: config.key, url: url.toString() }
  } catch {
    throw new LeadDeliveryError('destination_invalid', config.key)
  }
}

function attributionFields(submission: ValidatedLeadSubmission) {
  const { attribution } = submission
  return {
    trafficSource: attribution.trafficSource,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_content: attribution.utm_content,
    utm_term: attribution.utm_term,
    fbclid: attribution.fbclid,
    landingPage: attribution.landingPage,
    submissionPage: attribution.submissionPage,
  }
}

export function buildZapierPayload(
  submission: ValidatedLeadSubmission,
  leadId: string,
  submittedAt: string,
): Record<string, unknown> {
  const common = {
    leadId,
    formVariant: submission.formVariant,
    submittedAt,
    ...attributionFields(submission),
  }

  if (submission.formVariant === 'contact') {
    const { fields } = submission
    return {
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      phone: fields.phone,
      message: fields.message,
      propertyAddress: '',
      city: '',
      state: '',
      zip: '',
      termsConsent: fields.termsConsent,
      smsConsent: fields.smsConsent,
      leadSource: 'Website - Contact Form',
      ...common,
      notes: `CONTACT PAGE SUBMISSION - General inquiry. Message: ${fields.message || 'No message provided'}`,
    }
  }

  if (submission.formVariant === 'sms_soft') {
    const { fields } = submission
    return {
      firstName: fields.firstName,
      lastName: fields.lastName,
      phone: fields.phone,
      propertyAddress: fields.propertyAddress,
      city: fields.city,
      state: fields.state,
      zip: fields.zip,
      ...attributionFields(submission),
      formType: 'SMS Soft Lead Form',
      leadId,
      formVariant: submission.formVariant,
      submissionPage: submission.attribution.submissionPage,
      submittedAt,
    }
  }

  const { fields } = submission
  const multiStepPayload = {
    firstName: fields.firstName,
    lastName: fields.lastName,
    email: fields.email,
    phone: fields.phone,
    propertyAddress: fields.propertyAddress,
    city: fields.city,
    state: fields.state,
    zip: fields.zip,
    situation: fields.situation,
    timeline: fields.timeline,
    occupancy: fields.occupancy,
    termsConsent: fields.termsConsent,
    smsConsent: fields.smsConsent,
    leadSource: 'Website - ClearEdge Home Buyers',
    ...common,
  }

  if (submission.formVariant === 'multi_step_nj_meta') {
    return {
      ...multiStepPayload,
      sellerPriceExpectation: submission.fields.sellerPriceExpectation,
      priceResponse: submission.fields.priceResponse,
    }
  }

  return multiStepPayload
}

export interface AcceptedDelivery {
  status: 'zapier_accepted'
  destination: DestinationKey
  downstreamStatus: number
  durationMs: number
}

export async function deliverLeadToZapier(
  submission: ValidatedLeadSubmission,
  leadId: string,
): Promise<AcceptedDelivery> {
  const destination = destinationFor(submission.attribution.trafficSource)
  const startedAt = Date.now()
  const payload = buildZapierPayload(submission, leadId, new Date().toISOString())

  let response: Response
  try {
    response = await fetch(destination.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: AbortSignal.timeout(ZAPIER_TIMEOUT_MS),
    })
  } catch (error) {
    const isTimeout =
      error instanceof DOMException &&
      (error.name === 'TimeoutError' || error.name === 'AbortError')
    throw new LeadDeliveryError(
      isTimeout ? 'downstream_timeout' : 'downstream_unreachable',
      destination.key,
    )
  }

  if (!response.ok) {
    // Never read or log the downstream response body; status is sufficient.
    throw new LeadDeliveryError(
      'downstream_rejected',
      destination.key,
      response.status,
    )
  }

  return {
    status: 'zapier_accepted',
    destination: destination.key,
    downstreamStatus: response.status,
    durationMs: Date.now() - startedAt,
  }
}
