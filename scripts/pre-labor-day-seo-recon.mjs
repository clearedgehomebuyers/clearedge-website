// Read-only recon for the September 2026 homepage, inherited-guide, and
// contextual internal-link sprint. This script never mutates Sanity.
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(scriptDir, '../.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET')
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-01-02',
  useCdn: false,
})

function blockText(block) {
  return Array.isArray(block?.children)
    ? block.children.map((child) => child?.text || '').join('')
    : ''
}

function internalHrefs(blocks) {
  const hrefs = []
  for (const block of blocks || []) {
    for (const definition of block?.markDefs || []) {
      if (typeof definition?.href === 'string' && definition.href.startsWith('/')) {
        hrefs.push(definition.href)
      }
    }
  }
  return hrefs
}

const targetBlogSlugs = [
  'documents-required-selling-inherited-property-pennsylvania',
  'sell-my-house-fast-poconos-pa',
  'stop-govos-fines-poconos-house',
  'sell-house-tax-lien-bethlehem-pa',
  'cash-home-buyers-pottsville-pa',
]

const [inheritedGuide, majorRepairs, locations, targetBlogs] = await Promise.all([
  client.fetch(`*[_type == "blogPost" && slug.current == "documents-required-selling-inherited-property-pennsylvania"][0]{
    _id,
    _rev,
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    excerpt,
    publishedAt,
    updatedAt,
    content,
    faqs,
    "relatedLocations": relatedLocations[]->{city, "slug": slug.current},
    "relatedSituations": relatedSituations[]->{title, "slug": slug.current}
  }`),
  client.fetch(`*[_type == "situation" && slug.current == "major-repairs"][0]{
    _id,
    _rev,
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    heroHeadline,
    heroSubheadline,
    problemDescription,
    "relatedLocations": relatedLocations[]->{city, "slug": slug.current}
  }`),
  client.fetch(`*[_type == "location"] | order(city asc){
    _id,
    _rev,
    city,
    "slug": slug.current,
    showSituationCards,
    problemStatement,
    "relatedSituations": relatedSituations[]->{title, "slug": slug.current}
  }`),
  client.fetch(`*[_type == "blogPost" && slug.current in $slugs] | order(slug.current asc){
    _id,
    _rev,
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    content,
    "relatedLocations": relatedLocations[]->{city, "slug": slug.current},
    "relatedSituations": relatedSituations[]->{title, "slug": slug.current}
  }`, { slugs: targetBlogSlugs }),
])

console.log('=== INHERITED DOCUMENTS GUIDE ===')
console.log(JSON.stringify({
  _id: inheritedGuide?._id,
  _rev: inheritedGuide?._rev,
  title: inheritedGuide?.title,
  metaTitle: inheritedGuide?.metaTitle,
  metaDescription: inheritedGuide?.metaDescription,
  excerpt: inheritedGuide?.excerpt,
  publishedAt: inheritedGuide?.publishedAt,
  updatedAt: inheritedGuide?.updatedAt,
  blocks: inheritedGuide?.content?.length || 0,
  ctas: (inheritedGuide?.content || []).filter((block) => block?._type === 'ctaBlock').map((block) => ({
    _key: block._key,
    heading: block.heading,
    buttonText: block.buttonText,
    ctaLocation: block.ctaLocation,
  })),
  internalHrefs: internalHrefs(inheritedGuide?.content),
  relatedLocations: inheritedGuide?.relatedLocations,
  relatedSituations: inheritedGuide?.relatedSituations,
  faqs: inheritedGuide?.faqs?.map((faq) => faq.question),
}, null, 2))

console.log('\nFirst 18 text blocks:')
for (const [index, block] of (inheritedGuide?.content || []).entries()) {
  if (index >= 18) break
  console.log(`[${index}] ${block?._key || '(no-key)'} ${block?.style || block?._type}: ${blockText(block)}`)
}

console.log('\n=== MAJOR REPAIRS SITUATION ===')
console.log(JSON.stringify({
  _id: majorRepairs?._id,
  _rev: majorRepairs?._rev,
  title: majorRepairs?.title,
  metaTitle: majorRepairs?.metaTitle,
  metaDescription: majorRepairs?.metaDescription,
  heroHeadline: majorRepairs?.heroHeadline,
  heroSubheadline: majorRepairs?.heroSubheadline,
  internalHrefs: internalHrefs(majorRepairs?.problemDescription),
  relatedLocations: majorRepairs?.relatedLocations,
}, null, 2))

console.log('\n=== LOCATION -> SITUATION REFERENCES ===')
for (const location of locations) {
  console.log(`/${location.slug} cards=${Boolean(location.showSituationCards)} refs=${(location.relatedSituations || []).map((item) => item.slug).join(', ') || '(none)'} body=${internalHrefs(location.problemStatement).join(', ') || '(none)'}`)
}

console.log('\n=== IMMEDIATE LINK-PAGE CANDIDATES ===')
for (const blog of targetBlogs) {
  console.log(JSON.stringify({
    slug: blog.slug,
    _rev: blog._rev,
    title: blog.title,
    metaTitle: blog.metaTitle,
    metaDescription: blog.metaDescription,
    internalHrefs: internalHrefs(blog.content),
    relatedLocations: blog.relatedLocations,
    relatedSituations: blog.relatedSituations,
  }, null, 2))
}

console.log('\nDone. Nothing was written.')
