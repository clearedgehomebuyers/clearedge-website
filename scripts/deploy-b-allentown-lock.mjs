// Execution Package #2, Deploy B — Allentown canonical-owner lock (2026-07-23).
// Ends the allentown-inherited surface rotation: decisive anchors TO
// /blog/sell-inherited-house-allentown-pa plus reciprocals, per Part 2.
//
// Dry-run by default; pass --yes to write. Every op is idempotent:
// "already linked to the target" => VERIFIED-PRESENT, skip. Output lines are
// grep-stable for the scheduled runner: WRITTEN / VERIFIED-PRESENT / SKIPPED / ERROR.
//
// Recon baselines (2026-07-20): probate blog -> allentown blog EXISTS (key
// 5c7116a15304); documents blog -> allentown blog EXISTS x2; allentown blog ->
// /locations/allentown EXISTS x5 and -> probate blog EXISTS; the location
// callout and the situations anchor are NET-NEW.

import { createClient } from '@sanity/client'
import { randomBytes } from 'crypto'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2026-01-02',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const WRITE = process.argv.includes('--yes')
const BLOG = '/blog/sell-inherited-house-allentown-pa'
const PROBATE = '/blog/sell-deceased-parents-house-without-probate-pennsylvania'
const key = () => randomBytes(6).toString('hex')

const fieldHasHref = (field, href) => JSON.stringify(field || []).includes(href)

// segments: {text} plain, {text, bold}, {text, href}
function buildBlock(segments) {
  const children = []
  const markDefs = []
  for (const seg of segments) {
    const marks = []
    if (seg.href) {
      const mk = key()
      markDefs.push({ _key: mk, _type: 'link', href: seg.href })
      marks.push(mk)
    }
    if (seg.bold) marks.push('strong')
    children.push({ _type: 'span', _key: key(), text: seg.text, marks })
  }
  return { _type: 'block', _key: key(), style: 'normal', children, markDefs }
}

// ---------------------------------------------------------------------------
// Op 1 — /locations/allentown callout (approved copy, verbatim), placed in
// problemStatement after the neighborhoods block (key 0izjerpw), i.e. before
// the deploy-1 repairs bridge. Falls back to append-at-end if keys moved.
async function opAllentownCallout() {
  const doc = await client.fetch(
    `*[_type == "location" && slug.current == "allentown"][0]{ _id, problemStatement }`)
  if (!doc?._id) return console.log('ERROR op1: allentown location doc not found')
  if (!Array.isArray(doc.problemStatement) || doc.problemStatement.length === 0)
    return console.log('ERROR op1: problemStatement empty — refusing to write into an empty field')
  if (fieldHasHref(doc.problemStatement, BLOG))
    return console.log('VERIFIED-PRESENT op1: allentown location already links to the inherited blog')

  const callout = buildBlock([
    { text: 'Inherited a house in Allentown?', bold: true },
    { text: " Whether probate is open, closed, or hasn't started, we buy inherited properties as-is for cash. Read our step-by-step guide: " },
    { text: 'selling an inherited house in Allentown', href: BLOG },
    { text: '.' },
  ])

  const blocks = [...doc.problemStatement]
  let at = blocks.findIndex(b => b._key === '0izjerpw')
  if (at === -1) {
    console.log('NOTE op1: anchor block 0izjerpw not found — appending at end instead')
    at = blocks.length - 1
  }
  blocks.splice(at + 1, 0, callout)

  console.log(`op1: insert callout into allentown problemStatement at index ${at + 1} of ${doc.problemStatement.length}`)
  if (!WRITE) return console.log('DRY-RUN op1: would write (pass --yes)')
  await client.patch(doc._id).set({ problemStatement: blocks }).commit()
  console.log('WRITTEN op1: allentown location callout')
}

