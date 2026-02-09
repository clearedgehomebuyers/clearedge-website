import { getSituationBySlug, getSituations, getBlogPostsBySituation } from '@/sanity/lib/queries'
import { LocalBusinessSchema, FAQSchema } from '@/components/Schema'
import { V0LeadForm } from '@/components/v0-lead-form'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { SituationFAQAccordion } from '@/components/SituationFAQAccordion'
import { DynamicPhoneLink } from '@/components/DynamicPhone'
import { TrackedCTALink } from '@/components/TrackedCTALink'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Clock, DollarSign, Shield, Home, FileText, BookOpen, MapPin } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'

// Property photos mapped to specific situation slugs (each photo used exactly twice)
const heroPhotos: Record<string, { src: string; location: string; days: number }> = {
  'foreclosure': { src: '/properties/allentown-pa-sell-house-fast-as-is-2.jpg', location: 'Allentown, PA', days: 10 },
  'inherited-property': { src: '/properties/wilkes-barre-pa-inherited-property-sale-3.jpg', location: 'Wilkes-Barre, PA', days: 12 },
  'divorce': { src: '/properties/lehigh-valley-real-estate-investors-4.jpg', location: 'Bethlehem, PA', days: 8 },
  'job-relocation': { src: '/properties/nepa-distressed-house-cleanout-service-5.jpg', location: 'Hazleton, PA', days: 14 },
  'major-repairs': { src: '/properties/allentown-pa-sell-house-fast-as-is-2.jpg', location: 'Allentown, PA', days: 10 },
  'tax-liens-code-violations': { src: '/properties/wilkes-barre-pa-inherited-property-sale-3.jpg', location: 'Wilkes-Barre, PA', days: 12 },
  'tired-landlord': { src: '/properties/lehigh-valley-real-estate-investors-4.jpg', location: 'Bethlehem, PA', days: 8 },
  'vacant-property': { src: '/properties/nepa-distressed-house-cleanout-service-5.jpg', location: 'Hazleton, PA', days: 14 },
  'foundation-structural-issues': { src: '/properties/wilkes-barre-pa-inherited-property-sale-3.jpg', location: 'Scranton, PA', days: 16 },
}

// Default photo if slug not found
const defaultPhoto = { src: '/properties/allentown-pa-sell-house-fast-as-is-2.jpg', location: 'Allentown, PA', days: 10 }

// Answer-First Summaries for each situation (SEO optimization)
const answerFirstSummaries: Record<string, { question: string; answer: string }> = {
  'foreclosure': {
    question: "Can I sell my house to avoid foreclosure in Pennsylvania?",
    answer: "Yes. If you're behind on mortgage payments in PA, you can sell your house before the sheriff sale and walk away with cash instead of losing everything to the bank. ClearEdge can close in as little as 7 days — often fast enough to stop foreclosure proceedings, satisfy the lender, and protect your credit score. Under Pennsylvania's Act 91, you have rights during foreclosure — selling to a cash buyer is one of the fastest ways to exercise them."
  },
  'inherited-property': {
    question: "How do I sell an inherited house in Pennsylvania?",
    answer: "You can sell an inherited house in PA by working with the estate executor (or administrator) to transfer the property through probate court. If the property passed outside probate (via a joint deed, living trust, or transfer-on-death deed), you may be able to sell immediately. ClearEdge works with estate attorneys regularly and can close during or after probate. We buy inherited houses 100% as-is — no cleanout, no repairs, no dealing with decades of belongings."
  },
  'divorce': {
    question: "How do I sell my house fast during a divorce in PA?",
    answer: "The fastest way to sell during a Pennsylvania divorce is a direct cash sale. Both parties agree on the sale, we close in 7–14 days, and proceeds are wired according to your separation agreement or court order. No showings, no repairs, no waiting months for buyer financing to fall through. This eliminates the marital home as a point of conflict so both parties can finalize the divorce and move forward with their lives."
  },
  'job-relocation': {
    question: "How can I sell my house quickly for a job relocation?",
    answer: "When you need to relocate for work, a cash sale lets you close before your start date — no double mortgage payments, no flying back for showings. ClearEdge can close in as little as 7 days (or match your employer's timeline). Some companies offer relocation buyout programs; if yours doesn't, we provide a guaranteed cash offer with a flexible closing date so you can focus on your new role, not your old house."
  },
  'major-repairs': {
    question: "Can I sell a house that needs major repairs without fixing it?",
    answer: "Yes. You can sell a house with foundation issues, roof damage, mold, fire damage, outdated electrical, or any other major repair needs without spending a dollar. Cash buyers like ClearEdge purchase homes 100% as-is with no inspection contingencies. Instead of spending $15,000–$50,000+ on repairs before listing (and still waiting months to maybe get an offer), we factor the repair costs into our offer and handle everything after closing."
  },
  'tax-liens-code-violations': {
    question: "Can I sell a house with tax liens or code violations in PA?",
    answer: "Yes. Tax liens and code violations don't prevent a sale — they just need to be resolved at or before closing. ClearEdge purchases houses with back property taxes, municipal water/sewer liens, and code violations regularly throughout Eastern PA. The liens get paid from the sale proceeds at closing, code violations transfer to us as the new owner, and you walk away clean with no outstanding obligations."
  },
  'tired-landlord': {
    question: "How do I sell a rental property with tenants in it?",
    answer: "You can sell a rental property with tenants in place — no eviction required. ClearEdge buys occupied rentals and handles the tenant situation after closing. Whether your tenants are paying, non-paying, month-to-month, or on Section 8, we'll make a fair cash offer and close on your timeline. Stop dealing with midnight maintenance calls, late rent, and the liability of being a landlord — sell the property and get your time and money back."
  },
  'vacant-property': {
    question: "Should I sell my vacant house or keep paying to maintain it?",
    answer: "If your vacant house is costing you $1,000–$2,000+ per month in mortgage, property taxes, insurance, utilities, and maintenance, selling for cash is almost always the smarter financial move. Every month you hold an empty property in Pennsylvania, you're losing money — and risking vandalism, pipe bursts, and code violations. ClearEdge buys vacant houses 100% as-is. No repairs, no cleaning, no showings. Close in as few as 7 days and stop the monthly drain."
  },
  'foundation-structural-issues': {
    question: "Can I sell a house with foundation problems in Pennsylvania?",
    answer: "Yes. Pennsylvania law allows you to sell a home in any condition — you're required to disclose known structural defects on the PA Seller's Disclosure (SPD), but you are NOT required to repair them. Foundation repairs typically cost $10,000–$50,000+, and most mortgage lenders won't approve loans on homes with structural issues — which means traditional buyers can't purchase your home even if they want to. ClearEdge buys houses with foundation cracks, bowing walls, settling, and mine subsidence damage across Eastern PA. We pay cash, close in 14–30 days, and you don't fix a thing."
  },
}

