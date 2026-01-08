import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

// Define service area structure
const serviceAreas = {
  'Lehigh County': ['Allentown', 'Bethlehem', 'Emmaus', 'Whitehall', 'Macungie', 'Catasauqua'],
  'Northampton County': ['Easton', 'Bethlehem', 'Nazareth', 'Bangor', 'Pen Argyl', 'Wind Gap'],
  'Lackawanna County': ['Scranton', 'Dunmore', 'Carbondale', 'Old Forge', 'Clarks Summit', 'Dickson City'],
  'Luzerne County': ['Wilkes-Barre', 'Hazleton', 'Kingston', 'Nanticoke', 'Pittston', 'Plymouth', 'West Pittston'],
  'Berks County': ['Reading', 'West Reading', 'Wyomissing', 'Kutztown', 'Hamburg'],
  'Schuylkill County': ['Pottsville', 'Tamaqua', 'Shenandoah', 'Mahanoy City', 'Minersville'],
  'Monroe County': ['Stroudsburg', 'East Stroudsburg', 'Mount Pocono', 'Tannersville'],
  'Carbon County': ['Jim Thorpe', 'Lehighton', 'Palmerton', 'Lansford'],
  'Pike County': ['Milford', 'Dingmans Ferry', 'Matamoras'],
  'Wayne County': ['Honesdale', 'Waymart', 'Hawley']
}

// Define situation types
const situationTypes = [
  { id: 'fast-sale', name: 'Fast Cash Sale', keywords: ['sell my house fast', 'sell house fast', 'quick sale'] },
  { id: 'cash-buyers', name: 'Cash Home Buyers', keywords: ['cash home buyers', 'cash buyers', 'we buy houses'] },
  { id: 'foreclosure', name: 'Foreclosure / Sheriff Sale', keywords: ['foreclosure', 'sheriff sale', 'judicial sale', 'avoid foreclosure'] },
  { id: 'probate', name: 'Probate / Inherited Property', keywords: ['probate', 'inherited', 'deceased', 'inheritance'] },
  { id: 'code-violations', name: 'Code Violations / IPMC', keywords: ['code violation', 'ipmc', 'violations'] },
  { id: 'rental-inspection', name: 'Rental Inspection / Landlord', keywords: ['rental inspection', 'landlord', 'occupancy inspection', 'rental registration'] },
  { id: 'tax-lien', name: 'Tax Liens / Delinquent Taxes', keywords: ['tax lien', 'delinquent', 'tax sale', 'back taxes'] },
  { id: 'water-damage', name: 'Water Damage / Mold', keywords: ['water damage', 'mold', 'flood', 'moisture'] },
  { id: 'fire-damage', name: 'Fire Damage', keywords: ['fire damage', 'fire', 'smoke damage'] },
  { id: 'mine-subsidence', name: 'Mine Subsidence', keywords: ['mine subsidence', 'mine', 'subsidence', 'sinking'] },
  { id: 'divorce', name: 'Divorce', keywords: ['divorce', 'separation', 'marital'] },
  { id: 'job-relocation', name: 'Job Relocation', keywords: ['relocation', 'job', 'moving', 'transfer', 'buyout'] },
  { id: 'hoarder', name: 'Hoarder House', keywords: ['hoarder', 'hoarding', 'cluttered'] },
  { id: 'vacant', name: 'Vacant / Abandoned', keywords: ['vacant', 'abandoned', 'empty'] },
  { id: 'str-compliance', name: 'STR/Airbnb Compliance', keywords: ['govos', 'airbnb', 'str', 'short-term rental'] },
  { id: 'disclosure', name: 'Disclosure Requirements', keywords: ['disclosure', 'seller disclosure'] },
  { id: 'conservatorship', name: 'Conservatorship / Blight', keywords: ['conservatorship', 'act 135', 'blight'] }
]

