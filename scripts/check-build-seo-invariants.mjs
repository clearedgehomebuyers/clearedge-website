// Post-build assertions for SEO failures that compile successfully and are
// otherwise easy to miss in review.

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const appBuildDir = resolve(repoRoot, '.next/server/app')
const manifestPath = resolve(repoRoot, '.next/prerender-manifest.json')
const homeHtmlPath = resolve(appBuildDir, 'index.html')
const calculatorHtmlPath = resolve(repoRoot, '.next/server/app/calculator.html')
const calculatorSourcePath = resolve(repoRoot, 'src/components/calculator.tsx')
const calculatorMathSourcePath = resolve(repoRoot, 'src/lib/calculator-comparison.ts')
const testimonialsHtmlPath = resolve(appBuildDir, 'testimonials.html')
const videoSitemapSourcePath = resolve(repoRoot, 'src/app/video-sitemap.xml/route.ts')
const policyPath = resolve(repoRoot, 'src/lib/blog-url-policy.ts')
const regionalHubDataPath = resolve(repoRoot, 'src/lib/regional-hub-data.ts')

function fail(message) {
  console.error(`check-build-seo-invariants: FAIL — ${message}`)
  process.exit(1)
}

function schemaNodesFromHtml(html) {
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => {
      try {
        return JSON.parse(match[1])
      } catch {
        return null
      }
    })
    .filter(Boolean)

  const typedNodes = []
  const visit = (value) => {
    if (Array.isArray(value)) {
      value.forEach(visit)
      return
    }
    if (!value || typeof value !== 'object') return
    if (typeof value['@type'] === 'string' || Array.isArray(value['@type'])) {
      typedNodes.push(value)
    }
    Object.values(value).forEach(visit)
  }

  schemas.forEach(visit)
  return typedNodes
}

function htmlFilesUnder(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = resolve(directory, entry.name)
    if (entry.isDirectory()) return htmlFilesUnder(entryPath)
    return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : []
  })
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

if (!existsSync(calculatorHtmlPath)) {
  fail('/calculator build output is missing; the route may no longer be statically rendered')
}

const calculatorHtml = readFileSync(calculatorHtmlPath, 'utf8')
const calculatorSchemaNodes = schemaNodesFromHtml(calculatorHtml)
const calculatorSchemaById = new Map(
  calculatorSchemaNodes
    .filter((node) => node && typeof node === 'object' && typeof node['@id'] === 'string')
    .map((node) => [node['@id'], node]),
)

const requiredCalculatorSchema = new Map([
  ['https://www.clearedgehomebuyers.com/calculator/#webpage', 'WebPage'],
  ['https://www.clearedgehomebuyers.com/calculator/#breadcrumb', 'BreadcrumbList'],
  ['https://www.clearedgehomebuyers.com/calculator/#faq', 'FAQPage'],
])

for (const [id, expectedType] of requiredCalculatorSchema) {
  const node = calculatorSchemaById.get(id)
  if (!node) fail(`/calculator JSON-LD is missing ${id}`)
  if (node['@type'] !== expectedType) {
    fail(`/calculator JSON-LD node ${id} must be ${expectedType}, found ${String(node['@type'])}`)
  }
}

const ineligibleCalculatorAppSchema = calculatorSchemaNodes.find((node) =>
  node?.['@type'] === 'WebApplication' || node?.['@type'] === 'SoftwareApplication',
)
if (ineligibleCalculatorAppSchema) {
  fail(`/calculator still emits ineligible ${ineligibleCalculatorAppSchema['@type']} structured data`)
}

