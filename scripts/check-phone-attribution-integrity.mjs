// Static guard for phone-attribution regressions that otherwise compile cleanly.
//
// Visitor-facing ClearEdge numbers must come from TrafficSourceProvider. The
// only static ClearEdge number allowed outside the central configuration is the
// canonical NAP number where a stable value is required for metadata, JSON-LD,
// or the public llms.txt business record. Phone-input examples use reserved 555
// numbers and therefore never match the ClearEdge-owned-number registry below.
//
// This intentionally scans source rather than generated .next output. Tests,
// historical backups, and mutation scripts are not visitor-rendered and are
// excluded. Sanity content has its own live-dataset integrity guard.

import { readdirSync, readFileSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourceExtensions = new Set(['.js', '.jsx', '.mjs', '.ts', '.tsx', '.json', '.html', '.txt'])
const ownedPhoneDigits = new Set([
  '6109048526', // canonical organic / NAP
  '6106280671', // direct
  '6103791453', // SMS
  '9733469832', // New Jersey Facebook
  '6109917916', // Pennsylvania Facebook
  '5709042059', // retired legacy number
])

// Match common US phone formats, including a literal tel:+1... target. The
// registry check below prevents government and other third-party numbers from
// being mistaken for ClearEdge attribution numbers.
const phoneCandidatePattern = /(?<!\d)(?:\+?1[\s.-]*)?\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}(?!\d)/g

/**
 * Narrow, reviewable exceptions. Each rule permits one semantic use on one
 * source line; it does not exempt the rest of a file. The central config is the
 * sole file-level exception because it is the source of truth for every number.
 */
const staticAllowlist = [
  {
    path: 'src/lib/phone-attribution.ts',
    line: /./,
    reason: 'central phone configuration and owned-number registry',
  },
  {
    path: 'public/llms.txt',
    line: /^\s*- Phone:\s*\+1-610-904-8526\s*$/,
    reason: 'canonical public business record',
  },
]

function fail(messages) {
  console.error('check-phone-attribution-integrity: FAIL')
  for (const message of messages) console.error(`  - ${message}`)
  process.exit(1)
}

function toPosix(path) {
  return path.replace(/\\/g, '/')
}

function normalizePhoneDigits(value) {
  const digits = value.replace(/\D/g, '')
  return digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits
}

function isExcluded(relativePath) {
  const path = toPosix(relativePath)
  return (
    /(?:^|\/)(?:node_modules|\.next|backups)(?:\/|$)/.test(path) ||
    /(?:^|\.)?(?:test|spec)\.[cm]?[jt]sx?$/.test(path) ||
    /\.backup(?:\.|$)/.test(path)
  )
}

function collectFiles(root) {
  const files = []
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const absolutePath = join(root, entry.name)
    const relativePath = relative(repoRoot, absolutePath)
    if (isExcluded(relativePath)) continue
    if (entry.isDirectory()) files.push(...collectFiles(absolutePath))
    else if (entry.isFile() && sourceExtensions.has(extname(entry.name))) files.push(absolutePath)
  }
  return files
}

function lineAt(source, offset) {
  const start = source.lastIndexOf('\n', offset - 1) + 1
  const nextNewline = source.indexOf('\n', offset)
  const end = nextNewline === -1 ? source.length : nextNewline
  const number = source.slice(0, start).split('\n').length
  return { number, text: source.slice(start, end).replace(/\r$/, '') }
}

function allowedStaticUse(path, line) {
  return staticAllowlist.find((rule) => rule.path === path && rule.line.test(line))
}

const sourceFiles = [
  ...collectFiles(resolve(repoRoot, 'src')),
  resolve(repoRoot, 'public/llms.txt'),
]
const violations = []
let ownedLiteralCount = 0
let allowedLiteralCount = 0

for (const absolutePath of sourceFiles) {
  const path = toPosix(relative(repoRoot, absolutePath))
  const source = readFileSync(absolutePath, 'utf8')
  for (const match of source.matchAll(phoneCandidatePattern)) {
    const digits = normalizePhoneDigits(match[0])
    if (!ownedPhoneDigits.has(digits)) continue

    ownedLiteralCount += 1
    const sourceLine = lineAt(source, match.index)
    const exception = allowedStaticUse(path, sourceLine.text)
    if (exception) {
      allowedLiteralCount += 1
      continue
    }

    violations.push(
      `${path}:${sourceLine.number} hardcodes ClearEdge number ${match[0]} ` +
      `(use the dynamic phone renderer, or document a narrowly scoped static exception)`,
    )
  }
}

const templateFiles = [
  'src/app/blog/[slug]/page.tsx',
  'src/app/locations/[slug]/page.tsx',
  'src/app/situations/[slug]/page.tsx',
]

for (const path of templateFiles) {
  const source = readFileSync(resolve(repoRoot, path), 'utf8')
  if (!/import\s*\{\s*preparePortableTextWithDynamicPhones\s*\}\s*from\s*['"]@\/lib\/portable-text-phone['"]/.test(source)) {
    violations.push(`${path} must import preparePortableTextWithDynamicPhones`)
  }
  if (!/types\s*:\s*\{[\s\S]{0,400}?dynamicPhone\s*:[\s\S]{0,200}?<DynamicPhoneLink\b/.test(source)) {
    violations.push(`${path} must render the Portable Text dynamicPhone type with DynamicPhoneLink`)
  }
  if (!/value=\{preparePortableTextWithDynamicPhones\(/.test(source)) {
    violations.push(`${path} must pass Portable Text through preparePortableTextWithDynamicPhones`)
  }
}

// These are the three FAQ components used by live routes. JSON-LD FAQ output is
// canonicalized separately and is intentionally static rather than attributed.
const activeFaqRenderers = [
  'src/components/v0-faq.tsx',
  'src/components/LocationFAQAccordion.tsx',
  'src/components/SituationFAQAccordion.tsx',
]

for (const path of activeFaqRenderers) {
  const source = readFileSync(resolve(repoRoot, path), 'utf8')
  if (!/import\s*\{\s*DynamicPhoneContent\s*\}\s*from\s*['"][^'"]*DynamicPhoneContent['"]/.test(source)) {
    violations.push(`${path} must import DynamicPhoneContent`)
  }
  if (!/<DynamicPhoneContent\b[\s\S]{0,300}?text=\{faq\.answer\}/.test(source)) {
    violations.push(`${path} must render faq.answer through DynamicPhoneContent`)
  }
}

const providerPath = 'src/components/TrafficSourceProvider.tsx'
const providerSource = readFileSync(resolve(repoRoot, providerPath), 'utf8')
if (!/import\s*\{\s*TRAFFIC_PHONE_CONFIG\s*\}\s*from\s*['"]@\/lib\/phone-attribution['"]/.test(providerSource)) {
  violations.push(`${providerPath} must import TRAFFIC_PHONE_CONFIG from the central phone-attribution module`)
}
if (/\b(?:const|let|var)\s+TRAFFIC_PHONE_CONFIG\b/.test(providerSource)) {
  violations.push(`${providerPath} must not redeclare TRAFFIC_PHONE_CONFIG locally`)
}

if (violations.length) fail(violations)

console.log(
  `check-phone-attribution-integrity: pass — scanned ${sourceFiles.length} visitor-source files; ` +
  `${ownedLiteralCount} ClearEdge phone literals are confined to ${allowedLiteralCount} documented static/config uses; ` +
  'dynamic templates, active FAQ renderers, and provider contracts are intact.',
)
