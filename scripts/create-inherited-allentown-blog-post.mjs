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
  apiVersion: '2026-01-02',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

let keyCounter = 0
function k() {
  return `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`
}

function span(text, marks = []) {
  return { _type: 'span', _key: k(), text, marks }
}

function linkDef(key, href) {
  return { _type: 'link', _key: key, href }
}

function blk(style, children, markDefs = []) {
  return { _type: 'block', _key: k(), style, markDefs, children }
}

// Build a paragraph from mixed segments: string | {bold} | {italic} | {link, text} | {bold, link, text}
function p(segments) {
  const markDefs = []
  const children = []
  for (const seg of segments) {
    if (typeof seg === 'string') {
      children.push(span(seg))
    } else if (seg.bold && seg.link) {
      const lk = k()
      markDefs.push(linkDef(lk, seg.link))
      children.push(span(seg.bold, [lk, 'strong']))
    } else if (seg.bold) {
      children.push(span(seg.bold, ['strong']))
    } else if (seg.italic) {
      children.push(span(seg.italic, ['em']))
    } else if (seg.link) {
      const lk = k()
      markDefs.push(linkDef(lk, seg.link))
      children.push(span(seg.text, [lk]))
    }
  }
  return blk('normal', children, markDefs)
}

function h2(text) { return blk('h2', [span(text)]) }
function h3(text) { return blk('h3', [span(text)]) }

