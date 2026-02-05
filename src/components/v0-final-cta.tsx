"use client"

import { ArrowRight } from "lucide-react"

export function V0FinalCta() {
  return (
    <section className="py-12 md:py-14 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a] mb-4">
          Ready to Get Your Cash Offer?
        </h2>
        <p className="text-[#1a1f1a]/70 mb-6">
          No obligation. No pressure. Just a fair offer you can count on.
        </p>
        <a
          href="#lead-form"
          onClick={() => {
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'cta_click', {
                event_category: 'CTA',
                event_label: 'Get Your Free Offer - Final CTA',
                page_path: window.location.pathname
              });
            }
          }}
          className="inline-flex items-center justify-center gap-2 bg-[#008a29] text-white px-8 py-4 rounded-full font-medium hover:bg-[#007a24] transition-all group shadow-lg shadow-[#008a29]/20"
        >
          Get Your Free Offer
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  )
}
