// Post-build assertions for SEO failures that compile successfully and are
// otherwise easy to miss in review.

import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = resolve(repoRoot, '.next/prerender-manifest.json')
const policyPath = resolve(repoRoot, 'src/lib/blog-url-policy.ts')

function fail(message) {
  console.error(`check-build-seo-invariants: FAIL — ${message}`)
  process.exit(1)
}

if (!existsSync(manifestPath)) {
  fail('missing .next/prerender-manifest.json; run npm run build first')
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const routes = manifest.routes || {}
const home = routes['/']
const sitemap = routes['/sitemap.xml']

if (!home) fail('homepage is absent from the prerender manifest and became dynamic')
if (home.initialRevalidateSeconds !== false) {
  fail(`homepage revalidation changed unexpectedly: ${String(home.initialRevalidateSeconds)}`)
}
if (!sitemap) fail('/sitemap.xml is absent from the prerender manifest')
if (sitemap.initialRevalidateSeconds !== 3600) {
  fail(`/sitemap.xml must revalidate every 3600 seconds, found ${String(sitemap.initialRevalidateSeconds)}`)
}

const policySource = readFileSync(policyPath, 'utf8')
const retiredSources = [...policySource.matchAll(/source:\s*'([^']+)'/g)].map((match) => match[1])
if (!retiredSources.length) fail('could not read any retired blog sources from the URL policy')

const generatedRetiredRoutes = retiredSources.filter((source) => Object.hasOwn(routes, source))
if (generatedRetiredRoutes.length) {
  fail(`retired redirects were also prerendered: ${generatedRetiredRoutes.join(', ')}`)
}

console.log(
  `check-build-seo-invariants: pass — homepage static, sitemap ISR 3600s, ${retiredSources.length} retired blog routes not prerendered.`,
)
