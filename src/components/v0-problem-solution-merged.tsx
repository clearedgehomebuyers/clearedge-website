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
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-ce-ink mb-6">
              Selling a House in Pennsylvania Shouldn&apos;t Cost You Everything
            </h2>
            <div className="space-y-4 text-lg text-ce-ink/70">
              <p>
                You already know the math doesn&apos;t work. Realtors want $15,000 or more in repairs before they&apos;ll even list your Pennsylvania home. Then you wait 4 to 6 months while buyers fall through, inspections fail, and you keep paying the mortgage on a house you need gone. The 2026 municipal inspection requirements and building codes across PA have only made this process slower, more expensive, and more stressful for homeowners.
              </p>
              <p>
                If your house needs repairs, has code violations, or you simply can&apos;t afford to wait 90+ days and spend thousands upfront — the traditional process isn&apos;t built for you.
              </p>
              <p className="font-semibold text-ce-ink">
                That&apos;s exactly why we started ClearEdge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: "A Better Way to Sell" comparison - BEIGE background */}
      <section className="py-12 md:py-16 bg-surface-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Problem/Solution Comparison */}
          <div className="text-center max-w-3xl mx-auto mb-8 animate-on-scroll">
            <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
              A Better Way to Sell
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ce-ink mb-4">
              What If You Could Skip All of That?
            </h3>
            <p className="text-ce-ink/70">
              We started ClearEdge in 2016 because we watched good people lose money, time, and sleep trying to sell houses the &ldquo;normal&rdquo; way. Here&apos;s how the two paths compare.
            </p>
          </div>

          {/* Problem / Solution Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Problem Card */}
            <div className="animate-on-scroll animate-from-left bg-white rounded-2xl p-8 border-l-4 border-l-red-400 border border-ce-ink/10 shadow-sm hover:shadow-card-hover transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <h4 className="text-xl font-semibold text-ce-ink">Traditional Sale</h4>
              </div>
              <ul className="space-y-4">
                {problems.map((problem, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-ce-ink/70">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution Card */}
            <div className="animate-on-scroll animate-from-right bg-ce-green-subtle rounded-2xl p-8 border border-ce-green/20 relative overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ce-green/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-ce-green/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-ce-green" />
                  </div>
                  <h4 className="text-xl font-semibold text-ce-ink">The ClearEdge Way</h4>
                </div>
                <ul className="space-y-4">
                  {solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-ce-green flex-shrink-0 mt-0.5" />
                      <span className="text-ce-ink">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-8 animate-on-scroll stagger-3">
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
              className="inline-flex items-center gap-2 text-ce-green font-medium link-animated"
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
