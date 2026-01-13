'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Menu, X } from 'lucide-react'

/**
 * HomepageHeader - Minimal, trust-focused header for the homepage redesign
 *
 * Design principles:
 * - Clean and calm, not cluttered
 * - Logo + essential links + CTA
 * - Sticky on scroll with subtle shadow
 * - Mobile-first with thumb-friendly touch targets (44px min)
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
      setScrolled(window.scrollY > 10)
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-md shadow-sm'
          : 'bg-white'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b332] focus-visible:ring-offset-2 rounded-lg"
            aria-label="ClearEdge Home Buyers - Home"
          >
            <Image
              src="/Primary.svg"
              alt="ClearEdge Home Buyers"
              width={200}
              height={68}
              className="h-12 lg:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus-visible:text-[#005db4]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:5709042059"
              className="flex items-center gap-2 text-slate-700 hover:text-[#005db4] transition-colors"
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
              className="px-5 py-2.5 bg-[#00b332] hover:bg-[#009929] text-white text-sm font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b332] focus-visible:ring-offset-2"
            >
              Get Cash Offer
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b332]"
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
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-6 pt-2 bg-white border-t border-slate-100">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Phone */}
          <a
            href="tel:5709042059"
            className="flex items-center gap-3 px-4 py-3 mt-4 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Phone className="w-5 h-5 text-[#005db4]" />
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
            className="block w-full text-center px-5 py-3.5 mt-3 bg-[#00b332] hover:bg-[#009929] text-white font-semibold rounded-lg transition-colors"
          >
            Get Cash Offer
          </button>
        </div>
      </div>
    </header>
  )
}
