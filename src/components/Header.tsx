'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Menu, X, ChevronDown } from 'lucide-react'

interface HeaderProps {
  currentPage?: string
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
]

const locationLinks = [
  { href: '/locations/scranton', label: 'Scranton' },
  { href: '/locations/wilkes-barre', label: 'Wilkes-Barre' },
  { href: '/locations/allentown', label: 'Allentown' },
  { href: '/locations/bethlehem', label: 'Bethlehem' },
  { href: '/locations/easton', label: 'Easton' },
  { href: '/locations/reading', label: 'Reading' },
  { href: '/locations/hazleton', label: 'Hazleton' },
  { href: '/locations/stroudsburg', label: 'Stroudsburg' },
  { href: '/locations/east-stroudsburg', label: 'East Stroudsburg' },
  { href: '/locations/honesdale', label: 'Honesdale' },
  { href: '/locations/carbondale', label: 'Carbondale' },
  { href: '/locations/pittston', label: 'Pittston' },
  { href: '/locations/kingston', label: 'Kingston' },
  { href: '/locations/nanticoke', label: 'Nanticoke' },
  { href: '/locations/dunmore', label: 'Dunmore' },
  { href: '/locations/bloomsburg', label: 'Bloomsburg' },
  { href: '/locations/pottsville', label: 'Pottsville' },
  { href: '/locations/pocono-pines', label: 'Pocono Pines' },
  { href: '/locations/tannersville', label: 'Tannersville' },
  { href: '/locations/lehigh-valley', label: 'Lehigh Valley' },
  { href: '/locations/poconos', label: 'Poconos' },
]

const situationLinks = [
  { href: '/situations/foreclosure', label: 'Foreclosure' },
  { href: '/situations/probate', label: 'Probate' },
  { href: '/situations/inherited-property', label: 'Inherited Property' },
  { href: '/situations/divorce', label: 'Divorce' },
  { href: '/situations/relocating', label: 'Relocating' },
  { href: '/situations/downsizing', label: 'Downsizing' },
  { href: '/situations/vacant-property', label: 'Vacant Property' },
  { href: '/situations/fire-damage', label: 'Fire Damage' },
  { href: '/situations/bad-tenants', label: 'Bad Tenants' },
  { href: '/situations/tax-liens', label: 'Tax Liens' },
  { href: '/situations/code-violations', label: 'Code Violations' },
  { href: '/situations/behind-on-payments', label: 'Behind on Payments' },
]

export function Header({ currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [locationsOpen, setLocationsOpen] = useState(false)
  const [situationsOpen, setSituationsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => currentPage === href

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-b border-slate-100 transition-shadow ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Image src="/logo.webp" alt="ClearEdge Home Buyers" width={180} height={40} className="h-10 w-auto" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive(link.href) ? 'text-[#0d9488]' : 'text-slate-600 hover:text-[#0d9488]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-5">
            <a href="tel:5709042059" className="flex items-center space-x-2 text-slate-700 hover:text-[#0d9488] transition-colors">
              <div className="w-10 h-10 bg-[#0d9488]/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#0d9488]" />
              </div>
              <span className="font-bold">(570) 904-2059</span>
            </a>
            <Link href="/#get-offer" className="px-5 py-2.5 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
              Get Cash Offer
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#0d9488]/10 text-[#0d9488]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Locations Dropdown */}
            <div>
              <button
                onClick={() => setLocationsOpen(!locationsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Locations</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${locationsOpen ? 'rotate-180' : ''}`} />
              </button>
              {locationsOpen && (
                <div className="ml-4 mt-1 space-y-1 max-h-48 overflow-y-auto scrollbar-thin">
                  {locationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      {link.label}, PA
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Situations Dropdown */}
            <div>
              <button
                onClick={() => setSituationsOpen(!situationsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Situations</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${situationsOpen ? 'rotate-180' : ''}`} />
              </button>
              {situationsOpen && (
                <div className="ml-4 mt-1 space-y-1 max-h-48 overflow-y-auto scrollbar-thin">
                  {situationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div className="pt-4 border-t border-slate-100 mt-4">
              <a
                href="tel:5709042059"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-[#0d9488]/10 text-[#0d9488] font-bold"
              >
                <Phone className="w-5 h-5" />
                <span>(570) 904-2059</span>
              </a>
            </div>

            {/* Get Cash Offer Button */}
            <Link
              href="/#get-offer"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-5 py-3 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] text-white font-semibold rounded-xl shadow-lg mt-2"
            >
              Get Cash Offer
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
