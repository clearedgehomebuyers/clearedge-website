// Read-only live Sanity check for SEO regressions that can bypass code review.
// It never uses a write token and prints document/path identifiers, not body
// content or client configuration.

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(scriptDir, '..')
dotenv.config({ path: resolve(repoRoot, '.env.local'), quiet: true })

const policySource = readFileSync(resolve(repoRoot, 'src/lib/blog-url-policy.ts'), 'utf8')
const retiredSources = new Set(
  [...policySource.matchAll(/source:\s*'([^']+)'/g)].map((match) => match[1]),
)
const ownedPhoneDigits = new Set([
  '6109048526',
  '6106280671',
  '6103791453',
  '9733469832',
  '6109917916',
  '5709042059',
])
const canonicalPhoneDigits = '6109048526'
// These static App Router pages shadow same-slug Sanity location documents;
// none of the shadowed document's fields can reach a visitor.
const staticLocationSlugs = new Set(['nepa', 'lehigh-valley', 'poconos'])
const phoneCandidatePattern = /(?:\+?1[\s.-]*)?\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}(?!\d)/g

function normalizePhoneDigits(value) {
  const digits = String(value).replace(/\D/g, '')
  return digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits
}

function ownedPhoneMatches(value) {
  return [...String(value).matchAll(phoneCandidatePattern)]
    .filter((match) => ownedPhoneDigits.has(normalizePhoneDigits(match[0])))
}

function safeIdentifier(value) {
  return String(value || 'missing').replace(/[^A-Za-z0-9_./[\]-]/g, '?').slice(0, 180)
}

function inspectValue(value, path, problems) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => inspectValue(item, `${path}[${index}]`, problems))
    return
  }
  if (typeof value === 'string') {
    const matches = ownedPhoneMatches(value)
    const metadataPath = /\.(?:metaTitle|metaDescription)$/.test(path)
    if (matches.length && !metadataPath) {
      problems.push(`${path} contains ${matches.length} hardcoded ClearEdge phone value(s); use {{phone}}`)
    }
    if (metadataPath) {
      const noncanonicalMatches = matches.filter(
        (match) => normalizePhoneDigits(match[0]) !== canonicalPhoneDigits,
      )
      if (noncanonicalMatches.length) {
        problems.push(`${path} contains ${noncanonicalMatches.length} noncanonical ClearEdge phone value(s); search metadata must use (610) 904-8526`)
      }
    }
    if (/^tel:/i.test(value) && matches.length) {
      problems.push(`${path} contains a hardcoded ClearEdge tel link`)
    }
    return
  }
  if (!value || typeof value !== 'object') return

  if (typeof value.href === 'string' && retiredSources.has(value.href)) {
    problems.push(`${path}.href points to retired URL ${value.href}`)
  }
  for (const [key, child] of Object.entries(value)) {
    inspectValue(child, `${path}.${key}`, problems)
  }
}

function allText(value) {
  if (Array.isArray(value)) return value.map(allText).join(' ')
  if (!value || typeof value !== 'object') return typeof value === 'string' ? value : ''
  return Object.values(value).map(allText).join(' ')
}

async function main() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) throw new Error('missing public Sanity project configuration')

  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2026-01-02',
    useCdn: false,
  })
  const documents = await client.fetch(`
    *[_type in ["blogPost", "location", "situation"] && !(_id in path("drafts.**"))]
  `)

  const problems = []
  let inspected = 0
  for (const document of documents || []) {
    const slug = document.slug?.current
    if (document._type === 'location' && staticLocationSlugs.has(slug)) continue
    inspected++
    const identifier = `${safeIdentifier(document._type)}/${safeIdentifier(slug)}`
    // The location template renders enhancedContent OR problemStatement. Do
    // not report links/numbers in the inactive fallback as if visitors see it.
    const renderedDocument = document._type === 'location' && document.enhancedContent
      ? { ...document, problemStatement: undefined }
      : document
    inspectValue(renderedDocument, identifier, problems)

    const text = allText(renderedDocument)
    if (/redeem.{0,120}(?:9|nine)[-\s]+months?.{0,120}(?:after|post[-\s]?sale)/i.test(text)) {
      problems.push(`${identifier} may contain the retired nine-month post-sale redemption claim`)
    }
  }

  if (problems.length) {
    console.error(`check-sanity-seo-integrity: FAIL — ${problems.length} problem(s) across ${inspected} visible documents`)
    for (const problem of problems) console.error(`  - ${safeIdentifier(problem)}`)
    process.exit(1)
  }

  console.log(
    `check-sanity-seo-integrity: pass — ${inspected} published documents contain no retired hrefs, hardcoded ClearEdge visitor phone values, or nine-month post-sale redemption claim.`,
  )
}

main().catch(() => {
  console.error('check-sanity-seo-integrity: ABORT — read-only Sanity verification failed; raw error details were suppressed.')
  process.exit(1)
})
