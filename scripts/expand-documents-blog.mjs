/**
 * Expand "Documents Required for Selling Inherited Property in Pennsylvania"
 *
 * Changes:
 * 1. Add /about link to "ClearEdge Home Buyers" in intro (block 4)
 * 2. Add /about link to "ClearEdge Home Buyers" in cash buyer section (block 110)
 * 3. Add /contact and /how-it-works links to Bottom Line CTA (block 124)
 * 4. Insert county-by-county section after block 101
 * 5. Replace Related Reading section (blocks 127-131 after insertion shift)
 * 6. Update dateModified
 *
 * Run: node scripts/expand-documents-blog.mjs
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const SLUG = 'documents-required-selling-inherited-property-pennsylvania'

function k() { return Math.random().toString(36).slice(2, 10) }
function span(text, marks = []) {
  return { _type: 'span', _key: k(), text, marks }
}

function buildCountySection() {
  const blocks = []

  // Main heading
  blocks.push({
    _type: 'block', _key: k(), style: 'h2', markDefs: [],
    children: [span('Where to File: County-by-County Guide for Eastern PA')],
  })

  blocks.push({
    _type: 'block', _key: k(), style: 'normal', markDefs: [],
    children: [span("Every county in Pennsylvania handles probate through its own Register of Wills office, and each one has its own quirks — different hours, different filing requirements, different levels of helpfulness. Here's exactly where to go and who to call in the counties we serve.")],
  })

  // --- LEHIGH COUNTY ---
  blocks.push({
    _type: 'block', _key: k(), style: 'h3', markDefs: [],
    children: [span('Lehigh County (Allentown, Emmaus, Whitehall)')],
  })

  const lc1 = k()
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Office:', ['strong']), span(' Register of Wills, Lehigh County Courthouse, Room 122')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Address:', ['strong']), span(' 455 West Hamilton Street, Allentown, PA 18101-1614')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Phone:', ['strong']), span(' (610) 782-3170 (Register of Wills direct) | (610) 782-3000 (courthouse main)')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Hours:', ['strong']), span(' Monday–Friday, 8:30 AM – 4:30 PM')],
  })

  const lcWebLink = k()
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: lcWebLink, href: 'https://www.lehighcounty.org/departments/clerk-of-judicial-records/register-of-wills' }],
    children: [span('Website:', ['strong']), span(' '), span('lehighcounty.org — Register of Wills', [lcWebLink])],
  })

  const lcFormsLink = k()
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: lcFormsLink, href: 'http://www.lccpa.org/forms/regofwills/general.nex' }],
    children: [span('Forms:', ['strong']), span(' '), span('Probate forms available online', [lcFormsLink]), span(' — download and fill out before your visit to save time')],
  })

  const lcFeeLink = k()
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: lcFeeLink, href: 'https://www.lehighcounty.org/Portals/0/PDF/Judicial/Wills/Wills%20Fee%20Schedule%202026.pdf' }],
    children: [span('Fee schedule:', ['strong']), span(' '), span('2026 fee schedule available as PDF', [lcFeeLink]), span(' on the county website')],
  })

  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Note:', ['strong']), span(' Staff cannot offer legal advice or help you fill out forms — they\'ll direct you to hire an attorney. Come prepared.')],
  })

  const lcAllentown = k(), lcLV = k(), lcBlog = k()
  blocks.push({
    _type: 'block', _key: k(), style: 'normal',
    markDefs: [
      { _type: 'link', _key: lcAllentown, href: '/locations/allentown' },
      { _type: 'link', _key: lcLV, href: '/locations/lehigh-valley' },
      { _type: 'link', _key: lcBlog, href: '/blog/sell-inherited-house-allentown-pa' },
    ],
    children: [
      span("If you're selling an inherited property in "),
      span('Allentown', [lcAllentown]),
      span(' or anywhere in the '),
      span('Lehigh Valley', [lcLV]),
      span(', this is where probate starts. We cover the full process in our '),
      span('guide to selling an inherited house in Allentown', [lcBlog]),
      span('.'),
    ],
  })

  // --- NORTHAMPTON COUNTY ---
  blocks.push({
    _type: 'block', _key: k(), style: 'h3', markDefs: [],
    children: [span('Northampton County (Bethlehem, Easton, Nazareth)')],
  })

  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Office:', ['strong']), span(" Register of Wills and Orphans' Court")],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Address:', ['strong']), span(' 669 Washington Street, Easton, PA 18042')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Phone:', ['strong']), span(' (610) 829-6492 (Register of Wills) | (610) 829-6488 (general)')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Hours:', ['strong']), span(' Monday–Friday, 8:30 AM – 4:30 PM')],
  })

  const ncWebLink = k()
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: ncWebLink, href: 'https://www.northamptoncounty.org/register-of-wills-and-orphans-court' }],
    children: [span('Website:', ['strong']), span(' '), span("northamptoncounty.org — Register of Wills", [ncWebLink])],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Note:', ['strong']), span(" This office also handles Orphans' Court matters, so if you need court approval for a sale (e.g., disputes among heirs), it's the same building. Northampton County maintains estate records dating back to 1752.")],
  })

  const ncBeth = k(), ncEast = k()
  blocks.push({
    _type: 'block', _key: k(), style: 'normal',
    markDefs: [
      { _type: 'link', _key: ncBeth, href: '/locations/bethlehem' },
      { _type: 'link', _key: ncEast, href: '/locations/easton' },
    ],
    children: [
      span('Selling an inherited property in '),
      span('Bethlehem', [ncBeth]),
      span(' or '),
      span('Easton', [ncEast]),
      span('? The probate process starts here.'),
    ],
  })

  // --- LACKAWANNA COUNTY ---
  blocks.push({
    _type: 'block', _key: k(), style: 'h3', markDefs: [],
    children: [span('Lackawanna County (Scranton, Dunmore, Carbondale)')],
  })

  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Office:', ['strong']), span(" Register of Wills / Clerk of Orphans' Court")],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Address:', ['strong']), span(' Lackawanna County Government Center, 123 Wyoming Avenue, Suite 521 (5th Floor), Scranton, PA 18503')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Phone:', ['strong']), span(' (570) 963-6702')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Fax:', ['strong']), span(' (570) 963-6377')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Hours:', ['strong']), span(' Monday–Friday, 8:30 AM – 4:30 PM')],
  })

  const lacWebLink = k()
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: lacWebLink, href: 'https://www.lackawannacounty.org/government/elected_officials/register_of_wills/index.php' }],
    children: [span('Website:', ['strong']), span(' '), span('lackawannacounty.org — Register of Wills', [lacWebLink])],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Note:', ['strong']), span(" The Government Center is on Wyoming Avenue in downtown Scranton. Parking is available in the adjacent garage. The office handles both probate filings and Orphans' Court matters.")],
  })

  const lacScr = k(), lacDun = k(), lacCarb = k()
  blocks.push({
    _type: 'block', _key: k(), style: 'normal',
    markDefs: [
      { _type: 'link', _key: lacScr, href: '/locations/scranton' },
      { _type: 'link', _key: lacDun, href: '/locations/dunmore' },
      { _type: 'link', _key: lacCarb, href: '/locations/carbondale' },
    ],
    children: [
      span('Inherited a property in '),
      span('Scranton', [lacScr]),
      span(', '),
      span('Dunmore', [lacDun]),
      span(', or '),
      span('Carbondale', [lacCarb]),
      span('? ClearEdge buys inherited homes throughout Lackawanna County.'),
    ],
  })

  // --- LUZERNE COUNTY ---
  blocks.push({
    _type: 'block', _key: k(), style: 'h3', markDefs: [],
    children: [span('Luzerne County (Wilkes-Barre, Hazleton, Kingston, Nanticoke, Pittston)')],
  })

  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Office:', ['strong']), span(" Register of Wills / Clerk of Orphans' Court")],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Physical Address:', ['strong']), span(' 153 North River Street, Wilkes-Barre, PA 18711')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Mailing Address:', ['strong']), span(' 200 North River Street, Wilkes-Barre, PA 18711')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Phone:', ['strong']), span(' (570) 825-1668')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Fax:', ['strong']), span(' (570) 970-4580')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Hours:', ['strong']), span(' Monday–Friday, 9:00 AM – 4:30 PM (filing deadline: 4:20 PM)')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Hazleton Satellite Office:', ['strong']), span(' Open Tuesday and Thursday, 10:00 AM – 3:00 PM')],
  })

  const luzWebLink = k()
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: luzWebLink, href: 'https://www.luzernecounty.org/614/Register-of-Wills' }],
    children: [span('Website:', ['strong']), span(' '), span('luzernecounty.org — Register of Wills', [luzWebLink])],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Note:', ['strong']), span(" Luzerne County is one of the few in PA with a satellite office. If you're in the Hazleton area, you can handle probate filings on Tuesdays and Thursdays without driving to Wilkes-Barre. The physical and mailing addresses are different — use 200 N River Street for anything sent by mail. Filing deadline is 4:20 PM, not 4:30.")],
  })

  const luzWB = k(), luzHaz = k(), luzKing = k(), luzNan = k(), luzPitt = k()
  blocks.push({
    _type: 'block', _key: k(), style: 'normal',
    markDefs: [
      { _type: 'link', _key: luzWB, href: '/locations/wilkes-barre' },
      { _type: 'link', _key: luzHaz, href: '/locations/hazleton' },
      { _type: 'link', _key: luzKing, href: '/locations/kingston' },
      { _type: 'link', _key: luzNan, href: '/locations/nanticoke' },
      { _type: 'link', _key: luzPitt, href: '/locations/pittston' },
    ],
    children: [
      span('Selling an inherited property in '),
      span('Wilkes-Barre', [luzWB]),
      span(', '),
      span('Hazleton', [luzHaz]),
      span(', '),
      span('Kingston', [luzKing]),
      span(', '),
      span('Nanticoke', [luzNan]),
      span(', or '),
      span('Pittston', [luzPitt]),
      span('? We buy throughout Luzerne County.'),
    ],
  })

  // --- MONROE COUNTY ---
  blocks.push({
    _type: 'block', _key: k(), style: 'h3', markDefs: [],
    children: [span('Monroe County (Stroudsburg, East Stroudsburg, Tannersville, Pocono Pines)')],
  })

  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Office:', ['strong']), span(' Register of Wills')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Address:', ['strong']), span(' Monroe County Courthouse, One Quaker Plaza, Room 106, Stroudsburg, PA 18360')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Phone:', ['strong']), span(' (570) 517-3347')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Fax:', ['strong']), span(' (570) 517-3873')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Hours:', ['strong']), span(' Monday–Friday, 8:30 AM – 4:30 PM')],
  })

  const monWebLink = k()
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: monWebLink, href: 'https://www.monroecountypa.gov/departments/register-of-wills' }],
    children: [span('Website:', ['strong']), span(' '), span('monroecountypa.gov — Register of Wills', [monWebLink])],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [span('Note:', ['strong']), span(" Monroe County handles a high volume of inherited property cases from out-of-state owners — many Poconos properties are vacation homes or rentals owned by NYC/NJ residents. If you inherited a Poconos property and live out of state, this office is your starting point.")],
  })

  const monStr = k(), monES = k(), monTan = k(), monPP = k(), monPoc = k(), monNEPA = k()
  blocks.push({
    _type: 'block', _key: k(), style: 'normal',
    markDefs: [
      { _type: 'link', _key: monStr, href: '/locations/stroudsburg' },
      { _type: 'link', _key: monES, href: '/locations/east-stroudsburg' },
      { _type: 'link', _key: monTan, href: '/locations/tannersville' },
      { _type: 'link', _key: monPP, href: '/locations/pocono-pines' },
      { _type: 'link', _key: monPoc, href: '/locations/poconos' },
      { _type: 'link', _key: monNEPA, href: '/locations/nepa' },
    ],
    children: [
      span('Inherited a property in '),
      span('Stroudsburg', [monStr]),
      span(', '),
      span('East Stroudsburg', [monES]),
      span(', '),
      span('Tannersville', [monTan]),
      span(', or '),
      span('Pocono Pines', [monPP]),
      span('? ClearEdge buys inherited homes throughout the '),
      span('Poconos', [monPoc]),
      span(' and '),
      span('NEPA', [monNEPA]),
      span('.'),
    ],
  })

  return blocks
}

function buildRelatedReading() {
  const blocks = []

  blocks.push({
    _type: 'block', _key: k(), style: 'h2', markDefs: [],
    children: [span('Related Reading')],
  })

  const rl1 = k(), rl2 = k(), rl3 = k(), rl4 = k(), rl5 = k()

  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: rl1, href: '/blog/sell-inherited-house-allentown-pa' }],
    children: [span('How to Sell an Inherited House in Allentown, PA (2026 Guide)', [rl1]), span(' — Full walkthrough of Lehigh County probate, PA inheritance tax rates, and your selling options.')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: rl2, href: '/blog/sell-deceased-parents-house-without-probate-pennsylvania' }],
    children: [span("Can You Sell a Deceased Parent's House Without Probate in PA?", [rl2]), span(" — When probate isn't required and how to sell faster.")],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: rl3, href: '/situations/inherited-property' }],
    children: [span('Inherited Property — Your Options', [rl3]), span(' — Overview of how ClearEdge helps with inherited homes.')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: rl4, href: '/cash-buyer-vs-realtor' }],
    children: [span('Cash Buyer vs. Realtor — Honest Comparison', [rl4]), span(' — Side-by-side breakdown of both selling paths.')],
  })
  blocks.push({
    _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: rl5, href: '/calculator' }],
    children: [span('Home Sale Calculator', [rl5]), span(' — Run your specific numbers with county-specific PA closing costs.')],
  })

  return blocks
}

async function main() {
  console.log(`\nFetching blog post: ${SLUG}`)

  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug: SLUG }
  )

  if (!post) {
    console.log('Blog post not found.')
    return
  }

  console.log(`Found: "${post.title}" (${post._id})`)
  console.log(`Current content blocks: ${post.content.length}`)

  const content = [...post.content]

  // === MODIFICATION 1: Block 4 — Add /about link to "ClearEdge Home Buyers" ===
  console.log('\n1. Adding /about link to intro (block 4)...')
  const aboutKey1 = k()
  content[4] = {
    ...content[4],
    markDefs: [{ _type: 'link', _key: aboutKey1, href: '/about' }],
    children: [
      span("I'm Tyler Swenson, founder of "),
      span('ClearEdge Home Buyers', [aboutKey1]),
      span('.'),
    ],
  }

  // === MODIFICATION 2: Block 110 — Add /about link to "ClearEdge Home Buyers" ===
  console.log('2. Adding /about link to cash buyer section (block 110)...')
  const aboutKey2 = k()
  content[110] = {
    ...content[110],
    markDefs: [{ _type: 'link', _key: aboutKey2, href: '/about' }],
    children: [
      span('At '),
      span('ClearEdge Home Buyers', [aboutKey2]),
      span(", we've simplified this process."),
    ],
  }

  // === MODIFICATION 3: Block 124 — Add /contact and /how-it-works links ===
  console.log('3. Adding /contact and /how-it-works links to Bottom Line CTA (block 124)...')
  const contactKey = k(), hitwKey = k()
  content[124] = {
    ...content[124],
    markDefs: [
      { _type: 'link', _key: contactKey, href: '/contact' },
      { _type: 'link', _key: hitwKey, href: '/how-it-works' },
    ],
    children: [
      span('Get a free, no-obligation cash offer', [contactKey]),
      span(' or learn more about our simple '),
      span('3-step process', [hitwKey]),
      span('.'),
    ],
  }

  // === INSERT county-by-county section after block 101 (before "What If You're Missing Documents?") ===
  console.log('4. Inserting county-by-county section after block 101...')
  const countyBlocks = buildCountySection()
  console.log(`   ${countyBlocks.length} blocks to insert`)

  // Splice: insert after index 101 (before index 102)
  content.splice(102, 0, ...countyBlocks)

  // After splice, the original block indices shift. Related Reading was at 127, now at 127 + countyBlocks.length
  const relatedReadingStart = 127 + countyBlocks.length
  const currentLength = content.length

  // === REPLACE Related Reading (blocks from relatedReadingStart to end) ===
  console.log(`5. Replacing Related Reading section (blocks ${relatedReadingStart}–${currentLength - 1})...`)
  const newRelatedReading = buildRelatedReading()
  content.splice(relatedReadingStart, currentLength - relatedReadingStart, ...newRelatedReading)

  console.log(`\nFinal content blocks: ${content.length}`)

  // === UPDATE document ===
  console.log('\n6. Updating document in Sanity...')
  await client
    .patch(post._id)
    .set({
      content,
      updatedAt: '2026-03-26',
    })
    .commit()

  console.log('✓ Blog post updated successfully')
  console.log(`  Content blocks: ${content.length}`)
  console.log('  dateModified: 2026-03-26')

  // Update draft if exists
  try {
    await client
      .patch(`drafts.${post._id}`)
      .set({
        content,
        updatedAt: '2026-03-26',
      })
      .commit()
    console.log('✓ Draft version also updated')
  } catch {
    console.log('  (No draft version — that\'s fine)')
  }

  console.log('\nDone!')
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
