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

// Helper to create a link block
function createLinkBlock(text, linkText, href, keyPrefix) {
  const timestamp = Date.now()
  return {
    _type: 'block',
    _key: `${keyPrefix}-${timestamp}`,
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: `span1-${keyPrefix}-${timestamp}`,
        text: text,
        marks: [],
      },
      {
        _type: 'span',
        _key: `span2-${keyPrefix}-${timestamp}`,
        text: linkText,
        marks: [`link-${keyPrefix}`],
      },
      {
        _type: 'span',
        _key: `span3-${keyPrefix}-${timestamp}`,
        text: '.',
        marks: [],
      },
    ],
    markDefs: [
      {
        _type: 'link',
        _key: `link-${keyPrefix}`,
        href: href,
      },
    ],
  }
}

// Check if content already has a link to a specific URL
function hasLinkTo(content, href) {
  if (!content) return false
  const contentStr = JSON.stringify(content)
  return contentStr.includes(href)
}

// Add link to location's problemStatement
async function addLinkToLocation(slug, linkConfig) {
  console.log(`  Processing location: ${slug}`)

  const location = await client.fetch(
    `*[_type == "location" && slug.current == $slug][0]{ _id, city, problemStatement }`,
    { slug }
  )

  if (!location) {
    console.log(`    ⚠️ Location not found: ${slug}`)
    return false
  }

  if (hasLinkTo(location.problemStatement, linkConfig.href)) {
    console.log(`    ⏭️ Link already exists`)
    return false
  }

  const currentContent = location.problemStatement || []
  const newBlock = createLinkBlock(linkConfig.text, linkConfig.linkText, linkConfig.href, `loc-${slug}`)

  await client
    .patch(location._id)
    .set({ problemStatement: [...currentContent, newBlock] })
    .commit()

  console.log(`    ✅ Added link to ${location.city}`)
  return true
}

// Add link to situation's problemDescription
async function addLinkToSituation(slug, linkConfig) {
  console.log(`  Processing situation: ${slug}`)

  const situation = await client.fetch(
    `*[_type == "situation" && slug.current == $slug][0]{ _id, title, problemDescription }`,
    { slug }
  )

  if (!situation) {
    console.log(`    ⚠️ Situation not found: ${slug}`)
    return false
  }

  if (hasLinkTo(situation.problemDescription, linkConfig.href)) {
    console.log(`    ⏭️ Link already exists`)
    return false
  }

  const currentContent = situation.problemDescription || []
  const newBlock = createLinkBlock(linkConfig.text, linkConfig.linkText, linkConfig.href, `sit-${slug}`)

  await client
    .patch(situation._id)
    .set({ problemDescription: [...currentContent, newBlock] })
    .commit()

  console.log(`    ✅ Added link to ${situation.title}`)
  return true
}

