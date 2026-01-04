import Link from 'next/link'
import Image from 'next/image'
import { LeadForm } from '@/components/LeadForm'
import { Phone, MapPin, Heart, CheckCircle, Building2 } from 'lucide-react'

export const metadata = {
  title: 'About Us | ClearEdge Home Buyers | Eastern PA Cash Home Buyers',
  description: 'Meet Tyler, founder of ClearEdge Home Buyers. Learn about our mission to help Eastern Pennsylvania homeowners sell their houses fast with fair cash offers.',
  openGraph: {
    title: 'About Us | ClearEdge Home Buyers',
    description: 'Meet Tyler and learn why ClearEdge Home Buyers is your trusted local cash home buyer in Eastern Pennsylvania.',
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
            Meet Tyler, Founder of
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] via-[#0d9488] to-[#14b8a6]">
              ClearEdge Home Buyers
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Local real estate investor passionate about helping Pennsylvania homeowners and revitalizing communities.
          </p>
        </div>
      </section>

      {/* Tyler Bio Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Tyler's Photo */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#0d9488]/20 shadow-xl">
                <Image
                  src="/tyler.jpg"
                  alt="Tyler - Founder of ClearEdge Home Buyers"
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio Content */}
            <div className="flex-1">
              <div className="text-black space-y-5 text-lg leading-relaxed">
                <p>
                  I got into real estate back in 2017 with a close friend who shared my passion for the industry. We were both looking to carve our own path, and real estate felt like the right fit.
                </p>
                <p>
                  I started on the Realtor side, learning the ins and outs of the business. After a few years, I took some time to recalibrate and came back with a new focus — rental properties. My partner and I began acquiring properties right here in Scranton, managing them ourselves and doing the elbow-grease work to turn over our first units.
                </p>
                <p>
                  Those early days of hands-on renovations opened my eyes to the opportunities in Northeastern Pennsylvania. I saw a chance to do more than just deals — to beautify properties, provide quality housing for families, and contribute to communities that needed investment.
                </p>
                <p>
                  That&apos;s why I started ClearEdge Home Buyers. We buy houses directly from homeowners who need a fast, fair, and hassle-free sale. No agents, no fees, no waiting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why I Do This Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Why I Do This</h2>

          <div className="text-black space-y-5 text-lg leading-relaxed">
            <p>
              I do this for my own family, and I do this to make life easier for other families across Northeastern and Eastern Pennsylvania. When we buy a property, everyone wins — the seller gets a quick close with cash in hand, and we get to transform another house into a home someone will be proud to live in.
            </p>
            <p>
              If you&apos;re thinking about selling your house, I&apos;d love to talk. No pressure, no obligation — just a straightforward conversation about your options.
            </p>
          </div>

          <div className="mt-10 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xl font-semibold text-slate-800 mb-1">— Tyler</p>
            <p className="text-slate-600">Founder, ClearEdge Home Buyers</p>
            <a href="tel:5709042059" className="inline-flex items-center space-x-2 mt-3 text-[#0d9488] font-bold text-lg hover:text-[#0a7c72] transition-colors">
              <Phone className="w-5 h-5" />
              <span>(570) 904-2059</span>
            </a>
          </div>
        </div>
      </section>

      {/* Why Homeowners Choose Us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">WHY CLEAREDGE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Why Homeowners Choose Us</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Cash offers within 24 hours',
              'Close in as little as 7 days',
              'We buy houses in any condition',
              'Zero fees or commissions',
              'We pay all closing costs',
              'Local team, not a national call center',
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 bg-slate-50 rounded-xl p-5 border border-slate-100">
                <CheckCircle className="w-6 h-6 text-[#0d9488] flex-shrink-0" />
                <span className="text-slate-800 font-medium text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 px-4 bg-slate-50">
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
              <div key={city} className="bg-white rounded-xl p-3 text-center hover:bg-[#0d9488]/10 transition-colors border border-slate-100">
                <span className="font-semibold text-slate-700 text-sm">{city}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 mt-6">
            Don&apos;t see your area? <a href="tel:5709042059" className="text-[#0d9488] font-semibold hover:underline">Call us</a> — we likely serve your neighborhood too.
          </p>
        </div>
      </section>

      {/* Title Company Partner Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">TRUSTED PARTNER</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Our Trusted Closing Partner</h2>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200 text-center">
            <div className="w-16 h-16 bg-[#0d9488]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-[#0d9488]" />
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-2">Brokers Settlement Services</h3>
            <div className="flex items-center justify-center space-x-2 text-slate-600 mb-6">
              <MapPin className="w-4 h-4" />
              <span>Pittsburgh, PA</span>
            </div>

            <p className="text-lg text-slate-700 max-w-2xl mx-auto italic">
              &ldquo;We work with Matt Buckley and the team at Brokers Settlement Services to ensure every closing is smooth, professional, and stress-free for our sellers.&rdquo;
            </p>
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
