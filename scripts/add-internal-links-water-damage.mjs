/**
 * Add internal links to selling-water-damaged-house-18102-mold-issues blog post
 * This adds relatedLocations and relatedSituations references in Sanity
 * Run with: node scripts/add-internal-links-water-damage.mjs
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

const BLOG_SLUG = 'selling-water-damaged-house-18102-mold-issues'

console.log('='.repeat(100))
console.log('INTERNAL LINKING: selling-water-damaged-house-18102-mold-issues')
console.log('='.repeat(100))
console.log('')

// Step 1: Get the blog post with current references
console.log('STEP 1: Fetching blog post and current references...')
console.log('-'.repeat(100))

const blogPost = await client.fetch(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    relatedLocations[]->{
      _id,
      city,
      "slug": slug.current
    },
    relatedSituations[]->{
      _id,
      title,
      "slug": slug.current
    }
  }
`, { slug: BLOG_SLUG })

if (!blogPost) {
  console.log(`❌ Blog post not found: ${BLOG_SLUG}`)
  process.exit(1)
}

console.log(`✓ Found: ${blogPost.title}`)
console.log(`  ID: ${blogPost._id}`)
console.log('')
console.log('Current relatedLocations:')
if (blogPost.relatedLocations && blogPost.relatedLocations.length > 0) {
  blogPost.relatedLocations.forEach(loc => {
    console.log(`  - ${loc.city} (/locations/${loc.slug})`)
  })
} else {
  console.log('  (none)')
}
console.log('')
console.log('Current relatedSituations:')
if (blogPost.relatedSituations && blogPost.relatedSituations.length > 0) {
  blogPost.relatedSituations.forEach(sit => {
    console.log(`  - ${sit.title} (/situations/${sit.slug})`)
  })
} else {
  console.log('  (none)')
}

// Step 2: Get the location and situation IDs we want to add
console.log('')
console.log('STEP 2: Fetching locations and situations to link...')
console.log('-'.repeat(100))

const [allentown, lehighValley, majorRepairs] = await Promise.all([
  client.fetch(`*[_type == "location" && slug.current == "allentown"][0]{ _id, city, "slug": slug.current }`),
  client.fetch(`*[_type == "location" && slug.current == "lehigh-valley"][0]{ _id, city, "slug": slug.current }`),
  client.fetch(`*[_type == "situation" && slug.current == "major-repairs"][0]{ _id, title, "slug": slug.current }`),
])

console.log('Locations to link:')
if (allentown) console.log(`  ✓ ${allentown.city} (${allentown._id})`)
else console.log('  ❌ Allentown not found')
if (lehighValley) console.log(`  ✓ ${lehighValley.city} (${lehighValley._id})`)
else console.log('  ❌ Lehigh Valley not found')

console.log('Situations to link:')
if (majorRepairs) console.log(`  ✓ ${majorRepairs.title} (${majorRepairs._id})`)
else console.log('  ❌ Major Repairs not found')

// Step 3: Build the update
console.log('')
console.log('STEP 3: Determining what to add...')
console.log('-'.repeat(100))

// Get current reference IDs
const currentLocationIds = (blogPost.relatedLocations || []).map(loc => loc._id)
const currentSituationIds = (blogPost.relatedSituations || []).map(sit => sit._id)

// Locations to add
const locationsToAdd = []
if (allentown && !currentLocationIds.includes(allentown._id)) {
  locationsToAdd.push({ _type: 'reference', _ref: allentown._id, _key: `loc-${allentown._id.slice(-8)}` })
  console.log(`  + Adding: ${allentown.city} (/locations/${allentown.slug})`)
}
if (lehighValley && !currentLocationIds.includes(lehighValley._id)) {
  locationsToAdd.push({ _type: 'reference', _ref: lehighValley._id, _key: `loc-${lehighValley._id.slice(-8)}` })
  console.log(`  + Adding: ${lehighValley.city} (/locations/${lehighValley.slug})`)
}

// Situations to add
const situationsToAdd = []
if (majorRepairs && !currentSituationIds.includes(majorRepairs._id)) {
  situationsToAdd.push({ _type: 'reference', _ref: majorRepairs._id, _key: `sit-${majorRepairs._id.slice(-8)}` })
  console.log(`  + Adding: ${majorRepairs.title} (/situations/${majorRepairs.slug})`)
}

if (locationsToAdd.length === 0 && situationsToAdd.length === 0) {
  console.log('')
  console.log('✅ All references already exist. Nothing to update.')
  process.exit(0)
}

// Step 4: Update the blog post
console.log('')
console.log('STEP 4: Updating blog post in Sanity...')
console.log('-'.repeat(100))

try {
  let transaction = client.transaction()

  if (locationsToAdd.length > 0) {
    // If no existing locations, set the array; otherwise append
    if (!blogPost.relatedLocations || blogPost.relatedLocations.length === 0) {
      transaction = transaction.patch(blogPost._id, patch => patch.set({ relatedLocations: locationsToAdd }))
    } else {
      for (const loc of locationsToAdd) {
        transaction = transaction.patch(blogPost._id, patch => patch.append('relatedLocations', [loc]))
      }
    }
  }

  if (situationsToAdd.length > 0) {
    // If no existing situations, set the array; otherwise append
    if (!blogPost.relatedSituations || blogPost.relatedSituations.length === 0) {
      transaction = transaction.patch(blogPost._id, patch => patch.set({ relatedSituations: situationsToAdd }))
    } else {
      for (const sit of situationsToAdd) {
        transaction = transaction.patch(blogPost._id, patch => patch.append('relatedSituations', [sit]))
      }
    }
  }

  await transaction.commit()
  console.log('✓ Blog post updated successfully!')
} catch (err) {
  console.log(`❌ Error: ${err.message}`)
  process.exit(1)
}

// Step 5: Verification
console.log('')
console.log('STEP 5: Verification...')
console.log('-'.repeat(100))

const updatedPost = await client.fetch(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    title,
    relatedLocations[]->{
      city,
      "slug": slug.current
    },
    relatedSituations[]->{
      title,
      "slug": slug.current
    }
  }
`, { slug: BLOG_SLUG })

console.log(`Blog post "${updatedPost.title}" now linked to:`)
console.log('')
console.log('Locations:')
if (updatedPost.relatedLocations && updatedPost.relatedLocations.length > 0) {
  updatedPost.relatedLocations.forEach(loc => {
    console.log(`  ✓ ${loc.city} → /locations/${loc.slug}`)
  })
} else {
  console.log('  (none)')
}
console.log('')
console.log('Situations:')
if (updatedPost.relatedSituations && updatedPost.relatedSituations.length > 0) {
  updatedPost.relatedSituations.forEach(sit => {
    console.log(`  ✓ ${sit.title} → /situations/${sit.slug}`)
  })
} else {
  console.log('  (none)')
}

console.log('')
console.log('='.repeat(100))
console.log('RESULT: This blog post will now appear in "Related Articles" on:')
console.log('='.repeat(100))
if (updatedPost.relatedLocations) {
  updatedPost.relatedLocations.forEach(loc => {
    console.log(`  • /locations/${loc.slug}`)
  })
}
if (updatedPost.relatedSituations) {
  updatedPost.relatedSituations.forEach(sit => {
    console.log(`  • /situations/${sit.slug}`)
  })
}
console.log('')
