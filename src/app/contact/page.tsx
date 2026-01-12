'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Phone, Mail, Clock, MapPin, CheckCircle, ChevronDown, ArrowRight, Loader2, MessageSquare } from 'lucide-react'

// HubSpot configuration
const HUBSPOT_PORTAL_ID = '50832074'
const HUBSPOT_FORM_ID = '2224a427-5b9b-406b-8253-c97ba2d4e39d'

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

export default function ContactPage() {
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

    // Validate phone number has 10 digits
    const phoneDigits = getPhoneDigits(formData.phone)
    if (phoneDigits.length < 10) {
      setPhoneError('Please enter a valid 10-digit phone number')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Build HubSpot form submission payload
      const hutk = getHubspotCookie()
      const pageUri = typeof window !== 'undefined' ? window.location.href : ''
      const pageName = typeof document !== 'undefined' ? document.title : ''

      const hubspotPayload = {
        submittedAt: Date.now(),
        fields: [
          { objectTypeId: '0-1', name: 'firstname', value: formData.firstName },
          { objectTypeId: '0-1', name: 'lastname', value: formData.lastName },
          { objectTypeId: '0-1', name: 'email', value: formData.email },
          { objectTypeId: '0-1', name: 'phone', value: formData.phone },
          { objectTypeId: '0-1', name: 'message', value: formData.message },
        ],
        context: {
          pageUri,
          pageName,
          ...(hutk && { hutk }),
        },
      }

      // Debug: Log the payload being sent
      console.log('HubSpot submission payload:', JSON.stringify(hubspotPayload, null, 2))

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
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqs = [
    {
      q: 'How quickly will you respond to my inquiry?',
      a: 'We typically respond within a few hours during business hours, and always within 24 hours. For urgent matters, call us directly at (570) 904-2059.',
    },
    {
      q: 'What information should I have ready when I call?',
      a: 'It helps to know your property address, general condition of the home, and your ideal timeline for selling. But don\'t worry if you don\'t have all the details — we can discuss everything during our conversation.',
    },
    {
      q: 'Do you charge for consultations or property evaluations?',
      a: 'Never. Our consultations, property evaluations, and cash offers are completely free with no obligation. You have nothing to lose by reaching out.',
    },
    {
      q: 'Can I just get information without committing to sell?',
      a: 'Absolutely. We\'re happy to answer your questions, explain our process, and provide information even if you\'re just exploring your options. No pressure, ever.',
    },
  ]

  const serviceAreas = [
    { region: 'Lackawanna County', cities: ['Scranton', 'Dunmore', 'Carbondale', 'Old Forge', 'Throop', 'Clarks Summit'] },
    { region: 'Luzerne County', cities: ['Wilkes-Barre', 'Hazleton', 'Pittston', 'Kingston', 'Nanticoke', 'Plymouth'] },
    { region: 'Lehigh Valley', cities: ['Allentown', 'Bethlehem', 'Easton', 'Whitehall', 'Emmaus'] },
    { region: 'Other Areas', cities: ['Reading', 'Stroudsburg', 'Honesdale', 'Bloomsburg', 'Pottsville'] },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ClearEdge Home Buyers',
    telephone: '+1-570-904-2059',
    url: 'https://www.clearedgehomebuyers.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Scranton',
      addressRegion: 'PA',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Scranton', containedInPlace: { '@type': 'State', name: 'Pennsylvania' } },
      { '@type': 'City', name: 'Wilkes-Barre', containedInPlace: { '@type': 'State', name: 'Pennsylvania' } },
      { '@type': 'City', name: 'Allentown', containedInPlace: { '@type': 'State', name: 'Pennsylvania' } },
      { '@type': 'City', name: 'Bethlehem', containedInPlace: { '@type': 'State', name: 'Pennsylvania' } },
      { '@type': 'City', name: 'Reading', containedInPlace: { '@type': 'State', name: 'Pennsylvania' } },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <main>
        <Header currentPage="/contact" />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-28 pb-16 lg:pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Let&apos;s Talk About Your Property
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Get a no-obligation cash offer in 24 hours. Call Tyler directly or fill out the form below.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Phone */}
            <a href="tel:+15709042059" className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-amber-300 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">Call Tyler Directly</h3>
              <p className="text-2xl font-bold text-amber-600">(570) 904-2059</p>
            </a>

            {/* Quick Response */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">Quick Response</h3>
              <p className="text-slate-600">Cash offer within 24 hours</p>
            </div>

            {/* No Obligation */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">No Obligation</h3>
              <p className="text-slate-600">Free consultation, no pressure</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM & SERVICE AREAS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form Column */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Request Your Cash Offer</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Tell us about your property (optional)</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50">
                  {isSubmitting ? 'Sending...' : 'Get My Cash Offer'}
                </button>
                {submitStatus === 'success' && (<p className="text-green-600 text-center">Thanks! Tyler will be in touch within 24 hours.</p>)}
                {submitStatus === 'error' && (<p className="text-red-600 text-center">Something went wrong. Please call (570) 904-2059 instead.</p>)}
              </form>
            </div>
            {/* Service Areas Column */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Areas We Serve</h2>
              <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-3xl font-bold text-amber-600">200+</p><p className="text-sm text-slate-600">Homeowners Helped</p></div>
                  <div><p className="text-3xl font-bold text-amber-600">2016</p><p className="text-sm text-slate-600">Founded</p></div>
                  <div><p className="text-3xl font-bold text-amber-600">21</p><p className="text-sm text-slate-600">Communities</p></div>
                </div>
              </div>
              <div className="space-y-4">
                <div><h3 className="font-semibold text-slate-900 mb-2">NEPA</h3><p className="text-slate-600">Scranton, Wilkes-Barre, Hazleton, and surrounding areas</p></div>
                <div><h3 className="font-semibold text-slate-900 mb-2">Lehigh Valley</h3><p className="text-slate-600">Allentown, Bethlehem, Easton, Reading</p></div>
                <div><h3 className="font-semibold text-slate-900 mb-2">Poconos</h3><p className="text-slate-600">Stroudsburg, East Stroudsburg, and mountain communities</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Questions About Reaching Us</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-slate-200">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-slate-800">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-amber-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-slate-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-amber-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Prefer to Talk on the Phone?</h2>
          <p className="text-xl text-slate-800 mb-8">
            Skip the form. Call Tyler directly.
          </p>
          <a
            href="tel:+15709042059"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
          >
            <Phone className="w-6 h-6" />
            <span>Call (570) 904-2059</span>
          </a>
        </div>
      </section>

      {/* Closing Anchor */}
      <section className="py-8 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-slate-600">
            ClearEdge Home Buyers is here when you're ready. No pressure, no obligation — just an honest conversation about your options.
          </p>
        </div>
      </section>

        <Footer />
      </main>
    </>
  )
}
