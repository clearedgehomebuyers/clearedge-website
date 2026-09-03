'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { captureFbclid, readCookie } from '@/lib/meta-pixel'
import { TRAFFIC_PHONE_CONFIG } from '@/lib/phone-attribution'

// ─── SMS Attribution Window ───
// How long (in ms) after clicking an SMS link we still attribute return visits
// to that campaign. 7 days covers most real-estate decision timelines.
const SMS_ATTRIBUTION_WINDOW_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

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

// Some privacy modes expose Web Storage but throw as soon as it is touched.
// Attribution may degrade in that environment, but the website must still
// finish loading and reveal a callable phone number.
function readSessionItem(key: string): string | null {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

function writeSessionItem(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    // Storage is optional; phone availability is not.
  }
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
  phone: TRAFFIC_PHONE_CONFIG.unknown.phone,
  phoneRaw: TRAFFIC_PHONE_CONFIG.unknown.phoneRaw,
  phoneTel: TRAFFIC_PHONE_CONFIG.unknown.phoneTel,
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

  const params = new URLSearchParams(window.location.search)
  const hasFreshCampaignSignal = Boolean(params.get('fbclid'))
    || [...params.keys()].some((key) => key.startsWith('utm_'))
    || (window.location.pathname === '/txt' && !params.has('utm_source'))
  if (hasFreshCampaignSignal) {
    const landingPage = window.location.href
    writeSessionItem('landingPage', landingPage)
    return landingPage
  }

  const stored = readSessionItem('landingPage')
  if (stored) return stored

  const landingPage = window.location.href
  writeSessionItem('landingPage', landingPage)
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
//   2. explicit SMS/Meta utm_source   → sms / facebook
//   3. bare /txt campaign landing     → sms
//   4. stored SMS attribution, ≤7d    → sms
//   5. _fbc cookie present            → facebook  (Meta's own 90-day window)
//   6. stored sessionStorage value    → that value
//   7. referrer match                 → seo / direct
//   8. nothing resolves               → direct
//
export function detectTrafficSource(): { source: ResolvedTrafficSource; restoredUTM: UTMParams | null; restoredLandingPage: string | null } {
  if (typeof window === 'undefined') return { source: 'direct', restoredUTM: null, restoredLandingPage: null }

  const params = new URLSearchParams(window.location.search)
  const utmSource = (params.get('utm_source') || '').trim().toLowerCase()

  // 1. Live ad click. Outranks everything, including a stored value from
  //    earlier in this session — the click is the most recent truth about
  //    where this visitor came from, and it is the one we are paying for.
  if (params.get('fbclid')) {
    clearSMSAttribution()
    writeSessionItem('trafficSource', 'facebook')
    return { source: 'facebook', restoredUTM: null, restoredLandingPage: null }
  }

  // 2. Explicit campaign tagging. Normalize case because ad and SMS
  // platforms are not consistent about capitalizing UTM values.
  if (utmSource === 'sms') {
    writeSessionItem('trafficSource', 'sms')
    return { source: 'sms', restoredUTM: null, restoredLandingPage: null }
  }

  if (utmSource === 'facebook' || utmSource === 'meta' || utmSource === 'instagram') {
    clearSMSAttribution()
    writeSessionItem('trafficSource', 'facebook')
    return { source: 'facebook', restoredUTM: null, restoredLandingPage: null }
  }

  // The untagged /txt route exists only as an SMS campaign landing page.
  // Resolve it here, in the provider, instead of relying on child/parent effect
  // ordering in the route component.
  if (window.location.pathname === '/txt' && !params.has('utm_source')) {
    writeSessionItem('trafficSource', 'sms')
    return { source: 'sms', restoredUTM: null, restoredLandingPage: null }
  }

  // 4. Stored SMS attribution (return visit within the 7-day window).
  //    If someone clicked an SMS link days ago, left, and is now coming back,
  //    we still attribute them to that campaign — and restore the original
  //    UTMs and landing page with it.
  const smsAttribution = loadSMSAttribution()
  if (smsAttribution) {
    writeSessionItem('trafficSource', 'sms')
    return {
      source: 'sms',
      restoredUTM: smsAttribution.utmParams,
      restoredLandingPage: smsAttribution.landingPage,
    }
  }

  // 5. Returning ad-clicker. captureFbclid() writes _fbc with a 90-day
  //    max-age, matching Meta's click-attribution window. Reading it here is
  //    what stops the site from serving the direct number to a visitor Meta is
  //    still attributing to an ad.
  let hasFbcCookie = false
  try {
    hasFbcCookie = Boolean(readCookie('_fbc'))
  } catch {
    // Cookie access can be blocked independently of Web Storage.
  }
  if (hasFbcCookie) {
    writeSessionItem('trafficSource', 'facebook')
    return { source: 'facebook', restoredUTM: null, restoredLandingPage: null }
  }

  // 6. Session lock — whatever this session already resolved to.
  const storedSource = readSessionItem('trafficSource')
  if (
    storedSource === 'seo' ||
    storedSource === 'direct' ||
    storedSource === 'sms' ||
    storedSource === 'facebook'
  ) {
    return { source: storedSource, restoredUTM: null, restoredLandingPage: null }
  }

  // 7. Detect from referrer
  const referrer = document.referrer.toLowerCase()

  // If no referrer or internal referrer → direct
  if (!referrer || referrer.includes('clearedgehomebuyers.com')) {
    writeSessionItem('trafficSource', 'direct')
    return { source: 'direct', restoredUTM: null, restoredLandingPage: null }
  }

  // 8. Search engine referrer → seo. Anything else falls through to direct.
  const isSEO = SEO_REFERRERS.some(pattern => referrer.includes(pattern))
  const source: ResolvedTrafficSource = isSEO ? 'seo' : 'direct'

  writeSessionItem('trafficSource', source)
  return { source, restoredUTM: null, restoredLandingPage: null }
}

// ─── UTM parameter capture ───
// `fbclid` is passed in rather than read here: captureFbclid() also writes the
// _fbc cookie, and that has to happen on every landing, including the ones
// that short-circuit on stored params below.
export function captureUTMParams(fbclid: string): UTMParams {
  if (typeof window === 'undefined') return EMPTY_UTM

  const params = new URLSearchParams(window.location.search)
  const isBareSmsLanding = window.location.pathname === '/txt' && !params.has('utm_source')
  const currentFbclid = params.get('fbclid') || ''
  // captureFbclid() can return an older _fbc cookie value. Only an fbclid in
  // the current URL is a new click that should replace stored campaign data.
  const hasFreshCampaignSignal = Boolean(currentFbclid)
    || [...params.keys()].some((key) => key.startsWith('utm_'))
    || isBareSmsLanding

  // With no new campaign signal, retain this session's original parameters.
  // A fresh paid/SMS click replaces them as one complete attribution record;
  // mixing a new fbclid with an old campaign made CRM payloads contradictory.
  const stored = !hasFreshCampaignSignal ? readSessionItem('utmParams') : null
  if (stored) {
    try {
      // Spread over EMPTY_UTM so sessions stored before fbclid was captured
      // still deserialize into a complete object.
      const restored: UTMParams = { ...EMPTY_UTM, ...JSON.parse(stored) }
      return restored
    } catch { /* fall through */ }
  }

  const utmParams: UTMParams = {
    utm_source: params.get('utm_source') || (isBareSmsLanding ? 'sms' : ''),
    utm_medium: params.get('utm_medium') || (isBareSmsLanding ? 'text' : ''),
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
    // captureFbclid() also returns a historical _fbc cookie. That value is
    // valid on an untagged return visit, but must not be mixed into a new SMS
    // or other freshly tagged campaign. Only a click id in this URL belongs
    // to a fresh attribution record.
    fbclid: currentFbclid || (!hasFreshCampaignSignal ? fbclid : ''),
  }

  // Persist if ANY parameter landed. Keying this on utm_source alone would
  // drop fbclid-only visits — which is exactly what an untagged Meta ad click
  // looks like.
  if (Object.values(utmParams).some(Boolean)) {
    writeSessionItem('utmParams', JSON.stringify(utmParams))
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
      try {
        const landing = captureLandingPage()
        // Write _fbc first: it has to land on every visit carrying an fbclid,
        // whether or not that visit also carries UTMs or restores an older one.
        let fbclid = ''
        try {
          fbclid = captureFbclid()
        } catch {
          // Cookie access can be denied. The current URL remains enough to
          // route a live Meta click and is read again by captureUTMParams().
        }
        const { source, restoredUTM, restoredLandingPage } = detectTrafficSource()
        const utm = restoredUTM
          ? { ...EMPTY_UTM, ...restoredUTM }
          : captureUTMParams(fbclid)

        // If UTMs were restored from localStorage (return SMS visit),
        // also persist them into sessionStorage for this session.
        if (restoredUTM) {
          writeSessionItem('utmParams', JSON.stringify(utm))
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
      } catch {
        // A privacy/API failure must never strand all phone CTAs in their
        // pre-attribution hidden state. Direct is the conservative fallback.
        setTrafficSource('direct')
        setUtmParams(EMPTY_UTM)
        setLandingPage(typeof window === 'undefined' ? '' : window.location.href)
      } finally {
        setIsLoaded(true)
      }
    }, 0)
    return () => clearTimeout(id)
  }, [])

  const config = TRAFFIC_PHONE_CONFIG[trafficSource]

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
