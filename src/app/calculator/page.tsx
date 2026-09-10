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
    answer: "It is an educational scenario tool, not an appraisal or settlement statement. It uses the move-in-ready value, repair selections, mortgage balance, and editable cost assumptions you enter. Actual sale price, taxes, contract costs, timing, and proceeds can differ.",
  },
  {
    question: 'Why are traditional sale costs so high?',
    answer: "Potential seller costs can include negotiated agent compensation, the seller's agreed transfer-tax share, repairs, holding costs, and other contract-specific settlement items. The calculator shows every assumption and lets you change it instead of applying a hidden risk penalty.",
  },
  {
    question: 'Does this calculator generate a ClearEdge cash offer?',
    answer: "No. Enter a real written cash offer if you have one, or leave that field blank and the calculator will model only the traditional-sale net. To receive a ClearEdge offer, request a free, no-obligation property review. We do not invent a cash offer from a hidden percentage.",
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
    answer: "The quick assessment maps the problems you select to the displayed repair items. The detailed option lets you choose specific projects, quantities, and a custom amount. A home marked good or updated starts at zero repairs, and the calculator does not apply blanket age or square-foot multipliers to unrelated work.",
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
                '@type': 'WebPage',
                '@id': 'https://www.clearedgehomebuyers.com/calculator/#webpage',
                name: 'Pennsylvania Home Sale Calculator — Compare Net Proceeds',
                description: 'Free Pennsylvania home sale calculator. Model traditional-sale net proceeds and compare them with a written cash offer using transparent, editable costs and repair assumptions.',
                url: 'https://www.clearedgehomebuyers.com/calculator',
                isPartOf: {
                  '@id': 'https://www.clearedgehomebuyers.com/#website',
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
              Model your traditional-sale net proceeds and compare them with a real written cash offer using transparent, editable repair and transaction-cost assumptions.
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
                The calculator uses the values you enter. Repair selections are itemized, and agent compensation, seller transfer-tax share, settlement costs, inspection concessions, timeline, and monthly holding costs are all visible and editable.
              </p>
              <p>
                It does not apply a hidden fall-through penalty, manufacture a cash offer, or automatically charge the seller for a buyer&apos;s title-insurance policy. ClearEdge built it to help homeowners compare actual assumptions—not to force the cash option to win.
              </p>
              <p className="text-sm">
                Official references: <a className="text-ce-green hover:underline" href="https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/realty-transfer-tax" target="_blank" rel="noopener noreferrer">Pennsylvania Department of Revenue transfer-tax guidance</a>,{' '}
                <a className="text-ce-green hover:underline" href="https://www.nar.realtor/news/real-estate-news/sales-marketing/compensation-commission-and-concessions" target="_blank" rel="noopener noreferrer">NAR compensation guidance</a>, and{' '}
                <a className="text-ce-green hover:underline" href="https://www.consumerfinance.gov/ask-cfpb/what-is-owners-title-insurance-en-164/" target="_blank" rel="noopener noreferrer">CFPB title-insurance guidance</a>.
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
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Agent Compensation (Editable)</h3>
                <p className="text-ce-ink/70">
                  Broker compensation is negotiable. The calculator starts with a visible 5% illustration, but you should replace it with the total percentage in your listing agreement plus any buyer-broker compensation you expect to pay.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Seller Transfer-Tax Share (Editable)</h3>
                <p className="text-ce-ink/70">
                  Pennsylvania imposes a 1% state realty transfer tax, and local tax is added by municipalities and school districts. Buyer and seller are jointly liable, but the purchase agreement can allocate the cost. Because a county alone cannot identify the local rate or your contract share, the calculator uses an editable 1% starting assumption. Confirm the correct number for the property and agreement.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Title Insurance Is Not an Automatic Seller Cost</h3>
                <p className="text-ce-ink/70">
                  An owner&apos;s policy protects the buyer-owner; a lender&apos;s policy protects the lender. The calculator does not automatically subtract either policy from the seller. If your agreement assigns a title-related cost to you, enter it under other seller settlement costs.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Other Seller Settlement Costs (Editable)</h3>
                <p className="text-ce-ink/70">
                  Deed preparation, lien work, municipal certificates, settlement services, credits, and other costs depend on the property, provider, and agreement. The calculator starts this field at $0 rather than inventing a fixed bundle. Enter the seller-paid amount shown by your agent, attorney, or title company.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Post-Inspection Concessions (Editable)</h3>
                <p className="text-ce-ink/70">
                  An inspection does not automatically create a seller credit. The calculator therefore starts this field at $0. If you already expect to offer a repair credit or concession, enter that amount so it appears in the comparison.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Municipal and Property-Specific Requirements</h3>
                <p className="text-ce-ink/70">
                  Use-and-occupancy procedures, code items, lien letters, inspections, and requested warranties vary by municipality and transaction. They are not imposed as an automatic statewide charge here. Add any known seller expense to the editable settlement-cost field.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Holding Costs and Timeline (Editable)</h3>
                <p className="text-ce-ink/70">
                  Enter the number of months you expect from repair work through closing and the monthly costs you actually want included. The calculator no longer guesses a mortgage interest rate, county property-tax bill, utilities, insurance, or maintenance from the home value.
                </p>
              </div>

              <div className="bg-surface-cream rounded-2xl p-6 border border-ce-ink/5">
                <h3 className="font-semibold text-ce-ink text-lg mb-3">Repair Costs</h3>
                <p className="text-ce-ink/70">
                  The quick assessment maps condition answers to displayed repair items. For more control, open the detailed estimator, select specific work and quantities, and add a custom amount. The tool does not multiply every repair by the home&apos;s age or square footage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY THE CALCULATOR DOES NOT INVENT A CASH OFFER */}
        <section className="py-12 md:py-14 bg-surface-cream">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Transparent Pricing
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                Why We Don&apos;t Invent a Cash Offer
              </h2>
            </div>
            <div className="space-y-6 text-ce-ink/70">
              <p>
                A responsible cash offer depends on the property, comparable sales, repair scope, title information, contract terms, and due diligence. A few broad condition answers cannot produce a dependable purchase offer.
              </p>
              <p>
                That is why this tool compares only a written cash offer you enter. If you do not have one, it calculates the traditional-sale scenario and leaves the cash side blank. A real ClearEdge offer remains free and carries no obligation.
              </p>
              <div className="bg-white border-l-4 border-ce-green p-6 rounded-r-2xl">
                <p className="text-ce-ink/80">
                  Request a no-obligation property review to get a written ClearEdge offer, then bring that number back here and compare it with your own cost assumptions.
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
                <p><strong className="text-ce-ink">Price changes:</strong> Your final sale price can be higher or lower than the move-in-ready value you enter.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-ce-green rounded-full mt-2 flex-shrink-0" />
                <p><strong className="text-ce-ink">Contract contingencies:</strong> A financed transaction may depend on financing, appraisal, inspection, or other contract terms. This calculator does not assign a speculative dollar penalty to that uncertainty.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-ce-green rounded-full mt-2 flex-shrink-0" />
                <p><strong className="text-ce-ink">Additional negotiation:</strong> A buyer may negotiate on price and again after inspection. The calculator includes only the concession amount you choose to enter and cannot predict the final agreement.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-ce-green rounded-full mt-2 flex-shrink-0" />
                <p><strong className="text-ce-ink">Seasonal timing:</strong> Buyer demand and marketing time can change by season, city, property type, price, and condition.</p>
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
