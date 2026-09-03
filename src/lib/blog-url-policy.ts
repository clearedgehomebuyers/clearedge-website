/**
 * Canonical destinations for retired blog URLs.
 *
 * Keep this as the single source of truth for redirects, Sanity listing
 * queries, static generation, and sitemap filtering. A retired article must
 * never be linked from a crawlable page while its old URL redirects elsewhere.
 */
export const BLOG_REDIRECTS = [
  {
    slug: 'sell-my-house-fast-poconos-pa',
    source: '/blog/sell-my-house-fast-poconos-pa',
    destination: '/locations/poconos',
  },
  {
    slug: 'cash-home-buyers-pottsville-pa',
    source: '/blog/cash-home-buyers-pottsville-pa',
    destination: '/locations/pottsville',
  },
  {
    slug: 'selling-water-damaged-house-18102-mold-issues',
    source: '/blog/selling-water-damaged-house-18102-mold-issues',
    destination: '/situations/major-repairs',
  },
  {
    slug: 'sell-house-fast-during-divorce-lehigh-county-pa',
    source: '/blog/sell-house-fast-during-divorce-lehigh-county-pa',
    destination: '/situations/divorce',
  },
] as const

export const REDIRECTED_BLOG_SLUGS = BLOG_REDIRECTS.map(({ slug }) => slug)

/**
 * These two additional posts still return 200 and remain available to people
 * with a direct link, but historical indexation evidence is not yet strong
 * enough to put them back in the sitemap.
 */
export const SITEMAP_EXCLUDED_BLOG_SLUGS = [
  'sell-my-house-fast-luzerne-county-pa',
  'cash-home-buyers-lackawanna-county-no-fees',
  ...REDIRECTED_BLOG_SLUGS,
]
