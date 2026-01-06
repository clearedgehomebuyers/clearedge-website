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
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you need to sell your house fast in Allentown, you\'re probably tired of the runaround.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Realtors telling you to "wait for the right buyer."' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Open houses that waste your weekends.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Repair estimates that make your stomach turn.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I get it.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'m Tyler Swenson, founder of ClearEdge Home Buyers.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Since 2016, I\'ve helped over 200 homeowners across the Lehigh Valley sell their properties fast for cash.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'No repairs. No fees. No nonsense.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This guide is everything I wish someone told me when I bought my first duplex in Allentown almost a decade ago.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let\'s get into it.' }],
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Why Homeowners in Allentown Need to Sell Fast' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s the truth most people won\'t tell you.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Life doesn\'t care about your timeline.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'ve sat across kitchen tables from people dealing with:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Divorce', marks: ['strong'] },
      { _type: 'span', text: ' — and neither party wants to keep making mortgage payments on a house full of bad memories' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Inherited property', marks: ['strong'] },
      { _type: 'span', text: ' — where three siblings live in three different states and nobody wants to be a landlord' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Job relocation', marks: ['strong'] },
      { _type: 'span', text: ' — when the new gig starts in 30 days and you can\'t afford two mortgages' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Foreclosure', marks: ['strong'] },
      { _type: 'span', text: ' — where every day that passes puts you closer to losing everything' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Problem tenants', marks: ['strong'] },
      { _type: 'span', text: ' — who stopped paying rent six months ago and trashed the place' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Major repairs', marks: ['strong'] },
      { _type: 'span', text: ' — that would cost more than the house is worth to fix' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'None of these situations work with a 90-day traditional sale.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You need out. Now.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'And there\'s nothing wrong with that.' }],
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'The Traditional Way to Sell a House in Allentown (And Why It Sucks)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let me paint the picture.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You call a realtor.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'They come over, walk through your house, and start pointing out everything that needs fixing.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'New carpet. Fresh paint. Updated kitchen. Maybe a new roof.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '"Just a few small improvements to get top dollar!"' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'That\'s $15,000-$40,000 you don\'t have.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Then they list it.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You clean like crazy for showings.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Strangers walk through judging your life choices.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Weeks turn into months.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'An offer comes in — 10% below asking.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You negotiate. Inspection happens. Buyer asks for $8,000 in credits.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You\'re now 90 days in.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Closing gets delayed because the buyer\'s financing fell through.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Start over.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This is the reality for most Allentown home sales.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'The average time on market in Lehigh Valley right now? About 45-60 days.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'That\'s AFTER you do all the repairs and prep work.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If your house needs work or you\'re in a tough situation?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Double it.' }],
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'How to Actually Sell Your House Fast in Allentown' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'There are really only three paths:' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Option 1: List With a Realtor (Slowest)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Timeline: 60-120+ days. Costs: 5-6% commission + 2-3% closing costs + repairs. Best for: Move-in ready homes when you have time.' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Option 2: Sell For Sale By Owner (Most Work)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Timeline: 90+ days typically. Costs: 2-3% closing costs + repairs + your sanity. Best for: People who love paperwork and negotiations.' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Option 3: Sell to a Cash Home Buyer (Fastest)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Timeline: 7-14 days. Costs: $0 fees, $0 commissions, $0 repairs. Best for: Any condition, any situation, any timeline.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'m biased here. Obviously.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'But I\'ve seen the numbers.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'When you factor in realtor commissions (6%), closing costs (3%), repair costs, and holding costs while you wait...' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'The "higher" sale price often nets you the same — or less — than a clean cash offer.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'And you get your life back months sooner.' }],
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'What Cash Home Buyers in Allentown Actually Do' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let me pull back the curtain.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s how we operate at ClearEdge Home Buyers:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 1: You Contact Us', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Fill out a form or call. Takes 2 minutes. Tell us about your property. Be honest — we\'ve seen it all.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 2: We Make an Offer', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Within 24 hours, you get a real cash offer. No obligation. No pressure. We base it on the property condition, location, and current Allentown market values.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 3: You Pick the Closing Date', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Need to close in 7 days? Done. Need 30 days to figure out your next move? No problem. You\'re in control.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'That\'s it.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'No inspections that kill deals. No financing contingencies. No hoping the buyer\'s loan gets approved.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Cash. Simple. Done.' }],
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'How Much Do Cash Buyers Pay for Houses in Allentown?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This is the question everyone asks.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'And I\'m going to be straight with you.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Cash buyers typically pay 70-85% of market value.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Why? Because we\'re taking on all the risk. We buy as-is (no inspection negotiations). We close fast (saving you months of holding costs). We pay all closing costs. We handle all the paperwork.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s the math most people miss:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Traditional Sale: ', marks: ['strong'] },
      { _type: 'span', text: 'Sale Price $200,000 minus Realtor Commission (6%) $12,000 minus Closing Costs (3%) $6,000 minus Repairs $15,000 minus 3 Months Mortgage $6,000 = Net Proceeds $161,000' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Cash Sale: ', marks: ['strong'] },
      { _type: 'span', text: 'Sale Price $165,000, Commissions $0, Closing Costs $0, Repairs $0, Time 7-14 days = Net Proceeds $165,000' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Different path. Similar destination. Except one takes a week and one takes four months.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Your time has value.' }],
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Red Flags: How to Spot Shady "We Buy Houses" Companies' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Not all cash buyers are created equal. I\'ve been in this industry long enough to see the bad actors. Here\'s what to watch out for:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'They won\'t show proof of funds. ', marks: ['strong'] },
      { _type: 'span', text: 'Any legitimate cash buyer can prove they have the money. If they can\'t, they\'re probably wholesaling your deal to someone else.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'They pressure you to sign immediately. ', marks: ['strong'] },
      { _type: 'span', text: 'Real offers don\'t expire in 24 hours. If someone\'s rushing you, they\'re hiding something.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'They change the price at closing. ', marks: ['strong'] },
      { _type: 'span', text: 'This is the oldest trick. Get everything in writing upfront. A real buyer honors their number.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'No local presence. ', marks: ['strong'] },
      { _type: 'span', text: 'Random out-of-state company with a Google Voice number? Hard pass. Work with someone who actually knows Allentown.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'No reviews or references. ', marks: ['strong'] },
      { _type: 'span', text: 'Check Google. Check BBB. Ask for references. We\'ve got dozens of 5-star reviews from real Lehigh Valley homeowners.' },
    ],
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Allentown Neighborhoods Where We Buy Houses' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We buy houses all across Allentown and the Lehigh Valley. Doesn\'t matter the neighborhood. Doesn\'t matter the condition.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Some areas we frequently work in: West End, East Side, Center City, South Allentown, Midway Manor, Rittersville, Salisbury Township, and all surrounding Lehigh Valley communities.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We also serve Bethlehem, Easton, Whitehall, Emmaus, Macungie, and everywhere in between.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you\'re in the Lehigh Valley, we can make you an offer.' }],
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Real Stories: Allentown Homeowners Who Sold Fast' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'The Inherited House in West End: ', marks: ['strong'] },
      { _type: 'span', text: 'Two sisters inherited their parents\' home. One lived in California. One lived in New York. The house needed $30,000 in work and had been sitting vacant for 8 months. We made them a fair cash offer. Closed in 12 days. They split the proceeds and finally got closure.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'The Divorce Sale in South Allentown: ', marks: ['strong'] },
      { _type: 'span', text: 'Neither spouse wanted to deal with the house. Too many memories. They called us. We made one offer they both agreed on. Closed in 10 days. Both moved on with their lives.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'The Foreclosure Save Near Center City: ', marks: ['strong'] },
      { _type: 'span', text: 'Homeowner was 4 months behind on payments. Bank was ready to take the house. He called us on a Tuesday. We made an offer Wednesday. Closed the following week. He walked away with cash instead of a foreclosure on his credit.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'These aren\'t made-up stories. This is what we do every month.' }],
  },
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'The Bottom Line on Selling Your Allentown House Fast' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s what it comes down to.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you have time, a move-in ready house, and don\'t mind paying commissions — list with a realtor.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you need speed, certainty, and zero hassle — sell to a cash buyer.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'There\'s no wrong answer. Just the right answer for YOUR situation.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I built ClearEdge Home Buyers because I saw too many Lehigh Valley homeowners stuck in bad situations with no good options.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We fix that.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Ready to see what your house is worth? ', marks: ['strong'] },
      { _type: 'span', text: 'Get your free, no-obligation cash offer at clearedgehomebuyers.com or learn more about our simple 3-step process at clearedgehomebuyers.com/how-it-works' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'No pressure. No commitment. Just answers.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you\'re looking to sell your house fast in Allentown, we\'re here when you\'re ready.' }],
  },
]

