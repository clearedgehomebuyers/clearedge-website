import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, Check, ArrowRight } from 'lucide-react'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { LeadForm } from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Testimonials | What Homeowners Say About ClearEdge Home Buyers',
  description: 'Real Google reviews from PA homeowners who sold to ClearEdge. See why families across NEPA, Lehigh Valley & Poconos trust Tyler.',
  keywords: ['ClearEdge reviews', 'cash home buyer reviews PA', 'sell house fast reviews Pennsylvania'],
  openGraph: {
    title: 'Testimonials | What Homeowners Say About ClearEdge Home Buyers',
    description: 'Read real Google reviews from Pennsylvania homeowners who sold to ClearEdge.',
    url: 'https://www.clearedgehomebuyers.com/testimonials',
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
    canonical: 'https://www.clearedgehomebuyers.com/testimonials',
  },
}


const secondaryReviews = [
  {
    quote: "Always deliver on everything they say they will do!",
    name: "Matt Buckley",
    context: "Real estate professional, multiple transactions",
  },
  {
    quote: "We closed in 30 days and have never been happier!",
    name: "Rita Coraci",
    context: "Inherited property with sister",
  },
  {
    quote: "First to take time to explain the process and make me feel comfortable.",
    name: "Gavin S.",
    context: "Tired of investor calls, wanted fair treatment",
  },
  {
    quote: "You made a difficult time simple and smooth.",
    name: "Jewel Parago",
    context: "Difficult personal situation",
  },
  {
    quote: "Very responsive and helpful.",
    name: "Rodrigo Antillon",
    context: "Quick, professional service",
  },
]

const reviewHighlights = [
  {
    title: "Clear communication",
    description: "No ghosting, no runaround. Tyler keeps you informed.",
  },
  {
    title: "No pressure",
    description: "Take your time. Our offers are good for 30 days.",
  },
  {
    title: "Handles the hard stuff",
    description: "Probate, out-of-state, tenant issues — we figure it out.",
  },
  {
    title: "Fair and honest",
    description: "We show our math. No mystery pricing.",
  },
  {
    title: "Fast when you need it",
    description: "Most closings happen in 14-30 days.",
  },
]

