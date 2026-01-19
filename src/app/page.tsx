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
        {/* 1. Header */}
        <V0Header />
        {/* 2. Hero */}
        <V0Hero />
        {/* 3. Trust Bar */}
        <V0TrustBar />
        {/* 4. Problem/Solution (merged) */}
        <V0ProblemSolutionMerged />
        {/* 5. Video Intro - Meet Tyler */}
        <V0VideoSection />
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
        {/* 12. Top 5 FAQs */}
        <V0FAQ />
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
