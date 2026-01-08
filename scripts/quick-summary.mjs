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

const posts = await client.fetch(`*[_type == "blogPost"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  "category": category->title,
  "locations": relatedLocations[]->city,
  "situations": relatedSituations[]->title
}`)

console.log('='.repeat(70))
console.log('1. ALL POSTS (' + posts.length + ' total)')
console.log('='.repeat(70))
posts.forEach((p, i) => {
  const date = p.publishedAt ? p.publishedAt.split('T')[0] : 'N/A'
  console.log((i+1) + '. ' + p.title)
  console.log('   ' + p.slug + ' | ' + date)
})

console.log('')
console.log('='.repeat(70))
console.log('2. BY LOCATION')
console.log('='.repeat(70))
const byLocation = {}
posts.forEach(p => {
  (p.locations || []).filter(l => l).forEach(loc => {
    if (!byLocation[loc]) byLocation[loc] = []
    byLocation[loc].push(p.title)
  })
})
Object.entries(byLocation).sort((a,b) => b[1].length - a[1].length).forEach(([loc, titles]) => {
  console.log('')
  console.log(loc + ' (' + titles.length + ' posts)')
  titles.forEach(t => console.log('  - ' + t.substring(0, 65) + (t.length > 65 ? '...' : '')))
})

console.log('')
console.log('='.repeat(70))
console.log('3. BY SITUATION')
console.log('='.repeat(70))
const bySituation = {}
posts.forEach(p => {
  (p.situations || []).filter(s => s).forEach(sit => {
    if (!bySituation[sit]) bySituation[sit] = []
    bySituation[sit].push(p.title)
  })
})
Object.entries(bySituation).sort((a,b) => b[1].length - a[1].length).forEach(([sit, titles]) => {
  console.log('')
  console.log(sit + ' (' + titles.length + ' posts)')
  titles.forEach(t => console.log('  - ' + t.substring(0, 65) + (t.length > 65 ? '...' : '')))
})

console.log('')
console.log('='.repeat(70))
console.log('4. UNTAGGED POSTS')
console.log('='.repeat(70))
const noLocations = posts.filter(p => !p.locations || p.locations.filter(l => l).length === 0)
const noSituations = posts.filter(p => !p.situations || p.situations.filter(s => s).length === 0)

console.log('')
console.log('Missing Location Tags (' + noLocations.length + '):')
if (noLocations.length === 0) console.log('  None')
else noLocations.forEach(p => console.log('  - ' + p.title))

console.log('')
console.log('Missing Situation Tags (' + noSituations.length + '):')
if (noSituations.length === 0) console.log('  None')
else noSituations.forEach(p => console.log('  - ' + p.title))
