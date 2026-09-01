'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { captureFbclid, readCookie } from '@/lib/meta-pixel'

// ─── SMS Attribution Window ───
// How long (in ms) after clicking an SMS link we still attribute return visits
// to that campaign. 7 days covers most real-estate decision timelines.
const SMS_ATTRIBUTION_WINDOW_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

// ─── Traffic Source Configuration ───
// Destination routing now happens in the server-only /api/leads handler. This
// client provider intentionally owns only visitor-facing phone attribution.
const TRAFFIC_CONFIG = {
  // Pre-detection state. Renders the NAP/GBP number — the same one organic
  // gets, and the correct neutral default — so nothing changes visually before
  // hydration. A lead submitted in this window reports 'unknown' rather than a
  // false 'seo'; the server routes that value to its explicit fallback without
  // relabeling the attribution.
  unknown: {
    phone: '(610) 904-8526',
    phoneRaw: '6109048526',
    phoneTel: '+16109048526',
  },
  seo: {
    phone: '(610) 904-8526',
    phoneRaw: '6109048526',
    phoneTel: '+16109048526',
  },
  direct: {
    phone: '(610) 628-0671',
    phoneRaw: '6106280671',
    phoneTel: '+16106280671',
  },
  sms: {
    phone: '(610) 379-1453',
    phoneRaw: '6103791453',
    phoneTel: '+16103791453',
  },
  // Meta/Facebook ads. This is the New Jersey campaign number.
  // A PA Facebook number — (610) 991-7916 — exists but is deliberately not
  // wired here. Adding it means a second facebook-* branch plus a rule to pick
  // between them (campaign geo via utm_campaign is the likely discriminator).
  facebook: {
    phone: '(973) 346-9832',
    phoneRaw: '9733469832',
    phoneTel: '+19733469832',
  },
} as const

type TrafficSource = 'seo' | 'direct' | 'sms' | 'facebook' | 'unknown'

/** The states detection can actually settle on — 'unknown' is never stored. */
type ResolvedTrafficSource = Exclude<TrafficSource, 'unknown'>

export interface UTMParams {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  /** Meta's ad-click id. Travels with the UTMs into the CRM payload so a lead
   *  can be tied back to the exact ad click. */
  fbclid: string
}

const EMPTY_UTM: UTMParams = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  utm_term: '',
  fbclid: '',
}

interface TrafficSourceContextType {
  trafficSource: TrafficSource
  phone: string
  phoneRaw: string
  phoneTel: string
  utmParams: UTMParams
  landingPage: string
  isLoaded: boolean
}

const TrafficSourceContext = createContext<TrafficSourceContextType>({
  trafficSource: 'unknown',
  phone: TRAFFIC_CONFIG.unknown.phone,
  phoneRaw: TRAFFIC_CONFIG.unknown.phoneRaw,
  phoneTel: TRAFFIC_CONFIG.unknown.phoneTel,
  utmParams: EMPTY_UTM,
  landingPage: '',
  isLoaded: false,
})

