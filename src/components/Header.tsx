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
  { href: '/blog', label: 'Blog' },
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
  { href: '/situations/inherited-property', label: 'Inherited Property' },
  { href: '/situations/divorce', label: 'Divorce' },
  { href: '/situations/job-relocation', label: 'Job Relocation' },
  { href: '/situations/tired-landlord', label: 'Tired Landlord' },
  { href: '/situations/vacant-property', label: 'Vacant Property' },
  { href: '/situations/major-repairs', label: 'Major Repairs' },
  { href: '/situations/tax-liens-code-violations', label: 'Tax Liens & Code Violations' },
]

export function Header({ currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
          <div className="hidden lg:flex items-center space-x-6">
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

            {/* Locations Dropdown - CSS-based for SSR */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">
                <span>Locations</span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-4 w-[480px] max-h-[400px] overflow-y-auto">
                  <div className="grid grid-cols-3 gap-2">
                    {locationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-[#0d9488]/10 hover:text-[#0d9488] transition-colors"
                      >
                        {link.label}, PA
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Situations Dropdown - CSS-based for SSR */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">
                <span>Situations</span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-4 w-[280px]">
                  <div className="space-y-1">
                    {situationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-[#0d9488]/10 hover:text-[#0d9488] transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-5">
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
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
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

      {/* Mobile Menu - Links always in DOM, visibility controlled by CSS */}
      <div className={`lg:hidden bg-white border-t border-slate-100 shadow-lg overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 space-y-1 overflow-y-auto max-h-[70vh]">
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

          {/* Locations Section - Always in DOM */}
          <details className="group">
            <summary className="flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer list-none">
              <span>Locations</span>
              <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
            </summary>
            <div className="ml-4 mt-1 space-y-1 max-h-48 overflow-y-auto">
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
          </details>

          {/* Situations Section - Always in DOM */}
          <details className="group">
            <summary className="flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer list-none">
              <span>Situations</span>
              <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
            </summary>
            <div className="ml-4 mt-1 space-y-1 max-h-48 overflow-y-auto">
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
          </details>

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
    </nav>
  )
}
