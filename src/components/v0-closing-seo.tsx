"use client"

import { ArrowRight } from "lucide-react"

export function V0ClosingSeo() {
  return (
    <section className="py-16 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a] mb-4">
          Ready to Get Your Cash Offer?
        </h3>
        <p className="text-[#1a1f1a]/60 text-lg mb-6">
          If you need to sell your house fast in Pennsylvania, ClearEdge Home Buyers offers a straightforward path to closing — on your terms, on your timeline.
        </p>
        <a
          href="#lead-form"
          className="inline-flex items-center justify-center gap-2 bg-[#00b332] text-white px-8 py-4 rounded-full font-medium hover:bg-[#009929] transition-all group shadow-lg shadow-[#00b332]/20"
        >
          Get Your Free Offer
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  )
}
