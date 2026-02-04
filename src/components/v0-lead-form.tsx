"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, HelpCircle, Calendar, Users, User, ArrowRight, ArrowLeft, Check, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTrafficSource } from "./TrafficSourceProvider"

const steps = [
  { id: 1, title: "Property", icon: MapPin },
  { id: 2, title: "Situation", icon: HelpCircle },
  { id: 3, title: "Timeline", icon: Calendar },
  { id: 4, title: "Occupancy", icon: Users },
  { id: 5, title: "Contact", icon: User },
]

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

export function V0LeadForm() {
  const { webhook, trafficSource, phone, phoneTel } = useTrafficSource()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "PA",
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
  const [termsConsent, setTermsConsent] = useState(false)
  const [smsConsent, setSmsConsent] = useState(false)
  const [showStep1Errors, setShowStep1Errors] = useState(false)

  // Check if current step is valid
  const isStepValid = (step: number): boolean => {
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
      case 5:
        return !!(
          formData.firstName.trim() &&
          formData.lastName.trim() &&
          getPhoneDigits(formData.phone).length === 10 &&
          formData.email.trim() &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        )
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep === 1 && !isStepValid(1)) {
      setShowStep1Errors(true)
      return
    }
    if (currentStep < 5 && isStepValid(currentStep)) {
      setShowStep1Errors(false)
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  // Track GA4 conversion when form is successfully submitted
  useEffect(() => {
    if (isSubmitted && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'Lead Form',
        event_label: 'Multi-Step Lead Form',
        value: 1
      });
    }
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isStepValid(5)) return

    setIsSubmitting(true)

    try {
      // Build payload for Zapier/REsimpli
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        propertyAddress: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        situation: formData.situation || '',
        timeline: formData.timeline || '',
        occupancy: formData.occupancy || '',
        termsConsent: termsConsent,
        smsConsent: smsConsent,
        leadSource: 'Website - ClearEdge Home Buyers',
        trafficSource: trafficSource,
      }

      // Send to dynamic Zapier webhook based on traffic source
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(payload),
      })

      // With no-cors mode, we can't read the response, so assume success
      setIsSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
      // Still show success to user, log error for debugging
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value)
    setFormData((prev) => ({ ...prev, phone: formatted }))
  }

  if (isSubmitted) {
    return (
      <section id="lead-form" className="py-8 md:py-12 bg-[#FAF8F5] scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-[#008a29] flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-4">You&apos;re All Set!</h2>
          <p className="text-[#1a1f1a]/70 text-lg mb-6">
            Tyler will personally review your property and reach out within 24 hours with your no-obligation cash offer.
            Keep an eye on your phone and email.
          </p>
          <div className="bg-white rounded-xl p-6 max-w-md mx-auto border border-[#008a29]/10 shadow-sm">
            <p className="text-[#1a1f1a]/70 text-sm mb-2">Need to talk sooner?</p>
            <a href={`tel:${phoneTel}`} className="text-[#008a29] text-lg font-medium hover:underline">
              {phone}
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="lead-form" className="py-8 md:py-12 bg-[#FAF8F5] scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-6">
          <span className="inline-flex items-center gap-2 text-[#008a29] text-sm font-medium mb-4 px-4 py-2 bg-white rounded-full border border-[#008a29]/10 shadow-sm">
            <Shield className="w-4 h-4" />
            100% Free & No Obligation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a1f1a] mb-4 text-balance">
            Get Your Cash Offer Today
          </h2>
          <p className="text-[#1a1f1a]/70 text-lg max-w-xl mx-auto">
            Complete these 5 quick questions and we'll have your offer within 24 hours.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-6 relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#1a1f1a]/10">
            <div
              className="h-full bg-[#008a29] transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            />
          </div>

          {steps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= step.id
                    ? "bg-[#008a29] text-white shadow-lg shadow-[#008a29]/20"
                    : "bg-white text-[#1a1f1a]/40 border border-[#1a1f1a]/10"
                }`}
              >
                {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span
                className={`text-xs mt-2 hidden sm:block transition-colors font-medium ${
                  currentStep >= step.id ? "text-[#1a1f1a]" : "text-[#1a1f1a]/40"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-[#1a1f1a]/5 p-6 md:p-10 border border-[#1a1f1a]/5">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Address */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">Where is your property?</h3>
                  <p className="text-[#1a1f1a]/70 text-sm">
                    We use this to pull local market data for your personalized offer.
                  </p>
                </div>
                <div className="space-y-4">
                  {/* Street Address - Full Width */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                      autoComplete="street-address"
                      className={`w-full h-12 border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-[#008a29]/20 rounded-xl bg-[#FAF8F5]/50 ${showStep1Errors && !formData.address.trim() ? 'border-red-500' : ''}`}
                    />
                    {showStep1Errors && !formData.address.trim() && (
                      <p className="text-red-500 text-xs mt-1">Street address is required</p>
                    )}
                  </div>

                  {/* City (50%), State (25%), ZIP (25%) */}
                  <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-4 sm:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="city"
                        type="text"
                        placeholder="Scranton"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                        autoComplete="address-level2"
                        className={`w-full h-12 border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-[#008a29]/20 rounded-xl bg-[#FAF8F5]/50 ${showStep1Errors && !formData.city.trim() ? 'border-red-500' : ''}`}
                      />
                      {showStep1Errors && !formData.city.trim() && (
                        <p className="text-red-500 text-xs mt-1">City is required</p>
                      )}
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="state" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="state"
                        value={formData.state}
                        onChange={(e) => updateFormData("state", e.target.value)}
                        autoComplete="address-level1"
                        className="w-full h-12 px-3 border border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-[#008a29]/20 rounded-xl bg-[#FAF8F5]/50 text-[#1a1f1a]"
                      >
                        {US_STATES.map((state) => (
                          <option key={state.value} value={state.value}>
                            {state.value}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="zip" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                        ZIP <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="zip"
                        type="text"
                        placeholder="18501"
                        value={formData.zip}
                        onChange={(e) => updateFormData("zip", e.target.value.replace(/\D/g, '').slice(0, 5))}
                        autoComplete="postal-code"
                        inputMode="numeric"
                        maxLength={5}
                        className={`w-full h-12 border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-[#008a29]/20 rounded-xl bg-[#FAF8F5]/50 ${showStep1Errors && !/^\d{5}$/.test(formData.zip) ? 'border-red-500' : ''}`}
                      />
                      {showStep1Errors && !formData.zip.trim() && (
                        <p className="text-red-500 text-xs mt-1">ZIP code is required</p>
                      )}
                      {showStep1Errors && formData.zip.trim() && !/^\d{5}$/.test(formData.zip) && (
                        <p className="text-red-500 text-xs mt-1">Enter a valid 5-digit ZIP</p>
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
                  <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">What&apos;s your situation?</h3>
                  <p className="text-[#1a1f1a]/70 text-sm">This helps us understand how we can best serve you.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {situations.map((situation) => (
                    <button
                      key={situation}
                      type="button"
                      onClick={() => updateFormData("situation", situation)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.situation === situation
                          ? "border-[#008a29] bg-[#008a29]/5 text-[#1a1f1a] ring-2 ring-[#008a29]/20"
                          : "border-[#1a1f1a]/10 hover:border-[#008a29]/30 text-[#1a1f1a]/70 hover:text-[#1a1f1a] bg-[#FAF8F5]/50 hover:bg-[#FAF8F5]"
                      }`}
                    >
                      {situation}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Timeline */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">When do you need to sell?</h3>
                  <p className="text-[#1a1f1a]/70 text-sm">We can work with any timeline — you&apos;re in control.</p>
                </div>
                <div className="space-y-3">
                  {timelines.map((timeline) => (
                    <button
                      key={timeline}
                      type="button"
                      onClick={() => updateFormData("timeline", timeline)}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        formData.timeline === timeline
                          ? "border-[#008a29] bg-[#008a29]/5 text-[#1a1f1a] ring-2 ring-[#008a29]/20"
                          : "border-[#1a1f1a]/10 hover:border-[#008a29]/30 text-[#1a1f1a]/70 hover:text-[#1a1f1a] bg-[#FAF8F5]/50 hover:bg-[#FAF8F5]"
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
                  <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">Who lives at the property?</h3>
                  <p className="text-[#1a1f1a]/70 text-sm">This helps us plan the closing process smoothly.</p>
                </div>
                <div className="space-y-3">
                  {occupancies.map((occupancy) => (
                    <button
                      key={occupancy}
                      type="button"
                      onClick={() => updateFormData("occupancy", occupancy)}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        formData.occupancy === occupancy
                          ? "border-[#008a29] bg-[#008a29]/5 text-[#1a1f1a] ring-2 ring-[#008a29]/20"
                          : "border-[#1a1f1a]/10 hover:border-[#008a29]/30 text-[#1a1f1a]/70 hover:text-[#1a1f1a] bg-[#FAF8F5]/50 hover:bg-[#FAF8F5]"
                      }`}
                    >
                      {occupancy}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Contact */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">Almost there! How can we reach you?</h3>
                  <p className="text-[#1a1f1a]/70 text-sm">
                    We&apos;ll be in touch soon regarding your offer.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      autoComplete="given-name"
                      className="h-12 border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-[#008a29]/20 rounded-xl bg-[#FAF8F5]/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      autoComplete="family-name"
                      className="h-12 border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-[#008a29]/20 rounded-xl bg-[#FAF8F5]/50"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(610) 555-0123"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    autoComplete="tel"
                    className="h-12 border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-[#008a29]/20 rounded-xl bg-[#FAF8F5]/50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    autoComplete="email"
                    className="h-12 border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-[#008a29]/20 rounded-xl bg-[#FAF8F5]/50"
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-start gap-4 mt-8 pt-6 border-t border-[#1a1f1a]/5">
              {currentStep === 1 ? (
                <div className="flex-1 max-w-[70%] space-y-3">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsConsent}
                      onChange={(e) => setTermsConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#008a29] focus:ring-[#008a29] flex-shrink-0"
                    />
                    <span className="text-xs text-gray-500 leading-tight">
                      I agree to the <Link href="/terms" className="underline hover:text-[#008a29]">Terms & Conditions</Link> and <Link href="/privacy-policy" className="underline hover:text-[#008a29]">Privacy Policy</Link>.
                    </span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#008a29] focus:ring-[#008a29] flex-shrink-0"
                    />
                    <span className="text-xs text-gray-500 leading-tight">
                      I agree to receive transactional or conversational communications from ClearEdge Home Buyers via text messages, phone calls, and emails related to my real estate inquiry, such as property details, responses, and appointment confirmations. Message frequency varies. Reply STOP to opt out. Reply HELP for help. Msg & data rates may apply. Your information is secure and will not be sold or shared with third parties or affiliates for promotional purposes.
                    </span>
                  </label>
                </div>
              ) : currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex items-center gap-2 h-12 px-6 border-[#1a1f1a]/10 text-[#1a1f1a] hover:bg-[#FAF8F5] bg-transparent rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className="bg-[#008a29] text-white hover:bg-[#007a24] disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2 h-12 px-8 rounded-full shadow-lg shadow-[#008a29]/20 disabled:shadow-none flex-shrink-0"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || !isStepValid(5)}
                  className="bg-[#008a29] text-white hover:bg-[#007a24] disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2 h-12 px-8 rounded-full shadow-lg shadow-[#008a29]/20 disabled:shadow-none"
                >
                  {isSubmitting ? "Submitting..." : "Get My Cash Offer"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-6 text-[#1a1f1a]/70 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#008a29]" />
            <span>Your info is 100% secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#008a29]" />
            <span>Response within 24 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#008a29]" />
            <span>No obligation to accept</span>
          </div>
        </div>
      </div>
    </section>
  )
}
