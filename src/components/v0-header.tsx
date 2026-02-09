"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import { useTrafficSource } from "./TrafficSourceProvider"

const regionLinks = {
  'NEPA': {
    hub: { href: '/locations/nepa', label: 'NEPA' },
    cities: [
      { href: '/locations/scranton', label: 'Scranton' },
      { href: '/locations/wilkes-barre', label: 'Wilkes-Barre' },
      { href: '/locations/hazleton', label: 'Hazleton' },
      { href: '/locations/pittston', label: 'Pittston' },
      { href: '/locations/kingston', label: 'Kingston' },
      { href: '/locations/nanticoke', label: 'Nanticoke' },
      { href: '/locations/carbondale', label: 'Carbondale' },
      { href: '/locations/dunmore', label: 'Dunmore' },
      { href: '/locations/honesdale', label: 'Honesdale' },
      { href: '/locations/bloomsburg', label: 'Bloomsburg' },
    ],
  },
  'Lehigh Valley': {
    hub: { href: '/locations/lehigh-valley', label: 'Lehigh Valley' },
    cities: [
      { href: '/locations/allentown', label: 'Allentown' },
      { href: '/locations/bethlehem', label: 'Bethlehem' },
      { href: '/locations/easton', label: 'Easton' },
      { href: '/locations/reading', label: 'Reading' },
      { href: '/locations/pottsville', label: 'Pottsville' },
    ],
  },
  'Poconos': {
    hub: { href: '/locations/poconos', label: 'Poconos' },
    cities: [
      { href: '/locations/stroudsburg', label: 'Stroudsburg' },
      { href: '/locations/east-stroudsburg', label: 'East Stroudsburg' },
      { href: '/locations/pocono-pines', label: 'Pocono Pines' },
      { href: '/locations/tannersville', label: 'Tannersville' },
    ],
  },
}

// Flat list for mobile menu
const locationLinks = [
  { href: '/locations/nepa', label: 'NEPA (Regional Hub)', isHub: true },
  { href: '/locations/scranton', label: 'Scranton' },
  { href: '/locations/wilkes-barre', label: 'Wilkes-Barre' },
  { href: '/locations/hazleton', label: 'Hazleton' },
  { href: '/locations/pittston', label: 'Pittston' },
  { href: '/locations/kingston', label: 'Kingston' },
  { href: '/locations/nanticoke', label: 'Nanticoke' },
  { href: '/locations/carbondale', label: 'Carbondale' },
  { href: '/locations/dunmore', label: 'Dunmore' },
  { href: '/locations/honesdale', label: 'Honesdale' },
  { href: '/locations/bloomsburg', label: 'Bloomsburg' },
  { href: '/locations/lehigh-valley', label: 'Lehigh Valley (Regional Hub)', isHub: true },
  { href: '/locations/allentown', label: 'Allentown' },
  { href: '/locations/bethlehem', label: 'Bethlehem' },
  { href: '/locations/easton', label: 'Easton' },
  { href: '/locations/reading', label: 'Reading' },
  { href: '/locations/pottsville', label: 'Pottsville' },
  { href: '/locations/poconos', label: 'Poconos (Regional Hub)', isHub: true },
  { href: '/locations/stroudsburg', label: 'Stroudsburg' },
  { href: '/locations/east-stroudsburg', label: 'East Stroudsburg' },
  { href: '/locations/pocono-pines', label: 'Pocono Pines' },
  { href: '/locations/tannersville', label: 'Tannersville' },
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
  { href: '/situations/foundation-structural-issues', label: 'Foundation & Structural Issues' },
]

const resourceLinks = [
  { href: '/calculator', label: 'Sale Calculator' },
  { href: '/cash-buyer-vs-realtor', label: 'Cash Buyer vs. Realtor' },
  { href: '/are-cash-home-buyers-legit', label: 'Are Cash Buyers Legit?' },
  { href: '/blog', label: 'Blog & Guides' },
]

