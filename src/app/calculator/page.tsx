"use client"

import dynamic from 'next/dynamic'
import { V0Header } from '@/components/v0-header'
import { Calculator } from '@/components/calculator'

const V0Footer = dynamic(() => import('@/components/v0-footer').then(mod => ({ default: mod.V0Footer })), { ssr: true })
const V0LeadForm = dynamic(() => import('@/components/v0-lead-form').then(mod => ({ default: mod.V0LeadForm })), { ssr: true })
const V0FAQ = dynamic(() => import('@/components/v0-faq').then(mod => ({ default: mod.V0FAQ })), { ssr: true })

// FAQ data
const faqs = [
  {
    question: 'How accurate is this home sale calculator?',
    answer: "Our calculator uses PA-regulated title insurance rates, county-specific transfer tax data, and current contractor pricing from sources like HomeAdvisor and Angi. It provides a realistic estimate, but your actual costs may vary based on your specific property, negotiations, and market conditions. For your exact cash offer number, request a free, no-obligation offer from ClearEdge.",
  },
  {
    question: 'Why are traditional sale costs so high?',
    answer: "Most sellers only think about agent commissions. But commissions are just the start — transfer taxes, title insurance, settlement fees, inspection concessions, carrying costs, and repairs all add up. On a typical Eastern PA home, total selling costs run 8–12% of the sale price before repairs.",
  },
  {
    question: 'How does ClearEdge calculate cash offers?',
    answer: "We evaluate your home's market value and condition, then make an offer based on the property's as-is state. Our offer accounts for the repairs we'll need to make and our operating costs. We cover all closing costs, commissions, and fees — the number we quote is the number you receive at closing.",
  },
  {
    question: 'Do I need to make repairs before selling to ClearEdge?',
    answer: "No. We buy properties in any condition — foundation issues, roof damage, outdated systems, code violations, environmental concerns. You don't need to fix, clean, or update anything.",
  },
  {
    question: 'What if the traditional route nets me more money?',
    answer: "Then you should list with an agent, and we'll tell you that. We built this calculator to help you make the best decision for your situation — not to pressure you into a cash sale. If the numbers say listing is better for you, that's the right move.",
  },
  {
    question: 'How do the repair cost estimates work?',
    answer: "Our repair estimates use current Pennsylvania contractor pricing from HomeAdvisor, Angi, This Old House, and PA-based contractors. We use the midpoint of published price ranges — not the high end — to provide realistic estimates. Your actual costs may be higher or lower depending on your property's specific conditions and the contractors you hire.",
  },
]

