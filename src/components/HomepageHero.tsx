'use client'

import { Phone } from 'lucide-react'

/**
 * HomepageHero - Trust-focused hero section for the homepage redesign
 *
 * Design principles:
 * - Dark slate-900 background for premium feel
 * - Clear value proposition with emotional reassurance
 * - Brand green (#00b332) for primary CTA
 * - Small trust line under CTA (not overwhelming)
 * - Mobile-first with proper touch targets
 */

export function HomepageHero() {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-slate-900 text-white pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main headline - preserving exact content */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
          Sell Your Pennsylvania House Fast — For Cash, On Your Terms
        </h1>

        {/* Subheadline - preserving exact content */}
        <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          No repairs. No agents. No fees. Get a fair cash offer in 24 hours from a local buyer who&apos;s helped hundreds of Eastern PA homeowners since 2016.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={scrollToForm}
            className="px-8 py-4 bg-[#00b332] hover:bg-[#009929] text-white font-semibold rounded-lg transition-colors text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b332] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Get My Cash Offer
          </button>
          <a
            href="tel:5709042059"
            className="flex items-center justify-center gap-2 px-8 py-4 border border-slate-500 hover:border-white text-white rounded-lg transition-colors text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <Phone className="w-5 h-5" />
            <span>Call Tyler: (570) 904-2059</span>
          </a>
        </div>

        {/* Trust line - subtle, not overwhelming */}
        <p className="text-slate-300 text-base font-medium">
          Serving NEPA, Lehigh Valley, and the Poconos
        </p>
      </div>
    </section>
  )
}
