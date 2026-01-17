"use client"

import { Check, X, ArrowRight } from "lucide-react"

const costBreakdown = [
  { expense: "Repairs Before Listing", traditional: "$15,000+", clearEdge: "$0" },
  { expense: "Holding Costs (Taxes, Utilities, Insurance)", traditional: "$4,500+", clearEdge: "$0" },
  { expense: "Agent Commissions (6%)", traditional: "$12,000", clearEdge: "$0" },
  { expense: "Closing Cost Contributions", traditional: "$3,000+", clearEdge: "$0" },
]

const featureComparison = [
  {
    feature: "Time to Close",
    traditional: "60–90+ days (if it sells)",
    clearEdge: "As fast as 7 days",
  },
  {
    feature: "Showings",
    traditional: "Dozens of strangers in your home",
    clearEdge: "One visit from our team",
  },
  {
    feature: "Repairs Required",
    traditional: "Must fix to list",
    clearEdge: "Sell 100% as-is",
  },
  {
    feature: "Certainty",
    traditional: "Buyers back out, deals fall through",
    clearEdge: "Guaranteed cash — no financing issues",
  },
]

export function V0ComparisonMerged() {
  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
            The Clear Choice
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a1f1a] mb-4">
            Traditional Sale vs. ClearEdge
          </h2>
          <p className="text-[#1a1f1a]/70 text-lg">
            When you list traditionally, you&apos;re not just waiting — you&apos;re paying. See the real difference.
          </p>
        </div>

        {/* Hidden Cost Table */}
        <div className="mb-12">
          <h3 className="font-semibold text-[#1a1f1a] text-lg mb-4 text-center">The Hidden Cost of Waiting</h3>
          <div className="overflow-x-auto rounded-xl border border-[#00b332] shadow-lg bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white text-[#1a1f1a] border-b border-[#1a1f1a]/10">
                  <th className="text-left py-4 px-6 font-semibold">Expense</th>
                  <th className="text-center py-4 px-6 font-semibold border-l border-[#1a1f1a]/10">
                    Traditional
                    <span className="block font-normal text-[#1a1f1a]/70 text-sm">(90 Days)</span>
                  </th>
                  <th className="text-center py-4 px-6 font-semibold bg-[#00b332] text-white border-l border-[#1a1f1a]/10">
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
                    <td className="py-4 px-6 text-center text-[#00b332] font-semibold bg-[#e6f7eb] border-l border-[#1a1f1a]/10">{row.clearEdge}</td>
                  </tr>
                ))}
                <tr className="bg-white text-[#1a1f1a]">
                  <td className="py-4 px-6 font-bold">Total Out-of-Pocket Risk</td>
                  <td className="py-4 px-6 text-center font-bold text-red-600 border-l border-[#1a1f1a]/10">$34,500+</td>
                  <td className="py-4 px-6 text-center font-bold text-white bg-[#00b332] border-l border-[#1a1f1a]/10">$0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#1a1f1a]/70 text-sm mt-3 italic text-center">
            *Based on a $200,000 home with typical Eastern PA repair needs and 90-day market time.
          </p>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl shadow-[#1a1f1a]/5 overflow-hidden border border-[#00b332]">
          {/* Table Header */}
          <div className="grid grid-cols-3 border-b border-[#1a1f1a]/10">
            <div className="p-4 md:p-6 bg-white">
              <p className="font-semibold text-[#1a1f1a]">Feature</p>
            </div>
            <div className="p-4 md:p-6 bg-white text-center border-l border-[#1a1f1a]/10">
              <p className="font-semibold text-[#1a1f1a]">Traditional Listing</p>
            </div>
            <div className="p-4 md:p-6 bg-[#00b332] text-center border-l border-[#1a1f1a]/10">
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
              <div className="p-4 md:p-5 text-sm text-[#1a1f1a] border-l border-[#1a1f1a]/10 flex items-center gap-2 bg-[#00b332]/5">
                <Check className="w-4 h-4 text-[#00b332] flex-shrink-0 hidden sm:block" />
                <span className="font-medium">{row.clearEdge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 bg-[#00b332] text-white px-8 py-4 rounded-full font-medium hover:bg-[#009929] transition-colors group"
          >
            Get Your Cash Offer Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-[#1a1f1a]/70 mt-4">No fees. No obligation. Just a fair offer.</p>
        </div>
      </div>
    </section>
  )
}
