'use client'

import { Phone } from 'lucide-react'
import { useTrafficSource } from './TrafficSourceProvider'

interface LandingPhoneCTAProps {
  label?: string
  className?: string
}

/**
 * Phone CTA for paid landing pages, gated on `isLoaded`.
 *
 * Everywhere else on the site the number resolves after hydration and the
 * brief default is harmless — the default IS the organic number, and most
 * visitors are organic. On a Facebook destination that logic inverts: every
 * visitor arrives with an fbclid, so detection will resolve to the campaign
 * number, and painting the default first means the wrong line is on screen
 * for the one audience whose calls we are paying to generate.
 *
 * `isLoaded` has been exposed by TrafficSourceProvider since it was written
 * and consumed by nothing. This is the case it was for.
 *
 * The number is held in reserved space rather than removed, so resolving it
 * does not shift the layout underneath a visitor mid-tap.
 */
export function LandingPhoneCTA({
  label = 'Prefer to talk? Call',
  className = '',
}: LandingPhoneCTAProps) {
  const { phone, phoneTel, isLoaded } = useTrafficSource()

  return (
    <p className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-ce-ink/70 ${className}`}>
      <span className="inline-flex items-center gap-2">
        <Phone className="w-4 h-4 text-ce-green" aria-hidden="true" />
        {label}
      </span>
      {isLoaded ? (
        <a href={`tel:${phoneTel}`} className="font-semibold text-ce-green hover:underline">
          {phone}
        </a>
      ) : (
        // Same glyph count as a formatted number, so the line reserves its
        // final width and nothing reflows when the real one arrives.
        <span className="font-semibold text-transparent select-none" aria-hidden="true">
          (000) 000-0000
        </span>
      )}
    </p>
  )
}
