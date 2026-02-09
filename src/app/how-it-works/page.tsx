import type { Metadata } from 'next'
import Link from 'next/link'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { V0LeadForm } from '@/components/v0-lead-form'
import { V0FAQ } from '@/components/v0-faq'
import { TrackedCTALink } from '@/components/TrackedCTALink'
import { LiteYouTube } from '@/components/LiteYouTube'

export const metadata: Metadata = {
  title: 'How We Buy Houses for Cash in PA | 3-Step Process | ClearEdge',
  description: 'See exactly how ClearEdge buys Pennsylvania houses for cash: Tell us about your property, get a fair offer in 24 hours, close in 7–30 days. No repairs, no fees, no commissions.',
  keywords: ['how to sell house fast PA', 'cash home buying process', 'sell house as-is Pennsylvania', 'how cash home buyers work', 'ClearEdge process'],
  openGraph: {
    title: 'How We Buy Houses for Cash in PA | 3-Step Process | ClearEdge',
    description: 'See exactly how ClearEdge buys Pennsylvania houses for cash: Tell us about your property, get a fair offer in 24 hours, close in 7–30 days.',
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
              {
                '@type': 'VideoObject',
                '@id': 'https://www.clearedgehomebuyers.com/how-it-works/#video',
                name: 'Sell Your House Fast in PA | ClearEdge Home Buyers',
                description: 'Tyler from ClearEdge Home Buyers explains the easiest way to sell your house fast in Northeastern PA, the Lehigh Valley, and the Poconos. Get a full cash offer in 24 hours with no fees, no commissions, and no repairs needed.',
                thumbnailUrl: 'https://i.ytimg.com/vi/YS6uDgxIjiI/maxresdefault.jpg',
                uploadDate: '2026-01-27T08:00:00-05:00',
                duration: 'PT1M10S',
                contentUrl: 'https://www.youtube.com/watch?v=YS6uDgxIjiI',
                embedUrl: 'https://www.youtube.com/embed/YS6uDgxIjiI',
                publisher: {
                  '@type': 'Organization',
                  name: 'ClearEdge Home Buyers',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.clearedgehomebuyers.com/logo.webp',
                  },
                },
              },
            ],
          }),
        }}
      />

      <main className="bg-white">
        <V0Header />

        {/* HERO SECTION - Cream */}
        <section className="relative pt-32 pb-10 md:pb-12 px-4 overflow-hidden bg-[#FAF8F5]">
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
              Our Process
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium text-[#1a1f1a] mb-6">
              How We Buy Houses for Cash in Pennsylvania
            </h1>
            <p className="text-xl text-[#1a1f1a]/70 mb-6 max-w-2xl mx-auto">
              No repairs. No agents. No open houses. Tell us about your property, get a fair cash offer in 24 hours, and close on a date that works for your life.
            </p>
            <TrackedCTALink
              href="#lead-form"
              label="Get My Cash Offer"
              eventLabel="Get My Cash Offer - How It Works Hero"
            />
          </div>
        </section>

        {/* WHY TRADITIONAL SELLING IS HARD - White */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl font-medium text-[#1a1f1a] mb-6">
              Why Selling a House in Pennsylvania Has Gotten Harder in 2026
            </h2>
            <p className="text-lg text-[#1a1f1a]/70 mb-6">
              New PA building codes, stricter municipal inspections, and tighter scrutiny on unpermitted work mean selling through an agent now costs more time and money than ever. You&apos;ll deal with:
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#1a1f1a]/5 text-center">
                <h3 className="font-semibold text-[#1a1f1a] mb-2">Disclosure Requirements</h3>
                <p className="text-[#1a1f1a]/70 text-sm">PA law requires detailed property disclosures. Miss something and face legal trouble later.</p>
              </div>
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#1a1f1a]/5 text-center">
                <h3 className="font-semibold text-[#1a1f1a] mb-2">Municipal Inspections</h3>
                <p className="text-[#1a1f1a]/70 text-sm">Cities like Allentown require pre-sale inspections. Violations must be fixed before closing.</p>
              </div>
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#1a1f1a]/5 text-center">
                <h3 className="font-semibold text-[#1a1f1a] mb-2">Buyer Financing Delays</h3>
                <p className="text-[#1a1f1a]/70 text-sm">Mortgage approvals fall through. Appraisals come in low. Deals collapse at the last minute.</p>
              </div>
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#1a1f1a]/5 text-center">
                <h3 className="font-semibold text-[#1a1f1a] mb-2">Repairs and Staging</h3>
                <p className="text-[#1a1f1a]/70 text-sm">Most buyers want move-in ready. That means spending money before you see a dime.</p>
              </div>
            </div>
            <p className="text-[#1a1f1a]/70 font-medium">
              There&apos;s a simpler path.
            </p>
          </div>
        </section>

        {/* THREE STEPS TO SOLD - Cream */}
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
                Simple Process
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                Three Steps to Sold
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-2xl p-8 border border-[#1a1f1a]/5">
                <div className="w-12 h-12 bg-[#008a29]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#008a29] font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">Tell Us About Your Property</h3>
                <p className="text-[#008a29] font-medium text-sm mb-3">Under 2 Minutes Online (or a 10-Minute Call)</p>
                <p className="text-[#1a1f1a]/70">
                  Fill out our quick form or call Tyler directly. We&apos;ll ask about the condition, your timeline, and what matters most to you. No pressure, no obligation — just a straightforward conversation to see if we can help.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-[#1a1f1a]/5">
                <div className="w-12 h-12 bg-[#008a29]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#008a29] font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">Get a Fair Cash Offer in 24 Hours</h3>
                <p className="text-[#008a29] font-medium text-sm mb-3">Tyler Personally Reviews Every Property</p>
                <p className="text-[#1a1f1a]/70">
                  Tyler evaluates your property using local PA market data — not a national algorithm — and presents a written cash offer within 24 hours. Our offers are good for 30 days, so you have time to think. We&apos;ll walk you through exactly how we calculated the number — no mystery math.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-[#1a1f1a]/5">
                <div className="w-12 h-12 bg-[#008a29]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#008a29] font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">Close On Your Terms</h3>
                <p className="text-[#008a29] font-medium text-sm mb-3">You Pick the Date</p>
                <p className="text-[#1a1f1a]/70">
                  Accept the offer and choose your closing date — as fast as 7 days or as far out as 60+ days. We handle the title work, paperwork, and coordination. You show up, sign, and get paid.
                </p>
              </div>
            </div>
            <div className="text-center">
              <TrackedCTALink
                href="#lead-form"
                label="Ready to Start? Get Your Offer"
                eventLabel="Ready to Start - How It Works Steps"
              />
            </div>
          </div>
        </section>

        {/* Watch How It Works Video - White */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
                See It In Action
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-4">
                Watch How It Works
              </h2>
              <p className="text-[#1a1f1a]/70 text-lg max-w-2xl mx-auto">
                In just 60 seconds, Tyler explains exactly how ClearEdge helps Pennsylvania homeowners sell fast without the traditional hassles.
              </p>
            </div>
            <LiteYouTube
              videoId="YS6uDgxIjiI"
              title="Sell Your House Fast in PA | ClearEdge Home Buyers"
            />
          </div>
        </section>

        {/* HOW WE CALCULATE YOUR OFFER - Cream */}
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
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
            <ul className="text-[#1a1f1a]/70 mb-6 space-y-2">
              <li><span className="font-medium">Repair costs</span> — What it takes to get the property market-ready</li>
              <li><span className="font-medium">Holding costs</span> — Taxes, insurance, utilities while we renovate</li>
              <li><span className="font-medium">Selling costs</span> — Agent commissions and closing costs when we resell</li>
              <li><span className="font-medium">Our margin</span> — What we need to make the project worthwhile</li>
            </ul>
            <p className="text-[#1a1f1a]/70 mb-6">
              What&apos;s left is what we can offer you.
            </p>
            <div className="bg-white border-l-4 border-[#008a29] p-6 rounded-r-2xl mb-6 text-left">
              <p className="text-[#1a1f1a]/70">
                <span className="font-semibold text-[#1a1f1a]">Example:</span> If a renovated home sells for $200,000 and total costs plus margin are $70,000, we&apos;d offer around $130,000.
              </p>
            </div>
            <p className="text-[#1a1f1a]/70 mb-6">
              This isn&apos;t about lowballing you. It&apos;s about being honest so you can make an informed decision. If the numbers don&apos;t work for your situation, we&apos;ll tell you — and we might even suggest listing with an agent instead.
            </p>
            <p className="text-center">
              <Link href="/cash-buyer-vs-realtor" className="text-[#008a29] hover:text-[#007a24] font-medium transition-colors">
                Not sure if a cash sale is right for you? See our honest comparison &rarr;
              </Link>
            </p>
          </div>
        </section>

        {/* TESTIMONIAL - White */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
                Testimonial
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                Don&apos;t Just Take Our Word For It
              </h2>
            </div>
            <div className="bg-[#FAF8F5] rounded-2xl p-8 lg:p-12 border border-[#1a1f1a]/5">
              <div className="text-[#008a29] text-6xl font-serif leading-none mb-4">&ldquo;</div>
              <blockquote className="text-xl lg:text-2xl text-[#1a1f1a]/70 leading-relaxed mb-6">
                Selling a property from out of state can be incredibly stressful, but Tyler made it feel effortless. He handled everything — from coordinating with my dad&apos;s caregivers to managing repairs I couldn&apos;t oversee myself. I never felt pressured, and he kept me informed every step of the way. If you&apos;re dealing with an inherited property or just need someone you can trust, call Tyler.
              </blockquote>
              <p className="text-[#1a1f1a]/70 font-medium">
                — Kandra G., sold inherited property from Texas
              </p>
            </div>
            <div className="text-center mt-8">
              <Link href="/testimonials" className="text-[#008a29] hover:text-[#007a24] font-medium transition-colors">
                Read more reviews &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ SECTION - White */}
        <V0FAQ
          faqs={faqs}
          title="Common Questions"
          subtitle="Here's what homeowners typically ask about our process."
        />


        {/* Final CTA Section - Beige */}
        <V0LeadForm />


        <V0Footer />
      </main>
    </>
  )
}
