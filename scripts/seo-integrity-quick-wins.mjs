// Correct source-integrity and city-page targeting issues found in the
// 2026-09-01 Semrush/GSC/GA4 audit.
//
// DRY RUN BY DEFAULT — pass --apply to write.
//   node scripts/seo-integrity-quick-wins.mjs
//   node scripts/seo-integrity-quick-wins.mjs --apply
//
// SAFETY:
//   * Exact baseline counts/values must match before any write.
//   * One backup covers every affected document before mutation.
//   * All changes commit in one Sanity transaction.
//   * A fresh useCdn:false read-back verifies every old value is gone.
//   * A successful re-run reports SKIP instead of duplicating work.

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync, writeFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local'), quiet: true })

const APPLY = process.argv.includes('--apply')

if (APPLY && !process.env.SANITY_API_TOKEN) {
  console.error('ABORT: SANITY_API_TOKEN is required with --apply.')
  process.exit(2)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: APPLY ? process.env.SANITY_API_TOKEN : undefined,
  useCdn: false,
})

const URLS = {
  oldMinePortal: 'https://www.pcrp.state.pa.us/',
  oldMineMap: 'https://www.pamsi.org',
  mineInsurance: 'https://www.pa.gov/services/dep/apply-for-department-of-environmental-protection-mine-subsidence-insurance',
  mineMaps: 'https://www.pa.gov/agencies/dep/programs-and-services/mining/bureau-of-mining-programs/act-54-yearly-data/maps',
  oldNorthamptonRoot: 'https://www.northamptoncounty.org/',
  oldNorthamptonTax: 'https://www.northamptoncounty.org/FISCAL/Pages/Tax-Claim-Bureau.aspx',
  northamptonTax: 'https://norcopa.gov/pay-my-bill',
  oldWilkesRental: 'https://www.wilkes-barre.city/health-department/pages/residential-property-rental-license-inspection',
  wilkesRental: 'https://www.wilkes-barre.city/257/Residential-Property-Rental-License-Insp',
}

const BLOG_BASELINES = {
  'sell-my-house-fast-dunmore-mine-subsidence': {
    hrefs: {
      [URLS.oldMinePortal]: 47,
      [URLS.oldMineMap]: 2,
    },
  },
  'sell-house-tax-lien-bethlehem-pa': {
    hrefs: {
      [URLS.oldNorthamptonRoot]: 4,
      [URLS.oldNorthamptonTax]: 4,
    },
  },
  'luzerne-county-rental-property-registration-inspection-requirements-2026': {
    hrefs: {
      [URLS.oldWilkesRental]: 4,
    },
  },
}

const LOCATION_CHANGES = {
  easton: {
    heroHeadline: {
      old: 'Sell Your Easton House Without Spending $30K to List It',
      next: 'Cash Home Buyers in',
    },
  },
  reading: {
    heroHeadline: {
      old: 'Sell Your Reading House Without the 5% Transfer Tax',
      next: 'Cash Home Buyers in',
    },
    metaTitle: {
      old: 'Sell Your House Fast in Reading PA | No 5% Transfer Tax | ClearEdge',
      next: 'Cash Home Buyers in Reading PA | Sell As-Is | ClearEdge',
    },
    metaDescription: {
      old: 'Reading’s 5% transfer tax eats into your sale. ClearEdge buys houses as-is for cash — no transfer tax, no repairs, no fees. Fair offer in 24 hours.',
      next: 'Reading’s 5% combined realty transfer tax can affect closing costs. ClearEdge buys houses as-is for cash with no repairs or commissions. Get a fair offer in 24 hours.',
    },
  },
}

const TEXT_CHANGES = {
  'sell-my-house-fast-dunmore-mine-subsidence': [
    {
      old: 'PA DEP has an interactive map (pamsi.org) showing mining risk areas.',
      next: 'PA DEP provides official mine mapping tools that show mining activity and risk information.',
      count: 1,
    },
    {
      old: 'Visit pamsi.org and use the interactive map.',
      next: 'Use PA DEP’s official mine mapping tools to review the area.',
      count: 1,
    },
  ],
  'luzerne-county-rental-property-registration-inspection-requirements-2026': [
    {
      old: 'In Wilkes-Barre alone, failure to obtain a rental inspection and license can hit you with a $500 fine, 30 days imprisonment, or both.',
      next: 'In Wilkes-Barre, failure to obtain a rental inspection and license can result in a $1,000 fine, 30 days imprisonment, or both.',
      count: 1,
    },
    {
      old: 'License Fee: $50 per building',
      next: 'License Fee: $100 per building',
      count: 1,
    },
  ],
}

const blogSlugs = Object.keys(BLOG_BASELINES)
const locationSlugs = Object.keys(LOCATION_CHANGES)

