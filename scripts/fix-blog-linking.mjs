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

// Region/County mappings
const regionMappings = {
  'lehigh valley': ['allentown', 'bethlehem', 'easton', 'emmaus'],
  'nepa': ['scranton', 'wilkes-barre', 'hazleton', 'pittston', 'dunmore', 'carbondale'],
  'poconos': ['stroudsburg', 'east stroudsburg', 'mount pocono', 'tannersville'],
  'coal region': ['pottsville', 'tamaqua', 'shenandoah', 'mahanoy city']
}

const countyMappings = {
  'lackawanna': ['scranton', 'dunmore', 'carbondale', 'dickson city', 'old forge', 'clarks summit'],
  'luzerne': ['wilkes-barre', 'hazleton', 'pittston', 'nanticoke', 'kingston', 'plymouth', 'west pittston'],
  'lehigh': ['allentown', 'emmaus', 'whitehall', 'macungie', 'catasauqua'],
  'northampton': ['bethlehem', 'easton', 'nazareth', 'bangor', 'pen argyl', 'wind gap'],
  'berks': ['reading', 'west reading', 'wyomissing', 'kutztown', 'hamburg'],
  'schuylkill': ['pottsville', 'tamaqua', 'shenandoah', 'mahanoy city', 'minersville'],
  'monroe': ['stroudsburg', 'east stroudsburg', 'mount pocono', 'tannersville'],
  'carbon': ['jim thorpe', 'lehighton', 'palmerton', 'lansford'],
  'pike': ['milford', 'dingmans ferry', 'matamoras'],
  'wayne': ['honesdale', 'waymart', 'hawley']
}

// Zip code mappings
const zipMappings = {
  '18102': 'allentown',
  '18103': 'allentown',
  '18104': 'allentown',
  '18015': 'bethlehem',
  '18017': 'bethlehem',
  '18018': 'bethlehem',
  '18042': 'easton',
  '18045': 'easton',
  '18501': 'scranton',
  '18503': 'scranton',
  '18504': 'scranton',
  '18505': 'scranton',
  '18508': 'scranton',
  '18509': 'scranton',
  '18510': 'scranton',
  '18512': 'dunmore',
  '18701': 'wilkes-barre',
  '18702': 'wilkes-barre',
  '18704': 'kingston',
  '18705': 'wilkes-barre',
  '18201': 'hazleton',
  '18202': 'hazleton',
  '18640': 'pittston',
  '18641': 'pittston',
  '18634': 'nanticoke',
  '19601': 'reading',
  '19602': 'reading',
  '19604': 'reading',
  '19610': 'wyomissing',
  '17901': 'pottsville',
  '18301': 'stroudsburg',
  '18302': 'stroudsburg',
  '18360': 'stroudsburg',
  '18229': 'jim thorpe'
}

// Situation keyword mappings
const situationKeywords = {
  'foreclosure': ['foreclosure', 'sheriff sale', 'judicial sale', 'bank owned', 'reo', 'pre-foreclosure', 'avoid foreclosure', 'stop foreclosure', 'mortgage default', 'behind on mortgage'],
  'inherited-property': ['inherited', 'probate', 'deceased', 'estate', 'heir', 'beneficiary', 'will', 'intestate', 'executor', 'administrator', 'letters testamentary', 'passed away', 'parents house', 'family home'],
  'divorce': ['divorce', 'separation', 'marital', 'ex-spouse', 'ex-husband', 'ex-wife', 'matrimonial', 'splitting assets', 'divorce settlement'],
  'major-repairs-needed': ['water damage', 'fire damage', 'mold', 'structural damage', 'foundation', 'roof damage', 'major repairs', 'condemned', 'uninhabitable', 'mine subsidence', 'sinking', 'flood damage'],
  'code-violations': ['code violation', 'ipmc', 'building code', 'housing code', 'municipal violation', 'code enforcement', 'inspection failed', 'violations', 'condemned'],
  'behind-on-taxes': ['tax lien', 'delinquent taxes', 'back taxes', 'property taxes', 'tax sale', 'tax foreclosure', 'owe taxes'],
  'tired-landlord': ['landlord', 'tenant', 'rental property', 'rental inspection', 'occupancy inspection', 'rental registration', 'bad tenant', 'eviction', 'non-paying tenant', 'property management'],
  'relocation': ['relocation', 'job transfer', 'moving', 'relocating', 'new job', 'job relocation', 'corporate relocation', 'buyout', 'employer'],
  'vacant-property': ['vacant', 'abandoned', 'empty house', 'unoccupied', 'blight', 'conservatorship', 'act 135'],
  'downsizing': ['downsizing', 'downsize', 'retirement', 'empty nest', 'smaller home', 'sell fast', 'cash buyer', 'quick sale', 'fast sale']
}

