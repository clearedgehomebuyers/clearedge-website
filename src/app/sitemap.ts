import { MetadataRoute } from 'next'
import { getLocations, getSituations } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.clearedgehomebuyers.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sell-house-fast-scranton-pa`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Fetch locations from Sanity
  const locations = await getLocations()
  const locationPages: MetadataRoute.Sitemap = locations.map((location: any) => ({
    url: `${baseUrl}/locations/${location.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Fetch situations from Sanity
  const situations = await getSituations()
  const situationPages: MetadataRoute.Sitemap = situations.map((situation: any) => ({
    url: `${baseUrl}/situations/${situation.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...locationPages, ...situationPages]
}
