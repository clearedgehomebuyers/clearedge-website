import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, CheckCircle2, ArrowRight, Home, Wrench, Droplets, Zap } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sell House Needing Major Repairs Pennsylvania | ClearEdge Home Buyers',
  description: 'Sell your house with major repairs in Pennsylvania without fixing anything. We buy homes with foundation issues, roof damage, mold & more. Cash offer in 24 hours.',
  keywords: 'sell house major repairs Pennsylvania, sell damaged house PA, foundation problems sell house, roof damage sell house Pennsylvania',
  openGraph: {
    title: 'Sell House Needing Major Repairs Pennsylvania | ClearEdge Home Buyers',
    description: 'Sell your house with major repairs in Pennsylvania without fixing anything. We buy homes with foundation issues, roof damage, mold & more. Cash offer in 24 hours.',
    url: 'https://clearedgehomebuyers.com/situations/major-repairs',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://clearedgehomebuyers.com/situations/major-repairs',
  },
}

const faqData = [
  {
    question: 'How much less will I get for a house that needs major repairs?',
    answer: 'Expect 20-40% below market value depending on the scope and type of repairs needed. Foundation and structural issues command the deepest discounts because they\'re the most expensive and unpredictable to fix. Cosmetic issues have less impact. Our offers reflect actual repair costs based on local contractor pricing, not inflated worst-case estimates.',
  },
  {
    question: 'Do I need to get repair estimates before selling?',
    answer: 'No, you don\'t need any estimates to sell to ClearEdge. We conduct our own assessment and price repairs into our cash offer. Getting your own estimates only makes sense if you\'re comparing our offer against what you\'d net after fixing and listing traditionally.',
  },
  {
    question: 'Will a house with major repairs pass inspection in Pennsylvania?',
    answer: 'Inspections identify issues but don\'t "pass" or "fail" homes—they inform buyer negotiations. The real question is whether the property will appraise for a lender. FHA and VA loans have minimum property standards that damaged homes often fail. Cash buyers like ClearEdge don\'t require appraisals, eliminating this obstacle entirely.',
  },
  {
    question: 'Can I sell an inherited house that needs major repairs?',
    answer: 'Yes, and it\'s often the best option when repairs would delay or complicate probate settlement. Inherited properties frequently have deferred maintenance that\'s costly to address. Selling as-is for cash lets you distribute proceeds to heirs faster without fronting repair money.',
  },
  {
    question: 'How fast can you close on a house with major repairs?',
    answer: 'We can close in as few as 14 days on properties with major repairs. Unlike traditional buyers who need inspections, appraisals, and lender approval, we buy with cash and handle repairs after closing. Your timeline depends on title clearance and your moving schedule, not property condition.',
  },
]

