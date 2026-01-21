/**
 * Get full content of blog posts for link placement analysis
 * Run with: node scripts/get-full-content.mjs
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

const postsToCheck = [
  'sell-my-house-fast-allentown',
  'sell-my-house-fast-lehigh-valley',
  'selling-house-international-property-maintenance-code-violations-bethlehem',
]

// Helper to extract text with context
function extractTextWithKeys(blocks) {
  if (!blocks) return []
  const result = []

  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      const text = block.children.map(child => child.text || '').join('')
      if (text.trim()) {
        result.push({
          _key: block._key,
          text: text,
          style: block.style || 'normal',
        })
      }
    }
  }
  return result
}

for (const slug of postsToCheck) {
  const post = await client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      content
    }
  `, { slug })

  if (!post) continue

  console.log('\n' + '='.repeat(100))
  console.log(`POST: ${post.title}`)
  console.log(`SLUG: ${slug}`)
  console.log('='.repeat(100))

  const paragraphs = extractTextWithKeys(post.content)

  // Find paragraphs mentioning property issues, damage, conditions
  const relevantParagraphs = paragraphs.filter(p => {
    const t = p.text.toLowerCase()
    return t.includes('water') || t.includes('mold') || t.includes('damage') ||
           t.includes('condition') || t.includes('as-is') || t.includes('repair') ||
           t.includes('issue') || t.includes('problem')
  })

  console.log('\nRelevant paragraphs (mentioning damage/repairs/conditions):')
  console.log('-'.repeat(100))

  relevantParagraphs.forEach((p, i) => {
    console.log(`\n[${i + 1}] Key: ${p._key}`)
    if (p.style !== 'normal') console.log(`    Style: ${p.style}`)
    console.log(`    "${p.text}"`)
  })
}
