// qw8-orphan-links.mjs — audit finding QW8, Batch 3.
//
// /are-cash-home-buyers-legit is the site's one genuine orphan: zero body links
// from any indexed page (header nav only), and still "Discovered - currently not
// indexed" with last_crawled null as of 2026-08-18.
//
// Adds ONE contextual body link from each of the two indexed blog posts the
// audit names. The third required link (Hard Rule 10 wants three from indexed
// pages) is repo-side, in /how-it-works.
//
// Idempotent: skips any document that already links to the target.
// DRY RUN BY DEFAULT — pass --apply to write.
//
//   node scripts/qw8-orphan-links.mjs           # preview
//   node scripts/qw8-orphan-links.mjs --apply   # write

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const APPLY = process.argv.includes('--apply')
const TARGET = '/are-cash-home-buyers-legit'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// One insertion per post. `after` is matched against the START of a block's
// plain text, so the new paragraph lands in a topically-sensible place rather
// than being appended to the end of the article.
const PLAN = [
  {
    slug: 'sell-deceased-parents-house-without-probate-pennsylvania',
    // Matches this post's tail convention: a question, then the linked phrase.
    lead: 'Not sure whether a buyer is trustworthy? ',
    linkText: 'Learn how to spot a legitimate cash home buyer.',
    tail: '',
  },
  {
    slug: 'documents-required-selling-inherited-property-pennsylvania',
    // Matches this post's tail convention: linked title, then an em-dash gloss.
    lead: '',
    linkText: 'Are Cash Home Buyers Legit? 8 Red Flags to Watch',
    tail: ' — How to vet a cash buyer before you sign anything.',
  },
]

let key = 0
const k = (p) => `${p}${Date.now().toString(36)}${key++}`

function linkParagraph({ lead, linkText, tail }) {
  const linkKey = k('lnk')
  return {
    _type: 'block',
    _key: k('blk'),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: linkKey, href: TARGET }],
    children: [
      lead ? { _type: 'span', _key: k('sp'), text: lead, marks: [] } : null,
      { _type: 'span', _key: k('sp'), text: linkText, marks: [linkKey] },
      tail ? { _type: 'span', _key: k('sp'), text: tail, marks: [] } : null,
    ].filter(Boolean),
  }
}

console.log(APPLY ? '=== QW8 — APPLYING ===' : '=== QW8 — DRY RUN (no writes) ===')

for (const item of PLAN) {
  const doc = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{ _id, title, content }`,
    { slug: item.slug },
  )
  if (!doc) {
    console.log(`  SKIP  ${item.slug} — not found`)
    continue
  }
  if (JSON.stringify(doc.content || []).includes(TARGET)) {
    console.log(`  SKIP  ${item.slug} — already links to target`)
    continue
  }

  const content = Array.isArray(doc.content) ? [...doc.content] : []
  // Insert near the end, but BEFORE any trailing heading block, so the link
  // does not orphan itself under a "Bottom Line" style header.
  let insertAt = content.length
  for (let i = content.length - 1; i >= 0 && i >= content.length - 4; i--) {
    if (content[i]?._type === 'block' && /^h[1-4]$/.test(content[i].style || '')) insertAt = i
  }
  const para = linkParagraph(item)
  content.splice(insertAt, 0, para)

  const preview = item.lead + '[' + item.linkText + '](' + TARGET + ')' + item.tail
  console.log(`  ${APPLY ? 'WRITE' : 'WOULD WRITE'}  ${item.slug}`)
  console.log(`     at block index ${insertAt} of ${content.length - 1}`)
  console.log(`     ${preview}`)

  if (APPLY) {
    await client.patch(doc._id).set({ content }).commit()
    console.log('     committed')
  }
}

console.log(APPLY ? '=== done ===' : '=== dry run complete — re-run with --apply ===')
