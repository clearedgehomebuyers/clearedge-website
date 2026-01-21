/**
 * Fix location page metaTitles - remove "| ClearEdge" suffix
 * Run with: node scripts/fix-location-titles.mjs
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

console.log('='.repeat(100))
console.log('FIX LOCATION PAGE TITLES - Remove "| ClearEdge" suffix')
console.log('='.repeat(100))
console.log('')

const locations = await client.fetch(`
  *[_type == "location"] | order(city asc) {
    _id,
    city,
    "slug": slug.current,
    metaTitle
  }
`)

console.log(`Found ${locations.length} locations\n`)

let updated = 0
let skipped = 0

for (const loc of locations) {
  if (!loc.metaTitle) {
    console.log(`⏭️  ${loc.city}: No metaTitle set, skipping`)
    skipped++
    continue
  }

  // Remove "| ClearEdge" from the end
  const cleanTitle = loc.metaTitle.replace(/\s*\|\s*ClearEdge\s*$/, '')

  if (cleanTitle === loc.metaTitle) {
    console.log(`⏭️  ${loc.city}: No "| ClearEdge" suffix found`)
    skipped++
    continue
  }

  // Calculate final length
  const finalTitle = cleanTitle + ' | ClearEdge Home Buyers'
  const finalLen = finalTitle.length

  try {
    await client.patch(loc._id).set({ metaTitle: cleanTitle }).commit()
    console.log(`✓ ${loc.city} [${finalLen} chars]`)
    console.log(`  Old: "${loc.metaTitle}"`)
    console.log(`  New: "${cleanTitle}"`)
    console.log(`  Final: "${finalTitle}"`)
    updated++
  } catch (err) {
    console.log(`❌ ${loc.city}: ${err.message}`)
  }
}

console.log('')
console.log('='.repeat(100))
console.log('SUMMARY')
console.log('='.repeat(100))
console.log(`Updated: ${updated}`)
console.log(`Skipped: ${skipped}`)

// Verification
console.log('')
console.log('VERIFICATION - Final title lengths')
console.log('-'.repeat(100))

const updatedLocations = await client.fetch(`
  *[_type == "location"] | order(city asc) {
    city,
    "slug": slug.current,
    metaTitle
  }
`)

const tooLong = updatedLocations.filter(loc => {
  const title = loc.metaTitle || `Sell Your House Fast in ${loc.city}, PA`
  const final = title + ' | ClearEdge Home Buyers'
  return final.length > 60
})

console.log(`\nLocations with titles still > 60 chars: ${tooLong.length}`)
if (tooLong.length > 0) {
  tooLong.forEach(loc => {
    const title = loc.metaTitle || `Sell Your House Fast in ${loc.city}, PA`
    const final = title + ' | ClearEdge Home Buyers'
    console.log(`  [${final.length}] ${loc.city}: "${final}"`)
  })
} else {
  console.log('  ✅ All location titles are under 60 characters!')
}
