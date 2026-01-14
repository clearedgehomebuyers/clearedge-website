import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { LeadForm } from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'How It Works | Sell Your PA House for Cash in 3 Simple Steps | ClearEdge',
  description: 'See how ClearEdge buys houses: Discovery call, cash offer in 24 hours, close on your timeline. No repairs, no fees, no pressure.',
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
        <V0Header />

        {/* HERO SECTION - Cream with dot pattern */}
        <section className="relative pt-32 pb-16 md:pb-20 px-4 overflow-hidden bg-[#FAF8F5]">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fillOpacity='1' fillRule='evenodd'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
              Our Process
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium text-[#1a1f1a] mb-6">
              How We Buy Houses — And Why It&apos;s Simpler Than You Think
            </h1>
            <p className="text-xl text-[#1a1f1a]/70 mb-8 max-w-2xl mx-auto">
              No repairs. No agents. No waiting for buyers. Just a fair cash offer and a closing date that works for you.
            </p>
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 bg-[#00b332] text-white px-8 py-4 rounded-full font-medium hover:bg-[#009929] transition-all group shadow-lg shadow-[#00b332]/20"
            >
              Get My Cash Offer
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* WHY TRADITIONAL SELLING IS HARD - White */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-serif text-3xl font-medium text-[#1a1f1a] mb-6">
              Why Selling a House in Pennsylvania Feels So Hard
            </h2>
            <p className="text-lg text-[#1a1f1a]/70 mb-8">
              Selling through an agent means months of uncertainty. You&apos;ll deal with:
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#1a1f1a]/5">
                <h3 className="font-semibold text-[#1a1f1a] mb-2">Disclosure Requirements</h3>
                <p className="text-[#1a1f1a]/60 text-sm">PA law requires detailed property disclosures. Miss something and face legal trouble later.</p>
              </div>
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#1a1f1a]/5">
                <h3 className="font-semibold text-[#1a1f1a] mb-2">Municipal Inspections</h3>
                <p className="text-[#1a1f1a]/60 text-sm">Cities like Allentown require pre-sale inspections. Violations must be fixed before closing.</p>
              </div>
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#1a1f1a]/5">
                <h3 className="font-semibold text-[#1a1f1a] mb-2">Buyer Financing Delays</h3>
                <p className="text-[#1a1f1a]/60 text-sm">Mortgage approvals fall through. Appraisals come in low. Deals collapse at the last minute.</p>
              </div>
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#1a1f1a]/5">
                <h3 className="font-semibold text-[#1a1f1a] mb-2">Repairs and Staging</h3>
                <p className="text-[#1a1f1a]/60 text-sm">Most buyers want move-in ready. That means spending money before you see a dime.</p>
              </div>
            </div>
            <p className="text-[#1a1f1a]/70 font-medium">
              There&apos;s a simpler path.
            </p>
          </div>
        </section>

        {/* THREE STEPS TO SOLD - Cream */}
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
                Simple Process
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                Three Steps to Sold
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 border border-[#1a1f1a]/5">
                <div className="w-12 h-12 bg-[#00b332]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#00b332] font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">Discovery Call</h3>
                <p className="text-[#00b332] font-medium text-sm mb-3">A 10-Minute Conversation</p>
                <p className="text-[#1a1f1a]/60">
                  Tell us about your property and situation. We&apos;ll ask about the condition, timeline, and what matters most to you. No pressure, no obligation — just a straightforward conversation to see if we can help.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-[#1a1f1a]/5">
                <div className="w-12 h-12 bg-[#00b332]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#00b332] font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">Get Your Cash Offer</h3>
                <p className="text-[#00b332] font-medium text-sm mb-3">Within 24 Hours</p>
                <p className="text-[#1a1f1a]/60">
                  We&apos;ll evaluate your property and present a written cash offer. Our offers are good for 30 days, so you have time to think. We&apos;ll walk you through exactly how we calculated the number — no mystery math.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-[#1a1f1a]/5">
                <div className="w-12 h-12 bg-[#00b332]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#00b332] font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">Close On Your Terms</h3>
                <p className="text-[#00b332] font-medium text-sm mb-3">You Pick the Date</p>
                <p className="text-[#1a1f1a]/60">
                  Accept the offer and choose your closing date — as fast as 7 days or as far out as 60+ days. We handle the title work, paperwork, and coordination. You show up, sign, and get paid.
                </p>
              </div>
            </div>
            <div className="text-center">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center gap-2 bg-[#00b332] text-white px-8 py-4 rounded-full font-medium hover:bg-[#009929] transition-all group shadow-lg shadow-[#00b332]/20"
              >
                Ready to Start? Get Your Offer
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* HOW WE CALCULATE YOUR OFFER - White */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
                Transparent Pricing
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                How We Calculate Your Offer
              </h2>
            </div>
            <p className="text-lg text-[#1a1f1a]/70 mb-6">
              We&apos;re not going to hide the math. Here&apos;s exactly how we determine what we can pay:
            </p>
            <p className="text-[#1a1f1a]/70 mb-4">
              We start with what your house will be worth after it&apos;s fully renovated — that&apos;s called the After Repair Value (ARV). Then we subtract:
            </p>
            <ul className="list-disc list-inside text-[#1a1f1a]/70 mb-6 space-y-2 ml-4">
              <li><span className="font-medium">Repair costs</span> — What it takes to get the property market-ready</li>
              <li><span className="font-medium">Holding costs</span> — Taxes, insurance, utilities while we renovate</li>
              <li><span className="font-medium">Selling costs</span> — Agent commissions and closing costs when we resell</li>
              <li><span className="font-medium">Our margin</span> — What we need to make the project worthwhile</li>
            </ul>
            <p className="text-[#1a1f1a]/70 mb-8">
              What&apos;s left is what we can offer you.
            </p>
            <div className="bg-[#FAF8F5] border-l-4 border-[#00b332] p-6 rounded-r-2xl mb-8">
              <p className="text-[#1a1f1a]/70">
                <span className="font-semibold text-[#1a1f1a]">Example:</span> If a renovated home sells for $200,000 and total costs plus margin are $70,000, we&apos;d offer around $130,000.
              </p>
            </div>
            <p className="text-[#1a1f1a]/70">
              This isn&apos;t about lowballing you. It&apos;s about being honest so you can make an informed decision. If the numbers don&apos;t work for your situation, we&apos;ll tell you — and we might even suggest listing with an agent instead.
            </p>
          </div>
        </section>

        {/* WHAT CLEAREDGE HANDLES - Cream */}
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
                We Handle It
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                What ClearEdge Handles For You
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-2">No Repairs Needed</h3>
                <p className="text-[#1a1f1a]/60">
                  Sell as-is. Foundation issues, roof damage, mold — doesn&apos;t matter.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-2">No Inspections</h3>
                <p className="text-[#1a1f1a]/60">
                  We don&apos;t require you to fix violations or pass municipal inspection.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-2">No Mortgage Delays</h3>
                <p className="text-[#1a1f1a]/60">
                  Cash means no lender approval, no appraisal contingencies.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-2">No Commissions</h3>
                <p className="text-[#1a1f1a]/60">
                  We&apos;re not agents. You pay zero commission.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-2">No Uncertainty</h3>
                <p className="text-[#1a1f1a]/60">
                  When we make an offer and you accept, the deal closes. Period.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHO THIS IS FOR - White */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
                Is This Right For You?
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-4">
                Situations We Help With
              </h2>
              <p className="text-lg text-[#1a1f1a]/60 max-w-2xl mx-auto">
                We work with homeowners in all kinds of situations. If any of these sound familiar, we can probably help:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <Link href="/situations/foreclosure" className="bg-[#FAF8F5] hover:bg-[#00b332]/10 p-5 rounded-2xl transition-colors group border border-[#1a1f1a]/5">
                <p className="font-medium text-[#1a1f1a] group-hover:text-[#00b332] transition-colors">Facing Foreclosure</p>
              </Link>
              <Link href="/situations/inherited-property" className="bg-[#FAF8F5] hover:bg-[#00b332]/10 p-5 rounded-2xl transition-colors group border border-[#1a1f1a]/5">
                <p className="font-medium text-[#1a1f1a] group-hover:text-[#00b332] transition-colors">Inherited Property</p>
              </Link>
              <Link href="/situations/divorce" className="bg-[#FAF8F5] hover:bg-[#00b332]/10 p-5 rounded-2xl transition-colors group border border-[#1a1f1a]/5">
                <p className="font-medium text-[#1a1f1a] group-hover:text-[#00b332] transition-colors">Going Through Divorce</p>
              </Link>
              <Link href="/situations/job-relocation" className="bg-[#FAF8F5] hover:bg-[#00b332]/10 p-5 rounded-2xl transition-colors group border border-[#1a1f1a]/5">
                <p className="font-medium text-[#1a1f1a] group-hover:text-[#00b332] transition-colors">Job Relocation</p>
              </Link>
              <Link href="/situations/major-repairs" className="bg-[#FAF8F5] hover:bg-[#00b332]/10 p-5 rounded-2xl transition-colors group border border-[#1a1f1a]/5">
                <p className="font-medium text-[#1a1f1a] group-hover:text-[#00b332] transition-colors">Major Repairs Needed</p>
              </Link>
              <Link href="/situations/tax-liens-code-violations" className="bg-[#FAF8F5] hover:bg-[#00b332]/10 p-5 rounded-2xl transition-colors group border border-[#1a1f1a]/5">
                <p className="font-medium text-[#1a1f1a] group-hover:text-[#00b332] transition-colors">Tax Liens or Code Violations</p>
              </Link>
              <Link href="/situations/tired-landlord" className="bg-[#FAF8F5] hover:bg-[#00b332]/10 p-5 rounded-2xl transition-colors group border border-[#1a1f1a]/5">
                <p className="font-medium text-[#1a1f1a] group-hover:text-[#00b332] transition-colors">Tired Landlord</p>
              </Link>
              <Link href="/situations/vacant-property" className="bg-[#FAF8F5] hover:bg-[#00b332]/10 p-5 rounded-2xl transition-colors group border border-[#1a1f1a]/5">
                <p className="font-medium text-[#1a1f1a] group-hover:text-[#00b332] transition-colors">Vacant Property</p>
              </Link>
            </div>
            <div className="text-center">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center gap-2 bg-[#00b332] text-white px-8 py-4 rounded-full font-medium hover:bg-[#009929] transition-all group shadow-lg shadow-[#00b332]/20"
              >
                Not sure if you qualify? Reach out anyway
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL - Cream */}
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
                Testimonial
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                Don&apos;t Just Take Our Word For It
              </h2>
            </div>
            <div className="bg-white rounded-2xl p-8 lg:p-12 border border-[#1a1f1a]/5">
              <div className="text-[#00b332] text-6xl font-serif leading-none mb-4">&ldquo;</div>
              <blockquote className="text-xl lg:text-2xl text-[#1a1f1a]/70 leading-relaxed mb-6">
                Selling a property from out of state can be incredibly stressful, but Tyler made it feel effortless. He handled everything — from coordinating with my dad&apos;s caregivers to managing repairs I couldn&apos;t oversee myself. I never felt pressured, and he kept me informed every step of the way. If you&apos;re dealing with an inherited property or just need someone you can trust, call Tyler.
              </blockquote>
              <p className="text-[#1a1f1a]/60 font-medium">
                — Kandra G., sold inherited property from Texas
              </p>
            </div>
            <div className="text-center mt-8">
              <Link href="/testimonials" className="text-[#00b332] hover:text-[#009929] font-medium transition-colors">
                Read more reviews &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ SECTION - White */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
                FAQ
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                Common Questions
              </h2>
            </div>

            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-[#1a1f1a] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-[#1a1f1a]/70">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA - Cream */}
        <section id="lead-form" className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
              Get Started
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-4">
              See What Your House Is Worth
            </h2>
            <p className="text-lg text-[#1a1f1a]/60 mb-8">
              Get a no-obligation cash offer. Takes 2 minutes. No pressure, no commitment.
            </p>
            <LeadForm />
            <p className="text-[#1a1f1a]/60 text-sm mt-8">
              Prefer to talk? Call Tyler directly:{' '}
              <a href="tel:+15709042059" className="font-semibold text-[#00b332] hover:underline">
                (570) 904-2059
              </a>
            </p>
          </div>
        </section>

        {/* CLOSING KEYWORD ANCHOR - Sage gradient */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[#1a2e1a] font-medium">
              When you&apos;re ready to sell your Pennsylvania house fast without repairs, showings, or uncertainty, ClearEdge is here. Get your cash offer today.
            </p>
          </div>
        </section>

        <V0Footer />
      </main>
    </>
  )
}
