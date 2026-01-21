/**
 * Check inline links in the water damage blog post
 * Run with: node scripts/check-inline-links.mjs
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

const BLOG_SLUG = 'selling-water-damaged-house-18102-mold-issues'

// Get the blog post content to check for inline links
const post = await client.fetch(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    title,
    content
  }
`, { slug: BLOG_SLUG })

// Find all links in the content
const links = []
function findLinks(blocks) {
  if (!blocks) return
  for (const block of blocks) {
    if (block._type === 'block' && block.markDefs) {
      for (const mark of block.markDefs) {
        if (mark._type === 'link' && mark.href) {
          links.push(mark.href)
        }
      }
    }
  }
}
findLinks(post.content)

console.log('='.repeat(80))
console.log(`INLINE LINKS IN: ${post.title}`)
console.log('='.repeat(80))
console.log('')

if (links.length === 0) {
  console.log('No inline links found in content.')
} else {
  console.log(`Found ${links.length} inline link(s):`)
  const internalLinks = links.filter(l => l.startsWith('/') || l.includes('clearedgehomebuyers.com'))
  const externalLinks = links.filter(l => !l.startsWith('/') && !l.includes('clearedgehomebuyers.com'))

  console.log('')
  console.log('Internal links:')
  if (internalLinks.length > 0) {
    internalLinks.forEach(link => console.log(`  ${link}`))
  } else {
    console.log('  (none)')
  }

  console.log('')
  console.log('External links:')
  if (externalLinks.length > 0) {
    externalLinks.forEach(link => console.log(`  ${link}`))
  } else {
    console.log('  (none)')
  }
}
