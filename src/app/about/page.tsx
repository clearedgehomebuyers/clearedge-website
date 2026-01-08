import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About ClearEdge Home Buyers | Cash Home Buyers Eastern Pennsylvania Since 2016',
  description: 'ClearEdge Home Buyers is a family-owned cash home buying company serving Eastern PA since 2016. 200+ homeowners helped across NEPA, Lehigh Valley, and the Poconos. No agents, no fees, no repairs.',
  openGraph: {
    title: 'About ClearEdge Home Buyers | Cash Home Buyers Eastern Pennsylvania Since 2016',
    description: 'ClearEdge Home Buyers is a family-owned cash home buying company serving Eastern PA since 2016. 200+ homeowners helped across NEPA, Lehigh Valley, and the Poconos.',
    url: 'https://clearedgehomebuyers.com/about',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://clearedgehomebuyers.com/about',
  },
}

const situations = [
  { name: 'Foreclosure', href: '/situations/foreclosure', description: 'and pre-foreclosure timelines' },
  { name: 'Inherited properties', href: '/situations/inherited-property', description: 'with multiple heirs or probate complications' },
  { name: 'Probate sales', href: '/situations/probate', description: 'requiring court approval or Letters Testamentary' },
  { name: 'Divorce', href: '/situations/divorce', description: 'and separation requiring asset liquidation' },
  { name: 'Code violations', href: '/situations/tax-liens-code-violations', description: 'and municipal enforcement actions' },
  { name: 'Tax liens', href: '/situations/tax-liens-code-violations', description: 'and delinquent property taxes' },
  { name: 'Vacant properties', href: '/situations/vacant-property', description: 'draining money every month' },
  { name: 'Job relocations', href: '/situations/job-relocation', description: 'with tight timelines' },
]

const localKnowledge = [
  { area: 'Allentown', detail: 'Mandatory pre-sale inspection requirement with 5-day turnaround before any property transfer' },
  { area: 'Reading', detail: 'Room I-30 and I-27 quality-of-life enforcement codes with active fine schedules' },
  { area: 'Statewide', detail: 'January 1, 2026 adoption of the 2021 International Building Code under Pennsylvania\'s UCC' },
  { area: 'Lackawanna County', detail: 'Probate timelines averaging 6-12 months for uncontested estates' },
  { area: 'Luzerne County', detail: 'Sheriff sale scheduling and redemption period requirements' },
  { area: 'Lehigh County', detail: 'GovOS-based code enforcement tracking with automated violation escalation' },
]

const trustItems = [
  { title: 'Track Record', description: '200+ homeowners have sold directly to ClearEdge since 2016. We have references available from sellers in every market we serve.' },
  { title: 'Media Coverage', description: 'Featured in The Morning Call and Lehigh Valley Business. Our work has been covered by legitimate regional publications.' },
  { title: 'Community Presence', description: 'We regularly speak at REIA meetups throughout Eastern PA. We\'re not a faceless national company—we live and work here.' },
  { title: 'Legal Structure', description: 'ClearEdge Home Buyers is a DBA of ClearEdge Properties LLC, a registered Pennsylvania limited liability company.' },
]

