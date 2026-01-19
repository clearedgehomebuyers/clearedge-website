import type { Metadata } from 'next'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { V0FAQ } from '@/components/v0-faq'
import { ContactForm } from '@/components/ContactForm'
import { Users, Calendar, MapPin, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | Get Your Free Cash Offer',
  description: 'Contact ClearEdge Home Buyers for a free cash offer on your PA home. Call Tyler at (570) 904-2059 or fill out our form. Response within 24 hours.',
  openGraph: {
    title: 'Contact Us | Get Your Free Cash Offer | ClearEdge Home Buyers',
    description: 'Contact ClearEdge Home Buyers for a free cash offer on your PA home. Call Tyler at (570) 904-2059 or fill out our form.',
    url: 'https://www.clearedgehomebuyers.com/contact',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.clearedgehomebuyers.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClearEdge Home Buyers - Sell Your House Fast for Cash in Pennsylvania',
      },
    ],
  },
}

const faqs = [
  {
    question: 'How quickly will you respond to my inquiry?',
    answer: 'We typically respond within a few hours during business hours, and always within 24 hours. For urgent matters, call us directly at (570) 904-2059.',
  },
  {
    question: 'What information should I have ready when I call?',
    answer: 'It helps to know your property address, general condition of the home, and your ideal timeline for selling. But don\'t worry if you don\'t have all the details — we can discuss everything during our conversation.',
  },
  {
    question: 'Do you charge for consultations or property evaluations?',
    answer: 'Never. Our consultations, property evaluations, and cash offers are completely free with no obligation. You have nothing to lose by reaching out.',
  },
  {
    question: 'Can I just get information without committing to sell?',
    answer: 'Absolutely. We\'re happy to answer your questions, explain our process, and provide information even if you\'re just exploring your options. No pressure, ever.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
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

export default function ContactPage() {
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
      <main className="bg-white">
        <V0Header />

        {/* Hero Section - Cream with dot pattern */}
        <section className="relative pt-32 pb-12 md:pb-16 px-4 overflow-hidden bg-[#FAF8F5]">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231a1f1a' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
              Contact Us
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium text-[#1a1f1a] mb-6">
              Let&apos;s Talk About Your Property
            </h1>
            <p className="text-xl text-[#1a1f1a]/70 max-w-2xl mx-auto">
              Get a no-obligation cash offer in 24 hours. Call Tyler directly or fill out the form below.
            </p>
          </div>
        </section>

        {/* Trust Bar - Sage Green Gradient */}
        <section className="py-6 md:py-8 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-16 gap-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#008a29]" />
                <span className="text-[#1a2e1a] font-medium">200+ Homeowners Helped</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#008a29]" />
                <span className="text-[#1a2e1a] font-medium">Founded 2016</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#008a29]" />
                <span className="text-[#1a2e1a] font-medium">21 Communities Served</span>
              </div>
            </div>
          </div>
        </section>

        {/* Areas We Serve Section - White */}
        <section className="py-12 md:py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
                Service Areas
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#1a1f1a]">
                Areas We Serve
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5 text-center">
                <h3 className="font-semibold text-lg text-[#1a1f1a] mb-3">NEPA</h3>
                <p className="text-[#1a1f1a]/70">Scranton, Wilkes-Barre, Hazleton, and surrounding areas</p>
              </div>
              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5 text-center">
                <h3 className="font-semibold text-lg text-[#1a1f1a] mb-3">Lehigh Valley</h3>
                <p className="text-[#1a1f1a]/70">Allentown, Bethlehem, Easton, Reading</p>
              </div>
              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5 text-center">
                <h3 className="font-semibold text-lg text-[#1a1f1a] mb-3">Poconos</h3>
                <p className="text-[#1a1f1a]/70">Stroudsburg, East Stroudsburg, and mountain communities</p>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form + Contact Widgets - Cream */}
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-6xl mx-auto px-4">
            <ContactForm />
          </div>
        </section>

        {/* FAQ Section - White */}
        <V0FAQ
          faqs={faqs}
          title="Questions About Reaching Us"
          subtitle="Here are answers to common questions about contacting ClearEdge."
        />

        {/* Closing SEO - Sage gradient */}
        <section className="py-4 md:py-6 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-[#1a2e1a] font-medium">
              ClearEdge Home Buyers is here when you&apos;re ready. No pressure, no obligation — just an honest conversation about your options.
            </p>
          </div>
        </section>

        {/* Final CTA Section - Beige */}
        <section className="py-12 md:py-14 px-4 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">Call Now</span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-6">Prefer to Talk on the Phone?</h2>
            <p className="text-xl text-[#1a1f1a]/70 mb-6">
              Skip the form. Call Tyler directly.
            </p>
            <a
              href="tel:+15709042059"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#008a29] hover:bg-[#007a24] text-white font-semibold rounded-full shadow-lg shadow-[#008a29]/20 hover:shadow-xl transition-all text-lg"
            >
              <Phone className="w-6 h-6" />
              <span>Call (570) 904-2059</span>
            </a>
          </div>
        </section>

        <V0Footer />
      </main>
    </>
  )
}
