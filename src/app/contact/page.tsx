'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

  return (
    <main>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="ClearEdge Home Buyers" width={180} height={40} className="h-10 w-auto" priority />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">Home</Link>
              <Link href="/about" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">About</Link>
              <Link href="/how-it-works" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">How It Works</Link>
              <Link href="/contact" className="text-sm font-semibold text-[#0d9488]">Contact</Link>
            </div>

            <div className="hidden md:flex items-center space-x-5">
              <a href="tel:5709042059" className="flex items-center space-x-2 text-slate-700 hover:text-[#0d9488] transition-colors">
                <div className="w-10 h-10 bg-[#0d9488]/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#0d9488]" />
                </div>
                <span className="font-bold">(570) 904-2059</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0d9488]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#14b8a6]/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center space-x-2 bg-[#0d9488]/20 backdrop-blur-sm border border-[#0d9488]/30 rounded-full px-4 py-2 mb-8">
            <MessageSquare className="w-4 h-4 text-[#14b8a6]" />
            <span className="text-sm font-medium text-[#14b8a6]">Get in Touch</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Contact
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] via-[#0d9488] to-[#14b8a6]"> ClearEdge</span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Ready to sell your house fast? Have questions? We&apos;re here to help. Reach out by phone, or fill out the form below and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Phone */}
            <a href="tel:5709042059" className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-[#0d9488]/30 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0d9488] transition-colors">
                <Phone className="w-7 h-7 text-[#0d9488] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-2">Call Us</h3>
              <p className="text-2xl font-bold text-[#0d9488] mb-1">(570) 904-2059</p>
              <p className="text-slate-500 text-sm">Speak directly with our team</p>
            </a>

            {/* Hours */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="w-14 h-14 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-[#0d9488]" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-2">Available 24/7</h3>
              <p className="text-lg font-semibold text-slate-700 mb-1">Always Here for You</p>
              <p className="text-slate-500 text-sm">We respond to inquiries around the clock</p>
            </div>

            {/* Response Time */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="w-14 h-14 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 text-[#0d9488]" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-2">Quick Response</h3>
              <p className="text-lg font-semibold text-slate-700 mb-1">Within 24 Hours</p>
              <p className="text-slate-500 text-sm">Usually much faster during business hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Service Areas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Send Us a Message</h2>

              {submitStatus === 'success' ? (
                <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#0d9488]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-[#0d9488]" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                    <p className="text-slate-600">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      required
                      className={`w-full px-4 py-3.5 rounded-xl border-2 ${phoneError ? 'border-red-400' : 'border-slate-200'} focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all`}
                      placeholder="(570) 555-0123"
                    />
                    {phoneError && (
                      <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all resize-none"
                      placeholder="Tell us about your property or ask any questions..."
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                      Something went wrong. Please try again or call us at (570) 904-2059.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 inline mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <ArrowRight className="w-5 h-5 inline ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Service Areas */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Our Service Areas</h2>
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#0d9488]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">Eastern Pennsylvania</h3>
                    <p className="text-slate-500 text-sm">We buy houses throughout the region</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {serviceAreas.map((area) => (
                    <div key={area.region}>
                      <h4 className="font-semibold text-slate-800 mb-2">{area.region}</h4>
                      <div className="flex flex-wrap gap-2">
                        {area.cities.map((city) => (
                          <span
                            key={city}
                            className="px-3 py-1 bg-white rounded-full text-sm text-slate-600 border border-slate-200"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-slate-600 text-sm">
                    Don&apos;t see your city? We likely serve your area too.{' '}
                    <a href="tel:5709042059" className="text-[#0d9488] font-semibold hover:underline">
                      Give us a call
                    </a>{' '}
                    to find out.
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                  <div className="text-2xl font-bold text-[#0d9488]">10+</div>
                  <div className="text-xs text-slate-500">Counties Served</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                  <div className="text-2xl font-bold text-[#0d9488]">24hr</div>
                  <div className="text-xs text-slate-500">Response Time</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                  <div className="text-2xl font-bold text-[#0d9488]">100+</div>
                  <div className="text-xs text-slate-500">Homes Bought</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#0d9488] rounded-full text-sm font-semibold mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Questions About Contacting Us</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-slate-200">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-slate-800">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
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
      <section className="py-16 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0d9488]/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prefer to Talk on the Phone?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Skip the form and speak directly with our team. We&apos;re available 24/7 to answer your questions.
          </p>
          <a
            href="tel:5709042059"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
          >
            <Phone className="w-6 h-6" />
            <span>(570) 904-2059</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/logo.png" alt="ClearEdge Home Buyers" width={180} height={40} className="h-10 w-auto" />
              </div>
              <p className="text-slate-400 leading-relaxed">We buy houses in any condition throughout Eastern Pennsylvania. Fair cash offers, fast closings, zero fees.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Service Areas</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/locations/scranton" className="hover:text-white transition-colors">Scranton, PA</Link></li>
                <li><Link href="/locations/wilkes-barre" className="hover:text-white transition-colors">Wilkes-Barre, PA</Link></li>
                <li><Link href="/locations/allentown" className="hover:text-white transition-colors">Allentown, PA</Link></li>
                <li><Link href="/locations/bethlehem" className="hover:text-white transition-colors">Bethlehem, PA</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Contact Us</h4>
              <a href="tel:5709042059" className="flex items-center space-x-3 text-slate-400 hover:text-[#14b8a6] transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">(570) 904-2059</span>
              </a>
              <p className="text-sm text-slate-400 mt-3">Available 24/7</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>&copy; 2026 ClearEdge Home Buyers. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