const faqs = [
  {
    _key: 'faq1',
    question: 'How fast can you actually close?',
    answer: 'We can close in as little as 7 days. Most deals close in 10-14 days. But we work on your timeline — if you need 30 or 60 days, that works too.',
  },
  {
    _key: 'faq2',
    question: 'Do I need to make any repairs?',
    answer: 'Zero. We buy houses as-is. Mold, fire damage, foundation issues, hoarding situations — we\'ve seen it all and we still buy.',
  },
  {
    _key: 'faq3',
    question: 'Are there any fees or commissions?',
    answer: 'None. No realtor commissions. No closing costs. No hidden fees. The offer we make is the amount you get.',
  },
  {
    _key: 'faq4',
    question: 'What if I still have a mortgage?',
    answer: 'No problem. We work with your lender to pay off the mortgage at closing. You keep whatever equity is left.',
  },
  {
    _key: 'faq5',
    question: 'What if the house is in probate?',
    answer: 'We buy probate properties regularly. We can work with the estate attorney to make sure everything is handled properly.',
  },
  {
    _key: 'faq6',
    question: 'How do you determine your offer price?',
    answer: 'We look at recent sales in your area, the condition of your property, and current market conditions in Allentown. Then we make a fair offer based on those factors.',
  },
  {
    _key: 'faq7',
    question: 'Is there any obligation if I request an offer?',
    answer: 'None whatsoever. Get your offer, think about it, and decide what\'s best for you. No pressure, no follow-up calls every day, no guilt trips.',
  },
  {
    _key: 'faq8',
    question: 'What types of properties do you buy?',
    answer: 'Single-family homes, duplexes, multi-family properties, townhouses, and even some commercial properties. Any condition, any situation.',
  },
]

