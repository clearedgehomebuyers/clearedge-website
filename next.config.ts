import type { NextConfig } from 'next'

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
        // audit QW4 (2026-08-10): 9 situation pages breadcrumb (JSON-LD) into
        // /situations, which has no index route. Redirect chosen over pointing
        // breadcrumb item 2 at "/" — that would put the same URL at two
        // breadcrumb positions. This keeps the schema structurally truthful
        // and resolves any external links to the bare path.
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
    ]
  },
}

export default nextConfig
