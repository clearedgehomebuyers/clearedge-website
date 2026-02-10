"use client"

import { ArrowRight } from "lucide-react"

interface TrackedCTALinkProps {
  href: string
  label: string
  eventLabel: string
  className?: string
  showArrow?: boolean
}

export function TrackedCTALink({
  href,
  label,
  eventLabel,
  className = "inline-flex items-center justify-center gap-2 bg-ce-green text-white px-8 py-4 rounded-full font-medium hover:bg-ce-green-hover shadow-green hover:shadow-green-lg hover:-translate-y-0.5 active:translate-y-0 transition-all group",
  showArrow = true,
}: TrackedCTALinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track GA4 event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        event_label: eventLabel,
        page_path: window.location.pathname
      });
    }

    // Use scrollIntoView for #lead-form links (works on repeat clicks)
    if (href.includes('#lead-form')) {
      e.preventDefault()
      const element = document.getElementById('lead-form')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else if (href.startsWith('/')) {
        // If element not found and href has a path, navigate to page
        window.location.href = href
      }
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {label}
      {showArrow && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
    </a>
  )
}
