import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, Check, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ClearEdge Home Buyers Reviews Pennsylvania | 200+ Homeowners Helped',
  description: 'Read real reviews from Pennsylvania homeowners who sold to ClearEdge Home Buyers. Since 2016, we\'ve helped 200+ families in NEPA, Lehigh Valley, and the Poconos sell homes fast for cash.',
  openGraph: {
    title: 'ClearEdge Home Buyers Reviews Pennsylvania | 200+ Homeowners Helped',
    description: 'Read real reviews from Pennsylvania homeowners who sold to ClearEdge Home Buyers. Since 2016, we\'ve helped 200+ families in NEPA, Lehigh Valley, and the Poconos sell homes fast for cash.',
    url: 'https://clearedgehomebuyers.com/testimonials',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://clearedgehomebuyers.com/testimonials',
  },
};

const testimonials = [
  {
    quote: "My mother passed and left me a house in Scranton that needed everything. New roof, outdated electric, the whole nine yards. I live in New Jersey and had no idea how to deal with it. Tyler came out, walked me through everything over the phone, and we closed in 12 days. No contractors. No listing. No stress.",
    name: "Margaret T.",
    situation: "Inherited Property in Scranton, PA",
  },
  {
    quote: "I was three months behind and got the sheriff sale notice. I thought I was going to lose everything. ClearEdge bought the house before the sale date and I walked away with money in my pocket instead of a foreclosure on my record. They explained everything—Act 91, the timeline, my options. I finally felt like someone was actually helping.",
    name: "David R.",
    situation: "Avoided Foreclosure in Wilkes-Barre, PA",
  },
  {
    quote: "Going through a divorce is hard enough without having to deal with selling a house. My ex and I couldn't agree on anything except that we needed this done fast. ClearEdge made a fair offer, handled the title work, and we both got our checks at closing. Clean break. No drama.",
    name: "Jennifer M.",
    situation: "Divorce Sale in Allentown, PA",
  },
  {
    quote: "The city hit me with I-30 violations on a rental I couldn't afford to fix. Fines were piling up. I called three 'we buy houses' companies and ClearEdge was the only one who actually showed up when they said they would. They knew exactly what I was dealing with and bought the property as-is. Done.",
    name: "Robert K.",
    situation: "Code Violation Property in Reading, PA",
  },
  {
    quote: "My father's estate was stuck in Lackawanna County probate for months. I had three siblings, none of us local, and a house that was sitting vacant. ClearEdge worked with our estate attorney, waited until we had letters testamentary, and closed two weeks later. They understood the process better than we did.",
    name: "Patricia S.",
    situation: "Probate Sale in Dunmore, PA",
  },
  {
    quote: "Got a job offer in Texas with a three-week start date. No time to list, stage, and wait for a buyer. ClearEdge gave me an offer in 24 hours and closed before my moving truck left. I know I probably left some money on the table, but the certainty was worth it.",
    name: "Michael C.",
    situation: "Relocation Sale in Bethlehem, PA",
  },
];

