import { getLocationBySlug, getLocations, getBlogPostsByLocation } from '@/sanity/lib/queries'
import { LocalBusinessSchema, FAQSchema } from '@/components/Schema'
import { LeadForm } from '@/components/LeadForm'
import { ScrollToFormButton } from '@/components/ScrollToFormButton'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, CheckCircle, ArrowRight, ChevronDown, Clock, DollarSign, Shield, Users, Building, Home, FileText, BookOpen } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PortableText, PortableTextComponents } from '@portabletext/react'

// Custom components for rendering Portable Text with links
const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      return (
        <a
          href={value?.href}
          className="text-amber-600 hover:underline font-medium"
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


export async function generateStaticParams() {
  const locations = await getLocations()
  return locations.map((location: any) => ({
    slug: location.slug.current,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const location = await getLocationBySlug(slug)
  if (!location) {
    return {
      title: 'Location Not Found | ClearEdge Home Buyers',
    }
  }

  const title = location.metaTitle || `Sell Your House Fast in ${location.city}, PA | ClearEdge Home Buyers`
  const description = location.metaDescription || `Get a fair cash offer for your ${location.city} home. ClearEdge buys houses as-is for cash. No repairs, no fees. Call Tyler: (570) 904-2059.`
  const url = `https://www.clearedgehomebuyers.com/locations/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'ClearEdge Home Buyers',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://www.clearedgehomebuyers.com/og-image.png',
          width: 1200,
          height: 630,
          alt: 'ClearEdge Home Buyers - Sell Your House Fast for Cash in Pennsylvania',
        },
      ],
    },
  }
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [location, relatedBlogPosts] = await Promise.all([
    getLocationBySlug(slug),
    getBlogPostsByLocation(slug)
  ])

  if (!location) {
    notFound()
  }

  return (
    <main>
      <LocalBusinessSchema />
      {location.faqs && <FAQSchema faqs={location.faqs} />}
      
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-24 px-4 bg-slate-900 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-4 py-2 mb-8">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-500">{location.city} & {location.county || 'Surrounding Areas'}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {location.heroHeadline || `Sell Your House Fast in`}
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400">
                  {location.city}, {location.state}
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
                {location.heroSubheadline || `Get a fair cash offer for your ${location.city} home in 24 hours. We buy houses in any condition — no repairs, no fees, no hassle.`}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-10">
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                  <span className="text-white font-medium">Close in 7-14 days</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                  <span className="text-white font-medium">We pay closing costs</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                  <span className="text-white font-medium">Buy as-is condition</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                  <span className="text-white font-medium">Local market experts</span>
                </div>
              </div>

              <a href="tel:5709042059" className="inline-flex items-center space-x-3 text-amber-500 font-bold text-lg hover:text-amber-600 transition-colors">
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
              <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-sm font-semibold mb-4">LOCAL EXPERTISE</span>
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
            <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-sm font-semibold mb-4">WE CAN HELP</span>
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
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-amber-600" />
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
              <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-sm font-semibold mb-4">NEIGHBORHOODS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{location.city} Areas We Serve</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {location.neighborhoods.map((neighborhood: string) => (
                <div key={neighborhood} className="bg-slate-50 rounded-xl p-4 text-center hover:bg-amber-500/10 transition-colors border border-slate-100">
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
            <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-sm font-semibold mb-4">COMPARE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Selling to ClearEdge vs. Listing in {location.city}</h2>
          </div>

          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-white min-w-[640px]">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-5 px-6 bg-slate-50 font-semibold text-slate-600"></th>
                  <th className="text-center py-5 px-6 bg-gradient-to-br from-amber-500 to-amber-400 text-white">
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
                  <td className="py-5 px-6 text-center bg-amber-500/10 font-bold text-amber-700">7-14 Days</td>
                  <td className="py-5 px-6 text-center text-slate-600">60-90 Days</td>
                  <td className="py-5 px-6 text-center text-slate-600">90+ Days</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Repairs Needed</td>
                  <td className="py-5 px-6 text-center bg-amber-500/10 font-bold text-amber-700">None</td>
                  <td className="py-5 px-6 text-center text-slate-600">Usually Required</td>
                  <td className="py-5 px-6 text-center text-slate-600">Usually Required</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Fees & Commissions</td>
                  <td className="py-5 px-6 text-center bg-amber-500/10 font-bold text-amber-700">$0</td>
                  <td className="py-5 px-6 text-center text-slate-600">5-6%</td>
                  <td className="py-5 px-6 text-center text-slate-600">2-3%</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Closing Costs</td>
                  <td className="py-5 px-6 text-center bg-amber-500/10 font-bold text-amber-700">We Pay</td>
                  <td className="py-5 px-6 text-center text-slate-600">You Pay</td>
                  <td className="py-5 px-6 text-center text-slate-600">You Pay</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Showings Required</td>
                  <td className="py-5 px-6 text-center bg-amber-500/10 font-bold text-amber-700">Zero</td>
                  <td className="py-5 px-6 text-center text-slate-600">Many</td>
                  <td className="py-5 px-6 text-center text-slate-600">Many</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-5 px-6 font-semibold text-slate-700">Sale Certainty</td>
                  <td className="py-5 px-6 text-center bg-amber-500/10 font-bold text-amber-700">100% Guaranteed</td>
                  <td className="py-5 px-6 text-center text-slate-600">Uncertain</td>
                  <td className="py-5 px-6 text-center text-slate-600">Uncertain</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          <div className="text-center mt-12">
            <ScrollToFormButton className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
              Get Your {location.city} Cash Offer
            </ScrollToFormButton>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {location.faqs && location.faqs.length > 0 && (
        <section className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-sm font-semibold mb-4">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Common Questions About Selling in {location.city}</h2>
            </div>

            <div className="space-y-4">
              {location.faqs.map((faq: any, i: number) => (
                <details key={i} className="group bg-slate-50 rounded-xl border border-slate-200">
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-slate-800">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-amber-500 group-open:rotate-180 transition-transform" />
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
      {relatedBlogPosts && relatedBlogPosts.length > 0 && (
        <section className="py-24 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-sm font-semibold mb-4">HELPFUL GUIDES</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Related Articles for {location.city} Homeowners</h2>
            </div>

            <div className="space-y-4">
              {relatedBlogPosts.slice(0, 3).map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 mb-2 hover:text-amber-600 transition-colors">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-slate-600 text-sm line-clamp-2">{post.excerpt}</p>
                      )}
                      <span className="inline-flex items-center text-amber-600 font-semibold text-sm mt-3">
                        Read Article <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* More Helpful Guides Button */}
            <div className="text-center mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-2 text-amber-600" />
                More Helpful Guides
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA with Lead Form */}
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Sell Your {location.city} House?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Get a fair cash offer in 24 hours. No repairs, no fees, no obligation.
          </p>
          <LeadForm id="lead-form" />
        </div>
      </section>

      <Footer />
    </main>
  )
}