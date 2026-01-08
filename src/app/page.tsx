// src/app/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, Phone, MapPin, Clock, CheckCircle, Home, Users, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sell My House Fast Pennsylvania | Cash Home Buyers | ClearEdge',
  description: 'Sell your Pennsylvania house fast for cash. No repairs, no agents, no fees. ClearEdge Home Buyers has helped 200+ Eastern PA homeowners since 2016. Serving NEPA, Lehigh Valley & Poconos.',
  keywords: 'sell my house fast Pennsylvania, cash home buyers PA, we buy houses NEPA, sell house fast Lehigh Valley, Poconos cash home buyer',
  openGraph: {
    title: 'Sell My House Fast Pennsylvania | ClearEdge Home Buyers',
    description: 'Get a fair cash offer for your Pennsylvania house in 24 hours. Close in as few as 14 days. No repairs, no showings, no agent fees.',
    url: 'https://clearedgehomebuyers.com',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://clearedgehomebuyers.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ClearEdge Home Buyers - Sell Your Pennsylvania House Fast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sell My House Fast Pennsylvania | ClearEdge Home Buyers',
    description: 'Get a fair cash offer for your Pennsylvania house in 24 hours. Close in as few as 14 days.',
  },
  alternates: {
    canonical: 'https://clearedgehomebuyers.com',
  },
}

const situations = [
  { name: 'Facing Foreclosure', href: '/situations/foreclosure' },
  { name: 'Inherited Property', href: '/situations/inherited-property' },
  { name: 'Probate Sale', href: '/situations/probate' },
  { name: 'Divorce Settlement', href: '/situations/divorce' },
  { name: 'Job Relocation', href: '/situations/job-relocation' },
  { name: 'Vacant Property', href: '/situations/vacant-property' },
  { name: 'Fire Damage', href: '/situations/fire-damage' },
  { name: 'Bad Tenants', href: '/situations/bad-tenants' },
  { name: 'Tax Liens', href: '/situations/tax-liens-code-violations' },
  { name: 'Code Violations', href: '/situations/tax-liens-code-violations' },
  { name: 'Behind on Payments', href: '/situations/foreclosure' },
  { name: 'Downsizing', href: '/situations/downsizing' },
]

const locations = [
  { name: 'Scranton', href: '/locations/scranton' },
  { name: 'Wilkes-Barre', href: '/locations/wilkes-barre' },
  { name: 'Allentown', href: '/locations/allentown' },
  { name: 'Bethlehem', href: '/locations/bethlehem' },
  { name: 'Easton', href: '/locations/easton' },
  { name: 'Reading', href: '/locations/reading' },
  { name: 'Hazleton', href: '/locations/hazleton' },
  { name: 'Stroudsburg', href: '/locations/stroudsburg' },
  { name: 'East Stroudsburg', href: '/locations/east-stroudsburg' },
  { name: 'Honesdale', href: '/locations/honesdale' },
  { name: 'Carbondale', href: '/locations/carbondale' },
  { name: 'Pittston', href: '/locations/pittston' },
  { name: 'Nanticoke', href: '/locations/nanticoke' },
  { name: 'Kingston', href: '/locations/kingston' },
  { name: 'Dunmore', href: '/locations/dunmore' },
  { name: 'Bloomsburg', href: '/locations/bloomsburg' },
  { name: 'Pottsville', href: '/locations/pottsville' },
  { name: 'Pocono Pines', href: '/locations/pocono-pines' },
  { name: 'Tannersville', href: '/locations/tannersville' },
  { name: 'Lehigh Valley', href: '/locations/lehigh-valley' },
  { name: 'Poconos', href: '/locations/poconos' },
]

