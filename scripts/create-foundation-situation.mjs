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

// Generate unique key for blocks
let keyCounter = 0
function uniqueKey(prefix = 'k') {
  return `${prefix}${Date.now()}${keyCounter++}`
}

// Helper to create a text block
function textBlock(text, style = 'normal') {
  return {
    _type: 'block',
    _key: uniqueKey('block'),
    style,
    children: [{ _type: 'span', _key: uniqueKey('span'), text, marks: [] }],
    markDefs: [],
  }
}

// Helper to create a block with a link
function textBlockWithLink(beforeText, linkText, href, afterText, openInNewTab = false) {
  const linkKey = uniqueKey('link')
  return {
    _type: 'block',
    _key: uniqueKey('block'),
    style: 'normal',
    children: [
      { _type: 'span', _key: uniqueKey('span'), text: beforeText, marks: [] },
      { _type: 'span', _key: uniqueKey('span'), text: linkText, marks: [linkKey] },
      { _type: 'span', _key: uniqueKey('span'), text: afterText, marks: [] },
    ],
    markDefs: [
      { _type: 'link', _key: linkKey, href, openInNewTab },
    ],
  }
}

// Helper to create a bullet list item
function bulletItem(text) {
  return {
    _type: 'block',
    _key: uniqueKey('block'),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: uniqueKey('span'), text, marks: [] }],
    markDefs: [],
  }
}

// Helper to create a bold text block
function textBlockWithBold(beforeText, boldText, afterText) {
  return {
    _type: 'block',
    _key: uniqueKey('block'),
    style: 'normal',
    children: [
      { _type: 'span', _key: uniqueKey('span'), text: beforeText, marks: [] },
      { _type: 'span', _key: uniqueKey('span'), text: boldText, marks: ['strong'] },
      { _type: 'span', _key: uniqueKey('span'), text: afterText, marks: [] },
    ],
    markDefs: [],
  }
}

