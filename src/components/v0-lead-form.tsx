"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { MapPin, HelpCircle, Calendar, Users, User, ArrowRight, ArrowLeft, Check, Shield, Clock, Lock, AlertTriangle, DollarSign, Home, Heart, Briefcase, Wrench, FileWarning, Key, HelpCircle as OtherIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AddressAutocomplete } from "@/components/AddressAutocomplete"
import { useTrafficSource, clearSMSAttribution } from "./TrafficSourceProvider"
import { trackConfirmedMetaLead, trackMetaFormStart } from "@/lib/meta-pixel"
import { LeadSubmissionError, submitLead } from "@/lib/leads/client"
import { trackAnalyticsEvent, trackClickToCall } from "@/lib/analytics-events"

// The proven five-step organic form. This is what every route gets unless it
// opts into a variant, and it is unchanged.
const steps = [
  { id: 1, title: "Property", icon: MapPin },
  { id: 2, title: "Situation", icon: HelpCircle },
  { id: 3, title: "Timeline", icon: Calendar },
  { id: 4, title: "Occupancy", icon: Users },
  { id: 5, title: "Contact", icon: User },
]

// nj-meta variant (/cashoffernj): Price is inserted between Occupancy and
// Contact. Contact stays last — that ordering is load-bearing.
const stepsWithPrice = [
  { id: 1, title: "Property", icon: MapPin },
  { id: 2, title: "Situation", icon: HelpCircle },
  { id: 3, title: "Timeline", icon: Calendar },
  { id: 4, title: "Occupancy", icon: Users },
  { id: 5, title: "Price", icon: DollarSign },
  { id: 6, title: "Contact", icon: User },
]

// Where the Price screen sits in the nj-meta flow.
const PRICE_STEP_INDEX = 5

// The step_number the Price events report. Deliberately 5, per blueprint §4 —
// note this is a DIFFERENT numbering scheme from the site-wide form_step_N
// events, which the Price step deliberately does not join. See
// reportedStepNumber() for why the two are kept apart.
const PRICE_STEP_NUMBER = 5

// All 50 US States (PA first as primary market)
const US_STATES = [
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' },
]

const situationIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Inherited Property": Home,
  "Facing Foreclosure": AlertTriangle,
  "Divorce": Heart,
  "Relocating": Briefcase,
  "Tired Landlord": Key,
  "Needs Major Repairs": Wrench,
  "Behind on Taxes": FileWarning,
  "Other": OtherIcon,
}

const situations = [
  "Inherited Property",
  "Facing Foreclosure",
  "Divorce",
  "Relocating",
  "Tired Landlord",
  "Needs Major Repairs",
  "Behind on Taxes",
  "Other",
]

const timelines = ["ASAP (within 30 days)", "1–2 months", "3–6 months", "Just exploring options"]

const occupancies = ["I live here", "It's vacant", "Tenant occupied", "Family member lives here"]

// Extract only the 10-digit phone number from any input
function extractPhoneDigits(value: string): string {
  // Remove the "+1 " prefix if present before extracting digits
  const withoutPrefix = value.startsWith('+1 ') ? value.slice(3) : value

  // Extract only digits
  let digits = withoutPrefix.replace(/\D/g, '')

  // If someone pasted a number with leading 1 country code (11+ digits starting with 1)
  if (digits.length > 10 && digits.startsWith('1')) {
    digits = digits.slice(1)
  }

  // Return only first 10 digits
  return digits.slice(0, 10)
}

// Format 10 digits as +1 (XXX) XXX-XXXX
function formatPhoneNumber(value: string): string {
  const digits = extractPhoneDigits(value)

  if (digits.length === 0) return ''
  if (digits.length <= 3) return `+1 (${digits}`
  if (digits.length <= 6) return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

// Get raw 10 digits for validation
function getPhoneDigits(value: string): string {
  return extractPhoneDigits(value)
}

// Parse a typed price into a number for the CRM. Returns null for empty, zero
// or unparseable input — blueprint §5: never $0 and never empty-as-zero, since
// a zero silently corrupts every average and ratio computed on this column.
function parsePriceAmount(value: string): number | null {
  const digits = value.replace(/\D/g, '')
  if (!digits) return null
  const n = parseInt(digits, 10)
  return Number.isFinite(n) && n > 0 ? n : null
}

// Group digits as the visitor types. No min/max clamping anywhere: a lowball or
// a fantasy number is signal, not a validation error.
function formatPriceInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 12)
  if (!digits) return ''
  return parseInt(digits, 10).toLocaleString('en-US')
}

