import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  buildZapierPayload,
  deliverLeadToZapier,
  LeadDeliveryError,
} from './delivery'
import { leadSubmissionSchema, type ValidatedLeadSubmission } from './schema'

const destinationUrls = {
  seo: 'https://seo.invalid/catch',
  direct: 'https://direct.invalid/catch',
  sms: 'https://sms.invalid/catch',
  facebook: 'https://facebook.invalid/catch',
  unknown: 'https://unknown.invalid/catch',
}

function expectLegacyFields(
  actual: Record<string, unknown>,
  legacy: Record<string, unknown>,
  additiveKeys: string[],
) {
  expect(actual).toMatchObject(legacy)
  expect(Object.keys(actual).sort()).toEqual(
    [...Object.keys(legacy), ...additiveKeys].sort(),
  )

  for (const [key, value] of Object.entries(legacy)) {
    expect(actual[key]).toEqual(value)
    expect(typeof actual[key]).toBe(typeof value)
  }
}

function submission(
  trafficSource: 'unknown' | 'seo' | 'direct' | 'sms' | 'facebook' = 'seo',
): ValidatedLeadSubmission {
  return leadSubmissionSchema.parse({
    formVariant: 'multi_step_default',
    formStartedAt: Date.now() - 2_000,
    companyWebsite: '',
    attribution: {
      trafficSource,
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
      firstName: 'Taylor',
      lastName: 'Seller',
      email: 'taylor@example.com',
      phone: '+1 (570) 555-1234',
      propertyAddress: '123 Main Street',
      city: 'Scranton',
      state: 'PA',
      zip: '18503',
      situation: 'Inherited Property',
      timeline: 'ASAP (within 30 days)',
      occupancy: 'I live here',
      termsConsent: false,
      smsConsent: false,
    },
  })
}