const calculatorSource = readFileSync(calculatorSourcePath, 'utf8')
const calculatorMathSource = readFileSync(calculatorMathSourcePath, 'utf8')
for (const forbiddenToken of [
  'riskAdjustedNet',
  'traditionalNet * 0.82',
  'getCashOfferPercent',
  'calculateTitleInsurance',
  'expectedSalePrice * 0.0225',
]) {
  if (calculatorSource.includes(forbiddenToken) || calculatorMathSource.includes(forbiddenToken)) {
    fail(`/calculator reintroduced hidden or unsupported math: ${forbiddenToken}`)
  }
}
if (!calculatorSource.includes('compareRoundedNetEstimates(traditionalNet, cashNet)')) {
  fail('/calculator must compare its two displayed, rounded net estimates')
}
if (!calculatorSource.includes('calculateTraditionalSaleScenario({') || !calculatorSource.includes('cashOfferInput')) {
  fail('/calculator must use its tested editable scenario model and an optional written cash offer')
}
for (const category of ['systems', 'interior', 'structural']) {
  const goodConditionPattern = new RegExp(`${category}:\\s*\\{\\s*0:\\s*\\{\\s*items:\\s*\\[\\]`)
  if (!goodConditionPattern.test(calculatorSource)) {
    fail(`/calculator must map the best ${category} condition answer to zero repairs`)
  }
}

const unsupportedClaimChecks = [
  ['src/components/v0-problem-solution-merged.tsx', 'Guaranteed cash — our offers never fall through'],
  ['src/components/v0-problem-solution-merged.tsx', 'Spend $10K–$25K on repairs before you can even list'],
  ['src/components/v0-problem-solution-merged.tsx', 'Zero fees, zero commissions, zero closing costs to you'],
  ['src/components/v0-comparison-merged.tsx', '38% of deals fall through nationally'],
  ['src/components/v0-comparison-merged.tsx', '90–180 days average in PA'],
  ['src/components/v0-comparison-merged.tsx', '$31,000–$54,000'],
  ['src/components/v0-comparison-merged.tsx', 'clearEdge: "$0"'],
  ['src/app/calculator/page.tsx', 'See exactly what you&apos;d walk away with'],
  ['src/app/txt/page.tsx', 'see exactly what you&apos;d walk away with'],
  ['src/app/cash-buyer-vs-realtor/page.tsx', 'Once you accept, the sale is happening'],
  ['src/app/page.tsx', 'The cash offer you accept is the exact amount you receive at closing'],
  ['src/app/page.tsx', 'Zero fees, zero commissions, zero closing costs.'],
]
for (const [relativePath, claim] of unsupportedClaimChecks) {
  if (readFileSync(resolve(repoRoot, relativePath), 'utf8').includes(claim)) {
    fail(`${relativePath} reintroduced unsupported visitor-facing copy: ${claim}`)
  }
}

const builtHtmlFiles = htmlFilesUnder(appBuildDir)

// Google's site-name markup belongs on the domain homepage, not every route.
for (const htmlPath of builtHtmlFiles) {
  const websiteNodes = schemaNodesFromHtml(readFileSync(htmlPath, 'utf8'))
    .filter((node) => node?.['@type'] === 'WebSite')
  if (htmlPath === homeHtmlPath && websiteNodes.length !== 1) {
    fail(`homepage must emit exactly one WebSite node, found ${websiteNodes.length}`)
  }
  if (htmlPath !== homeHtmlPath && websiteNodes.length) {
    fail(`WebSite site-name markup leaked outside the homepage: ${htmlPath}`)
  }
}

// Self-controlled ratings for ClearEdge are not eligible for Organization or
// LocalBusiness review snippets. Guard every generated route, not just the
// testimonials page where the issue was first found.
for (const htmlPath of builtHtmlFiles) {
  const businessNodes = schemaNodesFromHtml(readFileSync(htmlPath, 'utf8'))
    .filter((node) => ['Organization', 'LocalBusiness'].includes(node?.['@type']))
    .filter((node) => node?.['@id'] === 'https://www.clearedgehomebuyers.com/#organization'
      || node?.name === 'ClearEdge Home Buyers')
  if (businessNodes.some((node) => Object.hasOwn(node, 'aggregateRating') || Object.hasOwn(node, 'review'))) {
    fail(`self-controlled ClearEdge rating/review markup found: ${htmlPath}`)
  }
}

if (!existsSync(testimonialsHtmlPath)) {
  fail('/testimonials build output is missing')
}
const testimonialsOrganization = schemaNodesFromHtml(readFileSync(testimonialsHtmlPath, 'utf8'))
  .find((node) => node?.['@id'] === 'https://www.clearedgehomebuyers.com/#organization')
