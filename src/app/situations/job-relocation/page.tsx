import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, CheckCircle } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sell Your House Fast When Relocating in Pennsylvania | ClearEdge Home Buyers',
  description: 'Need to sell your house fast due to relocation? ClearEdge buys homes directly from relocating homeowners across Eastern PA. No listings, no showings, close in as few as 10 days.',
  keywords: 'sell house fast relocating Pennsylvania, relocating home sale PA, job transfer sell house, military PCS sell house Pennsylvania, sell house fast NEPA',
  openGraph: {
    title: 'Sell Your House Fast When Relocating in Pennsylvania',
    description: 'ClearEdge buys homes directly from relocating homeowners across Eastern PA. No listings, no showings, close in as few as 10 days.',
    url: 'https://clearedgehomebuyers.com/situations/job-relocation',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://clearedgehomebuyers.com/situations/job-relocation',
  },
}

const faqData = [
  {
    question: 'How much will ClearEdge pay for my house?',
    answer: 'We typically offer 70-85% of after-repair market value, depending on condition and location. The tradeoff is speed, certainty, and zero seller-side costs or commissions. For many relocating homeowners, the savings in carrying costs and the elimination of dual-mortgage risk offset the difference.',
  },
  {
    question: 'Is there any obligation if I request an offer?',
    answer: 'No. Our offers are free and come with no obligation. Many homeowners use our offer as a baseline while exploring other options. We\'d rather you make an informed decision than a pressured one.',
  },
  {
    question: 'What happens to my belongings if I can\'t take everything?',
    answer: 'Leave what you don\'t want. We handle cleanouts as part of our standard process. This is especially helpful for long-distance moves where shipping costs make it impractical to bring everything.',
  },
  {
    question: 'Can I sell if I\'m renting my house to tenants?',
    answer: 'Yes. We buy tenant-occupied properties and handle the transition. If you\'re dealing with difficult tenant situations, we can discuss options that don\'t require you to manage an eviction from out of state.',
  },
  {
    question: 'How is ClearEdge different from other "we buy houses" companies?',
    answer: 'We\'re a local, family-owned operation—not a franchise or national call center. Tyler founded ClearEdge in 2016 with a single duplex on Birch Street in Scranton. We\'ve helped over 200 homeowners since then and have been featured in The Morning Call and Lehigh Valley Business.',
  },
]

