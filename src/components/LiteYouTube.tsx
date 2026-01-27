"use client"

import { useState } from "react"

interface LiteYouTubeProps {
  videoId: string
  title: string
}

export function LiteYouTube({ videoId, title }: LiteYouTubeProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Use hqdefault (always exists) instead of maxresdefault (might not exist)
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  const fallbackUrl = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`

  if (isPlaying) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&cc_load_policy=0&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  return (
    <div
      onClick={() => setIsPlaying(true)}
      className="relative aspect-video rounded-xl overflow-hidden shadow-lg cursor-pointer group"
    >
      {/* Thumbnail Image */}
      <img
        src={imgError ? fallbackUrl : thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        onError={() => setImgError(true)}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200" />

      {/* Play Button - Centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-xl transition-transform duration-200 group-hover:scale-110">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 md:w-8 md:h-8 ml-1"
            fill="#4A7C59"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
