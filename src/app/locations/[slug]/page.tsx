import { getLocationBySlug, getLocations } from '@/sanity/lib/queries'
import { LocalBusinessSchema, FAQSchema } from '@/components/Schema'
import { LeadForm } from '@/components/LeadForm'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, CheckCircle, ArrowRight, ChevronDown, Clock, DollarSign, Shield, Users, Building, Home, FileText } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PortableText, PortableTextComponents } from '@portabletext/react'

// Custom components for rendering Portable Text with links
const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      return (
        <a
          href={value?.href}
          className="text-[#0d9488] hover:underline font-medium"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
  },
}

// Helper function to get relevant blog posts based on county
function getHelpfulGuides(county: string | undefined): { title: string; href: string; excerpt: string }[] {
  const guides: { title: string; href: string; excerpt: string }[] = []

  // County-specific guides
  if (county?.includes('Lackawanna')) {
    guides.push({
      title: 'How to Avoid Foreclosure in Scranton PA: 7 Options Before It\'s Too Late',
      href: '/blog/avoid-foreclosure-scranton-pa',
      excerpt: 'Facing foreclosure in Lackawanna County? Learn your options to stop foreclosure and protect your credit.',
    })
    guides.push({
      title: 'Cash Home Buyers in Lackawanna County With No Fees',
      href: '/blog/cash-home-buyers-lackawanna-county-no-fees',
      excerpt: 'What to know before selling to a cash buyer in the Scranton area. No fees, fast closing.',
    })
  }

  if (county?.includes('Luzerne')) {
    guides.push({
      title: 'Sell My House Fast Luzerne County PA: The Complete Local Guide',
      href: '/blog/sell-my-house-fast-luzerne-county-pa',
      excerpt: 'Everything you need to know about selling your house fast in Wilkes-Barre, Hazleton, and Luzerne County.',
    })
  }

  if (county?.includes('Lehigh')) {
    guides.push({
      title: 'Sell My House Fast Lehigh Valley: Your Complete Guide to a Quick Sale',
      href: '/blog/sell-my-house-fast-lehigh-valley',
      excerpt: 'Your complete guide to selling fast in Allentown, Bethlehem, Easton and all of Lehigh Valley.',
    })
    guides.push({
      title: 'Sell My House Fast Allentown: The No-BS Guide From a Local Cash Buyer',
      href: '/blog/sell-my-house-fast-allentown',
      excerpt: 'A straightforward guide to selling your Allentown home fast for cash.',
    })
  }

  if (county?.includes('Northampton')) {
    guides.push({
      title: 'Sell My House Fast Lehigh Valley: Your Complete Guide to a Quick Sale',
      href: '/blog/sell-my-house-fast-lehigh-valley',
      excerpt: 'Your complete guide to selling fast in Allentown, Bethlehem, Easton and all of Lehigh Valley.',
    })
    guides.push({
      title: 'Sell My House Fast Allentown: The No-BS Guide From a Local Cash Buyer',
      href: '/blog/sell-my-house-fast-allentown',
      excerpt: 'Selling in the Lehigh Valley? This guide covers what you need to know.',
    })
  }

  if (county?.includes('Berks')) {
    guides.push({
      title: 'Cash Home Buyers Berks County: The Complete 2026 Guide',
      href: '/blog/cash-home-buyers-berks-county',
      excerpt: 'Looking for cash home buyers in Berks County? Everything you need to know about selling your house fast for cash.',
    })
  }

  if (county?.includes('Schuylkill')) {
    guides.push({
      title: 'Cash Home Buyers Pottsville PA: The Complete Guide to Selling Your Coal Region House Fast',
      href: '/blog/cash-home-buyers-pottsville-pa',
      excerpt: 'Looking for cash home buyers in Pottsville? Your complete guide to selling in Schuylkill County.',
    })
  }

  // Universal guides (show for all locations)
  guides.push({
    title: 'Can I Sell My Deceased Parents\' House Without Probate in Pennsylvania?',
    href: '/blog/sell-deceased-parents-house-without-probate-pennsylvania',
    excerpt: 'Inherited a property? Learn when you can sell without going through probate.',
  })
  guides.push({
    title: 'Documents Required for Selling Inherited Property in Pennsylvania',
    href: '/blog/documents-required-selling-inherited-property-pennsylvania',
    excerpt: 'The complete checklist of paperwork you\'ll need to sell an inherited house.',
  })

  return guides
}

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

  const countyText = location.county ? `, ${location.county}` : ''

  return {
    title: location.metaTitle || `Sell Your House Fast in ${location.city}${countyText} PA | ClearEdge Home Buyers`,
    description: location.metaDescription || `Sell your house fast in ${location.city}${countyText} PA. Get a fair cash offer in 24 hours. No repairs, no fees, no commissions. We buy houses as-is.`,
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
      
      <Header />

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

      {/* County H2 Section */}
      {location.county && (
        <section className="py-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
              We Buy Houses in {location.city} and All of {location.county}
            </h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Whether you&apos;re in {location.city} or anywhere else in {location.county}, we can make you a fair cash offer within 24 hours.
            </p>
          </div>
        </section>
      )}

      {/* Local Trust Bar */}
      {location.nearbyTowns && location.nearbyTowns.length > 0 && (
        <section className="py-6 bg-slate-50 border-b border-slate-100">
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
              <PortableText value={location.problemStatement} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}

      {/* Situations */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">WE CAN HELP</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">We Help {location.city}{location.county ? ` & ${location.county}` : ''} Homeowners</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">No matter what situation you&apos;re facing, we can help you sell your house fast for cash.</p>
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
          
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-white min-w-[640px]">
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

      {/* Helpful Guides Section */}
      {(() => {
        const guides = getHelpfulGuides(location.county)
        return guides.length > 0 ? (
          <section className="py-24 px-4 bg-slate-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 bg-[#0d9488]/10 text-[#047857] rounded-full text-sm font-semibold mb-4">HELPFUL GUIDES</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Related Articles for {location.city} Homeowners</h2>
              </div>

              <div className="space-y-4">
                {guides.map((guide, i) => (
                  <Link
                    key={i}
                    href={guide.href}
                    className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-[#0d9488]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 mb-2 hover:text-[#0d9488] transition-colors">{guide.title}</h3>
                        <p className="text-slate-600 text-sm line-clamp-2">{guide.excerpt}</p>
                        <span className="inline-flex items-center text-[#0d9488] font-semibold text-sm mt-3">
                          Read Article <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null
      })()}

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

      <Footer />
    </main>
  )
}