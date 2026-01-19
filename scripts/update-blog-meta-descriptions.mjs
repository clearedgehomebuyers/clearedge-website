/**
 * Update blog post meta descriptions to be under 160 characters
 * Run with: node scripts/update-blog-meta-descriptions.mjs
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
  token: process.env.SANITY_API_TOKEN, // Required for write operations
})

// Updates to make - keyed by slug
const updates = {
  'cash-home-buyers-berks-county': 'Looking for cash home buyers in Berks County? Get a fair cash offer in 24 hours. We buy houses in Reading & all of Berks County. No fees.',

  'cash-home-buyers-pottsville-pa': 'Looking for cash home buyers in Pottsville PA? Get a fair cash offer in 24 hours. We buy houses in Pottsville & Schuylkill County. No fees.',

  'cash-home-buyers-lackawanna-county-no-fees': 'Looking for cash home buyers in Lackawanna County with no fees? Find legitimate buyers, avoid scams, and get a fair offer for your home.',

  'easton-pa-rental-inspection-checklist-2026': 'Easton PA rental inspection checklist 2026. Ward registration deadlines, Chapter 435 requirements, and how to pass your inspection first time.',

  'hazleton-residential-occupancy-inspection-checklist': 'Hazleton residential occupancy inspection checklist. Know what inspectors check: smoke detectors, railings, electrical & more. Pass first time.',

  'sell-house-wilkes-barre-code-violations': 'Sell a house in Wilkes-Barre with code violations? Learn how to sell fast without fixing them. Cash offers available, close in 7-14 days.',

  'how-to-stop-berks-county-judicial-sale-2026': 'Facing a Berks County Judicial Tax Sale in 2026? Learn 6 ways to stop the sale, save your equity, and protect your home. Free local guide.',

  'luzerne-county-rental-property-registration-inspection-requirements-2026': 'Luzerne County rental property registration & inspection requirements 2026. Covers Wilkes-Barre, Hazleton, Pittston fees and deadlines.',

  'pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights': 'PA Act 135 blighted property conservatorship guide. Learn how to fight a petition, protect your property, and understand your legal options.',

  'pennsylvania-job-relocation-home-buyout-fast-equity-release-2026': 'Selling your PA home fast for job relocation? Learn about employer buyouts, cash buyers, capital gains exemptions & fast equity release.',

  'scranton-pa-major-structural-damage-disclosure-law-2026': "Selling a Scranton home with structural damage? Learn PA's 2026 disclosure requirements, what counts as major damage & your legal obligations.",

  'sell-my-house-fast-dunmore-mine-subsidence': 'Sell a house with mine subsidence in Dunmore PA? Learn your options, real repair costs, and how to get a fair cash offer from local buyers.',

  'sell-my-house-fast-lehigh-valley': 'Sell your house fast in Lehigh Valley? Get a fair cash offer in 24 hours. We buy houses in Allentown, Bethlehem & Easton. No fees or repairs.',

  'sell-my-house-fast-luzerne-county-pa': 'Sell your house fast in Luzerne County PA? Get a fair cash offer in 24 hours. We buy houses in Wilkes-Barre, Hazleton & Pittston. No fees.',

  'sell-my-house-fast-poconos-pa': 'Sell your Poconos house fast? Get a fair cash offer in 24 hours. We buy vacation homes & cabins in Stroudsburg, Mount Pocono & Monroe County.',

  'selling-house-international-property-maintenance-code-violations-bethlehem': 'IPMC violations in Bethlehem? Learn 3 options for selling with Article 1733 code violations, including fine avoidance and cash sale options.',

  'selling-water-damaged-house-18102-mold-issues': 'Water damage and mold in your Allentown home? Learn selling options, PA disclosure laws & how to get a fair cash offer in 24 hours.',

  'stop-govos-fines-poconos-house': 'Stop GovOS fines Poconos house owners face in 2026. Township STR regulations, MCOCA 12-month rule & how cash buyers help you escape fines.',
}

console.log('='.repeat(80))
console.log('UPDATING BLOG POST META DESCRIPTIONS')
console.log('='.repeat(80))
console.log('')

// Fetch all blog posts to get their _id values
const posts = await client.fetch(`
  *[_type == "blogPost"] {
    _id,
    title,
    "slug": slug.current,
    metaDescription
  }
`)

let updated = 0
let errors = 0

for (const [slug, newDescription] of Object.entries(updates)) {
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    console.log(`❌ NOT FOUND: ${slug}`)
    errors++
    continue
  }

  try {
    await client.patch(post._id)
      .set({ metaDescription: newDescription })
      .commit()

    console.log(`✓ Updated: ${post.title.substring(0, 50)}...`)
    console.log(`  Old: ${post.metaDescription?.length || 0} chars`)
    console.log(`  New: ${newDescription.length} chars`)
    updated++
  } catch (err) {
    console.log(`❌ ERROR updating ${slug}: ${err.message}`)
    errors++
  }
}

console.log('')
console.log('='.repeat(80))
console.log(`COMPLETE: ${updated} updated, ${errors} errors`)
console.log('='.repeat(80))

// Verify all descriptions are now under 160 chars
console.log('')
console.log('VERIFICATION - Fetching updated posts...')
console.log('')

const updatedPosts = await client.fetch(`
  *[_type == "blogPost" && defined(metaDescription)] | order(title asc) {
    title,
    "slug": slug.current,
    metaDescription
  }
`)

const stillLong = updatedPosts.filter(p => p.metaDescription && p.metaDescription.length > 160)

if (stillLong.length === 0) {
  console.log('✅ SUCCESS: All blog post meta descriptions are now under 160 characters!')
} else {
  console.log(`⚠️  WARNING: ${stillLong.length} posts still have descriptions over 160 chars:`)
  stillLong.forEach(p => {
    console.log(`  - ${p.title}: ${p.metaDescription.length} chars`)
  })
}
