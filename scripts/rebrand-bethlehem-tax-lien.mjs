/**
 * Rebrand Bethlehem Tax Lien Blog Post
 *
 * Changes:
 * - Slug: sell-my-house-fast-bethlehem-pa-18015-tax-lien → sell-house-tax-lien-bethlehem-pa
 * - Title: Updated to tax-lien focused title
 * - Meta title + description: Updated
 * - Body content: Full replacement with rebranded article
 * - FAQs: Replaced with 5 tax-lien-specific questions
 * - dateModified: 2026-03-26
 *
 * Run: node scripts/rebrand-bethlehem-tax-lien.mjs
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

const OLD_SLUG = 'sell-my-house-fast-bethlehem-pa-18015-tax-lien'
const NEW_SLUG = 'sell-house-tax-lien-bethlehem-pa'

// Helper to create a Portable Text block
function block(text, style = 'normal', markDefs = []) {
  const key = Math.random().toString(36).slice(2, 10)
  // Parse text for marks
  const children = parseInlineMarks(text)
  return {
    _type: 'block',
    _key: key,
    style,
    markDefs,
    children,
  }
}

function parseInlineMarks(text) {
  // Simple: just return plain text span
  // For complex content with bold/links, we build manually
  return [{
    _type: 'span',
    _key: Math.random().toString(36).slice(2, 10),
    text,
    marks: [],
  }]
}

function heading(text, level = 2) {
  return block(text, `h${level}`)
}

function paragraph(spans) {
  const key = Math.random().toString(36).slice(2, 10)
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: Array.isArray(spans) ? spans : [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text: spans, marks: [] }],
  }
}

function span(text, marks = []) {
  return {
    _type: 'span',
    _key: Math.random().toString(36).slice(2, 10),
    text,
    marks,
  }
}

function linkBlock(children, markDefs) {
  const key = Math.random().toString(36).slice(2, 10)
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs,
    children,
  }
}

function bulletItem(children, markDefs = []) {
  const key = Math.random().toString(36).slice(2, 10)
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs,
    children: Array.isArray(children) ? children : [span(children)],
  }
}

// Build the full article content as Portable Text
function buildContent() {
  const content = []

  // --- Quick Answer section ---
  content.push(heading('Can I sell my Bethlehem house with a tax lien?', 2))

  const link1Key = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: link1Key, href: '/situations/tax-liens-code-violations' }],
    children: [
      span('Yes. You can sell a Bethlehem house with a tax lien — the lien gets paid from the sale proceeds at closing. A cash buyer can close in 7-14 days, which is often fast enough to avoid the escalating penalties and potential sheriff sale. You don\'t need to pay off the lien first; it\'s settled through the title company at closing. '),
      span('Learn more about selling with tax liens and code violations', [link1Key]),
      span('.'),
    ],
  })

  // --- Intro paragraphs ---
  const bethLink = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: bethLink, href: '/locations/bethlehem' }],
    children: [
      span('If you\'re behind on property taxes in '),
      span('Bethlehem', [bethLink]),
      span(', you already know the situation is serious.'),
    ],
  })

  const ncLink = Math.random().toString(36).slice(2, 10)
  const jsLink = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [
      { _type: 'link', _key: ncLink, href: 'https://www.northamptoncounty.org/' },
      { _type: 'link', _key: jsLink, href: 'https://www.northamptoncounty.org/FISCAL/Pages/Tax-Claim-Bureau.aspx' },
    ],
    children: [
      span('Letters from '),
      span('Northampton County', [ncLink]),
      span('. The Tax Claim Bureau at 669 Washington Street in Easton. Words like "upset sale" and "'),
      span('judicial sale', [jsLink]),
      span('" that sound terrifying.'),
    ],
  })

  content.push(block('And a clock that\'s ticking.'))
  content.push(block('Here\'s what most people don\'t realize: you can still sell your house — even with a tax lien on it.'))

  const aboutLink = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: aboutLink, href: '/about' }],
    children: [
      span('I\'m Tyler Swenson, founder of '),
      span('ClearEdge Home Buyers', [aboutLink]),
      span('. Since 2016, I\'ve helped over 200 homeowners across Eastern Pennsylvania sell properties in tough situations. Tax liens included. Let me show you exactly how this works.'),
    ],
  })

  // --- What Is a Tax Lien ---
  content.push(heading('What Is a Tax Lien on Your Bethlehem Property?', 2))
  content.push(block('A tax lien is a legal claim the government puts on your property when you don\'t pay your taxes.'))
  content.push(block('In Pennsylvania, property taxes come from three sources:'))

  content.push(bulletItem([span('City of Bethlehem', ['strong']), span(' (they collect their portion directly)')]))
  const nc2Link = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [{ _type: 'link', _key: nc2Link, href: 'https://www.northamptoncounty.org/' }],
    children: [
      span('Northampton County', ['strong', nc2Link]),
      span(' (where most of 18015 falls)'),
    ],
  })
  content.push(bulletItem([span('Bethlehem Area School District', ['strong'])]))

  content.push(block('Miss any of these, and a lien gets attached to your property. That lien is a matter of public record — anyone searching the title can see it.'))

  const tcbLink = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: tcbLink, href: 'https://www.northamptoncounty.org/FISCAL/Pages/Tax-Claim-Bureau.aspx' }],
    children: [
      span('And the lien doesn\'t just sit there. It grows. Interest accrues at '),
      span('0.75% per month', ['strong']),
      span(' in Northampton County. Fees pile up. And if you don\'t act, your property heads toward a '),
      span('tax sale', [tcbLink]),
      span('.'),
    ],
  })

  // --- How PA Tax Sales Work ---
  const tcb2Link = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'h2',
    markDefs: [],
    children: [span('How Pennsylvania Tax Sales Work: The Timeline You Need to Know')],
  })

  const tcb3Link = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: tcb3Link, href: 'https://www.northamptoncounty.org/FISCAL/Pages/Tax-Claim-Bureau.aspx' }],
    children: [
      span('Pennsylvania\'s '),
      span('tax sale', [tcb3Link]),
      span(' process has specific deadlines. Miss them, and you could lose your home.'),
    ],
  })

  // Year 1
  content.push(heading('Year 1: The Tax Goes Delinquent', 3))
  const nc3Link = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: nc3Link, href: 'https://www.northamptoncounty.org/' }],
    children: [
      span('Your property tax is due by December 31st of the year it\'s levied. Miss that date and it\'s delinquent. By January 15th, the local tax collector turns your unpaid taxes over to the '),
      span('Northampton County', [nc3Link]),
      span(' Tax Claim Bureau.'),
    ],
  })

  // Spring Year 2
  content.push(heading('Spring of Year 2: Notice of Claim', 3))
  content.push(block('The Tax Claim Bureau sends you a "Notice of Claim." This tells you a claim has been entered against your property. The tax claim becomes "absolute" if not paid by December 31st of that year.'))

  // Year 2-3
  content.push(heading('Year 2-3: Heading to Upset Sale', 3))
  content.push(block('If you still haven\'t paid by July 1st of the second year after the original bill, your property gets advertised for the Upset Sale. You\'ll receive certified mail notices. Your property gets posted.'))

  // September
  content.push(heading('September: The Upset Sale', 3))
  content.push(block('Properties with two or more years of delinquent taxes get auctioned. The starting bid is all the unpaid taxes, interest, and costs.'))

  // Judicial Sale
  content.push(heading('If It Doesn\'t Sell: Judicial Sale', 3))
  const js2Link = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: js2Link, href: 'https://www.northamptoncounty.org/FISCAL/Pages/Tax-Claim-Bureau.aspx' }],
    children: [
      span('Properties that don\'t sell at the Upset Sale move to a '),
      span('Judicial Sale', [js2Link]),
      span('. This is worse for you. At a Judicial Sale, the property sells "free and clear" of all liens — including mortgages. Your equity can vanish.'),
    ],
  })

  // Repository
  content.push(heading('Last Stop: Repository Sale', 3))
  content.push(block('Properties that still don\'t sell end up on the Repository list. Someone can buy your property for just the costs owed. Could be a few thousand dollars for a house worth $200,000+.'))

  // --- Why Tax Liens Make Selling Hard ---
  content.push(heading('Why Tax Liens Make Selling Your House Hard', 2))

  const beth2Link = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: beth2Link, href: '/locations/bethlehem' }],
    children: [
      span('Having a tax lien on your '),
      span('Bethlehem', [beth2Link]),
      span(' property creates real obstacles:'),
    ],
  })

  content.push(bulletItem([span('Traditional buyers get scared off.', ['strong']), span(' When a buyer\'s title company runs a search, that lien shows up immediately. Most retail buyers don\'t want the hassle and move on.')]))
  content.push(bulletItem([span('Banks won\'t finance it.', ['strong']), span(' Lenders require clear title. FHA, VA, conventional — they all say no until that lien is resolved.')]))
  content.push(bulletItem([span('Realtors struggle to market it.', ['strong']), span(' Many agents won\'t take the listing. Those who do have to disclose the lien, which shrinks your buyer pool.')]))
  content.push(bulletItem([span('Your equity erodes monthly.', ['strong']), span(' Every month you wait, more interest and fees accumulate. That\'s money coming directly out of what you\'d pocket from a sale.')]))

  content.push(block('But you absolutely CAN sell a house with a tax lien in Pennsylvania. The lien just needs to be satisfied at closing.'))

  // --- 18015 Location ---
  content.push(heading('Why Your 18015 Location Actually Helps', 2))
  content.push(block('If you\'re in Bethlehem\'s 18015 zip code, you\'ve got something working in your favor: this area is in demand.'))
  content.push(block('The South Side has transformed over the past decade. Lehigh University is right there. SteelStacks brings thousands of visitors for concerts and events. Wind Creek Casino opened nearby. New restaurants and shops line Third and Fourth Streets.'))
  content.push(block('Here\'s what 18015 looks like by the numbers:'))

  content.push(bulletItem('Median home values: $240,000–$280,000'))
  content.push(bulletItem('Property tax rates: approximately 2.85% — one of the higher rates in the area'))
  content.push(bulletItem('About 50% owner-occupied, 50% renter-occupied'))
  content.push(bulletItem('Strong rental demand from Lehigh University students'))

  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: [
      span('That high property tax rate is exactly why so many people fall behind. On a $250,000 home, that\'s over '),
      span('$7,000 per year', ['strong']),
      span(' just in property taxes. Add school taxes and municipal taxes, and it\'s easy to see how people get underwater.'),
    ],
  })

  content.push(block('But the strong market demand also means your property has real value — even with a lien attached. Cash buyers like us see the potential because we know how to handle the lien at closing.'))

  // --- Real Cost of Doing Nothing ---
  content.push(heading('The Real Cost of Doing Nothing', 2))
  content.push(block('I\'ve seen this play out too many times. Homeowners who avoid the letters, who hope it somehow goes away.'))
  content.push(block('It doesn\'t.'))

  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: [
      span('Upset Sale:', ['strong']),
      span(' Someone bids on your property. If they win, you lose the house — but you might still owe the mortgage.'),
    ],
  })
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: [
      span('Judicial Sale:', ['strong']),
      span(' The property sells free and clear of everything, including your mortgage. Any equity you had? Gone to pay creditors.'),
    ],
  })
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: [
      span('Repository Sale:', ['strong']),
      span(' Someone picks up your property for just the accumulated costs. Could be a few thousand dollars. For a house worth $200,000+.'),
    ],
  })

  content.push(block('All because you didn\'t act. Every month of inaction costs you 0.75% in interest plus accumulating fees.'))

  // --- How to Sell ---
  content.push(heading('How to Sell Your Bethlehem House with a Tax Lien', 2))
  content.push(block('Here\'s the step-by-step process:'))

  // Step 1
  const nc4Link = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: nc4Link, href: 'https://www.northamptoncounty.org/' }],
    children: [
      span('Step 1: Get Your Payoff Amount', ['strong']),
      span('\nContact the '),
      span('Northampton County', [nc4Link]),
      span(' Tax Claim Bureau at '),
      span('669 Washington Street in Easton', ['strong']),
      span(' or call '),
      span('(610) 829-6186', ['strong']),
      span('. Ask for a current payoff amount including all interest and fees. This number changes daily, so get a fresh quote.'),
    ],
  })

  // Step 2
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: [
      span('Step 2: Know Your Property\'s Value', ['strong']),
      span('\nIn 18015, values vary by property type:'),
    ],
  })
  content.push(bulletItem('Row houses and twins: $150,000–$220,000'))
  content.push(bulletItem('Single-family homes: $220,000–$320,000'))
  content.push(bulletItem('Properties near Lehigh University command premiums'))

  // Step 3
  const contactLink = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: contactLink, href: '/contact' }],
    children: [
      span('Step 3: Get a Cash Offer', ['strong']),
      span('\n'),
      span('Contact ClearEdge Home Buyers', [contactLink]),
      span(' for a no-obligation cash offer. We evaluate your property, factor in the lien payoff, and give you a number — usually within 24-48 hours.'),
    ],
  })

  // Step 4
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: [
      span('Step 4: Choose Your Closing Date', ['strong']),
      span('\nNeed to close fast to beat a sale deadline? We can do 7-14 days. Need more time? We work with your schedule.'),
    ],
  })

  // Step 5
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: [
      span('Step 5: The Lien Gets Paid at Closing', ['strong']),
      span('\nAt the settlement table, the title company pays off the tax lien directly from the proceeds. The county gets their money. The lien gets satisfied. You get the remaining equity. Done.'),
    ],
  })

  // --- CTA paragraph ---
  const beth3Link = Math.random().toString(36).slice(2, 10)
  const allLink = Math.random().toString(36).slice(2, 10)
  const eastLink = Math.random().toString(36).slice(2, 10)
  const lvLink = Math.random().toString(36).slice(2, 10)
  const ctaLink = Math.random().toString(36).slice(2, 10)
  const phoneLink = Math.random().toString(36).slice(2, 10)
  content.push({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [
      { _type: 'link', _key: beth3Link, href: '/locations/bethlehem' },
      { _type: 'link', _key: allLink, href: '/locations/allentown' },
      { _type: 'link', _key: eastLink, href: '/locations/easton' },
      { _type: 'link', _key: lvLink, href: '/locations/lehigh-valley' },
      { _type: 'link', _key: ctaLink, href: '/contact' },
      { _type: 'link', _key: phoneLink, href: 'tel:+16109048526' },
    ],
    children: [
      span('ClearEdge Home Buyers', ['strong']),
      span(' purchases properties with tax liens throughout '),
      span('Bethlehem', [beth3Link]),
      span(', '),
      span('Allentown', [allLink]),
      span(', '),
      span('Easton', [eastLink]),
      span(', and the entire '),
      span('Lehigh Valley', [lvLink]),
      span('. If you\'re facing a tax lien and need to sell before the situation gets worse, '),
      span('get a no-obligation cash offer today', [ctaLink]),
      span(' or call Tyler directly at '),
      span('(610) 904-8526', [phoneLink]),
      span('.'),
    ],
  })

  // --- Related Reading ---
  content.push(heading('Related Reading', 2))

  const rl1 = Math.random().toString(36).slice(2, 10)
  const rl2 = Math.random().toString(36).slice(2, 10)
  const rl3 = Math.random().toString(36).slice(2, 10)
  const rl4 = Math.random().toString(36).slice(2, 10)

  content.push({
    _type: 'block', _key: Math.random().toString(36).slice(2, 10),
    style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: rl1, href: '/situations/tax-liens-code-violations' }],
    children: [span('Tax Liens & Code Violations — Your Options', [rl1])],
  })
  content.push({
    _type: 'block', _key: Math.random().toString(36).slice(2, 10),
    style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: rl2, href: '/blog/how-to-stop-berks-county-judicial-sale-2026' }],
    children: [span('How to Stop a Berks County Judicial Sale (2026 Guide)', [rl2])],
  })
  content.push({
    _type: 'block', _key: Math.random().toString(36).slice(2, 10),
    style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: rl3, href: '/locations/bethlehem' }],
    children: [span('Sell Your House in Bethlehem — Cash Offer in 24 Hours', [rl3])],
  })
  content.push({
    _type: 'block', _key: Math.random().toString(36).slice(2, 10),
    style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [{ _type: 'link', _key: rl4, href: '/cash-buyer-vs-realtor' }],
    children: [span('Compare Cash Buyers vs. Realtors', [rl4])],
  })

  return content
}

// Build the new FAQ array
function buildFAQs() {
  return [
    {
      _key: Math.random().toString(36).slice(2, 10),
      question: 'Can I sell my house if I owe back taxes in Bethlehem?',
      answer: 'Yes. The tax lien gets paid from the sale proceeds at closing through the title company. You don\'t need to pay it off before listing or accepting an offer. The key is acting before the property reaches upset sale — once it\'s on the auction list, your options narrow significantly.',
    },
    {
      _key: Math.random().toString(36).slice(2, 10),
      question: 'How fast can I sell a house with a tax lien?',
      answer: 'A cash buyer can close in as little as 7-14 days. Traditional sales take longer because most lenders won\'t finance a property with a tax lien, limiting your buyer pool. If you\'re facing an upcoming upset sale date, speed matters.',
    },
    {
      _key: Math.random().toString(36).slice(2, 10),
      question: 'Will I lose all my equity at a tax sale?',
      answer: 'Not necessarily at an Upset Sale — the starting bid is just the delinquent taxes, and if it sells for more, you may receive the surplus. But at a Judicial Sale, the property sells free and clear of all liens including mortgages, and your equity position gets much worse. At a Repository Sale, someone can buy the property for just the accumulated costs.',
    },
    {
      _key: Math.random().toString(36).slice(2, 10),
      question: 'How much interest am I paying on delinquent taxes in Northampton County?',
      answer: 'The interest rate is 0.75% per month on the delinquent amount, plus fees. On a $7,000 annual tax bill that\'s two years behind, you\'re looking at several hundred dollars in accumulated interest on top of the original amount.',
    },
    {
      _key: Math.random().toString(36).slice(2, 10),
      question: 'What if I owe more in liens than the house is worth?',
      answer: 'This happens sometimes, especially on lower-value properties with years of back taxes. In this case, selling to a cash buyer who handles the lien payoff might result in little or no proceeds — but it avoids the credit damage of a tax sale and gets you out of a deteriorating situation.',
    },
  ]
}

async function main() {
  console.log(`\nLooking up blog post: ${OLD_SLUG}`)

  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{ _id, title, slug }`,
    { slug: OLD_SLUG }
  )

  if (!post) {
    console.log('Blog post not found.')
    return
  }

  console.log(`Found: "${post.title}" (${post._id})`)
  console.log(`\nUpdating slug, title, meta, content, FAQs...`)

  const newContent = buildContent()
  const newFAQs = buildFAQs()

  await client
    .patch(post._id)
    .set({
      title: 'How to Sell a House with a Tax Lien in Bethlehem, PA (2026 Guide)',
      slug: { _type: 'slug', current: NEW_SLUG },
      metaTitle: 'Sell a House with Tax Lien Bethlehem PA | Northampton County Tax Sale Guide (2026)',
      metaDescription: 'Owe back taxes on your Bethlehem property? Learn exactly how to sell a house with a tax lien in PA — Northampton County tax sale timeline, payoff process, and how to protect your equity before the upset sale.',
      updatedAt: '2026-03-26',
      content: newContent,
      faqs: newFAQs,
      category: 'Situations',
    })
    .commit()

  console.log('✓ Blog post updated successfully')
  console.log(`  New slug: ${NEW_SLUG}`)
  console.log(`  New title: How to Sell a House with a Tax Lien in Bethlehem, PA (2026 Guide)`)
  console.log(`  Content blocks: ${newContent.length}`)
  console.log(`  FAQs: ${newFAQs.length}`)

  // Also update draft if exists
  try {
    await client
      .patch(`drafts.${post._id}`)
      .set({
        title: 'How to Sell a House with a Tax Lien in Bethlehem, PA (2026 Guide)',
        slug: { _type: 'slug', current: NEW_SLUG },
        metaTitle: 'Sell a House with Tax Lien Bethlehem PA | Northampton County Tax Sale Guide (2026)',
        metaDescription: 'Owe back taxes on your Bethlehem property? Learn exactly how to sell a house with a tax lien in PA — Northampton County tax sale timeline, payoff process, and how to protect your equity before the upset sale.',
        updatedAt: '2026-03-26',
        content: newContent,
        faqs: newFAQs,
        category: 'Situations',
      })
      .commit()
    console.log('✓ Draft version also updated')
  } catch {
    console.log('  (No draft version found — that\'s fine)')
  }

  console.log('\nDone! Next steps:')
  console.log('  1. 301 redirect should be added in next.config.ts')
  console.log('  2. Update answer-first summary in blog template')
  console.log('  3. Update internal link references')
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
