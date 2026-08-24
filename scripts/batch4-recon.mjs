// batch4-recon.mjs — READ-ONLY. Ground truth for Batch 4 (QW9, QW10, S2).
//
// WHY THIS IS PARANOID: the audit's Batch 4 descriptions have already been wrong
// once — QW10 was scoped as "fix the situation cross-link module" when the 30 bad
// anchors are baked into Sanity body content by a generator that has since been
// fixed. This run found two MORE errors of the same kind (see FINDINGS at the
// bottom). Nothing here is taken from the audit; every count is measured live.
//
// CONTENT MODEL (measured 2026-08-24, not assumed):
//   situation : problemDescription (PT), benefits[], faqs[], relatedLocations[REF]
//   location  : problemStatement (PT), enhancedContent (PT), caseStudies[].description (PT),
//               faqs[], relatedSituations[REF]  <- REF FIELD IS NOT IN THE SCHEMA
//   blogPost  : content (PT), faqs[], relatedLocations[REF], relatedSituations[REF]
//
// HOW LINKS ACTUALLY REACH THE PAGE — three different mechanisms, and conflating
// them is what makes this batch "most likely to be misread":
//   1. BODY links      - markDefs inside portable text. Query-aligned anchors.
//   2. MODULE links    - rendered from reference fields by the template.
//                        situation page: Related Articles, from blogPost.relatedSituations,
//                        ordered publishedAt desc and CAPPED AT 3 (page.tsx:369).
//                        blog page: related locations + situations chips (page.tsx:476-489).
//   3. GLOBAL NAV      - excluded from everything below.
//
// Never writes. Run: node scripts/batch4-recon.mjs

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const docs = await client.fetch(`*[_type in ["blogPost","location","situation"]]{
  ..., "slug": slug.current,
  "refLocations": relatedLocations[]->slug.current,
  "refSituations": relatedSituations[]->slug.current
}`)

const bySlug = new Map(docs.map(d => [d.slug, d]))
const byId = new Map(docs.map(d => [d._id, d]))
const situations = docs.filter(d => d._type === 'situation')
const locations = docs.filter(d => d._type === 'location')
const blogs = docs.filter(d => d._type === 'blogPost')
const pad = (s, n) => String(s).padEnd(n)

console.log(`CORPUS: ${situations.length} situations, ${locations.length} locations, ${blogs.length} blog posts\n`)

/** Deep-walk ANY portable text anywhere in the doc, including nested objects. */
function bodyLinks(doc) {
  const out = []
  const seen = new Set()
  ;(function walk(node) {
    if (!node || typeof node !== 'object' || seen.has(node)) return
    seen.add(node)
    if (Array.isArray(node)) { node.forEach(walk); return }
    if (node._type === 'block' && Array.isArray(node.markDefs) && Array.isArray(node.children)) {
      const defs = new Map(node.markDefs.map(d => [d._key, d]))
      for (const ch of node.children) {
        for (const mk of (ch.marks || [])) {
          const d = defs.get(mk)
          if (d && (d._type === 'link' || d.href)) {
            out.push({ href: d.href || '', anchor: ch.text || '', blockKey: node._key, childKey: ch._key })
          }
        }
      }
    }
    for (const v of Object.values(node)) if (v && typeof v === 'object') walk(v)
  })(doc)
  return out
}

