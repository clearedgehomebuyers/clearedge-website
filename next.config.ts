import type { NextConfig } from 'next'
import { BLOG_REDIRECTS } from './src/lib/blog-url-policy'

const nextConfig: NextConfig = {
  compiler: {
    // Keep console.error in production: it is the only signal when the Meta
    // CAPI route's events are rejected by Graph, and those failures are
    // otherwise silent (the client always gets a 200 so a Meta outage can
    // never break a form submission).
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    staleTimes: {
      dynamic: 180,
      static: 300,
    },
  },
  async redirects() {
    return [
      {
        // Preserve old external links to the retired bare collection path.
        // Situation-page breadcrumbs now link Home directly to the current
        // page and no longer expose this redirect internally.
        source: '/situations',
        destination: '/',
        permanent: true,
      },
      {
        source: '/sell-house-fast-scranton-pa',
        destination: '/locations/scranton',
        permanent: true,
      },
      {
        source: '/blog/sell-my-house-fast-allentown',
        destination: '/locations/allentown',
        permanent: true,
      },
      {
        source: '/blog/sell-my-house-fast-bethlehem-pa-18015-tax-lien',
        destination: '/blog/sell-house-tax-lien-bethlehem-pa',
        permanent: true,
      },
      {
        source: '/thank-you',
        destination: '/',
        permanent: true,
      },
      {
        // GSC still finds an old mixed-case homepage URL from an external
        // source. Consolidate it instead of returning a persistent 404.
        source: '/Home',
        destination: '/',
        permanent: true,
      },
      // These long-unindexed articles duplicate stronger transactional pages.
      // The shared policy also removes them from listings, related-content
      // queries, static generation, and the sitemap.
      ...BLOG_REDIRECTS.map(({ source, destination }) => ({
        source,
        destination,
        permanent: true,
      })),
    ]
  },
}

export default nextConfig
