import { describe, expect, it, vi } from 'vitest'
import {
  GA_MEASUREMENT_ID,
  GA_QA_SESSION_KEY,
  googleAnalyticsBootstrapScript,
} from './analytics-qa'

interface SessionStorageStub {
  getItem: ReturnType<typeof vi.fn>
  setItem: ReturnType<typeof vi.fn>
}

interface BootstrapWindow {
  location: { search: string }
  sessionStorage: SessionStorageStub
  dataLayer?: IArguments[]
  gtag?: (...args: unknown[]) => void
  [key: string]: unknown
}

function sessionStorageStub(initiallyDisabled = false): SessionStorageStub {
  const values = new Map<string, string>()
  if (initiallyDisabled) values.set(GA_QA_SESSION_KEY, '1')

  return {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      values.set(key, value)
    }),
  }
}

function runBootstrap(search: string, sessionStorage = sessionStorageStub()) {
  const browserWindow: BootstrapWindow = {
    location: { search },
    sessionStorage,
  }
  const execute = new Function(
    'window',
    'URLSearchParams',
    googleAnalyticsBootstrapScript(),
  ) as (window: BootstrapWindow, constructor: typeof URLSearchParams) => void

  execute(browserWindow, URLSearchParams)
  return browserWindow
}

function queuedArguments(browserWindow: BootstrapWindow) {
  return (browserWindow.dataLayer ?? []).map((entry) => Array.from(entry))
}

describe('Google Analytics deploy-check bootstrap', () => {
  it.each([
    '?utm_source=deploy-check',
    '?utm_medium=qa-deploy-check',
    '?utm_campaign=Deploy-Check-Smoke',
    '?utm_content=button-deploy-check-test',
    '?utm_term=DEPLOY-CHECK',
  ])('suppresses a tagged QA visit from %s', (search) => {
    const browserWindow = runBootstrap(search)

    expect(browserWindow[`ga-disable-${GA_MEASUREMENT_ID}`]).toBe(true)
    expect(browserWindow.sessionStorage.setItem).toHaveBeenCalledWith(
      GA_QA_SESSION_KEY,
      '1',
    )
  })

  it('persists suppression across later pages in the same session', () => {
    const browserWindow = runBootstrap('', sessionStorageStub(true))

    expect(browserWindow[`ga-disable-${GA_MEASUREMENT_ID}`]).toBe(true)
  })

  it('keeps genuine campaigns enabled and queues the unchanged GA configuration', () => {
    const browserWindow = runBootstrap(
      '?fbclid=real-click-id&utm_source=facebook&utm_campaign=nj-sellers',
    )

    expect(browserWindow[`ga-disable-${GA_MEASUREMENT_ID}`]).toBe(false)
    expect(browserWindow.sessionStorage.setItem).not.toHaveBeenCalled()
    expect(queuedArguments(browserWindow)).toEqual([
      ['js', expect.any(Date)],
      ['config', GA_MEASUREMENT_ID],
    ])
  })

  it('still suppresses the current QA page when session storage is unavailable', () => {
    const storage = sessionStorageStub()
    storage.setItem.mockImplementation(() => {
      throw new Error('storage blocked')
    })
    storage.getItem.mockImplementation(() => {
      throw new Error('storage blocked')
    })

    const browserWindow = runBootstrap('?utm_source=deploy-check', storage)

    expect(browserWindow[`ga-disable-${GA_MEASUREMENT_ID}`]).toBe(true)
  })

  it('fails open for an ordinary visit when session storage is unavailable', () => {
    const storage = sessionStorageStub()
    storage.getItem.mockImplementation(() => {
      throw new Error('storage blocked')
    })

    const browserWindow = runBootstrap('?utm_source=google', storage)

    expect(browserWindow[`ga-disable-${GA_MEASUREMENT_ID}`]).toBe(false)
  })
})