const content = [
  // Byline
  p([{ italic: 'By Tyler Swenson, ClearEdge Home Buyers \u2014 Lehigh Valley cash home buyer since 2016' }]),

  // Quick Answer
  h2('How do I sell an inherited house in Allentown?'),
  p([
    'You can sell an inherited house in Allentown by obtaining Letters Testamentary from the Lehigh County Register of Wills (455 West Hamilton Street, Allentown), which gives you legal authority to sell during or after probate. You don\'t need to wait for probate to close. ClearEdge Home Buyers purchases ',
    { link: '/situations/inherited-property', text: 'inherited properties in any condition' },
    ' throughout ',
    { link: '/locations/allentown', text: 'Allentown' },
    ' and the ',
    { link: '/locations/lehigh-valley', text: 'Lehigh Valley' },
    '. No repairs, no cleanout, close in as little as 7 days.',
  ]),

  // Intro
  p([
    'You just inherited a house in ',
    { link: '/locations/allentown', text: 'Allentown' },
    '. Maybe it was your parents\' place on the West End, maybe a rental your uncle held onto in the 7th Ward. Either way, you\'re probably dealing with a mix of emotions and a long list of questions, and the last thing you need is a bunch of runaround about what to do next.',
  ]),
  p([
    'I\'m Tyler Swenson, founder of ',
    { link: '/about', text: 'ClearEdge Home Buyers' },
    '. Since 2016, I\'ve helped over 200 families across Eastern Pennsylvania sell properties they inherited, couldn\'t maintain, or needed to move on from. Inherited homes make up a significant chunk of what we buy in the ',
    { link: '/locations/lehigh-valley', text: 'Lehigh Valley' },
    '.',
  ]),
  p(['I\'ve sat across kitchen tables from families going through exactly what you\'re going through \u2014 the probate confusion, the sibling disagreements, the house that hasn\'t been updated since 1987. This guide breaks down everything you actually need to know, from the Lehigh County probate process to what your property is realistically worth in today\'s market.']),
  p(['If you\'ve already been through probate and just want to know your options, skip ahead to Your Options for Selling below.']),

  // Do You Even Need Probate?
  h2('First Things First: Do You Even Need Probate?'),
  p(['Here\'s something a lot of people don\'t realize: not every inherited property has to go through full probate in Pennsylvania.']),
  p([
    'If the house was held in a revocable living trust, or if it was owned jointly with right of survivorship (common with married couples), the property transfers automatically. No court involvement needed. Same goes for assets with transfer-on-death designations. We wrote a separate guide covering ',
    { link: '/blog/sell-deceased-parents-house-without-probate-pennsylvania', text: 'how to sell a deceased parent\'s house without going through probate' },
    ' if that applies to your situation.',
  ]),
  p(['But if the house was titled solely in the deceased person\'s name (which is the most common scenario we see), then yes, you\'re going through probate. In Lehigh County, that means filing with the Register of Wills at the Lehigh County Courthouse, 455 West Hamilton Street in downtown Allentown. The phone number is (610) 782-3000 if you need to call ahead about filing requirements.']),
  p(['Here\'s what the probate process actually looks like:']),
  p([
    { bold: 'Step 1: File the will and get appointed.' },
    ' Someone (usually the person named as executor in the will) petitions the Register of Wills to open probate. You\'ll receive what\'s called "Letters Testamentary" \u2014 that\'s the document that gives you legal authority to act on behalf of the estate. If there\'s no will, you petition for "Letters of Administration" instead, and the court appoints an administrator (usually the closest relative). For a full checklist of what you\'ll need, see our guide on ',
    { link: '/blog/documents-required-selling-inherited-property-pennsylvania', text: 'documents required to sell inherited property in Pennsylvania' },
    '.',
  ]),
  p([
    { bold: 'Step 2: Inventory the estate and notify creditors.' },
    ' You\'ll need to catalog all the assets, including the property, and publish a notice to creditors. This gives anyone who\'s owed money a chance to file a claim. In PA, creditors have one year to come forward.',
  ]),
  p([
    { bold: 'Step 3: Settle debts and taxes.' },
    ' Before you can sell or distribute anything, outstanding debts need to be resolved. That includes any mortgage balance, property tax arrears, utility bills, and the Pennsylvania inheritance tax (more on that in a minute).',
  ]),
  p([
    { bold: 'Step 4: Sell or transfer the property.' },
    ' Once you\'ve got your Letters and the estate is in order, you can sell the house. Under Pennsylvania\'s PEF Code (20 Pa.C.S. \u00a7 3351), executors generally have the power to sell real estate unless the will specifically says otherwise. If the will is silent on the matter or there are disputes among heirs, you may need Orphans\' Court approval before proceeding with the sale.',
  ]),
  p([
    { bold: 'How long does this take?' },
    ' Realistically, 6 to 18 months in Pennsylvania. We\'ve seen simple estates in Lehigh County wrap up in about 6 months when everything is straightforward \u2014 one heir, no disputes, clean title. But if there are multiple beneficiaries, disagreements, or liens on the property, you\'re looking at closer to a year or more.',
  ]),
  p([
    { bold: 'Can you sell the house during probate?' },
    ' Yes. This is one of the biggest misconceptions out there. You don\'t have to wait for probate to be fully closed. As long as the executor has Letters Testamentary and the authority to sell (either from the will or with court approval), you can list and sell the property while probate is still open. We\'ve ',
    { link: '/situations/inherited-property', text: 'closed on inherited properties' },
    ' mid-probate many times \u2014 it\'s one of the most common scenarios we handle.',
  ]),

  // PA Inheritance Tax
  h2('Pennsylvania Inheritance Tax: What You\'ll Actually Owe'),
  p(['PA is one of only six states that charges an inheritance tax, and it catches a lot of people off guard. This isn\'t a tax on the estate itself. It\'s a tax on each person who receives an inheritance, and the rate depends on your relationship to the person who passed away:']),
  p([{ bold: 'Spouse:' }, ' 0% (exempt)']),
  p([{ bold: 'Children and grandchildren (lineal descendants):' }, ' 4.5%']),
  p([{ bold: 'Siblings:' }, ' 12%']),
  p([{ bold: 'Everyone else (nieces, nephews, friends, non-relatives):' }, ' 15%']),
  p(['So if you inherited a $250,000 house from a parent, you\'re looking at about $11,250 in PA inheritance tax (4.5%). Inherited from a sibling? That jumps to $30,000 (12%). From an aunt or family friend? $37,500 (15%).']),
  p(['One thing worth knowing: if you pay the inheritance tax within 3 months of the date of death, Pennsylvania gives you a 5% discount on the total amount. On a $250K property inherited from a parent, that saves you about $562. Not life-changing, but it\'s free money for being prompt.']),
  p(['The inheritance tax return (Form REV-1500) is filed with the Register of Wills in the county where the deceased lived \u2014 so for Allentown, that\'s Lehigh County. The tax is due within 9 months of the date of death, and interest starts accruing after that.']),

  // What's it worth
  h2('What\'s an Inherited Allentown House Actually Worth Right Now?'),
  p([
    'If you haven\'t been paying close attention to the ',
    { link: '/locations/lehigh-valley', text: 'Lehigh Valley' },
    ' market, here\'s where things stand as of early 2026:',
  ]),
  p([
    'The median sale price in ',
    { link: '/locations/allentown', text: 'Allentown' },
    ' is ',
    { bold: '$245,000' },
    ' as of February 2026, up about 2.1% from last year. Homes are selling in roughly 29 days on average, and the market is competitive \u2014 most homes get around 5 offers.',
  ]),
  p(['But "Allentown" covers a lot of ground, and prices vary dramatically by neighborhood:']),
  p([{ bold: 'West End:' }, ' The most desirable area in the city. Median sale price around ', { bold: '$316,000' }, ', up 3.2% year-over-year. Larger single-family homes, tree-lined streets, walking distance to Muhlenberg College and Cedar Beach Park. If you inherited a house on the West End, you\'re sitting on a more valuable property than the city-wide median suggests.']),
  p([{ bold: 'Old Allentown Historic District:' }, ' Charming Victorian rowhouses, but many need significant work. Prices are lower here, and buyers are often investors or first-time buyers looking for character with a budget.']),
  p([{ bold: 'Center City:' }, ' Mixed-use area around Hamilton Street. Prices are generally below the city median. A lot of rental conversions and older mixed-income housing stock.']),
  p([{ bold: 'East Side / 7th Ward:' }, ' More affordable, largely rental-heavy. Inherited properties here are often older homes that have been rentals for years and need updating. Values can range from $100K-$180K depending on condition.']),
  p([{ bold: 'South Allentown:' }, ' Working-class neighborhood with a mix of single-family and row homes. Generally below city median.']),
  p(['This matters because the "average" Allentown price doesn\'t tell you much about what your specific inherited property is worth. A well-maintained 3-bed/2-bath on the West End near Irving Park could go for $350K+. A 2-bed rowhouse on the east side that hasn\'t been touched in 40 years might be worth $120K-$150K as-is.']),
  p([
    'Want to see what the actual numbers look like for your situation? ',
    { link: '/calculator', text: 'Run your property through our Home Sale Calculator' },
    ' \u2014 it uses county-specific PA closing costs and current contractor pricing to show you what you\'d walk away with under different selling scenarios.',
  ]),

  // Stepped-Up Basis
  h3('The Stepped-Up Basis Advantage'),
  p(['Here\'s a significant tax benefit that many people overlook: when you inherit property, your tax basis "steps up" to the fair market value at the date of death.']),
  p(['What does that mean in plain English? If your parent bought the house in 1985 for $60,000 and it\'s worth $250,000 when they pass away, your basis is $250,000 \u2014 not the original $60,000. So if you sell it for $250,000 (or close to it), you owe little to no federal capital gains tax on the sale. That\'s a huge deal.']),
  p(['This is why selling relatively quickly after inheriting often makes financial sense. The longer you hold the property, the more it may appreciate beyond that stepped-up basis, and you\'ll owe capital gains on that additional appreciation. Plus, every month you hold the property, you\'re paying property taxes (Lehigh County averages about 1.48% of assessed value annually), homeowner\'s insurance, utilities, and maintenance.']),

  // Hidden Costs
  h2('The Hidden Costs of Holding an Inherited House'),
  p(['This is where a lot of heirs get burned. They think "I\'ll take my time, fix it up, list it in the spring." Meanwhile, the expenses pile up:']),
  p([{ bold: 'Property taxes:' }, ' Lehigh County property taxes aren\'t cheap. On a $250K property, you\'re looking at roughly $3,700/year, or about $308/month.']),
  p([{ bold: 'Homeowner\'s insurance:' }, ' Even vacant homes need insurance, and vacant property policies cost more \u2014 typically $150-250/month.']),
  p([{ bold: 'Utilities:' }, ' Even if nobody\'s living there, you need to keep the heat on in winter so the pipes don\'t freeze. Electric, water, basic maintenance runs $200-400/month depending on the season.']),
  p([{ bold: 'Maintenance:' }, ' Yards need mowing, snow needs shoveling, things break. If you\'re not local (and a lot of people inheriting Allentown properties live in Philly or New York now), managing this from a distance is a real headache.']),
  p(['Add it up and you\'re easily spending $700-1,000/month just to hold onto a house that\'s sitting empty. Over 6 months of probate and a traditional listing, that\'s $4,200-$6,000 gone before you even factor in closing costs and agent commissions.']),

  // CTA callout
  p([
    { bold: 'Not sure whether a cash sale or traditional listing makes more sense for your inherited property?' },
    ' We built an ',
    { link: '/cash-buyer-vs-realtor', text: 'honest, side-by-side comparison' },
    ' that breaks down the real math \u2014 including the scenarios where listing with an agent is the better move. Worth a read before you decide.',
  ]),

  // Options for Selling
  h2('Your Options for Selling'),
  p(['You\'ve basically got three paths:']),

  h3('List with a Real Estate Agent'),
  p([
    'The traditional route. Hire an agent, list on the MLS, hold open houses, find a retail buyer. If the house is in good shape, this is probably how you get the highest sale price. ',
    { link: '/locations/allentown', text: 'Allentown' },
    ' homes are moving in about 29 days right now, so the market is working in your favor.',
  ]),
  p(['The catch: you\'re paying for it. Agent commissions run 5-6% of the sale price, plus another 2-3% in closing costs. On a $250K sale, that\'s about $22,500 gone before you see a dime. And that assumes the house is "show ready." If it needs a new roof, has an outdated kitchen, or smells like Grandma\'s cats, you\'re either spending money on repairs first or watching buyers walk away.']),
  p(['For a move-in-ready inherited property on the West End? Listing makes a lot of sense. For a house that needs $30K in work and you live two hours away? Keep reading.']),

  h3('Sell As-Is to a Cash Home Buyer'),
  p([
    'This is what we do at ClearEdge Home Buyers. We buy houses in as-is condition \u2014 including the contents. You don\'t clean, you don\'t repair, you don\'t stage. We handle the cleanout, we handle the repairs, and we can ',
    { link: '/how-it-works', text: 'close on your timeline' },
    '. Sometimes that\'s two weeks, sometimes it\'s three months because you\'re waiting on probate. We work around you.',
  ]),
  p(['Will our offer be less than what you\'d get listing a fully renovated house on the MLS? Yes, and we\'re upfront about that. We\'re investors. We have to account for repair costs, carrying costs, and the risk we\'re taking on. But when you subtract the agent commissions, closing costs, repair expenses, and 6+ months of holding costs from that "higher" listing price, the gap shrinks fast. For a lot of families, the speed and simplicity tip the scales.']),
  p(['We\'re especially useful when the house needs serious work, when there are multiple heirs who just want their check, or when the probate situation is complicated and a traditional buyer\'s lender would run the other direction.']),

  h3('What About iBuyers Like Opendoor or Offerpad?'),
  p(['They don\'t operate in the Allentown market, so it\'s not an option here. Even where they do serve, their fees typically run 5-6% (similar to agent commissions) and they cherry-pick properties in good condition. If your inherited house needs work or has title complications from probate, iBuyers wouldn\'t touch it anyway. Local cash buyers like us exist specifically for the situations they won\'t handle.']),

  h3('Sell It Yourself (FSBO)'),
  p(['You skip the agent and handle everything. You save the commission but take on the marketing, showings, negotiations, and paperwork. On a normal sale, FSBO can work if you know what you\'re doing.']),
  p(['On an inherited property with potential title complications, probate requirements, and maybe a house you haven\'t set foot in for years? Honestly, we don\'t recommend it. There are too many moving pieces, and one misstep with the estate paperwork can kill a deal or create legal problems down the road.']),

  // Multiple Heirs
  h2('When Multiple Heirs Are Involved'),
  p(['This is where things can get messy, and we see it all the time.']),
  p(['Mom passes away, leaves the house to her three kids equally. One wants to sell immediately, one wants to keep it as a rental, and one hasn\'t returned anyone\'s phone calls in two months. Sound familiar?']),
  p(['Pennsylvania law requires all heirs to agree on the sale, or the executor needs court authority to sell over an heir\'s objection. If you\'re in a situation where siblings can\'t agree, here\'s what usually happens:']),
  p([{ bold: '1. Try to negotiate.' }, ' Sometimes one heir can buy out the others\' shares. If the house is worth $240K and there are three heirs, each share is $80K. Maybe the one who wants to keep it can afford to pay the other two their shares.']),
  p([{ bold: '2. Partition action.' }, ' If negotiation fails, any heir can file a partition action with the Lehigh County Court of Common Pleas. The court can order the property sold and the proceeds divided. This works, but it\'s slow, expensive (attorney fees add up fast), and adversarial. It should be a last resort.']),
  p([
    { bold: '3. Sell to a cash buyer.' },
    ' This often becomes the compromise. Nobody has to manage repairs or a listing, the sale happens fast, and everyone gets their share quickly. We\'ve helped several families in the ',
    { link: '/locations/lehigh-valley', text: 'Lehigh Valley' },
    ' resolve exactly this kind of deadlock.',
  ]),

  // Why in demand
  h2('Why Allentown Inherited Properties Are in Demand Right Now'),
  p(['Something a lot of sellers don\'t realize: the Lehigh Valley is one of the hottest migration destinations in the Northeast right now. Philadelphia and New York City residents have been moving here in significant numbers \u2014 over 1,100 households from each metro area in the last quarter of 2025 alone.']),
  p([
    'The Lehigh Valley was ranked the ',
    { bold: '#1 mid-sized market in the U.S. for economic development' },
    ' by Site Selection magazine. Lehigh and Northampton counties both rank in the ',
    { bold: 'top 8% nationally for population growth since 2020' },
    '. Major employers are expanding, warehousing and logistics continue to grow along the I-78 corridor, and the region\'s proximity to both Philly and NYC makes it attractive for remote workers.',
  ]),
  p(['All of that translates to strong demand for housing \u2014 including the kind of older, character-filled homes that often show up in inheritance situations. That three-bedroom cape cod your parents kept up since the \'70s? There\'s a buyer for it. The duplex near Lehigh Valley Hospital that\'s been a rental for 20 years? Investors want it.']),
  p(['The point is: you have leverage right now. The market wants what you\'re selling, even if the house isn\'t in perfect shape.']),

  // Next Steps
  h2('Next Steps: Getting Started'),
  p(['If you\'ve inherited a house in Allentown and you\'re trying to figure out your next move, here\'s what I\'d suggest:']),
  p([{ bold: '1. Get your legal standing sorted out.' }, ' If you haven\'t already, contact the Lehigh County Register of Wills and start the probate process. If the will names you as executor, file for Letters Testamentary. If you need a probate attorney, find one who specifically handles Lehigh County estates \u2014 every county in PA has its quirks.']),
  p([
    { bold: '2. Get the property assessed.' },
    ' Know what it\'s worth in today\'s market. You can check recent comparable sales on Redfin or Zillow, or ',
    { link: '/contact', text: 'request a no-obligation cash offer from us' },
    '. We\'ll walk the property and give you a number \u2014 no pressure, no strings.',
  ]),
  p([
    { bold: '3. Run the numbers.' },
    ' Factor in the inheritance tax, potential holding costs, repair estimates, and agent commissions if you go the listing route. Our ',
    { link: '/calculator', text: 'Home Sale Calculator' },
    ' makes this easy \u2014 plug in your property details and see the comparison side by side with county-specific PA costs.',
  ]),
  p([{ bold: '4. Talk to your co-heirs (if applicable).' }, ' Get everyone on the same page early. The longer disagreements fester, the more it costs everyone.']),
  p([
    'Or if you\'d rather just talk it through, call me directly at ',
    { bold: '(610) 904-8526' },
    '. I\'m happy to walk you through your specific situation \u2014 even if selling to us isn\'t the right move. I\'ll tell you that honestly.',
  ]),

  // Closing
  p([
    { bold: 'ClearEdge Home Buyers' },
    ' is a local cash home buying company serving ',
    { link: '/locations/allentown', text: 'Allentown' },
    ', ',
    { link: '/locations/bethlehem', text: 'Bethlehem' },
    ', ',
    { link: '/locations/easton', text: 'Easton' },
    ', and the entire ',
    { link: '/locations/lehigh-valley', text: 'Lehigh Valley' },
    '. If you\'ve inherited a property you need to sell \u2014 whether it\'s in perfect shape or needs everything \u2014 we\'d like to make you a fair cash offer. No repairs, no commissions, no hassle.',
  ]),
  p([{ bold: 'Get your no-obligation cash offer: ' }, 'clearedgehomebuyers.com']),
  p([{ bold: 'Or call Tyler directly: ' }, '(610) 904-8526']),
]

