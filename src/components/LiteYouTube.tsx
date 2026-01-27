"use client"

import { useState, useCallback } from "react"
import { Play } from "lucide-react"

interface LiteYouTubeProps {
  videoId: string
  title: string
  thumbnailQuality?: "default" | "hqdefault" | "mqdefault" | "sddefault" | "maxresdefault"
}

export function LiteYouTube({
  videoId,
  title,
  thumbnailQuality = "maxresdefault"
}: LiteYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/${thumbnailQuality}.jpg`

  const loadVideo = useCallback(() => {
    setIsLoaded(true)
  }, [])

  // If user has clicked, show the actual iframe
  if (isLoaded) {
    return (
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&cc_load_policy=0&autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    )
  }

  // Facade: thumbnail + play button (zero YouTube JS loaded)
  return (
    <button
      onClick={loadVideo}
      className="absolute inset-0 w-full h-full cursor-pointer group"
      aria-label={`Play video: ${title}`}
    >
      {/* Thumbnail */}
      <img
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay for better play button visibility */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#008a29] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#007a24] transition-all duration-200">
          <Play className="w-7 h-7 md:w-8 md:h-8 text-white fill-white ml-1" />
        </div>
      </div>
    </button>
  )
}
