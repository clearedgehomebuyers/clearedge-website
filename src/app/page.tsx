// src/app/page.tsx - v0 Design Implementation with Full SEO Content

import type { Metadata } from 'next'
import { V0Header } from '@/components/v0-header'
import { V0Hero } from '@/components/v0-hero'
import { V0TrustBar } from '@/components/v0-trust-bar'
import { V0LeadForm } from '@/components/v0-lead-form'
import { V0WhySellingHarder } from '@/components/v0-why-selling-harder'
import { V0HowItWorks } from '@/components/v0-how-it-works'
import { V0HiddenCost } from '@/components/v0-hidden-cost'
import { V0ProblemSolution } from '@/components/v0-problem-solution'
import { V0Situations } from '@/components/v0-situations'
import { V0ServiceAreas } from '@/components/v0-service-areas'
import { V0WhyClearEdge } from '@/components/v0-why-clearedge'
import { V0VideoSection } from '@/components/v0-video-section'
import { V0ComparisonTable } from '@/components/v0-comparison-table'
import { V0PropertiesGallery } from '@/components/v0-properties-gallery'
import { V0Testimonials } from '@/components/v0-testimonials'
import { V0AboutSection } from '@/components/v0-about-section'
import { V0FAQ } from '@/components/v0-faq'
import { V0ClosingSeo } from '@/components/v0-closing-seo'
import { V0Footer } from '@/components/v0-footer'

export const metadata: Metadata = {
  title: "Sell Your Pennsylvania House Fast for Cash | ClearEdge Home Buyers",
  description: "Get a fair cash offer in 24 hours. No repairs, no agents, no fees. ClearEdge has helped 200+ Eastern PA homeowners since 2016.",
  keywords: ["sell house fast Pennsylvania", "cash home buyers PA", "we buy houses Scranton", "sell house as-is Allentown", "cash offer Lehigh Valley", "sell inherited house PA"],
  openGraph: {
    title: "Sell Your Pennsylvania House Fast for Cash | ClearEdge Home Buyers",
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
}

export default function HomePage() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "ClearEdge Home Buyers",
            "description": "Cash home buying company serving Eastern Pennsylvania. We buy houses as-is for cash with no fees or repairs required.",
            "url": "https://www.clearedgehomebuyers.com",
            "telephone": "+1-570-904-2059",
            "image": "https://www.clearedgehomebuyers.com/og-image.png",
            "priceRange": "$",
            "founder": {
              "@type": "Person",
              "name": "Tyler"
            },
            "foundingDate": "2016",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Scranton",
              "addressRegion": "PA",
              "addressCountry": "US"
            },
            "areaServed": [
              { "@type": "City", "name": "Scranton" },
              { "@type": "City", "name": "Wilkes-Barre" },
              { "@type": "City", "name": "Hazleton" },
              { "@type": "City", "name": "Allentown" },
              { "@type": "City", "name": "Bethlehem" },
              { "@type": "City", "name": "Easton" },
              { "@type": "City", "name": "Reading" },
              { "@type": "City", "name": "Stroudsburg" },
              { "@type": "City", "name": "East Stroudsburg" },
              { "@type": "State", "name": "Pennsylvania" }
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
              "https://www.google.com/maps/place/ClearEdge+Home+Buyers"
            ]
          })
        }}
      />

      <main className="min-h-screen">
        <V0Header />
        <V0Hero />
        <V0TrustBar />
        <V0LeadForm />
        <V0WhySellingHarder />
        <V0HowItWorks />
        <V0HiddenCost />
        <V0ProblemSolution />
        <V0Situations />
        <V0ServiceAreas />
        <V0WhyClearEdge />
        <V0PropertiesGallery />
        <V0Testimonials />
        <V0VideoSection />
        <V0ComparisonTable />
        <V0AboutSection />
        <V0FAQ />
        <V0ClosingSeo />
        <V0Footer />
      </main>
    </>
  )
}
