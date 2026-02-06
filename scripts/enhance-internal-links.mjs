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

// Generate unique keys
let keyCounter = 0
function uniqueKey(prefix = 'k') {
  return `${prefix}${Date.now()}${keyCounter++}`
}

// Region mapping for locations
const locationToRegion = {
  'scranton': 'nepa',
  'wilkes-barre': 'nepa',
  'hazleton': 'nepa',
  'pittston': 'nepa',
  'kingston': 'nepa',
  'nanticoke': 'nepa',
  'carbondale': 'nepa',
  'dunmore': 'nepa',
  'honesdale': 'nepa',
  'bloomsburg': 'nepa',
  'allentown': 'lehigh-valley',
  'bethlehem': 'lehigh-valley',
  'easton': 'lehigh-valley',
  'reading': 'lehigh-valley',
  'pottsville': 'lehigh-valley',
  'stroudsburg': 'poconos',
  'east-stroudsburg': 'poconos',
  'pocono-pines': 'poconos',
  'tannersville': 'poconos',
}

// Situation to relevant locations
const situationLocations = {
  'foreclosure': ['scranton', 'wilkes-barre', 'hazleton', 'allentown'],
  'inherited-property': ['scranton', 'wilkes-barre', 'bethlehem', 'allentown'],
  'divorce': ['allentown', 'bethlehem', 'scranton', 'easton'],
  'tired-landlord': ['scranton', 'wilkes-barre', 'allentown', 'hazleton'],
  'major-repairs': ['scranton', 'wilkes-barre', 'allentown', 'bethlehem'],
  'tax-liens-code-violations': ['wilkes-barre', 'hazleton', 'scranton', 'allentown'],
  'job-relocation': ['allentown', 'bethlehem', 'scranton', 'easton'],
  'vacant-property': ['scranton', 'wilkes-barre', 'stroudsburg', 'hazleton'],
}

// Situation to relevant blog posts
const situationBlogs = {
  'foreclosure': ['avoid-foreclosure-scranton-pa'],
  'inherited-property': ['sell-deceased-parents-house-without-probate-pennsylvania', 'documents-required-selling-inherited-property-pennsylvania'],
  'divorce': ['sell-house-fast-during-divorce-lehigh-county-pa'],
  'tired-landlord': ['luzerne-county-rental-property-registration-inspection-requirements-2026', 'hazleton-residential-occupancy-inspection-checklist'],
  'major-repairs': ['selling-water-damaged-house-18102-mold-issues', 'sell-my-house-fast-dunmore-mine-subsidence'],
  'tax-liens-code-violations': ['sell-house-wilkes-barre-code-violations', 'sell-my-house-fast-bethlehem-pa-18015-tax-lien', 'how-to-stop-berks-county-judicial-sale-2026'],
  'job-relocation': ['pennsylvania-job-relocation-home-buyout-fast-equity-release-2026'],
  'vacant-property': ['stop-govos-fines-poconos-house'],
}

// Location to relevant blog posts
const locationBlogs = {
  'scranton': ['avoid-foreclosure-scranton-pa', 'cash-home-buyers-lackawanna-county-no-fees', 'scranton-pa-major-structural-damage-disclosure-law-2026'],
  'wilkes-barre': ['sell-house-wilkes-barre-code-violations', 'sell-my-house-fast-luzerne-county-pa'],
  'hazleton': ['hazleton-residential-occupancy-inspection-checklist', 'sell-my-house-fast-luzerne-county-pa'],
  'dunmore': ['sell-my-house-fast-dunmore-mine-subsidence', 'cash-home-buyers-lackawanna-county-no-fees'],
  'allentown': ['sell-my-house-fast-allentown', 'selling-water-damaged-house-18102-mold-issues', 'sell-my-house-fast-lehigh-valley'],
  'bethlehem': ['selling-house-international-property-maintenance-code-violations-bethlehem', 'sell-my-house-fast-bethlehem-pa-18015-tax-lien', 'sell-my-house-fast-lehigh-valley'],
  'easton': ['easton-pa-rental-inspection-checklist-2026', 'sell-my-house-fast-lehigh-valley'],
  'reading': ['sell-hoarder-house-reading-pa-without-cleanout', 'cash-home-buyers-berks-county'],
  'pottsville': ['cash-home-buyers-pottsville-pa', 'how-to-stop-berks-county-judicial-sale-2026'],
  'stroudsburg': ['sell-my-house-fast-poconos-pa', 'stop-govos-fines-poconos-house'],
  'east-stroudsburg': ['sell-my-house-fast-poconos-pa', 'stop-govos-fines-poconos-house'],
  'pocono-pines': ['sell-my-house-fast-poconos-pa', 'stop-govos-fines-poconos-house'],
  'tannersville': ['sell-my-house-fast-poconos-pa', 'stop-govos-fines-poconos-house'],
}

