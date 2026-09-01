import { isMetaQaUrl } from '@/lib/meta-qa'

/**
 * Meta Pixel + Conversions API — browser side.
 *
 * ─── Deduplication contract ───────────────────────────────────────────────
 * Every user action gets exactly ONE uuid `event_id`, which is sent to both
 * the browser pixel (fbq's `eventID` option) and the server CAPI route. Meta
 * collapses events on the (event_name, event_id) pair, so an action that
 * reaches Meta twice — once from the browser, once from our server — counts
 * once. Without it Meta double-counts leads and ad optimization degrades.
 * `trackMeta()` below is the only place event ids are minted, so the two
 * transports can never drift apart.
 *
 * ─── Production gate ──────────────────────────────────────────────────────
 * The pixel stub is rendered only when VERCEL_ENV === 'production' (see
 * MetaPixel.tsx, mounted from the root layout), so the existence of
 * `window.fbq` IS the "Meta is enabled" signal. Nothing here fires on preview
 * or local builds and no extra NEXT_PUBLIC_ env var is needed to detect the
 * environment. Note the stub is inline (not blockable), so when an ad blocker
 * kills fbevents.js the browser event is lost but the CAPI call still lands —
 * which is most of the point of running CAPI at all.
 */

/** Meta standard events go through fbq('track'); everything else is custom. */
const STANDARD_EVENTS = new Set(['PageView'])

/** Meta's click-attribution window for _fbc. */
const FBC_MAX_AGE_SECONDS = 90 * 24 * 60 * 60
const META_QA_SESSION_KEY = 'clearedge_meta_qa'

export type MetaEventName = 'PageView' | 'FormStart' | 'CTAClick'

/**
 * Raw, UNHASHED identifiers. These are posted to our own same-origin route,
 * which does the SHA-256 hashing server-side. Hashing in the browser would
 * ship a crypto path to every visitor and still hand Meta the same digest —
 * the server is the right place for it.
 */
export interface MetaUserData {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  city?: string
  state?: string
  zip?: string
}

export interface MetaTrackOptions {
  customData?: Record<string, unknown>
  userData?: MetaUserData
}

// ─── Cookies ────────────────────────────────────────────────────────────────

export function readCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : ''
}

/**
 * Scope cookies to the registrable domain so www/apex share them. Falls back
 * to a host-only cookie on localhost and preview hosts, where a leading-dot
 * domain would be rejected and the cookie silently dropped.
 */
function cookieDomain(): string {
  const host = window.location.hostname
  if (host === 'localhost' || /^\d+(\.\d+){3}$/.test(host)) return ''
  const bare = host.replace(/^www\./, '')
  return bare.includes('.') ? `; Domain=.${bare}` : ''
}

function writeCookie(name: string, value: string, maxAgeSeconds: number) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie =
    `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/` +
    `${cookieDomain()}; SameSite=Lax${secure}`
}

// ─── fbclid → _fbc ──────────────────────────────────────────────────────────

/**
 * `_fbc` is the strongest click-attribution signal available — it ties the
 * conversion to the exact ad click rather than to a probabilistic match.
 *
 * The pixel writes this cookie itself, but only after fbevents.js has loaded
 * (lazily) and only while the visitor is still on the URL carrying the fbclid.
 * Writing it ourselves on landing closes both gaps.
 *
 * Format is Meta's spec: fb.{subdomainIndex}.{creationTimeMs}.{fbclid}
 *
 * @returns the fbclid in play (from this URL, or from an existing cookie)
 */
export function captureFbclid(): string {
  if (typeof window === 'undefined') return ''

  const existing = readCookie('_fbc')
  const existingFbclid = existing ? existing.split('.').slice(3).join('.') : ''
  const fbclid = new URLSearchParams(window.location.search).get('fbclid') || ''

  if (!fbclid) return existingFbclid

  // Tagged verification runs may use a placeholder click id to exercise the
  // Facebook routing branch. Return it to attribution, but never persist it as
  // Meta's _fbc cookie; the session's Meta events are suppressed below too.
  if (isMetaQaUrl(window.location.href)) return fbclid

  // A newer click wins; an identical one keeps its original creation time.
  if (fbclid !== existingFbclid) {
    writeCookie('_fbc', `fb.1.${Date.now()}.${fbclid}`, FBC_MAX_AGE_SECONDS)
  }
  return fbclid
}

/**
 * Make sure `_fbp` exists before an event reads it.
 *
 * `_fbp` is normally minted by fbevents.js — which we load with
 * `strategy="lazyOnload"`, i.e. after the window load event. The first
 * PageView fires from a mount effect long before that, so without this the
 * highest-volume event on the site ships with no fbp for every new visitor.
 *
 * Writing it ourselves is safe: fbevents.js adopts a well-formed existing
 * `_fbp` rather than minting a competing one (this is the mechanism every
 * first-party-cookie CAPI setup relies on). We only ever create it when
 * absent, so the pixel's own value always wins if it got there first.
 *
 * Format is Meta's: fb.{subdomainIndex}.{creationTimeMs}.{randomNumber}
 */
