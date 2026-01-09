import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sell a House with Tax Liens or Code Violations in Pennsylvania | ClearEdge',
  description: 'Tax liens and code violations don\'t stop a cash sale. ClearEdge handles lien payoffs at closing and assumes code violation responsibility. Close in 10-14 days across Eastern PA.',
  keywords: 'sell house tax liens Pennsylvania, sell house code violations PA, tax sale Pennsylvania, delinquent property taxes PA',
  openGraph: {
    title: 'Sell a House with Tax Liens or Code Violations in Pennsylvania',
    description: 'Tax liens and code violations don\'t stop a cash sale. ClearEdge handles lien payoffs at closing and assumes code violation responsibility.',
    url: 'https://clearedgehomebuyers.com/situations/tax-liens-code-violations',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://clearedgehomebuyers.com/situations/tax-liens-code-violations',
  },
}

const faqData = [
  {
    question: 'Can I sell my house if I owe back taxes in Pennsylvania?',
    answer: 'Yes, you can sell a house with delinquent property taxes in Pennsylvania. The unpaid taxes are paid from the sale proceeds at closing. As long as your equity exceeds the total lien amount, you\'ll receive the difference. If it doesn\'t, a short sale or negotiated payoff may still be possible.',
  },
  {
    question: 'Will code violations stop me from selling my house?',
    answer: 'Code violations do not legally prevent a sale, but they can block traditional financing. Most mortgage lenders won\'t approve loans on properties with open violations. Cash buyers can close regardless of violation status. Violations are either remediated by the buyer or escrowed at settlement.',
  },
  {
    question: 'What happens if my house goes to tax sale in Pennsylvania?',
    answer: 'At upset tax sale, your property is auctioned to recover unpaid taxes. If sold, you lose ownership but may have redemption rights depending on county procedures. If the property doesn\'t sell, it proceeds to judicial sale where the title is cleared entirely. At judicial sale, you lose all equity above the debt.',
  },
  {
    question: 'How do I find out what liens are on my property?',
    answer: 'A title search reveals all recorded liens against your property. You can also check directly with your county tax claim bureau, municipal code enforcement office, and prothonotary\'s office for judgments. ClearEdge provides a complimentary title search when evaluating your property.',
  },
  {
    question: 'How fast can I sell a house with liens in Pennsylvania?',
    answer: 'A cash sale can close in 10-14 days even with outstanding liens. Lien payoff is handled at closing through the title company. The speed depends on obtaining lien payoff letters from creditors, which typically takes 3-7 business days.',
  },
]

