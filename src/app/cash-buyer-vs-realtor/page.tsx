import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, CheckCircle, XCircle, AlertTriangle, Phone, Check, X } from 'lucide-react'
import { V0Header } from '@/components/v0-header'
import { TrackedCTALink } from '@/components/TrackedCTALink'

const V0Footer = dynamic(() => import('@/components/v0-footer').then(mod => ({ default: mod.V0Footer })), { ssr: true })
const V0LeadForm = dynamic(() => import('@/components/v0-lead-form').then(mod => ({ default: mod.V0LeadForm })), { ssr: true })
const V0FAQ = dynamic(() => import('@/components/v0-faq').then(mod => ({ default: mod.V0FAQ })), { ssr: true })
const DynamicPhoneLink = dynamic(() => import('@/components/DynamicPhone').then(mod => ({ default: mod.DynamicPhoneLink })), { ssr: true })

export const metadata: Metadata = {
  title: 'Cash Buyer vs Realtor: Which Nets You More in PA? (2026 Math) | ClearEdge',
  description: "Should you sell your PA house to a cash buyer or list with a realtor? Honest side-by-side comparison with 2026 math from a local cash buyer who'll tell you when we're NOT your best option.",
  keywords: ['cash buyer vs realtor', 'sell house to investor or agent', 'is selling to cash buyer worth it', 'we buy houses vs listing with agent', 'should I sell to cash buyer or realtor PA'],
  openGraph: {
    title: 'Cash Buyer vs Realtor: Which Nets You More in PA? (2026 Math) | ClearEdge',
    description: "Should you sell your PA house to a cash buyer or list with a realtor? Honest side-by-side comparison with 2026 math from a local cash buyer who'll tell you when we're NOT your best option.",
    url: 'https://www.clearedgehomebuyers.com/cash-buyer-vs-realtor',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: 'https://www.clearedgehomebuyers.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cash Buyer vs. Realtor Comparison - ClearEdge Home Buyers',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.clearedgehomebuyers.com/cash-buyer-vs-realtor',
  },
}

const faqs = [
  {
    question: 'Will I get less money selling to a cash buyer?',
    answer: "Generally, yes — cash offers are below full market value because cash buyers account for repair costs, carrying costs, and their operating margin. However, once you subtract the commissions (5.81% average in Pennsylvania), repair costs ($10K-$50K+), seller closing costs (~2%), and carrying costs from a traditional sale, the net difference is often much smaller than people expect — and sometimes a cash offer actually nets more for homes that need significant work. We break down the real math with two PA-specific examples on this page.",
  },
  {
    question: 'Can I get a cash offer AND list with a realtor at the same time?',
    answer: "Absolutely. Many homeowners get a cash offer first as a baseline, then decide whether the potential upside of listing is worth the time, cost, and uncertainty. A cash offer from ClearEdge is free and comes with zero obligation.",
  },
  {
    question: 'How do I know if a cash buyer is legitimate?',
    answer: "Check Google reviews, ask for proof of funds, verify they have a local presence, and make sure they can explain exactly how they calculated their offer. If anything feels off, walk away. For a complete guide on spotting scams, see our page on whether cash home buyers are legit.",
  },
  {
    question: 'Do cash buyers in Pennsylvania pay fair prices?',
    answer: "Legitimate cash buyers make offers based on transparent formulas — after-repair value minus renovation costs, carrying costs, and operating margin. At ClearEdge, we walk you through every number. Our offers are competitive because we buy and hold locally, which means we can often pay more than flippers who need larger margins.",
  },
  {
    question: "What if I'm not sure which option is right for me?",
    answer: "Call us. Seriously. We've referred homeowners to realtors when that was the better path. Our goal is to be helpful, even if that means we're not the right fit. Call Tyler at (610) 904-8526 for an honest conversation about your options.",
  },
  {
    question: 'Does ClearEdge serve all of Eastern Pennsylvania?',
    answer: "Yes. We buy homes throughout NEPA, the Lehigh Valley, and the Poconos — 21 communities across Eastern PA.",
  },
]


