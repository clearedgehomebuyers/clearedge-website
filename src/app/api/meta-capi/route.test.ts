import { NextRequest } from 'next/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from './route'

function metaRequest(eventName: string) {
  return new NextRequest('https://www.clearedgehomebuyers.com/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: eventName,
      event_id: '11111111-1111-4111-8111-111111111111',
      event_source_url: 'https://www.clearedgehomebuyers.com/',
      custom_data: { test: true },
    }),
  })
}

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_META_PIXEL_ID', 'test-pixel-id')
  vi.stubEnv('META_CAPI_ACCESS_TOKEN', 'test-capi-token')
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('POST /api/meta-capi', () => {
  it.each(['PageView', 'FormStart', 'CTAClick'])('continues forwarding %s', async (eventName) => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ events_received: 1 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }))
    vi.stubGlobal('fetch', fetchMock)

    const response = await POST(metaRequest(eventName))

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({ ok: true, events_received: 1 })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('rejects unauthenticated Lead injection without calling Meta', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await POST(metaRequest('Lead'))

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ ok: false, error: 'unsupported-event' })
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
