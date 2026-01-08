import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function updatePottsvilleLocations() {
  console.log('Starting Pottsville blog post location update...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

  try {
    // Step 1: Find the Pottsville blog post
    console.log('\n1. Finding Pottsville blog post...')
    const blogPost = await client.fetch(
      `*[_type == "blogPost" && (slug.current match "*pottsville*" || title match "*Pottsville*")][0]{
        _id,
        title,
        slug,
        relatedLocations
      }`
    )

    if (!blogPost) {
      throw new Error('Could not find Pottsville blog post')
    }

    console.log('Found blog post:', blogPost.title)
    console.log('Document ID:', blogPost._id)
    console.log('Current relatedLocations:', blogPost.relatedLocations || 'None')

    // Step 2: Find relevant location documents
    // Based on the blog post content, it covers Pottsville and Schuylkill County areas:
    // Pottsville, Minersville, Tamaqua, Shenandoah, Ashland, Pine Grove,
    // Schuylkill Haven, Orwigsburg, Frackville, Girardville, Mahanoy City, St. Clair
    console.log('\n2. Fetching location references...')

    const locationSlugs = [
      'pottsville',
      'minersville',
      'tamaqua',
      'shenandoah',
      'ashland',
      'pine-grove',
      'schuylkill-haven',
      'orwigsburg',
      'frackville',
      'st-clair',
      'mahanoy-city',
      'girardville'
    ]

    // Also search by county
    const locations = await client.fetch(
      `*[_type == "location" && (
        slug.current in $slugs ||
        county == "Schuylkill County" ||
        city in ["Pottsville", "Minersville", "Tamaqua", "Shenandoah", "Ashland", "Pine Grove", "Schuylkill Haven", "Orwigsburg", "Frackville", "St. Clair", "Mahanoy City", "Girardville"]
      )]{ _id, city, county, slug }`,
      { slugs: locationSlugs }
    )

    if (locations.length === 0) {
      console.log('\nNo existing location documents found for Schuylkill County areas.')
      console.log('Checking what locations exist in the database...')

      const allLocations = await client.fetch(
        `*[_type == "location"]{ _id, city, county, slug }`
      )
      console.log('\nAll available locations:')
      allLocations.forEach(loc => {
        console.log(`  - ${loc.city} (${loc.county || 'No county'}) - slug: ${loc.slug?.current}`)
      })

      // Try to find Schuylkill County or Pottsville specifically
      const schuylkillLocations = allLocations.filter(loc =>
        loc.county?.toLowerCase().includes('schuylkill') ||
        loc.city?.toLowerCase().includes('pottsville')
      )

      if (schuylkillLocations.length > 0) {
        console.log('\nFound Schuylkill County locations:')
        schuylkillLocations.forEach(loc => {
          console.log(`  - ${loc.city} (${loc.county})`)
        })
      }

      return
    }

    console.log(`Found ${locations.length} location(s):`)
    locations.forEach(loc => {
      console.log(`  - ${loc.city} (${loc.county || 'No county'}) - ID: ${loc._id}`)
    })

    // Step 3: Update the blog post with location references
    console.log('\n3. Updating blog post with location tags...')

    const locationRefs = locations.map((loc) => ({
      _type: 'reference',
      _ref: loc._id,
      _key: `loc_${loc._id.replace(/[^a-zA-Z0-9]/g, '_')}`,
    }))

    const result = await client
      .patch(blogPost._id)
      .set({ relatedLocations: locationRefs })
      .commit()

    console.log('\n✅ Blog post updated successfully!')
    console.log('Document ID:', result._id)

    // Step 4: Verify the update
    console.log('\n4. Verifying update...')
    const updatedPost = await client.fetch(
      `*[_id == $id][0]{
        _id,
        title,
        "relatedLocations": relatedLocations[]->{ _id, city, county, slug }
      }`,
      { id: blogPost._id }
    )

    console.log('\nUpdated relatedLocations:')
    if (updatedPost.relatedLocations && updatedPost.relatedLocations.length > 0) {
      updatedPost.relatedLocations.forEach(loc => {
        console.log(`  - ${loc.city} (${loc.county || 'No county'})`)
      })
    } else {
      console.log('  No locations found after update')
    }

    console.log('\n✅ Update complete!')

    return result
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', error.response)
    }
    throw error
  }
}

updatePottsvilleLocations()
