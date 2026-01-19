/**
 * Fix redirect links in Sanity - change non-www to www URLs
 * Run with: node scripts/fix-redirect-links.mjs
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

const WRONG_URL = 'https://clearedgehomebuyers.com'
const CORRECT_URL = 'https://www.clearedgehomebuyers.com'

console.log('='.repeat(80))
console.log('FIX REDIRECT LINKS IN SANITY')
console.log('='.repeat(80))
console.log(`Searching for: ${WRONG_URL}`)
console.log(`Replacing with: ${CORRECT_URL}`)
console.log('')

// Recursive function to search and replace URLs in portable text content
function fixUrlsInContent(content, path = '') {
  let fixes = []

  if (!content) return { content, fixes }

  // If it's an array, process each item
  if (Array.isArray(content)) {
    const newContent = content.map((item, index) => {
      const result = fixUrlsInContent(item, `${path}[${index}]`)
      fixes = fixes.concat(result.fixes)
      return result.content
    })
    return { content: newContent, fixes }
  }

  // If it's an object, check for href fields and recurse into nested objects
  if (typeof content === 'object' && content !== null) {
    const newContent = { ...content }

    for (const key of Object.keys(newContent)) {
      // Check if this is an href field with the wrong URL
      if (key === 'href' && typeof newContent[key] === 'string') {
        if (newContent[key].includes(WRONG_URL)) {
          const oldUrl = newContent[key]
          newContent[key] = newContent[key].replace(WRONG_URL, CORRECT_URL)
          fixes.push({ path: `${path}.${key}`, old: oldUrl, new: newContent[key] })
        }
      } else {
        // Recurse into nested objects/arrays
        const result = fixUrlsInContent(newContent[key], `${path}.${key}`)
        newContent[key] = result.content
        fixes = fixes.concat(result.fixes)
      }
    }

    return { content: newContent, fixes }
  }

  // If it's a string field (not href), check for URLs in text
  if (typeof content === 'string' && content.includes(WRONG_URL)) {
    const newContent = content.replace(new RegExp(WRONG_URL, 'g'), CORRECT_URL)
    fixes.push({ path, old: content, new: newContent })
    return { content: newContent, fixes }
  }

  return { content, fixes }
}

// Fetch ALL blog posts
const blogPosts = await client.fetch(`
  *[_type == "blogPost"] {
    _id,
    title,
    "slug": slug.current,
    content
  }
`)

console.log(`Found ${blogPosts.length} blog posts to scan...`)
console.log('')

let totalDocumentsFixed = 0
let totalLinksFixed = 0

for (const post of blogPosts) {
  const result = fixUrlsInContent(post.content)

  if (result.fixes.length > 0) {
    console.log(`📝 ${post.title}`)
    console.log(`   Slug: /blog/${post.slug}`)
    console.log(`   Found ${result.fixes.length} link(s) to fix:`)

    for (const fix of result.fixes) {
      console.log(`   - ${fix.old}`)
      console.log(`     → ${fix.new}`)
    }

    // Update the document
    try {
      await client.patch(post._id)
        .set({ content: result.content })
        .commit()
      console.log(`   ✓ Updated successfully`)
      totalDocumentsFixed++
      totalLinksFixed += result.fixes.length
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}`)
    }
    console.log('')
  }
}

// Also check locations and situations for any hardcoded URLs
console.log('-'.repeat(80))
console.log('Checking location pages...')

const locations = await client.fetch(`*[_type == "location"]{ _id, city, problemStatement }`)
for (const loc of locations) {
  const result = fixUrlsInContent(loc.problemStatement)
  if (result.fixes.length > 0) {
    console.log(`📍 Location: ${loc.city} - ${result.fixes.length} fix(es)`)
    await client.patch(loc._id).set({ problemStatement: result.content }).commit()
    totalDocumentsFixed++
    totalLinksFixed += result.fixes.length
  }
}

console.log('Checking situation pages...')

const situations = await client.fetch(`*[_type == "situation"]{ _id, title, problemDescription }`)
for (const sit of situations) {
  const result = fixUrlsInContent(sit.problemDescription)
  if (result.fixes.length > 0) {
    console.log(`🏠 Situation: ${sit.title} - ${result.fixes.length} fix(es)`)
    await client.patch(sit._id).set({ problemDescription: result.content }).commit()
    totalDocumentsFixed++
    totalLinksFixed += result.fixes.length
  }
}

console.log('')
console.log('='.repeat(80))
console.log('SUMMARY')
console.log('='.repeat(80))

if (totalLinksFixed === 0) {
  console.log('✅ No redirect links found! All URLs already use www.')
} else {
  console.log(`✅ Fixed ${totalLinksFixed} link(s) across ${totalDocumentsFixed} document(s)`)
}

console.log('')
console.log('All internal links now point to https://www.clearedgehomebuyers.com')
