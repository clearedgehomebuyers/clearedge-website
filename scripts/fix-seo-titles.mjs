/**
 * Fix SEO titles that are too long (over 60 characters when combined with template)
 * Run with: node scripts/fix-seo-titles.mjs
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

// Blog post title updates - these are the shortened versions
// The final title will have " | ClearEdge Home Buyers" appended by the layout template
const blogTitleUpdates = {
  'pennsylvania-job-relocation-home-buyout-fast-equity-release-2026': 'PA Job Relocation Home Buyout 2026 | Fast Equity Release',
  'pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights': 'PA Act 135 Blighted Property Conservatorship | Owner Rights',
  'scranton-pa-major-structural-damage-disclosure-law-2026': 'Scranton Structural Damage Disclosure Law 2026 | Seller Guide',
  'selling-water-damaged-house-18102-mold-issues': 'Sell Water-Damaged House in 18102 | Mold Issues',
  'luzerne-county-rental-property-registration-inspection-requirements-2026': 'Luzerne County Rental Registration 2026 | Requirements',
  'selling-house-international-property-maintenance-code-violations-bethlehem': 'Selling House with IPMC Violations Bethlehem | 2026 Guide',
  'sell-house-wilkes-barre-code-violations': 'Sell House Wilkes-Barre Code Violations | Cash Buyer',
  'easton-pa-rental-inspection-checklist-2026': 'Easton PA Rental Inspection Checklist 2026 | Landlord Guide',
  'hazleton-residential-occupancy-inspection-checklist': 'Hazleton Occupancy Inspection Checklist | Complete Guide',
  'sell-hoarder-house-reading-pa-without-cleanout': 'Sell Hoarder House Reading PA | No Cleanout Needed',
  'sell-my-house-fast-bethlehem-pa-18015-tax-lien': 'Sell House Fast Bethlehem 18015 Tax Lien | Cash Offer',
  'cash-home-buyers-berks-county': 'Cash Home Buyers Berks County PA | 24-Hour Offer',
  'sell-my-house-fast-luzerne-county-pa': 'Sell House Fast Luzerne County PA | Cash Offer',
  'cash-home-buyers-lackawanna-county-no-fees': 'Cash Home Buyers Lackawanna County | No Fees',
  'cash-home-buyers-pottsville-pa': 'Cash Home Buyers Pottsville PA | 24-Hour Offer',
  'how-to-stop-berks-county-judicial-sale-2026': 'Stop Berks County Judicial Sale 2026 | Complete Guide',
  'sell-my-house-fast-dunmore-mine-subsidence': 'Sell House Fast Dunmore | Mine Subsidence',
  'avoid-foreclosure-scranton-pa': 'Avoid Foreclosure Scranton PA | 7 Options',
  'sell-my-house-fast-lehigh-valley': 'Sell House Fast Lehigh Valley | Cash Offer',
  'documents-required-selling-inherited-property-pennsylvania': 'Documents for Selling Inherited Property PA',
  'sell-deceased-parents-house-without-probate-pennsylvania': "Sell Parents' House Without Probate PA | Guide",
  'sell-my-house-fast-poconos-pa': 'Sell House Fast Poconos PA | Cash Offer',
  'stop-govos-fines-poconos-house': 'Stop GovOS Fines Poconos | 2026 STR Guide',
  'sell-my-house-fast-allentown': 'Sell House Fast Allentown | Cash Offer',
  'sell-house-fast-during-divorce-lehigh-county-pa': 'Sell House Fast Divorce Lehigh County PA | Cash Offer',
}

// Situation metaTitle updates
const situationTitleUpdates = {
  'tax-liens-code-violations': 'Sell House with Tax Liens or Code Violations in PA',
}

console.log('='.repeat(100))
console.log('SEO TITLE FIX - Shortening titles to under 60 characters (with template)')
console.log('='.repeat(100))
console.log('')

// ============================================================================
// STEP 1: Update blog post metaTitles in Sanity
// ============================================================================

console.log('STEP 1: Updating blog post metaTitles in Sanity...')
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
// STEP 2: Update situation metaTitles in Sanity
// ============================================================================

console.log('')
console.log('STEP 2: Updating situation metaTitles in Sanity...')
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
// VERIFICATION
// ============================================================================

console.log('')
console.log('='.repeat(100))
console.log('VERIFICATION - Checking all titles after updates')
console.log('='.repeat(100))

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
}

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
}

console.log('')
console.log('='.repeat(100))
console.log('COMPLETE')
console.log('='.repeat(100))
