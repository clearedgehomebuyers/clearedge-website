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
  apiVersion: '2026-01-02',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const phoneRegex = /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})|(\+1\d{10})/g

async function main() {
  const posts = await client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) { title, slug, content, faqs }`
  )

  let postsWithPhones = 0
  let postsWithoutPhones = 0

  for (const post of posts) {
    const matches = []

    if (post.content) {
      for (const block of post.content) {
        if (block.children) {
          for (const child of block.children) {
            if (child.text) {
              const found = child.text.match(phoneRegex)
              if (found) {
                matches.push({
                  location: 'content',
                  text: child.text.substring(0, 150),
                  numbers: found,
                })
              }
            }
          }
        }
      }
    }

    if (post.faqs) {
      for (const faq of post.faqs) {
        if (faq.answer) {
          const found = faq.answer.match(phoneRegex)
          if (found) {
            matches.push({
              location: 'faq-answer',
              text: faq.answer.substring(0, 150),
              numbers: found,
            })
          }
        }
        if (faq.question) {
          const found = faq.question.match(phoneRegex)
          if (found) {
            matches.push({
              location: 'faq-question',
              text: faq.question.substring(0, 150),
              numbers: found,
            })
          }
        }
      }
    }

    if (matches.length > 0) {
      postsWithPhones++
      console.log(`\n=== ${post.slug.current} ===`)
      for (const m of matches) {
        console.log(`  [${m.location}] Numbers found: ${m.numbers.join(', ')}`)
        console.log(`    Context: "${m.text}..."`)
      }
    } else {
      postsWithoutPhones++
    }
  }

  console.log(`\n========================================`)
  console.log(`Total posts scanned: ${posts.length}`)
  console.log(`Posts WITH phone numbers: ${postsWithPhones}`)
  console.log(`Posts WITHOUT phone numbers: ${postsWithoutPhones}`)
}

main().catch(console.error)
