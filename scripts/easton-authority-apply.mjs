// Rebuild the unindexed Easton rental-inspection article as a concise,
// officially sourced authority resource; strengthen its path to the Easton
// commercial page; and clean up the high-impression Lehigh Valley guide.
//
// DRY RUN BY DEFAULT — pass --apply to write.
//   node scripts/easton-authority-apply.mjs
//   node scripts/easton-authority-apply.mjs --apply
//
// SAFETY:
//   * Exact metadata and SHA-256 body baselines must match before a write.
//   * Every affected document is backed up before one guarded transaction.
//   * Fresh useCdn:false reads verify the final state.
//   * Re-running after success reports SKIP.

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(scriptDir, '../.env.local'), quiet: true })

const APPLY = process.argv.includes('--apply')
if (APPLY && !process.env.SANITY_API_TOKEN) {
  console.error('ABORT: SANITY_API_TOKEN is required with --apply.')
  process.exit(2)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-01-02',
  token: APPLY ? process.env.SANITY_API_TOKEN : undefined,
  useCdn: false,
})

const URLS = {
  cityProgram: 'https://www.easton-pa.com/168/Programs',
  cityChecklist: 'https://www.easton-pa.com/DocumentCenter/View/115/Rental-Inspection-Guidelines-PDF',
  rentalCode: 'https://ecode360.com/9644156',
  feeCode: 'https://ecode360.com/46105990',
  eastonLocation: '/locations/easton',
  lehighHub: '/locations/lehigh-valley',
  tiredLandlord: '/situations/tired-landlord',
  article: '/blog/easton-pa-rental-inspection-checklist-2026',
  compare: '/cash-buyer-vs-realtor',
}

const BASELINES = {
  authority: {
    slug: 'easton-pa-rental-inspection-checklist-2026',
    title: 'Easton PA Rental Inspection Checklist 2026: The Complete Landlord Survival Guide',
    metaTitle: 'Easton Rental Inspection 2026',
    metaDescription: 'Easton PA rental inspection checklist 2026. Ward registration deadlines, Chapter 435 requirements, and how to pass your inspection first time.',
    excerpt: "Complete 2026 guide to Easton's rental inspection requirements. Ward deadlines, smoke detector rules, fee schedules, and the 8 most common failures that cost landlords their licenses.",
    category: 'locations',
    contentHash: 'ddd5ca3241b5291e36a94d4ea90afbe75f9084215eea18eebd21b9b41b6dfe51',
    faqHash: 'a88ee7c4b75e9ba92e145b9077560cf640e77b037cbba5b1e5cceceb0ff745ca',
  },
  regional: {
    slug: 'sell-my-house-fast-lehigh-valley',
    contentHash: '0385629905ac8828afc2a2552c79582cefec068e9f1eb77148742b88a961b1c1',
  },
  location: {
    slug: 'easton',
    metaTitle: 'Sell Your Easton House Fast for Cash | ClearEdge',
    metaDescription: 'Easton homes are 80–120 years old with expensive repairs. ClearEdge buys as-is for cash — no repairs, no fees, close in 7–30 days. Since 2016.',
  },
}

function rawDigest(value) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex')
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
  )
}

function semanticDigest(value) {
  return createHash('sha256').update(JSON.stringify(canonicalize(value))).digest('hex')
}

function rich(key, style, parts, options = {}) {
  const markDefs = []
  const children = parts.map((part, index) => {
    const marks = []
    if (part.strong) marks.push('strong')
    if (part.em) marks.push('em')
    if (part.href) {
      const markKey = `${key}l${index}`
      markDefs.push({
        _key: markKey,
        _type: 'link',
        href: part.href,
        ...(part.href.startsWith('http') ? { openInNewTab: true } : {}),
      })
      marks.push(markKey)
    }
    return { _key: `${key}s${index}`, _type: 'span', marks, text: part.text }
  })

  return {
    _key: key,
    _type: 'block',
    style,
    markDefs,
    children,
    ...(options.listItem ? { listItem: options.listItem, level: options.level || 1 } : {}),
  }
}

const p = (key, text) => rich(key, 'normal', [{ text }])
const h2 = (key, text) => rich(key, 'h2', [{ text }])
const h3 = (key, text) => rich(key, 'h3', [{ text }])
const bullet = (key, parts) => rich(key, 'normal', parts, { listItem: 'bullet' })

