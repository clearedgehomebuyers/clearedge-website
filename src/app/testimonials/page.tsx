import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, Check, ArrowRight } from 'lucide-react'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { V0FAQ } from '@/components/v0-faq'
import { V0LeadForm } from '@/components/v0-lead-form'
import { V0TrustBar } from '@/components/v0-trust-bar'
import { DynamicPhoneLink } from '@/components/DynamicPhone'
import { TrackedCTALink } from '@/components/TrackedCTALink'

const testimonialsFaqs = [
  {
    question: "Are these real reviews?",
    answer: "Yes. Every review on this page comes directly from our Google Business Profile. You can verify them yourself by clicking the link above."
  },
  {
    question: "Why don't you have hundreds of reviews?",
    answer: "We're a small, local operation — not a national franchise. We work with a manageable number of homeowners each year so we can give everyone personal attention. Quality over quantity."
  },
  {
    question: "What situations do you typically help with?",
    answer: "Inherited properties, foreclosure, divorce, landlords ready to exit, houses needing major repairs, tax liens, and vacant properties. If your situation is complicated, that's usually when we can help most."
  },
  {
    question: "Will I work directly with Tyler?",
    answer: "Yes. From the first call to the closing table, you work with me directly — not a rotating cast of salespeople or call center reps."
  }
]

export const metadata: Metadata = {
  title: 'ClearEdge Home Buyers Reviews | Real PA Homeowner Testimonials',
  description: 'Every ClearEdge Google review is 5 stars. Read real testimonials from PA homeowners who sold inherited properties, avoided foreclosure, and closed in as few as 14 days.',
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
        <Star key={i} className="w-5 h-5 text-ce-green fill-current" />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: typeof secondaryReviews[0] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-ce-ink/5">
      <StarRating />
      <blockquote className="text-ce-ink/70 mb-4">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <div className="border-t border-ce-ink/10 pt-4">
        <p className="font-semibold text-ce-ink">{review.name}</p>
        <p className="text-sm text-ce-ink/70">{review.context}</p>
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
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.clearedgehomebuyers.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Testimonials",
                "item": "https://www.clearedgehomebuyers.com/testimonials"
              }
            ]
          })
        }}
      />
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
                "telephone": "+1-610-904-8526",
                "email": "info@clearedgehomebuyers.com",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Scranton",
                  "addressRegion": "PA",
                  "addressCountry": "US"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 40.8603424,
                  "longitude": -75.8193544
                },
                "sameAs": [
                  "https://www.facebook.com/profile.php?id=61578297005995",
                  "https://www.instagram.com/clearedge_home_buyers/",
                  "https://www.youtube.com/@ClearEdgeHomeBuyers",
                  "https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8603424,-75.8193544,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm"
                ],
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

        {/* Hero Section - Cream */}
        <section className="relative pt-32 pb-10 md:pb-12 px-4 overflow-hidden bg-surface-cream">
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
              Testimonials
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium text-ce-ink mb-6">
              Every Google Review Is 5 Stars. Here&apos;s Why.
            </h1>
            <p className="text-xl text-ce-ink/70 mb-6 max-w-2xl mx-auto">
              We don&apos;t have hundreds of reviews — we have a perfect rating from every homeowner we&apos;ve worked with. Read what real Pennsylvania sellers say about working with Tyler.
            </p>
            <TrackedCTALink
              href="#lead-form"
              label="Get My Fair Cash Offer"
              eventLabel="Get My Fair Cash Offer - Testimonials Hero"
            />
          </div>
        </section>

        <V0TrustBar />

        {/* Featured Testimonial - White */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-surface-cream rounded-2xl p-8 lg:p-12 border border-ce-ink/5">
              <div className="text-ce-green text-6xl font-serif leading-none mb-4">&ldquo;</div>
              <blockquote className="text-xl lg:text-2xl text-ce-ink/70 leading-relaxed mb-6">
                Selling a property from out of state can be incredibly stressful, but Tyler made it feel effortless. He handled everything — from coordinating with my dad&apos;s caregivers to managing repairs I couldn&apos;t oversee myself. I never felt pressured, and he kept me informed every step of the way. If you&apos;re dealing with an inherited property or just need someone you can trust, call Tyler.
              </blockquote>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-ce-green fill-current" />
                ))}
              </div>
              <p className="font-semibold text-ce-ink">Kandra Gunter</p>
              <p className="text-sm text-ce-ink/70">Sold inherited property from Texas while caring for elderly father</p>
            </div>
          </div>
        </section>

        {/* Secondary Reviews Grid - Cream */}
        <section className="py-12 md:py-14 bg-surface-cream">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-6">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
                More Reviews
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                More Reviews From Pennsylvania Homeowners
              </h2>
            </div>
            {/* 5 cards: 2-2-1 on tablet, 3-2 on desktop — last row centered */}
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              {secondaryReviews.map((review, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8549074,-77.1384488,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ce-green hover:text-ce-green-hover font-medium transition-colors"
              >
                See all reviews on Google &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* What Our Reviews Have in Common - White */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-6">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
                Common Themes
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                What Our Reviews Have in Common
              </h2>
            </div>
            {/* First 4 items in 2-column grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {reviewHighlights.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-ce-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-ce-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ce-ink mb-1">{item.title}</h3>
                    <p className="text-ce-ink/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* 5th item centered on tablet and desktop */}
            <div className="mt-6 sm:flex sm:justify-center">
              <div className="flex items-start gap-4 sm:max-w-[calc(50%-0.75rem)]">
                <div className="w-8 h-8 bg-ce-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-ce-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-ce-ink mb-1">{reviewHighlights[4].title}</h3>
                  <p className="text-ce-ink/70">{reviewHighlights[4].description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <V0FAQ
          faqs={testimonialsFaqs}
          title="Questions About Our Reviews"
          subtitle="Everything you need to know about our testimonials."
          sectionBg="beige"
        />


        {/* Lead Form Section - Beige */}
        <section id="lead-form" className="py-8 md:py-10 bg-surface-cream scroll-mt-20 md:scroll-mt-24">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <V0LeadForm />
            <p className="text-ce-ink/70 text-sm mt-8">
              Prefer to talk? Call Tyler directly:{' '}
              <DynamicPhoneLink className="font-semibold text-ce-green hover:underline" />
            </p>
          </div>
        </section>


        <V0Footer />
      </main>
    </>
  )
}
