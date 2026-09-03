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
const retiredSlugs = new Set(
  [...policySource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]),
)

function safeIdentifier(value) {
  return String(value || 'missing').replace(/[^A-Za-z0-9_./[\]-]/g, '?').slice(0, 180)
}

function inspectValue(value, path, problems) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => inspectValue(item, `${path}[${index}]`, problems))
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
    *[_type in ["blogPost", "location", "situation"]]{
      _type,
      "slug": slug.current,
      content,
      problemDescription,
      faqs
    }
  `)

  const problems = []
  let inspected = 0
  for (const document of documents || []) {
    if (document._type === 'blogPost' && retiredSlugs.has(document.slug)) continue
    inspected++
    const identifier = `${safeIdentifier(document._type)}/${safeIdentifier(document.slug)}`
    inspectValue(document.content, `${identifier}.content`, problems)
    inspectValue(document.problemDescription, `${identifier}.problemDescription`, problems)
    inspectValue(document.faqs, `${identifier}.faqs`, problems)

    const text = allText([document.content, document.problemDescription, document.faqs])
    if (/610\D*628\D*0671/.test(text)) {
      problems.push(`${identifier} contains the direct-attribution phone in indexable CMS copy`)
    }
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
    `check-sanity-seo-integrity: pass — ${inspected} visible documents contain no retired hrefs, direct-attribution phone copy, or nine-month post-sale redemption claim.`,
  )
}

main().catch(() => {
  console.error('check-sanity-seo-integrity: ABORT — read-only Sanity verification failed; raw error details were suppressed.')
  process.exit(1)
})
