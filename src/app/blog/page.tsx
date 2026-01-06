import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getBlogPosts } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | ClearEdge Home Buyers | Selling Tips & Local Market Insights',
  description: 'Expert advice on selling your house fast in Eastern Pennsylvania. Tips for foreclosure, probate, inherited properties, and more from local cash home buyers.',
  openGraph: {
    title: 'Blog | ClearEdge Home Buyers',
    description: 'Expert advice on selling your house fast in Eastern Pennsylvania.',
    type: 'website',
    url: 'https://www.clearedgehomebuyers.com/blog',
  },
}

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  author: string
  category: string
  featuredImage?: {
    asset: { _id: string; url: string }
    alt: string
  }
}

export const revalidate = 3600

export default async function BlogPage() {
  const posts: BlogPost[] = await getBlogPosts()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatCategory = (category: string) => {
    return category?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || ''
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ClearEdge Home Buyers Blog',
    description: 'Expert advice on selling your house fast in Eastern Pennsylvania',
    url: 'https://www.clearedgehomebuyers.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'ClearEdge Home Buyers',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.clearedgehomebuyers.com/logo.webp',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <Header currentPage="/blog" />

        {/* Hero Section */}
        <section className="relative pt-28 pb-20 px-4 bg-gradient-to-br from-[#1e3a5f] via-[#162d4a] to-[#1e3a5f] overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#0d9488]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#14b8a6]/10 rounded-full blur-3xl"></div>

          <div className="max-w-4xl mx-auto text-center relative">
            <div className="inline-flex items-center space-x-2 bg-[#0d9488]/20 backdrop-blur-sm border border-[#0d9488]/30 rounded-full px-4 py-2 mb-8">
              <BookOpen className="w-4 h-4 text-[#14b8a6]" />
              <span className="text-sm font-medium text-[#14b8a6]">ClearEdge Home Buyers Blog</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Selling Tips &
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] via-[#0d9488] to-[#14b8a6]">
                Local Market Insights
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Expert advice on selling your house fast in Eastern Pennsylvania. Real strategies from a local cash home buyer.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-600 text-lg">No posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <Link href={`/blog/${post.slug.current}`}>
                      {post.featuredImage?.asset?.url && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={urlFor(post.featuredImage).width(600).height(400).url()}
                            alt={post.featuredImage.alt || post.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        {post.category && (
                          <span className="inline-block px-3 py-1 bg-[#0d9488]/10 text-[#047857] rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
                            {formatCategory(post.category)}
                          </span>
                        )}
                        <h2 className="text-xl font-bold text-slate-800 mb-3 hover:text-[#0d9488] transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span>{post.author}</span>
                          <time dateTime={post.publishedAt}>
                            {formatDate(post.publishedAt)}
                          </time>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Ready to Sell Your House Fast?</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Skip the hassle. Get a fair cash offer in 24 hours with no repairs, no fees, and no commissions.
            </p>
            <Link
              href="/#get-offer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0a7c72] hover:to-[#0d9488] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Get My Cash Offer
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
