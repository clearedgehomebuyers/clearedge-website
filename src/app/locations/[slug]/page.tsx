import { getLocationBySlug, getLocations, getBlogPostsByLocation } from '@/sanity/lib/queries'
import { cityToHub, hubDisplayNames, allHubData } from '@/lib/regional-hub-data'
import { FAQSchema } from '@/components/Schema'
import { ScrollToFormButton } from '@/components/ScrollToFormButton'
import { V0Header } from '@/components/v0-header'
import { TrackedCTALink } from '@/components/TrackedCTALink'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { MapPin, CheckCircle, ArrowRight, Clock, DollarSign, Shield, FileText, BookOpen } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PortableText, PortableTextComponents } from '@portabletext/react'

// Below-fold components (lazy loaded for performance, ssr: true for SEO)
const V0LeadForm = dynamic(() => import('@/components/v0-lead-form').then(mod => ({ default: mod.V0LeadForm })), { ssr: true })
const V0Footer = dynamic(() => import('@/components/v0-footer').then(mod => ({ default: mod.V0Footer })), { ssr: true })
const LocationFAQAccordion = dynamic(() => import('@/components/LocationFAQAccordion').then(mod => ({ default: mod.LocationFAQAccordion })), { ssr: true })
const DynamicPhoneLink = dynamic(() => import('@/components/DynamicPhone').then(mod => ({ default: mod.DynamicPhoneLink })), { ssr: true })
const LocationMapWrapper = dynamic(() => import('@/components/LocationMapWrapper').then(mod => ({ default: mod.LocationMapWrapper })), { ssr: true })

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
          className="text-ce-green hover:underline font-medium"
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

  const title = location.metaTitle || `Cash Home Buyers in ${location.city}, PA | Fair Offer in 24 Hours | ClearEdge`
  const description = location.metaDescription || `Cash home buyers in ${location.city}, PA. ClearEdge buys houses as-is for cash — fair offer in 24 hours, close in 7–30 days. No repairs, no fees, no commissions. 200+ PA homes purchased since 2016.`
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
    "description": `Cash home buyers in ${location.city}, PA. ClearEdge buys houses as-is for cash — fair offer in 24 hours, close in 7–30 days. No repairs, no fees, no commissions. 200+ PA homes purchased since 2016.`,
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
      <section className="relative pt-32 pb-10 px-4 overflow-hidden bg-surface-cream">
        <div className="relative max-w-7xl mx-auto w-full">
          {/* Visual Breadcrumb */}
          {parentHubSlug && parentHubName && (
            <nav className="mb-6 text-center" aria-label="Breadcrumb">
              <ol className="inline-flex items-center gap-2 text-sm">
                <li>
                  <Link href="/" className="text-ce-ink/60 hover:text-ce-green transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-ce-ink/40">/</li>
                <li>
                  <Link href={`/locations/${parentHubSlug}`} className="text-ce-green hover:text-ce-green-hover font-medium transition-colors">
                    {parentHubName}
                  </Link>
                </li>
                <li className="text-ce-ink/40">/</li>
                <li className="text-ce-ink/80 font-medium">
                  {location.city}
                </li>
              </ol>
            </nav>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 items-center">
            {/* LEFT COLUMN - Text content (centered within column) */}
            <div className="text-center lg:text-center">
              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ce-ink mb-5 leading-[1.1]">
                {location.heroHeadline || `Sell Your House Fast in`}
                <br />
                <span className="text-ce-green">{location.city}, {location.state}</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-ce-ink/70 max-w-2xl mx-auto mb-6 leading-relaxed font-light">
                {location.heroSubheadline || `Get a fair cash offer for your ${location.city} home in 24 hours. We buy houses in any condition — no repairs, no fees, no hassle.`}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <TrackedCTALink
                  href="#lead-form"
                  label="Get My Fair Cash Offer"
                  eventLabel="Get My Fair Cash Offer - Location Hero"
                  className="inline-flex items-center justify-center bg-ce-green text-white hover:bg-ce-green-hover text-base px-8 py-4 rounded-full shadow-lg shadow-green transition-all hover:shadow-xl hover:shadow-green-lg hover:-translate-y-0.5 group font-medium"
                />
                <DynamicPhoneLink
                  className="inline-flex items-center justify-center text-base px-8 py-4 rounded-full text-ce-ink/80 hover:text-ce-ink hover:bg-ce-ink/5 font-medium"
                  showIcon
                  iconClassName="w-5 h-5 mr-2"
                />
              </div>
            </div>

            {/* RIGHT COLUMN - Property widget + Trust Indicators */}
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {/* Property Photo Widget */}
              <div className="bg-white rounded-xl shadow-xl border border-ce-ink/10 overflow-hidden w-full max-w-[280px] lg:max-w-[320px]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={(heroPhotos[slug] || defaultPhoto).src}
                    alt={`Recently purchased home in ${(heroPhotos[slug] || defaultPhoto).location}`}
                    fill
                    sizes="(max-width: 1024px) 280px, 320px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <span className="inline-block px-2 py-0.5 bg-ce-green text-white text-xs font-bold rounded-full mb-1">
                      Just Closed
                    </span>
                    <p className="text-sm font-bold">{(heroPhotos[slug] || defaultPhoto).location}</p>
                    <p className="text-xs text-white/90">Closed in {(heroPhotos[slug] || defaultPhoto).days} Days, As-Is</p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators - 2x2 GRID */}
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 w-full max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-ce-green flex-shrink-0" />
                  <span className="text-sm text-ce-ink/60 whitespace-nowrap">Close in 7–30 Days</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="w-4 h-4 text-ce-green flex-shrink-0" />
                  <span className="text-sm text-ce-ink/60 whitespace-nowrap">Zero Fees or Commissions</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-ce-green flex-shrink-0" />
                  <span className="text-sm text-ce-ink/60 whitespace-nowrap">No Repairs Needed</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-ce-green flex-shrink-0" />
                  <span className="text-sm text-ce-ink/60 whitespace-nowrap">200+ PA Homes Bought</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* County Trust Section - Sage Green Gradient (homepage trust bar styling) */}
      {location.county && (
        <section className="py-4 md:py-6 bg-gradient-to-b from-surface-green-wash to-surface-green-tint">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-ce-ink mb-2">
              We Buy Houses in {location.city} and All of {location.county}
            </h2>
            <p className="text-sm md:text-base text-ce-ink/70 max-w-2xl mx-auto">
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
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">Local Expertise</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-ce-ink">Selling a House in {location.city} Doesn&apos;t Have to Be Hard</h2>
            </div>

            <div className="text-ce-ink/70 space-y-6 text-lg leading-relaxed prose prose-lg max-w-none">
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
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">Neighborhoods</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-ce-ink">{location.city} Areas We Serve</h2>
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
                        className={`bg-surface-cream rounded-2xl p-4 text-center hover:bg-ce-green-subtle transition-colors border border-ce-ink/5${index >= MOBILE_INITIAL ? ' hidden md:block' : ''}`}
                      >
                        <span className="font-medium text-ce-ink/70">{neighborhood}</span>
                      </div>
                    ))}
                  </div>

                  {neighborhoods.length > MOBILE_INITIAL && (
                    <details className="md:hidden mt-4">
                      <summary className="text-center text-ce-green font-medium text-sm cursor-pointer hover:text-ce-green-hover transition-colors">
                        Show all {neighborhoods.length} neighborhoods
                      </summary>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {neighborhoods.slice(MOBILE_INITIAL).map((neighborhood: string) => (
                          <div key={neighborhood} className="bg-surface-cream rounded-2xl p-4 text-center hover:bg-ce-green-subtle transition-colors border border-ce-ink/5">
                            <span className="font-medium text-ce-ink/70">{neighborhood}</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </>
              )
            })()}

            <p className="text-center text-ce-ink/70 mt-8">We buy houses throughout {location.county || location.city} and all surrounding areas.</p>
          </div>
        </section>
      )}

      {/* Service Area Map - Cream */}
      <section className="py-12 md:py-14 bg-surface-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">Service Area</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-ce-ink">Our {location.city} Coverage Area</h2>
            <p className="text-ce-ink/70 mt-2 max-w-2xl mx-auto">
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
            <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">Compare</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-ce-ink">Selling to ClearEdge vs. Listing in {location.city}</h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-ce-ink/10 shadow-lg bg-white">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-5 px-6 bg-surface-cream font-medium text-ce-ink/70"></th>
                  <th className="text-center py-5 px-6 bg-ce-green text-white">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-6 h-6 mb-1" />
                      <span className="font-semibold">ClearEdge</span>
                    </div>
                  </th>
                  <th className="text-center py-5 px-6 bg-surface-cream text-ce-ink/70">
                    <span className="font-semibold">Traditional Agent</span>
                  </th>
                  <th className="text-center py-5 px-6 bg-surface-cream text-ce-ink/70">
                    <span className="font-semibold">FSBO</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-ce-ink/5">
                  <td className="py-5 px-6 font-medium text-ce-ink/70">Time to Close</td>
                  <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">7-14 Days</td>
                  <td className="py-5 px-6 text-center text-ce-ink/70">90–180 Days</td>
                  <td className="py-5 px-6 text-center text-ce-ink/70">120+ Days</td>
                </tr>
                <tr className="border-t border-ce-ink/5">
                  <td className="py-5 px-6 font-medium text-ce-ink/70">Repairs Needed</td>
                  <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">None — We Buy As-Is</td>
                  <td className="py-5 px-6 text-center text-ce-ink/70">$10K–$40K+ Typical</td>
                  <td className="py-5 px-6 text-center text-ce-ink/70">$10K–$40K+ Typical</td>
                </tr>
                <tr className="border-t border-ce-ink/5">
                  <td className="py-5 px-6 font-medium text-ce-ink/70">Fees & Commissions</td>
                  <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">$0</td>
                  <td className="py-5 px-6 text-center text-ce-ink/70">5-6%</td>
                  <td className="py-5 px-6 text-center text-ce-ink/70">2-3%</td>
                </tr>
                <tr className="border-t border-ce-ink/5">
                  <td className="py-5 px-6 font-medium text-ce-ink/70">Closing Costs</td>
                  <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">We Pay</td>
                  <td className="py-5 px-6 text-center text-ce-ink/70">You Pay</td>
                  <td className="py-5 px-6 text-center text-ce-ink/70">You Pay</td>
                </tr>
                <tr className="border-t border-ce-ink/5">
                  <td className="py-5 px-6 font-medium text-ce-ink/70">Showings Required</td>
                  <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">Zero</td>
                  <td className="py-5 px-6 text-center text-ce-ink/70">Many</td>
                  <td className="py-5 px-6 text-center text-ce-ink/70">Many</td>
                </tr>
                <tr className="border-t border-ce-ink/5">
                  <td className="py-5 px-6 font-medium text-ce-ink/70">Sale Certainty</td>
                  <td className="py-5 px-6 text-center bg-ce-green-subtle font-semibold text-ce-green">Guaranteed — Cash</td>
                  <td className="py-5 px-6 text-center text-ce-ink/70">38% Fall Through</td>
                  <td className="py-5 px-6 text-center text-ce-ink/70">Even Less Certain</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="md:hidden space-y-3">
            {[
              { feature: 'Time to Close', clearEdge: '7-14 Days', traditional: '90–180 Days', fsbo: '120+ Days' },
              { feature: 'Repairs Needed', clearEdge: 'None — We Buy As-Is', traditional: '$10K–$40K+ Typical', fsbo: '$10K–$40K+ Typical' },
              { feature: 'Fees & Commissions', clearEdge: '$0', traditional: '5-6%', fsbo: '2-3%' },
              { feature: 'Closing Costs', clearEdge: 'We Pay', traditional: 'You Pay', fsbo: 'You Pay' },
              { feature: 'Showings Required', clearEdge: 'Zero', traditional: 'Many', fsbo: 'Many' },
              { feature: 'Sale Certainty', clearEdge: 'Guaranteed — Cash', traditional: '38% Fall Through', fsbo: 'Even Less Certain' },
            ].map((row, index) => (
              <div key={index} className="bg-white rounded-2xl border border-ce-ink/10 shadow-sm p-4">
                <p className="font-medium text-ce-ink mb-3">{row.feature}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 bg-ce-green-subtle rounded-lg px-3 py-1.5">
                    <CheckCircle className="w-4 h-4 text-ce-green flex-shrink-0" />
                    <span className="text-sm text-ce-green font-semibold">ClearEdge: {row.clearEdge}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 flex-shrink-0 text-center text-xs text-ce-ink/40">&#x2715;</span>
                    <span className="text-sm text-ce-ink/60">Agent: {row.traditional}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 flex-shrink-0 text-center text-xs text-ce-ink/40">&#x2715;</span>
                    <span className="text-sm text-ce-ink/60">FSBO: {row.fsbo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <ScrollToFormButton className="inline-flex items-center justify-center gap-2 bg-ce-green text-white px-8 py-4 rounded-full font-medium hover:bg-ce-green-hover transition-all shadow-lg shadow-green">
              See What We&apos;d Offer for Your {location.city} Home
              <ArrowRight className="w-4 h-4" />
            </ScrollToFormButton>
          </div>
        </div>
      </section>

      {/* Nearby Communities - Cross-linking to sibling cities in same region */}
      {parentHubSlug && allHubData[parentHubSlug] && (
        <section className="py-12 md:py-14 bg-surface-cream">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">Nearby Communities</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-ce-ink">
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
                    className="bg-white rounded-2xl p-4 text-center border border-ce-ink/5 hover:shadow-lg hover:border-ce-green/30 transition-all duration-300 group"
                  >
                    <span className="font-medium text-ce-ink group-hover:text-ce-green transition-colors">{city.name}</span>
                  </Link>
                ))}
            </div>

            <div className="text-center mt-6">
              <Link
                href={`/locations/${parentHubSlug}`}
                className="inline-flex items-center text-ce-green font-medium hover:text-ce-green-hover transition-colors"
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
        <section className="py-12 md:py-14 bg-surface-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">Helpful Guides</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-ce-ink">Related Articles for {location.city} Homeowners</h2>
            </div>

            <div className="space-y-4">
              {relatedBlogPosts.slice(0, 3).map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="block bg-white rounded-2xl p-6 border border-ce-ink/5 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-ce-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-ce-green" />
                    </div>
                    <div>
                      <h3 className="font-serif font-medium text-lg text-ce-ink mb-2">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-ce-ink/70 text-sm line-clamp-2">{post.excerpt}</p>
                      )}
                      <span className="inline-flex items-center text-ce-green font-medium text-sm mt-3">
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
                className="inline-flex items-center px-6 py-3 bg-white hover:bg-ce-ink/5 text-ce-ink/70 font-medium rounded-full border border-ce-ink/10 transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-2 text-ce-green" />
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
