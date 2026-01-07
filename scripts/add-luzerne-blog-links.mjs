import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Link text variations for each location
const linkTexts = {
  'wilkes-barre': {
    text: 'Want to learn more about selling your house fast in the area? Read our complete guide: ',
    linkText: 'Sell My House Fast Luzerne County PA',
  },
  'hazleton': {
    text: 'For a detailed breakdown of your options, check out our guide: ',
    linkText: 'Sell My House Fast Luzerne County PA',
  },
  'pittston': {
    text: 'Looking for more information? See our comprehensive guide: ',
    linkText: 'Sell My House Fast Luzerne County PA',
  },
  'kingston': {
    text: 'Want to explore all your options? Read our full guide: ',
    linkText: 'Sell My House Fast Luzerne County PA',
  },
}

async function addBlogLinks() {
  console.log('Starting to add internal links to Luzerne County locations...\n')

  const slugs = ['wilkes-barre', 'hazleton', 'pittston', 'kingston']

  for (const slug of slugs) {
    console.log(`Processing ${slug}...`)

    try {
      // Fetch the location
      const location = await client.fetch(
        `*[_type == "location" && slug.current == $slug][0]{ _id, city, problemStatement }`,
        { slug }
      )

      if (!location) {
        console.log(`  ⚠️ Location not found: ${slug}`)
        continue
      }

      console.log(`  Found: ${location.city}`)

      // Create the new block with link
      const linkConfig = linkTexts[slug]
      const newBlock = {
        _type: 'block',
        _key: `luzerne-blog-link-${Date.now()}`,
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: `span1-${Date.now()}`,
            text: linkConfig.text,
            marks: [],
          },
          {
            _type: 'span',
            _key: `span2-${Date.now()}`,
            text: linkConfig.linkText,
            marks: ['luzerneBlogLink'],
          },
          {
            _type: 'span',
            _key: `span3-${Date.now()}`,
            text: '.',
            marks: [],
          },
        ],
        markDefs: [
          {
            _type: 'link',
            _key: 'luzerneBlogLink',
            href: '/blog/sell-my-house-fast-luzerne-county-pa',
          },
        ],
      }

      // Get current problemStatement or create empty array
      const currentProblemStatement = location.problemStatement || []

      // Check if link already exists
      const hasLink = currentProblemStatement.some(block =>
        block._key?.includes('luzerne-blog-link') ||
        JSON.stringify(block).includes('sell-my-house-fast-luzerne-county-pa')
      )

      if (hasLink) {
        console.log(`  ⏭️ Link already exists, skipping`)
        continue
      }

      // Add the new block to problemStatement
      const updatedProblemStatement = [...currentProblemStatement, newBlock]

      // Update the document
      await client
        .patch(location._id)
        .set({ problemStatement: updatedProblemStatement })
        .commit()

      console.log(`  ✅ Added link to ${location.city}`)

    } catch (error) {
      console.error(`  ❌ Error updating ${slug}:`, error.message)
    }
  }

  console.log('\n✅ Done adding internal links!')
}

addBlogLinks()
