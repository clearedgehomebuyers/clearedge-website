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

// Generate unique key for blocks
let keyCounter = 0
function uniqueKey(prefix = 'k') {
  return `${prefix}${Date.now()}${keyCounter++}`
}

// Helper to create a block with a link
function textBlockWithLink(beforeText, linkText, href, afterText) {
  const linkKey = uniqueKey('link')
  return {
    _type: 'block',
    _key: uniqueKey('block'),
    style: 'normal',
    children: [
      { _type: 'span', _key: uniqueKey('span'), text: beforeText, marks: [] },
      { _type: 'span', _key: uniqueKey('span'), text: linkText, marks: [linkKey] },
      { _type: 'span', _key: uniqueKey('span'), text: afterText, marks: [] },
    ],
    markDefs: [
      { _type: 'link', _key: linkKey, href },
    ],
  }
}

async function main() {
  console.log('='.repeat(70))
  console.log('Adding Internal Links TO "Are Cash Home Buyers Legit?" Page')
  console.log('='.repeat(70))

  // Add links from situations where trust/scam concerns are likely
  const situationsToUpdate = ['foreclosure', 'inherited-property']

  for (const slug of situationsToUpdate) {
    console.log(`\nUpdating ${slug} situation...`)
    const situation = await client.fetch(
      `*[_type == "situation" && slug.current == $slug][0]`,
      { slug }
    )

    if (situation && situation.problemDescription) {
      const contentStr = JSON.stringify(situation.problemDescription)
      if (!contentStr.includes('are-cash-home-buyers-legit')) {
        const legitLink = textBlockWithLink(
          'Worried about scams? Learn ',
          'how to tell if a cash buyer is legit',
          '/are-cash-home-buyers-legit',
          ' before signing anything.'
        )

        const updatedContent = [...situation.problemDescription, legitLink]
        await client.patch(situation._id).set({ problemDescription: updatedContent }).commit()
        console.log(`   ✅ Added legitimacy link to ${slug}`)
      } else {
        console.log(`   ⏭️ ${slug} already has legitimacy link`)
      }
    }
  }

  console.log('\n' + '='.repeat(70))
  console.log('Internal linking complete!')
  console.log('='.repeat(70))
}

main().catch(console.error)
