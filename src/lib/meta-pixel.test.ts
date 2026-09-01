import { afterEach, describe, expect, it, vi } from 'vitest'
import { captureFbclid } from './meta-pixel'

afterEach(() => {
  vi.unstubAllGlobals()
})

function stubBrowser(href: string) {
  let cookie = ''
  const location = new URL(href)

  vi.stubGlobal('window', { location })
  vi.stubGlobal('document', {
    get cookie() {
      return cookie
    },
    set cookie(value: string) {
      cookie = value
    },
  })

  return { cookie: () => cookie }
}

describe('captureFbclid', () => {
  it('preserves a genuine click id byte-for-byte in _fbc', () => {
    const fbclid =
      'IwZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAEe-LN1k2aPHHeRUgSEhPGjRvK-nWcPsPBDzUksbmJFMTzWHD4x_InDSgcM2iM_aem_ysLghpM36p9KEw7Ymxl38Q'
    const browser = stubBrowser(
      `https://www.clearedgehomebuyers.com/cashoffernj?fbclid=${fbclid}&utm_source=facebook`,
    )

    expect(captureFbclid()).toBe(fbclid)
    expect(decodeURIComponent(browser.cookie())).toContain(`.${fbclid};`)
  })

  it('returns a QA click id for routing without persisting it to _fbc', () => {
    const browser = stubBrowser(
      'https://www.clearedgehomebuyers.com/cashoffernj?fbclid=test-click-id&utm_source=deploy-check',
    )

    expect(captureFbclid()).toBe('test-click-id')
    expect(browser.cookie()).toBe('')
  })
})
