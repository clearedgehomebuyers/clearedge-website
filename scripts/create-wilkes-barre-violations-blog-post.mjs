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
  title: 'How to Sell a House in Wilkes-Barre With Code Violations (Without Losing Your Mind)',
  slug: { current: 'sell-house-wilkes-barre-code-violations' },
  metaTitle: 'Sell House Wilkes-Barre Code Violations | We Buy Houses With Violations',
  metaDescription: 'Need to sell a house in Wilkes-Barre with code violations? Learn your options and how to sell fast without fixing violations. Cash offers available, close in 7-14 days.',
  excerpt: "If you're trying to sell a house in Wilkes-Barre with code violations, here's the complete guide — what counts as a violation, why traditional sales fail, your real options, and how to sell fast without fixing everything first.",
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2025-09-15T10:00:00Z',
  category: 'situations',

  faqs: [
    {
      question: 'Can I sell my house in Wilkes-Barre if it has open code violations?',
      answer: "Yes. You can sell to a cash buyer without fixing violations. Traditional sales are much harder because most financing (FHA, VA, many conventional loans) requires the property to be code-compliant."
    },
    {
      question: 'Will I be fined if I sell a house with violations?',
      answer: "Outstanding fines typically need to be addressed at closing. They can be paid from sale proceeds, negotiated with the city, or in some cases assumed by the buyer. The key is addressing them — they don't just disappear."
    },
    {
      question: 'Do I have to disclose code violations to buyers?',
      answer: 'Yes. Pennsylvania law requires sellers to disclose known material defects, including code violations. Failure to disclose can result in legal liability after the sale.'
    },
    {
      question: "How much do code violations reduce my home's value?",
      answer: 'It depends entirely on the violations. Minor issues (missing smoke detectors, cosmetic items) have minimal impact. Major issues (electrical rewiring, foundation repair, structural problems) can reduce value by $20,000-$60,000 or more.'
    },
    {
      question: 'Can I sell my house if the city is threatening to condemn it?',
      answer: "Yes, but timing matters. Once a property is formally condemned, options become very limited. If you're receiving warnings, act quickly. Cash buyers can often close before condemnation proceedings are finalized."
    },
    {
      question: 'What happens to the violations after I sell?',
      answer: 'They transfer to the new owner. Cash buyers accept this responsibility as part of the purchase. This is one reason cash buyers are often the only realistic option for properties with significant violations.'
    },
    {
      question: 'How fast can you close on a house with violations?',
      answer: 'Typically 7-14 days. Some situations take longer if there are title issues or unusual circumstances, but we move as fast as the title company can clear the paperwork.'
    },
    {
      question: 'Do you buy houses with rental license violations?',
      answer: 'Yes. We regularly purchase properties with expired rental licenses, failed inspections, and related violations. These are actually easier to resolve than major structural issues.'
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
          text: "If you're trying to ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'intro1span2',
          text: 'sell a house in Wilkes-Barre with code violations',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'intro1span3',
          text: ", you're probably stressed. Maybe you got a notice from the city. Maybe you failed a rental inspection. Maybe you inherited a property that's been neglected for years and now the violations are stacking up.",
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
          text: "I'm Tyler Swenson, founder of ClearEdge Home Buyers. I've been buying houses across Eastern Pennsylvania since 2016 — including plenty with active code violations, open permits, and every other headache you can imagine. I've dealt with Wilkes-Barre's Code Enforcement office more times than I can count.",
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
          text: "This guide covers everything you need to know about selling a house with code violations in ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'intro3span2',
          text: 'Wilkes-Barre',
          marks: ['wbLink']
        },
        {
          _type: 'span',
          _key: 'intro3span3',
          text: ": what counts as a violation, why traditional sales fail, your real options, and how to get out from under a problem property without losing your shirt.",
          marks: []
        }
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'wbLink',
          href: '/locations/wilkes-barre'
        }
      ]
    },

    // H2: What Counts as a Code Violation in Wilkes-Barre?
    {
      _type: 'block',
      _key: 'h2what',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2whatspan',
          text: 'What Counts as a Code Violation in Wilkes-Barre?',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'what1span',
          text: 'First, let\'s clarify what we\'re talking about. In Wilkes-Barre, "code violations" fall into two main categories:',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3building',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3buildingspan',
          text: 'Building Codes (PA Uniform Construction Code)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'building1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'building1span',
          text: 'These are state-mandated standards for construction, electrical, plumbing, and structural safety. Violations include:',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'building2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'building2span',
          text: '• Electrical issues (outdated wiring, undersized panels, improper installations)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'building3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'building3span',
          text: '• Plumbing problems (improper venting, lead pipes, water heater issues)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'building4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'building4span',
          text: '• Structural deficiencies (foundation problems, load-bearing wall modifications)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'building5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'building5span',
          text: '• Unpermitted work (additions, conversions, major renovations done without permits)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'building6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'building6span',
          text: '• Fire safety issues (missing smoke detectors, egress window problems, inadequate exits)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3quality',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3qualityspan',
          text: 'Quality of Life / Property Maintenance Codes',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'quality1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'quality1span',
          text: "These are local ordinances enforced by Wilkes-Barre's Code Enforcement office at 40 East Market Street. They cover:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'quality2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'quality2span',
          text: '• Overgrown grass and weeds (must be under 10 inches)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'quality3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'quality3span',
          text: '• Garbage and debris accumulation',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'quality4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'quality4span',
          text: '• Outdoor furniture storage (couches on porches, etc.)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'quality5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'quality5span',
          text: '• Dilapidated or inoperable vehicles',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'quality6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'quality6span',
          text: '• Exterior deterioration (peeling paint, broken windows, damaged siding)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'what2span1',
          text: 'Important:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'what2span2',
          text: " Wilkes-Barre has become increasingly aggressive about code enforcement in recent years. Mayor Brown's administration has conducted regular \"neighborhood sweeps\" — and fines can range from $300 to $1,000 per violation, per day in some cases.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Common Code Violations in Wilkes-Barre Homes
    {
      _type: 'block',
      _key: 'h2common',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2commonspan',
          text: 'Common Code Violations in Wilkes-Barre Homes',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'common1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'common1span',
          text: "Based on hundreds of houses I've looked at in the area, here are the violations I see most often:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3elec',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3elecspan',
          text: 'Electrical Issues',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'elec1span1',
          text: '• Knob and tube wiring',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'elec1span2',
          text: ' — Many Wilkes-Barre homes are 80-100+ years old. Original electrical systems are a major issue. Full rewiring costs $8,000-15,000+.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'elec2span1',
          text: '• Aluminum wiring',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'elec2span2',
          text: ' — Common in 1960s-70s construction. Fire hazard. Remediation runs $3,000-8,000.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'elec3span1',
          text: '• Undersized electrical panels',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'elec3span2',
          text: ' — 60-amp or 100-amp service in a house that needs 200 amps. Panel upgrade costs $1,500-3,000.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'elec4span1',
          text: '• Ungrounded outlets',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'elec4span2',
          text: ' — Two-prong outlets throughout the house. Grounding or GFCI protection needed.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'elec5span1',
          text: '• Unpermitted electrical work',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'elec5span2',
          text: ' — DIY additions, finished basements, converted attics with no permits pulled.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3plumb',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3plumbspan',
          text: 'Plumbing Issues',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'plumb1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'plumb1span1',
          text: '• Galvanized pipes',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'plumb1span2',
          text: ' — Corroded, restricted flow, rusty water. Full replacement costs $4,000-10,000.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'plumb2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'plumb2span1',
          text: '• Lead service lines',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'plumb2span2',
          text: ' — Connection from street to house. Wilkes-Barre has many. Replacement costs $3,000-6,000.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'plumb3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'plumb3span1',
          text: '• Improper drain venting',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'plumb3span2',
          text: ' — Causes slow drains, sewer gas, health hazards.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'plumb4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'plumb4span1',
          text: '• Water heater violations',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'plumb4span2',
          text: ' — Missing expansion tanks, improper venting on gas units, no drip pans.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3struct',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3structspan',
          text: 'Structural Issues',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'struct1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'struct1span1',
          text: '• Foundation cracks and settlement',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'struct1span2',
          text: ' — Common in older homes built on mine-affected land. Repairs range from $5,000 for minor work to $30,000+ for major stabilization.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'struct2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'struct2span1',
          text: '• Load-bearing wall modifications',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'struct2span2',
          text: ' — Previous owners removed walls without proper headers or support.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'struct3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'struct3span1',
          text: '• Roof damage',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'struct3span2',
          text: ' — Missing shingles, active leaks, damaged decking. New roof costs $8,000-15,000.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'struct4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'struct4span1',
          text: '• Porch and deck problems',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'struct4span2',
          text: ' — Rotted joists, missing railings, structural failure. Very common in Wilkes-Barre row homes.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3rental',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3rentalspan',
          text: 'Rental License Violations',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'rental1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'rental1span',
          text: 'If you have rental property in Wilkes-Barre, you need:',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'rental2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'rental2span1',
          text: '• Rental license',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'rental2span2',
          text: ' — $50 per building, renewed annually',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'rental3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'rental3span1',
          text: '• Inspection compliance',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'rental3span2',
          text: ' — $100 per unit, required every 2 years',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'rental4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'rental4span',
          text: "Operating without a valid license or with failed inspections creates violations that make selling through traditional channels nearly impossible. Landlords dealing with these issues often become ",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Why Code Violations Make Traditional Sales Nearly Impossible
    {
      _type: 'block',
      _key: 'h2why',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2whyspan',
          text: 'Why Code Violations Make Traditional Sales Nearly Impossible',
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
          _key: 'why1span',
          text: "Here's the problem: most buyers can't get a loan on a house with code violations.",
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
          text: 'FHA and VA loans require the property to be "safe, sound, and sanitary."',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'why2span2',
          text: ' Active code violations — especially electrical, plumbing, or structural — disqualify the property. These loans account for a huge percentage of Wilkes-Barre buyers.',
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
          text: 'Conventional lenders get nervous too.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'why3span2',
          text: " Even if a buyer qualifies for conventional financing, the lender's appraisal will flag violations. Most won't lend on a property with active violations until they're resolved.",
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
          text: 'Home inspections create chaos.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'why4span2',
          text: " Even if you find a buyer, the inspection will uncover everything. Buyers negotiate aggressively or walk away. Deals fall apart constantly.",
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
          text: 'Disclosure requirements create liability.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'why5span2',
          text: " Pennsylvania requires you to disclose known defects. If you don't disclose violations and they're discovered later, you face potential lawsuits.",
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
          text: 'Timeline drags on forever.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'why6span2',
          text: " Traditional sales take 60-90 days minimum in perfect conditions. With violations, you might list for 6-12 months without a viable buyer — all while fines accumulate.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Your Real Options for Selling a House With Code Violations
    {
      _type: 'block',
      _key: 'h2options',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2optionsspan',
          text: 'Your Real Options for Selling a House With Code Violations',
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
          text: "Let's be honest about your four options:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3opt1',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3opt1span',
          text: 'Option 1: Fix Everything First',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1a',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt1aspan1',
          text: 'Pros:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'opt1aspan2',
          text: ' Maximizes sale price. Opens property to all buyers.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1b',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt1bspan1',
          text: 'Cons:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'opt1bspan2',
          text: ' Expensive. Time-consuming (permits take weeks/months). Risky if you uncover more issues. Requires upfront capital you may not have.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1c',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt1cspan1',
          text: 'Best for:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'opt1cspan2',
          text: ' Minor violations on otherwise valuable properties where you have time and money.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3opt2',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3opt2span',
          text: 'Option 2: List As-Is and Hope',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2a',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt2aspan1',
          text: 'Pros:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'opt2aspan2',
          text: ' No upfront cost.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2b',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt2bspan1',
          text: 'Cons:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'opt2bspan2',
          text: ' Very limited buyer pool (cash buyers only). Long time on market. You still pay commissions. Fines continue accumulating.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2c',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt2cspan1',
          text: 'Best for:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'opt2cspan2',
          text: " Honestly? Almost nobody. If you're going to sell to a cash buyer anyway, why pay agent commissions?",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3opt3',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3opt3span',
          text: 'Option 3: Negotiate With the City',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3a',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt3aspan1',
          text: 'Pros:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'opt3aspan2',
          text: ' May buy you time. Sometimes fines can be reduced or payment plans established.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3b',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt3bspan1',
          text: 'Cons:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'opt3bspan2',
          text: " Doesn't solve the underlying problem. Violations remain. Eventually, you still have to fix or sell.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3c',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt3cspan1',
          text: 'Best for:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'opt3cspan2',
          text: ' Buying time while you arrange a sale or gather resources.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3opt4',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3opt4span',
          text: 'Option 4: Sell to a Cash Buyer',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4a',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt4aspan1',
          text: 'Pros:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'opt4aspan2',
          text: ' No repairs needed. Fast close (7-14 days). Certainty — no deals falling through. Violations become our problem.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4b',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt4bspan1',
          text: 'Cons:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'opt4bspan2',
          text: " You'll sell below retail value. Cash buyers need margin for repairs and profit.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4c',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'opt4cspan1',
          text: 'Best for:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'opt4cspan2',
          text: " Properties with significant violations, owners without capital for repairs, situations where time matters, anyone who just wants out.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: The Real Math: Cash Sale vs. Traditional Sale With Violations
    {
      _type: 'block',
      _key: 'h2math',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2mathspan',
          text: 'The Real Math: Cash Sale vs. Traditional Sale With Violations',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math1span',
          text: "Let's run the numbers on a typical Wilkes-Barre property with code violations:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math2span1',
          text: 'Example property:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'math2span2',
          text: ' 3-bedroom row home, after-repair value of $145,000. Needs electrical panel upgrade, some plumbing work, roof repairs, and exterior work to clear violations. Estimated repair cost: $28,000. Outstanding fines: $1,800.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math3span1',
          text: 'Traditional sale (if you fix everything):',
          marks: ['strong']
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math4span',
          text: '• Sale price: $145,000',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math5span',
          text: '• Minus repairs: -$28,000',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math6span',
          text: '• Minus agent commission (6%): -$8,700',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math7span',
          text: '• Minus closing costs: -$3,500',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math8',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math8span',
          text: '• Minus holding costs (7 months for repairs + sale): -$7,000',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math9',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math9span',
          text: '• Minus fines: -$1,800',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math10',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math10span1',
          text: '• Net to seller: $96,000',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'math10span2',
          text: ' (after 7+ months)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math11',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math11span1',
          text: 'Cash sale to ClearEdge:',
          marks: ['strong']
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math12',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math12span',
          text: '• Cash offer: $103,850 (calculated as 75% of ARV minus repair estimate minus fines)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math13',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math13span',
          text: '• Minus repairs: $0 (we handle)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math14',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math14span',
          text: '• Minus commissions: $0',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math15',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math15span',
          text: '• Minus closing costs: $0 (we pay)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math16',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math16span',
          text: '• Minus fines: -$1,800 (paid at closing from proceeds)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math17',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math17span1',
          text: '• Net to seller: $102,050',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'math17span2',
          text: ' (in 2 weeks)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math18',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math18span1',
          text: 'In this example, the cash sale nets you $6,050 MORE',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'math18span2',
          text: ' — and saves you 7+ months of headaches, contractors, permits, and uncertainty.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'math19',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'math19span',
          text: "For more information about selling in the Wilkes-Barre area, check out our complete ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'math19span2',
          text: 'Luzerne County selling guide',
          marks: ['luzerneLink']
        },
        {
          _type: 'span',
          _key: 'math19span3',
          text: '.',
          marks: []
        }
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'luzerneLink',
          href: '/blog/sell-my-house-fast-luzerne-county-pa'
        }
      ]
    },

    // H2: What We Look At When Buying Houses With Code Violations
    {
      _type: 'block',
      _key: 'h2look',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2lookspan',
          text: 'What We Look At When Buying Houses With Code Violations',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'look1span',
          text: "When we evaluate a property with violations, here's what matters:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'look2span1',
          text: 'Actual repair costs.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'look2span2',
          text: ' We have contractors we work with regularly. Our cost to fix is usually 30-40% less than what a homeowner would pay. This lets us offer more.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'look3span1',
          text: 'After-repair value.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'look3span2',
          text: " What will this property be worth once it's code-compliant and updated? We know the Wilkes-Barre market intimately.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'look4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'look4span1',
          text: 'Real risk assessment.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'look4span2',
          text: " Some violations look scary but are straightforward to fix. Others seem minor but can snowball. We know the difference.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Types of Violations We Buy Around
    {
      _type: 'block',
      _key: 'h2types',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2typesspan',
          text: 'Types of Violations We Buy Around',
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
          text: "We've bought properties with virtually every type of violation. Here's what we handle routinely:",
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
          _key: 'types2span',
          text: '• Electrical system violations (knob and tube, aluminum wiring, panel issues, unpermitted work)',
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
          _key: 'types3span',
          text: '• Plumbing violations (galvanized pipes, lead lines, improper venting)',
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
          _key: 'types4span',
          text: '• Unpermitted additions (converted attics, finished basements, added rooms)',
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
          _key: 'types5span',
          text: '• Missing certificates of occupancy',
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
          _key: 'types6span',
          text: '• Open building permits (work started but never inspected/closed)',
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
          _key: 'types7span',
          text: '• Rental license violations',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'types8',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'types8span',
          text: '• Foundation issues',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'types9',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'types9span',
          text: '• Roof violations',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'types10',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'types10span',
          text: '• Fire damage / water damage with resulting code issues',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'types11',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'types11span1',
          text: 'What makes deals harder',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'types11span2',
          text: ' (but not impossible): environmental contamination (underground tanks, asbestos requiring professional abatement), severe structural failure requiring engineering, properties already scheduled for demolition, and complex title issues combined with violations.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Real Story: Parsons Section Property With 11 Open Violations
    {
      _type: 'block',
      _key: 'h2story',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2storyspan',
          text: 'Real Story: Parsons Section Property With 11 Open Violations',
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
          text: "Rich owned a duplex in the Parsons section of Wilkes-Barre. He'd been a landlord for 15 years, but the property had become a nightmare. Tenants trashed the first floor unit. The second floor had been vacant for a year.",
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
          text: "When the city came through on a neighborhood sweep, they hit him with 11 violations. Electrical issues, plumbing, exterior maintenance, failed rental inspection on both units. Fines totaled over $4,000 and climbing.",
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
          text: "Rich was 68. He didn't have the capital to fix everything, and contractors were quoting him $45,000+ for full compliance. The city was threatening to take him to court.",
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
          text: 'We offered $62,000 cash, as-is. We paid off all outstanding fines at closing. Rich walked away with a check and no more headaches.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'story5span',
          text: '"I probably owned that property too long," Rich told me at closing. "But at least it\'s over now. I can actually enjoy retirement."',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'story6span',
          text: 'We closed in 11 days.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Red Flags: How to Avoid Getting Ripped Off
    {
      _type: 'block',
      _key: 'h2red',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2redspan',
          text: 'Red Flags: How to Avoid Getting Ripped Off',
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
          text: "When you're selling a property with violations, you're in a vulnerable position. Some buyers try to take advantage. Watch for:",
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
          text: " Any legitimate cash buyer can show a bank statement or letter proving they have the money. If they can't or won't, walk away.",
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
          text: 'Pressure to sign immediately.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'red3span2',
          text: " \"This offer expires at midnight\" tactics are manipulation. Legitimate buyers give you time to think and compare options.",
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
          text: 'Wholesalers, not buyers.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'red4span2',
          text: " Some people just want to get your property under contract, then sell that contract to someone else. Ask directly: \"Are you the actual buyer, or are you wholesaling this deal?\"",
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
          text: 'Fees appearing at closing.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'red5span2',
          text: ' A real cash buyer pays ALL closing costs. If someone mentions processing fees, service charges, or mysterious deductions at the last minute, something is wrong.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'red6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'red6span1',
          text: 'Drastically low offers.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'red6span2',
          text: " Some buyers prey on desperate sellers by offering 40-50% of value. Get multiple offers. Know your property's worth even with violations.",
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Why Local Matters When You Have Code Violations
    {
      _type: 'block',
      _key: 'h2local',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2localspan',
          text: 'Why Local Matters When You Have Code Violations',
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
          text: "When you're dealing with Wilkes-Barre code violations, working with a local buyer makes a real difference:",
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
          text: 'We know the players.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'local2span2',
          text: " I've worked with Wilkes-Barre Code Enforcement many times. I know how the process works, what they're looking for, and how to navigate the system.",
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
          text: " I live and work in Eastern PA. My reputation matters. National \"We Buy Houses\" companies disappear after closing. I'm still here.",
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
          text: 'We close what we commit to.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'local4span2',
          text: " Some buyers use inspection contingencies to renegotiate after you're committed. We know what we're buying and honor our offers.",
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
          text: 'We pay more.',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'local5span2',
          text: " Because we buy and renovate locally, our costs are lower. Less overhead means better offers for you.",
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
          text: 'Ready to Sell Your Wilkes-Barre House With Code Violations?',
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
          text: "If you're dealing with code violations and want out, I can help. Get started on our ",
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
          text: "Call (570) 904-2059 or fill out our form. I'll give you an honest assessment of your situation and a fair offer — no pressure, no games.",
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
          text: 'sell a house in Wilkes-Barre with code violations',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'close4span3',
          text: ', ClearEdge Home Buyers has the experience to make it happen.',
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

  // Fetch related locations
  console.log('\nFetching location references...')
  const locationSlugs = ['wilkes-barre', 'hazleton', 'pittston', 'kingston']
  const locations = await client.fetch(
    `*[_type == "location" && slug.current in $slugs]{ _id, city, slug }`,
    { slugs: locationSlugs }
  )
  console.log('Found locations:', locations.map(l => l.city))

  // Fetch related situations
  console.log('\nFetching situation references...')
  const situationSlugs = ['foreclosure', 'inherited-property', 'tired-landlord']
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
  console.log('\nView at: https://www.clearedgehomebuyers.com/blog/sell-house-wilkes-barre-code-violations')
}

main().catch(console.error)
