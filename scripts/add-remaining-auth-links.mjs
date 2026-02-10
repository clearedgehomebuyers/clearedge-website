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
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Generate unique keys
let keyCounter = 0
function uniqueKey(prefix = 'k') {
  return `${prefix}${Date.now()}${keyCounter++}`
}

// Remaining posts that need links - with broader anchor text options
const blogPostLinks = {
  // Pottsville - Coal Region
  'cash-home-buyers-pottsville-pa': [
    { anchorText: 'coal region', href: 'https://www.co.schuylkill.pa.us/', openInNewTab: true },
    { anchorText: 'Coal Region', href: 'https://www.co.schuylkill.pa.us/', openInNewTab: true },
    { anchorText: 'Schuylkill', href: 'https://www.co.schuylkill.pa.us/', openInNewTab: true },
  ],

  // Easton Rental
  'easton-pa-rental-inspection-checklist-2026': [
    { anchorText: 'landlord', href: 'https://www.northamptoncounty.org/', openInNewTab: true },
    { anchorText: 'rental', href: 'https://www.easton-pa.com/', openInNewTab: true },
    { anchorText: 'inspection', href: 'https://codes.iccsafe.org/content/IPMC2021P1', openInNewTab: true },
  ],

  // Berks Judicial Sale
  'how-to-stop-berks-county-judicial-sale-2026': [
    { anchorText: 'tax', href: 'https://www.co.berks.pa.us/Dept/TaxClaim/Pages/default.aspx', openInNewTab: true },
    { anchorText: 'county', href: 'https://www.co.berks.pa.us/', openInNewTab: true },
    { anchorText: 'delinquent', href: 'https://www.co.berks.pa.us/Dept/TaxClaim/Pages/default.aspx', openInNewTab: true },
  ],

  // Lehigh Valley
  'sell-my-house-fast-lehigh-valley': [
    { anchorText: 'Lehigh Valley', href: 'https://www.lehighvalley.org/', openInNewTab: true },
    { anchorText: 'valley', href: 'https://www.lehighvalley.org/', openInNewTab: true },
  ],
}

// Process a single block to add links - ONLY FIRST occurrence
function processBlock(block, linksToAdd, addedHrefs) {
  if (block._type !== 'block' || !block.children) {
    return { block, added: [] }
  }

  const added = []
  const newChildren = []
  const newMarkDefs = [...(block.markDefs || [])]

  for (const child of block.children) {
    if (child._type !== 'span') {
      newChildren.push(child)
      continue
    }

    let text = child.text
    let currentMarks = [...(child.marks || [])]
    let segments = [{ text, marks: currentMarks }]

    // Check each link to add
    for (const linkConfig of linksToAdd) {
      // Skip if we've already added this link to the document
      if (addedHrefs.has(linkConfig.href)) {
        continue
      }

      const newSegments = []

      for (const segment of segments) {
        const idx = segment.text.toLowerCase().indexOf(linkConfig.anchorText.toLowerCase())

        if (idx === -1) {
          newSegments.push(segment)
          continue
        }

        // Check if this text already has a link mark
        const hasLinkMark = segment.marks.some(mark =>
          newMarkDefs.find(md => md._key === mark && md._type === 'link')
        )

        if (hasLinkMark) {
          newSegments.push(segment)
          continue
        }

        // Only add one instance per href
        if (addedHrefs.has(linkConfig.href)) {
          newSegments.push(segment)
          continue
        }

        // Split the text into before, anchor, and after
        const before = segment.text.substring(0, idx)
        const anchor = segment.text.substring(idx, idx + linkConfig.anchorText.length)
        const after = segment.text.substring(idx + linkConfig.anchorText.length)

        // Create new link mark definition
        const linkKey = uniqueKey('authlink')
        newMarkDefs.push({
          _type: 'link',
          _key: linkKey,
          href: linkConfig.href,
          openInNewTab: linkConfig.openInNewTab,
        })

        if (before) {
          newSegments.push({ text: before, marks: segment.marks })
        }
        newSegments.push({ text: anchor, marks: [...segment.marks, linkKey] })
        if (after) {
          newSegments.push({ text: after, marks: segment.marks })
        }

        added.push({ anchorText: anchor, href: linkConfig.href })
        addedHrefs.add(linkConfig.href) // Mark this href as added
      }

      segments = newSegments
    }

    // Convert segments back to children
    for (const seg of segments) {
      newChildren.push({
        _type: 'span',
        _key: uniqueKey('span'),
        text: seg.text,
        marks: seg.marks,
      })
    }
  }

  return {
    block: {
      ...block,
      children: newChildren,
      markDefs: newMarkDefs,
    },
    added,
  }
}

// Check if a link already exists in the content
function linkExistsInContent(content, href) {
  const contentStr = JSON.stringify(content)
  return contentStr.includes(href)
}

// Process a blog post - limit to 2-3 links
async function processBlogPost(slug, linksToAdd) {
  console.log(`\n📝 Processing: ${slug}`)

  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{ _id, title, content }`,
    { slug }
  )

  if (!post) {
    console.log(`  ⚠️ Post not found: ${slug}`)
    return { added: 0, skipped: 0 }
  }

  // Filter out links that already exist
  const linksToProcess = linksToAdd.filter(link => {
    if (linkExistsInContent(post.content, link.href)) {
      console.log(`  ⏭️ Link already exists: ${link.anchorText} → ${link.href}`)
      return false
    }
    return true
  })

  if (linksToProcess.length === 0) {
    console.log(`  ✅ All links already present`)
    return { added: 0, skipped: linksToAdd.length }
  }

  // Track which hrefs we've added to this document
  const addedHrefs = new Set()

  // Process each block in the content
  const newContent = []
  let totalAdded = []

  for (const block of post.content || []) {
    const { block: processedBlock, added } = processBlock(block, linksToProcess, addedHrefs)
    newContent.push(processedBlock)
    totalAdded.push(...added)
  }

  if (totalAdded.length === 0) {
    console.log(`  ⚠️ No anchor text found for any links`)
    return { added: 0, skipped: 0 }
  }

  // Update the post
  await client
    .patch(post._id)
    .set({ content: newContent })
    .commit()

  for (const link of totalAdded) {
    console.log(`  ✅ Added: "${link.anchorText}" → ${link.href}`)
  }

  return { added: totalAdded.length, skipped: linksToAdd.length - linksToProcess.length }
}

async function main() {
  console.log('='.repeat(70))
  console.log('Adding Remaining Authoritative Links (4 posts)')
  console.log('='.repeat(70))

  let totalAdded = 0

  for (const [slug, links] of Object.entries(blogPostLinks)) {
    const result = await processBlogPost(slug, links)
    totalAdded += result.added
    await new Promise(r => setTimeout(r, 300))
  }

  console.log('\n' + '='.repeat(70))
  console.log(`Total links added: ${totalAdded}`)
  console.log('='.repeat(70))
}

main().catch(console.error)
