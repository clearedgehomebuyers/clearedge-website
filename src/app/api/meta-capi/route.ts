import { NextResponse, type NextRequest } from 'next/server'
import {
  sendMetaCapiEvent,
  type MetaServerEventName,
  type MetaServerUserData,
} from '@/lib/meta-capi-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Lead is deliberately absent. A Lead can only be emitted by /api/leads after
 * Zapier acceptance; this public browser-event relay cannot mint conversions.
 */
const ALLOWED_BROWSER_EVENTS = new Set<MetaServerEventName>([
  'PageView',
  'FormStart',
  'CTAClick',
])

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 })
  }

  const eventName = body.event_name
  const eventId = body.event_id
  if (typeof eventName !== 'string' || !ALLOWED_BROWSER_EVENTS.has(eventName as MetaServerEventName)) {
    return NextResponse.json({ ok: false, error: 'unsupported-event' }, { status: 400 })
  }
  if (typeof eventId !== 'string' || !eventId) {
    return NextResponse.json({ ok: false, error: 'missing-event-id' }, { status: 400 })
  }

  const result = await sendMetaCapiEvent(request, {
    eventName: eventName as MetaServerEventName,
    eventId,
    eventSourceUrl: typeof body.event_source_url === 'string' ? body.event_source_url : undefined,
    customData:
      body.custom_data && typeof body.custom_data === 'object'
        ? body.custom_data as Record<string, unknown>
        : undefined,
    userData:
      body.user_data && typeof body.user_data === 'object'
        ? body.user_data as MetaServerUserData
        : undefined,
    fbc: typeof body.fbc === 'string' ? body.fbc : undefined,
    fbp: typeof body.fbp === 'string' ? body.fbp : undefined,
  })

  if (!result.ok && result.error) {
    console.error('[meta-capi] delivery failed', eventName, result.error, result.downstreamStatus ?? '')
  }

  if (result.ok) {
    return NextResponse.json({
      ok: true,
      events_received: result.eventsReceived,
      ...(result.testMode ? { test_mode: true } : {}),
    })
  }

  if (result.skipped) {
    return NextResponse.json({ ok: false, skipped: result.skipped })
  }

  return NextResponse.json({
    ok: false,
    ...(result.error === 'upstream-unreachable' || result.error === 'upstream-timeout'
      ? { error: 'upstream-unreachable' }
      : {}),
  })
}
