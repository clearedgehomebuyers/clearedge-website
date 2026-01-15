"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const allLocations = [
  { name: 'Scranton', slug: 'scranton' },
  { name: 'Wilkes-Barre', slug: 'wilkes-barre' },
  { name: 'Allentown', slug: 'allentown' },
  { name: 'Bethlehem', slug: 'bethlehem' },
  { name: 'Easton', slug: 'easton' },
  { name: 'Stroudsburg', slug: 'stroudsburg' },
  { name: 'East Stroudsburg', slug: 'east-stroudsburg' },
  { name: 'Hazleton', slug: 'hazleton' },
  { name: 'Pottsville', slug: 'pottsville' },
  { name: 'Carbondale', slug: 'carbondale' },
  { name: 'Pittston', slug: 'pittston' },
  { name: 'Kingston', slug: 'kingston' },
  { name: 'Dunmore', slug: 'dunmore' },
  { name: 'Nanticoke', slug: 'nanticoke' },
  { name: 'Honesdale', slug: 'honesdale' },
  { name: 'Bloomsburg', slug: 'bloomsburg' },
  { name: 'Lehigh Valley', slug: 'lehigh-valley' },
  { name: 'Poconos', slug: 'poconos' },
  { name: 'Pocono Pines', slug: 'pocono-pines' },
  { name: 'Tannersville', slug: 'tannersville' },
  { name: 'Reading', slug: 'reading' },
]

export function RandomizedServiceAreas() {
  const [displayLocations, setDisplayLocations] = useState<typeof allLocations>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const shuffled = [...allLocations].sort(() => Math.random() - 0.5)
    setDisplayLocations(shuffled.slice(0, 6))
    setIsLoaded(true)
  }, [])

  return (
    <section className="py-16 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Service Areas</span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Areas We Serve</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {isLoaded ? (
            displayLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="relative flex items-center justify-center bg-white rounded-2xl px-5 py-4 hover:bg-[#00b332]/5 transition-colors border border-[#1a1f1a]/5 hover:border-[#00b332]/30"
              >
                <span className="font-medium text-[#1a1f1a]/70 text-center">{location.name}</span>
                <ArrowRight className="absolute right-4 w-4 h-4 text-[#00b332]" />
              </Link>
            ))
          ) : (
            // Placeholder cards to prevent layout shift
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative flex items-center justify-center bg-white rounded-2xl px-5 py-4 border border-[#1a1f1a]/5 animate-pulse"
              >
                <span className="font-medium text-transparent text-center">Loading...</span>
                <div className="absolute right-4 w-4 h-4" />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
