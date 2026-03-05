"use client"

import { useState } from 'react'
import { useTrafficSource, clearSMSAttribution } from './TrafficSourceProvider'

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

export function SoftLeadForm() {
  const { webhook, trafficSource, utmParams, landingPage, phone, phoneTel } = useTrafficSource()
  const [name, setName] = useState('')
  const [phoneValue, setPhoneValue] = useState('')
  const [address, setAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const phoneDigits = extractPhoneDigits(phoneValue)
  const isValid = name.trim().length > 0 && phoneDigits.length === 10 && address.trim().length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || isSubmitting) return

    setIsSubmitting(true)
    setError('')

    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: `+1${phoneDigits}`,
          address: address.trim(),
          trafficSource,
          landingPage,
          ...utmParams,
          formType: 'SMS Soft Lead Form',
          submittedAt: new Date().toISOString(),
        }),
      })

      // GA4 generate_lead event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'Lead',
          event_label: 'SMS Soft Lead Form',
          page_path: window.location.pathname,
        })
      }

      clearSMSAttribution()
      setIsSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="sms-lead-form" className="py-16 bg-surface-cream scroll-mt-8">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 border border-ce-green/20 shadow-lg">
            <div className="w-16 h-16 bg-ce-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-ce-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-medium text-ce-ink mb-3">We got your info!</h3>
            <p className="text-ce-ink/70 mb-6">
              Someone from our team will reach out within a few hours. If you&apos;d rather not wait, give us a call:
            </p>
            <a
              href={phoneTel}
              className="inline-flex items-center justify-center gap-2 bg-ce-green text-white px-8 py-4 rounded-full font-medium hover:bg-ce-green-hover transition-all shadow-lg"
            >
              Call {phone}
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="sms-lead-form" className="py-16 bg-surface-cream scroll-mt-8">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-ce-ink mb-3">
            Get Your Real Cash Offer
          </h2>
          <p className="text-ce-ink/60">
            Want to see what we&apos;d actually offer? No obligation, no spam.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 border border-ce-ink/5 shadow-lg space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-ce-ink mb-1.5">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First and last name"
              className="w-full px-4 py-3 rounded-xl border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none transition-all text-base bg-white"
              autoComplete="name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-ce-ink mb-1.5">Phone Number</label>
            <input
              type="tel"
              value={phoneValue}
              onChange={(e) => setPhoneValue(formatPhoneNumber(e.target.value))}
              placeholder="+1 (570) 555-1234"
              className="w-full px-4 py-3 rounded-xl border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none transition-all text-base bg-white"
              autoComplete="tel"
            />
          </div>

          {/* Property Address */}
          <div>
            <label className="block text-sm font-medium text-ce-ink mb-1.5">Property Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, Scranton, PA"
              className="w-full px-4 py-3 rounded-xl border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none transition-all text-base bg-white"
              autoComplete="street-address"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full py-4 bg-ce-green hover:bg-ce-green-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-full shadow-lg shadow-green transition-all hover:shadow-xl hover:shadow-green hover:-translate-y-0.5"
          >
            {isSubmitting ? 'Sending...' : 'Get My Cash Offer'}
          </button>

          <p className="text-xs text-ce-ink/40 text-center">
            By submitting, you agree to receive a call or text about your property. No obligation.
          </p>
        </form>
      </div>
    </section>
  )
}