async function createBlogPost() {
  console.log('Starting blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)

  try {
    // First, fetch location references for Allentown, Bethlehem, Easton
    console.log('\nFetching location references...')
    const locations = await client.fetch(
      `*[_type == "location" && slug.current in ["allentown", "bethlehem", "easton"]]{ _id, city, slug }`
    )
    console.log('Found locations:', locations.map(l => l.city))

    // Fetch situation references for foreclosure, inherited-property, divorce
    console.log('\nFetching situation references...')
    const situations = await client.fetch(
      `*[_type == "situation" && slug.current in ["foreclosure", "inherited-property", "divorce"]]{ _id, title, slug }`
    )
    console.log('Found situations:', situations.map(s => s.title))

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
      title: 'Sell My House Fast Allentown: The No-BS Guide From a Local Cash Buyer',
      slug: {
        _type: 'slug',
        current: 'sell-my-house-fast-allentown',
      },
      metaTitle: 'Sell My House Fast Allentown | Cash Offer in 24 Hours',
      metaDescription: 'Need to sell your Allentown house fast? Get a fair cash offer in 24 hours. No repairs, no fees, no commissions. Close in as little as 7 days.',
      excerpt: 'Need to sell your house fast in Allentown? This guide covers everything: cash buyers vs realtors, how much you\'ll get, red flags to avoid, and real stories from local homeowners.',
      author: 'Tyler Swenson',
      authorTitle: 'Founder, ClearEdge Home Buyers',
      publishedAt: '2026-01-06T12:00:00Z',
      category: 'local-markets',
      content: contentWithKeys,
      faqs: faqs,
      relatedLocations: locations.length > 0 ? locations.map((loc) => ({
        _type: 'reference',
        _ref: loc._id,
        _key: `loc_${loc._id}`,
      })) : [],
      relatedSituations: situations.length > 0 ? situations.map((sit) => ({
        _type: 'reference',
        _ref: sit._id,
        _key: `sit_${sit._id}`,
      })) : [],
    }

    console.log('\nCreating blog post...')
    const result = await client.create(blogPost)
    console.log('\n✅ Blog post created successfully!')
    console.log('Document ID:', result._id)
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-allentown')

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
