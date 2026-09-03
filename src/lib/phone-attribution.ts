/**
 * The only placeholder that authored content should use for ClearEdge's
 * visitor-facing phone number. Runtime renderers replace it with the phone
 * assigned to the visitor's traffic source.
 */
export const DYNAMIC_PHONE_TOKEN = '{{phone}}'

export interface PhoneConfig {
  phone: string
  phoneRaw: string
  phoneTel: string
}

/** The canonical NAP/GBP number used by organic search and structured data. */
export const CANONICAL_PHONE = {
  phone: '(610) 904-8526',
  phoneRaw: '6109048526',
  phoneTel: '+16109048526',
} as const satisfies PhoneConfig

/**
 * Visitor-facing numbers by attribution source. Keep this mapping centralized
 * so rendered text and click-to-call links cannot drift apart.
 */
export const TRAFFIC_PHONE_CONFIG = {
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
  // Current Meta traffic lands on the New Jersey campaign page. The separate
  // PA Meta number remains in OWNED_PHONE_DIGITS so it can never be pasted into
  // CMS copy, but it must not be selected until a real PA/NJ campaign routing
  // signal is defined and verified.
  facebook: {
    phone: '(973) 346-9832',
    phoneRaw: '9733469832',
    phoneTel: '+19733469832',
  },
} as const satisfies Record<string, PhoneConfig>

/**
 * Every current or historical ClearEdge tracking number that must never be
 * left hardcoded in visitor-facing content. Agency and government numbers are
 * intentionally absent.
 */
export const OWNED_PHONE_DIGITS: ReadonlySet<string> = new Set([
  '6109048526',
  '6106280671',
  '6103791453',
  '9733469832',
  '6109917916',
  '5709042059',
])

/**
 * Normalize a phone-like value to ten US digits. A leading US country code is
 * removed; other digits are retained so malformed or foreign values cannot be
 * mistaken for a ClearEdge number.
 */
export function normalizePhoneDigits(value: string): string {
  const digits = value.replace(/\D/g, '')
  return digits.length === 11 && digits.startsWith('1')
    ? digits.slice(1)
    : digits
}

/** True only when the complete supplied value is one of ClearEdge's numbers. */
export function isOwnedPhoneValue(value: string): boolean {
  return OWNED_PHONE_DIGITS.has(normalizePhoneDigits(value))
}

const DYNAMIC_PHONE_TOKEN_PATTERN = /\{\{\s*phone\s*\}\}/gi

// Broadly recognize a US phone-number candidate, then use the owned-number
// allowlist above to decide whether to replace it. This preserves third-party
// agency numbers byte-for-byte while supporting authored formatting variants.
const US_PHONE_CANDIDATE_PATTERN =
  /(?:\+?1[\s.-]*)?\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}(?!\d)/g

/**
 * Replace dynamic tokens and known ClearEdge phone-number literals in prose,
 * HTML-ish strings, and tel: values. Unrelated phone numbers are untouched.
 */
export function replaceOwnedPhoneText(
  text: string,
  replacement = DYNAMIC_PHONE_TOKEN,
): string {
  const numbersReplaced = text.replace(
    US_PHONE_CANDIDATE_PATTERN,
    (candidate, offset: number, source: string) => {
      // Prevent a ten-digit suffix of a longer digit string from matching.
      if (offset > 0 && /\d/.test(source[offset - 1])) return candidate
      return isOwnedPhoneValue(candidate) ? replacement : candidate
    },
  )

  return numbersReplaced.replace(DYNAMIC_PHONE_TOKEN_PATTERN, replacement)
}

/** Resolve dynamic tokens or owned literals to the canonical organic number. */
export function canonicalizeDynamicPhoneText(text: string): string {
  return replaceOwnedPhoneText(text, CANONICAL_PHONE.phone)
}
