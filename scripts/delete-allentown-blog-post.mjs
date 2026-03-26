/**
 * Delete the "Sell My House Fast Allentown" blog post from Sanity CMS
 *
 * This script:
 * 1. Finds the blog post by slug
 * 2. Removes all references to it from other documents
 * 3. Deletes the blog post document
 *
 * Run: node scripts/delete-allentown-blog-post.mjs
 *
 * The 301 redirect from /blog/sell-my-house-fast-allentown → /locations/allentown
 * is already configured in next.config.ts
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const SLUG = 'sell-my-house-fast-allentown'

async function main() {
  console.log(`\nLooking up blog post: ${SLUG}`)

  // Find the blog post
  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{ _id, title }`,
    { slug: SLUG }
  )

  if (!post) {
    console.log('Blog post not found — may have already been deleted.')
    return
  }

  console.log(`Found: "${post.title}" (${post._id})`)

  // Check for references to this post from other documents
  const refs = await client.fetch(
    `*[references($id) && _type != "blogPost"]{ _id, _type, title }`,
    { id: post._id }
  )

  if (refs.length > 0) {
    console.log(`\nFound ${refs.length} document(s) referencing this post:`)
    refs.forEach(ref => console.log(`  - ${ref._type}: ${ref.title || ref._id}`))
    console.log('These references will need to be removed before deletion.')

    // Remove references from location documents (relatedBlogPosts arrays)
    for (const ref of refs) {
      console.log(`  Removing reference from ${ref._type}: ${ref.title || ref._id}`)
      await client
        .patch(ref._id)
        .unset([`relatedLocations[_ref=="${post._id}"]`, `relatedBlogPosts[_ref=="${post._id}"]`])
        .commit()
    }
  }

  // Also check blog posts that reference this one
  const blogRefs = await client.fetch(
    `*[_type == "blogPost" && references($id) && _id != $id]{ _id, title }`,
    { id: post._id }
  )

  if (blogRefs.length > 0) {
    console.log(`\n${blogRefs.length} other blog post(s) reference this post:`)
    blogRefs.forEach(ref => console.log(`  - ${ref.title}`))
    console.log('Note: Inline content links will be caught by the 301 redirect.')
  }

  // Delete the blog post
  console.log(`\nDeleting blog post: "${post.title}"...`)
  await client.delete(post._id)
  console.log('Deleted successfully.')

  // Also delete any drafts
  const draftId = `drafts.${post._id}`
  try {
    await client.delete(draftId)
    console.log('Draft version also deleted.')
  } catch {
    // No draft exists, that's fine
  }

  console.log('\n✓ Blog post deleted from Sanity')
  console.log('✓ 301 redirect configured in next.config.ts')
  console.log('✓ Sitemap will auto-exclude (dynamic from Sanity)')
  console.log('\nDone!')
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
