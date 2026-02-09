"use client"

import { Check, X, ArrowRight } from "lucide-react"

const costBreakdown = [
  { expense: "Repairs & Pre-Sale Inspections", traditional: "$15,000–$25,000", clearEdge: "$0" },
  { expense: "Holding Costs (Mortgage, Taxes, Insurance)", traditional: "$3,000–$6,000", clearEdge: "$0" },
  { expense: "Agent Commissions (5–6%)", traditional: "$10,000–$18,000", clearEdge: "$0" },
  { expense: "Closing Costs & Title Fees", traditional: "$3,000–$5,000", clearEdge: "$0 (we pay)" },
]

const featureComparison = [
  {
    feature: "Time to Close",
    traditional: "90–180 days average in PA",
    clearEdge: "7–30 days, your choice",
  },
  {
    feature: "Showings & Open Houses",
    traditional: "Dozens of strangers walking through",
    clearEdge: "One walkthrough, that's it",
  },
  {
    feature: "Repairs & Inspections",
    traditional: "Must fix to pass 2026 PA inspections",
    clearEdge: "Sell 100% as-is, any condition",
  },
  {
    feature: "Certainty of Closing",
    traditional: "38% of deals fall through nationally",
    clearEdge: "Cash in hand — guaranteed close",
  },
]

export function V0ComparisonMerged() {
  return (
    <section className="py-12 md:py-12 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
            The Clear Choice
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a1f1a] mb-4">
            The Real Cost of Listing vs. Selling to ClearEdge
          </h2>
          <p className="text-[#1a1f1a]/70 text-lg">
            Most homeowners don&apos;t realize how much a traditional sale actually costs until they&apos;re deep into the process. Here&apos;s the math on a typical Eastern PA home.
          </p>
        </div>

        {/* Hidden Cost Table */}
        <div className="mb-6">
          <h3 className="font-semibold text-[#1a1f1a] text-lg mb-4 text-center">What a Traditional Sale Really Costs You</h3>
          <div className="overflow-x-auto rounded-xl border border-[#008a29] shadow-lg bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white text-[#1a1f1a] border-b border-[#1a1f1a]/10">
                  <th className="text-left py-4 px-6 font-semibold">Expense</th>
                  <th className="text-center py-4 px-6 font-semibold border-l border-[#1a1f1a]/10">
                    Traditional
                    <span className="block font-normal text-[#1a1f1a]/70 text-sm">(90 Days)</span>
                  </th>
                  <th className="text-center py-4 px-6 font-semibold bg-[#008a29] text-white border-l border-[#1a1f1a]/10">
                    ClearEdge
                    <span className="block font-normal text-white/90 text-sm">(7–30 Days)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {costBreakdown.map((row, index) => (
                  <tr key={index} className="border-b border-[#1a1f1a]/10 bg-white">
                    <td className="py-4 px-6 font-medium text-[#1a1f1a]">{row.expense}</td>
                    <td className="py-4 px-6 text-center text-red-600 font-semibold border-l border-[#1a1f1a]/10">{row.traditional}</td>
                    <td className="py-4 px-6 text-center text-[#008a29] font-semibold bg-[#e6f7eb] border-l border-[#1a1f1a]/10">{row.clearEdge}</td>
                  </tr>
                ))}
                <tr className="bg-white text-[#1a1f1a]">
                  <td className="py-4 px-6 font-bold">Total Out-of-Pocket Cost</td>
                  <td className="py-4 px-6 text-center font-bold text-red-600 border-l border-[#1a1f1a]/10">$31,000–$54,000</td>
                  <td className="py-4 px-6 text-center font-bold text-white bg-[#008a29] border-l border-[#1a1f1a]/10">$0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#1a1f1a]/70 text-sm mt-3 italic text-center">
            *Ranges based on a $200,000–$300,000 Eastern PA home with typical repair needs and 90–180 day market time (2026 data).
          </p>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl shadow-[#1a1f1a]/5 overflow-hidden border border-[#008a29]">
          {/* Table Header */}
          <div className="grid grid-cols-3 border-b border-[#1a1f1a]/10">
            <div className="p-4 md:p-6 bg-white">
              <p className="font-semibold text-[#1a1f1a]">Feature</p>
            </div>
            <div className="p-4 md:p-6 bg-white text-center border-l border-[#1a1f1a]/10">
              <p className="font-semibold text-[#1a1f1a]">Traditional Listing</p>
            </div>
            <div className="p-4 md:p-6 bg-[#008a29] text-center border-l border-[#1a1f1a]/10">
              <p className="font-semibold text-white">ClearEdge</p>
            </div>
          </div>

          {/* Table Rows */}
          {featureComparison.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 ${index !== featureComparison.length - 1 ? "border-b border-[#1a1f1a]/10" : ""}`}
            >
              <div className="p-4 md:p-5 text-sm md:text-base font-medium text-[#1a1f1a] flex items-center bg-white">
                {row.feature}
              </div>
              <div className="p-4 md:p-5 text-sm text-[#1a1f1a]/70 border-l border-[#1a1f1a]/10 flex items-center gap-2 bg-white">
                <X className="w-4 h-4 text-red-500 flex-shrink-0 hidden sm:block" />
                <span>{row.traditional}</span>
              </div>
              <div className="p-4 md:p-5 text-sm text-[#1a1f1a] border-l border-[#1a1f1a]/10 flex items-center gap-2 bg-[#008a29]/5">
                <Check className="w-4 h-4 text-[#008a29] flex-shrink-0 hidden sm:block" />
                <span className="font-medium">{row.clearEdge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-6">
          <a
            href="#lead-form"
            onClick={(e) => {
              e.preventDefault()
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'cta_click', {
                  event_category: 'CTA',
                  event_label: 'Get Your Cash Offer Now - Comparison',
                  page_path: window.location.pathname
                });
              }
              document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 bg-[#008a29] text-white px-8 py-4 rounded-full font-medium hover:bg-[#007a24] transition-colors group"
          >
            See What We&apos;d Offer for Your House
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-[#1a1f1a]/70 mt-4">No fees. No obligation. Takes 2 minutes.</p>
        </div>
      </div>
    </section>
  )
}