const [blogs, locations] = await Promise.all([
  client.fetch(
    '*[_type == "blogPost" && slug.current in $slugs]{_id, _rev, _type, title, "slug": slug.current, content}',
    { slugs: blogSlugs },
  ),
  client.fetch(
    '*[_type == "location" && slug.current in $slugs]{_id, _rev, _type, city, "slug": slug.current, heroHeadline, metaTitle, metaDescription}',
    { slugs: locationSlugs },
  ),
])

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function blockText(block) {
  return (block.children || []).map((child) => child.text || '').join('')
}

function countHref(content, href) {
  return (content || []).reduce(
    (total, block) => total + (block.markDefs || []).filter((mark) => mark?.href === href).length,
    0,
  )
}

function countText(content, target) {
  return (content || []).reduce(
    (total, block) => total + (blockText(block).split(target).length - 1),
    0,
  )
}

function replaceTextInBlock(block, oldText, newText) {
  let count = 0
  while (true) {
    const children = block.children || []
    const text = blockText(block)
    const start = text.indexOf(oldText)
    if (start === -1) return count

    const end = start + oldText.length
    let cursor = 0
    let startIndex = -1
    let endIndex = -1
    let startOffset = 0
    let endOffset = 0

    for (let index = 0; index < children.length; index++) {
      const length = (children[index].text || '').length
      if (startIndex === -1 && start < cursor + length) {
        startIndex = index
        startOffset = start - cursor
      }
      if (endIndex === -1 && end <= cursor + length) {
        endIndex = index
        endOffset = end - cursor
        break
      }
      cursor += length
    }

    if (startIndex === -1 || endIndex === -1) {
      throw new Error(`Could not map text replacement across Portable Text spans: ${oldText}`)
    }

    if (startIndex === endIndex) {
      const child = children[startIndex]
      child.text = child.text.slice(0, startOffset) + newText + child.text.slice(endOffset)
    } else {
      const first = children[startIndex]
      const last = children[endIndex]
      first.text = first.text.slice(0, startOffset) + newText
      for (let index = startIndex + 1; index < endIndex; index++) children[index].text = ''
      last.text = last.text.slice(endOffset)
      block.children = children.filter((child) => child.text !== '')
    }
    count++
  }
}

function replaceText(content, oldText, newText) {
  let count = 0
  for (const block of content || []) {
    count += replaceTextInBlock(block, oldText, newText)
  }
  return count
}

function replaceHref(content, oldHref, newHref) {
  let count = 0
  for (const block of content || []) {
    for (const mark of block.markDefs || []) {
      if (mark?.href !== oldHref) continue
      mark.href = newHref
      count++
    }
  }
  return count
}

function planMinePortalCleanup(content) {
  let replacedWithInsurance = 0
  let replacedWithMaps = 0
  let removed = 0

  for (const block of content || []) {
    const text = blockText(block)
    const definitions = block.markDefs || []
    const oldDefinitions = definitions.filter((mark) => mark?.href === URLS.oldMinePortal)
    if (!oldDefinitions.length) continue

    for (const mark of oldDefinitions) {
      if (/map|risk area/i.test(text)) {
        mark.href = URLS.mineMaps
        replacedWithMaps++
      } else if (/insurance|claim|coverage|fund|state runs this program/i.test(text)) {
        mark.href = URLS.mineInsurance
        replacedWithInsurance++
      } else {
        for (const child of block.children || []) {
          child.marks = (child.marks || []).filter((key) => key !== mark._key)
        }
        block.markDefs = (block.markDefs || []).filter((candidate) => candidate._key !== mark._key)
        removed++
      }
    }
  }

  return { replacedWithInsurance, replacedWithMaps, removed }
}

const aborts = []
const plans = []

if (blogs.length !== blogSlugs.length) {
  aborts.push(`expected ${blogSlugs.length} blog posts, fetched ${blogs.length}`)
}
if (locations.length !== locationSlugs.length) {
  aborts.push(`expected ${locationSlugs.length} locations, fetched ${locations.length}`)
}

