'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
          <Link href="/" className="flex items-center" aria-label="ClearEdge Home Buyers Primary Logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1634 560" className="w-[180px] h-auto block" aria-label="ClearEdge Home Buyers">
              <path fill="#005db4" d="m1245.56 175.457 1.06-.038c1.32 1.311 1.22 2.672 1.23 4.593.51 90.897-.93 181.989.07 272.867-13.48-.192-26.98-.168-40.46.072-.27-6.562-1.75-16.32-2.4-23.364a68.6 68.6 0 0 1-6.31 7.802c-17.92 19.064-44.8 21.261-69.18 17.033-18.95-3.284-31.65-11.105-45.28-24-35.13-37.407-31.05-113.321 14.23-141.315 30.66-18.947 86.73-18.658 106.81 14.793-.31-37.952-.35-75.906-.11-113.859 13.51-4.68 26.96-9.542 40.34-14.584m-83.55 239.833c26.97-5.007 44.81-30.903 39.86-57.885s-30.81-44.866-57.81-39.977c-27.08 4.904-45.04 30.858-40.07 57.924 4.96 27.066 30.96 44.961 58.02 39.938"/>
              <path fill="#00b332" d="M581.006 276.286c24.077-.811 50.209 5.243 63.031 27.78.204-8.588.261-15.372 1.569-23.834l41.212-.051c1.201 55.924-.1 116.483.124 172.801-13.778-.572-27.79-.27-41.594-.136.174-6.647-.917-17.817-1.321-24.9-2.754 4.59-4.108 6.676-7.522 10.768-30.39 25.401-74.316 24.853-105.62 1.287-37.974-28.587-40.967-97.71-12.397-133.774 16.083-20.301 37.92-27.043 62.518-29.941m14.566 141.459c28.239-1.53 49.95-25.56 48.612-53.804-1.337-28.245-25.222-50.116-53.48-48.971-28.532 1.155-50.665 25.319-49.315 53.837s25.669 50.483 54.183 48.938"/>
              <path fill="#005db4" d="M861.228 208.273c59.703-1.069 122.702-.037 182.682-.046-.08 15.174-.04 30.349.11 45.523l-136.246.009-.002 55.531c17.436-.575 36.814-.181 54.368-.184a6990 6990 0 0 1 77.58.146c-.05 14.207-.01 28.414.11 42.62l-99.562-.023-32.551.049c.359 17.749.049 36.487.043 54.311l136.15-.014c-.1 15.562-.05 31.125.12 46.686-59.073-1.155-123.586-.347-182.818-.019.586-28.978.101-59.601.104-88.683z"/>
              <path fill="#00b332" d="M385.935 275.531c5.073-.992 17.512-.369 22.953.099 60.165 5.166 80.187 52.731 74.733 106.234-17.786-.604-37.283-.239-55.173-.243a6504 6504 0 0 0-78.769.168c7.841 37.867 50.507 42.054 81.11 30.156 4.433-1.724 12.925-9.182 16.657-9.408l3.055 2.804 23.71 23.776c-33.192 32.331-97.199 37.713-134.791 10.259-53.895-39.361-43.181-140.315 24.56-159.311 7.989-2.24 13.581-3.392 21.955-4.534m-35.579 70.708 45.777.004 46.566-.013c-2.621-12.019-5.902-18.509-16.467-25.991-6.014-4.259-20.706-7.774-27.82-7.21-24.054 2.073-39.617 8.834-48.056 33.21"/>
              <path fill="#00b332" d="M788.048 276.3c21.508-1.139 38.817 1.168 55.547 16.005-5.749 11.953-13.211 25.545-19.349 37.539-17.936-14.574-44.813-15.981-62.033-.048-14.308 13.24-11.474 40.309-11.463 58.117l.103 62.999-.221 1.35c-1.454.78-37.859.523-42.414.551-.68-19.488-.149-41.677-.152-61.382l.096-111.232 39.353-.014c1.188 5.079 2.34 14.097 3.193 19.514a67 67 0 0 1 2.432-3.732c9.389-13.378 19.773-17.062 34.908-19.667"/>
              <path fill="#00b332" d="M240.209 208.287c13.8-.313 28.757-.031 42.653-.042 1.263 22.029.177 58.806.176 81.726l-.032 162.901c-14.016-.464-28.796-.201-42.816.034z"/>
              <path fill="#005db4" d="M693.281 490.372c11.352-.507 25.119-.692 36.385.265 16.728 1.421 26.282 20.852 9.922 31.896 11.937 7.406 14.327 12.524 9.924 26.288a40 40 0 0 1-2.444 2.653c-10.57 10.323-38.557 7.485-53.793 7.39zm15.374 54.824c8.509.062 18.212 1.001 25.878-2.521 8.135-15.383-17.856-12.142-25.886-11.966zm-.003-41.318-.004 13.364 16.798.001c4.968-.758 7.359-2.23 7.038-7.217-3.672-6.751-8.419-6.283-15.052-6.275z"/>
              <path fill="#005db4" d="M1052.29 490.376c21.02-.345 65.6-6.742 55.61 31.115-1.68 6.375-7.26 10.126-12.92 12.949 5.09 6.668 12.26 17.098 16.54 24.095l-8.76.331c-2.94.04-6.19-.068-9.16-.106l-14.68-22.01-11.24.052c-.02 7.375.06 14.751.25 22.124l-15.65-.069zm15.42 32.901c7.63.108 16.99 1.282 23.29-2.844 2.76-3.236 4.54-9.947.59-12.786-6.12-4.393-16.66-3.415-23.84-3.305z"/>
              <path fill="#005db4" d="m488.945 490.259 16.791-.017c.468 22.259.06 46.282.079 68.671-4.972.111-10.563-.054-15.588-.084l.004-27.148-.005-16.558c-4.128 6.37-14.649 23.239-19.35 28.25l-18.46-27.971c.793 13.143.389 30.07.537 43.605l-15.715-.253.002-68.36c4.76-.242 11.424-.098 16.319-.129 5.753 8.381 12.769 19.867 17.858 28.591 5.396-9.535 11.696-19.268 17.528-28.597"/>
              <path fill="#005db4" d="M295.222 490.198c1.499-.07 1.68-.042 3.064.538 1.581 5.337.499 58.744.633 68.27l-15.683-.256.012-27.111q-13.684.23-27.369.055c.066 7.067.518 19.728-.223 26.314-1.942 1.391-5.3.965-7.824.923l-7.625-.102.002-68.514 15.664-.046.01 26.943q13.67-.035 27.34.08l.008-26.982z"/>
              <path fill="#005db4" d="M541.196 490.4c13.815-.904 37.153-.138 51.699-.139l.042 13.739c-11.838-.208-24.226-.051-36.101-.06l.019 13.288 31.95-.01.06 13.642a2779 2779 0 0 0-32.023.001l.01 14.215q18.439-.183 36.878.01l.105 13.85a3169 3169 0 0 0-52.688.003c.621-22.122.158-46.252.049-68.539"/>
              <path fill="#005db4" d="M967.177 490.408c14.559-.848 36.493-.166 51.613-.185l.09 13.742-36.153.013.052 13.231 31.191-.026.05 13.763a946 946 0 0 0-30.84-.046c-.701 1.635-.41 11.738-.399 14.229 11.151-.43 24.759-.116 36.089-.115l.03 13.892-51.715-.102z"/>
              <path fill="#005db4" d="m826.287 490.283 15.553-.003-.031 13.68c.117 13.806 2.842 37.44-7.242 47.614-10.164 10.789-33.907 10.921-44.078.221-11.749-12.361-8.226-44.336-8.251-61.446 4.999-.157 10.578-.05 15.628-.067-.08 8.872-2.663 46.908 5.042 51.539 30.817 18.524 23.594-35.161 23.379-51.538"/>
              <path fill="#005db4" d="M1163.47 489.222c9.45-.715 19.33 3.506 26.95 8.776l-7.95 12.057c-5.9-3.732-23.13-13.176-26.37-1.533 2.86 9.502 21.07 7.488 31.31 17.366a16.82 16.82 0 0 1 5.26 12.427c-.06 17.934-16.14 21.318-30.45 20.964-9.43-.427-17.28-5.077-24.28-10.959a723 723 0 0 1 9.2-10.926c7.3 5.88 17.31 11.594 26.52 6.79 2.51-1.307 2.89-1.62 3.72-4.104-1.93-7.832-23.9-10.119-30.11-15.44-2.72-2.327-3.12-2.97-5.29-5.889-2.55-18.531 2.4-26.671 21.49-29.529"/>
              <path fill="#005db4" d="M920.313 490.248c5.735-.091 11.792.074 17.554.135-5.02 8.655-11.474 18.445-16.937 26.83-2.72 4.635-6.147 9.703-9.084 14.269-.217 8.884.017 18.505.068 27.444l-15.737-.061c.132-9.082.025-18.367.018-27.467l-26.011-40.878c5.479-.355 12.191-.219 17.766-.252 4.836 6.781 11.92 19.401 16.448 26.899 4.734-8.806 10.711-18.283 15.915-26.919"/>
              <path fill="#005db4" d="M1412.18 262.506c10.6 8.229 21.32 16.31 32.14 24.241q-9.75 12.172-19.38 24.451c3.88 4.789 6.7 8.577 9.54 14.156 16.84 33.011 8.7 84.244-27.49 100.928 14.13 7.051 27.68 18.648 31.91 34.08 14.16 51.652-18.82 95.037-71.76 98.796-1.84.13-5.5.475-7.24.842h-6.43c-50.2-6.295-80.58-22.037-85.4-77.761 14.15-.003 28.56.136 42.69-.044 1.92 12.501 4.29 19.834 15.43 28.226 26.64 20.06 77.69 6.606 72.72-32.557-.97-7.71-7.08-16.547-13.51-20.685-14.5-9.862-29.51-7.665-45.81-9.689-36.15-4.491-62.36-27.717-69.07-63.985-4.66-25.154-1.54-51.096 12.89-72.798 11.75-17.667 32.42-30.667 53.24-34.041 19.22-3.114 41.47-3.005 58.4 7.517 5.55-7.004 11.82-14.579 17.13-21.677m-53.24 146.769c52.47-1.386 58.91-92.683-4.28-95.503-6.16.755-10.05 1.448-15.82 3.648-32.52 12.393-36.82 62.413-10.37 83.025 9.5 7.403 18.81 9.047 30.47 8.83"/>
              <path fill="#00b332" d="M0 324.729c1.247-8.762 1.71-16.336 3.602-25.122 6.14-28.511 21.387-53.981 44.81-71.618 27.302-20.558 65.681-27.934 99.172-23.257 26.454 3.694 53.089 16.739 71.532 36.225-10.369 10.445-20.893 19.959-31.014 30.075-30.091-30.72-87.564-31.134-118.15-.907-31.667 31.296-32.357 90.638-.683 122.167 31.123 30.979 90.41 28.617 120.746-2.421q.245-.251.487-.505l32.093 32.191c-29.797 30.109-68.104 38.675-109.174 35.777-56.668-4-100.713-40.712-110.526-97.403-1.074-6.206-1.593-16.293-2.895-21.78z"/>
              <path fill="#005db4" d="M1623.68 428.62c-31.91 33.409-96.22 37.336-133.71 11.671-40.52-27.084-45.06-92.954-18.59-130.314 36.22-51.104 137.37-47.38 157.03 17.587 3.48 11.507 3.73 18.516 5.59 29.972v16.439c-.39 2.966-.57 4.347-1.45 7.275-4.62.941-32.76.524-39.72.518l-93.45.014c2.39 21.287 21.31 33.07 41.1 35.486a75.28 75.28 0 0 0 55.61-15.319c8.52 8.704 18.63 17.667 27.59 26.671m-123.86-82.358 45.22-.026 47.21-.003c-7.23-25.653-18.38-30.888-44.41-33.178-25.2 1.974-38.66 9.017-48.02 33.207"/>
              <path fill="#005db4" d="M1228.66 0h.53c2.74 2.496 37.54 18.064 42.94 20.555 56.78 26.239 113.61 54.35 170.55 80.054l-.02 167.699c-7.89-4.246-17.91-11.698-26.45-16.651l.03-134.434c-19.58-7.874-48.43-22.349-68.13-31.726-30.22-14.389-63.93-29.016-93.48-44.061.94 20.749.2 47.55.19 68.769 12.24-5.93 25.42-12.425 37.87-17.704l-.03 110.095c-.01 20.032-.53 43.372.34 63.144-8.87-.087-17.9.013-26.79.025l.02-132.078c-21.06 10.589-42.99 20.043-64.2 30.397-6.55 3.201-13.57 6.537-20.38 9.086l.1 96.055c-8.84-.832-17.7-2.29-26.48-3.635l-.01-108.882c22-9.933 51.67-25.739 73.08-33.899-.71-25.398.42-52.684-.06-78.317-.15-8.604-.55-37.818.38-44.492"/>
              <path fill="#005db4" d="M365.747 560c-11.406-1.733-20.345-4.764-27.521-14.568a35.52 35.52 0 0 1-6.174-26.538 35.19 35.19 0 0 1 14.26-23.197c25.628-18.161 63.343 2.334 57.025 36.001a33.32 33.32 0 0 1-14.44 21.638c-6.325 4.233-10.92 5.393-18.228 6.664zm4.805-15.155c11.105-1.504 18.958-11.626 17.653-22.754s-11.286-19.161-22.438-18.056a20.549 20.549 0 1 0 4.785 40.81"/>
            </svg>
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
