/**
 * Shorten location page metaTitles - remove middle descriptor phrase
 * Run with: node scripts/shorten-location-titles.mjs [--apply]
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const applyChanges = process.argv.includes('--apply')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// New simplified titles for each location
const newTitles = {
  'allentown': 'Sell Your House Fast in Allentown, PA',
  'bethlehem': 'Sell Your House Fast in Bethlehem, PA',
  'bloomsburg': 'Sell Your House Fast in Bloomsburg, PA',
  'carbondale': 'Sell Your House Fast in Carbondale, PA',
  'dunmore': 'Sell Your House Fast in Dunmore, PA',
  'east-stroudsburg': 'Sell Your House Fast in East Stroudsburg',
  'easton': 'Sell Your House Fast in Easton, PA',
  'hazleton': 'Sell Your House Fast in Hazleton, PA',
  'honesdale': 'Sell Your House Fast in Honesdale, PA',
  'kingston': 'Sell Your House Fast in Kingston, PA',
  'lehigh-valley': 'Sell Your House Fast in Lehigh Valley',
  'nanticoke': 'Sell Your House Fast in Nanticoke, PA',
  'pittston': 'Sell Your House Fast in Pittston, PA',
  'pocono-pines': 'Sell Your House Fast in Pocono Pines, PA',
  'poconos': 'Sell Your Poconos House Fast for Cash',
  'pottsville': 'Sell Your House Fast in Pottsville, PA',
  'reading': 'Sell Your House Fast in Reading, PA',
  'scranton': 'Sell Your House Fast in Scranton, PA',
  'stroudsburg': 'Sell Your House Fast in Stroudsburg, PA',
  'tannersville': 'Sell Your House Fast in Tannersville, PA',
  'wilkes-barre': 'Sell Your House Fast in Wilkes-Barre, PA',
}

console.log('='.repeat(100))
console.log('SHORTEN LOCATION PAGE TITLES')
console.log(applyChanges ? 'MODE: APPLY CHANGES' : 'MODE: PREVIEW ONLY (use --apply to commit)')
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

console.log('BEFORE / AFTER COMPARISON:')
console.log('-'.repeat(100))
console.log('')

const changes = []

for (const loc of locations) {
  const newTitle = newTitles[loc.slug]
  if (!newTitle) {
    console.log(`⚠️  ${loc.city}: No new title defined for slug "${loc.slug}"`)
    continue
  }

  const oldTitle = loc.metaTitle || '(not set)'
  const finalTitle = newTitle + ' | ClearEdge Home Buyers'
  const finalLen = finalTitle.length

  console.log(`${loc.city} (/locations/${loc.slug})`)
  console.log(`  BEFORE: "${oldTitle}"`)
  console.log(`  AFTER:  "${newTitle}"`)
  console.log(`  FINAL:  "${finalTitle}" [${finalLen} chars]`)
  console.log('')

  changes.push({
    _id: loc._id,
    city: loc.city,
    slug: loc.slug,
    oldTitle,
    newTitle,
    finalTitle,
    finalLen,
  })
}

console.log('='.repeat(100))
console.log('SUMMARY')
console.log('='.repeat(100))
console.log(`Total locations: ${changes.length}`)
console.log(`Titles under 60 chars: ${changes.filter(c => c.finalLen <= 60).length}`)
console.log(`Titles 61-65 chars: ${changes.filter(c => c.finalLen > 60 && c.finalLen <= 65).length}`)
console.log(`Titles over 65 chars: ${changes.filter(c => c.finalLen > 65).length}`)

if (changes.some(c => c.finalLen > 60)) {
  console.log('')
  console.log('Titles over 60 chars:')
  changes.filter(c => c.finalLen > 60).forEach(c => {
    console.log(`  [${c.finalLen}] ${c.city}: "${c.finalTitle}"`)
  })
}

if (applyChanges) {
  console.log('')
  console.log('='.repeat(100))
  console.log('APPLYING CHANGES...')
  console.log('='.repeat(100))

  let updated = 0
  for (const change of changes) {
    try {
      await client.patch(change._id).set({ metaTitle: change.newTitle }).commit()
      console.log(`✓ ${change.city}`)
      updated++
    } catch (err) {
      console.log(`❌ ${change.city}: ${err.message}`)
    }
  }

  console.log('')
  console.log(`Updated ${updated} of ${changes.length} locations`)
} else {
  console.log('')
  console.log('='.repeat(100))
  console.log('PREVIEW COMPLETE - Run with --apply to commit changes')
  console.log('='.repeat(100))
}
