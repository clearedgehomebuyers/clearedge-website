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
  title: 'How to Sell a Hoarder House in Reading, PA Without a Cleanout',
  slug: { _type: 'slug', current: 'sell-hoarder-house-reading-pa-without-cleanout' },
  metaTitle: 'Sell Hoarder House Reading PA Without Cleanout | No Cleaning Needed',
  metaDescription: 'Own a hoarder house in Reading PA? Skip the $10,000+ cleanout. We buy hoarder homes as-is in 19601, 19602, 19604. Get a fair cash offer with zero cleanup.',
  excerpt: 'Own a hoarder house in Reading PA? Skip the expensive cleanout. Learn how to sell your hoarder home as-is for cash with no cleaning, no repairs, and no hassle.',
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2025-11-12T10:00:00Z',
  category: 'situations',

  faqs: [
    {
      _key: 'faq1',
      question: 'Can I really sell a hoarder house without cleaning it?',
      answer: 'Yes. Cash buyers like ClearEdge Home Buyers specialize in buying homes as-is. We handle all cleanout and repairs after closing. You don\'t touch a thing.'
    },
    {
      _key: 'faq2',
      question: 'How much less will I get selling as-is vs. cleaning first?',
      answer: 'It depends on the property. But when you factor in $10,000+ cleanout costs, months of carrying costs (taxes, insurance, utilities), and the risk of discovering major repairs—most sellers come out ahead selling as-is.'
    },
    {
      _key: 'faq3',
      question: 'Do you buy hoarder houses in all of Reading\'s zip codes?',
      answer: 'Yes. We buy properties throughout Reading including 19601, 19602, 19604, and the surrounding Berks County area.'
    },
    {
      _key: 'faq4',
      question: 'What if the hoarding is extreme—like floor to ceiling in every room?',
      answer: 'We\'ve handled severe cases. If we can\'t physically walk through, we work with photos and exterior inspection. We\'ve purchased homes where you literally could not open the front door.'
    },
    {
      _key: 'faq5',
      question: 'How fast can you close?',
      answer: 'As fast as 7 days if needed. Most closings happen within 2-3 weeks.'
    },
    {
      _key: 'faq6',
      question: 'Do I need to be local to sell?',
      answer: 'No. Many of our sellers live out of state and inherited the property. We handle everything remotely and coordinate with local title companies.'
    },
    {
      _key: 'faq7',
      question: 'What happens to the stuff after I sell?',
      answer: 'Our crews sort through everything. Usable items get donated. Recyclables get recycled. The rest goes to proper disposal. Hazardous materials are handled according to regulations.'
    },
    {
      _key: 'faq8',
      question: 'Will you buy a hoarder house with code violations?',
      answer: 'Yes. We regularly purchase properties with active code violations and handle resolution after closing.'
    }
  ],

  content: [
    // Intro
    mixedBlock('intro1', [
      { text: 'How to sell a hoarder house in Reading, PA without a cleanout', marks: ['strong'] },
      { text: '—that\'s what you\'re here for.' }
    ]),
    textBlock('intro2', 'Maybe you inherited the property.'),
    textBlock('intro3', 'Maybe it was a parent who couldn\'t let go of anything.'),
    textBlock('intro4', 'Maybe it\'s your own situation and you\'re not sure how to dig out.'),
    textBlock('intro5', 'Whatever the story, you\'re staring at rooms packed floor to ceiling.'),
    textBlock('intro6', 'And every cleanout company wants $5,000, $10,000, even $15,000 to haul it all away.'),
    textBlock('intro7', 'Here\'s the thing most people don\'t realize:'),
    mixedBlock('intro8', [
      { text: 'You don\'t have to clean out a hoarder house to sell it.', marks: ['strong'] }
    ]),
    textBlock('intro9', 'I\'m Tyler Swenson, founder of ClearEdge Home Buyers.'),
    textBlock('intro10', 'Since 2016, I\'ve bought hundreds of properties across Eastern Pennsylvania—including more hoarder houses than I can count.'),
    textBlock('intro11', 'We buy them exactly as they sit.'),
    textBlock('intro12', 'No dumpsters.'),
    textBlock('intro13', 'No cleaning crews.'),
    textBlock('intro14', 'No sorting through decades of belongings.'),
    textBlock('intro15', 'Let me show you exactly how this works in Reading.'),

    // H2: Why Hard to Sell Traditional
    textBlock('h2hard', 'Why Hoarder Houses in Reading Are Hard to Sell the Traditional Way', 'h2'),
    textBlock('hard1', 'Reading has some of the most affordable housing in Pennsylvania.'),
    textBlock('hard2', 'Median home values here run around $165,000-$200,000—well below the state average.'),
    textBlock('hard3', 'That\'s good news if you\'re buying.'),
    textBlock('hard4', 'It\'s complicated news if you\'re trying to sell a hoarder house.'),
    textBlock('hard5', 'Here\'s why:'),
    mixedBlock('hard6', [{ text: 'Tight margins.', marks: ['strong'] }]),
    textBlock('hard7', 'Traditional buyers look at a hoarder house and see risk.'),
    textBlock('hard8', 'They see unknown repairs hiding under the clutter.'),
    textBlock('hard9', 'They see pest damage, mold, structural issues.'),
    textBlock('hard10', 'And in a market where homes are already affordable, they\'re not willing to pay top dollar for problems.'),
    mixedBlock('hard11', [{ text: 'Financing nightmares.', marks: ['strong'] }]),
    textBlock('hard12', 'Banks won\'t touch hoarder houses.'),
    textBlock('hard13', 'FHA, VA, conventional loans—they all require the property to be in "habitable" condition.'),
    textBlock('hard14', 'If an appraiser can\'t walk through the house safely, the loan gets denied.'),
    textBlock('hard15', 'That eliminates 90% of potential buyers.'),
    mixedBlock('hard16', [{ text: 'Realtor reluctance.', marks: ['strong'] }]),
    textBlock('hard17', 'Most agents don\'t want the listing.'),
    textBlock('hard18', 'They can\'t take proper photos.'),
    textBlock('hard19', 'They can\'t do showings.'),
    textBlock('hard20', 'And they know the house will sit on the market embarrassing their portfolio.'),
    textBlock('hard21', 'This is why hoarder houses in Reading\'s 19601, 19602, and 19604 zip codes often sit unsold for months—or get sold for way less than they\'re worth.'),

    // H2: Real Cost of Cleanout
    textBlock('h2cost', 'The Real Cost of Cleaning Out a Hoarder House in Pennsylvania', 'h2'),
    textBlock('cost1', 'Let\'s talk numbers.'),
    textBlock('cost2', 'The average cost to clean out a hoarder house in Pennsylvania runs around $10,350.'),
    textBlock('cost3', 'That\'s for a level 3 hoarder situation in an average 2,500 square foot home.'),
    textBlock('cost4', 'But here in Reading?'),
    textBlock('cost5', 'The homes are smaller—lots of row houses, attached homes, duplexes.'),
    textBlock('cost6', 'That doesn\'t always mean cheaper.'),
    mixedBlock('cost7', [{ text: 'Here\'s what drives the cost:', marks: ['strong'] }]),
    mixedBlock('cost8', [
      { text: '• ' },
      { text: 'Junk removal:', marks: ['strong'] },
      { text: ' $1,000-$4,000 depending on volume' }
    ]),
    mixedBlock('cost9', [
      { text: '• ' },
      { text: 'Dumpster rentals:', marks: ['strong'] },
      { text: ' $500-$700 per load' }
    ]),
    mixedBlock('cost10', [
      { text: '• ' },
      { text: 'Deep cleaning:', marks: ['strong'] },
      { text: ' $25-$100 per hour per cleaner' }
    ]),
    mixedBlock('cost11', [
      { text: '• ' },
      { text: 'Biohazard remediation:', marks: ['strong'] },
      { text: ' $1,500-$5,000 if mold, animal waste, or other hazards are present' }
    ]),
    mixedBlock('cost12', [
      { text: '• ' },
      { text: 'Dump fees:', marks: ['strong'] },
      { text: ' Varies by weight and material type' }
    ]),
    mixedBlock('cost13', [
      { text: '• ' },
      { text: 'Pest control:', marks: ['strong'] },
      { text: ' Often needed before cleanout can even begin' }
    ]),
    textBlock('cost14', 'And that\'s BEFORE you discover what\'s under all that stuff.'),
    textBlock('cost15', 'I\'ve seen hoarder houses where the cleanout revealed:'),
    textBlock('cost16', '• Water damage from leaks that went unnoticed for years'),
    textBlock('cost17', '• Foundation cracks hidden behind boxes'),
    textBlock('cost18', '• Termite damage throughout the structure'),
    textBlock('cost19', '• Plumbing that hadn\'t worked in a decade'),
    textBlock('cost20', 'Suddenly your $10,000 cleanout becomes a $30,000 problem.'),

    // H2: As-Is Option
    textBlock('h2asis', 'How to Sell a Hoarder House in Reading Without Cleaning: The As-Is Option', 'h2'),
    textBlock('asis1', 'Here\'s what most people don\'t know:'),
    mixedBlock('asis2', [
      { text: 'Cash buyers like ClearEdge Home Buyers purchase hoarder houses exactly as they are.', marks: ['strong'] }
    ]),
    textBlock('asis3', 'No cleanout required.'),
    textBlock('asis4', 'No repairs.'),
    textBlock('asis5', 'No staging, no showings, no open houses.'),
    textBlock('asis6', 'We look at the property, assess what it will cost US to clean and rehab, and make you a fair cash offer based on that.'),
    textBlock('asis7', 'You take what you want.'),
    textBlock('asis8', 'Leave the rest.'),
    textBlock('asis9', 'We handle everything after closing.'),
    mixedBlock('asis10', [{ text: 'Why does this work?', marks: ['strong'] }]),
    textBlock('asis11', 'Because we\'re not buying the house to live in.'),
    textBlock('asis12', 'We\'re buying it to renovate and either sell or rent.'),
    textBlock('asis13', 'We have crews.'),
    textBlock('asis14', 'We have systems.'),
    textBlock('asis15', 'We\'ve done this hundreds of times.'),
    textBlock('asis16', 'What would take you months of weekends, we handle in days.'),

    // H2: Key Zip Codes
    textBlock('h2zips', 'Selling a Hoarder House in Reading\'s Key Zip Codes', 'h2'),
    textBlock('zips1', 'Let me break down what we see across Reading\'s neighborhoods:'),
    mixedBlock('zips2', [{ text: '19601 - Center City / Northwest Reading', marks: ['strong'] }]),
    textBlock('zips3', 'This is Reading\'s downtown core.'),
    textBlock('zips4', 'Lots of older row houses, many built in the early 1900s.'),
    textBlock('zips5', 'When hoarding happens here, it\'s often in properties that have been in families for generations.'),
    textBlock('zips6', 'Three, four, five decades of accumulation.'),
    textBlock('zips7', 'These homes have narrow staircases, tight hallways, basements packed to the rafters.'),
    mixedBlock('zips8', [{ text: 'Average home values in 19601:', marks: ['strong'] }, { text: ' Around $65,000-$85,000 for smaller properties' }]),
    mixedBlock('zips9', [{ text: 'Common issues we see:', marks: ['strong'] }, { text: ' Old plumbing, knob-and-tube wiring hidden in walls, lead paint under layers of clutter' }]),
    mixedBlock('zips10', [{ text: '19602 - South Side / Southeast Reading', marks: ['strong'] }]),
    textBlock('zips11', 'The South Side has a mix of row houses and larger single-family homes.'),
    textBlock('zips12', 'Pendora Park area, Perkiomen Avenue corridor.'),
    textBlock('zips13', 'We see a lot of inherited properties here—situations where adult children are dealing with a parent\'s hoarder house from out of state.'),
    mixedBlock('zips14', [{ text: 'Average home values in 19602:', marks: ['strong'] }, { text: ' $100,000-$150,000 depending on block' }]),
    mixedBlock('zips15', [{ text: 'Common issues we see:', marks: ['strong'] }, { text: ' Deferred maintenance, outdated electrical, occasionally flood history from Schuylkill River proximity' }]),
    mixedBlock('zips16', [{ text: '19604 - Northeast Reading', marks: ['strong'] }]),
    textBlock('zips17', 'Northeast Reading has some of the city\'s larger homes.'),
    textBlock('zips18', 'More detached single-family properties.'),
    textBlock('zips19', 'When hoarding happens here, the scale is bigger—more square footage means more stuff.'),
    mixedBlock('zips20', [{ text: 'Average home values in 19604:', marks: ['strong'] }, { text: ' $120,000-$180,000' }]),
    mixedBlock('zips21', [{ text: 'Common issues we see:', marks: ['strong'] }, { text: ' Larger properties mean higher cleanout costs, detached garages filled floor to ceiling, sometimes multiple vehicles buried in yards' }]),

    // H2: Professional Cleanout
    textBlock('h2pro', 'What Professional Cleanout Actually Involves (And Why You Should Skip It)', 'h2'),
    textBlock('pro1', 'If you\'ve never dealt with a hoarder cleanout, here\'s what the professionals do:'),
    mixedBlock('pro2', [{ text: 'Phase 1: Sorting', marks: ['strong'] }]),
    textBlock('pro3', 'Every item gets sorted into categories: keep, donate, trash, hazardous.'),
    textBlock('pro4', 'This takes DAYS.'),
    textBlock('pro5', 'Sometimes weeks.'),
    textBlock('pro6', 'If the hoarder or family wants to be involved, add more time.'),
    mixedBlock('pro7', [{ text: 'Phase 2: Removal', marks: ['strong'] }]),
    textBlock('pro8', 'Junk haulers bring in dumpsters.'),
    textBlock('pro9', 'Multiple loads.'),
    textBlock('pro10', 'Heavy items require special equipment.'),
    textBlock('pro11', 'Hazardous materials require special disposal.'),
    mixedBlock('pro12', [{ text: 'Phase 3: Deep Cleaning', marks: ['strong'] }]),
    textBlock('pro13', 'Once empty, the house needs industrial cleaning.'),
    textBlock('pro14', 'Floors scrubbed.'),
    textBlock('pro15', 'Walls washed.'),
    textBlock('pro16', 'Mold treated.'),
    textBlock('pro17', 'Odors neutralized (sometimes requiring ozone treatment).'),
    mixedBlock('pro18', [{ text: 'Phase 4: Repairs', marks: ['strong'] }]),
    textBlock('pro19', 'Only AFTER cleaning do you discover what actually needs fixing.'),
    textBlock('pro20', 'This is where budgets explode.'),
    mixedBlock('pro21', [{ text: 'Total timeline:', marks: ['strong'] }, { text: ' 1-5 weeks depending on severity' }]),
    mixedBlock('pro22', [{ text: 'Total cost:', marks: ['strong'] }, { text: ' $5,000-$25,000+ depending on what you find' }]),

    // H2: Skip the Cleanout
    textBlock('h2skip', 'Skip the Cleanout: Sell Your Reading Hoarder House to a Cash Buyer', 'h2'),
    textBlock('skip1', 'Here\'s our process at ClearEdge Home Buyers:'),
    mixedBlock('skip2', [{ text: 'Step 1: You Contact Us', marks: ['strong'] }]),
    textBlock('skip3', 'Call or fill out our form online.'),
    textBlock('skip4', 'Tell us about the property.'),
    textBlock('skip5', 'No judgment.'),
    textBlock('skip6', 'We\'ve seen it all.'),
    mixedBlock('skip7', [{ text: 'Step 2: We Evaluate', marks: ['strong'] }]),
    textBlock('skip8', 'We\'ll do a walkthrough—or if that\'s not possible due to conditions, we\'ll work with photos and a conversation.'),
    textBlock('skip9', 'We assess:'),
    textBlock('skip10', '• Property location and lot size'),
    textBlock('skip11', '• Square footage'),
    textBlock('skip12', '• Structural condition (what we can see)'),
    textBlock('skip13', '• What the home would be worth fully renovated'),
    textBlock('skip14', '• Estimated cleanout and repair costs'),
    mixedBlock('skip15', [{ text: 'Step 3: You Get a Cash Offer', marks: ['strong'] }]),
    textBlock('skip16', 'We present a fair offer.'),
    textBlock('skip17', 'No lowball games.'),
    textBlock('skip18', 'We show you how we arrived at the number.'),
    mixedBlock('skip19', [{ text: 'Step 4: You Pick the Closing Date', marks: ['strong'] }]),
    textBlock('skip20', 'Need to close in 7 days? We can do that.'),
    textBlock('skip21', 'Need 30-60 days to coordinate? That\'s fine too.'),
    mixedBlock('skip22', [{ text: 'Step 5: Take What You Want, Leave the Rest', marks: ['strong'] }]),
    textBlock('skip23', 'Remove any personal items you want to keep.'),
    textBlock('skip24', 'Family photos, jewelry, important documents.'),
    textBlock('skip25', 'Everything else stays.'),
    textBlock('skip26', 'We handle cleanout after closing.'),

    // H2: Valuables
    textBlock('h2val', 'What If There Are Valuables Buried in the Clutter?', 'h2'),
    textBlock('val1', 'This comes up a lot.'),
    textBlock('val2', '"What if there\'s something valuable in there?"'),
    textBlock('val3', 'Valid question.'),
    textBlock('val4', 'Here\'s my honest answer:'),
    textBlock('val5', 'If you have time and energy, you can search for valuables before selling.'),
    textBlock('val6', 'Many families hire estate sale companies or professional organizers to sift through belongings.'),
    textBlock('val7', 'But here\'s the reality:'),
    textBlock('val8', 'Most hoarder houses contain very little of monetary value.'),
    textBlock('val9', 'What feels valuable emotionally (photo albums, letters, heirlooms) can be extracted.'),
    textBlock('val10', 'The rest—old newspapers, broken appliances, expired food, clothing from decades past—isn\'t worth the cost of finding.'),
    textBlock('val11', 'If you\'re worried about missing something important, set aside a weekend to pull specific items.'),
    textBlock('val12', 'Then let us handle the rest.'),

    // H2: Hidden Costs
    textBlock('h2hidden', 'The Hidden Costs of Keeping a Hoarder House', 'h2'),
    textBlock('hid1', 'Some people think: "I\'ll clean it out myself over time."'),
    textBlock('hid2', 'Noble idea.'),
    textBlock('hid3', 'Here\'s what actually happens:'),
    mixedBlock('hid4', [{ text: 'Property taxes keep coming.', marks: ['strong'] }]),
    textBlock('hid5', 'In Reading, property taxes run about 2.89% of assessed value annually.'),
    textBlock('hid6', 'Even on a $100,000 property, that\'s nearly $250/month.'),
    mixedBlock('hid7', [{ text: 'Insurance is expensive—or impossible.', marks: ['strong'] }]),
    textBlock('hid8', 'Many insurers won\'t cover hoarder houses.'),
    textBlock('hid9', 'Fire risk is extreme.'),
    textBlock('hid10', 'If they will cover it, premiums are sky-high.'),
    mixedBlock('hid11', [{ text: 'Code violations pile up.', marks: ['strong'] }]),
    textBlock('hid12', 'Reading\'s Property & Code Enforcement is active.'),
    textBlock('hid13', 'Hoarding conditions can trigger violations for:'),
    textBlock('hid14', '• Exterior property maintenance'),
    textBlock('hid15', '• Health and safety hazards'),
    textBlock('hid16', '• Fire code violations'),
    textBlock('hid17', 'Violations mean fines.'),
    textBlock('hid18', 'Fines mean liens.'),
    textBlock('hid19', 'Liens complicate selling later.'),
    mixedBlock('hid20', [{ text: 'The house deteriorates.', marks: ['strong'] }]),
    textBlock('hid21', 'Every month a hoarder house sits, it gets worse.'),
    textBlock('hid22', 'Leaks spread.'),
    textBlock('hid23', 'Pests multiply.'),
    textBlock('hid24', 'Structural issues compound.'),
    textBlock('hid25', 'The longer you wait, the less your house is worth.'),

    // H2: CTA
    textBlock('h2cta', 'Ready to Sell Your Reading Hoarder House Without the Cleanout?', 'h2'),
    mixedBlock('cta1', [
      { text: 'If you own a hoarder house in ' },
      { text: 'Reading', marks: ['readingLink'] },
      { text: '—whether it\'s in Center City (19601), the South Side (19602), or Northeast Reading (19604)—you have options.' }
    ], [{ _type: 'link', _key: 'readingLink', href: '/locations/reading' }]),
    textBlock('cta2', 'You don\'t have to spend $10,000+ on cleanout.'),
    textBlock('cta3', 'You don\'t have to spend months sorting through belongings.'),
    textBlock('cta4', 'You don\'t have to deal with realtors who won\'t return your calls.'),
    textBlock('cta5', 'At ClearEdge Home Buyers, we buy hoarder houses in any condition.'),
    textBlock('cta6', 'No cleanout required.'),
    textBlock('cta7', 'No repairs needed.'),
    textBlock('cta8', 'Just a fair cash offer and a fast closing.'),
    mixedBlock('cta9', [{ text: 'Here\'s how to get started:', marks: ['strong'] }]),
    mixedBlock('cta10', [
      { text: '' },
      { text: 'Learn how our simple 3-step process works', marks: ['howLink'] },
      { text: '' }
    ], [{ _type: 'link', _key: 'howLink', href: '/how-it-works' }]),
    textBlock('cta11', 'Or if you\'re ready for your free, no-obligation cash offer:'),
    mixedBlock('cta12', [
      { text: '' },
      { text: 'Request your cash offer now', marks: ['homeLink'] },
      { text: '' }
    ], [{ _type: 'link', _key: 'homeLink', href: '/' }]),
    mixedBlock('cta13', [
      { text: 'How to sell a hoarder house in Reading, PA without a cleanout', marks: ['strong'] },
      { text: '—now you know it\'s possible.' }
    ]),
  ]
}

async function main() {
  console.log('Starting Reading hoarder house blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

  try {
    // Fetch location references for Reading/Berks County
    console.log('\nFetching Reading location references...')
    const locations = await client.fetch(
      `*[_type == "location" && (
        city == "Reading" ||
        slug.current == "reading" ||
        county == "Berks County"
      )]{ _id, city, county, slug }`
    )

    console.log(`Found ${locations.length} location(s):`)
    locations.forEach(loc => {
      console.log(`  - ${loc.city} (${loc.county || 'No county'}) - slug: ${loc.slug?.current}`)
    })

    // Fetch hoarding/as-is situation reference if exists
    console.log('\nFetching situation references...')
    const situations = await client.fetch(
      `*[_type == "situation" && (
        slug.current in ["hoarding", "hoarder", "as-is", "inherited-property", "probate"]
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
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/sell-hoarder-house-reading-pa-without-cleanout')

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
