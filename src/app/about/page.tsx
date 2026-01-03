import Link from 'next/link'
import Image from 'next/image'
import { LeadForm } from '@/components/LeadForm'
import { Phone, MapPin, Shield, Clock, DollarSign, Users, Heart, Award, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About Us | ClearEdge Home Buyers | Eastern PA Cash Home Buyers',
  description: 'Learn about ClearEdge Home Buyers - your trusted local cash home buyers in Eastern Pennsylvania. We help homeowners sell fast with fair cash offers, no fees, and no hassle.',
  openGraph: {
    title: 'About Us | ClearEdge Home Buyers',
    description: 'Your trusted local cash home buyers in Eastern Pennsylvania. Fair offers, fast closings, zero fees.',
  },
}

export default function AboutPage() {
  return (
    <main>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.webp" alt="ClearEdge Home Buyers" width={180} height={40} className="h-10 w-auto" priority />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">Home</Link>
              <Link href="/how-it-works" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">How It Works</Link>
              <Link href="/about" className="text-sm font-semibold text-[#0d9488]">About</Link>
              <Link href="/contact" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">Contact</Link>
            </div>

            <div className="hidden md:flex items-center space-x-5">
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0d9488]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#14b8a6]/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center space-x-2 bg-[#0d9488]/20 backdrop-blur-sm border border-[#0d9488]/30 rounded-full px-4 py-2 mb-8">
            <Heart className="w-4 h-4 text-[#14b8a6]" />
            <span className="text-sm font-medium text-[#14b8a6]">Our Story</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Helping Pennsylvania Homeowners
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] via-[#0d9488] to-[#14b8a6]">
              Since Day One
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We&apos;re not just home buyers — we&apos;re problem solvers. ClearEdge Home Buyers was founded to help homeowners navigate difficult situations with fair, fast, and transparent cash offers.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">OUR MISSION</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Making Home Selling Simple, Fast & Fair
              </h2>
              <div className="text-slate-600 space-y-4 text-lg leading-relaxed">
                <p>
                  At ClearEdge Home Buyers, we believe selling your home shouldn&apos;t be stressful. Whether you&apos;re facing foreclosure, dealing with an inherited property, going through a divorce, or simply need to sell quickly — we&apos;re here to help.
                </p>
                <p>
                  We buy houses directly from homeowners throughout Eastern Pennsylvania, offering fair cash prices without the hassle of traditional real estate transactions. No agents, no commissions, no repairs, no waiting.
                </p>
                <p className="font-semibold text-slate-800">
                  Our goal is simple: provide you with a stress-free way to sell your house on your timeline.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Why Homeowners Choose Us</h3>
              <div className="space-y-4">
                {[
                  'Cash offers within 24 hours',
                  'Close in as little as 7 days',
                  'We buy houses in any condition',
                  'Zero fees or commissions',
                  'We pay all closing costs',
                  'Local team, not a national call center',
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#0d9488] flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">OUR VALUES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">What We Stand For</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Transparency',
                desc: 'No hidden fees, no surprises. We explain every step of the process and our offer is exactly what you receive at closing.',
              },
              {
                icon: Clock,
                title: 'Speed',
                desc: 'Get a fair cash offer within 24 hours. Close on your timeline — whether that&apos;s 7 days or 60 days.',
              },
              {
                icon: DollarSign,
                title: 'Fairness',
                desc: 'We make competitive offers based on market value. No lowball tactics or pressure to accept.',
              },
              {
                icon: MapPin,
                title: 'Local Expertise',
                desc: 'We know Eastern Pennsylvania. From Scranton to Allentown, we understand local markets and neighborhoods.',
              },
            ].map((value, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-[#0d9488]" />
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">SERVICE AREAS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Proudly Serving Eastern Pennsylvania</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              From the Poconos to the Lehigh Valley, we buy houses throughout Northeastern and Eastern Pennsylvania.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              'Scranton', 'Wilkes-Barre', 'Allentown', 'Bethlehem', 'Easton', 'Reading',
              'Stroudsburg', 'Hazleton', 'Carbondale', 'Pittston', 'Honesdale', 'Dunmore',
              'Kingston', 'Nanticoke', 'Bloomsburg', 'Pottsville', 'Lehighton', 'Jim Thorpe',
            ].map((city) => (
              <div key={city} className="bg-slate-50 rounded-xl p-3 text-center hover:bg-[#0d9488]/10 transition-colors border border-slate-100">
                <span className="font-semibold text-slate-700 text-sm">{city}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 mt-6">
            Don&apos;t see your area? <a href="tel:5709042059" className="text-[#0d9488] font-semibold hover:underline">Call us</a> — we likely serve your neighborhood too.
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-[#0d9488]/10 rounded-full px-4 py-2 mb-6">
            <Award className="w-5 h-5 text-[#047857]" />
            <span className="text-sm font-semibold text-[#047857]">EXPERIENCE YOU CAN TRUST</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Real Estate Professionals, Not Middlemen
          </h2>

          <p className="text-lg text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Our team brings years of real estate experience to every transaction. We&apos;ve helped hundreds of Pennsylvania homeowners sell their properties quickly and move on with their lives. When you work with ClearEdge, you&apos;re working directly with decision-makers who can give you an answer fast.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '100+', label: 'Homes Purchased' },
              { number: '24hr', label: 'Offer Turnaround' },
              { number: '10+', label: 'Counties Served' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="text-4xl font-bold text-[#0d9488] mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0d9488]/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Sell Your House?</h2>
              <p className="text-xl text-slate-300 mb-8">
                Get your free, no-obligation cash offer today. We&apos;ll respond within 24 hours with a fair price for your property.
              </p>
              <div className="flex items-center space-x-4">
                <a href="tel:5709042059" className="inline-flex items-center space-x-2 text-[#14b8a6] font-bold text-lg hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>(570) 904-2059</span>
                </a>
              </div>
            </div>

            <LeadForm heading="Get Your Free Cash Offer" buttonText="Get My Cash Offer" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/logo.webp" alt="ClearEdge Home Buyers" width={180} height={40} className="h-10 w-auto" />
              </div>
              <p className="text-slate-400 leading-relaxed">We buy houses in any condition throughout Eastern Pennsylvania. Fair cash offers, fast closings, zero fees.</p>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Service Areas</h3>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/locations/scranton" className="hover:text-white transition-colors">Scranton, PA</Link></li>
                <li><Link href="/locations/wilkes-barre" className="hover:text-white transition-colors">Wilkes-Barre, PA</Link></li>
                <li><Link href="/locations/allentown" className="hover:text-white transition-colors">Allentown, PA</Link></li>
                <li><Link href="/locations/bethlehem" className="hover:text-white transition-colors">Bethlehem, PA</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Contact Us</h3>
              <a href="tel:5709042059" className="flex items-center space-x-3 text-slate-400 hover:text-[#14b8a6] transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">(570) 904-2059</span>
              </a>
              <p className="text-sm text-slate-400 mt-3">Serving Eastern Pennsylvania</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-300 text-sm">
            <p>&copy; 2026 ClearEdge Home Buyers. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
