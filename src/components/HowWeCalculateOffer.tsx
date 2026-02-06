"use client"

import { TrendingUp, Wrench, Receipt, Shield, Building } from "lucide-react"
import { ArrowRight } from "lucide-react"

const pillars = [
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description:
      "We study your property's location, layout, and condition, then compare it to similar properties in the area. Combined with local and broader market trends, we determine the after-repair value or expected rental rate.",
  },
  {
    icon: Wrench,
    title: "Renovation & Compliance",
    description:
      "We estimate every dollar needed to bring the property to its full potential — repairs, permitting, city approvals, and inspections. Whether we're reselling or renting, we account for what it takes to get there.",
  },
  {
    icon: Receipt,
    title: "Closing & Carrying Costs",
    description:
      "We cover all closing costs so you never come out of pocket. We also factor in the insurance, utilities, and taxes we'll carry throughout the renovation — those are on us, not you.",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description:
      "Every property is unique. Inherited tenants, squatters, foreclosure payoffs, code violations, structural unknowns — we evaluate the full picture and factor in the complexity so you don't have to deal with any of it.",
  },
  {
    icon: Building,
    title: "Our Operating Costs",
    description:
      "We're a local business with families to support. Our offer includes a fair margin that allows us to keep doing this work for homeowners across Pennsylvania — and that's built into every number we present, not hidden in fine print.",
  },
]

interface HowWeCalculateOfferProps {
  bgColor?: "white" | "cream"
}

export function HowWeCalculateOffer({ bgColor = "white" }: HowWeCalculateOfferProps) {
  const scrollToForm = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "cta_click", {
        event_category: "CTA",
        event_label: "Get Your Transparent Cash Offer - How We Calculate",
        page_path: window.location.pathname,
      })
    }
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
  }

  const bgClass = bgColor === "cream" ? "bg-[#FAF8F5]" : "bg-white"

  return (
    <section className={`py-12 md:py-14 ${bgClass}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
            Transparent Pricing
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a1f1a] mb-4">
            How We Calculate Your Cash Offer
          </h2>
          <p className="text-[#1a1f1a]/70 text-lg">
            No guesswork. No hidden fees. Here&apos;s exactly how we arrive at your number.
          </p>
        </div>

        {/* 5 Pillars Grid - 3+2 layout on desktop */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {pillars.slice(0, 3).map((pillar, index) => (
            <div
              key={index}
              className={`${bgColor === "cream" ? "bg-white" : "bg-[#FAF8F5]"} rounded-2xl p-6 border border-[#1a1f1a]/5`}
            >
              <div className="w-12 h-12 bg-[#008a29]/10 rounded-xl flex items-center justify-center mb-4">
                <pillar.icon className="w-6 h-6 text-[#008a29]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1f1a] mb-3">{pillar.title}</h3>
              <p className="text-[#1a1f1a]/70 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {pillars.slice(3).map((pillar, index) => (
            <div
              key={index + 3}
              className={`${bgColor === "cream" ? "bg-white" : "bg-[#FAF8F5]"} rounded-2xl p-6 border border-[#1a1f1a]/5`}
            >
              <div className="w-12 h-12 bg-[#008a29]/10 rounded-xl flex items-center justify-center mb-4">
                <pillar.icon className="w-6 h-6 text-[#008a29]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1f1a] mb-3">{pillar.title}</h3>
              <p className="text-[#1a1f1a]/70 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Closing Line */}
        <p className="text-center text-lg text-[#1a1f1a] font-medium mb-8 max-w-2xl mx-auto">
          The result: a cash offer that&apos;s fair, transparent, and puts zero burden on you.
        </p>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-[#008a29] text-white px-8 py-4 rounded-full font-medium hover:bg-[#007a24] transition-colors group shadow-lg shadow-[#008a29]/20"
          >
            Get Your Transparent Cash Offer
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
