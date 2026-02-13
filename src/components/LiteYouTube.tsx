"use client"

import { useEffect, useRef, useState } from "react"

interface LiteYouTubeProps {
  videoId: string
  title: string
}

// Preconnect to YouTube origins + preload the IFrame Player API on first
// hover/touch. By the time the user taps, the API script is loaded and
// TCP+TLS handshakes are done, so player creation is near-instant.
let warmed = false
function warmConnections() {
  if (warmed) return
  warmed = true
  for (const origin of ['https://www.youtube.com', 'https://www.google.com']) {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = origin
    document.head.appendChild(link)
  }
  if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(script)
  }
}

export function LiteYouTube({ videoId, title }: LiteYouTubeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imgError, setImgError] = useState(false)

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  const fallbackUrl = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Warm connections on first hover/touch
    const handleWarm = () => warmConnections()
    container.addEventListener('pointerover', handleWarm, { once: true })

    // Native click listener (not React onClick) to preserve user gesture chain
    const handleClick = () => {
      if (container.dataset.activated === 'true') return
      container.dataset.activated = 'true'

      // GA4 tracking
      if (window.gtag) {
        window.gtag('event', 'video_play', {
          event_category: 'Video',
          event_label: 'Homepage Intro Video',
          page_path: window.location.pathname
        })
      }

      warmConnections()

      // Swap play button for a loading spinner
      const playBtn = container.querySelector('[data-playbtn]') as HTMLElement
      if (playBtn) {
        playBtn.innerHTML = '<div class="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>'
      }

      // Create placeholder div that YT.Player will replace with an iframe
      const playerDiv = document.createElement('div')
      const playerId = 'yt-player-' + Date.now()
      playerDiv.id = playerId
      Object.assign(playerDiv.style, {
        position: 'absolute',
        inset: '0',
        zIndex: '10',
      })
      container.appendChild(playerDiv)

      const createPlayer = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new (window as any).YT.Player(playerId, {
          videoId,
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            mute: 1, // Muted autoplay is ALWAYS allowed on mobile
            rel: 0,
            modestbranding: 1,
            cc_load_policy: 0,
          },
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReady: (event: any) => {
              const iframe = event.target.getIframe()
              Object.assign(iframe.style, {
                position: 'absolute',
                inset: '0',
                width: '100%',
                height: '100%',
                border: 'none',
                zIndex: '10',
              })
              // Muted autoplay is guaranteed on mobile. User can
              // unmute via YouTube's native controls (video has
              // burned-in captions so muted start is fine).
              event.target.playVideo()
              if (playBtn) playBtn.remove()
            },
          },
        })
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).YT?.Player) {
        createPlayer()
      } else {
        // API still loading — queue up for when it's ready
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const prev = (window as any).onYouTubeIframeAPIReady
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).onYouTubeIframeAPIReady = () => {
          if (typeof prev === 'function') prev()
          createPlayer()
        }
      }
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
        loading="lazy"
        onError={() => setImgError(true)}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-200" />

      {/* Play Button — replaced with spinner on tap */}
      <div data-playbtn className="absolute inset-0 flex items-center justify-center">
        <div className="transition-transform duration-200 group-hover:scale-110">
          <svg viewBox="0 0 68 48" width="68" height="48">
            <path
              d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
              fill="#FF0000"
            />
            <path d="M45,24L27,14v20L45,24z" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  )
}
