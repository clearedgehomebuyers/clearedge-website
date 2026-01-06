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

async function fixWilkesBarreCounty() {
  // Find Wilkes-Barre location
  const wilkesBarre = await client.fetch(`*[_type == "location" && slug.current == "wilkes-barre"][0]`)

  if (!wilkesBarre) {
    console.log('Wilkes-Barre location not found')
    return
  }

  console.log('Found Wilkes-Barre:', wilkesBarre._id)
  console.log('Current county:', wilkesBarre.county || 'NOT SET')

  // Update with Luzerne County
  const result = await client
    .patch(wilkesBarre._id)
    .set({ county: 'Luzerne County' })
    .commit()

  console.log('Updated Wilkes-Barre with Luzerne County')
  console.log('New county:', result.county)
}

fixWilkesBarreCounty()
