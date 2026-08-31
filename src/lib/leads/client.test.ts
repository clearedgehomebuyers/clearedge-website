import { afterEach, describe, expect, it, vi } from 'vitest'
import { LeadSubmissionError, submitLead } from './client'
import type { LeadSubmission } from './types'

const submission: LeadSubmission = {
  formVariant: 'contact',
  formStartedAt: Date.now() - 2_000,
  companyWebsite: '',
  attribution: {
    trafficSource: 'unknown',
    landingPage: 'https://www.clearedgehomebuyers.com/',
    submissionPage: 'https://www.clearedgehomebuyers.com/contact',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    fbclid: '',
  },
  fields: {
    firstName: 'Taylor',
    lastName: 'Seller',
    email: 'taylor@example.com',
    phone: '+15705551234',
    message: '',
    termsConsent: false,
    smsConsent: false,
  },
}

afterEach(() => {
  vi.unstubAllGlobals()
})
describe('submitLead', () => {
  it('accepts only a confirmed 201 response', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      ok: true,
      delivery: 'zapier_accepted',
      leadId: '11111111-1111-4111-8111-111111111111',
      metaEventId: '22222222-2222-4222-8222-222222222222',
    }), { status: 201, headers: { 'Content-Type': 'application/json' } }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(submitLead(submission)).resolves.toMatchObject({
      delivery: 'zapier_accepted',
    })
    expect(fetchMock).toHaveBeenCalledWith('/api/leads', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }))
    expect(fetchMock.mock.calls[0][1]).not.toHaveProperty('mode', 'no-cors')
  })

  it('preserves the server reference on downstream failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      ok: false,
      error: 'delivery_failed',
      referenceId: '33333333-3333-4333-8333-333333333333',
    }), { status: 502, headers: { 'Content-Type': 'application/json' } })))

    await expect(submitLead(submission)).rejects.toMatchObject({
      code: 'delivery_failed',
      referenceId: '33333333-3333-4333-8333-333333333333',
    } satisfies Partial<LeadSubmissionError>)
  })

  it('rejects a success-shaped body unless the status is exactly 201', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      ok: true,
      delivery: 'zapier_accepted',
      leadId: '11111111-1111-4111-8111-111111111111',
      metaEventId: '22222222-2222-4222-8222-222222222222',
    }), { status: 200, headers: { 'Content-Type': 'application/json' } })))

    await expect(submitLead(submission)).rejects.toMatchObject({ code: 'delivery_failed' })
  })

  it('turns a network rejection into a safe client error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('sensitive transport detail')))

    await expect(submitLead(submission)).rejects.toMatchObject({ code: 'network_error' })
  })
})
