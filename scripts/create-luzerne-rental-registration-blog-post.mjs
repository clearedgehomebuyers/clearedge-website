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

// Helper to create a text block
const textBlock = (key, text, style = 'normal') => ({
  _type: 'block',
  _key: key,
  style,
  children: [{ _type: 'span', _key: `${key}s1`, text, marks: [] }],
  markDefs: []
})

// Helper to create a block with mixed content (bold, links, etc.)
const mixedBlock = (key, children, markDefs = [], style = 'normal') => ({
  _type: 'block',
  _key: key,
  style,
  children: children.map((child, i) => ({
    _type: 'span',
    _key: `${key}s${i}`,
    text: child.text,
    marks: child.marks || []
  })),
  markDefs
})

const blogPost = {
  _type: 'blogPost',
  title: 'Luzerne County Rental Property Registration and Inspection Requirements 2026: The Complete Landlord Guide',
  slug: { _type: 'slug', current: 'luzerne-county-rental-property-registration-inspection-requirements-2026' },
  metaTitle: 'Luzerne County Rental Property Registration & Inspection Requirements 2026',
  metaDescription: 'Complete guide to Luzerne County rental property registration and inspection requirements for 2026. Covers Wilkes-Barre, Hazleton, Pittston, Kingston fees, deadlines, and how to pass inspections.',
  excerpt: 'Complete guide to Luzerne County rental property registration and inspection requirements for 2026. Covers Wilkes-Barre, Hazleton, Pittston, Kingston fees, deadlines, and how to pass inspections.',
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2026-01-08T10:00:00Z',
  category: 'situations',

  faqs: [
    {
      _key: 'faq1',
      question: 'Does Luzerne County have a county-wide rental registration program?',
      answer: 'No. There is no county-wide rental registration in Luzerne County. Each of the 76 municipalities sets its own requirements. Always check with your specific city, borough, or township.'
    },
    {
      _key: 'faq2',
      question: 'How much does rental registration cost in Wilkes-Barre?',
      answer: 'In Wilkes-Barre, the license fee is $50 per building and the inspection fee is $100 per rental unit. These are due every two years or when you get a new tenant.'
    },
    {
      _key: 'faq3',
      question: 'What happens if I don\'t register my rental property?',
      answer: 'Penalties vary by municipality. In Wilkes-Barre, you face fines up to $500, potential jail time of 30 days, or both. Other municipalities have similar penalty structures.'
    },
    {
      _key: 'faq4',
      question: 'Do I need a local agent if I live out of town?',
      answer: 'It depends on the municipality. Hazleton requires a local agent within 10 miles. Pittston requires a property manager within 20 miles. Check your specific municipality\'s requirements.'
    },
    {
      _key: 'faq5',
      question: 'How often do rental inspections occur?',
      answer: 'Most municipalities require inspections every 2-3 years. Wilkes-Barre and Pittston are every 2 years. Some municipalities also require inspections when tenants change.'
    },
    {
      _key: 'faq6',
      question: 'What do inspectors check during a rental inspection?',
      answer: 'Common inspection items include smoke detectors, carbon monoxide detectors, fire extinguishers, handrails, egress windows, electrical systems, plumbing, heating, and general structural safety.'
    },
    {
      _key: 'faq7',
      question: 'Do smoke detectors expire?',
      answer: 'Yes. Smoke detectors have a 10-year lifespan. Inspectors check the manufacture date on the back of each unit. Even if they test fine, detectors over 10 years old fail inspection.'
    },
    {
      _key: 'faq8',
      question: 'Can I sell a rental property that isn\'t registered?',
      answer: 'Yes. If you\'re looking to sell rather than deal with registration requirements, companies like ClearEdge Home Buyers purchase properties as-is with no inspection contingencies.'
    }
  ],

  content: [
    // Intro
    mixedBlock('intro1', [
      { text: 'Luzerne County rental property registration and inspection requirements', marks: ['strong'] },
      { text: ' trip up more landlords than you\'d think.' }
    ]),
    textBlock('intro2', 'I\'ve seen investors lose thousands in fines because they didn\'t know Wilkes-Barre has different rules than Hazleton.'),
    textBlock('intro3', 'Or that Pittston requires something completely different from Kingston.'),
    textBlock('intro4', 'Here\'s the thing most people miss:'),
    mixedBlock('intro5', [{ text: 'There is no county-wide rental registration program.', marks: ['strong'] }]),
    textBlock('intro6', 'Each municipality in Luzerne County sets its own rules.'),
    textBlock('intro7', 'That means 76 different municipalities with potentially 76 different sets of requirements.'),
    textBlock('intro8', 'Since 2016, when I bought my first rental duplex on Birch Street in Scranton, I\'ve navigated these regulations across Eastern PA hundreds of times.'),
    textBlock('intro9', 'Let me break down exactly what you need to know for 2026.'),

    // H2: Why It Matters
    textBlock('h2why', 'Why Luzerne County Rental Registration Matters in 2026', 'h2'),
    textBlock('why1', 'Skip registration and you\'re looking at real consequences.'),
    textBlock('why2', 'In Wilkes-Barre alone, failure to obtain a rental inspection and license can hit you with a $500 fine, 30 days imprisonment, or both.'),
    textBlock('why3', 'That\'s not a typo.'),
    textBlock('why4', 'Jail time for not registering your rental.'),
    textBlock('why5', 'Beyond the legal stuff, unregistered properties create real problems:'),
    textBlock('why6', '• You can\'t legally collect rent or pursue evictions in many municipalities'),
    textBlock('why7', '• Insurance claims can get denied'),
    textBlock('why8', '• Title issues pop up when you try to sell'),
    textBlock('why9', '• Tenants can use non-compliance against you in court'),
    textBlock('why10', 'The municipalities implemented these programs for good reasons - tenant safety, property maintenance standards, and code enforcement.'),
    textBlock('why11', 'As someone who\'s helped over 200 homeowners sell properties across NEPA, I\'ve seen what happens when landlords ignore these requirements.'),
    textBlock('why12', 'It\'s never pretty.'),

    // H2: Wilkes-Barre
    textBlock('h2wb', 'Wilkes-Barre Rental License and Inspection Requirements', 'h2'),
    mixedBlock('wb1', [
      { text: '' },
      { text: 'Wilkes-Barre', marks: ['wbLink'] },
      { text: ' runs one of the most comprehensive rental inspection programs in Luzerne County.' }
    ], [{ _type: 'link', _key: 'wbLink', href: '/locations/wilkes-barre' }]),
    textBlock('wb2', 'Here\'s the breakdown:'),
    mixedBlock('wb3', [{ text: 'License Fee:', marks: ['strong'] }, { text: ' $50 per building' }]),
    mixedBlock('wb4', [{ text: 'Inspection Fee:', marks: ['strong'] }, { text: ' $100 per rental unit' }]),
    mixedBlock('wb5', [{ text: 'Renewal Cycle:', marks: ['strong'] }, { text: ' Every 2 years or upon securing a new tenant' }]),
    mixedBlock('wb6', [{ text: 'Payment:', marks: ['strong'] }, { text: ' Due at time of inspection. No cash accepted.' }]),
    mixedBlock('wb7', [{ text: 'Contact:', marks: ['strong'] }, { text: ' Wilkes-Barre Health Department Rental Inspection Division at 570-208-4268' }]),
    textBlock('wb8', 'The process works like this:'),
    textBlock('wb9', '1. Complete the Residential Property Rental License and Inspection Application'),
    textBlock('wb10', '2. Submit to the City of Wilkes-Barre Health Department (mail or in person)'),
    textBlock('wb11', '3. Wait for the rental inspector to contact you'),
    textBlock('wb12', '4. Schedule your inspection'),
    textBlock('wb13', '5. Pay fees and receive your certificate upon passing'),
    textBlock('wb14', 'The registration certificate must be displayed in a prominent location in the rental property.'),
    textBlock('wb15', 'Usually somewhere near the front entrance.'),

    // H2: Hazleton
    textBlock('h2haz', 'Hazleton Rental Property Registration Rules', 'h2'),
    mixedBlock('haz1', [
      { text: '' },
      { text: 'Hazleton', marks: ['hazLink'] },
      { text: ' restructured their rental regulations in October 2022.' }
    ], [{ _type: 'link', _key: 'hazLink', href: '/locations/hazleton' }]),
    textBlock('haz2', 'Here\'s what changed and what you need to know:'),
    textBlock('haz3', 'The city now classifies rental properties as businesses.'),
    textBlock('haz4', 'Makes sense when you think about it - the latest Census data shows nearly 60% of residential properties in Hazleton are not owner-occupied.'),
    textBlock('haz5', 'With over 10,000 parcels in the city, that\'s 6,000+ properties with money changing hands.'),
    mixedBlock('haz6', [{ text: 'Key Requirements:', marks: ['strong'] }]),
    textBlock('haz7', '• Register with Code Enforcement within 30 days of becoming the property owner'),
    textBlock('haz8', '• Business license required for rental property owners'),
    textBlock('haz9', '• Certificate of Use and Occupancy needed'),
    mixedBlock('haz10', [
      { text: '• ' },
      { text: 'Local agent required if owner lives more than 10 miles from city limits', marks: ['strong'] }
    ]),
    textBlock('haz11', 'That last point catches a lot of out-of-town investors off guard.'),
    textBlock('haz12', 'If you don\'t live within a 10-mile air radius of Hazleton city limits, you must appoint an agent who does.'),
    mixedBlock('haz13', [{ text: 'Inspection Fees:', marks: ['strong'] }, { text: ' $75 per dwelling unit (if scheduled 15 days in advance) or $150 per commercial unit' }]),
    textBlock('haz14', 'Inspectors check for smoke detectors, fire extinguishers, stairway guardrails, hot water/heat/sewer, broken glass, and general health and safety issues.'),
    textBlock('haz15', 'Contact the Hazleton Code Enforcement Office at 570-459-4960 for current forms and requirements.'),

    // H2: Pittston
    textBlock('h2pit', 'City of Pittston Rental Inspection Program', 'h2'),
    textBlock('pit1', 'Pittston takes rental compliance seriously.'),
    textBlock('pit2', 'Every residential unit let out for rent or lease requires a rental property maintenance certificate.'),
    textBlock('pit3', 'Before occupation.'),
    textBlock('pit4', 'And every two years thereafter.'),
    mixedBlock('pit5', [{ text: 'Fee Structure:', marks: ['strong'] }]),
    textBlock('pit6', '• Inspection fee: $100 (valid for two years)'),
    textBlock('pit7', '• Works out to $50 per unit per year'),
    mixedBlock('pit8', [{ text: 'What They Inspect:', marks: ['strong'] }]),
    textBlock('pit9', '• Smoke and carbon monoxide detectors'),
    textBlock('pit10', '• Fire extinguishers'),
    textBlock('pit11', '• Heating systems'),
    textBlock('pit12', '• Electrical safety'),
    textBlock('pit13', '• Plumbing'),
    textBlock('pit14', '• Structural integrity'),
    textBlock('pit15', '• Compliance with Property Maintenance Code and Zoning Ordinance'),
    mixedBlock('pit16', [{ text: 'Property Manager Requirement:', marks: ['strong'] }]),
    textBlock('pit17', 'If you\'re an out-of-area landlord, you need a property manager who lives within 20 miles of Pittston.'),
    textBlock('pit18', 'They must provide a telephone number and residence mailing address (no P.O. boxes) to the Code Enforcement Officer.'),
    textBlock('pit19', 'Pittston has at least 1,700 rental properties under their jurisdiction.'),

    // H2: Kingston
    textBlock('h2king', 'Kingston Municipality Landlord Registration Requirements', 'h2'),
    textBlock('king1', 'Kingston enacted its Landlord Registration, Licensing and Occupancy Ordinance in 2014.'),
    textBlock('king2', 'The purpose is pretty straightforward:'),
    textBlock('king3', '• Protect public health, safety, and welfare'),
    textBlock('king4', '• Maintain a current record of all rental properties and tenants'),
    textBlock('king5', '• Reduce blight within the municipality'),
    mixedBlock('king6', [{ text: 'Key Requirements:', marks: ['strong'] }]),
    textBlock('king7', 'Every owner/landlord of a residential rental unit must register with the Code Enforcement Officer.'),
    textBlock('king8', 'The rental license is required for lawful rental and occupancy of residential rental units.'),
    textBlock('king9', 'The registration period runs calendar year - January 1 through December 31.'),
    textBlock('king10', 'Contact Kingston at 570-288-4576 for current fee schedules and application forms.'),

    // H2: Nanticoke
    textBlock('h2nan', 'Nanticoke Rental Property Occupancy Permits', 'h2'),
    textBlock('nan1', 'Nanticoke has its own rental property ordinance that every landlord needs to understand.'),
    mixedBlock('nan2', [{ text: 'Registration Timeline:', marks: ['strong'] }]),
    textBlock('nan3', 'Submit your report to the Code Enforcement Officer within 30 days of becoming a landlord of any property in the city.'),
    mixedBlock('nan4', [{ text: 'Required Information:', marks: ['strong'] }]),
    textBlock('nan5', '• List of all dwelling units and business units you own (occupied or not)'),
    textBlock('nan6', '• Report any changes in use or occupancy'),
    textBlock('nan7', '• Names of new tenants, change dates, and forwarding addresses of previous tenants'),
    mixedBlock('nan8', [{ text: 'Occupancy Permit Process:', marks: ['strong'] }]),
    textBlock('nan9', 'Upon application and fee payment, the Code Enforcement Officer reviews city records and inspects the premises.'),
    textBlock('nan10', 'If no violations exist, they issue an occupancy permit containing:'),
    textBlock('nan11', '• Street address or property description'),
    textBlock('nan12', '• Names of tenant(s) and landlord'),
    textBlock('nan13', '• Statement of variances and use permits (if any)'),
    textBlock('nan14', '• Confirmation of code compliance'),

    // H2: Plymouth
    textBlock('h2ply', 'Plymouth Borough Rental Registration', 'h2'),
    textBlock('ply1', 'Plymouth has a straightforward annual registration requirement.'),
    mixedBlock('ply2', [{ text: 'Deadline:', marks: ['strong'] }, { text: ' All residential units must be registered with the Code Enforcement Officer on or before October 1 of each year.' }]),
    mixedBlock('ply3', [{ text: 'What Counts as a Rental Unit:', marks: ['strong'] }]),
    textBlock('ply4', 'Any structure within the Borough where the owner receives any value - money, barter, or exchange of goods or services.'),
    textBlock('ply5', 'Each apartment within a building counts as a separate unit requiring a license.'),
    mixedBlock('ply6', [{ text: 'New Conversions:', marks: ['strong'] }]),
    textBlock('ply7', 'If you convert any structure to a rental unit, register it immediately.'),
    mixedBlock('ply8', [{ text: 'Landlord Responsibilities:', marks: ['strong'] }]),
    textBlock('ply9', '• Keep units compliant with all PA laws and Borough ordinances'),
    textBlock('ply10', '• Maintain property in good and safe condition'),
    textBlock('ply11', '• Use legal means to evict tenants who routinely engage in disorderly conduct'),
    textBlock('ply12', '"Routinely engaged" means three or more violations within any thirty-day period.'),

    // H2: What Inspectors Look For
    textBlock('h2look', 'What Luzerne County Rental Inspectors Look For', 'h2'),
    textBlock('look1', 'While each municipality has slight variations, most rental inspections across Luzerne County check the same core items.'),
    mixedBlock('look2', [{ text: 'Fire and Safety:', marks: ['strong'] }]),
    textBlock('look3', '• Smoke detectors in each sleeping room and on every level'),
    textBlock('look4', '• Carbon monoxide detectors within 10 feet of sleeping areas'),
    textBlock('look5', '• Fire extinguishers'),
    textBlock('look6', '• Detectors must be less than 10 years old (check manufacture date on back)'),
    mixedBlock('look7', [{ text: 'Structural and Exterior:', marks: ['strong'] }]),
    textBlock('look8', '• Handrails required where there are 4+ risers or over 30 inches in height'),
    textBlock('look9', '• Decks and porches secure, free from loose or rotten boards'),
    textBlock('look10', '• Roof, chimney, siding, gutters intact'),
    textBlock('look11', '• No broken glass or windows'),
    mixedBlock('look12', [{ text: 'Egress Requirements:', marks: ['strong'] }]),
    textBlock('look13', '• Each bedroom needs emergency escape window'),
    textBlock('look14', '• Exit doors must open from inside without key or special knowledge'),
    textBlock('look15', '• Second means of egress for buildings two stories or more'),
    mixedBlock('look16', [{ text: 'Systems:', marks: ['strong'] }]),
    textBlock('look17', '• Hot water and heating operational'),
    textBlock('look18', '• Plumbing with no leaks'),
    textBlock('look19', '• Electrical with no exposed wiring or improper connections'),
    textBlock('look20', '• GFCI outlets in bathrooms and kitchens'),

    // H2: PA State Requirements
    textBlock('h2state', 'Pennsylvania State Landlord Requirements That Apply Everywhere', 'h2'),
    textBlock('state1', 'Beyond municipal regulations, Pennsylvania state law imposes requirements on all landlords.'),
    mixedBlock('state2', [{ text: 'Habitability Standards:', marks: ['strong'] }]),
    textBlock('state3', 'You cannot legally rent property unless it meets basic health and safety requirements.'),
    textBlock('state4', 'This includes:'),
    textBlock('state5', '• Running water (hot and cold)'),
    textBlock('state6', '• Working heating system'),
    textBlock('state7', '• Functioning electrical'),
    textBlock('state8', '• Weatherproof structure'),
    textBlock('state9', '• Proper sanitation'),
    mixedBlock('state10', [{ text: 'Security Deposit Rules:', marks: ['strong'] }]),
    textBlock('state11', '• Maximum 2 months rent during first year'),
    textBlock('state12', '• Maximum 1 month rent after first year'),
    textBlock('state13', '• Must be held in escrow account or bonded'),
    textBlock('state14', '• Return within 30 days of lease termination'),
    textBlock('state15', '• Interest required after 2 years'),
    mixedBlock('state16', [{ text: 'Required Disclosures:', marks: ['strong'] }]),
    textBlock('state17', '• Lead-based paint disclosure for pre-1978 properties'),
    textBlock('state18', '• Names and addresses of property owners/managers'),
    textBlock('state19', '• Utility responsibility clarification'),

    // H2: How to Pass
    textBlock('h2pass', 'How to Pass Your Luzerne County Rental Inspection the First Time', 'h2'),
    textBlock('pass1', 'Failed inspections cost money and time.'),
    textBlock('pass2', 'Re-inspection fees add up.'),
    textBlock('pass3', 'Here\'s my pre-inspection checklist after doing this hundreds of times:'),
    mixedBlock('pass4', [{ text: 'Two Weeks Before:', marks: ['strong'] }]),
    textBlock('pass5', '• Check all smoke detector manufacture dates - replace if over 10 years old'),
    textBlock('pass6', '• Test every smoke and CO detector'),
    textBlock('pass7', '• Verify fire extinguishers are charged and accessible'),
    textBlock('pass8', '• Check all handrails for stability'),
    mixedBlock('pass9', [{ text: 'One Week Before:', marks: ['strong'] }]),
    textBlock('pass10', '• Test all windows open and stay open without props'),
    textBlock('pass11', '• Check bedroom egress windows meet size requirements'),
    textBlock('pass12', '• Ensure all doors open from inside without keys'),
    textBlock('pass13', '• Test GFCI outlets in kitchen and bathroom'),
    mixedBlock('pass14', [{ text: 'Day Before:', marks: ['strong'] }]),
    textBlock('pass15', '• Make sure utilities are on'),
    textBlock('pass16', '• Clear access to electrical panel'),
    textBlock('pass17', '• Clear access to water heater and furnace'),
    textBlock('pass18', '• Remove any clutter blocking exits'),

    // H2: Common Failures
    textBlock('h2fail', 'Common Rental Inspection Failures in Luzerne County', 'h2'),
    textBlock('fail1', 'After seeing hundreds of inspections, these are the most common failures:'),
    mixedBlock('fail2', [{ text: '1. Outdated Smoke Detectors', marks: ['strong'] }]),
    textBlock('fail3', 'The 10-year rule catches everyone. Detectors can still chirp and seem fine but fail inspection if manufactured more than 10 years ago.'),
    mixedBlock('fail4', [{ text: '2. Missing or Improper Handrails', marks: ['strong'] }]),
    textBlock('fail5', 'Four or more risers need handrails. Period. And they need to be 26-38 inches above stair nosing.'),
    mixedBlock('fail6', [{ text: '3. Egress Window Issues', marks: ['strong'] }]),
    textBlock('fail7', 'Bedroom windows painted shut or too small. Minimum 20" x 20" or 5 square feet opening.'),
    mixedBlock('fail8', [{ text: '4. No Carbon Monoxide Detectors', marks: ['strong'] }]),
    textBlock('fail9', 'Any fuel-burning appliance - gas furnace, water heater, even wood fireplace - means you need CO detectors.'),
    mixedBlock('fail10', [{ text: '5. GFCI Outlets', marks: ['strong'] }]),
    textBlock('fail11', 'Older properties often lack GFCI outlets in bathrooms and kitchens. Easy fix but frequently missed.'),

    // H2: When Selling Beats Registration
    textBlock('h2sell', 'When Selling a Rental Property Beats Dealing with Registration', 'h2'),
    textBlock('sell1', 'Sometimes the rental registration requirements reveal bigger problems.'),
    textBlock('sell2', 'I\'ve worked with landlords who discover their properties need:'),
    textBlock('sell3', '• Complete electrical rewiring'),
    textBlock('sell4', '• New heating systems'),
    textBlock('sell5', '• Foundation repairs'),
    textBlock('sell6', '• Major code compliance upgrades'),
    textBlock('sell7', 'The math doesn\'t always work.'),
    textBlock('sell8', 'When you\'re facing $30,000 in repairs on a property worth $80,000, selling as-is often makes more sense.'),
    textBlock('sell9', 'That\'s exactly what we do at ClearEdge Home Buyers.'),
    textBlock('sell10', 'We buy properties in any condition throughout Luzerne County - no inspections required, no repairs needed.'),

    // H2: Final Thoughts
    textBlock('h2final', 'Final Thoughts on Luzerne County Rental Property Registration and Inspection Requirements', 'h2'),
    textBlock('fin1', 'Luzerne County rental property registration and inspection requirements aren\'t complicated once you understand the municipal-level approach.'),
    textBlock('fin2', 'The key takeaways:'),
    textBlock('fin3', '• No county-wide program exists - check your specific municipality'),
    textBlock('fin4', '• Most programs require registration and periodic inspections (usually every 2 years)'),
    textBlock('fin5', '• Out-of-area landlords often need local agents or property managers'),
    textBlock('fin6', '• Penalties for non-compliance are serious'),
    textBlock('fin7', 'I\'ve been investing in Eastern Pennsylvania since 2016.'),
    textBlock('fin8', 'I\'ve helped over 200 homeowners navigate difficult property situations.'),
    textBlock('fin9', 'Whether you\'re looking to stay compliant with your rentals or considering selling a property that\'s become more hassle than it\'s worth, the first step is knowing your options.'),
    mixedBlock('fin10', [
      { text: 'Learn more about ClearEdge Home Buyers\' simple 3-step selling process: ' },
      { text: 'How It Works', marks: ['howLink'] }
    ], [{ _type: 'link', _key: 'howLink', href: '/how-it-works' }]),
    mixedBlock('fin11', [
      { text: 'Want a FREE, no-obligation cash offer on your Eastern PA home? ' },
      { text: 'Request your offer here', marks: ['homeLink'] }
    ], [{ _type: 'link', _key: 'homeLink', href: '/' }]),
    mixedBlock('fin12', [
      { text: 'Understanding Luzerne County rental property registration and inspection requirements for 2026 puts you ahead of most landlords', marks: ['strong'] },
      { text: ' - now go get compliant.' }
    ]),

    // Author bio
    mixedBlock('bio', [
      { text: 'Tyler Swenson is a real estate investor, property specialist, and community advocate serving Eastern Pennsylvania. He is the founder of ClearEdge Home Buyers, a trusted cash home buying company that has helped over 200 homeowners across NEPA, Lehigh Valley, and the Poconos sell their properties quickly and hassle-free—a business he built from the ground up starting with a single duplex in 2016. Tyler is also a recognized voice in Pennsylvania\'s real estate investment community, having been featured in The Morning Call and Lehigh Valley Business, and regularly speaks at REIA meetups throughout Eastern PA.', marks: ['em'] }
    ]),
  ]
}

