import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sell Rental Property Pennsylvania | Tired Landlord Exit | ClearEdge',
  description: 'Tired of being a landlord in PA? Sell your rental property fast for cash—tenant-occupied, code violations, deferred maintenance. No repairs, no showings. Get a fair offer today.',
  keywords: 'sell rental property Pennsylvania, tired landlord, sell tenant occupied property PA, cash buyer rental property, sell rental house fast Pennsylvania',
  openGraph: {
    title: 'Sell Rental Property Pennsylvania | Tired Landlord Exit | ClearEdge',
    description: 'Tired of being a landlord in PA? Sell your rental property fast for cash—tenant-occupied, code violations, deferred maintenance. No repairs, no showings.',
    url: 'https://clearedgehomebuyers.com/situations/tired-landlord',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://clearedgehomebuyers.com/situations/tired-landlord',
  },
}

const faqs = [
  {
    question: 'Can I sell my rental property while tenants are still living there?',
    answer: 'Yes—Pennsylvania law allows you to sell a tenant-occupied property at any time. The lease transfers to the new owner, and the tenant\'s rights remain intact. We purchase occupied properties regularly and handle all tenant communication post-closing.',
  },
  {
    question: 'What happens to the security deposit when I sell?',
    answer: 'Pennsylvania\'s Landlord-Tenant Act requires you to either return the deposit or transfer it to the new owner with written notice to the tenant. We handle the transfer documentation at closing—you don\'t need to cut a separate check.',
  },
  {
    question: 'Do I need to fix code violations before selling to you?',
    answer: 'No—we buy properties with open violations, failed inspections, and deferred maintenance. We factor those costs into our offer so you\'re not chasing contractors before closing.',
  },
  {
    question: 'Will you still buy if my tenant hasn\'t been paying rent?',
    answer: 'Yes—we purchase properties with non-paying tenants, tenants in active eviction, and vacant properties with squatter concerns. We have experience navigating these situations and don\'t require you to resolve them first.',
  },
  {
    question: 'How does selling a rental affect my taxes?',
    answer: 'Rental property sales trigger capital gains tax and depreciation recapture under current IRS rules. We can close on a timeline that accommodates a 1031 exchange if you\'re reinvesting, and we recommend consulting a CPA for your specific situation.',
  },
]