interface V0LeadFormProps {
  /**
   * Pre-selected state. Defaults to PA for the main site; paid landing pages
   * that make no locality claim pass '' so nothing is assumed about the
   * visitor's market.
   */
  defaultState?: string
  /**
   * Helper copy under the address step. The default mentions PA market data,
   * which must not appear on geography-neutral campaign pages.
   */
  addressHelperText?: string
  /** Placeholders for the city/ZIP inputs — the defaults are PA examples. */
  cityPlaceholder?: string
  zipPlaceholder?: string
  /** Rendered instead of the section heading block when supplied. */
  compact?: boolean
  /**
   * Open the Terms/Privacy consent links in a new tab. These are the only
   * outbound links in the form and they are legally required, so on a paid
   * landing page — where a navigation away is a lost conversion and the form
   * holds its answers in React state — they must not replace the page.
   */
  legalLinksNewTab?: boolean
  /**
   * Opt-in flow selection. 'default' is the proven five-step organic form and
   * is what every route gets unless it asks for otherwise; 'nj-meta' adds the
   * Price step for the /cashoffernj paid-traffic page (PRICE-ANCHOR-BLUEPRINT
   * v2). The step is additive — nothing is hidden or reordered for any other
   * route, and no route is detected or excluded.
   */
  variant?: 'default' | 'nj-meta'
}