function pathOf(href) {
  if (!href) return null
  if (/^https?:\/\//i.test(href)) {
    const m = href.match(/^https?:\/\/(?:www\.)?clearedgehomebuyers\.com(\/[^?#]*)/i)
    return m ? m[1].replace(/\/+$/, '') : null
  }
  if (href.startsWith('/')) return href.split(/[?#]/)[0].replace(/\/+$/, '')
  return null
}

const linkIndex = new Map()
for (const d of docs) linkIndex.set(d.slug, bodyLinks(d).map(l => ({ ...l, path: pathOf(l.href) })))
const linksFrom = s => linkIndex.get(s) || []
const hasBodyLink = (from, to) => linksFrom(from).some(l => l.path === to)

/** What the situation template ACTUALLY renders: publishedAt desc, capped at 3. */
const MODULE_CAP = 3
function renderedSpokes(situationSlug) {
  return blogs
    .filter(b => (b.refSituations || []).includes(situationSlug))
    .sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')))
    .slice(0, MODULE_CAP)
    .map(b => '/blog/' + b.slug)
}
function referencedSpokes(situationSlug) {
  return blogs.filter(b => (b.refSituations || []).includes(situationSlug)).map(b => '/blog/' + b.slug)
}

const PRUNED = new Set([
  '/blog/sell-my-house-fast-luzerne-county-pa',
  '/blog/cash-home-buyers-lackawanna-county-no-fees',
  '/blog/cash-home-buyers-pottsville-pa',
  '/blog/selling-water-damaged-house-18102-mold-issues',
])

// Topical clusters. SLUGS CORRECTED against live Sanity — six of the audit's
// spoke slugs do not exist as written, recorded here rather than quietly swapped:
//   act-135-pennsylvania-conservatorship -> pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights
//   avoid-foreclosure-scranton           -> avoid-foreclosure-scranton-pa
//   sell-rental-property-luzerne-county-tenants -> luzerne-county-rental-property-registration-inspection-requirements-2026
//   hazleton-rental-inspection-requirements     -> hazleton-residential-occupancy-inspection-checklist
//   govos-vacant-property-fines          -> stop-govos-fines-poconos-house
//   wilkes-barre-code-violations         -> sell-house-wilkes-barre-code-violations
const CLUSTERS = [
  { name: 'inherited/probate', hub: 'inherited-property', spokes: [
    'documents-required-selling-inherited-property-pennsylvania',
    'sell-deceased-parents-house-without-probate-pennsylvania',
    'sell-inherited-house-allentown-pa',
    'sell-inherited-house-reading-pa',
  ]},
  { name: 'foreclosure', hub: 'foreclosure', spokes: [
    'pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights',
    'avoid-foreclosure-scranton-pa',
    'how-to-stop-berks-county-judicial-sale-2026',
  ]},
  { name: 'divorce', hub: 'divorce', spokes: ['sell-house-fast-during-divorce-lehigh-county-pa'] },
  { name: 'as-is / repairs', hub: 'major-repairs', spokes: [
    'selling-water-damaged-house-18102-mold-issues',
    'scranton-pa-major-structural-damage-disclosure-law-2026',
    'sell-hoarder-house-reading-pa-without-cleanout',
  ]},
  { name: 'tired landlord', hub: 'tired-landlord', spokes: [
    'luzerne-county-rental-property-registration-inspection-requirements-2026',
    'hazleton-residential-occupancy-inspection-checklist',
    'easton-pa-rental-inspection-checklist-2026',
  ]},
  { name: 'vacant', hub: 'vacant-property', spokes: ['stop-govos-fines-poconos-house'] },
  { name: 'code violations', hub: 'tax-liens-code-violations', spokes: [
    'sell-house-wilkes-barre-code-violations',
    'sell-house-tax-lien-bethlehem-pa',
    'selling-house-international-property-maintenance-code-violations-bethlehem',
  ]},
  { name: 'job relocation', hub: 'job-relocation', spokes: [
    'pennsylvania-job-relocation-home-buyout-fast-equity-release-2026',
  ]},
  { name: 'foundation', hub: 'foundation-structural-issues', spokes: [
    'sell-my-house-fast-dunmore-mine-subsidence',
    'scranton-pa-major-structural-damage-disclosure-law-2026',
  ]},
]

console.log('='.repeat(78))
console.log('QW9 — HUB / SPOKE INTEGRITY')
console.log('='.repeat(78))
console.log('hub->spoke is satisfied by a BODY link OR by the Related Articles module,')
console.log(`which renders blogPost.relatedSituations ordered publishedAt desc, capped at ${MODULE_CAP}.`)
console.log('spoke->hub is satisfied by a BODY link OR the blog page\'s situation chips.\n')

const gaps = []
for (const c of CLUSTERS) {
  const rendered = new Set(renderedSpokes(c.hub))
  const referenced = new Set(referencedSpokes(c.hub))
  console.log(`[${c.name}]  /situations/${c.hub}`)
  console.log(`   module: ${referenced.size} referenced, ${rendered.size} rendered (cap ${MODULE_CAP})`)
  for (const sp of c.spokes) {
    const spPath = '/blog/' + sp
    if (!bySlug.has(sp)) { console.log(`    ? ${spPath}  [DOC NOT FOUND]`); continue }
    const body = hasBodyLink(c.hub, spPath)
    const mod = rendered.has(spPath)
    const ref = referenced.has(spPath)
    const upBody = hasBodyLink(sp, '/situations/' + c.hub)
    const upChip = (bySlug.get(sp).refSituations || []).includes(c.hub)
    const down = body || mod
    const up = upBody || upChip
    const why = down ? (body ? 'body' : 'module') : (ref ? `REFERENCED BUT CUT BY CAP ${MODULE_CAP}` : 'no body link, no reference')
    console.log(`     ${down ? 'OK ' : 'GAP'} down:${pad(why, 34)} ${up ? 'OK ' : 'GAP'} up:${upBody ? 'body' : upChip ? 'chip' : 'none'}   ${spPath}${PRUNED.has(spPath) ? '  [SITEMAP-PRUNED]' : ''}`)
    if (!down) gaps.push({ cluster: c.name, hub: c.hub, spoke: sp, dir: 'hub->spoke', reason: why })
    if (!up) gaps.push({ cluster: c.name, hub: c.hub, spoke: sp, dir: 'spoke->hub', reason: 'none' })
  }
  console.log('')
}
console.log(`QW9 measured gaps: ${gaps.length}  (audit claimed 8 hub->spoke + 2 spoke->hub)`)
for (const g of gaps) console.log(`   ${pad(g.dir, 12)} ${pad(g.cluster, 20)} ${g.spoke}  [${g.reason}]`)

console.log('\n' + '='.repeat(78))
console.log('QW10 — UNGRAMMATICAL ANCHORS (live Sanity body content)')
console.log('='.repeat(78))
const BAD = /\b(tax liens and code violations|landlords|foreclosure|inherited property|vacant properties|homes needing major repairs|job relocation|divorce)\s+properties\b/i
const qw10 = []
for (const d of docs) {
  for (const l of linksFrom(d.slug)) {
    if (BAD.test(l.anchor)) qw10.push({ type: d._type, from: d.slug, ...l })
  }
}
const tally = o => Object.entries(o).sort((a, b) => b[1] - a[1])
const byAnchor = {}; const byDest = {}
for (const h of qw10) { byAnchor[h.anchor] = (byAnchor[h.anchor] || 0) + 1; byDest[h.path] = (byDest[h.path] || 0) + 1 }
console.log(`\nfound ${qw10.length} across ${new Set(qw10.map(h => h.from)).size} documents\n`)
for (const [a, n] of tally(byAnchor)) console.log(`  ${String(n).padStart(3)} x  "${a}"  ->  ${tally(byDest).find(() => true) && ''}`)
console.log('\nby destination:')
for (const [p, n] of tally(byDest)) console.log(`  ${String(n).padStart(3)} ->  ${p}`)
console.log('\nper-document (from, anchor, destination):')
for (const h of qw10.sort((a, b) => a.from.localeCompare(b.from))) {
  console.log(`  ${pad(h.from, 62)} "${h.anchor}" -> ${h.path}`)
}

console.log('\n' + '='.repeat(78))
console.log('S2 — SITUATION <-> LOCATION')
console.log('='.repeat(78))
let sitBody = 0
for (const s of situations) {
  const locs = linksFrom(s.slug).filter(l => l.path?.startsWith('/locations/'))
  sitBody += locs.length
  console.log(`  ${pad('/situations/' + s.slug, 46)} body->location: ${locs.length}   relatedLocations refs: ${(s.refLocations || []).length}`)
}
console.log(`  TOTAL situation body->location links: ${sitBody}`)
console.log('  NOTE: situation.relatedLocations IS fetched by getSituationBySlug (queries.ts:55)')
console.log('        but the situation template NEVER RENDERS IT. Fetched and discarded.')

let locBody = 0, locRefs = 0
for (const l of locations) {
  locBody += linksFrom(l.slug).filter(x => x.path?.startsWith('/situations/')).length
  locRefs += (l.refSituations || []).length
}
console.log(`\n  TOTAL location body->situation links: ${locBody}`)
console.log(`  TOTAL location.relatedSituations references: ${locRefs}`)
console.log('  NOTE: relatedSituations is NOT in the location schema and is never fetched.')

console.log('\ncities NAMED in situation prose but NOT linked:')
const cityOf = l => l.city || (l.title || '').replace(/,.*$/, '').trim()
for (const s of situations) {
  const text = JSON.stringify(s.problemDescription || '') + JSON.stringify(s.benefits || '') + JSON.stringify(s.faqs || '')
  const linked = new Set(linksFrom(s.slug).filter(l => l.path?.startsWith('/locations/')).map(l => l.path))
  const named = locations.filter(l => {
    const c = cityOf(l)
    return c && c.length > 3 && new RegExp(`\\b${c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text)
      && !linked.has('/locations/' + l.slug)
  }).map(cityOf)
  if (named.length) console.log(`  ${pad('/situations/' + s.slug, 46)} ${named.join(', ')}`)
}

console.log('\n' + '='.repeat(78))
console.log('WATER-DAMAGED BLOG — linker defect')
console.log('='.repeat(78))
const wd = bySlug.get('selling-water-damaged-house-18102-mold-issues')
if (wd) {
  const links = linksFrom(wd.slug)
  const epa = links.filter(l => /epa\.gov/i.test(l.href))
  const inWord = epa.filter(e => /^epa$/i.test(e.anchor.trim()))
  const anchors = {}
  for (const e of epa) anchors[e.anchor] = (anchors[e.anchor] || 0) + 1
  console.log(`  total body links: ${links.length}`)
  console.log(`  epa.gov outbound: ${epa.length}   (audit said 43)`)
  console.log(`  anchors that are exactly "epa" (the r[epa]ir defect): ${inWord.length}`)
  console.log(`  epa anchor tally: ${JSON.stringify(anchors)}`)
} else console.log('  doc not found')

console.log('\n' + '='.repeat(78))
console.log('SUMMARY vs AUDIT')
console.log('='.repeat(78))
console.log(`  QW9  gaps             measured ${pad(gaps.length, 5)} audit said 8 hub->spoke (+2 spoke->hub)`)
console.log(`  QW10 bad anchors      measured ${pad(qw10.length, 5)} audit said 30`)
console.log(`  S2   sit body->loc    measured ${pad(sitBody, 5)} audit said 0`)
console.log(`  S2   loc body->sit    measured ${pad(locBody, 5)} audit made no claim`)
console.log('\nDone. Nothing was written.')