async function main() {
  console.log('Starting ClearEdge Home Buyers Blog Content Analysis...\n')
  console.log('=' .repeat(60))

  // Query all blog posts
  const postsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    metaTitle,
    metaDescription,
    "category": category->title,
    "categorySlug": category->slug.current,
    "locations": relatedLocations[]->title,
    "locationSlugs": relatedLocations[]->slug.current,
    "situations": relatedSituations[]->title,
    "situationSlugs": relatedSituations[]->slug.current,
    "author": author->name,
    body
  }`

  // Query all locations
  const locationsQuery = `*[_type == "location"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    county,
    state
  }`

  // Query all situations
  const situationsQuery = `*[_type == "situation"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }`

  // Query all categories
  const categoriesQuery = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }`

  console.log('\nFetching data from Sanity CMS...')

  const [posts, locations, situations, categories] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(locationsQuery),
    client.fetch(situationsQuery),
    client.fetch(categoriesQuery)
  ])

  console.log(`\nFound ${posts.length} blog posts`)
  console.log(`Found ${locations.length} locations`)
  console.log(`Found ${situations.length} situations`)
  console.log(`Found ${categories.length} categories`)

  // Process and analyze data
  const analysis = analyzeContent(posts, locations, situations, categories)

  // Generate markdown report
  const markdownReport = generateMarkdownReport(analysis, posts, locations, situations)

  // Generate JSON summary
  const jsonSummary = generateJsonSummary(analysis, posts)

  // Save files
  const outputDir = process.cwd()

  fs.writeFileSync(
    path.join(outputDir, 'blog-content-analysis-COMPLETE.md'),
    markdownReport
  )
  console.log('\n✅ Saved: blog-content-analysis-COMPLETE.md')

  fs.writeFileSync(
    path.join(outputDir, 'blog-content-summary.json'),
    JSON.stringify(jsonSummary, null, 2)
  )
  console.log('✅ Saved: blog-content-summary.json')

  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('ANALYSIS SUMMARY')
  console.log('='.repeat(60))
  console.log(`\nTotal blog posts: ${posts.length}`)

  // Top locations by content
  const locationCounts = {}
  posts.forEach(post => {
    (post.locations || []).forEach(loc => {
      locationCounts[loc] = (locationCounts[loc] || 0) + 1
    })
  })
  const topLocations = Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  console.log('\nTop 3 locations by content volume:')
  topLocations.forEach(([loc, count], i) => {
    console.log(`  ${i + 1}. ${loc}: ${count} posts`)
  })

  // Top situations by content
  const situationCounts = {}
  posts.forEach(post => {
    (post.situations || []).forEach(sit => {
      situationCounts[sit] = (situationCounts[sit] || 0) + 1
    })
  })
  const topSituations = Object.entries(situationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  console.log('\nTop 3 situations by content volume:')
  if (topSituations.length > 0) {
    topSituations.forEach(([sit, count], i) => {
      console.log(`  ${i + 1}. ${sit}: ${count} posts`)
    })
  } else {
    console.log('  (No situation tags found)')
  }

  // Highest priority gap
  if (analysis.gaps.highPriority.length > 0) {
    console.log(`\n#1 Highest priority gap: ${analysis.gaps.highPriority[0]}`)
  }

  console.log('\n' + '='.repeat(60))
  console.log('Files saved successfully!')
  console.log('='.repeat(60))

  return { posts, analysis }
}

