import { MetadataRoute } from 'next'
import { getLocations, getSituations, getBlogPostSlugs } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.clearedgehomebuyers.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-it-works`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/nepa`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/lehigh-valley`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/poconos`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculator`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cash-buyer-vs-realtor`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/are-cash-home-buyers-legit`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Fetch locations from Sanity (regional hubs are static routes already listed above)
  const staticUrls = new Set(staticPages.map((p) => p.url))
  const locations = await getLocations()
  const locationPages: MetadataRoute.Sitemap = locations
    .filter((location: any) => !staticUrls.has(`${baseUrl}/locations/${location.slug.current}`))
    .map((location: any) => ({
      url: `${baseUrl}/locations/${location.slug.current}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  // Fetch situations from Sanity
  const situations = await getSituations()
  const situationPages: MetadataRoute.Sitemap = situations.map((situation: any) => ({
    url: `${baseUrl}/situations/${situation.slug.current}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Fetch blog posts from Sanity
  const blogSlugs = await getBlogPostSlugs()
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug: string) => ({
    url: `${baseUrl}/blog/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...locationPages, ...situationPages, ...blogPages]
}
