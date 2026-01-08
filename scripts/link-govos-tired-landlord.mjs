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
  // Step 1: Find article and situation
  console.log('Finding article and situation...')

  const article = await client.fetch(`*[_type == "blogPost" && slug.current == "stop-govos-fines-poconos-house"][0]{
    _id,
    title,
    "currentSituations": relatedSituations[]->{ _id, title }
  }`)

  const situation = await client.fetch(`*[_type == "situation" && slug.current == "tired-landlord"][0]{ _id, title }`)

  console.log('')
  console.log('Article:', article.title)
  console.log('Article ID:', article._id)
  console.log('Current Situations:', article.currentSituations?.map(s => s.title).join(', ') || 'None')
  console.log('')
  console.log('Situation:', situation.title)
  console.log('Situation ID:', situation._id)

  // Step 2: Add situation reference
  console.log('')
  console.log('Adding Tired Landlord situation to article...')

  // Get current relatedSituations to preserve them
  const currentRefs = await client.fetch(`*[_type == "blogPost" && _id == $id][0].relatedSituations`, { id: article._id })

  // Check if already linked
  const alreadyLinked = (currentRefs || []).some(ref => ref._ref === situation._id)

  if (alreadyLinked) {
    console.log('Already linked!')
  } else {
    const newRef = {
      _type: 'reference',
      _ref: situation._id,
      _key: 'tired-landlord-ref'
    }

    const updatedRefs = [...(currentRefs || []), newRef]

    await client.patch(article._id)
      .set({ relatedSituations: updatedRefs })
      .commit()

    console.log('✅ Link added successfully!')
  }

  // Step 3: Verify
  console.log('')
  console.log('Verifying link...')

  const verification = await client.fetch(`*[_type == "blogPost" && slug.current == "stop-govos-fines-poconos-house"][0]{
    title,
    "situations": relatedSituations[]->title
  }`)

  console.log('Article situations now:', verification.situations?.join(', ') || 'None')

  // Check situation page will show the article
  const situationPosts = await client.fetch(`*[_type == "blogPost" && references($sitId)]{ title }`, { sitId: situation._id })
  console.log('')
  console.log('Posts that will show on Tired Landlord page:', situationPosts.length)
  situationPosts.forEach(p => console.log('  -', p.title))

  console.log('')
  console.log('='.repeat(50))
  console.log('CONFIRMATION')
  console.log('='.repeat(50))
  console.log('')
  console.log('Article: ' + article.title)
  console.log('Article ID: ' + article._id)
  console.log('Situation: ' + situation.title)
  console.log('Situation ID: ' + situation._id)
  console.log('')
  console.log('Verify at:')
  console.log('  Blog: https://www.clearedgehomebuyers.com/blog/stop-govos-fines-poconos-house')
  console.log('  Situation: https://www.clearedgehomebuyers.com/situations/tired-landlord')
}

main().catch(console.error)
