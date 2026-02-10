'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Clock, CheckCircle, Loader2 } from 'lucide-react'
import { useTrafficSource } from './TrafficSourceProvider'

// Extract only the 10-digit phone number from any input
function extractPhoneDigits(value: string): string {
  const withoutPrefix = value.startsWith('+1 ') ? value.slice(3) : value
  let digits = withoutPrefix.replace(/\D/g, '')
  if (digits.length > 10 && digits.startsWith('1')) {
    digits = digits.slice(1)
  }
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

export function ContactForm() {
  const { webhook, trafficSource, utmParams, phone: dynamicPhone, phoneTel } = useTrafficSource()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [phoneError, setPhoneError] = useState('')
  const [termsConsent, setTermsConsent] = useState(false)
  const [smsConsent, setSmsConsent] = useState(false)

  // Track GA4 conversion when form is successfully submitted
  useEffect(() => {
    if (submitStatus === 'success' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'Lead Form',
        event_label: 'Contact Form',
        value: 1,
        traffic_source: trafficSource,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }, [submitStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formatted }))
    if (phoneError) setPhoneError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const phoneDigits = getPhoneDigits(formData.phone)
    if (phoneDigits.length < 10) {
      setPhoneError('Please enter a valid 10-digit phone number')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Build payload for Zapier/REsimpli
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        propertyAddress: '',
        city: '',
        state: '',
        zip: '',
        termsConsent: termsConsent,
        smsConsent: smsConsent,
        leadSource: 'Website - Contact Form',
        trafficSource: trafficSource,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_content: utmParams.utm_content,
        utm_term: utmParams.utm_term,
        notes: `CONTACT PAGE SUBMISSION - General inquiry. Message: ${formData.message || 'No message provided'}`,
      }

      // Send to dynamic Zapier webhook based on traffic source
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(payload),
      })

      // With no-cors mode, we can't read the response, so assume success
      setSubmitStatus('success')
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' })
      setTermsConsent(false)
      setSmsConsent(false)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Left Column - Simple Lead Form */}
      <div>
        <h2 className="font-serif text-2xl md:text-3xl font-medium text-ce-ink mb-6">Request Your Cash Offer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-ce-ink/70 mb-1">First Name</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required autoComplete="given-name" className="w-full px-4 py-3 border border-ce-ink/10 rounded-xl focus:ring-2 focus:ring-ce-green/20 focus:border-ce-green bg-white hover:border-ce-ink/20 transition-colors text-base" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-ce-ink/70 mb-1">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required autoComplete="family-name" className="w-full px-4 py-3 border border-ce-ink/10 rounded-xl focus:ring-2 focus:ring-ce-green/20 focus:border-ce-green bg-white hover:border-ce-ink/20 transition-colors text-base" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ce-ink/70 mb-1">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" inputMode="email" className="w-full px-4 py-3 border border-ce-ink/10 rounded-xl focus:ring-2 focus:ring-ce-green/20 focus:border-ce-green bg-white hover:border-ce-ink/20 transition-colors text-base" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-ce-ink/70 mb-1">Phone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handlePhoneChange} required autoComplete="tel" inputMode="tel" className="w-full px-4 py-3 border border-ce-ink/10 rounded-xl focus:ring-2 focus:ring-ce-green/20 focus:border-ce-green bg-white hover:border-ce-ink/20 transition-colors text-base" />
            {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ce-ink/70 mb-1">Tell us about your property (optional)</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 border border-ce-ink/10 rounded-xl focus:ring-2 focus:ring-ce-green/20 focus:border-ce-green bg-white hover:border-ce-ink/20 transition-colors text-base" />
          </div>
          <div className="space-y-3">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={termsConsent}
                onChange={(e) => setTermsConsent(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-gray-300 text-ce-green focus:ring-ce-green flex-shrink-0"
              />
              <span className="text-xs text-ce-ink/50 leading-tight">
                I agree to the <Link href="/terms" className="underline hover:text-ce-green">Terms & Conditions</Link> and <Link href="/privacy-policy" className="underline hover:text-ce-green">Privacy Policy</Link>.
              </span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-gray-300 text-ce-green focus:ring-ce-green flex-shrink-0"
              />
              <span className="text-xs text-ce-ink/50 leading-tight">
                I agree to receive transactional or conversational communications from ClearEdge Home Buyers via text messages, phone calls, and emails related to my real estate inquiry, such as property details, responses, and appointment confirmations. Message frequency varies. Reply STOP to opt out. Reply HELP for help. Msg & data rates may apply. Your information is secure and will not be sold or shared with third parties or affiliates for promotional purposes.
              </span>
            </label>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-ce-green hover:bg-ce-green-hover text-white font-semibold py-4 px-6 rounded-full transition-all disabled:opacity-50 shadow-green hover:shadow-green-lg hover:-translate-y-0.5 active:translate-y-0">
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </span>
            ) : 'Get My Cash Offer'}
          </button>
          {submitStatus === 'success' && (<p className="text-ce-green text-center font-medium">Thanks! Tyler will be in touch within 24 hours.</p>)}
          {submitStatus === 'error' && (<p className="text-red-600 text-center">Something went wrong. Please call {dynamicPhone} instead.</p>)}
        </form>
      </div>

      {/* Right Column - Contact Widgets */}
      <div className="space-y-6">
        {/* Phone Widget */}
        <a href={`tel:${phoneTel}`} className="block bg-white rounded-2xl p-6 border border-ce-ink/5 hover:border-ce-green/30 hover:shadow-card-hover transition-all duration-300 group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-ce-blue-subtle rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-ce-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-ce-ink mb-1">Call Tyler Directly</h3>
              <p className="text-2xl font-bold text-ce-green">{dynamicPhone}</p>
              <p className="text-ce-ink/70 text-sm mt-1">Available 7 days a week</p>
            </div>
          </div>
        </a>

        {/* Quick Response Widget */}
        <div className="bg-white rounded-2xl p-6 border border-ce-ink/5 hover:shadow-card-hover transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-ce-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-ce-green" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-ce-ink mb-1">Quick Response</h3>
              <p className="text-ce-ink/70">Cash offer within 24 hours of your inquiry. We respond to every message personally.</p>
            </div>
          </div>
        </div>

        {/* No Obligation Widget */}
        <div className="bg-white rounded-2xl p-6 border border-ce-ink/5 hover:shadow-card-hover transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-ce-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-ce-green" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-ce-ink mb-1">No Obligation</h3>
              <p className="text-ce-ink/70">Free consultation, no pressure. Get information and explore your options with zero commitment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
