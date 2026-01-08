// src/app/how-it-works/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How It Works | Sell Your House Fast for Cash in Pennsylvania | ClearEdge',
  description: 'Learn how to sell your house fast for cash in Pennsylvania. Three simple steps: tell us about your property, get a cash offer in 24 hours, close on your timeline. No repairs, no agents, no fees.',
  keywords: 'how to sell your house fast for cash Pennsylvania, cash home buying process, sell house fast PA, ClearEdge process',
  openGraph: {
    title: 'How It Works | Sell Your House Fast for Cash | ClearEdge Home Buyers',
    description: 'Three steps to sell your Pennsylvania house for cash. No repairs, no showings, no uncertainty. Close in as few as 7 days.',
    url: 'https://clearedgehomebuyers.com/how-it-works',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://clearedgehomebuyers.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ClearEdge Home Buyers - How It Works',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works | Sell Your House Fast for Cash | ClearEdge',
    description: 'Three steps to sell your Pennsylvania house for cash. Close in as few as 7 days.',
  },
  alternates: {
    canonical: 'https://clearedgehomebuyers.com/how-it-works',
  },
}

const faqs = [
  {
    question: 'How do you determine your offer price?',
    answer: 'We calculate offers based on the property\'s after-repair value minus our estimated repair costs, current market comparables, and our operating margin. We\'ll show you exactly how we arrived at the number. There\'s no mystery or hidden math.',
  },
  {
    question: 'Will I get less than market value?',
    answer: 'Yes, our offer will be below what you might get listing on the open market with a real estate agent. The tradeoff is speed, certainty, and zero out-of-pocket costs. For many homeowners, especially those dealing with distressed properties or urgent timelines, that tradeoff makes sense.',
  },
  {
    question: 'What if my house has major problems?',
    answer: 'Major problems are exactly what we expect. Foundation cracks, roof damage, mold, fire damage, code violations — we\'ve bought properties with all of these issues. The condition of your house doesn\'t disqualify it. It factors into the offer price, but we still buy.',
  },
  {
    question: 'Can I sell if my house is in probate?',
    answer: 'Yes, but we need to wait for the executor to receive Letters Testamentary from the court. Once that\'s in place, the executor has legal authority to sell. We work with probate attorneys throughout Eastern PA and can help navigate the timeline.',
  },
  {
    question: 'What if I change my mind after getting an offer?',
    answer: 'Nothing happens. Our offer is valid for 30 days and comes with no obligation. You can review it, think about it, and decide it\'s not right for you. There\'s no pressure and no follow-up harassment.',
  },
  {
    question: 'Do you buy houses everywhere in Pennsylvania?',
    answer: 'We focus on Eastern Pennsylvania — specifically NEPA, the Lehigh Valley, and the Poconos. This includes Scranton, Wilkes-Barre, Allentown, Bethlehem, Easton, Reading, Hazleton, Stroudsburg, and surrounding areas.',
  },
]

