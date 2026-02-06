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

// Link configuration for each blog post (using ACTUAL slugs from Sanity)
// Maps slug -> array of { anchorText, href, openInNewTab }
const blogPostLinks = {
  // 1. Probate Blog Post
  'sell-deceased-parents-house-without-probate-pennsylvania': [
    { anchorText: 'Pennsylvania Department of State', href: 'https://www.dos.pa.gov/OtherServices/Wills-Estates/Pages/default.aspx', openInNewTab: true },
    { anchorText: 'Register of Wills', href: 'https://www.pacourts.us/learn/representing-yourself/wills-and-estates', openInNewTab: true },
  ],

  // 2. Foreclosure Blog Post
  'avoid-foreclosure-scranton-pa': [
    { anchorText: 'CFPB', href: 'https://www.consumerfinance.gov/housing/housing-insecurity/help-for-homeowners/avoid-foreclosure/', openInNewTab: true },
    { anchorText: 'Consumer Financial Protection Bureau', href: 'https://www.consumerfinance.gov/housing/housing-insecurity/help-for-homeowners/avoid-foreclosure/', openInNewTab: true },
  ],

  // 3. Luzerne County Blog Post
  'sell-my-house-fast-luzerne-county-pa': [
    { anchorText: 'Luzerne County Tax Claim Bureau', href: 'https://www.luzernecounty.org/286/Tax-Claim-Bureau', openInNewTab: true },
  ],

  // 4. Lackawanna Cash Buyers Blog Post
  'cash-home-buyers-lackawanna-county-no-fees': [
    { anchorText: 'PA Attorney General', href: 'https://www.attorneygeneral.gov/protect-yourself/consumer-alerts/', openInNewTab: true },
    { anchorText: 'Better Business Bureau', href: 'https://www.bbb.org/', openInNewTab: true },
    { anchorText: 'BBB', href: 'https://www.bbb.org/', openInNewTab: true },
  ],

  // 5. Documents Required Blog Post
  'documents-required-selling-inherited-property-pennsylvania': [
    { anchorText: 'PA Inheritance Tax', href: 'https://www.revenue.pa.gov/Tax%20Informational/Inheritance%20Tax/Pages/default.aspx', openInNewTab: true },
  ],

  // 6. Berks County Blog Post (CORRECTED SLUG)
  'cash-home-buyers-berks-county': [
    { anchorText: 'Berks County', href: 'https://www.co.berks.pa.us/', openInNewTab: true },
    { anchorText: 'Reading', href: 'https://www.readingpa.gov/', openInNewTab: true },
    { anchorText: 'Berks County Assessment', href: 'https://www.co.berks.pa.us/Dept/Assessment/Pages/default.aspx', openInNewTab: true },
  ],

  // 7. Lehigh Valley Blog Post (CORRECTED SLUG)
  'sell-my-house-fast-lehigh-valley': [
    { anchorText: 'Lehigh County', href: 'https://www.lehighcounty.org/', openInNewTab: true },
    { anchorText: 'Northampton County', href: 'https://www.northamptoncounty.org/', openInNewTab: true },
    { anchorText: 'City of Allentown', href: 'https://www.allentownpa.gov/', openInNewTab: true },
  ],

  // 8. Pottsville Blog Post (CORRECTED SLUG)
  'cash-home-buyers-pottsville-pa': [
    { anchorText: 'Schuylkill County', href: 'https://www.co.schuylkill.pa.us/', openInNewTab: true },
    { anchorText: 'Pottsville', href: 'https://www.city.pottsville.pa.us/', openInNewTab: true },
  ],

  // 9. Poconos Blog Post
  'sell-my-house-fast-poconos-pa': [
    { anchorText: 'Pocono Mountains Visitors Bureau', href: 'https://www.poconomountains.com/', openInNewTab: true },
  ],

  // 10. Allentown Blog Post
  'sell-my-house-fast-allentown': [
    { anchorText: 'Allentown', href: 'https://www.allentownpa.gov/', openInNewTab: true },
    { anchorText: 'City of Allentown', href: 'https://www.allentownpa.gov/', openInNewTab: true },
    { anchorText: 'rental licensing', href: 'https://www.allentownpa.gov/Departments/Community-Economic-Development/Housing-Division', openInNewTab: true },
  ],

  // 11. Wilkes-Barre Violations Blog Post (CORRECTED SLUG)
  'sell-house-wilkes-barre-code-violations': [
    { anchorText: 'Wilkes-Barre', href: 'https://www.wilkes-barre.city/', openInNewTab: true },
    { anchorText: 'code enforcement', href: 'https://www.wilkes-barre.city/codes', openInNewTab: true },
    { anchorText: 'Property Maintenance Code', href: 'https://codes.iccsafe.org/content/IPMC2021P1', openInNewTab: true },
    { anchorText: 'IPMC', href: 'https://codes.iccsafe.org/content/IPMC2021P1', openInNewTab: true },
  ],

  // 12. Hazleton Inspection Blog Post (CORRECTED SLUG)
  'hazleton-residential-occupancy-inspection-checklist': [
    { anchorText: 'Hazleton', href: 'https://www.hazletoncity.org/', openInNewTab: true },
    { anchorText: 'GovOS', href: 'https://www.govos.com/', openInNewTab: true },
    { anchorText: 'IPMC', href: 'https://codes.iccsafe.org/content/IPMC2021P1', openInNewTab: true },
  ],

  // 13. Bethlehem IPMC Blog Post (CORRECTED SLUG)
  'selling-house-international-property-maintenance-code-violations-bethlehem': [
    { anchorText: 'Bethlehem', href: 'https://www.bethlehem-pa.gov/', openInNewTab: true },
    { anchorText: 'City of Bethlehem', href: 'https://www.bethlehem-pa.gov/', openInNewTab: true },
    { anchorText: 'IPMC', href: 'https://codes.iccsafe.org/content/IPMC2021P1', openInNewTab: true },
    { anchorText: 'International Property Maintenance Code', href: 'https://codes.iccsafe.org/content/IPMC2021P1', openInNewTab: true },
  ],

  // 14. Lehigh Divorce Blog Post (CORRECTED SLUG)
  'sell-house-fast-during-divorce-lehigh-county-pa': [
    { anchorText: 'Lehigh County', href: 'https://www.lehighcounty.org/', openInNewTab: true },
    { anchorText: 'Northampton County', href: 'https://www.northamptoncounty.org/', openInNewTab: true },
    { anchorText: 'divorce', href: 'https://www.pacourts.us/learn/representing-yourself/divorce', openInNewTab: true },
  ],

  // 15. Reading Hoarder Blog Post (CORRECTED SLUG)
  'sell-hoarder-house-reading-pa-without-cleanout': [
    { anchorText: 'Reading', href: 'https://www.readingpa.gov/', openInNewTab: true },
    { anchorText: 'hoarding', href: 'https://www.nimh.nih.gov/health/publications/obsessive-compulsive-disorder-when-unwanted-thoughts-or-repetitive-behaviors-take-over', openInNewTab: true },
  ],

  // 16. Bethlehem Tax Lien Blog Post (CORRECTED SLUG)
  'sell-my-house-fast-bethlehem-pa-18015-tax-lien': [
    { anchorText: 'Northampton County', href: 'https://www.northamptoncounty.org/', openInNewTab: true },
    { anchorText: 'tax sale', href: 'https://www.northamptoncounty.org/FISCAL/Pages/Tax-Claim-Bureau.aspx', openInNewTab: true },
    { anchorText: 'judicial sale', href: 'https://www.northamptoncounty.org/FISCAL/Pages/Tax-Claim-Bureau.aspx', openInNewTab: true },
  ],

  // 17. Allentown Water Damage Blog Post (CORRECTED SLUG)
  'selling-water-damaged-house-18102-mold-issues': [
    { anchorText: 'Allentown', href: 'https://www.allentownpa.gov/', openInNewTab: true },
    { anchorText: 'EPA', href: 'https://www.epa.gov/mold', openInNewTab: true },
    { anchorText: 'mold', href: 'https://www.epa.gov/mold', openInNewTab: true },
  ],

  // 18. Scranton Disclosure Law Blog Post (CORRECTED SLUG)
  'scranton-pa-major-structural-damage-disclosure-law-2026': [
    { anchorText: 'Pennsylvania', href: 'https://www.legis.state.pa.us/cfdocs/legis/li/uconsCheck.cfm?yr=1996&sessInd=0&act=104', openInNewTab: true },
    { anchorText: 'seller disclosure', href: 'https://www.pcar.com/seller-disclosure', openInNewTab: true },
    { anchorText: 'Scranton', href: 'https://www.scrantonpa.gov/', openInNewTab: true },
  ],

  // 19. Luzerne Rental Registration Blog Post (CORRECTED SLUG)
  'luzerne-county-rental-property-registration-inspection-requirements-2026': [
    { anchorText: 'Luzerne County', href: 'https://www.luzernecounty.org/', openInNewTab: true },
    { anchorText: 'Wilkes-Barre', href: 'https://www.wilkes-barre.city/', openInNewTab: true },
    { anchorText: 'rental registration', href: 'https://www.wilkes-barre.city/codes/rental-licensing-program', openInNewTab: true },
  ],

  // 20. Act 135 Conservatorship Blog Post (CORRECTED SLUG)
  'pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights': [
    { anchorText: 'Act 135', href: 'https://www.legis.state.pa.us/cfdocs/legis/li/uconsCheck.cfm?yr=2008&sessInd=0&act=135', openInNewTab: true },
    { anchorText: 'conservatorship', href: 'https://www.phfa.org/programs/act135.aspx', openInNewTab: true },
    { anchorText: 'PHFA', href: 'https://www.phfa.org/', openInNewTab: true },
  ],

  // 21. Job Relocation Buyout Blog Post (CORRECTED SLUG)
  'pennsylvania-job-relocation-home-buyout-fast-equity-release-2026': [
    { anchorText: 'capital gains', href: 'https://www.irs.gov/taxtopics/tc701', openInNewTab: true },
    { anchorText: 'IRS', href: 'https://www.irs.gov/taxtopics/tc701', openInNewTab: true },
    { anchorText: 'Section 121', href: 'https://www.irs.gov/taxtopics/tc701', openInNewTab: true },
  ],

  // 22. Berks Judicial Sale Blog Post (CORRECTED SLUG)
  'how-to-stop-berks-county-judicial-sale-2026': [
    { anchorText: 'Berks County', href: 'https://www.co.berks.pa.us/', openInNewTab: true },
    { anchorText: 'Tax Claim Bureau', href: 'https://www.co.berks.pa.us/Dept/TaxClaim/Pages/default.aspx', openInNewTab: true },
    { anchorText: 'judicial sale', href: 'https://www.co.berks.pa.us/Dept/TaxClaim/Pages/default.aspx', openInNewTab: true },
  ],

  // 23. Dunmore Mine Subsidence Blog Post (CORRECTED SLUG)
  'sell-my-house-fast-dunmore-mine-subsidence': [
    { anchorText: 'DEP', href: 'https://www.dep.pa.gov/Business/Land/Mining/Pages/default.aspx', openInNewTab: true },
    { anchorText: 'Pennsylvania DEP', href: 'https://www.dep.pa.gov/Business/Land/Mining/Pages/default.aspx', openInNewTab: true },
    { anchorText: 'anthracite', href: 'https://www.dep.pa.gov/Business/Land/Mining/Pages/default.aspx', openInNewTab: true },
    { anchorText: 'mine subsidence', href: 'https://www.pcrp.state.pa.us/', openInNewTab: true },
  ],

  // 24. GovOS Fines Poconos Blog Post (covers STR/landlord topics)
  'stop-govos-fines-poconos-house': [
    { anchorText: 'GovOS', href: 'https://www.govos.com/', openInNewTab: true },
    { anchorText: 'Monroe County', href: 'https://www.monroecountypa.gov/', openInNewTab: true },
    { anchorText: 'Pike County', href: 'https://www.pikepa.org/', openInNewTab: true },
  ],

  // 25. Easton Rental Inspection Blog Post
  'easton-pa-rental-inspection-checklist-2026': [
    { anchorText: 'Easton', href: 'https://www.easton-pa.com/', openInNewTab: true },
    { anchorText: 'City of Easton', href: 'https://www.easton-pa.com/', openInNewTab: true },
    { anchorText: 'Northampton County', href: 'https://www.northamptoncounty.org/', openInNewTab: true },
    { anchorText: 'IPMC', href: 'https://codes.iccsafe.org/content/IPMC2021P1', openInNewTab: true },
  ],
}