const authorityContent = [
  rich('ea001', 'normal', [
    { text: 'Reviewed September 3, 2026. ', strong: true },
    { text: 'Easton requires regulated rental units to be registered and licensed. Most regulated units are placed on an inspection cycle of at least once every four years; rooming-house and short-term rental units are inspected at least annually. Use this checklist to prepare, then confirm your property’s current requirements with the City of Easton Bureau of Codes at 610-250-6724.' },
  ]),
  rich('ea002', 'normal', [
    { text: 'Important: ', strong: true },
    { text: 'This is a practical summary, not a substitute for the City’s inspection, the current ordinance, or legal advice. The City’s own guide says its checklist is not a complete list of everything an inspector may evaluate.' },
  ]),

  h2('ea003', 'Start With Easton’s Official Rental Sources'),
  bullet('ea004', [
    { text: 'Residential Rental Properties Licensing & Inspection program', href: URLS.cityProgram },
    { text: ' — the City’s program overview and Bureau of Codes contact information.' },
  ]),
  bullet('ea005', [
    { text: 'Official four-page Rental Inspection Guidelines', href: URLS.cityChecklist },
    { text: ' — the City’s commonly inspected exterior, interior, fire-safety, plumbing, and mechanical items.' },
  ]),
  bullet('ea006', [
    { text: 'Chapter 456, Article III', href: URLS.rentalCode },
    { text: ' — the current licensing, registration, inspection, owner-duty, and enforcement rules.' },
  ]),
  bullet('ea007', [
    { text: 'Chapter 285 fee schedule', href: URLS.feeCode },
    { text: ' — current registration, reinspection, missed-entry, reinstatement, and appeal fees.' },
  ]),
  p('ea008', 'The online code lists Ordinance No. 5942, adopted July 22, 2026, as the latest amendment affecting Article III. That is why an older blog post, saved PDF, or contractor checklist should not be your only source.'),

  h2('ea009', 'Easton Rental Registration Deadlines'),
  p('ea010', 'Chapter 456 uses a ward-based annual schedule. The current code lists these regular filing dates and final receipt dates:'),
  bullet('ea011', [{ text: 'College Hill: ', strong: true }, { text: 'regular deadline March 15; registration must be received no later than May 15.' }]),
  bullet('ea012', [{ text: 'Downtown: ', strong: true }, { text: 'regular deadline May 15; registration must be received no later than July 15.' }]),
  bullet('ea013', [{ text: 'South Side: ', strong: true }, { text: 'regular deadline July 15; registration must be received no later than September 15.' }]),
  bullet('ea014', [{ text: 'West Ward: ', strong: true }, { text: 'regular deadline September 15; registration must be received no later than November 15.' }]),
  p('ea015', 'If you are unsure which area, license type, or deadline applies, contact the Bureau of Codes before paying. Short-term rentals, rooming houses, vacant-but-available units, and owner-occupied properties can have different treatment.'),

  h2('ea016', 'Current Registration and Inspection Fees'),
  p('ea017', 'For a standard regulated rental unit, the current fee schedule lists a $75 registration amount at the regular deadline, $105 at the first late tier, and $135 at the next late tier. Short-term rentals, rooming-house rooms, and government-owned units use different amounts.'),
  bullet('ea018', [{ text: 'Initial inspection and first reinspection: ', strong: true }, { text: '$0 under the current fee schedule.' }]),
  bullet('ea019', [{ text: 'Third inspection: ', strong: true }, { text: '$100 per standard regulated rental unit.' }]),
  bullet('ea020', [{ text: 'Fourth or later inspection: ', strong: true }, { text: '$150 per standard regulated rental unit.' }]),
  bullet('ea021', [{ text: 'Missed appointment or no entry: ', strong: true }, { text: '$100.' }]),
  bullet('ea022', [{ text: 'License reinstatement: ', strong: true }, { text: '$150 per standard regulated rental unit.' }]),
  p('ea023', 'Fees can be amended. Verify the amount shown in the City portal or Chapter 285 before submitting payment.'),

  h2('ea024', 'Easton Rental Inspection Checklist'),
  p('ea025', 'Use the sections below for a pre-inspection walk-through. They summarize the City’s official guidelines, but they do not guarantee a pass.'),

  h3('ea026', '1. Exterior, Grounds, and Structure'),
  bullet('ea027', [{ text: 'Make the street address visible on the front of the main structure and use numbers that contrast with the background.' }]),
  bullet('ea028', [{ text: 'Remove weeds, debris, inoperable vehicles, and sidewalk tripping hazards.' }]),
  bullet('ea029', [{ text: 'Repair peeling paint, damaged siding, rotted wood, broken windows, unsafe fences, garages, and sheds.' }]),
  bullet('ea030', [{ text: 'Check the roof, chimney, gutters, downspouts, foundation, porches, decks, stairs, handrails, and guards for damage or unsafe conditions.' }]),
  bullet('ea031', [{ text: 'Confirm required garbage and recycling containers are available.' }]),
  bullet('ea032', [{ text: 'For a fire escape, have the required professional-engineer inspection and report; the City guide states this is required every five years.' }]),

  h3('ea033', '2. Doors, Windows, and Interior Surfaces'),
  bullet('ea034', [{ text: 'Number every unit in a two-unit or multi-unit building; identify every room in a rooming house.' }]),
  bullet('ea035', [{ text: 'Make egress doors easy to open without special tools, keys, or knowledge. Double-keyed locks on exterior egress doors are prohibited.' }]),
  bullet('ea036', [{ text: 'Make windows operable and able to stay open with their own hardware; repair locks and install sound screens.' }]),
  bullet('ea037', [{ text: 'Clean floors, walls, counters, sinks, tubs, cabinets, and windows; repair damaged flooring and peeling interior paint.' }]),

  h3('ea038', '3. Electrical and Fire Safety'),
  bullet('ea039', [{ text: 'Install switch and receptacle covers, panel blanks, and protective globes or covers on light fixtures.' }]),
  bullet('ea040', [{ text: 'Label the electrical panel and correct visibly unsafe or improperly installed equipment.' }]),
  bullet('ea041', [{ text: 'Do not use extension cords as permanent wiring or to power heaters, air conditioners, or similar equipment.' }]),
  bullet('ea042', [{ text: 'Test smoke alarms in each bedroom, outside sleeping areas, and on every story. Maintain required hardwired and interconnected systems.' }]),
  bullet('ea043', [{ text: 'Provide a minimum 5-pound ABC extinguisher rated 2A-10BC in the kitchen area of each unit and in basements of multi-unit buildings; keep annual professional inspection tags current.' }]),
  bullet('ea044', [{ text: 'For applicable fire-alarm or protection systems, keep annual professional testing and the required NFPA 72 documentation available.' }]),

  h3('ea045', '4. Bedrooms, Kitchens, Bathrooms, and Mechanical Systems'),
  bullet('ea046', [{ text: 'Check bedroom area and ceiling-height requirements before treating a basement, attic, or small room as sleeping space.' }]),
  bullet('ea047', [{ text: 'Repair plumbing leaks and damaged sink cabinets; confirm toilets, tubs, sinks, traps, and ventilation work properly.' }]),
  bullet('ea048', [{ text: 'Clean and test the stove, refrigerator, kitchen exhaust, and other supplied equipment.' }]),
  bullet('ea049', [{ text: 'Check the water heater installation, venting, and temperature-pressure relief-valve discharge pipe.' }]),
  bullet('ea050', [{ text: 'Vent clothes dryers outdoors and confirm heating and mechanical equipment is safely installed and operating.' }]),
  bullet('ea051', [{ text: 'The City guide calls for fuel-fired heating systems and chimneys to be inspected, cleaned, and certified by a qualified professional within the preceding 12 months.' }]),

  h2('ea052', 'What to Have Ready Before the Appointment'),
  bullet('ea053', [{ text: 'A current business license and rental registration information.' }]),
  bullet('ea054', [{ text: 'Owner and manager contact details, plus the required adult-occupant information.' }]),
  bullet('ea055', [{ text: 'Current fire-extinguisher, alarm-system, fire-escape, heating, and chimney records that apply to the property.' }]),
  bullet('ea056', [{ text: 'Safe access to every unit, common area, basement, attic, yard, garage, and accessory structure that may be inspected.' }]),
  bullet('ea057', [{ text: 'The owner or designated manager available to accompany the Code Enforcement Officer.' }]),
  p('ea058', 'If the owner does not live or work within the distance required by Chapter 456, review the local-manager rules before the appointment. The current code generally requires an out-of-area owner to designate a manager who lives or works daily within 30 miles of Easton.'),

  h2('ea059', 'What Happens If the Property Does Not Pass?'),
  p('ea060', 'The Code Enforcement Officer provides written notice of violations and a correction period. A re-check follows after the work is completed. The current fee schedule includes the initial inspection and first reinspection, while later inspections can carry additional fees.'),
  p('ea061', 'A license can be suspended, revoked, or not renewed for unresolved violations or unpaid amounts. Chapter 456 also permits fines of up to $1,000 plus costs upon conviction, and a continuing violation can be treated as a separate offense for each day after notice. The actual response depends on the violation and the City’s enforcement process.'),

  h2('ea062', 'Repair, List, or Sell the Easton Rental As-Is?'),
  p('ea063', 'An inspection notice does not automatically mean a cash sale is the best choice. If the property is in good condition and you have the time and money to complete the work, listing it on the open market may produce a higher price.'),
  rich('ea064', 'normal', [
    { text: 'A direct sale may be worth comparing when the property has expensive repairs, repeated inspection problems, difficult tenancy, or carrying costs you no longer want. Review the ' },
    { text: 'Easton cash-sale process', href: URLS.eastonLocation },
    { text: ', learn about ' },
    { text: 'selling a rental property with tenants or landlord fatigue', href: URLS.tiredLandlord },
    { text: ', and compare the numbers with a traditional listing before deciding.' },
  ]),
  p('ea065', 'Selling as-is can remove the repair burden, but it does not erase municipal disclosure, buyer-notification, title, or closing requirements. Easton’s Buyer Notification Inspection program applies to property sales, so confirm the process with the Bureau of Codes and your title or legal professional.'),
  {
    _key: 'ea066',
    _type: 'ctaBlock',
    heading: 'Want to compare an as-is offer with the repair plan?',
    body: 'Tell ClearEdge about the Easton rental and its condition. We will review it without obligation so you can compare a direct cash sale with repairing or listing the property.',
    buttonText: 'Compare My Easton Options',
    ctaLocation: 'easton_rental_guide_midarticle',
  },

  h2('ea067', 'Official Sources and Review Date'),
  rich('ea068', 'normal', [
    { text: 'This guide was reviewed on September 3, 2026 against the City of Easton’s ' },
    { text: 'rental-program page', href: URLS.cityProgram },
    { text: ', ' },
    { text: 'official inspection guide', href: URLS.cityChecklist },
    { text: ', ' },
    { text: 'current Chapter 456', href: URLS.rentalCode },
    { text: ', and ' },
    { text: 'Chapter 285 fee schedule', href: URLS.feeCode },
    { text: '. Requirements and fees can change; verify current instructions with the City before relying on this summary.' },
  ]),
  rich('ea069', 'normal', [
    { text: 'Still deciding how to sell? ' },
    { text: 'Compare a cash buyer with a traditional real-estate listing', href: URLS.compare },
    { text: ' using the likely sale price, repair budget, commissions, holding costs, timing, and certainty—not speed alone.' },
  ]),
]

