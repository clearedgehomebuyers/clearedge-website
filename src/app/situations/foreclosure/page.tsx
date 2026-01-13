import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sell Your House in Foreclosure Pennsylvania | ClearEdge Home Buyers',
  description: 'Facing foreclosure in PA? Sell your house before the sheriff sale. Get a cash offer from ClearEdge. No repairs, no fees, close fast.',
  keywords: 'sell house foreclosure Pennsylvania, sell home before sheriff sale PA, cash home buyer foreclosure, stop foreclosure Pennsylvania, sell house fast foreclosure',
  openGraph: {
    title: 'Sell Your House in Foreclosure Pennsylvania | ClearEdge Home Buyers',
    description: 'Facing foreclosure in PA? You can still sell your house before the sheriff sale. Get a cash offer with no repairs, no fees, and close on your timeline.',
    url: 'https://clearedgehomebuyers.com/situations/foreclosure',
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
    canonical: 'https://clearedgehomebuyers.com/situations/foreclosure',
  },
}

const faqs = [
  {
    question: 'How late can I sell my house before a sheriff sale in Pennsylvania?',
    answer: 'You can legally sell your house up until the moment the sheriff sale is confirmed by the court. In practice, you need at least 7-14 days to close with a cash buyer. Title work, payoff letters, and deed preparation take time even when everything else moves fast.',
  },
  {
    question: 'Will I owe money after selling my house in foreclosure?',
    answer: 'It depends on your equity position. If you sell for more than you owe (including all liens, back taxes, and fees), you keep the surplus. If you are underwater, a short sale may require lender approval but often includes a release from the deficiency.',
  },
  {
    question: 'Does selling stop the foreclosure on my credit report?',
    answer: 'Selling before the foreclosure completes prevents a foreclosure entry on your credit report. Late payments will still appear, but a completed foreclosure is far more damaging and stays on your report for seven years.',
  },
  {
    question: 'Can I sell if I have other liens or judgments on the property?',
    answer: 'Liens complicate sales but do not necessarily prevent them. Municipal liens, second mortgages, and judgment liens all need to be addressed at closing. Sometimes they are paid in full from proceeds; sometimes they are negotiated down.',
  },
  {
    question: 'Can I sell if I have already received a sheriff sale date?',
    answer: 'Yes—a scheduled sale date does not prevent you from selling. As long as the sale has not been confirmed, you retain ownership and the right to sell. Time is compressed, but options remain.',
  },
]

