// Insert the Move 1 mid-article CTA block into the probate blog post.
// Dry-run by default; pass --yes to write. Idempotent (skips if the block exists).
// Placement: end of the "When You MUST Go Through Probate" section, immediately
// before the "How to Sell an Inherited House During Probate" H2 (peak engagement point).
import { createClient } from '@sanity/client'
import { randomBytes } from 'crypto'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2026-01-02',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const SLUG = 'sell-deceased-parents-house-without-probate-pennsylvania'
const ANCHOR_HEADING = 'When You MUST Go Through Probate'
const CTA_LOCATION = 'probate_blog_midarticle'

const ctaBlock = {
  _type: 'ctaBlock',
  _key: randomBytes(6).toString('hex'),
  heading: "Dealing with a deceased parent's property in Pennsylvania?",
  // Claim-backed variant: "dozens" is already live in this post's own body
  // ("I've helped dozens of families across Eastern Pennsylvania...") and the
  // site-wide claim is 200+ homes since 2016. Claim-free fallback below.
  body: "We've helped dozens of PA families through inherited-property situations — whether probate is open, closed, or hasn't started. Get a cash offer within 24 hours: no repairs, no agent fees, close in as little as 7–30 days.",
  // body: "We help PA families through inherited-property situations — whether probate is open, closed, or hasn't started. Get a cash offer within 24 hours: no repairs, no agent fees, close in as little as 7–30 days.",
  buttonText: 'Get My Cash Offer',
  ctaLocation: CTA_LOCATION,
}

const blockText = (block) =>
  (block.children || []).map((c) => c.text || '').join('')

async function main() {
  const write = process.argv.includes('--yes')
  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{ _id, content }`,
    { slug: SLUG }
  )
  if (!post) throw new Error(`Post not found: ${SLUG}`)

  if (post.content.some((b) => b._type === 'ctaBlock' && b.ctaLocation === CTA_LOCATION)) {
    console.log('CTA block already present — nothing to do.')
    return
  }

  const anchorIdx = post.content.findIndex(
    (b) => b._type === 'block' && b.style === 'h2' && blockText(b).trim() === ANCHOR_HEADING
  )
  if (anchorIdx === -1) throw new Error(`Anchor H2 not found: "${ANCHOR_HEADING}"`)

  let insertIdx = post.content.length
  for (let i = anchorIdx + 1; i < post.content.length; i++) {
    const b = post.content[i]
    if (b._type === 'block' && b.style === 'h2') {
      insertIdx = i
      break
    }
  }

  const before = post.content[insertIdx - 1]
  const after = post.content[insertIdx]
  console.log(`Post: ${post._id}`)
  console.log(`Inserting at index ${insertIdx}:`)
  console.log(`  after:  [${before._type}/${before.style || ''}] "${blockText(before).slice(0, 70)}"`)
  console.log(`  before: ${after ? `[${after._type}/${after.style || ''}] "${blockText(after).slice(0, 70)}"` : '(end of content)'}`)

  if (!write) {
    console.log('\nDRY RUN — no changes written. Re-run with --yes to insert.')
    return
  }

  const content = [...post.content]
  content.splice(insertIdx, 0, ctaBlock)
  await client.patch(post._id).set({ content }).commit()
  console.log('CTA block inserted.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
