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

const blogPost = {
  _type: 'blogPost',
  title: 'Sell My House Fast Dunmore Mine Subsidence: Your Complete Guide to Selling a Home With Mining Damage',
  slug: { current: 'sell-my-house-fast-dunmore-mine-subsidence' },
  metaTitle: 'Sell My House Fast Dunmore Mine Subsidence | Complete Guide',
  metaDescription: 'Need to sell a house with mine subsidence damage in Dunmore PA? Learn your options, real repair costs, and how to get a fair cash offer. Free guide from local experts.',
  excerpt: "If you need to sell your house fast in Dunmore with mine subsidence damage, you're dealing with a problem most real estate agents don't understand. Here's your complete guide to options, costs, and how to get a fair cash offer.",
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2025-11-15T10:00:00Z',
  category: 'locations',

  faqs: [
    {
      question: 'Can I sell a house with mine subsidence damage?',
      answer: 'Yes. You can sell to a cash buyer without making repairs. Traditional sales are much harder because most buyers can\'t get financing on damaged properties.'
    },
    {
      question: 'Do I have to disclose mine subsidence to buyers?',
      answer: 'Yes. Pennsylvania law requires disclosure of known subsidence issues. Failure to disclose can result in lawsuits after the sale.'
    },
    {
      question: 'How much does mine subsidence reduce my home\'s value?',
      answer: 'It depends on the damage. Minor historical settling might reduce value 10-15%. Active structural damage with needed mine void stabilization can reduce value 40-60% or more.'
    },
    {
      question: 'Can I get mine subsidence insurance after damage occurs?',
      answer: 'No. You must have the policy in place before damage happens. If you don\'t currently have MSI coverage and have no damage, get it now.'
    },
    {
      question: 'What if I inherited a house with mine subsidence?',
      answer: 'You have the same options as any owner: repair and sell traditional, or sell as-is to a cash buyer. The condition of the house and your financial situation will determine which makes sense.'
    },
    {
      question: 'How fast can you close on a house with mine subsidence?',
      answer: 'Typically 7-14 days. Sometimes faster if title is clear. We don\'t need financing approval or extended inspection periods.'
    },
    {
      question: 'Do you buy houses with active sinkholes?',
      answer: 'We evaluate each situation. Active sinkholes are serious, but depending on size, location, and remediation requirements, we can often still make an offer.'
    },
    {
      question: 'What areas of Dunmore are most affected by mine subsidence?',
      answer: 'Most of Dunmore is in a mining risk zone according to PA DEP maps. Areas in the valley and closer to historical mine operations tend to have more issues, but subsidence can occur throughout the borough.'
    }
  ],

  content: [
    // Intro
    {
      _type: 'block',
      _key: 'intro1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro1a', text: 'If you need to sell your house fast in Dunmore with mine subsidence damage, you\'re dealing with a problem most real estate agents don\'t understand.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro2a', text: 'Maybe you woke up to cracks running through your foundation.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro3a', text: 'Maybe a sinkhole opened in your backyard like the one on College Avenue that evacuated four homes.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro4a', text: 'Maybe your basement walls are bowing inward and every contractor who looks at it just shakes their head.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro5a', text: 'Or maybe you\'re trying to sell a house you inherited and just discovered it\'s sitting on top of old mine workings.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro6a', text: 'I\'m Tyler Swenson, founder of ClearEdge Home Buyers.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro7a', text: 'Since 2016, I\'ve bought over 200 houses across Eastern Pennsylvania — including properties in Dunmore, ', marks: [] },
        { _type: 'span', _key: 'intro7b', text: 'Scranton', marks: ['scrantonLink'] },
        { _type: 'span', _key: 'intro7c', text: ', and throughout ', marks: [] },
        { _type: 'span', _key: 'intro7d', text: 'Lackawanna County', marks: ['lackawannaLink'] },
        { _type: 'span', _key: 'intro7e', text: ' with mine subsidence damage.', marks: [] }
      ],
      markDefs: [
        { _type: 'link', _key: 'scrantonLink', href: '/locations/scranton' },
        { _type: 'link', _key: 'lackawannaLink', href: '/locations/lackawanna-county' }
      ]
    },
    {
      _type: 'block',
      _key: 'intro8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro8a', text: 'The Lackawanna Valley sits on one of the most extensively mined areas in Pennsylvania.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro9a', text: 'There are coal veins named after Dunmore — the Dunmore #1 and Dunmore #2 veins run right under the borough.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro10a', text: 'This isn\'t ancient history. It\'s affecting homeowners right now.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro11a', text: 'Let me give you the real breakdown on how to sell a house with mine subsidence damage — your options, the costs, and what nobody else will tell you.', marks: [] }
      ],
      markDefs: []
    },

    // Section: Why Mine Subsidence Is Such a Problem in Dunmore
    {
      _type: 'block',
      _key: 'h2why',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2whya', text: 'Why Mine Subsidence Is Such a Problem in Dunmore', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why1a', text: 'Let\'s start with why Dunmore specifically has this issue.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why2',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'why2a', text: 'The Lackawanna Valley coal basin', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why3a', text: 'Dunmore sits at the edge of the Lackawanna Valley coal basin.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why4a', text: 'This area was one of the most productive anthracite coal regions in the world.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why5a', text: 'Mining here started in the mid-1800s and continued until the 1960s.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why6a', text: 'The Lackawanna Coal Mine tour (now a museum in McDade Park) actually goes through the Dunmore #1 and Dunmore #2 coal veins.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why7a', text: 'That\'s right — there\'s literally a tourist attraction showing people the mines that run under this area.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why8',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'why8a', text: 'Room and pillar mining', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why9a', text: 'Most of the mines in this region used "room and pillar" mining.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why10a', text: 'Miners would dig out "rooms" of coal and leave "pillars" of coal behind to support the roof.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why11a', text: 'Problem is, those pillars deteriorate over time.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why12a', text: 'When they fail, the roof collapses. The ground above sinks. Houses crack. Sinkholes open.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why13',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'why13a', text: 'Shallow mining depth', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why14a', text: 'Many of the mines in the Dunmore area are relatively shallow — sometimes less than 50 feet below the surface.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why15a', text: 'The shallower the mine, the more likely surface damage will occur when something fails underground.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why16',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'why16a', text: 'Age of the mines', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why17',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why17a', text: 'Most mining in Lackawanna County ended 60+ years ago.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why18',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why18a', text: 'These abandoned mines have been slowly deteriorating for decades.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why19',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'why19a', text: 'The DEP\'s Bureau of Abandoned Mine Reclamation has responded to 578 subsidence events across Pennsylvania since 2017 — and the Scranton/Dunmore/Wilkes-Barre corridor is one of the most active areas.', marks: [] }
      ],
      markDefs: []
    },

    // Section: Signs of Mine Subsidence Damage
    {
      _type: 'block',
      _key: 'h2signs',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2signsa', text: 'Signs of Mine Subsidence Damage', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs1a', text: 'How do you know if your house has mine subsidence damage?', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs2',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'signs2a', text: 'Structural cracks', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs3a', text: '• Diagonal cracks at corners of windows and doors', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs4a', text: '• Stair-step cracks in brick or block foundations', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs5a', text: '• Cracks wider at top than bottom (or vice versa)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs6a', text: '• Cracks that continue to grow over time', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs7',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'signs7a', text: 'Foundation problems', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs8a', text: '• Bowing basement walls', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs9a', text: '• Foundation settling unevenly', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs10a', text: '• Water infiltration through new cracks', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs11a', text: '• Floors becoming noticeably uneven', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs12',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'signs12a', text: 'Exterior signs', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs13a', text: '• Porch pulling away from house', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs14a', text: '• Chimney leaning or separating', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs15a', text: '• Gaps between foundation and siding', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs16',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs16a', text: '• Sidewalks or driveways cracking and sinking', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs17',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'signs17a', text: 'Sinkholes', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs18',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs18a', text: '• Depressions in the yard that weren\'t there before', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs19',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs19a', text: '• Circular patches where grass dies', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs20',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs20a', text: '• Areas where water suddenly pools', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs21',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs21a', text: '• Actual holes opening in the ground', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'signs22',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'signs22a', text: 'Important note: ', marks: ['strong'] },
        { _type: 'span', _key: 'signs22b', text: 'Not every crack means mine subsidence. Houses settle naturally. But if you\'re in Dunmore or the surrounding area and you\'re seeing multiple signs, mine subsidence should be on your radar.', marks: [] }
      ],
      markDefs: []
    },

    // Section: The Real Cost of Mine Subsidence Repairs
    {
      _type: 'block',
      _key: 'h2cost',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2costa', text: 'The Real Cost of Mine Subsidence Repairs', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost1a', text: 'Here\'s where people\'s eyes go wide.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost2a', text: 'Mine subsidence repairs aren\'t like normal home repairs.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost3a', text: 'Average claim cost: $50,000', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost4a', text: 'According to the Pennsylvania DEP, the average mine subsidence insurance claim is about $50,000.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost5a', text: 'But that\'s an average. Many claims are much higher.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost6a', text: 'Major structural repair costs:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost7a', text: '• Foundation underpinning (piers): $10,000 - $30,000', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost8a', text: '• Foundation wall repair: $5,000 - $15,000', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost9a', text: '• Sinkhole filling: $5,000 - $20,000+', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost10a', text: '• Full foundation replacement: $30,000 - $75,000+', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost11a', text: '• Mine void grouting: $30,000 - $150,000+', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost12a', text: '• Total structural rebuild: $100,000+', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost13a', text: 'Why repairs are so expensive:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost14a', text: 'The problem isn\'t just fixing what you can see.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost15a', text: 'It\'s stabilizing what\'s underneath.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost16',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost16a', text: 'If the mine void below your house is still unstable, any surface repairs you make will eventually fail.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost17',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost17a', text: 'Serious mine subsidence remediation sometimes requires grouting — pumping concrete into the mine void to stabilize it.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost18',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost18a', text: 'That can cost tens of thousands of dollars. Sometimes over $100,000.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost19',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cost19a', text: 'For many houses in Dunmore, the repair costs exceed the value of the property.', marks: [] }
      ],
      markDefs: []
    },

    // Section: Why Traditional Sales Fall Apart
    {
      _type: 'block',
      _key: 'h2trad',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2trada', text: 'Why Traditional Sales Fall Apart With Mine Subsidence', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad1a', text: 'Let\'s be honest about what happens when you try to sell a house with mine subsidence damage the traditional way.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad2',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'trad2a', text: 'Disclosure requirements', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad3a', text: 'Pennsylvania law requires sellers to disclose known mine subsidence issues.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad4a', text: 'The seller disclosure form specifically asks about:', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad5a', text: '• "Any sliding, settling, earth movement, subsidence, or earth stability problems"', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad6a', text: '• "Existing or proposed mining, strip mining, or excavations affecting your property"', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad7a', text: 'If you know about the problem, you must disclose it.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad8',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'trad8a', text: 'Most buyers walk away', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad9a', text: 'When buyers see "mine subsidence" on a disclosure, most run the other direction.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad10a', text: 'They don\'t understand it. Their agent doesn\'t understand it. Their lender definitely doesn\'t want to touch it.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad11a', text: 'Even if they\'re initially interested, the inspection kills the deal.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad12',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'trad12a', text: 'Financing becomes impossible', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad13a', text: 'Banks don\'t like lending on houses with structural damage.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad14a', text: 'FHA and VA loans have strict property standards. Active mine subsidence damage will fail appraisal.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad15a', text: 'Even conventional lenders get nervous. They want the house to be worth more than the loan. If the foundation is compromised, they\'re not confident in that value.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad16',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'trad16a', text: 'Insurance complications', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad17',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad17a', text: 'Standard homeowners insurance doesn\'t cover mine subsidence.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad18',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad18a', text: 'Buyers need separate mine subsidence insurance from the PA DEP program.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad19',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad19a', text: 'If the house has existing, unrepaired damage, it may not even be eligible for that insurance.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad20',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'trad20a', text: 'Timeline nightmare', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad21',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad21a', text: 'Even if you find a brave buyer, the process drags:', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad22',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad22a', text: '• Extended inspections', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad23',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad23a', text: '• Repair negotiations', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad24',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad24a', text: '• Contractor estimates', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad25',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad25a', text: '• Lender concerns', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad26',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad26a', text: '• Title issues from any DEP involvement', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad27',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'trad27a', text: 'What should take 45 days takes 6+ months. If it closes at all.', marks: [] }
      ],
      markDefs: []
    },

    // Section: Your Options
    {
      _type: 'block',
      _key: 'h2options',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2optionsa', text: 'Your Options for Selling a House With Mine Subsidence in Dunmore', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options1a', text: 'Let\'s go through your realistic choices.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options2',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'options2a', text: 'Option 1: Repair Everything First', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options3a', text: 'Fix all the damage, stabilize the underlying mine void, then sell.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options4a', text: 'Pros:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options5a', text: '• Can potentially sell at full market value', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options6a', text: '• Full buyer pool (if repairs are complete and documented)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options7a', text: '• Clean disclosure', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options8a', text: 'Cons:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options9a', text: '• Extremely expensive ($30,000 - $150,000+)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options10a', text: '• Time-consuming (6-12+ months)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options11a', text: '• Risk of additional problems discovered during repair', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options12a', text: '• May cost more than the house is worth', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options13a', text: '• No guarantee you\'ll recover repair costs in sale price', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options14a', text: 'Best for: ', marks: ['strong'] },
        { _type: 'span', _key: 'options14b', text: 'Minor damage on high-value properties where math works out.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options15a', text: 'Reality check: ', marks: ['strong'] },
        { _type: 'span', _key: 'options15b', text: 'For most Dunmore properties, this doesn\'t pencil. A $150,000 house with $80,000 in needed repairs? You\'re underwater before you start.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options16',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'options16a', text: 'Option 2: File an Insurance Claim First', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options17',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options17a', text: 'If you have mine subsidence insurance through PA DEP, file a claim before selling.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options18',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options18a', text: 'Pros:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options19',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options19a', text: '• Insurance may cover repair costs (up to policy limit)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options20',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options20a', text: '• Professional assessment of damage', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options21',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options21a', text: '• Documented repairs increase salability', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options22',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options22a', text: 'Cons:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options23',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options23a', text: '• Must have had insurance before damage occurred', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options24',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options24a', text: '• Claims process takes time', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options25',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options25a', text: '• May not cover full repair cost', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options26',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options26a', text: '• House must be your primary residence for some coverage', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options27',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options27a', text: 'Best for: ', marks: ['strong'] },
        { _type: 'span', _key: 'options27b', text: 'Homeowners with existing MSI coverage who discovered damage.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options28',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options28a', text: 'The catch: ', marks: ['strong'] },
        { _type: 'span', _key: 'options28b', text: 'If you don\'t have mine subsidence insurance, this option doesn\'t exist. And you can\'t buy it after damage occurs.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options29',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'options29a', text: 'Option 3: List As-Is and Disclose', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options30',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options30a', text: 'Put the house on the market with full disclosure of the mine subsidence issues.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options31',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options31a', text: 'Pros:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options32',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options32a', text: '• No upfront repair costs', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options33',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options33a', text: '• Honest and legal approach', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options34',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options34a', text: 'Cons:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options35',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options35a', text: '• Extremely limited buyer pool', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options36',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options36a', text: '• Months on market with few (if any) showings', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options37',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options37a', text: '• Lowball offers from investors who know you\'re stuck', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options38',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options38a', text: '• Agent commissions still due if it sells', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options39',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options39a', text: '• Psychological toll of rejection after rejection', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options40',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options40a', text: 'Best for: ', marks: ['strong'] },
        { _type: 'span', _key: 'options40b', text: 'I rarely recommend this approach for significant mine subsidence damage.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options41',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'options41a', text: 'Option 4: Sell to a Cash Buyer Who Specializes in Problem Properties', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options42',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options42a', text: 'Sell as-is to an investor who understands mine subsidence and has the resources to deal with it.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options43',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options43a', text: 'Pros:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options44',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options44a', text: '• No repairs needed', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options45',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options45a', text: '• No financing contingencies', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options46',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options46a', text: '• Close fast (often 7-14 days)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options47',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options47a', text: '• Buyer assumes all risk and responsibility', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options48',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options48a', text: '• No commissions', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options49',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options49a', text: '• Certainty — you know it will close', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options50',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options50a', text: 'Cons:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options51',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options51a', text: '• Lower than retail price (but see real math below)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options52',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options52a', text: '• Need to find a legitimate buyer who actually understands the issue', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options53',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'options53a', text: 'Best for: ', marks: ['strong'] },
        { _type: 'span', _key: 'options53b', text: 'Significant damage, repair costs exceeding reasonable ROI, time-sensitive situations, out-of-area owners, inherited properties.', marks: [] }
      ],
      markDefs: []
    },

    // Section: The Real Math
    {
      _type: 'block',
      _key: 'h2math',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2matha', text: 'The Real Math: Cash Sale vs. Traditional Sale With Mine Subsidence', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math1a', text: 'Let\'s do the numbers on a realistic Dunmore scenario.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math2a', text: 'Example: 3-bedroom home with foundation damage from mine subsidence', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math3a', text: 'Property value (if perfect): $165,000', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math4a', text: 'Current condition: Diagonal foundation cracks, bowing basement wall, driveway sinking, possible active mine void below.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math5',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'math5a', text: 'Option A: Repair and Sell Traditional', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math6a', text: '• Structural engineer assessment: $1,500', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math7a', text: '• Foundation underpinning: $22,000', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math8a', text: '• Basement wall repair: $8,000', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math9a', text: '• Mine void investigation/grouting: $35,000', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math10a', text: '• Surface repairs (driveway, etc.): $5,000', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math11a', text: '• 9 months carrying costs: $13,500', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math12a', text: '• Agent commission (6%): $9,900', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math13a', text: '• Closing costs (3%): $4,950', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math14a', text: 'Total costs: $99,850', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math15a', text: 'Your net: $65,150', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math16',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math16a', text: 'Timeline: 9-12 months', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math17',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math17a', text: 'And that assumes no additional problems discovered during repair, you can find contractors who will do the work, the house sells at full value after repairs, and no financing issues for the buyer.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math18',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'math18a', text: 'Option B: Sell As-Is to Cash Buyer', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math19',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math19a', text: '• Cash offer: $75,000', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math20',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math20a', text: '• Repairs: $0', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math21',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math21a', text: '• Commissions: $0', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math22',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math22a', text: '• Closing costs: $0', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math23',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math23a', text: 'Your net: $75,000', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math24',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math24a', text: 'Timeline: 14 days', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math25',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math25a', text: 'The cash sale nets you ', marks: [] },
        { _type: 'span', _key: 'math25b', text: '$9,850 more', marks: ['strong'] },
        { _type: 'span', _key: 'math25c', text: ' and saves you ', marks: [] },
        { _type: 'span', _key: 'math25d', text: '9-12 months', marks: ['strong'] },
        { _type: 'span', _key: 'math25e', text: ' of stress, risk, and uncertainty.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math26',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'math26a', text: 'That\'s not even counting your time managing contractors, the risk of repair costs ballooning, the stress of living with (or dealing with) an unstable house, and opportunity cost of money tied up for a year.', marks: [] }
      ],
      markDefs: []
    },

    // Section: What We Look At
    {
      _type: 'block',
      _key: 'h2look',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2looka', text: 'What We Look At When Buying Houses With Mine Subsidence', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look1a', text: 'When I evaluate a house with mine subsidence damage, here\'s my process:', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look2a', text: '1. Location relative to known mines', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look3a', text: 'PA DEP has an interactive map (', marks: [] },
        { _type: 'span', _key: 'look3b', text: 'pamsi.org', marks: ['pamsiLink'] },
        { _type: 'span', _key: 'look3c', text: ') showing mining risk areas.', marks: [] }
      ],
      markDefs: [
        { _type: 'link', _key: 'pamsiLink', href: 'https://www.pamsi.org', blank: true }
      ]
    },
    {
      _type: 'block',
      _key: 'look4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look4a', text: 'I check if the property is in a gray "Underground Mining Area" or pink "Coal Exists - Possibly Mined" zone.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look5a', text: 'Dunmore is heavily covered.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look6a', text: '2. Type and extent of visible damage', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look7a', text: '• Are we looking at cosmetic cracks or structural failure?', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look8a', text: '• Is damage active (still moving) or historical (stabilized)?', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look9a', text: '• Multiple areas affected or localized?', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look10a', text: '3. Repair feasibility', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look11a', text: '• Can this be fixed with standard foundation work?', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look12a', text: '• Or does it need mine void stabilization?', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look13a', text: '• What\'s the realistic cost range?', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look14a', text: '4. After-repair value', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look15a', text: 'Even fixed, what will this house be worth?', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look16',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look16a', text: 'In Dunmore, we\'re not talking about $500,000 houses. We\'re typically in the $100,000-$200,000 range.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look17',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look17a', text: 'That ceiling limits how much we can offer.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look18',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look18a', text: '5. Our actual risk', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look19',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look19a', text: 'Mine subsidence is unpredictable. We might buy a house, do $40,000 in repairs, and have a new void open up.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look20',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'look20a', text: 'That risk gets factored into offers.', marks: [] }
      ],
      markDefs: []
    },

    // Section: Real Story
    {
      _type: 'block',
      _key: 'h2story',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2storya', text: 'Real Story: Inherited Dunmore Property With Active Subsidence', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story1a', text: 'Let me tell you about a property we bought.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story2a', text: 'Woman named Carol (not her real name) inherited her parents\' house on Drinker Street.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story3a', text: 'Her parents had lived there 40 years. Dad passed, mom went to a nursing home, mom passed.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story4a', text: 'Carol lived in New Jersey. She came up to clean out the house and found:', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story5a', text: '• 2-inch diagonal crack in the basement wall', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story6a', text: '• Front porch separating from the house', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story7a', text: '• Back corner of the house noticeably lower than the front', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story8a', text: '• Neighbor told her "your dad was always worried about the mines"', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story9a', text: 'She called three real estate agents. Two declined to list it. The third said she\'d need at least $50,000 in repairs before it was marketable.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story10a', text: 'Carol got a structural engineer report: active settlement, likely mine-related, recommended minimum $65,000 in stabilization work.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story11a', text: 'The house might be worth $140,000 fixed. Maybe.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story12a', text: 'She didn\'t have $65,000. She didn\'t have time to manage a construction project from New Jersey. She just wanted it done.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story13a', text: 'We walked through together. I was honest — this was a significant problem.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story14a', text: 'Our offer: $68,000', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story15a', text: 'That accounted for the $65,000+ in likely repair costs, carrying costs during repair, and our risk if problems turned out to be worse than estimated.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story16',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story16a', text: 'Carol took it.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story17',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story17a', text: 'We closed in 12 days. She didn\'t have to get another contractor quote, file any insurance paperwork, or make another trip to Dunmore.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story18',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story18a', text: 'Six months later, we had spent $72,000 on repairs and stabilization. Sold it for $145,000.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story19',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story19a', text: 'We made money, but not a killing. The math worked because we do this at volume and have contractor relationships that get us better pricing.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story20',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story20a', text: 'For Carol, it was the right choice. She got out clean and moved on.', marks: [] }
      ],
      markDefs: []
    },

    // Section: Mine Subsidence Insurance
    {
      _type: 'block',
      _key: 'h2ins',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2insa', text: 'Mine Subsidence Insurance: What You Need to Know', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins1a', text: 'If you own property in Dunmore and don\'t have mine subsidence insurance, you should probably get it.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins2',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'ins2a', text: 'PA Mine Subsidence Insurance Fund', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins3a', text: 'The state runs this program through the DEP.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins4a', text: '• Coverage available from $5,000 to $1,000,000', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins5a', text: '• $150,000 of coverage costs about $41.25/year', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins6a', text: '• Covers damage from collapse of underground coal or clay mines', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins7a', text: '• Also covers mine water blowouts', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins8a', text: 'Critical points:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins9a', text: '• You must buy coverage BEFORE damage occurs', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins10a', text: '• Properties with existing unrepaired damage may not be eligible', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins11a', text: '• Your regular homeowners insurance does NOT cover mine subsidence', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins12a', text: '• Over $47 million paid out in claims since 1961', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins13a', text: 'How to check your risk:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins14a', text: 'Visit ', marks: [] },
        { _type: 'span', _key: 'ins14b', text: 'pamsi.org', marks: ['pamsiLink2'] },
        { _type: 'span', _key: 'ins14c', text: ' and use the interactive map.', marks: [] }
      ],
      markDefs: [
        { _type: 'link', _key: 'pamsiLink2', href: 'https://www.pamsi.org', blank: true }
      ]
    },
    {
      _type: 'block',
      _key: 'ins15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins15a', text: 'Enter your address. If you\'re in a gray or pink zone, you\'re at risk.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins16',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins16a', text: 'Dunmore is almost entirely in a risk zone.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins17',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins17a', text: 'If you already have damage:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins18',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins18a', text: 'You can\'t buy insurance after damage occurs.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins19',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins19a', text: 'If you have an existing policy, file a claim immediately.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ins20',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ins20a', text: 'If you don\'t have coverage, your options are repair out-of-pocket or sell as-is.', marks: [] }
      ],
      markDefs: []
    },

    // Section: Dunmore Neighborhoods
    {
      _type: 'block',
      _key: 'h2neigh',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2neigha', text: 'Dunmore Neighborhoods and Mine Risk', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh1a', text: 'Mine subsidence risk isn\'t uniform across Dunmore.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh2a', text: 'Higher risk areas:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh3a', text: '• Areas along the Lackawanna River valley', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh4a', text: '• Neighborhoods closest to Scranton', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh5a', text: '• Areas near the historic mine entries and breakers', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh6a', text: '• Lower elevation sections of the borough', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh7a', text: 'The College Avenue incident:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh8a', text: 'In June 2025, a sinkhole opened on College Avenue that was 12-14 feet in diameter and 40 feet deep.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh9a', text: 'Four properties were evacuated.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh10a', text: 'The Bureau of Abandoned Mine Reclamation confirmed it was mine-related.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh11a', text: 'This wasn\'t in an isolated area — it was a residential neighborhood.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh12a', text: 'Why this matters:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh13a', text: 'Even if your specific lot hasn\'t had problems, being in a known mining area affects:', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh14a', text: '• Your ability to get traditional financing', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh15a', text: '• Buyer perception if you try to sell', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'neigh16',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'neigh16a', text: '• Your long-term risk profile', marks: [] }
      ],
      markDefs: []
    },

    // Section: Major Repairs
    {
      _type: 'block',
      _key: 'h2major',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2majora', text: 'Major Repairs Situation: When Mine Subsidence Is the Final Straw', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major1a', text: 'This article is also for people facing ', marks: [] },
        { _type: 'span', _key: 'major1b', text: 'major repairs', marks: ['majorRepairsLink'] },
        { _type: 'span', _key: 'major1c', text: ' in general — and mine subsidence is often just one part of the picture.', marks: [] }
      ],
      markDefs: [
        { _type: 'link', _key: 'majorRepairsLink', href: '/situations/major-repairs' }
      ]
    },
    {
      _type: 'block',
      _key: 'major2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major2a', text: 'Many houses with mine subsidence also have:', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major3a', text: 'Related structural issues:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major4a', text: '• Foundation cracks from settlement', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major5a', text: '• Bowing walls', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major6a', text: '• Floor joist damage', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major7a', text: '• Chimney problems', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major8a', text: 'Age-related deterioration:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major9a', text: '• Outdated electrical (knob and tube, undersized panels)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major10a', text: '• Old plumbing (galvanized pipes, cast iron sewers)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major11a', text: '• Roof at end of life', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major12a', text: '• Windows that need replacement', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major13a', text: 'Deferred maintenance:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major14a', text: '• Years of small problems that added up', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major15a', text: '• Previous owners who patched rather than fixed', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major16',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major16a', text: '• Handyman specials that weren\'t done right', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major17',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major17a', text: 'When you add mine subsidence to an already tired house, the math becomes impossible.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major18',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major18a', text: 'A $150,000 house that needs $50,000 in mine subsidence repairs, $15,000 in electrical updates, $12,000 in roof replacement, and $8,000 in plumbing work — that\'s $85,000 in repairs on a $150,000 house. You\'re going to lose money on the traditional route.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'major19',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'major19a', text: 'This is exactly when selling as-is makes sense.', marks: [] }
      ],
      markDefs: []
    },

    // Section: Red Flags
    {
      _type: 'block',
      _key: 'h2red',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2reda', text: 'Red Flags: Avoiding Bad Actors', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red1a', text: 'Not everyone who says "we buy houses" actually can.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red2a', text: 'Warning signs:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red3a', text: 'They\'ve never dealt with mine subsidence', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red4a', text: 'Ask specifically: "Have you bought houses with mine subsidence damage before?"', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red5a', text: 'If they hesitate or say no, they\'re learning on your dime.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red6a', text: 'They can\'t show proof of funds', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red7a', text: 'Real buyers have real money. Ask for a bank statement or proof of funds letter.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red8a', text: 'They lowball then renegotiate', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red9a', text: 'Some buyers make a high offer to get you under contract, then "discover" problems and lower the price.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red10a', text: 'Get a realistic offer upfront from someone who\'s actually seen the property.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red11a', text: 'They\'re wholesalers', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red12a', text: 'Some people put houses under contract just to flip the contract to someone else.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red13a', text: 'Ask: "Are YOU buying this house with YOUR funds?"', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red14a', text: 'No local presence', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red15a', text: 'National "we buy houses" companies exist, but mine subsidence is a regional problem.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red16',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'red16a', text: 'You want someone who understands Lackawanna County, knows the contractors, and has dealt with the DEP before.', marks: [] }
      ],
      markDefs: []
    },

    // Section: Bottom Line
    {
      _type: 'block',
      _key: 'h2bottom',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2bottoma', text: 'The Bottom Line', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom1a', text: 'If you need to sell your house fast in Dunmore with mine subsidence damage, you have options.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom2a', text: 'Traditional sales rarely work when there\'s structural damage from mining activity. Financing falls through. Buyers get scared. Repair costs exceed what makes sense.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom3a', text: 'Cash buyers exist for exactly this situation.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom4a', text: 'At ClearEdge Home Buyers, we\'ve been buying houses with mine subsidence and other major repairs since 2016.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom5a', text: 'We understand the Lackawanna Valley. We know what mine subsidence looks like. We have relationships with contractors who do this work.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom6a', text: 'No judgment. No long sales process. Just an honest offer and a fast closing.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom7a', text: 'Ready to see what your property is worth?', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom8a', text: 'Get your free, no-obligation cash offer here', marks: ['ctaLink'] },
        { _type: 'span', _key: 'bottom8b', text: '.', marks: [] }
      ],
      markDefs: [
        { _type: 'link', _key: 'ctaLink', href: 'https://clearedgehomebuyers.com' }
      ]
    },
    {
      _type: 'block',
      _key: 'bottom9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom9a', text: 'Or learn more about ', marks: [] },
        { _type: 'span', _key: 'bottom9b', text: 'how our 3-step process works', marks: ['howItWorksLink'] },
        { _type: 'span', _key: 'bottom9c', text: '.', marks: [] }
      ],
      markDefs: [
        { _type: 'link', _key: 'howItWorksLink', href: '/how-it-works' }
      ]
    },
    {
      _type: 'block',
      _key: 'bottom10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom10a', text: 'If you need to sell your house fast in Dunmore with mine subsidence damage, we\'re ready to help.', marks: [] }
      ],
      markDefs: []
    },

    // Author bio
    {
      _type: 'block',
      _key: 'bio1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bio1a', text: 'Tyler Swenson is the founder of ClearEdge Home Buyers, a cash home buying company serving Eastern Pennsylvania since 2016. He has helped over 200 homeowners sell their properties quickly — including many with mine subsidence, foundation damage, and other major repair needs. Tyler has been featured in The Morning Call and Lehigh Valley Business, and regularly speaks at REIA meetups throughout Eastern PA.', marks: ['em'] }
      ],
      markDefs: []
    }
  ],

  // Related locations will be added dynamically
  relatedLocations: [],
  relatedSituations: []
}

