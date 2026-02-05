// src/app/page.tsx - Optimized 15-Section Homepage Structure

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Above-fold components (regular imports for immediate loading)
import { V0Header } from '@/components/v0-header'
import { V0Hero } from '@/components/v0-hero'
import { V0TrustBar } from '@/components/v0-trust-bar'
import { V0LeadForm } from '@/components/v0-lead-form'

// Below-fold components (lazy loaded for performance, ssr: true for SEO)
const V0ProblemSolutionMerged = dynamic(() => import('@/components/v0-problem-solution-merged').then(mod => ({ default: mod.V0ProblemSolutionMerged })), { ssr: true })
const V0VideoSection = dynamic(() => import('@/components/v0-video-section').then(mod => ({ default: mod.V0VideoSection })), { ssr: true })
const V0HowItWorks = dynamic(() => import('@/components/v0-how-it-works').then(mod => ({ default: mod.V0HowItWorks })), { ssr: true })
const V0ComparisonMerged = dynamic(() => import('@/components/v0-comparison-merged').then(mod => ({ default: mod.V0ComparisonMerged })), { ssr: true })
const V0Situations = dynamic(() => import('@/components/v0-situations').then(mod => ({ default: mod.V0Situations })), { ssr: true })
const V0WhyClearEdge = dynamic(() => import('@/components/v0-why-clearedge').then(mod => ({ default: mod.V0WhyClearEdge })), { ssr: true })
const V0Testimonials = dynamic(() => import('@/components/v0-testimonials').then(mod => ({ default: mod.V0Testimonials })), { ssr: true })
const V0FAQ = dynamic(() => import('@/components/v0-faq').then(mod => ({ default: mod.V0FAQ })), { ssr: true })
const V0ServiceAreas = dynamic(() => import('@/components/v0-service-areas').then(mod => ({ default: mod.V0ServiceAreas })), { ssr: true })
const V0ClosingSeo = dynamic(() => import('@/components/v0-closing-seo').then(mod => ({ default: mod.V0ClosingSeo })), { ssr: true })
const V0Footer = dynamic(() => import('@/components/v0-footer').then(mod => ({ default: mod.V0Footer })), { ssr: true })

