/**
 * Guarded Sanity changes for the September 2026 pre-Labor Day SEO sprint.
 *
 * Dry-run by default. Pass --apply to write. Every write is baseline-checked,
 * revision-guarded, backed up, read back from the uncached API, and idempotent.
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(scriptDir, '../.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN')
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-01-02',
  useCdn: false,
})

const APPLY = process.argv.includes('--apply')

const BLOG = {
  slug: 'documents-required-selling-inherited-property-pennsylvania',
  old: {
    metaTitle: 'Inherited Property Documents PA',
    metaDescription: 'Complete checklist of documents needed to sell inherited property in Pennsylvania. Death certificates, Letters Testamentary, tax clearances, and more.',
  },
  next: {
    metaTitle: 'Documents Required to Sell Inherited Property in PA',
    metaDescription: 'Selling inherited property in Pennsylvania? Use this probate document checklist for the deed, death certificate, Letters, title and inheritance tax.',
  },
}

const MAJOR_REPAIRS = {
  slug: 'major-repairs',
  old: {
    metaTitle: 'Sell a House Needing Major Repairs in PA | ClearEdge',
    metaDescription: 'Foundation issues, roof damage, or code violations? ClearEdge buys PA houses in any condition for cash. No repairs needed. Fair offer in 24 hours.',
  },
  next: {
    metaTitle: 'Sell a House With Fire Damage or Major Repairs in PA',
    metaDescription: 'Sell a fire-damaged Pennsylvania house as-is. ClearEdge buys homes with fire, water, roof, foundation or code issues for cash—no repairs or commissions.',
  },
}

const CTA_ANCHOR = {
  key: '8rgppc80',
  style: 'h2',
  text: 'Where to File: County-by-County Guide for Eastern PA',
}

const CTA = {
  _type: 'ctaBlock',
  _key: 'ctaInheritedDocumentsMidarticle',
  heading: 'Need to sell the inherited house too?',
  body: 'If you would rather sell than manage repairs, cleanout, and the full sale process, ClearEdge can review the inherited property as-is. Share the address to request a no-obligation cash offer and compare it with your other options.',
  buttonText: 'Get My No-Obligation Offer',
  ctaLocation: 'documents_blog_midarticle',
}

function blockText(block) {
  return Array.isArray(block?.children)
    ? block.children.map((child) => child?.text || '').join('')
    : ''
}

function exactCta(block) {
  return block?._type === CTA._type
    && block?._key === CTA._key
    && block?.heading === CTA.heading
    && block?.body === CTA.body
    && block?.buttonText === CTA.buttonText
    && block?.ctaLocation === CTA.ctaLocation
}

function planFieldChanges(doc, change, set, actions, aborts) {
  for (const field of ['metaTitle', 'metaDescription']) {
    if (doc[field] === change.next[field]) continue
    if (doc[field] !== change.old[field]) {
      aborts.push(`${change.slug}.${field}: baseline mismatch; found ${JSON.stringify(doc[field])}`)
      continue
    }
    set[field] = change.next[field]
    actions.push(`${field}: ${JSON.stringify(change.old[field])} -> ${JSON.stringify(change.next[field])}`)
  }
}

const [blog, majorRepairs] = await Promise.all([
  client.fetch(
    '*[_type == "blogPost" && slug.current == $slug][0]{_id,_rev,_type,title,"slug":slug.current,metaTitle,metaDescription,updatedAt,content}',
    { slug: BLOG.slug },
  ),
  client.fetch(
    '*[_type == "situation" && slug.current == $slug][0]{_id,_rev,_type,title,"slug":slug.current,metaTitle,metaDescription}',
    { slug: MAJOR_REPAIRS.slug },
  ),
])

const aborts = []
const plans = []

if (!blog) {
  aborts.push(`blogPost/${BLOG.slug}: document not found`)
} else {
  const set = {}
  const actions = []
  planFieldChanges(blog, BLOG, set, actions, aborts)

  const ctas = (blog.content || []).filter((block) => block?._type === 'ctaBlock')
  let insertCta = false
  if (ctas.length === 0) {
    const anchor = (blog.content || []).find((block) => block?._key === CTA_ANCHOR.key)
    if (!anchor || anchor.style !== CTA_ANCHOR.style || blockText(anchor).trim() !== CTA_ANCHOR.text) {
      aborts.push(`${BLOG.slug}.content: CTA anchor is missing or changed`)
    } else {
      insertCta = true
      actions.push(`insert ${CTA.ctaLocation} before content[_key=="${CTA_ANCHOR.key}"]`)
    }
  } else if (ctas.length === 1 && exactCta(ctas[0])) {
    // Already applied.
  } else {
    aborts.push(`${BLOG.slug}.content: found ${ctas.length} unexpected or changed CTA block(s)`)
  }

  if (actions.length) plans.push({ doc: blog, set, actions, insertCta, updateBlogDate: true })
}

if (!majorRepairs) {
  aborts.push(`situation/${MAJOR_REPAIRS.slug}: document not found`)
} else {
  const set = {}
  const actions = []
  planFieldChanges(majorRepairs, MAJOR_REPAIRS, set, actions, aborts)
  if (actions.length) plans.push({ doc: majorRepairs, set, actions, insertCta: false, updateBlogDate: false })
}

console.log(`=== Pre-Labor Day SEO Sanity changes (${APPLY ? 'APPLY' : 'dry-run'}) ===`)
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
  console.log('\nSKIP — every targeted correction is already present.')
  process.exit(0)
}

if (!APPLY) {
  console.log(`\nDRY RUN PASSED — ${plans.length} documents would change. Re-run with --apply to write.`)
  process.exit(0)
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const backupDir = resolve(scriptDir, '../backups')
const backupPath = resolve(backupDir, `pre-labor-day-seo-${stamp}.json`)
mkdirSync(backupDir, { recursive: true })
writeFileSync(backupPath, JSON.stringify(plans.map(({ doc }) => doc), null, 2))
console.log(`\nBackup written: ${backupPath}`)

const updatedAt = new Date().toISOString()
let transaction = client.transaction()
for (const plan of plans) {
  transaction = transaction.patch(plan.doc._id, (patch) => {
    let guarded = patch.ifRevisionId(plan.doc._rev)
    const fields = plan.updateBlogDate ? { ...plan.set, updatedAt } : plan.set
    if (Object.keys(fields).length) guarded = guarded.set(fields)
    if (plan.insertCta) {
      guarded = guarded.insert('before', `content[_key=="${CTA_ANCHOR.key}"]`, [CTA])
    }
    return guarded
  })
}
await transaction.commit()
console.log(`Committed ${plans.length} documents in one revision-guarded transaction.`)

const [afterBlog, afterMajorRepairs] = await Promise.all([
  client.fetch(
    '*[_type == "blogPost" && slug.current == $slug][0]{metaTitle,metaDescription,updatedAt,content}',
    { slug: BLOG.slug },
  ),
  client.fetch(
    '*[_type == "situation" && slug.current == $slug][0]{metaTitle,metaDescription}',
    { slug: MAJOR_REPAIRS.slug },
  ),
])

const verificationErrors = []
for (const field of ['metaTitle', 'metaDescription']) {
  if (afterBlog?.[field] !== BLOG.next[field]) {
    verificationErrors.push(`${BLOG.slug}.${field}: read-back mismatch`)
  }
  if (afterMajorRepairs?.[field] !== MAJOR_REPAIRS.next[field]) {
    verificationErrors.push(`${MAJOR_REPAIRS.slug}.${field}: read-back mismatch`)
  }
}
const matchingCtas = (afterBlog?.content || []).filter((block) => exactCta(block))
if (matchingCtas.length !== 1) {
  verificationErrors.push(`${BLOG.slug}.content: expected exactly one matching CTA, found ${matchingCtas.length}`)
}

if (verificationErrors.length) {
  console.error('\nREAD-BACK FAILED:')
  for (const problem of verificationErrors) console.error(`  - ${problem}`)
  process.exit(1)
}

console.log('\nREAD-BACK PASSED — metadata and CTA match the intended state.')
