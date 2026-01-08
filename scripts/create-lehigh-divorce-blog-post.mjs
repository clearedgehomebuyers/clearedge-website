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
  title: 'Sell House Fast During Divorce Lehigh County: Your Complete Guide to Moving Forward',
  slug: { _type: 'slug', current: 'sell-house-fast-during-divorce-lehigh-county-pa' },
  metaTitle: 'Sell House Fast During Divorce Lehigh County PA | Cash Offer in 7 Days',
  metaDescription: "Going through divorce in Lehigh County? Learn how to sell your house fast, split proceeds fairly, and move on. Get a cash offer with no repairs needed.",
  excerpt: "Going through a divorce in Lehigh County? Learn how to sell your house fast, divide proceeds fairly, and move forward. Cash offers available with closing in as little as 7 days.",
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2025-10-15T10:00:00Z',
  category: 'situations',

  faqs: [
    {
      _key: 'faq1',
      question: 'Can I sell my house before the divorce is final in Pennsylvania?',
      answer: "Yes. Many couples sell before finalizing to simplify asset division. Both spouses typically need to consent, or you'll need a court order."
    },
    {
      _key: 'faq2',
      question: 'Do both spouses have to sign to sell a house in Lehigh County?',
      answer: "In most cases, yes. If the house is marital property (owned as tenants by the entireties), both signatures are required. A court can order the sale if one spouse refuses."
    },
    {
      _key: 'faq3',
      question: 'How fast can I sell my house during divorce?',
      answer: 'With a cash buyer like ClearEdge Home Buyers, you can close in as little as 7 days. Traditional sales typically take 30-90 days minimum.'
    },
    {
      _key: 'faq4',
      question: 'Who pays the mortgage while the house is for sale?',
      answer: 'This depends on your separation agreement. Often, the spouse living in the house pays, or payments are split. Selling fast minimizes these ongoing costs.'
    },
    {
      _key: 'faq5',
      question: 'What happens to the equity when we sell?',
      answer: 'Equity is divided according to your divorce settlement or court order. At closing, the title company cuts separate checks to each party.'
    },
    {
      _key: 'faq6',
      question: "Can I sell if my name isn't on the deed?",
      answer: "If you're married and the house was purchased during the marriage, it's likely marital property regardless of whose name is on the deed. You have rights to your share."
    },
    {
      _key: 'faq7',
      question: 'What if the house is underwater (worth less than we owe)?',
      answer: "This complicates things. You may need to negotiate a short sale with your lender or bring cash to closing to cover the shortage. We can discuss options specific to your situation."
    },
    {
      _key: 'faq8',
      question: 'Do I need my divorce attorney involved in the sale?',
      answer: "It's strongly recommended. Your attorney can review the sale contract, ensure it aligns with your settlement agreement, and protect your interests."
    }
  ],

  content: [
    // Intro section
    mixedBlock('intro1', [
      { text: 'Sell house fast during divorce Lehigh County', marks: ['strong'] },
      { text: "—if you're reading this, you're probably exhausted." }
    ]),
    textBlock('intro2', "You're dealing with lawyers."),
    textBlock('intro3', 'Custody conversations.'),
    textBlock('intro4', 'Dividing up a life you built together.'),
    textBlock('intro5', "And now someone's asking what you want to do with the house."),
    textBlock('intro6', "Here's the truth most people won't tell you:"),
    mixedBlock('intro7', [
      { text: 'The house is usually the biggest asset AND the biggest headache in any Lehigh County divorce.', marks: ['strong'] }
    ]),
    textBlock('intro8', "I'm Tyler Swenson, founder of ClearEdge Home Buyers."),
    textBlock('intro9', "Since 2016, I've helped over 200 homeowners across Eastern Pennsylvania sell properties in tough situations."),
    textBlock('intro10', 'Divorce sales make up a significant portion of what we do.'),
    textBlock('intro11', "Not because divorce is common (though it is), but because selling a house during divorce requires something most real estate transactions don't:"),
    mixedBlock('intro12', [
      { text: 'Speed. Neutrality. Zero drama.', marks: ['strong'] }
    ]),
    textBlock('intro13', 'Let me show you exactly how this works in Lehigh County.'),

    // H2: Why Selling Fast Makes Sense
    textBlock('h2why', 'Why Selling Your House Fast During Divorce Actually Makes Sense', 'h2'),
    mixedBlock('why1', [
      { text: 'Most divorce attorneys in ' },
      { text: 'Allentown', marks: ['allentownLink'] },
      { text: ' will tell you the same thing:' }
    ], [{ _type: 'link', _key: 'allentownLink', href: '/locations/allentown' }]),
    textBlock('why2', 'The longer the house sits unsold, the longer your divorce drags on.'),
    mixedBlock('why3', [
      { text: 'Pennsylvania is an "' },
      { text: 'equitable distribution', marks: ['divorceLink'] },
      { text: '" state.' }
    ], [{ _type: 'link', _key: 'divorceLink', href: '/situations/divorce' }]),
    textBlock('why4', 'That means the court divides marital property fairly—not necessarily 50/50.'),
    textBlock('why5', 'Your house is almost certainly marital property if you bought it during the marriage.'),
    textBlock('why6', 'Even if only one name is on the deed.'),
    mixedBlock('why7', [{ text: "Here's what that means practically:", marks: ['strong'] }]),
    textBlock('why8', '• Both spouses typically need to agree to sell'),
    textBlock('why9', '• Both spouses need to sign closing documents'),
    textBlock('why10', '• Proceeds get split according to your settlement agreement'),
    textBlock('why11', 'The faster you sell, the faster you both get your share and move on.'),
    textBlock('why12', "I've seen Lehigh County divorces drag on for years because neither spouse could agree on what to do with the house."),
    textBlock('why13', "Don't let that be you."),

    // H2: 3 Options
    textBlock('h2options', 'The 3 Options for Your Lehigh County Marital Home', 'h2'),
    textBlock('opt1', "When you're divorcing in Lehigh County, you basically have three choices for the house:"),
    mixedBlock('opt2', [{ text: 'Option 1: One Spouse Buys Out the Other', marks: ['strong'] }]),
    textBlock('opt3', 'This sounds simple.'),
    textBlock('opt4', 'It rarely is.'),
    textBlock('opt5', 'The buying spouse needs to:'),
    textBlock('opt6', '• Qualify for a new mortgage on their own'),
    textBlock('opt7', '• Have enough cash to pay the other spouse their equity share'),
    textBlock('opt8', '• Handle refinancing within a court-ordered timeframe'),
    textBlock('opt9', 'In Allentown, where median home values hover around $265,000-$305,000, that buyout could be $50,000-$150,000 depending on your equity.'),
    textBlock('opt10', "Most people going through divorce don't have that sitting around."),
    mixedBlock('opt11', [{ text: 'Option 2: List with a Realtor', marks: ['strong'] }]),
    textBlock('opt12', 'The traditional route.'),
    textBlock('opt13', 'Works great if:'),
    textBlock('opt14', '• You and your ex can cooperate on showings'),
    textBlock('opt15', '• The house is in good condition'),
    textBlock('opt16', '• You have 3-6 months to wait'),
    textBlock('opt17', '• You can agree on a listing price'),
    textBlock('opt18', "Doesn't work if:"),
    textBlock('opt19', "• One spouse has moved out and won't coordinate"),
    textBlock('opt20', '• The house needs repairs neither of you wants to pay for'),
    textBlock('opt21', '• You need to close quickly to finalize the divorce'),
    textBlock('opt22', '• Every conversation turns into an argument'),
    mixedBlock('opt23', [{ text: 'Option 3: Sell to a Cash Home Buyer', marks: ['strong'] }]),
    textBlock('opt24', 'This is what we do at ClearEdge Home Buyers.'),
    textBlock('opt25', "Here's how it works:"),
    textBlock('opt26', '• We make a cash offer within 24-48 hours'),
    textBlock('opt27', '• No repairs needed—we buy as-is'),
    textBlock('opt28', '• Close in as little as 7 days (or on your timeline)'),
    textBlock('opt29', "• Both spouses get their share at closing"),
    textBlock('opt30', 'No showings.'),
    textBlock('opt31', 'No strangers walking through your house.'),
    textBlock('opt32', 'No waiting for bank approvals.'),
    textBlock('opt33', 'For divorcing couples in Lehigh County, this option removes the house from the equation fast.'),

    // H2: Pennsylvania Divorce Law
    textBlock('h2law', 'Pennsylvania Divorce Law: What You Need to Know About Selling', 'h2'),
    textBlock('law1', 'Before you do anything, understand this:'),
    mixedBlock('law2', [{ text: 'Both spouses must typically sign off on the sale.', marks: ['strong'] }]),
    textBlock('law3', 'Pennsylvania law requires consent from both parties to sell marital property during divorce proceedings.'),
    textBlock('law4', 'If one spouse refuses?'),
    textBlock('law5', 'The other spouse can petition the Lehigh County Family Court (located at 455 West Hamilton Street in Allentown) to order the sale.'),
    textBlock('law6', 'Courts can and do force sales when:'),
    textBlock('law7', "• Neither spouse can afford the house alone"),
    textBlock('law8', "• The parties can't agree on value"),
    textBlock('law9', '• Selling is necessary to divide assets fairly'),
    mixedBlock('law10', [{ text: 'The 90-Day Rule', marks: ['strong'] }]),
    textBlock('law11', 'If both spouses consent to divorce (mutual consent divorce), Pennsylvania requires a 90-day waiting period after filing before the divorce can be finalized.'),
    textBlock('law12', 'During those 90 days, you can negotiate property division—including selling the house.'),
    mixedBlock('law13', [{ text: 'The 1-Year Separation Rule', marks: ['strong'] }]),
    textBlock('law14', "If one spouse doesn't consent?"),
    textBlock('law15', 'The other spouse must prove they\'ve lived "separate and apart" for one year before filing.'),
    textBlock('law16', "This is why selling the house early often makes sense—it creates clear separation and removes a major point of conflict."),

    // H2: How Divorce Sales Work
    textBlock('h2how', 'How Divorce Sales Work in Allentown, Bethlehem, Emmaus & Whitehall', 'h2'),
    textBlock('how1', "I've bought houses from divorcing couples across Lehigh County."),
    mixedBlock('how2', [
      { text: '' },
      { text: 'Allentown', marks: ['allentownLink2'] },
      { text: '.' }
    ], [{ _type: 'link', _key: 'allentownLink2', href: '/locations/allentown' }]),
    mixedBlock('how3', [
      { text: '' },
      { text: 'Bethlehem', marks: ['bethlehemLink'] },
      { text: '.' }
    ], [{ _type: 'link', _key: 'bethlehemLink', href: '/locations/bethlehem' }]),
    textBlock('how4', 'Emmaus.'),
    textBlock('how5', 'Macungie.'),
    textBlock('how6', 'Whitehall Township.'),
    textBlock('how7', 'Catasauqua.'),
    textBlock('how8', 'Every situation is different, but the process stays the same:'),
    mixedBlock('how9', [{ text: 'Step 1: Both Parties Contact Us (or One Party Does)', marks: ['strong'] }]),
    textBlock('how10', "You don't both need to call."),
    textBlock('how11', 'One spouse can reach out to get the ball rolling.'),
    textBlock('how12', "We'll explain the process and answer questions for whoever wants to listen."),
    mixedBlock('how13', [{ text: 'Step 2: We Make a Cash Offer', marks: ['strong'] }]),
    textBlock('how14', 'We look at the property—sometimes in person, sometimes virtually.'),
    textBlock('how15', 'Then we make a fair cash offer based on:'),
    textBlock('how16', '• Current Lehigh County market conditions'),
    textBlock('how17', "• The property's condition"),
    textBlock('how18', '• Recent comparable sales in your neighborhood'),
    textBlock('how19', 'No lowball games.'),
    textBlock('how20', 'No bait-and-switch.'),
    mixedBlock('how21', [{ text: 'Step 3: You Both Decide', marks: ['strong'] }]),
    textBlock('how22', 'Take our offer to your attorneys.'),
    textBlock('how23', "Compare it to what you'd net after realtor commissions, repairs, and months of carrying costs."),
    textBlock('how24', 'Most divorcing couples find the cash offer makes more sense when they factor in:'),
    textBlock('how25', '• 6% realtor commission saved'),
    textBlock('how26', '• $0 in repair costs'),
    textBlock('how27', '• $0 in mortgage payments while waiting to sell'),
    textBlock('how28', '• The value of closing this chapter NOW'),
    mixedBlock('how29', [{ text: 'Step 4: Close on Your Timeline', marks: ['strong'] }]),
    textBlock('how30', 'Need to close in 7 days? We can do that.'),
    textBlock('how31', 'Need 30 days to coordinate with your divorce finalization? No problem.'),
    textBlock('how32', 'You pick the closing date.'),
    textBlock('how33', 'At closing, the title company cuts separate checks to each spouse according to your agreement.'),
    textBlock('how34', 'Clean. Simple. Done.'),

    // H2: What About the Mortgage
    textBlock('h2mortgage', 'What About the Mortgage?', 'h2'),
    textBlock('mtg1', 'This is where a lot of divorcing couples get stuck.'),
    mixedBlock('mtg2', [{ text: "If you're both on the mortgage, you're both liable until it's paid off.", marks: ['strong'] }]),
    textBlock('mtg3', 'Even after the divorce is final.'),
    textBlock('mtg4', "Here's what I mean:"),
    textBlock('mtg5', "Let's say your divorce decree says your ex is responsible for the mortgage."),
    textBlock('mtg6', 'If they stop paying?'),
    textBlock('mtg7', "The bank doesn't care about your divorce decree."),
    textBlock('mtg8', "They're coming after both of you."),
    textBlock('mtg9', 'Your credit takes the hit.'),
    mixedBlock('mtg10', [{ text: 'Selling the house eliminates this risk entirely.', marks: ['strong'] }]),
    textBlock('mtg11', 'The mortgage gets paid off at closing.'),
    textBlock('mtg12', 'Both names come off the loan.'),
    textBlock('mtg13', "Neither of you is tied to the other financially anymore."),

    // H2: Tax Implications
    textBlock('h2tax', 'Tax Implications: What Lehigh County Sellers Need to Know', 'h2'),
    textBlock('tax1', "I'm not a tax advisor, so talk to your CPA."),
    textBlock('tax2', "But here's what you should know:"),
    mixedBlock('tax3', [{ text: 'Capital Gains Exclusion', marks: ['strong'] }]),
    textBlock('tax4', 'Married couples can exclude up to $500,000 in capital gains on the sale of their primary residence.'),
    textBlock('tax5', 'Single filers can exclude $250,000.'),
    textBlock('tax6', 'If you sell BEFORE the divorce is final, you may be able to use the $500,000 married exclusion.'),
    textBlock('tax7', 'This matters if you have significant equity.'),
    mixedBlock('tax8', [{ text: 'Transfer Taxes', marks: ['strong'] }]),
    textBlock('tax9', 'Pennsylvania charges transfer tax on real estate sales.'),
    textBlock('tax10', 'In Lehigh County, combined state and local transfer taxes typically run around 2%.'),
    textBlock('tax11', 'Some divorce settlements split this cost.'),
    textBlock('tax12', 'Others assign it to one party.'),
    textBlock('tax13', 'Work this out in your settlement agreement.'),

    // H2: Emotional Side
    textBlock('h2emo', 'Real Talk: The Emotional Side of Selling During Divorce', 'h2'),
    textBlock('emo1', 'Let me be straight with you.'),
    textBlock('emo2', "This isn't just a financial transaction."),
    textBlock('emo3', "It's the end of something."),
    textBlock('emo4', "I've sat across the table from couples who built a life in that house."),
    textBlock('emo5', 'Raised kids.'),
    textBlock('emo6', 'Celebrated holidays.'),
    textBlock('emo7', 'Made memories.'),
    textBlock('emo8', 'Letting go is hard.'),
    textBlock('emo9', "But here's what I've learned from doing this since 2016:"),
    mixedBlock('emo10', [{ text: "The house isn't the marriage.", marks: ['strong'] }]),
    textBlock('emo11', "Keeping the house won't fix what broke."),
    textBlock('emo12', 'And in most cases, holding onto it just keeps you both stuck.'),
    textBlock('emo13', 'Selling—especially selling fast—lets you turn the page.'),
    textBlock('emo14', 'New chapter.'),
    textBlock('emo15', 'New start.'),
    textBlock('emo16', "New home that's truly yours."),

    // H2: Why Cash Offers Work
    textBlock('h2cash', 'Why Cash Offers Work for Divorce Sales', 'h2'),
    textBlock('cash1', 'Traditional sales have too many variables.'),
    mixedBlock('cash2', [{ text: 'Financing falls through', marks: ['strong'] }]),
    textBlock('cash3', 'Buyers get pre-approved, then their loan gets denied.'),
    textBlock('cash4', 'Back to square one.'),
    textBlock('cash5', "Meanwhile, your divorce is on hold and you're both still paying the mortgage."),
    mixedBlock('cash6', [{ text: 'Inspection issues', marks: ['strong'] }]),
    textBlock('cash7', 'Buyers find problems.'),
    textBlock('cash8', 'They want credits or repairs.'),
    textBlock('cash9', 'Now you and your ex have to negotiate repairs on a house neither of you wants.'),
    textBlock('cash10', 'More conflict. More delays.'),
    mixedBlock('cash11', [{ text: 'Appraisal comes in low', marks: ['strong'] }]),
    textBlock('cash12', "The bank won't lend more than the appraised value."),
    textBlock('cash13', "The buyer can't cover the gap."),
    textBlock('cash14', 'Deal falls apart.'),
    mixedBlock('cash15', [{ text: 'Cash offers eliminate all of this.', marks: ['strong'] }]),
    textBlock('cash16', 'No lender. No appraisal contingency. No financing fall-through.'),
    textBlock('cash17', 'We have the funds ready.'),
    textBlock('cash18', "When we say we'll close, we close."),

    // H2: What If Ex Won't Cooperate
    textBlock('h2ex', "What If My Ex Won't Cooperate?", 'h2'),
    textBlock('ex1', "This happens more than you'd think."),
    textBlock('ex2', 'Sometimes one spouse wants to sell.'),
    textBlock('ex3', 'The other wants to fight about it.'),
    textBlock('ex4', 'Here are your options:'),
    mixedBlock('ex5', [{ text: '1. Have Your Attorney Request a Court Order', marks: ['strong'] }]),
    textBlock('ex6', 'The Lehigh County Court of Common Pleas has the authority to order the sale of marital property.'),
    textBlock('ex7', 'If selling is the only practical way to divide the asset, judges will often order it.'),
    mixedBlock('ex8', [{ text: '2. Propose a Buyout', marks: ['strong'] }]),
    textBlock('ex9', 'If your ex wants to keep the house, they need to buy you out.'),
    textBlock('ex10', 'Get an appraisal.'),
    textBlock('ex11', 'Calculate your equity share.'),
    textBlock('ex12', 'Give them a deadline to secure financing.'),
    textBlock('ex13', "If they can't, the house gets sold."),
    mixedBlock('ex14', [{ text: '3. Wait Out the Separation Period', marks: ['strong'] }]),
    textBlock('ex15', "If they won't consent to divorce, you may need to wait the one-year separation period."),
    textBlock('ex16', 'But once that year passes, the court can grant the divorce and order property division—including forcing the sale.'),

    // H2: CTA
    textBlock('h2cta', 'Ready to Sell Your Lehigh County House Fast During Divorce?', 'h2'),
    textBlock('cta1', "If you're going through a divorce in Allentown, Bethlehem, Emmaus, Whitehall, Macungie, Catasauqua, or anywhere in Lehigh County, I want to help."),
    textBlock('cta2', 'At ClearEdge Home Buyers, we specialize in making difficult situations simple.'),
    textBlock('cta3', 'No pressure.'),
    textBlock('cta4', 'No judgment.'),
    textBlock('cta5', 'Just a fair cash offer and a fast closing.'),
    mixedBlock('cta6', [{ text: "Here's how to get started:", marks: ['strong'] }]),
    mixedBlock('cta7', [
      { text: '' },
      { text: 'Learn how our simple 3-step process works', marks: ['howLink'] },
      { text: '' }
    ], [{ _type: 'link', _key: 'howLink', href: '/how-it-works' }]),
    textBlock('cta8', "Or if you're ready for your free, no-obligation cash offer:"),
    mixedBlock('cta9', [
      { text: '' },
      { text: 'Request your cash offer now', marks: ['homeLink'] },
      { text: '' }
    ], [{ _type: 'link', _key: 'homeLink', href: '/' }]),
    mixedBlock('cta10', [
      { text: 'Sell house fast during divorce Lehigh County', marks: ['strong'] },
      { text: "—it's possible, and I'm here to help you do it right." }
    ]),
  ]
}

async function main() {
  console.log('Starting Lehigh County divorce blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

  try {
    // Fetch location references for Lehigh County
    console.log('\nFetching Lehigh County location references...')
    const locationNames = ['Allentown', 'Bethlehem', 'Emmaus', 'Macungie', 'Whitehall Township', 'Catasauqua', 'Whitehall']
    const locations = await client.fetch(
      `*[_type == "location" && (
        city in $names ||
        slug.current in ["allentown", "bethlehem", "emmaus", "macungie", "whitehall-township", "whitehall", "catasauqua"]
      )]{ _id, city, county, slug }`,
      { names: locationNames }
    )

    console.log(`Found ${locations.length} location(s):`)
    locations.forEach(loc => {
      console.log(`  - ${loc.city} (${loc.county || 'No county'}) - slug: ${loc.slug?.current}`)
    })

    // Fetch divorce situation reference
    console.log('\nFetching situation references...')
    const situations = await client.fetch(
      `*[_type == "situation" && slug.current == "divorce"]{ _id, title, slug }`
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
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/sell-house-fast-during-divorce-lehigh-county-pa')

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