function StarRating() {
  return (
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-[#00b332] fill-current" />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: typeof secondaryReviews[0] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
      <StarRating />
      <blockquote className="text-[#1a1f1a]/70 mb-4">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <div className="border-t border-[#1a1f1a]/10 pt-4">
        <p className="font-semibold text-[#1a1f1a]">{review.name}</p>
        <p className="text-sm text-[#1a1f1a]/60">{review.context}</p>
      </div>
    </div>
  )
}

export default function TestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LocalBusiness",
                "name": "ClearEdge Home Buyers",
                "url": "https://www.clearedgehomebuyers.com",
                "telephone": "+1-570-904-2059",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Scranton",
                  "addressRegion": "PA",
                  "addressCountry": "US"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5",
                  "reviewCount": "6",
                  "bestRating": "5"
                },
                "review": [
                  {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Kandra Gunter" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                    "reviewBody": "Selling a property from out of state can be incredibly stressful, but Tyler made it feel effortless."
                  },
                  {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Matt Buckley" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                    "reviewBody": "Always deliver on everything they say they will do!"
                  },
                  {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Rita Coraci" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                    "reviewBody": "We closed in 30 days and have never been happier!"
                  },
                  {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Gavin S." },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                    "reviewBody": "First to take time to explain the process and make me feel comfortable."
                  },
                  {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Jewel Parago" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                    "reviewBody": "You made a difficult time simple and smooth."
                  },
                  {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Rodrigo Antillon" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                    "reviewBody": "Very responsive and helpful."
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Are these real reviews?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. Every review on this page comes directly from our Google Business Profile. You can verify them yourself by clicking the link above."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why don't you have hundreds of reviews?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We're a small, local operation — not a national franchise. We work with a manageable number of homeowners each year so we can give everyone personal attention. Quality over quantity."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What situations do you typically help with?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Inherited properties, foreclosure, divorce, landlords ready to exit, houses needing major repairs, tax liens, and vacant properties. If your situation is complicated, that's usually when we can help most."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Will I work directly with Tyler?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. From the first call to the closing table, you work with me directly — not a rotating cast of salespeople or call center reps."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />

      <main className="bg-white">
        <V0Header />

        {/* Hero Section - Cream with dot pattern */}
        <section className="relative pt-32 pb-16 md:pb-20 px-4 overflow-hidden bg-[#FAF8F5]">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fillOpacity='1' fillRule='evenodd'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
              Testimonials
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium text-[#1a1f1a] mb-6">
              Real Reviews From Real Homeowners
            </h1>
            <p className="text-xl text-[#1a1f1a]/70 mb-8 max-w-2xl mx-auto">
              Don&apos;t take our word for it. Here&apos;s what Pennsylvania homeowners say about working with ClearEdge.
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

        {/* Trust Bar - Sage gradient */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-4 gap-4 md:gap-12">
              <div className="text-center">
                <p className="text-xl sm:text-2xl md:text-4xl font-serif font-medium text-[#1a2e1a] mb-0.5 md:mb-1">200+</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground tracking-wide">Homeowners Helped</p>
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl md:text-4xl font-serif font-medium text-[#1a2e1a] mb-0.5 md:mb-1">Since 2016</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground tracking-wide">Serving PA</p>
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl md:text-4xl font-serif font-medium text-[#1a2e1a] mb-0.5 md:mb-1">5.0</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground tracking-wide">Google Rating</p>
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl md:text-4xl font-serif font-medium text-[#1a2e1a] mb-0.5 md:mb-1">A+</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground tracking-wide">BBB Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Testimonial - White */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-[#FAF8F5] rounded-2xl p-8 lg:p-12 border border-[#1a1f1a]/5">
              <div className="text-[#00b332] text-6xl font-serif leading-none mb-4">&ldquo;</div>
              <blockquote className="text-xl lg:text-2xl text-[#1a1f1a]/70 leading-relaxed mb-6">
                Selling a property from out of state can be incredibly stressful, but Tyler made it feel effortless. He handled everything — from coordinating with my dad&apos;s caregivers to managing repairs I couldn&apos;t oversee myself. I never felt pressured, and he kept me informed every step of the way. If you&apos;re dealing with an inherited property or just need someone you can trust, call Tyler.
              </blockquote>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#00b332] fill-current" />
                ))}
              </div>
              <p className="font-semibold text-[#1a1f1a]">Kandra Gunter</p>
              <p className="text-sm text-[#1a1f1a]/60">Sold inherited property from Texas while caring for elderly father</p>
            </div>
          </div>
        </section>

        {/* Secondary Reviews Grid - Cream */}
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
                More Reviews
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                More Reviews From Pennsylvania Homeowners
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {secondaryReviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
            <div className="text-center">
              <a
                href="https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8549074,-77.1384488,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00b332] hover:text-[#009929] font-medium transition-colors"
              >
                See all reviews on Google &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* What Our Reviews Have in Common - White */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
                Common Themes
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                What Our Reviews Have in Common
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {reviewHighlights.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#00b332]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[#00b332]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1f1a] mb-1">{item.title}</h3>
                    <p className="text-[#1a1f1a]/60">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Cream */}
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
                FAQ
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                Questions About Our Reviews
              </h2>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-[#1a1f1a] mb-3">
                  Are these real reviews?
                </h3>
                <p className="text-[#1a1f1a]/70">
                  Yes. Every review on this page comes directly from our Google Business Profile. You can verify them yourself by clicking the link above.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#1a1f1a] mb-3">
                  Why don&apos;t you have hundreds of reviews?
                </h3>
                <p className="text-[#1a1f1a]/70">
                  We&apos;re a small, local operation — not a national franchise. We work with a manageable number of homeowners each year so we can give everyone personal attention. Quality over quantity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#1a1f1a] mb-3">
                  What situations do you typically help with?
                </h3>
                <p className="text-[#1a1f1a]/70">
                  Inherited properties, foreclosure, divorce, landlords ready to exit, houses needing major repairs, tax liens, and vacant properties. If your situation is complicated, that&apos;s usually when we can help most.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#1a1f1a] mb-3">
                  Will I work directly with Tyler?
                </h3>
                <p className="text-[#1a1f1a]/70">
                  Yes. From the first call to the closing table, you work with me directly — not a rotating cast of salespeople or call center reps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing SEO - Sage gradient */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[#1a2e1a] font-medium">
              Pennsylvania homeowners trust ClearEdge for honest offers, clear communication, and closings that happen on time. See what your house is worth today.
            </p>
          </div>
        </section>

        {/* Final CTA Section - Beige */}
        <section id="lead-form" className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
              Get Started
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-4">
              Ready to See What We Can Offer?
            </h2>
            <p className="text-lg text-[#1a1f1a]/60 mb-8">
              Get a no-obligation cash offer. Takes 2 minutes.
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

        <V0Footer />
      </main>
    </>
  )
}