for (const blog of blogs) {
  const baseline = BLOG_BASELINES[blog.slug]
  const content = clone(blog.content || [])
  const actions = []

  for (const [href, expected] of Object.entries(baseline.hrefs)) {
    const current = countHref(blog.content, href)
    if (current !== expected && current !== 0) {
      aborts.push(`${blog.slug}: ${href} count ${current}, expected ${expected} or 0`)
    }
  }

  if (countHref(content, URLS.oldMinePortal) === 47) {
    const result = planMinePortalCleanup(content)
    actions.push(`mine portal: ${result.replacedWithInsurance} insurance, ${result.replacedWithMaps} maps, ${result.removed} removed`)
  }
  if (countHref(content, URLS.oldMineMap) === 2) {
    actions.push(`mine map links replaced: ${replaceHref(content, URLS.oldMineMap, URLS.mineMaps)}`)
  }
  if (countHref(content, URLS.oldNorthamptonRoot) === 4) {
    actions.push(`Northampton root links replaced: ${replaceHref(content, URLS.oldNorthamptonRoot, URLS.northamptonTax)}`)
  }
  if (countHref(content, URLS.oldNorthamptonTax) === 4) {
    actions.push(`Northampton tax links replaced: ${replaceHref(content, URLS.oldNorthamptonTax, URLS.northamptonTax)}`)
  }
  if (countHref(content, URLS.oldWilkesRental) === 4) {
    actions.push(`Wilkes-Barre rental links replaced: ${replaceHref(content, URLS.oldWilkesRental, URLS.wilkesRental)}`)
  }

  for (const change of TEXT_CHANGES[blog.slug] || []) {
    const oldCount = countText(blog.content, change.old)
    const nextCount = countText(blog.content, change.next)
    if (oldCount === change.count && nextCount === 0) {
      const changed = replaceText(content, change.old, change.next)
      actions.push(`text corrected: ${changed} × ${change.old.slice(0, 54)}…`)
    } else if (oldCount === 0 && nextCount === change.count) {
      // Already applied: idempotent no-op.
    } else {
      aborts.push(`${blog.slug}: text baseline mismatch for "${change.old}" (old ${oldCount}, new ${nextCount})`)
    }
  }

  if (JSON.stringify(content) !== JSON.stringify(blog.content || [])) {
    plans.push({ doc: blog, patch: { content }, actions })
  }
}

for (const location of locations) {
  const changes = LOCATION_CHANGES[location.slug]
  const patch = {}
  const actions = []

  for (const [field, change] of Object.entries(changes)) {
    if (location[field] === change.old) {
      patch[field] = change.next
      actions.push(`${field}: "${change.old}" -> "${change.next}"`)
    } else if (location[field] !== change.next) {
      aborts.push(`${location.slug}.${field}: baseline mismatch; found "${location[field]}"`)
    }
  }

  if (Object.keys(patch).length) plans.push({ doc: location, patch, actions })
}

console.log(`=== SEO INTEGRITY QUICK WINS — ${APPLY ? 'APPLY' : 'DRY RUN (no writes)'} ===`)
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
  console.log('\nSKIP — every correction is already present.')
  process.exit(0)
}

if (!APPLY) {
  console.log(`\nDRY RUN PASSED — ${plans.length} documents would change. Re-run with --apply to write.`)
  process.exit(0)
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const backupDir = resolve(__dirname, '../backups')
const backupPath = resolve(backupDir, `seo-integrity-quick-wins-${stamp}.json`)
mkdirSync(backupDir, { recursive: true })
writeFileSync(backupPath, JSON.stringify(plans.map(({ doc }) => doc), null, 2))
console.log(`\nBackup written: ${backupPath}`)

let transaction = client.transaction()
for (const plan of plans) {
  transaction = transaction.patch(plan.doc._id, (patch) => patch.ifRevisionId(plan.doc._rev).set(plan.patch))
}
await transaction.commit()
console.log(`Committed ${plans.length} documents in one transaction.`)

const [afterBlogs, afterLocations] = await Promise.all([
  client.fetch(
    '*[_type == "blogPost" && slug.current in $slugs]{_id, "slug": slug.current, content}',
    { slugs: blogSlugs },
  ),
  client.fetch(
    '*[_type == "location" && slug.current in $slugs]{_id, "slug": slug.current, heroHeadline, metaTitle, metaDescription}',
    { slugs: locationSlugs },
  ),
])

const verificationErrors = []
for (const blog of afterBlogs) {
  for (const href of Object.keys(BLOG_BASELINES[blog.slug].hrefs)) {
    const remaining = countHref(blog.content, href)
    if (remaining) verificationErrors.push(`${blog.slug}: ${remaining} old links remain for ${href}`)
  }
  for (const change of TEXT_CHANGES[blog.slug] || []) {
    if (countText(blog.content, change.old) !== 0 || countText(blog.content, change.next) !== change.count) {
      verificationErrors.push(`${blog.slug}: text correction failed for "${change.old}"`)
    }
  }
}

for (const location of afterLocations) {
  for (const [field, change] of Object.entries(LOCATION_CHANGES[location.slug])) {
    if (location[field] !== change.next) {
      verificationErrors.push(`${location.slug}.${field}: expected "${change.next}", found "${location[field]}"`)
    }
  }
}

if (verificationErrors.length) {
  console.error('\nREAD-BACK FAILED:')
  for (const problem of verificationErrors) console.error(`  - ${problem}`)
  process.exit(1)
}

console.log('\nREAD-BACK PASSED — old links/claims are gone and all target fields match.')
