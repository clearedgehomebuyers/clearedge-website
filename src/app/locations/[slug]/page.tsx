import { getLocationBySlug, getLocations } from '@/sanity/lib/queries'
import { LocalBusinessSchema, FAQSchema } from '@/components/Schema'
import { LeadForm } from '@/components/LeadForm'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, CheckCircle, ArrowRight, ChevronDown, Clock, DollarSign, Shield, Users, Building, Home, FileText } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

export async function generateStaticParams() {
  const locations = await getLocations()
  return locations.map((location: any) => ({
    slug: location.slug.current,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const location = await getLocationBySlug(slug)
  if (!location) return {}
  
  return {
    title: location.metaTitle || `Sell Your House Fast in ${location.city}, PA | ClearEdge Home Buyers`,
    description: location.metaDescription || `Get a fair cash offer for your ${location.city} home in 24 hours. No repairs, no fees, no commissions.`,
  }
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const location = await getLocationBySlug(slug)
  
  if (!location) {
    notFound()
  }

  return (
    <main>
      <LocalBusinessSchema />
      {location.faqs && <FAQSchema faqs={location.faqs} />}
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="ClearEdge Home Buyers" width={180} height={40} className="h-10 w-auto" priority />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">Home</Link>
              <Link href="/how-it-works" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">How It Works</Link>
              <Link href="/about" className="text-sm font-semibold text-slate-600 hover:text-[#0d9488] transition-colors">About</Link>
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
      <section className="relative pt-28 pb-24 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0d9488]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#14b8a6]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <div className="inline-flex items-center space-x-2 bg-[#0d9488]/20 backdrop-blur-sm border border-[#0d9488]/30 rounded-full px-4 py-2 mb-8">
                <MapPin className="w-4 h-4 text-[#14b8a6]" />
                <span className="text-sm font-medium text-[#14b8a6]">{location.city} & {location.county || 'Surrounding Areas'}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {location.heroHeadline || `Sell Your House Fast in`}
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] via-[#0d9488] to-[#14b8a6]">
                  {location.city}, {location.state}
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
                {location.heroSubheadline || `Get a fair cash offer for your ${location.city} home in 24 hours. We buy houses in any condition — no repairs, no fees, no hassle.`}
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-10">
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                  <span className="text-white font-medium">Close in 7-14 days</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                  <span className="text-white font-medium">We pay closing costs</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                  <span className="text-white font-medium">Buy as-is condition</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                  <span className="text-white font-medium">Local market experts</span>
                </div>
              </div>

              <a href="tel:5709042059" className="inline-flex items-center space-x-3 text-[#14b8a6] font-bold text-lg hover:text-[#0d9488] transition-colors">
                <Phone className="w-5 h-5" />
                <span>(570) 904-2059</span>
              </a>
            </div>
            
            {/* Lead Form */}
            <div className="lg:pl-4">
              <LeadForm
                heading={`Get Your ${location.city} Cash Offer`}
                buttonText={`Get My ${location.city} Cash Offer`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Local Trust Bar */}
      {location.nearbyTowns && location.nearbyTowns.length > 0 && (
        <section className="py-6 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-6 text-slate-600">
              <span className="text-sm font-medium">Trusted by homeowners in:</span>
              {location.nearbyTowns.map((town: string) => (
                <span key={town} className="text-sm font-semibold text-slate-800">{town}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local Problem Statement */}
      {location.problemStatement && (
        <section className="py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">LOCAL EXPERTISE</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Selling a House in {location.city} Doesn&apos;t Have to Be Hard</h2>
            </div>
            
            <div className="text-slate-600 space-y-6 text-lg leading-relaxed prose prose-lg max-w-none">
              <PortableText value={location.problemStatement} />
            </div>
          </div>
        </section>
      )}

      {/* Situations */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">WE CAN HELP</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">We Help {location.city} Homeowners in Any Situation</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Building, title: 'Inherited Property', desc: 'Sell without probate delays' },
              { icon: Shield, title: 'Facing Foreclosure', desc: 'Avoid foreclosure, protect credit' },
              { icon: Users, title: 'Divorce', desc: 'Liquidate quickly and move on' },
              { icon: MapPin, title: 'Job Relocation', desc: 'Sell fast when you need to move' },
              { icon: Home, title: 'Rental Property', desc: 'Exit the landlord business' },
              { icon: FileText, title: 'Major Repairs', desc: 'Sell as-is, skip renovations' },
              { icon: DollarSign, title: 'Tax or Code Issues', desc: 'We work with liens & violations' },
              { icon: Clock, title: 'Vacant Property', desc: 'Stop paying for an empty house' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#0d9488]" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      {location.neighborhoods && location.neighborhoods.length > 0 && (
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">NEIGHBORHOODS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{location.city} Areas We Serve</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {location.neighborhoods.map((neighborhood: string) => (
                <div key={neighborhood} className="bg-slate-50 rounded-xl p-4 text-center hover:bg-[#0d9488]/10 transition-colors border border-slate-100">
                  <span className="font-semibold text-slate-700">{neighborhood}</span>
                </div>
              ))}
            </div>
            
            <p className="text-center text-slate-500 mt-8">We buy houses throughout {location.county || location.city} and all surrounding areas.</p>
          </div>
        </section>
      )}

      {/* Comparison Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">COMPARE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Selling to ClearEdge vs. Listing in {location.city}</h2>
          </div>
          
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-white">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-5 px-6 bg-slate-50 font-semibold text-slate-600"></th>
                  <th className="text-center py-5 px-6 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] text-white">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-6 h-6 mb-1" />
                      <span className="font-bold">ClearEdge</span>
                    </div>
                  </th>
                  <th className="text-center py-5 px-6 bg-slate-100 text-slate-700">
                    <span className="font-bold">Traditional Agent</span>
                  </th>
                  <th className="text-center py-5 px-6 bg-slate-100 text-slate-700">
                    <span className="font-bold">FSBO</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Time to Close</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#047857]">7-14 Days</td>
                  <td className="py-5 px-6 text-center text-slate-600">60-90 Days</td>
                  <td className="py-5 px-6 text-center text-slate-600">90+ Days</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Repairs Needed</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#047857]">None</td>
                  <td className="py-5 px-6 text-center text-slate-600">Usually Required</td>
                  <td className="py-5 px-6 text-center text-slate-600">Usually Required</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Fees & Commissions</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#047857]">$0</td>
                  <td className="py-5 px-6 text-center text-slate-600">5-6%</td>
                  <td className="py-5 px-6 text-center text-slate-600">2-3%</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Closing Costs</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#047857]">We Pay</td>
                  <td className="py-5 px-6 text-center text-slate-600">You Pay</td>
                  <td className="py-5 px-6 text-center text-slate-600">You Pay</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Showings Required</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#047857]">Zero</td>
                  <td className="py-5 px-6 text-center text-slate-600">Many</td>
                  <td className="py-5 px-6 text-center text-slate-600">Many</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Sale Certainty</td>
                  <td className="py-5 px-6 text-center bg-[#0d9488]/10 font-bold text-[#047857]">100% Guaranteed</td>
                  <td className="py-5 px-6 text-center text-slate-600">Uncertain</td>
                  <td className="py-5 px-6 text-center text-slate-600">Uncertain</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/#get-offer" className="inline-block px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
              Get Your {location.city} Cash Offer
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {location.faqs && location.faqs.length > 0 && (
        <section className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Common Questions About Selling in {location.city}</h2>
            </div>
            
            <div className="space-y-4">
              {location.faqs.map((faq: any, i: number) => (
                <details key={i} className="group bg-slate-50 rounded-xl border border-slate-200">
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-slate-800">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0d9488]/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Sell Your {location.city} House?</h2>
          <p className="text-xl text-slate-300 mb-10">Get your free, no-obligation cash offer today. We&apos;re local and respond fast.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#get-offer" className="px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg inline-flex items-center justify-center">
              Get My {location.city} Cash Offer <ArrowRight className="w-5 h-5 inline ml-2" />
            </Link>
            <a href="tel:5709042059" className="px-8 py-4 bg-transparent text-white border-2 border-white/40 hover:bg-white hover:text-slate-800 font-semibold rounded-xl transition-all inline-flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              (570) 904-2059
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/logo.png" alt="ClearEdge Home Buyers" width={180} height={40} className="h-10 w-auto" />
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
              <Link href="/privacy-policy" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-slate-300 hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}