// SEO referrer patterns.
// facebook.com is deliberately absent: Meta traffic is identified by fbclid
// and the _fbc cookie, not by referrer, because in-app browsers strip or
// rewrite it. Adding it here would misclassify organic Facebook shares as ads.
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
//
// Precedence, first match wins. The ordering principle: paid signals outrank
// the sessionStorage lock. A lead that can't be traced to the spend that
// produced it makes budget decisions run on wrong data, so a live ad click is
// never allowed to inherit an earlier organic/direct classification.
//
//   1. fbclid in the current URL      → facebook  (overwrites stored value)
//   2. ?utm_source=sms                → sms
//   3. stored SMS attribution, ≤7d    → sms
//   4. _fbc cookie present            → facebook  (Meta's own 90-day window)
//   5. stored sessionStorage value    → that value
//   6. referrer match                 → seo / direct
//   7. nothing resolves               → direct
//
function detectTrafficSource(): { source: ResolvedTrafficSource; restoredUTM: UTMParams | null; restoredLandingPage: string | null } {
  if (typeof window === 'undefined') return { source: 'direct', restoredUTM: null, restoredLandingPage: null }

  const params = new URLSearchParams(window.location.search)

  // 1. Live ad click. Outranks everything, including a stored value from
  //    earlier in this session — the click is the most recent truth about
  //    where this visitor came from, and it is the one we are paying for.
  if (params.get('fbclid')) {
    sessionStorage.setItem('trafficSource', 'facebook')
    return { source: 'facebook', restoredUTM: null, restoredLandingPage: null }
  }

  // 2. Explicit SMS campaign tagging in the URL.
  if (params.get('utm_source') === 'sms') {
    sessionStorage.setItem('trafficSource', 'sms')
    return { source: 'sms', restoredUTM: null, restoredLandingPage: null }
  }

  // 3. Stored SMS attribution (return visit within the 7-day window).
  //    If someone clicked an SMS link days ago, left, and is now coming back,
  //    we still attribute them to that campaign — and restore the original
  //    UTMs and landing page with it.
  const smsAttribution = loadSMSAttribution()
  if (smsAttribution) {
    sessionStorage.setItem('trafficSource', 'sms')
    return {
      source: 'sms',
      restoredUTM: smsAttribution.utmParams,
      restoredLandingPage: smsAttribution.landingPage,
    }
  }

  // 4. Returning ad-clicker. captureFbclid() writes _fbc with a 90-day
  //    max-age, matching Meta's click-attribution window. Reading it here is
  //    what stops the site from serving the direct number to a visitor Meta is
  //    still attributing to an ad.
  if (readCookie('_fbc')) {
    sessionStorage.setItem('trafficSource', 'facebook')
    return { source: 'facebook', restoredUTM: null, restoredLandingPage: null }
  }

  // 5. Session lock — whatever this session already resolved to.
  const storedSource = sessionStorage.getItem('trafficSource')
  if (
    storedSource === 'seo' ||
    storedSource === 'direct' ||
    storedSource === 'sms' ||
    storedSource === 'facebook'
  ) {
    return { source: storedSource, restoredUTM: null, restoredLandingPage: null }
  }

  // 6. Detect from referrer
  const referrer = document.referrer.toLowerCase()

  // If no referrer or internal referrer → direct
  if (!referrer || referrer.includes('clearedgehomebuyers.com')) {
    sessionStorage.setItem('trafficSource', 'direct')
    return { source: 'direct', restoredUTM: null, restoredLandingPage: null }
  }

  // 7. Search engine referrer → seo. Anything else falls through to direct.
  const isSEO = SEO_REFERRERS.some(pattern => referrer.includes(pattern))
  const source: ResolvedTrafficSource = isSEO ? 'seo' : 'direct'

  sessionStorage.setItem('trafficSource', source)
  return { source, restoredUTM: null, restoredLandingPage: null }
}

// ─── UTM parameter capture ───
// `fbclid` is passed in rather than read here: captureFbclid() also writes the
// _fbc cookie, and that has to happen on every landing, including the ones
// that short-circuit on stored params below.
function captureUTMParams(fbclid: string): UTMParams {
  if (typeof window === 'undefined') return EMPTY_UTM

  // Check sessionStorage first (persist across page navigation)
  const stored = sessionStorage.getItem('utmParams')
  if (stored) {
    try {
      // Spread over EMPTY_UTM so sessions stored before fbclid was captured
      // still deserialize into a complete object.
      const restored: UTMParams = { ...EMPTY_UTM, ...JSON.parse(stored) }
      // A fresh ad click mid-session supersedes what we stored earlier.
      if (fbclid && fbclid !== restored.fbclid) {
        restored.fbclid = fbclid
        sessionStorage.setItem('utmParams', JSON.stringify(restored))
      }
      return restored
    } catch { /* fall through */ }
  }

  const params = new URLSearchParams(window.location.search)
  const utmParams: UTMParams = {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
    fbclid,
  }

  // Persist if ANY parameter landed. Keying this on utm_source alone would
  // drop fbclid-only visits — which is exactly what an untagged Meta ad click
  // looks like.
  if (Object.values(utmParams).some(Boolean)) {
    sessionStorage.setItem('utmParams', JSON.stringify(utmParams))
  }

  return utmParams
}

export function TrafficSourceProvider({ children }: { children: ReactNode }) {
  // Starts 'unknown', not 'seo': detection runs after mount, and seeding to a
  // real branch meant every pre-hydration lead was recorded as organic.
  const [trafficSource, setTrafficSource] = useState<TrafficSource>('unknown')
  const [utmParams, setUtmParams] = useState<UTMParams>(EMPTY_UTM)
  const [landingPage, setLandingPage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Defer detection to avoid competing with hydration on the main thread
    const id = setTimeout(() => {
      const landing = captureLandingPage()
      // Write _fbc first: it has to land on every visit carrying an fbclid,
      // whether or not that visit also carries UTMs or restores an older one.
      const fbclid = captureFbclid()
      const { source, restoredUTM, restoredLandingPage } = detectTrafficSource()
      const utm = restoredUTM
        ? { ...EMPTY_UTM, ...restoredUTM, fbclid: fbclid || restoredUTM.fbclid || '' }
        : captureUTMParams(fbclid)

      // If UTMs were restored from localStorage (return SMS visit),
      // also persist them into sessionStorage for this session
      if (restoredUTM) {
        sessionStorage.setItem('utmParams', JSON.stringify(utm))
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
