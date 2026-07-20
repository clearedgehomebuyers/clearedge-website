// Deploy B rider (Sanity side) — factual corrections to the probate blog
// (_id UiZb3IwptsI2jxbXRLm7AN, slug sell-deceased-parents-house-without-probate-pennsylvania).
//
// The live "3. Transfer on Death (TOD) Deed" section states PA allows TOD deeds.
// It does not: PA never adopted URPTODA; Title 20's TOD provisions cover
// securities (Ch. 64) and multiple-party accounts (Ch. 63) only; HB 2124
// (URPTODA adoption) was laid on the table Feb 2026, not enacted. The
// small-estate process (20 Pa.C.S. s.3102) is personal-property-only and
// expressly excludes real estate. All claims verified on legis.state.pa.us /
// palegis.us 2026-07-20, adversarially re-fetched (5/5 CONFIRMED).
//
// Dry-run by default; --yes to write. Baseline-guarded: each op verifies the
// known-bad current text before replacing; already-corrected => VERIFIED-PRESENT;
// unexpected text => ERROR (refuses to write blind). Single atomic patch.
// Grep-stable output: WRITTEN / VERIFIED-PRESENT / DRY-RUN / ERROR.

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
const SLUG = 'sell-deceased-parents-house-without-probate-pennsylvania'
const key = () => randomBytes(6).toString('hex')

const blockText = b => (b.children || []).map(c => c.text || '').join('')
const textBlock = (old, style, text) => ({
  ...old, style,
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
  markDefs: [],
})

// Full-block replacements: _key -> { oldStart (baseline guard), style, text }
const REPLACEMENTS = {
  block34: {
    oldStart: '3. Transfer on Death (TOD) Deed', style: 'h3',
    text: '3. What About Transfer-on-Death (TOD) Deeds?',
  },
  block35: {
    oldStart: 'Pennsylvania allows Transfer on Death deeds.', style: 'normal',
    text: 'Pennsylvania does not offer transfer-on-death deeds for real estate. The legislature has never adopted the Uniform Real Property Transfer on Death Act — Title 20’s transfer-on-death provisions cover securities and bank accounts, not houses.',
  },
  block36: {
    oldStart: 'If your parent filed one, the house transfers directly', style: 'normal',
    text: 'If you’ve read about TOD deeds online, that advice comes from one of the 20-plus states that allow them. In Pennsylvania, a house passes outside probate only through the two options above — joint ownership with right of survivorship or a living trust.',
  },
  block37: {
    oldStart: 'Just record the death certificate with the county', style: 'normal',
    text: 'A bill to adopt TOD deeds has been introduced in Harrisburg but has not become law. Unless that changes, a house titled solely in your parent’s name goes through probate — here’s how that works.',
  },
  block39: {
    oldStart: 'If your parent’s entire estate is worth less than $50,000', style: 'normal',
    text: 'If your parent’s personal property — bank accounts, vehicles, belongings — has a gross value of $50,000 or less, Pennsylvania offers a simplified small-estate process (20 Pa.C.S. §3102). It covers personal property only.',
  },
  block40: {
    oldStart: 'But here’s the catch — real estate usually still needs', style: 'normal',
    text: 'The house itself can never pass through the small-estate process — real estate is expressly excluded from it. The house goes through probate unless it was jointly owned with right of survivorship or held in a living trust.',
  },
}

// In-place substring edits: _key -> { find, replace }
const SUBSTITUTIONS = {
  block42: {
    find: 'with no TOD deed, no trust, and no joint ownership',
    replace: 'with no trust and no joint ownership',
  },
  block143: {
    find: 'in a trust, had a TOD deed, or was jointly owned with right of survivorship',
    replace: 'in a trust or was jointly owned with right of survivorship',
  },
}

// Curly/straight apostrophe tolerance for baseline matching
const norm = s => s.replace(/[‘’]/g, "'").replace(/\s+/g, ' ')
const startsWith = (a, b) => norm(a).startsWith(norm(b).slice(0, 40))

async function main() {
  console.log(`=== Deploy B Sanity TOD fix (${WRITE ? 'WRITE' : 'dry-run'}) ===`)
  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{ _id, content }`, { slug: SLUG })
  if (!post?._id) return console.log('ERROR: probate blog post not found')

  const content = [...post.content]
  const byKey = new Map(content.map((b, i) => [b._key, i]))
  let pending = 0

  for (const [k, spec] of Object.entries(REPLACEMENTS)) {
    const i = byKey.get(k)
    if (i === undefined) { console.log(`ERROR ${k}: block not found`); continue }
    const cur = blockText(content[i])
    if (norm(cur) === norm(spec.text)) { console.log(`VERIFIED-PRESENT ${k}: already corrected`); continue }
    if (!startsWith(cur, spec.oldStart)) {
      console.log(`ERROR ${k}: baseline mismatch — current text starts "${cur.slice(0, 60)}" (expected "${spec.oldStart.slice(0, 40)}..."); refusing to write blind`)
      continue
    }
    console.log(`${k}: replace "${cur.slice(0, 50)}..." -> "${spec.text.slice(0, 50)}..."`)
    content[i] = textBlock(content[i], spec.style, spec.text)
    pending++
  }

  for (const [k, spec] of Object.entries(SUBSTITUTIONS)) {
    const i = byKey.get(k)
    if (i === undefined) { console.log(`ERROR ${k}: block not found`); continue }
    const cur = blockText(content[i])
    if (cur.includes(spec.replace) && !cur.includes(spec.find)) {
      console.log(`VERIFIED-PRESENT ${k}: already corrected`); continue
    }
    if (!cur.includes(spec.find)) {
      console.log(`ERROR ${k}: baseline substring not found — current: "${cur.slice(0, 80)}"; refusing`)
      continue
    }
    console.log(`${k}: substitute TOD reference out`)
    content[i] = textBlock(content[i], content[i].style || 'normal', cur.replace(spec.find, spec.replace))
    pending++
  }

  if (pending === 0) return console.log('=== Deploy B Sanity TOD fix done (nothing to write) ===')
  if (!WRITE) return console.log(`DRY-RUN: would write ${pending} block corrections in one patch (pass --yes)`)
  await client.patch(post._id).set({ content }).commit()
  console.log(`WRITTEN: ${pending} block corrections applied in one patch`)
  console.log('=== Deploy B Sanity TOD fix done ===')
}

main().catch(e => { console.log('ERROR fatal:', e.message); process.exit(1) })
