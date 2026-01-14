import Link from "next/link"
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react"

const quickLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Get Cash Offer", href: "#lead-form" },
]

const situations = [
  "Inherited Property",
  "Foreclosure Help",
  "Divorce Sale",
  "Relocation",
  "Tired Landlord",
  "Tax Lien Properties",
]

const areas = [
  "Scranton",
  "Wilkes-Barre",
  "Allentown",
  "Bethlehem",
  "Easton",
  "Stroudsburg",
  "Hazleton",
  "Lehigh Valley",
]

export function V0Footer() {
  return (
    <footer className="bg-white">
      {/* Main Footer - White */}
      <div className="bg-white border-t border-[#1a1f1a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <img
                src="/Primary.svg"
                alt="ClearEdge Home Buyers"
                className="h-10 w-auto mb-4"
              />
              <p className="text-[#1a1f1a]/60 text-sm leading-relaxed mb-6">
                Pennsylvania&apos;s trusted cash home buyer since 2016. Fair offers, fast closings, and honest service —
                guaranteed.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:5709042059"
                  className="flex items-center gap-3 text-sm text-[#1a1f1a]/60 hover:text-[#00b332] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (570) 904-2059
                </a>
                <a
                  href="mailto:info@clearedgehomebuyers.com"
                  className="flex items-center gap-3 text-sm text-[#1a1f1a]/60 hover:text-[#00b332] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@clearedgehomebuyers.com
                </a>
                <div className="flex items-start gap-3 text-sm text-[#1a1f1a]/60">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>Scranton, Pennsylvania</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-[#1a1f1a] mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-[#1a1f1a]/60 hover:text-[#00b332] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* We Help With */}
            <div>
              <h3 className="font-semibold text-[#1a1f1a] mb-4">We Help With</h3>
              <ul className="space-y-3">
                {situations.map((situation) => (
                  <li key={situation}>
                    <span className="text-sm text-[#1a1f1a]/60">{situation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Areas */}
            <div>
              <h3 className="font-semibold text-[#1a1f1a] mb-4">Service Areas</h3>
              <ul className="space-y-3">
                {areas.map((area) => (
                  <li key={area}>
                    <span className="text-sm text-[#1a1f1a]/60">{area}, PA</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar - White */}
      <div className="bg-white border-t border-[#1a1f1a]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#1a1f1a]/50">
              © {new Date().getFullYear()} ClearEdge Home Buyers. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-sm text-[#1a1f1a]/50 hover:text-[#00b332] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-[#1a1f1a]/50 hover:text-[#00b332] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