export function V0LeadForm({
  defaultState = "PA",
  addressHelperText = "We use this to pull local PA market data for your personalized cash offer.",
  cityPlaceholder = "Scranton",
  zipPlaceholder = "18501",
  compact = false,
  legalLinksNewTab = true,
  variant = 'default',
}: V0LeadFormProps = {}) {
  // All step geometry derives from the variant. On 'default' these resolve to
  // exactly the literals the form used before the Price step existed:
  // activeSteps === steps, lastStep === 5, contactStepIndex === 5.
  const hasPriceStep = variant === 'nj-meta'
  const activeSteps = hasPriceStep ? stepsWithPrice : steps
  const lastStep = activeSteps.length
  const contactStepIndex = lastStep
  const legalLinkProps = legalLinksNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {}
  const { trafficSource, utmParams, landingPage, phone, phoneTel } = useTrafficSource()
  const [currentStep, setCurrentStep] = useState(1)
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward">("forward")
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: defaultState,
    zip: "",
    situation: "",
    timeline: "",
    occupancy: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('')
  const [termsConsent, setTermsConsent] = useState(false)
  const [smsConsent, setSmsConsent] = useState(false)
  const [showStep1Errors, setShowStep1Errors] = useState(false)
  // Price answers live outside formData, which is a flat string map the other
  // four steps share — keeping them separate leaves the default flow's state
  // shape and its webhook payload untouched.
  const [priceAmount, setPriceAmount] = useState("")
  const [priceNotSure, setPriceNotSure] = useState(false)
  const stepKeyRef = useRef(0)
  // Meta FormStart fires on the first field the visitor touches, once per
  // mounted form. GA4's form_start comes from Enhanced Measurement and can't
  // say which form it was; this one names it.
  const hasTrackedFormStart = useRef(false)
  const formStartedAtRef = useRef(Date.now())
  const submissionInFlightRef = useRef(false)
  // One arrival and one completion per form attempt. Without these, navigating
  // back and forward over the Price step would fire repeat views and inflate
  // the denominator that abandonment is measured against (blueprint §4).
  const hasTrackedPriceView = useRef(false)
  const hasTrackedPriceComplete = useRef(false)
  const trackedStepsRef = useRef(new Set<number>())
  const formVariantName = hasPriceStep ? 'multi_step_nj_meta' : 'multi_step_default'

  // Check if current step is valid. Contact is matched by POSITION rather than
  // by the literal 5 it used to be, because the nj-meta variant pushes it to 6.
  // On the default variant contactStepIndex is 5, so this returns exactly what
  // the original switch returned for every step.
  const isStepValid = (step: number): boolean => {
    if (step === contactStepIndex) {
      return !!(
        formData.firstName.trim() &&
        formData.lastName.trim() &&
        getPhoneDigits(formData.phone).length === 10 &&
        formData.email.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      )
    }
    if (hasPriceStep && step === PRICE_STEP_INDEX) {
      // Either a number or the not-sure option — one of the two is required to
      // continue, and there is deliberately no min/max check on the number.
      return priceNotSure || parsePriceAmount(priceAmount) !== null
    }
    switch (step) {
      case 1:
        return !!(
          formData.address.trim() &&
          formData.city.trim() &&
          formData.state &&
          formData.zip.trim() &&
          /^\d{5}$/.test(formData.zip)
        )
      case 2:
        return !!formData.situation
      case 3:
        return !!formData.timeline
      case 4:
        return !!formData.occupancy
      default:
        return false
    }
  }

  // Map a screen position onto the site-wide form_step_N taxonomy.
  //
  // form_step_5 means "reached the Contact screen" on every route, and the
  // weekly funnel report depends on that. The Price step therefore does NOT
  // take a form_step_N number: it returns null here and is measured entirely by
  // its own form_step_view / form_step_complete pair, while Contact keeps
  // reporting 5 even though it is the 6th screen on the nj-meta variant. That
  // keeps every existing metric meaning exactly what it meant before.
  const reportedStepNumber = (step: number): number | null => {
    if (hasPriceStep) {
      if (step === PRICE_STEP_INDEX) return null
      if (step === contactStepIndex) return 5
    }
    return step
  }

  // Track form step transitions in GA4
  const trackStep = (step: number) => {
    const reported = reportedStepNumber(step)
    if (reported === null) return
    if (trackedStepsRef.current.has(reported)) return
    trackedStepsRef.current.add(reported)
    if (typeof window !== 'undefined' && window.gtag) {
      const stepNames = ['', 'address', 'situation', 'timeline', 'occupancy', 'contact']
      window.gtag('event', `form_step_${reported}`, {
        event_category: 'Lead Form',
        event_label: stepNames[reported],
        form_variant: formVariantName,
        page_path: window.location.pathname,
      })
    }
  }

  // Price-step arrival. Guarded to once per mounted form so that one visit to
  // the step counts once no matter how often the visitor navigates back to it.
  const trackPriceStepView = useCallback(() => {
    if (hasTrackedPriceView.current) return
    hasTrackedPriceView.current = true
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_step_view', {
        event_category: 'Lead Form',
        event_label: 'price',
        step_number: PRICE_STEP_NUMBER,
        step_name: 'price',
        form_variant: formVariantName,
        page_path: window.location.pathname,
      })
    }
  }, [formVariantName])

  // Price-step completion. Also guarded to once per form attempt, so that
  // completions can never exceed arrivals and drive abandonment negative.
  // Consequence worth knowing when reading the reports: if a visitor continues
  // past Price, goes back and changes their answer, GA4 keeps the FIRST answer
  // while the webhook carries the final one. The CRM figure is the source of
  // truth for the number itself; this event measures the step, not the price.
  const trackPriceStepComplete = (response: 'amount_entered' | 'not_sure') => {
    if (hasTrackedPriceComplete.current) return
    hasTrackedPriceComplete.current = true
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_step_complete', {
        event_category: 'Lead Form',
        event_label: 'price',
        step_number: PRICE_STEP_NUMBER,
        step_name: 'price',
        price_response: response,
        form_variant: formVariantName,
        page_path: window.location.pathname,
      })
    }
  }

  // Fires on render of the Price screen rather than on the click that leads to
  // it, so the arrival is recorded even if the visitor never continues — which
  // is the entire point of having a denominator.
  useEffect(() => {
    if (hasPriceStep && currentStep === PRICE_STEP_INDEX) trackPriceStepView()
  }, [hasPriceStep, currentStep, trackPriceStepView])

  const handleNext = () => {
    if (currentStep === 1 && !isStepValid(1)) {
      setShowStep1Errors(true)
      requestAnimationFrame(() => {
        const firstInvalidId = !formData.address.trim()
          ? 'address'
          : !formData.city.trim()
            ? 'city'
            : !formData.state
              ? 'state'
              : 'zip'
        document.getElementById(firstInvalidId)?.focus()
      })
      return
    }
    if (currentStep < lastStep && isStepValid(currentStep)) {
      if (hasPriceStep && currentStep === PRICE_STEP_INDEX) {
        trackPriceStepComplete(priceNotSure ? 'not_sure' : 'amount_entered')
      }
      setShowStep1Errors(false)
      setSlideDirection("forward")
      stepKeyRef.current++
      const nextStep = currentStep + 1
      trackStep(nextStep)
      setCurrentStep(nextStep)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setSlideDirection("backward")
      stepKeyRef.current++
      setCurrentStep(currentStep - 1)
    }
  }

  // Scroll only after the server has confirmed Zapier acceptance.
  useEffect(() => {
    if (isSubmitted && typeof window !== 'undefined') {
      setTimeout(() => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isStepValid(lastStep) || isSubmitted || submissionInFlightRef.current) return

    submissionInFlightRef.current = true
    setIsSubmitting(true)
    setSubmissionError('')

    try {
      const attribution = {
        trafficSource,
        landingPage,
        submissionPage: window.location.href,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_content: utmParams.utm_content,
        utm_term: utmParams.utm_term,
        fbclid: utmParams.fbclid,
      }

      const fields = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        propertyAddress: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        situation: formData.situation,
        timeline: formData.timeline,
        occupancy: formData.occupancy,
        termsConsent,
        smsConsent,
      }

      const result = hasPriceStep
        ? await submitLead({
            formVariant: 'multi_step_nj_meta',
            formStartedAt: formStartedAtRef.current,
            companyWebsite,
            attribution,
            fields: {
              ...fields,
              sellerPriceExpectation: priceNotSure ? null : parsePriceAmount(priceAmount),
              priceResponse: priceNotSure ? 'Wants offer / Not sure' : 'Amount provided',
            },
          })
        : await submitLead({
            formVariant: 'multi_step_default',
            formStartedAt: formStartedAtRef.current,
            companyWebsite,
            attribution,
            fields,
          })

      // Clear SMS attribution so this lead isn't double-counted on return visits
      if (trafficSource === 'sms') clearSMSAttribution()

      // Conversion events are gated on the confirmed 201 from /api/leads.
      try {
        trackAnalyticsEvent('generate_lead', {
          event_category: 'Lead Form',
          event_label: 'Multi-Step Lead Form',
          form_variant: formVariantName,
          value: 1,
          delivery: result.delivery,
          lead_id: result.leadId,
          traffic_source: trafficSource,
          utm_source: utmParams.utm_source,
          utm_medium: utmParams.utm_medium,
          utm_campaign: utmParams.utm_campaign,
        })
        trackConfirmedMetaLead(result.metaEventId, 'Multi-Step Lead Form')
      } catch {
        // Analytics must never change an accepted lead into a failed UI state.
      }

      setIsSubmitted(true)
    } catch (error) {
      trackAnalyticsEvent('lead_submission_error', {
        event_category: 'Lead Form',
        event_label: 'Multi-Step Lead Form',
        form_variant: formVariantName,
        traffic_source: trafficSource,
        has_reference: error instanceof LeadSubmissionError,
      })
      const reference = error instanceof LeadSubmissionError ? error.referenceId : undefined
      setSubmissionError(
        `We couldn't confirm delivery. Your information is still here—please try again or call ${phone}.${reference ? ` Reference: ${reference}` : ''}`,
      )
    } finally {
      submissionInFlightRef.current = false
      setIsSubmitting(false)
    }
  }

  // Every field and every option button routes through here, so one guard
  // covers every step on both variants.
  const markFormStart = () => {
    if (hasTrackedFormStart.current) return
    hasTrackedFormStart.current = true
    trackMetaFormStart('Multi-Step Lead Form')
    trackStep(1)
    trackAnalyticsEvent('lead_form_start', {
      event_category: 'Lead Form',
      event_label: 'Multi-Step Lead Form',
      form_variant: formVariantName,
      traffic_source: trafficSource,
    })
  }

  const updateFormData = (field: string, value: string) => {
    markFormStart()
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhoneChange = (value: string) => {
    markFormStart()
    const formatted = formatPhoneNumber(value)
    setFormData((prev) => ({ ...prev, phone: formatted }))
  }

  if (isSubmitted) {
    return (
      <section id="lead-form" className="py-8 md:py-12 bg-surface-cream scroll-mt-24 md:scroll-mt-28">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* Celebration */}
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 rounded-full bg-ce-green/10 flex items-center justify-center mx-auto animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-ce-green flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>
            {/* Celebration dots */}
            <div className="absolute top-0 left-1/2 -translate-x-8 w-2 h-2 rounded-full bg-ce-green animate-float-up" style={{ animationDelay: '0.2s' }} />
            <div className="absolute top-2 left-1/2 translate-x-6 w-1.5 h-1.5 rounded-full bg-ce-blue animate-float-up" style={{ animationDelay: '0.4s' }} />
            <div className="absolute top-1 left-1/2 -translate-x-3 w-1.5 h-1.5 rounded-full bg-amber-400 animate-float-up" style={{ animationDelay: '0.6s' }} />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink mb-4">We&apos;ve Got Your Details</h2>
          <p className="text-ce-ink/70 text-lg mb-6">
            Tyler is personally reviewing your property right now. You&apos;ll receive your no-obligation cash offer within 24 hours — most homeowners hear back the same day. Check your phone and email.
          </p>
          <div className="bg-gradient-to-br from-white to-surface-cream rounded-2xl p-6 max-w-md mx-auto border border-ce-ink/5 shadow-lg">
            <p className="text-ce-ink/70 text-sm mb-2">Can&apos;t wait? Call Tyler directly:</p>
            <a
              href={`tel:${phoneTel}`}
              onClick={() => trackClickToCall({
                eventLabel: 'Lead Form Success Phone',
                callLocation: 'lead_form_success',
                trafficSource,
                phoneLine: phoneTel,
              })}
              className="text-ce-green text-lg font-medium hover:underline"
            >
              {phone}
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="lead-form"
      className={`bg-surface-cream scroll-mt-24 md:scroll-mt-28 ${compact ? 'py-0' : 'py-8 md:py-12'}`}
    >
      <div className={compact ? 'max-w-3xl mx-auto' : 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'}>
        {/* Section Header — suppressed in compact mode, where the host page
            supplies its own headline directly above the form. */}
        {!compact && (
          <div className="text-center mb-6 md:mb-6">
            <span className="inline-flex items-center gap-2 text-ce-green text-sm font-medium mb-4 px-4 py-2 bg-white rounded-full border border-ce-green/10 shadow-sm">
              <Shield className="w-4 h-4" />
              100% Free &amp; No Obligation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-ce-ink mb-4 text-balance">
              Find Out What Your House Is Worth in Cash
            </h2>
            <p className="text-ce-ink/70 text-lg max-w-xl mx-auto">
              Answer 5 quick questions. Tyler will personally review your property and send your no-obligation offer within 24 hours.
            </p>
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex justify-between mb-6 relative">
          {/* Progress Line */}
          <div className="absolute top-5 sm:top-6 left-0 right-0 h-0.5 bg-ce-ink/10">
            <div
              className="h-full bg-gradient-to-r from-ce-green to-ce-blue transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / (activeSteps.length - 1)) * 100}%` }}
            />
          </div>

          {activeSteps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep > step.id
                    ? "bg-ce-green text-white shadow-green"
                    : currentStep === step.id
                    ? "bg-ce-green text-white shadow-green ring-4 ring-ce-green/20"
                    : "bg-white text-ce-ink/40 border border-ce-ink/10"
                }`}
              >
                {currentStep > step.id ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </div>
              <span
                className={`text-xs mt-1.5 sm:mt-2 transition-colors ${
                  currentStep === step.id ? "font-semibold text-ce-ink" : currentStep > step.id ? "font-medium text-ce-ink/60" : "text-ce-ink/40"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Form card with gradient top accent */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-ce-ink/5 overflow-hidden">
          {/* Gradient top bar */}
          <div className="h-1 bg-gradient-to-r from-ce-green via-ce-blue to-ce-green" />

          <div className="p-5 sm:p-8 md:p-12">
            <form id="multi-step-lead-form" name="multi-step-lead-form" onSubmit={handleSubmit}>
              <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="multi-step-company-website">Company website</label>
                <input
                  id="multi-step-company-website"
                  name="companyWebsite"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={companyWebsite}
                  onChange={(event) => setCompanyWebsite(event.target.value)}
                />
              </div>
              {/* Step content with slide animation */}
              <div key={stepKeyRef.current} data-direction={slideDirection}>
                {/* Step 1: Address */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-ce-ink mb-2">Where is your property?</h3>
                      <p className="text-ce-ink/70 text-sm">
                        {addressHelperText}
                      </p>
                    </div>
                    <div className="space-y-4">
                      {/* Street Address - Full Width */}
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-ce-ink mb-2">
                          Street Address <span className="text-red-500">*</span>
                        </label>
                        <AddressAutocomplete
                          id="address"
                          placeholder="123 Main Street"
                          value={formData.address}
                          onChange={(val) => updateFormData("address", val)}
                          onPlaceSelect={(place) => {
                            updateFormData("address", place.street)
                            if (place.city) updateFormData("city", place.city)
                            if (place.state) updateFormData("state", place.state)
                            if (place.zip) updateFormData("zip", place.zip)
                          }}
                          className={showStep1Errors && !formData.address.trim() ? 'border-red-500' : ''}
                        />
                        {showStep1Errors && !formData.address.trim() && (
                          <p className="text-red-500 text-sm mt-1">Street address is required</p>
                        )}
                      </div>

                      {/* City (50%), State (25%), ZIP (25%) */}
                      <div className="grid grid-cols-4 gap-3">
                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="city" className="block text-sm font-medium text-ce-ink mb-2">
                            City <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="city"
                            type="text"
                            placeholder={cityPlaceholder}
                            value={formData.city}
                            onChange={(e) => updateFormData("city", e.target.value)}
                            autoComplete="address-level2"
                            className={showStep1Errors && !formData.city.trim() ? 'border-red-500' : ''}
                          />
                          {showStep1Errors && !formData.city.trim() && (
                            <p className="text-red-500 text-sm mt-1">City is required</p>
                          )}
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <label htmlFor="state" className="block text-sm font-medium text-ce-ink mb-2">
                            State <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="state"
                            value={formData.state}
                            onChange={(e) => updateFormData("state", e.target.value)}
                            autoComplete="address-level1"
                            className="w-full h-14 px-3 border border-ce-ink/10 hover:border-ce-ink/20 focus:border-ce-green focus:ring-ce-green/20 focus:ring-[3px] rounded-xl bg-surface-cream/50 text-ce-ink transition-[color,box-shadow,border-color] outline-none"
                          >
                            {/* Only present when no state is pre-selected, so the
                                visitor has to choose one rather than inherit an
                                assumption about their market. */}
                            {!defaultState && <option value="">--</option>}
                            {US_STATES.map((state) => (
                              <option key={state.value} value={state.value}>
                                {state.value}
                              </option>
                            ))}
                          </select>
                          {showStep1Errors && !formData.state && (
                            <p className="text-red-500 text-sm mt-1">Required</p>
                          )}
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <label htmlFor="zip" className="block text-sm font-medium text-ce-ink mb-2">
                            ZIP <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="zip"
                            type="text"
                            placeholder={zipPlaceholder}
                            value={formData.zip}
                            onChange={(e) => updateFormData("zip", e.target.value.replace(/\D/g, '').slice(0, 5))}
                            autoComplete="postal-code"
                            inputMode="numeric"
                            maxLength={5}
                            className={showStep1Errors && !/^\d{5}$/.test(formData.zip) ? 'border-red-500' : ''}
                          />
                          {showStep1Errors && !formData.zip.trim() && (
                            <p className="text-red-500 text-sm mt-1">ZIP code is required</p>
                          )}
                          {showStep1Errors && formData.zip.trim() && !/^\d{5}$/.test(formData.zip) && (
                            <p className="text-red-500 text-sm mt-1">Enter a valid 5-digit ZIP</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Situation */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-ce-ink mb-2">What&apos;s your situation?</h3>
                      <p className="text-ce-ink/70 text-sm">This helps us tailor our offer to your specific needs. No judgment — we&apos;ve seen it all.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {situations.map((situation) => {
                        const SituationIcon = situationIcons[situation] || OtherIcon
                        return (
                          <button
                            key={situation}
                            type="button"
                            onClick={() => updateFormData("situation", situation)}
                            className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                              formData.situation === situation
                                ? "border-ce-green bg-ce-green-subtle ring-2 ring-ce-green/20 shadow-sm"
                                : "border-ce-ink/10 hover:border-ce-green/30 text-ce-ink/70 hover:text-ce-ink bg-white hover:bg-surface-cream"
                            }`}
                          >
                            <SituationIcon className={`w-5 h-5 flex-shrink-0 ${formData.situation === situation ? 'text-ce-green' : 'text-ce-ink/40'}`} />
                            <span className={formData.situation === situation ? 'text-ce-ink font-medium' : ''}>{situation}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3: Timeline */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-ce-ink mb-2">When do you need to sell?</h3>
                      <p className="text-ce-ink/70 text-sm">We can work with any timeline — you&apos;re in control.</p>
                    </div>
                    <div className="space-y-3">
                      {timelines.map((timeline) => (
                        <button
                          key={timeline}
                          type="button"
                          onClick={() => updateFormData("timeline", timeline)}
                          className={`w-full p-4 rounded-xl border text-left transition-all ${
                            formData.timeline === timeline
                              ? "border-ce-green bg-ce-green-subtle ring-2 ring-ce-green/20 shadow-sm text-ce-ink font-medium"
                              : "border-ce-ink/10 hover:border-ce-green/30 text-ce-ink/70 hover:text-ce-ink bg-white hover:bg-surface-cream"
                          }`}
                        >
                          {timeline}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Occupancy */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-ce-ink mb-2">Who lives at the property?</h3>
                      <p className="text-ce-ink/70 text-sm">This helps us plan the closing process smoothly.</p>
                    </div>
                    <div className="space-y-3">
                      {occupancies.map((occupancy) => (
                        <button
                          key={occupancy}
                          type="button"
                          onClick={() => updateFormData("occupancy", occupancy)}
                          className={`w-full p-4 rounded-xl border text-left transition-all ${
                            formData.occupancy === occupancy
                              ? "border-ce-green bg-ce-green-subtle ring-2 ring-ce-green/20 shadow-sm text-ce-ink font-medium"
                              : "border-ce-ink/10 hover:border-ce-green/30 text-ce-ink/70 hover:text-ce-ink bg-white hover:bg-surface-cream"
                          }`}
                        >
                          {occupancy}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price — nj-meta variant only. Copy is locked by
                    PRICE-ANCHOR-BLUEPRINT v2 §3 and must not be revised
                    without a stated reason. */}
                {hasPriceStep && currentStep === PRICE_STEP_INDEX && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-ce-ink mb-2">What price would make sense for you?</h3>
                      <p className="text-ce-ink/70 text-sm">
                        For a cash sale, as-is — with no repairs, agent commissions, or typical seller closing costs — what price would you consider?
                      </p>
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="priceExpectation" className="block text-sm font-medium text-ce-ink mb-2">
                        Your price
                      </label>
                      <div className="relative">
                        <span
                          aria-hidden="true"
                          className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none ${priceNotSure ? 'text-ce-ink/25' : 'text-ce-ink/50'}`}
                        >
                          $
                        </span>
                        <Input
                          id="priceExpectation"
                          type="text"
                          inputMode="numeric"
                          autoComplete="off"
                          placeholder="Enter amount"
                          value={priceAmount}
                          // Deliberately NOT disabled when not-sure is selected.
                          // Disabling it made the two answers a one-way door: the
                          // input could not take focus, so a visitor who picked
                          // not-sure and then wanted to type a number had to work
                          // out that they must deselect it first. Touching the
                          // field is an unambiguous "I want to type a number", so
                          // it simply switches which answer is active.
                          onFocus={() => setPriceNotSure(false)}
                          onChange={(e) => {
                            markFormStart()
                            setPriceNotSure(false)
                            setPriceAmount(formatPriceInput(e.target.value))
                          }}
                          className={`pl-9 text-lg ${priceNotSure ? 'opacity-50' : ''}`}
                        />
                      </div>
                      <button
                        type="button"
                        aria-pressed={priceNotSure}
                        onClick={() => {
                          markFormStart()
                          setPriceNotSure((prev) => {
                            const next = !prev
                            if (next) setPriceAmount("")
                            return next
                          })
                        }}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                          priceNotSure
                            ? "border-ce-green bg-ce-green-subtle ring-2 ring-ce-green/20 shadow-sm text-ce-ink font-medium"
                            : "border-ce-ink/10 hover:border-ce-green/30 text-ce-ink/70 hover:text-ce-ink bg-white hover:bg-surface-cream"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                            priceNotSure ? "border-ce-green" : "border-ce-ink/25"
                          }`}
                        >
                          {priceNotSure && <span className="w-2.5 h-2.5 rounded-full bg-ce-green" />}
                        </span>
                        <span>I&apos;m not sure — I&apos;d like to receive an offer</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Contact — always the last screen on every variant */}
                {currentStep === contactStepIndex && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-ce-ink mb-2">Last step — where should we send your offer?</h3>
                      <p className="text-ce-ink/70 text-sm">
                        Tyler will personally reach out within 24 hours. Your info stays private — we never sell or share it.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-ce-ink mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => updateFormData("firstName", e.target.value)}
                          autoComplete="given-name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-ce-ink mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Smith"
                          value={formData.lastName}
                          onChange={(e) => updateFormData("lastName", e.target.value)}
                          autoComplete="family-name"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-ce-ink mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        placeholder="(610) 555-0123"
                        value={formData.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        autoComplete="tel"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-ce-ink mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        inputMode="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        autoComplete="email"
                      />
                    </div>
                  </div>
                )}
              </div>

              {submissionError && (
                <p role="alert" className="mt-6 text-sm text-red-600 text-center">
                  {submissionError}
                </p>
              )}

              {/* Navigation */}
              <div className={`mt-8 pt-6 border-t border-ce-ink/5 ${currentStep === 1 ? 'flex flex-col gap-4' : 'flex justify-between items-start gap-4'}`}>
                {currentStep === 1 ? (
                  <>
                    <div className="space-y-3">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={termsConsent}
                          onChange={(e) => setTermsConsent(e.target.checked)}
                          className="mt-0.5 w-5 h-5 rounded border-gray-300 text-ce-green focus:ring-ce-green flex-shrink-0"
                        />
                        <span className="text-xs text-gray-500 leading-tight">
                          I agree to the <Link href="/terms" className="underline hover:text-ce-green" {...legalLinkProps}>Terms &amp; Conditions</Link> and <Link href="/privacy-policy" className="underline hover:text-ce-green" {...legalLinkProps}>Privacy Policy</Link>.
                        </span>
                      </label>
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={smsConsent}
                          onChange={(e) => setSmsConsent(e.target.checked)}
                          className="mt-0.5 w-5 h-5 rounded border-gray-300 text-ce-green focus:ring-ce-green flex-shrink-0"
                        />
                        <span className="text-xs text-gray-500 leading-tight">
                          I agree to receive transactional or conversational communications from ClearEdge Home Buyers via text messages, phone calls, and emails related to my real estate inquiry, such as property details, responses, and appointment confirmations. Message frequency varies. Reply STOP to opt out. Reply HELP for help. Msg & data rates may apply. Your information is secure and will not be sold or shared with third parties or affiliates for promotional purposes.
                        </span>
                      </label>
                    </div>
                  </>
                ) : currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="brand-outline"
                    onClick={handleBack}
                    className="flex items-center gap-2 h-12 px-6 rounded-full"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < lastStep ? (
                  <Button
                    type="button"
                    variant="brand"
                    size="xl"
                    onClick={handleNext}
                    disabled={currentStep === 1 ? false : !isStepValid(currentStep)}
                    className={`disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed flex-shrink-0 ${currentStep === 1 ? 'w-full sm:w-auto sm:self-end' : ''}`}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="brand"
                    size="xl"
                    disabled={isSubmitting || !isStepValid(lastStep)}
                    className={`disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed px-6 sm:px-10 ${isStepValid(lastStep) && !isSubmitting ? 'ring-4 ring-ce-green/20' : ''}`}
                  >
                    {isSubmitting ? "Submitting..." : "Get My Cash Offer"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-6 text-ce-ink/70 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-ce-green" />
            <span>Your info stays private — never sold</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-ce-green" />
            <span>Personal response within 24 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-ce-blue" />
            <span>100% secure & encrypted</span>
          </div>
        </div>

        {/* Visual separator */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-ce-ink/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-ce-green/30" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-ce-ink/10" />
        </div>
      </div>
    </section>
  )
}
