'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// ─── SMS Attribution Window ───
// How long (in ms) after clicking an SMS link we still attribute return visits
// to that campaign. 7 days covers most real-estate decision timelines.
const SMS_ATTRIBUTION_WINDOW_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

// ─── Traffic Source Configuration ───
// TODO: Update sms.phone and sms.webhook when dedicated SMS tracking
//       number and Zapier webhook are provisioned.
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
    phone: '(610) 379-1453',
    phoneRaw: '6103791453',
    phoneTel: '+16103791453',
    webhook: 'https://hooks.zapier.com/hooks/catch/26244252/uenj3w1/',
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
  landingPage: string
  isLoaded: boolean
}

const TrafficSourceContext = createContext<TrafficSourceContextType>({
  trafficSource: 'seo',
  phone: TRAFFIC_CONFIG.seo.phone,
  phoneRaw: TRAFFIC_CONFIG.seo.phoneRaw,
  phoneTel: TRAFFIC_CONFIG.seo.phoneTel,
  webhook: TRAFFIC_CONFIG.seo.webhook,
  utmParams: EMPTY_UTM,
  landingPage: '',
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

// ─── localStorage helpers for SMS attribution ───
// SMS attribution is stored in localStorage so it survives browser close.
// This is critical — cold SMS prospects rarely convert on first visit.

interface SMSAttribution {
  source: 'sms'
  utmParams: UTMParams
  landingPage: string
  timestamp: number
}

function saveSMSAttribution(utm: UTMParams, landingPage: string) {
  try {
    const data: SMSAttribution = {
      source: 'sms',
      utmParams: utm,
      landingPage,
      timestamp: Date.now(),
    }
    localStorage.setItem('smsAttribution', JSON.stringify(data))
  } catch { /* localStorage unavailable (private browsing, full storage) */ }
}

function loadSMSAttribution(): SMSAttribution | null {
  try {
    const raw = localStorage.getItem('smsAttribution')
    if (!raw) return null
    const data: SMSAttribution = JSON.parse(raw)
    // Check if still within the attribution window
    if (Date.now() - data.timestamp > SMS_ATTRIBUTION_WINDOW_MS) {
      localStorage.removeItem('smsAttribution')
      return null
    }
    return data
  } catch {
    return null
  }
}

function clearSMSAttribution() {
  try { localStorage.removeItem('smsAttribution') } catch { /* noop */ }
}

// ─── Landing page capture ───
// Stores the first page URL a visitor lands on during this session.
function captureLandingPage(): string {
  if (typeof window === 'undefined') return ''

  const stored = sessionStorage.getItem('landingPage')
  if (stored) return stored

  const landingPage = window.location.href
  sessionStorage.setItem('landingPage', landingPage)
  return landingPage
}

// ─── Traffic source detection ───
function detectTrafficSource(): { source: TrafficSource; restoredUTM: UTMParams | null; restoredLandingPage: string | null } {
  if (typeof window === 'undefined') return { source: 'direct', restoredUTM: null, restoredLandingPage: null }

  // 1. Check sessionStorage (persists within current browser session)
  const storedSource = sessionStorage.getItem('trafficSource')
  if (storedSource === 'seo' || storedSource === 'direct' || storedSource === 'sms') {
    return { source: storedSource, restoredUTM: null, restoredLandingPage: null }
  }

  // 2. Check UTM params in URL (highest priority — explicit campaign tagging)
  const params = new URLSearchParams(window.location.search)
  const utmSource = params.get('utm_source')
  if (utmSource === 'sms') {
    sessionStorage.setItem('trafficSource', 'sms')
    return { source: 'sms', restoredUTM: null, restoredLandingPage: null }
  }

  // 3. Check localStorage for SMS attribution (return visit within 7-day window)
  //    This is the key feature — if someone clicked an SMS link days ago,
  //    left, and is now coming back, we still attribute them to that campaign.
  const smsAttribution = loadSMSAttribution()
  if (smsAttribution) {
    sessionStorage.setItem('trafficSource', 'sms')
    return {
      source: 'sms',
      restoredUTM: smsAttribution.utmParams,
      restoredLandingPage: smsAttribution.landingPage,
    }
  }

  // 4. Detect from referrer
  const referrer = document.referrer.toLowerCase()

  // If no referrer or internal referrer → direct
  if (!referrer || referrer.includes('clearedgehomebuyers.com')) {
    sessionStorage.setItem('trafficSource', 'direct')
    return { source: 'direct', restoredUTM: null, restoredLandingPage: null }
  }

  // Check if referrer matches any search engine
  const isSEO = SEO_REFERRERS.some(pattern => referrer.includes(pattern))
  const source: TrafficSource = isSEO ? 'seo' : 'direct'

  sessionStorage.setItem('trafficSource', source)
  return { source, restoredUTM: null, restoredLandingPage: null }
}

// ─── UTM parameter capture ───
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
  const [landingPage, setLandingPage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Defer detection to avoid competing with hydration on the main thread
    const id = setTimeout(() => {
      const landing = captureLandingPage()
      const { source, restoredUTM, restoredLandingPage } = detectTrafficSource()
      const utm = restoredUTM || captureUTMParams()

      // If UTMs were restored from localStorage (return SMS visit),
      // also persist them into sessionStorage for this session
      if (restoredUTM) {
        sessionStorage.setItem('utmParams', JSON.stringify(restoredUTM))
      }

      // Use the original landing page from SMS attribution if this is a return visit
      const effectiveLanding = restoredLandingPage || landing

      // If this is a fresh SMS visit (not restored), save to localStorage
      // so it survives browser close for the 7-day attribution window
      if (source === 'sms' && !restoredUTM) {
        saveSMSAttribution(utm, effectiveLanding)
      }

      // If visitor converted (will be cleared on form submission via clearSMSAttribution),
      // or if source is not SMS, we don't touch localStorage — it stays for return visits.

      setTrafficSource(source)
      setUtmParams(utm)
      setLandingPage(effectiveLanding)
      setIsLoaded(true)
    }, 0)
    return () => clearTimeout(id)
  }, [])

  const config = TRAFFIC_CONFIG[trafficSource]

  const value: TrafficSourceContextType = {
    trafficSource,
    phone: config.phone,
    phoneRaw: config.phoneRaw,
    phoneTel: config.phoneTel,
    webhook: config.webhook,
    utmParams,
    landingPage,
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

// Call this after a successful form submission to clear SMS attribution
// so the lead isn't double-counted if they visit again
export { clearSMSAttribution }
