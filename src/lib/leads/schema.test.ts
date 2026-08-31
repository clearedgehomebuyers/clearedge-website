import { describe, expect, it } from 'vitest'
import { leadSubmissionSchema } from './schema'

const attribution = {
  trafficSource: 'unknown' as const,
  landingPage: 'https://www.clearedgehomebuyers.com/?utm_source=test',
  submissionPage: 'https://www.clearedgehomebuyers.com/contact',
  utm_source: 'test',
  utm_medium: 'test-medium',
  utm_campaign: 'test-campaign',
  utm_content: 'test-content',
  utm_term: 'test-term',
  fbclid: 'test-click-id',
}

const multiFields = {
  firstName: 'Taylor',
  lastName: 'Seller',
  email: 'Taylor@Example.com',
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
}

function envelope() {
  return {
    formStartedAt: Date.now() - 2_000,
    companyWebsite: '',
    attribution,
  }
}

describe('leadSubmissionSchema', () => {
  it('accepts and normalizes the default multi-step form', () => {
    const parsed = leadSubmissionSchema.parse({
      ...envelope(),
      formVariant: 'multi_step_default',
      fields: {
        ...multiFields,
        firstName: '  Taylor\u0000  ',
        phone: '  +1 (570) 555-1234\u0000  ',
        state: ' pa ',
        zip: ' 18503 ',
      },
    })

    expect(parsed.formVariant).toBe('multi_step_default')
    if (parsed.formVariant !== 'multi_step_default') throw new Error('unexpected variant')
    expect(parsed.fields.firstName).toBe('Taylor')
    expect(parsed.fields.email).toBe('taylor@example.com')
    expect(parsed.fields.phone).toBe('+1 (570) 555-1234')
    expect(parsed.fields.state).toBe('PA')
    expect(parsed.fields.zip).toBe('18503')
  })

  it('accepts the NJ price fields without changing their meaning', () => {
    const parsed = leadSubmissionSchema.parse({
      ...envelope(),
      formVariant: 'multi_step_nj_meta',
      fields: {
        ...multiFields,
        state: 'NJ',
        sellerPriceExpectation: 275000,
        priceResponse: 'Amount provided',
      },
    })

    expect(parsed.formVariant).toBe('multi_step_nj_meta')
    if (parsed.formVariant !== 'multi_step_nj_meta') throw new Error('unexpected variant')
    expect(parsed.fields.sellerPriceExpectation).toBe(275000)
  })

  it('accepts contact and SMS-soft variants', () => {
    expect(leadSubmissionSchema.safeParse({
      ...envelope(),
      formVariant: 'contact',
      fields: {
        firstName: 'Taylor',
        lastName: 'Seller',
        email: 'taylor@example.com',
        phone: '+1 (570) 555-1234',
        message: 'Please call after 5.',
        termsConsent: false,
        smsConsent: false,
      },
    }).success).toBe(true)

    expect(leadSubmissionSchema.safeParse({
      ...envelope(),
      formVariant: 'sms_soft',
      fields: {
        firstName: 'Taylor',
        lastName: 'Seller',
        phone: '+15705551234',
        propertyAddress: '123 Main Street',
        city: 'Scranton',
        state: 'PA',
        zip: '18503',
      },
    }).success).toBe(true)
  })

  it('rejects unknown fields, populated honeypots, and excessive lengths', () => {
    expect(leadSubmissionSchema.safeParse({
      ...envelope(),
      unexpected: true,
      formVariant: 'multi_step_default',
      fields: multiFields,
    }).success).toBe(false)

    expect(leadSubmissionSchema.safeParse({
      ...envelope(),
      companyWebsite: 'bot-filled.example',
      formVariant: 'multi_step_default',
      fields: multiFields,
    }).success).toBe(false)

    expect(leadSubmissionSchema.safeParse({
      ...envelope(),
      formVariant: 'contact',
      fields: {
        firstName: 'T'.repeat(101),
        lastName: 'Seller',
        email: 'taylor@example.com',
        phone: '+15705551234',
        message: '',
        termsConsent: false,
        smsConsent: false,
      },
    }).success).toBe(false)
  })

  it('rejects inconsistent NJ price fields', () => {
    expect(leadSubmissionSchema.safeParse({
      ...envelope(),
      formVariant: 'multi_step_nj_meta',
      fields: {
        ...multiFields,
        state: 'NJ',
        sellerPriceExpectation: null,
        priceResponse: 'Amount provided',
      },
    }).success).toBe(false)
  })
})
