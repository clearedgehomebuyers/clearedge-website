/**
 * Read-only content-integrity reconnaissance for the September 2026 autumn sprint.
 *
 * Reports exact Sanity baselines for the current opportunity pages and flags
 * duplicate FAQ questions or unusually repeated Portable Text links. It never
 * mutates Sanity.
 */
import { createClient } from '@sanity/client'
import { createHash } from 'node:crypto'
import dotenv from 'dotenv'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(scriptDir, '../.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-01-02',
  useCdn: false,
})

function bodyFor(doc) {
  if (doc._type === 'blogPost') return doc.content || []
  if (doc._type === 'location') return doc.enhancedContent || doc.problemStatement || []
  return doc.problemDescription || []
}

function hrefs(blocks) {
  return (blocks || []).flatMap((block) =>
    (block?.markDefs || [])
      .map((definition) => definition?.href)
      .filter((href) => typeof href === 'string'),
  )
}

function normalized(value) {
  return String(value || '').trim().toLocaleLowerCase('en-US').replace(/\s+/g, ' ')
}

function blockText(block) {
  return (block?.children || []).map((child) => child?.text || '').join('')
}

function rawDigest(value) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex')
}

const docs = await client.fetch(`*[_type in ["blogPost", "location", "situation"]]{
  _id,
  _rev,
  _type,
  title,
  city,
  "slug": slug.current,
  metaTitle,
  metaDescription,
  heroHeadline,
  heroSubheadline,
  content,
  enhancedContent,
  problemStatement,
  problemDescription,
  faqs,
  caseStudies,
  caseStudiesDisclaimer,
  "relatedLocations": relatedLocations[]->{city, "slug": slug.current},
  "relatedSituations": relatedSituations[]->{title, "slug": slug.current}
}`)

for (const target of [
  { type: 'situation', slug: 'divorce' },
  { type: 'blogPost', slug: 'cash-home-buyers-berks-county' },
  { type: 'location', slug: 'reading' },
]) {
  const doc = docs.find((item) => item._type === target.type && item.slug === target.slug)
  console.log(`\n=== ${target.type}/${target.slug} ===`)
  if (!doc) {
    console.log('NOT FOUND')
    continue
  }
  const links = hrefs(bodyFor(doc))
  const linkCounts = Object.fromEntries(
    [...new Set(links)].sort().map((href) => [href, links.filter((item) => item === href).length]),
  )
  console.log(JSON.stringify({
    _id: doc._id,
    _rev: doc._rev,
    title: doc.title,
    city: doc.city,
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
    heroHeadline: doc.heroHeadline,
    heroSubheadline: doc.heroSubheadline,
    faqCount: (doc.faqs || []).length,
    faqSha256: rawDigest(doc.faqs || []),
    faqs: (doc.faqs || []).map((faq) => ({ key: faq._key, question: faq.question, answer: faq.answer })),
    relatedLocations: doc.relatedLocations,
    relatedSituations: doc.relatedSituations,
    bodyLinkCounts: linkCounts,
  }, null, 2))

  if (target.type === 'location' && target.slug === 'reading') {
    console.log('Enhanced content blocks:')
    for (const [index, block] of bodyFor(doc).entries()) {
      console.log(JSON.stringify({
        index,
        key: block?._key,
        style: block?.style,
        text: blockText(block),
        markDefs: block?.markDefs || [],
        children: block?.children || [],
      }))
    }
  }
}

console.log('\n=== DUPLICATE FAQ QUESTIONS ===')
let duplicateFaqSets = 0
for (const doc of docs) {
  const seen = new Map()
  for (const faq of doc.faqs || []) {
    const question = normalized(faq?.question)
    if (!question) continue
    const prior = seen.get(question) || []
    prior.push(faq?._key || '(no key)')
    seen.set(question, prior)
  }
  for (const [question, keys] of seen) {
    if (keys.length < 2) continue
    duplicateFaqSets += 1
    console.log(`${doc._type}/${doc.slug}: ${JSON.stringify(question)} keys=${keys.join(',')}`)
  }
}
if (!duplicateFaqSets) console.log('none')

console.log('\n=== LOCATION CASE-STUDY LABELING ===')
for (const doc of docs.filter((item) => item._type === 'location' && (item.caseStudies || []).length)) {
  console.log(`${doc.slug}: studies=${doc.caseStudies.length} disclaimer=${JSON.stringify(doc.caseStudiesDisclaimer || '')}`)
}

console.log('\n=== REPEATED BODY LINKS (4+ occurrences) ===')
let repeatedLinkSets = 0
for (const doc of docs) {
  const links = hrefs(bodyFor(doc))
  for (const href of [...new Set(links)].sort()) {
    const count = links.filter((item) => item === href).length
    if (count < 4) continue
    repeatedLinkSets += 1
    console.log(`${doc._type}/${doc.slug}: ${count} x ${href}`)
  }
}
if (!repeatedLinkSets) console.log('none')

console.log('\nDone. Nothing was written.')
