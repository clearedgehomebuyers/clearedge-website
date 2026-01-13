import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sell House During Divorce Pennsylvania | ClearEdge Home Buyers',
  description:
    'Selling your house during a PA divorce? Cash offer in 48 hours. No repairs, no showings, proceeds split at closing.',
  keywords:
    'sell house during divorce Pennsylvania, divorce home sale PA, selling house in divorce, cash home buyer divorce, equitable distribution Pennsylvania, sell marital home fast',
  openGraph: {
    title: 'Sell House During Divorce Pennsylvania | ClearEdge Home Buyers',
    description:
      'Convert your shared property into separate cash without delays or disputes. Cash offers in 48 hours, close on your timeline.',
    url: 'https://clearedgehomebuyers.com/situations/divorce',
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
    canonical: 'https://clearedgehomebuyers.com/situations/divorce',
  },
}

const faqData = [
  {
    question: 'Do both spouses have to sign to sell a house in Pennsylvania?',
    answer:
      'Yes, both spouses must sign the deed for a valid sale unless a court order authorizes otherwise. If your spouse is uncooperative, your divorce attorney can petition for court authorization.',
  },
  {
    question: 'Should we sell the house before or after the divorce is final?',
    answer:
      'Selling before finalization often provides cleaner accounting for equitable distribution and may preserve capital gains exclusion benefits. However, timing depends on your specific situation. Consult your divorce attorney about how sale proceeds will be treated in your case.',
  },
  {
    question: 'How fast can you close on a divorce sale?',
    answer:
      'We can close in as few as 14 days when both parties are aligned and documentation is ready. Most divorce sales close in 21-30 days to allow time for attorney review and coordination with court timelines.',
  },
  {
    question: 'Can sale proceeds be split between spouses at closing?',
    answer:
      'Yes, the title company can wire funds to separate accounts according to your settlement agreement. Your attorneys specify the split. The title company executes it.',
  },
  {
    question: "What if the house needs repairs we can't agree on?",
    answer:
      'A cash sale eliminates repair disputes entirely because we buy as-is. No negotiations about who pays for what. The condition is factored into our offer upfront.',
  },
]