if (!testimonialsOrganization) fail('/testimonials Organization schema is missing')
if (Object.hasOwn(testimonialsOrganization, 'aggregateRating') || Object.hasOwn(testimonialsOrganization, 'review')) {
  fail('/testimonials reintroduced self-controlled Organization rating/review markup')
}

for (const route of ['index', 'about', 'how-it-works']) {
  const htmlPath = resolve(appBuildDir, `${route}.html`)
  if (!existsSync(htmlPath)) fail(`/${route === 'index' ? '' : route} build output is missing`)
  const videoNodes = schemaNodesFromHtml(readFileSync(htmlPath, 'utf8'))
    .filter((node) => node?.['@type'] === 'VideoObject')
  if (!videoNodes.length) fail(`/${route === 'index' ? '' : route} VideoObject schema is missing`)
  if (videoNodes.some((node) => Object.hasOwn(node, 'contentUrl'))) {
    fail(`/${route === 'index' ? '' : route} uses a watch page as VideoObject.contentUrl`)
  }
  if (videoNodes.some((node) => Array.isArray(node.hasPart) && node.hasPart.some((part) => part?.['@type'] === 'Clip'))) {
    fail(`/${route === 'index' ? '' : route} reintroduced Clip URLs that leave the local watch page`)
  }
}

for (const htmlPath of builtHtmlFiles) {
  const videoNodes = schemaNodesFromHtml(readFileSync(htmlPath, 'utf8'))
    .filter((node) => node?.['@type'] === 'VideoObject')
  for (const node of videoNodes) {
    const contentUrl = typeof node.contentUrl === 'string' ? node.contentUrl : ''
    if (/youtube\.com\/watch|youtu\.be\//i.test(contentUrl)) {
      fail(`VideoObject.contentUrl points to a YouTube watch page: ${htmlPath}`)
    }
  }
}

const videoSitemapSource = readFileSync(videoSitemapSourcePath, 'utf8')
if (videoSitemapSource.includes('<video:content_loc>')) {
  fail('video sitemap uses a YouTube watch page as video:content_loc')
}
if (!videoSitemapSource.includes('<video:player_loc>https://www.youtube.com/embed/YS6uDgxIjiI</video:player_loc>')) {
  fail('video sitemap is missing its embeddable YouTube player location')
}

for (const city of ['reading', 'pottsville']) {
  const htmlPath = resolve(appBuildDir, 'locations', `${city}.html`)
  if (!existsSync(htmlPath)) fail(`/locations/${city} build output is missing`)
  const breadcrumbNodes = schemaNodesFromHtml(readFileSync(htmlPath, 'utf8'))
    .filter((node) => node?.['@type'] === 'BreadcrumbList')
  const falselyNested = breadcrumbNodes.some((node) => (node.itemListElement || [])
    .some((item) => item?.item === 'https://www.clearedgehomebuyers.com/locations/lehigh-valley'))
  if (falselyNested) fail(`/locations/${city} is still nested under Lehigh Valley`)
}

const regionalHubDataSource = readFileSync(regionalHubDataPath, 'utf8')
const lehighHubBlock = regionalHubDataSource.match(/export const lehighValleyHubData[\s\S]*?(?=export const poconosHubData)/)?.[0]
if (!lehighHubBlock) fail('could not inspect the Lehigh Valley hub data')
for (const unrelatedCity of ['reading', 'pottsville']) {
  if (lehighHubBlock.includes(`slug: '${unrelatedCity}'`)) {
    fail(`/locations/lehigh-valley still presents ${unrelatedCity} as a hub city`)
  }
}

const policySource = readFileSync(policyPath, 'utf8')
const retiredSources = [...policySource.matchAll(/source:\s*'([^']+)'/g)].map((match) => match[1])
if (!retiredSources.length) fail('could not read any retired blog sources from the URL policy')

const generatedRetiredRoutes = retiredSources.filter((source) => Object.hasOwn(routes, source))
if (generatedRetiredRoutes.length) {
  fail(`retired redirects were also prerendered: ${generatedRetiredRoutes.join(', ')}`)
}

console.log(
  `check-build-seo-invariants: pass — homepage-only WebSite schema, compliant calculator/review/video markup, accurate Reading/Pottsville hierarchy, sitemap ISR 3600s, and ${retiredSources.length} retired blog routes not prerendered.`,
)
