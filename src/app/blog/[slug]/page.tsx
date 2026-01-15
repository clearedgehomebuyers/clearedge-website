import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { V0FAQ } from '@/components/v0-faq'
import { getBlogPostBySlug, getBlogPostSlugs } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { ArrowRight, ChevronRight } from 'lucide-react'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs: string[] = await getBlogPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.metaTitle || `${post.title} | ClearEdge Home Buyers`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      url: `https://www.clearedgehomebuyers.com/blog/${post.slug.current}`,
      images: post.featuredImage?.asset?.url
        ? [{ url: post.featuredImage.asset.url }]
        : [],
    },
  }
}

export const revalidate = 3600

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { url: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset?.url) return null
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            width={800}
            height={500}
            className="rounded-2xl w-full"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-[#1a1f1a]/50 mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-serif font-medium mt-12 mb-4 text-[#1a1f1a]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-serif font-medium mt-8 mb-3 text-[#1a1f1a]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-serif font-medium mt-6 mb-2 text-[#1a1f1a]">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-[#1a1f1a]/70 leading-relaxed text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#00b332] pl-6 my-8 italic text-[#1a1f1a]/60 text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const target = value?.openInNewTab ? '_blank' : undefined
      const rel = value?.openInNewTab ? 'noopener noreferrer' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
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
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-[#1a1f1a]/70 text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-[#1a1f1a]/70 text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

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

  // Article Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.featuredImage?.asset?.url,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorTitle,
      worksFor: {
        '@type': 'Organization',
        name: 'ClearEdge Home Buyers',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'ClearEdge Home Buyers',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.clearedgehomebuyers.com/logo.webp',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.clearedgehomebuyers.com/blog/${post.slug.current}`,
    },
  }

  // FAQ Schema (if FAQs exist)
  const faqJsonLd = post.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((faq: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <main className="bg-white">
        <V0Header />

        <article className="pt-32 md:pt-40 pb-16">
          {/* Breadcrumb */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <nav className="flex items-center text-sm text-[#1a1f1a]/50">
              <Link href="/" className="hover:text-[#00b332] transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link href="/blog" className="hover:text-[#00b332] transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-[#1a1f1a]/70 truncate max-w-[200px]">{post.title}</span>
            </nav>
          </div>

          {/* Article Header */}
          <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            {/* Category */}
            {post.category && (
              <span className="inline-block px-3 py-1 bg-[#00b332]/10 text-[#00b332] rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
                {formatCategory(post.category)}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-[#1a1f1a] mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author & Date */}
            <div className="flex items-center text-[#1a1f1a]/60 mb-8">
              <span className="font-medium">{post.author}</span>
              <span className="mx-3">|</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <>
                  <span className="mx-3">|</span>
                  <span className="text-sm">Updated {formatDate(post.updatedAt)}</span>
                </>
              )}
            </div>

            {/* Featured Image */}
            {post.featuredImage?.asset?.url && (
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={urlFor(post.featuredImage).width(1200).height(675).url()}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Content */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.content} components={portableTextComponents} />
            </div>
          </div>

          {/* FAQs Section */}
          {post.faqs && post.faqs.length > 0 && (
            <V0FAQ
              faqs={post.faqs}
              title="Frequently Asked Questions"
              subtitle=""
            />
          )}

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Related Links */}
            {(post.relatedLocations?.length > 0 || post.relatedSituations?.length > 0) && (
              <section className="mt-12 pt-10 border-t border-[#1a1f1a]/10">
                <h2 className="text-xl font-serif font-medium text-[#1a1f1a] mb-4">Related Pages</h2>
                <div className="flex flex-wrap gap-3">
                  {post.relatedLocations?.map((location: { _id: string; city: string; slug: { current: string } }) => (
                    <Link
                      key={location._id}
                      href={`/locations/${location.slug.current}`}
                      className="bg-[#FAF8F5] hover:bg-[#00b332] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      {location.city}, PA
                    </Link>
                  ))}
                  {post.relatedSituations?.map((situation: { _id: string; title: string; slug: { current: string } }) => (
                    <Link
                      key={situation._id}
                      href={`/situations/${situation.slug.current}`}
                      className="bg-[#FAF8F5] hover:bg-[#00b332] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      {situation.title}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Author Bio */}
            <section className="mt-12 pt-10 border-t border-[#1a1f1a]/10">
              <div className="bg-[#FAF8F5] rounded-2xl p-6 md:p-8">
                <h3 className="font-serif font-medium text-lg text-[#1a1f1a] mb-3">About the Author</h3>
                <p className="text-[#1a1f1a]/60 leading-relaxed">
                  <strong>{post.author}</strong> is the founder of ClearEdge Home Buyers,
                  a cash home buying company serving Eastern Pennsylvania. He has helped
                  hundreds of homeowners sell their properties quickly for cash, with no repairs,
                  fees, or commissions.
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="mt-12 bg-[#FAF8F5] rounded-2xl p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a] mb-4">Ready to Sell Your House Fast?</h2>
              <p className="mb-8 text-[#1a1f1a]/60 text-lg max-w-xl mx-auto">
                Get a fair cash offer in 24 hours. No repairs, no fees, no commissions.
              </p>
              <Link
                href="/#lead-form"
                className="inline-flex items-center justify-center gap-2 bg-[#00b332] text-white px-8 py-4 rounded-full font-medium hover:bg-[#009929] transition-all shadow-lg shadow-[#00b332]/20"
              >
                Get My Cash Offer
                <ArrowRight className="w-5 h-5" />
              </Link>
            </section>
          </div>
        </article>

        {/* Closing SEO - Sage gradient */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#1a2e1a] font-medium">
              ClearEdge Home Buyers helps Pennsylvania homeowners sell their houses fast for cash. Read more guides or get your free offer today.
            </p>
          </div>
        </section>

        {/* Final CTA Section - Beige */}
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1a1f1a] mb-4">
              Have Questions About Selling Your House?
            </h2>
            <p className="text-[#1a1f1a]/60 mb-8">
              Browse more guides or get a free, no-obligation cash offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#1a1f1a]/10 text-[#1a1f1a] rounded-full font-medium hover:bg-white transition-all"
              >
                More Guides
              </Link>
              <Link
                href="/#lead-form"
                className="inline-flex items-center justify-center gap-2 bg-[#00b332] text-white px-8 py-4 rounded-full font-medium hover:bg-[#009929] transition-all shadow-lg shadow-[#00b332]/20"
              >
                Get My Cash Offer
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <V0Footer />
      </main>
    </>
  )
}
