import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getBlogPosts } from '@/sanity/lib/queries'
import { BookOpen } from 'lucide-react'
import { BlogPostsGrid } from '@/components/BlogPostsGrid'

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

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getBlogPosts()

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
        <BlogPostsGrid posts={posts} />

        <Footer />
      </main>
    </>
  )
}
