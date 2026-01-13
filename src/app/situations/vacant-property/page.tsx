import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, AlertCircle, MapPin, Clock } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sell Vacant House Pennsylvania | Cash Offer in 24-48 Hours | ClearEdge',
  description: 'Sell your vacant house in Pennsylvania fast for cash. No inspections, no repairs, no fees. ClearEdge Home Buyers closes in as few as 14 days. Serving NEPA, Lehigh Valley & Poconos.',
  keywords: 'sell vacant house Pennsylvania, sell vacant property PA, cash home buyer vacant house, sell empty house fast PA',
  openGraph: {
    title: 'Sell Vacant House Pennsylvania | Cash Offer in 24-48 Hours',
    description: 'Sell your vacant house in Pennsylvania fast for cash. No inspections, no repairs, no fees. Closings in as few as 14 days.',
    url: 'https://clearedgehomebuyers.com/situations/vacant-property',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://clearedgehomebuyers.com/situations/vacant-property',
  },
}

const faqData = [
  {
    question: 'How much do you pay for vacant properties?',
    answer: 'We typically offer 70-85% of after-repair market value, minus estimated repair costs. The exact number depends on location, condition, and local market comps. Our offers account for the fact that you\'re avoiding 6% agent commissions, 3-4% closing costs, and months of carrying costs. For many vacant property owners, the net proceeds are comparable to—or better than—a traditional sale after all costs are factored.',
  },
  {
    question: 'What if my vacant property has code violations?',
    answer: 'We buy properties with active code violations regularly. In fact, vacant properties with violations are one of our specialties. We handle the violation resolution after closing.',
  },
  {
    question: 'What if I inherited the vacant property and I\'m not local?',
    answer: 'Out-of-state owners are among the most common sellers we work with. We coordinate everything remotely—title work, notarization, and closing. You don\'t need to visit the property or travel to Pennsylvania.',
  },
  {
    question: 'Can I sell if I have a mortgage on the vacant property?',
    answer: 'Yes, as long as our offer covers the remaining mortgage balance plus closing costs. If you\'re underwater—meaning you owe more than the property is worth—we can discuss options, but a standard sale may not be possible.',
  },
  {
    question: 'What if my vacant property has squatters or unauthorized occupants?',
    answer: 'This situation requires careful handling. We have experience purchasing properties with occupancy issues, but the approach depends on whether occupants have established any legal claim to tenancy. Contact us to discuss the specifics.',
  },
]

