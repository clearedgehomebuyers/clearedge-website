/**
 * Audit blog post meta descriptions
 * Run with: node scripts/audit-blog-meta-descriptions.mjs
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

// Fetch all blog posts with metaDescription
const posts = await client.fetch(`
  *[_type == "blogPost" && defined(metaDescription)] | order(title asc) {
    title,
    "slug": slug.current,
    metaDescription
  }
`)

// Filter to only long descriptions
const longDescriptions = posts.filter(p => p.metaDescription && p.metaDescription.length > 160)

console.log('='.repeat(120))
console.log('BLOG POST META DESCRIPTION AUDIT')
console.log('='.repeat(120))
console.log(`Total blog posts with metaDescription: ${posts.length}`)
console.log(`Posts with descriptions > 160 chars: ${longDescriptions.length}`)
console.log('')

if (longDescriptions.length === 0) {
  console.log('✓ All blog post meta descriptions are within 160 characters!')
  process.exit(0)
}

// Output detailed report
console.log('POSTS NEEDING ATTENTION:')
console.log('-'.repeat(120))

longDescriptions.forEach((post, index) => {
  const current = post.metaDescription
  const currentLen = current.length

  console.log(`\n${index + 1}. ${post.title}`)
  console.log(`   Slug: /blog/${post.slug}`)
  console.log(`   Current (${currentLen} chars):`)
  console.log(`   "${current}"`)
  console.log('')
})

// Output as markdown table for easy copying
console.log('\n')
console.log('='.repeat(120))
console.log('MARKDOWN TABLE FOR REVIEW')
console.log('='.repeat(120))
console.log('')
console.log('| # | Blog Post | Chars | Current Description |')
console.log('|---|-----------|-------|---------------------|')

longDescriptions.forEach((post, index) => {
  const shortTitle = post.title.length > 50 ? post.title.substring(0, 47) + '...' : post.title
  const desc = post.metaDescription.replace(/\|/g, '\\|') // Escape pipes for markdown
  console.log(`| ${index + 1} | ${shortTitle} | ${post.metaDescription.length} | ${desc} |`)
})

console.log('')
console.log('='.repeat(120))
console.log('RAW DATA FOR PROCESSING')
console.log('='.repeat(120))
console.log('')
console.log(JSON.stringify(longDescriptions, null, 2))
