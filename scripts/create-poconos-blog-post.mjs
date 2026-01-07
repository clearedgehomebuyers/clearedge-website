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
  title: 'Sell My House Fast Poconos PA: The Complete Guide for Vacation Home Owners',
  slug: { current: 'sell-my-house-fast-poconos-pa' },
  metaTitle: 'Sell My House Fast Poconos PA | Cash Offer in 24 Hours',
  metaDescription: 'Need to sell your Poconos house fast? Get a fair cash offer in 24 hours. We buy vacation homes, cabins & properties in Stroudsburg, Mount Pocono, Tobyhanna & all of Monroe County. No fees.',
  excerpt: "Need to sell your Poconos house fast? Here's the complete guide for vacation home owners — your options, Pocono-specific challenges, what cash buyers pay, and how to sell your cabin, A-frame, or rental property quickly.",
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2025-10-20T10:00:00Z',
  category: 'locations',

  faqs: [
    {
      question: 'How fast can you close on a Pocono property?',
      answer: 'We can close in as little as 7 days if title is clear. Typical is 10-14 days. Need more time? You pick the date.'
    },
    {
      question: 'Do you buy vacation homes and cabins?',
      answer: 'Yes. A-frames, chalets, lakefront cabins, ski homes — we buy all types of Pocono vacation properties.'
    },
    {
      question: 'What if my house is in an HOA community?',
      answer: 'We buy in HOA communities regularly. Saw Creek, The Hideout, Emerald Lakes, Pocono Farms — we know them all.'
    },
    {
      question: 'Do I need to winterize or make repairs first?',
      answer: 'No. We buy as-is. Frozen pipe damage, septic issues, roof problems — we handle it.'
    },
    {
      question: 'I live out of state. How does this work?',
      answer: "Easy. We can do the walkthrough while you're not there, handle everything remotely, and close via mail or mobile notary."
    },
    {
      question: 'What about the furniture and stuff inside?',
      answer: 'Take what you want, leave the rest. We handle cleanouts.'
    },
    {
      question: 'Can you buy my short-term rental property?',
      answer: "Yes. Whether it's performing well or bleeding money, we buy STR properties. Furnished or unfurnished."
    },
    {
      question: 'What areas of the Poconos do you cover?',
      answer: 'All of it. Monroe, Pike, Wayne, and Carbon counties. Stroudsburg, Mount Pocono, Tobyhanna, Tannersville, Bushkill, Lake Harmony, and everywhere in between.'
    }
  ],

  content: [
    // Intro
    {
      _type: 'block',
      _key: 'intro1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'intro1span1',
          text: 'If you need to ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'intro1span2',
          text: 'sell my house fast in the Poconos PA',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'intro1span3',
          text: ", you're probably dealing with a situation — a vacation home you don't use anymore, an inherited cabin, a short-term rental that isn't making money, or just a property that's become a burden.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'intro2span1',
          text: "I'm Tyler Swenson, founder of ClearEdge Home Buyers. Since 2016, I've bought over 200 houses across Eastern PA — including dozens of Pocono properties. A-frames, lakefront cabins, ski chalets, HOA community homes, struggling Airbnbs. I've seen it all.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'intro3span1',
          text: "This guide covers everything you need to know about selling your Pocono property fast for cash. No generic advice — real information from someone who buys in this market every month.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Why the Poconos Market Is Different
    {
      _type: 'block',
      _key: 'h2market',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2marketspan',
          text: 'Why the Poconos Market Is Different',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'market1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'market1span',
          text: "The Poconos isn't like selling a house in Scranton or Allentown. The market has unique dynamics that make traditional sales challenging:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'market2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'market2span1',
          text: 'Seasonal demand.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'market2span2',
          text: ' Most buyers shop in spring and summer. List in October? You might wait until May for serious offers.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'market3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'market3span1',
          text: 'Second-home buyers are pickier.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'market3span2',
          text: " This isn't their primary residence — they can walk away. Every inspection issue becomes a deal-breaker.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'market4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'market4span1',
          text: 'Financing is harder.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'market4span2',
          text: ' Second homes require 10-20% down payments. Investment properties even more. Fewer qualified buyers means longer time on market.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'market5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'market5span1',
          text: 'Distance kills deals.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'market5span2',
          text: " Buyers come from NYC, Philly, North Jersey. They're 2+ hours away. Scheduling showings is a nightmare. Deals fall apart over logistics.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'market6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'market6span1',
          text: 'HOA complications.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'market6span2',
          text: ' Many Pocono properties are in HOA communities with fees, restrictions, and assessments. Buyers get scared off by the fine print.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: The Hidden Costs of Selling a Pocono Property the Traditional Way
    {
      _type: 'block',
      _key: 'h2costs',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2costsspan',
          text: 'The Hidden Costs of Selling a Pocono Property the Traditional Way',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'costs1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'costs1span',
          text: "Let's do the math on a typical $275K Pocono vacation home:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'costs2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'costs2span1',
          text: 'Agent commission:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'costs2span2',
          text: ' 5-6% = $13,750 - $16,500',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'costs3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'costs3span1',
          text: 'Closing costs:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'costs3span2',
          text: ' 2-3% = $5,500 - $8,250',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'costs4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'costs4span1',
          text: 'Repairs to satisfy buyers:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'costs4span2',
          text: ' $5,000 - $20,000 (septic, well, roof, etc.)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'costs5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'costs5span1',
          text: 'Holding costs (6+ months):',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'costs5span2',
          text: ' Mortgage, HOA fees, taxes, insurance, utilities, winterization = $1,500-3,000/month = $9,000 - $18,000',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'costs6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'costs6span1',
          text: 'Staging and prep:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'costs6span2',
          text: ' $2,000 - $5,000 (vacation homes need to look inviting)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'costs7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'costs7span',
          text: 'Total traditional sale costs: $35,250 - $67,750',
          marks: ['strong']
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'costs8',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'costs8span',
          text: "On a $275K sale, you might net $207-240K after everything — if nothing goes wrong. That's a big 'if' in a seasonal market.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Types of Pocono Properties We Buy
    {
      _type: 'block',
      _key: 'h2types',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2typesspan',
          text: 'Types of Pocono Properties We Buy',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'types1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'types1span',
          text: "We buy all types of Pocono properties. Here's what we see most often:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'types2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'types2span1',
          text: 'Vacation homes, A-frames, and cabins.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'types2span2',
          text: " The classic Pocono property. Whether it's a 1970s A-frame or a modern chalet, we buy them all.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'types3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'types3span1',
          text: 'Short-term rentals (Airbnb/VRBO).',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'types3span2',
          text: " Bought it to make money, but it's a headache? We buy performing and non-performing STRs, furnished or unfurnished.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'types4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'types4span1',
          text: 'Timeshares and fractional ownership.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'types4span2',
          text: " These are tricky to sell traditionally. We can often help depending on the situation.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'types5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'types5span1',
          text: 'HOA community homes.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'types5span2',
          text: ' Saw Creek, The Hideout, Emerald Lakes, Pocono Farms, Big Bass Lake — we know these communities and their quirks.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'types6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'types6span1',
          text: 'Land and lots.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'types6span2',
          text: ' Bought land years ago and never built? We buy vacant lots too.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'types7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'types7span1',
          text: 'Inherited properties.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'types7span2',
          text: " Managing a vacation home from out of state after a family member passed? We make it simple. Learn more about ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'types7span3',
          text: 'selling inherited property',
          marks: ['inheritedLink']
        },
        {
          _type: 'span',
          _key: 'types7span4',
          text: '.',
          marks: []
        }
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'inheritedLink',
          href: '/situations/inherited-property'
        }
      ]
    },

    // H2: Pocono-Specific Challenges That Make Cash Sales Smart
    {
      _type: 'block',
      _key: 'h2challenges',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2challengesspan',
          text: 'Pocono-Specific Challenges That Make Cash Sales Smart',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'challenges1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'challenges1span',
          text: 'Pocono properties come with unique issues that scare off traditional buyers:',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'challenges2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'challenges2span1',
          text: 'Septic systems.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'challenges2span2',
          text: ' Most Pocono homes are on septic. Failed inspection = $15-30K to replace. Traditional buyers run.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'challenges3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'challenges3span1',
          text: 'Well water.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'challenges3span2',
          text: ' Water quality issues, low flow, old equipment. Banks require water tests. Fixes are expensive.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'challenges4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'challenges4span1',
          text: 'Winterization problems.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'challenges4span2',
          text: " Frozen pipes, cracked fixtures, water damage. One bad winter can cause $20K+ in damage. We've bought plenty of these.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'challenges5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'challenges5span1',
          text: 'Deferred maintenance.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'challenges5span2',
          text: " Vacation homes get used hard and maintained little. Decks rotting, roofs aging, HVAC on its last legs.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'challenges6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'challenges6span1',
          text: 'Remote locations.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'challenges6span2',
          text: ' Some Pocono properties are down long private roads. Snow removal, access issues, and isolation concern buyers.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'challenges7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'challenges7span1',
          text: 'Changing STR regulations.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'challenges7span2',
          text: ' Some townships are cracking down on short-term rentals. Buyers looking for income properties get nervous.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'challenges8',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'challenges8span',
          text: "Cash buyers like us don't care about these issues. Your problem becomes our project.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Pocono Areas We Buy In
    {
      _type: 'block',
      _key: 'h2areas',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2areasspan',
          text: 'Pocono Areas We Buy In',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'areas1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'areas1span',
          text: 'We buy throughout the Poconos — all four counties:',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3monroe',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3monroespan',
          text: 'Monroe County',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'monroe1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'monroe1span',
          text: 'Stroudsburg, East Stroudsburg, Mount Pocono, Tobyhanna, Tannersville, Delaware Water Gap, Pocono Summit, Pocono Pines. The heart of the Poconos tourism industry.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3pike',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3pikespan',
          text: 'Pike County',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'pike1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pike1span',
          text: "Bushkill, Milford, Dingmans Ferry, Matamoras, Shohola. Beautiful area along the Delaware. Lots of HOA communities.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3wayne',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3waynespan',
          text: 'Wayne County',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'wayne1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'wayne1span',
          text: 'Honesdale, Lake Ariel, Lake Wallenpaupack area, Hawley, Hamlin. Lakefront properties and rural retreats.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3carbon',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3carbonspan',
          text: 'Carbon County',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'carbon1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'carbon1span',
          text: 'Lake Harmony, Jim Thorpe, Albrightsville, Split Rock. Ski area properties and historic towns.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Situations Where Selling Fast Makes Sense in the Poconos
    {
      _type: 'block',
      _key: 'h2sit',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2sitspan',
          text: 'Situations Where Selling Fast Makes Sense in the Poconos',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'sit1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'sit1span1',
          text: 'Out-of-state owner.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit1span2',
          text: " You live in NYC, Jersey, or Philly. Managing a vacation home 2 hours away is exhausting. Every issue requires a day trip or hiring someone.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'sit2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'sit2span1',
          text: 'Burden vacation home.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit2span2',
          text: " You haven't used it in 2 years. The kids don't come anymore. It's just an expense now.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'sit3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'sit3span1',
          text: "STR that's not working.",
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit3span2',
          text: " The Airbnb dream didn't pan out. Bookings are down, reviews are mixed, management is a nightmare. Time to exit.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'sit4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'sit4span1',
          text: 'Inherited property.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit4span2',
          text: " Mom and Dad's cabin. Full of memories but also full of stuff. You need to settle the estate and move on.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'sit5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'sit5span1',
          text: 'Major issues.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit5span2',
          text: " Septic failed. Pipes froze. Roof needs replacing. The repair bill is bigger than your appetite for this property.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'sit6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'sit6span1',
          text: 'Behind on payments.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit6span2',
          text: ' Second home mortgages are often first to fall behind in tough times. We can help you sell before ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'sit6span3',
          text: 'foreclosure',
          marks: ['foreclosureLink']
        },
        {
          _type: 'span',
          _key: 'sit6span4',
          text: '.',
          marks: []
        }
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'foreclosureLink',
          href: '/situations/foreclosure'
        }
      ]
    },
    {
      _type: 'block',
      _key: 'sit7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'sit7span1',
          text: 'Divorce.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit7span2',
          text: ' The vacation home was for the family. Now you need to liquidate and split the proceeds. Read about ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'sit7span3',
          text: 'selling during divorce',
          marks: ['divorceLink']
        },
        {
          _type: 'span',
          _key: 'sit7span4',
          text: '.',
          marks: []
        }
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'divorceLink',
          href: '/situations/divorce'
        }
      ]
    },

    // H2: How to Sell Your Poconos House Fast
    {
      _type: 'block',
      _key: 'h2how',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2howspan',
          text: 'How to Sell Your Poconos House Fast',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'how1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'how1span',
          text: "Here's the step-by-step process when you sell to ClearEdge:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'step1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'step1span1',
          text: 'Step 1: Contact us.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step1span2',
          text: ' Call (570) 904-2059 or fill out our form. Tell us about your Pocono property.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'step2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'step2span1',
          text: 'Step 2: We research.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step2span2',
          text: ' Pull comps, check HOA status, estimate repairs. Usually within 24 hours.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'step3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'step3span1',
          text: 'Step 3: Property walkthrough.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step3span2',
          text: " We visit the property. If you're out of state, we can access it without you being there.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'step4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'step4span1',
          text: 'Step 4: Get your cash offer.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step4span2',
          text: " Fair, written, no obligation. We explain exactly how we calculated it.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'step5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'step5span1',
          text: 'Step 5: Accept or decline.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step5span2',
          text: ' Take your time. No pressure. Get other offers if you want.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'step6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'step6span1',
          text: 'Step 6: Pick your closing date.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step6span2',
          text: ' As fast as 7 days or take 60 days — whatever works for you.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'step7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'step7span1',
          text: 'Step 7: Close and get paid.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step7span2',
          text: ' Out of state? We can close via mail or mobile notary. Cash wired to your account.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: What We Pay for Pocono Properties
    {
      _type: 'block',
      _key: 'h2pay',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2payspan',
          text: 'What We Pay for Pocono Properties',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'pay1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pay1span',
          text: "Cash buyers pay less than retail — that's the trade-off for speed, certainty, and convenience. The typical formula is 70-85% of after-repair value (ARV) minus repair costs.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'pay2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pay2span1',
          text: 'Example:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'pay2span2',
          text: ' A Tobyhanna A-frame worth $200K fixed up, needing $20K in repairs.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'pay3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pay3span',
          text: 'ARV: $200,000. At 80%: $160,000. Minus $20K repairs: $140,000 offer.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'pay4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pay4span',
          text: "Compare to traditional: $200K sale - $20K repairs - $12K commission - $5K closing - $12K holding (6 months) = $151K net. Cash sale nets you $140K guaranteed in 2 weeks without lifting a finger.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Real Story: Tobyhanna Vacation Home
    {
      _type: 'block',
      _key: 'h2story',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2storyspan',
          text: 'Real Story: Tobyhanna Vacation Home',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'story1span',
          text: "The Millers from Long Island bought their Tobyhanna vacation home in 2008. Great memories for 15 years. But the kids grew up and stopped coming. Last winter, pipes froze while they were away. Water damage everywhere.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'story2span',
          text: 'Insurance covered some but not all. The repair estimate was $35K. After 15 years, they were done.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'story3span',
          text: 'We offered $145,000 cash, as-is, including all the furniture they didn\'t want to haul back to Long Island. Closed in 14 days via mobile notary at their home.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'story4span',
          text: '"We could have gotten more if we fixed it and listed it," Mr. Miller said. "But we didn\'t want to deal with it anymore. The cash offer was fair and let us close that chapter."',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Red Flags: How to Spot Bad Cash Buyers
    {
      _type: 'block',
      _key: 'h2red',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2redspan',
          text: 'Red Flags: How to Spot Bad Cash Buyers',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'red1span',
          text: "Not all cash buyers are legitimate. Protect yourself:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'red2span1',
          text: 'No proof of funds.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'red2span2',
          text: " Ask for a bank statement or letter. Real buyers can prove they have the cash. If they can't, walk away.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'red3span1',
          text: 'Pressure tactics.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'red3span2',
          text: ' "Sign today or the offer expires" is manipulative. Legitimate buyers give you time to think.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'red4span1',
          text: 'Wholesalers pretending to be buyers.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'red4span2',
          text: " Some people just want to get your property under contract and sell it to someone else. Ask: \"Are you the actual buyer?\"",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'red5span1',
          text: 'Hidden fees.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'red5span2',
          text: ' Real cash buyers pay ALL closing costs. If someone mentions processing fees or surprise deductions, find another buyer.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Why Local Matters in the Poconos
    {
      _type: 'block',
      _key: 'h2local',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2localspan',
          text: 'Why Local Matters in the Poconos',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'local1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'local1span',
          text: "Big national \"We Buy Houses\" companies don't understand the Poconos market. Here's why working with a local buyer matters:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'local2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'local2span1',
          text: 'Market knowledge.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'local2span2',
          text: ' I know the difference between a house in Saw Creek and one in The Hideout. I know which communities have high HOA fees and which have assessments coming.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'local3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'local3span1',
          text: 'Accessible.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'local3span2',
          text: " I can be at your property tomorrow. National companies take a week to send someone — if they show up at all.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'local4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'local4span1',
          text: 'Faster closing.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'local4span2',
          text: ' We use local title companies who know Pocono properties. No delays from out-of-state coordination.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'local5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'local5span1',
          text: 'Better offers.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'local5span2',
          text: " Because we buy and hold locally, we can often pay more than flippers who need bigger margins to justify the distance.",
          marks: []
        }
      ],
      markDefs: []
    },

    // Closing
    {
      _type: 'block',
      _key: 'close1',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'close1span',
          text: 'Ready to Sell Your Poconos Property Fast?',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'close2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'close2span1',
          text: "If you're ready to move on from your Pocono property, I'm here to help. Get started on our ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'close2span2',
          text: 'homepage',
          marks: ['homeLink']
        },
        {
          _type: 'span',
          _key: 'close2span3',
          text: ' or learn ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'close2span4',
          text: 'how our process works',
          marks: ['howLink']
        },
        {
          _type: 'span',
          _key: 'close2span5',
          text: '.',
          marks: []
        }
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'homeLink',
          href: '/'
        },
        {
          _type: 'link',
          _key: 'howLink',
          href: '/how-it-works'
        }
      ]
    },
    {
      _type: 'block',
      _key: 'close3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'close3span',
          text: 'Call (570) 904-2059 or fill out our form. We respond fast — usually within a few hours. No pressure, no obligation.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'close4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'close4span1',
          text: 'When you need to ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'close4span2',
          text: 'sell my house fast in the Poconos PA',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'close4span3',
          text: ', ClearEdge Home Buyers makes it simple.',
          marks: []
        }
      ],
      markDefs: []
    }
  ]
}

