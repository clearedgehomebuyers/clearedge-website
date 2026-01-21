/**
 * Preview inline link additions for water damage blog post
 * Run with: node scripts/preview-inline-links.mjs
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

const WATER_DAMAGE_URL = '/blog/selling-water-damaged-house-18102-mold-issues'

const postsToCheck = [
  'sell-my-house-fast-allentown',
  'sell-my-house-fast-lehigh-valley',
  'selling-house-international-property-maintenance-code-violations-bethlehem',
]

// Helper to extract text from portable text blocks
function extractText(blocks) {
  if (!blocks) return []
  const paragraphs = []

  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      const text = block.children.map(child => child.text || '').join('')
      if (text.trim()) {
        paragraphs.push({
          _key: block._key,
          text: text,
          style: block.style || 'normal',
          hasLinks: block.markDefs && block.markDefs.length > 0,
          markDefs: block.markDefs || [],
          children: block.children,
        })
      }
    }
  }
  return paragraphs
}

// Find paragraphs that mention relevant keywords
function findLinkOpportunities(paragraphs, keywords) {
  const opportunities = []

  for (const para of paragraphs) {
    const textLower = para.text.toLowerCase()
    for (const keyword of keywords) {
      if (textLower.includes(keyword.toLowerCase())) {
        // Check if this text segment already has a link
        const hasExistingLink = para.markDefs.some(mark =>
          mark._type === 'link' && mark.href === WATER_DAMAGE_URL
        )
        if (!hasExistingLink) {
          opportunities.push({
            ...para,
            matchedKeyword: keyword,
          })
        }
        break
      }
    }
  }
  return opportunities
}

console.log('='.repeat(100))
console.log('PREVIEW: Inline Link Additions to Water Damage Blog Post')
console.log('Target URL:', WATER_DAMAGE_URL)
console.log('='.repeat(100))

for (const slug of postsToCheck) {
  const post = await client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      content
    }
  `, { slug })

  if (!post) {
    console.log(`\n❌ Post not found: ${slug}`)
    continue
  }

  console.log('\n')
  console.log('─'.repeat(100))
  console.log(`BLOG POST: ${post.title}`)
  console.log(`URL: /blog/${post.slug}`)
  console.log('─'.repeat(100))

  const paragraphs = extractText(post.content)

  // Keywords to search for link opportunities
  const keywords = ['water damage', 'mold', 'moisture', 'flood', 'leak', 'damage', 'as-is', 'property condition', 'repairs']

  const opportunities = findLinkOpportunities(paragraphs, keywords)

  if (opportunities.length === 0) {
    console.log('\nNo obvious link opportunities found for water damage keywords.')
    console.log('Showing first few paragraphs for manual review:')
    paragraphs.slice(0, 5).forEach((p, i) => {
      console.log(`\n[${i + 1}] ${p.style === 'h2' || p.style === 'h3' ? `[${p.style.toUpperCase()}] ` : ''}${p.text.substring(0, 200)}${p.text.length > 200 ? '...' : ''}`)
    })
  } else {
    console.log(`\nFound ${opportunities.length} potential link opportunity(ies):`)

    opportunities.slice(0, 3).forEach((opp, i) => {
      console.log(`\n[Opportunity ${i + 1}] Matched keyword: "${opp.matchedKeyword}"`)
      console.log(`Block key: ${opp._key}`)
      console.log(`\nCurrent text:`)
      console.log(`"${opp.text}"`)
    })
  }
}

console.log('\n')
console.log('='.repeat(100))
console.log('MANUAL REVIEW NEEDED')
console.log('='.repeat(100))
console.log(`
Based on the content above, here are the recommended link additions:

For each blog post, I'll show:
- The exact sentence/phrase to modify
- What the linked text should be
- The target URL: ${WATER_DAMAGE_URL}
`)
