/**
 * Fix SEO titles - Remove duplicate patterns and shorten to under 60 chars
 * Run with: node scripts/fix-seo-titles-v2.mjs
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

// Situation metaTitles - remove the | ClearEdge suffix (layout adds | ClearEdge Home Buyers)
// Target: under 38 chars (so final is under 60 with " | ClearEdge Home Buyers")
const situationTitleUpdates = {
  'divorce': 'Sell House During Divorce PA | Fast Cash',
  'job-relocation': 'Sell House Fast for Job Relocation PA',
  'tax-liens-code-violations': 'Sell House with Tax Liens PA | Cash Offer',
  'vacant-property': 'Sell Vacant House PA | Stop Paying Bills',
  'inherited-property': 'Sell Inherited House PA | Skip Probate',
  'foreclosure': 'Facing Foreclosure PA? Sell Fast for Cash',
  'tired-landlord': 'Sell Rental Property PA | Exit Landlording',
  'major-repairs': 'Sell House As-Is PA | Major Repairs OK',
}

// Blog titles - further shortened (under 38 chars so final < 60)
const blogTitleUpdates = {
  'pennsylvania-job-relocation-home-buyout-fast-equity-release-2026': 'PA Job Relocation Home Buyout 2026',
  'pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights': 'PA Act 135 Conservatorship | Rights',
  'scranton-pa-major-structural-damage-disclosure-law-2026': 'Scranton Disclosure Law 2026 | Guide',
  'selling-water-damaged-house-18102-mold-issues': 'Sell Water-Damaged House 18102 | Mold',
  'luzerne-county-rental-property-registration-inspection-requirements-2026': 'Luzerne County Rental Registration 2026',
  'selling-house-international-property-maintenance-code-violations-bethlehem': 'IPMC Violations Bethlehem | 2026 Guide',
  'sell-house-wilkes-barre-code-violations': 'Sell House Wilkes-Barre | Violations',
  'easton-pa-rental-inspection-checklist-2026': 'Easton Rental Inspection 2026 | Guide',
  'hazleton-residential-occupancy-inspection-checklist': 'Hazleton Occupancy Inspection Checklist',
  'sell-hoarder-house-reading-pa-without-cleanout': 'Sell Hoarder House Reading PA',
  'sell-my-house-fast-bethlehem-pa-18015-tax-lien': 'Sell House Bethlehem Tax Lien | Cash',
  'cash-home-buyers-berks-county': 'Cash Home Buyers Berks County PA',
  'sell-my-house-fast-luzerne-county-pa': 'Sell House Fast Luzerne County PA',
  'cash-home-buyers-lackawanna-county-no-fees': 'Cash Buyers Lackawanna County | No Fees',
  'cash-home-buyers-pottsville-pa': 'Cash Home Buyers Pottsville PA',
  'how-to-stop-berks-county-judicial-sale-2026': 'Stop Berks County Judicial Sale 2026',
  'sell-my-house-fast-dunmore-mine-subsidence': 'Sell House Dunmore | Mine Subsidence',
  'avoid-foreclosure-scranton-pa': 'Avoid Foreclosure Scranton PA | Options',
  'sell-my-house-fast-lehigh-valley': 'Sell House Fast Lehigh Valley',
  'documents-required-selling-inherited-property-pennsylvania': 'Inherited Property Documents PA',
  'sell-deceased-parents-house-without-probate-pennsylvania': "Sell Parents' House Without Probate PA",
  'sell-my-house-fast-poconos-pa': 'Sell House Fast Poconos PA',
  'stop-govos-fines-poconos-house': 'Stop GovOS Fines Poconos | STR Guide',
  'sell-my-house-fast-allentown': 'Sell House Fast Allentown PA',
  'sell-house-fast-during-divorce-lehigh-county-pa': 'Sell House Divorce Lehigh County PA',
}

console.log('='.repeat(100))
console.log('SEO TITLE FIX v2 - Target: under 60 characters total')
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
