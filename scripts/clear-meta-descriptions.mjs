/**
 * Clear metaDescription fields from Sanity CMS
 * This allows pages to use the optimized code fallbacks instead
 *
 * Run with: node scripts/clear-meta-descriptions.mjs
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

console.log('='.repeat(80))
console.log('SANITY META DESCRIPTION CLEANUP')
console.log('='.repeat(80))
console.log('')

// ============================================================================
// STEP 1: AUDIT - Show current metaDescriptions
// ============================================================================

console.log('📋 STEP 1: Auditing current metaDescription fields...\n')

// Fetch locations with metaDescription
const locations = await client.fetch(`
  *[_type == "location" && defined(metaDescription)] {
    _id,
    city,
    metaDescription
  }
`)

console.log(`LOCATIONS with metaDescription (${locations.length} found):`)
if (locations.length === 0) {
  console.log('  None - all using code fallback ✓')
} else {
  locations.forEach(loc => {
    const len = loc.metaDescription?.length || 0
    const status = len > 160 ? '⚠️  OVER 160' : '✓'
    console.log(`  - ${loc.city}: ${len} chars ${status}`)
    console.log(`    "${loc.metaDescription}"`)
  })
}
console.log('')

// Fetch situations with metaDescription
const situations = await client.fetch(`
  *[_type == "situation" && defined(metaDescription)] {
    _id,
    title,
    metaDescription
  }
`)

console.log(`SITUATIONS with metaDescription (${situations.length} found):`)
if (situations.length === 0) {
  console.log('  None - all using code fallback ✓')
} else {
  situations.forEach(sit => {
    const len = sit.metaDescription?.length || 0
    const status = len > 160 ? '⚠️  OVER 160' : '✓'
    console.log(`  - ${sit.title}: ${len} chars ${status}`)
    console.log(`    "${sit.metaDescription}"`)
  })
}
console.log('')

// Fetch blog posts with metaDescription
const blogPosts = await client.fetch(`
  *[_type == "blogPost" && defined(metaDescription)] {
    _id,
    title,
    metaDescription
  }
`)

console.log(`BLOG POSTS with metaDescription (${blogPosts.length} found):`)
if (blogPosts.length === 0) {
  console.log('  None - all using excerpt fallback ✓')
} else {
  blogPosts.forEach(post => {
    const len = post.metaDescription?.length || 0
    const status = len > 160 ? '⚠️  OVER 160' : '✓'
    console.log(`  - ${post.title.substring(0, 50)}...: ${len} chars ${status}`)
  })
}
console.log('')

// ============================================================================
// STEP 2: CLEAR - Remove metaDescription fields
// ============================================================================

const totalToClear = locations.length + situations.length

if (totalToClear === 0) {
  console.log('✅ Nothing to clear! All documents are already using code fallbacks.')
  process.exit(0)
}

console.log('='.repeat(80))
console.log(`🗑️  STEP 2: Clearing ${totalToClear} metaDescription fields...`)
console.log('='.repeat(80))
console.log('')

// Clear locations
if (locations.length > 0) {
  console.log('Clearing LOCATIONS...')
  for (const loc of locations) {
    await client.patch(loc._id).unset(['metaDescription']).commit()
    console.log(`  ✓ Cleared: ${loc.city}`)
  }
  console.log('')
}

// Clear situations
if (situations.length > 0) {
  console.log('Clearing SITUATIONS...')
  for (const sit of situations) {
    await client.patch(sit._id).unset(['metaDescription']).commit()
    console.log(`  ✓ Cleared: ${sit.title}`)
  }
  console.log('')
}

// Note: NOT clearing blog posts - those should have custom descriptions
console.log('ℹ️  Note: Blog post metaDescriptions were NOT cleared (they should have custom SEO)')
console.log('')

console.log('='.repeat(80))
console.log('✅ COMPLETE! All location and situation pages will now use optimized code fallbacks.')
console.log('='.repeat(80))
console.log('')
console.log('Next steps:')
console.log('1. Rebuild the site: npm run build')
console.log('2. Deploy to see changes')
console.log('3. Re-run SEO audit to verify')