export default function JobRelocationPage() {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <main className="bg-white">
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sell Your House Fast When Relocating in Pennsylvania
          </h1>

          <p className="text-xl text-gray-700 mb-4">
            You have a start date, a moving truck, and a house that&apos;s still on your books.
          </p>
          <p className="text-xl text-gray-700 mb-12">
            ClearEdge buys homes directly from relocating homeowners across Eastern PA—no listings, no showings, no waiting for a buyer who may never come.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
            Why Is Selling While Relocating So Difficult in 2026?
          </h2>

          <p className="text-gray-700 mb-4">
            Relocation sales fail at higher rates than any other transaction type because they compress timelines that normally take 60-90 days into 30 or less.
          </p>

          <ul className="space-y-3 text-gray-700 mb-8">
            <li className="flex items-start">
              <span className="text-red-600 mr-2 mt-1">•</span>
              <span><strong>Dual mortgage risk:</strong> Carrying two mortgages while waiting for your Pennsylvania home to sell can cost $3,000-$8,000/month depending on your loan balance.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2 mt-1">•</span>
              <span><strong>Remote management burden:</strong> Coordinating inspections, repairs, and showings from another state creates logistical nightmares and delays.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2 mt-1">•</span>
              <span><strong>Buyer financing fall-throughs:</strong> 22% of traditional sales fall through due to financing issues—usually 30-45 days into the process when you&apos;re already gone.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2 mt-1">•</span>
              <span><strong>Pennsylvania inspection requirements:</strong> Cities like Allentown require mandatory 5-day pre-sale inspections that can&apos;t begin until you&apos;re under contract—adding weeks to already tight timelines.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2 mt-1">•</span>
              <span><strong>Vacant property insurance gaps:</strong> Most homeowner policies require notification within 30 days of vacancy, and many exclude coverage entirely after 60 days.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
            What Do Most Relocating Homeowners Get Wrong?
          </h2>

          <p className="text-gray-700 mb-4">
            They assume they have more time than they actually do.
          </p>

          <p className="text-gray-700 mb-4">
            A job transfer with a 30-day start date doesn&apos;t give you 30 days to sell.
            It gives you about 7 days to prepare, list, and hope for immediate interest—then pray for a cash buyer who can close in 21 days.
          </p>

          <p className="text-gray-700 mb-4">
            The traditional listing process assumes you&apos;re local, available, and flexible.
            Relocating homeowners are none of those things.
          </p>

          <p className="text-gray-700 mb-8">
            We&apos;ve seen homeowners turn down promotions, delay military PCS orders, and burn through savings paying two mortgages—all because they underestimated how long a traditional sale takes when you can&apos;t be there to manage it.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
            Who Typically Needs to Sell Fast Due to Relocation?
          </h2>

          <div className="space-y-6 text-gray-700 mb-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Job Transfers and Corporate Relocations</h3>
              <p>
                Companies increasingly expect employees to start within 30-45 days of offer acceptance.
                Some offer relocation packages that include home buyout programs, but most don&apos;t—and those that do often lowball the offer by 10-15% below market.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Military PCS Moves</h3>
              <p>
                Permanent Change of Station orders come with hard deadlines.
                The military doesn&apos;t wait for your house to sell.
                We&apos;ve helped service members from Tobyhanna Army Depot and families connected to regional bases who needed to close before their report date.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Family Emergencies and Caregiving</h3>
              <p>
                When a parent falls ill or a family member needs immediate care, you may need to relocate within weeks, not months.
                These situations don&apos;t allow time for staging, open houses, and negotiation cycles.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Retirement Moves</h3>
              <p>
                Moving closer to grandchildren or downsizing to a warmer climate should be exciting, not stressful.
                But managing a sale remotely while trying to settle into a new home creates unnecessary burden.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
            How Does ClearEdge Help Relocating Homeowners in Pennsylvania?
          </h2>

          <p className="text-gray-700 mb-4">
            We eliminate every variable that makes relocation sales unpredictable.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="text-green-600 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>No listing or marketing required.</strong> You don&apos;t need to photograph, stage, or show your home to strangers while packing boxes.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-600 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>No repairs or cleaning.</strong> We buy as-is. Leave what you don&apos;t want to move.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-600 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>No financing contingencies.</strong> We pay cash. No appraisal delays, no buyer mortgage fall-throughs.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-600 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Flexible closing dates.</strong> Close in 10 days if you need to leave immediately, or 60 days if you need time to coordinate your move.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-600 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Remote-friendly process.</strong> We handle everything locally. You can manage the entire sale from your new location.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-600 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>We cover standard closing costs.</strong> No surprise fees eating into your proceeds at the settlement table.</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
            What Areas in Eastern Pennsylvania Do You Buy Homes?
          </h2>

          <p className="text-gray-700 mb-4">
            ClearEdge buys homes throughout Eastern Pennsylvania, including NEPA, the Lehigh Valley, and the Poconos.
          </p>

          <p className="text-gray-700 mb-4">
            Our primary service areas include{' '}
            <Link href="/locations/scranton" className="text-blue-600 hover:underline">Scranton</Link>,{' '}
            <Link href="/locations/wilkes-barre" className="text-blue-600 hover:underline">Wilkes-Barre</Link>,{' '}
            <Link href="/locations/allentown" className="text-blue-600 hover:underline">Allentown</Link>,{' '}
            <Link href="/locations/bethlehem" className="text-blue-600 hover:underline">Bethlehem</Link>,{' '}
            <Link href="/locations/easton" className="text-blue-600 hover:underline">Easton</Link>,{' '}
            <Link href="/locations/reading" className="text-blue-600 hover:underline">Reading</Link>,{' '}
            <Link href="/locations/hazleton" className="text-blue-600 hover:underline">Hazleton</Link>,{' '}
            <Link href="/locations/stroudsburg" className="text-blue-600 hover:underline">Stroudsburg</Link>, and surrounding communities.
          </p>

          <p className="text-gray-700 mb-8">
            If you&apos;re relocating from anywhere in Lackawanna, Luzerne, Lehigh, Northampton, Monroe, or Berks County, we can likely help.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
            How Fast Can You Actually Close?
          </h2>

          <p className="text-gray-700 mb-4">
            Most relocating homeowners close with ClearEdge in 14-21 days.
          </p>

          <p className="text-gray-700 mb-4">
            We can close in as few as 10 days if title is clear and you need to move immediately.
          </p>

          <p className="text-gray-700 mb-8">
            The limiting factors are typically title search completion (3-5 business days) and coordinating with the title company&apos;s schedule—not our availability or financing.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
            What If I Still Have a Mortgage on the Property?
          </h2>

          <p className="text-gray-700 mb-4">
            Having a mortgage doesn&apos;t prevent you from selling to ClearEdge.
          </p>

          <p className="text-gray-700 mb-4">
            At closing, your mortgage payoff is handled directly by the title company.
            You receive the difference between our purchase price and your remaining loan balance.
          </p>

          <p className="text-gray-700 mb-8">
            If you owe more than the home is worth, we can still discuss options.
            Sometimes a short sale or negotiated payoff makes sense for both parties.
            We&apos;ve helped homeowners in <Link href="/situations/behind-on-payments" className="text-blue-600 hover:underline">behind-on-payments situations</Link> navigate these conversations with lenders.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
            What&apos;s the Process for Selling to ClearEdge When Relocating?
          </h2>

          <p className="text-gray-700 mb-6">
            Our process has three steps and typically takes 7 to 30 days from first contact to closing.
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Get a Cash Offer in 24 Hours</h3>
                <p className="text-gray-700">
                  Call (570) 904-2059 or fill out the form below.
                  We&apos;ll ask about your property address, condition, and timeline—usually a 10-minute conversation.
                  Within 24 hours, you&apos;ll receive a guaranteed cash offer with no hidden fees.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">See Exactly How We Calculated Your Price</h3>
                <p className="text-gray-700">
                  We&apos;ll walk you through our evaluation: comparable sales in your area, estimated repair costs, and our margin.
                  No black-box pricing.
                  You&apos;ll understand exactly why we offered what we did.
                  Our offer is valid for 30 days, so you have time to compare options.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">You Pick the Closing Date (7 to 30 Days)</h3>
                <p className="text-gray-700">
                  Accept the offer and choose your closing date.
                  We work with a local title company to handle paperwork, clear the title, and coordinate signing.
                  If you&apos;ve already relocated, we&apos;ll arrange a mobile notary wherever you are.
                  Funds are wired directly to your bank on closing day.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
            Can I Sell Remotely If I&apos;ve Already Moved?
          </h2>

          <p className="text-gray-700 mb-4">
            Yes. Many of our relocating clients have already left Pennsylvania by the time they contact us.
          </p>

          <p className="text-gray-700 mb-4">
            We coordinate property access, arrange mobile notary services for closing documents, and wire funds directly to your bank.
          </p>

          <p className="text-gray-700 mb-8">
            You don&apos;t need to fly back for showings, inspections, or closing.
            This is one of the primary reasons relocating homeowners choose direct sale over traditional listing.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
            What If My House Needs Work?
          </h2>

          <p className="text-gray-700 mb-4">
            We buy houses in any condition.
          </p>

          <p className="text-gray-700 mb-4">
            Deferred maintenance, outdated kitchens, roof issues, foundation concerns—none of these prevent us from making an offer.
          </p>

          <p className="text-gray-700 mb-4">
            For relocating homeowners, this matters because you don&apos;t have time to manage contractors from 500 miles away.
            And you shouldn&apos;t have to reduce your asking price twice—once for the condition, then again after inspection negotiations.
          </p>

          <p className="text-gray-700 mb-8">
            We factor condition into our initial offer.
            No surprises, no renegotiation after inspections, no repair requests you can&apos;t fulfill from another state.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
            Frequently Asked Questions About Selling While Relocating
          </h2>

          <div className="space-y-6 mb-12">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
            Ready to Explore Your Options?
          </h2>

          <p className="text-gray-700 mb-4">
            If you&apos;re relocating and need to sell your Pennsylvania house on a timeline that traditional listings can&apos;t accommodate, we&apos;re here to help.
          </p>

          <p className="text-gray-700 mb-4">
            Call us at <a href="tel:5709042059" className="text-blue-600 hover:underline font-semibold">(570) 904-2059</a> or{' '}
            <Link href="/contact" className="text-blue-600 hover:underline font-semibold">request a cash offer</Link>.
          </p>

          <p className="text-gray-700 mb-8">
            We&apos;ll give you a straightforward number, explain exactly how we arrived at it, and let you decide if selling to ClearEdge makes sense for your situation.
            No pressure, no follow-up spam—just clarity so you can focus on your move.
          </p>

          <p className="text-gray-600 text-sm">
            ClearEdge Home Buyers helps homeowners sell house fast relocating Pennsylvania with cash offers and flexible closing dates.
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}
