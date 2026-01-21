/**
 * Find related blog posts for cross-linking opportunities
 * Run with: node scripts/find-related-posts.mjs
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
console.log('FINDING RELATED BLOG POSTS FOR CROSS-LINKING')
console.log('='.repeat(100))
console.log('')

// Find blog posts related to Allentown/Lehigh Valley or property issues
const relevantKeywords = ['allentown', 'lehigh', 'bethlehem', 'easton', '18', 'damage', 'repair', 'mold', 'code', 'violation', 'as-is']

const allPosts = await client.fetch(`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    relatedLocations[]->{
      city,
      "slug": slug.current
    },
    relatedSituations[]->{
      title,
      "slug": slug.current
    }
  }
`)

console.log(`Total blog posts: ${allPosts.length}`)
console.log('')

// Find posts that might be related to the water damage post
console.log('POTENTIALLY RELATED POSTS (Lehigh Valley / Property Damage):')
console.log('-'.repeat(100))

const waterDamageSlug = 'selling-water-damaged-house-18102-mold-issues'
const relatedPosts = allPosts.filter(post => {
  if (post.slug === waterDamageSlug) return false

  const titleLower = post.title.toLowerCase()
  const slugLower = post.slug.toLowerCase()
  const excerptLower = (post.excerpt || '').toLowerCase()

  // Check for related keywords
  const hasRelevantKeyword = relevantKeywords.some(kw =>
    titleLower.includes(kw) || slugLower.includes(kw) || excerptLower.includes(kw)
  )

  // Check for Lehigh Valley area location references
  const hasLehighArea = post.relatedLocations?.some(loc =>
    ['allentown', 'bethlehem', 'easton', 'lehigh-valley'].includes(loc.slug)
  )

  // Check for major repairs situation reference
  const hasMajorRepairs = post.relatedSituations?.some(sit =>
    sit.slug === 'major-repairs'
  )

  return hasRelevantKeyword || hasLehighArea || hasMajorRepairs
})

relatedPosts.forEach(post => {
  console.log(`\n${post.title}`)
  console.log(`  /blog/${post.slug}`)
  if (post.relatedLocations?.length > 0) {
    console.log(`  Locations: ${post.relatedLocations.map(l => l.city).join(', ')}`)
  }
  if (post.relatedSituations?.length > 0) {
    console.log(`  Situations: ${post.relatedSituations.map(s => s.title).join(', ')}`)
  }
})

console.log('')
console.log('')
console.log('='.repeat(100))
console.log('BLOG POSTS WITH NO CROSS-LINKS TO WATER DAMAGE POST:')
console.log('='.repeat(100))
console.log('The following posts are in the Lehigh Valley area but may not link to the water damage post:')
console.log('')

// Check which of these posts might benefit from an inline link to the water damage post
const lehighAreaPosts = allPosts.filter(post => {
  if (post.slug === waterDamageSlug) return false
  return post.relatedLocations?.some(loc =>
    ['allentown', 'bethlehem', 'easton', 'lehigh-valley'].includes(loc.slug)
  )
})

lehighAreaPosts.forEach(post => {
  console.log(`• ${post.title}`)
  console.log(`  /blog/${post.slug}`)
})

console.log('')
console.log('='.repeat(100))
console.log('SUMMARY')
console.log('='.repeat(100))
console.log('')
console.log('The water damage blog post (/blog/selling-water-damaged-house-18102-mold-issues) is now linked to:')
console.log('  - /locations/allentown (appears in Related Articles)')
console.log('  - /locations/lehigh-valley (appears in Related Articles)')
console.log('  - /situations/major-repairs (appears in Related Articles)')
console.log('')
console.log('For additional internal linking, consider adding inline links within the content of:')
lehighAreaPosts.slice(0, 5).forEach(post => {
  console.log(`  - /blog/${post.slug}`)
})
