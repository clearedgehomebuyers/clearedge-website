import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: '/sell-house-fast-scranton-pa',
        destination: '/locations/scranton',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
