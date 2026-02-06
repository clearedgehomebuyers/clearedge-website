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

// Count external authoritative links in a post's content
function countAuthoritativeLinks(content) {
  const contentStr = JSON.stringify(content)
  const authDomains = [
    '.gov', '.edu', '.org', '.us',
    'bbb.org', 'govos.com', 'iccsafe.org',
    'pcar.com', 'phfa.org', 'lehighvalley.org'
  ]

  let count = 0
  const links = []

  // Find all hrefs in the content
  const hrefMatches = contentStr.match(/"href":"([^"]+)"/g) || []

  for (const match of hrefMatches) {
    const href = match.replace('"href":"', '').replace('"', '')

    // Skip internal links
    if (href.startsWith('/') || href.includes('clearedgehomebuyers')) {
      continue
    }

    // Check if it's an authoritative domain
    const isAuthoritative = authDomains.some(domain => href.includes(domain))
    if (isAuthoritative) {
      count++
      if (!links.includes(href)) {
        links.push(href)
      }
    }
  }

  return { count, uniqueLinks: links }
}

async function main() {
  console.log('='.repeat(80))
  console.log('VERIFICATION: Authoritative Links in Blog Posts')
  console.log('='.repeat(80))

  const posts = await client.fetch(
    `*[_type == "blogPost"] | order(title asc) { title, "slug": slug.current, content }`
  )

  let totalWithLinks = 0
  let totalLinks = 0

  for (const post of posts) {
    const { count, uniqueLinks } = countAuthoritativeLinks(post.content)
    totalLinks += count

    if (uniqueLinks.length > 0) {
      totalWithLinks++
      console.log(`\n✅ ${post.title}`)
      console.log(`   Slug: ${post.slug}`)
      console.log(`   Authoritative links: ${uniqueLinks.length} unique (${count} total instances)`)
      uniqueLinks.forEach(link => console.log(`   - ${link}`))
    } else {
      console.log(`\n⚠️ ${post.title}`)
      console.log(`   Slug: ${post.slug}`)
      console.log(`   Authoritative links: 0`)
    }
  }

  console.log('\n' + '='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))
  console.log(`Total posts: ${posts.length}`)
  console.log(`Posts with authoritative links: ${totalWithLinks}`)
  console.log(`Posts without authoritative links: ${posts.length - totalWithLinks}`)
  console.log(`Total link instances: ${totalLinks}`)
  console.log('='.repeat(80))
}

main().catch(console.error)