async function createBlogPost() {
  console.log('Starting blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

  try {
    // Fetch location references
    console.log('\nFetching location references...')
    const locationSlugs = ['scranton', 'lackawanna-county', 'dunmore']
    const locations = await client.fetch(
      `*[_type == "location" && slug.current in $slugs]{ _id, slug }`,
      { slugs: locationSlugs }
    )
    console.log('Found locations:', locations.map(l => l.slug.current))

    // Fetch situation references
    console.log('\nFetching situation references...')
    const situationSlugs = ['major-repairs', 'inherited-property']
    const situations = await client.fetch(
      `*[_type == "situation" && slug.current in $slugs]{ _id, slug }`,
      { slugs: situationSlugs }
    )
    console.log('Found situations:', situations.map(s => s.slug.current))

    // Add location references
    if (locations.length > 0) {
      blogPost.relatedLocations = locations.map(loc => ({
        _type: 'reference',
        _ref: loc._id,
        _key: loc._id
      }))
    }

    // Add situation references
    if (situations.length > 0) {
      blogPost.relatedSituations = situations.map(sit => ({
        _type: 'reference',
        _ref: sit._id,
        _key: sit._id
      }))
    }

    console.log('\nCreating blog post...')
    const result = await client.create(blogPost)
    console.log('\n✅ Blog post created successfully!')
    console.log('Document ID:', result._id)
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-dunmore-mine-subsidence')

  } catch (error) {
    console.error('Error creating blog post:', error)
    process.exit(1)
  }
}

createBlogPost()