// Location to relevant situations
const locationSituations = {
  'scranton': ['foreclosure', 'inherited-property', 'tired-landlord'],
  'wilkes-barre': ['tax-liens-code-violations', 'tired-landlord', 'foreclosure'],
  'hazleton': ['tired-landlord', 'tax-liens-code-violations', 'vacant-property'],
  'dunmore': ['major-repairs', 'inherited-property'],
  'pittston': ['foreclosure', 'inherited-property'],
  'kingston': ['inherited-property', 'divorce'],
  'nanticoke': ['foreclosure', 'tired-landlord'],
  'carbondale': ['inherited-property', 'major-repairs'],
  'honesdale': ['inherited-property', 'vacant-property'],
  'bloomsburg': ['inherited-property', 'job-relocation'],
  'allentown': ['divorce', 'foreclosure', 'major-repairs'],
  'bethlehem': ['tax-liens-code-violations', 'divorce', 'tired-landlord'],
  'easton': ['tired-landlord', 'inherited-property'],
  'reading': ['major-repairs', 'inherited-property'],
  'pottsville': ['tax-liens-code-violations', 'inherited-property'],
  'stroudsburg': ['vacant-property', 'tired-landlord'],
  'east-stroudsburg': ['vacant-property', 'tired-landlord'],
  'pocono-pines': ['vacant-property', 'tired-landlord'],
  'tannersville': ['vacant-property', 'job-relocation'],
}

// Blog to relevant situations
const blogSituations = {
  'avoid-foreclosure-scranton-pa': ['foreclosure'],
  'sell-deceased-parents-house-without-probate-pennsylvania': ['inherited-property'],
  'documents-required-selling-inherited-property-pennsylvania': ['inherited-property'],
  'sell-house-fast-during-divorce-lehigh-county-pa': ['divorce'],
  'sell-house-wilkes-barre-code-violations': ['tax-liens-code-violations', 'tired-landlord'],
  'hazleton-residential-occupancy-inspection-checklist': ['tired-landlord', 'tax-liens-code-violations'],
  'selling-house-international-property-maintenance-code-violations-bethlehem': ['tax-liens-code-violations', 'tired-landlord'],
  'sell-my-house-fast-bethlehem-pa-18015-tax-lien': ['tax-liens-code-violations', 'foreclosure'],
  'how-to-stop-berks-county-judicial-sale-2026': ['tax-liens-code-violations', 'foreclosure'],
  'selling-water-damaged-house-18102-mold-issues': ['major-repairs'],
  'sell-my-house-fast-dunmore-mine-subsidence': ['major-repairs'],
  'pennsylvania-job-relocation-home-buyout-fast-equity-release-2026': ['job-relocation'],
  'stop-govos-fines-poconos-house': ['vacant-property', 'tired-landlord'],
  'sell-hoarder-house-reading-pa-without-cleanout': ['major-repairs', 'inherited-property'],
  'luzerne-county-rental-property-registration-inspection-requirements-2026': ['tired-landlord', 'tax-liens-code-violations'],
  'easton-pa-rental-inspection-checklist-2026': ['tired-landlord'],
  'sell-my-house-fast-poconos-pa': ['vacant-property'],
  'sell-my-house-fast-lehigh-valley': ['divorce', 'foreclosure'],
  'sell-my-house-fast-luzerne-county-pa': ['foreclosure', 'inherited-property'],
  'sell-my-house-fast-allentown': ['divorce', 'foreclosure'],
  'cash-home-buyers-lackawanna-county-no-fees': ['foreclosure', 'inherited-property'],
  'cash-home-buyers-berks-county': ['inherited-property', 'foreclosure'],
  'cash-home-buyers-pottsville-pa': ['inherited-property', 'tax-liens-code-violations'],
  'pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights': ['vacant-property', 'tax-liens-code-violations'],
  'scranton-pa-major-structural-damage-disclosure-law-2026': ['major-repairs'],
}

