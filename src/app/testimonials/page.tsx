import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, Check, Phone } from 'lucide-react';
import { ScrollToFormButton } from '@/components/ScrollToFormButton';
import { LeadForm } from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Reviews | What Homeowners Say About ClearEdge Home Buyers',
  description: 'Read real Google reviews from Pennsylvania homeowners who sold to ClearEdge. See why families across NEPA, Lehigh Valley, and the Poconos trust Tyler and the team.',
  keywords: ['ClearEdge reviews', 'cash home buyer reviews PA', 'sell house fast reviews Pennsylvania'],
  openGraph: {
    title: 'Reviews | What Homeowners Say About ClearEdge Home Buyers',
    description: 'Read real Google reviews from Pennsylvania homeowners who sold to ClearEdge.',
    url: 'https://www.clearedgehomebuyers.com/testimonials',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.clearedgehomebuyers.com/testimonials',
  },
};


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
];

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
];

function StarRating() {
  return (
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: typeof secondaryReviews[0] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <StarRating />
      <blockquote className="text-slate-700 mb-4">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <div className="border-t border-slate-200 pt-4">
        <p className="font-semibold text-slate-900">{review.name}</p>
        <p className="text-sm text-slate-500">{review.context}</p>
      </div>
    </div>
  );
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
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Real Reviews From Real Homeowners
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Don&apos;t take our word for it. Here&apos;s what Pennsylvania homeowners say about working with ClearEdge.
            </p>
            <ScrollToFormButton className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors">
              Get My Cash Offer
            </ScrollToFormButton>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="border-b border-slate-200 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-amber-600">200+</p>
                <p className="text-slate-600">Homeowners Helped</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-600">2016</p>
                <p className="text-slate-600">Founded in Scranton</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-600">21</p>
                <p className="text-slate-600">PA Communities Served</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-600">14 Days</p>
                <p className="text-slate-600">Average Time to Close</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Testimonial */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-slate-200">
              <div className="text-amber-500 text-6xl font-serif leading-none mb-4">&ldquo;</div>
              <blockquote className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-6">
                Selling a property from out of state can be incredibly stressful, but Tyler made it feel effortless. He handled everything — from coordinating with my dad&apos;s caregivers to managing repairs I couldn&apos;t oversee myself. I never felt pressured, and he kept me informed every step of the way. If you&apos;re dealing with an inherited property or just need someone you can trust, call Tyler.
              </blockquote>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>
              <p className="font-semibold text-slate-900">Kandra Gunter</p>
              <p className="text-sm text-slate-500">Sold inherited property from Texas while caring for elderly father</p>
            </div>
          </div>
        </section>

        {/* Secondary Reviews Grid */}
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              More Reviews From Pennsylvania Homeowners
            </h2>
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
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                See all reviews on Google &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* What Our Reviews Have in Common */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              What Our Reviews Have in Common
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {reviewHighlights.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10">
              Questions About Our Reviews
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Are these real reviews?
                </h3>
                <p className="text-slate-700">
                  Yes. Every review on this page comes directly from our Google Business Profile. You can verify them yourself by clicking the link above.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Why don&apos;t you have hundreds of reviews?
                </h3>
                <p className="text-slate-700">
                  We&apos;re a small, local operation — not a national franchise. We work with a manageable number of homeowners each year so we can give everyone personal attention. Quality over quantity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  What situations do you typically help with?
                </h3>
                <p className="text-slate-700">
                  Inherited properties, foreclosure, divorce, landlords ready to exit, houses needing major repairs, tax liens, and vacant properties. If your situation is complicated, that&apos;s usually when we can help most.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Will I work directly with Tyler?
                </h3>
                <p className="text-slate-700">
                  Yes. From the first call to the closing table, you work with me directly — not a rotating cast of salespeople or call center reps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="lead-form" className="bg-amber-500 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to See What We Can Offer?
            </h2>
            <p className="text-lg text-slate-800 mb-8">
              Get a no-obligation cash offer. Takes 2 minutes.
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

        {/* Closing Anchor */}
        <section className="py-12 bg-slate-100">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-slate-600">
              Pennsylvania homeowners trust ClearEdge for honest offers, clear communication, and closings that happen on time. See what your house is worth today.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
