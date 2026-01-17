'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'

interface BlogPost {
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

interface BlogPostsGridProps {
  posts: BlogPost[]
}

const categoryLabels: Record<string, string> = {
  'selling-tips': 'Selling Tips',
  'local-markets': 'Local Markets',
  'situations': 'Situations',
  'process-legal': 'Process & Legal',
  'locations': 'Locations',
  'guides': 'Guides',
  'how-it-works': 'How It Works',
  'how it works': 'How It Works',
}

// Fallback formatter for categories not in the mapping
function formatCategory(category: string): string {
  if (categoryLabels[category]) {
    return categoryLabels[category]
  }
  // Convert slug-style or lowercase to Title Case
  return category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const POSTS_PER_PAGE = 9

export function BlogPostsGrid({ posts }: BlogPostsGridProps) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  const visiblePosts = posts.slice(0, visibleCount)
  const hasMorePosts = posts.length > visibleCount

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group relative bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#1a1f1a]/5 hover:shadow-lg transition-all"
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
                <span className="text-sm text-[#008a29] font-medium">
                  {formatCategory(post.category)}
                </span>
              )}
              <h3 className="text-lg font-serif font-medium text-[#1a1f1a] mt-2 mb-3 group-hover:text-[#008a29] transition-colors">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-[#1a1f1a]/70 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              <div className="mt-4 pt-4 border-t border-[#1a1f1a]/5 flex items-center justify-between">
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
                <ArrowRight className="w-4 h-4 text-[#008a29] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-[#1a1f1a]/30 mx-auto mb-4" />
          <p className="text-[#1a1f1a]/70">
            New guides coming soon. Check back shortly.
          </p>
        </div>
      )}

      {hasMorePosts && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount(prev => prev + POSTS_PER_PAGE)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#1a1f1a]/10 text-[#1a1f1a] rounded-full font-medium hover:bg-[#FAF8F5] transition-all"
          >
            Load More Guides
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  )
}
