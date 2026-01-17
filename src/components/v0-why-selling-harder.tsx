"use client"

import Link from "next/link"

export function V0WhySellingHarder() {
  return (
    <section className="py-16 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1f1a] mb-6">
          Selling a House in Pennsylvania Just Got Harder
        </h2>
        <div className="space-y-4 text-lg text-[#1a1f1a]/70">
          <p>
            Pennsylvania&apos;s real estate requirements tightened in 2026. New building codes. Municipal pre-sale inspections. Stricter scrutiny on unpermitted work.
          </p>
          <p>
            If your house needs repairs, has code issues, or you simply don&apos;t have 90 days to wait — the traditional sale process works against you.
          </p>
          <p className="font-semibold text-[#1a1f1a]">
            We offer a different path.
          </p>
          <p>
            ClearEdge Home Buyers purchases homes directly from homeowners throughout Eastern PA. No agents. No listings. No waiting for a buyer who might back out.
          </p>
          <p>
            You get a cash offer. You pick the closing date. We handle the rest.
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/how-it-works"
            className="text-[#008a29] hover:text-[#007a24] font-medium inline-flex items-center gap-1"
          >
            See How It Works
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
