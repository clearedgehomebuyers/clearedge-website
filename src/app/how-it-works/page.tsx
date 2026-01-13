// src/app/how-it-works/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollToFormButton } from '@/components/ScrollToFormButton'
import { LeadForm } from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'How It Works | Sell Your PA House for Cash in 3 Simple Steps | ClearEdge',
  description: 'See exactly how ClearEdge buys houses: Discovery call, cash offer in 24 hours, close on your timeline. No repairs, no fees, no pressure. Serving Eastern PA since 2016.',
  keywords: ['how to sell house fast PA', 'cash home buying process', 'sell house as-is Pennsylvania', 'ClearEdge process'],
  openGraph: {
    title: 'How It Works | Sell Your PA House for Cash in 3 Simple Steps | ClearEdge',
    description: 'See exactly how ClearEdge buys houses: Discovery call, cash offer in 24 hours, close on your timeline. No repairs, no fees, no pressure.',
    url: 'https://www.clearedgehomebuyers.com/how-it-works',
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
    canonical: 'https://www.clearedgehomebuyers.com/how-it-works',
  },
}

const faqs = [
  {
    question: 'How is your offer different from market value?',
    answer: 'Market value assumes a buyer-ready home sold through traditional channels. Our offer reflects the as-is condition and accounts for repairs, holding costs, and our margin. For some sellers, the convenience and speed outweigh the difference. For others, listing makes more sense — and we\'ll tell you that honestly.',
  },
  {
    question: 'What if my house has serious problems?',
    answer: 'We buy houses with foundation issues, fire damage, mold, roof problems, code violations — you name it. The condition is factored into our offer, but it won\'t disqualify you.',
  },
  {
    question: 'Can you buy my house if it\'s in probate?',
    answer: 'Yes. We work with estate attorneys regularly and can close during or after probate depending on the court timeline.',
  },
  {
    question: 'How fast can you actually close?',
    answer: 'As fast as 7 days if title is clear. Most sales close in 14-30 days. If you need more time, we\'ll work around your schedule.',
  },
  {
    question: 'Is there any cost or obligation to get an offer?',
    answer: 'None. The offer is free, there\'s no obligation, and if you decide not to move forward, that\'s fine. No follow-up pressure.',
  },
  {
    question: 'Do you pay fair prices?',
    answer: 'We pay what the numbers support. Our offers are below retail market value because we take on the risk, repairs, and holding costs. But we\'re transparent about how we calculate offers — you\'ll see exactly where the number comes from.',
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
                '@id': 'https://www.clearedgehomebuyers.com/how-it-works/#webpage',
                url: 'https://www.clearedgehomebuyers.com/how-it-works',
                name: 'How It Works | Sell Your PA House for Cash in 3 Simple Steps',
                description: 'See exactly how ClearEdge buys houses: Discovery call, cash offer in 24 hours, close on your timeline. No repairs, no fees, no pressure.',
                isPartOf: {
                  '@id': 'https://www.clearedgehomebuyers.com/#website',
                },
                breadcrumb: {
                  '@type': 'BreadcrumbList',
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
                      name: 'How It Works',
                      item: 'https://www.clearedgehomebuyers.com/how-it-works',
                    },
                  ],
                },
              },
              {
                '@type': 'HowTo',
                '@id': 'https://www.clearedgehomebuyers.com/how-it-works/#howto',
                name: 'How to Sell Your PA House for Cash in 3 Simple Steps',
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
                    name: 'Discovery Call',
                    text: 'Tell us about your property and situation in a 10-minute conversation. We ask about the condition, timeline, and what matters most to you. No pressure, no obligation.',
                    url: 'https://www.clearedgehomebuyers.com/how-it-works#step-1',
                  },
                  {
                    '@type': 'HowToStep',
                    position: 2,
                    name: 'Get Your Cash Offer',
                    text: 'Within 24 hours, we evaluate your property and present a written cash offer. Our offers are good for 30 days, and we walk you through exactly how we calculated the number.',
                    url: 'https://www.clearedgehomebuyers.com/how-it-works#step-2',
                  },
                  {
                    '@type': 'HowToStep',
                    position: 3,
                    name: 'Close On Your Terms',
                    text: 'Accept the offer and choose your closing date — as fast as 7 days or as far out as 60+ days. We handle the title work, paperwork, and coordination. You show up, sign, and get paid.',
                    url: 'https://www.clearedgehomebuyers.com/how-it-works#step-3',
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://www.clearedgehomebuyers.com/how-it-works/#faq',
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
              How We Buy Houses — And Why It&apos;s Simpler Than You Think
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              No repairs. No agents. No waiting for buyers. Just a fair cash offer and a closing date that works for you.
            </p>
            <ScrollToFormButton className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors">
              Get My Cash Offer
            </ScrollToFormButton>
          </div>
        </section>

        {/* WHY TRADITIONAL SELLING IS HARD */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Why Selling a House in Pennsylvania Feels So Hard
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              Selling through an agent means months of uncertainty. You&apos;ll deal with:
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 p-5 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-2">Disclosure Requirements</h3>
                <p className="text-slate-600 text-sm">PA law requires detailed property disclosures. Miss something and face legal trouble later.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-2">Municipal Inspections</h3>
                <p className="text-slate-600 text-sm">Cities like Allentown require pre-sale inspections. Violations must be fixed before closing.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-2">Buyer Financing Delays</h3>
                <p className="text-slate-600 text-sm">Mortgage approvals fall through. Appraisals come in low. Deals collapse at the last minute.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-2">Repairs and Staging</h3>
                <p className="text-slate-600 text-sm">Most buyers want move-in ready. That means spending money before you see a dime.</p>
              </div>
            </div>
            <p className="text-slate-700 font-medium">
              There&apos;s a simpler path.
            </p>
          </div>
        </section>

        {/* THREE STEPS TO SOLD */}
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Three Steps to Sold
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Discovery Call</h3>
                <p className="text-amber-600 font-medium text-sm mb-3">A 10-Minute Conversation</p>
                <p className="text-slate-600">
                  Tell us about your property and situation. We&apos;ll ask about the condition, timeline, and what matters most to you. No pressure, no obligation — just a straightforward conversation to see if we can help.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Get Your Cash Offer</h3>
                <p className="text-amber-600 font-medium text-sm mb-3">Within 24 Hours</p>
                <p className="text-slate-600">
                  We&apos;ll evaluate your property and present a written cash offer. Our offers are good for 30 days, so you have time to think. We&apos;ll walk you through exactly how we calculated the number — no mystery math.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Close On Your Terms</h3>
                <p className="text-amber-600 font-medium text-sm mb-3">You Pick the Date</p>
                <p className="text-slate-600">
                  Accept the offer and choose your closing date — as fast as 7 days or as far out as 60+ days. We handle the title work, paperwork, and coordination. You show up, sign, and get paid.
                </p>
              </div>
            </div>
            <div className="text-center">
              <ScrollToFormButton className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors">
                Ready to Start? Get Your Offer &rarr;
              </ScrollToFormButton>
            </div>
          </div>
        </section>

        {/* HOW WE CALCULATE YOUR OFFER */}
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              How We Calculate Your Offer
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              We&apos;re not going to hide the math. Here&apos;s exactly how we determine what we can pay:
            </p>
            <p className="text-slate-700 mb-4">
              We start with what your house will be worth after it&apos;s fully renovated — that&apos;s called the After Repair Value (ARV). Then we subtract:
            </p>
            <ul className="list-disc list-inside text-slate-700 mb-6 space-y-2 ml-4">
              <li><span className="font-medium">Repair costs</span> — What it takes to get the property market-ready</li>
              <li><span className="font-medium">Holding costs</span> — Taxes, insurance, utilities while we renovate</li>
              <li><span className="font-medium">Selling costs</span> — Agent commissions and closing costs when we resell</li>
              <li><span className="font-medium">Our margin</span> — What we need to make the project worthwhile</li>
            </ul>
            <p className="text-slate-700 mb-8">
              What&apos;s left is what we can offer you.
            </p>
            <div className="bg-white border-l-4 border-amber-500 p-6 rounded-r-lg shadow-sm mb-8">
              <p className="text-slate-700">
                <span className="font-semibold">Example:</span> If a renovated home sells for $200,000 and total costs plus margin are $70,000, we&apos;d offer around $130,000.
              </p>
            </div>
            <p className="text-slate-700">
              This isn&apos;t about lowballing you. It&apos;s about being honest so you can make an informed decision. If the numbers don&apos;t work for your situation, we&apos;ll tell you — and we might even suggest listing with an agent instead.
            </p>
          </div>
        </section>

        {/* WHAT CLEAREDGE HANDLES */}
        <section className="py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              What ClearEdge Handles For You
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Repairs Needed</h3>
                <p className="text-slate-600">
                  Sell as-is. Foundation issues, roof damage, mold — doesn&apos;t matter.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Inspections</h3>
                <p className="text-slate-600">
                  We don&apos;t require you to fix violations or pass municipal inspection.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Mortgage Delays</h3>
                <p className="text-slate-600">
                  Cash means no lender approval, no appraisal contingencies.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Commissions</h3>
                <p className="text-slate-600">
                  We&apos;re not agents. You pay zero commission.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Uncertainty</h3>
                <p className="text-slate-600">
                  When we make an offer and you accept, the deal closes. Period.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHO THIS IS FOR */}
        <section className="bg-slate-900 text-white py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Is This Right For You?
            </h2>
            <p className="text-lg text-slate-300 mb-10 text-center max-w-2xl mx-auto">
              We work with homeowners in all kinds of situations. If any of these sound familiar, we can probably help:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <Link href="/situations/foreclosure" className="bg-slate-800 hover:bg-slate-700 p-5 rounded-lg transition-colors group">
                <p className="font-medium group-hover:text-amber-400 transition-colors">Facing Foreclosure</p>
              </Link>
              <Link href="/situations/inherited-property" className="bg-slate-800 hover:bg-slate-700 p-5 rounded-lg transition-colors group">
                <p className="font-medium group-hover:text-amber-400 transition-colors">Inherited Property</p>
              </Link>
              <Link href="/situations/divorce" className="bg-slate-800 hover:bg-slate-700 p-5 rounded-lg transition-colors group">
                <p className="font-medium group-hover:text-amber-400 transition-colors">Going Through Divorce</p>
              </Link>
              <Link href="/situations/job-relocation" className="bg-slate-800 hover:bg-slate-700 p-5 rounded-lg transition-colors group">
                <p className="font-medium group-hover:text-amber-400 transition-colors">Job Relocation</p>
              </Link>
              <Link href="/situations/major-repairs" className="bg-slate-800 hover:bg-slate-700 p-5 rounded-lg transition-colors group">
                <p className="font-medium group-hover:text-amber-400 transition-colors">Major Repairs Needed</p>
              </Link>
              <Link href="/situations/tax-liens-code-violations" className="bg-slate-800 hover:bg-slate-700 p-5 rounded-lg transition-colors group">
                <p className="font-medium group-hover:text-amber-400 transition-colors">Tax Liens or Code Violations</p>
              </Link>
              <Link href="/situations/tired-landlord" className="bg-slate-800 hover:bg-slate-700 p-5 rounded-lg transition-colors group">
                <p className="font-medium group-hover:text-amber-400 transition-colors">Tired Landlord</p>
              </Link>
              <Link href="/situations/vacant-property" className="bg-slate-800 hover:bg-slate-700 p-5 rounded-lg transition-colors group">
                <p className="font-medium group-hover:text-amber-400 transition-colors">Vacant Property</p>
              </Link>
            </div>
            <div className="text-center">
              <ScrollToFormButton className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors">
                Not sure if you qualify? Reach out anyway &rarr;
              </ScrollToFormButton>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              Don&apos;t Just Take Our Word For It
            </h2>
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
              <div className="text-amber-500 text-6xl font-serif leading-none mb-4">&ldquo;</div>
              <blockquote className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-6">
                Selling a property from out of state can be incredibly stressful, but Tyler made it feel effortless. He handled everything — from coordinating with my dad&apos;s caregivers to managing repairs I couldn&apos;t oversee myself. I never felt pressured, and he kept me informed every step of the way. If you&apos;re dealing with an inherited property or just need someone you can trust, call Tyler.
              </blockquote>
              <p className="text-slate-600 font-medium">
                — Kandra G., sold inherited property from Texas
              </p>
            </div>
            <div className="text-center mt-8">
              <Link href="/testimonials" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
                Read more reviews &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10">
              Common Questions
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  How is your offer different from market value?
                </h3>
                <p className="text-slate-700">
                  Market value assumes a buyer-ready home sold through traditional channels. Our offer reflects the as-is condition and accounts for repairs, holding costs, and our margin. For some sellers, the convenience and speed outweigh the difference. For others, listing makes more sense — and we&apos;ll tell you that honestly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  What if my house has serious problems?
                </h3>
                <p className="text-slate-700">
                  We buy houses with foundation issues, fire damage, mold, roof problems, code violations — you name it. The condition is factored into our offer, but it won&apos;t disqualify you.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Can you buy my house if it&apos;s in probate?
                </h3>
                <p className="text-slate-700">
                  Yes. We work with estate attorneys regularly and can close during or after probate depending on the court timeline.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  How fast can you actually close?
                </h3>
                <p className="text-slate-700">
                  As fast as 7 days if title is clear. Most sales close in 14-30 days. If you need more time, we&apos;ll work around your schedule.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Is there any cost or obligation to get an offer?
                </h3>
                <p className="text-slate-700">
                  None. The offer is free, there&apos;s no obligation, and if you decide not to move forward, that&apos;s fine. No follow-up pressure.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Do you pay fair prices?
                </h3>
                <p className="text-slate-700">
                  We pay what the numbers support. Our offers are below retail market value because we take on the risk, repairs, and holding costs. But we&apos;re transparent about how we calculate offers — you&apos;ll see exactly where the number comes from.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="lead-form" className="bg-amber-500 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              See What Your House Is Worth
            </h2>
            <p className="text-lg text-slate-800 mb-8">
              Get a no-obligation cash offer. Takes 2 minutes. No pressure, no commitment.
            </p>
            <LeadForm />
            <p className="text-slate-700 text-sm mt-8">
              Prefer to talk? Call Tyler directly:{' '}
              <a href="tel:+15709042059" className="font-semibold hover:underline">
                (570) 904-2059
              </a>
            </p>
          </div>
        </section>

        {/* CLOSING KEYWORD ANCHOR */}
        <section className="py-12 bg-slate-100">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-slate-600">
              When you&apos;re ready to sell your Pennsylvania house fast without repairs, showings, or uncertainty, ClearEdge is here. Get your cash offer today.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
