import { getSituationBySlug, getSituations, getBlogPostsBySituation } from '@/sanity/lib/queries'
import { LocalBusinessSchema, FAQSchema } from '@/components/Schema'
import { LeadForm } from '@/components/LeadForm'
import { ScrollToFormButton } from '@/components/ScrollToFormButton'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, CheckCircle, ArrowRight, ChevronDown, Clock, DollarSign, Shield, Home, FileText, BookOpen } from 'lucide-react'
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
  const situations = await getSituations()
  return situations.map((situation: any) => ({
    slug: situation.slug.current,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const situation = await getSituationBySlug(slug)
  if (!situation) return {}

  const title = situation.metaTitle || `${situation.title} - Sell Your House Fast | ClearEdge Home Buyers`
  const description = situation.metaDescription || `Dealing with ${situation.title.toLowerCase()}? Get a fair cash offer for your home in 24 hours. No repairs, no fees, no commissions.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.clearedgehomebuyers.com/situations/${slug}`,
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
    alternates: {
      canonical: `https://www.clearedgehomebuyers.com/situations/${slug}`,
    },
  }
}

export default async function SituationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [situation, relatedBlogPosts] = await Promise.all([
    getSituationBySlug(slug),
    getBlogPostsBySituation(slug)
  ])

  if (!situation) {
    notFound()
  }

  return (
    <main>
      <LocalBusinessSchema />
      {situation.faqs && <FAQSchema faqs={situation.faqs} />}

      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-24 px-4 bg-slate-900 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-4 py-2 mb-8">
                <Home className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-500">{situation.title}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {situation.heroHeadline || `Sell Your House Fast`}
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400">
                  {situation.title}
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
                {situation.heroSubheadline || `Dealing with ${situation.title.toLowerCase()}? We understand. Get a fair cash offer and close on your timeline — no repairs, no fees, no hassle.`}
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
                  <span className="text-white font-medium">No obligation offer</span>
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
              <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-sm font-semibold mb-4">WE UNDERSTAND</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Dealing with {situation.title}?</h2>
            </div>

            <div className="text-slate-600 space-y-6 text-lg leading-relaxed prose prose-lg max-w-none">
              <PortableText value={situation.problemDescription} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}

      {/* Benefits Grid */}
      {situation.benefits && situation.benefits.length > 0 && (
        <section className="py-24 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-sm font-semibold mb-4">BENEFITS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Sell to ClearEdge?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">We specialize in helping homeowners facing {situation.title.toLowerCase()} situations.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {situation.benefits.map((benefit: any, i: number) => {
                const icons = [Clock, DollarSign, Shield, Home, CheckCircle, ArrowRight]
                const Icon = icons[i % icons.length]
                return (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-amber-600" />
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
            <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-sm font-semibold mb-4">SIMPLE PROCESS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Contact Us', desc: 'Call or fill out our form. Tell us about your property and situation.' },
              { step: '2', title: 'Get Your Offer', desc: 'We\'ll evaluate your property and present a fair, no-obligation cash offer within 24 hours.' },
              { step: '3', title: 'Close & Get Paid', desc: 'Accept and pick your closing date. We handle all the paperwork and pay closing costs.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
              <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-sm font-semibold mb-4">SERVICE AREAS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Areas We Serve</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {situation.relatedLocations.map((location: any) => (
                <Link
                  key={location.slug.current}
                  href={`/locations/${location.slug.current}`}
                  className="bg-white rounded-xl p-4 text-center hover:bg-amber-500/10 transition-colors border border-slate-100 hover:border-amber-500/30"
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
              <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-sm font-semibold mb-4">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Common Questions About {situation.title}</h2>
            </div>

            <div className="space-y-4">
              {situation.faqs.map((faq: any, i: number) => (
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

      {/* Related Blog Posts */}
      {relatedBlogPosts && relatedBlogPosts.length > 0 && (
        <section className="py-24 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-sm font-semibold mb-4">HELPFUL GUIDES</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Related Articles</h2>
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
            Ready to Move Forward?
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
