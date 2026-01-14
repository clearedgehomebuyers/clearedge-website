import { getLocationBySlug, getLocations, getBlogPostsByLocation } from '@/sanity/lib/queries'
import { LocalBusinessSchema, FAQSchema } from '@/components/Schema'
import { MultiStepLeadForm } from '@/components/MultiStepLeadForm'
import { ScrollToFormButton } from '@/components/ScrollToFormButton'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { LocationFAQAccordion } from '@/components/LocationFAQAccordion'
import Link from 'next/link'
import { Phone, MapPin, CheckCircle, ArrowRight, Clock, DollarSign, Shield, Users, Building, Home, FileText, BookOpen } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PortableText, PortableTextComponents } from '@portabletext/react'

// Custom components for rendering Portable Text with links
const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      return (
        <a
          href={value?.href}
          className="text-[#00b332] hover:underline font-medium"
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
    <main className="bg-white">
      <LocalBusinessSchema />
      {location.faqs && <FAQSchema faqs={location.faqs} />}

      <V0Header />

      {/* Hero Section - Cream with dot pattern */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#FAF8F5] overflow-hidden">
        {/* Dot pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231a1f1a' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-[#1a1f1a]/10 rounded-full px-4 py-2 mb-6">
                <MapPin className="w-4 h-4 text-[#00b332]" />
                <span className="text-sm font-medium text-[#1a1f1a]/70">{location.city} & {location.county || 'Surrounding Areas'}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-[#1a1f1a] mb-6 leading-tight">
                {location.heroHeadline || `Sell Your House Fast in`}
                <span className="block mt-2 text-[#00b332]">
                  {location.city}, {location.state}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-[#1a1f1a]/60 mb-8 max-w-lg leading-relaxed">
                {location.heroSubheadline || `Get a fair cash offer for your ${location.city} home in 24 hours. We buy houses in any condition — no repairs, no fees, no hassle.`}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  'Close in 7-14 days',
                  'We pay closing costs',
                  'Buy as-is condition',
                  'Local market experts',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3 border border-[#1a1f1a]/5">
                    <CheckCircle className="w-5 h-5 text-[#00b332]" />
                    <span className="text-[#1a1f1a]/70 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <a href="tel:5709042059" className="inline-flex items-center gap-3 text-[#00b332] font-semibold text-lg hover:text-[#009929] transition-colors">
                <Phone className="w-5 h-5" />
                <span>(570) 904-2059</span>
              </a>
            </div>

            {/* MultiStep Lead Form */}
            <div className="lg:pl-4">
              <MultiStepLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* County H2 Section - White */}
      {location.county && (
        <section className="py-10 bg-white border-b border-[#1a1f1a]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a]">
              We Buy Houses in {location.city} and All of {location.county}
            </h2>
            <p className="text-[#1a1f1a]/60 mt-3 max-w-2xl mx-auto">
              Whether you&apos;re in {location.city} or anywhere else in {location.county}, we can make you a fair cash offer within 24 hours.
            </p>
          </div>
        </section>
      )}

      {/* Local Trust Bar - Cream */}
      {location.nearbyTowns && location.nearbyTowns.length > 0 && (
        <section className="py-6 bg-[#FAF8F5] border-b border-[#1a1f1a]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-6 text-[#1a1f1a]/60">
              <span className="text-sm font-medium">Trusted by homeowners in:</span>
              {location.nearbyTowns.map((town: string) => (
                <span key={town} className="text-sm font-semibold text-[#1a1f1a]">{town}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local Problem Statement - White */}
      {location.problemStatement && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Local Expertise</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Selling a House in {location.city} Doesn&apos;t Have to Be Hard</h2>
            </div>

            <div className="text-[#1a1f1a]/60 space-y-6 text-lg leading-relaxed prose prose-lg max-w-none">
              <PortableText value={location.problemStatement} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}

      {/* Situations - Cream */}
      <section className="py-16 md:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">We Can Help</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a] mb-4">We Help {location.city}{location.county ? ` & ${location.county}` : ''} Homeowners</h2>
            <p className="text-[#1a1f1a]/60 max-w-2xl mx-auto">No matter what situation you&apos;re facing, we can help you sell your house fast for cash.</p>
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
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[#00b332]/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#00b332]" />
                </div>
                <h3 className="font-serif font-medium text-[#1a1f1a] mb-2">{item.title}</h3>
                <p className="text-[#1a1f1a]/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods - White */}
      {location.neighborhoods && location.neighborhoods.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Neighborhoods</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">{location.city} Areas We Serve</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {location.neighborhoods.map((neighborhood: string) => (
                <div key={neighborhood} className="bg-[#FAF8F5] rounded-2xl p-4 text-center hover:bg-[#00b332]/5 transition-colors border border-[#1a1f1a]/5">
                  <span className="font-medium text-[#1a1f1a]/70">{neighborhood}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-[#1a1f1a]/50 mt-8">We buy houses throughout {location.county || location.city} and all surrounding areas.</p>
          </div>
        </section>
      )}

      {/* Comparison Section - Cream */}
      <section className="py-16 md:py-20 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Compare</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Selling to ClearEdge vs. Listing in {location.city}</h2>
          </div>

          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <div className="overflow-hidden rounded-2xl border border-[#1a1f1a]/10 shadow-lg bg-white min-w-[640px]">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-5 px-6 bg-[#FAF8F5] font-medium text-[#1a1f1a]/60"></th>
                  <th className="text-center py-5 px-6 bg-[#00b332] text-white">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-6 h-6 mb-1" />
                      <span className="font-semibold">ClearEdge</span>
                    </div>
                  </th>
                  <th className="text-center py-5 px-6 bg-[#FAF8F5] text-[#1a1f1a]/70">
                    <span className="font-semibold">Traditional Agent</span>
                  </th>
                  <th className="text-center py-5 px-6 bg-[#FAF8F5] text-[#1a1f1a]/70">
                    <span className="font-semibold">FSBO</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Time to Close</td>
                  <td className="py-5 px-6 text-center bg-[#00b332]/5 font-semibold text-[#00b332]">7-14 Days</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">60-90 Days</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">90+ Days</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Repairs Needed</td>
                  <td className="py-5 px-6 text-center bg-[#00b332]/5 font-semibold text-[#00b332]">None</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">Usually Required</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">Usually Required</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Fees & Commissions</td>
                  <td className="py-5 px-6 text-center bg-[#00b332]/5 font-semibold text-[#00b332]">$0</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">5-6%</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">2-3%</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Closing Costs</td>
                  <td className="py-5 px-6 text-center bg-[#00b332]/5 font-semibold text-[#00b332]">We Pay</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">You Pay</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">You Pay</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Showings Required</td>
                  <td className="py-5 px-6 text-center bg-[#00b332]/5 font-semibold text-[#00b332]">Zero</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">Many</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">Many</td>
                </tr>
                <tr className="border-t border-[#1a1f1a]/5">
                  <td className="py-5 px-6 font-medium text-[#1a1f1a]/70">Sale Certainty</td>
                  <td className="py-5 px-6 text-center bg-[#00b332]/5 font-semibold text-[#00b332]">100% Guaranteed</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">Uncertain</td>
                  <td className="py-5 px-6 text-center text-[#1a1f1a]/60">Uncertain</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          <div className="text-center mt-12">
            <ScrollToFormButton className="inline-flex items-center justify-center gap-2 bg-[#00b332] text-white px-8 py-4 rounded-full font-medium hover:bg-[#009929] transition-all shadow-lg shadow-[#00b332]/20">
              Get Your {location.city} Cash Offer
              <ArrowRight className="w-4 h-4" />
            </ScrollToFormButton>
          </div>
        </div>
      </section>

      {/* FAQ Section - White - Using Homepage Style Accordion */}
      {location.faqs && location.faqs.length > 0 && (
        <LocationFAQAccordion faqs={location.faqs} cityName={location.city} />
      )}

      {/* Helpful Guides Section - Cream */}
      {relatedBlogPosts && relatedBlogPosts.length > 0 && (
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Helpful Guides</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Related Articles for {location.city} Homeowners</h2>
            </div>

            <div className="space-y-4">
              {relatedBlogPosts.slice(0, 3).map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="block bg-white rounded-2xl p-6 border border-[#1a1f1a]/5 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00b332]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-[#00b332]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-medium text-lg text-[#1a1f1a] mb-2">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-[#1a1f1a]/60 text-sm line-clamp-2">{post.excerpt}</p>
                      )}
                      <span className="inline-flex items-center text-[#00b332] font-medium text-sm mt-3">
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
                className="inline-flex items-center px-6 py-3 bg-white hover:bg-[#1a1f1a]/5 text-[#1a1f1a]/70 font-medium rounded-full border border-[#1a1f1a]/10 transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-2 text-[#00b332]" />
                More Helpful Guides
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA with MultiStep Lead Form - White */}
      <section id="lead-form" className="py-16 md:py-20 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a] mb-4">
            Ready to Sell Your {location.city} House?
          </h2>
          <p className="text-lg text-[#1a1f1a]/60 mb-8">
            Get a fair cash offer in 24 hours. No repairs, no fees, no obligation.
          </p>
          <MultiStepLeadForm />
        </div>
      </section>

      <V0Footer />
    </main>
  )
}
