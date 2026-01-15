import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const quickLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
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
]

const serviceAreas = [
  { label: "Scranton", href: "/locations/scranton" },
  { label: "Wilkes-Barre", href: "/locations/wilkes-barre" },
  { label: "Allentown", href: "/locations/allentown" },
  { label: "Bethlehem", href: "/locations/bethlehem" },
  { label: "Easton", href: "/locations/easton" },
  { label: "Stroudsburg", href: "/locations/stroudsburg" },
  { label: "East Stroudsburg", href: "/locations/east-stroudsburg" },
  { label: "Hazleton", href: "/locations/hazleton" },
  { label: "Pottsville", href: "/locations/pottsville" },
  { label: "Carbondale", href: "/locations/carbondale" },
  { label: "Pittston", href: "/locations/pittston" },
  { label: "Kingston", href: "/locations/kingston" },
  { label: "Dunmore", href: "/locations/dunmore" },
  { label: "Nanticoke", href: "/locations/nanticoke" },
  { label: "Honesdale", href: "/locations/honesdale" },
  { label: "Bloomsburg", href: "/locations/bloomsburg" },
  { label: "Lehigh Valley", href: "/locations/lehigh-valley" },
  { label: "Poconos", href: "/locations/poconos" },
  { label: "Pocono Pines", href: "/locations/pocono-pines" },
  { label: "Tannersville", href: "/locations/tannersville" },
  { label: "Reading", href: "/locations/reading" },
]

export function V0Footer() {
  return (
    <footer className="bg-white">
      {/* Main Footer */}
      <div className="bg-white border-t border-[#1a1f1a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-3">
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
            <div className="lg:col-span-2">
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
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-[#1a1f1a] mb-4">We Help With</h3>
              <ul className="space-y-3">
                {situations.map((situation) => (
                  <li key={situation.label}>
                    <Link href={situation.href} className="text-sm text-[#1a1f1a]/60 hover:text-[#00b332] transition-colors">
                      {situation.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Areas - 3 columns on desktop */}
            <div className="lg:col-span-5">
              <h3 className="font-semibold text-[#1a1f1a] mb-4">Service Areas</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                {serviceAreas.map((area) => (
                  <Link
                    key={area.label}
                    href={area.href}
                    className="text-sm text-[#1a1f1a]/60 hover:text-[#00b332] transition-colors"
                  >
                    {area.label}
                  </Link>
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