export function V0Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [locationsOpen, setLocationsOpen] = useState(false)
  const [situationsOpen, setSituationsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const locationsRef = useRef<HTMLDivElement>(null)
  const situationsRef = useRef<HTMLDivElement>(null)
  const resourcesRef = useRef<HTMLDivElement>(null)
  const { phone, phoneTel } = useTrafficSource()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationsRef.current && !locationsRef.current.contains(event.target as Node)) {
        setLocationsOpen(false)
      }
      if (situationsRef.current && !situationsRef.current.contains(event.target as Node)) {
        setSituationsOpen(false)
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const scrollToForm = () => {
    setIsMobileMenuOpen(false)

    // If on homepage, scroll to form
    if (pathname === "/") {
      const el = document.getElementById("lead-form")
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      // If on any other page, navigate to homepage with hash
      window.location.href = "/#lead-form"
    }
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  const toggleLocations = () => {
    setLocationsOpen(!locationsOpen)
    setSituationsOpen(false)
    setResourcesOpen(false)
  }

  const toggleSituations = () => {
    setSituationsOpen(!situationsOpen)
    setLocationsOpen(false)
    setResourcesOpen(false)
  }

  const toggleResources = () => {
    setResourcesOpen(!resourcesOpen)
    setLocationsOpen(false)
    setSituationsOpen(false)
  }

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (pathname === href) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
      setIsMobileMenuOpen(false)
    } else {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/98 backdrop-blur-md shadow-md border-b border-[#1a1f1a]/5" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex-shrink-0 cursor-pointer"
          >
            <img src="/Primary.svg" alt="ClearEdge Home Buyers logo" className="h-10 md:h-12 lg:h-14 w-auto" width="168" height="56" />
          </a>

          {/* Desktop/Tablet Navigation - centered with responsive spacing */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-2 lg:mx-8">
            <div className="flex items-center gap-2 lg:gap-6">
              <Link
                href="/how-it-works"
                onClick={(e) => handleNavClick(e, "/how-it-works")}
                className="text-xs lg:text-sm font-semibold text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors whitespace-nowrap"
              >
                How It Works
              </Link>

              {/* Locations Dropdown - Click to toggle (position 2) */}
              <div className="relative" ref={locationsRef}>
                <button
                  onClick={toggleLocations}
                  className="flex items-center gap-1 text-xs lg:text-sm font-semibold text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors"
                >
                  <span>Locations</span>
                  <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform ${locationsOpen ? 'rotate-180' : ''}`} />
                </button>
                {locationsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-4 w-[580px] lg:w-[720px] max-h-[450px] overflow-y-auto">
                      <div className="grid grid-cols-3 gap-6">
                        {Object.entries(regionLinks).map(([regionName, region]) => (
                          <div key={regionName}>
                            <Link
                              href={region.hub.href}
                              onClick={(e) => { handleNavClick(e, region.hub.href); setLocationsOpen(false) }}
                              className="block px-3 py-2 text-sm font-bold text-[#008a29] hover:bg-[#008a29]/10 rounded-lg transition-colors border-b border-[#008a29]/20 mb-2"
                            >
                              {regionName} →
                            </Link>
                            <div className="space-y-0.5">
                              {region.cities.map((city) => (
                                <Link
                                  key={city.href}
                                  href={city.href}
                                  onClick={(e) => { handleNavClick(e, city.href); setLocationsOpen(false) }}
                                  className="block px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-[#008a29]/10 hover:text-[#008a29] transition-colors"
                                >
                                  {city.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Situations Dropdown - Click to toggle */}
              <div className="relative" ref={situationsRef}>
                <button
                  onClick={toggleSituations}
                  className="flex items-center gap-1 text-xs lg:text-sm font-semibold text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors"
                >
                  <span>Situations</span>
                  <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform ${situationsOpen ? 'rotate-180' : ''}`} />
                </button>
                {situationsOpen && (
                  <div className="absolute top-full right-0 pt-2 z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-4 w-[260px]">
                      <div className="space-y-1">
                        {situationLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={(e) => { handleNavClick(e, link.href); setSituationsOpen(false) }}
                            className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-[#008a29]/10 hover:text-[#008a29] transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Dropdown - Click to toggle */}
              <div className="relative" ref={resourcesRef}>
                <button
                  onClick={toggleResources}
                  className="flex items-center gap-1 text-xs lg:text-sm font-semibold text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors"
                >
                  <span>Resources</span>
                  <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                </button>
                {resourcesOpen && (
                  <div className="absolute top-full right-0 pt-2 z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-4 w-[240px]">
                      <div className="space-y-1">
                        {resourceLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={(e) => { handleNavClick(e, link.href); setResourcesOpen(false) }}
                            className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-[#008a29]/10 hover:text-[#008a29] transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                onClick={(e) => handleNavClick(e, "/about")}
                className="text-xs lg:text-sm font-semibold text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={(e) => handleNavClick(e, "/contact")}
                className="text-xs lg:text-sm font-semibold text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors"
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* Right side: Phone + CTA */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {/* Phone - icon only on tablet, icon + text on desktop */}
            <a
              href={`tel:${phoneTel}`}
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'click_to_call', {
                    event_category: 'Contact',
                    event_label: 'Header Phone - Desktop',
                    page_path: window.location.pathname
                  });
                }
              }}
              className="flex items-center gap-2 text-[#1a1f1a] hover:text-[#008a29] transition-colors"
            >
              <div className="w-9 h-9 bg-[#008a29]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-[#008a29]" />
              </div>
              <span className="font-bold text-sm hidden lg:inline">{phone}</span>
            </a>
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'cta_click', {
                    event_category: 'CTA',
                    event_label: 'Get My Offer - Header Desktop',
                    page_path: window.location.pathname
                  });
                }
                scrollToForm();
              }}
              className="px-3 lg:px-5 py-2 lg:py-2.5 bg-[#008a29] hover:bg-[#007a24] text-white font-semibold text-sm rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              Get My Offer
            </button>
          </div>

          {/* Mobile Menu Button - only on mobile, not tablet */}
          <button
            className="md:hidden p-2 rounded-md text-[#1a1f1a]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - only on mobile, not tablet */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#1a1f1a]/5 shadow-lg max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col px-4 py-4 gap-2">
            <Link
              href="/how-it-works"
              className="text-base font-semibold text-[#1a1f1a]/70 hover:text-[#008a29] py-3 px-2"
              onClick={(e) => handleNavClick(e, "/how-it-works")}
            >
              How It Works
            </Link>

            {/* Mobile Locations */}
            <details className="group">
              <summary className="flex items-center justify-between py-3 px-2 text-base font-semibold text-[#1a1f1a]/70 cursor-pointer list-none">
                <span>Locations</span>
                <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="relative ml-4 mt-1">
                <div className="space-y-1 max-h-48 overflow-y-auto pb-6">
                  {locationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block py-2 px-2 text-sm hover:text-[#008a29] ${
                        link.isHub
                          ? 'font-bold text-[#008a29] border-b border-[#008a29]/20 mt-3 first:mt-0'
                          : 'text-slate-600 pl-4'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                {/* Mobile scroll indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none flex items-end justify-center pb-1">
                  <span className="text-xs text-slate-400">Scroll for more ↓</span>
                </div>
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
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block py-2 px-2 text-sm text-slate-600 hover:text-[#008a29]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>

            {/* Mobile Resources */}
            <details className="group">
              <summary className="flex items-center justify-between py-3 px-2 text-base font-semibold text-[#1a1f1a]/70 cursor-pointer list-none">
                <span>Resources</span>
                <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="ml-4 mt-1 space-y-1">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block py-2 px-2 text-sm text-slate-600 hover:text-[#008a29]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>

            <Link
              href="/about"
              className="text-base font-semibold text-[#1a1f1a]/70 hover:text-[#008a29] py-3 px-2"
              onClick={(e) => handleNavClick(e, "/about")}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-base font-semibold text-[#1a1f1a]/70 hover:text-[#008a29] py-3 px-2"
              onClick={(e) => handleNavClick(e, "/contact")}
            >
              Contact
            </Link>

            {/* Mobile Phone */}
            <a
              href={`tel:${phoneTel}`}
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'click_to_call', {
                    event_category: 'Contact',
                    event_label: 'Header Phone - Mobile',
                    page_path: window.location.pathname
                  });
                }
              }}
              className="flex items-center gap-3 py-3 px-2 mt-2 rounded-lg bg-[#008a29]/10 text-[#008a29] font-bold"
            >
              <Phone className="w-5 h-5" />
              <span>{phone}</span>
            </a>

            {/* Mobile CTA */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'cta_click', {
                    event_category: 'CTA',
                    event_label: 'Get My Offer - Header Mobile',
                    page_path: window.location.pathname
                  });
                }
                scrollToForm();
              }}
              className="w-full py-3 mt-2 bg-[#008a29] hover:bg-[#007a24] text-white font-semibold rounded-full"
            >
              Get My Offer
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