// Extract text content from Sanity portable text
function extractTextFromBody(body) {
  if (!body || !Array.isArray(body)) return ''

  return body
    .filter(block => block._type === 'block')
    .map(block => {
      if (!block.children) return ''
      return block.children
        .filter(child => child._type === 'span')
        .map(span => span.text || '')
        .join('')
    })
    .join(' ')
}

async function main() {
  console.log('='.repeat(70))
  console.log('BLOG LINKING ANALYSIS AND FIX')
  console.log('='.repeat(70))
  console.log('')

  // Fetch all data
  console.log('Fetching all blog posts...')
  const posts = await client.fetch(`*[_type == "blogPost"] {
    _id,
    title,
    "slug": slug.current,
    body,
    "currentLocations": relatedLocations[]->{ _id, title, "slug": slug.current },
    "currentSituations": relatedSituations[]->{ _id, title, "slug": slug.current }
  }`)
  console.log(`Found ${posts.length} blog posts`)

  console.log('Fetching all locations...')
  const locations = await client.fetch(`*[_type == "location"] {
    _id,
    "title": city,
    "slug": slug.current,
    county
  }`)
  console.log(`Found ${locations.length} locations`)

  console.log('Fetching all situations...')
  const situations = await client.fetch(`*[_type == "situation"] {
    _id,
    title,
    "slug": slug.current
  }`)
  console.log(`Found ${situations.length} situations`)

  console.log('')
  console.log('Available Locations:')
  locations.forEach(l => console.log(`  - ${l.title} (${l.slug}) - ${l.county || 'N/A'}`))

  console.log('')
  console.log('Available Situations:')
  situations.forEach(s => console.log(`  - ${s.title} (${s.slug})`))

  console.log('')
  console.log('='.repeat(70))
  console.log('ANALYZING POSTS')
  console.log('='.repeat(70))

  const updates = []
  const locationCoverage = {}
  const situationCoverage = {}

  for (const post of posts) {
    console.log('')
    console.log(`\nAnalyzing: ${post.title}`)
    console.log('-'.repeat(60))

    // Get full text content
    const titleLower = (post.title || '').toLowerCase()
    const slugLower = (post.slug || '').toLowerCase()
    const bodyText = extractTextFromBody(post.body).toLowerCase()
    const fullText = `${titleLower} ${slugLower} ${bodyText}`

    // Find matching locations
    const matchedLocationIds = new Set()
    const matchedLocationNames = []

    // Check for city names
    for (const location of locations) {
      const cityName = location.title.toLowerCase()
      const citySlug = (location.slug || '').toLowerCase()

      // Check if city is mentioned
      if (fullText.includes(cityName) || fullText.includes(citySlug)) {
        matchedLocationIds.add(location._id)
        matchedLocationNames.push(location.title)
      }
    }

    // Check for county mentions - add all cities in that county
    for (const [county, cities] of Object.entries(countyMappings)) {
      if (fullText.includes(county + ' county') || fullText.includes(county)) {
        for (const city of cities) {
          const location = locations.find(l => l.title.toLowerCase().includes(city))
          if (location) {
            matchedLocationIds.add(location._id)
            if (!matchedLocationNames.includes(location.title)) {
              matchedLocationNames.push(location.title)
            }
          }
        }
      }
    }

    // Check for region mentions
    for (const [region, cities] of Object.entries(regionMappings)) {
      if (fullText.includes(region)) {
        for (const city of cities) {
          const location = locations.find(l => l.title.toLowerCase().includes(city))
          if (location) {
            matchedLocationIds.add(location._id)
            if (!matchedLocationNames.includes(location.title)) {
              matchedLocationNames.push(location.title)
            }
          }
        }
      }
    }

    // Check for zip codes
    for (const [zip, city] of Object.entries(zipMappings)) {
      if (fullText.includes(zip)) {
        const location = locations.find(l => l.title.toLowerCase().includes(city))
        if (location) {
          matchedLocationIds.add(location._id)
          if (!matchedLocationNames.includes(location.title)) {
            matchedLocationNames.push(location.title)
          }
        }
      }
    }

    // If it's a Pennsylvania-wide article, tag all locations
    if ((titleLower.includes('pennsylvania') && !titleLower.includes('county')) ||
        titleLower.includes(' pa ') && !fullText.includes('county')) {
      // Check if it's a general PA article (not location-specific)
      const isGeneralPA = !matchedLocationIds.size ||
        (titleLower.includes('pennsylvania') &&
         !Object.keys(countyMappings).some(c => titleLower.includes(c)))

      if (isGeneralPA && matchedLocationIds.size === 0) {
        // Tag all major locations for statewide content
        for (const location of locations) {
          matchedLocationIds.add(location._id)
          if (!matchedLocationNames.includes(location.title)) {
            matchedLocationNames.push(location.title)
          }
        }
      }
    }

    console.log(`  Matched Locations: ${matchedLocationNames.length > 0 ? matchedLocationNames.join(', ') : 'None'}`)

    // Find matching situations
    const matchedSituationIds = new Set()
    const matchedSituationNames = []

    for (const [situationSlug, keywords] of Object.entries(situationKeywords)) {
      for (const keyword of keywords) {
        if (fullText.includes(keyword.toLowerCase())) {
          const situation = situations.find(s =>
            s.slug === situationSlug ||
            s.slug?.includes(situationSlug.split('-')[0]) ||
            s.title.toLowerCase().includes(situationSlug.split('-')[0])
          )
          if (situation) {
            matchedSituationIds.add(situation._id)
            if (!matchedSituationNames.includes(situation.title)) {
              matchedSituationNames.push(situation.title)
            }
          }
          break
        }
      }
    }

    console.log(`  Matched Situations: ${matchedSituationNames.length > 0 ? matchedSituationNames.join(', ') : 'None'}`)

    // Track coverage
    matchedLocationNames.forEach(name => {
      locationCoverage[name] = (locationCoverage[name] || 0) + 1
    })
    matchedSituationNames.forEach(name => {
      situationCoverage[name] = (situationCoverage[name] || 0) + 1
    })

    // Determine if update is needed
    const currentLocationIds = new Set((post.currentLocations || []).filter(l => l).map(l => l._id))
    const currentSituationIds = new Set((post.currentSituations || []).filter(s => s).map(s => s._id))

    const newLocationIds = [...matchedLocationIds].filter(id => !currentLocationIds.has(id))
    const newSituationIds = [...matchedSituationIds].filter(id => !currentSituationIds.has(id))

    const needsUpdate = newLocationIds.length > 0 || newSituationIds.length > 0

    if (needsUpdate) {
      updates.push({
        post,
        locationIds: [...matchedLocationIds],
        situationIds: [...matchedSituationIds],
        locationNames: matchedLocationNames,
        situationNames: matchedSituationNames,
        addedLocations: newLocationIds.length,
        addedSituations: newSituationIds.length
      })
      console.log(`  STATUS: Needs update (+${newLocationIds.length} locations, +${newSituationIds.length} situations)`)
    } else {
      console.log(`  STATUS: Already correct`)
    }
  }

  console.log('')
  console.log('='.repeat(70))
  console.log('APPLYING UPDATES')
  console.log('='.repeat(70))

  let updatedCount = 0
  for (const update of updates) {
    console.log(`\nUpdating: ${update.post.title}`)

    const locationRefs = update.locationIds.map(id => ({
      _type: 'reference',
      _ref: id,
      _key: id.slice(-8)
    }))

    const situationRefs = update.situationIds.map(id => ({
      _type: 'reference',
      _ref: id,
      _key: id.slice(-8)
    }))

    try {
      await client.patch(update.post._id)
        .set({
          relatedLocations: locationRefs,
          relatedSituations: situationRefs
        })
        .commit()

      console.log(`  ✅ Updated successfully`)
      console.log(`     Locations: ${update.locationNames.join(', ')}`)
      console.log(`     Situations: ${update.situationNames.join(', ')}`)
      updatedCount++
    } catch (err) {
      console.log(`  ❌ Error: ${err.message}`)
    }
  }

  // Print summary
  console.log('')
  console.log('='.repeat(70))
  console.log('BLOG LINKING COMPLETE')
  console.log('='.repeat(70))
  console.log('')
  console.log(`Total Posts Analyzed: ${posts.length}`)
  console.log(`Posts Updated: ${updatedCount}`)
  console.log(`Posts Already Correct: ${posts.length - updates.length}`)
  console.log('')

  console.log('LOCATION COVERAGE:')
  Object.entries(locationCoverage)
    .sort((a, b) => b[1] - a[1])
    .forEach(([name, count]) => {
      console.log(`  - ${name}: ${count} posts`)
    })

  console.log('')
  console.log('SITUATION COVERAGE:')
  Object.entries(situationCoverage)
    .sort((a, b) => b[1] - a[1])
    .forEach(([name, count]) => {
      console.log(`  - ${name}: ${count} posts`)
    })

  console.log('')
  console.log('CHANGES MADE:')
  if (updates.length === 0) {
    console.log('  No changes needed - all posts correctly linked')
  } else {
    updates.forEach(u => {
      console.log(`  - ${u.post.title}`)
      console.log(`    + ${u.addedLocations} locations, + ${u.addedSituations} situations`)
    })
  }

  // Verify a few pages
  console.log('')
  console.log('='.repeat(70))
  console.log('VERIFICATION')
  console.log('='.repeat(70))

  // Check a location page
  const scrantonLoc = locations.find(l => l.title.toLowerCase().includes('scranton'))
  if (scrantonLoc) {
    const scrantonPosts = await client.fetch(
      `*[_type == "blogPost" && references($locId)] | order(publishedAt desc) { title }`,
      { locId: scrantonLoc._id }
    )
    console.log(`\nScranton location page should show ${scrantonPosts.length} posts:`)
    scrantonPosts.forEach(p => console.log(`  - ${p.title}`))
  }

  // Check a situation page
  const foreclosureSit = situations.find(s => s.slug?.includes('foreclosure') || s.title.toLowerCase().includes('foreclosure'))
  if (foreclosureSit) {
    const foreclosurePosts = await client.fetch(
      `*[_type == "blogPost" && references($sitId)] | order(publishedAt desc) { title }`,
      { sitId: foreclosureSit._id }
    )
    console.log(`\nForeclosure situation page should show ${foreclosurePosts.length} posts:`)
    foreclosurePosts.forEach(p => console.log(`  - ${p.title}`))
  }

  console.log('')
  console.log('='.repeat(70))
  console.log('DONE')
  console.log('='.repeat(70))
}

main().catch(console.error)
