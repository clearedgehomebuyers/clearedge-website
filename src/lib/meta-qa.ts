const DEPLOY_CHECK_MARKER = 'deploy-check'

type MetaQaAttribution = Partial<Record<
  'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term',
  unknown
>>

function hasDeployCheckMarker(value: unknown): boolean {
  return typeof value === 'string' && value.toLowerCase().includes(DEPLOY_CHECK_MARKER)
}

/**
 * Production verification traffic is deliberately tagged `deploy-check` so
 * it can be excluded from business reporting. It must also stay out of Meta:
 * QA runs may use a placeholder fbclid to exercise the Facebook route, and
 * sending that placeholder as fbc pollutes attribution diagnostics and ad
 * optimisation data.
 */
export function isMetaQaAttribution(attribution: MetaQaAttribution): boolean {
  return Object.values(attribution).some(hasDeployCheckMarker)
}

export function isMetaQaUrl(value?: string): boolean {
  if (!value) return false

  try {
    const url = new URL(value)
    return isMetaQaAttribution({
      utm_source: url.searchParams.get('utm_source'),
      utm_medium: url.searchParams.get('utm_medium'),
      utm_campaign: url.searchParams.get('utm_campaign'),
      utm_content: url.searchParams.get('utm_content'),
      utm_term: url.searchParams.get('utm_term'),
    })
  } catch {
    return false
  }
}
