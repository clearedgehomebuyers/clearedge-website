"use client"

import { Play } from "lucide-react"
import { useState } from "react"

export function V0VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-12 md:py-12 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#1a1f1a]/10 aspect-video bg-[#1a1f1a]/5">
          {!isPlaying ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[#008a29]/20 via-transparent to-[#1a1f1a]/30">
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
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#008a29] flex items-center justify-center shadow-xl shadow-[#008a29]/30 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
                </div>
              </button>
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
      </div>
    </section>
  )
}
