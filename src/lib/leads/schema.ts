import { z } from 'zod'

const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
  'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
  'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
  'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
  'WI', 'WY', 'DC',
] as const

const SITUATIONS = [
  'Inherited Property',
  'Facing Foreclosure',
  'Divorce',
  'Relocating',
  'Tired Landlord',
  'Needs Major Repairs',
  'Behind on Taxes',
  'Other',
] as const

const TIMELINES = [
  'ASAP (within 30 days)',
  '1–2 months',
  '3–6 months',
  'Just exploring options',
] as const

const OCCUPANCIES = [
  'I live here',
  "It's vacant",
  'Tenant occupied',
  'Family member lives here',
] as const

function normalizeText(value: string): string {
  return value.normalize('NFKC').replace(CONTROL_CHARACTERS, '').trim()
}

function requiredText(maxLength: number) {
  return z
    .string()
    .max(maxLength)
    .transform(normalizeText)
    .pipe(z.string().min(1).max(maxLength))
}

function optionalText(maxLength: number) {
  return z
    .string()
    .max(maxLength)
    .transform(normalizeText)
    .pipe(z.string().max(maxLength))
}

const email = z
  .string()
  .max(254)
  .transform((value) => normalizeText(value).toLowerCase())
  .pipe(z.string().email().max(254))

const phone = z
  .string()
  .max(32)
  .transform(normalizeText)
  .pipe(z.string().max(32).refine((value) => {
    const digits = value.replace(/\D/g, '')
    return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))
  }, 'invalid phone'))

const state = z
  .string()
  .transform((value) => normalizeText(value).toUpperCase())
  .pipe(z.enum(US_STATES))

const pageUrl = z
  .string()
  .max(2048)
  .transform(normalizeText)
  .pipe(z.string().max(2048).refine((value) => {
    if (!value) return true
    try {
      const url = new URL(value)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      return false
    }
  }, 'invalid page URL'))

const zip = z
  .string()
  .max(16)
  .transform(normalizeText)
  .pipe(z.string().regex(/^\d{5}$/))

const attribution = z.object({
  trafficSource: z.enum(['unknown', 'seo', 'direct', 'sms', 'facebook']),
  landingPage: pageUrl,
  submissionPage: pageUrl.refine(Boolean, 'submission page is required'),
  utm_source: optionalText(256),
  utm_medium: optionalText(256),
  utm_campaign: optionalText(256),
  utm_content: optionalText(256),
  utm_term: optionalText(256),
  fbclid: optionalText(1024),
}).strict()

const envelope = {
  formStartedAt: z.number().int().positive(),
  companyWebsite: z.string().max(0),
  attribution,
}

const multiStepFields = {
  firstName: requiredText(100),
  lastName: requiredText(100),
  email,
  phone,
  propertyAddress: requiredText(200),
  city: requiredText(100),
  state,
  zip,
  situation: z.enum(SITUATIONS),
  timeline: z.enum(TIMELINES),
  occupancy: z.enum(OCCUPANCIES),
  termsConsent: z.boolean(),
  smsConsent: z.boolean(),
}

const multiStepDefault = z.object({
  ...envelope,
  formVariant: z.literal('multi_step_default'),
  fields: z.object(multiStepFields).strict(),
}).strict()

const multiStepNj = z.object({
  ...envelope,
  formVariant: z.literal('multi_step_nj_meta'),
  fields: z.object({
    ...multiStepFields,
    sellerPriceExpectation: z.number().finite().positive().max(1_000_000_000_000).nullable(),
    priceResponse: z.enum(['Wants offer / Not sure', 'Amount provided']),
  }).strict(),
}).strict().superRefine((submission, context) => {
  const isNotSure = submission.fields.priceResponse === 'Wants offer / Not sure'
  if (isNotSure !== (submission.fields.sellerPriceExpectation === null)) {
    context.addIssue({
      code: 'custom',
      path: ['fields', 'sellerPriceExpectation'],
      message: 'price response and amount do not match',
    })
  }
})

const contact = z.object({
  ...envelope,
  formVariant: z.literal('contact'),
  fields: z.object({
    firstName: requiredText(100),
    lastName: requiredText(100),
    email,
    phone,
    message: optionalText(2000),
    termsConsent: z.boolean(),
    smsConsent: z.boolean(),
  }).strict(),
}).strict()

const smsSoft = z.object({
  ...envelope,
  formVariant: z.literal('sms_soft'),
  fields: z.object({
    firstName: requiredText(100),
    lastName: requiredText(100),
    phone,
    propertyAddress: requiredText(200),
    city: requiredText(100),
    state,
    zip,
  }).strict(),
}).strict()

export const leadSubmissionSchema = z.discriminatedUnion('formVariant', [
  multiStepDefault,
  multiStepNj,
  contact,
  smsSoft,
])

export type ValidatedLeadSubmission = z.infer<typeof leadSubmissionSchema>
