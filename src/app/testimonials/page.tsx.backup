import Link from 'next/link'
import Image from 'next/image'
import { LeadForm } from '@/components/LeadForm'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Phone, Star, Quote, MapPin, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Customer Reviews | ClearEdge Home Buyers | Scranton PA',
  description: 'See what homeowners across Eastern Pennsylvania are saying about selling their house to ClearEdge Home Buyers. 5-star rated cash home buyer.',
  openGraph: {
    title: 'Customer Reviews | ClearEdge Home Buyers',
    description: 'See what homeowners across Eastern Pennsylvania are saying about selling their house to ClearEdge Home Buyers.',
  },
}

const testimonials = [
  {
    name: 'Kandra G.',
    location: 'Out of State Seller',
    rating: 5,
    featured: true,
    quote: "I am absolutely THRILLED to share that my experience selling my property with Tyler and the entire ClearEdge team was nothing short of phenomenal! The communication throughout was excellent, the process was seamless, and the attention to detail was spot on. Selling a property from out of state can be incredibly stressful, but Tyler made it feel effortless. He handled all the logistics, paperwork, and answered every question I had with patience and clarity. Thanks to ClearEdge, I can now focus on taking better care of my elderly father. THANK YOU for not only helping me achieve my goal of selling quickly but also for guiding me through a process I would have been completely lost in otherwise.",
  },
  {
    name: 'Gavin',
    location: 'Pennsylvania',
    rating: 5,
    featured: false,
    quote: "I get calls constantly from 'investors' looking to buy my home. Tyler and his team at ClearEdge were the first to take the time to explain the process and make me feel comfortable working with them. They were straightforward and did not waste my time. We were able to make a deal and got a very fair number for our property given the condition. Thank you again!",
  },
  {
    name: 'Satisfied Seller',
    location: 'Pennsylvania',
    rating: 5,
    featured: false,
    quote: "My sister and I recently inherited a family member's property. We were unsure what to do with it due to our busy schedules. After doing extensive research, we stumbled upon ClearEdge! Working with the team was a breeze, they guided us through the whole process of selling the property. We closed in 30 days and have never been happier!",
  },
  {
    name: 'Matt B.',
    location: 'Title Company Partner',
    rating: 5,
    featured: false,
    quote: "I've closed a handful of deals for Tyler and ClearEdge and they've always been great to work with — super communicative and always deliver on everything they say they will do! Couldn't recommend a better company to help with off-loading unwanted or trouble properties.",
  },
  {
    name: 'Recent Seller',
    location: 'Pennsylvania',
    rating: 5,
    featured: false,
    quote: "Tyler was very responsive and helpful. I definitely recommend Tyler and his team.",
  },
  {
    name: 'Grateful Homeowner',
    location: 'Eastern PA',
    rating: 5,
    featured: false,
    quote: "Thank you Tyler for all your help and assistance with our house. You made a difficult time simple and smooth.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-[#facc15] fill-[#facc15]' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

export default function TestimonialsPage() {
  const featuredTestimonial = testimonials.find(t => t.featured)
  const otherTestimonials = testimonials.filter(t => !t.featured)

  // Schema markup for reviews
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ClearEdge Home Buyers",
    "image": "https://www.clearedgehomebuyers.com/logo.png",
    "telephone": "570-904-2059",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Scranton",
      "addressRegion": "PA"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "6",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.map(t => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": t.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": t.quote
    }))
  }

  return (
    <main>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Header currentPage="/testimonials" />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0d9488]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#14b8a6]/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center space-x-2 bg-[#0d9488]/20 backdrop-blur-sm border border-[#0d9488]/30 rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-[#facc15] fill-[#facc15]" />
            <span className="text-sm font-medium text-[#14b8a6]">5.0 Rating</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            What Our
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] via-[#0d9488] to-[#14b8a6]">
              Sellers Say
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Real reviews from real homeowners across Eastern Pennsylvania
          </p>

          {/* Rating Summary */}
          <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-[#facc15] fill-[#facc15]" />
              ))}
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">5.0 out of 5</p>
              <p className="text-slate-300 text-sm">Based on 6 reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      {featuredTestimonial && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#0d9488]/5 to-[#14b8a6]/10 rounded-3xl p-8 md:p-12 border border-[#0d9488]/20 relative">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-[#0d9488]/20" />

              <div className="relative">
                <StarRating rating={featuredTestimonial.rating} />

                <blockquote className="mt-6 text-lg md:text-xl text-black leading-relaxed">
                  &ldquo;{featuredTestimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-8 flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[#0d9488] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {featuredTestimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-lg">{featuredTestimonial.name}</p>
                    <div className="flex items-center space-x-1 text-slate-500">
                      <MapPin className="w-4 h-4" />
                      <span>{featuredTestimonial.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other Testimonials Grid */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">MORE REVIEWS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Hear From More Happy Sellers</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {otherTestimonials.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                <StarRating rating={testimonial.rating} />

                <blockquote className="mt-4 text-black leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{testimonial.name}</p>
                    <div className="flex items-center space-x-1 text-slate-500 text-sm">
                      <MapPin className="w-3 h-3" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Widget Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">GOOGLE REVIEWS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">See Our Reviews on Google</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            We&apos;re proud of our reputation helping homeowners across Eastern Pennsylvania. See what others are saying on Google.
          </p>

          {/* Placeholder for Google Reviews Widget */}
          <div id="google-reviews-widget" className="mb-8">
            {/* Google Reviews widget will be added here - Elfsight or EmbedSocial embed code */}
          </div>

          <a
            href="https://www.google.com/maps/place/?q=place_id:ChIJr4hxXnOfyYkR-bE51YVUvik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white border-2 border-[#0d9488] text-[#0d9488] font-semibold rounded-xl hover:bg-[#0d9488] hover:text-white transition-all"
          >
            <span>View All Reviews on Google</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* CTA Section with Lead Form */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0d9488]/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Happy Sellers?</h2>
              <p className="text-xl text-slate-300 mb-8">
                Get your free, no-obligation cash offer today. Experience the same excellent service our reviewers are talking about.
              </p>
              <div className="flex items-center space-x-4">
                <a href="tel:5709042059" className="inline-flex items-center space-x-2 text-[#14b8a6] font-bold text-lg hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>(570) 904-2059</span>
                </a>
              </div>
            </div>

            <LeadForm heading="Get Your Free Cash Offer" buttonText="Get My Cash Offer" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
