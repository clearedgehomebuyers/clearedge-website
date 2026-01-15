import { getSituationBySlug, getSituations, getBlogPostsBySituation } from '@/sanity/lib/queries'
import { LocalBusinessSchema, FAQSchema } from '@/components/Schema'
import { MultiStepLeadForm } from '@/components/MultiStepLeadForm'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { SituationFAQAccordion } from '@/components/SituationFAQAccordion'
import Link from 'next/link'
import { Phone, CheckCircle, ArrowRight, Clock, DollarSign, Shield, Home, FileText, BookOpen, MapPin } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'

// Property photos mapped to specific situation slugs (each photo used exactly twice)
const heroPhotos: Record<string, { src: string; location: string; days: number }> = {
  'foreclosure': { src: '/properties/allentown-pa-sell-house-fast-as-is-2.jpg', location: 'Allentown, PA', days: 10 },
  'inherited-property': { src: '/properties/wilkes-barre-pa-inherited-property-sale-3.jpg', location: 'Wilkes-Barre, PA', days: 12 },
  'divorce': { src: '/properties/lehigh-valley-real-estate-investors-4.jpg', location: 'Bethlehem, PA', days: 8 },
  'job-relocation': { src: '/properties/nepa-distressed-house-cleanout-service-5.jpg', location: 'Hazleton, PA', days: 14 },
  'major-repairs': { src: '/properties/allentown-pa-sell-house-fast-as-is-2.jpg', location: 'Allentown, PA', days: 10 },
  'tax-liens-code-violations': { src: '/properties/wilkes-barre-pa-inherited-property-sale-3.jpg', location: 'Wilkes-Barre, PA', days: 12 },
  'tired-landlord': { src: '/properties/lehigh-valley-real-estate-investors-4.jpg', location: 'Bethlehem, PA', days: 8 },
  'vacant-property': { src: '/properties/nepa-distressed-house-cleanout-service-5.jpg', location: 'Hazleton, PA', days: 14 },
}

// Default photo if slug not found
const defaultPhoto = { src: '/properties/allentown-pa-sell-house-fast-as-is-2.jpg', location: 'Allentown, PA', days: 10 }

// Custom components for rendering Portable Text with links
const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      return (
        <a
          href={value?.href}
          className="text-[#00b332] hover:underline font-medium"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
  },
}

