import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const blogPostContent = [
  // Intro
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Looking for cash home buyers in Lackawanna County with no fees?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You\'re in the right place.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'m Tyler Swenson, founder of ClearEdge Home Buyers.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Since 2016, I\'ve bought over 200 houses across NEPA — Scranton, Dunmore, Carbondale, Old Forge, and everywhere in between.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'And yeah, we don\'t charge fees.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'No commissions. No closing costs. No "gotchas" at the end.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'But here\'s the thing. Not every cash buyer operates like us.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Some say "no fees" then sneak in junk fees at closing. Some lowball you so hard the "no fees" doesn\'t even matter. Some aren\'t even real buyers — they\'re wholesalers who flip your contract to someone else.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'So let me break down exactly how to find legitimate cash home buyers in Lackawanna County, what "no fees" actually means, and how to avoid getting ripped off.' }],
  },

  // H2: What Does "No Fees" Actually Mean
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'What Does "No Fees" Actually Mean When Selling to a Cash Buyer?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'When you sell your house the traditional way (with a real estate agent), you pay:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Agent commission (5-6% of sale price)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Closing costs (2-3% of sale price)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Repairs (whatever the buyer demands after inspection)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Concessions (often another 1-3% to sweeten the deal)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'On a $150,000 house, that\'s $12,000-$18,000 out of your pocket.', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'When a cash home buyer says "no fees," it should mean:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• No commission', marks: ['strong'] },
      { _type: 'span', text: ' — you\'re selling direct, no agent' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• No closing costs', marks: ['strong'] },
      { _type: 'span', text: ' — the buyer pays title, transfer taxes, everything' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• No repair credits', marks: ['strong'] },
      { _type: 'span', text: ' — they buy as-is, period' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• No hidden charges', marks: ['strong'] },
      { _type: 'span', text: ' — what they offer is what you get' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'At ClearEdge Home Buyers, our offer is your net.', marks: ['strong'] },
      { _type: 'span', text: ' If we say $85,000, you walk away with $85,000. Minus your mortgage payoff, of course. But no fees taken out of our side.' },
    ],
  },

  // H2: How Cash Buyers Make Money
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'How Cash Home Buyers in Lackawanna County Make Money (If They Don\'t Charge Fees)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We buy your house at a discount, renovate it, and sell it for a profit. Or we keep it as a rental.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s a real example:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Your house after full renovation (ARV): $180,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Cost to renovate: $40,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Our purchase price to you: $95,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Our profit after selling: ~$20,000-30,000 (minus holding costs, selling costs, etc.)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'We\'re not making money FROM you. ', marks: ['strong'] },
      { _type: 'span', text: 'We\'re making money on the back end — after we put in the work to fix up the property.' },
    ],
  },

  // H2: Why Lackawanna County Homeowners Choose Cash Buyers
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Why Lackawanna County Homeowners Choose Cash Buyers' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Speed' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Average home in Lackawanna County sits on market 45-60+ days. Then another 30-45 days to close. That\'s 3-4 months minimum. We close in 7-14 days.' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Condition' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Your house needs a new roof? Foundation issues? Outdated everything? Agents won\'t even take the listing. Buyers won\'t get financing. We buy as-is.' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Certainty' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Traditional sales fall through all the time. Financing denied. Inspection issues. Cold feet. Cash means cash. No contingencies.' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Privacy' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'No strangers walking through your house. No open houses. No sign in the yard. One visit from us. Done.' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Life Situations' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Divorce. Inherited property. Foreclosure. Job relocation. Behind on taxes. Sometimes you just need it gone.' }],
  },

  // H2: Red Flags
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Red Flags: How to Spot Shady Cash Buyers in Lackawanna County' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Red Flag #1: They won\'t show proof of funds' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Legitimate cash buyers can prove they have the money. Ask for a bank statement or proof of funds letter. If they dodge, walk away.' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Red Flag #2: They pressure you to sign immediately' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Good buyers give you time to think. Shady buyers create false urgency. "This offer is only good today" is a red flag.' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Red Flag #3: They\'re actually wholesalers (not buyers)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Some "cash buyers" aren\'t buyers at all. They get your house under contract, then sell that contract to someone else. Ask directly: "Are YOU buying this house, or are you assigning the contract?"' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Red Flag #4: Fees appear at closing' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You were promised no fees. Then at closing, suddenly there\'s administrative fees, processing fees, document prep fees. Get everything in writing upfront.' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Red Flag #5: The offer is way below everyone else' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Get multiple offers. If one buyer is $20,000 lower than everyone else, something\'s off. Compare apples to apples.' }],
  },

  // H2: How to Find Legitimate Cash Buyers
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'How to Find Legitimate Cash Home Buyers in Lackawanna County' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 1: Get multiple offers. ', marks: ['strong'] },
      { _type: 'span', text: 'Never take the first offer. Get at least 2-3 cash offers to compare.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 2: Check reviews. ', marks: ['strong'] },
      { _type: 'span', text: 'Google the company. Check Facebook. Look for real reviews from real people in Scranton, Dunmore, and Carbondale.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 3: Verify they\'re local. ', marks: ['strong'] },
      { _type: 'span', text: 'National "we buy houses" companies often pay less than local buyers. Local buyers have lower overhead and know the Lackawanna County market.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 4: Ask how they calculate offers. ', marks: ['strong'] },
      { _type: 'span', text: 'A good cash buyer will explain their math — ARV, repair costs, profit margin. If they can\'t explain it, be suspicious.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 5: Read the contract carefully. ', marks: ['strong'] },
      { _type: 'span', text: 'Understand purchase price, who pays closing costs, fees (should be none), inspection period, and cancellation terms.' },
    ],
  },

  // H2: What to Expect
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'What to Expect When You Sell to ClearEdge Home Buyers' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 1: You contact us. ', marks: ['strong'] },
      { _type: 'span', text: 'Fill out the form or call (570) 904-2059. Tell us about your property — address, condition, situation.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 2: We make an offer. ', marks: ['strong'] },
      { _type: 'span', text: 'Usually within 24 hours. We explain exactly how we calculated it. No hidden math.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 3: You decide. ', marks: ['strong'] },
      { _type: 'span', text: 'No pressure. Take your time. Get other offers if you want.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 4: We close. ', marks: ['strong'] },
      { _type: 'span', text: 'Pick your closing date. 7 days or 30 days — your choice. We handle all the paperwork. You show up, sign, get paid.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'No fees taken out. No surprises. No games.', marks: ['strong'] },
    ],
  },

  // H2: Comparison
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Cash Offer vs. Traditional Sale: Lackawanna County Comparison' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let\'s look at a real-world example on a $150,000 as-is house:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Traditional Sale:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• List price: $110,000 (needs work)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Time to close: 105 days' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Commission (6%): -$6,600' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Closing costs (3%): -$3,300' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Repair credits: -$5,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Net to seller: $95,100', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Cash Sale to ClearEdge:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Offer: $92,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Time to close: 14 days' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Commission: $0' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Closing costs: $0' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Repairs: $0' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Net to seller: $92,000', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Difference: $3,100 less with cash. But you save 3+ months of holding costs ($4,000-6,000 in mortgage, taxes, insurance) and get certainty of closing.' }],
  },

  // H2: Situations Where Cash Buyers Make Sense
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Situations Where Cash Buyers Make the Most Sense' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Cash sales aren\'t for everyone. But they\'re ideal for:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Inherited property', marks: ['strong'] },
      { _type: 'span', text: ' — You don\'t want to deal with an estate house across town' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Pre-foreclosure', marks: ['strong'] },
      { _type: 'span', text: ' — You need to sell fast before the sheriff\'s sale' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Divorce', marks: ['strong'] },
      { _type: 'span', text: ' — Split the proceeds and move on quickly' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Major repairs needed', marks: ['strong'] },
      { _type: 'span', text: ' — House won\'t qualify for traditional financing' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Tired landlord', marks: ['strong'] },
      { _type: 'span', text: ' — Done dealing with tenants and repairs' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Behind on taxes', marks: ['strong'] },
      { _type: 'span', text: ' — We can work with tax liens and bring them current at closing' },
    ],
  },

  // H2: Closing / CTA
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Get Your Free Cash Offer Today' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you\'re looking for cash home buyers in Lackawanna County with no fees, you\'ve got options.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Just be smart about it. Get multiple offers. Verify they\'re legitimate. Read the contract.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'At ClearEdge Home Buyers, we\'ve been buying houses in Scranton, Dunmore, Carbondale, and all of Lackawanna County since 2016. No fees. No games. No pressure. Just a fair cash offer and a fast, easy closing.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Want to see what we\'d offer for your house?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Get your free, no-obligation cash offer today.', marks: ['strong'] },
      { _type: 'span', text: ' Call (570) 904-2059 or fill out our form. We respond within 24 hours.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you need cash home buyers in Lackawanna County with no fees, we\'re here to help.' }],
  },

  // Author Bio
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'About the Author' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Tyler Swenson is the founder of ClearEdge Home Buyers, a cash home buying company serving Eastern Pennsylvania since 2016. He has helped over 200 homeowners sell their properties quickly and hassle-free across NEPA, Lehigh Valley, and the Poconos.' }],
  },
]

