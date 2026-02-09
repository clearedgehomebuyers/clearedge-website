import { getLocationBySlug, getLocations, getBlogPostsByLocation } from '@/sanity/lib/queries'
import { cityToHub, hubDisplayNames, allHubData } from '@/lib/regional-hub-data'
import { FAQSchema } from '@/components/Schema'
import { V0LeadForm } from '@/components/v0-lead-form'
import { ScrollToFormButton } from '@/components/ScrollToFormButton'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { LocationFAQAccordion } from '@/components/LocationFAQAccordion'
import { DynamicPhoneLink } from '@/components/DynamicPhone'
import { TrackedCTALink } from '@/components/TrackedCTALink'
import { LocationMapWrapper } from '@/components/LocationMapWrapper'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, CheckCircle, ArrowRight, Clock, DollarSign, Shield, FileText, BookOpen } from 'lucide-react'
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
          className="text-[#008a29] hover:underline font-medium"
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
      title: 'Location Not Found',
    }
  }

  const title = location.metaTitle || `Sell My House Fast ${location.city} PA | Cash Home Buyers | ClearEdge`
  const description = location.metaDescription || `Get a fair cash offer for your ${location.city} home in 24 hours. ClearEdge buys houses as-is for cash. No repairs, no fees, no commissions. Call Tyler: (610) 904-8526.`
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

  // Get parent hub info for this city
  const parentHubSlug = cityToHub[slug]
  const parentHubName = parentHubSlug ? hubDisplayNames[parentHubSlug] : null

  // BreadcrumbList Schema - includes hub if this city belongs to one
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.clearedgehomebuyers.com/"
      },
      ...(parentHubSlug ? [{
        "@type": "ListItem",
        "position": 2,
        "name": parentHubName,
        "item": `https://www.clearedgehomebuyers.com/locations/${parentHubSlug}`
      }] : []),
      {
        "@type": "ListItem",
        "position": parentHubSlug ? 3 : 2,
        "name": `${location.city}, PA`,
        "item": `https://www.clearedgehomebuyers.com/locations/${slug}`
      }
    ]
  }

  // City-specific LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.clearedgehomebuyers.com/locations/${slug}#localbusiness`,
    "name": `ClearEdge Home Buyers - ${location.city}`,
    "description": `We buy houses for cash in ${location.city}, PA. Get a fair cash offer in 24 hours. No repairs, no fees, no commissions.`,
    "url": `https://www.clearedgehomebuyers.com/locations/${slug}`,
    "telephone": "+1-610-904-8526",
    "email": "info@clearedgehomebuyers.com",
    "priceRange": "$$",
    "image": "https://www.clearedgehomebuyers.com/logo.webp",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.city,
      "addressRegion": "PA",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": location.city,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": location.county || "Pennsylvania"
      }
    },
    "parentOrganization": {
      "@id": "https://www.clearedgehomebuyers.com/#organization"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "6"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61578297005995",
      "https://www.instagram.com/clearedge_home_buyers/",
      "https://www.youtube.com/@ClearEdgeHomeBuyers",
      "https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8603424,-75.8193544,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm"
    ]
  }

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {location.faqs && <FAQSchema faqs={location.faqs} />}

      <V0Header />

      {/* Hero Section - Cream */}
      <section className="relative pt-32 pb-10 px-4 overflow-hidden bg-[#FAF8F5]">
        <div className="relative max-w-7xl mx-auto w-full">
          {/* Visual Breadcrumb */}
          {parentHubSlug && parentHubName && (
            <nav className="mb-6 text-center" aria-label="Breadcrumb">
              <ol className="inline-flex items-center gap-2 text-sm">
                <li>
                  <Link href="/" className="text-[#1a1f1a]/60 hover:text-[#008a29] transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-[#1a1f1a]/40">/</li>
                <li>
                  <Link href={`/locations/${parentHubSlug}`} className="text-[#008a29] hover:text-[#007a24] font-medium transition-colors">
                    {parentHubName}
                  </Link>
                </li>
                <li className="text-[#1a1f1a]/40">/</li>
                <li className="text-[#1a1f1a]/80 font-medium">
                  {location.city}
                </li>
              </ol>
            </nav>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 items-center">
            {/* LEFT COLUMN - Text content (centered within column) */}
            <div className="text-center lg:text-center">
              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1a1f1a] mb-5 leading-[1.1]">
                {location.heroHeadline || `Sell Your House Fast in`}
                <br />
                <span className="text-[#008a29]">{location.city}, {location.state}</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-[#1a1f1a]/70 max-w-2xl mx-auto mb-6 leading-relaxed font-light">
                {location.heroSubheadline || `Get a fair cash offer for your ${location.city} home in 24 hours. We buy houses in any condition — no repairs, no fees, no hassle.`}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <TrackedCTALink
                  href="#lead-form"
                  label="Get Your Free Cash Offer"
                  eventLabel="Get Your Free Cash Offer - Location Hero"
                  className="inline-flex items-center justify-center bg-[#008a29] text-white hover:bg-[#007a24] text-base px-8 py-4 rounded-full shadow-lg shadow-[#008a29]/25 transition-all hover:shadow-xl hover:shadow-[#008a29]/30 hover:-translate-y-0.5 group font-medium"
                />
                <DynamicPhoneLink
                  className="inline-flex items-center justify-center text-base px-8 py-4 rounded-full text-[#1a1f1a]/80 hover:text-[#1a1f1a] hover:bg-[#1a1f1a]/5 font-medium"
                  showIcon
                  iconClassName="w-5 h-5 mr-2"
                />
              </div>
            </div>

            {/* RIGHT COLUMN - Property widget + Trust Indicators */}
            <div className="flex flex-col items-center justify-center h-full gap-6">
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
                    <span className="inline-block px-2 py-0.5 bg-[#008a29] text-white text-xs font-bold rounded-full mb-1">
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
                  <Clock className="w-6 h-6 text-[#008a29] flex-shrink-0" />
                  <span className="text-base text-[#1a1f1a]/70 whitespace-nowrap font-medium">Close in 7 Days</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <DollarSign className="w-6 h-6 text-[#008a29] flex-shrink-0" />
                  <span className="text-base text-[#1a1f1a]/70 whitespace-nowrap font-medium">Zero Fees</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Shield className="w-6 h-6 text-[#008a29] flex-shrink-0" />
                  <span className="text-base text-[#1a1f1a]/70 whitespace-nowrap font-medium">No Obligation</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="w-6 h-6 text-[#008a29] flex-shrink-0" />
                  <span className="text-base text-[#1a1f1a]/70 whitespace-nowrap font-medium">Local PA Company</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* County Trust Section - Sage Green Gradient (homepage trust bar styling) */}
      {location.county && (
        <section className="py-4 md:py-6 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
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


      {/* Local Problem Statement - White */}
      {location.problemStatement && (
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">Local Expertise</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Selling a House in {location.city} Doesn&apos;t Have to Be Hard</h2>
            </div>

            <div className="text-[#1a1f1a]/70 space-y-6 text-lg leading-relaxed prose prose-lg max-w-none">
              <PortableText value={location.problemStatement} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}


      {/* Neighborhoods - White - Progressive disclosure on mobile */}
      {location.neighborhoods && location.neighborhoods.length > 0 && (
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">Neighborhoods</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">{location.city} Areas We Serve</h2>
            </div>

            {(() => {
              const neighborhoods = location.neighborhoods as string[]
              const MOBILE_INITIAL = 8

              return (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {neighborhoods.map((neighborhood: string, index: number) => (
                      <div
                        key={neighborhood}
                        className={`bg-[#FAF8F5] rounded-2xl p-4 text-center hover:bg-[#008a29]/5 transition-colors border border-[#1a1f1a]/5${index >= MOBILE_INITIAL ? ' hidden md:block' : ''}`}
                      >
                        <span className="font-medium text-[#1a1f1a]/70">{neighborhood}</span>
                      </div>
                    ))}
                  </div>

                  {neighborhoods.length > MOBILE_INITIAL && (
                    <details className="md:hidden mt-4">
                      <summary className="text-center text-[#008a29] font-medium text-sm cursor-pointer hover:text-[#007a24] transition-colors">
                        Show all {neighborhoods.length} neighborhoods
                      </summary>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {neighborhoods.slice(MOBILE_INITIAL).map((neighborhood: string) => (
                          <div key={neighborhood} className="bg-[#FAF8F5] rounded-2xl p-4 text-center hover:bg-[#008a29]/5 transition-colors border border-[#1a1f1a]/5">
                            <span className="font-medium text-[#1a1f1a]/70">{neighborhood}</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </>
              )
            })()}

            <p className="text-center text-[#1a1f1a]/70 mt-8">We buy houses throughout {location.county || location.city} and all surrounding areas.</p>
          </div>
        </section>
      )}

      {/* Service Area Map - Cream */}
      <section className="py-12 md:py-14 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">Service Area</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Our {location.city} Coverage Area</h2>
            <p className="text-[#1a1f1a]/70 mt-2 max-w-2xl mx-auto">
              We buy houses throughout {location.city} and the surrounding communities shown on the map below.
            </p>
          </div>
          <LocationMapWrapper slug={slug} cityName={location.city} />
        </div>
      </section>

      {/* Comparison Section - White */}
      <section className="py-12 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">Compare</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Selling to ClearEdge vs. Listing in {location.city}</h2>
          </div>

          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <div className="overflow-hidden rounded-2xl border border-[#1a1f1a]/10 shadow-lg bg-white min-w-[640px]">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-5 px-6 bg-[#FAF8F5] font-medium text-[#1a1f1a]/70"></th>
                  <th className="text-center py-5 px-6 bg-[#008a29] text-white">
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
                  <td className="py-5 px-6 text-center bg-[#008a29]/5 font-semibold text-[#008a29]">7-14 Days</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/70">60-90 Days</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/70">90+ Days</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Repairs Needed</td>
                  <td className="py-5 px-6 text-center bg-[#008a29]/5 font-semibold text-[#008a29]">None</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/70">Usually Required</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/70">Usually Required</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Fees & Commissions</td>
                  <td className="py-5 px-6 text-center bg-[#008a29]/5 font-semibold text-[#008a29]">$0</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/70">5-6%</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/70">2-3%</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Closing Costs</td>
                  <td className="py-5 px-6 text-center bg-[#008a29]/5 font-semibold text-[#008a29]">We Pay</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/70">You Pay</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/70">You Pay</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Showings Required</td>
                  <td className="py-5 px-6 text-center bg-[#008a29]/5 font-semibold text-[#008a29]">Zero</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/70">Many</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/70">Many</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Sale Certainty</td>
                  <td className="py-5 px-6 text-center bg-[#008a29]/5 font-semibold text-[#008a29]">100% Guaranteed</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/70">Uncertain</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/70">Uncertain</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          <div className="text-center mt-8">
            <ScrollToFormButton className="inline-flex items-center justify-center gap-2 bg-[#008a29] text-white px-8 py-4 rounded-full font-medium hover:bg-[#007a24] transition-all shadow-lg shadow-[#008a29]/20">
              Get Your {location.city} Cash Offer
              <ArrowRight className="w-4 h-4" />
            </ScrollToFormButton>
          </div>
        </div>
      </section>

      {/* Nearby Communities - Cross-linking to sibling cities in same region */}
      {parentHubSlug && allHubData[parentHubSlug] && (
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">Nearby Communities</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">
                We Also Buy Houses Across {parentHubName}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {allHubData[parentHubSlug].cities
                .filter(city => city.slug !== slug)
                .map((city) => (
                  <Link
                    key={city.slug}
                    href={`/locations/${city.slug}`}
                    className="bg-white rounded-2xl p-4 text-center border border-[#1a1f1a]/5 hover:shadow-lg hover:border-[#008a29]/30 transition-all duration-300 group"
                  >
                    <span className="font-medium text-[#1a1f1a] group-hover:text-[#008a29] transition-colors">{city.name}</span>
                  </Link>
                ))}
            </div>

            <div className="text-center mt-6">
              <Link
                href={`/locations/${parentHubSlug}`}
                className="inline-flex items-center text-[#008a29] font-medium hover:text-[#007a24] transition-colors"
              >
                View all {parentHubName} communities
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section - White - Using Homepage Style Accordion */}
      {location.faqs && location.faqs.length > 0 && (
        <LocationFAQAccordion faqs={location.faqs} cityName={location.city} />
      )}

      {/* Helpful Guides Section - Cream */}
      {relatedBlogPosts && relatedBlogPosts.length > 0 && (
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">Helpful Guides</span>
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
                    <div className="w-12 h-12 bg-[#008a29]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-[#008a29]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-medium text-lg text-[#1a1f1a] mb-2">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-[#1a1f1a]/70 text-sm line-clamp-2">{post.excerpt}</p>
                      )}
                      <span className="inline-flex items-center text-[#008a29] font-medium text-sm mt-3">
                        Read Article <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* More Helpful Guides Button */}
            <div className="text-center mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-white hover:bg-[#1a1f1a]/5 text-[#1a1f1a]/70 font-medium rounded-full border border-[#1a1f1a]/10 transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-2 text-[#008a29]" />
                More Helpful Guides
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* Lead Form - Same as Homepage */}
      <V0LeadForm />


      <V0Footer />
    </main>
  )
}
