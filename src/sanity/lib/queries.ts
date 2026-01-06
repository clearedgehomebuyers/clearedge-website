import { client } from './client'

export async function getLocations() {
  return client.fetch(`*[_type == "location"] | order(city asc)`)
}

export async function getLocationBySlug(slug: string) {
  return client.fetch(
    `*[_type == "location" && slug.current == $slug][0]`,
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
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
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
  `)
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
    `*[_type == "blogPost"] | order(publishedAt desc)[0...$limit] {
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
    { limit: limit - 1 }
  )
}

export async function getBlogPostSlugs() {
  return client.fetch(`*[_type == "blogPost" && defined(slug.current)][].slug.current`)
}