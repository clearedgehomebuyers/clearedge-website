/**
 * Fix SEO titles - Final pass to get ALL under 60 chars
 * Run with: node scripts/fix-seo-titles-v3.mjs
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Suffix is " | ClearEdge Home Buyers" = 23 chars (including leading space)
// To stay under 60, title must be <= 37 chars

// Situation metaTitles - trimmed to under 37 chars
const situationTitleUpdates = {
  'divorce': 'Sell During Divorce PA | Cash',                  // 29
  'job-relocation': 'Sell Fast Job Relocation PA',             // 27
  'tax-liens-code-violations': 'Sell with Tax Liens PA | Cash', // 29
  'vacant-property': 'Sell Vacant House PA | Cash',            // 27
  'inherited-property': 'Sell Inherited House PA Fast',        // 28
  'foreclosure': 'Facing Foreclosure PA? Get Cash',            // 31
  'tired-landlord': 'Sell Rental Property PA Fast',            // 28
  'major-repairs': 'Sell House As-Is PA | Cash',               // 26
}

// Blog titles that were still over 60 chars - trimmed to under 37
const blogTitleUpdates = {
  'hazleton-residential-occupancy-inspection-checklist': 'Hazleton Inspection Checklist',           // 29
  'sell-deceased-parents-house-without-probate-pennsylvania': 'Sell Without Probate PA | Guide',    // 31
  'selling-water-damaged-house-18102-mold-issues': 'Water Damage House 18102 | Help',               // 31
  'avoid-foreclosure-scranton-pa': 'Avoid Foreclosure Scranton PA',                                 // 29
  'cash-home-buyers-lackawanna-county-no-fees': 'Cash Buyers Lackawanna | No Fees',                 // 32
  'selling-house-international-property-maintenance-code-violations-bethlehem': 'IPMC Violations Bethlehem 2026', // 30
  'easton-pa-rental-inspection-checklist-2026': 'Easton Rental Inspection 2026',                    // 29
  'luzerne-county-rental-property-registration-inspection-requirements-2026': 'Luzerne Rental Registration 2026', // 32
}

console.log('='.repeat(100))
console.log('SEO TITLE FIX v3 - Final pass: ALL under 60 characters')
console.log('='.repeat(100))
console.log('')

// ============================================================================
// STEP 1: Fix all situation metaTitles
// ============================================================================

console.log('STEP 1: Fixing situation page metaTitles...')
console.log('-'.repeat(100))

const situations = await client.fetch(`*[_type == "situation"]{ _id, title, "slug": slug.current, metaTitle }`)

let sitUpdated = 0
for (const [slug, newTitle] of Object.entries(situationTitleUpdates)) {
  const sit = situations.find(s => s.slug === slug)
  if (!sit) {
    console.log(`❌ NOT FOUND: ${slug}`)
    continue
  }

  const finalTitle = newTitle + ' | ClearEdge Home Buyers'
  const len = finalTitle.length

  try {
    await client.patch(sit._id).set({ metaTitle: newTitle }).commit()
    console.log(`✓ [${len} chars] ${slug}`)
    console.log(`  → "${finalTitle}"`)
    sitUpdated++
  } catch (err) {
    console.log(`❌ ERROR: ${slug} - ${err.message}`)
  }
}

console.log('')
console.log(`Updated ${sitUpdated} situation pages`)

// ============================================================================
// STEP 2: Fix blog post metaTitles
// ============================================================================

console.log('')
console.log('STEP 2: Fixing blog post metaTitles...')
console.log('-'.repeat(100))

const blogPosts = await client.fetch(`*[_type == "blogPost"]{ _id, title, "slug": slug.current, metaTitle }`)

let blogUpdated = 0
for (const [slug, newTitle] of Object.entries(blogTitleUpdates)) {
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) {
    console.log(`❌ NOT FOUND: ${slug}`)
    continue
  }

  const finalTitle = newTitle + ' | ClearEdge Home Buyers'
  const len = finalTitle.length

  try {
    await client.patch(post._id).set({ metaTitle: newTitle }).commit()
    console.log(`✓ [${len} chars] ${slug}`)
    console.log(`  → "${finalTitle}"`)
    blogUpdated++
  } catch (err) {
    console.log(`❌ ERROR: ${slug} - ${err.message}`)
  }
}

console.log('')
console.log(`Updated ${blogUpdated} blog posts`)

// ============================================================================
// VERIFICATION
// ============================================================================

console.log('')
console.log('='.repeat(100))
console.log('VERIFICATION - Final title lengths')
console.log('='.repeat(100))

const updatedSituations = await client.fetch(`*[_type == "situation"]{ title, "slug": slug.current, metaTitle }`)
const tooLongSits = updatedSituations.filter(s => {
  const displayTitle = s.metaTitle || (s.title + ' - Sell Your House Fast')
  const finalTitle = displayTitle + ' | ClearEdge Home Buyers'
  return finalTitle.length > 60
})

console.log('')
console.log(`Situation pages with titles > 60 chars: ${tooLongSits.length}`)
if (tooLongSits.length > 0) {
  tooLongSits.forEach(s => {
    const displayTitle = s.metaTitle || (s.title + ' - Sell Your House Fast')
    const finalTitle = displayTitle + ' | ClearEdge Home Buyers'
    console.log(`  [${finalTitle.length}] ${s.slug}: "${finalTitle}"`)
  })
} else {
  console.log('  ✅ All situation pages are under 60 characters!')
}

const updatedBlogPosts = await client.fetch(`*[_type == "blogPost"]{ title, "slug": slug.current, metaTitle }`)
const tooLongBlogs = updatedBlogPosts.filter(p => {
  const displayTitle = p.metaTitle || p.title
  const finalTitle = displayTitle + ' | ClearEdge Home Buyers'
  return finalTitle.length > 60
})

console.log('')
console.log(`Blog posts with titles > 60 chars: ${tooLongBlogs.length}`)
if (tooLongBlogs.length > 0) {
  tooLongBlogs.forEach(p => {
    const displayTitle = p.metaTitle || p.title
    const finalTitle = displayTitle + ' | ClearEdge Home Buyers'
    console.log(`  [${finalTitle.length}] ${p.slug}: "${finalTitle}"`)
  })
} else {
  console.log('  ✅ All blog posts are under 60 characters!')
}

console.log('')
console.log('='.repeat(100))
console.log('COMPLETE')
console.log('='.repeat(100))
