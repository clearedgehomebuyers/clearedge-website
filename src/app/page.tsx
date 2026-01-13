// src/app/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, Phone, MapPin, Clock, CheckCircle, Home, Users, Shield } from 'lucide-react'
import { LeadForm } from '@/components/LeadForm'
import { ScrollToFormButton } from '@/components/ScrollToFormButton'

export const metadata: Metadata = {
  title: "Sell Your Pennsylvania House Fast for Cash | ClearEdge Home Buyers",
  description: "Get a fair cash offer in 24 hours. No repairs, no agents, no fees. ClearEdge has helped 200+ Eastern PA homeowners since 2016.",
  keywords: ["sell house fast Pennsylvania", "cash home buyers PA", "we buy houses Scranton", "sell house as-is Allentown", "cash offer Lehigh Valley", "sell inherited house PA"],
  openGraph: {
    title: "Sell Your Pennsylvania House Fast for Cash | ClearEdge Home Buyers",
    description: "Get a fair cash offer in 24 hours. No repairs, no agents, no fees. Serving NEPA, Lehigh Valley & Poconos since 2016.",
    url: "https://www.clearedgehomebuyers.com",
    siteName: "ClearEdge Home Buyers",
    locale: "en_US",
    type: "website",
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

const situations = [
  {
    title: 'Foreclosure',
    slug: 'foreclosure',
    description: 'Facing a sheriff sale? We can often close before the auction date.',
  },
  {
    title: 'Inherited Property',
    slug: 'inherited-property',
    description: 'Managing an estate is hard enough. We buy during or after probate.',
  },
  {
    title: 'Divorce',
    slug: 'divorce',
    description: 'Split the proceeds and move forward. A quick sale means faster closure.',
  },
  {
    title: 'Job Relocation',
    slug: 'job-relocation',
    description: "The new opportunity won't wait. We close on your timeline.",
  },
  {
    title: 'Major Repairs Needed',
    slug: 'major-repairs',
    description: 'Foundation issues? Roof damage? Mold? We buy as-is. You fix nothing.',
  },
  {
    title: 'Tax Liens & Code Violations',
    slug: 'tax-liens-code-violations',
    description: "Outstanding liens or municipal violations don't stop us.",
  },
  {
    title: 'Tired Landlord',
    slug: 'tired-landlord',
    description: 'Done dealing with tenants? We buy rentals — occupied or vacant.',
  },
  {
    title: 'Vacant Property',
    slug: 'vacant-property',
    description: 'Empty house draining your wallet? Stop the bleeding with a quick sale.',
  },
]

const locationsByRegion = {
  'NEPA': [
    { name: 'Scranton', href: '/locations/scranton' },
    { name: 'Wilkes-Barre', href: '/locations/wilkes-barre' },
    { name: 'Hazleton', href: '/locations/hazleton' },
    { name: 'Pittston', href: '/locations/pittston' },
    { name: 'Kingston', href: '/locations/kingston' },
    { name: 'Nanticoke', href: '/locations/nanticoke' },
    { name: 'Carbondale', href: '/locations/carbondale' },
    { name: 'Dunmore', href: '/locations/dunmore' },
    { name: 'Honesdale', href: '/locations/honesdale' },
    { name: 'Bloomsburg', href: '/locations/bloomsburg' },
  ],
  'Lehigh Valley': [
    { name: 'Allentown', href: '/locations/allentown' },
    { name: 'Bethlehem', href: '/locations/bethlehem' },
    { name: 'Easton', href: '/locations/easton' },
    { name: 'Reading', href: '/locations/reading' },
    { name: 'Pottsville', href: '/locations/pottsville' },
    { name: 'Lehigh Valley', href: '/locations/lehigh-valley' },
  ],
  'Poconos': [
    { name: 'Stroudsburg', href: '/locations/stroudsburg' },
    { name: 'East Stroudsburg', href: '/locations/east-stroudsburg' },
    { name: 'Pocono Pines', href: '/locations/pocono-pines' },
    { name: 'Tannersville', href: '/locations/tannersville' },
    { name: 'Poconos', href: '/locations/poconos' },
  ],
}

const faqs = [
  {
    question: 'How quickly can ClearEdge close on my Pennsylvania house?',
    answer: 'We can close in as few as 7 days when you need to move quickly. The exact timeline depends on title work, but most straightforward sales close within 14 to 30 days. If you need more time, we\'ll work around your schedule.',
  },
  {
    question: 'What types of properties does ClearEdge buy?',
    answer: 'We buy single-family homes, duplexes, and small multi-family properties throughout Eastern Pennsylvania. Condition doesn\'t matter — we purchase properties with foundation issues, fire damage, code violations, and major repairs needed. We also buy properties with complicated title situations, including estate sales and properties in probate.',
  },
  {
    question: 'How does ClearEdge determine its cash offer?',
    answer: 'We calculate offers based on what your house will be worth after it\'s fully renovated, minus the cost of repairs, holding costs, and our operating margin. We\'ll walk you through exactly how we arrived at the number — no mystery, no hidden math.',
  },
  {
    question: 'Is there any obligation if I request an offer?',
    answer: 'No. You can request an offer, review it, and decide it\'s not for you. Our offers are valid for 30 days. There\'s no cost, no commitment, and no follow-up pressure. We believe you should have all the information to make the right decision.',
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
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "ClearEdge Home Buyers",
            "description": "Cash home buying company serving Eastern Pennsylvania. We buy houses as-is for cash with no fees or repairs required.",
            "url": "https://www.clearedgehomebuyers.com",
            "telephone": "+1-570-904-2059",
            "image": "https://www.clearedgehomebuyers.com/og-image.png",
            "priceRange": "$",
            "founder": {
              "@type": "Person",
              "name": "Tyler"
            },
            "foundingDate": "2016",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Scranton",
              "addressRegion": "PA",
              "addressCountry": "US"
            },
            "areaServed": [
              { "@type": "City", "name": "Scranton" },
              { "@type": "City", "name": "Wilkes-Barre" },
              { "@type": "City", "name": "Hazleton" },
              { "@type": "City", "name": "Allentown" },
              { "@type": "City", "name": "Bethlehem" },
              { "@type": "City", "name": "Easton" },
              { "@type": "City", "name": "Reading" },
              { "@type": "City", "name": "Stroudsburg" },
              { "@type": "City", "name": "East Stroudsburg" },
              { "@type": "State", "name": "Pennsylvania" }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "6",
              "bestRating": "5"
            },
            "makesOffer": {
              "@type": "Offer",
              "name": "Cash Home Buying",
              "description": "We buy houses for cash in any condition. No repairs, no agents, no fees."
            },
            "sameAs": [
              "https://www.google.com/maps/place/ClearEdge+Home+Buyers"
            ]
          })
        }}
      />

      <main className="bg-white">
        {/* HERO SECTION */}
        <section className="bg-slate-900 text-white py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Sell Your Pennsylvania House Fast — For Cash, On Your Terms
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              No repairs. No agents. No fees. Get a fair cash offer in 24 hours from a local buyer who&apos;s helped hundreds of Eastern PA homeowners since 2016.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ScrollToFormButton className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors">
                Get My Cash Offer
              </ScrollToFormButton>
              <a
                href="tel:5709042059"
                className="border border-slate-500 hover:border-white text-white px-8 py-4 rounded-lg transition-colors"
              >
                Or call Tyler directly: (570) 904-2059
              </a>
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
              <span>Since 2016</span>
              <span>Hundreds of Homes Purchased</span>
              <span>NEPA • Lehigh Valley • Poconos</span>
              <span>Cash Offer in 24 Hours</span>
            </div>
          </div>
        </section>


        {/* WHY SELLING IS HARDER */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Selling a House in Pennsylvania Just Got Harder
            </h2>
            <div className="space-y-4 text-lg text-slate-700">
              <p>
                Pennsylvania&apos;s real estate requirements tightened in 2026. New building codes. Municipal pre-sale inspections. Stricter scrutiny on unpermitted work.
              </p>
              <p>
                If your house needs repairs, has code issues, or you simply don&apos;t have 90 days to wait — the traditional sale process works against you.
              </p>
              <p className="font-semibold text-slate-900">
                We offer a different path.
              </p>
              <p>
                ClearEdge Home Buyers purchases homes directly from homeowners throughout Eastern PA. No agents. No listings. No waiting for a buyer who might back out.
              </p>
              <p>
                You get a cash offer. You pick the closing date. We handle the rest.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/how-it-works" className="text-amber-600 hover:text-amber-700 font-medium">
                See How It Works →
              </Link>
            </div>
          </div>
        </section>


        {/* THREE STEPS TO SOLD */}
        <section className="bg-slate-900 text-white py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Three Steps to Sold
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Discovery Call</h3>
                <p className="text-slate-300">
                  Tell us about your property and situation. Takes 10 minutes. No pressure, no obligations — just a conversation about your options.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Your Cash Offer</h3>
                <p className="text-slate-300">
                  Within 24 hours, you&apos;ll have a written all-cash offer. It&apos;s good for 30 days, so you can think it over without pressure.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Close On Your Terms</h3>
                <p className="text-slate-300">
                  Accept the offer, pick your closing date, and we handle everything else. Most sales close in 7-30 days. Local title company or remote closing — your choice.
                </p>
              </div>
            </div>
            <div className="text-center mt-10">
              <Link href="/how-it-works" className="text-amber-400 hover:text-amber-300 font-medium">
                Get the Full Process Details →
              </Link>
            </div>
          </div>
        </section>
        {/* THE HIDDEN COST OF WAITING - COMPARISON TABLE */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              The Hidden Cost of Waiting
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              When you list traditionally, you're not just waiting — you're paying.
              Here's what a typical 90-day listing actually costs compared to a cash sale.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="text-left py-4 px-6 font-semibold">Expense</th>
                    <th className="text-center py-4 px-6 font-semibold">Traditional Sale<br /><span className="font-normal text-slate-300 text-sm">(90 Days)</span></th>
                    <th className="text-center py-4 px-6 font-semibold bg-amber-500 text-slate-900">ClearEdge Sale<br /><span className="font-normal text-slate-700 text-sm">(7–30 Days)</span></th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-b border-slate-200">
                    <td className="py-4 px-6 font-medium">Repairs Before Listing</td>
                    <td className="py-4 px-6 text-center text-red-600 font-semibold">$15,000+</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold bg-amber-50">$0</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="py-4 px-6 font-medium">Holding Costs<br /><span className="text-sm text-slate-500">(Taxes, Utilities, Insurance, Mortgage)</span></td>
                    <td className="py-4 px-6 text-center text-red-600 font-semibold">$4,500+</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold bg-amber-50">$0</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 px-6 font-medium">Agent Commissions<br /><span className="text-sm text-slate-500">(6% on a $200k home)</span></td>
                    <td className="py-4 px-6 text-center text-red-600 font-semibold">$12,000</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold bg-amber-50">$0</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="py-4 px-6 font-medium">Closing Cost Contributions</td>
                    <td className="py-4 px-6 text-center text-red-600 font-semibold">$3,000+</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold bg-amber-50">$0</td>
                  </tr>
                  <tr className="bg-slate-900 text-white">
                    <td className="py-4 px-6 font-bold">Total Out-of-Pocket Risk</td>
                    <td className="py-4 px-6 text-center font-bold text-red-400">$34,500+</td>
                    <td className="py-4 px-6 text-center font-bold text-green-400 bg-amber-600">$0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-600 text-sm mt-6 italic">
              *Based on a $200,000 home with typical Eastern PA repair needs and 90-day market time. Your actual costs may vary.
            </p>
          </div>
        </section>


        {/* THE CLEAREDGE APPROACH */}
        <section className="bg-slate-50 py-16 lg:py-20">
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
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">No repairs required</h3>
                <p className="text-slate-700">
                  We buy properties in any condition.
                  Foundation issues, roof damage, fire damage, outdated systems — none of it changes our process.
                  You don't spend money or time fixing anything.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">No showings or open houses</h3>
                <p className="text-slate-700">
                  There's no parade of strangers through your home.
                  No staging, no weekend open houses, no scheduling around your life.
                  We visit once to evaluate the property.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">No agent commissions or fees</h3>
                <p className="text-slate-700">
                  We're not agents — we're the buyer.
                  There's no 5-6% commission, no closing cost surprises.
                  The offer we make is what you receive at closing.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">You choose the closing date</h3>
                <p className="text-slate-700">
                  Need to close in 7 days? We can do that.
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
        <section className="py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              We Buy Houses in Any Situation
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Every homeowner&apos;s situation is different. Here are the most common reasons people reach out to us.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {situations.map((situation) => (
                <Link
                  key={situation.slug}
                  href={`/situations/${situation.slug}`}
                  className="bg-white border border-slate-200 hover:border-amber-400 rounded-lg p-6 transition-colors group"
                >
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {situation.title}
                  </h3>
                  <p className="text-sm text-slate-600">{situation.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE AREAS */}
        <section className="py-16 lg:py-20" id="service-areas">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Serving All of Eastern Pennsylvania
            </h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
              We purchase properties throughout NEPA, the Lehigh Valley, and the Poconos. If you own a house in any of these areas, we&apos;d love to make you a fair cash offer.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(locationsByRegion).map(([region, cities]) => (
                <div key={region}>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 border-b-2 border-amber-500 pb-2">
                    {region}
                  </h3>
                  <ul className="space-y-2">
                    {cities.map((city) => (
                      <li key={city.href}>
                        <Link
                          href={city.href}
                          className="text-slate-700 hover:text-amber-600 transition-colors"
                        >
                          {city.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-center mt-10">
              <ScrollToFormButton className="text-amber-600 hover:text-amber-700 font-semibold">
                Don&apos;t see your city? Request an offer anyway &rarr;
              </ScrollToFormButton>
            </p>
          </div>
        </section>

        {/* WHY CLEAREDGE */}
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Why Homeowners Choose ClearEdge
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Local, Not a Franchise</h3>
                <p className="text-slate-600">
                  We started in 2016 on Birch Street in Scranton — not a call center in another state. Tyler still answers the phone.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Transparent Pricing</h3>
                <p className="text-slate-600">
                  We show you exactly how we calculate our offer. No mystery math. No pressure. Just honest numbers.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Your Timeline, Not Ours</h3>
                <p className="text-slate-600">
                  Need to close in 7 days? We can do that. Need 60 days to find your next place? That works too.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">White-Glove Service</h3>
                <p className="text-slate-600">
                  From the first call to the closing table, you work directly with Tyler — not a rotating cast of salespeople. Call him now:{' '}
                  <a href="tel:+15709042059" className="text-amber-600 hover:text-amber-700 font-semibold">(570) 904-2059</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              What Our Clients Say
            </h2>
            
            {/* Featured Testimonial */}
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-10 border border-slate-100">
              <div className="max-w-4xl mx-auto">
                <svg className="w-12 h-12 text-amber-400 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-6">
                  &ldquo;Selling a property from out of state can be incredibly stressful, but Tyler made it feel effortless. He handled everything — from coordinating with my dad&apos;s caregivers to managing repairs I couldn&apos;t oversee myself. I never felt pressured, and he kept me informed every step of the way. If you&apos;re dealing with an inherited property or just need someone you can trust, call Tyler.&rdquo;
                </blockquote>
                <div className="flex items-center">
                  <div>
                    <p className="font-bold text-slate-900">Kandra Gunter</p>
                    <p className="text-slate-500 text-sm">Sold inherited property from Texas while caring for elderly father</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Testimonials */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
                <svg className="w-8 h-8 text-amber-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-slate-700 mb-4">
                  &ldquo;You made a difficult time simple and smooth.&rdquo;
                </blockquote>
                <p className="font-semibold text-slate-900">Jewel Parago</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
                <svg className="w-8 h-8 text-amber-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-slate-700 mb-4">
                  &ldquo;First to take time to explain the process and make me feel comfortable.&rdquo;
                </blockquote>
                <p className="font-semibold text-slate-900">Gavin S.</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
                <svg className="w-8 h-8 text-amber-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-slate-700 mb-4">
                  &ldquo;We closed in 30 days and have never been happier!&rdquo;
                </blockquote>
                <p className="font-semibold text-slate-900">Rita C.</p>
              </div>
            </div>

            {/* Google Reviews Link */}
            <p className="text-center mt-10">
              <a
                href="https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8549074,-77.1384488,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                See all reviews on Google &rarr;
              </a>
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
            <p className="text-slate-700">
              Since then, we&apos;ve helped more than 200 families sell properties they no longer wanted or couldn&apos;t maintain. We&apos;re not a hedge fund or a faceless corporation. We live here. We invest here. And we answer our own phones.
            </p>
          </div>
        </section>


        {/* FINAL CTA */}
        <section className="bg-amber-500 py-16 lg:py-20" id="lead-form">
          <div className="max-w-xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Want to Know What Your House Is Worth?
              </h2>
              <p className="text-lg text-slate-800">
                Request a no-obligation cash offer. You&apos;ll know exactly where you stand — and whether selling to us makes sense for your situation.
              </p>
            </div>
            <LeadForm 
              heading="Get Your Cash Offer"
              subheading="No obligation • No fees • Response in 24 hours"
              buttonText="Get My Cash Offer"
            />
            <p className="text-slate-700 text-sm mt-6 text-center">
              Prefer to talk? Call Tyler directly:{' '}
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
