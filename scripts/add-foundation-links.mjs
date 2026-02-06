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
  console.log('Adding Internal Links TO Foundation & Structural Issues Page')
  console.log('='.repeat(70))

  // 1. Update major-repairs situation to link to foundation page
  console.log('\n1. Updating major-repairs situation...')
  const majorRepairs = await client.fetch(
    `*[_type == "situation" && slug.current == "major-repairs"][0]`
  )

  if (majorRepairs && majorRepairs.problemDescription) {
    // Add a new paragraph at the end linking to foundation page
    const foundationLink = textBlockWithLink(
      'For foundation-specific issues like cracked foundations, bowing basement walls, or mine subsidence damage, see our dedicated ',
      'Foundation & Structural Issues',
      '/situations/foundation-structural-issues',
      ' page.'
    )

    const updatedContent = [...majorRepairs.problemDescription, foundationLink]
    await client.patch(majorRepairs._id).set({ problemDescription: updatedContent }).commit()
    console.log('   ✅ Added link from major-repairs to foundation-structural-issues')
  }

  // 2. Update NEPA locations to link to foundation page (mine subsidence)
  console.log('\n2. Updating NEPA locations (mine subsidence relevant)...')
  const nepaLocations = ['scranton', 'wilkes-barre', 'dunmore', 'pittston', 'carbondale', 'hazleton']

  for (const slug of nepaLocations) {
    const location = await client.fetch(
      `*[_type == "location" && slug.current == $slug][0]`,
      { slug }
    )

    if (location && location.problemStatement) {
      // Check if already has foundation link
      const contentStr = JSON.stringify(location.problemStatement)
      if (!contentStr.includes('foundation-structural-issues')) {
        const foundationLink = textBlockWithLink(
          'Dealing with foundation problems or mine subsidence damage? Learn about selling a house with ',
          'foundation or structural issues',
          '/situations/foundation-structural-issues',
          '.'
        )

        const updatedContent = [...location.problemStatement, foundationLink]
        await client.patch(location._id).set({ problemStatement: updatedContent }).commit()
        console.log(`   ✅ Added foundation link to ${slug}`)
      } else {
        console.log(`   ⏭️ ${slug} already has foundation link`)
      }
    }
  }

  // 3. Update some Lehigh Valley locations
  console.log('\n3. Updating Lehigh Valley locations...')
  const lehighLocations = ['allentown', 'bethlehem', 'easton']

  for (const slug of lehighLocations) {
    const location = await client.fetch(
      `*[_type == "location" && slug.current == $slug][0]`,
      { slug }
    )

    if (location && location.problemStatement) {
      const contentStr = JSON.stringify(location.problemStatement)
      if (!contentStr.includes('foundation-structural-issues')) {
        const foundationLink = textBlockWithLink(
          'Have a house with structural damage or foundation problems? We buy homes with ',
          'foundation issues',
          '/situations/foundation-structural-issues',
          ' as-is.'
        )

        const updatedContent = [...location.problemStatement, foundationLink]
        await client.patch(location._id).set({ problemStatement: updatedContent }).commit()
        console.log(`   ✅ Added foundation link to ${slug}`)
      } else {
        console.log(`   ⏭️ ${slug} already has foundation link`)
      }
    }
  }

  // 4. Update tax-liens-code-violations situation (structural violations)
  console.log('\n4. Updating tax-liens-code-violations situation...')
  const taxLiens = await client.fetch(
    `*[_type == "situation" && slug.current == "tax-liens-code-violations"][0]`
  )

  if (taxLiens && taxLiens.problemDescription) {
    const contentStr = JSON.stringify(taxLiens.problemDescription)
    if (!contentStr.includes('foundation-structural-issues')) {
      const foundationLink = textBlockWithLink(
        'If your code violations are related to structural damage, see our ',
        'Foundation & Structural Issues',
        '/situations/foundation-structural-issues',
        ' page for specific information.'
      )

      const updatedContent = [...taxLiens.problemDescription, foundationLink]
      await client.patch(taxLiens._id).set({ problemDescription: updatedContent }).commit()
      console.log('   ✅ Added link from tax-liens to foundation-structural-issues')
    }
  }

  console.log('\n' + '='.repeat(70))
  console.log('Internal linking complete!')
  console.log('='.repeat(70))
}

main().catch(console.error)
