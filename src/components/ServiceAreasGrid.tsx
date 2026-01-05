'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

// All 21 locations
const allLocations = [
  { name: 'Scranton', slug: 'scranton' },
  { name: 'Wilkes-Barre', slug: 'wilkes-barre' },
  { name: 'Allentown', slug: 'allentown' },
  { name: 'Bethlehem', slug: 'bethlehem' },
  { name: 'Easton', slug: 'easton' },
  { name: 'Reading', slug: 'reading' },
  { name: 'Hazleton', slug: 'hazleton' },
  { name: 'Stroudsburg', slug: 'stroudsburg' },
  { name: 'East Stroudsburg', slug: 'east-stroudsburg' },
  { name: 'Honesdale', slug: 'honesdale' },
  { name: 'Carbondale', slug: 'carbondale' },
  { name: 'Pittston', slug: 'pittston' },
  { name: 'Kingston', slug: 'kingston' },
  { name: 'Nanticoke', slug: 'nanticoke' },
  { name: 'Dunmore', slug: 'dunmore' },
  { name: 'Bloomsburg', slug: 'bloomsburg' },
  { name: 'Pottsville', slug: 'pottsville' },
  { name: 'Pocono Pines', slug: 'pocono-pines' },
  { name: 'Tannersville', slug: 'tannersville' },
  { name: 'Lehigh Valley', slug: 'lehigh-valley' },
  { name: 'Poconos', slug: 'poconos' },
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function ServiceAreasGrid() {
  // Show 12 random locations on homepage
  const [locations, setLocations] = useState(allLocations.slice(0, 12))

  useEffect(() => {
    setLocations(shuffleArray(allLocations).slice(0, 12))
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {locations.map((city) => (
        <Link
          key={city.slug}
          href={`/locations/${city.slug}`}
          className="bg-slate-50 rounded-xl p-5 text-center border border-slate-200 hover:border-[#0d9488] hover:bg-[#0d9488]/10 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <MapPin className="w-5 h-5 mx-auto mb-2 text-[#0d9488]" />
          <span className="font-semibold text-slate-700">{city.name}, PA</span>
        </Link>
      ))}
    </div>
  )
}