async function main() {
  console.log('Starting blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

  // Fetch related locations (if they exist)
  console.log('\nFetching location references...')
  const locationSlugs = ['stroudsburg', 'east-stroudsburg', 'mount-pocono']
  const locations = await client.fetch(
    `*[_type == "location" && slug.current in $slugs]{ _id, city, slug }`,
    { slugs: locationSlugs }
  )
  console.log('Found locations:', locations.map(l => l.city))

  // Fetch related situations
  console.log('\nFetching situation references...')
  const situationSlugs = ['foreclosure', 'inherited-property', 'divorce']
  const situations = await client.fetch(
    `*[_type == "situation" && slug.current in $slugs]{ _id, title, slug }`,
    { slugs: situationSlugs }
  )
  console.log('Found situations:', situations.map(s => s.title))

  // Build the document with references
  const doc = {
    ...blogPost,
    relatedLocations: locations.length > 0 ? locations.map(loc => ({
      _type: 'reference',
      _ref: loc._id,
      _key: `loc-${loc.slug.current}`
    })) : undefined,
    relatedSituations: situations.map(sit => ({
      _type: 'reference',
      _ref: sit._id,
      _key: `sit-${sit.slug.current}`
    }))
  }

  // Remove undefined relatedLocations if empty
  if (!doc.relatedLocations || doc.relatedLocations.length === 0) {
    delete doc.relatedLocations
  }

  console.log('\nCreating blog post...')
  const result = await client.create(doc)
  console.log('\n✅ Blog post created successfully!')
  console.log('Document ID:', result._id)
  console.log('\nView at: https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-poconos-pa')
}

main().catch(console.error)
