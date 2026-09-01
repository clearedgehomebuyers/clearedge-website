import { NextRequest } from 'next/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { hasAllowedOrigin, MAX_BODY_BYTES, POST } from './route'

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function validSubmission(overrides: Record<string, unknown> = {}) {
  return {
    formVariant: 'multi_step_default',
    formStartedAt: Date.now() - 2_000,
    companyWebsite: '',
    attribution: {
      trafficSource: 'seo',
      landingPage: 'https://www.clearedgehomebuyers.com/?utm_source=test',
      submissionPage: 'https://www.clearedgehomebuyers.com/',
      utm_source: 'test',
      utm_medium: 'test-medium',
      utm_campaign: 'test-campaign',
      utm_content: 'test-content',
      utm_term: 'test-term',
      fbclid: 'test-click-id',
    },
    fields: {
      firstName: 'SensitiveFirstName',
      lastName: 'SensitiveLastName',
      email: 'sensitive@example.com',
      phone: '+1 (570) 555-1234',
      propertyAddress: '123 Sensitive Street',
      city: 'Scranton',
      state: 'PA',
      zip: '18503',
      situation: 'Inherited Property',
      timeline: 'ASAP (within 30 days)',
      occupancy: 'I live here',
      termsConsent: false,
      smsConsent: false,
    },
    ...overrides,
  }
}

