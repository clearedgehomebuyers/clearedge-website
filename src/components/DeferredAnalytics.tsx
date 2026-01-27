"use client"

import { useEffect } from "react"

export function DeferredAnalytics() {
  useEffect(() => {
    const loadAnalytics = () => {
      // Load GTM script
      const script = document.createElement("script")
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-1H6CPZVB8D"
      script.async = true
      document.head.appendChild(script)

      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args)
      }
      window.gtag = gtag
      gtag("js", new Date())
      gtag("config", "G-1H6CPZVB8D")
    }

    // Use requestIdleCallback with 4000ms timeout fallback
    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadAnalytics, { timeout: 4000 })
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(loadAnalytics, 4000)
    }
  }, [])

  return null
}

// TypeScript declarations for global window properties
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}
