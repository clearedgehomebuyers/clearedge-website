"use client"

import { useEffect, useRef, useState } from "react"

interface LiteYouTubeProps {
  videoId: string
  title: string
}

// Preconnect to YouTube origins so the iframe loads faster after tap.
// Called on first hover/touch — by the time the user taps, the TCP+TLS
// handshake is already done, keeping us inside the browser's gesture timeout.
let preconnected = false
function warmConnections() {
  if (preconnected) return
  preconnected = true
  for (const origin of ['https://www.youtube.com', 'https://www.google.com', 'https://i.ytimg.com']) {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = origin
    document.head.appendChild(link)
  }
}

export function LiteYouTube({ videoId, title }: LiteYouTubeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imgError, setImgError] = useState(false)

  // Use hqdefault (always exists) instead of maxresdefault (might not exist)
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  const fallbackUrl = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Warm YouTube connections on first hover/touch so iframe loads faster on tap
    const handleWarm = () => warmConnections()
    container.addEventListener('pointerover', handleWarm, { once: true })

    // CRITICAL: Use a native DOM event listener — NOT React's onClick.
    // React 18's event delegation processes clicks through the fiber tree,
    // which can break the browser's user gesture chain on mobile.
    // Native listeners fire directly from the user tap, preserving the
    // gesture context that YouTube's embed needs for autoplay=1 to work.
    const handleClick = () => {
      if (container.querySelector('iframe')) return

      // Track video play in GA4
      if (window.gtag) {
        window.gtag('event', 'video_play', {
          event_category: 'Video',
          event_label: 'Homepage Intro Video',
          page_path: window.location.pathname
        });
      }

      // Ensure connections are warm even if user tapped without hovering first
      warmConnections()

      const iframe = document.createElement('iframe')
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&cc_load_policy=0`
      iframe.title = title
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      iframe.allowFullscreen = true
      Object.assign(iframe.style, {
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
        border: 'none',
        zIndex: '10',
      })

      container.appendChild(iframe)
    }

    container.addEventListener('click', handleClick)

    return () => {
      container.removeEventListener('pointerover', handleWarm)
      container.removeEventListener('click', handleClick)
    }
  }, [videoId, title])

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer group"
      style={{ aspectRatio: '16/9' }}
    >
      {/* Thumbnail Image - explicit dimensions for layout stability */}
      <img
        src={imgError ? fallbackUrl : thumbnailUrl}
        alt={title}
        width={800}
        height={450}
        className="w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        onError={() => setImgError(true)}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-200" />

      {/* YouTube Play Button - Red rounded rectangle with white triangle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="transition-transform duration-200 group-hover:scale-110">
          <svg viewBox="0 0 68 48" width="68" height="48">
            {/* Red rounded rectangle background */}
            <path
              d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
              fill="#FF0000"
            />
            {/* White triangle play icon */}
            <path d="M45,24L27,14v20L45,24z" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  )
}
