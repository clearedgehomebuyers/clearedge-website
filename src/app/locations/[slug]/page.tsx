import { getLocationBySlug, getLocations, getBlogPostsByLocation } from '@/sanity/lib/queries'
import { LocalBusinessSchema, FAQSchema } from '@/components/Schema'
import { V0LeadForm } from '@/components/v0-lead-form'
import { ScrollToFormButton } from '@/components/ScrollToFormButton'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { LocationFAQAccordion } from '@/components/LocationFAQAccordion'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, CheckCircle, ArrowRight, Clock, DollarSign, Shield, Users, Building, Home, FileText, BookOpen } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PortableText, PortableTextComponents } from '@portabletext/react'

// Hero photos mapped to each location slug (5 photos across 21 pages, alternating)
const heroPhotos: Record<string, { src: string; location: string; days: number }> = {
  // Photo 1: Scranton (5 pages)
  'scranton': { src: '/properties/scranton-pa-cash-home-buyers-clearedge-1.jpg', location: 'Scranton, PA', days: 14 },
  'stroudsburg': { src: '/properties/scranton-pa-cash-home-buyers-clearedge-1.jpg', location: 'Scranton, PA', days: 14 },
  'pittston': { src: '/properties/scranton-pa-cash-home-buyers-clearedge-1.jpg', location: 'Scranton, PA', days: 14 },
  'bloomsburg': { src: '/properties/scranton-pa-cash-home-buyers-clearedge-1.jpg', location: 'Scranton, PA', days: 14 },
  'reading': { src: '/properties/scranton-pa-cash-home-buyers-clearedge-1.jpg', location: 'Scranton, PA', days: 14 },
  // Photo 2: Wilkes-Barre (4 pages)
  'wilkes-barre': { src: '/properties/wilkes-barre-pa-inherited-property-sale-3.jpg', location: 'Wilkes-Barre, PA', days: 12 },
  'east-stroudsburg': { src: '/properties/wilkes-barre-pa-inherited-property-sale-3.jpg', location: 'Wilkes-Barre, PA', days: 12 },
  'kingston': { src: '/properties/wilkes-barre-pa-inherited-property-sale-3.jpg', location: 'Wilkes-Barre, PA', days: 12 },
  'lehigh-valley': { src: '/properties/wilkes-barre-pa-inherited-property-sale-3.jpg', location: 'Wilkes-Barre, PA', days: 12 },
  // Photo 3: Allentown (4 pages)
  'allentown': { src: '/properties/allentown-pa-sell-house-fast-as-is-2.jpg', location: 'Allentown, PA', days: 10 },
  'hazleton': { src: '/properties/allentown-pa-sell-house-fast-as-is-2.jpg', location: 'Allentown, PA', days: 10 },
  'dunmore': { src: '/properties/allentown-pa-sell-house-fast-as-is-2.jpg', location: 'Allentown, PA', days: 10 },
  'poconos': { src: '/properties/allentown-pa-sell-house-fast-as-is-2.jpg', location: 'Allentown, PA', days: 10 },
  // Photo 4: Bethlehem (4 pages)
  'bethlehem': { src: '/properties/lehigh-valley-real-estate-investors-4.jpg', location: 'Bethlehem, PA', days: 8 },
  'pottsville': { src: '/properties/lehigh-valley-real-estate-investors-4.jpg', location: 'Bethlehem, PA', days: 8 },
  'nanticoke': { src: '/properties/lehigh-valley-real-estate-investors-4.jpg', location: 'Bethlehem, PA', days: 8 },
  'pocono-pines': { src: '/properties/lehigh-valley-real-estate-investors-4.jpg', location: 'Bethlehem, PA', days: 8 },
  // Photo 5: Hazleton (4 pages)
  'easton': { src: '/properties/nepa-distressed-house-cleanout-service-5.jpg', location: 'Hazleton, PA', days: 11 },
  'carbondale': { src: '/properties/nepa-distressed-house-cleanout-service-5.jpg', location: 'Hazleton, PA', days: 11 },
  'honesdale': { src: '/properties/nepa-distressed-house-cleanout-service-5.jpg', location: 'Hazleton, PA', days: 11 },
  'tannersville': { src: '/properties/nepa-distressed-house-cleanout-service-5.jpg', location: 'Hazleton, PA', days: 11 },
}

