// Deploy H — the five remaining claim-sweep hits, across three documents.
//
// SCOPE: everything the 2026-07-28 claim-scoped sweep left open after Deploy G
// (seo-audits/claim-sweep-2026-07-28.txt). Approved for correction by Tyler
// 2026-07-28. Three documents, five spans, one patch per document.
//
// STATUTES RE-VERIFIED INDEPENDENTLY 2026-07-28 — this pass does NOT inherit
// Deploy B/E's verification. palegis.us will not render statute text to an
// automated fetch (JS-driven), but the legacy legis.state.pa.us HTM path does:
//   20 Pa.C.S. §3351 — https://www.legis.state.pa.us/WU01/LI/LI/CT/HTM/20/00.033.051.000..HTM
//     PR may sell "real property not specifically devised"; specifically
//     devised real property is sold "with the joinder of the specific devisee."
//   20 Pa.C.S. §3102 — https://www.legis.state.pa.us/WU01/LI/LI/CT/HTM/20/00.031.002.000..HTM
//     property "(exclusive of real estate ...)" of "a gross value not exceeding
//     $50,000". Real estate is excluded from the small-estate route.
//
// THE FIVE:
//  1 heirsAllentown  PRIORITY. /blog/sell-inherited-house-allentown-pa — "Pennsylvania
//    law requires all heirs to agree on the sale, or the executor needs court
//    authority to sell over an heir's objection." Flatly false under §3351, and
//    this is the Allentown canonical owner sitting at position 1.7 — the site's
//    best-positioned page. Corrected AFFIRMATIVELY per Tyler: state where the
//    power actually comes from (the statute) plus the devisee-joinder carve-out,
//    rather than deleting the sentence and leaving a gap.
//  2 heirsProbate    probate blog block85 — "everyone typically needs to agree".
//    Softened by "typically" but the same error; same affirmative treatment.
//  3 todDesignations /blog/sell-inherited-house-allentown-pa — "Same goes for assets
//    with transfer-on-death designations", inside a passage about a house.
//    TOD designations are real for securities/accounts, so this gets a CLARIFIER
//    (they exist, they do not reach real estate) rather than removal.
//  4 heirsReading    Reading page — "Every heir with an ownership interest signs."
//    True once the house is distributed, false while it is still in the estate.
//    Gets a scope qualifier.
//  5 smallEstateReading  Reading page — "including small-estate shortcuts and what
//    happens when the house is the only major asset", which can be read as the
//    small-estate route transferring a house. Gets a scope qualifier (§3102).
//
// READING-PAGE SAFETY (verified 2026-07-28, page is 4 days old and mid-indexing):
// both Reading edits are ordinary body blocks — content[9] and content[28] of 43,
// style "normal". They CANNOT touch (a) the answer-first box, which is a hardcoded
// Record in src/app/blog/[slug]/page.tsx keyed by slug, not Sanity content;
// (b) the title/metaTitle; or (c) any JSON-LD — Article schema is built from
// title/metaDescription/excerpt/image/dates only, the page has no faqs so no
// FAQPage is emitted, and LocalBusiness comes from a static slug list. Only the
// leading text span of each block is rewritten, so the link spans and their marks
// survive untouched.
//
// Dry-run by default; --yes to write. Per-span baseline guard; aborts before
// writing anything if any baseline drifted. Grep-stable output:
// WRITTEN / VERIFIED-PRESENT / DRY-RUN / ERROR.

import { createClient } from '@sanity/client'
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

