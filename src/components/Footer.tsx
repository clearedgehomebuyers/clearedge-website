import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Image src="/logo.webp" alt="ClearEdge Home Buyers" width={180} height={40} className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-slate-300 leading-relaxed">We buy houses in any condition throughout Eastern Pennsylvania. Fair cash offers, fast closings, zero fees.</p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-slate-300">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-lg">Service Areas</h3>
            <ul className="space-y-3 text-slate-300">
              <li><Link href="/locations/scranton" className="hover:text-white transition-colors">Scranton, PA</Link></li>
              <li><Link href="/locations/wilkes-barre" className="hover:text-white transition-colors">Wilkes-Barre, PA</Link></li>
              <li><Link href="/locations/allentown" className="hover:text-white transition-colors">Allentown, PA</Link></li>
              <li><Link href="/locations/bethlehem" className="hover:text-white transition-colors">Bethlehem, PA</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-lg">Contact Us</h3>
            <a href="tel:5709042059" className="flex items-center space-x-3 text-slate-300 hover:text-[#14b8a6] transition-colors">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">(570) 904-2059</span>
            </a>
            <p className="text-sm text-slate-300 mt-3">Serving Eastern Pennsylvania</p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-300 text-sm">
          <p>&copy; 2026 ClearEdge Home Buyers. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