const faqs = [
  {
    question: 'How quickly can ClearEdge close on my Pennsylvania house?',
    answer: 'We can close in as few as 14 days when you need to move quickly. The exact timeline depends on title work, but most straightforward sales close within 21 to 30 days. If you need more time, we\'ll work around your schedule.',
  },
  {
    question: 'What types of properties does ClearEdge buy?',
    answer: 'We buy single-family homes, duplexes, and small multi-family properties throughout Eastern Pennsylvania. Condition doesn\'t matter — we purchase properties with foundation issues, fire damage, code violations, and major repairs needed. We also buy properties with complicated title situations, including estate sales and properties in probate.',
  },
  {
    question: 'How does ClearEdge determine its cash offer?',
    answer: 'Our offer is based on the property\'s after-repair value minus estimated repair costs and our operating margin. We\'ll walk you through this calculation transparently. Our goal is an offer that works for both parties — we don\'t use pressure tactics or artificial deadlines.',
  },
  {
    question: 'Is there any obligation if I request an offer?',
    answer: 'No. You can request an offer, review it, and decide it\'s not for you. There\'s no cost, no commitment, and no follow-up pressure. We believe you should have all the information to make the right decision.',
  },
  {
    question: 'Can I sell my Pennsylvania house if I still have a mortgage?',
    answer: 'Yes. Most homeowners who sell to us still have a mortgage. At closing, the title company pays off your existing loan from the sale proceeds. If you owe more than your home is worth, we can discuss options — in some cases, lenders will approve a short sale.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'LocalBusiness',
                '@id': 'https://clearedgehomebuyers.com/#organization',
                name: 'ClearEdge Home Buyers',
                alternateName: 'ClearEdge Properties LLC',
                description: 'Cash home buyers serving Eastern Pennsylvania including NEPA, Lehigh Valley, and the Poconos. We buy houses in any condition.',
                url: 'https://clearedgehomebuyers.com',
                telephone: '+1-570-904-2059',
                foundingDate: '2016',
                founder: {
                  '@type': 'Person',
                  name: 'Tyler',
                },
                areaServed: [
                  { '@type': 'State', name: 'Pennsylvania' },
                  { '@type': 'Place', name: 'NEPA' },
                  { '@type': 'Place', name: 'Lehigh Valley' },
                  { '@type': 'Place', name: 'Poconos' },
                ],
                serviceType: ['Cash Home Buying', 'Real Estate Investment', 'Property Acquisition'],
                priceRange: '$',
                image: 'https://clearedgehomebuyers.com/logo.png',
                sameAs: [],
              },
              {
                '@type': 'WebSite',
                '@id': 'https://clearedgehomebuyers.com/#website',
                url: 'https://clearedgehomebuyers.com',
                name: 'ClearEdge Home Buyers',
                publisher: {
                  '@id': 'https://clearedgehomebuyers.com/#organization',
                },
              },
              {
                '@type': 'WebPage',
                '@id': 'https://clearedgehomebuyers.com/#webpage',
                url: 'https://clearedgehomebuyers.com',
                name: 'Sell My House Fast Pennsylvania | Cash Home Buyers | ClearEdge',
                description: 'Sell your Pennsylvania house fast for cash. No repairs, no agents, no fees. ClearEdge Home Buyers has helped 200+ Eastern PA homeowners since 2016.',
                isPartOf: {
                  '@id': 'https://clearedgehomebuyers.com/#website',
                },
                about: {
                  '@id': 'https://clearedgehomebuyers.com/#organization',
                },
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://clearedgehomebuyers.com/#faq',
                mainEntity: faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />

      <main className="bg-white">
        {/* HERO SECTION */}
        <section className="bg-slate-900 text-white py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Sell My House Fast in Pennsylvania — Without Repairs, Showings, or Uncertainty
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              ClearEdge Home Buyers has helped 200+ Eastern PA homeowners close on their terms since 2016.
              No agents. No fees. No waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                Get Your Cash Offer
              </Link>
              <Link
                href="/how-it-works"
                className="border border-slate-500 hover:border-white text-white px-8 py-4 rounded-lg transition-colors"
              >
                See How It Works
              </Link>
            </div>
            <p className="text-slate-400 text-sm mt-6">
              Serving NEPA, Lehigh Valley, and the Poconos
            </p>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="bg-slate-100 py-6 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-600 text-sm">
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                Featured in The Morning Call
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                Lehigh Valley Business
              </span>
              <span>200+ Homes Purchased</span>
              <span>Family-Owned Since 2016</span>
            </div>
          </div>
        </section>

        {/* THE 2026 PENNSYLVANIA REALITY */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              What Does Selling a House in Pennsylvania Actually Require in 2026?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Pennsylvania's real estate requirements have become more complex in 2026, creating new friction for homeowners who want to sell.
            </p>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1 font-bold">•</span>
                <span>
                  <strong>Statewide building code update:</strong> As of January 1, 2026, Pennsylvania adopted the 2021 International Code Council series under the Uniform Construction Code. Properties with unpermitted work or code violations now face stricter scrutiny during inspections.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1 font-bold">•</span>
                <span>
                  <strong>Municipal pre-sale inspections:</strong> Cities like Allentown require sellers to schedule and pay for a pre-sale inspection within five business days of listing. Violations must be disclosed to buyers or corrected before closing.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1 font-bold">•</span>
                <span>
                  <strong>Inheritance tax deadlines:</strong> Pennsylvania inheritance tax is due within nine months of death, regardless of whether the property has sold. Heirs who miss this deadline face penalties and interest.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1 font-bold">•</span>
                <span>
                  <strong>Probate timelines:</strong> The average Pennsylvania probate process takes 12 to 18 months. Properties tied up in estate administration cannot be sold without Letters Testamentary or court approval.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1 font-bold">•</span>
                <span>
                  <strong>Disclosure requirements:</strong> Pennsylvania sellers must complete a Seller's Disclosure Statement covering 16 categories of potential defects. Failure to disclose known issues can result in post-sale litigation.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* WHAT MOST HOMEOWNERS DON'T REALIZE */}
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              What Most Homeowners Don't Realize About Selling in Pennsylvania
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              The traditional home sale process is designed for houses in good condition with owners who have time to wait.
            </p>
            <p className="text-slate-700 mb-4">
              If your situation doesn't fit that mold, you're working against the system.
            </p>
            <div className="space-y-6 mt-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Repairs before listing can cost more than they return.
                </h3>
                <p className="text-slate-700">
                  Most sellers spend $10,000 to $30,000 preparing a house for market.
                  In older Pennsylvania homes built before 1970, unexpected issues like knob-and-tube wiring, lead paint, or foundation cracks can double that number.
                  These costs come out of pocket before you see any return.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Listing doesn't mean selling.
                </h3>
                <p className="text-slate-700">
                  The average days on market in Pennsylvania varies significantly by condition and location.
                  Properties with deferred maintenance, estate situations, or tenant complications often sit 90 to 180 days before receiving a viable offer.
                  Every month on market costs you insurance, taxes, utilities, and risk of further deterioration.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Buyer financing falls through more often than you'd expect.
                </h3>
                <p className="text-slate-700">
                  Conventional mortgages require the property to meet lender standards.
                  If an appraiser flags issues like a non-functional HVAC system, roof damage, or structural concerns, the buyer's financing can collapse.
                  This sends you back to square one, often after weeks of waiting.
                </p>
              </div>
            </div>
            <p className="text-slate-700 mt-8">
              We've written extensively about these dynamics in our guides on{' '}
              <Link href="/situations/foreclosure" className="text-amber-600 hover:text-amber-700 underline">
                avoiding foreclosure in Pennsylvania
              </Link>
              ,{' '}
              <Link href="/situations/inherited-property" className="text-amber-600 hover:text-amber-700 underline">
                selling inherited property
              </Link>
              , and{' '}
              <Link href="/situations/probate" className="text-amber-600 hover:text-amber-700 underline">
                navigating probate sales
              </Link>
              .
            </p>
          </div>
        </section>

        {/* THE CLEAREDGE APPROACH */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              How Does ClearEdge Buy Houses in Pennsylvania?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              We purchase properties directly from homeowners, eliminating the traditional sale process entirely.
            </p>
            <p className="text-slate-700 mb-8">
              This isn't about convincing you to sell.
              It's about giving you a clear option so you can make the right decision for your situation.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">No repairs required</h3>
                <p className="text-slate-700">
                  We buy properties in any condition.
                  Foundation issues, roof damage, fire damage, outdated systems — none of it changes our process.
                  You don't spend money or time fixing anything.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">No showings or open houses</h3>
                <p className="text-slate-700">
                  There's no parade of strangers through your home.
                  No staging, no weekend open houses, no scheduling around your life.
                  We visit once to evaluate the property.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">No agent commissions or fees</h3>
                <p className="text-slate-700">
                  We're not agents — we're the buyer.
                  There's no 5-6% commission, no closing cost surprises.
                  The offer we make is what you receive at closing.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">You choose the closing date</h3>
                <p className="text-slate-700">
                  Need to close in 14 days? We can do that.
                  Need 60 days to coordinate a move? That works too.
                  The timeline is built around what you need.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <Link href="/how-it-works" className="text-amber-600 hover:text-amber-700 font-medium underline">
                See our complete process explained step by step →
              </Link>
            </div>
          </div>
        </section>

        {/* SITUATIONS WE HELP WITH */}
        <section className="bg-slate-900 text-white py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">
              What Situations Does ClearEdge Help With?
            </h2>
            <p className="text-slate-300 mb-10">
              Every homeowner's situation is different.
              Here are the most common reasons Pennsylvania homeowners reach out to us.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {situations.map((situation) => (
                <Link
                  key={situation.href + situation.name}
                  href={situation.href}
                  className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg transition-colors"
                >
                  <span className="font-medium">{situation.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE AREAS */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Where Does ClearEdge Buy Houses in Pennsylvania?
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              We purchase properties throughout Eastern Pennsylvania, including NEPA, the Lehigh Valley, and the Poconos.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-slate-700">
              {locations.map((location) => (
                <Link
                  key={location.href}
                  href={location.href}
                  className="hover:text-amber-600 transition-colors"
                >
                  {location.name}
                </Link>
              ))}
            </div>
            <p className="text-slate-600 text-sm mt-6">
              Don't see your city? We likely still serve your area.{' '}
              <Link href="/contact" className="text-amber-600 hover:text-amber-700 underline">
                Request an offer
              </Link>{' '}
              to find out.
            </p>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Who Is Behind ClearEdge Home Buyers?
            </h2>
            <p className="text-lg text-slate-700 mb-4">
              ClearEdge Home Buyers is a family-owned business based in Eastern Pennsylvania.
            </p>
            <p className="text-slate-700 mb-4">
              I'm Tyler, the founder.
              I started this company in 2016 with a single duplex on Birch Street in Scranton.
              My high school friend and I saw an opportunity to help homeowners while building something we could be proud of.
            </p>
            <p className="text-slate-700 mb-4">
              Since then, we've helped more than 200 families sell properties they no longer wanted or couldn't maintain.
              We've been featured in The Morning Call and Lehigh Valley Business, and I regularly speak at REIA meetups throughout Eastern PA.
            </p>
            <p className="text-slate-700">
              We're not a hedge fund or a faceless corporation.
              We live here. We invest here. And we answer our own phones.
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-amber-500 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Want to Know What Your House Is Worth?
            </h2>
            <p className="text-lg text-slate-800 mb-8">
              Request a no-obligation cash offer.
              You'll know exactly where you stand — and whether selling to us makes sense for your situation.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-semibold px-10 py-4 rounded-lg transition-colors"
            >
              Get Your Cash Offer
            </Link>
            <p className="text-slate-700 text-sm mt-6">
              Or call us directly:{' '}
              <a href="tel:5709042059" className="font-semibold hover:underline">
                (570) 904-2059
              </a>
            </p>
          </div>
        </section>

        {/* CLOSING KEYWORD ANCHOR */}
        <section className="py-12 bg-slate-100">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-slate-600">
              If you need to sell your house fast in Pennsylvania, ClearEdge Home Buyers offers a straightforward path to closing — on your terms, on your timeline.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
