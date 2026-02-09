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
  sms: {
    phone: '(610) 628-0671',    // TBD — update when SMS tracking number is provisioned
    phoneRaw: '6106280671',
    phoneTel: '+16106280671',
    webhook: 'https://hooks.zapier.com/hooks/catch/26244252/ultjlsu/',  // TBD — update when SMS webhook is created
  },
} as const

type TrafficSource = 'seo' | 'direct' | 'sms'

export interface UTMParams {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
}

const EMPTY_UTM: UTMParams = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  utm_term: '',
}

interface TrafficSourceContextType {
  trafficSource: TrafficSource
  phone: string
  phoneRaw: string
  phoneTel: string
  webhook: string
  utmParams: UTMParams
  isLoaded: boolean
}

const TrafficSourceContext = createContext<TrafficSourceContextType>({
  trafficSource: 'seo',
  phone: TRAFFIC_CONFIG.seo.phone,
  phoneRaw: TRAFFIC_CONFIG.seo.phoneRaw,
  phoneTel: TRAFFIC_CONFIG.seo.phoneTel,
  webhook: TRAFFIC_CONFIG.seo.webhook,
  utmParams: EMPTY_UTM,
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
  if (storedSource === 'seo' || storedSource === 'direct' || storedSource === 'sms') {
    return storedSource
  }

  // Check UTM params in URL (highest priority — explicit campaign tagging)
  const params = new URLSearchParams(window.location.search)
  const utmSource = params.get('utm_source')
  if (utmSource === 'sms') {
    sessionStorage.setItem('trafficSource', 'sms')
    return 'sms'
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

function captureUTMParams(): UTMParams {
  if (typeof window === 'undefined') return EMPTY_UTM

  // Check sessionStorage first (persist across page navigation)
  const stored = sessionStorage.getItem('utmParams')
  if (stored) {
    try { return JSON.parse(stored) } catch { /* fall through */ }
  }

  const params = new URLSearchParams(window.location.search)
  const utmParams: UTMParams = {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
  }

  // Store in sessionStorage if any UTM param is present
  if (utmParams.utm_source) {
    sessionStorage.setItem('utmParams', JSON.stringify(utmParams))
  }

  return utmParams
}

export function TrafficSourceProvider({ children }: { children: ReactNode }) {
  const [trafficSource, setTrafficSource] = useState<TrafficSource>('seo')
  const [utmParams, setUtmParams] = useState<UTMParams>(EMPTY_UTM)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const source = detectTrafficSource()
    const utm = captureUTMParams()
    setTrafficSource(source)
    setUtmParams(utm)
    setIsLoaded(true)
  }, [])

  const config = TRAFFIC_CONFIG[trafficSource]

  const value: TrafficSourceContextType = {
    trafficSource,
    phone: config.phone,
    phoneRaw: config.phoneRaw,
    phoneTel: config.phoneTel,
    webhook: config.webhook,
    utmParams,
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
