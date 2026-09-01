import { describe, expect, it } from 'vitest'
import { isMetaQaAttribution, isMetaQaUrl } from './meta-qa'

describe('Meta QA traffic detection', () => {
  it('recognises the documented deploy-check source and campaign tags', () => {
    expect(isMetaQaAttribution({ utm_source: 'deploy-check' })).toBe(true)
    expect(isMetaQaAttribution({ utm_campaign: 'deploy-check-sms' })).toBe(true)
    expect(isMetaQaUrl(
      'https://www.clearedgehomebuyers.com/cashoffernj?utm_source=sms&utm_campaign=deploy-check-sms',
    )).toBe(true)
  })

  it('does not suppress genuine Meta click IDs or ordinary campaigns', () => {
    const realFbclid =
      'IwZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAEe-LN1k2aPHHeRUgSEhPGjRvK-nWcPsPBDzUksbmJFMTzWHD4x_InDSgcM2iM_aem_ysLghpM36p9KEw7Ymxl38Q'

    expect(isMetaQaAttribution({ utm_source: 'facebook', utm_campaign: 'nj-sellers' })).toBe(false)
    expect(isMetaQaUrl(
      `https://www.clearedgehomebuyers.com/cashoffernj?fbclid=${realFbclid}&utm_source=facebook`,
    )).toBe(false)
  })

  it('fails open for missing or malformed URLs', () => {
    expect(isMetaQaUrl()).toBe(false)
    expect(isMetaQaUrl('not a URL')).toBe(false)
  })
})
