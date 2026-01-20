/**
 * Add inline links to water damage blog post in 3 related articles
 * Run with: node scripts/add-water-damage-links.mjs
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

const WATER_DAMAGE_URL = '/blog/selling-water-damaged-house-18102-mold-issues'

console.log('='.repeat(100))
console.log('ADDING INLINE LINKS TO WATER DAMAGE BLOG POST')
console.log('Target URL:', WATER_DAMAGE_URL)
console.log('='.repeat(100))

// ============================================================================
// 1. Update sell-my-house-fast-allentown
// ============================================================================
console.log('\n1. Updating: sell-my-house-fast-allentown')
console.log('-'.repeat(100))

const allentownPost = await client.fetch(`
  *[_type == "blogPost" && slug.current == "sell-my-house-fast-allentown"][0] {
    _id,
    content
  }
`)

if (allentownPost) {
  const newContent = allentownPost.content.map(block => {
    if (block._key === 'block19' && block._type === 'block') {
      // Current: "Major repairs — that would cost more than the house is worth to fix"
      // New: "Major repairs — like water damage or mold issues — that would cost more than the house is worth to fix"
      // With "water damage or mold issues" linked

      const linkKey = 'link-wd-allentown'

      return {
        ...block,
        markDefs: [
          ...(block.markDefs || []),
          {
            _type: 'link',
            _key: linkKey,
            href: WATER_DAMAGE_URL,
          }
        ],
        children: [
          { _type: 'span', _key: 'span1', text: 'Major repairs — like ', marks: [] },
          { _type: 'span', _key: 'span2', text: 'water damage or mold issues', marks: [linkKey] },
          { _type: 'span', _key: 'span3', text: ' — that would cost more than the house is worth to fix', marks: [] },
        ]
      }
    }
    return block
  })

  await client.patch(allentownPost._id).set({ content: newContent }).commit()
  console.log('✓ Updated block19: Added "water damage or mold issues" link')
} else {
  console.log('❌ Post not found')
}

// ============================================================================
// 2. Update sell-my-house-fast-lehigh-valley
// ============================================================================
console.log('\n2. Updating: sell-my-house-fast-lehigh-valley')
console.log('-'.repeat(100))

const lehighPost = await client.fetch(`
  *[_type == "blogPost" && slug.current == "sell-my-house-fast-lehigh-valley"][0] {
    _id,
    content
  }
`)

if (lehighPost) {
  const newContent = lehighPost.content.map(block => {
    if (block._key === 'sit4' && block._type === 'block') {
      // Current: "Major repairs needed — Foundation issues? Roof problems? Mold? We buy as-is. You don't have to fix anything."
      // New: "Major repairs needed — Foundation issues? Roof problems? Water damage or mold? We buy as-is. You don't have to fix anything."
      // With "Water damage or mold" linked

      const linkKey = 'link-wd-lehigh'

      return {
        ...block,
        markDefs: [
          ...(block.markDefs || []),
          {
            _type: 'link',
            _key: linkKey,
            href: WATER_DAMAGE_URL,
          }
        ],
        children: [
          { _type: 'span', _key: 'span1', text: 'Major repairs needed — Foundation issues? Roof problems? ', marks: [] },
          { _type: 'span', _key: 'span2', text: 'Water damage or mold', marks: [linkKey] },
          { _type: 'span', _key: 'span3', text: '? We buy as-is. You don\'t have to fix anything.', marks: [] },
        ]
      }
    }
    return block
  })

  await client.patch(lehighPost._id).set({ content: newContent }).commit()
  console.log('✓ Updated sit4: Changed "Mold?" to "Water damage or mold?" with link')
} else {
  console.log('❌ Post not found')
}

// ============================================================================
// 3. Update selling-house-international-property-maintenance-code-violations-bethlehem
// ============================================================================
console.log('\n3. Updating: selling-house-international-property-maintenance-code-violations-bethlehem')
console.log('-'.repeat(100))

const bethlehemPost = await client.fetch(`
  *[_type == "blogPost" && slug.current == "selling-house-international-property-maintenance-code-violations-bethlehem"][0] {
    _id,
    content
  }
`)

if (bethlehemPost) {
  // Find the index of when2 block
  const when2Index = bethlehemPost.content.findIndex(block => block._key === 'when2')

  if (when2Index !== -1) {
    const when2Block = bethlehemPost.content[when2Index]

    // Current text has bullet points, we need to add a new one
    // Looking at the current children structure to insert properly
    const currentText = when2Block.children?.map(c => c.text).join('') || ''

    // The block contains bullet points as a single text block
    // We need to insert "• You're dealing with water damage or mold problems\n" after "• You've inherited a property with violations"

    const linkKey = 'link-wd-bethlehem'

    // Split the text and insert new bullet
    const insertAfter = "• You've inherited a property with violations"
    const newBullet = "\n• You're dealing with water damage or mold problems"

    if (currentText.includes(insertAfter)) {
      const parts = currentText.split(insertAfter)

      const newBlock = {
        ...when2Block,
        markDefs: [
          ...(when2Block.markDefs || []),
          {
            _type: 'link',
            _key: linkKey,
            href: WATER_DAMAGE_URL,
          }
        ],
        children: [
          { _type: 'span', _key: 'sp1', text: parts[0] + insertAfter + '\n• You\'re dealing with ', marks: [] },
          { _type: 'span', _key: 'sp2', text: 'water damage or mold problems', marks: [linkKey] },
          { _type: 'span', _key: 'sp3', text: parts[1], marks: [] },
        ]
      }

      const newContent = [...bethlehemPost.content]
      newContent[when2Index] = newBlock

      await client.patch(bethlehemPost._id).set({ content: newContent }).commit()
      console.log('✓ Updated when2: Added new bullet "You\'re dealing with water damage or mold problems" with link')
    } else {
      console.log('❌ Could not find insertion point in when2 block')
      console.log('Current text:', currentText.substring(0, 200))
    }
  } else {
    console.log('❌ Block when2 not found')
  }
} else {
  console.log('❌ Post not found')
}

// ============================================================================
// Verification
// ============================================================================
console.log('\n')
console.log('='.repeat(100))
console.log('VERIFICATION')
console.log('='.repeat(100))

// Check all 3 posts for the new links
const verifyPosts = [
  'sell-my-house-fast-allentown',
  'sell-my-house-fast-lehigh-valley',
  'selling-house-international-property-maintenance-code-violations-bethlehem',
]

for (const slug of verifyPosts) {
  const post = await client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      title,
      content
    }
  `, { slug })

  if (!post) continue

  // Find links to water damage article
  let linkCount = 0
  for (const block of post.content || []) {
    if (block.markDefs) {
      for (const mark of block.markDefs) {
        if (mark.href === WATER_DAMAGE_URL) {
          linkCount++
        }
      }
    }
  }

  console.log(`\n${post.title}`)
  console.log(`  Links to water damage article: ${linkCount}`)
  if (linkCount > 0) {
    console.log('  ✓ Link added successfully')
  } else {
    console.log('  ❌ No link found')
  }
}

console.log('\n')
console.log('='.repeat(100))
console.log('COMPLETE')
console.log('='.repeat(100))
console.log('\nThe water damage blog post now has internal links from:')
console.log('  • /blog/sell-my-house-fast-allentown')
console.log('  • /blog/sell-my-house-fast-lehigh-valley')
console.log('  • /blog/selling-house-international-property-maintenance-code-violations-bethlehem')
console.log('\nPlus it appears in "Related Articles" on:')
console.log('  • /locations/allentown')
console.log('  • /locations/lehigh-valley')
console.log('  • /situations/major-repairs')