// Op 2 — /situations/inherited-property anchor (approved exact-intent anchor
// "selling an inherited property in Allentown PA"), appended after the
// deploy-1 probate bridge at the end of problemDescription.
async function opSituationAnchor() {
  const doc = await client.fetch(
    `*[_type == "situation" && slug.current == "inherited-property"][0]{ _id, problemDescription }`)
  if (!doc?._id) return console.log('ERROR op2: inherited-property situation doc not found')
  if (!Array.isArray(doc.problemDescription) || doc.problemDescription.length === 0)
    return console.log('ERROR op2: problemDescription empty — refusing to write')
  if (fieldHasHref(doc.problemDescription, BLOG))
    return console.log('VERIFIED-PRESENT op2: situation already links to the inherited blog')

  const block = buildBlock([
    { text: 'If the property you inherited is in the Lehigh Valley, our guide to ' },
    { text: 'selling an inherited property in Allentown PA', href: BLOG },
    { text: ' walks through the local process step by step — probate, taxes, and your sale options.' },
  ])

  console.log('op2: append anchor block to inherited-property problemDescription')
  if (!WRITE) return console.log('DRY-RUN op2: would write (pass --yes)')
  await client.patch(doc._id)
    .setIfMissing({ problemDescription: [] })
    .append('problemDescription', [block])
    .commit()
  console.log('WRITTEN op2: situations/inherited-property anchor')
}

// Ops 3–6 — ensure-links that deploy 1 already created. If present: verify and
// skip. If somehow missing: append with the approved anchor (self-healing).
async function ensureLink(op, type, slug, field, href, segments) {
  const doc = await client.fetch(
    `*[_type == $type && slug.current == $slug][0]{ _id, "field": ${field} }`,
    { type, slug })
  if (!doc?._id) return console.log(`ERROR ${op}: ${type}/${slug} not found`)
  if (fieldHasHref(doc.field, href))
    return console.log(`VERIFIED-PRESENT ${op}: ${type}/${slug} already links ${href}`)
  console.log(`${op}: link MISSING from ${type}/${slug} — appending`)
  if (!WRITE) return console.log(`DRY-RUN ${op}: would write (pass --yes)`)
  await client.patch(doc._id)
    .setIfMissing({ [field]: [] })
    .append(field, [buildBlock(segments)])
    .commit()
  console.log(`WRITTEN ${op}: ${type}/${slug} -> ${href}`)
}

async function main() {
  console.log(`=== Deploy B (${WRITE ? 'WRITE' : 'dry-run'}) ===`)
  await opAllentownCallout()
  await opSituationAnchor()
  await ensureLink('op3', 'blogPost', 'sell-deceased-parents-house-without-probate-pennsylvania', 'content', BLOG, [
    { text: 'Inherited property in the Lehigh Valley? Read our step-by-step guide to ' },
    { text: 'sell an inherited house in Allentown', href: BLOG },
    { text: '.' },
  ])
  await ensureLink('op4', 'blogPost', 'documents-required-selling-inherited-property-pennsylvania', 'content', BLOG, [
    { text: 'For Lehigh County specifics, see our guide to ' },
    { text: 'sell an inherited house in Allentown', href: BLOG },
    { text: '.' },
  ])
  await ensureLink('op5', 'blogPost', 'sell-inherited-house-allentown-pa', 'content', '/locations/allentown', [
    { text: 'Ready to talk numbers? ' },
    { text: 'Sell your Allentown house fast for cash', href: '/locations/allentown' },
    { text: ' — a fair offer in 24 hours, close on your timeline.' },
  ])
  await ensureLink('op6', 'blogPost', 'sell-inherited-house-allentown-pa', 'content', PROBATE, [
    { text: 'Not sure whether you need probate at all? Start with ' },
    { text: 'selling a house without probate in Pennsylvania', href: PROBATE },
    { text: '.' },
  ])
  console.log('=== Deploy B done ===')
}

main().catch(e => { console.log('ERROR fatal:', e.message); process.exit(1) })
