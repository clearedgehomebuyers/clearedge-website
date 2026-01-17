'use client'

import Image from 'next/image'
import { Phone, Clock, DollarSign, ShieldCheck, MapPin } from 'lucide-react'

/**
 * HomepageHero - v0 Design Implementation
 *
 * Design features:
 * - Cream background (#FAF8F5) with subtle dot pattern
 * - Trust badge pill at top
 * - Serif font for headline (Playfair Display)
 * - Floating property card widget on desktop (right side)
 * - Pill-shaped CTA buttons with hover lift
 * - Bottom row with trust icons
 * - Preserves ALL existing SEO content
 */

const trustFeatures = [
  { icon: Clock, label: 'Close in 7 Days' },
  { icon: DollarSign, label: 'Zero Fees' },
  { icon: ShieldCheck, label: 'No Obligation' },
  { icon: MapPin, label: 'Local PA Company' },
]

export function HomepageHero() {
  const scrollToForm = () => {
    const el = document.getElementById('lead-form')
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative bg-[#FAF8F5] pt-28 pb-16 lg:pt-32 lg:pb-80 overflow-hidden">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left content - main messaging */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Trust badge pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e6f7eb] text-[#00b332] rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-[#00b332] rounded-full animate-pulse" />
              Trusted Since 2016 &bull; 200+ Homes Purchased
            </div>

            {/* Main headline - PRESERVED EXISTING CONTENT */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1f1a] tracking-tight leading-[1.1] mb-6">
              Sell Your Pennsylvania House Fast — For Cash, On Your Terms
            </h1>

            {/* Subheadline - PRESERVED EXISTING CONTENT */}
            <p className="text-lg sm:text-xl text-[#1a1f1a]/70 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              No repairs. No agents. No fees. Get a fair cash offer in 24 hours from a local buyer who&apos;s helped hundreds of Eastern PA homeowners since 2016.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 bg-[#00b332] hover:bg-[#009929] text-white font-semibold text-lg rounded-full shadow-lg shadow-[#00b332]/20 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b332] focus-visible:ring-offset-2"
              >
                Get My Cash Offer
              </button>
              <a
                href="tel:+15709042059"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#1a1f1a]/20 hover:border-[#1a1f1a]/40 text-[#1a1f1a] rounded-full transition-all duration-200 text-lg font-medium hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                <span>Call (570) 904-2059</span>
              </a>
            </div>

            {/* Trust features row - BIGGER text */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 lg:max-w-xl">
              {trustFeatures.map((feature) => (
                <div key={feature.label} className="flex items-center gap-2.5 text-[#1a1f1a]/70">
                  <feature.icon className="w-5 h-5 text-[#00b332]" />
                  <span className="text-base font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Empty right column for desktop layout balance */}
          <div className="lg:col-span-5 hidden lg:block" />
        </div>

        {/* Bottom right floating property card - Desktop only */}
        <div className="hidden lg:block absolute bottom-8 right-8 xl:right-12">
          <div className="relative">
            {/* Main property card - BIGGER */}
            <div className="relative bg-white rounded-2xl shadow-2xl shadow-[#1a1f1a]/15 overflow-hidden border border-[#1a1f1a]/5 transform rotate-2 hover:rotate-0 transition-transform duration-300 w-[340px]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/properties/scranton-pa-cash-home-buyers-clearedge-1.jpg"
                  alt="Recently purchased home in Scranton, PA - sold as-is for cash"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              {/* Card content - BIGGER */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-[#00b332] text-white text-sm font-semibold rounded-full">
                    Just Closed
                  </span>
                </div>
                <p className="font-semibold text-xl">Scranton, PA</p>
                <p className="text-white/90 text-base">14 Days to Close</p>
              </div>
            </div>

            {/* Decorative accent behind card */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#00b332]/10 rounded-2xl -z-10" />
          </div>
        </div>

        {/* Mobile property card - shown below content on mobile */}
        <div className="lg:hidden mt-10">
          <div className="relative bg-white rounded-2xl shadow-xl shadow-[#1a1f1a]/10 overflow-hidden border border-[#1a1f1a]/5 max-w-sm mx-auto">
            <div className="relative aspect-[16/9]">
              <Image
                src="/properties/scranton-pa-cash-home-buyers-clearedge-1.jpg"
                alt="Recently purchased home in Scranton, PA - sold as-is for cash"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-[#00b332] text-white text-xs font-semibold rounded-full">
                  Just Closed
                </span>
              </div>
              <p className="font-semibold">Scranton, PA &bull; 14 Days to Close</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
