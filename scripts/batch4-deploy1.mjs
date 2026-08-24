// batch4-deploy1.mjs — Batch 4, Deploy 1 (HYGIENE ONLY). 40 Sanity edits.
//
//   QW10  30 ungrammatical anchor rewrites across 19 blog posts
//   EPA   10 r[epa]ir in-word link unwraps on the water-damaged post
//
// The 41st edge (BlogCtaBlock /#lead-form -> #lead-form) is repo-side and is NOT
// done here — it needs a TEMPLATE_REVISION bump in the same commit.
//
// DRY RUN BY DEFAULT — pass --apply to write.
//   node scripts/batch4-deploy1.mjs           # preview
//   node scripts/batch4-deploy1.mjs --apply   # write + read-back verify
//
// GUARDS (G/H pattern):
//   * Pre-flight count must match the recon exactly (30 / 10) or the run ABORTS.
//     Ground truth moving under us is the one condition where writing is wrong.
//   * Every edit is matched on CURRENT state, so the script is idempotent: after
//     a successful run nothing matches and a re-run is a no-op.
//   * The in-word test for "epa" is structural (flanked by word characters in
//     the sibling spans), NOT a string match — the 33 legitimate mold/Mold
//     epa.gov citations must survive untouched.
//   * A full backup of every touched document is written before any mutation.
//   * Read-back re-fetches from the API (useCdn:false) and asserts zero remain.

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { writeFileSync, mkdirSync } from 'fs'
import { pickAnchor, QW10_ANCHORS } from './batch4-edges.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const APPLY = process.argv.includes('--apply')
const EXPECT_QW10 = 30
const EXPECT_EPA = 10
const WD_SLUG = 'selling-water-damaged-house-18102-mold-issues'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const BAD = /\b(tax liens and code violations|landlords|foreclosure|inherited property|vacant properties|homes needing major repairs|job relocation)\s+properties\b/i
const isWordChar = ch => /[A-Za-z]/.test(ch || '')

/** Plan QW10 rewrites for one doc. Returns {content, edits[]} without mutating. */
function planQw10(doc) {
  const edits = []
  const content = JSON.parse(JSON.stringify(doc.content || []))
  for (const block of content) {
    if (!Array.isArray(block.markDefs) || !Array.isArray(block.children)) continue
    const defs = new Map(block.markDefs.map(d => [d._key, d]))
    for (const child of block.children) {
      if (!BAD.test(child.text || '')) continue
      const linkMark = (child.marks || []).find(m => defs.get(m)?.href)
      if (!linkMark) continue
      const dest = defs.get(linkMark).href
      const next = pickAnchor(dest, doc.slug)
      if (!next) continue
      edits.push({ from: doc.slug, to: dest, oldAnchor: child.text, newAnchor: next,
                   finding: 'QW10', blockKey: block._key, childKey: child._key })
      child.text = next
    }
  }
  return { content, edits }
}

/** Plan the r[epa]ir unwraps. Structural in-word test, not a string match. */
function planEpa(doc) {
  const edits = []
  const content = JSON.parse(JSON.stringify(doc.content || []))
  for (const block of content) {
    if (!Array.isArray(block.markDefs) || !Array.isArray(block.children)) continue
    const defs = new Map(block.markDefs.map(d => [d._key, d]))
    for (let i = 0; i < block.children.length; i++) {
      const ch = block.children[i]
      if (!/^epa$/i.test((ch.text || '').trim())) continue
      const linkMark = (ch.marks || []).find(m => /epa\.gov/i.test(defs.get(m)?.href || ''))
      if (!linkMark) continue
      const prev = block.children[i - 1]
      const nxt = block.children[i + 1]
      const prevEndsWord = prev && isWordChar((prev.text || '').slice(-1))
      const nextStartsWord = nxt && isWordChar((nxt.text || '')[0])
      // GLUED ON EITHER SIDE — the anchor is part of a surrounding word.
      // An AND test was wrong and the guard caught it: nine instances are
      // r[epa]ir (word chars both sides) but the tenth is N[EPA] — the linker
      // matched EPA inside "NEPA", Northeastern Pennsylvania, which is followed
      // by a comma. Both are the same defect. A genuinely standalone EPA
      // citation would have non-word characters on BOTH sides; there are none
      // on this post, and the 33 legitimate citations are anchored on
      // "mold"/"Mold" so they are never candidates here at all.
      if (!(prevEndsWord || nextStartsWord)) continue
      const word = (prev.text || '').slice(-12) + ch.text + (nxt.text || '').slice(0, 12)
      edits.push({ from: doc.slug, to: defs.get(linkMark).href, oldAnchor: ch.text,
                   newAnchor: '(link removed)', finding: 'linker-defect',
                   blockKey: block._key, context: word })
      ch.marks = (ch.marks || []).filter(m => m !== linkMark)
    }
    // Merge adjacent spans that now share identical marks, then drop any
    // markDef nothing references any more.
    const merged = []
    for (const ch of block.children) {
      const last = merged[merged.length - 1]
      const sameMarks = last && JSON.stringify(last.marks || []) === JSON.stringify(ch.marks || [])
      if (sameMarks && last._type === 'span' && ch._type === 'span') last.text += ch.text
      else merged.push(ch)
    }
    block.children = merged
    const used = new Set(block.children.flatMap(c => c.marks || []))
    block.markDefs = block.markDefs.filter(d => used.has(d._key))
  }
  return { content, edits }
}

