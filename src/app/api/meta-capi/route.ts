import { createHash } from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Meta Conversions API relay.
 *
 * The browser posts a user action here; this route hashes the identifiers and
 * forwards the event to Meta server-to-server. The browser pixel sends the
 * same action with the same `event_id`, and Meta dedups on
 * (event_name, event_id) — see src/lib/meta-pixel.ts for the contract.
 *
 * META_CAPI_ACCESS_TOKEN is read here and only here. It is deliberately not
 * NEXT_PUBLIC_-prefixed, so Next will not inline it into any client bundle;
 * this module is server-only (a route handler) and never imported by a
 * component.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const GRAPH_VERSION = 'v21.0'
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN
/** Present only while verifying in Events Manager. Removing the env var from
 *  Vercel is all it takes to switch this route to live mode. */
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE

/** This endpoint is public, so only events we actually emit are accepted —
 *  an open relay would let anyone inject arbitrary events into the pixel. */
const ALLOWED_EVENTS = new Set(['PageView', 'Lead', 'FormStart', 'CTAClick'])

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

/** Meta wants lowercase + trimmed before hashing. */
function hashNormalized(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const normalized = value.trim().toLowerCase()
  return normalized ? sha256(normalized) : undefined
}

/** Meta wants digits only, including country code, before hashing. */
function hashPhone(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  let digits = value.replace(/\D/g, '')
  if (!digits) return undefined
  if (digits.length === 10) digits = `1${digits}` // US numbers arrive unprefixed
  return sha256(digits)
}

/** Names/cities: strip punctuation and whitespace per Meta's normalization. */
function hashName(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const normalized = value.trim().toLowerCase().replace(/[^a-zà-ü]/g, '')
  return normalized ? sha256(normalized) : undefined
}

function clientIp(request: NextRequest): string | undefined {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || undefined
}

/** Drop undefined keys — Meta rejects null/empty values in user_data. */
function compact<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== ''))
}

export async function POST(request: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    // Preview/local deploys have no token: accept and drop rather than 500,
    // so a missing env var can never break a form submission.
    return NextResponse.json({ ok: false, skipped: 'not-configured' })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 })
  }

  const eventName = body.event_name
  const eventId = body.event_id
  if (typeof eventName !== 'string' || !ALLOWED_EVENTS.has(eventName)) {
    return NextResponse.json({ ok: false, error: 'unsupported-event' }, { status: 400 })
  }
  if (typeof eventId !== 'string' || !eventId) {
    // No event id means Meta cannot dedup this against the browser event.
    return NextResponse.json({ ok: false, error: 'missing-event-id' }, { status: 400 })
  }

  const userData = (body.user_data ?? {}) as Record<string, unknown>
  const fbc = (body.fbc as string) || request.cookies.get('_fbc')?.value
  const fbp = (body.fbp as string) || request.cookies.get('_fbp')?.value

  const event = {
    event_name: eventName,
    // Stamped server-side on purpose: client clocks drift, and Meta rejects
    // events whose event_time is too far from real time.
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: 'website',
    event_source_url: typeof body.event_source_url === 'string' ? body.event_source_url : undefined,
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
    custom_data: body.custom_data && typeof body.custom_data === 'object' ? body.custom_data : undefined,
  }

  const payload = {
    data: [event],
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    )

    const result = (await response.json().catch(() => ({}))) as {
      events_received?: number
      error?: { message?: string }
    }

    if (!response.ok) {
      console.error('[meta-capi] rejected', eventName, response.status, result.error?.message)
      return NextResponse.json({
        ok: false,
        ...(TEST_EVENT_CODE ? { debug: result.error?.message } : {}),
      })
    }

    return NextResponse.json({
      ok: true,
      events_received: result.events_received,
      ...(TEST_EVENT_CODE ? { test_mode: true } : {}),
    })
  } catch (error) {
    console.error('[meta-capi] request failed', eventName, error)
    return NextResponse.json({ ok: false, error: 'upstream-unreachable' })
  }
}