const faqs = [
  {
    _key: 'faq1',
    question: 'What does "no fees" mean when selling to a cash buyer?',
    answer: 'It means you pay zero commissions, zero closing costs, and zero hidden charges. The offer price is your net price (minus any existing mortgage payoff).',
  },
  {
    _key: 'faq2',
    question: 'How do cash home buyers in Lackawanna County determine their offers?',
    answer: 'We calculate the after-repair value (ARV), subtract renovation costs and our profit margin, and that\'s your offer. We\'ll walk you through the math if you ask.',
  },
  {
    _key: 'faq3',
    question: 'Are cash home buyers legitimate?',
    answer: 'Many are, but not all. Look for local buyers with reviews, proof of funds, and transparent contracts. Avoid anyone who pressures you or won\'t explain their process.',
  },
  {
    _key: 'faq4',
    question: 'How quickly can I sell my Lackawanna County house for cash?',
    answer: 'Most cash sales close in 7-14 days. Some can close in as little as 5 days if there\'s urgency and the title is clear.',
  },
  {
    _key: 'faq5',
    question: 'Do I need to make repairs before selling to a cash buyer?',
    answer: 'No. Cash buyers like ClearEdge Home Buyers purchase properties as-is. No repairs, no cleaning, no staging required.',
  },
  {
    _key: 'faq6',
    question: 'Can I sell my house for cash if I\'m behind on mortgage payments?',
    answer: 'Yes. We can often close before foreclosure proceedings and pay off your mortgage at closing. You keep any remaining equity.',
  },
  {
    _key: 'faq7',
    question: 'What types of houses do cash buyers purchase?',
    answer: 'We buy all types: single-family, duplexes, multi-family, any condition, any situation. Fire damage, mold, foundation issues, tenant-occupied — all of it.',
  },
  {
    _key: 'faq8',
    question: 'Will I get less money selling to a cash buyer?',
    answer: 'Cash offers are typically below retail market value. But when you factor in zero fees, zero repairs, and no holding costs — many sellers net the same or more than traditional sales.',
  },
]

