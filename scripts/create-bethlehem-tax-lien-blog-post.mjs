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
  title: 'Sell My House Fast Bethlehem PA 18015 Tax Lien: Your Complete Guide to Getting Out Fast',
  slug: { _type: 'slug', current: 'sell-my-house-fast-bethlehem-pa-18015-tax-lien' },
  metaTitle: 'Sell My House Fast Bethlehem PA 18015 Tax Lien | Cash Offer 7 Days',
  metaDescription: 'Have a tax lien on your Bethlehem 18015 property? Learn how to sell fast before tax sale. Get a cash offer in 24hrs. No repairs, close in 7-14 days.',
  excerpt: 'Have a tax lien on your Bethlehem PA property? Learn how to sell your house fast before tax sale. Get a cash offer in 24 hours with no repairs needed.',
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2025-11-08T10:00:00Z',
  category: 'situations',

  faqs: [
    {
      _key: 'faq1',
      question: 'Can I sell my house if it\'s scheduled for tax sale?',
      answer: 'Yes, but time is critical. In most cases, you can pay off the delinquent taxes right up until the day before the sale. Selling to a cash buyer can get you closed before the sale date.'
    },
    {
      _key: 'faq2',
      question: 'Will I still get money if I sell with a tax lien?',
      answer: 'Absolutely—assuming your property is worth more than the lien amount. The lien gets paid from the sale proceeds, and you receive what\'s left. In Bethlehem\'s 18015 zip code, most properties have significant equity even after paying off tax liens.'
    },
    {
      _key: 'faq3',
      question: 'How fast can you actually close?',
      answer: 'We can close in as little as 7-14 days when needed. Traditional sales take 30-60 days minimum, and that\'s IF everything goes smoothly with financing.'
    },
    {
      _key: 'faq4',
      question: 'Do you buy houses with other liens too?',
      answer: 'Yes. Mortgage liens, judgment liens, mechanic\'s liens—we\'ve handled them all. The title company sorts out payoffs at closing.'
    },
    {
      _key: 'faq5',
      question: 'What if I\'m behind on my mortgage AND have a tax lien?',
      answer: 'This is more common than you\'d think. We can still help. We\'ll work with your mortgage company to get payoff figures and structure the sale to satisfy all debts if there\'s equity available.'
    },
    {
      _key: 'faq6',
      question: 'Do I need to clean or fix up the house?',
      answer: 'No. We buy properties as-is. Leave everything exactly how it is. No repairs, no cleaning, no staging.'
    },
    {
      _key: 'faq7',
      question: 'What areas do you cover?',
      answer: 'We serve all of Eastern Pennsylvania including Bethlehem, Allentown, Easton, the Lehigh Valley, NEPA, and the Poconos.'
    },
    {
      _key: 'faq8',
      question: 'How is your offer calculated?',
      answer: 'We look at the property\'s after-repair value, subtract our renovation costs and the lien payoffs, and offer you a fair price for the remaining equity. No hidden fees, no commissions.'
    }
  ],

  content: [
    // Intro
    mixedBlock('intro1', [
      { text: 'Sell my house fast Bethlehem PA 18015 tax lien', marks: ['strong'] },
      { text: '—that\'s why you\'re here.' }
    ]),
    textBlock('intro2', 'You\'re not looking for theory.'),
    textBlock('intro3', 'You\'re looking for a way out.'),
    textBlock('intro4', 'Maybe you missed a few tax payments.'),
    textBlock('intro5', 'Maybe you inherited a property that was already behind.'),
    textBlock('intro6', 'Maybe life just got in the way.'),
    textBlock('intro7', 'Whatever happened, you\'re now staring at letters from Northampton County.'),
    textBlock('intro8', 'The Tax Claim Bureau at 669 Washington Street in Easton.'),
    textBlock('intro9', 'Words like "upset sale" and "judicial sale" that sound terrifying.'),
    textBlock('intro10', 'And a clock that\'s ticking.'),
    textBlock('intro11', 'Here\'s the thing most people don\'t realize:'),
    mixedBlock('intro12', [
      { text: 'You can still sell your house—even with a tax lien on it.', marks: ['strong'] }
    ]),
    textBlock('intro13', 'I\'m Tyler Swenson, founder of ClearEdge Home Buyers.'),
    textBlock('intro14', 'Since 2016, I\'ve helped over 200 homeowners across Eastern Pennsylvania sell properties in tough situations.'),
    textBlock('intro15', 'Tax liens included.'),
    textBlock('intro16', 'I\'ve been featured in The Morning Call and Lehigh Valley Business.'),
    textBlock('intro17', 'I speak regularly at REIA meetups throughout Eastern PA.'),
    textBlock('intro18', 'And I\'ve seen every version of the tax lien situation you can imagine.'),
    textBlock('intro19', 'Let me show you exactly how this works in Bethlehem\'s 18015 zip code.'),

    // H2: What Is a Tax Lien
    textBlock('h2what', 'What Exactly Is a Tax Lien on Your Bethlehem Property?', 'h2'),
    textBlock('what1', 'Let\'s start with the basics.'),
    textBlock('what2', 'A tax lien is a legal claim the government puts on your property when you don\'t pay your taxes.'),
    textBlock('what3', 'In Pennsylvania, property taxes come from three sources:'),
    mixedBlock('what4', [
      { text: '• ' },
      { text: 'City of Bethlehem', marks: ['strong'] },
      { text: ' (they collect their portion directly)' }
    ]),
    mixedBlock('what5', [
      { text: '• ' },
      { text: 'Northampton County', marks: ['strong'] },
      { text: ' (where most of 18015 falls)' }
    ]),
    mixedBlock('what6', [
      { text: '• ' },
      { text: 'Bethlehem Area School District', marks: ['strong'] }
    ]),
    textBlock('what7', 'Miss any of these?'),
    textBlock('what8', 'A lien gets attached to your property.'),
    textBlock('what9', 'That lien is a matter of public record.'),
    textBlock('what10', 'Anyone searching the title can see it.'),
    textBlock('what11', 'And here\'s the kicker:'),
    mixedBlock('what12', [
      { text: 'The lien doesn\'t just sit there quietly.', marks: ['strong'] }
    ]),
    textBlock('what13', 'It grows.'),
    textBlock('what14', 'Interest accrues at 0.75% per month in Northampton County.'),
    textBlock('what15', 'Fees pile up.'),
    textBlock('what16', 'And if you don\'t act, your property heads toward a tax sale.'),

    // H2: PA Tax Sales Timeline
    textBlock('h2time', 'How Pennsylvania Tax Sales Work (The Timeline You Need to Know)', 'h2'),
    textBlock('time1', 'Pennsylvania\'s tax sale process has specific deadlines.'),
    textBlock('time2', 'Miss them, and you could lose your home.'),
    textBlock('time3', 'Here\'s the timeline:'),
    mixedBlock('time4', [{ text: 'Year 1: The Tax Goes Delinquent', marks: ['strong'] }]),
    textBlock('time5', 'Your property tax is due by December 31st of the year it\'s levied.'),
    textBlock('time6', 'Miss that date?'),
    textBlock('time7', 'It\'s now delinquent.'),
    textBlock('time8', 'By January 15th, the local tax collector turns your unpaid taxes over to the Northampton County Tax Claim Bureau.'),
    mixedBlock('time9', [{ text: 'Spring of Year 2: Notice of Claim', marks: ['strong'] }]),
    textBlock('time10', 'The Tax Claim Bureau sends you a "Notice of Claim."'),
    textBlock('time11', 'This tells you a claim has been entered against your property.'),
    textBlock('time12', 'The tax claim becomes "absolute" if not paid by December 31st of that year.'),
    mixedBlock('time13', [{ text: 'Year 2-3: Heading to Upset Sale', marks: ['strong'] }]),
    textBlock('time14', 'If you still haven\'t paid by July 1st of the second year after the original bill?'),
    textBlock('time15', 'Your property gets advertised for the Upset Sale.'),
    textBlock('time16', 'You\'ll receive certified mail notices.'),
    textBlock('time17', 'Your property gets posted.'),
    textBlock('time18', 'It\'s serious now.'),
    mixedBlock('time19', [{ text: 'September: The Upset Sale', marks: ['strong'] }]),
    textBlock('time20', 'Upset Sales happen in September.'),
    textBlock('time21', 'Properties with two or more years of delinquent taxes get auctioned.'),
    textBlock('time22', 'The starting bid?'),
    textBlock('time23', 'All the unpaid taxes, interest, and costs.'),
    mixedBlock('time24', [{ text: 'If It Doesn\'t Sell: Judicial Sale', marks: ['strong'] }]),
    textBlock('time25', 'Properties that don\'t sell at the Upset Sale move to a Judicial Sale.'),
    textBlock('time26', 'This is worse for you.'),
    textBlock('time27', 'At a Judicial Sale, the property sells "free and clear" of all liens—including mortgages.'),
    textBlock('time28', 'That means your equity can vanish.'),
    mixedBlock('time29', [{ text: 'Last Stop: Repository Sale', marks: ['strong'] }]),
    textBlock('time30', 'Properties that still don\'t sell end up on the Repository list.'),
    textBlock('time31', 'At this point, someone can buy your property for just the costs owed.'),

    // H2: Why Tax Liens Make Selling Hard
    textBlock('h2hard', 'Why Tax Liens Make Selling Your House Hard (But Not Impossible)', 'h2'),
    mixedBlock('hard1', [
      { text: 'Having a tax lien on your ' },
      { text: 'Bethlehem', marks: ['bethLink'] },
      { text: ' property creates real obstacles:' }
    ], [{ _type: 'link', _key: 'bethLink', href: '/locations/bethlehem' }]),
    mixedBlock('hard2', [{ text: 'Traditional buyers get scared off.', marks: ['strong'] }]),
    textBlock('hard3', 'When a buyer\'s title company runs a search, that lien shows up immediately.'),
    textBlock('hard4', 'Most retail buyers don\'t want the hassle.'),
    textBlock('hard5', 'They\'ll move on to the next listing.'),
    mixedBlock('hard6', [{ text: 'Banks won\'t finance it.', marks: ['strong'] }]),
    textBlock('hard7', 'Lenders require clear title.'),
    textBlock('hard8', 'A tax lien is about as clear as mud.'),
    textBlock('hard9', 'FHA, VA, conventional—they all say no until that lien is resolved.'),
    mixedBlock('hard10', [{ text: 'Realtors struggle to market it.', marks: ['strong'] }]),
    textBlock('hard11', 'Many agents won\'t even take the listing.'),
    textBlock('hard12', 'Those who do have to disclose the lien situation.'),
    textBlock('hard13', 'That shrinks your buyer pool dramatically.'),
    mixedBlock('hard14', [{ text: 'Your equity is at risk.', marks: ['strong'] }]),
    textBlock('hard15', 'Every month you wait, more interest and fees accumulate.'),
    textBlock('hard16', 'That\'s money coming directly out of what you\'d pocket from a sale.'),
    textBlock('hard17', 'But here\'s what most people don\'t understand:'),
    mixedBlock('hard18', [
      { text: 'You absolutely CAN sell a house with a tax lien in Pennsylvania.', marks: ['strong'] }
    ]),
    textBlock('hard19', 'The lien just needs to be satisfied at closing.'),

    // H2: South Side and 18015
    textBlock('h2south', 'The South Side and 18015: Why Your Location Actually Helps', 'h2'),
    textBlock('south1', 'If you\'re in Bethlehem\'s 18015 zip code, you\'ve got something working in your favor.'),
    textBlock('south2', 'This area is in demand.'),
    textBlock('south3', 'The South Side has transformed over the past decade.'),
    textBlock('south4', 'Lehigh University is right there.'),
    textBlock('south5', 'SteelStacks brings thousands of visitors for concerts and events.'),
    textBlock('south6', 'Wind Creek Casino opened nearby.'),
    textBlock('south7', 'New restaurants and shops line Third and Fourth Streets.'),
    mixedBlock('south8', [{ text: 'Here\'s what 18015 looks like by the numbers:', marks: ['strong'] }]),
    textBlock('south9', '• Median home values run around $240,000-$280,000'),
    textBlock('south10', '• Median household income sits around $58,000-$65,000'),
    textBlock('south11', '• Property tax rates hover near 2.85%—one of the higher rates in Lehigh County'),
    textBlock('south12', '• About 50% owner-occupied, 50% renter-occupied'),
    textBlock('south13', '• Strong rental demand from Lehigh University students'),
    textBlock('south14', 'The neighborhoods here—from Fountain Hill to the South Side Historic District—attract buyers looking for character and walkability.'),
    mixedBlock('south15', [{ text: 'And here\'s what makes 18015 unique for tax lien situations:', marks: ['strong'] }]),
    textBlock('south16', 'The high property tax rate means more people fall behind.'),
    textBlock('south17', 'That 2.85% effective rate on a $250,000 home is over $7,000 per year.'),
    textBlock('south18', 'Add in school taxes and municipal taxes?'),
    textBlock('south19', 'Easy to see how people get underwater.'),
    textBlock('south20', 'But the strong market demand also means your property has real value—even with a lien attached.'),
    textBlock('south21', 'Cash buyers like us see the potential.'),
    textBlock('south22', 'We\'re not scared off by liens because we know how to handle them.'),

    // H2: Your Options
    textBlock('h2opt', 'Your Options for Selling a House with a Tax Lien in Bethlehem PA', 'h2'),
    textBlock('opt1', 'You have three main paths:'),
    mixedBlock('opt2', [{ text: 'Option 1: Pay Off the Lien, Then List Traditionally', marks: ['strong'] }]),
    textBlock('opt3', 'If you have the cash to clear the lien, great.'),
    textBlock('opt4', 'Pay it off.'),
    textBlock('opt5', 'Get the satisfaction from the Tax Claim Bureau.'),
    textBlock('opt6', 'Then list with a realtor.'),
    textBlock('opt7', 'You\'ll have access to the full buyer pool.'),
    textBlock('opt8', 'But this requires upfront money you might not have.'),
    mixedBlock('opt9', [{ text: 'Option 2: List with the Lien and Hope', marks: ['strong'] }]),
    textBlock('opt10', 'You can list your property with the lien still attached.'),
    textBlock('opt11', 'Some buyers will still be interested—mainly investors.'),
    textBlock('opt12', 'But you\'ll wait longer.'),
    textBlock('opt13', 'You\'ll likely get lowball offers.'),
    textBlock('opt14', 'And every month you wait, more fees accumulate.'),
    mixedBlock('opt15', [{ text: 'Option 3: Sell to a Cash Buyer (Fastest Route)', marks: ['strong'] }]),
    textBlock('opt16', 'This is where ClearEdge Home Buyers comes in.'),
    textBlock('opt17', 'We buy houses with tax liens.'),
    textBlock('opt18', 'Here\'s how it works:'),
    textBlock('opt19', '• We assess your property\'s value'),
    textBlock('opt20', '• We calculate the lien payoff amount'),
    textBlock('opt21', '• We make you a cash offer that accounts for the lien'),
    textBlock('opt22', '• At closing, the lien gets paid from the proceeds'),
    textBlock('opt23', '• You walk away with the remaining equity'),
    textBlock('opt24', 'No waiting for bank approvals.'),
    textBlock('opt25', 'No hoping a traditional buyer will stick around.'),
    textBlock('opt26', 'Just a clean sale that clears your lien problem.'),

    // H2: How to Sell Fast
    textBlock('h2how', 'How to Sell Your House Fast in Bethlehem 18015 with a Tax Lien', 'h2'),
    textBlock('how1', 'Here\'s the step-by-step process if you want to move quickly:'),
    mixedBlock('how2', [{ text: 'Step 1: Get Your Payoff Amount', marks: ['strong'] }]),
    textBlock('how3', 'Contact the Northampton County Tax Claim Bureau.'),
    textBlock('how4', 'They\'re located at 669 Washington Street in Easton.'),
    textBlock('how5', 'Phone: 610-829-6186'),
    textBlock('how6', 'Ask for a current payoff amount including all interest and fees.'),
    textBlock('how7', 'This number changes daily, so get a fresh quote.'),
    mixedBlock('how8', [{ text: 'Step 2: Know Your Property\'s Value', marks: ['strong'] }]),
    textBlock('how9', 'Look at what similar homes in your neighborhood have sold for recently.'),
    textBlock('how10', 'In 18015, you\'re looking at:'),
    textBlock('how11', '• Row houses and twins: $150,000-$220,000'),
    textBlock('how12', '• Single-family homes: $220,000-$320,000'),
    textBlock('how13', '• Properties near Lehigh University command premiums'),
    mixedBlock('how14', [{ text: 'Step 3: Contact ClearEdge Home Buyers', marks: ['strong'] }]),
    textBlock('how15', 'Reach out to us for a no-obligation cash offer.'),
    textBlock('how16', 'We\'ll evaluate your property.'),
    textBlock('how17', 'We\'ll factor in the lien payoff.'),
    textBlock('how18', 'We\'ll give you a number—usually within 24-48 hours.'),
    mixedBlock('how19', [{ text: 'Step 4: Choose Your Closing Date', marks: ['strong'] }]),
    textBlock('how20', 'Need to close fast? We can do 7-14 days.'),
    textBlock('how21', 'Need more time? We\'ll work with your schedule.'),
    textBlock('how22', 'You\'re in control.'),
    mixedBlock('how23', [{ text: 'Step 5: The Lien Gets Paid at Closing', marks: ['strong'] }]),
    textBlock('how24', 'At the settlement table, the title company pays off the tax lien directly.'),
    textBlock('how25', 'The county gets their money.'),
    textBlock('how26', 'The lien gets satisfied.'),
    textBlock('how27', 'You get the remaining proceeds.'),
    textBlock('how28', 'Done.'),

    // H2: What Happens If You Do Nothing
    textBlock('h2nothing', 'What Happens If You Do Nothing?', 'h2'),
    textBlock('noth1', 'I\'ve seen this play out too many times.'),
    textBlock('noth2', 'Homeowners who stick their head in the sand.'),
    textBlock('noth3', 'Who avoid the letters.'),
    textBlock('noth4', 'Who hope it somehow goes away.'),
    textBlock('noth5', 'It doesn\'t.'),
    textBlock('noth6', 'Here\'s what happens:'),
    mixedBlock('noth7', [{ text: 'Your property goes to Upset Sale.', marks: ['strong'] }]),
    textBlock('noth8', 'Someone bids on it.'),
    textBlock('noth9', 'If they win and pay, you lose the house—but you might still owe the mortgage.'),
    mixedBlock('noth10', [{ text: 'If it doesn\'t sell, it goes to Judicial Sale.', marks: ['strong'] }]),
    textBlock('noth11', 'At Judicial Sale, the property sells free and clear of everything.'),
    textBlock('noth12', 'Including your mortgage.'),
    textBlock('noth13', 'Any equity you had? Gone to pay creditors.'),
    mixedBlock('noth14', [{ text: 'Worst case: Repository Sale', marks: ['strong'] }]),
    textBlock('noth15', 'Someone picks up your property for just the accumulated costs.'),
    textBlock('noth16', 'Could be a few thousand dollars.'),
    textBlock('noth17', 'For a house worth $200,000+.'),
    textBlock('noth18', 'All because you didn\'t act.'),

    // H2: Real Talk Property Taxes
    textBlock('h2real', 'Real Talk: Property Taxes in Bethlehem Are High', 'h2'),
    textBlock('real1', 'Let\'s be honest about why so many people fall behind here.'),
    mixedBlock('real2', [{ text: 'Bethlehem has some of the highest property taxes in Pennsylvania.', marks: ['strong'] }]),
    textBlock('real3', 'The effective tax rate in 18015 runs around 2.85-4.42%.'),
    textBlock('real4', 'On a $250,000 home, that\'s $7,000-$11,000 per year.'),
    textBlock('real5', 'Just in property taxes.'),
    textBlock('real6', 'Add your mortgage, insurance, and utilities?'),
    textBlock('real7', 'It\'s a lot.'),
    textBlock('real8', 'When times get tough—job loss, medical bills, divorce—property taxes are often the first thing that slides.'),
    textBlock('real9', 'I get it.'),
    textBlock('real10', 'But ignoring the problem only makes it worse.'),

    // H2: Why Work With Us
    textBlock('h2why', 'Why Work with ClearEdge Home Buyers?', 'h2'),
    textBlock('why1', 'Since 2016, we\'ve built ClearEdge from the ground up—starting with a single duplex on Birch Street in Scranton.'),
    textBlock('why2', 'Now we\'ve helped over 200 homeowners across Eastern PA.'),
    textBlock('why3', 'Here\'s what makes us different:'),
    mixedBlock('why4', [{ text: 'We\'re local.', marks: ['strong'] }, { text: ' I live and work in this market. I know the neighborhoods, the tax situations, and what properties are really worth.' }]),
    mixedBlock('why5', [{ text: 'We\'ve been featured locally.', marks: ['strong'] }, { text: ' The Morning Call and Lehigh Valley Business have covered our work.' }]),
    mixedBlock('why6', [{ text: 'We\'re active in the investment community.', marks: ['strong'] }, { text: ' I speak regularly at REIA meetups throughout Eastern PA.' }]),
    mixedBlock('why7', [{ text: 'We handle complications.', marks: ['strong'] }, { text: ' Tax liens, code violations, inherited properties, divorces—we\'ve seen it all and know how to navigate it.' }]),
    mixedBlock('why8', [{ text: 'We\'re straight with you.', marks: ['strong'] }, { text: ' No games, no lowball offers, no pressure. Just honest assessments and fair deals.' }]),

    // H2: CTA
    textBlock('h2cta', 'Ready to Sell Your Bethlehem Property with a Tax Lien?', 'h2'),
    textBlock('cta1', 'If you\'re sitting on a property in 18015 with a tax lien hanging over your head, you have options.'),
    textBlock('cta2', 'Waiting only makes it worse.'),
    textBlock('cta3', 'Interest keeps accruing.'),
    textBlock('cta4', 'The county keeps sending notices.'),
    textBlock('cta5', 'And that upset sale date keeps getting closer.'),
    textBlock('cta6', 'Here\'s what to do right now:'),
    mixedBlock('cta7', [
      { text: '' },
      { text: 'Learn how our simple 3-step process works', marks: ['howLink'] },
      { text: '' }
    ], [{ _type: 'link', _key: 'howLink', href: '/how-it-works' }]),
    textBlock('cta8', 'Or if you\'re ready to see what your property is worth:'),
    mixedBlock('cta9', [
      { text: '' },
      { text: 'Request your free, no-obligation cash offer', marks: ['homeLink'] },
      { text: '' }
    ], [{ _type: 'link', _key: 'homeLink', href: '/' }]),
    mixedBlock('cta10', [
      { text: 'Sell my house fast Bethlehem PA 18015 tax lien', marks: ['strong'] },
      { text: '—now you know it\'s possible, and you know exactly how to make it happen.' }
    ]),

    // Author bio
    mixedBlock('bio', [
      { text: 'Tyler Swenson is the founder of ClearEdge Home Buyers, a cash home buying company serving Eastern Pennsylvania. He has been featured in The Morning Call and Lehigh Valley Business, and speaks regularly at REIA meetups throughout Eastern PA.', marks: ['em'] }
    ]),
  ]
}

async function main() {
  console.log('Starting Bethlehem PA 18015 tax lien blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

  try {
    // Fetch location references for Bethlehem/Northampton County
    console.log('\nFetching Bethlehem location references...')
    const locations = await client.fetch(
      `*[_type == "location" && (
        city in ["Bethlehem", "Fountain Hill"] ||
        slug.current in ["bethlehem", "fountain-hill"] ||
        county == "Northampton County"
      )]{ _id, city, county, slug }`
    )

    console.log(`Found ${locations.length} location(s):`)
    locations.forEach(loc => {
      console.log(`  - ${loc.city} (${loc.county || 'No county'}) - slug: ${loc.slug?.current}`)
    })

    // Fetch tax lien / situations reference
    console.log('\nFetching situation references...')
    const situations = await client.fetch(
      `*[_type == "situation" && (
        slug.current in ["tax-lien", "tax-liens", "foreclosure", "behind-on-payments"]
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
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-bethlehem-pa-18015-tax-lien')

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
