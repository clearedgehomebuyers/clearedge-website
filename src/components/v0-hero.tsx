"use client"

import { ArrowRight, Shield, Clock, DollarSign, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

// City slug to display name mapping
const cityDisplayNames: Record<string, string> = {
  "scranton": "Scranton",
  "wilkes-barre": "Wilkes-Barre",
  "hazleton": "Hazleton",
  "pittston": "Pittston",
  "kingston": "Kingston",
  "nanticoke": "Nanticoke",
  "carbondale": "Carbondale",
  "dunmore": "Dunmore",
  "honesdale": "Honesdale",
  "bloomsburg": "Bloomsburg",
  "allentown": "Allentown",
  "bethlehem": "Bethlehem",
  "easton": "Easton",
  "reading": "Reading",
  "lehigh-valley": "Lehigh Valley",
  "pottsville": "Pottsville",
  "stroudsburg": "Stroudsburg",
  "east-stroudsburg": "East Stroudsburg",
  "pocono-pines": "Pocono Pines",
  "tannersville": "Tannersville",
  "poconos": "the Poconos",
}

interface V0HeroProps {
  city?: string
}

export function V0Hero({ city }: V0HeroProps) {
  // Validate and get display name for city
  const citySlug = city?.toLowerCase().trim()
  const cityDisplayName = citySlug ? cityDisplayNames[citySlug] : null
  const scrollToForm = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        event_label: 'Get Your Free Cash Offer - Hero',
        page_path: window.location.pathname
      });
    }
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative pt-32 pb-10 px-4 overflow-hidden bg-[#FAF8F5]">
      <div className="relative max-w-7xl mx-auto w-full">
        {/* Two-column layout for lg: and above, single column for mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 items-center">
          {/* LEFT COLUMN - Text content (centered within column) */}
          <div className="text-center lg:text-center">
            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground mb-5 leading-[1.1]">
              {cityDisplayName ? (
                <>
                  Sell Your House Fast in {cityDisplayName}, PA.
                  <br />
                  <span className="text-primary">Skip the Hassle.</span>
                </>
              ) : (
                <>
                  Sell Your House Fast.
                  <br />
                  <span className="text-primary">Skip the Hassle.</span>
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed font-light">
              {cityDisplayName
                ? `Get a fair cash offer within 24 hours for your ${cityDisplayName} home. No repairs. No fees. No stress.`
                : 'Get a fair cash offer within 24 hours from a local, family-owned company. No repairs. No fees. No stress.'
              }
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary-hover text-base px-8 py-6 rounded-full shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 group"
              >
                Get Your Free Cash Offer
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="text-base px-8 py-6 rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/5"
              >
                See How It Works
              </Button>
            </div>

            {/* Trust Indicators - 2x2 GRID */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground/60 whitespace-nowrap">Close in 7 Days</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <DollarSign className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground/60 whitespace-nowrap">Zero Fees</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground/60 whitespace-nowrap">No Obligation</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground/60 whitespace-nowrap">Local PA Company</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Property widget (centered horizontally and vertically) */}
          <div className="flex items-center justify-center h-full">
            <div className="bg-white rounded-xl shadow-xl border border-[#1a1f1a]/10 overflow-hidden w-[280px] lg:w-[320px]">
              <div className="relative aspect-[4/3]">
                <picture>
                  {/* WebP sources for modern browsers */}
                  <source
                    type="image/webp"
                    srcSet="/properties/scranton-pa-cash-home-buyers-clearedge-1-280w.webp 280w, /properties/scranton-pa-cash-home-buyers-clearedge-1-mobile-2x.webp 560w, /properties/scranton-pa-cash-home-buyers-clearedge-1-320w.webp 320w, /properties/scranton-pa-cash-home-buyers-clearedge-1-2x.webp 640w"
                    sizes="(max-width: 768px) 280px, 320px"
                  />
                  {/* Fallback for older browsers */}
                  <img
                    src="/properties/scranton-pa-cash-home-buyers-clearedge-1-280w.webp"
                    srcSet="/properties/scranton-pa-cash-home-buyers-clearedge-1-280w.webp 280w, /properties/scranton-pa-cash-home-buyers-clearedge-1-mobile-2x.webp 560w, /properties/scranton-pa-cash-home-buyers-clearedge-1-320w.webp 320w, /properties/scranton-pa-cash-home-buyers-clearedge-1-2x.webp 640w"
                    sizes="(max-width: 768px) 280px, 320px"
                    width={320}
                    height={240}
                    alt="Cash home purchase in Scranton, PA - sold as-is to ClearEdge Home Buyers"
                    className="w-full h-full object-cover"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <span className="inline-block px-2 py-0.5 bg-[#008a29] text-white text-xs font-bold rounded-full mb-1">
                    Just Closed
                  </span>
                  <p className="text-sm font-bold">Scranton, PA</p>
                  <p className="text-xs text-white/90">14 Days to Close</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
