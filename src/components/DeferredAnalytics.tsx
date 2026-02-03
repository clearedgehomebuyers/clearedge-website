"use client"

import { useEffect } from "react"

export function DeferredAnalytics() {
  useEffect(() => {
    // Initialize dataLayer and gtag IMMEDIATELY so it's available for form submissions
    // Events will queue in dataLayer and be sent once the script loads
    window.dataLayer = window.dataLayer || []
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag
    gtag("js", new Date())
    gtag("config", "G-1H6CPZVB8D")

    // Defer loading the actual GA4 script for performance
    const loadScript = () => {
      const script = document.createElement("script")
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-1H6CPZVB8D"
      script.async = true
      document.head.appendChild(script)
    }

    // Use requestIdleCallback with 2000ms timeout fallback
    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadScript, { timeout: 2000 })
    } else {
      setTimeout(loadScript, 2000)
    }
  }, [])

  return null
}

// TypeScript declarations for global window properties
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}
