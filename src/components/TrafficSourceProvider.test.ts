import { beforeEach, describe, expect, it, vi } from 'vitest'
import { captureUTMParams, detectTrafficSource } from './TrafficSourceProvider'

class MemoryStorage implements Storage {
  private values = new Map<string, string>()
  get length() { return this.values.size }
  clear() { this.values.clear() }
  getItem(key: string) { return this.values.get(key) ?? null }
  key(index: number) { return [...this.values.keys()][index] ?? null }
  removeItem(key: string) { this.values.delete(key) }
  setItem(key: string, value: string) { this.values.set(key, String(value)) }
}

class ThrowingStorage implements Storage {
  get length(): number { throw new Error('storage blocked') }
  clear(): void { throw new Error('storage blocked') }
  getItem(): string | null { throw new Error('storage blocked') }
  key(): string | null { throw new Error('storage blocked') }
  removeItem(): void { throw new Error('storage blocked') }
  setItem(): void { throw new Error('storage blocked') }
}

function setBrowser(url: string, referrer = '', cookie = '') {
  const parsed = new URL(url)
  vi.stubGlobal('window', { location: parsed })
  vi.stubGlobal('document', { referrer, cookie })
}

beforeEach(() => {
  vi.stubGlobal('sessionStorage', new MemoryStorage())
  vi.stubGlobal('localStorage', new MemoryStorage())
  setBrowser('https://www.clearedgehomebuyers.com/')
})

describe('traffic source detection', () => {
  it('separates direct and organic search visits', () => {
    expect(detectTrafficSource().source).toBe('direct')

    vi.stubGlobal('sessionStorage', new MemoryStorage())
    setBrowser('https://www.clearedgehomebuyers.com/', 'https://www.google.com/search?q=sell+house')
    expect(detectTrafficSource().source).toBe('seo')
  })

  it('normalizes explicit SMS and Meta UTM sources', () => {
    setBrowser('https://www.clearedgehomebuyers.com/?utm_source=SMS')
    expect(detectTrafficSource().source).toBe('sms')

    vi.stubGlobal('sessionStorage', new MemoryStorage())
    setBrowser('https://www.clearedgehomebuyers.com/?utm_source=Instagram')
    expect(detectTrafficSource().source).toBe('facebook')
  })

  it('treats a bare /txt visit as SMS without relying on effect ordering', () => {
    setBrowser('https://www.clearedgehomebuyers.com/txt')
    expect(detectTrafficSource().source).toBe('sms')
  })

  it('lets a fresh paid signal supersede an older session source', () => {
    sessionStorage.setItem('trafficSource', 'direct')
    setBrowser('https://www.clearedgehomebuyers.com/?fbclid=fresh-click')
    expect(detectTrafficSource().source).toBe('facebook')
  })

  it('keeps a fresh Facebook click from reverting to an older SMS attribution', () => {
    localStorage.setItem('smsAttribution', JSON.stringify({
      source: 'sms',
      utmParams: {
        utm_source: 'sms',
        utm_medium: 'text',
        utm_campaign: 'older-sms',
        utm_content: '',
        utm_term: '',
        fbclid: '',
      },
      landingPage: 'https://www.clearedgehomebuyers.com/txt',
      timestamp: Date.now(),
    }))

    setBrowser('https://www.clearedgehomebuyers.com/cashoffernj?fbclid=fresh-click')
    expect(detectTrafficSource().source).toBe('facebook')
    expect(localStorage.getItem('smsAttribution')).toBeNull()

    // On the next page load Meta's durable click cookie wins; the removed SMS
    // record can no longer move the visitor back to the SMS phone number.
    vi.stubGlobal('sessionStorage', new MemoryStorage())
    setBrowser(
      'https://www.clearedgehomebuyers.com/about',
      '',
      '_fbc=fb.1.1788282000000.fresh-click',
    )
    expect(detectTrafficSource().source).toBe('facebook')
  })

  it('still resolves a source when session storage is blocked', () => {
    vi.stubGlobal('sessionStorage', new ThrowingStorage())
    setBrowser('https://www.clearedgehomebuyers.com/txt')
    expect(detectTrafficSource().source).toBe('sms')
  })
})

describe('UTM record capture', () => {
  it('replaces an old campaign as one record on a fresh click', () => {
    sessionStorage.setItem('utmParams', JSON.stringify({
      utm_source: 'sms',
      utm_medium: 'text',
      utm_campaign: 'old-campaign',
      utm_content: '',
      utm_term: '',
      fbclid: '',
    }))
    setBrowser('https://www.clearedgehomebuyers.com/cashoffernj?fbclid=new-click&utm_source=facebook&utm_campaign=nj-sellers')

    expect(captureUTMParams('new-click')).toEqual({
      utm_source: 'facebook',
      utm_medium: '',
      utm_campaign: 'nj-sellers',
      utm_content: '',
      utm_term: '',
      fbclid: 'new-click',
    })
  })

  it('retains stored campaign fields when fbclid came from an existing cookie', () => {
    const stored = {
      utm_source: 'facebook',
      utm_medium: 'paid_social',
      utm_campaign: 'nj-sellers',
      utm_content: 'video-a',
      utm_term: '',
      fbclid: 'existing-click',
    }
    sessionStorage.setItem('utmParams', JSON.stringify(stored))
    setBrowser('https://www.clearedgehomebuyers.com/about')

    expect(captureUTMParams('existing-click')).toEqual(stored)
  })

  it('synthesizes stable campaign data for a bare /txt visit', () => {
    setBrowser('https://www.clearedgehomebuyers.com/txt')
    expect(captureUTMParams('')).toMatchObject({ utm_source: 'sms', utm_medium: 'text' })
  })

  it('does not mix an old Facebook cookie id into a fresh SMS campaign', () => {
    setBrowser('https://www.clearedgehomebuyers.com/txt?utm_source=SMS&utm_campaign=fall-followup')
    expect(captureUTMParams('old-facebook-click')).toEqual({
      utm_source: 'SMS',
      utm_medium: '',
      utm_campaign: 'fall-followup',
      utm_content: '',
      utm_term: '',
      fbclid: '',
    })
  })

  it('retains an existing Facebook click id on an untagged return visit', () => {
    expect(captureUTMParams('existing-click')).toEqual({
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      utm_term: '',
      fbclid: 'existing-click',
    })
  })
})