export async function generateStaticParams() {
  const situations = await getSituations()
  return situations.map((situation: any) => ({
    slug: situation.slug.current,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const situation = await getSituationBySlug(slug)
  if (!situation) return {}

  const title = situation.metaTitle || `${situation.title} - Sell Your House Fast | ClearEdge Home Buyers`
  const description = situation.metaDescription || `Dealing with ${situation.title.toLowerCase()}? Get a fair cash offer for your home in 24 hours. No repairs, no fees, no commissions.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.clearedgehomebuyers.com/situations/${slug}`,
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
      canonical: `https://www.clearedgehomebuyers.com/situations/${slug}`,
    },
  }
}

export default async function SituationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [situation, relatedBlogPosts] = await Promise.all([
    getSituationBySlug(slug),
    getBlogPostsBySituation(slug)
  ])

  if (!situation) {
    notFound()
  }

  return (
    <main className="bg-white">
      <LocalBusinessSchema />
      {situation.faqs && <FAQSchema faqs={situation.faqs} />}

      <V0Header />

      {/* Hero Section - Cream with dot pattern (matching homepage) */}
      <section className="relative pt-32 pb-10 px-4 overflow-hidden bg-[#FAF8F5]">
        {/* Background pattern (matching homepage) */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fillOpacity='1' fillRule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN - Text content (centered within column) */}
            <div className="text-center lg:text-center">
              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1a1f1a] mb-5 leading-[1.1]">
                {situation.heroHeadline || `Sell Your House Fast.`}
                <br />
                <span className="text-[#00b332]">{situation.title}</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-[#1a1f1a]/60 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                {situation.heroSubheadline || `Dealing with ${situation.title.toLowerCase()}? We understand. Get a fair cash offer and close on your timeline — no repairs, no fees, no hassle.`}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <a
                  href="#lead-form"
                  className="inline-flex items-center justify-center bg-[#00b332] text-white hover:bg-[#009929] text-base px-8 py-4 rounded-full shadow-lg shadow-[#00b332]/25 transition-all hover:shadow-xl hover:shadow-[#00b332]/30 hover:-translate-y-0.5 group font-medium"
                >
                  Get Your Free Cash Offer
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:5709042059"
                  className="inline-flex items-center justify-center text-base px-8 py-4 rounded-full text-[#1a1f1a]/80 hover:text-[#1a1f1a] hover:bg-[#1a1f1a]/5 font-medium"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  (570) 904-2059
                </a>
              </div>

              {/* Trust Indicators - 2x2 GRID */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-[#00b332] flex-shrink-0" />
                  <span className="text-sm text-[#1a1f1a]/60 whitespace-nowrap">Close in 7 Days</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#00b332] flex-shrink-0" />
                  <span className="text-sm text-[#1a1f1a]/60 whitespace-nowrap">Zero Fees</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-[#00b332] flex-shrink-0" />
                  <span className="text-sm text-[#1a1f1a]/60 whitespace-nowrap">No Obligation</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00b332] flex-shrink-0" />
                  <span className="text-sm text-[#1a1f1a]/60 whitespace-nowrap">Local PA Company</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Property widget (centered horizontally and vertically) */}
            <div className="flex items-center justify-center h-full">
              <div className="bg-white rounded-xl shadow-xl border border-[#1a1f1a]/10 overflow-hidden w-[280px] lg:w-[320px]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={(heroPhotos[slug] || defaultPhoto).src}
                    alt={`Recently purchased home in ${(heroPhotos[slug] || defaultPhoto).location}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <span className="inline-block px-2 py-0.5 bg-[#00b332] text-white text-xs font-bold rounded-full mb-1">
                      Just Closed
                    </span>
                    <p className="text-sm font-bold">{(heroPhotos[slug] || defaultPhoto).location}</p>
                    <p className="text-xs text-white/90">{(heroPhotos[slug] || defaultPhoto).days} Days to Close</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Description - White */}
      {situation.problemDescription && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">We Understand</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">
                Dealing with {situation.title}?
              </h2>
            </div>

            <div className="text-[#1a1f1a]/60 space-y-6 text-lg leading-relaxed prose prose-lg max-w-none">
              <PortableText value={situation.problemDescription} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}

      {/* Benefits Grid - Cream */}
      {situation.benefits && situation.benefits.length > 0 && (
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Benefits</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a] mb-4">Why Sell to ClearEdge?</h2>
              <p className="text-[#1a1f1a]/60 max-w-2xl mx-auto">We specialize in helping homeowners facing {situation.title.toLowerCase()} situations.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {situation.benefits.map((benefit: any, i: number) => {
                const icons = [Clock, DollarSign, Shield, Home, CheckCircle, ArrowRight]
                const Icon = icons[i % icons.length]
                return (
                  <div key={i} className="bg-white rounded-2xl p-8 border border-[#1a1f1a]/5 hover:shadow-lg transition-all duration-300">
                    <div className="w-14 h-14 bg-[#00b332]/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[#00b332]" />
                    </div>
                    <h3 className="font-serif font-medium text-xl text-[#1a1f1a] mb-3">{benefit.title}</h3>
                    <p className="text-[#1a1f1a]/60 leading-relaxed">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* How It Works - White */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Contact Us', desc: 'Call or fill out our form. Tell us about your property and situation.' },
              { step: '2', title: 'Get Your Offer', desc: "We'll evaluate your property and present a fair, no-obligation cash offer within 24 hours." },
              { step: '3', title: 'Close & Get Paid', desc: 'Accept and pick your closing date. We handle all the paperwork and pay closing costs.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-[#00b332] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#00b332]/20">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="font-serif font-medium text-xl text-[#1a1f1a] mb-3">{item.title}</h3>
                <p className="text-[#1a1f1a]/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Locations - Cream */}
      {situation.relatedLocations && situation.relatedLocations.length > 0 && (
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Service Areas</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Areas We Serve</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {situation.relatedLocations.map((location: any) => (
                <Link
                  key={location.slug.current}
                  href={`/locations/${location.slug.current}`}
                  className="bg-white rounded-2xl p-4 text-center hover:bg-[#00b332]/5 transition-colors border border-[#1a1f1a]/5 hover:border-[#00b332]/30"
                >
                  <span className="font-medium text-[#1a1f1a]/70">{location.city}, {location.state}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section - White - Using Homepage Style Accordion */}
      {situation.faqs && situation.faqs.length > 0 && (
        <SituationFAQAccordion faqs={situation.faqs} situationTitle={situation.title} />
      )}

      {/* Related Blog Posts - Cream */}
      {relatedBlogPosts && relatedBlogPosts.length > 0 && (
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Helpful Guides</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Related Articles</h2>
            </div>

            <div className="space-y-4">
              {relatedBlogPosts.slice(0, 3).map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="block bg-white rounded-2xl p-6 border border-[#1a1f1a]/5 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00b332]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-[#00b332]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-medium text-lg text-[#1a1f1a] mb-2 group-hover:text-[#00b332] transition-colors">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-[#1a1f1a]/60 text-sm line-clamp-2">{post.excerpt}</p>
                      )}
                      <span className="inline-flex items-center text-[#00b332] font-medium text-sm mt-3">
                        Read Article <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* More Helpful Guides Button */}
            <div className="text-center mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-white hover:bg-[#1a1f1a]/5 text-[#1a1f1a]/70 font-medium rounded-full border border-[#1a1f1a]/10 transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-2 text-[#00b332]" />
                More Helpful Guides
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Closing SEO - Sage gradient */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#1a2e1a] font-medium">
            ClearEdge Home Buyers helps Pennsylvania homeowners facing {situation.title.toLowerCase()} sell their homes fast for cash. No repairs, no fees, no hassle.
          </p>
        </div>
      </section>

      {/* Final CTA with MultiStep Lead Form - Beige */}
      <section id="lead-form" className="py-16 md:py-20 bg-[#FAF8F5]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a] mb-4">
            Ready to Move Forward?
          </h2>
          <p className="text-lg text-[#1a1f1a]/60 mb-8">
            Get a fair cash offer in 24 hours. No repairs, no fees, no obligation.
          </p>
          <MultiStepLeadForm />
        </div>
      </section>

      <V0Footer />
    </main>
  )
}