export default function VacantPropertyPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
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
    name: 'Vacant Property Cash Buying Service',
    provider: {
      '@type': 'LocalBusiness',
      name: 'ClearEdge Home Buyers',
      telephone: '+1-570-904-2059',
      url: 'https://clearedgehomebuyers.com',
      areaServed: [
        { '@type': 'State', name: 'Pennsylvania' },
        { '@type': 'City', name: 'Scranton' },
        { '@type': 'City', name: 'Allentown' },
        { '@type': 'City', name: 'Wilkes-Barre' },
      ],
    },
    description: 'Cash home buying service for vacant properties in Eastern Pennsylvania. No inspections, no repairs, closings in 14 days.',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 41.4089,
        longitude: -75.6624,
      },
      geoRadius: '100 miles',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Header />

      <main className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* NO-B.S. HEADER */}
          <section className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sell Vacant House Pennsylvania: Skip the Liability, Keep Your Equity
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              A vacant property in Pennsylvania costs you money every month it sits empty.
              We buy vacant houses across Eastern PA in as-is condition with no inspections, no repairs, and closings in as few as 14 days.
            </p>
          </section>

          {/* THE 2026 LOCAL/SITUATIONAL REALITY */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What Does Owning a Vacant Property in Pennsylvania Actually Cost You in 2026?
            </h2>
            <p className="text-gray-700 mb-4">
              The costs extend far beyond your mortgage payment.
              Here&apos;s the reality most owners don&apos;t calculate until it&apos;s too late:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Vacant Property Registration Fees:</strong> Cities like Allentown, Reading, and Scranton require registration of vacant properties, with annual fees ranging from $150 to $500 and penalties for non-compliance reaching $1,000+ per violation.
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Insurance Premium Spikes:</strong> Standard homeowners policies cancel after 30-60 days of vacancy. Vacant property insurance costs 50-100% more than occupied coverage, and many carriers won&apos;t write policies at all for properties vacant longer than 12 months.
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>2026 UCC Compliance:</strong> Pennsylvania&apos;s statewide adoption of the 2021 International Building Code on January 1, 2026 means any property that triggers inspection—including during a sale—must meet updated egress, electrical, and structural standards.
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Municipal Code Enforcement:</strong> Reading uses GovOS software to track properties with rolling 30-day inspection cycles. Allentown requires a 5-day pre-sale inspection before any closing. Scranton enforces quality-of-life codes that can generate daily fines for unmaintained exteriors.
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Property Tax Acceleration:</strong> In Lackawanna, Lehigh, and Luzerne Counties, vacant properties flagged for code violations can face expedited tax lien proceedings, sometimes within 12 months of the first citation.
                </span>
              </li>
            </ul>
          </section>

          {/* WHAT MOST HOMEOWNERS DON'T REALIZE */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What Are the Hidden Risks of a Vacant Property Most Owners Miss?
            </h2>
            <p className="text-gray-700 mb-4">
              The visible costs are only part of the equation.
              The risks that catch most owners off guard are the ones that compound silently.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              Liability Exposure Doesn&apos;t End at the Property Line
            </h3>
            <p className="text-gray-700 mb-4">
              If someone is injured on your vacant property—whether a trespasser, a squatter, or a neighbor&apos;s kid retrieving a ball—you carry liability.
              Pennsylvania&apos;s premises liability laws hold owners responsible for known hazards, and courts have ruled that prolonged vacancy itself can constitute a known hazard.
              This is especially true if the property has visible signs of deterioration, unsecured entry points, or code violations on record.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              Squatter Risk Is Real and Legally Complex
            </h3>
            <p className="text-gray-700 mb-4">
              Pennsylvania&apos;s adverse possession statute requires 21 years of continuous occupation before ownership transfers.
              That sounds reassuring until you realize that removing a squatter who claims tenancy requires formal eviction proceedings.
              If someone changes the locks and presents a fabricated lease, you&apos;re looking at 60-90 days of legal process minimum.
              During that time, you remain responsible for the property and any damage caused.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              Utility Issues Create Cascading Damage
            </h3>
            <p className="text-gray-700 mb-4">
              A vacant property with winterized plumbing still faces risks.
              A single pipe failure can mean $15,000-$40,000 in water damage before anyone notices.
              If you&apos;ve shut off utilities to save money, you&apos;ve also shut off the ability to monitor for leaks, mold growth, or HVAC system failures.
              Insurance claims for vacant properties are routinely denied if the insurer determines negligent monitoring.
            </p>
            <p className="text-gray-700">
              For a deeper look at how property condition affects your options, see our guide on{' '}
              <Link href="/situations/fire-damage" className="text-blue-600 hover:underline">
                selling fire-damaged properties
              </Link>{' '}
              or{' '}
              <Link href="/situations/code-violations" className="text-blue-600 hover:underline">
                dealing with code violations
              </Link>.
            </p>
          </section>

          {/* THE CLEAREDGE PRODUCT ADVANTAGE */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How Does Selling to ClearEdge Eliminate Vacant Property Risk?
            </h2>
            <p className="text-gray-700 mb-4">
              Our process is designed to remove uncertainty, not add pressure.
              Here&apos;s exactly what working with us eliminates:
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What We Remove From Your Plate</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>No Marketing Period:</strong> Vacant properties average 45-90 days on market in Eastern PA. Every day is another day of liability, fees, and carrying costs. We make an offer within 24-48 hours of seeing the property.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>No Repairs or Cleaning:</strong> Leave everything. Furniture, debris, deferred maintenance—we factor it into our offer and handle it after closing.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>No Inspections:</strong> Traditional sales in Allentown require pre-sale inspections. Sales in Reading trigger GovOS enforcement reviews. We buy as-is, bypassing municipal inspection requirements.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>No Financing Contingencies:</strong> We close with cash. No bank appraisals, no lender delays, no deal falling through at the last minute.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>No Showings:</strong> Vacant properties require you to coordinate access, maintain presentation, and worry about security between visits. We see it once, make our offer, and close.
                  </span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              How Our Timeline Works
            </h3>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                <strong className="mr-2">Day 1:</strong> You contact us with basic property information.
              </p>
              <p className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                <strong className="mr-2">Day 2-3:</strong> We visit the property and make a written cash offer.
              </p>
              <p className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                <strong className="mr-2">Day 4-14:</strong> We close at a local title company on your schedule.
              </p>
            </div>
            <p className="text-gray-700 mt-4">
              If you need more time, we&apos;ll work with your timeline.
              If you need to close faster, we can often accommodate that too.
            </p>
          </section>

          {/* REGIONAL CONTEXT */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Where Does ClearEdge Buy Vacant Properties in Pennsylvania?
            </h2>
            <p className="text-gray-700 mb-4">
              We buy vacant houses throughout Eastern Pennsylvania, with deep experience in:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  NEPA
                </h3>
                <p className="text-gray-600 text-sm">
                  <Link href="/locations/scranton" className="text-blue-600 hover:underline">Scranton</Link>,{' '}
                  <Link href="/locations/wilkes-barre" className="text-blue-600 hover:underline">Wilkes-Barre</Link>,{' '}
                  <Link href="/locations/hazleton" className="text-blue-600 hover:underline">Hazleton</Link>,{' '}
                  <Link href="/locations/pittston" className="text-blue-600 hover:underline">Pittston</Link>,{' '}
                  <Link href="/locations/carbondale" className="text-blue-600 hover:underline">Carbondale</Link>,{' '}
                  <Link href="/locations/kingston" className="text-blue-600 hover:underline">Kingston</Link>,{' '}
                  <Link href="/locations/dunmore" className="text-blue-600 hover:underline">Dunmore</Link>,{' '}
                  <Link href="/locations/nanticoke" className="text-blue-600 hover:underline">Nanticoke</Link>
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  Lehigh Valley
                </h3>
                <p className="text-gray-600 text-sm">
                  <Link href="/locations/allentown" className="text-blue-600 hover:underline">Allentown</Link>,{' '}
                  <Link href="/locations/bethlehem" className="text-blue-600 hover:underline">Bethlehem</Link>,{' '}
                  <Link href="/locations/easton" className="text-blue-600 hover:underline">Easton</Link>,{' '}
                  <Link href="/locations/reading" className="text-blue-600 hover:underline">Reading</Link>
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  Poconos
                </h3>
                <p className="text-gray-600 text-sm">
                  <Link href="/locations/stroudsburg" className="text-blue-600 hover:underline">Stroudsburg</Link>,{' '}
                  <Link href="/locations/east-stroudsburg" className="text-blue-600 hover:underline">East Stroudsburg</Link>,{' '}
                  <Link href="/locations/honesdale" className="text-blue-600 hover:underline">Honesdale</Link>,{' '}
                  <Link href="/locations/pocono-pines" className="text-blue-600 hover:underline">Pocono Pines</Link>,{' '}
                  <Link href="/locations/tannersville" className="text-blue-600 hover:underline">Tannersville</Link>
                </p>
              </div>
            </div>
            <p className="text-gray-700">
              Each municipality has different registration requirements, enforcement timelines, and inspection protocols.
              We&apos;ve navigated all of them since 2016.
            </p>
          </section>

          {/* TRUST-BUILDING FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions About Selling a Vacant House in PA
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How much do you pay for vacant properties?
                </h3>
                <p className="text-gray-700">
                  We typically offer 70-85% of after-repair market value, minus estimated repair costs.
                  The exact number depends on location, condition, and local market comps.
                  Our offers account for the fact that you&apos;re avoiding 6% agent commissions, 3-4% closing costs, and months of carrying costs.
                  For many vacant property owners, the net proceeds are comparable to—or better than—a traditional sale after all costs are factored.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What if my vacant property has code violations?
                </h3>
                <p className="text-gray-700">
                  We buy properties with active code violations regularly.
                  In fact, vacant properties with violations are one of our specialties.
                  We handle the violation resolution after closing.
                  See our{' '}
                  <Link href="/situations/code-violations" className="text-blue-600 hover:underline">
                    code violations guide
                  </Link>{' '}
                  for more detail on how municipal enforcement works in Eastern PA.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What if I inherited the vacant property and I&apos;m not local?
                </h3>
                <p className="text-gray-700">
                  Out-of-state owners are among the most common sellers we work with.
                  We coordinate everything remotely—title work, notarization, and closing.
                  You don&apos;t need to visit the property or travel to Pennsylvania.
                  For inherited properties, we also work with estates in probate.
                  See our{' '}
                  <Link href="/situations/inherited-property" className="text-blue-600 hover:underline">
                    inherited property guide
                  </Link>{' '}
                  for specific processes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I sell if I have a mortgage on the vacant property?
                </h3>
                <p className="text-gray-700">
                  Yes, as long as our offer covers the remaining mortgage balance plus closing costs.
                  If you&apos;re underwater—meaning you owe more than the property is worth—we can discuss options, but a standard sale may not be possible.
                  If you&apos;re{' '}
                  <Link href="/situations/behind-on-payments" className="text-blue-600 hover:underline">
                    behind on mortgage payments
                  </Link>{' '}
                  or facing{' '}
                  <Link href="/situations/foreclosure" className="text-blue-600 hover:underline">
                    foreclosure
                  </Link>, time matters.
                  Contact us early to understand your options.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What if my vacant property has squatters or unauthorized occupants?
                </h3>
                <p className="text-gray-700">
                  This situation requires careful handling.
                  We have experience purchasing properties with occupancy issues, but the approach depends on whether occupants have established any legal claim to tenancy.
                  Contact us to discuss the specifics.
                  Depending on the situation, we may be able to purchase the property and handle occupant removal post-closing, or we may need to wait until occupancy is resolved.
                </p>
              </div>
            </div>
          </section>

          {/* SOFT NEXT STEP */}
          <section className="mb-12">
            <div className="bg-blue-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get a No-Obligation Cash Offer for Your Vacant Property
              </h2>
              <p className="text-gray-700 mb-4">
                If you&apos;re carrying a vacant property in Pennsylvania and want to understand your options, we&apos;re here to help.
                There&apos;s no pressure, no obligation, and no cost to get a written offer.
              </p>
              <p className="text-gray-700 mb-6">
                Call us directly at{' '}
                <a href="tel:5709042059" className="text-blue-600 font-semibold hover:underline">
                  (570) 904-2059
                </a>{' '}
                or fill out the form below.
                We&apos;ll respond within 24 hours with next steps.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Request Your Cash Offer
              </Link>
            </div>
          </section>

          {/* CLOSING KEYWORD ANCHOR */}
          <section>
            <p className="text-gray-600 text-sm">
              ClearEdge Home Buyers has helped over 200 homeowners sell vacant house Pennsylvania properties since 2016.
              We&apos;re a local, family-owned company serving NEPA, Lehigh Valley, and the Poconos.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
