'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, Mail } from 'lucide-react'

// Locations to always place at the end (long names need space below)
const bottomRowLocations = [
  { name: 'East Stroudsburg', slug: 'east-stroudsburg' },
  { name: 'Pocono Pines', slug: 'pocono-pines' },
]

// All other locations (will be randomized)
const otherLocations = [
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
  { name: 'Tannersville', slug: 'tannersville' },
  { name: 'Lehigh Valley', slug: 'lehigh-valley' },
  { name: 'Poconos', slug: 'poconos' },
]

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function Footer() {
  // Initial state uses original order for SSR
  const [locations, setLocations] = useState([...otherLocations, ...bottomRowLocations])

  useEffect(() => {
    // Randomize other locations, then append bottom row locations at the end
    const shuffled = shuffleArray(otherLocations)
    setLocations([...shuffled, ...bottomRowLocations])
  }, [])

  return (
    <footer className="bg-[#1a1f1a] text-white py-16 px-4">
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
            <p className="text-white/60 leading-relaxed text-sm">
              We buy houses in any condition throughout Eastern Pennsylvania. Fair cash offers, fast closings, zero fees.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg text-white">Quick Links</h3>
            <ul className="space-y-3 text-white/60">
              <li><Link href="/how-it-works" className="hover:text-[#00b332] transition-colors">How It Works</Link></li>
              <li><Link href="/about" className="hover:text-[#00b332] transition-colors">About Us</Link></li>
              <li><Link href="/testimonials" className="hover:text-[#00b332] transition-colors">Testimonials</Link></li>
              <li><Link href="/blog" className="hover:text-[#00b332] transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-[#00b332] transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#00b332] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#00b332] transition-colors">Terms</Link></li>
            </ul>
          </div>

          {/* Service Areas - All 21 Locations */}
          <div className="md:col-span-2">
            <h3 className="font-bold mb-4 text-lg text-white">Service Areas</h3>
            <ul className="grid grid-cols-3 gap-x-4 gap-y-2 text-white/60 text-sm">
              {locations.map((location) => (
                <li key={location.slug}>
                  <Link href={`/locations/${location.slug}`} className="hover:text-[#00b332] transition-colors">
                    {location.name}, PA
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-lg text-white">Contact Us</h3>
            <div className="space-y-4">
              <a href="tel:+15709042059" className="flex items-center space-x-3 text-white/60 hover:text-[#00b332] transition-colors group">
                <div className="w-10 h-10 bg-[#00b332]/10 rounded-xl flex items-center justify-center group-hover:bg-[#00b332]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[#00b332]" />
                </div>
                <span className="font-semibold">(570) 904-2059</span>
              </a>
              <div className="flex items-center space-x-3 text-white/60">
                <div className="w-10 h-10 bg-[#00b332]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#00b332]" />
                </div>
                <span className="text-sm">Serving Eastern Pennsylvania</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
          <p>&copy; 2026 ClearEdge Home Buyers. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-[#00b332] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#00b332] transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