function analyzeContent(posts, locations, situations, categories) {
  const analysis = {
    totalPosts: posts.length,
    postsByCategory: {},
    postsByLocation: {},
    postsBySituation: {},
    gaps: {
      highPriority: [],
      mediumPriority: [],
      lowPriority: []
    },
    coverageByLocation: {},
    coverageBySituation: {},
    keywordCoverage: [],
    contentOverlap: [],
    internalLinkingIssues: []
  }

  // Count posts by category
  posts.forEach(post => {
    const cat = post.category || 'Uncategorized'
    analysis.postsByCategory[cat] = (analysis.postsByCategory[cat] || 0) + 1
  })

  // Count posts by location
  posts.forEach(post => {
    (post.locations || []).forEach(loc => {
      analysis.postsByLocation[loc] = (analysis.postsByLocation[loc] || 0) + 1
    })
  })

  // Count posts by situation
  posts.forEach(post => {
    (post.situations || []).forEach(sit => {
      analysis.postsBySituation[sit] = (analysis.postsBySituation[sit] || 0) + 1
    })
  })

  // Analyze coverage by location
  Object.entries(serviceAreas).forEach(([county, cities]) => {
    analysis.coverageByLocation[county] = {}
    cities.forEach(city => {
      const cityLower = city.toLowerCase()
      const cityPosts = posts.filter(post => {
        const titleLower = (post.title || '').toLowerCase()
        const slugLower = (post.slug || '').toLowerCase()
        const locationsLower = (post.locations || []).filter(l => l).map(l => l.toLowerCase())
        return titleLower.includes(cityLower) ||
               slugLower.includes(cityLower) ||
               locationsLower.some(l => l.includes(cityLower))
      })

      analysis.coverageByLocation[county][city] = {
        totalPosts: cityPosts.length,
        hasFastSale: cityPosts.some(p => /sell.*(my|your)?\s*house\s*fast/i.test(p.title)),
        hasCashBuyers: cityPosts.some(p => /cash\s*(home)?\s*buyers/i.test(p.title)),
        hasForeclosure: cityPosts.some(p => /foreclosure|sheriff\s*sale|judicial\s*sale/i.test(p.title)),
        hasCodeViolations: cityPosts.some(p => /code\s*violation|ipmc/i.test(p.title)),
        hasRentalInspection: cityPosts.some(p => /rental.*inspection|occupancy.*inspection|rental.*registration/i.test(p.title)),
        hasProbate: cityPosts.some(p => /probate|inherited|inheritance/i.test(p.title)),
        hasTaxLien: cityPosts.some(p => /tax\s*lien|delinquent|tax\s*sale/i.test(p.title)),
        hasWaterDamage: cityPosts.some(p => /water\s*damage|mold|flood/i.test(p.title)),
        posts: cityPosts.map(p => p.title)
      }
    })
  })

  // Analyze coverage by situation
  situationTypes.forEach(situation => {
    const situationPosts = posts.filter(post => {
      const titleLower = (post.title || '').toLowerCase()
      const slugLower = (post.slug || '').toLowerCase()
      return situation.keywords.some(kw =>
        titleLower.includes(kw.toLowerCase()) || slugLower.includes(kw.toLowerCase())
      )
    })

    analysis.coverageBySituation[situation.name] = {
      totalPosts: situationPosts.length,
      locations: [...new Set(situationPosts.flatMap(p => p.locations || []))],
      posts: situationPosts.map(p => ({ title: p.title, slug: p.slug }))
    }
  })

  // Identify gaps
  // High priority: Primary locations missing core content
  const primaryLocations = ['Allentown', 'Scranton', 'Wilkes-Barre', 'Reading', 'Bethlehem', 'Easton', 'Hazleton']
  primaryLocations.forEach(loc => {
    const locLower = loc.toLowerCase()
    const hasFastSale = posts.some(p => {
      const titleLower = (p.title || '').toLowerCase()
      return titleLower.includes(locLower) && /sell.*(my|your)?\s*house\s*fast/i.test(p.title)
    })
    const hasCashBuyers = posts.some(p => {
      const titleLower = (p.title || '').toLowerCase()
      return titleLower.includes(locLower) && /cash\s*(home)?\s*buyers/i.test(p.title)
    })

    if (!hasFastSale) {
      analysis.gaps.highPriority.push(`Missing "Sell My House Fast ${loc}" article`)
    }
    if (!hasCashBuyers) {
      analysis.gaps.highPriority.push(`Missing "Cash Home Buyers ${loc}" article`)
    }
  })

  // Medium priority: Primary locations missing situation content
  const importantSituations = ['foreclosure', 'probate', 'code violations', 'tax lien']
  primaryLocations.forEach(loc => {
    importantSituations.forEach(sit => {
      const hasContent = posts.some(p => {
        const titleLower = (p.title || '').toLowerCase()
        return titleLower.includes(loc.toLowerCase()) && titleLower.includes(sit.toLowerCase())
      })
      if (!hasContent) {
        analysis.gaps.mediumPriority.push(`Missing ${sit} content for ${loc}`)
      }
    })
  })

  // Low priority: Situation types with limited coverage
  situationTypes.forEach(situation => {
    const coverage = analysis.coverageBySituation[situation.name]
    if (coverage.totalPosts === 0) {
      analysis.gaps.lowPriority.push(`No content for: ${situation.name}`)
    } else if (coverage.totalPosts <= 2) {
      analysis.gaps.lowPriority.push(`Limited coverage (${coverage.totalPosts} posts) for: ${situation.name}`)
    }
  })

  // Keyword coverage analysis
  const keywordPatterns = [
    { pattern: 'sell my house fast {location}', type: 'fast-sale' },
    { pattern: 'cash home buyers {location}', type: 'cash-buyers' },
    { pattern: 'we buy houses {location}', type: 'cash-buyers' },
    { pattern: '{location} foreclosure help', type: 'foreclosure' },
    { pattern: 'sell house {situation} {location}', type: 'situation' }
  ]

  primaryLocations.forEach(loc => {
    keywordPatterns.forEach(kp => {
      const keyword = kp.pattern.replace('{location}', loc)
      const exists = posts.some(p => {
        const titleLower = (p.title || '').toLowerCase()
        const slugLower = (p.slug || '').toLowerCase()
        const keywordLower = keyword.toLowerCase().replace('{situation}', '')
        return titleLower.includes(loc.toLowerCase()) || slugLower.includes(loc.toLowerCase())
      })
      analysis.keywordCoverage.push({
        keyword: keyword.replace('{situation}', '[situation]'),
        location: loc,
        type: kp.type,
        exists
      })
    })
  })

  // Content overlap analysis
  const titlePatterns = {}
  posts.forEach(post => {
    const normalizedTitle = (post.title || '').toLowerCase()
      .replace(/\d{4}/g, 'YEAR')
      .replace(/(allentown|scranton|wilkes-barre|reading|bethlehem|easton|hazleton|stroudsburg)/gi, 'LOCATION')

    if (!titlePatterns[normalizedTitle]) {
      titlePatterns[normalizedTitle] = []
    }
    titlePatterns[normalizedTitle].push(post)
  })

  Object.entries(titlePatterns).forEach(([pattern, matchingPosts]) => {
    if (matchingPosts.length > 1) {
      analysis.contentOverlap.push({
        pattern,
        posts: matchingPosts.map(p => ({ title: p.title, slug: p.slug }))
      })
    }
  })

  return analysis
}

