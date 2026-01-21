/**
 * Check location page metaTitles in Sanity for duplicate branding
 * Run with: node scripts/check-location-titles.mjs
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
})

console.log('='.repeat(100))
console.log('CHECKING LOCATION PAGE TITLES IN SANITY')
console.log('='.repeat(100))
console.log('')

const locations = await client.fetch(`
  *[_type == "location"] | order(city asc) {
    city,
    "slug": slug.current,
    metaTitle
  }
`)

console.log(`Found ${locations.length} locations\n`)

// Check for titles containing "| ClearEdge"
const withDuplicate = []
const withoutMetaTitle = []

locations.forEach(loc => {
  const metaTitle = loc.metaTitle || ''
  const fallbackTitle = `Sell Your House Fast in ${loc.city}, PA`
  const displayTitle = metaTitle || fallbackTitle
  const finalTitle = displayTitle + ' | ClearEdge Home Buyers'

  console.log(`${loc.city} (/locations/${loc.slug})`)
  console.log(`  Sanity metaTitle: ${metaTitle ? `"${metaTitle}"` : '(not set)'}`)
  console.log(`  Final title: "${finalTitle}" [${finalTitle.length} chars]`)

  if (metaTitle && metaTitle.includes('| ClearEdge')) {
    withDuplicate.push(loc)
    console.log(`  ⚠️  HAS DUPLICATE: metaTitle contains "| ClearEdge"`)
  }
  if (!metaTitle) {
    withoutMetaTitle.push(loc)
  }
  console.log('')
})

console.log('='.repeat(100))
console.log('SUMMARY')
console.log('='.repeat(100))
console.log(`Total locations: ${locations.length}`)
console.log(`Locations with "| ClearEdge" in metaTitle: ${withDuplicate.length}`)
console.log(`Locations without metaTitle (using fallback): ${withoutMetaTitle.length}`)

if (withDuplicate.length > 0) {
  console.log('\nLocations needing fix:')
  withDuplicate.forEach(loc => {
    console.log(`  - ${loc.city}: "${loc.metaTitle}"`)
  })
}