// Blog to relevant locations
const blogLocations = {
  'avoid-foreclosure-scranton-pa': ['scranton', 'dunmore', 'wilkes-barre'],
  'sell-deceased-parents-house-without-probate-pennsylvania': ['scranton', 'allentown', 'bethlehem'],
  'documents-required-selling-inherited-property-pennsylvania': ['scranton', 'allentown'],
  'sell-house-fast-during-divorce-lehigh-county-pa': ['allentown', 'bethlehem', 'easton'],
  'sell-house-wilkes-barre-code-violations': ['wilkes-barre', 'kingston', 'nanticoke'],
  'hazleton-residential-occupancy-inspection-checklist': ['hazleton'],
  'selling-house-international-property-maintenance-code-violations-bethlehem': ['bethlehem', 'allentown'],
  'sell-my-house-fast-bethlehem-pa-18015-tax-lien': ['bethlehem'],
  'how-to-stop-berks-county-judicial-sale-2026': ['reading', 'pottsville'],
  'selling-water-damaged-house-18102-mold-issues': ['allentown', 'bethlehem'],
  'sell-my-house-fast-dunmore-mine-subsidence': ['dunmore', 'scranton', 'carbondale'],
  'pennsylvania-job-relocation-home-buyout-fast-equity-release-2026': ['allentown', 'bethlehem', 'scranton'],
  'stop-govos-fines-poconos-house': ['stroudsburg', 'east-stroudsburg', 'pocono-pines', 'tannersville'],
  'sell-hoarder-house-reading-pa-without-cleanout': ['reading'],
  'luzerne-county-rental-property-registration-inspection-requirements-2026': ['wilkes-barre', 'hazleton', 'pittston'],
  'easton-pa-rental-inspection-checklist-2026': ['easton'],
  'sell-my-house-fast-poconos-pa': ['stroudsburg', 'east-stroudsburg', 'pocono-pines'],
  'sell-my-house-fast-lehigh-valley': ['allentown', 'bethlehem', 'easton'],
  'sell-my-house-fast-luzerne-county-pa': ['wilkes-barre', 'hazleton', 'pittston'],
  'sell-my-house-fast-allentown': ['allentown'],
  'cash-home-buyers-lackawanna-county-no-fees': ['scranton', 'dunmore', 'carbondale'],
  'cash-home-buyers-berks-county': ['reading'],
  'cash-home-buyers-pottsville-pa': ['pottsville'],
  'pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights': ['scranton', 'wilkes-barre', 'allentown'],
  'scranton-pa-major-structural-damage-disclosure-law-2026': ['scranton', 'dunmore'],
}

// Situation display names
const situationNames = {
  'foreclosure': 'foreclosure',
  'inherited-property': 'inherited property',
  'divorce': 'divorce',
  'tired-landlord': 'landlords',
  'major-repairs': 'homes needing major repairs',
  'tax-liens-code-violations': 'tax liens and code violations',
  'job-relocation': 'job relocation',
  'vacant-property': 'vacant properties',
}

// Region display names
const regionNames = {
  'nepa': 'NEPA',
  'lehigh-valley': 'Lehigh Valley',
  'poconos': 'Poconos',
}

// Check if link exists in content
function hasLink(content, href) {
  if (!content) return false
  const str = JSON.stringify(content)
  return str.includes(href)
}

