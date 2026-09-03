import { afterEach, describe, expect, it, vi } from 'vitest'
import { trackAnalyticsEvent, trackClickToCall } from './analytics-events'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('analytics event helpers', () => {
  it('adds page context and the complete click-to-call dimensions', () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', {
      gtag,
      location: {
        pathname: '/locations/easton',
        href: 'https://www.clearedgehomebuyers.com/locations/easton',
      },
    })

    trackClickToCall({
      eventLabel: 'Header Phone - Desktop',
      callLocation: 'header_desktop',
      trafficSource: 'seo',
      phoneLine: '+16109048526',
    })

    expect(gtag).toHaveBeenCalledWith('event', 'click_to_call', {
      event_category: 'Contact',
      event_label: 'Header Phone - Desktop',
      call_location: 'header_desktop',
      traffic_source: 'seo',
      phone_line: '+16109048526',
      page_path: '/locations/easton',
      page_location: 'https://www.clearedgehomebuyers.com/locations/easton',
    })
  })

  it('is a no-op when analytics is unavailable', () => {
    vi.stubGlobal('window', { location: { pathname: '/', href: 'https://example.com/' } })
    expect(() => trackAnalyticsEvent('lead_form_start')).not.toThrow()
  })
})
