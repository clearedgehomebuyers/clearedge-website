import { describe, expect, it } from 'vitest'
import { validateNoHardcodedClearEdgePhone } from './phone-validation'

describe('validateNoHardcodedClearEdgePhone', () => {
  it('allows the dynamic token and third-party authority numbers', () => {
    expect(validateNoHardcodedClearEdgePhone({
      content: ['Call {{phone}}.', 'Berks Tax Claim Bureau: 610-478-6625.'],
    })).toBe(true)
  })

  it('rejects first-party literals and tel links anywhere in visitor content', () => {
    expect(validateNoHardcodedClearEdgePhone({
      content: [{ children: [{ text: 'Call (610) 904-8526.' }], href: 'tel:+16106280671' }],
    })).toBe('Replace 2 hardcoded ClearEdge phone values with {{phone}}. Government and agency numbers are allowed.')
  })

  it('allows the canonical number in static search metadata', () => {
    expect(validateNoHardcodedClearEdgePhone({
      metaTitle: 'Call (610) 904-8526',
      metaDescription: 'ClearEdge: (610) 904-8526',
      content: ['No phone here.'],
    })).toBe(true)
  })

  it('rejects tracking numbers in static search metadata', () => {
    expect(validateNoHardcodedClearEdgePhone({
      metaTitle: 'Call (610) 628-0671',
      metaDescription: 'ClearEdge: (973) 346-9832',
    })).toBe('Replace 2 noncanonical ClearEdge phone values in search metadata with (610) 904-8526.')
  })
})
