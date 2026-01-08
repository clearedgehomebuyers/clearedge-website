import Link from 'next/link'
import { MapPin } from 'lucide-react'

// All 21 locations - displayed statically for SEO
// East Stroudsburg moved to last position (longer name wraps to two lines)
const allLocations = [
  { name: 'Scranton', slug: 'scranton' },
  { name: 'Wilkes-Barre', slug: 'wilkes-barre' },
  { name: 'Allentown', slug: 'allentown' },
  { name: 'Bethlehem', slug: 'bethlehem' },
  { name: 'Easton', slug: 'easton' },
  { name: 'Reading', slug: 'reading' },
  { name: 'Hazleton', slug: 'hazleton' },
  { name: 'Stroudsburg', slug: 'stroudsburg' },
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
  { name: 'East Stroudsburg', slug: 'east-stroudsburg' },
]

export function ServiceAreasGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {allLocations.map((city) => (
        <Link
          key={city.slug}
          href={`/locations/${city.slug}`}
          className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:border-[#0d9488] hover:bg-[#0d9488]/5 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <MapPin className="w-5 h-5 mx-auto mb-2 text-[#0d9488]" />
          <span className="font-semibold text-slate-700 text-sm">{city.name}, PA</span>
        </Link>
      ))}
    </div>
  )
}
