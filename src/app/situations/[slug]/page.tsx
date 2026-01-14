import { getSituationBySlug, getSituations, getBlogPostsBySituation } from '@/sanity/lib/queries'
import { LocalBusinessSchema, FAQSchema } from '@/components/Schema'
import { LeadForm } from '@/components/LeadForm'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import Link from 'next/link'
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
    <main className="bg-white">
      <LocalBusinessSchema />
      {situation.faqs && <FAQSchema faqs={situation.faqs} />}

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
                <Home className="w-4 h-4 text-[#00b332]" />
                <span className="text-sm font-medium text-[#1a1f1a]/70">{situation.title}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-[#1a1f1a] mb-6 leading-tight">
                {situation.heroHeadline || `Sell Your House Fast`}
                <span className="block mt-2 text-[#00b332]">
                  {situation.title}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-[#1a1f1a]/60 mb-8 max-w-lg leading-relaxed">
                {situation.heroSubheadline || `Dealing with ${situation.title.toLowerCase()}? We understand. Get a fair cash offer and close on your timeline — no repairs, no fees, no hassle.`}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  'Close in 7-14 days',
                  'We pay closing costs',
                  'Buy as-is condition',
                  'No obligation offer',
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

      {/* Problem Description - White */}
      {situation.problemDescription && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">We Understand</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">
                Dealing with {situation.title}?
              </h2>
            </div>

            <div className="text-[#1a1f1a]/60 space-y-6 text-lg leading-relaxed prose prose-lg max-w-none">
              <PortableText value={situation.problemDescription} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}

      {/* Benefits Grid - Cream */}
      {situation.benefits && situation.benefits.length > 0 && (
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Benefits</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a] mb-4">Why Sell to ClearEdge?</h2>
              <p className="text-[#1a1f1a]/60 max-w-2xl mx-auto">We specialize in helping homeowners facing {situation.title.toLowerCase()} situations.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {situation.benefits.map((benefit: any, i: number) => {
                const icons = [Clock, DollarSign, Shield, Home, CheckCircle, ArrowRight]
                const Icon = icons[i % icons.length]
                return (
                  <div key={i} className="bg-white rounded-2xl p-8 border border-[#1a1f1a]/5 hover:shadow-lg transition-all duration-300">
                    <div className="w-14 h-14 bg-[#00b332]/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[#00b332]" />
                    </div>
                    <h3 className="font-serif font-medium text-xl text-[#1a1f1a] mb-3">{benefit.title}</h3>
                    <p className="text-[#1a1f1a]/60 leading-relaxed">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* How It Works - White */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Contact Us', desc: 'Call or fill out our form. Tell us about your property and situation.' },
              { step: '2', title: 'Get Your Offer', desc: "We'll evaluate your property and present a fair, no-obligation cash offer within 24 hours." },
              { step: '3', title: 'Close & Get Paid', desc: 'Accept and pick your closing date. We handle all the paperwork and pay closing costs.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-[#00b332] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#00b332]/20">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="font-serif font-medium text-xl text-[#1a1f1a] mb-3">{item.title}</h3>
                <p className="text-[#1a1f1a]/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Locations - Cream */}
      {situation.relatedLocations && situation.relatedLocations.length > 0 && (
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Service Areas</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Areas We Serve</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {situation.relatedLocations.map((location: any) => (
                <Link
                  key={location.slug.current}
                  href={`/locations/${location.slug.current}`}
                  className="bg-white rounded-2xl p-4 text-center hover:bg-[#00b332]/5 transition-colors border border-[#1a1f1a]/5 hover:border-[#00b332]/30"
                >
                  <span className="font-medium text-[#1a1f1a]/70">{location.city}, {location.state}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section - White */}
      {situation.faqs && situation.faqs.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Common Questions About {situation.title}</h2>
            </div>

            <div className="space-y-4">
              {situation.faqs.map((faq: any, i: number) => (
                <details key={i} className="group bg-[#FAF8F5] rounded-2xl border border-[#1a1f1a]/5">
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-medium text-[#1a1f1a]">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-[#00b332] group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-[#1a1f1a]/60">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Blog Posts - Cream */}
      {relatedBlogPosts && relatedBlogPosts.length > 0 && (
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-3 block">Helpful Guides</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">Related Articles</h2>
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
                      <h3 className="font-serif font-medium text-lg text-[#1a1f1a] mb-2 group-hover:text-[#00b332] transition-colors">{post.title}</h3>
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

      {/* Final CTA with Lead Form - White */}
      <section id="lead-form" className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a] mb-4">
            Ready to Move Forward?
          </h2>
          <p className="text-lg text-[#1a1f1a]/60 mb-8">
            Get a fair cash offer in 24 hours. No repairs, no fees, no obligation.
          </p>
          <LeadForm />
        </div>
      </section>

      <V0Footer />
    </main>
  )
}