const authorityFaqs = [
  {
    question: 'How often does Easton inspect rental properties?',
    answer: 'Chapter 456 states that each regulated rental unit is subject to inspection at least once every four years. Rooming-house and short-term regulated rental units are inspected at least once per year. The City may also inspect under other code-enforcement authority when appropriate.',
  },
  {
    question: 'What are Easton’s ward-based rental registration deadlines?',
    answer: 'The current code lists March 15 for College Hill, May 15 for Downtown, July 15 for South Side, and September 15 for West Ward. Later final-receipt dates and late fees apply. Confirm the correct area and current deadline with the Bureau of Codes before filing.',
  },
  {
    question: 'How much is Easton rental registration?',
    answer: 'The current fee schedule lists $75 for a standard regulated rental unit at the regular deadline, then $105 and $135 at later tiers. Short-term rentals, rooming houses, and certain other property types use different amounts. Check Chapter 285 or the City portal for the current amount.',
  },
  {
    question: 'What does an Easton rental inspection cover?',
    answer: 'The City guide covers the grounds and exterior, roofs and foundations, stairs and guards, doors and windows, interior surfaces, electrical and fire safety, bedrooms, kitchens and bathrooms, plumbing, water heaters, dryer venting, heating systems, chimneys, attics, and related records.',
  },
  {
    question: 'What happens after a failed Easton rental inspection?',
    answer: 'The Code Enforcement Officer issues written notice of violations and a correction period. The initial re-check is included under the current fee schedule, while third and later inspections can carry additional fees. Unresolved issues can affect the rental license and may lead to enforcement.',
  },
  {
    question: 'Can I sell an Easton rental property with inspection violations?',
    answer: 'A property with inspection problems can be sold, including through an as-is transaction, but Easton’s buyer-notification, disclosure, title, and transfer requirements still apply. Contact the Bureau of Codes and your title or legal professional for the property-specific process.',
  },
]