// Default photo for any unmapped slugs
const defaultPhoto = { src: '/properties/scranton-pa-cash-home-buyers-clearedge-1.jpg', location: 'Scranton, PA', days: 14 }

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
  const locations = await getLocations()
  return locations.map((location: any) => ({
    slug: location.slug.current,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const location = await getLocationBySlug(slug)
  if (!location) {
    return {
      title: 'Location Not Found | ClearEdge Home Buyers',
    }
  }

  const title = location.metaTitle || `Sell Your House Fast in ${location.city}, PA | ClearEdge Home Buyers`
  const description = location.metaDescription || `Get a fair cash offer for your ${location.city} home. ClearEdge buys houses as-is for cash. No repairs, no fees. Call Tyler: (570) 904-2059.`
  const url = `https://www.clearedgehomebuyers.com/locations/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
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
  }
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [location, relatedBlogPosts] = await Promise.all([
    getLocationBySlug(slug),
    getBlogPostsByLocation(slug)
  ])

  if (!location) {
    notFound()
  }

  return (
    <main className="bg-white">
      <LocalBusinessSchema />
      {location.faqs && <FAQSchema faqs={location.faqs} />}

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
                {location.heroHeadline || `Sell Your House Fast in`}
                <br />
                <span className="text-[#00b332]">{location.city}, {location.state}</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-[#1a1f1a]/60 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                {location.heroSubheadline || `Get a fair cash offer for your ${location.city} home in 24 hours. We buy houses in any condition — no repairs, no fees, no hassle.`}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
            </div>

            {/* RIGHT COLUMN - Property widget + Trust Indicators */}
            <div className="flex flex-col items-center justify-center h-full gap-10">
              {/* Property Photo Widget */}
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

              {/* Trust Indicators - 2x2 GRID */}
              <div className="grid grid-cols-2 gap-x-10 gap-y-4 w-full max-w-[360px]">
                <div className="flex items-center justify-center gap-3">
                  <Clock className="w-6 h-6 text-[#00b332] flex-shrink-0" />
                  <span className="text-base text-[#1a1f1a]/70 whitespace-nowrap font-medium">Close in 7 Days</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <DollarSign className="w-6 h-6 text-[#00b332] flex-shrink-0" />
                  <span className="text-base text-[#1a1f1a]/70 whitespace-nowrap font-medium">Zero Fees</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Shield className="w-6 h-6 text-[#00b332] flex-shrink-0" />
                  <span className="text-base text-[#1a1f1a]/70 whitespace-nowrap font-medium">No Obligation</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="w-6 h-6 text-[#00b332] flex-shrink-0" />
                  <span className="text-base text-[#1a1f1a]/70 whitespace-nowrap font-medium">Local PA Company</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* County Trust Section - Sage Green Gradient (homepage trust bar styling) */}
      {location.county && (
        <section className="py-8 md:py-12 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-[#1a2e1a] mb-2">
              We Buy Houses in {location.city} and All of {location.county}
            </h2>
            <p className="text-sm md:text-base text-[#1a2e1a]/70 max-w-2xl mx-auto">
              Whether you&apos;re in {location.city} or anywhere else in {location.county}, we can make you a fair cash offer within 24 hours.
            </p>
          </div>
        </section>
      )}

      {/* Local Trust Bar - Cream */}
      {location.nearbyTowns && location.nearbyTowns.length > 0 && (
        <section className="py-6 bg-[#FAF8F5] border-b border-[#1a1f1a]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-6 text-[#1a1f1a]/60">
              <span className="text-sm font-medium">Trusted by homeowners in:</span>
              {location.nearbyTowns.map((town: string) => (
                <span key={town} className="text-sm font-semibold text-[#1a1f1a]">{town}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local Problem Statement - White */}
      {location.problemStatement && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Local Expertise</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Selling a House in {location.city} Doesn&apos;t Have to Be Hard</h2>
            </div>

            <div className="text-[#1a1f1a]/60 space-y-6 text-lg leading-relaxed prose prose-lg max-w-none">
              <PortableText value={location.problemStatement} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}

      {/* Situations - Cream */}
      <section className="py-16 md:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">We Can Help</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a] mb-4">We Help {location.city}{location.county ? ` & ${location.county}` : ''} Homeowners</h2>
            <p className="text-[#1a1f1a]/60 max-w-2xl mx-auto">No matter what situation you&apos;re facing, we can help you sell your house fast for cash.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Building, title: 'Inherited Property', slug: 'inherited-property', desc: 'Sell without probate delays' },
              { icon: Shield, title: 'Facing Foreclosure', slug: 'foreclosure', desc: 'Avoid foreclosure, protect credit' },
              { icon: Users, title: 'Divorce', slug: 'divorce', desc: 'Liquidate quickly and move on' },
              { icon: MapPin, title: 'Job Relocation', slug: 'job-relocation', desc: 'Sell fast when you need to move' },
              { icon: Home, title: 'Tired Landlord', slug: 'tired-landlord', desc: 'Exit the landlord business' },
              { icon: FileText, title: 'Major Repairs', slug: 'major-repairs', desc: 'Sell as-is, skip renovations' },
              { icon: DollarSign, title: 'Tax or Code Issues', slug: 'tax-liens-code-violations', desc: 'We work with liens & violations' },
              { icon: Clock, title: 'Vacant Property', slug: 'vacant-property', desc: 'Stop paying for an empty house' },
            ].map((item, i) => (
              <Link
                key={i}
                href={`/situations/${item.slug}`}
                className="relative bg-white rounded-2xl p-6 border border-[#1a1f1a]/5 hover:shadow-lg hover:border-[#00b332]/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#00b332]/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#00b332]" />
                </div>
                <h3 className="font-serif font-medium text-[#1a1f1a] mb-2">{item.title}</h3>
                <p className="text-[#1a1f1a]/60 text-sm">{item.desc}</p>
                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00b332] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods - White */}
      {location.neighborhoods && location.neighborhoods.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Neighborhoods</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">{location.city} Areas We Serve</h2>
            </div>

            {(() => {
              const neighborhoods = location.neighborhoods as string[]
              const itemsPerRow = 4
              const fullRowCount = Math.floor(neighborhoods.length / itemsPerRow) * itemsPerRow
              const mainCards = neighborhoods.slice(0, fullRowCount)
              const lastRowCards = neighborhoods.slice(fullRowCount)

              return (
                <>
                  {/* Main grid for full rows */}
                  {mainCards.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {mainCards.map((neighborhood: string) => (
                        <div key={neighborhood} className="bg-[#FAF8F5] rounded-2xl p-4 text-center hover:bg-[#00b332]/5 transition-colors border border-[#1a1f1a]/5">
                          <span className="font-medium text-[#1a1f1a]/70">{neighborhood}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Centered last row for remaining cards */}
                  {lastRowCards.length > 0 && (
                    <div className={`flex flex-wrap justify-center gap-4 ${mainCards.length > 0 ? 'mt-4' : ''}`}>
                      {lastRowCards.map((neighborhood: string) => (
                        <div key={neighborhood} className="bg-[#FAF8F5] rounded-2xl p-4 text-center hover:bg-[#00b332]/5 transition-colors border border-[#1a1f1a]/5 w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]">
                          <span className="font-medium text-[#1a1f1a]/70">{neighborhood}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )
            })()}

            <p className="text-center text-[#1a1f1a]/50 mt-8">We buy houses throughout {location.county || location.city} and all surrounding areas.</p>
          </div>
        </section>
      )}

      {/* Comparison Section - Cream */}
      <section className="py-16 md:py-20 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Compare</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Selling to ClearEdge vs. Listing in {location.city}</h2>
          </div>

          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <div className="overflow-hidden rounded-2xl border border-[#1a1f1a]/10 shadow-lg bg-white min-w-[640px]">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-5 px-6 bg-[#FAF8F5] font-medium text-[#1a1f1a]/60"></th>
                  <th className="text-center py-5 px-6 bg-[#00b332] text-white">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-6 h-6 mb-1" />
                      <span className="font-semibold">ClearEdge</span>
                    </div>
                  </th>
                  <th className="text-center py-5 px-6 bg-[#FAF8F5] text-[#1a1f1a]/70">
                    <span className="font-semibold">Traditional Agent</span>
                  </th>
                  <th className="text-center py-5 px-6 bg-[#FAF8F5] text-[#1a1f1a]/70">
                    <span className="font-semibold">FSBO</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Time to Close</td>
                  <td className="py-5 px-6 text-center bg-[#00b332]/5 font-semibold text-[#00b332]">7-14 Days</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">60-90 Days</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">90+ Days</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Repairs Needed</td>
                  <td className="py-5 px-6 text-center bg-[#00b332]/5 font-semibold text-[#00b332]">None</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">Usually Required</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">Usually Required</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Fees & Commissions</td>
                  <td className="py-5 px-6 text-center bg-[#00b332]/5 font-semibold text-[#00b332]">$0</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">5-6%</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">2-3%</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Closing Costs</td>
                  <td className="py-5 px-6 text-center bg-[#00b332]/5 font-semibold text-[#00b332]">We Pay</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">You Pay</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">You Pay</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Showings Required</td>
                  <td className="py-5 px-6 text-center bg-[#00b332]/5 font-semibold text-[#00b332]">Zero</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">Many</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">Many</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Sale Certainty</td>
                  <td className="py-5 px-6 text-center bg-[#00b332]/5 font-semibold text-[#00b332]">100% Guaranteed</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">Uncertain</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">Uncertain</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          <div className="text-center mt-12">
            <ScrollToFormButton className="inline-flex items-center justify-center gap-2 bg-[#00b332] text-white px-8 py-4 rounded-full font-medium hover:bg-[#009929] transition-all shadow-lg shadow-[#00b332]/20">
              Get Your {location.city} Cash Offer
              <ArrowRight className="w-4 h-4" />
            </ScrollToFormButton>
          </div>
        </div>
      </section>

      {/* FAQ Section - White - Using Homepage Style Accordion */}
      {location.faqs && location.faqs.length > 0 && (
        <LocationFAQAccordion faqs={location.faqs} cityName={location.city} />
      )}

      {/* Helpful Guides Section - Cream */}
      {relatedBlogPosts && relatedBlogPosts.length > 0 && (
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Helpful Guides</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Related Articles for {location.city} Homeowners</h2>
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
                      <h3 className="font-serif font-medium text-lg text-[#1a1f1a] mb-2">{post.title}</h3>
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
            ClearEdge Home Buyers is your trusted local cash home buyer in {location.city}, Pennsylvania. Get a fair offer and close on your timeline.
          </p>
        </div>
      </section>

      {/* Lead Form - Same as Homepage */}
      <V0LeadForm />

      <V0Footer />
    </main>
  )
}