// Create a link block with contextual text
function createLinkBlock(prefix, linkText, href, suffix = '.') {
  const key = uniqueKey('lnk')
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    children: [
      { _type: 'span', _key: uniqueKey('s'), text: prefix, marks: [] },
      { _type: 'span', _key: uniqueKey('s'), text: linkText, marks: [`link-${key}`] },
      { _type: 'span', _key: uniqueKey('s'), text: suffix, marks: [] },
    ],
    markDefs: [
      { _type: 'link', _key: `link-${key}`, href: href },
    ],
  }
}

// Process location pages
async function processLocations() {
  console.log('\n📍 PROCESSING LOCATION PAGES')
  console.log('-'.repeat(50))

  const locations = await client.fetch(
    `*[_type == "location"]{ _id, city, "slug": slug.current, problemStatement }`
  )

  let totalAdded = 0

  for (const loc of locations) {
    const slug = loc.slug
    const linksToAdd = []

    // 1. Link to regional hub
    const region = locationToRegion[slug]
    if (region && !hasLink(loc.problemStatement, `/locations/${region}`)) {
      linksToAdd.push(createLinkBlock(
        `We serve the entire ${regionNames[region]} region. `,
        `View all ${regionNames[region]} locations`,
        `/locations/${region}`
      ))
    }

    // 2. Link to relevant situations (2-3)
    const situations = locationSituations[slug] || []
    for (const sit of situations.slice(0, 2)) {
      if (!hasLink(loc.problemStatement, `/situations/${sit}`)) {
        linksToAdd.push(createLinkBlock(
          'Dealing with ',
          situationNames[sit],
          `/situations/${sit}`,
          '? We can help.'
        ))
      }
    }

    // 3. Link to relevant blog posts (1-2)
    const blogs = locationBlogs[slug] || []
    for (const blog of blogs.slice(0, 1)) {
      if (!hasLink(loc.problemStatement, `/blog/${blog}`)) {
        linksToAdd.push(createLinkBlock(
          'Read our guide: ',
          blog.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).substring(0, 50) + '...',
          `/blog/${blog}`
        ))
      }
    }

    // 4. Link to comparison page
    if (!hasLink(loc.problemStatement, '/cash-buyer-vs-realtor')) {
      linksToAdd.push(createLinkBlock(
        'Not sure if a cash buyer is right for you? ',
        'Compare cash buyers vs. realtors',
        '/cash-buyer-vs-realtor'
      ))
    }

    // 5. Link to how-it-works
    if (!hasLink(loc.problemStatement, '/how-it-works')) {
      linksToAdd.push(createLinkBlock(
        'Curious about our process? ',
        'See how it works',
        '/how-it-works'
      ))
    }

    if (linksToAdd.length > 0) {
      const currentContent = loc.problemStatement || []
      await client.patch(loc._id)
        .set({ problemStatement: [...currentContent, ...linksToAdd] })
        .commit()

      console.log(`  ✅ ${loc.city}: Added ${linksToAdd.length} links`)
      totalAdded += linksToAdd.length
    } else {
      console.log(`  ⏭️  ${loc.city}: Already well-linked`)
    }

    await new Promise(r => setTimeout(r, 200))
  }

  return totalAdded
}