export default function ForeclosurePage() {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Sell Your House in Foreclosure in Pennsylvania Before the Sheriff Sale
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              You still own your house until the gavel drops.
              That window is your leverage—and we help homeowners use it every week across Eastern PA.
            </p>
          </div>
        </section>

        {/* The 2026 Pennsylvania Foreclosure Reality */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              What Does the Pennsylvania Foreclosure Timeline Actually Look Like in 2026?
            </h2>
            <p className="text-slate-700 mb-6">
              Pennsylvania is a judicial foreclosure state, meaning your lender must go through the court system to take your home.
            </p>
            <p className="text-slate-700 mb-6">
              This is slower than non-judicial states—and that delay works in your favor.
            </p>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Act 91 Notice Required:</strong> Before filing foreclosure, lenders must send a 30-day notice offering you access to homeowner assistance programs. This is mandatory under Pennsylvania law.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Average Timeline:</strong> From first missed payment to sheriff sale, expect 9-15 months in most Pennsylvania counties. Lackawanna, Luzerne, and Lehigh Counties often fall in the 10-12 month range.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Sheriff Sale Scheduling:</strong> Each county runs sales on its own calendar. Lackawanna County holds sheriff sales monthly. Lehigh County schedules them every few weeks.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Deficiency Judgments Are Legal:</strong> If your home sells at auction for less than you owe, the lender can pursue you for the difference. This is not theoretical—it happens.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>2026 Court Backlogs:</strong> Post-pandemic case volume and new UCC compliance requirements (effective January 1, 2026) have created delays in some county courts. This extends your window—but not indefinitely.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* What Most Homeowners Don't Realize */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              What Do Most Homeowners in Foreclosure Get Wrong?
            </h2>
            <p className="text-slate-700 mb-6">
              The biggest mistake is assuming foreclosure means you&apos;ve already lost.
            </p>
            <p className="text-slate-700 mb-6">
              You haven&apos;t.
            </p>
            <p className="text-slate-700 mb-6">
              Until the sheriff sale is complete and the deed transfers, you remain the legal owner.
              That means you can still sell.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-10 mb-4">
              Can You Sell a House During Foreclosure in Pennsylvania?
            </h3>
            <p className="text-slate-700 mb-6">
              Yes—you can sell your house at any point before the sheriff sale is finalized.
            </p>
            <p className="text-slate-700 mb-6">
              If you sell for more than you owe, you keep the difference.
              If you sell for less (a short sale), you&apos;ll need lender approval, but you avoid the auction and often negotiate away the deficiency.
            </p>
            <p className="text-slate-700 mb-6">
              Either way, selling stops the foreclosure from completing on your record.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-10 mb-4">
              Why Do People Wait Too Long?
            </h3>
            <p className="text-slate-700 mb-6">
              Shame, confusion, and bad advice.
            </p>
            <p className="text-slate-700 mb-4">
              Some homeowners believe they need to &quot;catch up&quot; before they can do anything.
              Others think listing with an agent is their only option—not realizing that a traditional sale takes 60-90 days minimum, and foreclosure timelines don&apos;t pause for MLS listings.
            </p>
            <p className="text-slate-700">
              The result: they run out of runway and lose options they didn&apos;t know they had.
            </p>
          </div>
        </section>

        {/* The ClearEdge Approach */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              How Does Selling to ClearEdge Work When You&apos;re Facing Foreclosure?
            </h2>
            <p className="text-slate-700 mb-6">
              We buy houses directly from homeowners—no agents, no listings, no waiting for buyer financing to clear.
            </p>
            <p className="text-slate-700 mb-6">
              Here&apos;s why that matters when time is short:
            </p>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">We Close on Your Timeline</h3>
                <p className="text-slate-600">
                  If your sheriff sale is in 3 weeks, we can close in 2.
                  If you need 45 days to relocate, we can wait.
                  The schedule is yours to set.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">We Handle Title and Lien Complexity</h3>
                <p className="text-slate-600">
                  Foreclosure often means judgments, second mortgages, or municipal liens stacked on the property.
                  We work with title companies daily to clear these issues—it&apos;s not a dealbreaker for us.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">No Repairs, No Cleaning, No Inspections</h3>
                <p className="text-slate-600">
                  We buy as-is.
                  If you&apos;re already stretched thin, the last thing you need is someone asking you to fix the roof before they&apos;ll make an offer.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">We Coordinate with Your Lender</h3>
                <p className="text-slate-600">
                  If a short sale is needed, we&apos;ve done dozens.
                  We know what lenders need to see, and we move faster than most because we&apos;re not waiting on buyer approval chains.
                </p>
              </div>
            </div>

            <p className="text-slate-700 mt-8">
              Since 2016, we&apos;ve helped over 200 homeowners across Eastern PA—including many facing foreclosure in{' '}
              <Link href="/locations/scranton" className="text-amber-600 hover:text-amber-700 underline">Scranton</Link>,{' '}
              <Link href="/locations/wilkes-barre" className="text-amber-600 hover:text-amber-700 underline">Wilkes-Barre</Link>,{' '}
              <Link href="/locations/allentown" className="text-amber-600 hover:text-amber-700 underline">Allentown</Link>, and throughout the{' '}
              <Link href="/locations/lehigh-valley" className="text-amber-600 hover:text-amber-700 underline">Lehigh Valley</Link> and{' '}
              <Link href="/locations/poconos" className="text-amber-600 hover:text-amber-700 underline">Poconos</Link>.
            </p>
          </div>
        </section>

        {/* Your Options Compared */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              What Are Your Options When Facing Foreclosure in Pennsylvania?
            </h2>
            <p className="text-slate-700 mb-6">
              You have more paths than you think—but each has tradeoffs.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="py-4 pr-4 font-semibold text-slate-900">Option</th>
                    <th className="py-4 pr-4 font-semibold text-slate-900">Timeline</th>
                    <th className="py-4 pr-4 font-semibold text-slate-900">Credit Impact</th>
                    <th className="py-4 font-semibold text-slate-900">Key Consideration</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-b border-slate-200">
                    <td className="py-4 pr-4 font-medium">Reinstatement</td>
                    <td className="py-4 pr-4">Immediate</td>
                    <td className="py-4 pr-4">Minimal (if current)</td>
                    <td className="py-4">Requires paying all missed payments plus fees in full</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 pr-4 font-medium">Loan Modification</td>
                    <td className="py-4 pr-4">2-6 months</td>
                    <td className="py-4 pr-4">Moderate</td>
                    <td className="py-4">Lender must approve; doesn&apos;t always stop sale date</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 pr-4 font-medium">Bankruptcy (Ch. 13)</td>
                    <td className="py-4 pr-4">3-5 years</td>
                    <td className="py-4 pr-4">Severe</td>
                    <td className="py-4">Automatic stay halts foreclosure; must repay arrears over time</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 pr-4 font-medium">Traditional Sale</td>
                    <td className="py-4 pr-4">60-120 days</td>
                    <td className="py-4 pr-4">Depends on timing</td>
                    <td className="py-4">May not close before sheriff sale</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 pr-4 font-medium">Short Sale</td>
                    <td className="py-4 pr-4">45-90 days</td>
                    <td className="py-4 pr-4">Moderate</td>
                    <td className="py-4">Requires lender approval; can negotiate deficiency release</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 pr-4 font-medium">Cash Sale to Investor</td>
                    <td className="py-4 pr-4">7-21 days</td>
                    <td className="py-4 pr-4">Minimal (if equity sale)</td>
                    <td className="py-4">Fastest path; no repairs or contingencies</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-medium">Let It Go to Auction</td>
                    <td className="py-4 pr-4">End of process</td>
                    <td className="py-4 pr-4">Severe</td>
                    <td className="py-4">Foreclosure on record for 7 years; deficiency judgment possible</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-700 mt-6">
              We&apos;re not here to tell you which option is &quot;best.&quot;
              That depends on your equity, your timeline, and what matters most to you.
              Our role is to make sure you understand the cash sale option clearly—because most homeowners don&apos;t know it exists until it&apos;s almost too late.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Frequently Asked Questions About Selling a House in Foreclosure
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  How Late Can I Sell My House Before a Sheriff Sale in Pennsylvania?
                </h3>
                <p className="text-slate-700 mb-2">
                  You can legally sell your house up until the moment the sheriff sale is confirmed by the court.
                </p>
                <p className="text-slate-700">
                  In practice, you need at least 7-14 days to close with a cash buyer.
                  Title work, payoff letters, and deed preparation take time even when everything else moves fast.
                  The earlier you start, the more options you retain.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Will I Owe Money After Selling?
                </h3>
                <p className="text-slate-700 mb-2">
                  It depends on your equity position.
                </p>
                <p className="text-slate-700">
                  If you sell for more than you owe (including all liens, back taxes, and fees), you keep the surplus.
                  If you&apos;re underwater, a short sale may require lender approval—but it often includes a release from the deficiency, which is better than a judgment from auction.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Does Selling Stop the Foreclosure on My Credit Report?
                </h3>
                <p className="text-slate-700 mb-2">
                  Selling before the foreclosure completes prevents a foreclosure entry on your credit report.
                </p>
                <p className="text-slate-700">
                  Late payments will still appear, but a completed foreclosure is far more damaging—and stays on your report for seven years.
                  Selling early is the cleanest exit for your credit.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  What If I Have Other Liens or Judgments on the Property?
                </h3>
                <p className="text-slate-700 mb-2">
                  Liens complicate sales but don&apos;t necessarily prevent them.
                </p>
                <p className="text-slate-700">
                  Municipal liens, second mortgages, and judgment liens all need to be addressed at closing.
                  Sometimes they&apos;re paid in full from proceeds; sometimes they&apos;re negotiated down.
                  We work with title companies that handle complex lien situations regularly across{' '}
                  <Link href="/locations/hazleton" className="text-amber-600 hover:text-amber-700 underline">Hazleton</Link>,{' '}
                  <Link href="/locations/reading" className="text-amber-600 hover:text-amber-700 underline">Reading</Link>, and the surrounding areas.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Can I Sell If I&apos;ve Already Received a Sheriff Sale Date?
                </h3>
                <p className="text-slate-700 mb-2">
                  Yes—a scheduled sale date does not prevent you from selling.
                </p>
                <p className="text-slate-700">
                  Many of the homeowners we work with come to us after receiving their sale notice.
                  As long as the sale hasn&apos;t been confirmed, you retain ownership and the right to sell.
                  Time is compressed, but options remain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Situations */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Related Situations We Help With
            </h2>
            <p className="text-slate-700 mb-6">
              Foreclosure rarely happens in isolation.
              These situations often overlap:
            </p>
            <ul className="space-y-3 text-slate-700">
              <li>
                <Link href="/situations/behind-on-payments" className="text-amber-600 hover:text-amber-700 underline">Behind on Payments</Link> —{' '}
                If you&apos;re not yet in foreclosure but falling behind, acting early gives you the most options.
              </li>
              <li>
                <Link href="/situations/tax-liens-code-violations" className="text-amber-600 hover:text-amber-700 underline">Tax Liens</Link> —{' '}
                Unpaid property taxes can accelerate timelines and add complexity to any sale.
              </li>
              <li>
                <Link href="/situations/divorce" className="text-amber-600 hover:text-amber-700 underline">Divorce</Link> —{' '}
                Contested ownership or split finances can make mortgage payments fall through the cracks.
              </li>
              <li>
                <Link href="/situations/inherited-property" className="text-amber-600 hover:text-amber-700 underline">Inherited Property</Link> —{' '}
                Inheriting a house with an existing mortgage you can&apos;t afford is a common path into foreclosure.
              </li>
              <li>
                <Link href="/situations/vacant-property" className="text-amber-600 hover:text-amber-700 underline">Vacant Property</Link> —{' '}
                A vacant home in foreclosure can accumulate code violations and municipal fines quickly.
              </li>
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-16 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Want to Know What Your House Is Worth—Even in Foreclosure?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              No obligation.
              No pressure.
              Just a clear picture of what a cash sale could look like for your situation.
            </p>
            <p className="text-slate-300 mb-8">
              Call us at{' '}
              <a href="tel:5709042059" className="text-amber-400 hover:text-amber-300 font-semibold">
                (570) 904-2059
              </a>{' '}
              or request an offer below.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Get Your Cash Offer
            </Link>
            <p className="text-slate-400 text-sm mt-6">
              We help homeowners sell houses in foreclosure across Pennsylvania—including Eastern PA markets where we&apos;ve closed over 200 transactions since 2016.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
