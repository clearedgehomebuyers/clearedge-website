"use client"

import { Play } from "lucide-react"
import { useState } from "react"

export function V0VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
            Your Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a1f1a] mb-6 text-balance">
            Meet Tyler
          </h2>
          <p className="text-[#1a1f1a]/60 text-lg">
            I started ClearEdge in 2016 to help Pennsylvania homeowners sell on their terms. Here&apos;s my story.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#1a1f1a]/10 aspect-video bg-[#1a1f1a]/5">
          {!isPlaying ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[#00b332]/20 via-transparent to-[#1a1f1a]/30">
                <img
                  src="/tyler.jpg"
                  alt="Video thumbnail - Tyler from ClearEdge Home Buyers"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-[#1a1f1a]/40" />
              </div>

              {/* Play Button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Play video"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#00b332] flex items-center justify-center shadow-xl shadow-[#00b332]/30 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
                </div>
              </button>

              {/* Video Label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                  <p className="text-sm font-medium text-[#1a1f1a]">Meet Tyler, Founder</p>
                  <p className="text-xs text-[#1a1f1a]/60">3 min watch</p>
                </div>
              </div>
            </>
          ) : (
            /* YouTube Embed Placeholder - Replace VIDEO_ID with actual YouTube video ID */
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&rel=0"
              title="ClearEdge Home Buyers Introduction"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-2xl font-semibold text-[#00b332]">200+</p>
            <p className="text-xs text-[#1a1f1a]/60">Happy Sellers</p>
          </div>
          <div className="text-center border-x border-[#1a1f1a]/10">
            <p className="text-2xl font-semibold text-[#00b332]">24hrs</p>
            <p className="text-xs text-[#1a1f1a]/60">Avg. Offer Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-[#00b332]">$0</p>
            <p className="text-xs text-[#1a1f1a]/60">Fees to You</p>
          </div>
        </div>
      </div>
    </section>
  )
}
