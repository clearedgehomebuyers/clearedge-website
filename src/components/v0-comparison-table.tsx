import { Check, X, ArrowRight } from "lucide-react"

const comparisonData = [
  {
    feature: "Agent Commissions",
    traditional: "6% ($12,000 on $200k home)",
    clearEdge: "$0 — we don't charge fees",
  },
  {
    feature: "Repairs & Prep Work",
    traditional: "Thousands in repairs + staging",
    clearEdge: "Sell 100% as-is",
  },
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
    feature: "Closing Costs",
    traditional: "2–3% out of your pocket",
    clearEdge: "We cover closing costs",
  },
  {
    feature: "Certainty",
    traditional: "Buyers back out, deals fall through",
    clearEdge: "Guaranteed cash — no financing issues",
  },
]

export function V0ComparisonTable() {
  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
            The Clear Choice
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-6 text-balance">
            There's No Comparison
          </h2>
          <p className="text-muted-foreground text-lg">
            See exactly why selling direct to ClearEdge beats the traditional listing process — every time.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl shadow-foreground/5 overflow-hidden border border-[#00b332]/10">
          {/* Table Header */}
          <div className="grid grid-cols-3">
            <div className="p-4 md:p-6 bg-[#FAF8F5]" />
            <div className="p-4 md:p-6 bg-[#FAF8F5] text-center border-l border-[#00b332]/10">
              <p className="font-semibold text-foreground">Traditional Listing</p>
              <p className="text-xs text-muted-foreground mt-1">With a Real Estate Agent</p>
            </div>
            <div className="p-4 md:p-6 bg-[#00b332] text-center">
              <p className="font-semibold text-white">ClearEdge</p>
              <p className="text-xs text-white/80 mt-1">Direct Cash Offer</p>
            </div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 ${index !== comparisonData.length - 1 ? "border-b border-[#00b332]/10" : ""}`}
            >
              <div className="p-4 md:p-5 text-sm md:text-base font-medium text-foreground flex items-center bg-white">
                {row.feature}
              </div>
              <div className="p-4 md:p-5 text-sm text-muted-foreground border-l border-[#00b332]/10 flex items-center gap-2 bg-white">
                <X className="w-4 h-4 text-red-500 flex-shrink-0 hidden sm:block" />
                <span>{row.traditional}</span>
              </div>
              <div className="p-4 md:p-5 text-sm text-foreground border-l border-[#00b332]/10 flex items-center gap-2 bg-[#00b332]/5">
                <Check className="w-4 h-4 text-[#00b332] flex-shrink-0 hidden sm:block" />
                <span className="font-medium">{row.clearEdge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - green button */}
        <div className="text-center mt-10">
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 bg-[#00b332] text-white px-8 py-4 rounded-full font-medium hover:bg-[#009929] transition-colors group"
          >
            Get Your Cash Offer Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-muted-foreground mt-4">No fees. No obligation. Just a fair offer.</p>
        </div>
      </div>
    </section>
  )
}
