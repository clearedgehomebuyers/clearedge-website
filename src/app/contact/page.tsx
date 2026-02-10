import type { Metadata } from 'next'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { V0FAQ } from '@/components/v0-faq'
import { ContactForm } from '@/components/ContactForm'
import { DynamicPhoneButton } from '@/components/DynamicPhone'
import { Users, Calendar, MapPin, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact ClearEdge Home Buyers | Talk to Tyler Directly',
  description: 'Contact ClearEdge Home Buyers for a fair cash offer on your PA home. Call Tyler directly at (610) 904-8526 or fill out our form. Response within 24 hours, no obligation.',
  openGraph: {
    title: 'Contact Us | Get Your Free Cash Offer | ClearEdge Home Buyers',
    description: 'Contact ClearEdge Home Buyers for a free cash offer on your PA home. Call Tyler at (610) 904-8526 or fill out our form.',
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
    answer: 'We typically respond within a few hours during business hours, and always within 24 hours. For urgent matters, call us directly at {{phone}}.',
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.clearedgehomebuyers.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Contact',
      item: 'https://www.clearedgehomebuyers.com/contact',
    },
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ClearEdge Home Buyers',
  telephone: '+1-610-904-8526',
  email: 'info@clearedgehomebuyers.com',
  url: 'https://www.clearedgehomebuyers.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Scranton',
    addressRegion: 'PA',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.8603424,
    longitude: -75.8193544,
  },
  areaServed: [
    { '@type': 'City', name: 'Scranton' },
    { '@type': 'City', name: 'Wilkes-Barre' },
    { '@type': 'City', name: 'Allentown' },
    { '@type': 'City', name: 'Bethlehem' },
    { '@type': 'City', name: 'Easton' },
    { '@type': 'City', name: 'Reading' },
    { '@type': 'City', name: 'Hazleton' },
    { '@type': 'City', name: 'Stroudsburg' },
    { '@type': 'City', name: 'East Stroudsburg' },
    { '@type': 'City', name: 'Honesdale' },
    { '@type': 'City', name: 'Carbondale' },
    { '@type': 'City', name: 'Pittston' },
    { '@type': 'City', name: 'Kingston' },
    { '@type': 'City', name: 'Nanticoke' },
    { '@type': 'City', name: 'Dunmore' },
    { '@type': 'City', name: 'Bloomsburg' },
    { '@type': 'City', name: 'Pottsville' },
    { '@type': 'City', name: 'Pocono Pines' },
    { '@type': 'City', name: 'Tannersville' },
    { '@type': 'Place', name: 'Lehigh Valley' },
    { '@type': 'Place', name: 'Poconos' },
    { '@type': 'AdministrativeArea', name: 'Lackawanna County' },
    { '@type': 'AdministrativeArea', name: 'Luzerne County' },
    { '@type': 'AdministrativeArea', name: 'Lehigh County' },
    { '@type': 'AdministrativeArea', name: 'Northampton County' },
    { '@type': 'AdministrativeArea', name: 'Berks County' },
    { '@type': 'AdministrativeArea', name: 'Monroe County' },
    { '@type': 'AdministrativeArea', name: 'Wayne County' },
    { '@type': 'AdministrativeArea', name: 'Columbia County' },
    { '@type': 'AdministrativeArea', name: 'Schuylkill County' },
    { '@type': 'AdministrativeArea', name: 'Carbon County' },
    { '@type': 'AdministrativeArea', name: 'Pike County' },
    { '@type': 'State', name: 'Pennsylvania' },
    { '@type': 'Place', name: 'Eastern Pennsylvania' },
    { '@type': 'Place', name: 'Northeastern Pennsylvania' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61578297005995',
    'https://www.instagram.com/clearedge_home_buyers/',
    'https://www.youtube.com/@ClearEdgeHomeBuyers',
    'https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8603424,-75.8193544,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm',
  ],
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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

        {/* Hero Section - Cream */}
        <section className="relative pt-32 pb-12 md:pb-16 px-4 overflow-hidden bg-surface-cream">
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
              Contact Us
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium text-ce-ink mb-6">
              Talk to Tyler — Not a Call Center, Not a Salesperson
            </h1>
            <p className="text-xl text-ce-ink/70 max-w-2xl mx-auto">
              Get a fair, no-obligation cash offer in 24 hours. Every inquiry is personally reviewed by Tyler, the owner of ClearEdge.
            </p>
          </div>
        </section>

        {/* Trust Bar - Sage Green Gradient */}
        <section className="py-6 md:py-8 bg-gradient-to-b from-surface-green-wash to-surface-green-tint">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-16 gap-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-ce-green" />
                <span className="text-ce-ink font-medium">200+ PA Homes Purchased</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-ce-green" />
                <span className="text-ce-ink font-medium">Buying Since 2016</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-ce-green" />
                <span className="text-ce-ink font-medium">21 Eastern PA Markets</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form + Contact Widgets - Cream */}
        <section className="py-12 md:py-14 bg-surface-cream">
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


        {/* Final CTA Section - Beige */}
        <section className="py-12 md:py-14 px-4 bg-surface-cream">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">Call Now</span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink mb-6">Prefer to Talk on the Phone?</h2>
            <p className="text-xl text-ce-ink/70 mb-6">
              Skip the form. Call Tyler directly.
            </p>
            <DynamicPhoneButton
              className="inline-flex items-center gap-3 px-8 py-4 bg-ce-green hover:bg-ce-green-hover text-white font-semibold rounded-full shadow-lg shadow-green hover:shadow-xl transition-all text-lg"
            >
              <Phone className="w-6 h-6" />
              <span>Call Now</span>
            </DynamicPhoneButton>
          </div>
        </section>

        <V0Footer />
      </main>
    </>
  )
}