beforeEach(() => {
  vi.stubEnv('LEAD_WEBHOOK_SEO_URL', destinationUrls.seo)
  vi.stubEnv('LEAD_WEBHOOK_DIRECT_URL', destinationUrls.direct)
  vi.stubEnv('LEAD_WEBHOOK_SMS_URL', destinationUrls.sms)
  vi.stubEnv('LEAD_WEBHOOK_FACEBOOK_URL', destinationUrls.facebook)
  vi.stubEnv('LEAD_WEBHOOK_UNKNOWN_FALLBACK_URL', destinationUrls.unknown)
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('deliverLeadToZapier', () => {
  it.each([200, 201, 204])('accepts expected Zapier %s responses', async (status) => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(deliverLeadToZapier(submission(), 'test-lead-id')).resolves.toMatchObject({
      status: 'zapier_accepted',
      downstreamStatus: status,
    })
  })

  it.each([
    ['seo', destinationUrls.seo],
    ['direct', destinationUrls.direct],
    ['sms', destinationUrls.sms],
    ['facebook', destinationUrls.facebook],
    ['unknown', destinationUrls.unknown],
  ] as const)('routes %s without relabeling the source', async (source, expectedUrl) => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    const result = await deliverLeadToZapier(submission(source), 'test-lead-id')

    expect(result.status).toBe('zapier_accepted')
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toBe(expectedUrl)
    const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body))
    expect(body.trafficSource).toBe(source)
    expect(body.leadId).toBe('test-lead-id')
  })

  it('preserves every legacy field and type for all form variants', () => {
    const base = submission()
    const submittedAt = '2026-08-31T00:00:00.000Z'
    const legacyAttribution = {
      trafficSource: base.attribution.trafficSource,
      utm_source: base.attribution.utm_source,
      utm_medium: base.attribution.utm_medium,
      utm_campaign: base.attribution.utm_campaign,
      utm_content: base.attribution.utm_content,
      utm_term: base.attribution.utm_term,
      fbclid: base.attribution.fbclid,
      landingPage: base.attribution.landingPage,
    }
    const legacyMultiStep = {
      ...base.fields,
      leadSource: 'Website - ClearEdge Home Buyers',
      ...legacyAttribution,
    }

    expectLegacyFields(
      buildZapierPayload(base, 'lead-default', submittedAt),
      legacyMultiStep,
      ['leadId', 'formVariant', 'submittedAt', 'submissionPage'],
    )

    const nj = leadSubmissionSchema.parse({
      ...base,
      formVariant: 'multi_step_nj_meta',
      fields: {
        ...base.fields,
        state: 'NJ',
        sellerPriceExpectation: 275000,
        priceResponse: 'Amount provided',
      },
    })
    expectLegacyFields(
      buildZapierPayload(nj, 'lead-nj', submittedAt),
      {
        ...legacyMultiStep,
        state: 'NJ',
        sellerPriceExpectation: 275000,
        priceResponse: 'Amount provided',
      },
      ['leadId', 'formVariant', 'submittedAt', 'submissionPage'],
    )

    const contact = leadSubmissionSchema.parse({
      formVariant: 'contact',
      formStartedAt: Date.now() - 2_000,
      companyWebsite: '',
      attribution: base.attribution,
      fields: {
        firstName: 'Taylor',
        lastName: 'Seller',
        email: 'taylor@example.com',
        phone: '+15705551234',
        message: 'Call after 5.',
        termsConsent: false,
        smsConsent: false,
      },
    })
    if (contact.formVariant !== 'contact') throw new Error('unexpected contact variant')
    expectLegacyFields(
      buildZapierPayload(contact, 'lead-contact', submittedAt),
      {
        firstName: contact.fields.firstName,
        lastName: contact.fields.lastName,
        email: contact.fields.email,
        phone: contact.fields.phone,
        message: contact.fields.message,
        propertyAddress: '',
        city: '',
        state: '',
        zip: '',
        termsConsent: contact.fields.termsConsent,
        smsConsent: contact.fields.smsConsent,
        leadSource: 'Website - Contact Form',
        ...legacyAttribution,
        notes: 'CONTACT PAGE SUBMISSION - General inquiry. Message: Call after 5.',
      },
      ['leadId', 'formVariant', 'submittedAt', 'submissionPage'],
    )

    const sms = leadSubmissionSchema.parse({
      formVariant: 'sms_soft',
      formStartedAt: Date.now() - 2_000,
      companyWebsite: '',
      attribution: base.attribution,
      fields: {
        firstName: 'Taylor',
        lastName: 'Seller',
        phone: '+15705551234',
        propertyAddress: '123 Main Street',
        city: 'Scranton',
        state: 'PA',
        zip: '18503',
      },
    })
    if (sms.formVariant !== 'sms_soft') throw new Error('unexpected SMS variant')
    expectLegacyFields(
      buildZapierPayload(sms, 'lead-sms', submittedAt),
      {
        ...sms.fields,
        ...legacyAttribution,
        formType: 'SMS Soft Lead Form',
        submittedAt,
      },
      ['leadId', 'formVariant', 'submissionPage'],
    )
  })

  it('rejects non-2xx without reading the downstream body', async () => {
    const text = vi.fn().mockRejectedValue(new Error('body must not be read'))
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500, text } as unknown as Response)
    vi.stubGlobal('fetch', fetchMock)

    await expect(deliverLeadToZapier(submission(), 'test-lead-id')).rejects.toMatchObject({
      code: 'downstream_rejected',
      downstreamStatus: 500,
    } satisfies Partial<LeadDeliveryError>)
    expect(text).not.toHaveBeenCalled()
  })

  it('classifies timeouts without exposing the URL in the error', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new DOMException('timed out', 'TimeoutError'))
    vi.stubGlobal('fetch', fetchMock)

    let caught: unknown
    try {
      await deliverLeadToZapier(submission(), 'test-lead-id')
    } catch (error) {
      caught = error
    }

    expect(caught).toBeInstanceOf(LeadDeliveryError)
    expect(caught).toMatchObject({ code: 'downstream_timeout' })
    expect(String(caught)).not.toContain(destinationUrls.seo)
  })
})
