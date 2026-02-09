"use client"

import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { useTrafficSource } from "./TrafficSourceProvider"

const quickLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog & Guides", href: "/blog" },
  { label: "Sale Calculator", href: "/calculator" },
  { label: "Cash Buyer vs. Realtor", href: "/cash-buyer-vs-realtor" },
]

const situations = [
  { label: "Foreclosure", href: "/situations/foreclosure" },
  { label: "Inherited Property", href: "/situations/inherited-property" },
  { label: "Divorce", href: "/situations/divorce" },
  { label: "Job Relocation", href: "/situations/job-relocation" },
  { label: "Major Repairs", href: "/situations/major-repairs" },
  { label: "Tax Liens & Code Violations", href: "/situations/tax-liens-code-violations" },
  { label: "Tired Landlord", href: "/situations/tired-landlord" },
  { label: "Vacant Property", href: "/situations/vacant-property" },
  { label: "Foundation & Structural Issues", href: "/situations/foundation-structural-issues" },
]

const serviceAreaRegions = [
  {
    name: "NEPA",
    hub: { label: "NEPA Hub", href: "/locations/nepa" },
    cities: [
      { label: "Scranton", href: "/locations/scranton" },
      { label: "Wilkes-Barre", href: "/locations/wilkes-barre" },
      { label: "Hazleton", href: "/locations/hazleton" },
      { label: "Pittston", href: "/locations/pittston" },
      { label: "Kingston", href: "/locations/kingston" },
      { label: "Nanticoke", href: "/locations/nanticoke" },
      { label: "Carbondale", href: "/locations/carbondale" },
      { label: "Dunmore", href: "/locations/dunmore" },
      { label: "Honesdale", href: "/locations/honesdale" },
      { label: "Bloomsburg", href: "/locations/bloomsburg" },
    ],
  },
  {
    name: "Lehigh Valley",
    hub: { label: "Lehigh Valley Hub", href: "/locations/lehigh-valley" },
    cities: [
      { label: "Allentown", href: "/locations/allentown" },
      { label: "Bethlehem", href: "/locations/bethlehem" },
      { label: "Easton", href: "/locations/easton" },
      { label: "Reading", href: "/locations/reading" },
      { label: "Pottsville", href: "/locations/pottsville" },
    ],
  },
  {
    name: "Poconos",
    hub: { label: "Poconos Hub", href: "/locations/poconos" },
    cities: [
      { label: "Stroudsburg", href: "/locations/stroudsburg" },
      { label: "East Stroudsburg", href: "/locations/east-stroudsburg" },
      { label: "Pocono Pines", href: "/locations/pocono-pines" },
      { label: "Tannersville", href: "/locations/tannersville" },
    ],
  },
]

export function V0Footer() {
  const { phone, phoneTel } = useTrafficSource()

  return (
    <footer className="bg-white">
      {/* Main Footer */}
      <div className="bg-white border-t border-[#1a1f1a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-6">
            {/* Brand Column */}
            <div className="lg:col-span-3">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="cursor-pointer"
                aria-label="Scroll to top"
              >
                <img
                  src="/Primary.svg"
                  alt="ClearEdge Home Buyers logo"
                  className="h-10 w-auto mb-4"
                  width="120"
                  height="40"
                />
              </button>
              <p className="text-[#1a1f1a]/70 text-sm leading-relaxed mb-6">
                Pennsylvania&apos;s trusted cash home buyer since 2016. Fair offers, fast closings, and honest service —
                guaranteed.
              </p>
              <div className="space-y-3">
                <a
                  href={`tel:${phoneTel}`}
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'click_to_call', {
                        event_category: 'Contact',
                        event_label: 'Footer Phone',
                        page_path: window.location.pathname
                      });
                    }
                  }}
                  className="flex items-center gap-3 text-sm text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {phone}
                </a>
                <a
                  href="mailto:info@clearedgehomebuyers.com"
                  className="flex items-center gap-3 text-sm text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@clearedgehomebuyers.com
                </a>
                <div className="flex items-start gap-3 text-sm text-[#1a1f1a]/70">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>Scranton, Pennsylvania</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-[#1a1f1a] mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* We Help With */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-[#1a1f1a] mb-4">We Help With</h3>
              <ul className="space-y-3">
                {situations.map((situation) => (
                  <li key={situation.label}>
                    <Link href={situation.href} className="text-sm text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">
                      {situation.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Areas - Regional hierarchy */}
            <div className="lg:col-span-5">
              <h3 className="font-semibold text-[#1a1f1a] mb-4">Service Areas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {serviceAreaRegions.map((region) => (
                  <div key={region.name}>
                    <Link
                      href={region.hub.href}
                      className="text-sm font-semibold text-[#008a29] hover:text-[#007a24] transition-colors block mb-2"
                    >
                      {region.name} →
                    </Link>
                    <ul className="space-y-1.5">
                      {region.cities.map((city) => (
                        <li key={city.label}>
                          <Link href={city.href} className="text-sm text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">
                            {city.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-white border-t border-[#1a1f1a]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#1a1f1a]/70">
              © {new Date().getFullYear()} ClearEdge Home Buyers. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-sm text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
