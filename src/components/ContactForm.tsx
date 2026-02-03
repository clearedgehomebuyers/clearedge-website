'use client'

import { useState } from 'react'
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
  const { webhook, trafficSource, phone: dynamicPhone, phoneTel } = useTrafficSource()
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

      // Track GA4 conversion event
      window.gtag?.('event', 'generate_lead', {
        event_category: 'Lead Form',
        event_label: 'Contact Form',
        value: 1
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      {/* Left Column - Simple Lead Form */}
      <div>
        <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#1a1f1a] mb-6">Request Your Cash Offer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#1a1f1a]/70 mb-1">First Name</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-3 border border-[#1a1f1a]/10 rounded-xl focus:ring-2 focus:ring-[#008a29] focus:border-[#008a29] bg-white" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#1a1f1a]/70 mb-1">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-3 border border-[#1a1f1a]/10 rounded-xl focus:ring-2 focus:ring-[#008a29] focus:border-[#008a29] bg-white" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1a1f1a]/70 mb-1">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-[#1a1f1a]/10 rounded-xl focus:ring-2 focus:ring-[#008a29] focus:border-[#008a29] bg-white" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#1a1f1a]/70 mb-1">Phone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handlePhoneChange} required className="w-full px-4 py-3 border border-[#1a1f1a]/10 rounded-xl focus:ring-2 focus:ring-[#008a29] focus:border-[#008a29] bg-white" />
            {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#1a1f1a]/70 mb-1">Tell us about your property (optional)</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 border border-[#1a1f1a]/10 rounded-xl focus:ring-2 focus:ring-[#008a29] focus:border-[#008a29] bg-white" />
          </div>
          <div className="space-y-3">
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
                I am 18 years or older and agree to receive SMS messages from ClearEdge Properties LLC including property offer updates, appointment reminders, follow-up communications, and transaction-related notifications. Message frequency varies. Message and data rates may apply. Reply STOP to opt-out, HELP for help.
              </span>
            </label>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-[#008a29] hover:bg-[#007a24] text-white font-semibold py-4 px-6 rounded-full transition-colors disabled:opacity-50 shadow-lg shadow-[#008a29]/20">
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </span>
            ) : 'Get My Cash Offer'}
          </button>
          {submitStatus === 'success' && (<p className="text-[#008a29] text-center font-medium">Thanks! Tyler will be in touch within 24 hours.</p>)}
          {submitStatus === 'error' && (<p className="text-red-600 text-center">Something went wrong. Please call {dynamicPhone} instead.</p>)}
        </form>
      </div>

      {/* Right Column - Contact Widgets */}
      <div className="space-y-6">
        {/* Phone Widget */}
        <a href={`tel:${phoneTel}`} className="block bg-white rounded-2xl p-6 border border-[#1a1f1a]/5 hover:border-[#008a29]/30 hover:shadow-lg transition-all group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#008a29]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-[#008a29]" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#1a1f1a] mb-1">Call Tyler Directly</h3>
              <p className="text-2xl font-bold text-[#008a29]">{dynamicPhone}</p>
              <p className="text-[#1a1f1a]/70 text-sm mt-1">Available 7 days a week</p>
            </div>
          </div>
        </a>

        {/* Quick Response Widget */}
        <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#008a29]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-[#008a29]" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#1a1f1a] mb-1">Quick Response</h3>
              <p className="text-[#1a1f1a]/70">Cash offer within 24 hours of your inquiry. We respond to every message personally.</p>
            </div>
          </div>
        </div>

        {/* No Obligation Widget */}
        <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#008a29]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-[#008a29]" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#1a1f1a] mb-1">No Obligation</h3>
              <p className="text-[#1a1f1a]/70">Free consultation, no pressure. Get information and explore your options with zero commitment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