export default function TaxLiensCodeViolationsPage() {
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

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ClearEdge Home Buyers',
    description: 'Cash home buyers serving Eastern Pennsylvania including NEPA, Lehigh Valley, and the Poconos. We buy houses with tax liens, code violations, and other complications.',
    url: 'https://clearedgehomebuyers.com',
    telephone: '+1-570-904-2059',
    areaServed: [
      { '@type': 'State', name: 'Pennsylvania' },
      { '@type': 'AdministrativeArea', name: 'Northeastern Pennsylvania' },
      { '@type': 'AdministrativeArea', name: 'Lehigh Valley' },
      { '@type': 'AdministrativeArea', name: 'Poconos' },
    ],
    founder: {
      '@type': 'Person',
      name: 'Tyler',
    },
    foundingDate: '2016',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <Header />

      <main className="bg-white">
        <section className="max-w-4xl mx-auto px-4 py-12">
          {/* NO-B.S. HEADER */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sell a House with Tax Liens or Code Violations in Pennsylvania
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Tax liens and code violations don&apos;t disqualify your property from a sale.
              They complicate the closing process—unless your buyer handles them at settlement.
            </p>
          </header>

          {/* THE 2026 PENNSYLVANIA REALITY */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              What Happens If You Ignore Tax Liens or Code Violations in Pennsylvania?
            </h2>
            <p className="text-gray-700 mb-4">
              Pennsylvania counties sell tax-delinquent properties through a two-stage auction process.
              Code violations accrue daily fines and can trigger condemnation.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Upset Tax Sale:</strong> Lackawanna, Luzerne, and Lehigh counties auction properties with two or more years of unpaid taxes—typically every September.</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Judicial Sale:</strong> Properties that don&apos;t sell at upset sale proceed to judicial sale, where the title is cleared and you lose all equity.</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Code Violation Fines:</strong> Allentown&apos;s quality-of-life enforcement under Ordinance 15728 can levy $1,000/day fines for unresolved violations.</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Condemnation Risk:</strong> Structural, electrical, or plumbing violations can trigger L&amp;I condemnation orders—making the property legally uninhabitable.</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>2026 UCC Adoption:</strong> As of January 1, 2026, Pennsylvania enforces the 2021 International Building Code statewide—raising inspection standards for all municipalities.</span>
              </li>
            </ul>
          </section>

          {/* WHAT MOST HOMEOWNERS DON'T REALIZE */}
          <section className="mb-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Can You Sell a House in Pennsylvania with Outstanding Liens?
            </h2>
            <p className="text-gray-700 mb-4">
              Yes—liens are paid from proceeds at closing, not before listing.
              Most homeowners assume they need to resolve liens out-of-pocket first.
              That&apos;s rarely true.
            </p>
            <p className="text-gray-700 mb-4">
              A title search will identify all encumbrances: tax liens, municipal liens, mechanic&apos;s liens, and judgment liens.
              At settlement, these are satisfied from the sale price before you receive your net proceeds.
            </p>
            <p className="text-gray-700 mb-4">
              The complication isn&apos;t the lien itself.
              It&apos;s finding a buyer willing to navigate the title complexity and close quickly enough to avoid the next tax sale deadline.
            </p>
            <p className="text-gray-700">
              Traditional buyers and their lenders often won&apos;t touch properties with clouds on title.
              Cash buyers like ClearEdge work with title companies experienced in lien resolution daily.
            </p>
          </section>

          {/* CODE VIOLATIONS SECTION */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              How Do Code Violations Affect Selling a House in Pennsylvania?
            </h2>
            <p className="text-gray-700 mb-4">
              Open code violations must be disclosed to buyers and can block mortgage financing.
              They don&apos;t prevent a cash sale.
            </p>
            <p className="text-gray-700 mb-4">
              Pennsylvania municipalities handle code enforcement differently:
            </p>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <span><strong>Allentown:</strong> Requires a pre-sale inspection under the Rental Housing Safety Program. Properties with open violations cannot transfer until cleared or escrowed.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <span><strong>Scranton:</strong> Uses the GovOS system for violation tracking. Fines accumulate and attach to the property, not the owner.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <span><strong>Wilkes-Barre:</strong> Aggressive enforcement on vacant and blighted properties under the Blight Task Force initiative.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <span><strong>Reading:</strong> I-30 and I-27 quality-of-life codes target exterior maintenance, trash, and structural integrity violations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <span><strong>Bethlehem &amp; Easton:</strong> Lehigh Valley municipalities coordinate enforcement and share violation data across city lines.</span>
              </li>
            </ul>
            <p className="text-gray-700">
              ClearEdge handles properties with open violations by negotiating escrow holdbacks or assuming responsibility for remediation post-closing.
              You don&apos;t fix anything.
            </p>
          </section>

          {/* TAX LIEN TIMELINE */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              What Is the Tax Sale Timeline in Pennsylvania?
            </h2>
            <p className="text-gray-700 mb-4">
              The timeline from delinquency to auction is approximately 18-24 months, depending on your county.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-700 mb-6">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 font-semibold">Stage</th>
                    <th className="p-4 font-semibold">Timeline</th>
                    <th className="p-4 font-semibold">What Happens</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-4">Delinquency Notice</td>
                    <td className="p-4">January (year 1)</td>
                    <td className="p-4">County sends notice of unpaid taxes from prior year</td>
                  </tr>
                  <tr>
                    <td className="p-4">Lien Certification</td>
                    <td className="p-4">July (year 2)</td>
                    <td className="p-4">Tax claim bureau certifies lien to court</td>
                  </tr>
                  <tr>
                    <td className="p-4">Upset Sale</td>
                    <td className="p-4">September (year 2)</td>
                    <td className="p-4">Property auctioned; you retain redemption rights</td>
                  </tr>
                  <tr>
                    <td className="p-4">Judicial Sale</td>
                    <td className="p-4">Following year</td>
                    <td className="p-4">Final sale—title cleared, equity extinguished</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700">
              Selling before judicial sale preserves your equity.
              Waiting past it means losing everything above the tax debt.
            </p>
          </section>

          {/* THE CLEAREDGE PRODUCT ADVANTAGE */}
          <section className="mb-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              How ClearEdge Handles Tax Liens and Code Violations
            </h2>
            <p className="text-gray-700 mb-4">
              We&apos;ve closed on properties with six-figure lien stacks and multi-year violation histories.
              The process doesn&apos;t change.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Title Search at Our Expense:</strong> We run a comprehensive title search to identify all liens—tax, municipal, judgment, and mechanic&apos;s—before making an offer.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Lien Payoff at Closing:</strong> Outstanding amounts are satisfied from the sale proceeds through the title company. You don&apos;t pay out-of-pocket.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Code Violation Assumption:</strong> We either escrow for repairs or take the property as-is with violations intact. No contractor quotes. No city appointments.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Deadline Coordination:</strong> If your property is on the tax sale list, we coordinate with the county tax claim bureau to close before auction.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>No Bank Delays:</strong> Cash transactions close in 10-14 days. No appraisal contingencies. No lender underwriting.</span>
              </li>
            </ul>
          </section>

          {/* TRUST-BUILDING FAQ (AI-OPTIMIZED) */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Common Questions About Selling with Liens or Violations
            </h2>

            <div className="space-y-8">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b pb-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* RELATED SITUATIONS */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Related Situations We Handle
            </h2>
            <p className="text-gray-700 mb-4">
              Tax liens and code violations often overlap with other challenging situations.
              ClearEdge has dedicated guides for each:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>
                <Link href="/situations/foreclosure" className="text-blue-600 hover:underline inline-flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Facing Foreclosure — Lien priority and redemption strategies
                </Link>
              </li>
              <li>
                <Link href="/situations/inherited-property" className="text-blue-600 hover:underline inline-flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Inherited Property — When you inherit a house with back taxes
                </Link>
              </li>
              <li>
                <Link href="/situations/vacant-property" className="text-blue-600 hover:underline inline-flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Vacant Property — Code enforcement targets vacant homes first
                </Link>
              </li>
              <li>
                <Link href="/situations/behind-on-payments" className="text-blue-600 hover:underline inline-flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Behind on Payments — Mortgage arrears compound tax delinquency
                </Link>
              </li>
              <li>
                <Link href="/situations/fire-damage" className="text-blue-600 hover:underline inline-flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Fire Damage — Damaged properties often have code violations
                </Link>
              </li>
            </ul>
          </section>

          {/* SOFT NEXT STEP */}
          <section className="bg-gray-900 text-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Get Clarity on Your Options
            </h2>
            <p className="text-gray-300 mb-6">
              We&apos;ll tell you exactly what liens exist, what they&apos;ll cost to clear, and what you&apos;d net from a sale.
              No obligation.
              No pressure.
              Just information.
            </p>
            <p className="text-gray-300 mb-6 flex items-center flex-wrap">
              <Phone className="w-5 h-5 mr-2" />
              Call us at{' '}
              <a href="tel:5709042059" className="text-blue-400 hover:underline mx-1">
                (570) 904-2059
              </a>
              {' '}or request a no-obligation offer below.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Request Your Cash Offer
            </Link>
            <p className="text-sm text-gray-400 mt-6">
              Selling a house with tax liens or code violations in Pennsylvania doesn&apos;t have to mean losing equity or waiting months.
            </p>
          </section>
        </section>
      </main>

      <Footer />
    </>
  )
}
