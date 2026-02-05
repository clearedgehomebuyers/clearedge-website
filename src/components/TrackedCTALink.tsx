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
  className = "inline-flex items-center justify-center gap-2 bg-[#008a29] text-white px-8 py-4 rounded-full font-medium hover:bg-[#007a24] transition-all group shadow-lg shadow-[#008a29]/20",
  showArrow = true,
}: TrackedCTALinkProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        event_label: eventLabel,
        page_path: window.location.pathname
      });
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {label}
      {showArrow && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
    </a>
  )
}
