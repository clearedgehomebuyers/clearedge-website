"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const ALIGNMENT_DELAYS = [0, 120, 400]
const SUPPORTED_FORM_TARGETS = new Set(["lead-form", "contact-form", "sms-lead-form"])

function getHashTarget() {
  if (!window.location.hash) return null

  try {
    const targetId = decodeURIComponent(window.location.hash.slice(1))
    if (!SUPPORTED_FORM_TARGETS.has(targetId)) return null
    return document.getElementById(targetId)
  } catch {
    return null
  }
}

/**
 * Re-align cross-page anchors after hydration and early layout settling.
 * Native hash scrolling can run before deferred sections reach their final
 * height, which leaves the lead-form heading behind the fixed header. Any
 * deliberate user interaction cancels the remaining adjustments.
 */
export function HashScrollRestorer() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith("/studio")) return

    let cancelled = false
    let startedAt = performance.now()
    let timeouts: number[] = []

    const clearScheduledAlignment = () => {
      for (const timeout of timeouts) window.clearTimeout(timeout)
      timeouts = []
    }

    const align = () => {
      if (cancelled) return
      getHashTarget()?.scrollIntoView({ behavior: "auto", block: "start" })
    }

    const scheduleAlignment = () => {
      clearScheduledAlignment()
      cancelled = false
      startedAt = performance.now()
      timeouts = ALIGNMENT_DELAYS.map((delay) => window.setTimeout(align, delay))
    }

    const cancelAlignment = () => {
      cancelled = true
      clearScheduledAlignment()
    }

    scheduleAlignment()
    window.addEventListener("hashchange", scheduleAlignment)
    window.addEventListener("wheel", cancelAlignment, { passive: true })
    window.addEventListener("touchstart", cancelAlignment, { passive: true })
    window.addEventListener("pointerdown", cancelAlignment, { passive: true })
    window.addEventListener("keydown", cancelAlignment)

    void document.fonts?.ready.then(() => {
      if (!cancelled && performance.now() - startedAt < 800) align()
    })

    return () => {
      cancelled = true
      clearScheduledAlignment()
      window.removeEventListener("hashchange", scheduleAlignment)
      window.removeEventListener("wheel", cancelAlignment)
      window.removeEventListener("touchstart", cancelAlignment)
      window.removeEventListener("pointerdown", cancelAlignment)
      window.removeEventListener("keydown", cancelAlignment)
    }
  }, [pathname])

  return null
}
