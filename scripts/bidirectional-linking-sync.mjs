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

// Region/County mappings for comprehensive tagging
const regionMappings = {
  'poconos': ['stroudsburg', 'east stroudsburg', 'mount pocono', 'tannersville', 'pocono pines', 'tobyhanna'],
  'lehigh valley': ['allentown', 'bethlehem', 'easton', 'emmaus'],
  'nepa': ['scranton', 'wilkes-barre', 'hazleton', 'pittston', 'dunmore', 'carbondale'],
  'coal region': ['pottsville', 'tamaqua', 'shenandoah']
}

const countyMappings = {
  'lackawanna': ['scranton', 'dunmore', 'carbondale'],
  'luzerne': ['wilkes-barre', 'hazleton', 'pittston', 'nanticoke', 'kingston'],
  'lehigh': ['allentown', 'emmaus'],
  'northampton': ['bethlehem', 'easton'],
  'berks': ['reading'],
  'schuylkill': ['pottsville'],
  'monroe': ['stroudsburg', 'east stroudsburg', 'mount pocono', 'tannersville', 'pocono pines'],
  'pike': ['milford'],
  'wayne': ['honesdale']
}

async function main() {
  console.log('='.repeat(70))
  console.log('BIDIRECTIONAL LINKING AUDIT')
  console.log('='.repeat(70))
  console.log('')

  // Fetch all data
  const [posts, locations, situations] = await Promise.all([
    client.fetch(`*[_type == "blogPost"] {
      _id,
      title,
      "slug": slug.current,
      body,
      "currentLocations": relatedLocations[]->{ _id, "title": city, "slug": slug.current },
      "currentSituations": relatedSituations[]->{ _id, title, "slug": slug.current }
    }`),
    client.fetch(`*[_type == "location"] { _id, "title": city, "slug": slug.current, county }`),
    client.fetch(`*[_type == "situation"] { _id, title, "slug": slug.current }`)
  ])

  console.log(`Found ${posts.length} blog posts`)
  console.log(`Found ${locations.length} locations`)
  console.log(`Found ${situations.length} situations`)

  // Create lookup maps
  const locationBySlug = {}
  const locationByTitle = {}
  locations.forEach(l => {
    locationBySlug[l.slug] = l
    locationByTitle[l.title.toLowerCase()] = l
  })

  const situationBySlug = {}
  situations.forEach(s => {
    situationBySlug[s.slug] = s
  })

  // Extract text from portable text
  function extractText(body) {
    if (!body || !Array.isArray(body)) return ''
    return body
      .filter(b => b._type === 'block')
      .map(b => b.children?.map(c => c.text || '').join('') || '')
      .join(' ')
  }

  const articlesUpdated = []

  // PART 1 & 2: Audit and fix all articles
  console.log('')
  console.log('='.repeat(70))
  console.log('PART 1 & 2: AUDITING AND FIXING ARTICLE TAGS')
  console.log('='.repeat(70))

  for (const post of posts) {
    const titleLower = (post.title || '').toLowerCase()
    const slugLower = (post.slug || '').toLowerCase()
    const bodyText = extractText(post.body).toLowerCase()
    const fullText = `${titleLower} ${slugLower} ${bodyText}`

    const newLocationIds = new Set()
    const newSituationIds = new Set()
    const addedLocations = []
    const addedSituations = []

    // Current refs
    const currentLocationIds = new Set((post.currentLocations || []).filter(l => l).map(l => l._id))
    const currentSituationIds = new Set((post.currentSituations || []).filter(s => s).map(s => s._id))

    // Check each location
    for (const loc of locations) {
      const cityLower = loc.title.toLowerCase()
      const slugCheck = loc.slug.toLowerCase()

      if (fullText.includes(cityLower) || fullText.includes(slugCheck)) {
        newLocationIds.add(loc._id)
        if (!currentLocationIds.has(loc._id)) {
          addedLocations.push(loc.title)
        }
      }
    }

    // Check region mentions
    for (const [region, cities] of Object.entries(regionMappings)) {
      if (fullText.includes(region)) {
        for (const city of cities) {
          const loc = locations.find(l => l.title.toLowerCase().includes(city))
          if (loc) {
            newLocationIds.add(loc._id)
            if (!currentLocationIds.has(loc._id)) {
              addedLocations.push(loc.title)
            }
          }
        }
      }
    }

    // Check county mentions
    for (const [county, cities] of Object.entries(countyMappings)) {
      if (fullText.includes(county + ' county') || fullText.includes(county)) {
        for (const city of cities) {
          const loc = locations.find(l => l.title.toLowerCase().includes(city))
          if (loc) {
            newLocationIds.add(loc._id)
            if (!currentLocationIds.has(loc._id)) {
              addedLocations.push(loc.title)
            }
          }
        }
      }
    }

    // Check for Pennsylvania-wide articles
    if (titleLower.includes('pennsylvania') && !Object.keys(countyMappings).some(c => titleLower.includes(c))) {
      for (const loc of locations) {
        newLocationIds.add(loc._id)
        if (!currentLocationIds.has(loc._id)) {
          addedLocations.push(loc.title)
        }
      }
    }

    // Situation matching
    const situationKeywords = {
      'foreclosure': ['foreclosure', 'sheriff sale', 'judicial sale', 'avoid foreclosure'],
      'inherited-property': ['inherited', 'probate', 'deceased', 'estate', 'heir', 'executor'],
      'divorce': ['divorce', 'separation', 'marital'],
      'major-repairs': ['water damage', 'fire damage', 'mold', 'structural', 'foundation', 'mine subsidence'],
      'tax-liens-code-violations': ['code violation', 'ipmc', 'tax lien', 'delinquent'],
      'tired-landlord': ['landlord', 'tenant', 'rental inspection', 'rental registration', 'occupancy inspection', 'govos', 'str', 'airbnb', 'short-term rental'],
      'job-relocation': ['relocation', 'job transfer', 'moving', 'buyout'],
      'vacant-property': ['vacant', 'abandoned', 'blight', 'conservatorship']
    }

    for (const [sitSlug, keywords] of Object.entries(situationKeywords)) {
      for (const kw of keywords) {
        if (fullText.includes(kw)) {
          const sit = situations.find(s => s.slug === sitSlug || s.slug.includes(sitSlug.split('-')[0]))
          if (sit) {
            newSituationIds.add(sit._id)
            if (!currentSituationIds.has(sit._id)) {
              addedSituations.push(sit.title)
            }
          }
          break
        }
      }
    }

    // Update if needed
    const uniqueAddedLocations = [...new Set(addedLocations)]
    const uniqueAddedSituations = [...new Set(addedSituations)]

    if (uniqueAddedLocations.length > 0 || uniqueAddedSituations.length > 0) {
      const locationRefs = [...newLocationIds].map(id => ({
        _type: 'reference',
        _ref: id,
        _key: `loc_${id.slice(-8)}`
      }))

      const situationRefs = [...newSituationIds].map(id => ({
        _type: 'reference',
        _ref: id,
        _key: `sit_${id.slice(-8)}`
      }))

      await client.patch(post._id)
        .set({
          relatedLocations: locationRefs,
          relatedSituations: situationRefs
        })
        .commit()

      articlesUpdated.push({
        title: post.title,
        addedLocations: uniqueAddedLocations,
        addedSituations: uniqueAddedSituations
      })

      console.log(`\n✅ ${post.title}`)
      if (uniqueAddedLocations.length > 0) {
        console.log(`   + Locations: ${uniqueAddedLocations.join(', ')}`)
      }
      if (uniqueAddedSituations.length > 0) {
        console.log(`   + Situations: ${uniqueAddedSituations.join(', ')}`)
      }
    }
  }

  // PART 3: Verify Location Pages
  console.log('')
  console.log('='.repeat(70))
  console.log('PART 3: LOCATION PAGES VERIFICATION')
  console.log('='.repeat(70))

  const locationResults = []
  for (const loc of locations) {
    const relatedPosts = await client.fetch(
      `*[_type == "blogPost" && references($locId)] | order(publishedAt desc) { title, "slug": slug.current }`,
      { locId: loc._id }
    )
    locationResults.push({
      location: loc.title,
      slug: loc.slug,
      postCount: relatedPosts.length,
      posts: relatedPosts
    })
    console.log(`${loc.title}: ${relatedPosts.length} related articles`)
  }

  // PART 4: Verify Situation Pages
  console.log('')
  console.log('='.repeat(70))
  console.log('PART 4: SITUATION PAGES VERIFICATION')
  console.log('='.repeat(70))

  const situationResults = []
  for (const sit of situations) {
    const relatedPosts = await client.fetch(
      `*[_type == "blogPost" && references($sitId)] | order(publishedAt desc) { title, "slug": slug.current }`,
      { sitId: sit._id }
    )
    situationResults.push({
      situation: sit.title,
      slug: sit.slug,
      postCount: relatedPosts.length,
      posts: relatedPosts
    })
    console.log(`${sit.title}: ${relatedPosts.length} related articles`)
  }

  // PART 6: Test Specific Cases
  console.log('')
  console.log('='.repeat(70))
  console.log('PART 6: SPECIFIC CASE VERIFICATION')
  console.log('='.repeat(70))

  // GovOS Article
  console.log('\n--- GovOS Article ("Stop GovOS Fines Poconos House") ---')
  const govosArticle = posts.find(p => p.slug === 'stop-govos-fines-poconos-house')
  if (govosArticle) {
    const govosLocations = await client.fetch(
      `*[_type == "blogPost" && slug.current == "stop-govos-fines-poconos-house"][0].relatedLocations[]->{ "title": city, "slug": slug.current }`
    )
    const govosSituations = await client.fetch(
      `*[_type == "blogPost" && slug.current == "stop-govos-fines-poconos-house"][0].relatedSituations[]->{ title, "slug": slug.current }`
    )
    console.log('Tagged Locations:', (govosLocations || []).map(l => l.title).join(', '))
    console.log('Tagged Situations:', (govosSituations || []).map(s => s.title).join(', '))

    // Check if it appears on expected pages
    const stroudsburg = locationResults.find(l => l.slug === 'stroudsburg')
    const eastStroudsburg = locationResults.find(l => l.slug === 'east-stroudsburg')
    const poconos = locationResults.find(l => l.slug === 'poconos')
    const tiredLandlord = situationResults.find(s => s.slug === 'tired-landlord')

    console.log('Appears on Stroudsburg page:', stroudsburg?.posts.some(p => p.slug === 'stop-govos-fines-poconos-house') ? '✅' : '❌')
    console.log('Appears on East Stroudsburg page:', eastStroudsburg?.posts.some(p => p.slug === 'stop-govos-fines-poconos-house') ? '✅' : '❌')
    console.log('Appears on Poconos page:', poconos?.posts.some(p => p.slug === 'stop-govos-fines-poconos-house') ? '✅' : '❌')
    console.log('Appears on Tired Landlord page:', tiredLandlord?.posts.some(p => p.slug === 'stop-govos-fines-poconos-house') ? '✅' : '❌')
  }

  // Dunmore Mine Subsidence Article
  console.log('\n--- Dunmore Mine Subsidence Article ---')
  const dunmoreArticle = posts.find(p => p.slug === 'sell-my-house-fast-dunmore-mine-subsidence')
  if (dunmoreArticle) {
    const dunmore = locationResults.find(l => l.slug === 'dunmore')
    const scranton = locationResults.find(l => l.slug === 'scranton')
    const majorRepairs = situationResults.find(s => s.slug === 'major-repairs')

    console.log('Appears on Dunmore page:', dunmore?.posts.some(p => p.slug === 'sell-my-house-fast-dunmore-mine-subsidence') ? '✅' : '❌')
    console.log('Appears on Scranton page:', scranton?.posts.some(p => p.slug === 'sell-my-house-fast-dunmore-mine-subsidence') ? '✅' : '❌')
    console.log('Appears on Major Repairs page:', majorRepairs?.posts.some(p => p.slug === 'sell-my-house-fast-dunmore-mine-subsidence') ? '✅' : '❌')
  }

  // Bethlehem Tax Lien Article
  console.log('\n--- Bethlehem Tax Lien Article ---')
  const bethlehemArticle = posts.find(p => p.slug === 'sell-my-house-fast-bethlehem-pa-18015-tax-lien')
  if (bethlehemArticle) {
    const bethlehem = locationResults.find(l => l.slug === 'bethlehem')
    const lehighValley = locationResults.find(l => l.slug === 'lehigh-valley')
    const taxLiens = situationResults.find(s => s.slug?.includes('tax'))

    console.log('Appears on Bethlehem page:', bethlehem?.posts.some(p => p.slug === 'sell-my-house-fast-bethlehem-pa-18015-tax-lien') ? '✅' : '❌')
    console.log('Appears on Lehigh Valley page:', lehighValley?.posts.some(p => p.slug === 'sell-my-house-fast-bethlehem-pa-18015-tax-lien') ? '✅' : '❌')
    console.log('Appears on Tax Liens page:', taxLiens?.posts.some(p => p.slug === 'sell-my-house-fast-bethlehem-pa-18015-tax-lien') ? '✅' : '❌')
  }

  // Final Report
  console.log('')
  console.log('='.repeat(70))
  console.log('FINAL REPORT')
  console.log('='.repeat(70))

  console.log('\nARTICLES UPDATED:', articlesUpdated.length)
  articlesUpdated.forEach(a => {
    console.log(`- ${a.title}`)
    if (a.addedLocations.length > 0) console.log(`  + Locations: ${a.addedLocations.join(', ')}`)
    if (a.addedSituations.length > 0) console.log(`  + Situations: ${a.addedSituations.join(', ')}`)
  })

  console.log('\nLOCATION PAGES VERIFIED:')
  locationResults.forEach(l => {
    console.log(`- ${l.location}: ${l.postCount} related articles ${l.postCount > 0 ? '✓' : '⚠️'}`)
  })

  console.log('\nSITUATION PAGES VERIFIED:')
  situationResults.forEach(s => {
    console.log(`- ${s.situation}: ${s.postCount} related articles ${s.postCount > 0 ? '✓' : '⚠️'}`)
  })

  // Check for issues
  const issues = []

  // Location pages currently use hardcoded helper instead of Sanity query
  issues.push('Location pages use hardcoded getHelpfulGuides() instead of dynamic Sanity query')

  console.log('\nISSUES FOUND:')
  issues.forEach(i => console.log(`- ${i}`))

  console.log('')
  console.log('='.repeat(70))
  console.log('DONE')
  console.log('='.repeat(70))
}

main().catch(console.error)
