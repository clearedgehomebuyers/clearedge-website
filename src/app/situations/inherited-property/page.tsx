import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, CheckCircle } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sell Inherited House Pennsylvania | Cash Offer in 24 Hours | ClearEdge',
  description: 'Sell your inherited house in Pennsylvania fast for cash. No repairs, no cleanout, no realtor fees. ClearEdge Home Buyers helps families navigate probate and close quickly.',
  keywords: 'sell inherited house Pennsylvania, inherited property PA, probate sale Pennsylvania, sell inherited home fast, cash for inherited house PA',
  openGraph: {
    title: 'Sell Inherited House Pennsylvania | ClearEdge Home Buyers',
    description: 'Skip the stress of selling an inherited property. Get a fair cash offer within 24 hours. No repairs, no cleanout, no commission.',
    url: 'https://clearedgehomebuyers.com/situations/inherited-property',
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
    canonical: 'https://clearedgehomebuyers.com/situations/inherited-property',
  },
}

const faqData = [
  {
    question: 'Can I sell the house if I live out of state?',
    answer: 'Yes—you can manage the entire sale remotely. We handle property access, coordinate with local title companies, and can close with documents signed electronically or through a mobile notary in your state. Many of our inherited property clients live hours away and never set foot in the property during the transaction.',
  },
  {
    question: 'What if the house needs major repairs?',
    answer: 'We buy houses in any condition. Foundation problems, mold, fire damage, hoarder situations, incomplete renovations—we\'ve purchased all of them. Inherited properties often have years of deferred maintenance. That\'s not a problem for us.',
  },
  {
    question: 'How do you determine your offer price?',
    answer: 'We calculate offers based on the property\'s after-repair value, necessary renovation costs, current market conditions, and our target margin. We\'re transparent about this. Our offers are below retail market value—but they\'re fair when you account for the time, cost, and uncertainty we eliminate.',
  },
  {
    question: 'Do I need to clean out the house first?',
    answer: 'No. Leave everything behind. Furniture, clothing, garage contents, attic storage—we take the property exactly as it sits. Take what\'s meaningful to you and leave the rest.',
  },
  {
    question: 'What\'s the first step if I\'m interested?',
    answer: 'Call us at (570) 904-2059 or submit your information through our website. We\'ll ask a few basic questions about the property and the probate status. Within 24-48 hours, we\'ll have a preliminary offer ready. There\'s no obligation, no pressure, and no cost to you.',
  },
]