const consistentMentions = [
  "Clear explanation of the process before any commitment",
  "No pressure to accept an offer",
  "Knowledge of local regulations (Act 91, probate, code enforcement)",
  "Showed up when scheduled",
  "Closed on the date promised",
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

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-8">
      <StarRating />
      <blockquote className="text-slate-700 mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="border-t border-slate-200 pt-4">
        <p className="font-semibold text-slate-900">{testimonial.name}</p>
        <p className="text-sm text-slate-500">{testimonial.situation}</p>
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
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Are ClearEdge Home Buyers reviews verified?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, every testimonial on this page represents a real transaction. We've completed over 200 purchases across Eastern Pennsylvania since 2016. We're happy to provide references upon request for homeowners who want to speak directly with past sellers in similar situations."
                }
              },
              {
                "@type": "Question",
                "name": "How does ClearEdge compare to other Pennsylvania cash home buyers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ClearEdge is a local, owner-operated company—not a franchise or national lead aggregator. When you call (570) 904-2059, you're talking to Tyler or someone on his direct team, not a call center. We've been featured in The Morning Call and Lehigh Valley Business, and we've been buying houses in NEPA, Lehigh Valley, and the Poconos since 2016."
                }
              },
              {
                "@type": "Question",
                "name": "What types of situations do ClearEdge reviews typically involve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most of our reviews come from homeowners facing time-sensitive or complex situations. This includes foreclosure, probate, inherited properties, divorce, code violations, and properties that need significant repairs. Traditional sales aren't practical in these situations—our process is designed specifically for them."
                }
              },
              {
                "@type": "Question",
                "name": "Will I get a fair offer from ClearEdge?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We make offers based on current market value minus estimated repair costs and our operating margin. We're transparent about how we calculate offers. If you're looking for the absolute highest sale price and have time to wait, a traditional listing may be better. Our service is designed for homeowners who prioritize speed, certainty, and simplicity over maximum dollars."
                }
              },
              {
                "@type": "Question",
                "name": "What areas in Pennsylvania does ClearEdge serve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We buy houses throughout Eastern Pennsylvania. This includes NEPA (Scranton, Wilkes-Barre, Hazleton, Pittston, Carbondale), the Lehigh Valley (Allentown, Bethlehem, Easton), and the Poconos (Stroudsburg, East Stroudsburg, Tannersville, Pocono Pines)."
                }
              }
            ]
          })
        }}
      />

      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-slate-50 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              ClearEdge Home Buyers Reviews Pennsylvania
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Since 2016, we&apos;ve helped over 200 Eastern Pennsylvania homeowners sell properties in foreclosure, probate, divorce, and other difficult situations.
            </p>
            <p className="text-lg text-slate-500 mt-4">
              These are their words, not ours.
            </p>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="border-b border-slate-200 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-emerald-600">200+</p>
                <p className="text-slate-600">Homeowners Helped</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-600">2016</p>
                <p className="text-slate-600">Founded in Scranton</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-600">21</p>
                <p className="text-slate-600">PA Communities Served</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-600">14 Days</p>
                <p className="text-slate-600">Average Time to Close</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              What Pennsylvania Homeowners Say About Working With Us
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* What Our Reviews Reveal Section */}
        <section className="bg-slate-50 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              What Do ClearEdge Home Buyers Reviews Have in Common?
            </h2>

            <p className="text-lg text-slate-700 mb-6">
              After 200+ transactions across Eastern Pennsylvania, patterns emerge.
            </p>

            <p className="text-slate-700 mb-4">
              Most homeowners who work with us aren&apos;t looking for top dollar.
              They&apos;re looking for certainty.
            </p>

            <p className="text-slate-700 mb-4">
              They&apos;re dealing with situations where the traditional market doesn&apos;t work—foreclosure timelines, probate delays, properties with code violations, or life events that demand speed over maximum sale price.
            </p>

            <p className="text-slate-700 mb-8">
              The common thread in our reviews isn&apos;t &ldquo;they paid me the most.&rdquo;
              It&apos;s &ldquo;they showed up, explained everything, and did exactly what they said.&rdquo;
            </p>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">What homeowners consistently mention:</h3>
              <ul className="space-y-3 text-slate-700">
                {consistentMentions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">
              Frequently Asked Questions About ClearEdge Reviews
            </h2>

            <div className="space-y-8">

              <div className="border-b border-slate-200 pb-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Are ClearEdge Home Buyers reviews verified?
                </h3>
                <p className="text-slate-700">
                  Yes, every testimonial on this page represents a real transaction.
                  We&apos;ve completed over 200 purchases across Eastern Pennsylvania since 2016.
                  We&apos;re happy to provide references upon request for homeowners who want to speak directly with past sellers in similar situations.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  How does ClearEdge compare to other Pennsylvania cash home buyers?
                </h3>
                <p className="text-slate-700">
                  ClearEdge is a local, owner-operated company—not a franchise or national lead aggregator.
                  When you call (570) 904-2059, you&apos;re talking to Tyler or someone on his direct team, not a call center.
                  We&apos;ve been featured in The Morning Call and Lehigh Valley Business, and we&apos;ve been buying houses in NEPA, Lehigh Valley, and the Poconos since 2016.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  What types of situations do ClearEdge reviews typically involve?
                </h3>
                <p className="text-slate-700">
                  Most of our reviews come from homeowners facing time-sensitive or complex situations.
                  This includes <Link href="/situations/foreclosure" className="text-emerald-600 hover:text-emerald-700 underline">foreclosure</Link>, <Link href="/situations/probate" className="text-emerald-600 hover:text-emerald-700 underline">probate</Link>, <Link href="/situations/inherited-property" className="text-emerald-600 hover:text-emerald-700 underline">inherited properties</Link>, <Link href="/situations/divorce" className="text-emerald-600 hover:text-emerald-700 underline">divorce</Link>, <Link href="/situations/tax-liens-code-violations" className="text-emerald-600 hover:text-emerald-700 underline">code violations</Link>, and properties that need significant repairs.
                  Traditional sales aren&apos;t practical in these situations—our process is designed specifically for them.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Will I get a fair offer from ClearEdge?
                </h3>
                <p className="text-slate-700">
                  We make offers based on current market value minus estimated repair costs and our operating margin.
                  We&apos;re transparent about how we calculate offers.
                  If you&apos;re looking for the absolute highest sale price and have time to wait, a traditional listing may be better.
                  Our service is designed for homeowners who prioritize speed, certainty, and simplicity over maximum dollars.
                </p>
              </div>

              <div className="pb-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  What areas in Pennsylvania does ClearEdge serve?
                </h3>
                <p className="text-slate-700">
                  We buy houses throughout Eastern Pennsylvania.
                  This includes NEPA (<Link href="/locations/scranton" className="text-emerald-600 hover:text-emerald-700 underline">Scranton</Link>, <Link href="/locations/wilkes-barre" className="text-emerald-600 hover:text-emerald-700 underline">Wilkes-Barre</Link>, Hazleton, Pittston, Carbondale), the <Link href="/locations/lehigh-valley" className="text-emerald-600 hover:text-emerald-700 underline">Lehigh Valley</Link> (<Link href="/locations/allentown" className="text-emerald-600 hover:text-emerald-700 underline">Allentown</Link>, <Link href="/locations/bethlehem" className="text-emerald-600 hover:text-emerald-700 underline">Bethlehem</Link>, <Link href="/locations/easton" className="text-emerald-600 hover:text-emerald-700 underline">Easton</Link>), and the <Link href="/locations/poconos" className="text-emerald-600 hover:text-emerald-700 underline">Poconos</Link> (Stroudsburg, East Stroudsburg, Tannersville, Pocono Pines).
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-900 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want to See If We Can Help?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              No pressure.
              No obligation.
              Just a conversation about your situation and your options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Get Your Cash Offer
              </Link>
              <a
                href="tel:5709042059"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (570) 904-2059
              </a>
            </div>
            <p className="text-slate-400 mt-8 text-sm">
              Read more ClearEdge Home Buyers reviews Pennsylvania homeowners have shared, or explore our <Link href="/how-it-works" className="text-emerald-400 hover:text-emerald-300 underline">process</Link> to understand exactly how we work.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
