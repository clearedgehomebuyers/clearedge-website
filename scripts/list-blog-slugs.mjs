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
  const posts = await client.fetch(
    `*[_type == "blogPost"] | order(title asc) { title, "slug": slug.current }`
  )

  console.log('All Blog Post Slugs:')
  console.log('='.repeat(80))
  for (const post of posts) {
    console.log(`"${post.slug}": "${post.title}"`)
  }
  console.log('='.repeat(80))
  console.log(`Total: ${posts.length} posts`)
}

main().catch(console.error)