const authorityNext = {
  title: 'Easton PA Rental Inspection Checklist: 2026 Landlord Guide',
  metaTitle: 'Easton PA Rental Inspection Checklist (2026 Guide)',
  metaDescription: 'Prepare for an Easton rental inspection with current deadlines, fees, exterior, fire-safety and interior checks, linked to official city sources.',
  excerpt: 'A practical Easton landlord checklist based on the city rental program, inspection guide, current code, and fee schedule—reviewed September 2026.',
  category: 'local-markets',
  content: authorityContent,
  faqs: authorityFaqs,
}

const locationNext = {
  metaTitle: 'Sell Your House Fast in Easton PA | Local Cash Buyer',
  metaDescription: 'Sell your Easton, PA house as-is for cash. ClearEdge buys homes with repairs, tenants or code issues—no commissions or showings. Get a fair offer.',
}

function blockText(block) {
  return (block?.children || []).map((child) => child?.text || '').join('')
}

function replaceRegionalContent(content) {
  const next = JSON.parse(JSON.stringify(content || []))
  const replacements = {
    intro1: rich('intro1', 'normal', [
      { text: 'If you need to ' },
      { text: 'sell your house fast in the ' },
      { text: 'Lehigh Valley', href: URLS.lehighHub, strong: true },
      { text: ', start by comparing a direct cash sale with listing after repairs. The right choice depends on your property’s condition, timeline, and likely net proceeds—not the fastest promise.' },
    ]),
    step1: rich('step1', 'normal', [
      { text: 'Step 1: Contact us.', strong: true },
      { text: ' Call (610) 904-8526 or fill out the form. Tell us about the property and your situation; there is no obligation to accept an offer.' },
    ]),
    easton1: rich('easton1', 'normal', [
      { text: 'Downtown, South Side, College Hill, and Palmer Township attract different buyers and have different property issues. If you need to ' },
      { text: 'sell an Easton house fast', href: URLS.eastonLocation },
      { text: ', the Easton service page explains the as-is option and what happens after you request an offer.' },
    ]),
    sit5: rich('sit5', 'normal', [
      { text: 'Tenant or inspection problems', strong: true },
      { text: ' — Non-paying tenants and municipal repair lists can change the timeline and cost. Easton owners can start with the ' },
      { text: 'current Easton rental-inspection checklist', href: URLS.article },
      { text: ', then compare fixing, listing, or selling as-is.' },
    ]),
    close3: p('close3', 'Call (610) 904-8526 or fill out the form for a no-obligation cash offer. We will review the property and explain the next step so you can compare the offer with your other options.'),
  }

  const seen = new Set()
  for (let index = 0; index < next.length; index++) {
    const key = next[index]?._key
    if (!replacements[key]) continue
    next[index] = replacements[key]
    seen.add(key)
  }
  const missing = Object.keys(replacements).filter((key) => !seen.has(key))
  if (missing.length) throw new Error(`Regional guide is missing guarded block keys: ${missing.join(', ')}`)
  return next
}

