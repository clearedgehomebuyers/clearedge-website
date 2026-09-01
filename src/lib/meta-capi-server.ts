import 'server-only'

import { createHash } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { isMetaQaUrl } from '@/lib/meta-qa'

const GRAPH_VERSION = 'v21.0'
const DEFAULT_TIMEOUT_MS = 3_000

export type MetaServerEventName = 'PageView' | 'Lead' | 'FormStart' | 'CTAClick'

export interface MetaServerUserData {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  city?: string
  state?: string
  zip?: string
}
export interface MetaServerEvent {
  eventName: MetaServerEventName
  eventId: string
  eventSourceUrl?: string
  customData?: Record<string, unknown>
  userData?: MetaServerUserData
  fbc?: string
  fbp?: string
  qaTraffic?: boolean
}

export type MetaSendResult =
  | { ok: true; eventsReceived?: number; testMode?: true }
  | {
      ok: false
      skipped?: 'not-configured' | 'qa-traffic'
      error?: 'upstream-rejected' | 'upstream-timeout' | 'upstream-unreachable'
      downstreamStatus?: number
    }

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

function hashNormalized(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const normalized = value.trim().toLowerCase()
  return normalized ? sha256(normalized) : undefined
}

function hashPhone(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  let digits = value.replace(/\D/g, '')
  if (!digits) return undefined
  if (digits.length === 10) digits = `1${digits}`
  return sha256(digits)
}

function hashName(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const normalized = value.trim().toLowerCase().replace(/[^a-zà-ü]/g, '')
  return normalized ? sha256(normalized) : undefined
}

function fbcFromUrl(eventSourceUrl?: string): string | undefined {
  if (!eventSourceUrl) return undefined
  try {
    const fbclid = new URL(eventSourceUrl).searchParams.get('fbclid')
    return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined
  } catch {
    return undefined
  }
}

function clientIp(request: NextRequest): string | undefined {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || undefined
}

function compact<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined && value !== ''))
}

export async function sendMetaCapiEvent(
  request: NextRequest,
  event: MetaServerEvent,
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<MetaSendResult> {
  if (event.qaTraffic || isMetaQaUrl(event.eventSourceUrl)) {
    return { ok: false, skipped: 'qa-traffic' }
  }

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN
  const testEventCode = process.env.META_TEST_EVENT_CODE

  if (!pixelId || !accessToken) {
    return { ok: false, skipped: 'not-configured' }
  }

  const userData = event.userData ?? {}
  const fbc =
    event.fbc ||
    request.cookies.get('_fbc')?.value ||
    fbcFromUrl(event.eventSourceUrl)
  const fbp = event.fbp || request.cookies.get('_fbp')?.value

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: 'website',
        event_source_url: event.eventSourceUrl,
        user_data: compact({
          em: hashNormalized(userData.email),
          ph: hashPhone(userData.phone),
          fn: hashName(userData.firstName),
          ln: hashName(userData.lastName),
          ct: hashName(userData.city),
          st: hashNormalized(userData.state),
          zp: hashNormalized(userData.zip),
          client_ip_address: clientIp(request),
          client_user_agent: request.headers.get('user-agent') || undefined,
          fbc,
          fbp,
        }),
        custom_data: event.customData,
      },
    ],
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
  }

  let response: Response
  try {
    response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-store',
        signal: AbortSignal.timeout(timeoutMs),
      },
    )
  } catch (error) {
    const isTimeout =
      error instanceof DOMException &&
      (error.name === 'TimeoutError' || error.name === 'AbortError')
    return { ok: false, error: isTimeout ? 'upstream-timeout' : 'upstream-unreachable' }
  }

  if (!response.ok) {
    // Do not read, return, or log Meta's response body.
    return {
      ok: false,
      error: 'upstream-rejected',
      downstreamStatus: response.status,
    }
  }

  const result = (await response.json().catch(() => ({}))) as { events_received?: number }
  return {
    ok: true,
    eventsReceived: result.events_received,
    ...(testEventCode ? { testMode: true as const } : {}),
  }
}
