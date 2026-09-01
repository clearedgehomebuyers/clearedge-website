export type TrafficSource = 'unknown' | 'seo' | 'direct' | 'sms' | 'facebook'

export type FormVariant =
  | 'multi_step_default'
  | 'multi_step_nj_meta'
  | 'contact'
  | 'sms_soft'

export interface LeadAttribution {
  trafficSource: TrafficSource
  landingPage: string
  submissionPage: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  fbclid: string
}
export interface SubmissionEnvelope<TVariant extends FormVariant, TFields> {
  formVariant: TVariant
  formStartedAt: number
  companyWebsite: string
  attribution: LeadAttribution
  fields: TFields
}

export interface MultiStepFields {
  firstName: string
  lastName: string
  email: string
  phone: string
  propertyAddress: string
  city: string
  state: string
  zip: string
  situation: string
  timeline: string
  occupancy: string
  termsConsent: boolean
  smsConsent: boolean
}

export type MultiStepDefaultSubmission = SubmissionEnvelope<
  'multi_step_default',
  MultiStepFields
>

export type MultiStepNjSubmission = SubmissionEnvelope<
  'multi_step_nj_meta',
  MultiStepFields & {
    sellerPriceExpectation: number | null
    priceResponse: 'Wants offer / Not sure' | 'Amount provided'
  }
>

export type ContactSubmission = SubmissionEnvelope<
  'contact',
  {
    firstName: string
    lastName: string
    email: string
    phone: string
    message: string
    termsConsent: boolean
    smsConsent: boolean
  }
>

export type SmsSoftSubmission = SubmissionEnvelope<
  'sms_soft',
  {
    firstName: string
    lastName: string
    phone: string
    propertyAddress: string
    city: string
    state: string
    zip: string
  }
>

export type LeadSubmission =
  | MultiStepDefaultSubmission
  | MultiStepNjSubmission
  | ContactSubmission
  | SmsSoftSubmission

export interface ConfirmedLeadResponse {
  ok: true
  delivery: 'zapier_accepted'
  leadId: string
  metaEventId: string
}

export interface FailedLeadResponse {
  ok: false
  error: string
  referenceId: string
}
