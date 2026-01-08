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
  console.log('Fixing remaining link issues...\n')

  // 1. Add Stroudsburg to GovOS article
  console.log('1. Adding Stroudsburg to GovOS article...')
  const govosPost = await client.fetch(`*[_type == "blogPost" && slug.current == "stop-govos-fines-poconos-house"][0]{ _id, relatedLocations }`)
  const stroudsburg = await client.fetch(`*[_type == "location" && slug.current == "stroudsburg"][0]{ _id, city }`)

  if (govosPost && stroudsburg) {
    const currentRefs = govosPost.relatedLocations || []
    const alreadyHas = currentRefs.some(r => r._ref === stroudsburg._id)

    if (!alreadyHas) {
      const newRefs = [...currentRefs, { _type: 'reference', _ref: stroudsburg._id, _key: `loc_stroudsburg` }]
      await client.patch(govosPost._id).set({ relatedLocations: newRefs }).commit()
      console.log(`   ✅ Added Stroudsburg to GovOS article`)
    } else {
      console.log(`   Already linked`)
    }
  }

  // 2. Add Lehigh Valley to Bethlehem Tax Lien article
  console.log('\n2. Adding Lehigh Valley to Bethlehem Tax Lien article...')
  const bethlehemPost = await client.fetch(`*[_type == "blogPost" && slug.current == "sell-my-house-fast-bethlehem-pa-18015-tax-lien"][0]{ _id, relatedLocations }`)
  const lehighValley = await client.fetch(`*[_type == "location" && slug.current == "lehigh-valley"][0]{ _id, city }`)

  if (bethlehemPost && lehighValley) {
    const currentRefs = bethlehemPost.relatedLocations || []
    const alreadyHas = currentRefs.some(r => r._ref === lehighValley._id)

    if (!alreadyHas) {
      const newRefs = [...currentRefs, { _type: 'reference', _ref: lehighValley._id, _key: `loc_lehigh_valley` }]
      await client.patch(bethlehemPost._id).set({ relatedLocations: newRefs }).commit()
      console.log(`   ✅ Added Lehigh Valley to Bethlehem Tax Lien article`)
    } else {
      console.log(`   Already linked`)
    }
  }

  // Verify fixes
  console.log('\n3. Verifying fixes...')

  const govosOnStroudsburg = await client.fetch(
    `*[_type == "blogPost" && slug.current == "stop-govos-fines-poconos-house" && references(*[_type == "location" && slug.current == "stroudsburg"][0]._id)]{ title }`
  )
  console.log(`   GovOS on Stroudsburg: ${govosOnStroudsburg.length > 0 ? '✅' : '❌'}`)

  const bethlehemOnLV = await client.fetch(
    `*[_type == "blogPost" && slug.current == "sell-my-house-fast-bethlehem-pa-18015-tax-lien" && references(*[_type == "location" && slug.current == "lehigh-valley"][0]._id)]{ title }`
  )
  console.log(`   Bethlehem Tax Lien on Lehigh Valley: ${bethlehemOnLV.length > 0 ? '✅' : '❌'}`)

  console.log('\nDone!')
}

main().catch(console.error)