export function ensureFbp(): string {
  if (typeof window === 'undefined') return ''

  const existing = readCookie('_fbp')
  if (existing) return existing

  const random = Math.floor(Math.random() * 9_000_000_000) + 1_000_000_000
  const fbp = `fb.1.${Date.now()}.${random}`
  writeCookie('_fbp', fbp, FBC_MAX_AGE_SECONDS)
  return fbp
}

// ─── Event ids ──────────────────────────────────────────────────────────────

function newEventId(): string {
  const c = typeof crypto !== 'undefined' ? crypto : undefined
  if (c?.randomUUID) return c.randomUUID()
  if (c?.getRandomValues) {
    // uuid v4 by hand — Firefox 92-94 is in our browserslist and predates
    // crypto.randomUUID.
    const b = c.getRandomValues(new Uint8Array(16))
    b[6] = (b[6] & 0x0f) | 0x40
    b[8] = (b[8] & 0x3f) | 0x80
    const hex = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('')
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function isMetaQaSession(): boolean {
  if (typeof window === 'undefined') return false

  try {
    if (isMetaQaUrl(window.location.href)) {
      sessionStorage.setItem(META_QA_SESSION_KEY, '1')
      return true
    }
    return sessionStorage.getItem(META_QA_SESSION_KEY) === '1'
  } catch {
    // Privacy settings can disable sessionStorage. The URL check remains safe.
    return isMetaQaUrl(window.location.href)
  }
}

function pixelEnabled(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.fbq === 'function' &&
    !isMetaQaSession()
  )
}

// ─── Transport ──────────────────────────────────────────────────────────────

function sendCapi(body: Record<string, unknown>) {
  // keepalive: CTA clicks and form submits often navigate away immediately;
  // without it the request is cancelled on unload and the event is lost.
  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {
    /* Meta reachability is not the visitor's problem — never surface this. */
  })
}

/**
 * Fire one user action to both transports under a shared event id.
 * @returns the event id used (also returned when Meta is disabled, so callers
 *          can correlate without branching).
 */
export function trackMeta(
  eventName: MetaEventName,
  { customData, userData }: MetaTrackOptions = {},
): string {
  if (typeof window === 'undefined') return ''

  const eventId = newEventId()
  if (!pixelEnabled()) return eventId

  // Resolve Meta's identifier cookies HERE, before anything reads them.
  //
  // Both used to be written elsewhere and later: _fbc by TrafficSourceProvider
  // inside a setTimeout(0), and _fbp by fbevents.js on lazyOnload. The first
  // PageView fires from a mount effect, which beats both — so the first event
  // of every session, the single highest-volume event we send, went out with
  // neither identifier. Doing it here means no event can ever precede them.
  //
  // Both calls are idempotent and cheap: captureFbclid() only writes when the
  // URL carries a new fbclid, ensureFbp() only when the cookie is absent.
  captureFbclid()
  ensureFbp()

  const method = STANDARD_EVENTS.has(eventName) ? 'track' : 'trackCustom'
  window.fbq(method, eventName, customData ?? {}, { eventID: eventId })

  sendCapi({
    event_name: eventName,
    event_id: eventId,
    event_source_url: window.location.href,
    custom_data: customData,
    user_data: userData,
    fbc: readCookie('_fbc') || undefined,
    fbp: readCookie('_fbp') || undefined,
  })

  return eventId
}

// ─── Named wrappers (one line per call site) ────────────────────────────────

export function trackMetaPageView(): string {
  return trackMeta('PageView')
}

/**
 * Fire the browser copy of a server-confirmed Lead. /api/leads has already sent
 * the CAPI copy under this exact event id after Zapier acceptance, so this must
 * never mint its own id or call the public CAPI relay.
 */
export function trackConfirmedMetaLead(eventId: string, formName: string): void {
  if (!eventId || !pixelEnabled()) return
  captureFbclid()
  ensureFbp()
  window.fbq('track', 'Lead', { content_name: formName }, { eventID: eventId })
}

/**
 * Custom FormStart. GA4's `form_start` comes from Enhanced Measurement and
 * carries no form identity; ours names the form, so the three forms stay
 * distinguishable in Meta.
 */
export function trackMetaFormStart(formName: string): string {
  return trackMeta('FormStart', { customData: { form_name: formName } })
}

/** Custom CTAClick. Mirrors GA4 `cta_click`. */
export function trackMetaCTAClick(label: string, ctaLocation?: string): string {
  return trackMeta('CTAClick', {
    customData: {
      cta_label: label,
      ...(ctaLocation ? { cta_location: ctaLocation } : {}),
    },
  })
}