export const metadata: Metadata = {
  title: "Sell Your PA House Fast for Cash | ClearEdge Home Buyers",
  description: "Get a fair cash offer in 24 hours. No repairs, no agents, no fees. ClearEdge has helped 200+ Eastern PA homeowners since 2016.",
  keywords: ["sell house fast Pennsylvania", "cash home buyers PA", "we buy houses Scranton", "sell house as-is Allentown", "cash offer Lehigh Valley", "sell inherited house PA"],
  openGraph: {
    title: "Sell Your PA House Fast for Cash | ClearEdge Home Buyers",
    description: "Get a fair cash offer in 24 hours. No repairs, no agents, no fees. Serving NEPA, Lehigh Valley & Poconos since 2016.",
    url: "https://www.clearedgehomebuyers.com",
    siteName: "ClearEdge Home Buyers",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: 'https://www.clearedgehomebuyers.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClearEdge Home Buyers - Sell Your House Fast for Cash in Pennsylvania',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Your PA House Fast for Cash | ClearEdge Home Buyers",
    description: "Get a fair cash offer in 24 hours. No repairs, no agents, no fees. Serving NEPA, Lehigh Valley & Poconos since 2016.",
    images: ['https://www.clearedgehomebuyers.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.clearedgehomebuyers.com',
  },
}

// Video-specific FAQs for the homepage
const videoFaqs = [
  {
    question: "How fast can I get a cash offer on my house?",
    answer: "ClearEdge Home Buyers provides a full cash offer within 24 hours of your initial contact, with zero obligation to accept."
  },
  {
    question: "Does ClearEdge buy houses in foreclosure or probate?",
    answer: "Yes. We specialize in helping Pennsylvania homeowners facing foreclosure, probate, code violations, and other difficult situations. We handle all the complexities for you."
  },
  {
    question: "What areas does ClearEdge Home Buyers serve?",
    answer: "We buy houses across Northeastern Pennsylvania, the Lehigh Valley, and the Poconos—including Scranton, Allentown, Bethlehem, Wilkes-Barre, and surrounding areas."
  },
  {
    question: "Are there any fees or commissions when selling to ClearEdge?",
    answer: "No. When you sell to ClearEdge, there are no realtor commissions, no fees, and no repair costs. The cash offer you accept is the amount you receive."
  }
]

export default function HomePage() {
  return (
    <>
      {/* RealEstateAgent Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "@id": "https://www.clearedgehomebuyers.com/#organization",
            "name": "ClearEdge Home Buyers",
            "legalName": "ClearEdge Properties LLC",
            "description": "Cash home buying company serving Eastern Pennsylvania. We buy houses as-is for cash with no fees or repairs required.",
            "url": "https://www.clearedgehomebuyers.com",
            "telephone": "+1-610-904-8526",
            "email": "info@clearedgehomebuyers.com",
            "logo": {
              "@type": "ImageObject",
              "@id": "https://www.clearedgehomebuyers.com/#logo",
              "url": "https://www.clearedgehomebuyers.com/logo.webp",
              "width": 400,
              "height": 100,
              "caption": "ClearEdge Home Buyers logo"
            },
            "image": "https://www.clearedgehomebuyers.com/og-image.png",
            "priceRange": "$",
            "founder": {
              "@type": "Person",
              "name": "Tyler"
            },
            "foundingDate": "2016",
            "numberOfEmployees": {
              "@type": "QuantitativeValue",
              "minValue": 2,
              "maxValue": 10
            },
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
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59"
            },
            "areaServed": [
              { "@type": "City", "name": "Scranton", "sameAs": "https://www.wikidata.org/wiki/Q3412" },
              { "@type": "City", "name": "Wilkes-Barre", "sameAs": "https://www.wikidata.org/wiki/Q1015173" },
              { "@type": "City", "name": "Allentown", "sameAs": "https://www.wikidata.org/wiki/Q3414" },
              { "@type": "City", "name": "Bethlehem", "sameAs": "https://www.wikidata.org/wiki/Q182087" },
              { "@type": "City", "name": "Easton", "sameAs": "https://www.wikidata.org/wiki/Q985378" },
              { "@type": "City", "name": "Reading", "sameAs": "https://www.wikidata.org/wiki/Q191555" },
              { "@type": "City", "name": "Hazleton", "sameAs": "https://www.wikidata.org/wiki/Q988681" },
              { "@type": "City", "name": "Stroudsburg", "sameAs": "https://www.wikidata.org/wiki/Q2071166" },
              { "@type": "City", "name": "East Stroudsburg" },
              { "@type": "City", "name": "Honesdale" },
              { "@type": "City", "name": "Carbondale" },
              { "@type": "City", "name": "Pittston" },
              { "@type": "City", "name": "Kingston" },
              { "@type": "City", "name": "Nanticoke" },
              { "@type": "City", "name": "Dunmore" },
              { "@type": "City", "name": "Bloomsburg" },
              { "@type": "City", "name": "Pottsville" },
              { "@type": "City", "name": "Pocono Pines" },
              { "@type": "City", "name": "Tannersville" },
              { "@type": "Place", "name": "Lehigh Valley" },
              { "@type": "Place", "name": "Poconos" },
              { "@type": "AdministrativeArea", "name": "Lackawanna County" },
              { "@type": "AdministrativeArea", "name": "Luzerne County" },
              { "@type": "AdministrativeArea", "name": "Lehigh County" },
              { "@type": "AdministrativeArea", "name": "Northampton County" },
              { "@type": "AdministrativeArea", "name": "Berks County" },
              { "@type": "AdministrativeArea", "name": "Monroe County" },
              { "@type": "AdministrativeArea", "name": "Wayne County" },
              { "@type": "AdministrativeArea", "name": "Columbia County" },
              { "@type": "AdministrativeArea", "name": "Schuylkill County" },
              { "@type": "AdministrativeArea", "name": "Carbon County" },
              { "@type": "AdministrativeArea", "name": "Pike County" },
              { "@type": "State", "name": "Pennsylvania", "sameAs": "https://www.wikidata.org/wiki/Q1400" },
              { "@type": "Place", "name": "Eastern Pennsylvania" },
              { "@type": "Place", "name": "Northeastern Pennsylvania" }
            ],
            "knowsAbout": [
              "Cash home buying",
              "Selling inherited property",
              "Foreclosure prevention",
              "Probate real estate sales",
              "As-is home sales",
              "Quick home closings",
              "Pennsylvania real estate"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "6",
              "bestRating": "5"
            },
            "makesOffer": {
              "@type": "Offer",
              "name": "Cash Home Buying",
              "description": "We buy houses for cash in any condition. No repairs, no agents, no fees."
            },
            "sameAs": [
              "https://www.facebook.com/profile.php?id=61578297005995",
              "https://www.instagram.com/clearedge_home_buyers/",
              "https://www.youtube.com/@ClearEdgeHomeBuyers",
              "https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8603424,-75.8193544,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm",
              "https://www.bbb.org/us/ny/long-is-city/profile/real-estate/clearedge-properties-llc-0121-87169161"
            ]
          })
        }}
      />

      {/* VideoObject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "Sell Your House Fast in PA | ClearEdge Home Buyers",
            "description": "Tyler from ClearEdge Home Buyers explains the easiest way to sell your house fast in Northeastern PA, the Lehigh Valley, and the Poconos. Get a full cash offer in 24 hours with no fees, no commissions, and no repairs needed.",
            "thumbnailUrl": "https://i.ytimg.com/vi/YS6uDgxIjiI/maxresdefault.jpg",
            "uploadDate": "2026-01-27T08:00:00-05:00",
            "duration": "PT1M10S",
            "contentUrl": "https://www.youtube.com/watch?v=YS6uDgxIjiI",
            "embedUrl": "https://www.youtube.com/embed/YS6uDgxIjiI",
            "regionsAllowed": "US",
            "transcript": "Selling a property in Pennsylvania is tedious and overwhelming, especially if you're facing a difficult situation. I'm Tyler with ClearEdge Home Buyers. We provide Pennsylvania homeowners a transparent, stress-free alternative to the traditional real estate route. We aren't a national franchise. We're a local family-owned company that's purchased over 200 homes since 2016 across Northeastern Pennsylvania, the Lehigh Valley, and the Poconos. Whether you're in Allentown, Scranton, or Bethlehem, we do the heavy lifting. We provide a full cash offer within 24 hours with zero obligation. That means no realtor commissions, no fees, and no cleaning or repairs. You won't have to lift a finger even if the property has code violations, is in probate, or is facing foreclosure. We've seen it all and we can handle it for you. With ClearEdge, you'll always get a straight, truthful answer. Visit ClearEdgeHomeBuyers.com or call us today for your no-obligation cash offer, and let us help you move on to what's next.",
            "hasPart": [
              {
                "@type": "Clip",
                "name": "Selling a House in Pennsylvania?",
                "startOffset": 0,
                "endOffset": 12,
                "url": "https://www.youtube.com/watch?v=YS6uDgxIjiI&t=0"
              },
              {
                "@type": "Clip",
                "name": "Meet ClearEdge Home Buyers",
                "startOffset": 12,
                "endOffset": 30,
                "url": "https://www.youtube.com/watch?v=YS6uDgxIjiI&t=12"
              },
              {
                "@type": "Clip",
                "name": "Scranton, Allentown, and Bethlehem Service Areas",
                "startOffset": 30,
                "endOffset": 45,
                "url": "https://www.youtube.com/watch?v=YS6uDgxIjiI&t=30"
              },
              {
                "@type": "Clip",
                "name": "Our 24-Hour Cash Offer Process",
                "startOffset": 45,
                "endOffset": 62,
                "url": "https://www.youtube.com/watch?v=YS6uDgxIjiI&t=45"
              },
              {
                "@type": "Clip",
                "name": "Get Started with ClearEdge",
                "startOffset": 62,
                "endOffset": 70,
                "url": "https://www.youtube.com/watch?v=YS6uDgxIjiI&t=62"
              }
            ]
          })
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How fast can I get a cash offer on my house?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ClearEdge Home Buyers provides a full cash offer within 24 hours of your initial contact, with zero obligation to accept."
                }
              },
              {
                "@type": "Question",
                "name": "Does ClearEdge buy houses in foreclosure or probate?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. We specialize in helping Pennsylvania homeowners facing foreclosure, probate, code violations, and other difficult situations. We handle all the complexities for you."
                }
              },
              {
                "@type": "Question",
                "name": "What areas does ClearEdge Home Buyers serve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We buy houses across Northeastern Pennsylvania, the Lehigh Valley, and the Poconos—including Scranton, Allentown, Bethlehem, Wilkes-Barre, and surrounding areas."
                }
              },
              {
                "@type": "Question",
                "name": "Are there any fees or commissions when selling to ClearEdge?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. When you sell to ClearEdge, there are no realtor commissions, no fees, and no repair costs. The cash offer you accept is the amount you receive."
                }
              }
            ]
          })
        }}
      />

      <main className="min-h-screen">
        {/* 1. Sticky Header */}
        <V0Header />
        {/* 2. Hero */}
        <V0Hero />
        {/* 3. Trust Bar */}
        <V0TrustBar />
        {/* 4. Video Section - Meet Tyler */}
        <V0VideoSection />
        {/* 5. Problem/Solution - "Selling a House in PA Just Got Harder" */}
        <V0ProblemSolutionMerged />
        {/* 6. How It Works */}
        <V0HowItWorks />
        {/* 7. Comparison Table (merged) */}
        <V0ComparisonMerged />
        {/* 8. Situations (8 cards) */}
        <V0Situations />
        {/* 9. Why ClearEdge (4 cards) */}
        <V0WhyClearEdge />
        {/* 10. Testimonials */}
        <V0Testimonials />
        {/* 11. Main Lead Form */}
        <V0LeadForm />
        {/* 12. FAQs */}
        <V0FAQ
          faqs={videoFaqs}
          title="Frequently Asked Questions"
          subtitle="Get quick answers about selling your Pennsylvania house for cash."
          sectionBg="beige"
        />
        {/* 13. Service Areas (21 locations) */}
        <V0ServiceAreas />
        {/* 14. Closing SEO + CTA (beige) */}
        <V0ClosingSeo />
        {/* 15. Footer (white) */}
        <V0Footer />
      </main>
    </>
  )
}
