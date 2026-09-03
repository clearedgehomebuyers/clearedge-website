// Strengthen commercial-query ownership for the first GSC/Semrush SEO sprint.
//
// DRY RUN BY DEFAULT — pass --apply to write.
//   node scripts/seo-ownership-quick-wins.mjs
//   node scripts/seo-ownership-quick-wins.mjs --apply
//
// SAFETY:
//   * Exact field and Portable Text baselines must match before any write.
//   * One backup covers every affected Sanity document.
//   * All mutations commit in one revision-guarded transaction.
//   * A fresh useCdn:false read-back verifies every intended result.
//   * A successful re-run reports SKIP rather than duplicating changes.

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { mkdirSync, writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(scriptDir, '../.env.local'), quiet: true })

const APPLY = process.argv.includes('--apply')
const KINGSTON_URL = '/locations/kingston'

if (APPLY && !process.env.SANITY_API_TOKEN) {
  console.error('ABORT: SANITY_API_TOKEN is required with --apply.')
  process.exit(2)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-01-02',
  token: APPLY ? process.env.SANITY_API_TOKEN : undefined,
  useCdn: false,
})

const LOCATION_CHANGES = {
  allentown: {
    metaTitle: {
      old: 'Sell Your Allentown House Fast for Cash | ClearEdge',
      next: 'Cash Home Buyers in Allentown PA | Sell As-Is | ClearEdge',
    },
    metaDescription: {
      old: 'Skip the 2.5% transfer tax and 6% commission. ClearEdge buys Allentown houses as-is for cash — no repairs, no fees. Close in 7–30 days. Since 2016.',
      next: 'Need to sell a house fast in Allentown, PA? ClearEdge buys homes as-is for cash with no repairs or commissions. Get a fair offer within 24 hours.',
    },
  },
  bethlehem: {
    metaTitle: {
      old: 'Sell Your Bethlehem House Fast for Cash | ClearEdge',
      next: 'Cash Home Buyers in Bethlehem PA | Sell As-Is | ClearEdge',
    },
    metaDescription: {
      old: 'Sell your Bethlehem house without repairs or realtor fees. ClearEdge buys Northampton County homes as-is for cash. Close in 7–30 days. Since 2016.',
      next: 'Need to sell a house fast in Bethlehem, PA? ClearEdge buys homes as-is for cash with no repairs or commissions. Get a fair offer within 24 hours.',
    },
  },
  kingston: {
    metaTitle: {
      old: 'Sell Your Kingston PA House Fast for Cash | ClearEdge',
      next: 'We Buy Houses in Kingston PA | Local Cash Buyer | ClearEdge',
    },
    metaDescription: {
      old: 'Inherited property or aging home in Kingston? ClearEdge buys Luzerne County houses as-is for cash. No repairs, no fees. Close in 7–30 days. Since 2016.',
      next: 'Need to sell a house fast in Kingston, PA? ClearEdge buys inherited homes and houses needing repairs as-is for cash. Get a fair offer within 24 hours.',
    },
    heroHeadline: {
      old: 'Cash Home Buyers in',
      next: 'We Buy Houses in',
    },
  },
  scranton: {
    metaTitle: {
      old: 'Sell Your Scranton House Fast for Cash | ClearEdge',
      next: 'We Buy Houses in Scranton PA | Local Cash Buyer | ClearEdge',
    },
    metaDescription: {
      old: 'Older home or rental property in Scranton? ClearEdge buys Lackawanna County houses as-is for cash. No repairs, no fees, no commissions. Close in 7–30 days.',
      next: 'Need to sell a house fast in Scranton, PA? ClearEdge buys homes as-is for cash with no repairs or commissions. Get a fair offer within 24 hours.',
    },
    heroHeadline: {
      old: 'Cash Home Buyers in',
      next: 'We Buy Houses in',
    },
  },
}

const BLOG_LINK_CHANGES = [
  {
    slug: 'luzerne-county-rental-property-registration-inspection-requirements-2026',
    blockKey: 'intro3',
    expectedText: 'Or that Pittston requires something completely different from Kingston.',
    anchorText: 'Kingston',
    keyPrefix: 'skrent',
  },
  {
    slug: 'sell-my-house-fast-luzerne-county-pa',
    blockKey: 'block66',
    expectedText: 'Wyoming Valley: Kingston, Edwardsville, Forty Fort, Swoyersville, Luzerne Borough, Plymouth',
    anchorText: 'Kingston',
    keyPrefix: 'skluz',
  },
]