export default function CalculatorPage() {
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
                '@type': 'WebApplication',
                '@id': 'https://www.clearedgehomebuyers.com/calculator/#calculator',
                name: 'Pennsylvania Home Sale Calculator — Compare Net Proceeds',
                description: 'Free Pennsylvania home sale calculator. Compare your net proceeds from a traditional sale vs. cash offer with county-specific closing costs, itemized fees, and real PA contractor repair pricing.',
                url: 'https://www.clearedgehomebuyers.com/calculator',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
                provider: {
                  '@id': 'https://www.clearedgehomebuyers.com/#organization',
                },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://www.clearedgehomebuyers.com/calculator/#breadcrumb',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.clearedgehomebuyers.com' },
                  { '@type': 'ListItem', position: 2, name: 'Sale Calculator', item: 'https://www.clearedgehomebuyers.com/calculator' },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://www.clearedgehomebuyers.com/calculator/#faq',
                mainEntity: faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: { '@type': 'Answer', text: faq.answer },
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
              Free Calculator
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium text-ce-ink mb-6 leading-tight">
              Pennsylvania Home Sale Calculator: Cash Offer vs. Traditional Net Proceeds
            </h1>
            <p className="text-xl text-ce-ink/70 mb-4 max-w-3xl mx-auto">
              See exactly what you&apos;d walk away with from a traditional sale vs. a cash offer — with county-specific PA closing costs, itemized fees, and real 2026 contractor repair pricing. No guessing.
            </p>
          </div>
        </section>

        {/* CALCULATOR SECTION */}
        <Calculator />

        {/* WHERE DO THESE NUMBERS COME FROM */}
        <section className="py-12 md:py-14 bg-surface-cream">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Our Methodology
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                Where Do These Numbers Come From?
              </h2>
            </div>
            <div className="space-y-6 text-ce-ink/70">
              <p>
                Every number in this calculator is sourced from real Pennsylvania data: PA-regulated title insurance rates, county-specific transfer taxes, and current contractor pricing from HomeAdvisor, Angi, This Old House, and PA-based contractors.
              </p>
              <p>
                ClearEdge built this calculator to help homeowners make informed decisions, not to push anyone toward a particular option. If the numbers say listing with an agent makes more sense for your situation, we&apos;ll tell you that.
              </p>
            </div>
          </div>
        </section>

        {/* COSTS MOST SELLERS DON'T EXPECT */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                The Full Picture
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                Costs Most Sellers Don&apos;t Expect
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Agent Commissions (5.81%)</h3>
                <p className="text-ce-ink/70">
                  This is the combined PA average for listing agent + buyer&apos;s agent commissions. Even after the 2024 NAR settlement that made buyer&apos;s agent commission technically negotiable, most PA sellers still offer it because homes that don&apos;t attract fewer showings. On a $280,000 home, that&apos;s over $16,000.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Transfer Tax (varies by county)</h3>
                <p className="text-ce-ink/70">
                  PA charges a real estate transfer tax split between buyer and seller. The state portion is 1% (you pay half — 0.5%). Your municipality adds its own local transfer tax on top. This varies by county, which is why we ask for yours. Example: In Lehigh County, your seller portion totals about 1.0% of the sale price.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Title Insurance</h3>
                <p className="text-ce-ink/70">
                  PA title insurance rates are regulated by the state — every title company charges the same rates. The seller typically pays for the owner&apos;s title insurance policy, which protects the buyer&apos;s lender. The rate is tiered: $5.75 per $1,000 on the first $100K, $5.00 per $1,000 from $100K–$500K, and lower rates above that. On a $280,000 home, that&apos;s approximately $1,475.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Settlement &amp; Recording Fees (~$1,575)</h3>
                <p className="text-ce-ink/70">
                  These are the fees charged by the title company and county to process your sale: settlement/closing fee ($650), title search ($300), document preparation ($150), notary ($100), recording fees ($200), and the municipal lien letter ($175) that confirms you have no outstanding water, sewer, trash, or code liens.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Post-Inspection Concessions (1.5%)</h3>
                <p className="text-ce-ink/70">
                  This is the cost most traditional sellers don&apos;t see coming. After a buyer&apos;s home inspector walks through, they almost always find issues and negotiate credits or repairs. In Eastern Pennsylvania — where much of the housing stock dates to the early 1900s — this averages 1.5% of the sale price, and can run 3%+ on older homes. That&apos;s $4,200 on a $280,000 home that wasn&apos;t in your plan.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Home Warranty + Compliance (~$850)</h3>
                <p className="text-ce-ink/70">
                  Buyers in PA frequently request a home warranty ($500), and sellers need to cover a use &amp; occupancy inspection ($150), smoke/CO detector compliance ($100), and pest/termite inspection ($100). Small individually, but they add up.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Carrying Costs (repairs through closing)</h3>
                <p className="text-ce-ink/70">
                  From the day you decide to sell until the day you close, you&apos;re paying mortgage interest, property taxes, homeowner&apos;s insurance, utilities, and maintenance every single month. This isn&apos;t just time &quot;on the market&quot; — it includes the weeks or months spent completing repairs before you can list, then showings, offer negotiations, buyer inspections, and the 30–45 day closing process. For a $280,000 home in Lehigh County, that&apos;s approximately $1,720 per month for every month of the process.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Repair Costs</h3>
                <p className="text-ce-ink/70">
                  The repair estimates in our calculator use current Pennsylvania contractor pricing sourced from HomeAdvisor, Angi, This Old House, and PA-based contractors. We use the midpoint of each range — not the high end — to give you a realistic (not inflated) estimate of what these repairs actually cost homeowners in Eastern PA.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE CALCULATE CASH OFFER */}
        <section className="py-12 md:py-14 bg-surface-cream">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Transparent Pricing
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                How We Calculate the ClearEdge Cash Offer
              </h2>
            </div>
            <div className="space-y-6 text-ce-ink/70">
              <p>
                ClearEdge&apos;s offer is a percentage of your home&apos;s market value. That percentage adjusts based on the condition of the property — homes needing more work receive a lower percentage because ClearEdge takes on all repair costs and risk.
              </p>
              <p>
                The offer covers ALL closing costs, commissions, and fees. The number you see is the number you walk away with.
              </p>
              <div className="bg-white border-l-4 border-ce-green p-6 rounded-r-2xl">
                <p className="text-ce-ink/80">
                  This calculator gives you an estimate. To get your real number, request a no-obligation cash offer — we&apos;ll explain exactly how we calculated it, and you&apos;ll have 30 days to decide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT THIS CALCULATOR CAN'T ACCOUNT FOR */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Honest Limitations
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                What This Calculator Can&apos;t Account For
              </h2>
            </div>
            <div className="space-y-4 text-ce-ink/70">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-ce-green rounded-full mt-2 flex-shrink-0" />
                <p><strong className="text-ce-ink">Price reductions:</strong> 30–40% of PA listings reduce price at least once. This calculator assumes you sell at full asking price.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-ce-green rounded-full mt-2 flex-shrink-0" />
                <p><strong className="text-ce-ink">Deal fall-through:</strong> 15–20% of traditional sales collapse after going under contract (financing falls through, inspection issues, buyer gets cold feet). This calculator assumes a clean close.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-ce-green rounded-full mt-2 flex-shrink-0" />
                <p><strong className="text-ce-ink">Multiple rounds of negotiation:</strong> Buyers often negotiate twice — once on price, once after inspection. This calculator only accounts for one round of inspection concessions.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-ce-green rounded-full mt-2 flex-shrink-0" />
                <p><strong className="text-ce-ink">Seasonal timing:</strong> Homes listed in winter in Eastern PA typically take longer to sell and may sell for less.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-ce-green rounded-full mt-2 flex-shrink-0" />
                <p><strong className="text-ce-ink">Emotional cost:</strong> The stress of keeping a home show-ready for months, coordinating with agents, managing repairs, and uncertainty isn&apos;t reflected in any number.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <V0FAQ
          faqs={faqs}
          title="Calculator FAQ"
          subtitle="Common questions about this calculator and getting a real offer."
          sectionBg="beige"
        />


        {/* LEAD FORM */}
        <V0LeadForm />


        <V0Footer />
      </main>
    </>
  )
}