// --------------------------------------------------------------------------
const docs = await client.fetch(`*[_type=="blogPost"]{_id, "slug": slug.current, content}`)

const plans = []
let qw10Count = 0
for (const d of docs) {
  const p = planQw10(d)
  if (p.edits.length) { plans.push({ doc: d, ...p }); qw10Count += p.edits.length }
}

const wd = docs.find(d => d.slug === WD_SLUG)
let epaPlan = null
if (wd) {
  // Chain onto the QW10 plan for this doc so both land in one patch.
  const existing = plans.find(p => p.doc.slug === WD_SLUG)
  const base = existing ? { ...wd, content: existing.content } : wd
  epaPlan = planEpa(base)
  if (existing) { existing.content = epaPlan.content; existing.edits.push(...epaPlan.edits) }
  else if (epaPlan.edits.length) plans.push({ doc: wd, ...epaPlan })
}
const epaCount = epaPlan ? epaPlan.edits.length : 0

console.log(`=== BATCH 4 / DEPLOY 1 — ${APPLY ? 'APPLY' : 'DRY RUN (no writes)'} ===\n`)
console.log(`QW10 anchor rewrites : ${qw10Count}  (expected ${EXPECT_QW10})`)
console.log(`EPA  in-word unwraps : ${epaCount}  (expected ${EXPECT_EPA})`)
console.log(`documents touched    : ${plans.length}\n`)

const allEdits = plans.flatMap(p => p.edits)
for (const e of allEdits.sort((a, b) => a.from.localeCompare(b.from))) {
  if (e.finding === 'QW10') {
    console.log(`  [QW10] ${e.from}\n         "${e.oldAnchor}"  ->  "${e.newAnchor}"   -> ${e.to}`)
  } else {
    console.log(`  [EPA ] ${e.from}  block ${e.blockKey}  unwrap "${e.oldAnchor}" in "${e.context}"  (was ${e.to})`)
  }
}

// --- guards ---------------------------------------------------------------
let abort = false
if (qw10Count !== EXPECT_QW10) { console.error(`\nABORT: QW10 count ${qw10Count} != expected ${EXPECT_QW10}.`); abort = true }
if (epaCount !== EXPECT_EPA) { console.error(`\nABORT: EPA count ${epaCount} != expected ${EXPECT_EPA}.`); abort = true }
const unmapped = allEdits.filter(e => e.finding === 'QW10' && !QW10_ANCHORS[e.to])
if (unmapped.length) { console.error(`\nABORT: ${unmapped.length} anchors have no mapping.`); abort = true }
if (abort) {
  console.error('Ground truth does not match the recon. Nothing written. Re-run batch4-recon.mjs.')
  process.exit(2)
}

if (!APPLY) {
  console.log('\n=== dry run complete — re-run with --apply to write ===')
  process.exit(0)
}

// --- backup then write ----------------------------------------------------
const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const dir = resolve(__dirname, '../backups')
mkdirSync(dir, { recursive: true })
const backup = resolve(dir, `batch4-deploy1-${stamp}.json`)
writeFileSync(backup, JSON.stringify(plans.map(p => ({ _id: p.doc._id, slug: p.doc.slug, content: p.doc.content })), null, 2))
console.log(`\nbackup written: ${backup}`)

let ok = 0
for (const p of plans) {
  await client.patch(p.doc._id).set({ content: p.content }).commit()
  console.log(`  patched ${p.doc.slug} (${p.edits.length} edit${p.edits.length === 1 ? '' : 's'})`)
  ok++
}
console.log(`\npatched ${ok} documents`)

// --- read-back verification ----------------------------------------------
console.log('\n=== READ-BACK VERIFICATION (fresh fetch, useCdn:false) ===')
const after = await client.fetch(`*[_type=="blogPost"]{_id, "slug": slug.current, content}`)
let badLeft = 0, epaLeft = 0
for (const d of after) {
  for (const b of d.content || []) {
    if (!Array.isArray(b.markDefs) || !Array.isArray(b.children)) continue
    const defs = new Map(b.markDefs.map(x => [x._key, x]))
    for (let i = 0; i < b.children.length; i++) {
      const ch = b.children[i]
      const hasLink = (ch.marks || []).some(m => defs.get(m)?.href)
      if (hasLink && BAD.test(ch.text || '')) badLeft++
      if (d.slug === WD_SLUG && /^epa$/i.test((ch.text || '').trim())) {
        const lm = (ch.marks || []).find(m => /epa\.gov/i.test(defs.get(m)?.href || ''))
        const prev = b.children[i - 1], nxt = b.children[i + 1]
        if (lm && prev && nxt && isWordChar((prev.text || '').slice(-1)) && isWordChar((nxt.text || '')[0])) epaLeft++
      }
    }
  }
}
const wdAfter = after.find(d => d.slug === WD_SLUG)
const epaTotal = (wdAfter?.content || []).flatMap(b => b.markDefs || []).filter(m => /epa\.gov/i.test(m.href || '')).length
console.log(`  ungrammatical anchors remaining : ${badLeft}  (expect 0)`)
console.log(`  r[epa]ir in-word links remaining: ${epaLeft}  (expect 0)`)
console.log(`  epa.gov links still on the post : ${epaTotal}  (expect 33 — the legitimate mold citations)`)
const pass = badLeft === 0 && epaLeft === 0 && epaTotal === 33
console.log(`\n${pass ? 'READ-BACK PASSED' : 'READ-BACK FAILED — investigate before logging this deploy'}`)
process.exit(pass ? 0 : 1)
