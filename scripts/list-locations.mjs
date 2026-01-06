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
  useCdn: false,
})

const locations = await client.fetch(`*[_type == "location"] | order(city asc) { city, state, county, slug }`)

console.log('Existing locations:')
locations.forEach(loc => {
  console.log(`- ${loc.city}, ${loc.state} (county: ${loc.county || 'NOT SET'}) -> /locations/${loc.slug.current}`)
})