async function createBlogPost() {
  console.log('Starting blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)

  try {
    // Fetch location references
    console.log('\nFetching location references...')
    const locations = await client.fetch(
      `*[_type == "location" && slug.current in ["scranton", "dunmore", "carbondale"]]{ _id, city, slug }`
    )
    console.log('Found locations:', locations.map(l => l.city))

    // Add _key to each content block
    const contentWithKeys = blogPostContent.map((block, index) => ({
      ...block,
      _key: `block${index}`,
      children: block.children?.map((child, childIndex) => ({
        ...child,
        _key: `child${index}_${childIndex}`,
      })),
    }))

    const blogPost = {
      _type: 'blogPost',
      title: 'Cash Home Buyers in Lackawanna County With No Fees: What to Know Before You Sell',
      slug: {
        _type: 'slug',
        current: 'cash-home-buyers-lackawanna-county-no-fees',
      },
      metaTitle: 'Cash Home Buyers Lackawanna County PA | No Fees, Fast Closing',
      metaDescription: 'Looking for cash home buyers in Lackawanna County with no fees? Learn how to find legitimate buyers, avoid scams, and get a fair offer for your Scranton area home.',
      excerpt: 'Looking for cash home buyers in Lackawanna County with no fees? Here\'s exactly how to find legitimate buyers, what "no fees" really means, and how to avoid getting ripped off.',
      author: 'Tyler Swenson',
      authorTitle: 'Founder, ClearEdge Home Buyers',
      publishedAt: '2025-04-12T20:00:00Z',
      category: 'how-it-works',
      content: contentWithKeys,
      faqs: faqs,
      relatedLocations: locations.length > 0 ? locations.map((loc) => ({
        _type: 'reference',
        _ref: loc._id,
        _key: `loc_${loc._id}`,
      })) : [],
      relatedSituations: [],
    }

    console.log('\nCreating blog post...')
    const result = await client.create(blogPost)
    console.log('\n✅ Blog post created successfully!')
    console.log('Document ID:', result._id)
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/cash-home-buyers-lackawanna-county-no-fees')

    return result
  } catch (error) {
    console.error('\n❌ Error creating blog post:', error.message)
    if (error.response) {
      console.error('Response:', error.response)
    }
    throw error
  }
}

createBlogPost()
