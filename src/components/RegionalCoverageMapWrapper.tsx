"use client"

import dynamic from 'next/dynamic'

interface RegionalCoverageMapWrapperProps {
  regionSlug: string
  cities: string[]
  center: { lat: number; lng: number }
  zoom: number
}

// Lazy load the regional coverage map component to avoid loading Google Maps until needed
const RegionalCoverageMap = dynamic(
  () => import('./RegionalCoverageMap').then((mod) => ({ default: mod.RegionalCoverageMap })),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-[300px] md:h-[400px] bg-[#f5f5f5] rounded-2xl flex items-center justify-center border border-[#1a1f1a]/5"
        aria-label="Loading regional coverage map"
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#008a29] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-[#1a1f1a]/50 text-sm">Loading map...</p>
        </div>
      </div>
    ),
  }
)

export function RegionalCoverageMapWrapper(props: RegionalCoverageMapWrapperProps) {
  return <RegionalCoverageMap {...props} />
}
