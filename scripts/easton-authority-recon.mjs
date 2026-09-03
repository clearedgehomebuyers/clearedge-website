// Read-only reconnaissance for the Easton commercial ownership and rental-
// inspection authority sprint. This script never mutates Sanity.
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { createHash } from 'node:crypto'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(scriptDir, '../.env.local'), quiet: true })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-01-02',
  useCdn: false,
})

const slugs = {
  authority: 'easton-pa-rental-inspection-checklist-2026',
  regional: 'sell-my-house-fast-lehigh-valley',
  location: 'easton',
}

function text(block) {
  return (block?.children || []).map((child) => child?.text || '').join('')
}

function digest(value) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex')
}

function hrefs(content) {
  return (content || []).flatMap((block) =>
    (block?.markDefs || [])
      .filter((mark) => typeof mark?.href === 'string')
      .map((mark) => ({ blockKey: block._key, text: text(block), href: mark.href })),
  )
}

const [authority, regional, location] = await Promise.all([
  client.fetch(
    '*[_type == "blogPost" && slug.current == $slug][0]{_id,_rev,_type,title,"slug":slug.current,metaTitle,metaDescription,excerpt,publishedAt,updatedAt,category,content,faqs,relatedLocations,relatedSituations}',
    { slug: slugs.authority },
  ),
  client.fetch(
    '*[_type == "blogPost" && slug.current == $slug][0]{_id,_rev,_type,title,"slug":slug.current,metaTitle,metaDescription,excerpt,updatedAt,content}',
    { slug: slugs.regional },
  ),
  client.fetch(
    '*[_type == "location" && slug.current == $slug][0]{_id,_rev,_type,city,"slug":slug.current,metaTitle,metaDescription,heroHeadline,heroSubheadline}',
    { slug: slugs.location },
  ),
])

console.log('=== EASTON AUTHORITY GUIDE ===')
console.log(JSON.stringify({
  id: authority?._id,
  rev: authority?._rev,
  title: authority?.title,
  metaTitle: authority?.metaTitle,
  metaDescription: authority?.metaDescription,
  excerpt: authority?.excerpt,
  publishedAt: authority?.publishedAt,
  updatedAt: authority?.updatedAt,
  category: authority?.category,
  blocks: authority?.content?.length || 0,
  contentHash: digest(authority?.content || []),
  faqHash: digest(authority?.faqs || []),
  faqs: authority?.faqs?.length || 0,
  sampleFaq: authority?.faqs?.[0],
  ctas: (authority?.content || []).filter((block) => block?._type === 'ctaBlock'),
  relatedLocations: authority?.relatedLocations,
  relatedSituations: authority?.relatedSituations,
  hrefs: hrefs(authority?.content),
}, null, 2))

console.log('\n=== LEHIGH VALLEY GUIDE ===')
const regionalBlocks = (regional?.content || []).filter((block) => {
  const blockText = text(block)
  return /904-8526|lehighvalley\.org|Tenant problems|Easton landlords/i.test(blockText)
    || (block?.markDefs || []).some((mark) => /lehighvalley\.org|locations\/easton/.test(mark?.href || ''))
})
console.log(JSON.stringify({
  id: regional?._id,
  rev: regional?._rev,
  title: regional?.title,
  metaTitle: regional?.metaTitle,
  metaDescription: regional?.metaDescription,
  excerpt: regional?.excerpt,
  updatedAt: regional?.updatedAt,
  blocks: regional?.content?.length || 0,
  contentHash: digest(regional?.content || []),
  relevantBlocks: regionalBlocks.map((block) => ({
    key: block._key,
    text: text(block),
    markDefs: block.markDefs,
    children: block.children,
  })),
}, null, 2))

console.log('\n=== EASTON LOCATION ===')
console.log(JSON.stringify(location, null, 2))
console.log('\nDone. Nothing was written.')
