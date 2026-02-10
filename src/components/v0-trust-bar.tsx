"use client"

import { Home, Calendar, Star, MapPin } from "lucide-react"

const stats = [
  {
    icon: Calendar,
    value: "Since 2016",
    label: "Serving PA",
    countTarget: null,
  },
  {
    icon: Home,
    value: "200+",
    label: "Homes Purchased",
    countTarget: 200,
    countSuffix: "+",
  },
  {
    icon: Star,
    value: "5.0",
    label: "Google Rating",
    countTarget: 5.0,
    countDecimals: 1,
    showStars: true,
  },
  {
    icon: MapPin,
    value: "21",
    label: "PA Communities Served",
    countTarget: 21,
  },
]

export function V0TrustBar() {
  return (
    <section className="py-6 md:py-8 bg-gradient-to-b from-surface-green-wash to-surface-green-tint">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 items-center">
          {stats.map((stat, index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Vertical divider (desktop only, between items) */}
              {index > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-ce-ink/10" />
              )}

              {/* Icon */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-ce-green/10 flex items-center justify-center mb-3">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-ce-green" />
              </div>

              {/* Stat number with count-up */}
              <div
                className="animate-on-scroll font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-none text-ce-ink mb-1"
                {...(stat.countTarget !== null && stat.countTarget !== undefined ? {
                  'data-count-target': stat.countTarget,
                  'data-count-suffix': stat.countSuffix || '',
                  'data-count-decimals': stat.countDecimals?.toString() || '0',
                } : {})}
                style={{ [`--stagger` as string]: index }}
              >
                {stat.value}
              </div>

              {/* Gold stars for 5.0 rating */}
              {stat.showStars && (
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              )}

              {/* Label */}
              <div className="text-xs sm:text-sm tracking-wide uppercase text-ce-ink/60 font-medium" style={{ letterSpacing: '0.05em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
