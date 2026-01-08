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
  console.log('='.repeat(60))
  console.log('FINAL VERIFICATION')
  console.log('='.repeat(60))

  // Test GovOS Article
  const govos = await client.fetch(`*[_type == "blogPost" && slug.current == "stop-govos-fines-poconos-house"][0]{
    title,
    "locations": relatedLocations[]->{ "name": city, "slug": slug.current },
    "situations": relatedSituations[]->{ title, "slug": slug.current }
  }`)

  console.log('')
  console.log('GovOS Article:')
  console.log('  Locations:', govos.locations?.map(l => l.name).join(', ') || 'None')
  console.log('  Situations:', govos.situations?.map(s => s.title).join(', ') || 'None')

  // Test on Stroudsburg
  const stroudsburgPosts = await client.fetch(`*[_type == "blogPost" && references(*[_type == "location" && slug.current == "stroudsburg"][0]._id)] | order(publishedAt desc)[0...3]{ title }`)
  console.log('')
  console.log('Stroudsburg page shows (top 3):')
  stroudsburgPosts.forEach(p => console.log('  -', p.title))
  console.log('  Includes GovOS:', stroudsburgPosts.some(p => p.title.includes('GovOS')) ? '✅' : '❌')

  // Test on Tired Landlord
  const tiredLandlordPosts = await client.fetch(`*[_type == "blogPost" && references(*[_type == "situation" && slug.current == "tired-landlord"][0]._id)] | order(publishedAt desc)[0...3]{ title }`)
  console.log('')
  console.log('Tired Landlord page shows (top 3):')
  tiredLandlordPosts.forEach(p => console.log('  -', p.title))
  console.log('  Includes GovOS:', tiredLandlordPosts.some(p => p.title.includes('GovOS')) ? '✅' : '❌')

  // Test Bethlehem Tax Lien on Lehigh Valley
  const lvPostsAll = await client.fetch(`*[_type == "blogPost" && references(*[_type == "location" && slug.current == "lehigh-valley"][0]._id)] | order(publishedAt desc){ title, publishedAt }`)
  const lvPosts = lvPostsAll.slice(0, 3)
  console.log('')
  console.log('Lehigh Valley page shows (top 3):')
  lvPosts.forEach(p => console.log('  -', p.title))
  const hasTaxLien = lvPostsAll.some(p => p.title.includes('Tax Lien'))
  console.log('  Includes Tax Lien (any):', hasTaxLien ? '✅' : '❌')
  if (hasTaxLien && !lvPosts.some(p => p.title.includes('Tax Lien'))) {
    console.log('  (Tax Lien article is linked but not in top 3 due to older publish date)')
  }

  // Test Dunmore on Scranton
  const scrantonPosts = await client.fetch(`*[_type == "blogPost" && references(*[_type == "location" && slug.current == "scranton"][0]._id)] | order(publishedAt desc)[0...3]{ title }`)
  console.log('')
  console.log('Scranton page shows (top 3):')
  scrantonPosts.forEach(p => console.log('  -', p.title))

  console.log('')
  console.log('='.repeat(60))
  console.log('VERIFICATION COMPLETE')
  console.log('='.repeat(60))
}

main().catch(console.error)
