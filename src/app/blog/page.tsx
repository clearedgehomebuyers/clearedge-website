import { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/sanity/lib/queries'
import { MapPin, Scale, Home, ArrowRight } from 'lucide-react'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { V0FAQ } from '@/components/v0-faq'
import { BlogPostsGrid } from '@/components/BlogPostsGrid'

export const metadata: Metadata = {
  title: 'Pennsylvania Home Selling Guides | Cash Sale Tips & 2026 PA Laws | ClearEdge',
  description: 'No-fluff guides for PA homeowners navigating foreclosure, probate, inherited property, code violations, and fast cash home sales. Written by Tyler from direct experience buying 200+ homes.',
  openGraph: {
    title: 'PA Real Estate Guides | Sell House Fast | ClearEdge Home Buyers',
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.clearedgehomebuyers.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.clearedgehomebuyers.com/blog',
      },
    ],
  }

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog - ClearEdge Home Buyers',
    description: 'Tips, guides, and insights for Pennsylvania homeowners looking to sell their house fast for cash.',
    url: 'https://www.clearedgehomebuyers.com/blog',
    isPartOf: {
      '@type': 'WebSite',
      name: 'ClearEdge Home Buyers',
      url: 'https://www.clearedgehomebuyers.com/',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
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
        {/* Hero Section - Cream */}
        <section className="relative pt-32 pb-10 md:pt-40 md:pb-12 bg-[#FAF8F5] overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">Helpful Guides</span>
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-[#1a1f1a] mb-6">
              Pennsylvania Home Selling Guides — Written From Direct Experience
            </h1>
            <p className="text-xl text-[#1a1f1a]/70 max-w-2xl mx-auto">
              No-fluff guides for Eastern PA homeowners. Every article is based on real situations Tyler has handled buying 200+ homes since 2016 — not generic advice copied from national websites.
            </p>
          </div>
        </section>

        {/* What You'll Find Section - White */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
              Our Approach
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a] mb-6">
              What Makes These Guides Different?
            </h2>
            <div className="space-y-4 text-[#1a1f1a]/70 text-lg">
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
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
                Topics
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a]">
                Browse by Topic
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.title}
                  className="bg-white border border-[#1a1f1a]/5 rounded-2xl p-6 hover:shadow-lg transition-shadow text-center"
                >
                  <div className="flex flex-col items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#008a29]/10 rounded-xl flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-[#008a29]" />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-[#1a1f1a]">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-[#1a1f1a]/70">
                    {category.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="hover:text-[#008a29] transition-colors"
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
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
                Recent Articles
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a]">
                Latest Guides
              </h2>
            </div>
            <BlogPostsGrid posts={posts} />
          </div>
        </section>

        {/* FAQ Section */}
        <V0FAQ
          faqs={faqs}
          title="Common Questions About Selling a House Fast in PA"
          subtitle="Everything you need to know about selling your Pennsylvania home quickly."
          sectionBg="beige"
        />


        {/* Final CTA Section - Beige */}
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a] mb-4">
              Have a Question We Haven&apos;t Covered?
            </h2>
            <p className="text-[#1a1f1a]/70 mb-6">
              We add new Pennsylvania real estate guides based on the questions homeowners ask us.
              If you&apos;re looking for information on selling your house fast and can&apos;t find it here, let us know.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#008a29] text-white px-8 py-4 rounded-full font-medium hover:bg-[#007a24] transition-all shadow-lg shadow-[#008a29]/20"
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
