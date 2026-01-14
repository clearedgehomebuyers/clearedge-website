import { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/sanity/lib/queries'
import { FileText, MapPin, Scale, Home, ArrowRight } from 'lucide-react'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'

export const metadata: Metadata = {
  title: 'Pennsylvania Real Estate Guides | Sell House Fast PA | ClearEdge',
  description: 'No-fluff guides for PA homeowners navigating foreclosure, probate, inherited property, and fast home sales. Local insights & 2026 rules.',
  openGraph: {
    title: 'Pennsylvania Real Estate Guides | Sell House Fast PA',
    description: 'No-fluff guides for Eastern PA homeowners navigating foreclosure, probate, inherited property, and fast home sales.',
    url: 'https://www.clearedgehomebuyers.com/blog',
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
    canonical: 'https://www.clearedgehomebuyers.com/blog',
  },
}

export const revalidate = 3600

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  author?: string
  category?: string
  featuredImage?: {
    asset: { _id: string; url: string }
    alt: string
  }
}

const categoryLabels: Record<string, string> = {
  'selling-tips': 'Selling Tips',
  'local-markets': 'Local Markets',
  'situations': 'Situations',
  'process-legal': 'Process & Legal',
}

const categories = [
  {
    title: 'Selling Situations',
    icon: Home,
    links: [
      { label: 'Facing Foreclosure', href: '/situations/foreclosure' },
      { label: 'Inherited Property', href: '/situations/inherited-property' },
      { label: 'Divorce Sales', href: '/situations/divorce' },
    ],
  },
  {
    title: 'PA Regulations & Process',
    icon: Scale,
    links: [
      { label: 'Tax Liens & Code Violations', href: '/situations/tax-liens-code-violations' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'About ClearEdge', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Local Market Insights',
    icon: MapPin,
    links: [
      { label: 'Scranton', href: '/locations/scranton' },
      { label: 'Wilkes-Barre', href: '/locations/wilkes-barre' },
      { label: 'Allentown', href: '/locations/allentown' },
      { label: 'Lehigh Valley', href: '/locations/lehigh-valley' },
    ],
  },
]

const faqs = [
  {
    question: 'How quickly can I actually sell my house in Pennsylvania?',
    answer: 'Cash sales in Pennsylvania typically close in 7-21 days. Traditional listings average 45-90 days on market before an offer, plus another 30-45 days to close. The speed depends on title clarity, whether the property is in probate, and local municipal requirements like Allentown\'s mandatory 5-day pre-sale inspection.',
  },
  {
    question: 'Do I need to make repairs before selling my house in PA?',
    answer: 'No repairs are required when selling to a cash buyer. If listing traditionally, Pennsylvania\'s 2021 International Building Code (adopted statewide January 1, 2026) and local ordinances like Reading\'s I-30 quality-of-life codes may require specific repairs before transfer. Our guides break down what\'s actually required versus what agents recommend.',
  },
  {
    question: 'What situations qualify for a fast cash sale?',
    answer: 'Any situation where speed, certainty, or privacy matters more than maximum price. This includes foreclosure, inherited property, divorce, relocation, properties with code violations, fire damage, problem tenants, or simply not wanting to deal with traditional listing hassles. We\'ve published dedicated guides for each situation with PA-specific timelines and requirements.',
  },
  {
    question: 'Are these guides specific to my city in Pennsylvania?',
    answer: 'Yes, where regulations differ by municipality. Lackawanna County probate timelines differ from Lehigh County. Allentown inspection requirements differ from Scranton. Each guide specifies which rules apply where, so you know exactly what to expect in your area.',
  },
]

export default async function BlogPage() {
  const posts: Post[] = await getBlogPosts()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ClearEdge Home Buyers Blog',
    description: 'Pennsylvania real estate guides for homeowners looking to sell fast',
    url: 'https://www.clearedgehomebuyers.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'ClearEdge Home Buyers',
      url: 'https://www.clearedgehomebuyers.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <V0Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section - Cream with dot pattern */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[#FAF8F5] overflow-hidden">
          {/* Dot pattern background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231a1f1a' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">Helpful Guides</span>
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-[#1a1f1a] mb-6">
              Pennsylvania Real Estate Guides to Sell Your House Fast
            </h1>
            <p className="text-xl text-[#1a1f1a]/60 max-w-2xl mx-auto">
              No-fluff guides for Eastern PA homeowners navigating foreclosure, probate, inherited property, and every situation in between.
            </p>
          </div>
        </section>

        {/* What You'll Find Section - White */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a] mb-6">
              What Makes These Guides Different?
            </h2>
            <div className="space-y-4 text-[#1a1f1a]/60 text-lg">
              <p>
                Every guide is written from direct experience helping 200+ Pennsylvania homeowners since 2016.
              </p>
              <p>
                We don&apos;t write content to rank.
                We write content to answer the questions homeowners actually ask us on calls.
              </p>
              <p>
                You&apos;ll find 2026 PA-specific regulations, county-by-county requirements, and step-by-step breakdowns—not generic advice copied from national websites.
              </p>
            </div>
          </div>
        </section>

        {/* Category Navigation - Cream */}
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a] mb-8">
              Browse by Topic
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.title}
                  className="bg-white border border-[#1a1f1a]/5 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#00b332]/10 rounded-xl flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-[#00b332]" />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-[#1a1f1a]">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-[#1a1f1a]/60">
                    {category.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="hover:text-[#00b332] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Posts Section - White */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a] mb-8">
              Latest Guides
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(0, 12).map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#1a1f1a]/5 hover:shadow-lg transition-shadow"
                >
                  {post.featuredImage?.asset?.url && (
                    <img
                      src={post.featuredImage.asset.url}
                      alt={post.featuredImage.alt || post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    {post.category && (
                      <span className="text-sm text-[#00b332] font-medium">
                        {categoryLabels[post.category] || post.category}
                      </span>
                    )}
                    <h3 className="text-lg font-serif font-medium text-[#1a1f1a] mt-2 mb-3">
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="hover:text-[#00b332] transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    {post.excerpt && (
                      <p className="text-[#1a1f1a]/60 text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-4 pt-4 border-t border-[#1a1f1a]/5">
                      <time
                        dateTime={post.publishedAt}
                        className="text-sm text-[#1a1f1a]/50"
                      >
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-[#1a1f1a]/30 mx-auto mb-4" />
                <p className="text-[#1a1f1a]/60">
                  New guides coming soon. Check back shortly.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section - Cream */}
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a] mb-8">
              Common Questions About Selling a House Fast in PA
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#1a1f1a]/10 pb-6">
                  <h3 className="text-lg font-serif font-medium text-[#1a1f1a] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-[#1a1f1a]/60">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Soft CTA - White */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a] mb-4">
              Have a Question We Haven&apos;t Covered?
            </h2>
            <p className="text-[#1a1f1a]/60 mb-8">
              We add new Pennsylvania real estate guides based on the questions homeowners ask us.
              If you&apos;re looking for information on selling your house fast and can&apos;t find it here, let us know.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#00b332] text-white px-8 py-4 rounded-full font-medium hover:bg-[#009929] transition-all shadow-lg shadow-[#00b332]/20"
            >
              Ask a Question
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <V0Footer />
    </>
  )
}
