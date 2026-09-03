import { describe, expect, it } from 'vitest'
import {
  CANONICAL_PHONE,
  DYNAMIC_PHONE_TOKEN,
  isOwnedPhoneValue,
  normalizePhoneDigits,
  OWNED_PHONE_DIGITS,
  replaceOwnedPhoneText,
  canonicalizeDynamicPhoneText,
  TRAFFIC_PHONE_CONFIG,
} from './phone-attribution'

describe('phone attribution configuration', () => {
  it('keeps the canonical and source-specific display, raw, and tel values aligned', () => {
    expect(CANONICAL_PHONE).toEqual({
      phone: '(610) 904-8526',
      phoneRaw: '6109048526',
      phoneTel: '+16109048526',
    })

    expect(TRAFFIC_PHONE_CONFIG).toEqual({
      unknown: CANONICAL_PHONE,
      seo: CANONICAL_PHONE,
      direct: {
        phone: '(610) 628-0671',
        phoneRaw: '6106280671',
        phoneTel: '+16106280671',
      },
      sms: {
        phone: '(610) 379-1453',
        phoneRaw: '6103791453',
        phoneTel: '+16103791453',
      },
      facebook: {
        phone: '(973) 346-9832',
        phoneRaw: '9733469832',
        phoneTel: '+19733469832',
      },
    })
  })

  it('contains every current and historical first-party number', () => {
    expect([...OWNED_PHONE_DIGITS]).toEqual([
      '6109048526',
      '6106280671',
      '6103791453',
      '9733469832',
      '6109917916',
      '5709042059',
    ])
  })
})

describe('normalizePhoneDigits', () => {
  it.each([
    ['(610) 904-8526', '6109048526'],
    ['610-904-8526', '6109048526'],
    ['610.904.8526', '6109048526'],
    ['610 904 8526', '6109048526'],
    ['6109048526', '6109048526'],
    ['+1 (610) 904-8526', '6109048526'],
    ['tel:+16109048526', '6109048526'],
    ['1-610-904-8526', '6109048526'],
  ])('normalizes %s', (input, expected) => {
    expect(normalizePhoneDigits(input)).toBe(expected)
  })

  it('does not discard a non-US country code or extra digits', () => {
    expect(normalizePhoneDigits('+44 610 904 8526')).toBe('446109048526')
    expect(normalizePhoneDigits('61090485260')).toBe('61090485260')
  })
})

describe('isOwnedPhoneValue', () => {
  it.each([
    '(610) 904-8526',
    'tel:+1-610-628-0671',
    '610.379.1453',
    '+1 (973) 346-9832',
    '610 991 7916',
    '(570) 904-2059',
  ])('recognizes first-party value %s', (value) => {
    expect(isOwnedPhoneValue(value)).toBe(true)
  })

  it.each([
    '(610) 782-3170',
    'tel:+16102506724',
    DYNAMIC_PHONE_TOKEN,
    'Call 24/7 at (610) 904-8526',
    '26109048526',
    '61090485260',
  ])('rejects non-exact or non-owned value %s', (value) => {
    expect(isOwnedPhoneValue(value)).toBe(false)
  })
})

describe('replaceOwnedPhoneText', () => {
  it.each([
    '(610) 904-8526',
    '610-904-8526',
    '610.904.8526',
    '610 904 8526',
    '6109048526',
    '+1 (610) 904-8526',
    '+1-610-904-8526',
    '+16109048526',
    '1-610-904-8526',
  ])('replaces canonical formatting variant %s', (number) => {
    expect(replaceOwnedPhoneText(`Call ${number} today.`)).toBe(
      `Call ${DYNAMIC_PHONE_TOKEN} today.`,
    )
  })

  it.each([
    ['(610) 628-0671', 'direct'],
    ['610-379-1453', 'SMS'],
    ['973.346.9832', 'New Jersey Facebook'],
    ['610 991 7916', 'Pennsylvania Facebook'],
    ['5709042059', 'historical'],
  ])('replaces the %s first-party number', (number, label) => {
    expect(replaceOwnedPhoneText(`${label}: ${number}`)).toBe(
      `${label}: ${DYNAMIC_PHONE_TOKEN}`,
    )
  })

  it('replaces tokens, including harmless spacing and case variants', () => {
    expect(replaceOwnedPhoneText('Call {{phone}}, {{ PHONE }}, or {{ phone}}.')).toBe(
      `Call ${DYNAMIC_PHONE_TOKEN}, ${DYNAMIC_PHONE_TOKEN}, or ${DYNAMIC_PHONE_TOKEN}.`,
    )
  })

  it('replaces multiple owned numbers and supports a caller-provided value', () => {
    expect(
      replaceOwnedPhoneText(
        'Old: (570) 904-2059; direct: tel:+16106280671.',
        '[dynamic phone]',
      ),
    ).toBe('Old: [dynamic phone]; direct: tel:[dynamic phone].')
  })

  it('does not replace owned digits embedded in a longer number', () => {
    const text = 'Do not touch 26109048526 or 61090485260.'
    expect(replaceOwnedPhoneText(text)).toBe(text)
  })

  it('preserves every audited government and agency number exactly', () => {
    const externalNumbers = [
      '1-800-822-1174',
      '(610) 782-3170',
      '(610) 782-3000',
      '(610) 829-6492',
      '(610) 829-6488',
      '(570) 963-6702',
      '(570) 963-6377',
      '(570) 825-1668',
      '(570) 970-4580',
      '(570) 517-3347',
      '(570) 517-3873',
      '610-250-6724',
      '570-459-4960 ext 621',
      '(570) 455-2030',
      '610-478-6625',
      '610-478-6644',
      '570-208-4268',
      '570-459-4960',
      '570-288-4576',
      '(610) 829-6186',
      '610-478-6600',
    ]
    const text = externalNumbers.join(' | ')

    expect(replaceOwnedPhoneText(text)).toBe(text)
  })
})

describe('canonicalizeDynamicPhoneText', () => {
  it('canonicalizes mixed tokens and first-party literals without changing agencies', () => {
    const text =
      'Call {{phone}}, direct at 610-628-0671, or the courthouse at (610) 782-3000.'

    expect(canonicalizeDynamicPhoneText(text)).toBe(
      'Call (610) 904-8526, direct at (610) 904-8526, or the courthouse at (610) 782-3000.',
    )
  })
})