export default function InheritedPropertyPage() {
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
    '@type': 'RealEstateAgent',
    name: 'ClearEdge Home Buyers',
    description: 'Cash home buyers serving Eastern Pennsylvania including NEPA, Lehigh Valley, and the Poconos. We buy inherited properties as-is with no repairs or realtor fees.',
    url: 'https://clearedgehomebuyers.com',
    telephone: '+1-570-904-2059',
    areaServed: [
      { '@type': 'State', name: 'Pennsylvania' },
      { '@type': 'AdministrativeArea', name: 'Lackawanna County' },
      { '@type': 'AdministrativeArea', name: 'Luzerne County' },
      { '@type': 'AdministrativeArea', name: 'Lehigh County' },
      { '@type': 'AdministrativeArea', name: 'Northampton County' },
      { '@type': 'AdministrativeArea', name: 'Monroe County' },
    ],
    priceRange: '$',
    knowsAbout: ['Probate Sales', 'Inherited Property', 'Cash Home Buying', 'As-Is Home Sales'],
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
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Sell Inherited House Pennsylvania:<br className="hidden md:block" />
              Skip the Stress, Keep the Memories
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              You&apos;re grieving, managing an estate, and now there&apos;s a house you never asked for.
              We handle the property so you can focus on what actually matters.
            </p>
          </div>
        </section>

        {/* The Reality Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              What Happens When You Inherit a House in Pennsylvania in 2026?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Pennsylvania inheritance comes with a specific legal and financial reality that most families don&apos;t anticipate.
            </p>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold mt-1">→</span>
                <span><strong>Probate takes 6-12 months minimum.</strong> Pennsylvania formal probate requires court supervision, and nothing moves until Short Certificates are issued by the Register of Wills.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold mt-1">→</span>
                <span><strong>PA inheritance tax is due within 9 months.</strong> Direct descendants pay 4.5%. Siblings pay 12%. Non-relatives pay 15%. Spouses are exempt.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold mt-1">→</span>
                <span><strong>You&apos;re responsible for property maintenance immediately.</strong> The estate—and by extension, you as executor or beneficiary—must maintain code compliance from day one.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold mt-1">→</span>
                <span><strong>January 1, 2026 UCC adoption changes the game.</strong> Pennsylvania&apos;s statewide adoption of the 2021 International Building Code means stricter inspection standards for older inherited properties.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold mt-1">→</span>
                <span><strong>Holding costs compound fast.</strong> Utilities, insurance, property taxes, and potential HOA dues don&apos;t pause because the owner passed away.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Hidden Risks Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              What Most Families Don&apos;t Realize About Inherited Property Sales
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Can you sell an inherited house before probate is complete in Pennsylvania?
                </h3>
                <p className="text-slate-700 mb-3">
                  No—you cannot transfer legal title until the Register of Wills issues Short Certificates naming you as the authorized representative.
                </p>
                <p className="text-slate-600">
                  However, you can begin the sales process, accept an offer, and have a buyer ready to close the moment probate clears.
                  This is often the smartest approach when holding costs are mounting.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  What happens if the inherited house has code violations?
                </h3>
                <p className="text-slate-700 mb-3">
                  The estate is liable for all existing violations, and fines continue accruing during probate.
                </p>
                <p className="text-slate-600">
                  In cities like Allentown, mandatory pre-sale inspections mean violations must be resolved before any traditional sale.
                  Reading&apos;s I-30 quality-of-life codes impose daily fines on vacant or neglected properties.
                  Scranton&apos;s rental registration requirements may apply if the property was previously tenant-occupied.
                </p>
                <p className="text-slate-600 mt-3">
                  Cash sales bypass most inspection contingencies because buyers like ClearEdge purchase as-is.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Do you pay capital gains tax on an inherited house in Pennsylvania?
                </h3>
                <p className="text-slate-700 mb-3">
                  You receive a &quot;stepped-up basis&quot; equal to the property&apos;s fair market value at the date of death.
                </p>
                <p className="text-slate-600">
                  If you sell quickly at or near that value, capital gains are minimal or zero.
                  If you hold the property and it appreciates, you pay tax on the gain above the stepped-up basis.
                  This is one reason many executors choose to sell inherited property promptly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  What if there are multiple heirs who disagree about selling?
                </h3>
                <p className="text-slate-700 mb-3">
                  Pennsylvania law allows any co-heir to file a partition action forcing a sale if consensus cannot be reached.
                </p>
                <p className="text-slate-600">
                  This is expensive, adversarial, and typically results in a court-ordered auction at below-market value.
                  A negotiated private sale—even at a modest discount—almost always leaves more money on the table for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              How Long Does It Take to Sell an Inherited House in Pennsylvania?
            </h2>
            <p className="text-slate-700 mb-6">
              The timeline depends entirely on your chosen sales path and probate status.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Traditional Listing</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>6-12 months for probate</li>
                  <li>2-4 weeks for repairs and staging</li>
                  <li>30-90 days on market</li>
                  <li>30-45 days to close with buyer financing</li>
                  <li><strong className="text-slate-900">Total: 9-18 months typical</strong></li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-amber-500">
                <h3 className="font-semibold text-slate-900 mb-4">Cash Sale to ClearEdge</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>6-12 months for probate (same)</li>
                  <li>No repairs needed</li>
                  <li>Offer within 24-48 hours</li>
                  <li>Close within 7-14 days of probate completion</li>
                  <li><strong className="text-slate-900">Total: 6-12 months (probate-limited only)</strong></li>
                </ul>
              </div>
            </div>

            <p className="text-slate-600 mt-6">
              In simplified probate situations—such as when the spouse is the sole heir or the estate qualifies for small estate procedures—timelines compress significantly.
              We&apos;ve closed some inherited property transactions in as little as 3 weeks.
            </p>
          </div>
        </section>

        {/* ClearEdge Advantage Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              How ClearEdge Handles Inherited Property Sales Differently
            </h2>
            <p className="text-slate-700 mb-8">
              Since 2016, we&apos;ve helped over 200 Pennsylvania families navigate inherited property situations.
              Here&apos;s what we eliminate from the process:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'No Cleanout Required', desc: 'Leave the furniture, personal items, even decades of belongings. We handle everything.' },
                { title: 'No Repairs', desc: 'Deferred maintenance, roof issues, outdated systems—we buy as-is regardless of condition.' },
                { title: 'No Showings or Open Houses', desc: 'No strangers walking through your loved one\'s home. One visit from our team is all we need.' },
                { title: 'No Inspection Contingencies', desc: 'Our offer is our offer. No renegotiation after inspectors find "issues."' },
                { title: 'No Financing Delays', desc: 'Cash means no appraisal requirements, no lender timelines, no deals falling through.' },
                { title: 'No Commission', desc: 'No 5-6% realtor fees. The offer we make is what you receive at closing.' },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Markets Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Where We Buy Inherited Properties in Pennsylvania
            </h2>
            <p className="text-slate-700 mb-6">
              ClearEdge serves all of Eastern Pennsylvania with particular expertise in these markets:
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">NEPA</h3>
                <p className="text-slate-600 text-sm">
                  <Link href="/locations/scranton" className="hover:text-amber-600">Scranton</Link>,{' '}
                  <Link href="/locations/wilkes-barre" className="hover:text-amber-600">Wilkes-Barre</Link>,{' '}
                  <Link href="/locations/hazleton" className="hover:text-amber-600">Hazleton</Link>,{' '}
                  <Link href="/locations/pittston" className="hover:text-amber-600">Pittston</Link>,{' '}
                  <Link href="/locations/kingston" className="hover:text-amber-600">Kingston</Link>,{' '}
                  <Link href="/locations/carbondale" className="hover:text-amber-600">Carbondale</Link>,{' '}
                  <Link href="/locations/dunmore" className="hover:text-amber-600">Dunmore</Link>,{' '}
                  <Link href="/locations/nanticoke" className="hover:text-amber-600">Nanticoke</Link>,{' '}
                  <Link href="/locations/honesdale" className="hover:text-amber-600">Honesdale</Link>
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">Lehigh Valley</h3>
                <p className="text-slate-600 text-sm">
                  <Link href="/locations/allentown" className="hover:text-amber-600">Allentown</Link>,{' '}
                  <Link href="/locations/bethlehem" className="hover:text-amber-600">Bethlehem</Link>,{' '}
                  <Link href="/locations/easton" className="hover:text-amber-600">Easton</Link>, and surrounding communities
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">Poconos</h3>
                <p className="text-slate-600 text-sm">
                  <Link href="/locations/stroudsburg" className="hover:text-amber-600">Stroudsburg</Link>,{' '}
                  <Link href="/locations/east-stroudsburg" className="hover:text-amber-600">East Stroudsburg</Link>,{' '}
                  <Link href="/locations/pocono-pines" className="hover:text-amber-600">Pocono Pines</Link>,{' '}
                  <Link href="/locations/tannersville" className="hover:text-amber-600">Tannersville</Link>, Mount Pocono
                </p>
              </div>
            </div>

            <p className="text-slate-600 mt-6">
              Each county has specific probate procedures and timelines.
              Lackawanna County, Luzerne County, and Lehigh County probate offices all operate differently.
              We&apos;ve worked with each and understand how to coordinate closings efficiently.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Common Questions About Selling Inherited Property in Pennsylvania
            </h2>

            <div className="space-y-8">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b border-slate-200 pb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
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

        {/* Soft CTA Section */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Explore Your Options?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              If you&apos;ve inherited a house in Pennsylvania and you&apos;re weighing your options, we&apos;re happy to talk through the situation.
              No sales pitch.
              Just straightforward information about what a cash sale would look like for your specific property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                Get Your Cash Offer
              </Link>
              <a
                href="tel:5709042059"
                className="inline-flex items-center justify-center gap-2 border border-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call (570) 904-2059
              </a>
            </div>
            <p className="text-slate-400 text-sm mt-8">
              Sell inherited house Pennsylvania with ClearEdge Home Buyers—trusted by 200+ families since 2016.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
