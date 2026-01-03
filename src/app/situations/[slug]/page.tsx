import { getSituationBySlug, getSituations } from '@/sanity/lib/queries'
import { LocalBusinessSchema, FAQSchema } from '@/components/Schema'
import { LeadForm } from '@/components/LeadForm'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, CheckCircle, ArrowRight, ChevronDown, Clock, DollarSign, Shield, Home } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

export async function generateStaticParams() {
  const situations = await getSituations()
  return situations.map((situation: any) => ({
    slug: situation.slug.current,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const situation = await getSituationBySlug(slug)
  if (!situation) return {}

  return {
    title: situation.metaTitle || `${situation.title} - Sell Your House Fast | ClearEdge Home Buyers`,
    description: situation.metaDescription || `Dealing with ${situation.title.toLowerCase()}? Get a fair cash offer for your home in 24 hours. No repairs, no fees, no commissions.`,
  }
}

export default async function SituationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const situation = await getSituationBySlug(slug)

  if (!situation) {
    notFound()
  }

  return (
    <main>
      <LocalBusinessSchema />
      {situation.faqs && <FAQSchema faqs={situation.faqs} />}

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
                <Home className="w-4 h-4 text-[#14b8a6]" />
                <span className="text-sm font-medium text-[#14b8a6]">{situation.title}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {situation.heroHeadline || `Sell Your House Fast`}
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] via-[#0d9488] to-[#14b8a6]">
                  {situation.title}
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
                {situation.heroSubheadline || `Dealing with ${situation.title.toLowerCase()}? We understand. Get a fair cash offer and close on your timeline — no repairs, no fees, no hassle.`}
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
                  <span className="text-white font-medium">No obligation offer</span>
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
                heading="Get Your Cash Offer Today"
                buttonText="Get My Cash Offer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Description */}
      {situation.problemDescription && (
        <section className="py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#0d9488] rounded-full text-sm font-semibold mb-4">WE UNDERSTAND</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Dealing with {situation.title}?</h2>
            </div>

            <div className="text-slate-600 space-y-6 text-lg leading-relaxed prose prose-lg max-w-none">
              <PortableText value={situation.problemDescription} />
            </div>
          </div>
        </section>
      )}

      {/* Benefits Grid */}
      {situation.benefits && situation.benefits.length > 0 && (
        <section className="py-24 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#0d9488] rounded-full text-sm font-semibold mb-4">BENEFITS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Sell to ClearEdge?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">We specialize in helping homeowners facing {situation.title.toLowerCase()} situations.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {situation.benefits.map((benefit: any, i: number) => {
                const icons = [Clock, DollarSign, Shield, Home, CheckCircle, ArrowRight]
                const Icon = icons[i % icons.length]
                return (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-[#0d9488]/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[#0d9488]" />
                    </div>
                    <h3 className="font-bold text-xl text-slate-800 mb-3">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#0d9488] rounded-full text-sm font-semibold mb-4">SIMPLE PROCESS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Contact Us', desc: 'Call or fill out our form. Tell us about your property and situation.' },
              { step: '2', title: 'Get Your Offer', desc: 'We\'ll evaluate your property and present a fair, no-obligation cash offer within 24 hours.' },
              { step: '3', title: 'Close & Get Paid', desc: 'Accept and pick your closing date. We handle all the paperwork and pay closing costs.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Locations */}
      {situation.relatedLocations && situation.relatedLocations.length > 0 && (
        <section className="py-24 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#0d9488] rounded-full text-sm font-semibold mb-4">SERVICE AREAS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Areas We Serve</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {situation.relatedLocations.map((location: any) => (
                <Link
                  key={location.slug.current}
                  href={`/locations/${location.slug.current}`}
                  className="bg-white rounded-xl p-4 text-center hover:bg-[#0d9488]/10 transition-colors border border-slate-100 hover:border-[#0d9488]/30"
                >
                  <span className="font-semibold text-slate-700">{location.city}, {location.state}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {situation.faqs && situation.faqs.length > 0 && (
        <section className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#0d9488] rounded-full text-sm font-semibold mb-4">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Common Questions About {situation.title}</h2>
            </div>

            <div className="space-y-4">
              {situation.faqs.map((faq: any, i: number) => (
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
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Move Forward?</h2>
          <p className="text-xl text-slate-300 mb-10">Get your free, no-obligation cash offer today. We&apos;re here to help with your {situation.title.toLowerCase()} situation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#get-offer" className="px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg inline-flex items-center justify-center">
              Get My Cash Offer <ArrowRight className="w-5 h-5 inline ml-2" />
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
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Service Areas</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/locations/scranton" className="hover:text-white transition-colors">Scranton, PA</Link></li>
                <li><Link href="/locations/wilkes-barre" className="hover:text-white transition-colors">Wilkes-Barre, PA</Link></li>
                <li><Link href="/locations/allentown" className="hover:text-white transition-colors">Allentown, PA</Link></li>
                <li><Link href="/locations/bethlehem" className="hover:text-white transition-colors">Bethlehem, PA</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Contact Us</h4>
              <a href="tel:5709042059" className="flex items-center space-x-3 text-slate-400 hover:text-[#14b8a6] transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">(570) 904-2059</span>
              </a>
              <p className="text-sm text-slate-400 mt-3">Serving Eastern Pennsylvania</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
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