export default function CashBuyerVsRealtorPage() {
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
                '@type': 'Article',
                '@id': 'https://www.clearedgehomebuyers.com/cash-buyer-vs-realtor/#article',
                headline: 'Cash Buyer vs. Realtor: Which Is the Right Way to Sell Your PA House?',
                description: "An honest, side-by-side comparison from a local cash buyer who'll tell you when we're NOT your best option.",
                author: {
                  '@type': 'Person',
                  name: 'Tyler Swenson',
                },
                publisher: {
                  '@id': 'https://www.clearedgehomebuyers.com/#organization',
                },
                datePublished: '2026-02-06',
                dateModified: '2026-02-06',
                mainEntityOfPage: 'https://www.clearedgehomebuyers.com/cash-buyer-vs-realtor',
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://www.clearedgehomebuyers.com/cash-buyer-vs-realtor/#breadcrumb',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://www.clearedgehomebuyers.com',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Cash Buyer vs. Realtor',
                    item: 'https://www.clearedgehomebuyers.com/cash-buyer-vs-realtor',
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://www.clearedgehomebuyers.com/cash-buyer-vs-realtor/#faq',
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
        <V0Header />

        {/* HERO SECTION */}
        <section className="relative pt-32 pb-10 md:pb-12 px-4 overflow-hidden bg-surface-cream">
          <div className="relative max-w-4xl mx-auto text-center">
            <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
              Honest Comparison
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium text-ce-ink mb-6 leading-tight">
              Cash Buyer vs. Realtor: Which Is the Right Way to Sell Your PA House?
            </h1>
            <p className="text-xl text-ce-ink/70 mb-8 max-w-3xl mx-auto">
              An honest, side-by-side comparison from a local cash buyer who&apos;ll tell you when we&apos;re NOT your best option.
            </p>
            <TrackedCTALink
              href="#lead-form"
              label="Get Your No-Obligation Cash Offer"
              eventLabel="Get Your No-Obligation Cash Offer - Cash vs Realtor Hero"
            />
          </div>
        </section>


        {/* SECTION 2: THE HONEST TRUTH */}
        <section id="honest-truth" className="py-12 md:py-14 bg-white scroll-mt-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Real Talk
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                The Honest Truth: Neither Option Is Always Better
              </h2>
            </div>
            <div className="text-lg text-ce-ink/70 space-y-6 leading-relaxed">
              <p>
                Most comparison pages you&apos;ll find online are written by cash buyers trying to convince you to sell to them, or by agents trying to justify their commission. We&apos;re going to give you the real picture.
              </p>
              <p>
                I&apos;m Tyler Swenson, founder of ClearEdge Home Buyers. I&apos;ve purchased over 200 homes across Eastern Pennsylvania since 2016. I&apos;ve also referred homeowners to realtors when that was genuinely the better path. Here&apos;s the truth: the right choice depends on your property&apos;s condition, your timeline, your financial situation, and your tolerance for the traditional selling process.
              </p>
              <p>
                This guide breaks down both options honestly so you can make the decision that&apos;s right for you.
              </p>
              <div className="bg-surface-cream border-l-4 border-ce-green p-6 rounded-r-2xl">
                <p className="text-ce-ink/80">
                  <span className="font-semibold text-ce-ink">One thing worth knowing upfront:</span> cash sales are more common than most people think. According to the National Association of Realtors, nearly 1 in 3 home sales in late 2025 were all-cash transactions — the highest rate in over a decade. Meanwhile, 91% of sellers still use a real estate agent. Both paths work. The question is which one works for YOUR situation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: COMPARISON TABLE */}
        <section id="comparison-table" className="py-12 md:py-14 bg-surface-cream scroll-mt-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Full Comparison
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                Cash Buyer vs. Realtor: The Full Comparison
              </h2>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <div className="overflow-hidden rounded-2xl border border-ce-ink/10 shadow-lg bg-white">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-5 px-6 bg-surface-cream font-medium text-ce-ink/70 w-1/3">Factor</th>
                      <th className="text-center py-5 px-6 bg-ce-green text-white w-1/3">
                        <div className="flex flex-col items-center">
                          <CheckCircle className="w-6 h-6 mb-1" />
                          <span className="font-semibold">Cash Buyer</span>
                        </div>
                      </th>
                      <th className="text-center py-5 px-6 bg-surface-cream text-ce-ink/70 w-1/3">
                        <span className="font-semibold">Realtor</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-ce-ink/5">
                      <td className="py-5 px-6 font-medium text-ce-ink/70">Timeline to Close</td>
                      <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">7–30 days</td>
                      <td className="py-5 px-6 text-center text-ce-ink/70">60–120+ days</td>
                    </tr>
                    <tr className="border-t border-ce-ink/5">
                      <td className="py-5 px-6 font-medium text-ce-ink/70">Repairs Required</td>
                      <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">None — sell 100% as-is</td>
                      <td className="py-5 px-6 text-center text-ce-ink/70">$10,000–$30,000+ typically</td>
                    </tr>
                    <tr className="border-t border-ce-ink/5">
                      <td className="py-5 px-6 font-medium text-ce-ink/70">Commissions & Fees</td>
                      <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">$0</td>
                      <td className="py-5 px-6 text-center text-ce-ink/70">5.81% avg in PA (~$16K on $280K home)</td>
                    </tr>
                    <tr className="border-t border-ce-ink/5">
                      <td className="py-5 px-6 font-medium text-ce-ink/70">Showings</td>
                      <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">One visit from our team</td>
                      <td className="py-5 px-6 text-center text-ce-ink/70">Dozens of showings, open houses</td>
                    </tr>
                    <tr className="border-t border-ce-ink/5">
                      <td className="py-5 px-6 font-medium text-ce-ink/70">Certainty of Sale</td>
                      <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">Guaranteed — no financing contingencies</td>
                      <td className="py-5 px-6 text-center text-ce-ink/70">15–20% fall through</td>
                    </tr>
                    <tr className="border-t border-ce-ink/5">
                      <td className="py-5 px-6 font-medium text-ce-ink/70">Sale Price</td>
                      <td className="py-5 px-6 text-center bg-ce-green-subtle text-ce-ink/70">Below market value (we&apos;re transparent)</td>
                      <td className="py-5 px-6 text-center font-semibold text-ce-green">Potentially full market value</td>
                    </tr>
                    <tr className="border-t border-ce-ink/5">
                      <td className="py-5 px-6 font-medium text-ce-ink/70">Out-of-Pocket Costs</td>
                      <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">$0</td>
                      <td className="py-5 px-6 text-center text-ce-ink/70">Repairs, staging, carrying costs, commissions</td>
                    </tr>
                    <tr className="border-t border-ce-ink/5">
                      <td className="py-5 px-6 font-medium text-ce-ink/70">Inspections / Appraisals</td>
                      <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">None required</td>
                      <td className="py-5 px-6 text-center text-ce-ink/70">Can derail deals</td>
                    </tr>
                    <tr className="border-t border-ce-ink/5">
                      <td className="py-5 px-6 font-medium text-ce-ink/70">Negotiation</td>
                      <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">One straightforward offer</td>
                      <td className="py-5 px-6 text-center text-ce-ink/70">Back-and-forth, potential price reductions</td>
                    </tr>
                    <tr className="border-t border-ce-ink/5">
                      <td className="py-5 px-6 font-medium text-ce-ink/70">Privacy</td>
                      <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">Completely private</td>
                      <td className="py-5 px-6 text-center text-ce-ink/70">Public listing with photos online</td>
                    </tr>
                    <tr className="border-t border-ce-ink/5">
                      <td className="py-5 px-6 font-medium text-ce-ink/70">Stress Level</td>
                      <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">Minimal — one point of contact</td>
                      <td className="py-5 px-6 text-center text-ce-ink/70">Can be significant</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {[
                { factor: 'Timeline to Close', cash: '7–30 days', realtor: '60–120+ days', cashWins: true },
                { factor: 'Repairs Required', cash: 'None — sell 100% as-is', realtor: '$10K–$30K+ typically', cashWins: true },
                { factor: 'Commissions & Fees', cash: '$0', realtor: '5.81% avg in PA', cashWins: true },
                { factor: 'Showings', cash: 'One visit from our team', realtor: 'Dozens of showings', cashWins: true },
                { factor: 'Certainty of Sale', cash: 'Guaranteed', realtor: '15–20% fall through', cashWins: true },
                { factor: 'Sale Price', cash: 'Below market value', realtor: 'Potentially full value', cashWins: false },
                { factor: 'Out-of-Pocket Costs', cash: '$0', realtor: 'Repairs, staging, commissions', cashWins: true },
                { factor: 'Privacy', cash: 'Completely private', realtor: 'Public listing online', cashWins: true },
              ].map((row, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-ce-ink/10">
                  <h3 className="font-semibold text-ce-ink mb-3">{row.factor}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${row.cashWins ? 'bg-ce-green/10' : 'bg-gray-50'}`}>
                      <p className="text-xs text-ce-ink/50 mb-1">Cash Buyer</p>
                      <p className={`text-sm font-medium ${row.cashWins ? 'text-ce-green' : 'text-ce-ink/70'}`}>{row.cash}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${!row.cashWins ? 'bg-ce-green/10' : 'bg-gray-50'}`}>
                      <p className="text-xs text-ce-ink/50 mb-1">Realtor</p>
                      <p className={`text-sm font-medium ${!row.cashWins ? 'text-ce-green' : 'text-ce-ink/70'}`}>{row.realtor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: WHEN REALTOR IS BETTER */}
        <section id="when-realtor-better" className="py-12 md:py-14 bg-white scroll-mt-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Being Honest
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                When You Should List with a Realtor
              </h2>
            </div>
            <div className="text-lg text-ce-ink/70 space-y-6 leading-relaxed">
              <p>
                A traditional listing with a realtor is likely your best option if:
              </p>

              <div className="space-y-6">
                <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                  <h3 className="font-semibold text-ce-ink mb-2">Your home is in good, move-in-ready condition.</h3>
                  <p>If your property doesn&apos;t need major repairs and shows well, you&apos;ll likely get the highest price by exposing it to the open market. Well-maintained homes in desirable Eastern PA neighborhoods are selling quickly — in the <Link href="/locations/lehigh-valley" className="text-ce-green hover:underline">Lehigh Valley</Link>, move-in ready homes sell in about 22 days at or above asking price. <Link href="/locations/nepa" className="text-ce-green hover:underline">NEPA&apos;s</Link> hottest markets like <Link href="/locations/scranton" className="text-ce-green hover:underline">Scranton</Link> see well-priced homes go in under 10 days.</p>
                </div>

                <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                  <h3 className="font-semibold text-ce-ink mb-2">You have time to wait.</h3>
                  <p>The traditional process typically takes 60 to 120 days from listing to closing. If you&apos;re not under time pressure, this timeline allows for maximum market exposure and competitive offers.</p>
                </div>

                <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                  <h3 className="font-semibold text-ce-ink mb-2">You want to maximize sale price above all else.</h3>
                  <p>Cash buyers need to account for repair costs, carrying costs, and operating margins. A realtor sale to a retail buyer will generally yield a higher gross sale price — though the net difference narrows significantly once you subtract commissions, repairs, and carrying costs.</p>
                </div>

                <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                  <h3 className="font-semibold text-ce-ink mb-2">Your property will pass a standard inspection.</h3>
                  <p>Buyers who finance their purchase need a lender-approved appraisal and will typically request an inspection. If your home will pass both without major issues, the traditional route works in your favor.</p>
                </div>

                <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                  <h3 className="font-semibold text-ce-ink mb-2">You&apos;re comfortable with the process.</h3>
                  <p>Showings, negotiations, contingencies, and the possibility of deals falling through are all part of traditional selling. If you&apos;re prepared for that, a good agent can guide you through it.</p>
                </div>
              </div>

              <div className="bg-ce-green/10 border-l-4 border-ce-green p-6 rounded-r-2xl mt-8">
                <p className="text-ce-ink font-medium">
                  Bottom line: If your house is in solid shape and you have 90+ days, talk to a local agent. We&apos;ll be the first to tell you that.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: WHEN CASH IS BETTER */}
        <section id="when-cash-better" className="py-12 md:py-14 bg-surface-cream scroll-mt-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                When We Can Help
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                When Selling to a Cash Buyer Makes More Sense
              </h2>
            </div>
            <div className="text-lg text-ce-ink/70 space-y-6 leading-relaxed">
              <p>
                A direct cash sale is likely the smarter path if:
              </p>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-ce-ink/5">
                  <h3 className="font-semibold text-ce-ink mb-2">Your home needs significant repairs.</h3>
                  <p>Foundation issues, roof damage, mold, outdated electrical, code violations — these problems cost $10,000 to $50,000+ to fix before you can list. If your property needs <Link href="/situations/major-repairs" className="text-ce-green hover:underline">major work</Link>, selling as-is to a cash buyer often nets you more after you factor in repair costs, commissions, and months of carrying costs.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-ce-ink/5">
                  <h3 className="font-semibold text-ce-ink mb-2">You need to sell quickly.</h3>
                  <p><Link href="/situations/job-relocation" className="text-ce-green hover:underline">Job relocation</Link>, <Link href="/situations/foreclosure" className="text-ce-green hover:underline">foreclosure</Link>, <Link href="/situations/divorce" className="text-ce-green hover:underline">divorce</Link>, financial pressure — when time matters, a cash sale that closes in 7 to 30 days solves the problem. Traditional sales simply can&apos;t match that timeline.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-ce-ink/5">
                  <h3 className="font-semibold text-ce-ink mb-2">The property has complications.</h3>
                  <p><Link href="/situations/inherited-property" className="text-ce-green hover:underline">Inherited homes</Link> in probate, properties with <Link href="/situations/tax-liens-code-violations" className="text-ce-green hover:underline">liens or code violations</Link>, homes with <Link href="/situations/tired-landlord" className="text-ce-green hover:underline">difficult tenants</Link>, properties in condemned status — these situations make traditional sales extremely difficult. Cash buyers like ClearEdge deal with these situations routinely.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-ce-ink/5">
                  <h3 className="font-semibold text-ce-ink mb-2">You want certainty.</h3>
                  <p>Cash offers don&apos;t fall through due to financing, appraisals, or buyer cold feet. Once you accept, the sale is happening. In the traditional market, roughly 1 in 5 deals fall through before closing.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-ce-ink/5">
                  <h3 className="font-semibold text-ce-ink mb-2">You want zero out-of-pocket costs.</h3>
                  <p>No repairs, no staging, no commissions, no closing costs. The offer is your net.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-ce-ink/5">
                  <h3 className="font-semibold text-ce-ink mb-2">You value privacy and simplicity.</h3>
                  <p>No public listing, no open houses, no dozens of strangers walking through your home. One point of contact, one clear process.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: THE REAL MATH */}
        <section id="real-math" className="py-12 md:py-14 bg-white scroll-mt-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                The Numbers
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                Let&apos;s Do the Math: Cash Sale vs. Traditional in Eastern PA
              </h2>
              <p className="text-ce-ink/70 mt-4">
                Want to see numbers for YOUR property? <Link href="/calculator" className="text-ce-green hover:underline font-medium">Try our interactive calculator</Link> to get a personalized estimate.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Scenario A: Needs Work */}
              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <div className="bg-ce-green/10 text-ce-green text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  Scenario A: Needs Work
                </div>
                <h3 className="font-serif text-xl font-medium text-ce-ink mb-4">
                  3-bedroom in <Link href="/locations/allentown" className="text-ce-green hover:underline">Allentown</Link> worth $280,000 after repairs, but needs $35,000 in work
                </h3>

                <div className="space-y-6">
                  {/* Traditional Route */}
                  <div>
                    <h4 className="font-semibold text-ce-ink mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">R</span>
                      Traditional Route
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Repairs before listing:</span>
                        <span className="text-red-600 font-medium">-$35,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Listing price after repairs:</span>
                        <span className="text-ce-ink">$280,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Agent commissions (5.81%):</span>
                        <span className="text-red-600 font-medium">-$16,268</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Seller closing costs (~2%):</span>
                        <span className="text-red-600 font-medium">-$5,600</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Carrying costs (~5 months):</span>
                        <span className="text-red-600 font-medium">-$7,500</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-ce-ink/10">
                        <span className="font-semibold text-ce-ink">Net to seller:</span>
                        <span className="font-bold text-ce-ink">~$215,632</span>
                      </div>
                      <div className="flex justify-between text-ce-ink/50">
                        <span>Timeline:</span>
                        <span>5–7 months</span>
                      </div>
                    </div>
                  </div>

                  {/* ClearEdge Route */}
                  <div>
                    <h4 className="font-semibold text-ce-green mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-ce-green text-white rounded-full flex items-center justify-center text-xs">C</span>
                      ClearEdge Cash Offer
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Cash offer (as-is):</span>
                        <span className="text-ce-green font-medium">$210,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Repairs:</span>
                        <span className="text-ce-green font-medium">$0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Commissions:</span>
                        <span className="text-ce-green font-medium">$0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Closing costs:</span>
                        <span className="text-ce-green font-medium">$0</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-ce-green/20">
                        <span className="font-semibold text-ce-ink">Net to seller:</span>
                        <span className="font-bold text-ce-green">$210,000</span>
                      </div>
                      <div className="flex justify-between text-ce-ink/50">
                        <span>Timeline:</span>
                        <span>14–30 days</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-ce-green/20">
                    <p className="text-sm text-ce-ink">
                      <span className="font-semibold">The difference: ~$5,600</span> — but you saved 5+ months, risked $0 out of pocket, and had zero chance of the deal falling through.
                    </p>
                  </div>
                </div>
              </div>

              {/* Scenario B: Move-In Ready */}
              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <div className="bg-gray-200 text-ce-ink/70 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  Scenario B: Move-In Ready
                </div>
                <h3 className="font-serif text-xl font-medium text-ce-ink mb-4">
                  Well-maintained home in <Link href="/locations/bethlehem" className="text-ce-green hover:underline">Bethlehem</Link> worth $320,000 with only $5,000 in cosmetic updates
                </h3>

                <div className="space-y-6">
                  {/* Traditional Route */}
                  <div>
                    <h4 className="font-semibold text-ce-green mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-ce-green text-white rounded-full flex items-center justify-center text-xs">R</span>
                      Traditional Route
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Minor repairs/staging:</span>
                        <span className="text-red-600 font-medium">-$5,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Listing price:</span>
                        <span className="text-ce-ink">$320,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Agent commissions (5.81%):</span>
                        <span className="text-red-600 font-medium">-$18,592</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Seller closing costs (~2%):</span>
                        <span className="text-red-600 font-medium">-$6,400</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Carrying costs (60 days):</span>
                        <span className="text-red-600 font-medium">-$3,000</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-ce-green/20">
                        <span className="font-semibold text-ce-ink">Net to seller:</span>
                        <span className="font-bold text-ce-green">~$287,008</span>
                      </div>
                      <div className="flex justify-between text-ce-ink/50">
                        <span>Timeline:</span>
                        <span>2–3 months</span>
                      </div>
                    </div>
                  </div>

                  {/* ClearEdge Route */}
                  <div>
                    <h4 className="font-semibold text-ce-ink mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">C</span>
                      ClearEdge Cash Offer
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ce-ink/70">Cash offer (as-is):</span>
                        <span className="text-ce-ink font-medium">~$256,000</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-ce-ink/10">
                        <span className="font-semibold text-ce-ink">Net to seller:</span>
                        <span className="font-bold text-ce-ink">$256,000</span>
                      </div>
                      <div className="flex justify-between text-ce-ink/50">
                        <span>Timeline:</span>
                        <span>14–30 days</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="text-sm text-ce-ink">
                      <span className="font-semibold">The difference: ~$31,000 in favor of listing traditionally.</span> This is when we&apos;d tell you to call a realtor.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/10">
              <p className="text-sm text-ce-ink/70 mb-4">
                <span className="font-semibold text-ce-ink">Note:</span> These examples use estimated figures for illustration based on current Pennsylvania market data. PA average realtor commission is 5.81% (source: Clever/Real Estate Witch agent survey, Sept 2025), PA seller closing costs average 5.33% of sale price. Every property is different — request your free, no-obligation offer for real numbers specific to your situation.
              </p>
              <p className="text-ce-ink/70 text-sm">
                And remember: Scenario A assumes everything goes perfectly with the traditional route. If repairs uncover additional issues, if the buyer&apos;s financing falls through, or if the home sits on the market longer than expected — the gap closes or reverses entirely.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: SELF-ASSESSMENT */}
        <section id="assessment" className="py-12 md:py-14 bg-surface-cream scroll-mt-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Quick Assessment
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                Which Selling Method Fits Your Situation?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Cash Sale Checklist */}
              <div className="bg-white rounded-2xl p-6 border border-ce-green/20">
                <h3 className="font-semibold text-ce-green mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  A cash sale might be right for you if:
                </h3>
                <ul className="space-y-3">
                  {[
                    'Your property needs more than $10,000 in repairs',
                    'You need to close within 30 days',
                    'The property is inherited, in probate, or has title complications',
                    "You're facing foreclosure or have liens against the property",
                    "You don't want to pay agent commissions or closing costs",
                    "You'd rather not deal with showings, open houses, or negotiations",
                    "The property has tenants you don't want to manage through a sale",
                    "You live out of state and can't oversee repairs or showings",
                    'You want a guaranteed sale with no financing contingencies',
                    'You value speed and simplicity over maximizing every dollar',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-ce-green rounded flex-shrink-0 mt-0.5" />
                      <span className="text-ce-ink/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Realtor Checklist */}
              <div className="bg-white rounded-2xl p-6 border border-ce-ink/10">
                <h3 className="font-semibold text-ce-ink mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-ce-ink/30 rounded-full" />
                  A traditional listing might be better if:
                </h3>
                <ul className="space-y-3">
                  {[
                    'Your home is in good, move-in-ready condition',
                    'You have 90+ days before you need to close',
                    "You're willing to invest in repairs and staging upfront",
                    'Maximizing the sale price is your top priority',
                    "Your property will pass a standard buyer's inspection",
                    "You're comfortable with the traditional selling process",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-ce-ink/20 rounded flex-shrink-0 mt-0.5" />
                      <span className="text-ce-ink/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-ce-ink/70 mb-6">
                If you checked more boxes on the left, a cash offer is worth exploring. If you checked more on the right, a realtor may serve you better. Either way, getting a no-obligation cash offer gives you a real number to compare against — and it costs you nothing.
              </p>
              <TrackedCTALink
                href="#lead-form"
                label="Get Your Free Cash Offer to Compare"
                eventLabel="Get Free Cash Offer to Compare - Assessment Section"
              />
            </div>
          </div>
        </section>

        {/* SECTION 8: RED FLAGS */}
        <section id="red-flags" className="py-12 md:py-14 bg-white scroll-mt-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Protect Yourself
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                Not All Cash Buyers Are Created Equal
              </h2>
            </div>

            <p className="text-lg text-ce-ink/70 mb-8 text-center max-w-2xl mx-auto">
              The cash home buying industry has legitimate companies and shady operators. Here&apos;s what to watch for. For a complete guide on spotting scams and vetting buyers, see our <Link href="/are-cash-home-buyers-legit" className="text-ce-green hover:underline">full page on whether cash home buyers are legit</Link>.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Red Flags */}
              <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                <h3 className="font-semibold text-red-700 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Red Flags
                </h3>
                <ul className="space-y-3">
                  {[
                    "They won't show proof of funds",
                    'They pressure you to sign immediately',
                    'They charge "processing fees" or "administrative costs"',
                    "They're not local — they're a national call center",
                    "They won't explain how they calculated the offer",
                    "They don't have Google reviews or a physical presence",
                    "They try to renegotiate the price after you've accepted",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-red-800 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What ClearEdge Does */}
              <div className="bg-ce-green-subtle rounded-2xl p-6 border border-ce-green/20">
                <h3 className="font-semibold text-ce-green mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  What ClearEdge Does Differently
                </h3>
                <ul className="space-y-3">
                  {[
                    { text: 'We show you exactly how we calculate our offer', link: '/how-it-works' },
                    { text: 'We provide proof of funds on request', link: null },
                    { text: 'Zero fees — ever', link: null },
                    { text: "We're a local, family-owned business based in Eastern PA since 2016", link: null },
                    { text: '5.0 Google rating with real, verified reviews', link: '/testimonials' },
                    { text: '30-day offer validity — no rush, no pressure', link: null },
                    { text: 'Tyler answers the phone: (610) 904-8526', link: null },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-ce-green flex-shrink-0 mt-0.5" />
                      <span className="text-ce-ink/70 text-sm">
                        {item.link ? (
                          <Link href={item.link} className="text-ce-green hover:underline">{item.text}</Link>
                        ) : (
                          item.text
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ */}
        <section id="faq" className="scroll-mt-32">
          <V0FAQ
            faqs={faqs}
            title="Common Questions About Cash Buyers vs. Realtors"
            subtitle="Here are the questions homeowners ask most when deciding how to sell."
            sectionBg="beige"
          />
        </section>


        {/* SECTION 10: LEAD FORM */}
        <V0LeadForm />


        <V0Footer />
      </main>
    </>
  )
}
