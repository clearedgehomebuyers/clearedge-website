"use client"

import { useEffect, useRef, useCallback } from "react"

/**
 * IntersectionObserver-based scroll animation hook.
 * Adds 'is-visible' class to elements with 'animate-on-scroll' when they enter the viewport.
 * Also supports count-up animation for stat numbers.
 */
export function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Count-up animation for stat numbers
    const animateCountUp = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.countTarget || "0")
      const suffix = el.dataset.countSuffix || ""
      const prefix = el.dataset.countPrefix || ""
      const decimals = el.dataset.countDecimals ? parseInt(el.dataset.countDecimals) : 0
      const duration = 1200
      const start = performance.now()

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) {
        el.textContent = prefix + target.toFixed(decimals) + suffix
        return
      }

      const step = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = eased * target

        el.textContent = prefix + current.toFixed(decimals) + suffix

        if (progress < 1) {
          requestAnimationFrame(step)
        }
      }

      requestAnimationFrame(step)
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")

            // Handle count-up animation
            if (entry.target.hasAttribute("data-count-target")) {
              animateCountUp(entry.target as HTMLElement)
            }

            // Unobserve after animation (one-time)
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    )

    // Observe all elements with the animation class
    const elements = document.querySelectorAll(".animate-on-scroll, [data-count-target]")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])
}

/**
 * Hook to re-observe elements after dynamic content loads.
 * Call this when new animated elements are added to the DOM.
 */
export function useObserveNewElements() {
  const observe = useCallback((container: HTMLElement | null) => {
    if (!container) return

    const elements = container.querySelectorAll(".animate-on-scroll:not(.is-visible), [data-count-target]:not(.is-visible)")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return observe
}