const [authority, regional, location] = await Promise.all([
  client.fetch(
    '*[_type == "blogPost" && slug.current == $slug][0]{_id,_rev,_type,title,"slug":slug.current,metaTitle,metaDescription,excerpt,updatedAt,category,content,faqs,relatedLocations,relatedSituations}',
    { slug: BASELINES.authority.slug },
  ),
  client.fetch(
    '*[_type == "blogPost" && slug.current == $slug][0]{_id,_rev,_type,title,"slug":slug.current,metaTitle,metaDescription,excerpt,updatedAt,content}',
    { slug: BASELINES.regional.slug },
  ),
  client.fetch(
    '*[_type == "location" && slug.current == $slug][0]{_id,_rev,_type,city,"slug":slug.current,metaTitle,metaDescription}',
    { slug: BASELINES.location.slug },
  ),
])

const aborts = []
const plans = []

if (!authority || !regional || !location) {
  aborts.push('One or more target documents could not be fetched.')
}

const authorityAlreadyDone = authority
  && authority.title === authorityNext.title
  && authority.metaTitle === authorityNext.metaTitle
  && authority.metaDescription === authorityNext.metaDescription
  && authority.excerpt === authorityNext.excerpt
  && authority.category === authorityNext.category
  && semanticDigest(authority.content || []) === semanticDigest(authorityNext.content)
  && semanticDigest(authority.faqs || []) === semanticDigest(authorityNext.faqs)