// Custom components for rendering Portable Text with links
const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      return (
        <a
          href={value?.href}
          className="text-[#008a29] hover:underline font-medium"
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

  const title = situation.metaTitle || `${situation.title} - Sell Your House Fast`
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

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.clearedgehomebuyers.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Situations",
        "item": "https://www.clearedgehomebuyers.com/situations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": situation.title,
        "item": `https://www.clearedgehomebuyers.com/situations/${slug}`
      }
    ]
  }

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LocalBusinessSchema />
      {situation.faqs && <FAQSchema faqs={situation.faqs} />}

      <V0Header />

      {/* Hero Section - Cream */}
      <section className="relative pt-32 pb-10 px-4 overflow-hidden bg-[#FAF8F5]">
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 items-center">
            {/* LEFT COLUMN - Text content (centered within column) */}
            <div className="text-center lg:text-center">
              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1a1f1a] mb-5 leading-[1.1]">
                {situation.heroHeadline || `Sell Your House Fast.`}
                <br />
                <span className="text-[#008a29]">{situation.title}</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-[#1a1f1a]/70 max-w-2xl mx-auto mb-6 leading-relaxed font-light">
                {situation.heroSubheadline || `Dealing with ${situation.title.toLowerCase()}? We understand. Get a fair cash offer and close on your timeline — no repairs, no fees, no hassle.`}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <TrackedCTALink
                  href="#lead-form"
                  label="Get My Fair Cash Offer"
                  eventLabel="Get My Fair Cash Offer - Situation Hero"
                  className="inline-flex items-center justify-center bg-[#008a29] text-white hover:bg-[#007a24] text-base px-8 py-4 rounded-full shadow-lg shadow-[#008a29]/25 transition-all hover:shadow-xl hover:shadow-[#008a29]/30 hover:-translate-y-0.5 group font-medium"
                />
                <DynamicPhoneLink
                  className="inline-flex items-center justify-center text-base px-8 py-4 rounded-full text-[#1a1f1a]/80 hover:text-[#1a1f1a] hover:bg-[#1a1f1a]/5 font-medium"
                  showIcon
                  iconClassName="w-5 h-5 mr-2"
                />
              </div>
            </div>

            {/* RIGHT COLUMN - Property widget + Trust Indicators */}
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {/* Property Photo Widget */}
              <div className="bg-white rounded-xl shadow-xl border border-[#1a1f1a]/10 overflow-hidden w-[280px] lg:w-[320px]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={(heroPhotos[slug] || defaultPhoto).src}
                    alt={`Recently purchased home in ${(heroPhotos[slug] || defaultPhoto).location}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <span className="inline-block px-2 py-0.5 bg-[#008a29] text-white text-xs font-bold rounded-full mb-1">
                      Just Closed
                    </span>
                    <p className="text-sm font-bold">{(heroPhotos[slug] || defaultPhoto).location}</p>
                    <p className="text-xs text-white/90">{(heroPhotos[slug] || defaultPhoto).days} Days to Close</p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators - 2x2 GRID */}
              <div className="grid grid-cols-2 gap-x-10 gap-y-4 w-full max-w-[360px]">
                <div className="flex items-center justify-center gap-3">
                  <Clock className="w-6 h-6 text-[#008a29] flex-shrink-0" />
                  <span className="text-base text-[#1a1f1a]/70 whitespace-nowrap font-medium">Close in 7–30 Days</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <DollarSign className="w-6 h-6 text-[#008a29] flex-shrink-0" />
                  <span className="text-base text-[#1a1f1a]/70 whitespace-nowrap font-medium">Zero Fees Ever</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Shield className="w-6 h-6 text-[#008a29] flex-shrink-0" />
                  <span className="text-base text-[#1a1f1a]/70 whitespace-nowrap font-medium">Sell 100% As-Is</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="w-6 h-6 text-[#008a29] flex-shrink-0" />
                  <span className="text-base text-[#1a1f1a]/70 whitespace-nowrap font-medium">200+ PA Homes Bought</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Answer-First Summary - White */}
      {answerFirstSummaries[slug] && (
        <section className="py-8 md:py-10 bg-white border-b border-[#1a1f1a]/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#008a29]/5 border border-[#008a29]/20 rounded-2xl p-6 md:p-8">
              <p className="text-[#008a29] font-medium text-sm uppercase tracking-wide mb-2">Quick Answer</p>
              <h2 className="font-serif text-xl md:text-2xl font-medium text-[#1a1f1a] mb-4">
                {answerFirstSummaries[slug].question}
              </h2>
              <p className="text-[#1a1f1a]/80 leading-relaxed text-lg">
                {answerFirstSummaries[slug].answer}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Problem Description - White */}
      {situation.problemDescription && (
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">We Understand</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">
                Dealing with {situation.title}?
              </h2>
            </div>

            <div className="text-[#1a1f1a]/70 space-y-6 text-lg leading-relaxed prose prose-lg max-w-none">
              <PortableText value={situation.problemDescription} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}

      {/* Benefits Grid - Cream */}
      {situation.benefits && situation.benefits.length > 0 && (
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">Benefits</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a] mb-4">Why Sell to ClearEdge?</h2>
              <p className="text-[#1a1f1a]/70 max-w-2xl mx-auto">We specialize in helping homeowners facing {situation.title.toLowerCase()} situations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {situation.benefits.map((benefit: any, i: number) => {
                const icons = [Clock, DollarSign, Shield, Home, CheckCircle, ArrowRight]
                const Icon = icons[i % icons.length]
                return (
                  <div key={i} className="bg-white rounded-2xl p-8 border border-[#1a1f1a]/5 hover:shadow-lg transition-all duration-300">
                    <div className="w-14 h-14 bg-[#008a29]/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[#008a29]" />
                    </div>
                    <h3 className="font-serif font-medium text-xl text-[#1a1f1a] mb-3">{benefit.title}</h3>
                    <p className="text-[#1a1f1a]/70 leading-relaxed">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* How It Works - White */}
      <section className="py-12 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1f1a]">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Tell Us Your Situation', desc: 'Fill out our 2-minute form or call Tyler directly. Share your property details and what you\'re dealing with — no judgment.' },
              { step: '2', title: 'Get a Fair Cash Offer in 24 Hours', desc: "Tyler personally reviews your property using local PA market data and presents a transparent, no-obligation cash offer." },
              { step: '3', title: 'Close on Your Timeline', desc: 'Accept and choose your closing date — as fast as 7 days. We handle all paperwork, pay all closing costs, and wire your funds directly.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-[#008a29] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#008a29]/20">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="font-serif font-medium text-xl text-[#1a1f1a] mb-3">{item.title}</h3>
                <p className="text-[#1a1f1a]/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - White - Using Homepage Style Accordion */}
      {situation.faqs && situation.faqs.length > 0 && (
        <SituationFAQAccordion faqs={situation.faqs} situationTitle={situation.title} />
      )}

      {/* Related Blog Posts - Cream */}
      {relatedBlogPosts && relatedBlogPosts.length > 0 && (
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">Helpful Guides</span>
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
                    <div className="w-12 h-12 bg-[#008a29]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-[#008a29]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-medium text-lg text-[#1a1f1a] mb-2 group-hover:text-[#008a29] transition-colors">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-[#1a1f1a]/70 text-sm line-clamp-2">{post.excerpt}</p>
                      )}
                      <span className="inline-flex items-center text-[#008a29] font-medium text-sm mt-3">
                        Read Article <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* More Helpful Guides Button */}
            <div className="text-center mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-white hover:bg-[#1a1f1a]/5 text-[#1a1f1a]/70 font-medium rounded-full border border-[#1a1f1a]/10 transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-2 text-[#008a29]" />
                More Helpful Guides
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* Lead Form - Same as Homepage */}
      <V0LeadForm />


      <V0Footer />
    </main>
  )
}
