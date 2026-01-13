import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { ScrollToFormButton } from '@/components/ScrollToFormButton'

import { LeadForm } from '@/components/LeadForm'
export const metadata: Metadata = {
  title: 'About ClearEdge Home Buyers | Local Cash Home Buyers Since 2016',
  description: "Meet Tyler and the ClearEdge team. We're a family-owned cash home buying company based in Scranton, serving NEPA, Lehigh Valley, and the Poconos since 2016. 200+ homeowners helped.",
  keywords: ['about ClearEdge', 'cash home buyers Scranton', 'Tyler ClearEdge', 'local home buyers PA'],
  openGraph: {
    title: 'About ClearEdge Home Buyers | Local Cash Home Buyers Since 2016',
    description: 'Meet Tyler and the ClearEdge team. Family-owned cash home buying company serving Eastern PA since 2016.',
    url: 'https://www.clearedgehomebuyers.com/about',
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
  alternates: {
    canonical: 'https://www.clearedgehomebuyers.com/about',
  },
}


const situations = [
  { name: 'Facing Foreclosure', href: '/situations/foreclosure' },
  { name: 'Inherited Property', href: '/situations/inherited-property' },
  { name: 'Going Through Divorce', href: '/situations/divorce' },
  { name: 'Job Relocation', href: '/situations/job-relocation' },
  { name: 'Major Repairs Needed', href: '/situations/major-repairs' },
  { name: 'Tax Liens or Code Violations', href: '/situations/tax-liens-code-violations' },
  { name: 'Tired Landlord', href: '/situations/tired-landlord' },
  { name: 'Vacant Property', href: '/situations/vacant-property' },
]


const faqs = [
  {
    question: 'Is ClearEdge a franchise or national company?',
    answer: "No. We're a local, family-owned business founded in Scranton in 2016. We're not affiliated with any franchise or corporate buyer network."
  },
  {
    question: 'Who will I work with?',
    answer: "You'll work directly with Tyler from the first call through closing. No hand-offs, no rotating salespeople."
  },
  {
    question: 'How do you make money?',
    answer: 'We buy properties, renovate them, and resell them. Our profit comes from the difference between what we pay you and what we eventually sell the property for — minus repair and holding costs.'
  },
  {
    question: 'Do you buy houses in any condition?',
    answer: "Yes. Foundation issues, fire damage, mold, hoarding, code violations — condition doesn't disqualify you. We factor repairs into our offer."
  },
  {
    question: 'What areas do you serve?',
    answer: 'We buy houses throughout Eastern Pennsylvania — NEPA (Scranton, Wilkes-Barre, Hazleton), Lehigh Valley (Allentown, Bethlehem, Easton, Reading), and the Poconos (Stroudsburg and surrounding areas).'
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
            url: 'https://www.clearedgehomebuyers.com',
            logo: 'https://www.clearedgehomebuyers.com/logo.png',
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
        <section className="bg-slate-900 text-white py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              We&apos;re Not a Franchise. We&apos;re Your Neighbors.
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              ClearEdge Home Buyers is a family-owned business based in Eastern Pennsylvania. We&apos;ve been helping homeowners sell fast since 2016.
            </p>
            <ScrollToFormButton className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors">
              Get My Cash Offer
            </ScrollToFormButton>
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              How ClearEdge Started
            </h2>
            <div className="space-y-6 text-lg text-slate-700">
              <p>
                I&apos;m Tyler, the founder of ClearEdge Home Buyers. In 2016, my high school friend and I bought our first property — a duplex on Birch Street in Scranton. We didn&apos;t have a business plan or investors. Just a belief that we could help homeowners while building something we&apos;d be proud of.
              </p>
              <p>
                That first deal taught us everything. We learned how to navigate title issues, work with estate attorneys, and close deals that other buyers walked away from. Most importantly, we learned that homeowners don&apos;t want to be treated like a transaction. They want someone who listens, explains the process, and actually does what they say they&apos;ll do.
              </p>
              <p>
                Since then, we&apos;ve helped more than 200 families across Eastern Pennsylvania sell properties they no longer wanted or couldn&apos;t maintain. We&apos;ve expanded from Scranton to the Lehigh Valley and the Poconos — but we still answer our own phones, and I&apos;m still personally involved in every deal.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes ClearEdge Different */}
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              What Makes ClearEdge Different
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Local, Not Corporate</h3>
                <p className="text-slate-600">
                  We&apos;re based in Scranton, not a call center in another state. When you call, you talk to Tyler — not a script reader.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Transparent Pricing</h3>
                <p className="text-slate-600">
                  We show you exactly how we calculate our offer. No mystery math, no pressure tactics. If the numbers don&apos;t work for you, we&apos;ll tell you.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Your Timeline</h3>
                <p className="text-slate-600">
                  Need to close in 7 days? We can do that. Need 60 days to find your next place? That works too. You&apos;re in control.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 font-bold">4</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">We Handle the Hard Stuff</h3>
                <p className="text-slate-600">
                  Probate, liens, code violations, out-of-state sellers, tenant issues — we&apos;ve seen it all and know how to navigate it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Homeowners We Work With */}
        <section className="py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              Homeowners We Work With
            </h2>
            <p className="text-lg text-slate-600 mb-10 text-center max-w-2xl mx-auto">
              We buy houses in all kinds of situations. If any of these sound familiar, we can help:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {situations.map((situation) => (
                <Link
                  key={situation.href}
                  href={situation.href}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                >
                  <Check className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-slate-700 group-hover:text-amber-600 transition-colors">
                    {situation.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Serving All of Eastern Pennsylvania */}
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              Serving All of Eastern Pennsylvania
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-amber-500">
                  NEPA
                </h3>
                <ul className="space-y-2">
                  <li><Link href="/locations/scranton" className="text-slate-600 hover:text-amber-600 transition-colors">Scranton</Link></li>
                  <li><Link href="/locations/wilkes-barre" className="text-slate-600 hover:text-amber-600 transition-colors">Wilkes-Barre</Link></li>
                  <li><Link href="/locations/hazleton" className="text-slate-600 hover:text-amber-600 transition-colors">Hazleton</Link></li>
                  <li><Link href="/locations/pittston" className="text-slate-600 hover:text-amber-600 transition-colors">Pittston</Link></li>
                  <li><Link href="/locations/kingston" className="text-slate-600 hover:text-amber-600 transition-colors">Kingston</Link></li>
                  <li><Link href="/locations/nanticoke" className="text-slate-600 hover:text-amber-600 transition-colors">Nanticoke</Link></li>
                  <li><Link href="/locations/carbondale" className="text-slate-600 hover:text-amber-600 transition-colors">Carbondale</Link></li>
                  <li><Link href="/locations/dunmore" className="text-slate-600 hover:text-amber-600 transition-colors">Dunmore</Link></li>
                  <li><Link href="/locations/honesdale" className="text-slate-600 hover:text-amber-600 transition-colors">Honesdale</Link></li>
                  <li><Link href="/locations/bloomsburg" className="text-slate-600 hover:text-amber-600 transition-colors">Bloomsburg</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-amber-500">
                  Lehigh Valley
                </h3>
                <ul className="space-y-2">
                  <li><Link href="/locations/allentown" className="text-slate-600 hover:text-amber-600 transition-colors">Allentown</Link></li>
                  <li><Link href="/locations/bethlehem" className="text-slate-600 hover:text-amber-600 transition-colors">Bethlehem</Link></li>
                  <li><Link href="/locations/easton" className="text-slate-600 hover:text-amber-600 transition-colors">Easton</Link></li>
                  <li><Link href="/locations/reading" className="text-slate-600 hover:text-amber-600 transition-colors">Reading</Link></li>
                  <li><Link href="/locations/pottsville" className="text-slate-600 hover:text-amber-600 transition-colors">Pottsville</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-amber-500">
                  Poconos
                </h3>
                <ul className="space-y-2">
                  <li><Link href="/locations/stroudsburg" className="text-slate-600 hover:text-amber-600 transition-colors">Stroudsburg</Link></li>
                  <li><Link href="/locations/east-stroudsburg" className="text-slate-600 hover:text-amber-600 transition-colors">East Stroudsburg</Link></li>
                  <li><Link href="/locations/pocono-pines" className="text-slate-600 hover:text-amber-600 transition-colors">Pocono Pines</Link></li>
                  <li><Link href="/locations/tannersville" className="text-slate-600 hover:text-amber-600 transition-colors">Tannersville</Link></li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <ScrollToFormButton className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors">
                Don&apos;t see your town? Reach out anyway &rarr;
              </ScrollToFormButton>
            </div>
          </div>
        </section>

        {/* Local Knowledge Section */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              We Know Pennsylvania Real Estate
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Municipal Pre-Sale Inspections</h3>
                  <p className="text-slate-600">Cities like Allentown require inspections before closing. We know which municipalities have requirements and how to navigate them.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Probate Process</h3>
                  <p className="text-slate-600">Pennsylvania probate can take months. We work with estate attorneys regularly and can close during or after the process.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Mine Subsidence (NEPA)</h3>
                  <p className="text-slate-600">Parts of Northeastern PA have underground mine issues. We understand the risks and factor them into our offers fairly.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Title &amp; Lien Issues</h3>
                  <p className="text-slate-600">Tax liens, judgments, code violations — we&apos;ve closed deals with complicated title situations that scared off other buyers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-10">
              What Homeowners Say
            </h2>
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
              <div className="text-amber-500 text-6xl font-serif leading-none mb-4">&ldquo;</div>
              <blockquote className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-6">
                First to take time to explain the process and make me feel comfortable.
              </blockquote>
              <p className="text-slate-600">— Gavin S.</p>
            </div>
            <div className="mt-8">
              <Link href="/testimonials" className="text-amber-600 hover:text-amber-700 font-medium">
                Read all reviews &rarr;
              </Link>
            </div>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10">
              Common Questions About ClearEdge
            </h2>

            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="lead-form" className="bg-amber-500 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Let&apos;s Talk About Your Property
            </h2>
            <p className="text-lg text-slate-800 mb-8">
              No obligation. No pressure. Just an honest conversation about your options.
            </p>
            <LeadForm />
            <p className="text-slate-700 text-sm mt-8">
              Prefer to call? Reach Tyler directly:{' '}
              <a href="tel:+15709042059" className="font-semibold hover:underline">
                (570) 904-2059
              </a>
            </p>
          </div>
        </section>

        {/* Closing Anchor */}
        <section className="py-8 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-slate-600">
              ClearEdge Home Buyers is a local, family-owned company helping Eastern Pennsylvania homeowners sell fast for cash. Founded in Scranton in 2016. Still here. Still answering our own phones.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
