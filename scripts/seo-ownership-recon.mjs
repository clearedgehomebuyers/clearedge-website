/**
 * Read-only ground-truth report for the first query-ownership sprint.
 *
 * Run: node scripts/seo-ownership-recon.mjs
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(scriptDir, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-01-02',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const targetSlugs = [
  'scranton',
  'allentown',
  'bethlehem',
  'kingston',
  'easton',
  'reading',
  'stroudsburg',
]

const blockText = (blocks) => (blocks || [])
  .filter((block) => block?._type === 'block')
  .map((block) => (block.children || []).map((child) => child.text || '').join(''))
  .filter(Boolean)

const internalLinks = (blocks) => (blocks || [])
  .flatMap((block) => block?.markDefs || [])
  .map((mark) => mark?.href)
  .filter((href) => typeof href === 'string' && href.startsWith('/'))

const locations = await client.fetch(`
  *[_type == "location" && slug.current in $slugs] | order(city asc) {
    _id,
    _rev,
    city,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    heroHeadline,
    heroSubheadline,
    problemStatement
  }
`, { slugs: targetSlugs })

const blogs = await client.fetch(`
  *[_type == "blogPost" && count(relatedLocations[@->slug.current in $slugs]) > 0] {
    title,
    "slug": slug.current,
    "locations": relatedLocations[]->slug.current,
    "bodyLinks": content[].markDefs[].href
  }
`, { slugs: targetSlugs })

const situations = await client.fetch(`
  *[_type == "situation"] | order(title asc) {
    title,
    "slug": slug.current,
    "locations": relatedLocations[]->{city, "slug": slug.current}
  }
`)

const kingstonLinkCandidates = await client.fetch(`
  *[_type == "blogPost" && slug.current in [
    "sell-my-house-fast-luzerne-county-pa",
    "luzerne-county-rental-property-registration-inspection-requirements-2026"
  ]] | order(slug.current asc) {
    title,
    "slug": slug.current,
    content
  }
`)

console.log('=== PRIORITY LOCATION BASELINES ===')
for (const location of locations) {
  console.log(`\n/${location.slug} (${location.city})`)
  console.log(`  _rev: ${location._rev}`)
  console.log(`  metaTitle: ${location.metaTitle || '(fallback)'}`)
  console.log(`  metaDescription: ${location.metaDescription || '(fallback)'}`)
  console.log(`  heroHeadline: ${location.heroHeadline || '(fallback)'}`)
  console.log(`  heroSubheadline: ${location.heroSubheadline || '(fallback)'}`)
  console.log(`  body paragraphs: ${blockText(location.problemStatement).length}`)
  console.log(`  body internal links: ${[...new Set(internalLinks(location.problemStatement))].join(', ') || '(none)'}`)
}

console.log('\n=== BLOG SUPPORT BY PRIORITY LOCATION ===')
for (const target of targetSlugs) {
  const supporting = blogs.filter((blog) => (blog.locations || []).includes(target))
  console.log(`\n/${target}: ${supporting.length} related posts`)
  for (const blog of supporting) {
    const linksBack = (blog.bodyLinks || []).filter((href) => href === `/locations/${target}`).length
    console.log(`  ${linksBack > 0 ? 'LINKS' : 'NO-LINK'} x${linksBack} /blog/${blog.slug} — ${blog.title}`)
  }
}

console.log('\n=== SITUATION -> LOCATION REFERENCES (FETCHED, NOT YET RENDERED) ===')
for (const situation of situations) {
  const priorityLocations = (situation.locations || []).filter((location) => targetSlugs.includes(location.slug))
  console.log(`/${situation.slug}: ${priorityLocations.map((location) => location.city).join(', ') || '(none)'}`)
}

console.log('\n=== KINGSTON LINK-CANDIDATE PARAGRAPHS ===')
for (const blog of kingstonLinkCandidates) {
  console.log(`\n/blog/${blog.slug}`)
  for (const block of blog.content || []) {
    if (block?._type !== 'block') continue
    const text = (block.children || []).map((child) => child.text || '').join('')
    if (!text) continue
    console.log(`  [${block._key}] (${block.style || 'normal'}) ${text}`)
  }
}

console.log('\nDone. Nothing was written.')
