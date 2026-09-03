import { MetadataRoute } from 'next'
import {
  getLocations,
  getSituations,
  getBlogPostSitemapEntries,
} from '@/sanity/lib/queries'

const baseUrl = 'https://www.clearedgehomebuyers.com'

/**
 * The date the RENDERED OUTPUT of the shared page templates last changed.
 *
 * Sanity's `_updatedAt` cannot see a template change — Deploy P3-1 (2026-08-10)
 * stripped aggregateRating from the location/situation/blog templates and moved
 * no Sanity document at all, which is exactly why the 2026-08-17 check-in found
 * ten URLs still serving pre-fix schema a week later. Flooring the CMS date with
 * this constant is what makes a repo-side deploy visible to Google.
 *
 * BUMP THIS whenever a deploy changes what a template renders. It is
 * hand-maintained on purpose: a build-time lastmod was removed on 2026-07-06 for
 * being meaningless, and deriving this from the build would reintroduce exactly
 * that — a date that changes on every deploy whether or not anything changed.
 */
const TEMPLATE_REVISION = '2026-09-03' // render curated two-way location/situation journeys

/**
 * Blog posts deliberately withheld from the sitemap. Some remain live for
 * existing inbound links; others now redirect to the stronger page that owns
 * the same search intent. Reversible — delete a slug to reinstate it.
 */
const SITEMAP_PRUNED_SLUGS = new Set([
  'sell-my-house-fast-luzerne-county-pa',
  'cash-home-buyers-lackawanna-county-no-fees',
  'cash-home-buyers-pottsville-pa',
  'selling-water-damaged-house-18102-mold-issues',
  'sell-my-house-fast-poconos-pa',
  'sell-house-fast-during-divorce-lehigh-county-pa',
])

/**
 * Real last-modified dates for repo-only pages, which have no CMS document to
 * read a date from. Sourced from the last commit touching each page's file.
 *
 * Hand-maintained. If a page is edited and this is not bumped, the sitemap
 * UNDER-claims freshness — the safe direction to be wrong in, and still far
 * better than the no-date-at-all this replaces.
 *
 * The three regional hubs take TEMPLATE_REVISION rather than their own (much
 * older) file date. NOT because they read the CMS — they do not. RegionalHubPage
 * is a client component fed a static module (src/lib/regional-hub-data.ts), and
 * nothing on that path touches Sanity, so there is no _updatedAt to floor them
 * and this constant is the only thing that can move their lastmod. An earlier
 * version of this comment claimed they render Sanity location data; they never
 * have. check-template-revision.mjs watches all three page files for that
 * reason.
 */
const STATIC_LASTMOD: Record<string, string> = {
  '/': '2026-09-03',
  '/blog': '2026-04-16',
  '/about': '2026-07-20',
  '/how-it-works': '2026-08-18', // QW8 orphan link added (1c11fe1)
  '/testimonials': '2026-07-20',
  '/privacy-policy': '2026-02-13',
  '/terms': '2026-02-13',
  '/contact': '2026-08-10',
  '/locations/nepa': TEMPLATE_REVISION,
  '/locations/lehigh-valley': TEMPLATE_REVISION,
  '/locations/poconos': TEMPLATE_REVISION,
  '/calculator': '2026-03-05',
  '/cash-buyer-vs-realtor': '2026-08-10',
  '/are-cash-home-buyers-legit': '2026-07-20',
}

/** Shape the sitemap needs from a Sanity location/situation document. */
interface SanityPageDoc {
  _updatedAt?: string
  slug: { current: string }
}

/** Shape returned by getBlogPostSitemapEntries(). */
interface BlogSitemapEntry {
  slug: string
  _updatedAt?: string
  publishedAt?: string
  updatedAt?: string
}

/** Newest of the supplied dates, ignoring anything missing or unparseable. */
function newestDate(...values: (string | undefined | null)[]): Date | undefined {
  const times = values
    .filter((v): v is string => typeof v === 'string' && v.length > 0)
    .map((v) => new Date(v).getTime())
    .filter((t) => Number.isFinite(t))
  return times.length ? new Date(Math.max(...times)) : undefined
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticDefs: { path: string; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'; priority: number }[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/blog', changeFrequency: 'daily', priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/how-it-works', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/testimonials', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/locations/nepa', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/locations/lehigh-valley', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/locations/poconos', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/calculator', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/cash-buyer-vs-realtor', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/are-cash-home-buyers-legit', changeFrequency: 'monthly', priority: 0.7 },
  ]

  const staticPages: MetadataRoute.Sitemap = staticDefs.map((d) => ({
    url: `${baseUrl}${d.path === '/' ? '' : d.path}` || baseUrl,
    lastModified: newestDate(STATIC_LASTMOD[d.path]),
    changeFrequency: d.changeFrequency,
    priority: d.priority,
  }))
  // The homepage entry must stay the bare origin, exactly as before.
  staticPages[0].url = baseUrl

  const staticUrls = new Set(staticPages.map((p) => p.url))

  // Locations and situations are fetched without a projection, so each document
  // already carries _updatedAt — no query change was needed for these two.
  const locations = await getLocations()
  const locationPages: MetadataRoute.Sitemap = locations
    .filter((location: SanityPageDoc) => !staticUrls.has(`${baseUrl}/locations/${location.slug.current}`))
    .map((location: SanityPageDoc) => ({
      url: `${baseUrl}/locations/${location.slug.current}`,
      lastModified: newestDate(location._updatedAt, TEMPLATE_REVISION),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  const situations = await getSituations()
  const situationPages: MetadataRoute.Sitemap = situations.map((situation: SanityPageDoc) => ({
    url: `${baseUrl}/situations/${situation.slug.current}`,
    lastModified: newestDate(situation._updatedAt, TEMPLATE_REVISION),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogEntries = await getBlogPostSitemapEntries()
  const blogPages: MetadataRoute.Sitemap = blogEntries
    .filter((post: BlogSitemapEntry) => !SITEMAP_PRUNED_SLUGS.has(post.slug))
    .map((post: BlogSitemapEntry) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: newestDate(post._updatedAt, post.updatedAt, post.publishedAt, TEMPLATE_REVISION),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  return [...staticPages, ...locationPages, ...situationPages, ...blogPages]
}
