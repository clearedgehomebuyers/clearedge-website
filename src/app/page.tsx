// src/app/page.tsx - Optimized 15-Section Homepage Structure

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Above-fold components (regular imports for immediate loading)
import { V0Header } from '@/components/v0-header'
import { V0Hero } from '@/components/v0-hero'
import { SocialProofWall } from '@/components/SocialProofWall'
import { V0LeadForm } from '@/components/v0-lead-form'

// Below-fold components (lazy loaded for performance, ssr: true for SEO)
const V0ProblemSolutionMerged = dynamic(() => import('@/components/v0-problem-solution-merged').then(mod => ({ default: mod.V0ProblemSolutionMerged })), { ssr: true })
const V0HowItWorks = dynamic(() => import('@/components/v0-how-it-works').then(mod => ({ default: mod.V0HowItWorks })), { ssr: true })
const V0ComparisonMerged = dynamic(() => import('@/components/v0-comparison-merged').then(mod => ({ default: mod.V0ComparisonMerged })), { ssr: true })
const V0VideoSection = dynamic(() => import('@/components/v0-video-section').then(mod => ({ default: mod.V0VideoSection })), { ssr: true })
const V0Testimonials = dynamic(() => import('@/components/v0-testimonials').then(mod => ({ default: mod.V0Testimonials })), { ssr: true })
const V0FAQ = dynamic(() => import('@/components/v0-faq').then(mod => ({ default: mod.V0FAQ })), { ssr: true })
const V0ServiceAreas = dynamic(() => import('@/components/v0-service-areas').then(mod => ({ default: mod.V0ServiceAreas })), { ssr: true })
const V0Footer = dynamic(() => import('@/components/v0-footer').then(mod => ({ default: mod.V0Footer })), { ssr: true })

