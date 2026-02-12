"use client"

import dynamic from 'next/dynamic'

// Lazy load the coverage map component to avoid loading Google Maps until needed
const CoverageMap = dynamic(
  () => import('./CoverageMap').then((mod) => ({ default: mod.CoverageMap })),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-[280px] md:h-[500px] bg-[#f5f5f5] rounded-2xl flex items-center justify-center border border-[#1a1f1a]/5"
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#008a29] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-[#1a1f1a]/50 text-sm">Loading map...</p>
        </div>
      </div>
    ),
  }
)

export function CoverageMapWrapper() {
  return <CoverageMap />
}
