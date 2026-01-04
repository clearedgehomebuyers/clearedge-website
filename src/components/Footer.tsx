'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'

// All available locations
const allLocations = [
  { name: 'Scranton', slug: 'scranton' },
  { name: 'Wilkes-Barre', slug: 'wilkes-barre' },
  { name: 'Hazleton', slug: 'hazleton' },
  { name: 'Stroudsburg', slug: 'stroudsburg' },
  { name: 'Allentown', slug: 'allentown' },
  { name: 'Bethlehem', slug: 'bethlehem' },
  { name: 'Easton', slug: 'easton' },
  { name: 'Reading', slug: 'reading' },
  { name: 'Honesdale', slug: 'honesdale' },
  { name: 'Carbondale', slug: 'carbondale' },
  { name: 'Pittston', slug: 'pittston' },
  { name: 'Kingston', slug: 'kingston' },
  { name: 'Dunmore', slug: 'dunmore' },
  { name: 'Nanticoke', slug: 'nanticoke' },
  { name: 'Bloomsburg', slug: 'bloomsburg' },
  { name: 'Pottsville', slug: 'pottsville' },
]

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function Footer() {
  const [displayLocations, setDisplayLocations] = useState(allLocations.slice(0, 12))

  useEffect(() => {
    // Shuffle and pick 12 random locations on mount
    const shuffled = shuffleArray(allLocations)
    setDisplayLocations(shuffled.slice(0, 12))
  }, [])

  // Split into two columns
  const column1 = displayLocations.slice(0, 6)
  const column2 = displayLocations.slice(6, 12)

  return (
    <footer className="bg-[#1e3a5f] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/logo.webp"
                alt="ClearEdge Home Buyers"
                width={180}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">We buy houses in any condition throughout Eastern Pennsylvania. Fair cash offers, fast closings, zero fees.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-slate-300">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>

          {/* Service Areas Column 1 */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Service Areas</h3>
            <ul className="space-y-3 text-slate-300">
              {column1.map((location) => (
                <li key={location.slug}>
                  <Link href={`/locations/${location.slug}`} className="hover:text-white transition-colors">
                    {location.name}, PA
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas Column 2 */}
          <div>
            <h3 className="font-bold mb-4 text-lg md:opacity-0">Areas</h3>
            <ul className="space-y-3 text-slate-300">
              {column2.map((location) => (
                <li key={location.slug}>
                  <Link href={`/locations/${location.slug}`} className="hover:text-white transition-colors">
                    {location.name}, PA
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Contact Us</h3>
            <a href="tel:5709042059" className="flex items-center space-x-3 text-slate-300 hover:text-[#14b8a6] transition-colors">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">(570) 904-2059</span>
            </a>
            <p className="text-sm text-slate-300 mt-3">Serving Eastern Pennsylvania</p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-300 text-sm">
          <p>&copy; 2026 ClearEdge Home Buyers. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
