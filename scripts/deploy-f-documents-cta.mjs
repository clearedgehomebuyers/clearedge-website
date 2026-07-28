// Deploy F — single-page mid-article CTA test on the documents blog.
//
// WHY THIS AND NOT THE BLOG-WIDE ROLLOUT: the rollout stays PARKED. Its
// re-entry criteria are "the probate CTA converts >= 1 lead, OR blog engagement
// normalizes to >= 60s sessions". The engagement criterion is now met (probate
// 67s, documents 212s) and the criteria are joined by "or", but Tyler's call
// (2026-07-28) is that engagement alone does not unpark a rollout: criterion 1,
// a converting CTA, is the one that matters and is still unmet. So instead of
// unparking, this ships ONE more CTA on the site's engagement leader to give
// criterion 1 a second and better-qualified chance to fire.
//
// TARGET: /blog/documents-required-selling-inherited-property-pennsylvania
// 212s average engaged session (site leader), in the inherited cluster, and
// already the documents-authority page for the Deploy C Reading cluster.
//
// PLACEMENT LOGIC — mirrors the probate CTA rather than guessing:
//   probate blog: 159 content blocks, ctaBlock at index 50 (~31%), sitting
//   immediately BEFORE an h2 and immediately AFTER the passage that lands the
//   time-cost pain ("This typically takes 2-4 months minimum before you can
//   even list the property"). Pain established -> CTA -> next actionable
//   section.
//   documents blog: 182 content blocks. The identical pain beat is blocks
//   99-101 ("Total time before you can sell (probate path): 2-4 months
//   minimum" ... "save your heirs months of waiting"), and the next h2 is
//   "Where to File: County-by-County Guide for Eastern PA" (_key 8rgppc80,
//   index 102, ~56%). So the CTA goes immediately before 8rgppc80.
//   Index 62 (before the Non-Probate Path h2, ~34%) was the closer match on
//   raw depth and was rejected: it follows a checklist, not the time-cost
//   realization, and the placement logic is the thing being replicated.
//
// The insert is KEY-ADDRESSED (insert before content[_key=="8rgppc80"]), not
// index-addressed, so it stays correct if blocks shift above it.
//
// COPY ACCURACY: the four-document list is taken verbatim from this page's own
// "What Documents We Need" section (content[160]): death certificate, Letters
// Testamentary or Letters of Administration, photo ID, signed purchase
// agreement; "we handle" = title search, title insurance, closing, paperwork
// (content[161]). The 24-hour offer and 7-30 day close mirror the probate CTA.
//
// Dry-run by default; --yes to write. Guarded: refuses to write if the anchor
// h2 is missing/renamed, or if any ctaBlock already exists on the page.
// Already-inserted => VERIFIED-PRESENT. Grep-stable output:
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

const SLUG = 'documents-required-selling-inherited-property-pennsylvania'
const ANCHOR_KEY = '8rgppc80'
const ANCHOR_TEXT = 'Where to File: County-by-County Guide for Eastern PA'
const CTA_KEY = 'ctaDocsMidarticle'
const CTA_LOCATION = 'documents_blog_midarticle'

const CTA_BLOCK = {
  _type: 'ctaBlock',
  _key: CTA_KEY,
  heading: 'Buried in inherited-property paperwork?',
  body:
    'We’ve helped dozens of PA families through inherited-property sales. From you we need four documents — death certificate, Letters Testamentary or Letters of Administration, photo ID, and a signed agreement — and we handle the title search, title insurance, and closing. Get a cash offer within 24 hours: no repairs, no agent fees, close in as little as 7–30 days.',
  buttonText: 'Get My Cash Offer',
  ctaLocation: CTA_LOCATION,
}

const textOf = (b) => (b?.children || []).map((c) => c.text || '').join('')

console.log(`=== Deploy F documents-blog mid-article CTA (${WRITE ? 'WRITE' : 'dry-run'}) ===`)

const doc = await client.fetch(
  `*[_type=="blogPost" && slug.current==$slug][0]{_id, content}`,
  { slug: SLUG }
)

if (!doc) {
  console.log(`ERROR docsCta: blogPost/${SLUG} not found`)
  process.exit(1)
}

const existing = doc.content.filter((b) => b._type === 'ctaBlock')

if (existing.length > 1) {
  console.log(`ERROR docsCta: ${existing.length} ctaBlocks already on the page — refusing to write blind`)
  process.exit(1)
}

if (existing.length === 1) {
  const e = existing[0]
  if (e.ctaLocation === CTA_LOCATION) {
    console.log(
      `VERIFIED-PRESENT docsCta: ctaBlock already on ${SLUG} — ctaLocation=${e.ctaLocation}, _key=${e._key}`
    )
    process.exit(0)
  }
  console.log(
    `ERROR docsCta: a different ctaBlock is already on the page (ctaLocation=${JSON.stringify(e.ctaLocation)}, _key=${e._key}) — refusing to add a second`
  )
  process.exit(1)
}

const anchorIdx = doc.content.findIndex((b) => b._key === ANCHOR_KEY)
if (anchorIdx === -1) {
  console.log(`ERROR docsCta: anchor block _key=${ANCHOR_KEY} not found — page restructured, re-derive placement`)
  process.exit(1)
}

const anchor = doc.content[anchorIdx]
if (anchor.style !== 'h2' || textOf(anchor).trim() !== ANCHOR_TEXT) {
  console.log(
    `ERROR docsCta: anchor _key=${ANCHOR_KEY} is not the expected h2 (style=${anchor.style}, text=${JSON.stringify(textOf(anchor).slice(0, 80))}) — refusing to write blind`
  )
  process.exit(1)
}

console.log(
  `docsCta: inserting ctaBlock ${CTA_LOCATION} before content[_key=="${ANCHOR_KEY}"] (currently index ${anchorIdx} of ${doc.content.length})`
)

if (!WRITE) {
  console.log('DRY-RUN docsCta: would insert (pass --yes)')
  console.log('=== Deploy F done ===')
  process.exit(0)
}

await client
  .patch(doc._id)
  .insert('before', `content[_key=="${ANCHOR_KEY}"]`, [CTA_BLOCK])
  .commit()

console.log(`WRITTEN docsCta: ctaBlock ${CTA_LOCATION} inserted before ${ANCHOR_KEY}`)
console.log('=== Deploy F done ===')
