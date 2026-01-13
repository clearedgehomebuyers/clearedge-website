'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, MapPin, Clock, Home, User } from 'lucide-react'

/**
 * MultiStepLeadForm - 5-step progressive lead capture form
 *
 * Steps:
 * 1. Property Location (address)
 * 2. Situation (why selling)
 * 3. Timeline (how soon)
 * 4. Occupancy (who lives there)
 * 5. Contact Info (name, phone, email)
 */

// HubSpot configuration
const HUBSPOT_PORTAL_ID = '50832074'
const HUBSPOT_FORM_ID = 'c1592c03-4f8c-42c1-8b4f-f1b64733f29d'

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

// Step 2: Situation options
const SITUATION_OPTIONS = [
  { value: 'foreclosure', label: 'Facing Foreclosure', description: 'Behind on payments or received notice' },
  { value: 'inherited', label: 'Inherited Property', description: 'Received house through estate or probate' },
  { value: 'divorce', label: 'Divorce', description: 'Need to sell as part of separation' },
  { value: 'relocation', label: 'Job Relocation', description: 'Moving for work opportunity' },
  { value: 'repairs', label: 'Major Repairs Needed', description: 'House needs work I can\'t afford' },
  { value: 'liens', label: 'Tax Liens / Code Violations', description: 'Outstanding liens or municipal issues' },
  { value: 'landlord', label: 'Tired Landlord', description: 'Done managing rental property' },
  { value: 'vacant', label: 'Vacant Property', description: 'Empty house costing money' },
  { value: 'other', label: 'Other Situation', description: 'Different reason for selling' },
]

// Step 3: Timeline options
const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'ASAP', description: 'As quickly as possible' },
  { value: '30days', label: 'Within 30 Days', description: 'Ready to move soon' },
  { value: '60days', label: '1-2 Months', description: 'Some flexibility' },
  { value: 'exploring', label: 'Just Exploring', description: 'Seeing my options' },
]

// Step 4: Occupancy options
const OCCUPANCY_OPTIONS = [
  { value: 'owner', label: 'I Live Here', description: 'Owner-occupied' },
  { value: 'tenant', label: 'Tenant Occupied', description: 'Renter currently living there' },
  { value: 'vacant', label: 'Vacant', description: 'No one living there' },
]

// Helper to get HubSpot tracking cookie
function getHubspotCookie(): string | null {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'hubspotutk') {
      return value
    }
  }
  return null
}

// Format phone number as user types
function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length === 0) return ''
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

// Get raw digits for validation
function getPhoneDigits(value: string): string {
  return value.replace(/\D/g, '').slice(0, 10)
}

interface FormData {
  // Step 1: Property Location
  address: string
  city: string
  state: string
  zip: string
  // Step 2: Situation
  situation: string
  // Step 3: Timeline
  timeline: string
  // Step 4: Occupancy
  occupancy: string
  // Step 5: Contact
  firstName: string
  lastName: string
  phone: string
  email: string
}

