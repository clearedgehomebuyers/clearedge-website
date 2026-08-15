'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { trackMetaPageView } from '@/lib/meta-pixel'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

/**
 * Meta Pixel base code + PageView on every route.
 *
 * Mounted from the root layout behind VERCEL_ENV === 'production', the same
 * gate the GA4 scripts use.
 *
 * The inline stub is Meta's official snippet with the script-injection lines
 * removed — next/script loads fbevents.js instead, so it participates in
 * Next's loading strategy. The stub still installs fbq's queue synchronously,
 * so events fired before the SDK arrives are buffered rather than dropped
 * (and `window.fbq` existing is what src/lib/meta-pixel.ts reads as "Meta is
 * enabled").
 *
 * PageView is NOT in the stub: it is fired from the effect below instead, so
 * the initial view and every client-side route change go through one code
 * path and all of them carry a dedup event id + a matching CAPI call.
 */
export function MetaPixel() {
  const pathname = usePathname()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    if (!PIXEL_ID) return
    // Effects re-run on remount; only a genuine path change is a new view.
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    trackMetaPageView()
  }, [pathname])

  if (!PIXEL_ID) return null

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window,document);
            fbq('init', '${PIXEL_ID}');
          `,
        }}
      />
      {/* lazyOnload matches the GA4 treatment: the browser event is the
          redundant copy here — CAPI has already recorded the action — so it
          never needs to compete with LCP. */}
      <Script src="https://connect.facebook.net/en_US/fbevents.js" strategy="lazyOnload" />
    </>
  )
}