export const metadata: Metadata = {
  title: "Cash Home Buyers in Pennsylvania | Fair Offer in 24 Hours | ClearEdge",
  description: "PA cash home buyers who actually close. Fair offer in 24 hours, close in 7–30 days. No repairs, no fees, no commissions. Serving NEPA, Lehigh Valley & Poconos.",
  keywords: ["cash home buyers Pennsylvania", "sell house fast PA", "we buy houses Scranton", "sell house as-is Allentown", "cash offer Lehigh Valley", "sell inherited house PA", "cash home buyers near me"],
  openGraph: {
    title: "Cash Home Buyers in Pennsylvania | Fair Offer in 24 Hours | ClearEdge",
    description: "Your PA house is worth more than a lowball offer. Get a fair cash offer in 24 hours from a local company that's bought 200+ homes since 2016.",
    url: "https://www.clearedgehomebuyers.com",
    siteName: "ClearEdge Home Buyers",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: 'https://www.clearedgehomebuyers.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClearEdge Home Buyers - Cash Home Buyers in Pennsylvania',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cash Home Buyers in Pennsylvania | Fair Offer in 24 Hours | ClearEdge",
    description: "Your PA house is worth more than a lowball offer. Get a fair cash offer in 24 hours from a local company that's bought 200+ homes since 2016.",
    images: ['https://www.clearedgehomebuyers.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.clearedgehomebuyers.com',
  },
}

// Homepage FAQs — optimized for featured snippets and AI search
const videoFaqs = [
  {
    question: "How fast can I get a cash offer on my Pennsylvania house?",
    answer: "ClearEdge Home Buyers provides a fair cash offer within 24 hours of receiving your property details. There's zero obligation to accept. Most homeowners hear back the same day."
  },
  {
    question: "Does ClearEdge buy houses that need major repairs or have code violations?",
    answer: "Yes. We buy houses in any condition — foundation issues, mold, fire damage, code violations, hoarding, unpermitted work, you name it. We also handle properties in foreclosure, probate, and tax lien situations. You don't need to fix anything."
  },
  {
    question: "What areas in Pennsylvania does ClearEdge Home Buyers serve?",
    answer: "We buy houses across 21 markets in Eastern Pennsylvania, including Scranton, Wilkes-Barre, Allentown, Bethlehem, Easton, Reading, Stroudsburg, and the entire NEPA, Lehigh Valley, and Poconos regions."
  },
  {
    question: "Are there any fees or commissions when I sell to ClearEdge?",
    answer: "None. When you sell to ClearEdge, there are zero realtor commissions, zero fees, and zero closing costs. We also pay for the title work. The cash offer you accept is the exact amount you receive at closing."
  }
]

interface HomePageProps {
  searchParams: Promise<{ city?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const city = params.city

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
            "description": "Pennsylvania cash home buyers serving 21 markets across Eastern PA. We buy houses in any condition for cash — no fees, no commissions, no repairs. Fair offer in 24 hours, close in as few as 7 days. Family-owned since 2016.",
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
              "description": "We buy Pennsylvania houses for cash in any condition. Fair offer in 24 hours, close in 7–30 days. Zero fees, zero commissions, zero closing costs."
            },
            "sameAs": [
              "https://www.facebook.com/profile.php?id=61578297005995",
              "https://www.instagram.com/clearedge_home_buyers/",
              "https://www.youtube.com/@ClearEdgeHomeBuyers",
              "https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8603424,-75.8193544,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm"
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
                "name": "How fast can I get a cash offer on my Pennsylvania house?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ClearEdge Home Buyers provides a fair cash offer within 24 hours of receiving your property details. There's zero obligation to accept. Most homeowners hear back the same day."
                }
              },
              {
                "@type": "Question",
                "name": "Does ClearEdge buy houses that need major repairs or have code violations?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. We buy houses in any condition — foundation issues, mold, fire damage, code violations, hoarding, unpermitted work, you name it. We also handle properties in foreclosure, probate, and tax lien situations. You don't need to fix anything."
                }
              },
              {
                "@type": "Question",
                "name": "What areas in Pennsylvania does ClearEdge Home Buyers serve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We buy houses across 21 markets in Eastern Pennsylvania, including Scranton, Wilkes-Barre, Allentown, Bethlehem, Easton, Reading, Stroudsburg, and the entire NEPA, Lehigh Valley, and Poconos regions."
                }
              },
              {
                "@type": "Question",
                "name": "Are there any fees or commissions when I sell to ClearEdge?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "None. When you sell to ClearEdge, there are zero realtor commissions, zero fees, and zero closing costs. We also pay for the title work. The cash offer you accept is the exact amount you receive at closing."
                }
              }
            ]
          })
        }}
      />

      <main className="min-h-screen">
        {/* 1. Header */}
        <V0Header />
        {/* 2. Hero (Situation) */}
        <V0Hero city={city} />
        {/* 3. Social Proof Wall (Trust anchor) */}
        <SocialProofWall />
        {/* 4. Problem/Solution (Problem awareness — moved up before solution) */}
        <V0ProblemSolutionMerged />
        {/* 5. How It Works (Solution) */}
        <V0HowItWorks />
        {/* 6. Comparison Table (Solution contrast — natural decision point) */}
        <V0ComparisonMerged />
        {/* 7. Video (Trust reinforcement — moved after solution) */}
        <V0VideoSection />
        {/* 8. Testimonials (Positive proof) */}
        <V0Testimonials />
        {/* 9. Lead Form (Conversion) */}
        <V0LeadForm />
        {/* 10. FAQ (Objection handling — moved before service areas) */}
        <V0FAQ
          faqs={videoFaqs}
          title="Frequently Asked Questions"
          subtitle="Quick answers about selling your Pennsylvania house to a cash buyer — no sugarcoating."
          sectionBg="beige"
        />
        {/* 11. Service Areas (SEO/navigation) */}
        <V0ServiceAreas />
        {/* 12. Footer */}
        <V0Footer />
      </main>
    </>
  )
}