if (authority && !authorityAlreadyDone) {
  for (const field of ['title', 'metaTitle', 'metaDescription', 'excerpt', 'category']) {
    if (authority[field] !== BASELINES.authority[field]) {
      aborts.push(`${BASELINES.authority.slug}.${field}: baseline mismatch`)
    }
  }
  if (rawDigest(authority.content || []) !== BASELINES.authority.contentHash) {
    aborts.push(`${BASELINES.authority.slug}.content: SHA-256 baseline mismatch`)
  }
  if (rawDigest(authority.faqs || []) !== BASELINES.authority.faqHash) {
    aborts.push(`${BASELINES.authority.slug}.faqs: SHA-256 baseline mismatch`)
  }
  plans.push({
    doc: authority,
    patch: authorityNext,
    actions: [
      `replace ${authority.content?.length || 0} search-heavy blocks with ${authorityNext.content.length} source-led blocks`,
      'replace metadata, excerpt, FAQs, and invalid category',
      'preserve the existing Easton and tired-landlord references',
    ],
  })
}

let regionalNextContent = regional?.content || []
const regionalCurrentHash = rawDigest(regional?.content || [])
const regionalLooksDone = regional
  && !regional.content.some((block) => /610\) 628-0671/.test(blockText(block)))
  && regional.content.some((block) => block?._key === 'step1'
    && blockText(block) === 'Step 1: Contact us. Call (610) 904-8526 or fill out the form. Tell us about the property and your situation; there is no obligation to accept an offer.')
  && regional.content.some((block) => block?._key === 'close3'
    && blockText(block) === 'Call (610) 904-8526 or fill out the form for a no-obligation cash offer. We will review the property and explain the next step so you can compare the offer with your other options.')
  && regional.content.some((block) => block?._key === 'intro1' && (block.markDefs || []).some((mark) => mark.href === URLS.lehighHub))
  && regional.content.some((block) => block?._key === 'sit5' && (block.markDefs || []).some((mark) => mark.href === URLS.article))

if (regional && !regionalLooksDone) {
  if (regionalCurrentHash !== BASELINES.regional.contentHash) {
    aborts.push(`${BASELINES.regional.slug}.content: SHA-256 baseline mismatch`)
  } else {
    regionalNextContent = replaceRegionalContent(regional.content)
    plans.push({
      doc: regional,
      patch: { content: regionalNextContent },
      actions: [
        'replace the old phone number in both calls to action',
        'turn the commercial Lehigh Valley anchor into an internal hub link',
        'strengthen the Easton owner link and add a contextual authority-guide link',
        'replace unsupported urgency language with decision-focused copy',
      ],
    })
  }
}

const locationAlreadyDone = location
  && location.metaTitle === locationNext.metaTitle
  && location.metaDescription === locationNext.metaDescription

if (location && !locationAlreadyDone) {
  for (const field of ['metaTitle', 'metaDescription']) {
    if (location[field] !== BASELINES.location[field]) {
      aborts.push(`${BASELINES.location.slug}.${field}: baseline mismatch`)
    }
  }
  plans.push({
    doc: location,
    patch: locationNext,
    actions: [
      'align the title with the 104-impression sell-my-house-fast query',
      'use the description to qualify repair, tenant, and code-problem sellers',
    ],
  })
}

console.log(`=== EASTON AUTHORITY SPRINT — ${APPLY ? 'APPLY' : 'DRY RUN (no writes)'} ===`)
for (const plan of plans) {
  console.log(`\n${plan.doc._type}/${plan.doc.slug}`)
  for (const action of plan.actions) console.log(`  - ${action}`)
}

console.log(`\nNew lengths: title ${authorityNext.title.length}, meta title ${authorityNext.metaTitle.length}, meta description ${authorityNext.metaDescription.length}, excerpt ${authorityNext.excerpt.length}`)
console.log(`Easton location lengths: title ${locationNext.metaTitle.length}, description ${locationNext.metaDescription.length}`)

