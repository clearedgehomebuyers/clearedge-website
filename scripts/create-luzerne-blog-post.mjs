import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') })

// Read client (no token needed for public queries)
const readClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Write client (token required for mutations)
const writeClient = createClient({
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
    children: [
      { _type: 'span', text: 'If you need to ' },
      { _type: 'span', text: 'sell your house fast in Luzerne County PA', marks: ['strong'] },
      { _type: 'span', text: ', you\'re probably dealing with something.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Divorce. Inherited property. Foreclosure. Job loss. Bad tenants.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'m Tyler Swenson, founder of ClearEdge Home Buyers.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Since 2016, I\'ve bought over 200 houses across NEPA — including dozens in Luzerne County. Wilkes-Barre. Hazleton. Pittston. Kingston. Nanticoke. Mountain Top.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This guide covers everything you need to know about selling your house fast in Luzerne County — your options, what cash buyers pay, and how to get the best price for your home.' }],
  },

  // H2: Why Luzerne County Homeowners Need to Sell Fast
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Why Luzerne County Homeowners Need to Sell Fast' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Every week I talk to homeowners in Luzerne County who need to sell quickly. The situations vary, but they usually fall into a few categories:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Inherited a house from parents.', marks: ['strong'] },
      { _type: 'span', text: ' You live out of state. The house sat empty for months. Maybe it needs $30,000 in repairs. You don\'t have time or money to fix it up.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Behind on mortgage payments.', marks: ['strong'] },
      { _type: 'span', text: ' The bank is calling. Foreclosure notices are piling up. You need to sell before the sheriff sale.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'House needs too much work.', marks: ['strong'] },
      { _type: 'span', text: ' Luzerne County has some of the oldest housing stock in Pennsylvania. Many homes are 100+ years old with foundation issues, outdated electrical, or coal heat that buyers won\'t finance.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Going through divorce.', marks: ['strong'] },
      { _type: 'span', text: ' Need to split assets quickly and move on. The last thing you want is a house sitting on market for 6 months.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Problem tenants.', marks: ['strong'] },
      { _type: 'span', text: ' Tired of being a landlord. Tenants not paying. Property trashed. Just want out.' },
    ],
  },

  // H2: Your Options to Sell a House Fast in Luzerne County
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Your Options to Sell a House Fast in Luzerne County' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You have three main options. Here\'s how they compare:' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Option 1: List With a Real Estate Agent' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Timeline: 60-120+ days (listing + closing)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Commission: 5-6% of sale price' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Repairs: Expected (buyers will negotiate credits)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Showings: Yes, strangers walking through your house' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Best for: Houses in good condition, no time pressure' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Option 2: For Sale By Owner (FSBO)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Timeline: 90-180+ days' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Commission: 0% (but you do all the work)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Work involved: Photos, listings, showings, negotiations, paperwork' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Best for: Experienced sellers with time and patience' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Option 3: Sell to a Cash Buyer' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Timeline: 7-21 days' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Commission: $0' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Closing costs: $0 (buyer pays)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Repairs: None (as-is sale)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Best for: Speed, certainty, distressed properties' }],
  },

  // H2: How Cash Home Buyers Work in Luzerne County
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'How Cash Home Buyers Work in Luzerne County' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s our process at ClearEdge Home Buyers:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 1: Contact us.', marks: ['strong'] },
      { _type: 'span', text: ' Fill out our form or call (570) 904-2059. Tell us about your property — address, condition, your situation.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 2: We evaluate.', marks: ['strong'] },
      { _type: 'span', text: ' We research comparable sales, estimate repair costs, and calculate what we can pay.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 3: You get an offer.', marks: ['strong'] },
      { _type: 'span', text: ' Usually within 24 hours. No obligation. We explain exactly how we calculated it.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 4: You decide.', marks: ['strong'] },
      { _type: 'span', text: ' Take your time. Get other offers. No pressure from us.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 5: We close.', marks: ['strong'] },
      { _type: 'span', text: ' Pick your closing date. We use a local title company. You sign, get paid, done.' },
    ],
  },

  // H2: What We Pay for Houses in Luzerne County
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'What We Pay for Houses in Luzerne County' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Cash buyers typically pay 70-85% of market value', marks: ['strong'] },
      { _type: 'span', text: ' depending on condition.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'That sounds low until you run the numbers. Here\'s a real comparison:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Traditional Sale (on a $150,000 house needing work):', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• List price (as-is): $115,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Agent commission (6%): -$6,900' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Closing costs (3%): -$3,450' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Repair credits after inspection: -$8,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• 4 months holding costs: -$6,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Net to you: $90,650', marks: ['strong'] },
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
    children: [{ _type: 'span', text: '• Cash offer: $95,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Agent commission: $0' }],
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
      { _type: 'span', text: '• Net to you: $95,000', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'After factoring in zero commissions, zero closing costs, and zero repairs, many sellers net the same — or more — with a cash sale.', marks: ['strong'] },
    ],
  },

  // H2: Luzerne County Market Reality
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Luzerne County Real Estate Market Reality' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let me be honest about the Luzerne County market:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Old housing stock.', marks: ['strong'] },
      { _type: 'span', text: ' Many homes are 80-120+ years old. Foundation issues are common. Coal heat systems. Knob and tube wiring. These houses don\'t qualify for traditional financing.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Flood zones.', marks: ['strong'] },
      { _type: 'span', text: ' Parts of Wilkes-Barre, Pittston, and other areas along the Susquehanna have flood history. Some buyers won\'t touch them.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Average days on market: 45-75.', marks: ['strong'] },
      { _type: 'span', text: ' That\'s for houses in good condition. Distressed properties sit much longer — or never sell at all.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Buyer\'s market for distressed properties.', marks: ['strong'] },
      { _type: 'span', text: ' There are more fixer-uppers than there are buyers willing to tackle them. This drives prices down on the traditional market.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This is exactly why cash buyers exist. We specialize in houses the traditional market struggles to sell.' }],
  },

  // H2: Neighborhoods We Buy In
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Neighborhoods We Buy In (All of Luzerne County)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We buy houses throughout Luzerne County:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Wilkes-Barre area:', marks: ['strong'] },
      { _type: 'span', text: ' Downtown, South Wilkes-Barre, North End, Parsons, Heights, Miners Mills' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Hazleton area:', marks: ['strong'] },
      { _type: 'span', text: ' Hazleton, West Hazleton, Hazle Township, Freeland, Weatherly' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Wyoming Valley:', marks: ['strong'] },
      { _type: 'span', text: ' Kingston, Edwardsville, Forty Fort, Swoyersville, Luzerne Borough, Plymouth' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Back Mountain:', marks: ['strong'] },
      { _type: 'span', text: ' Dallas, Shavertown, Trucksville, Harveys Lake, Sweet Valley' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Greater Pittston:', marks: ['strong'] },
      { _type: 'span', text: ' Pittston, West Pittston, Dupont, Avoca, Duryea, Hughestown' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Nanticoke area:', marks: ['strong'] },
      { _type: 'span', text: ' Nanticoke, Hanover Township, Newport Township, Glen Lyon, Shickshinny' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Mountain Top area:', marks: ['strong'] },
      { _type: 'span', text: ' Mountain Top, Dorrance, Wright Township, Rice Township' },
    ],
  },

  // H2: Common Situations We Help With
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Common Situations We Help With' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Inherited property.', marks: ['strong'] },
      { _type: 'span', text: ' Parents passed away. You live in New Jersey. House needs $40,000 in work. We make it easy.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Pre-foreclosure.', marks: ['strong'] },
      { _type: 'span', text: ' Bank threatening sheriff sale. We can close fast enough to stop foreclosure and save your credit.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Divorce.', marks: ['strong'] },
      { _type: 'span', text: ' Need to split assets quickly. Neither party wants the house. We close fast so you can move on.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Major repairs needed.', marks: ['strong'] },
      { _type: 'span', text: ' Foundation cracked. Roof leaking. Mold in basement. We buy as-is, any condition.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Tired landlord.', marks: ['strong'] },
      { _type: 'span', text: ' Tenants not paying. Property damaged. Don\'t want to deal with eviction. We\'ll take it off your hands.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Tax liens.', marks: ['strong'] },
      { _type: 'span', text: ' Behind on property taxes. Facing tax sale. We can clear liens at closing and you walk away clean.' },
    ],
  },

  // H2: Red Flags - How to Spot Bad Cash Buyers
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Red Flags: How to Spot Bad Cash Buyers' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Not every cash buyer is legitimate. Here\'s what to watch for:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'No proof of funds.', marks: ['strong'] },
      { _type: 'span', text: ' Real cash buyers can show bank statements or proof of funds letters. If they can\'t, they might not actually have money.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'High-pressure tactics.', marks: ['strong'] },
      { _type: 'span', text: ' "Sign today or the offer expires." Legitimate buyers give you time to decide. We never pressure sellers.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'They\'re wholesalers, not buyers.', marks: ['strong'] },
      { _type: 'span', text: ' Some "buyers" just flip your contract to someone else for a fee. Ask directly: "Are YOU buying this house?"' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Hidden fees at closing.', marks: ['strong'] },
      { _type: 'span', text: ' "No fees" should mean no fees. If charges appear at the closing table, that\'s a scam.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Lowball offers way below others.', marks: ['strong'] },
      { _type: 'span', text: ' Get multiple offers. If one is $20,000 below the rest, something\'s wrong.' },
    ],
  },

  // H2: Why Work With a Local Luzerne County Buyer
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Why Work With a Local Luzerne County Buyer' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You\'ve probably seen ads from national "We Buy Houses" companies. Here\'s why local is better:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'We know the neighborhoods.', marks: ['strong'] },
      { _type: 'span', text: ' I know the difference between Heights and Parsons. I know which Hazleton streets are good investments. National companies don\'t.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'We\'re accountable.', marks: ['strong'] },
      { _type: 'span', text: ' I live here. My reputation matters. A national company doesn\'t care about one bad review in Wilkes-Barre.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Faster decisions.', marks: ['strong'] },
      { _type: 'span', text: ' No corporate approval needed. I make the decision. I write the check.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'We typically pay more.', marks: ['strong'] },
      { _type: 'span', text: ' Less overhead means we can offer more than companies with national marketing budgets and corporate layers.' },
    ],
  },

  // H2: Real Story - Kingston Homeowner
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Real Story: Kingston Homeowner' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Dave inherited his mom\'s house in Kingston after she passed. He lives in Maryland and couldn\'t manage a property from 3 hours away.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'The house had sat empty for 8 months. There was water damage in the basement. The roof needed work. The kitchen hadn\'t been updated since the 1970s.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'An agent told him he\'d need to put $25,000 into it before listing. Even then, no guarantees.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We made a cash offer of $52,000. No repairs needed. We handled the cleanout. Closed in 12 days.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Dave got his money, avoided the hassle, and didn\'t have to make another 3-hour drive to deal with contractors.' }],
  },

  // H2: How to Get the Best Price From Cash Buyers
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'How to Get the Best Price From Cash Buyers' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Get multiple offers.', marks: ['strong'] },
      { _type: 'span', text: ' Always. At least 2-3 cash buyers. Compare them carefully.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Be honest about condition.', marks: ['strong'] },
      { _type: 'span', text: ' Don\'t hide problems. We\'ll find them anyway. Transparency builds trust and speeds up the process.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Have your paperwork ready.', marks: ['strong'] },
      { _type: 'span', text: ' Deed, mortgage statement, tax bills. The more organized you are, the faster we can close.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Know your bottom line.', marks: ['strong'] },
      { _type: 'span', text: ' What\'s the minimum you\'ll accept? Know this before you start talking to buyers.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Be flexible on timing.', marks: ['strong'] },
      { _type: 'span', text: ' If you can close quickly, mention it. Speed has value to buyers.' },
    ],
  },

  // H2: Ready to Sell Your Luzerne County House Fast?
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Ready to Sell Your Luzerne County House Fast?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you need to sell your house fast in Luzerne County, you\'ve got options.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'At ClearEdge Home Buyers, we\'ve been buying houses in Wilkes-Barre, Hazleton, Pittston, Kingston, and all of Luzerne County since 2016. No commissions. No closing costs. No repairs. Just a fair cash offer and a fast, easy closing.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Here\'s how to get started:', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Visit our ', marks: [] },
      { _type: 'span', text: 'homepage', marks: ['strong'] },
      { _type: 'span', text: ' and fill out the form' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Learn more about ', marks: [] },
      { _type: 'span', text: 'how our process works', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Or call us directly at (570) 904-2059', marks: [] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We respond within 24 hours with a no-obligation cash offer.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'If you need to sell your house fast in Luzerne County PA, we\'re here to help.', marks: ['strong'] },
    ],
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
    question: 'How do I sell my house fast in Luzerne County PA?',
    answer: 'The fastest way to sell a house in Luzerne County is to sell directly to a cash home buyer. This eliminates agent commissions, financing contingencies, and the need for repairs. Most cash sales close in 7-14 days.',
  },
  {
    _key: 'faq2',
    question: 'What do cash home buyers pay for houses in Luzerne County?',
    answer: 'Cash buyers typically pay 70-85% of market value depending on condition. However, after factoring in zero commissions, zero closing costs, and zero repairs, many sellers net the same as a traditional sale.',
  },
  {
    _key: 'faq3',
    question: 'Can I sell my house as-is in Luzerne County PA?',
    answer: 'Yes. Cash buyers purchase properties in any condition — including houses with foundation issues, roof damage, mold, fire damage, or that need complete renovation.',
  },
  {
    _key: 'faq4',
    question: 'How long does it take to sell a house in Luzerne County?',
    answer: 'Traditional sales take 60-120+ days on average. Cash sales can close in as little as 7 days, with most closing in 10-14 days.',
  },
  {
    _key: 'faq5',
    question: 'Do I need to make repairs before selling to a cash buyer?',
    answer: 'No. Cash buyers like ClearEdge Home Buyers purchase properties as-is. No repairs, no cleaning, no staging required.',
  },
  {
    _key: 'faq6',
    question: 'What are the benefits of selling to a local cash buyer vs. a national company?',
    answer: 'Local buyers know the neighborhoods, can make faster decisions without corporate approval, and typically pay more because they have less overhead than national companies.',
  },
  {
    _key: 'faq7',
    question: 'Can I sell my inherited house fast in Luzerne County?',
    answer: 'Yes. We buy inherited properties regularly, even if you live out of state, the house needs work, or you\'re going through probate. We can often close in 2 weeks.',
  },
  {
    _key: 'faq8',
    question: 'What if my house has liens or back taxes?',
    answer: 'We can handle liens and back taxes at closing. The amounts come out of the sale price, and you walk away with the rest.',
  },
]

