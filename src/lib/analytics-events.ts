export type AnalyticsParameters = Record<string, string | number | boolean | null | undefined>

/**
 * Queue a GA4 event without ever blocking the visitor's action. The production
 * layout installs window.gtag before React hydrates; this guard also keeps
 * local/test/preview renders safe when analytics is intentionally absent.
 */
export function trackAnalyticsEvent(
  eventName: string,
  parameters: AnalyticsParameters = {},
): void {
  if (typeof window === 'undefined' || !window.gtag) return

  try {
    window.gtag('event', eventName, {
      ...parameters,
      page_path: window.location.pathname,
      page_location: window.location.href,
    })
  } catch {
    // Measurement must never interrupt a phone call, form, or navigation.
  }
}

interface ClickToCallParameters {
  eventLabel: string
  callLocation: string
  trafficSource: string
  phoneLine: string
}

/** Preserve historical event labels while adding the dimensions needed to
 * compare call intent by page placement and attributed phone line. */
export function trackClickToCall({
  eventLabel,
  callLocation,
  trafficSource,
  phoneLine,
}: ClickToCallParameters): void {
  trackAnalyticsEvent('click_to_call', {
    event_category: 'Contact',
    event_label: eventLabel,
    call_location: callLocation,
    traffic_source: trafficSource,
    phone_line: phoneLine,
  })
}
