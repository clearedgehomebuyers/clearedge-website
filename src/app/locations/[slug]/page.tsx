import { getLocationBySlug, getLocations } from '@/sanity/lib/queries'
import { LocalBusinessSchema, FAQSchema } from '@/components/Schema'
import Link from 'next/link'
import { Phone, MapPin, CheckCircle, ArrowRight, ChevronDown } from 'lucide-react'
import { notFound } from 'next/navigation'

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
              <div className="h-10 bg-gradient-to-r from-blue-900 via-blue-800 to-teal-500 rounded-lg flex items-center justify-center px-4">
                <span className="text-white font-bold tracking-tight text-sm">CLEAREDGE</span>
              </div>
              <span className="text-xl font-bold text-slate-800 hidden sm:block">Home Buyers</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-5">
              <a href="tel:5709042059" className="flex items-center space-x-2 text-slate-700 hover:text-teal-600 transition-colors">
                <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-teal-600" />
                </div>
                <span className="font-bold">(570) 904-2059</span>
              </a>
              <button className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                Get Cash Offer
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-24 px-4 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <div className="inline-flex items-center space-x-2 bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 rounded-full px-4 py-2 mb-8">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-medium text-teal-300">{location.city}, {location.state}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {location.heroHeadline || `Sell Your House Fast in`}
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300">
                  {location.city}, {location.state}
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
                {location.heroSubheadline || `Get a fair cash offer for your ${location.city} home in 24 hours. We buy houses in any condition — no repairs, no fees, no hassle.`}
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-10">
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <span className="text-white font-medium">Close in 7-14 days</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <span className="text-white font-medium">We pay closing costs</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <span className="text-white font-medium">Buy as-is condition</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <span className="text-white font-medium">Local market experts</span>
                </div>
              </div>
              
              <a href="tel:5709042059" className="inline-flex items-center space-x-3 text-teal-400 font-bold text-lg hover:text-teal-300 transition-colors">
                <Phone className="w-5 h-5" />
                <span>(570) 904-2059</span>
              </a>
            </div>
            
            {/* Lead Form */}
            <div className="lg:pl-4">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">Get Your {location.city} Cash Offer</h2>
                  <p className="text-slate-500">No obligation • No fees • Response in 24 hours</p>
                </div>
                
                <form className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                      <input type="text" className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                      <input type="text" className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all" placeholder="Smith" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all" placeholder="(570) 555-0123" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Property Address in {location.city}</label>
                    <input type="text" className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all" placeholder="Start typing address..." />
                  </div>
                  
                  <button type="submit" className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
                    Get My {location.city} Cash Offer <ArrowRight className="w-5 h-5 inline ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {location.faqs && location.faqs.length > 0 && (
        <section className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">FAQ</span>
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
      <section className="py-24 px-4 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Sell Your {location.city} House?</h2>
          <p className="text-xl text-slate-300 mb-10">Get your free, no-obligation cash offer today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
              Get My Cash Offer <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
            <a href="tel:5709042059" className="px-8 py-4 bg-transparent text-white border-2 border-white/40 hover:bg-white hover:text-slate-800 font-semibold rounded-xl transition-all inline-flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              (570) 904-2059
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>© 2026 ClearEdge Home Buyers. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}