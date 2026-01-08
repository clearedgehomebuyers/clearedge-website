'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { ArrowRight, ChevronDown } from 'lucide-react'

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

interface BlogPostsGridProps {
  posts: BlogPost[]
}

const POSTS_PER_PAGE = 9

export function BlogPostsGrid({ posts }: BlogPostsGridProps) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  // Sort posts chronologically (most recent first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const visiblePosts = sortedPosts.slice(0, visibleCount)
  const hasMorePosts = visibleCount < sortedPosts.length
  const remainingPosts = sortedPosts.length - visibleCount

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

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE)
  }

  return (
    <>
      {/* Blog Posts Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {sortedPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-600 text-lg">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visiblePosts.map((post) => (
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

              {/* Load More Button */}
              {hasMorePosts && (
                <div className="mt-12 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                  >
                    <span>Load More Articles</span>
                    <span className="ml-2 text-slate-500">({remainingPosts} more)</span>
                    <ChevronDown className="w-5 h-5 ml-2" />
                  </button>
                </div>
              )}
            </>
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
    </>
  )
}
