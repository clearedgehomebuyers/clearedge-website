"use client"

import Link from "next/link"
import { XCircle, CheckCircle, ArrowRight } from "lucide-react"

const problems = [
  "Spend $10K–$25K on repairs before you can even list",
  "Endure 3–6 months of showings, strangers, and open houses",
  "Pay 5–6% in agent commissions ($10K–$18K on a typical PA home)",
  "Watch deals fall through when buyer financing collapses",
  "Keep paying the mortgage, taxes, and insurance while you wait",
]

const solutions = [
  "Sell completely as-is — foundation cracks, mold, hoarding, we buy it all",
  "One walkthrough from our team, that's it — no open houses ever",
  "Zero fees, zero commissions, zero closing costs to you",
  "Guaranteed cash — our offers never fall through",
  "You pick your closing date: 7 days, 30 days, or 60 days",
]

export function V0ProblemSolutionMerged() {
  return (
    <>
      {/* Part 1: "Selling a House in PA Just Got Harder" - WHITE background */}
      <section className="py-12 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1f1a] mb-6">
              Selling a House in Pennsylvania Shouldn&apos;t Cost You Everything
            </h2>
            <div className="space-y-4 text-lg text-[#1a1f1a]/70">
              <p>
                Pennsylvania&apos;s 2026 building codes and municipal pre-sale inspection requirements have made traditional sales harder — and more expensive — than ever. Stricter scrutiny on unpermitted work means more surprises at closing.
              </p>
              <p>
                If your house needs repairs, has code violations, or you simply can&apos;t afford to wait 90+ days and spend thousands upfront — the traditional process isn&apos;t built for you.
              </p>
              <p className="font-semibold text-[#1a1f1a]">
                That&apos;s exactly why we started ClearEdge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: "A Better Way to Sell" comparison - BEIGE background */}
      <section className="py-12 md:py-12 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Problem/Solution Comparison */}
          <div className="text-center max-w-3xl mx-auto mb-6">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
              A Better Way to Sell
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1a1f1a] mb-4">
              What If You Could Skip All of That?
            </h3>
            <p className="text-[#1a1f1a]/70">
              We started ClearEdge in 2016 because we watched good people lose money, time, and sleep trying to sell houses the &ldquo;normal&rdquo; way. Here&apos;s how the two paths compare.
            </p>
          </div>

          {/* Problem / Solution Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-6 max-w-5xl mx-auto">
            {/* Problem Card */}
            <div className="bg-white rounded-2xl p-8 border border-[#008a29]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <h4 className="text-xl font-semibold text-[#1a1f1a]">Traditional Sale</h4>
              </div>
              <ul className="space-y-4">
                {problems.map((problem, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-[#1a1f1a]/70">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution Card */}
            <div className="bg-[#008a29]/5 rounded-2xl p-8 border border-[#008a29]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#008a29]/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#008a29]/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#008a29]" />
                  </div>
                  <h4 className="text-xl font-semibold text-[#1a1f1a]">The ClearEdge Way</h4>
                </div>
                <ul className="space-y-4">
                  {solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#008a29] flex-shrink-0 mt-0.5" />
                      <span className="text-[#1a1f1a]">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
                    event_label: 'See If Your Property Qualifies - Problem Solution',
                    page_path: window.location.pathname
                  });
                }
                document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 text-[#008a29] font-medium hover:gap-3 transition-all"
            >
              See if your property qualifies
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
