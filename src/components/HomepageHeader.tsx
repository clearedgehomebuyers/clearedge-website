'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Menu, X } from 'lucide-react'

/**
 * HomepageHeader - v0 Design Implementation
 *
 * Design features:
 * - Cream background (#FAF8F5) matching hero
 * - Minimal, clean layout
 * - CTA button appears on scroll
 * - Pill-shaped buttons with hover lift effect
 * - Subtle border instead of shadow
 */

const navLinks = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Guides' },
  { href: '/contact', label: 'Contact' },
]

export function HomepageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#1a1f1a]/5 shadow-sm'
          : 'bg-[#FAF8F5]'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008a29] focus-visible:ring-offset-2 rounded-lg"
            aria-label="ClearEdge Home Buyers - Home"
          >
            <Image
              src="/Primary.svg"
              alt="ClearEdge Home Buyers"
              width={200}
              height={68}
              className="h-10 lg:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#1a1f1a]/70 hover:text-[#1a1f1a] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA - appears on scroll */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+15709042059"
              className={`flex items-center gap-2 text-[#1a1f1a]/70 hover:text-[#008a29] transition-all duration-300 ${
                scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-semibold">(570) 904-2059</span>
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('lead-form')
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 100
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
              }}
              className={`px-6 py-2.5 bg-[#008a29] hover:bg-[#007a24] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#008a29]/20 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008a29] focus-visible:ring-offset-2 ${
                scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              Get Cash Offer
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 rounded-full text-[#1a1f1a]/70 hover:bg-[#1a1f1a]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008a29]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-6 pt-2 bg-[#FAF8F5] border-t border-[#1a1f1a]/5">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-[#1a1f1a]/80 hover:text-[#1a1f1a] hover:bg-[#1a1f1a]/5 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Phone */}
          <a
            href="tel:+15709042059"
            className="flex items-center gap-3 px-4 py-3 mt-4 text-[#1a1f1a]/80 hover:text-[#008a29] hover:bg-[#1a1f1a]/5 rounded-xl transition-colors"
          >
            <Phone className="w-5 h-5 text-[#008a29]" />
            <span className="font-semibold">(570) 904-2059</span>
          </a>

          {/* Mobile CTA */}
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              setTimeout(() => {
                const el = document.getElementById('lead-form')
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 100
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
              }, 100)
            }}
            className="block w-full text-center px-6 py-3.5 mt-3 bg-[#008a29] hover:bg-[#007a24] text-white font-semibold rounded-full shadow-lg shadow-[#008a29]/20 transition-all"
          >
            Get Cash Offer
          </button>
        </div>
      </div>
    </header>
  )
}