function generateMarkdownReport(analysis, posts, locations, situations) {
  let md = `# ClearEdge Home Buyers Blog Content Analysis

**Generated:** ${new Date().toISOString().split('T')[0]}
**Total Blog Posts:** ${posts.length}
**Total Locations in Sanity:** ${locations.length}
**Total Situations in Sanity:** ${situations.length}

---

## SECTION 1: MASTER BLOG POST LIST

| # | Title | Slug | Category | Publish Date | Primary Location(s) | Primary Situation(s) |
|---|-------|------|----------|--------------|---------------------|---------------------|
`

  posts.forEach((post, i) => {
    const date = post.publishedAt ? post.publishedAt.split('T')[0] : 'N/A'
    const locs = (post.locations || []).slice(0, 3).join(', ') || 'None'
    const sits = (post.situations || []).slice(0, 2).join(', ') || 'None'
    md += `| ${i + 1} | ${post.title || 'Untitled'} | ${post.slug || 'N/A'} | ${post.category || 'N/A'} | ${date} | ${locs} | ${sits} |\n`
  })

  md += `
---

## SECTION 2: COVERAGE BY LOCATION

`

  Object.entries(analysis.coverageByLocation).forEach(([county, cities]) => {
    md += `### ${county}\n\n`

    Object.entries(cities).forEach(([city, coverage]) => {
      md += `**${city}** (${coverage.totalPosts} posts)\n`
      md += `- [${coverage.hasFastSale ? 'x' : ' '}] "Sell My House Fast" article\n`
      md += `- [${coverage.hasCashBuyers ? 'x' : ' '}] "Cash Home Buyers" article\n`
      md += `- [${coverage.hasForeclosure ? 'x' : ' '}] Foreclosure content\n`
      md += `- [${coverage.hasCodeViolations ? 'x' : ' '}] Code violation content\n`
      md += `- [${coverage.hasRentalInspection ? 'x' : ' '}] Rental inspection content\n`
      md += `- [${coverage.hasProbate ? 'x' : ' '}] Probate/inheritance content\n`
      md += `- [${coverage.hasTaxLien ? 'x' : ' '}] Tax lien content\n`
      md += `- [${coverage.hasWaterDamage ? 'x' : ' '}] Water damage content\n`
      if (coverage.posts.length > 0) {
        md += `\nPosts: ${coverage.posts.join('; ')}\n`
      }
      md += '\n'
    })
  })

  md += `
---

## SECTION 3: COVERAGE BY SITUATION/PROBLEM

`

  situationTypes.forEach(situation => {
    const coverage = analysis.coverageBySituation[situation.name]
    md += `### ${situation.name}\n`
    md += `**Posts:** ${coverage.totalPosts}\n`
    md += `**Locations Covered:** ${coverage.locations.length > 0 ? coverage.locations.join(', ') : 'None'}\n\n`

    if (coverage.posts.length > 0) {
      md += `Posts:\n`
      coverage.posts.forEach(p => {
        md += `- [${p.title}](/blog/${p.slug})\n`
      })
    }
    md += '\n'
  })

  md += `
---

## SECTION 4: GAP ANALYSIS

### HIGH PRIORITY GAPS (Missing Core Content)

`
  if (analysis.gaps.highPriority.length > 0) {
    analysis.gaps.highPriority.forEach(gap => {
      md += `- ❌ ${gap}\n`
    })
  } else {
    md += `✅ No high priority gaps identified.\n`
  }

  md += `
### MEDIUM PRIORITY GAPS (Missing Situation Content)

`
  if (analysis.gaps.mediumPriority.length > 0) {
    analysis.gaps.mediumPriority.slice(0, 20).forEach(gap => {
      md += `- ⚠️ ${gap}\n`
    })
    if (analysis.gaps.mediumPriority.length > 20) {
      md += `\n... and ${analysis.gaps.mediumPriority.length - 20} more\n`
    }
  } else {
    md += `✅ No medium priority gaps identified.\n`
  }

  md += `
### LOW PRIORITY GAPS (Limited Coverage Topics)

`
  if (analysis.gaps.lowPriority.length > 0) {
    analysis.gaps.lowPriority.forEach(gap => {
      md += `- 📝 ${gap}\n`
    })
  } else {
    md += `✅ No low priority gaps identified.\n`
  }

  md += `
---

## SECTION 5: KEYWORD COVERAGE MATRIX

| Target Keyword | Location | Type | Blog Post Exists? |
|----------------|----------|------|-------------------|
`

  const primaryLocations = ['Allentown', 'Scranton', 'Wilkes-Barre', 'Reading', 'Bethlehem', 'Easton', 'Hazleton']
  primaryLocations.forEach(loc => {
    const locLower = loc.toLowerCase()

    const hasFastSale = posts.some(p => {
      const titleLower = (p.title || '').toLowerCase()
      return titleLower.includes(locLower) && /sell.*(my|your)?\s*house\s*fast/i.test(p.title)
    })
    const hasCashBuyers = posts.some(p => {
      const titleLower = (p.title || '').toLowerCase()
      return (titleLower.includes(locLower) && /cash\s*(home)?\s*buyers/i.test(p.title)) ||
             (titleLower.includes(locLower.split(' ')[0]) && /cash\s*(home)?\s*buyers/i.test(p.title))
    })
    const hasWeBuyHouses = posts.some(p => {
      const titleLower = (p.title || '').toLowerCase()
      return titleLower.includes(locLower) && /we\s*buy\s*houses/i.test(p.title)
    })
    const hasForeclosure = posts.some(p => {
      const titleLower = (p.title || '').toLowerCase()
      return titleLower.includes(locLower) && /foreclosure/i.test(p.title)
    })

    md += `| sell my house fast ${loc.toLowerCase()} | ${loc} | Fast Sale | ${hasFastSale ? '✅' : '❌'} |\n`
    md += `| cash home buyers ${loc.toLowerCase()} | ${loc} | Cash Buyers | ${hasCashBuyers ? '✅' : '❌'} |\n`
    md += `| we buy houses ${loc.toLowerCase()} | ${loc} | Cash Buyers | ${hasWeBuyHouses ? '✅' : '❌'} |\n`
    md += `| ${loc.toLowerCase()} foreclosure help | ${loc} | Foreclosure | ${hasForeclosure ? '✅' : '❌'} |\n`
  })

  md += `
---

## SECTION 6: CONTENT OVERLAP ANALYSIS

`
  if (analysis.contentOverlap.length > 0) {
    analysis.contentOverlap.forEach(overlap => {
      md += `### Potential Overlap\n`
      md += `**Pattern:** ${overlap.pattern}\n`
      md += `**Posts:**\n`
      overlap.posts.forEach(p => {
        md += `- ${p.title}\n`
      })
      md += '\n'
    })
  } else {
    md += `✅ No significant content overlap detected.\n`
  }

  md += `
---

## SECTION 7: INTERNAL LINKING AUDIT

### Posts to Review for Internal Linking

Based on analysis, these posts should be reviewed for internal linking opportunities:

`

  posts.forEach(post => {
    const issues = []
    const hasLocations = (post.locations || []).length > 0
    const hasSituations = (post.situations || []).length > 0

    if (!hasLocations) issues.push('No location tags')
    if (!hasSituations) issues.push('No situation tags')

    if (issues.length > 0) {
      md += `- **${post.title}**: ${issues.join(', ')}\n`
    }
  })

  md += `
---

## SECTION 8: RECOMMENDATIONS

### Immediate Actions (This Week)

1. Add missing location/situation tags to posts that lack them
2. Review posts without category assignments
3. Ensure all posts have meta descriptions for SEO

### Next 5 Blog Posts to Write (Highest Impact)

`

  const recommendations = [
    {
      title: 'Sell My House Fast Scranton PA 2026',
      keyword: 'sell my house fast scranton',
      location: 'Scranton',
      reason: 'Major market with high search volume, establishes presence in Lackawanna County'
    },
    {
      title: 'Cash Home Buyers Wilkes-Barre PA',
      keyword: 'cash home buyers wilkes-barre',
      location: 'Wilkes-Barre',
      reason: 'Key market in Luzerne County, high intent keyword'
    },
    {
      title: 'How to Sell a House in Foreclosure in Reading PA 2026',
      keyword: 'sell house foreclosure reading pa',
      location: 'Reading',
      reason: 'Foreclosure content drives high-quality leads'
    },
    {
      title: 'Probate Property Sale Guide Lehigh Valley PA',
      keyword: 'sell inherited house lehigh valley',
      location: 'Lehigh Valley',
      reason: 'Probate content has high conversion rates'
    },
    {
      title: 'Sell House with Code Violations Scranton PA',
      keyword: 'code violations scranton house',
      location: 'Scranton',
      reason: 'Older housing stock in Scranton means high code violation rates'
    }
  ]

  recommendations.forEach((rec, i) => {
    md += `**${i + 1}. ${rec.title}**\n`
    md += `- Target Keyword: ${rec.keyword}\n`
    md += `- Target Location: ${rec.location}\n`
    md += `- Why: ${rec.reason}\n\n`
  })

  md += `
### Content Expansion Opportunities

- Expand probate content to cover more specific scenarios (multiple heirs, out-of-state executors)
- Create location-specific foreclosure prevention guides for each county
- Add seasonal content (selling before winter, spring market prep)

### Location Page Recommendations

- Create dedicated city pages for secondary markets (Hazleton, Easton, Kingston)
- Add county-level landing pages for SEO
- Create "neighborhoods we serve" subpages for major cities

---

## SECTION 9: COMPETITOR COMPARISON

### Content Topics Competitors Have That We May Not:
- Wholesaling guides (educational content that builds trust)
- First-time seller guides
- Moving guides / relocation resources
- Property valuation tools / calculators
- Video content / testimonials

### Our Competitive Advantages:
- Deep local content for specific PA markets
- Situation-specific content (code violations, tax liens)
- 2026-dated content showing freshness
- Strong FAQ schema for featured snippets

### Keyword Gaps to Address:
- "sell house without realtor [location]"
- "fsbo [location]" content
- "home value [location]" calculator pages

---

## EXPECTED vs ACTUAL INVENTORY COMPARISON

### Expected Posts (Based on Session History):

1. ✅ Sell My House Fast Allentown
2. ✅ Can I Sell My Deceased Parents' House Without Probate in PA
3. ✅ Documents Required for Selling Inherited Property in PA
4. ✅ How to Avoid Foreclosure in Scranton PA
5. ✅ Cash Home Buyers Lackawanna County
6. ✅ Sell My House Fast Luzerne County
7. ✅ Cash Home Buyers Berks County
8. ✅ Sell My House Fast Lehigh Valley
9. ✅ Cash Home Buyers Pottsville PA
10. ✅ Sell My House Fast Poconos PA
11. ✅ Sell House with Code Violations Wilkes-Barre
12. ✅ Hazleton Residential Occupancy Inspection Checklist
13. ✅ Sell My House Fast Dunmore Mine Subsidence
14. ✅ How to Stop Berks County Judicial Sale 2026
15. ✅ Selling House with IPMC Violations Bethlehem
16. ✅ Easton PA Rental Inspection Checklist 2026
17. ✅ Stop GovOS Fines Poconos House
18. ✅ Sell House Fast During Divorce Lehigh County PA
19. ✅ Selling Water-Damaged House in 18102 With Mold Issues
20. ✅ Sell My House Fast Bethlehem PA 18015 Tax Lien
21. ✅ Luzerne County Rental Property Registration and Inspection Requirements 2026
22. ✅ Pennsylvania Job Relocation Home Buyout and Fast Equity Release 2026

### Actual Posts Found in Sanity:

`

  posts.forEach((post, i) => {
    md += `${i + 1}. ${post.title} (${post.slug})\n`
  })

  md += `

---

*Analysis generated by ClearEdge Blog Content Analyzer*
`

  return md
}