const faqs = [
  {
    question: 'Is ClearEdge Home Buyers a real estate agent or brokerage?',
    answer: 'No, ClearEdge is not a real estate agent or brokerage. We are the actual buyer of your property. There is no listing, no MLS, no agent commission. We buy directly from you using our own funds.'
  },
  {
    question: 'How fast can ClearEdge close on a house?',
    answer: 'ClearEdge can close in as few as 7 days when title is clear. Most transactions close within 14-21 days. Probate sales, tax lien situations, and multi-heir inheritances take longer due to legal requirements—we\'ll give you a realistic timeline upfront.'
  },
  {
    question: 'What areas does ClearEdge Home Buyers serve?',
    answer: 'ClearEdge serves all of Eastern Pennsylvania including NEPA (Scranton, Wilkes-Barre, Hazleton, Pittston, Carbondale), the Lehigh Valley (Allentown, Bethlehem, Easton), the Poconos (Stroudsburg, East Stroudsburg, Tannersville), and surrounding areas like Reading, Bloomsburg, and Pottsville.'
  },
  {
    question: 'Does ClearEdge buy houses in bad condition?',
    answer: 'Yes, ClearEdge buys houses in any condition. Fire damage, foundation issues, mold, outdated electrical, roof problems, hoarder situations—we\'ve seen it all. You don\'t need to make repairs or even clean out the property. We factor condition into our offer and handle everything after closing.'
  },
  {
    question: 'How does ClearEdge determine the offer price?',
    answer: 'We calculate offers based on after-repair value minus repair costs, holding costs, and a margin that allows us to operate sustainably. Our offers are typically 70-85% of market value depending on condition and situation. We\'re transparent about this math—our How It Works page explains the full process.'
  },
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ClearEdge Home Buyers',
            legalName: 'ClearEdge Properties LLC',
            url: 'https://clearedgehomebuyers.com',
            logo: 'https://clearedgehomebuyers.com/logo.png',
            foundingDate: '2016',
            founder: {
              '@type': 'Person',
              name: 'Tyler',
            },
            address: {
              '@type': 'PostalAddress',
              addressRegion: 'PA',
              addressCountry: 'US',
            },
            areaServed: [
              { '@type': 'State', name: 'Pennsylvania' },
              { '@type': 'City', name: 'Scranton' },
              { '@type': 'City', name: 'Wilkes-Barre' },
              { '@type': 'City', name: 'Allentown' },
              { '@type': 'City', name: 'Bethlehem' },
              { '@type': 'City', name: 'Reading' },
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-570-904-2059',
              contactType: 'sales',
              areaServed: 'US',
              availableLanguage: 'English',
            },
            sameAs: [],
          }),
        }}
      />

      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              About ClearEdge Home Buyers: Cash Home Buyers Eastern Pennsylvania Trusts Since 2016
            </h1>
            <p className="text-xl text-slate-700 leading-relaxed">
              We are a local, family-owned real estate company that buys houses directly from homeowners across Eastern Pennsylvania.
              No agents. No fees. No repairs. No uncertainty.
            </p>
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              How Did ClearEdge Home Buyers Start?
            </h2>
            <p className="text-lg text-slate-700 mb-4">
              ClearEdge began in 2016 with a single duplex on Birch Street in Scranton.
            </p>
            <p className="text-lg text-slate-700 mb-4">
              I&apos;m Tyler, the founder of ClearEdge Home Buyers.
              I grew up in Northeastern Pennsylvania and still live here today.
              My business partner is my longtime friend from high school.
              We started this company because we saw homeowners getting stuck—facing foreclosure, inheriting properties they couldn&apos;t manage, or needing to sell fast with no good options.
            </p>
            <p className="text-lg text-slate-700 mb-4">
              The traditional market doesn&apos;t work for everyone.
              Agents want commission. Buyers want perfect condition. Timelines drag on for months.
              We built ClearEdge to offer a different path: a direct, transparent sale with a closing date you control.
            </p>
            <p className="text-lg text-slate-700">
              Since that first duplex, we&apos;ve helped more than 200 homeowners across{' '}
              <Link href="/locations/scranton" className="text-blue-600 hover:text-blue-800 underline">Scranton</Link>,{' '}
              <Link href="/locations/wilkes-barre" className="text-blue-600 hover:text-blue-800 underline">Wilkes-Barre</Link>,{' '}
              <Link href="/locations/allentown" className="text-blue-600 hover:text-blue-800 underline">Allentown</Link>,{' '}
              <Link href="/locations/bethlehem" className="text-blue-600 hover:text-blue-800 underline">Bethlehem</Link>,{' '}
              <Link href="/locations/reading" className="text-blue-600 hover:text-blue-800 underline">Reading</Link>,{' '}
              the <Link href="/locations/lehigh-valley" className="text-blue-600 hover:text-blue-800 underline">Lehigh Valley</Link>,{' '}
              the <Link href="/locations/poconos" className="text-blue-600 hover:text-blue-800 underline">Poconos</Link>, and everywhere in between.
            </p>
          </div>
        </section>

        {/* What We Actually Do */}
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              What Does ClearEdge Home Buyers Actually Do?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              We buy houses directly from homeowners for cash.
              That&apos;s the transaction.
              But the product is something different.
            </p>
            <p className="text-lg text-slate-700 mb-6">
              Our product is a seamless, dignified, low-stress exit for homeowners facing difficult situations.
            </p>
            <p className="text-lg text-slate-700 mb-4">
              We work with people navigating:
            </p>
            <ul className="space-y-3 mb-6">
              {situations.map((situation) => (
                <li key={situation.href + situation.name} className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-1 h-5 w-5 flex-shrink-0" />
                  <span className="text-lg text-slate-700">
                    <Link href={situation.href} className="text-blue-600 hover:text-blue-800 underline">
                      {situation.name}
                    </Link>{' '}
                    {situation.description}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-lg text-slate-700">
              We handle properties in any condition—fire damage, foundation issues, outdated systems, or just worn out from time.
              You don&apos;t clean. You don&apos;t repair. You don&apos;t stage.
            </p>
          </div>
        </section>

        {/* Local Knowledge Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Why Does Local Knowledge Matter When Selling a House in Eastern PA?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Every county in Eastern Pennsylvania has different rules, timelines, and enforcement patterns.
              Working with a buyer who doesn&apos;t understand these differences creates risk.
            </p>
            <p className="text-lg text-slate-700 mb-4">
              Here&apos;s what we navigate daily:
            </p>
            <ul className="space-y-3 mb-6">
              {localKnowledge.map((item) => (
                <li key={item.area} className="flex items-start">
                  <span className="text-slate-400 mr-3 mt-1">•</span>
                  <span className="text-lg text-slate-700">
                    <strong>{item.area}:</strong> {item.detail}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-lg text-slate-700">
              We&apos;ve closed deals in every one of these markets.
              We know the title companies, the municipal offices, and the quirks of each jurisdiction.
              That knowledge protects your timeline.
            </p>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              How Do I Know ClearEdge Is Legitimate?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Healthy skepticism is smart when selling your home.
              Here&apos;s how we&apos;ve built trust over nearly a decade:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {trustItems.map((item) => (
                <div key={item.title} className="bg-white p-6 rounded-lg border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-10">
              Frequently Asked Questions About ClearEdge
            </h2>

            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className={index < faqs.length - 1 ? 'border-b border-slate-200 pb-8' : 'pb-8'}>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-lg text-slate-700">
                    {faq.question === 'How does ClearEdge determine the offer price?' ? (
                      <>
                        {faq.answer.split('How It Works')[0]}
                        <Link href="/how-it-works" className="text-blue-600 hover:text-blue-800 underline">
                          How It Works
                        </Link>
                        {faq.answer.split('How It Works')[1]}
                      </>
                    ) : (
                      faq.answer
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Soft CTA */}
        <section className="bg-slate-900 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Want to Know What Your Property Is Worth?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Get a no-obligation cash offer from cash home buyers Eastern Pennsylvania homeowners have trusted since 2016.
              No pressure. No commitment. Just clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors"
              >
                Get Your Cash Offer
              </Link>
              <a
                href="tel:5709042059"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-slate-900 transition-colors"
              >
                Call (570) 904-2059
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
