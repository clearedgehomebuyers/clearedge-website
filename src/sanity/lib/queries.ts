import { client } from './client'
import { REDIRECTED_BLOG_SLUGS } from '@/lib/blog-url-policy'

const visibleBlogParams = { redirectedSlugs: REDIRECTED_BLOG_SLUGS }

export async function getLocations() {
  return client.fetch(`*[_type == "location"] | order(city asc)`)
}

export async function getLocationBySlug(slug: string) {
  return client.fetch(
    `*[_type == "location" && slug.current == $slug][0]{
      ...,
      netProceedsComparison{
        sectionTitle,
        introText,
        salePrice,
        agentCommission,
        transferTaxRate,
        sellerTransferTaxShare,
        closingCosts,
        repairsToList,
        carryingCosts,
        cashOffer,
        followUpText
      },
      caseStudies[]{
        _key,
        title,
        description
      },
      trustSignals{
        sectionTitle,
        introText,
        signals[]{
          _key,
          title,
          description
        }
      },
      relatedSituations[]->{
        _id,
        title,
        slug
      }
    }`,
    { slug }
  )
}

export async function getTestimonials() {
  return client.fetch(`*[_type == "testimonial"] | order(_createdAt desc)`)
}

export async function getSituations() {
  return client.fetch(`*[_type == "situation"] | order(title asc)`)
}

export async function getSituationBySlug(slug: string) {
  return client.fetch(
    `*[_type == "situation" && slug.current == $slug][0]{
      ...,
      relatedLocations[]->{city, state, slug}
    }`,
    { slug }
  )
}

// Blog queries
export async function getBlogPosts() {
  return client.fetch(
    `
    *[_type == "blogPost" && !(slug.current in $redirectedSlugs)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      category,
      featuredImage {
        asset->{
          _id,
          url
        },
        alt
      }
    }
  `,
    visibleBlogParams,
  )
}

export async function getBlogPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      metaTitle,
      metaDescription,
      content,
      excerpt,
      publishedAt,
      updatedAt,
      author,
      authorTitle,
      category,
      featuredImage {
        asset->{
          _id,
          url
        },
        alt
      },
      faqs,
      relatedLocations[]->{
        _id,
        city,
        slug
      },
      relatedSituations[]->{
        _id,
        title,
        slug
      }
    }`,
    { slug }
  )
}

export async function getRecentBlogPosts(limit: number = 3) {
  return client.fetch(
    `*[_type == "blogPost" && !(slug.current in $redirectedSlugs)] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      featuredImage {
        asset->{
          _id,
          url
        },
        alt
      }
    }`,
    { ...visibleBlogParams, limit }
  )
}

export async function getBlogPostSlugs() {
  return client.fetch(
    `*[_type == "blogPost" && defined(slug.current) && !(slug.current in $redirectedSlugs)][].slug.current`,
    visibleBlogParams,
  )
}

// Sitemap needs dates as well as slugs (audit QW6). Deliberately a SEPARATE
// query rather than a wider getBlogPostSlugs(): that one also feeds
// generateStaticParams() in blog/[slug], which expects string[] — widening it
// would silently change the shape that route depends on.
export async function getBlogPostSitemapEntries() {
  return client.fetch(`*[_type == "blogPost" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt,
    publishedAt,
    updatedAt
  }`)
}

export async function getBlogPostsBySituation(situationSlug: string) {
  return client.fetch(
    `*[_type == "blogPost" && !(slug.current in $redirectedSlugs) && references(*[_type == "situation" && slug.current == $situationSlug]._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt
    }`,
    { ...visibleBlogParams, situationSlug }
  )
}

export async function getBlogPostsByLocation(locationSlug: string) {
  return client.fetch(
    `*[_type == "blogPost" && !(slug.current in $redirectedSlugs) && references(*[_type == "location" && slug.current == $locationSlug]._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt
    }`,
    { ...visibleBlogParams, locationSlug }
  )
}