// Process a single block to add links to anchor text
function processBlock(block, linksToAdd) {
  if (block._type !== 'block' || !block.children) {
    return { block, added: [] }
  }

  const added = []
  const newChildren = []
  const newMarkDefs = [...(block.markDefs || [])]

  for (const child of block.children) {
    if (child._type !== 'span') {
      newChildren.push(child)
      continue
    }

    let text = child.text
    let currentMarks = [...(child.marks || [])]
    let segments = [{ text, marks: currentMarks }]

    // Check each link to add
    for (const linkConfig of linksToAdd) {
      const newSegments = []

      for (const segment of segments) {
        const idx = segment.text.toLowerCase().indexOf(linkConfig.anchorText.toLowerCase())

        if (idx === -1) {
          newSegments.push(segment)
          continue
        }

        // Check if this text already has a link mark
        const hasLinkMark = segment.marks.some(mark =>
          newMarkDefs.find(md => md._key === mark && md._type === 'link')
        )

        if (hasLinkMark) {
          newSegments.push(segment)
          continue
        }

        // Split the text into before, anchor, and after
        const before = segment.text.substring(0, idx)
        const anchor = segment.text.substring(idx, idx + linkConfig.anchorText.length)
        const after = segment.text.substring(idx + linkConfig.anchorText.length)

        // Create new link mark definition
        const linkKey = uniqueKey('authlink')
        newMarkDefs.push({
          _type: 'link',
          _key: linkKey,
          href: linkConfig.href,
          openInNewTab: linkConfig.openInNewTab,
        })

        if (before) {
          newSegments.push({ text: before, marks: segment.marks })
        }
        newSegments.push({ text: anchor, marks: [...segment.marks, linkKey] })
        if (after) {
          newSegments.push({ text: after, marks: segment.marks })
        }

        added.push({ anchorText: anchor, href: linkConfig.href })
      }

      segments = newSegments
    }

    // Convert segments back to children
    for (const seg of segments) {
      newChildren.push({
        _type: 'span',
        _key: uniqueKey('span'),
        text: seg.text,
        marks: seg.marks,
      })
    }
  }

  return {
    block: {
      ...block,
      children: newChildren,
      markDefs: newMarkDefs,
    },
    added,
  }
}

