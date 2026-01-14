"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone, ChevronDown } from "lucide-react"

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

export function V0Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToForm = () => {
    const el = document.getElementById("lead-form")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/98 backdrop-blur-md shadow-md border-b border-[#1a1f1a]/5" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          {/* Logo - Much bigger */}
          <Link href="/" className="flex-shrink-0">
            <img src="/Primary.svg" alt="ClearEdge Home Buyers" className="h-14 md:h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="text-base font-semibold text-[#1a1f1a]/70 hover:text-[#00b332] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/how-it-works"
              className="text-base font-semibold text-[#1a1f1a]/70 hover:text-[#00b332] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="text-base font-semibold text-[#1a1f1a]/70 hover:text-[#00b332] transition-colors"
            >
              About
            </Link>
            <Link
              href="/testimonials"
              className="text-base font-semibold text-[#1a1f1a]/70 hover:text-[#00b332] transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/contact"
              className="text-base font-semibold text-[#1a1f1a]/70 hover:text-[#00b332] transition-colors"
            >
              Contact
            </Link>

            {/* Locations Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-base font-semibold text-[#1a1f1a]/70 hover:text-[#00b332] transition-colors">
                <span>Locations</span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-4 w-[500px] max-h-[400px] overflow-y-auto">
                  <div className="grid grid-cols-3 gap-1">
                    {locationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-[#00b332]/10 hover:text-[#00b332] transition-colors"
                      >
                        {link.label}, PA
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Situations Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-base font-semibold text-[#1a1f1a]/70 hover:text-[#00b332] transition-colors">
                <span>Situations</span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full right-0 pt-2 transition-all duration-200">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-4 w-[280px]">
                  <div className="space-y-1">
                    {situationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-[#00b332]/10 hover:text-[#00b332] transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Right side: Phone + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a href="tel:5709042059" className="flex items-center gap-2 text-[#1a1f1a] hover:text-[#00b332] transition-colors">
              <div className="w-10 h-10 bg-[#00b332]/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#00b332]" />
              </div>
              <span className="font-bold text-base">(570) 904-2059</span>
            </a>
            <button
              onClick={scrollToForm}
              className="px-6 py-3 bg-[#00b332] hover:bg-[#009929] text-white font-semibold text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Get My Offer
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-[#1a1f1a]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#1a1f1a]/5 shadow-lg max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col px-4 py-4 gap-2">
            <Link
              href="/"
              className="text-base font-semibold text-[#1a1f1a]/70 hover:text-[#00b332] py-3 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/how-it-works"
              className="text-base font-semibold text-[#1a1f1a]/70 hover:text-[#00b332] py-3 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="text-base font-semibold text-[#1a1f1a]/70 hover:text-[#00b332] py-3 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/testimonials"
              className="text-base font-semibold text-[#1a1f1a]/70 hover:text-[#00b332] py-3 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reviews
            </Link>
            <Link
              href="/contact"
              className="text-base font-semibold text-[#1a1f1a]/70 hover:text-[#00b332] py-3 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Locations */}
            <details className="group">
              <summary className="flex items-center justify-between py-3 px-2 text-base font-semibold text-[#1a1f1a]/70 cursor-pointer list-none">
                <span>Locations</span>
                <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="ml-4 mt-1 space-y-1 max-h-48 overflow-y-auto">
                {locationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 px-2 text-sm text-slate-600 hover:text-[#00b332]"
                  >
                    {link.label}, PA
                  </Link>
                ))}
              </div>
            </details>

            {/* Mobile Situations */}
            <details className="group">
              <summary className="flex items-center justify-between py-3 px-2 text-base font-semibold text-[#1a1f1a]/70 cursor-pointer list-none">
                <span>Situations</span>
                <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="ml-4 mt-1 space-y-1">
                {situationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 px-2 text-sm text-slate-600 hover:text-[#00b332]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>

            {/* Mobile Phone */}
            <a
              href="tel:5709042059"
              className="flex items-center gap-3 py-3 px-2 mt-2 rounded-lg bg-[#00b332]/10 text-[#00b332] font-bold"
            >
              <Phone className="w-5 h-5" />
              <span>(570) 904-2059</span>
            </a>

            {/* Mobile CTA */}
            <button
              onClick={scrollToForm}
              className="w-full py-3 mt-2 bg-[#00b332] hover:bg-[#009929] text-white font-semibold rounded-full"
            >
              Get My Offer
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