const SITUATION_REFERENCE_CHANGES = {
  'inherited-property': 7,
  'tired-landlord': 6,
}

const locationSlugs = Object.keys(LOCATION_CHANGES)
const blogSlugs = BLOG_LINK_CHANGES.map((change) => change.slug)
const situationSlugs = Object.keys(SITUATION_REFERENCE_CHANGES)

const [locations, blogs, situations, kingston] = await Promise.all([
  client.fetch(
    '*[_type == "location" && slug.current in $slugs]{_id,_rev,_type,city,"slug":slug.current,metaTitle,metaDescription,heroHeadline}',
    { slugs: locationSlugs },
  ),
  client.fetch(
    '*[_type == "blogPost" && slug.current in $slugs]{_id,_rev,_type,title,"slug":slug.current,content}',
    { slugs: blogSlugs },
  ),
  client.fetch(
    '*[_type == "situation" && slug.current in $slugs]{_id,_rev,_type,title,"slug":slug.current,relatedLocations}',
    { slugs: situationSlugs },
  ),
  client.fetch('*[_type == "location" && slug.current == "kingston"][0]{_id,city,"slug":slug.current}'),
])

const clone = (value) => JSON.parse(JSON.stringify(value))
const blockText = (block) => (block?.children || []).map((child) => child.text || '').join('')
const countHref = (content, href) => (content || []).reduce(
  (total, block) => total + (block?.markDefs || []).filter((mark) => mark?.href === href).length,
  0,
)

function linkTextInBlock(block, targetText, href, keyPrefix) {
  const content = blockText(block)
  const targetStart = content.indexOf(targetText)
  if (targetStart === -1 || content.indexOf(targetText, targetStart + targetText.length) !== -1) {
    throw new Error(`Expected exactly one "${targetText}" in block ${block?._key}`)
  }

  const targetEnd = targetStart + targetText.length
  let cursor = 0
  let linked = false
  const children = []

  for (const child of block.children || []) {
    const text = child.text || ''
    const childStart = cursor
    const childEnd = cursor + text.length
    cursor = childEnd

    if (targetStart >= childStart && targetEnd <= childEnd) {
      const localStart = targetStart - childStart
      const localEnd = targetEnd - childStart
      const before = text.slice(0, localStart)
      const anchor = text.slice(localStart, localEnd)
      const after = text.slice(localEnd)

      if (before) children.push({ ...child, _key: `${keyPrefix}a`, text: before })
      children.push({
        ...child,
        _key: `${keyPrefix}b`,
        text: anchor,
        marks: [...(child.marks || []), `${keyPrefix}link`],
      })
      if (after) children.push({ ...child, _key: `${keyPrefix}c`, text: after })
      linked = true
    } else {
      children.push(child)
    }
  }

  if (!linked) throw new Error(`Could not map "${targetText}" to one Portable Text span in block ${block?._key}`)

  block.children = children
  block.markDefs = [
    ...(block.markDefs || []),
    { _key: `${keyPrefix}link`, _type: 'link', href },
  ]
}

const aborts = []
const plans = []

if (locations.length !== locationSlugs.length) aborts.push(`expected ${locationSlugs.length} locations, fetched ${locations.length}`)
if (blogs.length !== blogSlugs.length) aborts.push(`expected ${blogSlugs.length} blogs, fetched ${blogs.length}`)
if (situations.length !== situationSlugs.length) aborts.push(`expected ${situationSlugs.length} situations, fetched ${situations.length}`)
if (!kingston?._id) aborts.push('Kingston location document not found')

for (const location of locations) {
  const patch = {}
  const actions = []

  for (const [field, change] of Object.entries(LOCATION_CHANGES[location.slug])) {
    if (location[field] === change.old) {
      patch[field] = change.next
      actions.push(`${field}: "${change.old}" -> "${change.next}"`)
    } else if (location[field] !== change.next) {
      aborts.push(`${location.slug}.${field}: baseline mismatch; found "${location[field]}"`)
    }
  }

  if (Object.keys(patch).length) plans.push({ doc: location, patch, actions })
}

