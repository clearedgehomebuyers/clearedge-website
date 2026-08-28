// batch4-deploy2.mjs — Batch 4, Deploy 2 (LINK GRAPH). 27 body links + 1 reference.
//
//   QW9  8 hub/spoke edges  (4 true gaps, 4 routing around the module cap of 3)
//   S2   19 situation -> location/owner edges
//
// STAGED 2026-08-24, NOT FOR RELEASE BEFORE 2026-08-27 (Tyler: 3+ days after
// Deploy 1) so the mid-September read can separate hygiene from link-graph work.
// The script refuses to apply before that date unless --force-date is passed.
//
// DRY RUN BY DEFAULT — pass --apply to write.
//   node scripts/batch4-deploy2.mjs           # preview
//   node scripts/batch4-deploy2.mjs --apply   # write + read-back verify
//
// WHY GROUPED PARAGRAPHS: 27 individually-appended sentences would read as link
// spam and would be obvious boilerplate. Instead each source page gets ONE or
// TWO purpose-written paragraphs carrying several links, so the prose is real
// and the anchors sit in a sentence a human would write.
//
// GUARDS:
//   * Idempotent PER TARGET, not per source. A target already linked anywhere in
//     the source's body is emitted as PLAIN TEXT inside the new paragraph — the
//     prose still reads, and no second link to that target is created. A source
//     is skipped outright only when every one of its targets is already linked.
//
//     This was per-SOURCE until 2026-08-28 and it cost us: the inherited hub's
//     S2 paragraph had 2 of its 5 targets (the Allentown and Reading blog
//     owners) already linked by an earlier script, so the all-or-nothing test
//     did not fire and the paragraph was written whole, duplicating both. Google
//     credits the FIRST anchor per target, so the duplicate handed the ranking
//     signal to the older, clumsier anchor — the exact opposite of what those
//     two hand-off edges exist to do.
//   * NO_CITY_ANCHOR_INBOUND is ENFORCED, not documented: any edge pointing AT
//     /situations/inherited-property with a city name in the anchor aborts the
//     run. That hub took 202 impressions and 0 clicks in 28 days, ~130 of them
//     on city-qualified queries a dedicated page already owns.
//   * Backup of every touched document before any mutation.
//   * Read-back re-fetches and asserts every edge is present.

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { writeFileSync, mkdirSync, readdirSync, readFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const APPLY = process.argv.includes('--apply')
const FORCE_DATE = process.argv.includes('--force-date')
const EARLIEST = '2026-08-27'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const CITY_WORDS = /\b(Allentown|Bethlehem|Easton|Reading|Scranton|Wilkes-Barre|Hazleton|Stroudsburg|Pottsville|Kingston|Dunmore|Nanticoke|Pittston|Honesdale|Bloomsburg|Carbondale|Tannersville|Lehigh Valley|Poconos|Berks|Luzerne|Lackawanna|Lehighton)\b/i

/**
 * Insertion plan. `field` is the portable-text field on the source document.
 * `parts` is the paragraph: strings are plain text, {t,href} become links.
 * `after` matches the START of an existing block's plain text so the paragraph
 * lands somewhere sensible instead of being appended to the end.
 */
const PLAN = [
  // ---------------- QW9: true two-way gaps -------------------------------
  { doc: 'foreclosure', type: 'situation', field: 'problemDescription', finding: 'QW9',
    parts: ['If the property has already been posted for sheriff\'s sale, or a municipality has begun blight proceedings against it, the timeline changes and so do your options — here is ',
      { t: 'how Act 135 conservatorship works in Pennsylvania', href: '/blog/pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights' }, '.'] },

  { doc: 'pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights', type: 'blogPost', field: 'content', finding: 'QW9',
    parts: ['If the reason your property slid into disrepair is that you were already behind on payments, the conservatorship question is downstream of a different one — start with ',
      { t: 'selling a house in foreclosure', href: '/situations/foreclosure' }, '.'],
    alsoRefSituation: 'foreclosure' },

  { doc: 'vacant-property', type: 'situation', field: 'problemDescription', finding: 'QW9',
    parts: ['Vacancy is expensive before anyone accuses you of anything: Pocono townships bill through an automated system, and the fines compound monthly. We break down ',
      { t: 'GovOS vacant-property fines in the Poconos', href: '/blog/stop-govos-fines-poconos-house' }, '.'] },

  { doc: 'scranton-pa-major-structural-damage-disclosure-law-2026', type: 'blogPost', field: 'content', finding: 'QW9',
    parts: ['Disclosure is the legal half of the problem. The practical half is what the house is actually worth once a buyer sees the report — see ',
      { t: 'selling a house with foundation or structural damage', href: '/situations/foundation-structural-issues' }, '.'] },

  // ---------------- QW9: routing around the module cap of 3 --------------
  { doc: 'tired-landlord', type: 'situation', field: 'problemDescription', finding: 'QW9',
    parts: ['Registration and inspection rules are where most tired landlords actually get stuck, and they are municipal rather than statewide — we cover ',
      { t: 'Luzerne County rental registration and inspection rules', href: '/blog/luzerne-county-rental-property-registration-inspection-requirements-2026' },
      ' and ', { t: 'Hazleton occupancy inspection requirements', href: '/blog/hazleton-residential-occupancy-inspection-checklist' }, ' in detail.'] },

  { doc: 'tax-liens-code-violations', type: 'situation', field: 'problemDescription', finding: 'QW9',
    parts: ['Enforcement varies sharply by municipality. For a worked example of the process end to end, see ',
      { t: 'selling a Wilkes-Barre house with code violations', href: '/blog/sell-house-wilkes-barre-code-violations' }, '.'] },

  // QW9's headline gap. Anchor is deliberately NON-geographic.
  { doc: 'inherited-property', type: 'situation', field: 'problemDescription', finding: 'QW9',
    parts: ['Before anything can be sold, the paperwork has to line up — Letters Testamentary, the deed, and the tax clearances. We list ',
      { t: 'the documents you need to sell an inherited house', href: '/blog/documents-required-selling-inherited-property-pennsylvania' },
      ', including which ones you can obtain yourself.'] },

  // ---------------- S2: situation -> location / owner --------------------
  // The two Allentown/Reading destinations are the dedicated BLOG owners, not
  // the city pages: those are the exact queries this hub is cannibalizing.
  { doc: 'inherited-property', type: 'situation', field: 'problemDescription', finding: 'S2',
    parts: ['Where the house is matters more than most people expect, because probate timelines and transfer taxes are set county by county. We have specific guides for ',
      { t: 'selling an inherited house in Allentown', href: '/blog/sell-inherited-house-allentown-pa' }, ' and ',
      { t: 'selling an inherited house in Reading', href: '/blog/sell-inherited-house-reading-pa' },
      ', and we buy directly in ', { t: 'cash home buyers in Scranton', href: '/locations/scranton' }, ', ',
      { t: 'cash home buyers in Wilkes-Barre', href: '/locations/wilkes-barre' }, ', and ',
      { t: 'we buy houses across the Lehigh Valley', href: '/locations/lehigh-valley' }, '.'] },

  { doc: 'tax-liens-code-violations', type: 'situation', field: 'problemDescription', finding: 'S2',
    parts: ['Because enforcement is local, so is the answer. We buy houses with liens and open citations in ',
      { t: 'cash home buyers in Scranton', href: '/locations/scranton' }, ', ',
      { t: 'cash home buyers in Wilkes-Barre', href: '/locations/wilkes-barre' }, ', ',
      { t: 'cash home buyers in Hazleton', href: '/locations/hazleton' }, ', ',
      { t: 'cash home buyers in Allentown', href: '/locations/allentown' }, ', and ',
      { t: 'cash home buyers in Bethlehem', href: '/locations/bethlehem' }, '.'] },

  { doc: 'vacant-property', type: 'situation', field: 'problemDescription', finding: 'S2',
    parts: ['Vacant-property enforcement is municipal, so the exposure depends on where the house sits. We buy vacant houses in ',
      { t: 'we buy vacant houses in Scranton', href: '/locations/scranton' }, ', ',
      { t: 'we buy vacant houses in Wilkes-Barre', href: '/locations/wilkes-barre' }, ', ',
      { t: 'we buy vacant houses in Hazleton', href: '/locations/hazleton' }, ', and ',
      { t: 'we buy vacant houses in Allentown', href: '/locations/allentown' }, '.'] },

  { doc: 'major-repairs', type: 'situation', field: 'problemDescription', finding: 'S2',
    parts: ['If you would rather not find out what a contractor quotes, we buy as-is in every market we serve — including ',
      { t: 'sell a house as-is in Scranton', href: '/locations/scranton' }, ' and ',
      { t: 'sell a house as-is in Wilkes-Barre', href: '/locations/wilkes-barre' }, '.'] },

  { doc: 'foundation-structural-issues', type: 'situation', field: 'problemDescription', finding: 'S2',
    parts: ['Mine subsidence, clay soil and century-old stone foundations are regional problems, not general ones. We buy structurally compromised houses in ',
      { t: 'cash home buyers in Scranton', href: '/locations/scranton' }, ', ',
      { t: 'cash home buyers in Wilkes-Barre', href: '/locations/wilkes-barre' }, ', and ',
      { t: 'cash home buyers in Allentown', href: '/locations/allentown' }, '.'] },
]

// --------------------------------------------------------------------------
const key = (p) => p + Math.random().toString(36).slice(2, 10)

/**
 * Build the paragraph. `linked` is the set of hrefs the source field ALREADY
 * links; a target in that set keeps its sentence but loses its link mark, so the
 * prose stays grammatical and the target is not linked twice. Returns the block
 * plus the targets that actually became links and the ones downgraded.
 */
function buildBlock(parts, linked) {
  const children = []
  const markDefs = []
  const linkedNow = []
  const plain = []
  for (const part of parts) {
    if (typeof part === 'string') {
      children.push({ _key: key('s'), _type: 'span', marks: [], text: part })
    } else if (linked.has(part.href)) {
      plain.push(part)
      children.push({ _key: key('s'), _type: 'span', marks: [], text: part.t })
    } else {
      const k = key('lnk')
      markDefs.push({ _key: k, _type: 'link', href: part.href })
      children.push({ _key: key('s'), _type: 'span', marks: [k], text: part.t })
      linkedNow.push(part)
      linked.add(part.href) // a later paragraph in this same run must see it too
    }
  }
  return { block: { _key: key('b'), _type: 'block', style: 'normal', markDefs, children }, linkedNow, plain }
}

/** Every link in a field, as {href, text} — text is the anchor it already uses. */
function bodyLinks(doc, field) {
  const out = []
  for (const b of doc[field] || []) {
    for (const m of b.markDefs || []) {
      if (!m.href) continue
      const text = (b.children || [])
        .filter((c) => (c.marks || []).includes(m._key))
        .map((c) => c.text)
        .join('')
      out.push({ href: m.href, text })
    }
  }
  return out
}

function bodyHrefs(doc, field) {
  return bodyLinks(doc, field).map((l) => l.href)
}

// --- self-test: replay the PLAN against the PRE-DEPLOY state ---------------
// Offline regression test for the per-target guard, run against the backup this
// deploy wrote — i.e. the exact field contents that produced the two duplicate
// links on 2026-08-28. The old per-source guard emitted 27 links here; the
// fixed one must emit 25 and downgrade exactly the two already-linked targets.
//
//   node scripts/batch4-deploy2.mjs --self-test
if (process.argv.includes('--self-test')) {
  const dir = resolve(__dirname, '../backups')
  const name = readdirSync(dir).filter(f => /^batch4-deploy2-.*\.json$/.test(f)).sort().pop()
  if (!name) { console.error('no backups/batch4-deploy2-*.json to replay against'); process.exit(1) }
  const pre = new Map(JSON.parse(readFileSync(resolve(dir, name), 'utf8')).map(b => [b.slug, b]))
  console.log(`=== SELF-TEST — replaying PLAN against backups/${name} ===\n`)

  const sets = new Map()
  let linkCount = 0
  const downgrades = []
  for (const p of PLAN) {
    const b = pre.get(p.doc)
    if (!b) { console.error(`  !! ${p.doc} not in the backup — cannot replay`); process.exit(1) }
    const fkey = `${p.doc}::${p.field}`
    if (!sets.has(fkey)) sets.set(fkey, new Set(bodyLinks({ [p.field]: b.content }, p.field).map(l => l.href)))
    const { block, linkedNow, plain } = buildBlock(p.parts, sets.get(fkey))
    linkCount += linkedNow.length
    for (const t of plain) downgrades.push(`${p.doc} -> ${t.href}`)
    // the paragraph must survive intact whether or not a target was downgraded
    const text = block.children.map(c => c.text).join('')
    const want = p.parts.map(x => (typeof x === 'string' ? x : x.t)).join('')
    if (text !== want) { console.error(`  FAIL ${p.doc}: prose altered by the guard`); process.exit(1) }
    console.log(`  ${p.doc} [${p.finding}] — ${linkedNow.length} link(s), ${plain.length} de-duplicated`)
  }

  const expected = ['inherited-property -> /blog/sell-inherited-house-allentown-pa',
                    'inherited-property -> /blog/sell-inherited-house-reading-pa']
  const ok = linkCount === 25 && JSON.stringify(downgrades.sort()) === JSON.stringify(expected.sort())
  console.log(`\n  links emitted: ${linkCount} (expect 25)`)
  console.log(`  de-duplicated: ${downgrades.length} (expect 2)`)
  downgrades.forEach(d => console.log(`      ${d}`))
  console.log(`\n${ok ? 'SELF-TEST PASSED' : 'SELF-TEST FAILED'}`)
  process.exit(ok ? 0 : 1)
}

const docs = await client.fetch(`*[_type in ["situation","blogPost"]]{
  _id, _type, "slug": slug.current, problemDescription, content, relatedSituations
}`)
const bySlug = new Map(docs.map(d => [d.slug, d]))

// --- guard: enforce the cross-cluster rule --------------------------------
const violations = []
for (const p of PLAN) {
  for (const part of p.parts) {
    if (typeof part === 'object' && part.href === '/situations/inherited-property' && CITY_WORDS.test(part.t)) {
      violations.push(`${p.doc}: "${part.t}" -> ${part.href}`)
    }
  }
}
if (violations.length) {
  console.error('ABORT — NO_CITY_ANCHOR_INBOUND violated. City-qualified anchors pointing at')
  console.error('the inherited hub would feed the exact cannibalization we are trying to drain:')
  violations.forEach(v => console.error('   ' + v))
  process.exit(2)
}

console.log(`=== BATCH 4 / DEPLOY 2 — ${APPLY ? 'APPLY' : 'DRY RUN (no writes)'} ===`)
console.log(`cross-cluster guard: PASS (no city-qualified anchor points at the inherited hub)\n`)

const patches = []
const edges = []
// Per document+field: the hrefs already linked, and the anchor each one uses.
// Seeded from Sanity, then extended by buildBlock as this run adds links, so a
// second paragraph on the same field cannot duplicate the first one's targets.
const linkedSets = new Map()
const anchorFor = new Map()
let skipped = 0
let deduped = 0
for (const p of PLAN) {
  const doc = bySlug.get(p.doc)
  if (!doc) { console.log(`  !! doc not found: ${p.doc}`); continue }
  const fkey = `${doc._id}::${p.field}`
  if (!linkedSets.has(fkey)) {
    const links = bodyLinks(doc, p.field)
    linkedSets.set(fkey, new Set(links.map(l => l.href)))
    for (const l of links) if (!anchorFor.has(`${fkey}::${l.href}`)) anchorFor.set(`${fkey}::${l.href}`, l.text)
  }
  const linked = linkedSets.get(fkey)
  const targets = p.parts.filter(x => typeof x === 'object')
  if (targets.every(t => linked.has(t.href))) {
    console.log(`  SKIP  ${p.doc} [${p.finding}] — all ${targets.length} target(s) already linked`)
    skipped++
    continue
  }
  const { block, linkedNow, plain } = buildBlock(p.parts, linked)
  const field = JSON.parse(JSON.stringify(doc[p.field] || []))
  field.push(block)
  const prev = patches.find(x => x._id === doc._id && x.field === p.field)
  if (prev) { prev.value.push(block); prev.findings.push(p.finding) }
  else patches.push({ _id: doc._id, slug: doc.slug, field: p.field, value: field, findings: [p.finding], orig: doc[p.field] || [], refSituation: p.alsoRefSituation })
  console.log(`  ADD   ${p.doc} [${p.finding}] — ${linkedNow.length} link(s)` + (plain.length ? `, ${plain.length} de-duplicated` : ''))
  for (const t of linkedNow) {
    console.log(`          "${t.t}" -> ${t.href}`)
    edges.push({ finding: p.finding, from: (p.type === 'situation' ? '/situations/' : '/blog/') + p.doc, to: t.href, anchor: t.t })
  }
  for (const t of plain) {
    deduped++
    console.log(`  DEDUPE  "${t.t}" -> ${t.href}`)
    console.log(`          kept as plain text — already linked here as "${anchorFor.get(`${fkey}::${t.href}`)}".`)
    console.log(`          Google credits the FIRST anchor per target; if the planned one is`)
    console.log(`          better, remove the existing link by hand and re-run.`)
  }
}

console.log(`\nedges to add: ${edges.length}   blocks: ${patches.reduce((n, p) => n + 1, 0)}   skipped sources: ${skipped}   de-duplicated targets: ${deduped}`)
console.log(`  QW9: ${edges.filter(e => e.finding === 'QW9').length}   S2: ${edges.filter(e => e.finding === 'S2').length}`)

const today = new Date().toISOString().slice(0, 10)
if (APPLY && today < EARLIEST && !FORCE_DATE) {
  console.error(`\nABORT: Deploy 2 is staged for ${EARLIEST} or later (today is ${today}).`)
  console.error('Attribution spacing from Deploy 1 is the whole point. Pass --force-date to override.')
  process.exit(3)
}
if (!APPLY) { console.log('\n=== dry run complete — re-run with --apply on or after ' + EARLIEST + ' ==='); process.exit(0) }

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const dir = resolve(__dirname, '../backups')
mkdirSync(dir, { recursive: true })
const backup = resolve(dir, `batch4-deploy2-${stamp}.json`)
writeFileSync(backup, JSON.stringify(patches.map(p => ({ _id: p._id, slug: p.slug, field: p.field, content: p.orig })), null, 2))
console.log(`\nbackup written: ${backup}`)

for (const p of patches) {
  let tx = client.patch(p._id).set({ [p.field]: p.value })
  if (p.refSituation) {
    const sit = bySlug.get(p.refSituation)
    const doc = docs.find(d => d._id === p._id)
    const has = (doc.relatedSituations || []).some(r => r._ref === sit._id)
    if (sit && !has) tx = tx.setIfMissing({ relatedSituations: [] }).append('relatedSituations', [{ _key: key('ref'), _type: 'reference', _ref: sit._id }])
  }
  await tx.commit()
  console.log(`  patched ${p.slug}.${p.field}`)
}

console.log('\n=== READ-BACK VERIFICATION (fresh fetch) ===')
const after = await client.fetch(`*[_type in ["situation","blogPost"]]{_id,"slug":slug.current,problemDescription,content}`)
const afterBy = new Map(after.map(d => [d.slug, d]))
let missing = 0
for (const e of edges) {
  const slug = e.from.split('/').pop()
  const d = afterBy.get(slug)
  const field = d?.problemDescription ? 'problemDescription' : 'content'
  const hrefs = bodyHrefs(d || {}, field)
  if (!hrefs.includes(e.to)) { console.log(`  MISSING ${e.from} -> ${e.to}`); missing++ }
}
console.log(`  edges verified present: ${edges.length - missing} / ${edges.length}`)
console.log(`\n${missing === 0 ? 'READ-BACK PASSED' : 'READ-BACK FAILED'}`)
process.exit(missing === 0 ? 0 : 1)