const FIXES = [
  {
    op: 'heirsAllentown',
    slug: 'sell-inherited-house-allentown-pa',
    block: 'kmn66d63c5q',
    span: 'kmn66d63c5p',
    label: 'inh-allentown — "PA law requires all heirs to agree" (false under 20 Pa.C.S. 3351)',
    find: "Pennsylvania law requires all heirs to agree on the sale, or the executor needs court authority to sell over an heir's objection. If you're in a situation where siblings can't agree, here's what usually happens:",
    replace:
      "Under 20 Pa.C.S. §3351, the estate's personal representative has statutory authority to sell real estate that was not specifically left to a named beneficiary in the will. That power comes from the statute itself — not from the heirs' consent, and not from a separate court order. Real property that was specifically devised to someone is sold with that devisee joining in the sale. Once the house has been distributed out of the estate, every co-owner signs. If you're in a situation where siblings can't agree, here's what usually happens:",
  },
  {
    op: 'todDesignations',
    slug: 'sell-inherited-house-allentown-pa',
    block: 'kmn66d63c14',
    span: 'kmn66d63c10',
    label: 'inh-allentown — "transfer-on-death designations" in a real-estate passage (clarifier)',
    find: 'If the house was held in a revocable living trust, or if it was owned jointly with right of survivorship (common with married couples), the property transfers automatically. No court involvement needed. Same goes for assets with transfer-on-death designations. We wrote a separate guide covering ',
    replace:
      'If the house was held in a revocable living trust, or if it was owned jointly with right of survivorship (common with married couples), the property transfers automatically. No court involvement needed. Transfer-on-death designations work the same way for securities and bank accounts — but they do not reach real estate in Pennsylvania, which has no transfer-on-death deed for a house. We wrote a separate guide covering ',
  },
  {
    op: 'heirsProbate',
    slug: 'sell-deceased-parents-house-without-probate-pennsylvania',
    block: 'block85',
    span: 'span177041669231491',
    label: 'probate blog block85 — "everyone typically needs to agree"',
    find: 'If multiple siblings inherited the house, everyone typically needs to agree on the sale.',
    replace:
      'If multiple siblings inherited the house, who actually has to agree depends on where the estate stands. Under 20 Pa.C.S. §3351 the personal representative can sell estate real estate that was not specifically devised without every sibling signing; property that was specifically devised is sold with that devisee joining. Once the house has been distributed out of the estate, every co-owner signs.',
  },
  {
    op: 'heirsReading',
    slug: 'sell-inherited-house-reading-pa',
    block: 'rdgms1t2gqh23',
    span: 'rdgms1t2gqh22',
    label: 'Reading page — "Every heir with an ownership interest signs" (scope qualifier)',
    find: 'Every heir with an ownership interest signs. Get the conversation about selling done early — disagreements between heirs are the single biggest source of delay, and unresolved ones end up in Orphans’ Court. A cash sale with a flexible closing date is often the compromise everyone can live with.',
    replace:
      'Once the house has been distributed out of the estate, every co-owner with an ownership interest signs. While it is still in the estate, 20 Pa.C.S. §3351 lets the personal representative sell real estate that was not specifically devised without every heir signing, and specifically devised property is sold with that devisee joining. Either way, get the conversation about selling done early — disagreements between heirs are the single biggest source of delay, and unresolved ones end up in Orphans’ Court. A cash sale with a flexible closing date is often the compromise everyone can live with.',
  },
  {
    op: 'smallEstateReading',
    slug: 'sell-inherited-house-reading-pa',
    block: 'rdgms1t2gqgu',
    span: 'rdgms1t2gqgq',
    label: 'Reading page — "small-estate shortcuts" readable as transferring a house (scope qualifier)',
    find: 'Not always. If the deed was held jointly with right of survivorship, the house passed automatically to the surviving owner. Property in a living trust is sold by the trustee under the trust’s terms. In those cases you can often sell without opening an estate. For the full decision tree — including small-estate shortcuts and what happens when the house is the only major asset — see our guide to ',
    replace:
      'Not always. If the deed was held jointly with right of survivorship, the house passed automatically to the surviving owner. Property in a living trust is sold by the trustee under the trust’s terms. In those cases you can often sell without opening an estate. Pennsylvania’s small-estate shortcut is not one of those cases — under 20 Pa.C.S. §3102 it reaches personal property of a gross value not exceeding $50,000, exclusive of real estate, so it cannot transfer a house. For the full decision tree — including where the small-estate route does and does not help, and what happens when the house is the only major asset — see our guide to ',
  },
]

console.log(`=== Deploy H cluster claim corrections (${WRITE ? 'WRITE' : 'dry-run'}) ===`)

const slugs = [...new Set(FIXES.map((f) => f.slug))]
const docs = {}
for (const slug of slugs) {
  docs[slug] = await client.fetch(
    `*[_type=="blogPost" && slug.current==$slug][0]{_id, content}`,
    { slug }
  )
  if (!docs[slug]) {
    console.log(`ERROR: blogPost/${slug} not found`)
    process.exit(1)
  }
}

const patches = {}
let pending = 0
let verified = 0
let errors = 0

for (const fix of FIXES) {
  const doc = docs[fix.slug]
  const b = (doc.content || []).find((x) => x._key === fix.block)
  const s = b ? (b.children || []).find((x) => x._key === fix.span) : undefined
  const path = `content[_key=="${fix.block}"].children[_key=="${fix.span}"].text`

  if (!s) {
    console.log(`ERROR ${fix.op}: path not found — ${fix.slug} ${path}`)
    errors++
  } else if (s.text === fix.replace) {
    console.log(`VERIFIED-PRESENT ${fix.op}: already corrected — ${fix.label}`)
    verified++
  } else if (s.text === fix.find) {
    console.log(`${fix.op}: correcting — ${fix.label}`)
    ;(patches[fix.slug] = patches[fix.slug] || {})[path] = fix.replace
    pending++
  } else {
    console.log(`ERROR ${fix.op}: baseline mismatch at ${fix.slug} ${path} — refusing to write blind`)
    console.log(`  expected: ${JSON.stringify(fix.find.slice(0, 120))}`)
    console.log(`  found   : ${JSON.stringify(String(s.text).slice(0, 120))}`)
    errors++
  }
}

if (errors > 0) {
  console.log(`=== Deploy H ABORTED: ${errors} error(s); nothing written ===`)
  process.exit(1)
}

if (pending === 0) {
  console.log(`=== Deploy H done (all ${verified} corrections already present) ===`)
  process.exit(0)
}

if (!WRITE) {
  console.log(`DRY-RUN: would correct ${pending} span(s) across ${Object.keys(patches).length} document(s) (pass --yes)`)
  console.log('=== Deploy H done ===')
  process.exit(0)
}

for (const [slug, patch] of Object.entries(patches)) {
  await client.patch(docs[slug]._id).set(patch).commit()
  console.log(`WRITTEN ${slug}: ${Object.keys(patch).length} correction(s) in one patch`)
}
console.log('=== Deploy H done ===')