if (aborts.length) {
  console.error('\nABORT — current Sanity data does not match the guarded baseline:')
  for (const problem of aborts) console.error(`  - ${problem}`)
  console.error('Nothing written.')
  process.exit(2)
}

if (!plans.length) {
  console.log('\nSKIP — every targeted change is already present.')
  process.exit(0)
}

if (!APPLY) {
  console.log(`\nDRY RUN PASSED — ${plans.length} documents would change. Re-run with --apply to write.`)
  process.exit(0)
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const updatedAt = new Date().toISOString()
const backupDir = resolve(scriptDir, '../backups')
const backupPath = resolve(backupDir, `easton-authority-${stamp}.json`)
mkdirSync(backupDir, { recursive: true })
writeFileSync(backupPath, JSON.stringify(plans.map(({ doc }) => doc), null, 2))
console.log(`\nBackup written: ${backupPath}`)

let transaction = client.transaction()
for (const plan of plans) {
  transaction = transaction.patch(plan.doc._id, (patch) => {
    const fields = plan.doc._type === 'blogPost' ? { ...plan.patch, updatedAt } : plan.patch
    return patch.ifRevisionId(plan.doc._rev).set(fields)
  })
}
await transaction.commit()
console.log(`Committed ${plans.length} documents in one revision-guarded transaction.`)

const [afterAuthority, afterRegional, afterLocation] = await Promise.all([
  client.fetch(
    '*[_type == "blogPost" && slug.current == $slug][0]{title,metaTitle,metaDescription,excerpt,updatedAt,category,content,faqs,relatedLocations,relatedSituations}',
    { slug: BASELINES.authority.slug },
  ),
  client.fetch(
    '*[_type == "blogPost" && slug.current == $slug][0]{updatedAt,content}',
    { slug: BASELINES.regional.slug },
  ),
  client.fetch(
    '*[_type == "location" && slug.current == $slug][0]{metaTitle,metaDescription}',
    { slug: BASELINES.location.slug },
  ),
])

const verificationErrors = []
for (const field of ['title', 'metaTitle', 'metaDescription', 'excerpt', 'category']) {
  if (afterAuthority?.[field] !== authorityNext[field]) verificationErrors.push(`authority.${field}`)
}
if (semanticDigest(afterAuthority?.content || []) !== semanticDigest(authorityNext.content)) verificationErrors.push('authority.content')
if (semanticDigest(afterAuthority?.faqs || []) !== semanticDigest(authorityNext.faqs)) verificationErrors.push('authority.faqs')
if ((afterAuthority?.relatedLocations || []).length !== 1) verificationErrors.push('authority.relatedLocations')
if ((afterAuthority?.relatedSituations || []).length !== 1) verificationErrors.push('authority.relatedSituations')
if (!afterAuthority?.updatedAt) verificationErrors.push('authority.updatedAt')

if ((afterRegional?.content || []).some((block) => /610\) 628-0671/.test(blockText(block)))) verificationErrors.push('regional.wrongDirectAttributionPhone')
if (!(afterRegional?.content || []).some((block) => block?._key === 'step1'
  && blockText(block) === 'Step 1: Contact us. Call (610) 904-8526 or fill out the form. Tell us about the property and your situation; there is no obligation to accept an offer.')) verificationErrors.push('regional.step1Phone')
if (!(afterRegional?.content || []).some((block) => block?._key === 'close3'
  && blockText(block) === 'Call (610) 904-8526 or fill out the form for a no-obligation cash offer. We will review the property and explain the next step so you can compare the offer with your other options.')) verificationErrors.push('regional.close3Phone')
if (!(afterRegional?.content || []).some((block) => block?._key === 'intro1' && (block.markDefs || []).some((mark) => mark.href === URLS.lehighHub))) verificationErrors.push('regional.hubLink')
if (!(afterRegional?.content || []).some((block) => block?._key === 'sit5' && (block.markDefs || []).some((mark) => mark.href === URLS.article))) verificationErrors.push('regional.authorityLink')
if (!afterRegional?.updatedAt) verificationErrors.push('regional.updatedAt')

for (const field of ['metaTitle', 'metaDescription']) {
  if (afterLocation?.[field] !== locationNext[field]) verificationErrors.push(`location.${field}`)
}

if (verificationErrors.length) {
  console.error(`\nREAD-BACK FAILED: ${verificationErrors.join(', ')}`)
  process.exit(1)
}

console.log('\nREAD-BACK PASSED — article, links, phone number, and Easton snippet match the intended state.')