export default function TiredLandlordPage() {
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

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Rental Property Cash Buying Service',
    description: 'Cash buying service for tired landlords looking to sell rental properties in Pennsylvania. We purchase tenant-occupied, code-violated, and deferred-maintenance rentals.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'ClearEdge Home Buyers',
      telephone: '(570) 904-2059',
      url: 'https://clearedgehomebuyers.com',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'PA',
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'State',
      name: 'Pennsylvania',
    },
    serviceType: 'Real Estate Cash Buying',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Header />

      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Sell Your Rental Property in Pennsylvania When You&apos;re Done Being a Landlord
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl">
              Being a tired landlord isn&apos;t a failure.
              It&apos;s a signal that the math stopped working—and there&apos;s a cleaner exit than you think.
            </p>
          </div>
        </section>

        {/* The 2026 Reality Section */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              What Does It Really Cost to Be a Pennsylvania Landlord in 2026?
            </h2>
            <p className="text-slate-700 mb-6">
              The true cost isn&apos;t your mortgage payment.
              It&apos;s everything else that erodes your time, capital, and patience.
            </p>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 mt-1">•</span>
                <span><strong>Pennsylvania&apos;s Uniform Construction Code (UCC)</strong> adopted the 2021 International Building Code on January 1, 2026—older rentals now face stricter compliance standards for electrical, egress, and smoke/CO detection.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 mt-1">•</span>
                <span><strong>Allentown&apos;s mandatory 5-day pre-sale inspection</strong> means you can&apos;t close quickly without city approval—and deferred maintenance gets documented.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 mt-1">•</span>
                <span><strong>Reading&apos;s I-30 quality-of-life enforcement</strong> has shifted from complaint-based to proactive inspection cycles in targeted rental corridors.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 mt-1">•</span>
                <span><strong>Lackawanna County&apos;s rental registration</strong> in Scranton requires annual inspections and $50/unit fees—miss one and you&apos;re looking at $300+ daily fines.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 mt-1">•</span>
                <span><strong>Pennsylvania eviction timelines</strong> average 45-90 days minimum through Magisterial District Court, plus holdover periods if appealed to Common Pleas.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Hidden Costs Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              What Do Most Tired Landlords Underestimate?
            </h2>
            <p className="text-slate-700 mb-6">
              The hidden drag isn&apos;t the big repairs—it&apos;s the compounding friction of small decisions.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Opportunity cost of your attention</h3>
                <p className="text-slate-700">
                  Every hour spent on tenant texts, contractor coordination, and code compliance is an hour not spent on higher-value work.
                  Most landlords with 1-4 units are effectively working a part-time job that pays less than minimum wage when you account for true hours invested.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Deferred maintenance as compounding debt</h3>
                <p className="text-slate-700">
                  That $800 roof patch becomes a $12,000 replacement.
                  That slow drain becomes a $4,000 sewer line scope.
                  Rental properties punish delay harder than owner-occupied homes because tenants don&apos;t report early—they report when it&apos;s already a crisis.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Listing a tenant-occupied property</h3>
                <p className="text-slate-700">
                  Pennsylvania requires 24-hour notice for showings under the Landlord-Tenant Act.
                  Tenants who know you&apos;re selling often stop cooperating—or worse, sabotage showings.
                  Most retail buyers won&apos;t touch an occupied property, shrinking your buyer pool to investors who demand steep discounts anyway.
                </p>
              </div>
            </div>

            <p className="text-slate-600 mt-8 text-sm">
              For a deeper breakdown of how carrying costs erode equity, see our guide on{' '}
              <Link href="/blog/true-cost-of-holding-a-house" className="text-blue-600 hover:underline">
                calculating the real cost of holding a property in PA
              </Link>.
            </p>
          </div>
        </section>

        {/* Why Landlords Reach This Point Section */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Why Do Successful Landlords Decide to Sell?
            </h2>
            <p className="text-slate-700 mb-6">
              Selling isn&apos;t about failure—it&apos;s about recognizing when the equation changed.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">Life stage shifted</h3>
                <p className="text-slate-600 text-sm">
                  The hustle that made sense at 35 doesn&apos;t make sense at 55.
                  Retirement planning, health changes, or simply wanting your weekends back are legitimate reasons.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">Portfolio rebalancing</h3>
                <p className="text-slate-600 text-sm">
                  That duplex was a stepping stone.
                  Now you want to 1031 into a passive syndication or simply diversify out of local real estate concentration.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">Regulatory burden crossed a threshold</h3>
                <p className="text-slate-600 text-sm">
                  Between lead paint certifications, rental registrations, and inspection cycles, the compliance overhead now exceeds the margin on older properties.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">Bad tenant experience created lasting friction</h3>
                <p className="text-slate-600 text-sm">
                  One eviction, one property damage incident, or one lawsuit is often enough to permanently change how you feel about being a landlord.
                  See our page on{' '}
                  <Link href="/situations/bad-tenants" className="text-blue-600 hover:underline">
                    selling after bad tenant experiences
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ClearEdge Process Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              How Does Selling to ClearEdge Work for Landlords?
            </h2>
            <p className="text-slate-700 mb-6">
              We buy tenant-occupied, code-violated, and deferred-maintenance rentals directly—no repairs, no showings, no waiting for the lease to expire.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold mr-4">1</div>
                <div>
                  <h3 className="font-semibold text-slate-900">You tell us about the property</h3>
                  <p className="text-slate-600">
                    Occupancy status, lease terms, known issues.
                    We don&apos;t need it to be perfect—we need it to be accurate.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold mr-4">2</div>
                <div>
                  <h3 className="font-semibold text-slate-900">We evaluate and present an offer</h3>
                  <p className="text-slate-600">
                    Our offers account for tenant situations, repair costs, and timeline.
                    No surprises at closing—what we quote is what we pay.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold mr-4">3</div>
                <div>
                  <h3 className="font-semibold text-slate-900">You choose the closing date</h3>
                  <p className="text-slate-600">
                    Need 10 days? We can move.
                    Need 60 days to coordinate your next step? That works too.
                    The timeline is yours.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold mr-4">4</div>
                <div>
                  <h3 className="font-semibold text-slate-900">Tenant coordination becomes our problem</h3>
                  <p className="text-slate-600">
                    We handle lease assignments, security deposit transfers, and any post-closing tenant transitions.
                    You&apos;re done at the closing table.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-600 mt-8 text-sm">
              For more on the mechanics, visit our{' '}
              <Link href="/how-it-works" className="text-blue-600 hover:underline">
                How It Works
              </Link>{' '}
              page.
            </p>
          </div>
        </section>

        {/* Local Markets Section */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Where in Pennsylvania Does ClearEdge Buy Rental Properties?
            </h2>
            <p className="text-slate-700 mb-6">
              We operate throughout Eastern Pennsylvania, including markets with the heaviest landlord compliance burdens.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">NEPA</h3>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li><Link href="/locations/scranton" className="hover:text-blue-600">Scranton</Link></li>
                  <li><Link href="/locations/wilkes-barre" className="hover:text-blue-600">Wilkes-Barre</Link></li>
                  <li><Link href="/locations/hazleton" className="hover:text-blue-600">Hazleton</Link></li>
                  <li><Link href="/locations/pittston" className="hover:text-blue-600">Pittston</Link></li>
                  <li><Link href="/locations/carbondale" className="hover:text-blue-600">Carbondale</Link></li>
                  <li><Link href="/locations/nanticoke" className="hover:text-blue-600">Nanticoke</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Lehigh Valley</h3>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li><Link href="/locations/allentown" className="hover:text-blue-600">Allentown</Link></li>
                  <li><Link href="/locations/bethlehem" className="hover:text-blue-600">Bethlehem</Link></li>
                  <li><Link href="/locations/easton" className="hover:text-blue-600">Easton</Link></li>
                  <li><Link href="/locations/reading" className="hover:text-blue-600">Reading</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Poconos</h3>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li><Link href="/locations/stroudsburg" className="hover:text-blue-600">Stroudsburg</Link></li>
                  <li><Link href="/locations/east-stroudsburg" className="hover:text-blue-600">East Stroudsburg</Link></li>
                  <li><Link href="/locations/honesdale" className="hover:text-blue-600">Honesdale</Link></li>
                  <li><Link href="/locations/pocono-pines" className="hover:text-blue-600">Pocono Pines</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Frequently Asked Questions About Selling Rental Property in PA
            </h2>

            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-700">
                    {faq.answer}
                    {index === 4 && (
                      <>
                        {' '}
                        Learn more about tax implications in our{' '}
                        <Link href="/blog/selling-inherited-property-taxes" className="text-blue-600 hover:underline">
                          guide to property sale taxes in Pennsylvania
                        </Link>.
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to See What Your Rental Property Is Worth?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              No obligation.
              No pressure.
              Just a clear number so you can make an informed decision about whether selling makes sense for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-colors"
              >
                Get Your Cash Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="tel:5709042059"
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-white hover:bg-white hover:text-slate-900 font-semibold rounded-lg transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call (570) 904-2059
              </a>
            </div>
            <p className="text-slate-400 text-sm mt-6">
              ClearEdge has helped 200+ Pennsylvania homeowners sell rental properties in any condition since 2016.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
