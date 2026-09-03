import {
  CANONICAL_PHONE,
  DYNAMIC_PHONE_TOKEN,
  isOwnedPhoneValue,
  normalizePhoneDigits,
} from '@/lib/phone-attribution'

const PHONE_CANDIDATE_PATTERN = /(?:\+?1[\s.-]*)?\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}(?!\d)/g
const STATIC_METADATA_KEYS = new Set(['metaTitle', 'metaDescription'])

/** Sanity Studio guard: authored visitor copy must use {{phone}}, not a line. */
export function validateNoHardcodedClearEdgePhone(value: unknown): true | string {
  let hardcodedCount = 0
  let noncanonicalMetadataCount = 0

  function visit(child: unknown, key = '') {
    if (typeof child === 'string') {
      for (const match of child.matchAll(PHONE_CANDIDATE_PATTERN)) {
        if (!isOwnedPhoneValue(match[0])) continue
        if (STATIC_METADATA_KEYS.has(key)) {
          if (normalizePhoneDigits(match[0]) !== CANONICAL_PHONE.phoneRaw) {
            noncanonicalMetadataCount += 1
          }
        } else {
          hardcodedCount += 1
        }
      }
      return
    }
    if (Array.isArray(child)) {
      child.forEach((item) => visit(item))
      return
    }
    if (child && typeof child === 'object') {
      Object.entries(child).forEach(([childKey, item]) => visit(item, childKey))
    }
  }

  visit(value)
  if (hardcodedCount > 0) {
    return `Replace ${hardcodedCount} hardcoded ClearEdge phone value${hardcodedCount === 1 ? '' : 's'} with ${DYNAMIC_PHONE_TOKEN}. Government and agency numbers are allowed.`
  }
  if (noncanonicalMetadataCount > 0) {
    return `Replace ${noncanonicalMetadataCount} noncanonical ClearEdge phone value${noncanonicalMetadataCount === 1 ? '' : 's'} in search metadata with ${CANONICAL_PHONE.phone}.`
  }
  return true
}