export default function HowItWorksPage() {
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
                '@id': 'https://clearedgehomebuyers.com/how-it-works/#webpage',
                url: 'https://clearedgehomebuyers.com/how-it-works',
                name: 'How It Works | Sell Your House Fast for Cash in Pennsylvania',
                description: 'Learn how to sell your house fast for cash in Pennsylvania. Three simple steps with ClearEdge Home Buyers.',
                isPartOf: {
                  '@id': 'https://clearedgehomebuyers.com/#website',
                },
                breadcrumb: {
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Home',
                      item: 'https://clearedgehomebuyers.com',
                    },
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: 'How It Works',
                      item: 'https://clearedgehomebuyers.com/how-it-works',
                    },
                  ],
                },
              },
              {
                '@type': 'HowTo',
                '@id': 'https://clearedgehomebuyers.com/how-it-works/#howto',
                name: 'How to Sell Your House Fast for Cash in Pennsylvania',
                description: 'A three-step process to sell your Pennsylvania house for cash without repairs, showings, or agent fees.',
                totalTime: 'P7D',
                estimatedCost: {
                  '@type': 'MonetaryAmount',
                  currency: 'USD',
                  value: '0',
                },
                step: [
                  {
                    '@type': 'HowToStep',
                    position: 1,
                    name: 'Tell Us About Your Property',
                    text: 'Call us at (570) 904-2059 or submit your property details online. We ask basic questions about the address, your situation, timeline, and condition. Within 24 hours guaranteed, you receive an all-cash offer — plus alternative options if they make sense for your situation.',
                    url: 'https://clearedgehomebuyers.com/how-it-works#step-1',
                  },
                  {
                    '@type': 'HowToStep',
                    position: 2,
                    name: 'Review Your Offer',
                    text: 'We present a guaranteed cash offer valid for 30 days, calculated from after-repair value, repair costs, and market comparables. If you decide to move forward, we schedule a 20-30 minute walkthrough to confirm condition and take photos.',
                    url: 'https://clearedgehomebuyers.com/how-it-works#step-2',
                  },
                  {
                    '@type': 'HowToStep',
                    position: 3,
                    name: 'Choose Your Closing Date',
                    text: 'You pick the closing date — as few as 7 days or up to 30+ days. We handle title work and logistics. Sign at a title company, attorney office, or with a mobile notary at your location. Receive funds same day or next business day.',
                    url: 'https://clearedgehomebuyers.com/how-it-works#step-3',
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://clearedgehomebuyers.com/how-it-works/#faq',
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
        {/* HERO SECTION */}
        <section className="bg-slate-900 text-white py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              How to Sell Your House Fast for Cash in Pennsylvania
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Three steps. No repairs. No showings. No uncertainty.
              Here's exactly what happens when you work with ClearEdge.
            </p>
          </div>
        </section>

        {/* WHY TRADITIONAL SELLING IS COMPLICATED */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Why Is Selling a House in Pennsylvania So Complicated?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              The traditional home sale process involves dozens of steps, multiple parties, and months of uncertainty.
            </p>
            <p className="text-slate-700 mb-4">
              Before you can even list, Pennsylvania requires sellers to complete a Seller's Disclosure Statement covering 16 categories of potential property issues.
              Many municipalities add their own requirements on top of state law.
            </p>
            <p className="text-slate-700 mb-4">
              Cities like Allentown require a pre-sale inspection within five business days of listing.
              Violations must be corrected or disclosed before closing.
            </p>
            <p className="text-slate-700 mb-4">
              Properties in probate can't close without Letters Testamentary, which requires court approval.
              The average Pennsylvania probate process takes 12 to 18 months.
            </p>
            <p className="text-slate-700">
              If you're dealing with deferred maintenance, code violations, or an inherited property, these requirements compound quickly.
            </p>
          </div>
        </section>

        {/* THE THREE-STEP PROCESS */}
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10">
              How Does Selling to ClearEdge Work?
            </h2>
            <p className="text-lg text-slate-700 mb-10">
              Our process has three steps and typically takes 7 to 30 days from first contact to closing.
            </p>

            {/* Step 1 */}
            <div className="mb-12" id="step-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-slate-900 font-bold text-xl">1</span>
                <h3 className="text-2xl font-bold text-slate-900">Tell Us About Your Property</h3>
              </div>
              <p className="text-slate-700 mb-3">
                Call us at <a href="tel:5709042059" className="text-amber-600 hover:text-amber-700 font-medium">(570) 904-2059</a> or submit your property details through our website.
              </p>
              <p className="text-slate-700 mb-3">
                We'll ask a few basic questions: the property address, your situation, your timeline, and the general condition of the house.
              </p>
              <p className="text-slate-700 mb-3">
                This conversation takes about 10 minutes.
                There's no obligation and no pressure.
              </p>
              <p className="text-slate-700">
                Within 24 hours — guaranteed — we'll get back to you with an all-cash offer.
                Depending on your situation and the property, we may also present alternative options that could be a better fit for both of us.
                But at minimum, you'll have a cash number in hand within a day.
              </p>
            </div>

            {/* Step 2 */}
            <div className="mb-12" id="step-2">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-slate-900 font-bold text-xl">2</span>
                <h3 className="text-2xl font-bold text-slate-900">Review Your Offer</h3>
              </div>
              <p className="text-slate-700 mb-3">
                We'll call you back within 24 hours with a guaranteed cash offer that's valid for 30 days.
                If today isn't the right time, the offer doesn't disappear.
              </p>
              <p className="text-slate-700 mb-3">
                We're able to move this quickly because of our experience.
                After nearly a decade of buying properties throughout Eastern Pennsylvania, we know these markets inside and out.
                We calculate your offer based on the property's after-repair value, expected repair costs, current market comparables, and our operating margin — then walk you through exactly how we arrived at the number.
              </p>
              <p className="text-slate-700 mb-3">
                If you decide ClearEdge is a good fit, we'll schedule a walkthrough at your convenience — usually within a few days.
              </p>
              <p className="text-slate-700 mb-3">
                This isn't an inspection in the traditional sense.
                We're not looking for reasons to reduce your price.
                We're confirming the property condition matches what we discussed and identifying what repairs we'll need to handle after the purchase.
                We'll also take some photographs for our records, marketing, and contractor coordination.
              </p>
              <p className="text-slate-700">
                The walkthrough takes 20 to 30 minutes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="mb-12" id="step-3">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-slate-900 font-bold text-xl">3</span>
                <h3 className="text-2xl font-bold text-slate-900">Choose Your Closing Date</h3>
              </div>
              <p className="text-slate-700 mb-3">
                At this point, the heavy lifting is done.
                If you accept our offer, you pick the closing date.
              </p>
              <p className="text-slate-700 mb-3">
                Need to close in 7 days because you're up against a deadline? We can do that.
                Need 30 days to coordinate a move or tie up loose ends? That works too.
              </p>
              <p className="text-slate-700 mb-3">
                We handle the title work and closing logistics.
                You sign the paperwork at a local title company, attorney's office, or we can send a mobile notary to meet you wherever you are — you don't even need to leave your home.
              </p>
              <p className="text-slate-700">
                You receive your funds the same day or next business day via wire transfer or certified check.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <p className="text-slate-700 font-medium">
                That's it. No listing. No showings. No repairs. No financing contingencies. No waiting to see if a buyer's loan gets approved.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT'S DIFFERENT ABOUT THIS PROCESS */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              What Does ClearEdge Handle That Traditional Sales Don't?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              When you sell to us, several pain points disappear entirely.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No repairs or cleanup required</h3>
                <p className="text-slate-700">
                  We buy properties in any condition.
                  Leave furniture, trash, or personal belongings — we handle the cleanout.
                  If there's fire damage, foundation issues, or code violations, we buy it anyway.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No inspections you need to pass</h3>
                <p className="text-slate-700">
                  Traditional buyers require inspections and often renegotiate based on findings.
                  We don't.
                  We already know we're buying a property that needs work.
                  The price we offer accounts for that upfront.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No mortgage approval delays</h3>
                <p className="text-slate-700">
                  We pay cash.
                  There's no lender involved, no appraisal contingency, no underwriting delays.
                  When we say we'll close in 7 days, we mean it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No agent commissions</h3>
                <p className="text-slate-700">
                  There's no 5-6% commission because there's no agent.
                  We're the buyer.
                  The offer we make is what you receive at closing, minus any existing liens or mortgages that get paid off.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No uncertainty about whether the deal will close</h3>
                <p className="text-slate-700">
                  We've closed over 200 transactions since 2016.
                  When we make an offer and you accept, the deal closes.
                  We don't back out due to inspection findings or financing issues.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHO THIS PROCESS IS RIGHT FOR */}
        <section className="bg-slate-900 text-white py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">
              Who Is This Process Best For?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              A cash sale makes the most sense when time, condition, or complexity are factors.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="font-medium">Homeowners facing foreclosure who need to sell before the sheriff sale</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="font-medium">Heirs who inherited a property they don't want to maintain or manage</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="font-medium">Landlords dealing with problem tenants or properties that have become more trouble than they're worth</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="font-medium">Owners of vacant properties accumulating fines, taxes, and liability</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="font-medium">Divorcing couples who need to liquidate jointly-owned property quickly</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="font-medium">Anyone who simply doesn't want to deal with the traditional selling process</p>
              </div>
            </div>
            <p className="text-slate-400 mt-8">
              We've written detailed guides for each of these situations.
              See our pages on{' '}
              <Link href="/situations/foreclosure" className="text-amber-400 hover:text-amber-300 underline">foreclosure</Link>,{' '}
              <Link href="/situations/inherited-property" className="text-amber-400 hover:text-amber-300 underline">inherited property</Link>,{' '}
              <Link href="/situations/probate" className="text-amber-400 hover:text-amber-300 underline">probate sales</Link>,{' '}
              <Link href="/situations/tired-landlord" className="text-amber-400 hover:text-amber-300 underline">tired landlords</Link>, and{' '}
              <Link href="/situations/divorce" className="text-amber-400 hover:text-amber-300 underline">divorce</Link>.
            </p>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10">
              Common Questions About Our Process
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  How do you determine your offer price?
                </h3>
                <p className="text-slate-700">
                  We calculate offers based on the property's after-repair value minus our estimated repair costs, current market comparables, and our operating margin.
                  We'll show you exactly how we arrived at the number.
                  There's no mystery or hidden math.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Will I get less than market value?
                </h3>
                <p className="text-slate-700">
                  Yes, our offer will be below what you might get listing on the open market with a real estate agent.
                  The tradeoff is speed, certainty, and zero out-of-pocket costs.
                  For many homeowners, especially those dealing with distressed properties or urgent timelines, that tradeoff makes sense.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  What if my house has major problems?
                </h3>
                <p className="text-slate-700">
                  Major problems are exactly what we expect.
                  Foundation cracks, roof damage, mold, fire damage, code violations — we've bought properties with all of these issues.
                  The condition of your house doesn't disqualify it.
                  It factors into the offer price, but we still buy.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Can I sell if my house is in probate?
                </h3>
                <p className="text-slate-700">
                  Yes, but we need to wait for the executor to receive Letters Testamentary from the court.
                  Once that's in place, the executor has legal authority to sell.
                  We work with probate attorneys throughout Eastern PA and can help navigate the timeline.
                  For more details, see our{' '}
                  <Link href="/situations/probate" className="text-amber-600 hover:text-amber-700 underline">
                    probate guide
                  </Link>.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  What if I change my mind after getting an offer?
                </h3>
                <p className="text-slate-700">
                  Nothing happens.
                  Our offer is valid for 30 days and comes with no obligation.
                  You can review it, think about it, and decide it's not right for you.
                  There's no pressure and no follow-up harassment.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Do you buy houses everywhere in Pennsylvania?
                </h3>
                <p className="text-slate-700">
                  We focus on Eastern Pennsylvania — specifically NEPA, the Lehigh Valley, and the Poconos.
                  This includes Scranton, Wilkes-Barre, Allentown, Bethlehem, Easton, Reading, Hazleton, Stroudsburg, and surrounding areas.
                  See our full{' '}
                  <Link href="/#service-areas" className="text-amber-600 hover:text-amber-700 underline">
                    service area list
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-amber-500 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to See What Your House Is Worth?
            </h2>
            <p className="text-lg text-slate-800 mb-8">
              Request a no-obligation cash offer.
              You'll have a number in hand within 24 hours — and full clarity on whether this path makes sense for your situation.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-semibold px-10 py-4 rounded-lg transition-colors"
            >
              Get Your Cash Offer
            </Link>
            <p className="text-slate-700 text-sm mt-6">
              Or call us directly:{' '}
              <a href="tel:5709042059" className="font-semibold hover:underline">
                (570) 904-2059
              </a>
            </p>
          </div>
        </section>

        {/* CLOSING KEYWORD ANCHOR */}
        <section className="py-12 bg-slate-100">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-slate-600">
              Now you know exactly how to sell your house fast for cash in Pennsylvania.
              The next step is yours.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
