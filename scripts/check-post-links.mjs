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

async function main() {
  const slugs = [
    'cash-home-buyers-pottsville-pa',
    'how-to-stop-berks-county-judicial-sale-2026'
  ]

  for (const slug of slugs) {
    const post = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]{ title, content }`,
      { slug }
    )

    console.log(`\n${'='.repeat(70)}`)
    console.log(`POST: ${post.title}`)
    console.log(`${'='.repeat(70)}`)

    // Find all markDefs with type 'link'
    const allLinks = []
    for (const block of post.content || []) {
      if (block.markDefs) {
        for (const md of block.markDefs) {
          if (md._type === 'link' && md.href) {
            allLinks.push(md.href)
          }
        }
      }
    }

    console.log(`\nAll external links in post:`)
    const uniqueLinks = [...new Set(allLinks)]
    if (uniqueLinks.length === 0) {
      console.log('  (none)')
    } else {
      for (const link of uniqueLinks) {
        console.log(`  - ${link}`)
      }
    }

    // Check for specific text
    const textContent = JSON.stringify(post.content)
    console.log(`\nContains "Schuylkill": ${textContent.toLowerCase().includes('schuylkill')}`)
    console.log(`Contains "Berks": ${textContent.toLowerCase().includes('berks')}`)
    console.log(`Contains "tax": ${textContent.toLowerCase().includes('tax')}`)
  }
}

main().catch(console.error)
