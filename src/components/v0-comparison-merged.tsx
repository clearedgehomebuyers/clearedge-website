"use client"

import { ArrowRight, CheckCircle } from "lucide-react"
import { trackMetaCTAClick } from "@/lib/meta-pixel"

const costBreakdown = [
  {
    expense: "Repairs & Preparation",
    traditional: "You choose what to complete; cost depends on the property and listing plan",
    clearEdge: "No seller repairs required under our as-is purchase agreement",
  },
  {
    expense: "Broker Compensation",
    traditional: "Negotiable; use the amount in your listing and buyer agreements",
    clearEdge: "No agent commission or ClearEdge fee",
  },
  {
    expense: "Holding Costs",
    traditional: "Your actual mortgage, tax, insurance, utility, and maintenance costs continue until closing",
    clearEdge: "A shorter closing can reduce them, but they are not automatically $0",
  },
  {
    expense: "Transfer & Settlement Costs",
    traditional: "The purchase agreement and closing statement determine the seller-paid amount",
    clearEdge: "Our written offer states which agreed seller costs ClearEdge covers",
  },
  {
    expense: "Mortgage, Liens & Delinquent Taxes",
    traditional: "Deducted from seller proceeds when owed",
    clearEdge: "Also deducted when owed; a cash sale does not erase property obligations",
  },
]

const featureComparison = [
  {
    feature: "Time to Close",
    traditional: "Depends on preparation, market response, the accepted contract, and financing",
    clearEdge: "Target as few as 7 days when title is ready, or schedule up to 60 days",
  },
  {
    feature: "Showings & Open Houses",
    traditional: "The number and format depend on your marketing plan",
    clearEdge: "Normally one ClearEdge walkthrough and no public open house",
  },
  {
    feature: "Repairs & Inspections",
    traditional: "Buyer may request repairs after inspection",
    clearEdge: "Sell 100% as-is, any condition",
  },
  {
    feature: "Certainty of Closing",
    traditional: "May depend on financing, appraisal, and inspection contingencies",
    clearEdge: "No buyer-financing contingency; title and the other written contract terms still apply",
  },
]

export function V0ComparisonMerged() {
  return (
    <section className="py-12 md:py-12 bg-surface-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 animate-on-scroll">
          <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
            Compare the Contracts
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-ce-ink mb-4">
            Compare the Costs and Tradeoffs That Actually Apply
          </h2>
          <p className="text-ce-ink/70 text-lg">
            There is no honest one-size-fits-all total. Compare the actual sale price, repairs, timing, compensation, and seller costs in your two written agreements.
          </p>
        </div>

        {/* Hidden Cost Table - Desktop */}
        <div className="mb-6 animate-on-scroll stagger-1">
          <h3 className="font-semibold text-ce-ink text-lg mb-4 text-center">Costs to Check Before You Choose</h3>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-ce-green shadow-lg bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white text-ce-ink border-b border-ce-ink/10">
                  <th className="text-left py-4 px-6 font-semibold">Expense</th>
                  <th className="text-center py-4 px-6 font-semibold border-l border-ce-ink/10">
                    Traditional Listing
                    <span className="block font-normal text-ce-ink/70 text-sm">Your agreements</span>
                  </th>
                  <th className="text-center py-4 px-6 font-semibold bg-ce-green text-white border-l border-ce-ink/10 rounded-tr-xl">
                    ClearEdge
                    <span className="block font-normal text-white/90 text-sm">Written cash offer</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {costBreakdown.map((row, index) => (
                  <tr key={index} className="border-b border-ce-ink/10 bg-white">
                    <td className="py-4 px-6 font-medium text-ce-ink">{row.expense}</td>
                    <td className="py-4 px-6 text-center text-ce-ink/70 border-l border-ce-ink/10">{row.traditional}</td>
                    <td className="py-4 px-6 text-center text-ce-ink font-medium bg-ce-green-subtle border-l border-ce-ink/10">{row.clearEdge}</td>
                  </tr>
                ))}
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
                    <span className="w-2 h-2 rounded-full bg-ce-ink/30 flex-shrink-0" />
                    <span className="text-sm text-ce-ink/70">Traditional: {row.traditional}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-ce-green-subtle rounded-lg px-3 py-1.5">
                    <CheckCircle className="w-4 h-4 text-ce-green flex-shrink-0" />
                    <span className="text-sm text-ce-green font-semibold">ClearEdge: {row.clearEdge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-ce-ink/70 text-sm mt-3 text-center">
            Use your actual agreements and closing estimates. Mortgage payoffs, liens, taxes, prorations, and property-specific obligations can reduce proceeds in either route.
          </p>
        </div>

        {/* Feature Comparison - Desktop */}
        <div className="animate-on-scroll stagger-2">
          {/* Desktop Grid */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl shadow-ce-ink/5 overflow-hidden border border-ce-green">
            {/* Table Header */}
            <div className="grid grid-cols-3 items-center border-b border-ce-ink/10">
              <div className="py-4 px-6 bg-white">
                <p className="font-semibold text-ce-ink">Feature</p>
              </div>
              <div className="py-4 px-6 bg-white text-center border-l border-ce-ink/10">
                <p className="font-semibold text-ce-ink">Traditional Listing</p>
              </div>
              <div className="py-4 px-6 bg-ce-green text-center border-l border-ce-ink/10 self-stretch flex flex-col justify-center">
                <span className="text-white/80 text-xs font-semibold uppercase tracking-wide">Direct option</span>
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
                  <span className="w-2 h-2 rounded-full bg-ce-ink/25 flex-shrink-0" />
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
                    <span className="w-2 h-2 rounded-full bg-ce-ink/25 flex-shrink-0 mt-1.5" />
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
                  page_path: window.location.pathname,
                  cta_location: 'home_comparison'
                });
              }
              trackMetaCTAClick('Get Your Cash Offer Now - Comparison', 'home_comparison')
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
