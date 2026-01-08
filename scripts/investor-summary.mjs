import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

async function main() {
  const posts = await client.fetch(`*[_type == "blogPost"] | order(publishedAt desc) {
    title,
    publishedAt,
    "locations": relatedLocations[]->city,
    "situations": relatedSituations[]->title
  }`)

  // Count by location
  const locationCounts = {}
  posts.forEach(p => {
    (p.locations || []).filter(l => l).forEach(loc => {
      locationCounts[loc] = (locationCounts[loc] || 0) + 1
    })
  })

  // Count by situation
  const situationCounts = {}
  posts.forEach(p => {
    (p.situations || []).filter(s => s).forEach(sit => {
      situationCounts[sit] = (situationCounts[sit] || 0) + 1
    })
  })

  // Output
  console.log('')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  CLEAREDGE HOME BUYERS — CONTENT PORTFOLIO OVERVIEW')
  console.log('═══════════════════════════════════════════════════════════════')

  console.log('')
  console.log('TOTAL PUBLISHED ARTICLES:', posts.length)

  console.log('')
  console.log('───────────────────────────────────────────────────────────────')
  console.log('GEOGRAPHIC COVERAGE')
  console.log('───────────────────────────────────────────────────────────────')
  const sortedLocations = Object.entries(locationCounts).sort((a, b) => b[1] - a[1])
  const locationCount = sortedLocations.length
  console.log(`${locationCount} Pennsylvania markets covered:\n`)

  // Group into tiers
  const tier1 = sortedLocations.filter(([_, count]) => count >= 7)
  const tier2 = sortedLocations.filter(([_, count]) => count >= 5 && count < 7)
  const tier3 = sortedLocations.filter(([_, count]) => count < 5)

  console.log('Primary Markets (7+ articles):')
  tier1.forEach(([loc, count]) => console.log(`  • ${loc}: ${count} articles`))

  console.log('')
  console.log('Secondary Markets (5-6 articles):')
  tier2.forEach(([loc, count]) => console.log(`  • ${loc}: ${count} articles`))

  console.log('')
  console.log('Emerging Markets (4 articles):')
  tier3.forEach(([loc, count]) => console.log(`  • ${loc}: ${count} articles`))

  console.log('')
  console.log('───────────────────────────────────────────────────────────────')
  console.log('TOPIC/SITUATION COVERAGE')
  console.log('───────────────────────────────────────────────────────────────')
  const sortedSituations = Object.entries(situationCounts).sort((a, b) => b[1] - a[1])
  console.log('')
  sortedSituations.forEach(([sit, count]) => {
    console.log(`  • ${sit}: ${count} articles`)
  })

  console.log('')
  console.log('───────────────────────────────────────────────────────────────')
  console.log('SAMPLE CONTENT (Recent Publications)')
  console.log('───────────────────────────────────────────────────────────────')
  console.log('')
  posts.slice(0, 6).forEach(p => {
    console.log(`  • ${p.title}`)
  })

  console.log('')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('')
}

main().catch(console.error)