const faqs = [
  {
    _key: k(),
    question: 'Do I need probate to sell an inherited house in Allentown?',
    answer: 'It depends on how the property was titled. If it was solely in the deceased person\'s name, yes, you\'ll need to go through probate with the Lehigh County Register of Wills at 455 West Hamilton Street in Allentown. If the property was in a trust or held jointly with right of survivorship, it may transfer without probate.',
  },
  {
    _key: k(),
    question: 'How much is Pennsylvania inheritance tax on a house?',
    answer: 'PA inheritance tax rates depend on your relationship to the deceased: 0% for spouses, 4.5% for children/grandchildren, 12% for siblings, and 15% for everyone else. On a $250,000 inherited house, a child would owe approximately $11,250. You can get a 5% discount by paying within 3 months of the date of death.',
  },
  {
    _key: k(),
    question: 'Can I sell an inherited house before probate is finished?',
    answer: 'Yes. As long as the executor holds Letters Testamentary and has authority to sell (under 20 Pa.C.S. \u00a7 3351 or with Orphans\' Court approval), the property can be sold while probate is still open.',
  },
  {
    _key: k(),
    question: 'What is my inherited house in Allentown worth?',
    answer: 'As of February 2026, the median home sale price in Allentown is $245,000, but values vary significantly by neighborhood. West End properties average around $316,000, while homes on the east side may range from $100,000-$180,000 depending on condition.',
  },
  {
    _key: k(),
    question: 'How long does probate take in Lehigh County, PA?',
    answer: 'Simple estates with one heir and no disputes typically close in about 6 months. More complex situations involving multiple heirs, disagreements, or liens can take 12-18 months. Pennsylvania\'s creditor claim period alone runs one year.',
  },
]