// Add link to blog post's content
async function addLinkToBlogPost(slug, linkConfig) {
  console.log(`  Processing blog post: ${slug}`)

  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{ _id, title, content }`,
    { slug }
  )

  if (!post) {
    console.log(`    ⚠️ Blog post not found: ${slug}`)
    return false
  }

  if (hasLinkTo(post.content, linkConfig.href)) {
    console.log(`    ⏭️ Link already exists`)
    return false
  }

  const currentContent = post.content || []

  // Create a "Related Reading" section if adding cross-links
  const relatedHeader = {
    _type: 'block',
    _key: `related-header-${Date.now()}`,
    style: 'h2',
    children: [
      {
        _type: 'span',
        _key: `rh-span-${Date.now()}`,
        text: 'Related Reading',
        marks: [],
      },
    ],
    markDefs: [],
  }

  const newBlock = createLinkBlock(linkConfig.text, linkConfig.linkText, linkConfig.href, `blog-${slug.substring(0, 10)}`)

  // Check if "Related Reading" section already exists
  const hasRelatedSection = currentContent.some(
    block => block.style === 'h2' && JSON.stringify(block).includes('Related Reading')
  )

  let updatedContent
  if (hasRelatedSection) {
    // Just add the link block at the end
    updatedContent = [...currentContent, newBlock]
  } else {
    // Add header and link block
    updatedContent = [...currentContent, relatedHeader, newBlock]
  }

  await client
    .patch(post._id)
    .set({ content: updatedContent })
    .commit()

  console.log(`    ✅ Added link to "${post.title.substring(0, 40)}..."`)
  return true
}

async function main() {
  console.log('='.repeat(60))
  console.log('Adding Internal Links Across Site')
  console.log('='.repeat(60))

  // ============================================================
  // 1. ALLENTOWN BLOG POST LINKS
  // ============================================================
  console.log('\n📍 ALLENTOWN BLOG POST LINKS')
  console.log('-'.repeat(40))

  await addLinkToLocation('allentown', {
    text: 'Read our complete guide: ',
    linkText: 'Sell My House Fast Allentown',
    href: '/blog/sell-my-house-fast-allentown',
  })

  await addLinkToLocation('bethlehem', {
    text: 'Selling in the Lehigh Valley? Check out our ',
    linkText: 'Allentown home selling guide',
    href: '/blog/sell-my-house-fast-allentown',
  })

  await addLinkToLocation('easton', {
    text: 'For tips on selling fast in the Lehigh Valley area, see our ',
    linkText: 'Allentown guide',
    href: '/blog/sell-my-house-fast-allentown',
  })

  // ============================================================
  // 2. INHERITED PROPERTY / PROBATE BLOG POST LINKS
  // ============================================================
  console.log('\n📜 INHERITED PROPERTY BLOG POST LINKS')
  console.log('-'.repeat(40))

  await addLinkToSituation('inherited-property', {
    text: 'Learn more: ',
    linkText: 'Can You Sell a Deceased Parent\'s House Without Probate in PA?',
    href: '/blog/sell-deceased-parents-house-without-probate-pennsylvania',
  })

  // Add small delay to avoid rate limiting
  await new Promise(r => setTimeout(r, 500))

  await addLinkToSituation('inherited-property', {
    text: 'Need to know what paperwork you\'ll need? ',
    linkText: 'See our complete document checklist',
    href: '/blog/documents-required-selling-inherited-property-pennsylvania',
  })

  // ============================================================
  // 3. FORECLOSURE BLOG POST LINKS
  // ============================================================
  console.log('\n🏠 FORECLOSURE BLOG POST LINKS')
  console.log('-'.repeat(40))

  await addLinkToLocation('scranton', {
    text: 'Facing foreclosure? Read our guide: ',
    linkText: 'How to Avoid Foreclosure in Scranton PA',
    href: '/blog/avoid-foreclosure-scranton-pa',
  })

  await addLinkToLocation('dunmore', {
    text: 'If you\'re behind on payments, see ',
    linkText: 'our Scranton foreclosure guide',
    href: '/blog/avoid-foreclosure-scranton-pa',
  })

  await addLinkToSituation('foreclosure', {
    text: 'Get the complete breakdown: ',
    linkText: '7 Ways to Avoid Foreclosure in Scranton PA',
    href: '/blog/avoid-foreclosure-scranton-pa',
  })

  // ============================================================
  // 4. LACKAWANNA COUNTY CASH BUYERS BLOG POST LINKS
  // ============================================================
  console.log('\n💰 LACKAWANNA COUNTY CASH BUYERS LINKS')
  console.log('-'.repeat(40))

  await addLinkToLocation('scranton', {
    text: 'Learn about working with cash buyers: ',
    linkText: 'Cash Home Buyers in Lackawanna County',
    href: '/blog/cash-home-buyers-lackawanna-county-no-fees',
  })

  await addLinkToLocation('dunmore', {
    text: 'Want to understand cash offers? Read ',
    linkText: 'Cash Home Buyers Lackawanna County',
    href: '/blog/cash-home-buyers-lackawanna-county-no-fees',
  })

  await addLinkToLocation('carbondale', {
    text: 'Considering a cash sale? See our guide: ',
    linkText: 'Cash Home Buyers in Lackawanna County',
    href: '/blog/cash-home-buyers-lackawanna-county-no-fees',
  })

  // ============================================================
  // 5. CROSS-LINKS BETWEEN BLOG POSTS
  // ============================================================
  console.log('\n🔗 CROSS-LINKS BETWEEN BLOG POSTS')
  console.log('-'.repeat(40))

  // Documents post → Probate post
  await addLinkToBlogPost('documents-required-selling-inherited-property-pennsylvania', {
    text: 'Not sure if you need probate? Read ',
    linkText: 'Can You Sell Without Probate in PA?',
    href: '/blog/sell-deceased-parents-house-without-probate-pennsylvania',
  })

  // Probate post → Documents post
  await addLinkToBlogPost('sell-deceased-parents-house-without-probate-pennsylvania', {
    text: 'For the complete document checklist, see ',
    linkText: 'Documents Required for Selling Inherited Property',
    href: '/blog/documents-required-selling-inherited-property-pennsylvania',
  })

  // Lackawanna cash buyers → Luzerne county
  await addLinkToBlogPost('cash-home-buyers-lackawanna-county-no-fees', {
    text: 'If you\'re in Luzerne County, see our guide: ',
    linkText: 'Sell My House Fast Luzerne County PA',
    href: '/blog/sell-my-house-fast-luzerne-county-pa',
  })

  // Luzerne county → Lackawanna cash buyers
  await addLinkToBlogPost('sell-my-house-fast-luzerne-county-pa', {
    text: 'For Lackawanna County (Scranton area), read ',
    linkText: 'Cash Home Buyers Lackawanna County',
    href: '/blog/cash-home-buyers-lackawanna-county-no-fees',
  })

  // Foreclosure Scranton → Cash buyers Lackawanna
  await addLinkToBlogPost('avoid-foreclosure-scranton-pa', {
    text: 'Need a cash buyer? See ',
    linkText: 'Cash Home Buyers in Lackawanna County',
    href: '/blog/cash-home-buyers-lackawanna-county-no-fees',
  })

  console.log('\n' + '='.repeat(60))
  console.log('✅ INTERNAL LINKING COMPLETE')
  console.log('='.repeat(60))
}

main().catch(console.error)