export default function DivorcePage() {
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
    name: 'Divorce Home Sale Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'ClearEdge Home Buyers',
      telephone: '+1-570-904-2059',
      url: 'https://clearedgehomebuyers.com',
      areaServed: [
        { '@type': 'State', name: 'Pennsylvania' },
        { '@type': 'AdministrativeArea', name: 'Lehigh Valley' },
        { '@type': 'AdministrativeArea', name: 'Northeastern Pennsylvania' },
        { '@type': 'AdministrativeArea', name: 'Poconos' },
      ],
    },
    description:
      'Cash home buying services for couples selling property during divorce proceedings in Pennsylvania. Fast closing, as-is purchase, proceeds split at closing.',
    serviceType: 'Cash Home Purchase',
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

      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        {/* Header */}
        <section className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Sell House During Divorce Pennsylvania: A Clear Path Forward
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            When a marriage ends, the house becomes a problem to solve, not an
            asset to optimize. We help Pennsylvania couples convert shared
            property into separate cash without the delays, disputes, or listing
            drama.
          </p>
        </section>

        {/* Pennsylvania Divorce Reality */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What Does Pennsylvania Law Require When Selling a House During
            Divorce?
          </h2>
          <p className="text-gray-700 mb-4">
            Pennsylvania is an equitable distribution state, which means marital
            assets are divided fairly—not necessarily 50/50.
          </p>
          <p className="text-gray-700 mb-4">
            Here&apos;s what that means for your home sale in 2026:
          </p>
          <ul className="space-y-3 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <span>
                <strong>Both spouses must consent to the sale</strong> unless a
                court order grants one party authority to sell.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <span>
                <strong>Mutual consent divorces</strong> require a 90-day
                waiting period minimum. Contested divorces in PA average 18-24
                months.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <span>
                <strong>Pennsylvania transfer tax (2%)</strong> applies to most
                sales. Some counties add additional local transfer taxes.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <span>
                <strong>Marital property includes appreciation</strong> on homes
                purchased before marriage if marital funds improved the
                property.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <span>
                <strong>Capital gains exclusion</strong> may be affected:
                $500,000 for married couples filing jointly drops to $250,000
                per individual post-divorce.
              </span>
            </li>
          </ul>
          <p className="text-gray-700">
            If one spouse has already moved out, you may also face occupancy
            requirement issues for capital gains exclusion eligibility—consult a
            tax professional.
          </p>
        </section>

        {/* Hidden Problems */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What Hidden Problems Delay Divorce Home Sales in Pennsylvania?
          </h2>
          <p className="text-gray-700 mb-4">
            The house itself is rarely the issue. The process is.
          </p>
          <p className="text-gray-700 mb-4">
            Most divorcing couples underestimate how a traditional listing
            extends their entanglement:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Timeline Reality Check
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Average PA home listing:</strong> 45-90 days to contract
              </li>
              <li>
                <strong>Buyer financing contingency:</strong> 30-45 additional
                days
              </li>
              <li>
                <strong>Inspection negotiations:</strong> Often restart the
                clock
              </li>
              <li>
                <strong>Appraisal gaps:</strong> Require renegotiation or cash
                from sellers
              </li>
            </ul>
          </div>
          <p className="text-gray-700 mb-4">
            Every week the house sits unsold is another week of shared mortgage
            payments, utility bills, and forced communication.
          </p>
          <p className="text-gray-700 mb-4">
            We&apos;ve seen divorces drag on for months simply because the house
            couldn&apos;t close before the court date.
          </p>
          <p className="text-gray-700">
            If your property has deferred maintenance or code issues, these
            problems multiply. Read our guide on{' '}
            <Link
              href="/situations/tax-liens-code-violations"
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              selling a house with code violations in PA
            </Link>{' '}
            if this applies to your situation.
          </p>
        </section>

        {/* Spouse Cooperation */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Can I Sell the House If My Spouse Won&apos;t Cooperate?
          </h2>
          <p className="text-gray-700 mb-4">
            Yes, but it requires legal intervention.
          </p>
          <p className="text-gray-700 mb-4">
            Pennsylvania courts can order a home sale as part of equitable
            distribution proceedings. This is called a &quot;partition
            sale&quot; when spouses cannot agree.
          </p>
          <p className="text-gray-700 mb-4">
            However, court-ordered sales add time and legal fees. A cash offer
            with flexible closing can sometimes resolve disputes faster than
            waiting for a court date.
          </p>
          <p className="text-gray-700 mb-4">
            When both parties want out, speed becomes the shared priority.
          </p>
          <p className="text-gray-700">
            We work with divorce attorneys throughout{' '}
            <Link
              href="/locations/scranton"
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              Scranton
            </Link>
            ,{' '}
            <Link
              href="/locations/allentown"
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              Allentown
            </Link>
            , and the{' '}
            <Link
              href="/locations/lehigh-valley"
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              Lehigh Valley
            </Link>{' '}
            to coordinate closings with divorce timelines.
          </p>
        </section>

        {/* ClearEdge Advantage */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            How Does a Cash Sale Simplify Divorce Property Division?
          </h2>
          <p className="text-gray-700 mb-4">
            Cash converts a complicated asset into a simple number.
          </p>
          <p className="text-gray-700 mb-4">
            When you sell to ClearEdge, the process removes the variables that
            create conflict:
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                What We Eliminate
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>❌ Staging disagreements</li>
                <li>❌ Showing schedules to coordinate</li>
                <li>❌ Repair negotiations</li>
                <li>❌ Buyer financing fall-throughs</li>
                <li>❌ Months of shared expenses</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">What You Get</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ One walkthrough</li>
                <li>✓ Written offer within 48 hours</li>
                <li>✓ You choose the closing date</li>
                <li>✓ No repairs required</li>
                <li>✓ Net proceeds wired to separate accounts</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            We can split proceeds directly at closing. Your attorney specifies
            the division. The title company executes it.
          </p>
          <p className="text-gray-700">
            Since 2016, we&apos;ve helped over 200 Eastern Pennsylvania
            homeowners close complicated sales. See our full{' '}
            <Link
              href="/how-it-works"
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              process breakdown
            </Link>{' '}
            for details.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Frequently Asked Questions: Selling During Divorce in PA
          </h2>

          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Do both spouses have to sign to sell a house in Pennsylvania?
              </h3>
              <p className="text-gray-700 mb-2">
                Yes, both spouses must sign the deed for a valid sale unless a
                court order authorizes otherwise.
              </p>
              <p className="text-gray-700">
                If your spouse is uncooperative, your divorce attorney can
                petition for court authorization. We can provide a written offer
                letter that attorneys often use to demonstrate the sale terms
                during proceedings.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Should we sell the house before or after the divorce is final?
              </h3>
              <p className="text-gray-700 mb-2">
                Selling before finalization often provides cleaner accounting
                for equitable distribution and may preserve capital gains
                exclusion benefits.
              </p>
              <p className="text-gray-700">
                However, timing depends on your specific situation. Consult your
                divorce attorney about how sale proceeds will be treated in your
                case.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How fast can you close on a divorce sale?
              </h3>
              <p className="text-gray-700 mb-2">
                We can close in as few as 14 days when both parties are aligned
                and documentation is ready.
              </p>
              <p className="text-gray-700">
                Most divorce sales close in 21-30 days to allow time for
                attorney review and coordination with court timelines. You set
                the date that works for your situation.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can sale proceeds be split between spouses at closing?
              </h3>
              <p className="text-gray-700 mb-2">
                Yes, the title company can wire funds to separate accounts
                according to your settlement agreement.
              </p>
              <p className="text-gray-700">
                Your attorneys specify the split. The title company executes it.
                Neither party has to trust the other to divide the money
                afterward.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What if the house needs repairs we can&apos;t agree on?
              </h3>
              <p className="text-gray-700 mb-2">
                A cash sale eliminates repair disputes entirely because we buy
                as-is.
              </p>
              <p className="text-gray-700">
                No negotiations about who pays for what. No contractors to
                schedule. No invoices to split. The condition is factored into
                our offer upfront.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Remove the House From Your Divorce Equation?
          </h2>
          <p className="text-gray-700 mb-4">
            A 15-minute call gives you a clear picture of what your home is
            worth in a cash sale.
          </p>
          <p className="text-gray-700 mb-6">
            No pressure. No obligation. Just clarity on one option for moving
            forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Request a Cash Offer
            </Link>
            <a
              href="tel:5709042059"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call (570) 904-2059
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            If you&apos;re working with an attorney, we&apos;re happy to speak
            with them directly.
          </p>
        </section>

        {/* Closing */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            ClearEdge Home Buyers helps Eastern Pennsylvania homeowners sell
            house during divorce Pennsylvania proceedings with speed, clarity,
            and dignity. Serving Lackawanna, Luzerne, Lehigh, Northampton,
            Monroe, and surrounding counties since 2016.
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}
