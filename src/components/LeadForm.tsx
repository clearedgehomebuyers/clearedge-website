'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { useTrafficSource } from './TrafficSourceProvider'

interface LeadFormProps {
  id?: string
  heading?: string
  subheading?: string
  buttonText?: string
}

// HubSpot configuration
const HUBSPOT_PORTAL_ID = '50832074'
const HUBSPOT_FORM_ID = 'c1592c03-4f8c-42c1-8b4f-f1b64733f29d'

// US States for dropdown
const US_STATES = [
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
  { value: 'PA', label: 'Pennsylvania' },
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

export function LeadForm({
  id,
  heading = 'Get Your Cash Offer',
  subheading = 'No obligation • No fees • Response in 24 hours',
  buttonText = 'Get My Cash Offer',
}: LeadFormProps) {
  const { phone } = useTrafficSource()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'PA',
    zip: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear email error when user starts typing
    if (name === 'email' && emailError) setEmailError('')
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formatted }))
    // Clear error when user starts typing
    if (phoneError) setPhoneError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate phone number has 10 digits
    const phoneDigits = getPhoneDigits(formData.phone)
    if (phoneDigits.length < 10) {
      setPhoneError('Please enter a valid 10-digit phone number')
      return
    }

    // Validate email
    if (!formData.email.trim()) {
      setEmailError('Email is required')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Build HubSpot form submission payload
      const hutk = getHubspotCookie()
      const pageUri = typeof window !== 'undefined' ? window.location.href : ''
      const pageName = typeof document !== 'undefined' ? document.title : ''

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

      // Debug: Log the payload being sent
      console.log('HubSpot submission payload:', JSON.stringify(hubspotPayload, null, 2))
      console.log('Submitting to:', `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`)

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hubspotPayload),
        }
      )

      // Debug: Log response details
      console.log('HubSpot response status:', response.status, response.statusText)

      const responseText = await response.text()
      console.log('HubSpot response body:', responseText)

      if (!response.ok) {
        // Try to parse as JSON for structured error info
        let errorData = {}
        try {
          errorData = JSON.parse(responseText)
        } catch {
          errorData = { rawResponse: responseText }
        }
        console.error('HubSpot submission error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        })
        throw new Error(`Submission failed: ${response.status} ${response.statusText}`)
      }

      setSubmitStatus('success')

      // Track GA4 conversion event
      window.gtag?.('event', 'generate_lead', {
        event_category: 'Lead Form',
        event_label: 'HubSpot Lead Form',
        value: 1
      })

      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: 'PA',
        zip: '',
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div id={id} className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-[#008a29]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-[#008a29]" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h3>
          <p className="text-slate-600">
            We&apos;ll contact you within 24 hours with your cash offer.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div id={id} className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">{heading}</h2>
        <p className="text-slate-500">{subheading}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: First Name, Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#008a29] focus:ring-4 focus:ring-[#008a29]/10 outline-none transition-all text-gray-900 placeholder:text-gray-500"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#008a29] focus:ring-4 focus:ring-[#008a29]/10 outline-none transition-all text-gray-900 placeholder:text-gray-500"
              placeholder="Smith"
            />
          </div>
        </div>

        {/* Row 2: Phone, Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
              className={`w-full px-4 py-3 rounded-xl border-2 ${phoneError ? 'border-red-400' : 'border-slate-200'} focus:border-[#008a29] focus:ring-4 focus:ring-[#008a29]/10 outline-none transition-all text-gray-900 placeholder:text-gray-500`}
              placeholder="(610) 555-0123"
            />
            {phoneError && (
              <p className="text-red-500 text-sm mt-1">{phoneError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-xl border-2 ${emailError ? 'border-red-400' : 'border-slate-200'} focus:border-[#008a29] focus:ring-4 focus:ring-[#008a29]/10 outline-none transition-all text-gray-900 placeholder:text-gray-500`}
              placeholder="john@example.com"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
        </div>

        {/* Row 3: Street Address */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#008a29] focus:ring-4 focus:ring-[#008a29]/10 outline-none transition-all text-gray-900 placeholder:text-gray-500"
            placeholder="123 Main Street"
          />
        </div>

        {/* Row 4: City, State, Zip */}
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#008a29] focus:ring-4 focus:ring-[#008a29]/10 outline-none transition-all text-gray-900 placeholder:text-gray-500"
              placeholder="Scranton"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-semibold text-slate-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              aria-label="State"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#008a29] focus:ring-4 focus:ring-[#008a29]/10 outline-none transition-all bg-white text-gray-900"
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
              Zip <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              pattern="[0-9]{5}"
              maxLength={5}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#008a29] focus:ring-4 focus:ring-[#008a29]/10 outline-none transition-all text-gray-900 placeholder:text-gray-500"
              placeholder="18501"
            />
          </div>
        </div>

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
            Something went wrong. Please try again or call us at {phone}.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-gradient-to-r from-[#008a29] to-[#00d940] hover:from-[#007a24] hover:to-[#008a29] disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 inline mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              {buttonText} <ArrowRight className="w-5 h-5 inline ml-2" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
