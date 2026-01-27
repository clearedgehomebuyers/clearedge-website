"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function V0VideoSection() {
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false)

  const transcript = `Selling a property in Pennsylvania is tedious and overwhelming, especially if you're facing a difficult situation. I'm Tyler with Clear Edge Home Buyers. We provide Pennsylvania homeowners a transparent, stress-free alternative to the traditional real estate route. We aren't a national franchise. We're a local family-owned company that's purchased over 200 homes since 2016 across Northeastern Pennsylvania, the Lehigh Valley, and the Poconos. Whether you're in Allentown, Scranton, or Bethlehem, we do the heavy lifting. We provide a full cash offer within 24 hours with zero obligation. That means no realtor commissions, no fees, and no cleaning or repairs. You won't have to lift a finger even if the property has code violations, is in probate, or is facing foreclosure. We've seen it all and we can handle it for you. With Clear Edge, you'll always get a straight, truthful answer. Visit ClearEdgeHomeBuyers.com or call us today for your no-obligation cash offer, and let us help you move on to what's next.`

  return (
    <section className="py-12 md:py-12 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#1a1f1a]/10 aspect-video bg-[#1a1f1a]/5">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube-nocookie.com/embed/YS6uDgxIjiI?rel=0&modestbranding=1&cc_load_policy=0"
            title="Sell Your House Fast in PA | Clear Edge Home Buyers"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            loading="lazy"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Collapsible Transcript */}
        <div className="mt-4">
          <button
            onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-[#1a1f1a]/10 hover:border-[#008a29]/20 transition-colors"
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
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isTranscriptOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 mt-2 bg-white rounded-xl border border-[#1a1f1a]/10">
              <p className="text-[#1a1f1a]/70 leading-relaxed text-sm">
                {transcript}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