const foundationSituation = {
  _type: 'situation',
  title: 'Foundation & Structural Issues',
  slug: { _type: 'slug', current: 'foundation-structural-issues' },
  metaTitle: 'Sell a House with Foundation Issues in PA | No Repairs | ClearEdge Home Buyers',
  metaDescription: 'Selling a house with foundation cracks, bowing walls, or structural damage in Pennsylvania? We buy as-is. No repairs, no inspections, close in 14-30 days.',
  heroHeadline: 'Sell Your House with Foundation or Structural Issues.',
  heroSubheadline: "Cracked foundation? Bowing basement walls? Settling or shifting? We buy houses with structural damage across Eastern Pennsylvania. You don't fix a thing.",
  problemDescription: [
    // Section 1: We Understand the Situation
    textBlock('We Understand the Situation', 'h2'),
    textBlock("Foundation problems are some of the most expensive and stressful issues a homeowner can face. A structural engineer tells you repairs could run $10,000 to $50,000+. Traditional buyers walk away the moment they hear \"foundation.\" Most lenders won't even approve a mortgage on a house with known structural problems — FHA, VA, and USDA loans all require the home to meet structural integrity standards. That eliminates 95%+ of your potential buyer pool before you even list."),
    textBlock("Meanwhile, you're still paying the mortgage, taxes, and insurance on a house that's losing value every month the problem goes untreated."),
    textBlock("If you're in this situation, you're not stuck. ClearEdge buys houses with foundation and structural issues across Eastern Pennsylvania — as-is, with zero repairs required."),

    // Section 2: Common Foundation & Structural Issues We Buy
    textBlock('Common Foundation & Structural Issues We Buy', 'h2'),
    textBlock("We've purchased homes with every type of structural problem, including:"),
    bulletItem("Cracked foundations — vertical, horizontal, and stair-step cracks in basement walls or footings"),
    bulletItem("Bowing or leaning basement walls — caused by hydrostatic pressure, soil expansion, or poor drainage"),
    bulletItem("Settling or sinking foundations — uneven floors, doors that won't close, visible gaps between walls and ceilings"),
    bulletItem("Shifting foundations — caused by expansive clay soil, tree root intrusion, or poor original construction"),
    bulletItem("Water infiltration through foundation — chronic basement flooding, moisture damage, mold from foundation leaks"),
    bulletItem("Condemned properties — houses deemed structurally unsafe by municipal inspectors"),
    bulletItem("Failed previous repairs — carbon fiber strips, wall anchors, or piers that didn't solve the problem"),
    bulletItem("Mine subsidence damage — common in NEPA's anthracite coal region (Scranton, Wilkes-Barre, Dunmore, Pittston)"),
    textBlock("No matter how severe the damage, we'll evaluate it and make you an offer."),

    // Section 3: Why Traditional Sales Don't Work
    textBlock('Why Traditional Sales Don\'t Work for Structural Issues', 'h2'),
    textBlockWithBold('', 'Financing kills the deal.', " Most buyers need a mortgage. FHA, VA, USDA, and most conventional lenders require the home to pass a structural safety inspection. If your foundation fails, the buyer's loan gets denied and the deal collapses — often after you've waited months."),
    textBlockWithBold('', 'Repair-before-sale is a money pit.', ' Foundation repair contractors in Pennsylvania typically charge $5,000-$50,000+ depending on severity. Minor crack injection runs $250-$800. Pier installation for settling costs $1,000-$3,000 per pier ($5,000-$25,000+ total). Bowing wall repair with carbon fiber or anchors runs $4,000-$12,000. Full basement underpinning can cost $20,000-$50,000+. And even after spending $20,000+ on repairs, you still have to disclose the history. Many buyers will still walk away.'),
    textBlockWithLink('', 'Disclosure requirements are strict.', 'https://www.legis.state.pa.us/cfdocs/legis/LI/consCheck.cfm?txtType=HTM&ttl=68', " Pennsylvania law (68 Pa.C.S. § 7301-7315) requires sellers to disclose ALL known material defects, including foundation movement, past water intrusion, and any prior structural repairs. You can't hide it, and you shouldn't — it's a legal liability.", true),
    textBlockWithBold('', 'The math rarely works.', " You spend $25,000 on foundation repair. You wait 3-5 months to list, show, negotiate, and close. You pay 5-6% in agent commissions. You pay seller closing costs. After all that, you often net LESS than a cash offer would have given you on day one — with none of the risk."),

    // Section 4: How ClearEdge Handles It Differently
    textBlock('How ClearEdge Handles Foundation Issues Differently', 'h2'),
    textBlockWithBold('', 'We buy as-is.', " We don't ask you to repair anything. We assess the structural damage ourselves and factor repair costs into our offer. You don't spend a dollar."),
    textBlockWithBold('', 'No lender approval needed.', " We pay cash. There's no bank, no appraisal contingency, no structural inspection requirement that can kill the deal. When we make an offer, we close."),
    textBlockWithBold('', 'We know Eastern PA construction.', " Many homes in our service area were built in the early 1900s with stone, block, or poured concrete foundations. We've bought properties in Scranton with mine subsidence damage, homes in Allentown with bowing block walls, and houses in Wilkes-Barre with chronic basement flooding from high water tables. This isn't new to us."),
    textBlockWithLink('', 'Transparent offer calculation.', '/how-it-works', " We show you exactly how we arrive at your cash offer — including what we estimate structural repairs will cost. You'll see the math. No black box. Learn more about how we calculate your cash offer on our How It Works page.", false),

    // Section 5: PA-Specific Considerations
    textBlock('PA-Specific Considerations', 'h2'),
    textBlockWithLink('', 'Mine subsidence in NEPA:', 'https://www.pamsi.org/', " If your home is in the anthracite coal region (Scranton, Wilkes-Barre, Dunmore, Pittston, Carbondale), foundation damage may be caused by historic mine subsidence. The PA Mine Subsidence Insurance program (PAMSI) covers some damage, but many homeowners find the claims process slow and the coverage insufficient. We buy mine-subsidence-damaged homes regardless of insurance status.", true),
    textBlockWithBold('', 'Older housing stock:', " Eastern Pennsylvania has some of the oldest housing stock in the country. Homes built in the 1800s and early 1900s with stone rubble foundations, unreinforced block, or lime mortar joints are especially prone to structural issues. We're experienced with these property types."),
    textBlockWithBold('', 'Municipal condemnation:', " If your property has been condemned or received structural violation notices from your municipality, we can still buy it. We've purchased condemned properties and work with local code enforcement to resolve violations after closing."),

    // Related links
    textBlock('Related Situations', 'h2'),
    textBlockWithLink('Dealing with other major repairs? See our ', 'Major Repairs page', '/situations/major-repairs', '.', false),
    textBlockWithLink('Property has code violations? Visit our ', 'Tax Liens & Code Violations page', '/situations/tax-liens-code-violations', '.', false),
    textBlockWithLink('Not sure if cash buyer is right for you? ', 'Compare cash buyers vs. realtors', '/cash-buyer-vs-realtor', '.', false),
  ],
  benefits: [
    {
      title: 'Sell 100% As-Is',
      description: "Foundation cracks, bowing walls, settling — we buy it all without asking you to fix anything. Our team assesses the damage and factors repair costs into our offer. You don't spend a dime.",
    },
    {
      title: 'No Lender Approval Needed',
      description: "Traditional buyers need mortgages that require structural inspections. We pay cash, so there's no bank, no appraisal contingency, and no deal falling through at the last minute.",
    },
    {
      title: 'Close in 14-30 Days',
      description: "Foundation repairs can take months. Listing traditionally can take 6+ months. We can close in as little as 14 days — or longer if you need it. You pick the date.",
    },
    {
      title: 'Transparent Pricing',
      description: "We show you exactly how we calculate your offer, including estimated repair costs. No mystery math, no lowball surprises. You see every number before you decide.",
    },
    {
      title: 'Zero Fees or Commissions',
      description: "No agent commissions (5-6%), no closing costs, no junk fees. The offer we make is what you receive at closing.",
    },
    {
      title: 'Local PA Expertise',
      description: "We've been buying houses across NEPA, Lehigh Valley, and the Poconos since 2016. We understand mine subsidence, older construction, and the unique challenges of Eastern PA homes.",
    },
  ],
  faqs: [
    {
      question: 'Can I sell a house with foundation problems in Pennsylvania?',
      answer: "Yes. Pennsylvania law allows you to sell a home in any condition. You're required to disclose known structural defects under the PA Seller Disclosure Act (68 Pa.C.S. § 7301-7315), but you are NOT required to repair them before selling.",
    },
    {
      question: 'How much less will I get for a house with foundation issues?',
      answer: "It depends on the severity. Minor cracks might reduce value by $5,000-$10,000. Major structural damage like bowing walls or significant settling can reduce value by $20,000-$50,000+. Our cash offer factors in estimated repair costs transparently — we show you the math.",
    },
    {
      question: 'Should I fix the foundation before selling?',
      answer: "In most cases, no. Foundation repairs in Pennsylvania typically cost $5,000-$50,000+ and take weeks to months. Even after repairs, you must disclose the history, and many buyers are still deterred. For most homeowners, selling as-is to a cash buyer nets a similar or better result with zero risk and zero out-of-pocket cost.",
    },
    {
      question: 'Do I need a structural engineer report before selling?',
      answer: "You don't need one to sell to us. We'll assess the property ourselves. However, if you already have an engineer's report, sharing it helps us make a more accurate offer faster.",
    },
    {
      question: 'Will you buy my house if it\'s been condemned?',
      answer: "Yes. We've purchased condemned properties across Eastern PA. We handle all code enforcement and municipal compliance after closing. You walk away clean.",
    },
    {
      question: 'Do you buy houses with mine subsidence damage?',
      answer: "Yes. Mine subsidence is common in our NEPA service area (Scranton, Wilkes-Barre, Dunmore, Pittston, Carbondale). We've purchased multiple properties with subsidence damage and are experienced with the unique challenges these properties present.",
    },
    {
      question: 'What types of foundation problems do you buy?',
      answer: "All types — cracked foundations (vertical, horizontal, stair-step), bowing or leaning basement walls, settling or sinking foundations, shifting foundations, water infiltration through foundation, and even properties with failed previous repairs. No structural issue is too severe for us to consider.",
    },
  ],
}

async function main() {
  console.log('='.repeat(70))
  console.log('Creating Foundation & Structural Issues Situation Page')
  console.log('='.repeat(70))

  // Check if situation already exists
  const existing = await client.fetch(
    `*[_type == "situation" && slug.current == "foundation-structural-issues"][0]`
  )

  if (existing) {
    console.log('⚠️ Situation already exists. Updating...')
    await client.patch(existing._id).set(foundationSituation).commit()
    console.log('✅ Situation updated successfully')
  } else {
    console.log('Creating new situation...')
    const result = await client.create(foundationSituation)
    console.log(`✅ Situation created with ID: ${result._id}`)
  }

  console.log('\nSlug: foundation-structural-issues')
  console.log('URL: /situations/foundation-structural-issues')
  console.log('='.repeat(70))
}

main().catch(console.error)
