// batch4-deploy2-dedupe.mjs — removes the two duplicate links Deploy 2 left on
// the inherited hub.
//
// WHAT HAPPENED: Deploy 2's S2 paragraph on /situations/inherited-property links
// the Allentown and Reading blog owners. Both were ALREADY linked there, by two
// older single-purpose paragraphs an earlier internal-linking script appended.
// Deploy 2's idempotency guard was per-SOURCE — it skipped a source only when
// EVERY target was already linked — so a paragraph with 2 of 5 covered was
// written whole. (The guard is per-TARGET as of 2026-08-28; see batch4-deploy2.mjs
// and its --self-test.)
//
// WHY IT MATTERS: Google credits the FIRST anchor per target on a page. The two
// survivors were therefore "selling an inherited property in Allentown PA" and
// "selling an inherited house in Reading, PA" — the older, clumsier anchors —
// while the query-aligned S2 anchors sat second and counted for nothing. These
// two edges exist specifically to hand off city-qualified inherited queries to
// the pages that already rank for them, so losing the anchor loses the edge.
//
// WHY WHOLE BLOCKS, NOT JUST THE MARKS: each older paragraph exists only to
// carry its link ("...our guide to X walks through the local process step by
// step"). Unwrapping the mark would leave a sentence promising a guide it does
// not link. Deploy 2's paragraph says the same thing better and links both.
//
// DRY RUN BY DEFAULT — pass --apply to write.
//   node scripts/batch4-deploy2-dedupe.mjs           # preview
//   node scripts/batch4-deploy2-dedupe.mjs --apply   # write + read-back verify
//
// GUARDS:
//   * Each block is matched on _key AND href AND anchor text. Any mismatch
//     aborts — it means the document moved under us and the keys are stale.
//   * REFUSES to remove a block if doing so would leave its target unlinked
//     anywhere else in the field. This script removes duplicates; it must never
//     remove the last link to a page.
//   * Idempotent — if the blocks are already gone it exits 0 having done nothing.
//   * Backup before mutation, read-back after.

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { writeFileSync, mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const APPLY = process.argv.includes('--apply')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const SLUG = 'inherited-property'
const FIELD = 'problemDescription'

/** The blocks to remove, each pinned by three independent facts. */
const REMOVE = [
  { _key: 'bc8c7f7053af', href: '/blog/sell-inherited-house-allentown-pa', anchor: 'selling an inherited property in Allentown PA' },
  { _key: 'fd7419753aab', href: '/blog/sell-inherited-house-reading-pa', anchor: 'selling an inherited house in Reading, PA' },
]

const linksIn = (blocks) => {
  const out = []
  for (const b of blocks || [])
    for (const m of b.markDefs || [])
      if (m.href)
        out.push({
          block: b._key,
          href: m.href,
          text: (b.children || []).filter((c) => (c.marks || []).includes(m._key)).map((c) => c.text).join(''),
        })
  return out
}

const doc = await client.fetch(`*[_type == "situation" && slug.current == $slug][0]{_id, ${FIELD}}`, { slug: SLUG })
if (!doc) { console.error(`ABORT — no situation with slug "${SLUG}"`); process.exit(1) }

const before = doc[FIELD] || []
console.log(`=== BATCH 4 / DEPLOY 2 DEDUPE — ${APPLY ? 'APPLY' : 'DRY RUN (no writes)'} ===`)
console.log(`/situations/${SLUG}.${FIELD} — ${before.length} blocks, ${linksIn(before).length} links\n`)

const present = REMOVE.filter((r) => before.some((b) => b._key === r._key))
if (present.length === 0) {
  console.log('Both blocks are already gone — nothing to do.')
  process.exit(0)
}

// --- guard: identity ------------------------------------------------------
for (const r of present) {
  const b = before.find((x) => x._key === r._key)
  const ls = linksIn([b])
  const match = ls.find((l) => l.href === r.href && l.text === r.anchor)
  if (ls.length !== 1 || !match) {
    console.error(`ABORT — block ${r._key} is not what this script expects.`)
    console.error(`   expected exactly one link: "${r.anchor}" -> ${r.href}`)
    console.error(`   found: ${ls.map((l) => `"${l.text}" -> ${l.href}`).join(', ') || '(none)'}`)
    console.error('   The document has changed. Re-read it and update REMOVE.')
    process.exit(2)
  }
}

// --- guard: never remove the last link to a target -------------------------
const after = before.filter((b) => !REMOVE.some((r) => r._key === b._key))
const survivingHrefs = new Set(linksIn(after).map((l) => l.href))
for (const r of present) {
  if (!survivingHrefs.has(r.href)) {
    console.error(`ABORT — removing ${r._key} would leave ${r.href} unlinked on this page.`)
    console.error('   This script removes DUPLICATES. It must never remove the only link.')
    process.exit(3)
  }
}

for (const r of present) {
  const b = before.find((x) => x._key === r._key)
  const keeper = linksIn(after).find((l) => l.href === r.href)
  console.log(`  REMOVE block ${r._key}`)
  console.log(`     "${(b.children || []).map((c) => c.text).join('')}"`)
  console.log(`     duplicate link: "${r.anchor}" -> ${r.href}`)
  console.log(`     survivor:       "${keeper.text}" -> ${keeper.href}  (block ${keeper.block})\n`)
}

console.log(`blocks: ${before.length} -> ${after.length}   links: ${linksIn(before).length} -> ${linksIn(after).length}`)

if (!APPLY) { console.log('\n=== dry run complete — re-run with --apply to write ==='); process.exit(0) }

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const dir = resolve(__dirname, '../backups')
mkdirSync(dir, { recursive: true })
const backup = resolve(dir, `batch4-deploy2-dedupe-${stamp}.json`)
writeFileSync(backup, JSON.stringify([{ _id: doc._id, slug: SLUG, field: FIELD, content: before }], null, 2))
console.log(`\nbackup written: ${backup}`)

await client.patch(doc._id).set({ [FIELD]: after }).commit()
console.log(`  patched ${SLUG}.${FIELD}`)

console.log('\n=== READ-BACK VERIFICATION (fresh fetch) ===')
const fresh = await client.fetch(`*[_id == $id][0]{${FIELD}}`, { id: doc._id })
const freshLinks = linksIn(fresh[FIELD] || [])
let bad = 0
for (const r of REMOVE) {
  const gone = !(fresh[FIELD] || []).some((b) => b._key === r._key)
  const hits = freshLinks.filter((l) => l.href === r.href)
  const ok = gone && hits.length === 1
  if (!ok) bad++
  console.log(`  ${ok ? 'OK     ' : 'FAILED '} ${r.href} — block removed: ${gone}, links now: ${hits.length}` +
    (hits.length ? `, anchor: "${hits[0].text}"` : ''))
}
console.log(`\n${bad === 0 ? 'READ-BACK PASSED' : 'READ-BACK FAILED'}`)
process.exit(bad === 0 ? 0 : 1)
