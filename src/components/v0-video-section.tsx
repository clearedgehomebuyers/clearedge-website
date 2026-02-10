"use client"

import { ChevronDown, ArrowRight, CheckCircle } from "lucide-react"
import { useState } from "react"
import { LiteYouTube } from "./LiteYouTube"

// Quick Answer bullets for featured snippet optimization
const quickAnswers = [
  "Cash offer within 24 hours — no waiting for mortgage approvals or buyer financing",
  "Close in as few as 7 days or up to 60 — you pick the date that works for your life",
  "Sell 100% as-is — foundation issues, mold, fire damage, hoarding, code violations, we buy it all",
  "Zero fees, zero agent commissions, zero closing costs — the offer you accept is the amount you receive",
  "Local family-owned PA company since 2016 — 200+ homes purchased across 21 Eastern PA markets",
]

export function V0VideoSection() {
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false)

  const transcript = `Selling a property in Pennsylvania is tedious and overwhelming, especially if you're facing a difficult situation. I'm Tyler with ClearEdge Home Buyers. We provide Pennsylvania homeowners a transparent, stress-free alternative to the traditional real estate route. We aren't a national franchise. We're a local family-owned company that's purchased over 200 homes since 2016 across Northeastern Pennsylvania, the Lehigh Valley, and the Poconos. Whether you're in Allentown, Scranton, or Bethlehem, we do the heavy lifting. We provide a full cash offer within 24 hours with zero obligation. That means no realtor commissions, no fees, and no cleaning or repairs. You won't have to lift a finger even if the property has code violations, is in probate, or is facing foreclosure. We've seen it all and we can handle it for you. With ClearEdge, you'll always get a straight, truthful answer. Visit ClearEdgeHomeBuyers.com or call us today for your no-obligation cash offer, and let us help you move on to what's next.`

  const scrollToForm = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        event_label: 'Get My Cash Offer Now - Video Section',
        page_path: window.location.pathname
      });
    }
    const form = document.getElementById('lead-form')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="bg-white">
      {/* Main content area */}
      <div className="py-12 md:py-16">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 animate-on-scroll">
            <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
              Real Help from Local People
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-ce-ink mb-6 text-balance">
              Meet Tyler — The Person Behind Every ClearEdge Offer
            </h2>
            <p className="text-ce-ink/70 text-lg max-w-2xl mx-auto">
              You&apos;re not selling to a faceless corporation. Tyler personally reviews every property and makes every offer. Here&apos;s a 60-second look at who we are and how we work.
            </p>
          </div>

          {/* Video Container - Lite YouTube Facade (no JS until click) */}
          <div className="animate-on-scroll stagger-1">
            <LiteYouTube
              videoId="YS6uDgxIjiI"
              title="Sell Your House Fast in PA | ClearEdge Home Buyers"
            />
          </div>

          {/* Collapsible Transcript */}
          <div className="mt-4 animate-on-scroll stagger-2">
            <button
              onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
              className="w-full flex items-center justify-between p-4 bg-surface-cream rounded-xl border border-ce-ink/10 hover:border-ce-green/20 transition-colors"
              aria-expanded={isTranscriptOpen}
            >
              <span className="font-medium text-ce-ink">Video Transcript</span>
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isTranscriptOpen ? "bg-ce-green text-white" : "bg-ce-ink/5 text-ce-ink/40"
                }`}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isTranscriptOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                isTranscriptOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <div className={`p-4 pb-6 mt-2 bg-surface-cream rounded-xl border border-ce-ink/10 ${
                isTranscriptOpen ? "max-h-[380px] overflow-y-auto" : ""
              }`}>
                <p className="text-ce-ink/70 leading-relaxed text-sm">
                  {transcript}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Answer Bullets - SEO optimization for featured snippets */}
          <div className="mt-8 bg-ce-green-subtle border border-ce-green/20 rounded-2xl p-6 md:p-8 animate-on-scroll stagger-3">
            <p className="text-ce-green font-medium text-sm uppercase tracking-wide mb-3">Why 200+ PA Homeowners Chose ClearEdge</p>
            <ul className="space-y-3">
              {quickAnswers.map((answer, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-ce-green flex-shrink-0 mt-0.5" />
                  <span className="text-ce-ink font-medium">{answer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Full-width CTA bar - matches Trust Bar styling */}
      <div className="py-6 md:py-8 bg-gradient-to-b from-surface-green-wash to-surface-green-tint">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl md:text-2xl font-serif text-ce-ink mb-6">
            Ready to find out what your house is worth in cash?
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-ce-green text-white px-8 py-4 rounded-full font-medium hover:bg-ce-green-hover shadow-green hover:shadow-green-lg hover:-translate-y-0.5 active:translate-y-0 transition-all group"
          >
            Get My Cash Offer Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-ce-ink/70 mt-4 font-medium">
            No obligation. No fees. Takes 2 minutes.
          </p>
        </div>
      </div>
    </section>
  )
}
