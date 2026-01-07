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
  title: 'Hazleton Residential Occupancy Inspection Checklist: Pass Your Inspection the First Time',
  slug: { current: 'hazleton-residential-occupancy-inspection-checklist' },
  metaTitle: 'Hazleton Residential Occupancy Inspection Checklist | Complete Guide',
  metaDescription: 'Complete Hazleton residential occupancy inspection checklist. Know exactly what inspectors check: smoke detectors, railings, electrical, windows & more. Pass the first time.',
  excerpt: "Looking for the Hazleton residential occupancy inspection checklist? Here's exactly what Code Enforcement checks — smoke detectors, guardrails, electrical, windows, plumbing — plus fees, timelines, and how to pass the first time.",
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2025-08-20T10:00:00Z',
  category: 'guides',

  faqs: [
    {
      question: 'How long does it take to schedule a Hazleton occupancy inspection?',
      answer: "Currently, inspections are taking approximately 30 business days to schedule due to staffing. Plan ahead. If you schedule with less than 15 days notice, you'll pay double ($150 vs $75)."
    },
    {
      question: 'Can I get an occupancy inspection before I have a buyer?',
      answer: "Yes. Despite what some people think, you can request an inspection proactively before listing or selling. This is actually smart — it lets you fix issues before they become deal-breakers."
    },
    {
      question: "What happens if I miss the 30-day deadline after buying a property?",
      answer: "You can face fines from the city. If you're close to the deadline and haven't been able to schedule an inspection yet, contact Code Enforcement and explain the situation. Document your attempts to schedule."
    },
    {
      question: 'Do I need occupancy for a property I\'m inheriting?',
      answer: 'Yes. Any change of ownership requires a new Certificate of Use and Occupancy, including inherited properties. You have 30 days from when the estate transfers the property.'
    },
    {
      question: 'What if my property fails inspection?',
      answer: "You'll receive a written notice of violations. Fix everything noted, then schedule a reinspection. You'll pay an additional inspection fee. Make sure ALL violations are corrected — partial fixes mean another fail."
    },
    {
      question: "Are there any exemptions from Hazleton's occupancy inspection?",
      answer: 'The inspection requirement applies to all residential properties changing ownership or tenancy within city limits. There are no standard exemptions for owner-occupied homes.'
    },
    {
      question: "Can I do a temporary occupancy if I'm still making repairs?",
      answer: 'Yes, the Code Enforcement Officer can issue a temporary certificate if a portion of the building can be safely occupied while work continues. This is evaluated case-by-case.'
    },
    {
      question: "What's the difference between Hazleton City and Hazle Township requirements?",
      answer: "Hazle Township has separate requirements. This checklist is specifically for properties within Hazleton City limits. If you're in the township, contact their Zoning Officer at (570) 455-2030."
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
          text: "If you're looking for the ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'intro1span2',
          text: 'Hazleton residential occupancy inspection checklist',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'intro1span3',
          text: ", you're probably stressed. Maybe you just bought a house. Maybe you're trying to sell one. Or maybe you inherited a property and just found out you have 30 days to get this done.",
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
          text: "I'm Tyler Swenson, founder of ClearEdge Home Buyers. Since 2016, I've bought and sold dozens of properties in ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'intro2span2',
          text: 'Hazleton',
          marks: ['hazletonLink']
        },
        {
          _type: 'span',
          _key: 'intro2span3',
          text: ". I've been through this process more times than I can count — and I've seen deals fall apart because of inspection failures.",
          marks: []
        }
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'hazletonLink',
          href: '/locations/hazleton'
        }
      ]
    },
    {
      _type: 'block',
      _key: 'intro3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'intro3span1',
          text: "Here's what you need to know: ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'intro3span2',
          text: "Hazleton's occupancy inspection is one of the toughest in NEPA.",
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'intro3span3',
          text: ' Local realtors have called it "probably the most difficult and expensive place in the state" for occupancy permits. But if you know what to expect and prepare properly, you can pass the first time.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Why Hazleton Requires Residential Occupancy Inspections
    {
      _type: 'block',
      _key: 'h2why',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2whyspan',
          text: 'Why Hazleton Requires Residential Occupancy Inspections',
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
          text: 'Hazleton requires a Certificate of Use and Occupancy inspection for all residential properties when:',
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
          _key: 'why2span',
          text: '• Property changes ownership (sale, inheritance, transfer)',
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
          _key: 'why3span',
          text: '• A new tenant moves into a rental property',
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
          _key: 'why4span',
          text: '• New construction is completed',
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
          _key: 'why5span',
          text: '• A building is altered or expanded',
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
          text: 'The Code Enforcement Office is located at ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'why6span2',
          text: '40 North Church Street, Third Floor',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'why6span3',
          text: " (Hazleton City Hall). After settlement on a property, you have ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'why6span4',
          text: '30 days to register and schedule your inspection.',
          marks: ['strong']
        }
      ],
      markDefs: []
    },

    // H2: Hazleton Occupancy Inspection Fees
    {
      _type: 'block',
      _key: 'h2fees',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2feesspan',
          text: 'Hazleton Occupancy Inspection Fees (Current)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fees1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'fees1span',
          text: "Here's what you'll pay — and timing matters:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fees2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'fees2span1',
          text: 'Standard (15+ days notice):',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'fees2span2',
          text: ' $75 per unit',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fees3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'fees3span1',
          text: 'Less than 15 days notice:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'fees3span2',
          text: ' $150 per unit',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fees4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'fees4span1',
          text: 'Within 72 hours (emergency):',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'fees4span2',
          text: ' $300 per unit',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fees5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'fees5span1',
          text: 'No-show fee:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'fees5span2',
          text: ' $50',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fees6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'fees6span1',
          text: 'Certificate copies:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'fees6span2',
          text: ' $5 each',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fees7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'fees7span1',
          text: 'Important:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'fees7span2',
          text: ' All outstanding city bills (taxes, water, sewer, trash) must be paid before you can get your Certificate of Occupancy.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: The Complete Hazleton Residential Occupancy Inspection Checklist
    {
      _type: 'block',
      _key: 'h2checklist',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2checklistspan',
          text: 'The Complete Hazleton Residential Occupancy Inspection Checklist',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'checklist1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'checklist1span',
          text: "According to Hazleton City Code Chapter 166, here's exactly what inspectors check:",
          marks: []
        }
      ],
      markDefs: []
    },

    // H3: Smoke Detectors
    {
      _type: 'block',
      _key: 'h3smoke',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3smokespan',
          text: '1. Smoke Detectors',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'smoke1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'smoke1span1',
          text: 'Requirements:',
          marks: ['strong']
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'smoke2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'smoke2span',
          text: '• One on every floor (including basement and attic if finished)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'smoke3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'smoke3span',
          text: '• One in every sleeping area',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'smoke4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'smoke4span',
          text: '• One in hallway outside bedrooms',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'smoke5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'smoke5span',
          text: '• Must be functional (inspector will test)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'smoke6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'smoke6span',
          text: '• Cannot be expired (check date on back)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'smoke7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'smoke7span1',
          text: 'Common fails:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'smoke7span2',
          text: ' Missing batteries, chirping (low battery), expired units (10-year lifespan), painted-over detectors that don\'t function.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'smoke8',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'smoke8span1',
          text: 'Cost to fix:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'smoke8span2',
          text: ' $15-30 per detector at Home Depot or Lowe\'s. Easy DIY.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H3: Stairway Guardrails
    {
      _type: 'block',
      _key: 'h3stairs',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3stairsspan',
          text: '2. Stairway Guardrails',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'stairs1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'stairs1span1',
          text: 'Requirements:',
          marks: ['strong']
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'stairs2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'stairs2span',
          text: '• Any stairway with 4 or more risers needs a guardrail',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'stairs3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'stairs3span',
          text: '• Minimum 34 inches high (measured from stair nosing)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'stairs4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'stairs4span',
          text: '• Balusters (spindles) spaced no more than 4 inches apart',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'stairs5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'stairs5span',
          text: '• Must be securely attached (no wobble)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'stairs6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'stairs6span1',
          text: 'Common fails:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'stairs6span2',
          text: ' Missing railings entirely, loose mounting, balusters spaced too wide (child safety hazard), rotted wood.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'stairs7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'stairs7span1',
          text: 'Cost to fix:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'stairs7span2',
          text: ' $200-800 depending on materials and length. Handyman job.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H3: Open Electrical
    {
      _type: 'block',
      _key: 'h3elec',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3elecspan',
          text: '3. Open Electrical',
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
          text: 'Requirements:',
          marks: ['strong']
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
          _key: 'elec2span',
          text: '• All junction boxes must have covers',
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
          _key: 'elec3span',
          text: '• No exposed wiring',
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
          _key: 'elec4span',
          text: '• All outlets and switches must have cover plates',
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
          _key: 'elec5span',
          text: '• No double-tapped breakers (two wires on one breaker)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'elec6span1',
          text: 'Common fails:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'elec6span2',
          text: ' Missing outlet covers, open junction boxes in basements/attics, exposed Romex, panel cover missing.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'elec7span1',
          text: 'Cost to fix:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'elec7span2',
          text: ' Cover plates are $1-3 each. Junction box covers under $5. Double-tapped breakers may need an electrician ($100-300).',
          marks: []
        }
      ],
      markDefs: []
    },

    // H3: Hot Water / Heat / Sewer
    {
      _type: 'block',
      _key: 'h3util',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3utilspan',
          text: '4. Hot Water / Heat / Sewer',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'util1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'util1span1',
          text: 'Requirements:',
          marks: ['strong']
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'util2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'util2span',
          text: '• Working hot water heater',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'util3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'util3span',
          text: '• Functional heating system',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'util4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'util4span',
          text: '• Proper sewer connection with no leaks',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'util5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'util5span',
          text: '• All plumbing fixtures functional (toilets, sinks)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'util6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'util6span1',
          text: 'Common fails:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'util6span2',
          text: ' Inoperable water heater, furnace that won\'t fire, visible plumbing leaks, non-functioning toilets.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'util7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'util7span1',
          text: 'Cost to fix:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'util7span2',
          text: ' Highly variable. Minor plumbing repairs $100-300. New water heater $800-2,000. Furnace repair $200-1,000+.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H3: Windows and Glass
    {
      _type: 'block',
      _key: 'h3windows',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3windowsspan',
          text: '5. Windows and Glass',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'windows1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'windows1span1',
          text: 'Requirements:',
          marks: ['strong']
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'windows2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'windows2span',
          text: '• No broken or cracked glass',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'windows3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'windows3span',
          text: '• Bedroom windows must have functioning balances (stay open on their own)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'windows4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'windows4span',
          text: '• Egress windows in bedrooms must open fully and meet minimum size requirements',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'windows5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'windows5span1',
          text: 'Common fails:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'windows5span2',
          text: " Cracked glass, broken balances (window won't stay up), painted shut, missing screens (not always required but noted).",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'windows6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'windows6span1',
          text: 'Cost to fix:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'windows6span2',
          text: ' Glass replacement $75-200 per pane. Balance replacement $20-50 per window (DIY) or $75-150 (professional).',
          marks: []
        }
      ],
      markDefs: []
    },

    // H3: Guardrails for Decks and Exterior Stairs
    {
      _type: 'block',
      _key: 'h3deck',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3deckspan',
          text: '6. Guardrails for Decks and Exterior Stairs',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'deck1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'deck1span1',
          text: 'Requirements:',
          marks: ['strong']
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'deck2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'deck2span',
          text: '• Any deck or porch surface 30+ inches above grade needs guardrails',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'deck3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'deck3span',
          text: '• Minimum 36 inches high for residential decks',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'deck4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'deck4span',
          text: '• No rot, no structural deficiencies, no wobble',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'deck5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'deck5span1',
          text: 'Common fails:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'deck5span2',
          text: ' Missing railings, rotted posts, loose connections, inadequate height. Hazleton has many older homes with non-compliant porches.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'deck6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'deck6span1',
          text: 'Cost to fix:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'deck6span2',
          text: ' $500-2,000+ depending on extent. Major porch work can run $5,000+.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H3: Second Means of Egress
    {
      _type: 'block',
      _key: 'h3egress',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3egressspan',
          text: '7. Second Means of Egress (Two-Story Buildings)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'egress1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'egress1span1',
          text: 'Requirements:',
          marks: ['strong']
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'egress2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'egress2span',
          text: '• Upper floors must have either egress windows or a second stairway',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'egress3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'egress3span',
          text: '• Egress windows must have minimum 5.7 square feet of opening',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'egress4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'egress4span',
          text: '• Minimum 24 inches high, 20 inches wide opening',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'egress5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'egress5span',
          text: '• Maximum 44 inches from floor to sill',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'egress6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'egress6span1',
          text: 'Common fails:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'egress6span2',
          text: ' Windows too small, painted shut, hardware that prevents full opening, bars/grates without quick-release.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'egress7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'egress7span1',
          text: 'Cost to fix:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'egress7span2',
          text: ' If windows need to be enlarged, $500-2,000+ per window including installation.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Items NOT on Official List (But Still Get Flagged)
    {
      _type: 'block',
      _key: 'h2extra',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2extraspan',
          text: 'Items NOT on the Official List (But Still Get Flagged)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'extra1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'extra1span',
          text: 'Based on experience, inspectors often note these items even though they\'re not explicitly on the Chapter 166 checklist:',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'extra2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'extra2span1',
          text: '• Carbon monoxide detectors',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'extra2span2',
          text: ' — Required by PA law near sleeping areas if you have gas appliances or attached garage',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'extra3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'extra3span1',
          text: '• Graspable handrails',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'extra3span2',
          text: ' — 2x4 railings technically don\'t meet code (can\'t wrap your hand around them)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'extra4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'extra4span1',
          text: '• Address visibility',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'extra4span2',
          text: ' — House numbers must be visible from the street',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'extra5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'extra5span1',
          text: '• Extension cords as permanent wiring',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'extra5span2',
          text: ' — Using extension cords for appliances is a violation',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'extra6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'extra6span1',
          text: '• GFCI outlets',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'extra6span2',
          text: ' — Required in kitchens, bathrooms, and other wet areas',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'extra7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'extra7span1',
          text: '• Trip hazards',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'extra7span2',
          text: ' — Loose carpet, damaged flooring, uneven thresholds',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: How to Prepare for Your Hazleton Occupancy Inspection
    {
      _type: 'block',
      _key: 'h2prep',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2prepspan',
          text: 'How to Prepare for Your Hazleton Occupancy Inspection',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep1span',
          text: 'Follow this timeline to pass the first time:',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3prep2',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3prep2span',
          text: '2-3 Weeks Before Inspection',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep2span',
          text: '• Walk through the entire property with this checklist in hand',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep3span',
          text: '• Test every smoke detector and check expiration dates',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep4span',
          text: '• Check every window — do they open? Stay open? Any cracked glass?',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep5span',
          text: '• Inspect all railings — interior and exterior',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep6span',
          text: '• Note any missing outlet/switch covers',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep7span',
          text: '• Schedule and complete any needed repairs',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3prep8',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3prep8span',
          text: '1 Week Before Inspection',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep8',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep8span',
          text: '• Verify all repairs are complete',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep9',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep9span',
          text: '• Clear any outstanding city bills (taxes, water, sewer, trash)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep10',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep10span',
          text: '• Ensure utilities are on (inspector needs to test)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3prep11',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3prep11span',
          text: 'Day Before Inspection',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep11',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep11span',
          text: '• Do a final walkthrough with fresh eyes',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep12',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep12span',
          text: '• Test smoke detectors one more time',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep13',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep13span',
          text: '• Make sure the property is accessible',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3prep14',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3prep14span',
          text: 'Day of Inspection',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep14',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep14span',
          text: '• Be present (or have someone there who can provide access)',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep15',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep15span',
          text: '• Have a flashlight ready for basement/attic',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'prep16',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'prep16span',
          text: '• Be prepared to answer questions about the property',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: What Happens If You Fail?
    {
      _type: 'block',
      _key: 'h2fail',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2failspan',
          text: 'What Happens If You Fail?',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fail1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'fail1span',
          text: "Don't panic. Here's the process:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fail2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'fail2span',
          text: '1. You\'ll receive a written notice listing all violations',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fail3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'fail3span',
          text: "2. Fix everything on the list (partial fixes = another fail)",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fail4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'fail4span',
          text: '3. Schedule a reinspection and pay another fee',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fail5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'fail5span',
          text: '4. Pass reinspection and receive your certificate',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fail6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'fail6span',
          text: 'If this sounds like it could delay your closing, you\'re right. That\'s why preparation matters.',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: Special Situations
    {
      _type: 'block',
      _key: 'h2special',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2specialspan',
          text: 'Special Situations',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3sell',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3sellspan',
          text: 'Selling a Property',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'sell1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'sell1span1',
          text: 'Smart move:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'sell1span2',
          text: ' Get your occupancy inspection BEFORE listing the property. You\'ll know exactly what needs to be fixed, and you won\'t have surprises that kill deals.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3buy',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3buyspan',
          text: 'Buying a Property',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'buy1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'buy1span1',
          text: 'Make occupancy a contingency',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'buy1span2',
          text: ' in your purchase agreement. Either require the seller to obtain it before closing, or negotiate repairs if issues are discovered.',
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
          text: 'Rental Properties',
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
          text: 'Landlords have additional requirements:',
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
          _key: 'rental2span',
          text: '• Must register all rental properties with the city',
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
          _key: 'rental3span',
          text: '• Need a new occupancy inspection for each new tenant',
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
          text: '• Must have a local agent within 10 miles if you live outside that radius',
          marks: []
        }
      ],
      markDefs: []
    },

    // H2: When Occupancy Inspection Problems Kill Deals
    {
      _type: 'block',
      _key: 'h2kill',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2killspan',
          text: 'When Occupancy Inspection Problems Kill Deals',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'kill1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'kill1span',
          text: "I've seen it happen. A seller thinks everything is fine. The buyer's excited. Then the occupancy inspection reveals:",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'kill2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'kill2span',
          text: '• Electrical panel needs upgrade: $2,500',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'kill3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'kill3span',
          text: '• Porch railings need replacement: $800',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'kill4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'kill4span',
          text: '• Four windows need new balances: $400',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'kill5',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'kill5span',
          text: '• Various electrical covers and repairs: $500',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'kill6',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'kill6span1',
          text: 'Total: $4,200 in repairs ',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'kill6span2',
          text: 'that someone has to pay for. Now the buyer wants a credit. The seller doesn\'t have the cash. Closing gets delayed. Sometimes deals just fall apart.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'kill7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'kill7span',
          text: 'For more on dealing with code violations in the area, see our guide on ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'kill7span2',
          text: 'selling a house in Wilkes-Barre with code violations',
          marks: ['wbLink']
        },
        {
          _type: 'span',
          _key: 'kill7span3',
          text: '.',
          marks: []
        }
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'wbLink',
          href: '/blog/sell-house-wilkes-barre-code-violations'
        }
      ]
    },

    // H2: Alternative: Selling Without Dealing With Occupancy
    {
      _type: 'block',
      _key: 'h2alt',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2altspan',
          text: 'Alternative: Selling Without Dealing With Occupancy',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'alt1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'alt1span',
          text: "Here's something most people don't realize: ",
          marks: []
        },
        {
          _type: 'span',
          _key: 'alt1span2',
          text: 'cash buyers don\'t require traditional occupancy inspections.',
          marks: ['strong']
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'alt2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'alt2span',
          text: "When I buy a property, I'm buying it as-is. The occupancy requirements become my responsibility after closing. You don't have to fix anything, deal with inspectors, or wait for permits.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'alt3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'alt3span',
          text: "This isn't the right solution for everyone. But if you're facing major repairs, don't have the capital to fix issues, or just want to be done with it — selling to a cash buyer might make more sense than spending thousands on occupancy compliance.",
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'alt4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'alt4span',
          text: 'For more information about selling in Luzerne County, check out our ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'alt4span2',
          text: 'complete Luzerne County selling guide',
          marks: ['luzerneLink']
        },
        {
          _type: 'span',
          _key: 'alt4span3',
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

    // H2: Hazleton Code Enforcement Contact Information
    {
      _type: 'block',
      _key: 'h2contact',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2contactspan',
          text: 'Hazleton Code Enforcement Contact Information',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'contact1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'contact1span1',
          text: 'Address:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'contact1span2',
          text: ' 40 North Church Street, Third Floor, Hazleton, PA 18201',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'contact2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'contact2span1',
          text: 'Supervisor:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'contact2span2',
          text: ' Diane Panzarella',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'contact3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'contact3span1',
          text: 'Phone:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'contact3span2',
          text: ' (570) 459-4960 ext 621',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'contact4',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'contact4span1',
          text: 'Hours:',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'contact4span2',
          text: ' Monday - Friday, 8:30 AM - 4:00 PM',
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
          text: 'Need Help With Your Hazleton Property?',
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
          text: "If you're dealing with a property that has occupancy issues — or you just want to skip the whole process — I can help. Get started on our ",
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
          text: 'Now you have the complete ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'close4span2',
          text: 'Hazleton residential occupancy inspection checklist',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'close4span3',
          text: '. Use it, prepare well, and pass the first time.',
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
  const locationSlugs = ['hazleton']
  const locations = await client.fetch(
    `*[_type == "location" && slug.current in $slugs]{ _id, city, slug }`,
    { slugs: locationSlugs }
  )
  console.log('Found locations:', locations.map(l => l.city))

  // Fetch related situations
  console.log('\nFetching situation references...')
  const situationSlugs = ['inherited-property']
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
    relatedSituations: situations.length > 0 ? situations.map(sit => ({
      _type: 'reference',
      _ref: sit._id,
      _key: `sit-${sit.slug.current}`
    })) : undefined
  }

  // Remove undefined references
  if (!doc.relatedLocations || doc.relatedLocations.length === 0) {
    delete doc.relatedLocations
  }
  if (!doc.relatedSituations || doc.relatedSituations.length === 0) {
    delete doc.relatedSituations
  }

  console.log('\nCreating blog post...')
  const result = await client.create(doc)
  console.log('\n✅ Blog post created successfully!')
  console.log('Document ID:', result._id)
  console.log('\nView at: https://www.clearedgehomebuyers.com/blog/hazleton-residential-occupancy-inspection-checklist')
}

main().catch(console.error)
