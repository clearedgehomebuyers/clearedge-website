import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import fs from 'fs'
import path from 'path'

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

// All known pages on the site
const staticPages = [
  '/',
  '/how-it-works',
  '/about',
  '/contact',
  '/testimonials',
  '/blog',
  '/cash-buyer-vs-realtor',
  '/privacy-policy',
  '/terms',
  '/sell-house-fast-scranton-pa',
  '/locations/nepa',
  '/locations/lehigh-valley',
  '/locations/poconos',
]

// Extract internal links from portable text content
function extractLinksFromPortableText(content) {
  const links = []
  if (!content) return links

  const contentStr = JSON.stringify(content)
  const hrefMatches = contentStr.match(/"href":"([^"]+)"/g) || []

  for (const match of hrefMatches) {
    const href = match.replace('"href":"', '').replace('"', '')
    if (href.startsWith('/') && !href.startsWith('//')) {
      links.push(href)
    }
  }

  return [...new Set(links)]
}

// Extract links from a TSX/JSX file content
function extractLinksFromCode(filePath) {
  const links = []
  try {
    const content = fs.readFileSync(filePath, 'utf-8')

    // Match href="/..." patterns
    const hrefMatches = content.match(/href=["'](\/[^"'#]*)/g) || []
    for (const match of hrefMatches) {
      const href = match.replace(/href=["']/, '')
      if (href.startsWith('/') && !href.includes('{')) {
        links.push(href)
      }
    }

    // Match Link href="/..." patterns
    const linkMatches = content.match(/Link\s+href=["'](\/[^"'#]*)/g) || []
    for (const match of linkMatches) {
      const href = match.replace(/Link\s+href=["']/, '')
      if (href.startsWith('/') && !href.includes('{')) {
        links.push(href)
      }
    }

  } catch (e) {
    // File doesn't exist or can't be read
  }
  return [...new Set(links)]
}

async function main() {
  console.log('='.repeat(80))
  console.log('INTERNAL LINKING AUDIT')
  console.log('='.repeat(80))

  // Collect all pages
  const allPages = [...staticPages]
  const linkGraph = {} // page -> [pages it links to]
  const inboundLinks = {} // page -> [pages that link to it]

  // Get all locations from Sanity
  const locations = await client.fetch(
    `*[_type == "location"]{ "slug": slug.current, city, problemStatement }`
  )
  for (const loc of locations) {
    allPages.push(`/locations/${loc.slug}`)
  }

  // Get all situations from Sanity
  const situations = await client.fetch(
    `*[_type == "situation"]{ "slug": slug.current, title, problemDescription }`
  )
  for (const sit of situations) {
    allPages.push(`/situations/${sit.slug}`)
  }

  // Get all blog posts from Sanity
  const blogPosts = await client.fetch(
    `*[_type == "blogPost"]{ "slug": slug.current, title, content }`
  )
  for (const post of blogPosts) {
    allPages.push(`/blog/${post.slug}`)
  }

  console.log(`\nTotal pages found: ${allPages.length}`)

  // Initialize link tracking
  for (const page of allPages) {
    linkGraph[page] = []
    inboundLinks[page] = []
  }

  // Analyze links from Sanity content
  console.log('\n--- Analyzing Sanity Content ---')

  // Location pages
  for (const loc of locations) {
    const pagePath = `/locations/${loc.slug}`
    const links = extractLinksFromPortableText(loc.problemStatement)
    linkGraph[pagePath] = links
    for (const link of links) {
      if (inboundLinks[link]) {
        inboundLinks[link].push(pagePath)
      }
    }
  }

  // Situation pages
  for (const sit of situations) {
    const pagePath = `/situations/${sit.slug}`
    const links = extractLinksFromPortableText(sit.problemDescription)
    linkGraph[pagePath] = links
    for (const link of links) {
      if (inboundLinks[link]) {
        inboundLinks[link].push(pagePath)
      }
    }
  }

  // Blog posts
  for (const post of blogPosts) {
    const pagePath = `/blog/${post.slug}`
    const links = extractLinksFromPortableText(post.content)
    linkGraph[pagePath] = links
    for (const link of links) {
      if (inboundLinks[link]) {
        inboundLinks[link].push(pagePath)
      }
    }
  }

  // Analyze links from static pages (code files)
  console.log('\n--- Analyzing Static Pages ---')

  const staticPageFiles = {
    '/': 'src/app/page.tsx',
    '/how-it-works': 'src/app/how-it-works/page.tsx',
    '/about': 'src/app/about/page.tsx',
    '/contact': 'src/app/contact/page.tsx',
    '/testimonials': 'src/app/testimonials/page.tsx',
    '/blog': 'src/app/blog/page.tsx',
    '/cash-buyer-vs-realtor': 'src/app/cash-buyer-vs-realtor/page.tsx',
    '/locations/nepa': 'src/app/locations/nepa/page.tsx',
    '/locations/lehigh-valley': 'src/app/locations/lehigh-valley/page.tsx',
    '/locations/poconos': 'src/app/locations/poconos/page.tsx',
    '/sell-house-fast-scranton-pa': 'src/app/sell-house-fast-scranton-pa/page.tsx',
  }

  const basePath = resolve(__dirname, '..')

  for (const [pagePath, filePath] of Object.entries(staticPageFiles)) {
    const fullPath = path.join(basePath, filePath)
    const links = extractLinksFromCode(fullPath)
    linkGraph[pagePath] = [...new Set([...(linkGraph[pagePath] || []), ...links])]
    for (const link of links) {
      if (inboundLinks[link]) {
        if (!inboundLinks[link].includes(pagePath)) {
          inboundLinks[link].push(pagePath)
        }
      }
    }
  }

  // Generate report
  console.log('\n' + '='.repeat(80))
  console.log('AUDIT RESULTS')
  console.log('='.repeat(80))

  // Orphan pages (0 or 1 inbound links)
  console.log('\n🔴 ORPHAN PAGES (0-1 inbound links from body content):')
  const orphans = []
  for (const page of allPages) {
    const count = inboundLinks[page]?.length || 0
    if (count <= 1) {
      orphans.push({ page, count })
    }
  }
  orphans.sort((a, b) => a.count - b.count)
  for (const { page, count } of orphans) {
    console.log(`  ${count} links → ${page}`)
  }

  // Pages with few outbound links
  console.log('\n🟡 PAGES WITH FEW OUTBOUND LINKS (0-2):')
  for (const page of allPages) {
    const count = linkGraph[page]?.length || 0
    if (count <= 2) {
      console.log(`  ${count} links ← ${page}`)
    }
  }

  // Well-connected pages
  console.log('\n🟢 WELL-CONNECTED PAGES (5+ inbound):')
  for (const page of allPages) {
    const count = inboundLinks[page]?.length || 0
    if (count >= 5) {
      console.log(`  ${count} links → ${page}`)
    }
  }

  // Summary stats
  console.log('\n' + '='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))
  console.log(`Total pages: ${allPages.length}`)
  console.log(`Orphan pages (0-1 inbound): ${orphans.length}`)

  const totalLinks = Object.values(linkGraph).reduce((sum, links) => sum + links.length, 0)
  console.log(`Total internal links in body content: ${totalLinks}`)

  // Output detailed data for enhancement script
  const auditData = {
    allPages,
    linkGraph,
    inboundLinks,
    locations: locations.map(l => ({ slug: l.slug, city: l.city })),
    situations: situations.map(s => ({ slug: s.slug, title: s.title })),
    blogPosts: blogPosts.map(b => ({ slug: b.slug, title: b.title })),
  }

  fs.writeFileSync(
    path.join(__dirname, 'audit-data.json'),
    JSON.stringify(auditData, null, 2)
  )
  console.log('\nAudit data saved to scripts/audit-data.json')
}

main().catch(console.error)