function leadRequest(
  body: string | object,
  options: {
    url?: string
    origin?: string
    contentType?: string
    contentLength?: string
  } = {},
) {
  const url = options.url ?? 'https://www.clearedgehomebuyers.com/api/leads'
  const headers = new Headers({
    Origin: options.origin ?? new URL(url).origin,
    'Content-Type': options.contentType ?? 'application/json',
  })
  if (options.contentLength) headers.set('Content-Length', options.contentLength)

  return new NextRequest(url, {
    method: 'POST',
    headers,
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}

beforeEach(() => {
  vi.stubEnv('LEAD_WEBHOOK_SEO_URL', 'https://seo.invalid/catch')
  vi.stubEnv('LEAD_WEBHOOK_DIRECT_URL', 'https://direct.invalid/catch')
  vi.stubEnv('LEAD_WEBHOOK_SMS_URL', 'https://sms.invalid/catch')
  vi.stubEnv('LEAD_WEBHOOK_FACEBOOK_URL', 'https://facebook.invalid/catch')
  vi.stubEnv('LEAD_WEBHOOK_UNKNOWN_FALLBACK_URL', 'https://unknown.invalid/catch')
  vi.stubEnv('NEXT_PUBLIC_META_PIXEL_ID', 'test-pixel-id')
  vi.stubEnv('META_CAPI_ACCESS_TOKEN', 'test-capi-token')
  vi.spyOn(console, 'info').mockImplementation(() => {})
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('lead API origin checks', () => {
  it('allows local, Vercel preview, and production same-origin requests', () => {
    expect(hasAllowedOrigin(leadRequest({}, {
      url: 'http://localhost:3000/api/leads',
      origin: 'http://localhost:3000',
    }))).toBe(true)

    vi.stubEnv('VERCEL_URL', 'clearedge-preview-abc.vercel.app')
    expect(hasAllowedOrigin(leadRequest({}, {
      url: 'https://clearedge-preview-abc.vercel.app/api/leads',
      origin: 'https://clearedge-preview-abc.vercel.app',
    }))).toBe(true)

    expect(hasAllowedOrigin(leadRequest({}, {
      origin: 'https://clearedgehomebuyers.com',
    }))).toBe(true)
    expect(hasAllowedOrigin(leadRequest({}, {
      origin: 'https://www.clearedgehomebuyers.com',
    }))).toBe(true)
  })

  it('rejects a different origin without wildcard matching', () => {
    expect(hasAllowedOrigin(leadRequest({}, {
      origin: 'https://clearedgehomebuyers.com.attacker.example',
    }))).toBe(false)

    expect(hasAllowedOrigin(leadRequest({}, {
      url: 'https://attacker-controlled-host.example/api/leads',
      origin: 'https://attacker-controlled-host.example',
    }))).toBe(false)
  })
})

describe('POST /api/leads', () => {
  it('returns confirmed 201, then attempts bounded Meta delivery', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(null, { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ events_received: 1 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }))
    vi.stubGlobal('fetch', fetchMock)

    const response = await POST(leadRequest(validSubmission()))
    const body = await response.json()

    expect(response.status).toBe(201)
    expect(body).toMatchObject({ ok: true, delivery: 'zapier_accepted' })
    expect(body.leadId).toMatch(UUID_PATTERN)
    expect(body.metaEventId).toMatch(UUID_PATTERN)
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock.mock.calls[0][0]).toBe('https://seo.invalid/catch')
    expect(String(fetchMock.mock.calls[1][0])).toContain('graph.facebook.com')
    expect(fetchMock.mock.calls[1][1]?.signal).toBeInstanceOf(AbortSignal)

    const logs = vi.mocked(console.info).mock.calls.flat().join(' ')
    for (const forbidden of [
      'SensitiveFirstName',
      'SensitiveLastName',
      'sensitive@example.com',
      '570',
      '123 Sensitive Street',
      'https://seo.invalid/catch',
      'test-capi-token',
    ]) {
      expect(logs).not.toContain(forbidden)
    }
  })

  it('keeps an accepted lead successful when Meta times out', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(null, { status: 200 }))
      .mockRejectedValueOnce(new DOMException('timed out', 'TimeoutError'))
    vi.stubGlobal('fetch', fetchMock)

    const response = await POST(leadRequest(validSubmission()))
    expect(response.status).toBe(201)
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      delivery: 'zapier_accepted',
    })
  })

  it('delivers tagged QA leads to Zapier without sending a Meta conversion', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    const submission = validSubmission()
    submission.attribution.utm_source = 'deploy-check'
    submission.attribution.submissionPage =
      'https://www.clearedgehomebuyers.com/cashoffernj?fbclid=test-click-id&utm_source=deploy-check'

    const response = await POST(leadRequest(submission))

    expect(response.status).toBe(201)
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      delivery: 'zapier_accepted',
    })
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toBe('https://seo.invalid/catch')
  })

  it('does not call Meta or return success when Zapier rejects the request', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('DOWNSTREAM_SECRET_BODY', { status: 500 }))
    vi.stubGlobal('fetch', fetchMock)

    const response = await POST(leadRequest(validSubmission()))
    const body = await response.json()

    expect(response.status).toBe(502)
    expect(body).toMatchObject({ ok: false, error: 'delivery_failed' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const logs = vi.mocked(console.info).mock.calls.flat().join(' ')
    expect(logs).not.toContain('DOWNSTREAM_SECRET_BODY')
    expect(logs).not.toContain('SensitiveFirstName')
    expect(logs).not.toContain('https://seo.invalid/catch')
  })

  it('enforces the actual streamed body size despite a dishonest header', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const oversizedBody = `{"padding":"${'x'.repeat(MAX_BODY_BYTES)}"}`

    const response = await POST(leadRequest(oversizedBody, { contentLength: '1' }))

    expect(response.status).toBe(413)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects wrong origins and content types before downstream delivery', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const badOrigin = await POST(leadRequest(validSubmission(), {
      origin: 'https://attacker.example',
    }))
    expect(badOrigin.status).toBe(403)

    const badType = await POST(leadRequest(validSubmission(), {
      contentType: 'text/plain',
    }))
    expect(badType.status).toBe(415)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects strict-schema, honeypot, and minimum-time violations', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const extraField = await POST(leadRequest(validSubmission({ unexpected: true })))
    expect(extraField.status).toBe(422)

    const honeypot = await POST(leadRequest(validSubmission({ companyWebsite: 'bot.example' })))
    expect(honeypot.status).toBe(422)

    const tooFast = await POST(leadRequest(validSubmission({ formStartedAt: Date.now() })))
    expect(tooFast.status).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