async function main() {
  console.log('Starting Luzerne County rental registration blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

  try {
    // Fetch location references for Luzerne County
    console.log('\nFetching Luzerne County location references...')
    const locations = await client.fetch(
      `*[_type == "location" && (
        city in ["Wilkes-Barre", "Hazleton", "Pittston", "Kingston", "Nanticoke", "Plymouth"] ||
        county == "Luzerne County"
      )]{ _id, city, county, slug }`
    )

    console.log(`Found ${locations.length} location(s):`)
    locations.forEach(loc => {
      console.log(`  - ${loc.city} (${loc.county || 'No county'}) - slug: ${loc.slug?.current}`)
    })

    // Fetch situation references
    console.log('\nFetching situation references...')
    const situations = await client.fetch(
      `*[_type == "situation" && (
        slug.current in ["rental-property", "landlord", "investment-property"]
      )]{ _id, title, slug }`
    )
    console.log('Found situations:', situations.map(s => s.title))

    // Build location references
    const locationRefs = locations.map(loc => ({
      _type: 'reference',
      _ref: loc._id,
      _key: `loc_${loc._id.replace(/[^a-zA-Z0-9]/g, '_')}`
    }))

    // Build situation references
    const situationRefs = situations.map(sit => ({
      _type: 'reference',
      _ref: sit._id,
      _key: `sit_${sit._id.replace(/[^a-zA-Z0-9]/g, '_')}`
    }))

    // Build the complete document
    const doc = {
      ...blogPost,
      relatedLocations: locationRefs,
      relatedSituations: situationRefs
    }

    console.log('\nCreating blog post...')
    const result = await client.create(doc)
    console.log('\n✅ Blog post created successfully!')
    console.log('Document ID:', result._id)
    console.log('Title:', result.title)
    console.log('Slug:', result.slug.current)
    console.log('Published Date:', result.publishedAt)
    console.log(`\nRelated Locations: ${locationRefs.length}`)
    console.log(`Related Situations: ${situationRefs.length}`)
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/luzerne-county-rental-property-registration-inspection-requirements-2026')

    // Verify the creation
    console.log('\nVerifying creation...')
    const verifyPost = await client.fetch(
      `*[_id == $id][0]{
        _id,
        title,
        slug,
        publishedAt,
        "locationCount": count(relatedLocations),
        "situationCount": count(relatedSituations),
        "relatedLocations": relatedLocations[]->{ city, county }
      }`,
      { id: result._id }
    )

    console.log('\nVerification:')
    console.log('  Title:', verifyPost.title)
    console.log('  Published:', verifyPost.publishedAt)
    console.log('  Location tags:', verifyPost.locationCount)
    if (verifyPost.relatedLocations) {
      verifyPost.relatedLocations.forEach(loc => {
        console.log(`    - ${loc.city} (${loc.county})`)
      })
    }
    console.log('  Situation tags:', verifyPost.situationCount)

    return result
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', error.response)
    }
    throw error
  }
}

main()