// Process situation pages
async function processSituations() {
  console.log('\n🏠 PROCESSING SITUATION PAGES')
  console.log('-'.repeat(50))

  const situations = await client.fetch(
    `*[_type == "situation"]{ _id, title, "slug": slug.current, problemDescription }`
  )

  let totalAdded = 0

  for (const sit of situations) {
    const slug = sit.slug
    const linksToAdd = []

    // 1. Link to relevant locations (2-3)
    const locs = situationLocations[slug] || []
    for (const loc of locs.slice(0, 2)) {
      if (!hasLink(sit.problemDescription, `/locations/${loc}`)) {
        const locName = loc.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        linksToAdd.push(createLinkBlock(
          `Selling in ${locName}? `,
          `Get a cash offer in ${locName}`,
          `/locations/${loc}`
        ))
      }
    }

    // 2. Link to relevant blog posts
    const blogs = situationBlogs[slug] || []
    for (const blog of blogs.slice(0, 2)) {
      if (!hasLink(sit.problemDescription, `/blog/${blog}`)) {
        linksToAdd.push(createLinkBlock(
          'Learn more: ',
          blog.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).substring(0, 50) + '...',
          `/blog/${blog}`
        ))
      }
    }

    // 3. Link to comparison page
    if (!hasLink(sit.problemDescription, '/cash-buyer-vs-realtor')) {
      linksToAdd.push(createLinkBlock(
        'Weighing your options? ',
        'Compare cash buyers vs. traditional realtors',
        '/cash-buyer-vs-realtor'
      ))
    }

    // 4. Link to how-it-works
    if (!hasLink(sit.problemDescription, '/how-it-works')) {
      linksToAdd.push(createLinkBlock(
        'Ready to get started? ',
        'Learn how our process works',
        '/how-it-works'
      ))
    }

    if (linksToAdd.length > 0) {
      const currentContent = sit.problemDescription || []
      await client.patch(sit._id)
        .set({ problemDescription: [...currentContent, ...linksToAdd] })
        .commit()

      console.log(`  ✅ ${sit.title}: Added ${linksToAdd.length} links`)
      totalAdded += linksToAdd.length
    } else {
      console.log(`  ⏭️  ${sit.title}: Already well-linked`)
    }

    await new Promise(r => setTimeout(r, 200))
  }

  return totalAdded
}

// Process blog posts
async function processBlogPosts() {
  console.log('\n📝 PROCESSING BLOG POSTS')
  console.log('-'.repeat(50))

  const posts = await client.fetch(
    `*[_type == "blogPost"]{ _id, title, "slug": slug.current, content }`
  )

  let totalAdded = 0

  for (const post of posts) {
    const slug = post.slug
    const linksToAdd = []

    // 1. Link to relevant situations
    const sits = blogSituations[slug] || []
    for (const sit of sits.slice(0, 2)) {
      if (!hasLink(post.content, `/situations/${sit}`)) {
        linksToAdd.push(createLinkBlock(
          'Learn more about selling ',
          situationNames[sit] + ' properties',
          `/situations/${sit}`
        ))
      }
    }

    // 2. Link to relevant locations (1-2)
    const locs = blogLocations[slug] || []
    for (const loc of locs.slice(0, 1)) {
      if (!hasLink(post.content, `/locations/${loc}`)) {
        const locName = loc.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        linksToAdd.push(createLinkBlock(
          `Selling in ${locName}? `,
          `Get a cash offer today`,
          `/locations/${loc}`
        ))
      }
    }

    // 3. Link to comparison page (if not already present)
    if (!hasLink(post.content, '/cash-buyer-vs-realtor')) {
      linksToAdd.push(createLinkBlock(
        'Considering your selling options? ',
        'Compare cash buyers vs. realtors',
        '/cash-buyer-vs-realtor'
      ))
    }

    // Limit to 3 new links per post
    const toAdd = linksToAdd.slice(0, 3)

    if (toAdd.length > 0) {
      const currentContent = post.content || []
      await client.patch(post._id)
        .set({ content: [...currentContent, ...toAdd] })
        .commit()

      console.log(`  ✅ ${post.title.substring(0, 40)}...: Added ${toAdd.length} links`)
      totalAdded += toAdd.length
    } else {
      console.log(`  ⏭️  ${post.title.substring(0, 40)}...: Already well-linked`)
    }

    await new Promise(r => setTimeout(r, 200))
  }

  return totalAdded
}

async function main() {
  console.log('='.repeat(80))
  console.log('PHASE 8 TASK #41: Internal Linking Enhancement')
  console.log('='.repeat(80))

  const locationLinks = await processLocations()
  const situationLinks = await processSituations()
  const blogLinks = await processBlogPosts()

  const totalAdded = locationLinks + situationLinks + blogLinks

  console.log('\n' + '='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))
  console.log(`Location pages: +${locationLinks} links`)
  console.log(`Situation pages: +${situationLinks} links`)
  console.log(`Blog posts: +${blogLinks} links`)
  console.log(`TOTAL: +${totalAdded} internal links added`)
  console.log('='.repeat(80))
}

main().catch(console.error)