// Check if a link already exists in the content
function linkExistsInContent(content, href) {
  const contentStr = JSON.stringify(content)
  return contentStr.includes(href)
}

// Process a blog post
async function processBlogPost(slug, linksToAdd) {
  console.log(`\n📝 Processing: ${slug}`)

  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{ _id, title, content }`,
    { slug }
  )

  if (!post) {
    console.log(`  ⚠️ Post not found: ${slug}`)
    return { added: 0, skipped: 0 }
  }

  // Filter out links that already exist
  const linksToProcess = linksToAdd.filter(link => {
    if (linkExistsInContent(post.content, link.href)) {
      console.log(`  ⏭️ Link already exists: ${link.anchorText} → ${link.href}`)
      return false
    }
    return true
  })

  if (linksToProcess.length === 0) {
    console.log(`  ✅ All links already present`)
    return { added: 0, skipped: linksToAdd.length }
  }

  // Process each block in the content
  const newContent = []
  let totalAdded = []

  for (const block of post.content || []) {
    const { block: processedBlock, added } = processBlock(block, linksToProcess)
    newContent.push(processedBlock)
    totalAdded.push(...added)
  }

  if (totalAdded.length === 0) {
    console.log(`  ⚠️ No anchor text found for any links`)
    return { added: 0, skipped: 0 }
  }

  // Update the post
  await client
    .patch(post._id)
    .set({ content: newContent })
    .commit()

  for (const link of totalAdded) {
    console.log(`  ✅ Added: "${link.anchorText}" → ${link.href}`)
  }

  return { added: totalAdded.length, skipped: linksToAdd.length - linksToProcess.length }
}

async function main() {
  console.log('='.repeat(70))
  console.log('PHASE 7 TASK #38: Adding Authoritative Source Links to Blog Posts')
  console.log('='.repeat(70))

  let totalAdded = 0
  let totalSkipped = 0
  let totalPosts = 0

  for (const [slug, links] of Object.entries(blogPostLinks)) {
    const result = await processBlogPost(slug, links)
    totalAdded += result.added
    totalSkipped += result.skipped
    totalPosts++

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300))
  }

  console.log('\n' + '='.repeat(70))
  console.log('SUMMARY')
  console.log('='.repeat(70))
  console.log(`Posts processed: ${totalPosts}`)
  console.log(`Links added: ${totalAdded}`)
  console.log(`Links skipped (already exist): ${totalSkipped}`)
  console.log('='.repeat(70))
}

main().catch(console.error)
