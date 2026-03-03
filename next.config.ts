import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
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
        source: '/sell-house-fast-scranton-pa',
        destination: '/locations/scranton',
        permanent: true,
      },
      // SMS campaign tracking redirect
      {
        source: '/txt',
        destination: '/calculator?utm_source=sms&utm_medium=text',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
