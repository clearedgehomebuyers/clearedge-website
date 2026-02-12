"use client"

import { ArrowRight, CheckCircle, XCircle } from "lucide-react"

const costBreakdown = [
  { expense: "Repairs & Pre-Sale Inspections", traditional: "$15,000–25,000", clearEdge: "$0" },
  { expense: "Holding Costs (Mortgage, Taxes, Insurance)", traditional: "$3,000–6,000", clearEdge: "$0" },
  { expense: "Agent Commissions (5–6%)", traditional: "$10,000–18,000", clearEdge: "$0" },
  { expense: "Closing Costs & Title Fees", traditional: "$3,000–5,000", clearEdge: "$0 (we pay)" },
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
    <section className="py-12 md:py-12 bg-surface-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 animate-on-scroll">
          <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
            The Clear Choice
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-ce-ink mb-4">
            The Real Cost of Listing vs. Selling to ClearEdge
          </h2>
          <p className="text-ce-ink/70 text-lg">
            Most homeowners don&apos;t realize how much a traditional sale actually costs until they&apos;re deep into the process. Here&apos;s the math on a typical Eastern PA home.
          </p>
        </div>

        {/* Hidden Cost Table - Desktop */}
        <div className="mb-6 animate-on-scroll stagger-1">
          <h3 className="font-semibold text-ce-ink text-lg mb-4 text-center">What a Traditional Sale Really Costs You</h3>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-ce-green shadow-lg bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white text-ce-ink border-b border-ce-ink/10">
                  <th className="text-left py-4 px-6 font-semibold">Expense</th>
                  <th className="text-center py-4 px-6 font-semibold border-l border-ce-ink/10">
                    Traditional
                    <span className="block font-normal text-ce-ink/70 text-sm">(90 Days)</span>
                  </th>
                  <th className="text-center py-4 px-6 font-semibold bg-ce-green text-white border-l border-ce-ink/10 rounded-tr-xl">
                    ClearEdge
                    <span className="block font-normal text-white/90 text-sm">(7–30 Days)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {costBreakdown.map((row, index) => (
                  <tr key={index} className="border-b border-ce-ink/10 bg-white">
                    <td className="py-4 px-6 font-medium text-ce-ink">{row.expense}</td>
                    <td className="py-4 px-6 text-center text-red-600 font-semibold border-l border-ce-ink/10">{row.traditional}</td>
                    <td className="py-4 px-6 text-center text-ce-green font-semibold bg-ce-green-subtle border-l border-ce-ink/10">{row.clearEdge}</td>
                  </tr>
                ))}
                {/* Total Row - Mic Drop */}
                <tr className="bg-white text-ce-ink">
                  <td className="py-6 px-6 font-bold text-lg">Total Out-of-Pocket Cost</td>
                  <td className="py-6 px-6 text-center font-bold text-xl md:text-2xl text-red-600 bg-red-50 border-l border-ce-ink/10">$31,000–$54,000</td>
                  <td className="py-6 px-6 text-center font-bold text-xl md:text-2xl text-white bg-ce-green border-l border-ce-ink/10">$0</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="md:hidden space-y-3">
            {costBreakdown.map((row, index) => (
              <div key={index} className="bg-white rounded-2xl border border-ce-ink/10 shadow-sm p-4">
                <p className="font-medium text-ce-ink mb-3">{row.expense}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-sm text-red-600 font-semibold">Traditional: {row.traditional}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-ce-green-subtle rounded-lg px-3 py-1.5">
                    <CheckCircle className="w-4 h-4 text-ce-green flex-shrink-0" />
                    <span className="text-sm text-ce-green font-semibold">ClearEdge: {row.clearEdge}</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Total Row - Mobile Mic Drop */}
            <div className="rounded-2xl border-2 border-ce-green shadow-lg overflow-hidden">
              <div className="p-4 bg-white">
                <p className="font-bold text-ce-ink text-lg mb-3">Total Out-of-Pocket Cost</p>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-lg text-red-600 font-bold">Traditional: $31,000–$54,000</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-ce-green px-4 py-4">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <span className="text-lg text-white font-bold">ClearEdge: $0</span>
              </div>
            </div>
          </div>

          <p className="text-ce-ink/70 text-sm mt-3 italic text-center">
            *Ranges based on a $200,000–$300,000 Eastern PA home with typical repair needs and 90–180 day market time (2026 data).
          </p>
        </div>

        {/* Feature Comparison - Desktop */}
        <div className="animate-on-scroll stagger-2">
          {/* Desktop Grid */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl shadow-ce-ink/5 overflow-hidden border border-ce-green">
            {/* Table Header */}
            <div className="grid grid-cols-3 border-b border-ce-ink/10">
              <div className="p-4 md:p-6 bg-white">
                <p className="font-semibold text-ce-ink">Feature</p>
              </div>
              <div className="p-4 md:p-6 bg-white text-center border-l border-ce-ink/10">
                <p className="font-semibold text-ce-ink">Traditional Listing</p>
              </div>
              <div className="p-4 md:p-6 bg-ce-green text-center border-l border-ce-ink/10">
                <span className="text-white/80 text-xs font-semibold uppercase tracking-wide">Recommended</span>
                <p className="font-semibold text-white">ClearEdge</p>
              </div>
            </div>

            {/* Table Rows */}
            {featureComparison.map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 ${index !== featureComparison.length - 1 ? "border-b border-ce-ink/10" : ""}`}
              >
                <div className="p-4 md:p-5 text-sm md:text-base font-medium text-ce-ink flex items-center bg-white">
                  {row.feature}
                </div>
                <div className="p-4 md:p-5 text-sm text-ce-ink/70 border-l border-ce-ink/10 flex items-center gap-2 bg-white">
                  <XCircle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                  <span>{row.traditional}</span>
                </div>
                <div className="p-4 md:p-5 text-sm text-ce-ink border-l border-ce-ink/10 flex items-center gap-2 bg-ce-green-subtle/50">
                  <CheckCircle className="w-5 h-5 text-ce-green flex-shrink-0" />
                  <span className="font-medium">{row.clearEdge}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Stacked Cards */}
          <div className="md:hidden space-y-3">
            {featureComparison.map((row, index) => (
              <div key={index} className="bg-white rounded-2xl border border-ce-ink/10 shadow-sm p-4">
                <p className="font-medium text-ce-ink mb-3">{row.feature}</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-ce-ink/60">Traditional: {row.traditional}</span>
                  </div>
                  <div className="flex items-start gap-2 bg-ce-green-subtle rounded-lg px-3 py-1.5">
                    <CheckCircle className="w-4 h-4 text-ce-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-ce-ink font-medium">ClearEdge: {row.clearEdge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-6 animate-on-scroll stagger-3">
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
            className="inline-flex items-center gap-2 bg-ce-green text-white px-8 py-4 rounded-full font-medium hover:bg-ce-green-hover transition-all shadow-green hover:shadow-green-lg hover:-translate-y-0.5 active:translate-y-0 group"
          >
            See What We&apos;d Offer for Your House
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-ce-ink/70 mt-4">No fees. No obligation. Takes 2 minutes.</p>
        </div>
      </div>
    </section>
  )
}