export function MultiStepLeadForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    address: '',
    city: '',
    state: 'PA',
    zip: '',
    situation: '',
    timeline: '',
    occupancy: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const totalSteps = 5

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData(prev => ({ ...prev, phone: formatted }))
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }))
    }
  }

  const handleOptionSelect = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Auto-advance after selection for single-select steps
    setTimeout(() => {
      if (step < totalSteps) {
        setStep(step + 1)
      }
    }, 200)
  }

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Partial<FormData> = {}

    switch (stepNumber) {
      case 1:
        if (!formData.address.trim()) newErrors.address = 'Address is required'
        if (!formData.city.trim()) newErrors.city = 'City is required'
        if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required'
        else if (!/^\d{5}$/.test(formData.zip)) newErrors.zip = 'Enter a valid 5-digit ZIP'
        break
      case 2:
        if (!formData.situation) newErrors.situation = 'Please select your situation'
        break
      case 3:
        if (!formData.timeline) newErrors.timeline = 'Please select a timeline'
        break
      case 4:
        if (!formData.occupancy) newErrors.occupancy = 'Please select occupancy status'
        break
      case 5:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
        else if (getPhoneDigits(formData.phone).length < 10) newErrors.phone = 'Enter a valid 10-digit phone'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email address'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(5)) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const hutk = getHubspotCookie()
      const pageUri = typeof window !== 'undefined' ? window.location.href : ''
      const pageName = typeof document !== 'undefined' ? document.title : ''

      // Build full address string
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`

      const fields = [
        { objectTypeId: '0-1', name: 'firstname', value: formData.firstName },
        { objectTypeId: '0-1', name: 'lastname', value: formData.lastName },
        { objectTypeId: '0-1', name: 'phone', value: formData.phone },
        { objectTypeId: '0-1', name: 'email', value: formData.email },
        { objectTypeId: '0-1', name: 'address', value: formData.address },
        { objectTypeId: '0-1', name: 'city', value: formData.city },
        { objectTypeId: '0-1', name: 'state', value: formData.state },
        { objectTypeId: '0-1', name: 'zip', value: formData.zip },
      ]

      const hubspotPayload = {
        submittedAt: Date.now(),
        fields,
        context: {
          pageUri,
          pageName,
          ...(hutk && { hutk }),
        },
      }

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hubspotPayload),
        }
      )

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.status}`)
      }

      setSubmitStatus('success')
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-[#e6f7eb] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-[#00b332]" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h3>
          <p className="text-slate-600 mb-4">
            We&apos;ve received your information and will contact you within 24 hours with your cash offer.
          </p>
          <p className="text-slate-500 text-sm">
            Questions? Call Tyler directly at{' '}
            <a href="tel:5709042059" className="text-[#00b332] font-semibold">(570) 904-2059</a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">Step {step} of {totalSteps}</span>
          <span className="text-sm text-slate-500">{Math.round((step / totalSteps) * 100)}% complete</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00b332] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Property Location */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#e6f7eb] rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-[#00b332]" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Where is the property?</h2>
              <p className="text-slate-500 text-sm mt-1">We&apos;ll use this to prepare your cash offer</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                autoComplete="street-address"
                className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.address ? 'border-red-400' : 'border-slate-200'} focus:border-[#00b332] focus:ring-4 focus:ring-[#00b332]/10 outline-none transition-all text-slate-900 placeholder:text-slate-400`}
                placeholder="123 Main Street"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  autoComplete="address-level2"
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.city ? 'border-red-400' : 'border-slate-200'} focus:border-[#00b332] focus:ring-4 focus:ring-[#00b332]/10 outline-none transition-all text-slate-900 placeholder:text-slate-400`}
                  placeholder="Scranton"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  autoComplete="address-level1"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-[#00b332] focus:ring-4 focus:ring-[#00b332]/10 outline-none transition-all bg-white text-slate-900"
                >
                  {US_STATES.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  autoComplete="postal-code"
                  maxLength={5}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.zip ? 'border-red-400' : 'border-slate-200'} focus:border-[#00b332] focus:ring-4 focus:ring-[#00b332]/10 outline-none transition-all text-slate-900 placeholder:text-slate-400`}
                  placeholder="18501"
                />
                {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Situation */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#e6f7eb] rounded-full flex items-center justify-center mx-auto mb-3">
                <Home className="w-6 h-6 text-[#00b332]" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">What&apos;s your situation?</h2>
              <p className="text-slate-500 text-sm mt-1">This helps us understand how to best help you</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {SITUATION_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionSelect('situation', option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.situation === option.value
                      ? 'border-[#00b332] bg-[#e6f7eb]'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-semibold text-slate-800 block text-sm">{option.label}</span>
                  <span className="text-xs text-slate-500">{option.description}</span>
                </button>
              ))}
            </div>
            {errors.situation && <p className="text-red-500 text-sm mt-1">{errors.situation}</p>}
          </div>
        )}

        {/* Step 3: Timeline */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#e6f7eb] rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-[#00b332]" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">How soon do you need to sell?</h2>
              <p className="text-slate-500 text-sm mt-1">We can work with any timeline</p>
            </div>

            <div className="grid gap-3">
              {TIMELINE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionSelect('timeline', option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.timeline === option.value
                      ? 'border-[#00b332] bg-[#e6f7eb]'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-semibold text-slate-800 block">{option.label}</span>
                  <span className="text-sm text-slate-500">{option.description}</span>
                </button>
              ))}
            </div>
            {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
          </div>
        )}

        {/* Step 4: Occupancy */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#e6f7eb] rounded-full flex items-center justify-center mx-auto mb-3">
                <Home className="w-6 h-6 text-[#00b332]" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Who lives at the property?</h2>
              <p className="text-slate-500 text-sm mt-1">We buy occupied and vacant properties</p>
            </div>

            <div className="grid gap-3">
              {OCCUPANCY_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionSelect('occupancy', option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.occupancy === option.value
                      ? 'border-[#00b332] bg-[#e6f7eb]'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-semibold text-slate-800 block">{option.label}</span>
                  <span className="text-sm text-slate-500">{option.description}</span>
                </button>
              ))}
            </div>
            {errors.occupancy && <p className="text-red-500 text-sm mt-1">{errors.occupancy}</p>}
          </div>
        )}

        {/* Step 5: Contact Info */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#e6f7eb] rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-[#00b332]" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Almost done! How can we reach you?</h2>
              <p className="text-slate-500 text-sm mt-1">We&apos;ll send your cash offer within 24 hours</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  autoComplete="given-name"
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.firstName ? 'border-red-400' : 'border-slate-200'} focus:border-[#00b332] focus:ring-4 focus:ring-[#00b332]/10 outline-none transition-all text-slate-900 placeholder:text-slate-400`}
                  placeholder="John"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.lastName ? 'border-red-400' : 'border-slate-200'} focus:border-[#00b332] focus:ring-4 focus:ring-[#00b332]/10 outline-none transition-all text-slate-900 placeholder:text-slate-400`}
                  placeholder="Smith"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                autoComplete="tel"
                className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.phone ? 'border-red-400' : 'border-slate-200'} focus:border-[#00b332] focus:ring-4 focus:ring-[#00b332]/10 outline-none transition-all text-slate-900 placeholder:text-slate-400`}
                placeholder="(570) 555-0123"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.email ? 'border-red-400' : 'border-slate-200'} focus:border-[#00b332] focus:ring-4 focus:ring-[#00b332]/10 outline-none transition-all text-slate-900 placeholder:text-slate-400`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                Something went wrong. Please try again or call us at (570) 904-2059.
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 px-6 py-3.5 bg-[#00b332] hover:bg-[#009929] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3.5 bg-[#00b332] hover:bg-[#009929] disabled:bg-slate-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Get My Cash Offer
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>

      {/* Trust signals */}
      <div className="mt-6 pt-6 border-t border-slate-100">
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600">
          <span>No obligation</span>
          <span className="text-slate-300">•</span>
          <span>No fees</span>
          <span className="text-slate-300">•</span>
          <span>Response in 24 hours</span>
        </div>
      </div>
    </div>
  )
}
