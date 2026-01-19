"use client"

import { ArrowRight } from "lucide-react"

export function V0ClosingSeo() {
  return (
    <section className="py-12 md:py-14 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a] mb-4">
          Ready to Sell Your Pennsylvania House Fast?
        </h2>
        <p className="text-[#1a1f1a]/70 text-lg mb-6 leading-relaxed">
          ClearEdge Home Buyers is a local, family-owned company serving Scranton, Wilkes-Barre, Allentown, Bethlehem, and communities throughout NEPA, Lehigh Valley, and the Poconos since 2016. We buy houses in any condition — no repairs, no fees, no agents. Get your fair cash offer within 24 hours.
        </p>
        <a
          href="#lead-form"
          className="inline-flex items-center justify-center gap-2 bg-[#008a29] text-white px-8 py-4 rounded-full font-medium hover:bg-[#007a24] transition-all group shadow-lg shadow-[#008a29]/20"
        >
          Get Your Free Offer
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <p className="text-sm text-[#1a1f1a]/70 mt-4">
          No obligation. Close in as little as 7 days.
        </p>
      </div>
    </section>
  )
}
