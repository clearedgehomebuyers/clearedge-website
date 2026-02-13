"use client"

import dynamic from 'next/dynamic'
import { useRef, useState, useEffect } from 'react'

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

const placeholder = (
  <div
    className="w-full h-[300px] md:h-[400px] bg-[#f5f5f5] rounded-2xl flex items-center justify-center border border-[#1a1f1a]/5"
    aria-label="Regional coverage map"
  >
    <div className="text-center">
      <svg className="w-10 h-10 mx-auto mb-2 text-[#008a29]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
      <p className="text-[#1a1f1a]/40 text-sm">Interactive map loads when you scroll here</p>
    </div>
  </div>
)

export function RegionalCoverageMapWrapper(props: RegionalCoverageMapWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{visible ? <RegionalCoverageMap {...props} /> : placeholder}</div>
}