async function createBlogPost() {
  console.log('Starting blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)

  try {
    // Fetch location references
    console.log('\nFetching location references...')
    const locations = await readClient.fetch(
      `*[_type == "location" && slug.current in ["wilkes-barre", "hazleton", "pittston", "kingston", "nanticoke"]]{ _id, city, slug }`
    )
    console.log('Found locations:', locations.map(l => l.city))

    // Fetch situation references
    console.log('\nFetching situation references...')
    const situations = await readClient.fetch(
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
      title: 'Sell My House Fast Luzerne County PA: The Complete Local Guide',
      slug: {
        _type: 'slug',
        current: 'sell-my-house-fast-luzerne-county-pa',
      },
      metaTitle: 'Sell My House Fast Luzerne County PA | Cash Offer in 24 Hours',
      metaDescription: 'Need to sell your house fast in Luzerne County PA? Get a fair cash offer in 24 hours. We buy houses in Wilkes-Barre, Hazleton, Pittston, Kingston & all of Luzerne County. No fees.',
      excerpt: 'If you need to sell your house fast in Luzerne County PA, here\'s the complete local guide — your options, what cash buyers pay, and how to get the best price for your Wilkes-Barre, Hazleton, or Pittston area home.',
      author: 'Tyler Swenson',
      authorTitle: 'Founder, ClearEdge Home Buyers',
      publishedAt: '2025-05-11T22:00:00Z',
      category: 'locations',
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
    const result = await writeClient.create(blogPost)
    console.log('\n✅ Blog post created successfully!')
    console.log('Document ID:', result._id)
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-luzerne-county-pa')

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