async function main() {
  try {
    // Look up related references
    const locations = await client.fetch(
      `*[_type == "location" && slug.current in ["allentown", "lehigh-valley", "bethlehem", "easton"]] { _id, slug }`
    )
    const situations = await client.fetch(
      `*[_type == "situation" && slug.current == "inherited-property"] { _id, slug }`
    )

    console.log('Found locations:', locations.map(l => `${l.slug.current} (${l._id})`))
    console.log('Found situations:', situations.map(s => `${s.slug.current} (${s._id})`))

    const relatedLocations = locations.map(l => ({
      _type: 'reference',
      _ref: l._id,
      _key: k(),
    }))

    const relatedSituations = situations.map(s => ({
      _type: 'reference',
      _ref: s._id,
      _key: k(),
    }))

    const doc = {
      _type: 'blogPost',
      title: 'How to Sell an Inherited House in Allentown, PA (2026 Guide)',
      slug: { _type: 'slug', current: 'sell-inherited-house-allentown-pa' },
      metaTitle: 'Sell an Inherited House in Allentown PA | Cash Sale Guide',
      metaDescription: 'Step-by-step guide to selling an inherited house in Allentown, PA. Covers Lehigh County probate, PA inheritance tax rates, and cash sale options.',
      author: 'Tyler Swenson',
      authorTitle: 'Founder, ClearEdge Home Buyers',
      publishedAt: '2026-03-25T00:00:00.000Z',
      updatedAt: '2026-03-25T00:00:00.000Z',
      excerpt: 'Step-by-step guide to selling an inherited house in Allentown, PA. Covers Lehigh County probate, PA inheritance tax, neighborhood values, and cash sale options.',
      category: 'situations',
      content,
      faqs,
      relatedLocations,
      relatedSituations,
    }

    // Check if it already exists
    const existing = await client.fetch(
      `*[_type == "blogPost" && slug.current == "sell-inherited-house-allentown-pa"][0]._id`
    )

    if (existing) {
      console.log(`Blog post already exists with ID: ${existing}. Updating...`)
      const result = await client.patch(existing).set(doc).commit()
      console.log(`Updated blog post: ${result._id}`)
    } else {
      const result = await client.create(doc)
      console.log(`Created blog post: ${result._id}`)
    }

    console.log('Done!')
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
}

main()