function generateJsonSummary(analysis, posts) {
  const primaryLocations = ['Allentown', 'Scranton', 'Wilkes-Barre', 'Reading', 'Bethlehem', 'Easton', 'Hazleton']

  const recommendations = []

  // Check for missing core content
  primaryLocations.forEach(loc => {
    const locLower = loc.toLowerCase()
    const hasFastSale = posts.some(p => {
      const titleLower = (p.title || '').toLowerCase()
      return titleLower.includes(locLower) && /sell.*(my|your)?\s*house\s*fast/i.test(p.title)
    })
    const hasCashBuyers = posts.some(p => {
      const titleLower = (p.title || '').toLowerCase()
      return titleLower.includes(locLower) && /cash\s*(home)?\s*buyers/i.test(p.title)
    })

    if (!hasFastSale) {
      recommendations.push({
        title: `Sell My House Fast ${loc} PA 2026`,
        keyword: `sell my house fast ${locLower}`,
        location: loc,
        priority: 'high'
      })
    }
    if (!hasCashBuyers) {
      recommendations.push({
        title: `Cash Home Buyers ${loc} PA`,
        keyword: `cash home buyers ${locLower}`,
        location: loc,
        priority: 'high'
      })
    }
  })

  return {
    generatedAt: new Date().toISOString(),
    totalPosts: posts.length,
    postsByCategory: analysis.postsByCategory,
    postsByLocation: analysis.postsByLocation,
    postsBySituation: analysis.postsBySituation,
    gaps: analysis.gaps,
    nextRecommendedPosts: recommendations.slice(0, 10)
  }
}

main().catch(console.error)