export default function MajorRepairsPage() {
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
    name: 'Major Repairs Property Cash Buying Service',
    description: 'Cash buying service for homes needing major repairs in Pennsylvania. We purchase properties with foundation issues, roof damage, mold, and structural problems.',
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
        <section className="bg-slate-900 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Sell a House Needing Major Repairs in Pennsylvania Without Fixing Anything
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              We buy homes with foundation issues, roof damage, mold, fire damage, and structural problems across Eastern PA.
              No contractors. No inspections. No negotiations over repair credits.
            </p>
          </div>
        </section>

        {/* 2026 Reality Section */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              What Does Pennsylvania Law Require When Selling a House With Major Problems in 2026?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Pennsylvania requires sellers to disclose all known material defects, and failing to do so exposes you to lawsuits for years after closing.
            </p>
            <p className="text-slate-600 mb-4">
              Here&apos;s the regulatory landscape you&apos;re navigating in 2026:
            </p>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold mt-1">→</span>
                <span><strong>Pennsylvania Seller Disclosure Law (68 Pa.C.S. § 7301-7315):</strong> You must complete a standardized disclosure form covering structural systems, roof condition, water infiltration, environmental hazards, and mechanical systems. Misrepresentation is grounds for rescission or damages.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold mt-1">→</span>
                <span><strong>January 1, 2026 Building Code Update:</strong> Pennsylvania&apos;s statewide adoption of the 2021 International Building Code (UCC) means inspectors and appraisers now reference stricter standards for electrical, plumbing, and structural compliance.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold mt-1">→</span>
                <span><strong>Allentown Pre-Sale Inspection:</strong> All residential sales require a city inspection within 5 days of listing. Properties with open code violations cannot transfer title until resolved or escrowed.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold mt-1">→</span>
                <span><strong>Reading Quality-of-Life Codes (I-30/I-27):</strong> Properties with exterior deterioration, unsafe structures, or health hazards face daily fines and potential condemnation proceedings through GovOS enforcement tracking.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold mt-1">→</span>
                <span><strong>FHA/VA Appraisal Disqualification:</strong> Most government-backed loans won&apos;t fund properties with roof damage, foundation cracks, or safety hazards—eliminating 40-60% of your buyer pool.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Hidden Risks Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              What Most Homeowners Don&apos;t Realize About Selling a House With Major Repairs
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              The repair estimate you get is never the final number.
            </p>
            <p className="text-slate-600 mb-6">
              Traditional buyers use inspections as negotiation leverage.
              A $15,000 roof estimate becomes a $25,000 credit request &quot;for peace of mind.&quot;
              Foundation issues discovered during due diligence crater deals at the 11th hour.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
              <h3 className="font-bold text-slate-900 mb-3">The Hidden Cost Multiplier</h3>
              <p className="text-slate-700 mb-4">
                When you list a house needing major repairs on the MLS, you&apos;re not just competing on price.
                You&apos;re competing against turnkey homes with no contingencies.
              </p>
              <p className="text-slate-700">
                Every week on market with a damaged property increases carrying costs, code enforcement exposure, and the likelihood of lowball offers.
                We&apos;ve seen homeowners in <Link href="/locations/scranton" className="text-blue-600 hover:underline">Scranton</Link> and <Link href="/locations/wilkes-barre" className="text-blue-600 hover:underline">Wilkes-Barre</Link> lose tens of thousands in holding costs waiting for a traditional buyer willing to take on a project.
              </p>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Can You Sell a House &quot;As-Is&quot; in Pennsylvania?
            </h3>
            <p className="text-lg text-slate-700 mb-4">
              Yes, Pennsylvania allows as-is sales, but &quot;as-is&quot; does not eliminate your disclosure obligations.
            </p>
            <p className="text-slate-600 mb-4">
              An as-is listing tells buyers you won&apos;t make repairs.
              It does not protect you from liability for undisclosed defects.
              If you know about mold behind the walls, a cracked foundation, or knob-and-tube wiring, you must disclose it.
            </p>
            <p className="text-slate-600">
              Learn more about Pennsylvania disclosure requirements in our <Link href="/blog/selling-house-as-is-pennsylvania" className="text-blue-600 hover:underline">guide to selling as-is in PA</Link>.
            </p>
          </div>
        </section>

        {/* Common Repair Categories */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              What Types of Major Repairs Make a House Hard to Sell?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Any defect that triggers lender appraisal flags, insurance underwriting concerns, or buyer fear will shrink your market dramatically.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Home className="w-6 h-6 text-amber-600" />
                  <h3 className="font-bold text-slate-900">Structural & Foundation</h3>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li>• Cracked or bowing foundation walls</li>
                  <li>• Sagging floor joists or beams</li>
                  <li>• Settling causing uneven floors</li>
                  <li>• Failed retaining walls</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Droplets className="w-6 h-6 text-amber-600" />
                  <h3 className="font-bold text-slate-900">Roof & Water Intrusion</h3>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li>• Missing or damaged shingles</li>
                  <li>• Active leaks or water staining</li>
                  <li>• Rotted decking or fascia</li>
                  <li>• Failed flashing</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Wrench className="w-6 h-6 text-amber-600" />
                  <h3 className="font-bold text-slate-900">Environmental Hazards</h3>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li>• Mold contamination</li>
                  <li>• Asbestos siding or insulation</li>
                  <li>• Lead paint (pre-1978 homes)</li>
                  <li>• Underground oil tank</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-6 h-6 text-amber-600" />
                  <h3 className="font-bold text-slate-900">Major Systems</h3>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li>• Electrical panel replacement needed</li>
                  <li>• Knob-and-tube or aluminum wiring</li>
                  <li>• Failed septic system</li>
                  <li>• Non-functional HVAC</li>
                </ul>
              </div>
            </div>

            <p className="text-slate-600 mt-8">
              If your property has <Link href="/situations/fire-damage" className="text-blue-600 hover:underline">fire damage</Link> or <Link href="/situations/code-violations" className="text-blue-600 hover:underline">active code violations</Link>, additional complications apply.
              We&apos;ve handled both across Lackawanna, Luzerne, and Lehigh counties.
            </p>
          </div>
        </section>

        {/* ClearEdge Advantage Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              How ClearEdge Buys Houses With Major Repairs
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              We price repair costs into our offer upfront and close regardless of property condition.
            </p>
            <p className="text-slate-600 mb-8">
              Since 2016, Tyler has built ClearEdge around solving exactly this problem.
              We started with a duplex on Birch Street in Scranton that needed everything—roof, foundation, electrical.
              We&apos;ve since helped over 200 homeowners across Eastern PA exit properties that traditional buyers wouldn&apos;t touch.
            </p>

            <div className="bg-slate-900 text-white p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6">What Our Process Removes</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>No contractor estimates or repair bids</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>No buyer inspections or renegotiations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>No appraisal contingencies</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>No financing fall-through risk</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>No showings to strangers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>No staging or cleaning requirements</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-slate-900 mb-3">Our Local Contractor Network</h3>
              <p className="text-slate-700">
                We&apos;ve built relationships with foundation specialists, roofing crews, mold remediation companies, and general contractors across NEPA, Lehigh Valley, and the Poconos over nearly a decade.
                This means we can accurately assess repair costs and close confidently on properties that scare off retail buyers.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Frequently Asked Questions About Selling a House With Major Repairs
            </h2>

            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-700">
                    {faq.answer}
                    {index === 3 && (
                      <>
                        {' '}See our <Link href="/situations/inherited-property" className="text-blue-600 hover:underline">inherited property guide</Link> for Pennsylvania-specific considerations.
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Soft CTA Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-slate-900 text-white p-8 md:p-12 rounded-lg text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Get a No-Obligation Cash Offer for Your Property
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Tell us about your property and we&apos;ll provide a fair cash offer within 24 hours.
                No repairs. No inspections. No pressure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-lg transition-colors"
                >
                  Request Your Cash Offer
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:5709042059"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 font-bold py-4 px-8 rounded-lg transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call (570) 904-2059
                </a>
              </div>
              <p className="text-slate-400 text-sm mt-6">
                Serving Scranton, Wilkes-Barre, Allentown, Bethlehem, Hazleton, and all of Eastern Pennsylvania
              </p>
            </div>
          </div>
        </section>

        {/* Final SEO Paragraph */}
        <section className="py-8 bg-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-slate-600 text-sm">
              ClearEdge Home Buyers has helped homeowners sell houses needing major repairs in Pennsylvania since 2016.
              Whether you&apos;re dealing with foundation problems, roof damage, mold, or deferred maintenance, we buy properties in any condition across NEPA, Lehigh Valley, and the Poconos.
              If you need to sell a house needing major repairs in Pennsylvania, <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link> for a fair cash offer with no obligations.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
