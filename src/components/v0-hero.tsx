import { readFileSync } from "fs"
import { join } from "path"
import { ArrowRight, Shield, Clock, DollarSign, MapPin } from "lucide-react"
import { ScrollToFormButton } from "@/components/ScrollToFormButton"
import { ScrollToSectionButton } from "@/components/ScrollToSectionButton"

// Inline the mobile hero image as base64 at build time.
// This embeds the 11KB image directly in the HTML so LCP fires with FCP —
// no network request means no CDN cache-miss variance.
const heroMobile = `data:image/webp;base64,${readFileSync(
  join(process.cwd(), "public/properties/scranton-pa-cash-home-buyers-clearedge-1-280w.webp")
).toString("base64")}`

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
  return (
    <section className="relative pt-32 pb-10 px-4 overflow-hidden bg-surface-cream surface-grain">
      {/* Ambient decoration circles */}
      <div className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full bg-ce-green/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute top-[300px] -right-40 w-[500px] h-[500px] rounded-full bg-ce-blue/[0.03] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Two-column layout for lg: and above, single column for mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 items-center">
          {/* LEFT COLUMN - Text content (centered within column) */}
          <div className="text-center lg:text-center">
            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ce-ink mb-5 leading-[1.1]">
              {cityDisplayName ? (
                <>
                  Cash Home Buyers in {cityDisplayName}, PA
                  <br />
                  <span className="text-gradient-brand">Who Actually Close.</span>
                </>
              ) : (
                <>
                  Pennsylvania Cash Home Buyers
                  <br />
                  <span className="text-gradient-brand">Who Actually Close.</span>
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-ce-ink-70 max-w-2xl mx-auto mb-6 leading-relaxed font-light">
              {cityDisplayName
                ? `Your ${cityDisplayName} house is worth more than a lowball offer and six months of uncertainty. Get a fair cash offer in 24 hours — close in as few as 7 days.`
                : 'Your house is worth more than a lowball offer and six months of uncertainty. Get a fair cash offer in 24 hours from a local, family-owned company — close in as few as 7 days.'
              }
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <ScrollToFormButton
                eventLabel="Get My Fair Cash Offer - Hero"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium transition-all bg-ce-green text-white shadow-green hover:bg-ce-green-hover hover:shadow-green-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-green h-14 rounded-full px-10 group"
              >
                Get My Fair Cash Offer
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </ScrollToFormButton>
              <ScrollToSectionButton
                targetId="how-it-works"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium transition-all h-14 rounded-full px-10 text-ce-ink/80 hover:text-ce-ink hover:bg-ce-ink/5 border border-ce-ink/10 hover:border-ce-ink/20"
              >
                See How It Works
              </ScrollToSectionButton>
            </div>

            {/* Trust Indicators - 2x2 GRID */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-ce-green flex-shrink-0" />
                <span className="text-sm text-ce-ink/60 whitespace-normal">Close in 7–30 Days</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <DollarSign className="w-4 h-4 text-ce-green flex-shrink-0" />
                <span className="text-sm text-ce-ink/60 whitespace-normal">Zero Fees or Commissions</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-ce-green flex-shrink-0" />
                <span className="text-sm text-ce-ink/60 whitespace-normal">No Repairs Needed</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-ce-green flex-shrink-0" />
                <span className="text-sm text-ce-ink/60 whitespace-normal">200+ PA Homes Bought</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Property widget (centered horizontally and vertically) */}
          <div className="flex items-center justify-center h-full">
            {/* Stacked card effect container */}
            <div className="relative">
              {/* Background stacked card */}
              <div className="absolute inset-0 bg-white rounded-2xl shadow-lg border border-ce-ink/5 transform rotate-2 scale-[0.97] translate-x-2 translate-y-1" />

              {/* Main card */}
              <div className="relative bg-white rounded-2xl shadow-2xl border border-ce-ink/10 overflow-hidden w-full max-w-[280px] lg:max-w-[380px] hover:-translate-y-1 transition-transform duration-300">
                <div className="relative aspect-[4/3]">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${heroMobile} 280w, /properties/scranton-pa-cash-home-buyers-clearedge-1-mobile-2x.webp 560w, /properties/scranton-pa-cash-home-buyers-clearedge-1-320w.webp 320w, /properties/scranton-pa-cash-home-buyers-clearedge-1-2x.webp 640w`}
                      sizes="(max-width: 768px) 280px, 380px"
                    />
                    <img
                      src={heroMobile}
                      width={380}
                      height={285}
                      alt="Cash home purchase in Scranton, PA - sold as-is to ClearEdge Home Buyers"
                      className="w-full h-full object-cover"
                      fetchPriority="high"
                      loading="eager"
                      decoding="sync"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <span className="inline-block px-2.5 py-1 bg-ce-green text-white text-xs font-bold rounded-full mb-1.5">
                      Just Closed
                    </span>
                    <p className="text-sm font-bold">Scranton, PA</p>
                    <p className="text-xs text-white/90">Closed in 14 Days, As-Is</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
