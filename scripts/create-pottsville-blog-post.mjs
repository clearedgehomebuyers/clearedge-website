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
  title: 'Cash Home Buyers Pottsville PA: The Complete Guide to Selling Your Coal Region House Fast',
  slug: { current: 'cash-home-buyers-pottsville-pa' },
  metaTitle: 'Cash Home Buyers Pottsville PA | Get a Cash Offer in 24 Hours',
  metaDescription: 'Looking for cash home buyers in Pottsville PA? Get a fair cash offer in 24 hours. We buy houses in Pottsville, Minersville, Tamaqua & all of Schuylkill County. No fees, close in 7 days.',
  excerpt: "Looking for cash home buyers in Pottsville PA? Here's the complete guide to selling your Coal Region house fast — how cash buyers work, what we pay, Schuylkill County challenges, and how to avoid getting ripped off.",
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2025-11-15T10:00:00Z',
  category: 'locations',

  faqs: [
    {
      question: 'How is this different from a Realtor?',
      answer: "A Realtor lists your house and hopes someone buys it. I am the buyer. I use my own cash. There's no \"for sale\" sign in your yard and no showings with strangers."
    },
    {
      question: 'How fast can you close in Pottsville?',
      answer: 'We can close in as little as 7 days if the title is clear. Typical is 10-14 days. If you need more time, just tell us — you pick the date.'
    },
    {
      question: "What about all the stuff I don't want?",
      answer: "Leave it. Seriously. Clothes, old furniture, junk, trash — take what's important to you and walk away. We handle the cleanout."
    },
    {
      question: 'Do I need to make repairs first?',
      answer: "No. We buy houses as-is. Mold, fire damage, foundation issues, roof problems, hoarder situations — we've seen it all."
    },
    {
      question: 'Are you just going to lowball me?',
      answer: "I give fair offers based on what I can sell the property for after repairs. If my offer doesn't make sense for your situation, I'll tell you to list it. No hard feelings."
    },
    {
      question: 'What if I still owe money on my mortgage?',
      answer: 'No problem. We pay off your mortgage at closing. You keep any remaining equity.'
    },
    {
      question: 'Do you buy houses with tenants?',
      answer: "Yes. We buy occupied rentals regularly. You don't need to evict first."
    },
    {
      question: 'What areas of Schuylkill County do you cover?',
      answer: 'All of it. Pottsville, Minersville, Tamaqua, Shenandoah, Ashland, Pine Grove, Schuylkill Haven, Orwigsburg, Frackville, St. Clair, and everywhere in between.'
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
          text: "If you're searching for ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'intro1span2',
          text: 'cash home buyers in Pottsville PA',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'intro1span3',
          text: ", you probably have a house that's giving you problems. Maybe you inherited it. Maybe it needs more repairs than it's worth. Maybe you're just done dealing with it.",
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
          text: "I'm Tyler Swenson, founder of ClearEdge Home Buyers. I started buying houses in 2016 with one duplex. Since then, I've helped over 200 homeowners across Eastern PA sell their properties fast for cash — including plenty in Schuylkill County.",
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
          text: "This guide covers everything you need to know about selling your Pottsville house to a cash buyer. No fluff. No sales pitch. Just the facts so you can make a smart decision.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Why Pottsville Is Different From Other Markets
    {
      _type: 'block',
      _key: 'h2market',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2marketspan',
          text: 'Why Pottsville Is Different From Other Markets',
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
          text: "Pottsville and the Coal Region aren't like selling in Allentown or the Lehigh Valley. The market here has its own rules:",
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
          text: 'Median home prices hover around $120-130K.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'market2span2',
          text: " That's significantly lower than neighboring counties. Traditional real estate commissions eat into thin margins.",
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
          text: 'Most buyers use FHA or VA loans.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'market3span2',
          text: " These government-backed loans have strict property requirements. Peeling paint? Failed. Old electrical? Failed. Foundation crack? Failed.",
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
          text: 'Old housing stock causes loan denials.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'market4span2',
          text: " Pottsville has beautiful Victorian and row homes — but many were built 100+ years ago. Banks don't like the risk.",
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
          text: 'Cash eliminates financing risk.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'market5span2',
          text: " No appraisal contingency. No loan denial at the last minute. When I make an offer, I close.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: The Hidden Costs of Selling the Traditional Way in Pottsville
    {
      _type: 'block',
      _key: 'h2costs',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2costsspan',
          text: 'The Hidden Costs of Selling the Traditional Way in Pottsville',
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
          text: "When you list with a Realtor, the costs add up fast. Here's what most people don't factor in:",
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
          text: ' 5-6% of sale price. On a $120K house, that\'s $6,000-7,200.',
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
          text: ' 2-3% for transfer taxes, title insurance, etc. Another $2,400-3,600.',
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
          text: 'Repairs to pass inspection:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'costs4span2',
          text: ' Could be $5,000-20,000+ depending on condition.',
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
          text: 'Holding costs while waiting:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'costs5span2',
          text: ' Mortgage, taxes, insurance, utilities. Figure $800-1,500/month for 3-6 months.',
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
          text: ' Cleaning, decluttering, minor updates. Time and money.',
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
          text: "Add it up on a $120K Pottsville house: you might net $85-95K after everything. And that's if nothing goes wrong with financing.",
          marks: []
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
          text: 'A cash offer of $90-100K with zero fees and closing in 2 weeks often puts more money in your pocket — guaranteed.',
          marks: ['strong']
        }
      ],
      markDefs: []
    },

    // H2: How Cash Home Buyers in Pottsville PA Work
    {
      _type: 'block',
      _key: 'h2how',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2howspan',
          text: 'How Cash Home Buyers in Pottsville PA Work',
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
          text: "Here's exactly how the process works when you sell to a legitimate cash buyer like ClearEdge:",
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
          text: 'Step 1: You contact us.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step1span2',
          text: ' Call (570) 904-2059 or fill out our form. Tell us about your property. Takes 2 minutes.',
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
          text: ' We pull comps, check tax records, and estimate repairs. This happens within 24 hours.',
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
          text: 'Step 3: We make an offer.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step3span2',
          text: " Fair, written, no obligation. I'll explain exactly how I calculated it.",
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
          text: 'Step 4: You decide.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step4span2',
          text: ' Take your time. Think it over. Get other offers. No pressure.',
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
          text: 'Step 5: Pick your closing date.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step5span2',
          text: ' 7 days? 30 days? 60 days? Your call.',
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
          text: 'Step 6: We handle everything.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step6span2',
          text: ' Title work, paperwork, coordination with your mortgage company if needed.',
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
          text: 'Step 7: You get paid.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step7span2',
          text: ' Cash wired to your account or check at closing. Walk away free and clear.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: What We Pay for Houses in Pottsville
    {
      _type: 'block',
      _key: 'h2pay',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2payspan',
          text: 'What We Pay for Houses in Pottsville',
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
          text: "I'll be straight with you: cash buyers pay less than retail. We have to — we're taking on all the risk, handling repairs, and tying up our capital.",
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
          _key: 'pay2span',
          text: 'The typical formula is 70-85% of after-repair value (ARV) minus repair costs.',
          marks: ['strong']
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
          _key: 'pay3span1',
          text: 'Example:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'pay3span2',
          text: ' A Pottsville row home that would sell for $130K fixed up, needing $25K in work.',
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
          text: 'ARV: $130,000. At 75%: $97,500. Minus $25K repairs: $72,500 offer.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'pay5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pay5span',
          text: 'Sounds low? Let\'s compare to traditional:',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'pay6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pay6span1',
          text: 'Traditional sale:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'pay6span2',
          text: ' $130K sale - $25K repairs - $7,800 commission - $3,000 closing costs - $4,500 holding costs (3 months) = $89,700 net',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'pay7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pay7span1',
          text: 'Cash sale:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'pay7span2',
          text: ' $72,500 - $0 fees - $0 repairs - $0 closing costs = $72,500 net in 2 weeks',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'pay8',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pay8span',
          text: "You net more with traditional — if everything goes perfectly and you have the time and money to wait. Many sellers don't.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Schuylkill County Areas We Buy In
    {
      _type: 'block',
      _key: 'h2areas',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2areasspan',
          text: 'Schuylkill County Areas We Buy In',
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
          text: "We buy houses throughout Schuylkill County. Here's what we see in different areas:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'areas2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'areas2span1',
          text: 'Pottsville:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'areas2span2',
          text: ' The county seat. Mix of Victorian homes, row houses, and rentals. Values range from $50K for a fixer to $200K+ for updated single-families.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'areas3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'areas3span1',
          text: 'Minersville:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'areas3span2',
          text: ' Classic coal town with affordable housing. Lots of inherited properties from families who moved away. Great for investors.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'areas4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'areas4span1',
          text: 'Tamaqua:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'areas4span2',
          text: ' Eastern edge of the county, closer to Carbon County. Slightly higher values. Historic downtown area.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'areas5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'areas5span1',
          text: 'Shenandoah:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'areas5span2',
          text: ' Lower price point but strong rental demand. Lots of row homes. Good for landlords exiting the market.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'areas6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'areas6span1',
          text: 'Ashland:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'areas6span2',
          text: ' Small town feel. Pioneer Tunnel area. Mix of single-family and row homes.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'areas7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'areas7span1',
          text: 'Pine Grove, Schuylkill Haven, Orwigsburg:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'areas7span2',
          text: ' Southern part of the county. Generally higher values, more suburban feel. Closer to I-78.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'areas8',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'areas8span1',
          text: 'Frackville, Girardville, Mahanoy City, St. Clair:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'areas8span2',
          text: ' Smaller communities throughout the county. Each has its own market dynamics, but we buy everywhere.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Coal Region Challenges That Make Cash Sales Smart
    {
      _type: 'block',
      _key: 'h2coal',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2coalspan',
          text: 'Coal Region Challenges That Make Cash Sales Smart',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'coal1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'coal1span',
          text: 'Schuylkill County has unique challenges that make traditional sales difficult:',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'coal2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'coal2span1',
          text: 'Old housing stock:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'coal2span2',
          text: ' Many homes are 80-120 years old. That means potential lead paint, asbestos siding, knob and tube wiring. Banks hate lending on these.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'coal3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'coal3span1',
          text: 'Foundation issues:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'coal3span2',
          text: ' Hillside construction and old stone foundations crack. Fixing foundations costs $10K-30K. Most buyers walk.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'coal4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'coal4span1',
          text: 'Mine subsidence concerns:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'coal4span2',
          text: " It's the Coal Region. Underground mines can cause settling. Specialized insurance and inspections add cost and complexity.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'coal5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'coal5span1',
          text: 'Strict city inspections:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'coal5span2',
          text: ' Pottsville and other boroughs require occupancy inspections. Failed inspection = no sale until fixed.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'coal6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'coal6span',
          text: "Cash buyers like me don't care about these issues. We're buying to fix and hold or flip. Your problems become my projects.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Situations Where Cash Buyers Make Sense in Pottsville
    {
      _type: 'block',
      _key: 'h2sit',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2sitspan',
          text: 'Situations Where Cash Buyers Make Sense in Pottsville',
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
          text: 'Inherited property:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit1span2',
          text: " You're managing an estate from out of state. The house is full of 50 years of stuff. You just want to close and move on. Learn more about ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'sit1span3',
          text: 'selling inherited property',
          marks: ['inheritedLink']
        },
        {
          _type: 'span',
          _key: 'sit1span4',
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
    {
      _type: 'block',
      _key: 'sit2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'sit2span1',
          text: 'Tired landlord:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit2span2',
          text: " Non-paying tenants. Constant repairs. Not worth it anymore. We buy with tenants in place — you don't need to evict first.",
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
          text: 'Pre-foreclosure:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit3span2',
          text: " Behind on payments? We can close before the sheriff sale, protect your credit, and get you cash to start fresh. See our guide on ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'sit3span3',
          text: 'avoiding foreclosure',
          marks: ['foreclosureLink']
        },
        {
          _type: 'span',
          _key: 'sit3span4',
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
      _key: 'sit4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'sit4span1',
          text: 'As-is nightmare:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit4span2',
          text: " Fire damage, mold, foundation problems, hoarder situation. No traditional buyer will touch it. We will.",
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
          text: 'Divorce:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit5span2',
          text: ' Need to split assets quickly and move on. A fast cash sale means closure for everyone. Read about ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'sit5span3',
          text: 'selling during divorce',
          marks: ['divorceLink']
        },
        {
          _type: 'span',
          _key: 'sit5span4',
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
    {
      _type: 'block',
      _key: 'sit6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'sit6span1',
          text: 'Job relocation:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit6span2',
          text: " The new job starts in 3 weeks. You can't wait 3 months for a traditional sale.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Real Story: Minersville Inherited Property
    {
      _type: 'block',
      _key: 'h2story',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2storyspan',
          text: 'Real Story: Minersville Inherited Property',
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
          text: "Tom inherited his aunt's house in Minersville last year. He lives in New Jersey and had been driving up every weekend to deal with it. The house had been vacant for 2 years — a pipe burst, there was water damage throughout, and mold was starting.",
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
          text: 'An agent told him to fix it up first — at least $20K in work before it could pass inspection. He didn\'t have the time or money.',
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
          text: "We offered $62,000 cash, as-is. We handled everything. Tom closed in 12 days, got his weekends back, and moved on with his life.",
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
          text: '"I probably could have gotten more if I fixed it up," Tom said. "But I would have spent $20K and six months doing it. The cash offer made sense for my situation."',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: How to Spot Bad Cash Buyers in Pottsville
    {
      _type: 'block',
      _key: 'h2bad',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2badspan',
          text: 'How to Spot Bad Cash Buyers in Pottsville',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bad1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'bad1span',
          text: "Not all cash buyers are created equal. Here's how to protect yourself:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bad2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'bad2span1',
          text: 'Ask for proof of funds.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'bad2span2',
          text: " Any legitimate buyer can show a bank statement or letter. If they can't, walk away.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bad3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'bad3span1',
          text: 'Watch for pressure tactics.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'bad3span2',
          text: " \"Sign today or the offer expires\" is a red flag. Legitimate buyers give you time to think.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bad4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'bad4span1',
          text: 'Beware wholesalers.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'bad4span2',
          text: " Some \"cash buyers\" are actually wholesalers who assign contracts. They're not buying — they're selling your deal to someone else. Ask if they're the actual end buyer.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bad5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'bad5span1',
          text: 'No hidden fees.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'bad5span2',
          text: ' A real cash buyer pays ALL closing costs. If someone mentions fees, processing charges, or deductions at closing, find someone else.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bad6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'bad6span1',
          text: 'Lowball artists.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'bad6span2',
          text: " Some buyers offer 50% of value hoping you're desperate. Get multiple offers. Know your property's value.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Why Work With a Local Buyer Who Knows Schuylkill County
    {
      _type: 'block',
      _key: 'h2local',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2localspan',
          text: 'Why Work With a Local Buyer Who Knows Schuylkill County',
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
          text: "Big national \"We Buy Houses\" companies don't know Pottsville from Pittsburgh. Here's why local matters:",
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
          text: 'We know the area.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'local2span2',
          text: ' I can tell you the difference between a house on Mahantongo Street and one on Howard Avenue. That knowledge means better, more accurate offers.',
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
          text: "We're accountable.",
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'local3span2',
          text: " I live and work in Eastern PA. My reputation matters. National companies disappear after closing — I'm still here.",
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
          text: 'Faster response.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'local4span2',
          text: " I can be at your property tomorrow. National call centers take days to dispatch someone — if they show up at all.",
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
          text: " Because we buy and hold locally, we can often pay more than flippers who need bigger margins. We're building long-term value, not chasing quick profits.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Pottsville vs. Traditional Sale: Quick Comparison
    {
      _type: 'block',
      _key: 'h2compare',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2comparespan',
          text: 'Pottsville vs. Traditional Sale: Quick Comparison',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'compare1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'compare1span1',
          text: 'Timeline:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'compare1span2',
          text: ' Cash sale = 7-14 days. Traditional = 60-120 days.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'compare2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'compare2span1',
          text: 'Repairs:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'compare2span2',
          text: ' Cash sale = None. Traditional = Whatever it takes to pass inspection.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'compare3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'compare3span1',
          text: 'Fees:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'compare3span2',
          text: ' Cash sale = Zero. Traditional = 5-6% commission + closing costs.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'compare4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'compare4span1',
          text: 'Certainty:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'compare4span2',
          text: ' Cash sale = Guaranteed close. Traditional = Financing can fall through.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'compare5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'compare5span1',
          text: 'Showings:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'compare5span2',
          text: ' Cash sale = Zero. Traditional = Weeks of strangers in your house.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'compare6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'compare6span1',
          text: 'Cleanout:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'compare6span2',
          text: ' Cash sale = Leave everything. Traditional = You clean it out.',
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
          text: 'Ready to Get a Cash Offer for Your Pottsville House?',
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
          text: "If you need to sell your Pottsville house fast, I'm here to help. Get started on our ",
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
          text: 'Call (570) 904-2059 or fill out our form. No pressure, no obligation. Just a fair cash offer from a local buyer who knows Schuylkill County.',
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
          text: 'When you\'re looking for ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'close4span2',
          text: 'cash home buyers in Pottsville PA',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'close4span3',
          text: ', ClearEdge Home Buyers is the local choice that makes sense.',
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

  // Fetch related situations
  console.log('\nFetching situation references...')
  const situationSlugs = ['foreclosure', 'inherited-property', 'divorce', 'tired-landlord']
  const situations = await client.fetch(
    `*[_type == "situation" && slug.current in $slugs]{ _id, title, slug }`,
    { slugs: situationSlugs }
  )
  console.log('Found situations:', situations.map(s => s.title))

  // Build the document with references
  const doc = {
    ...blogPost,
    relatedSituations: situations.map(sit => ({
      _type: 'reference',
      _ref: sit._id,
      _key: `sit-${sit.slug.current}`
    }))
  }

  console.log('\nCreating blog post...')
  const result = await client.create(doc)
  console.log('\n✅ Blog post created successfully!')
  console.log('Document ID:', result._id)
  console.log('\nView at: https://www.clearedgehomebuyers.com/blog/cash-home-buyers-pottsville-pa')
}

main().catch(console.error)
