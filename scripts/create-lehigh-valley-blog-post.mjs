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
  title: 'Sell My House Fast Lehigh Valley: Your Complete Guide to a Quick Sale',
  slug: { current: 'sell-my-house-fast-lehigh-valley' },
  metaTitle: 'Sell My House Fast Lehigh Valley | Cash Offer in 24 Hours',
  metaDescription: 'Need to sell your house fast in Lehigh Valley? Get a fair cash offer in 24 hours. We buy houses in Allentown, Bethlehem, Easton & all of Lehigh Valley. No fees, close in 7 days.',
  excerpt: "Need to sell your house fast in Lehigh Valley? Here's your complete guide — all your options, what cash buyers pay, neighborhood breakdown, and how to get the best price for your Allentown, Bethlehem, or Easton area home.",
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2026-01-07T12:00:00Z',
  category: 'locations',

  faqs: [
    {
      question: 'How fast can I sell my house in Lehigh Valley?',
      answer: 'With a cash buyer, you can close in as little as 7 days. Typical is 10-14 days. Traditional sales take 60-90+ days on average.'
    },
    {
      question: 'Do I need to make repairs before selling?',
      answer: 'Not with a cash buyer. We buy houses as-is — any condition, any situation. No repairs, no cleaning, no staging required.'
    },
    {
      question: 'What areas of Lehigh Valley do you buy in?',
      answer: 'All of it. Allentown, Bethlehem, Easton, Whitehall, Emmaus, Northampton, Catasauqua, Fountain Hill, Hellertown, Palmer Township, and everywhere in between.'
    },
    {
      question: 'How do you calculate your offer?',
      answer: "We base offers on after-repair value minus renovation costs minus our profit margin. We'll walk you through the math — no mystery."
    },
    {
      question: 'Are there any fees when selling to a cash buyer?',
      answer: 'With ClearEdge Home Buyers, there are zero fees. No commissions, no closing costs, no junk fees. Our offer is your net.'
    },
    {
      question: 'Can I sell if I\'m behind on my mortgage?',
      answer: 'Yes. We can often close before foreclosure and pay off your mortgage at closing. You keep any remaining equity.'
    },
    {
      question: 'What if I have tenants in the property?',
      answer: "We buy occupied rentals regularly. You don't need to evict first. We handle it."
    },
    {
      question: 'How do I know you\'re legitimate?',
      answer: "We've been buying houses in Eastern PA since 2016. Over 200 homes purchased. Featured in The Morning Call and Lehigh Valley Business. Ask for proof of funds and check our reviews."
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
          text: 'sell my house fast in Lehigh Valley',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'intro1span3',
          text: ", you're not alone. Whether you're in Allentown dealing with an inherited property, facing foreclosure in Bethlehem, or just tired of being a landlord in Easton — I've helped hundreds of homeowners in your exact situation.",
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
          text: "I'm Tyler Swenson, founder of ClearEdge Home Buyers. I've been buying houses in Lehigh Valley since 2016. Over 200 homes purchased across Eastern PA. Featured in The Morning Call and Lehigh Valley Business.",
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
          text: "This isn't generic advice from someone who's never been to the Valley. This is the real playbook from someone who buys houses here every week.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Why Lehigh Valley Homeowners Need to Sell Fast
    {
      _type: 'block',
      _key: 'h2why',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2whyspan',
          text: 'Why Lehigh Valley Homeowners Need to Sell Fast',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'why1span1',
          text: "Every week I talk to Lehigh Valley homeowners who need to sell quickly. The reasons vary, but the urgency is real:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'why2span1',
          text: 'Job relocation',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'why2span2',
          text: ' — The new job starts in 3 weeks. You can\'t wait 90 days for a traditional sale.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'why3span1',
          text: 'Divorce',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'why3span2',
          text: ' — Need to split assets and move on. A quick sale means closure for everyone.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'why4span1',
          text: 'Inherited property',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'why4span2',
          text: " — You're managing an estate from out of state. The house is full of stuff. You just want it handled.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'why5span1',
          text: 'Financial pressure',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'why5span2',
          text: " — Behind on payments, facing foreclosure, need cash now. We've helped dozens of families avoid foreclosure by closing fast.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'why6span1',
          text: 'House needs too much work',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'why6span2',
          text: " — Roof, foundation, major systems. You don't have $50K to dump into a property you want to leave.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'why7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'why7span1',
          text: 'Tired of being a landlord',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'why7span2',
          text: " — Bad tenants, constant maintenance, not worth the headache anymore. Cash out and be done.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Your Options to Sell a House Fast in Lehigh Valley
    {
      _type: 'block',
      _key: 'h2options',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2optionsspan',
          text: 'Your Options to Sell a House Fast in Lehigh Valley',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'options1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'options1span',
          text: "Let's be honest about your three main options:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1h3',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'opt1h3span',
          text: 'Option 1: List with a Real Estate Agent',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1detail',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt1detailspan',
          text: 'Timeline: 60-90+ days. Cost: 5-6% commission plus repairs, staging, closing costs. Good for: Nice homes in good condition where you can wait.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2h3',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'opt2h3span',
          text: 'Option 2: For Sale By Owner (FSBO)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2detail',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt2detailspan',
          text: "Timeline: 90-120+ days. Cost: Your time, marketing, buyer's agent commission. Good for: People with experience and time to spare.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3h3',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'opt3h3span',
          text: 'Option 3: Sell to a Cash Buyer',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3detail',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt3detailspan',
          text: 'Timeline: 7-21 days. Cost: Zero fees, zero commissions, zero closing costs. Good for: Anyone who needs speed, certainty, and simplicity.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'optconc',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'optconcspan',
          text: "The cash buyer option isn't for everyone. But if speed matters, it's the only real solution.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: How to Sell Your House Fast in Lehigh Valley (The Cash Buyer Route)
    {
      _type: 'block',
      _key: 'h2how',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2howspan',
          text: 'How to Sell Your House Fast in Lehigh Valley (The Cash Buyer Route)',
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
          text: "Here's exactly how it works when you sell to a legitimate cash buyer like ClearEdge:",
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
          text: ' Call (570) 904-2059 or fill out our form. Takes 2 minutes. Tell us about your property and situation.',
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
          text: 'Step 2: We evaluate.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step2span2',
          text: " We pull comps, assess the property, calculate renovation costs. Usually within 24 hours.",
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
          text: 'Step 3: Get your cash offer.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step3span2',
          text: " No obligation. No pressure. We'll explain exactly how we arrived at our number.",
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
          text: 'Step 4: Accept or decline.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step4span2',
          text: " Take your time. Think it over. Compare to other options. No hard sell.",
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
          text: " Need to close in 7 days? Done. Need 30 days to find your next place? No problem. You choose.",
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
          text: " Title work, paperwork, closing coordination. We use a local title company you can trust.",
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
          text: 'Step 7: Get paid.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'step7span2',
          text: " Wire transfer or check at closing. Walk away with cash, no strings attached.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: What Cash Buyers Pay in Lehigh Valley
    {
      _type: 'block',
      _key: 'h2pay',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2payspan',
          text: 'What Cash Buyers Pay in Lehigh Valley',
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
          text: "Let's talk numbers. Cash buyers typically pay 70-85% of after-repair value (ARV). That might sound low until you do the math.",
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
          text: 'Example: Allentown 3-bedroom',
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
          _key: 'pay3span',
          text: 'ARV (after repairs): $225,000. Repairs needed: $35,000. Traditional sale at full price: $225,000.',
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
          _key: 'pay4span1',
          text: 'Traditional sale net:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'pay4span2',
          text: ' $225,000 - $35,000 (repairs) - $13,500 (6% commission) - $5,000 (closing costs) - $3,000 (holding costs for 90 days) = $168,500',
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
          _key: 'pay5span1',
          text: 'Cash sale at 75% ARV:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'pay5span2',
          text: ' $168,750 - $0 (no repairs) - $0 (no commissions) - $0 (we pay closing) = $168,750',
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
          _key: 'pay6span',
          text: "In this example, you net more with the cash sale. Plus you close in 2 weeks instead of 3 months, and you don't have to deal with repairs, showings, or uncertainty.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Lehigh Valley Neighborhoods: What You Need to Know
    {
      _type: 'block',
      _key: 'h2hood',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2hoodspan',
          text: 'Lehigh Valley Neighborhoods: What You Need to Know',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'hood1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'hood1span',
          text: 'We buy in every neighborhood across the Valley. Here\'s what we see:',
          marks: []
        }
      ],
      markDefs: []
    },
    // Allentown
    {
      _type: 'block',
      _key: 'h3allen',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3allenspan',
          text: 'Allentown',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'allen1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'allen1span1',
          text: "The West End has the highest values — we regularly buy homes needing work here for $180K-$250K. Center City and East Side are more affordable, typically $80K-$150K range for fixer-uppers. South Allentown sees a lot of investor activity. If you're in ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'allen1span2',
          text: 'Allentown',
          marks: ['allenLink']
        },
        {
          _type: 'span',
          _key: 'allen1span3',
          text: ', we can usually have an offer to you within 24 hours.',
          marks: []
        }
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'allenLink',
          href: '/locations/allentown'
        }
      ]
    },
    // Bethlehem
    {
      _type: 'block',
      _key: 'h3beth',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3bethspan',
          text: 'Bethlehem',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'beth1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'beth1span1',
          text: 'South Side is trendy now — values have jumped. West Bethlehem and North Bethlehem offer more affordable options. Bethlehem Township tends toward newer construction. We buy in all areas of ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'beth1span2',
          text: 'Bethlehem',
          marks: ['bethLink']
        },
        {
          _type: 'span',
          _key: 'beth1span3',
          text: ', regardless of condition.',
          marks: []
        }
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'bethLink',
          href: '/locations/bethlehem'
        }
      ]
    },
    // Easton
    {
      _type: 'block',
      _key: 'h3easton',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3eastonspan',
          text: 'Easton',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'easton1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'easton1span1',
          text: "Downtown is revitalizing fast. South Side has affordable row homes. College Hill is stable. Palmer Township is the suburban option. ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'easton1span2',
          text: 'Easton',
          marks: ['eastonLink']
        },
        {
          _type: 'span',
          _key: 'easton1span3',
          text: ' has seen significant investment — great time to sell if you\'re ready.',
          marks: []
        }
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'eastonLink',
          href: '/locations/easton'
        }
      ]
    },
    // Surrounding Areas
    {
      _type: 'block',
      _key: 'h3surr',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3surrspan',
          text: 'Surrounding Areas',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'surr1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'surr1span',
          text: 'Whitehall, Emmaus, Northampton, Catasauqua, Fountain Hill, Hellertown — we buy everywhere. Smaller communities often have fewer buyers, which is why a cash offer can be especially attractive.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Situations Where Selling Fast Makes Sense
    {
      _type: 'block',
      _key: 'h2sit',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2sitspan',
          text: 'Situations Where Selling Fast Makes Sense',
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
          text: 'Inherited property',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit1span2',
          text: ' — Managing an estate is hard enough. We can close while you handle other matters. Learn more about ',
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
          text: 'Pre-foreclosure',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit2span2',
          text: ' — We can often close before the sheriff sale, protect your credit, and get you cash to start fresh. See our guide on ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'sit2span3',
          text: 'avoiding foreclosure',
          marks: ['foreclosureLink']
        },
        {
          _type: 'span',
          _key: 'sit2span4',
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
      _key: 'sit3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'sit3span1',
          text: 'Divorce',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit3span2',
          text: ' — Split the proceeds cleanly and move on. A fast sale means faster closure. Read about ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'sit3span3',
          text: 'selling during divorce',
          marks: ['divorceLink']
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
          _key: 'divorceLink',
          href: '/situations/divorce'
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
          text: 'Major repairs needed',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit4span2',
          text: " — Foundation issues? Roof problems? Mold? We buy as-is. You don't have to fix anything.",
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
          text: 'Tenant problems',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit5span2',
          text: " — Non-paying tenants? Don't want to deal with eviction? We'll buy with tenants in place.",
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
          text: 'Job relocation',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sit6span2',
          text: " — The new opportunity won't wait. We can close on your timeline so you can move forward.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Real Story: Bethlehem Inherited Property
    {
      _type: 'block',
      _key: 'h2story',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2storyspan',
          text: 'Real Story: Bethlehem Inherited Property',
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
          text: "Sarah inherited her mother's house in Bethlehem last year. The house was packed floor to ceiling — her mom had been a collector for 40 years. Sarah lives in New Jersey and couldn't manage the cleanout.",
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
          text: 'Traditional agents told her she\'d need to clean it out and make repairs — $15K minimum before listing. We offered $195,000 as-is. She accepted, and we closed in 12 days.',
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
          text: "After cleanout costs, repairs, commissions, and holding costs, she would have netted around $185K going traditional — and it would have taken 4+ months. With us, she netted more and was done in under two weeks.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Common Concerns About Selling Fast
    {
      _type: 'block',
      _key: 'h2concerns',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2concernsspan',
          text: 'Common Concerns About Selling Fast',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'concern1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'concern1span1',
          text: '"I\'m worried about getting lowballed."',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'concern1span2',
          text: " Fair concern. Get multiple offers. We're confident in our pricing because we show you exactly how we calculate it. No mystery numbers.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'concern2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'concern2span1',
          text: '"Are cash buyers scams?"',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'concern2span2',
          text: " Some are. Avoid anyone who asks for upfront fees, won't provide proof of funds, or pressures you to sign immediately. We'll give you references and close through a title company.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'concern3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'concern3span1',
          text: '"My house is in bad shape."',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'concern3span2',
          text: " That's our specialty. Fire damage, foundation issues, hoarder situations, code violations — we've seen it all and bought it all.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'concern4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'concern4span1',
          text: '"I don\'t want to clean it out."',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'concern4span2',
          text: " Don't. Leave everything. We'll handle the cleanout after closing.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'concern5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'concern5span1',
          text: '"I still owe on my mortgage."',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'concern5span2',
          text: " No problem. We work with your lender and pay off the mortgage at closing. You get any remaining equity.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: How to Get the Best Price When Selling Fast
    {
      _type: 'block',
      _key: 'h2best',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2bestspan',
          text: 'How to Get the Best Price When Selling Fast',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'best1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'best1span1',
          text: 'Get multiple offers.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'best1span2',
          text: " Talk to at least 2-3 cash buyers. Compare offers. We're happy to compete.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'best2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'best2span1',
          text: 'Be honest about condition.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'best2span2',
          text: " The more accurate your description, the more accurate our initial offer. No surprises means no renegotiation.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'best3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'best3span1',
          text: 'Have your paperwork ready.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'best3span2',
          text: " Mortgage statement, tax bills, any repair estimates. The more information, the faster we can close.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'best4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'best4span1',
          text: 'Know your bottom line.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'best4span2',
          text: " What do you actually need to walk away with? Know that number before you start.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'best5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'best5span1',
          text: 'Be flexible on timing.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'best5span2',
          text: " Sometimes a slightly longer close (21-30 days) can mean a higher offer. Ask about it.",
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
          text: 'Ready to Sell Your Lehigh Valley House Fast?',
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
          text: "If you need to sell quickly, we're here to help. Get started on our ",
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
          text: 'Call (570) 904-2059 or fill out our form for a no-obligation cash offer. We respond fast — usually within a few hours.',
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
          text: 'When you\'re ready to ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'close4span2',
          text: 'sell my house fast in Lehigh Valley',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'close4span3',
          text: ', ClearEdge Home Buyers is here to make it simple.',
          marks: []
        }
      ],
      markDefs: []
    },

    // Related Reading section with cross-link
    {
      _type: 'block',
      _key: 'related1',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'related1span',
          text: 'Related Reading',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'related2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'related2span1',
          text: 'For more detailed information about selling in Allentown specifically, check out our guide: ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'related2span2',
          text: 'Sell My House Fast Allentown: The No-BS Guide From a Local Cash Buyer',
          marks: ['allentownBlogLink']
        },
        {
          _type: 'span',
          _key: 'related2span3',
          text: '.',
          marks: []
        }
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'allentownBlogLink',
          href: '/blog/sell-my-house-fast-allentown'
        }
      ]
    }
  ]
}

async function main() {
  console.log('Starting blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

  // Fetch related locations
  console.log('\nFetching location references...')
  const locationSlugs = ['allentown', 'bethlehem', 'easton', 'whitehall', 'emmaus', 'northampton']
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
    relatedLocations: locations.map(loc => ({
      _type: 'reference',
      _ref: loc._id,
      _key: `loc-${loc.slug.current}`
    })),
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
  console.log('\nView at: https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-lehigh-valley')
}

main().catch(console.error)