for (const change of BLOG_LINK_CHANGES) {
  const blog = blogs.find((candidate) => candidate.slug === change.slug)
  if (!blog) continue

  const currentHrefCount = countHref(blog.content, KINGSTON_URL)
  if (currentHrefCount > 0) continue

  const content = clone(blog.content || [])
  const block = content.find((candidate) => candidate?._key === change.blockKey)
  if (!block) {
    aborts.push(`${change.slug}: block ${change.blockKey} not found`)
    continue
  }
  if (blockText(block) !== change.expectedText) {
    aborts.push(`${change.slug}: text baseline mismatch in block ${change.blockKey}`)
    continue
  }

  try {
    linkTextInBlock(block, change.anchorText, KINGSTON_URL, change.keyPrefix)
    plans.push({
      doc: blog,
      patch: { content },
      actions: [`link "${change.anchorText}" in ${change.blockKey} -> ${KINGSTON_URL}`],
    })
  } catch (error) {
    aborts.push(`${change.slug}: ${error.message}`)
  }
}

for (const situation of situations) {
  const references = situation.relatedLocations || []
  const alreadyPresent = references.some((reference) => reference?._ref === kingston?._id)
  if (alreadyPresent) continue

  const expectedCount = SITUATION_REFERENCE_CHANGES[situation.slug]
  if (references.length !== expectedCount) {
    aborts.push(`${situation.slug}.relatedLocations: expected ${expectedCount} references, found ${references.length}`)
    continue
  }

  plans.push({
    doc: situation,
    patch: {
      relatedLocations: [
        ...clone(references),
        { _key: `kingston${situation.slug.replace(/[^a-z]/g, '')}`, _type: 'reference', _ref: kingston._id },
      ],
    },
    actions: ['add Kingston to relatedLocations'],
  })
}

console.log(`=== SEO OWNERSHIP QUICK WINS — ${APPLY ? 'APPLY' : 'DRY RUN (no writes)'} ===`)
for (const plan of plans) {
  console.log(`\n${plan.doc._type}/${plan.doc.slug}`)
  for (const action of plan.actions) console.log(`  - ${action}`)
}

if (aborts.length) {
  console.error('\nABORT — current Sanity data does not match the guarded baseline:')
  for (const problem of aborts) console.error(`  - ${problem}`)
  console.error('Nothing written.')
  process.exit(2)
}

if (!plans.length) {
  console.log('\nSKIP — every ownership correction is already present.')
  process.exit(0)
}

if (!APPLY) {
  console.log(`\nDRY RUN PASSED — ${plans.length} documents would change. Re-run with --apply to write.`)
  process.exit(0)
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const backupDir = resolve(scriptDir, '../backups')
const backupPath = resolve(backupDir, `seo-ownership-quick-wins-${stamp}.json`)
mkdirSync(backupDir, { recursive: true })
writeFileSync(backupPath, JSON.stringify(plans.map(({ doc }) => doc), null, 2))
console.log(`\nBackup written: ${backupPath}`)

let transaction = client.transaction()
for (const plan of plans) {
  transaction = transaction.patch(plan.doc._id, (patch) => patch.ifRevisionId(plan.doc._rev).set(plan.patch))
}
await transaction.commit()
console.log(`Committed ${plans.length} documents in one transaction.`)

const [afterLocations, afterBlogs, afterSituations] = await Promise.all([
  client.fetch(
    '*[_type == "location" && slug.current in $slugs]{"slug":slug.current,metaTitle,metaDescription,heroHeadline}',
    { slugs: locationSlugs },
  ),
  client.fetch(
    '*[_type == "blogPost" && slug.current in $slugs]{"slug":slug.current,content}',
    { slugs: blogSlugs },
  ),
  client.fetch(
    '*[_type == "situation" && slug.current in $slugs]{"slug":slug.current,relatedLocations}',
    { slugs: situationSlugs },
  ),
])

const verificationErrors = []
for (const location of afterLocations) {
  for (const [field, change] of Object.entries(LOCATION_CHANGES[location.slug])) {
    if (location[field] !== change.next) {
      verificationErrors.push(`${location.slug}.${field}: expected "${change.next}", found "${location[field]}"`)
    }
  }
}
for (const blog of afterBlogs) {
  if (countHref(blog.content, KINGSTON_URL) !== 1) {
    verificationErrors.push(`${blog.slug}: expected exactly one ${KINGSTON_URL} link`)
  }
}
for (const situation of afterSituations) {
  const kingstonCount = (situation.relatedLocations || []).filter((reference) => reference?._ref === kingston._id).length
  if (kingstonCount !== 1) verificationErrors.push(`${situation.slug}: expected exactly one Kingston reference`)
}

if (verificationErrors.length) {
  console.error('\nREAD-BACK FAILED:')
  for (const problem of verificationErrors) console.error(`  - ${problem}`)
  process.exit(1)
}

console.log('\nREAD-BACK PASSED — all target fields, links, and references match.')
