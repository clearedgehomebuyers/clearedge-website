"use client"

import { ChevronDown, ArrowRight } from "lucide-react"
import { useState } from "react"
import { LiteYouTube } from "./LiteYouTube"

export function V0VideoSection() {
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false)

  const transcript = `Selling a property in Pennsylvania is tedious and overwhelming, especially if you're facing a difficult situation. I'm Tyler with Clear Edge Home Buyers. We provide Pennsylvania homeowners a transparent, stress-free alternative to the traditional real estate route. We aren't a national franchise. We're a local family-owned company that's purchased over 200 homes since 2016 across Northeastern Pennsylvania, the Lehigh Valley, and the Poconos. Whether you're in Allentown, Scranton, or Bethlehem, we do the heavy lifting. We provide a full cash offer within 24 hours with zero obligation. That means no realtor commissions, no fees, and no cleaning or repairs. You won't have to lift a finger even if the property has code violations, is in probate, or is facing foreclosure. We've seen it all and we can handle it for you. With Clear Edge, you'll always get a straight, truthful answer. Visit ClearEdgeHomeBuyers.com or call us today for your no-obligation cash offer, and let us help you move on to what's next.`

  const scrollToForm = () => {
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
          <div className="text-center mb-8">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
              Real Help from Local People
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a1f1a] mb-6 text-balance">
              A Faster, Easier Way to Sell Your Pennsylvania Home
            </h2>
            <p className="text-[#1a1f1a]/70 text-lg max-w-2xl mx-auto">
              Selling a house in Pennsylvania is a big decision. You deserve a transparent process from someone who actually knows Northeastern PA, the Lehigh Valley, and the Poconos. Watch this 60-second message from our founder, Tyler.
            </p>
          </div>

          {/* Video Container - Lite YouTube Facade (no JS until click) */}
          <LiteYouTube
            videoId="YS6uDgxIjiI"
            title="Sell Your House Fast in PA | Clear Edge Home Buyers"
          />

          {/* Collapsible Transcript */}
          <div className="mt-4">
            <button
              onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
              className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] rounded-xl border border-[#1a1f1a]/10 hover:border-[#008a29]/20 transition-colors"
              aria-expanded={isTranscriptOpen}
            >
              <span className="font-medium text-[#1a1f1a]">Video Transcript</span>
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isTranscriptOpen ? "bg-[#008a29] text-white" : "bg-[#008a29]/10 text-[#008a29]"
                }`}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
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
              <div className={`p-4 pb-6 mt-2 bg-[#FAF8F5] rounded-xl border border-[#1a1f1a]/10 ${
                isTranscriptOpen ? "max-h-[380px] overflow-y-auto" : ""
              }`}>
                <p className="text-[#1a1f1a]/70 leading-relaxed text-sm">
                  {transcript}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width CTA bar - matches Trust Bar styling */}
      <div className="py-6 md:py-8 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl md:text-2xl font-serif text-[#1a2e1a] mb-6">
            Ready for your straight, truthful answer?
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-[#008a29] text-white px-8 py-4 rounded-full font-medium hover:bg-[#007a24] transition-colors group shadow-lg shadow-[#008a29]/20"
          >
            Get My Cash Offer Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-[#1a2e1a]/70 mt-4 font-medium">
            No Obligation. No Fees. No Repairs.
          </p>
        </div>
      </div>
    </section>
  )
}
