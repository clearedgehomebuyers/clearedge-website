'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// Configuration for traffic sources
const TRAFFIC_CONFIG = {
  seo: {
    phone: '(610) 904-8526',
    phoneRaw: '6109048526',
    phoneTel: '+16109048526',
    webhook: 'https://hooks.zapier.com/hooks/catch/26244252/ul6z6d8/',
  },
  direct: {
    phone: '(610) 628-0671',
    phoneRaw: '6106280671',
    phoneTel: '+16106280671',
    webhook: 'https://hooks.zapier.com/hooks/catch/26244252/ultjlsu/',
  },
} as const

type TrafficSource = 'seo' | 'direct'

interface TrafficSourceContextType {
  trafficSource: TrafficSource
  phone: string
  phoneRaw: string
  phoneTel: string
  webhook: string
  isLoaded: boolean
}

const TrafficSourceContext = createContext<TrafficSourceContextType>({
  trafficSource: 'direct',
  phone: TRAFFIC_CONFIG.direct.phone,
  phoneRaw: TRAFFIC_CONFIG.direct.phoneRaw,
  phoneTel: TRAFFIC_CONFIG.direct.phoneTel,
  webhook: TRAFFIC_CONFIG.direct.webhook,
  isLoaded: false,
})

// SEO referrer patterns
const SEO_REFERRERS = [
  'google.com',
  'google.',
  'bing.com',
  'yahoo.com',
  'duckduckgo.com',
  'baidu.com',
  'yandex.',
]

function detectTrafficSource(): TrafficSource {
  if (typeof window === 'undefined') return 'direct'

  // Check if we already have a stored source (persist across page navigation)
  const storedSource = sessionStorage.getItem('trafficSource')
  if (storedSource === 'seo' || storedSource === 'direct') {
    return storedSource
  }

  // Detect from referrer
  const referrer = document.referrer.toLowerCase()

  // If no referrer or internal referrer, it's direct traffic
  if (!referrer || referrer.includes('clearedgehomebuyers.com')) {
    sessionStorage.setItem('trafficSource', 'direct')
    return 'direct'
  }

  // Check if referrer matches any SEO source
  const isSEO = SEO_REFERRERS.some(pattern => referrer.includes(pattern))
  const source: TrafficSource = isSEO ? 'seo' : 'direct'

  sessionStorage.setItem('trafficSource', source)
  return source
}

export function TrafficSourceProvider({ children }: { children: ReactNode }) {
  const [trafficSource, setTrafficSource] = useState<TrafficSource>('direct')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const source = detectTrafficSource()
    setTrafficSource(source)
    setIsLoaded(true)
  }, [])

  const config = TRAFFIC_CONFIG[trafficSource]

  const value: TrafficSourceContextType = {
    trafficSource,
    phone: config.phone,
    phoneRaw: config.phoneRaw,
    phoneTel: config.phoneTel,
    webhook: config.webhook,
    isLoaded,
  }

  return (
    <TrafficSourceContext.Provider value={value}>
      {children}
    </TrafficSourceContext.Provider>
  )
}

export function useTrafficSource() {
  const context = useContext(TrafficSourceContext)
  if (!context) {
    throw new Error('useTrafficSource must be used within a TrafficSourceProvider')
  }
  return context
}
