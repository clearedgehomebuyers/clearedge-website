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
  title: 'Selling a House with International Property Maintenance Code Violations Bethlehem: The Complete 2026 Guide',
  slug: { current: 'selling-house-international-property-maintenance-code-violations-bethlehem' },
  metaTitle: 'Selling a House with IPMC Violations Bethlehem | Complete 2026 Guide',
  metaDescription: 'Got IPMC violations in Bethlehem? Learn your 3 options for selling a house with Article 1733 code violations, including daily fine avoidance and cash sale alternatives.',
  excerpt: 'Got IPMC violations in Bethlehem? Learn your 3 options for selling a house with Article 1733 code violations, including daily fine avoidance and cash sale alternatives.',
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2026-01-08T12:00:00Z',
  category: 'situations',

  faqs: [
    {
      question: 'Can the city stop me from selling my house because of code violations?',
      answer: 'Technically, no. Bethlehem cannot prevent you from transferring ownership. However, you are legally required to furnish the buyer with a true copy of any Notice of Violation before the transfer. You cannot hide violations from a buyer.'
    },
    {
      question: 'What if I\'m an absentee landlord who doesn\'t live in Bethlehem?',
      answer: 'Bethlehem requires property owners who live outside the area to designate a local agent. This agent must be available to receive notices and handle violations. If you fail to designate a local agent, the city can revoke your Certificate of Occupancy.'
    },
    {
      question: 'How much does a resale inspection cost in Bethlehem?',
      answer: 'As of 2026, a standard residential sales inspection in Bethlehem is approximately $150 per unit. Re-inspections cost between $75 and $125, depending on how many times the inspector needs to return.'
    },
    {
      question: 'What happens if I just ignore the violations?',
      answer: 'Bad idea. Every day a violation continues after your notice expires is a separate offense. Fines can reach up to $1,000 per day per violation. The city can also place liens on your property for unpaid fines.'
    },
    {
      question: 'Can I sell my house "as-is" with violations in Bethlehem?',
      answer: 'Yes. There\'s no law preventing an "as-is" sale. The challenge is finding a buyer. Traditional buyers with mortgages often can\'t close on properties with active safety or habitability violations. Cash buyers specialize in exactly these situations.'
    },
    {
      question: 'What\'s the difference between the City of Bethlehem and Bethlehem Township?',
      answer: 'The City of Bethlehem and Bethlehem Township are separate municipalities with different ordinances and enforcement. The City of Bethlehem enforces Article 1733 through the Bureau of Housing Inspections at 10 East Church Street.'
    },
    {
      question: 'How long do I have to fix violations after a Notice of Violation?',
      answer: 'It depends on the violation. Some violations give you as little as 48 hours. Others may give you 30-90 days. The Notice of Violation will specify the deadline. Missing that deadline starts the daily fine clock.'
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
          text: 'Selling a house with ',
          marks: []
        },
        {
          _type: 'span',
          _key: 'intro1span2',
          text: 'International Property Maintenance Code violations Bethlehem',
          marks: ['strong']
        },
        {
          _type: 'span',
          _key: 'intro1span3',
          text: ' is one of the most stressful situations a homeowner can face.',
          marks: []
        }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro2span1', text: 'I get it.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro3',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro3span1', text: 'That yellow notice taped to your door feels like a death sentence for your sale.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro4',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro4span1', text: 'The city is breathing down your neck.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro5',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro5span1', text: 'The fines are piling up.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro6',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro6span1', text: "And you're wondering if anyone will even buy this place.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro7',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro7span1', text: "Here's the thing.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro8',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro8span1', text: "I'm Tyler Swenson, and I've been buying properties with code violations in Bethlehem since 2016.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro9',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro9span1', text: 'I started ClearEdge Home Buyers with a single duplex in Scranton.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro10',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro10span1', text: 'Since then, we\'ve helped over 200 homeowners across Eastern PA sell properties that most people would consider "unsellable."', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro11',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro11span1', text: 'That includes dozens of homes with active IPMC violations right here in Bethlehem.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro12',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro12span1', text: "I've sat across from homeowners who were convinced they'd have to pay $30,000 to fix everything.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro13',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro13span1', text: 'I\'ve seen deals fall apart because a buyer\'s lender wouldn\'t approve a loan on a house with "safety violations."', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro14',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro14span1', text: "And I've watched people lose thousands in daily fines because they didn't understand how Bethlehem's code enforcement actually works.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro15',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro15span1', text: 'This guide is everything I wish someone had told me when I started.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro16',
      style: 'normal',
      children: [{ _type: 'span', _key: 'intro16span1', text: 'No fluff. No legal jargon. Just the real deal on how to sell your Bethlehem home—violations and all.', marks: [] }],
      markDefs: []
    },

    // H2: What Is Article 1733
    {
      _type: 'block',
      _key: 'h2article1733',
      style: 'h2',
      children: [{ _type: 'span', _key: 'h2article1733span', text: 'What Is Article 1733 and Why Does Bethlehem Take It So Seriously?', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'art1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'art1span', text: "Bethlehem doesn't play around with property maintenance.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'art2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'art2span', text: 'The city adopted the 2018 International Property Maintenance Code under Article 1733 of their Codified Ordinances.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'art3',
      style: 'normal',
      children: [{ _type: 'span', _key: 'art3span', text: "This isn't some obscure regulation.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'art4',
      style: 'normal',
      children: [{ _type: 'span', _key: 'art4span', text: "It's the rulebook the Bureau of Housing Inspections uses to determine if your property is safe for occupancy.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'art5',
      style: 'normal',
      children: [{ _type: 'span', _key: 'art5span', text: "And here's what most people don't realize:", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'art6',
      style: 'normal',
      children: [{ _type: 'span', _key: 'art6span', text: 'Bethlehem has some of the strictest enforcement in the Lehigh Valley.', marks: ['strong'] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'art7',
      style: 'normal',
      children: [{ _type: 'span', _key: 'art7span', text: 'The code covers everything. Structural integrity. Electrical systems. Plumbing. Exterior maintenance. Even how tall your grass can get.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'art8',
      style: 'normal',
      children: [{ _type: 'span', _key: 'art8span', text: 'When a code official finds a violation, they issue a Notice of Violation.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'art9',
      style: 'normal',
      children: [{ _type: 'span', _key: 'art9span', text: "That notice isn't a suggestion. It's the start of a legal clock.", marks: [] }],
      markDefs: []
    },

    // H2: The Bethlehem Code Violation Timeline
    {
      _type: 'block',
      _key: 'h2timeline',
      style: 'h2',
      children: [{ _type: 'span', _key: 'h2timelinespan', text: 'The Bethlehem Code Violation Timeline: What You Need to Know', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'time1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'time1span', text: "Here's where things get real.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3rule10',
      style: 'h3',
      children: [{ _type: 'span', _key: 'h3rule10span', text: 'The 10-Business-Day Rule', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'rule10a',
      style: 'normal',
      children: [{ _type: 'span', _key: 'rule10aspan', text: 'In Bethlehem, sellers are required to obtain a resale inspection report within 10 business days of offering the property for sale.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'rule10b',
      style: 'normal',
      children: [{ _type: 'span', _key: 'rule10bspan', text: 'That report goes to the buyer. Any violations on that report become part of the official record.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'rule10c',
      style: 'normal',
      children: [{ _type: 'span', _key: 'rule10cspan', text: "Miss this window and you're already starting off on the wrong foot with the city.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h390day',
      style: 'h3',
      children: [{ _type: 'span', _key: 'h390dayspan', text: 'The 90-Day Abatement Deadline', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'abate1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'abate1span', text: 'Once ownership transfers, the new owner typically has 90 days to fix all violations.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'abate2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'abate2span', text: "Sounds reasonable, right? Here's the catch:", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'abate3',
      style: 'normal',
      children: [{ _type: 'span', _key: 'abate3span', text: 'If the violations are significant, many buyers will walk away rather than inherit that responsibility.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'abate4',
      style: 'normal',
      children: [{ _type: 'span', _key: 'abate4span', text: "And if you're trying to sell on the open market, those violations can kill your deal before it even starts.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3dailyfine',
      style: 'h3',
      children: [{ _type: 'span', _key: 'h3dailyfinespan', text: 'The Daily Fine That Adds Up Fast', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fine1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'fine1span', text: 'This is the one that really hurts.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fine2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'fine2span1', text: 'Under Article 1733, ', marks: [] },
        { _type: 'span', _key: 'fine2span2', text: 'every single day a violation continues after your notice expires is a separate offense.', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fine3',
      style: 'normal',
      children: [{ _type: 'span', _key: 'fine3span', text: 'The fine? Up to $1,000 per day. Per violation.', marks: ['strong'] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fine4',
      style: 'normal',
      children: [{ _type: 'span', _key: 'fine4span', text: "I've seen homeowners rack up $10,000+ in fines just because they didn't understand the urgency.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fine5',
      style: 'normal',
      children: [{ _type: 'span', _key: 'fine5span', text: 'One guy in South Bethlehem had three violations. He thought he had time to "figure it out." Thirty days later, he was looking at $15,000 in accumulated fines.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fine6',
      style: 'normal',
      children: [{ _type: 'span', _key: 'fine6span', text: "Don't let that be you.", marks: [] }],
      markDefs: []
    },

    // H2: The Most Common IPMC Violations
    {
      _type: 'block',
      _key: 'h2violations',
      style: 'h2',
      children: [{ _type: 'span', _key: 'h2violationsspan', text: 'The Most Common IPMC Violations That Kill Bethlehem Home Sales', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'viol1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'viol1span', text: "After buying dozens of properties with code issues in Bethlehem, I've seen patterns.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'viol2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'viol2span', text: 'These are the violations that show up over and over again. And these are the ones that scare away traditional buyers and their lenders.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3elec',
      style: 'h3',
      children: [{ _type: 'span', _key: 'h3elecspan', text: 'Electrical Issues (The #1 Deal Killer)', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'elec1span', text: 'Missing GFCI Protection', marks: ['strong'] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'elec2span', text: 'This one is everywhere in older Bethlehem homes. GFCI outlets (the ones with the "Test" and "Reset" buttons) are required near any water source.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec3',
      style: 'normal',
      children: [{ _type: 'span', _key: 'elec3span', text: 'That means: Kitchen countertops, Bathrooms, Basements, Within 6 feet of any sink, Laundry areas, and Garages.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec4',
      style: 'normal',
      children: [{ _type: 'span', _key: 'elec4span', text: "If your 1950s row home in South Side has original outlets in the kitchen, you're almost guaranteed to fail this one.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec5',
      style: 'normal',
      children: [{ _type: 'span', _key: 'elec5span', text: "The fix isn't expensive—maybe $150-300 for an electrician. But if you've got a long list of issues, it adds up.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec6',
      style: 'normal',
      children: [{ _type: 'span', _key: 'elec6span', text: 'Exposed Wiring or Missing Junction Box Covers', marks: ['strong'] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'elec7',
      style: 'normal',
      children: [{ _type: 'span', _key: 'elec7span', text: 'Another common one. Any exposed wiring or uncovered electrical boxes are automatic violations.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3ext',
      style: 'h3',
      children: [{ _type: 'span', _key: 'h3extspan', text: 'Exterior Maintenance Problems', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ext1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'ext1span', text: 'High Weeds and Overgrown Vegetation', marks: ['strong'] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ext2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'ext2span', text: "Bethlehem's code specifies that weeds and grass cannot exceed 8-12 inches. Sounds minor, but this is a frequent complaint that triggers inspections.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ext3',
      style: 'normal',
      children: [{ _type: 'span', _key: 'ext3span', text: 'Peeling Paint', marks: ['strong'] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ext4',
      style: 'normal',
      children: [{ _type: 'span', _key: 'ext4span', text: "This one is tricky. Peeling exterior paint isn't just cosmetic. On homes built before 1978, it's a potential lead paint hazard. That elevates a simple paint violation to a health concern.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ext5',
      style: 'normal',
      children: [{ _type: 'span', _key: 'ext5span', text: 'Missing or Illegible Address Numbers', marks: ['strong'] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ext6',
      style: 'normal',
      children: [{ _type: 'span', _key: 'ext6span', text: 'Your address numbers must be at least 4 inches high with a minimum stroke width of 0.5 inches. They must contrast with the background. They must be visible from the street.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ext7',
      style: 'normal',
      children: [{ _type: 'span', _key: 'ext7span', text: "I've seen sales delayed over something as simple as faded house numbers.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3safety',
      style: 'h3',
      children: [{ _type: 'span', _key: 'h3safetyspan', text: 'Safety Violations', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'safe1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'safe1span', text: 'Missing Smoke Detectors', marks: ['strong'] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'safe2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'safe2span', text: 'Every bedroom needs a smoke detector. Every floor needs a smoke detector. Missing or non-functioning detectors are automatic violations.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'safe3',
      style: 'normal',
      children: [{ _type: 'span', _key: 'safe3span', text: 'Unsafe Handrails and Stairs', marks: ['strong'] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'safe4',
      style: 'normal',
      children: [{ _type: 'span', _key: 'safe4span', text: 'Loose railings, missing balusters, stairs with excessive rise—all violations. These fall under "habitability" issues, which is a major red flag for lenders.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'safe5',
      style: 'normal',
      children: [{ _type: 'span', _key: 'safe5span', text: '"Temporary" Window Covers', marks: ['strong'] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'safe6',
      style: 'normal',
      children: [{ _type: 'span', _key: 'safe6span', text: "That plastic sheeting you put up three winters ago? If it's been there too long, it's a violation. Windows must have proper glass or approved materials.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3rental',
      style: 'h3',
      children: [{ _type: 'span', _key: 'h3rentalspan', text: 'Rental Property Issues (Article 1738)', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'rent1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'rent1span', text: "If you're renting out your Bethlehem property, you face additional scrutiny under Article 1738.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'rent2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'rent2span', text: 'You need a valid occupancy license. If you have 3-5 unrelated tenants, inspections get even tougher.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'rent3',
      style: 'normal',
      children: [{ _type: 'span', _key: 'rent3span', text: "And if you're an absentee landlord living outside the area, Bethlehem requires you to designate a local agent. Fail to do that and they can revoke your Certificate of Occupancy.", marks: [] }],
      markDefs: []
    },

    // H2: Why Traditional Sales Fall Apart
    {
      _type: 'block',
      _key: 'h2trad',
      style: 'h2',
      children: [{ _type: 'span', _key: 'h2tradspan', text: 'Why Traditional Sales Fall Apart When You Have Code Violations', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'trad1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'trad1span', text: "Here's the reality most real estate agents won't tell you.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3lend',
      style: 'h3',
      children: [{ _type: 'span', _key: 'h3lendspan', text: "Lenders Don't Like Violations", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'lend1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'lend1span', text: 'When a buyer applies for a mortgage, the lender orders an appraisal. If that appraisal reveals health, safety, or habitability concerns, the loan gets flagged.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'lend2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'lend2span', text: "FHA and VA loans are especially strict. They can require all violations to be fixed before they'll fund the loan.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'lend3',
      style: 'normal',
      children: [{ _type: 'span', _key: 'lend3span', text: "That puts you in a bind. You need the buyer's money to close. But the buyer can't get their money until you fix everything. See the problem?", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3cold',
      style: 'h3',
      children: [{ _type: 'span', _key: 'h3coldspan', text: 'Buyers Get Cold Feet', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cold1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'cold1span', text: "Even if the lender doesn't kill the deal, buyers often do. Nobody wants to buy a house with a to-do list from the city.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cold2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'cold2span', text: "Especially in Bethlehem's current market where homes sell quickly. Buyers have options. They don't need your headache when they can buy the house down the street.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3death',
      style: 'h3',
      children: [{ _type: 'span', _key: 'h3deathspan', text: 'The Negotiation Death Spiral', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'death1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'death1span', text: "When violations show up on the inspection report, here's what usually happens:", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'death2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'death2span', text: "1. Buyer asks for a price reduction. 2. You negotiate back and forth. 3. Buyer's lender gets nervous. 4. Deal falls through. 5. You start over with a new buyer. 6. Meanwhile, daily fines keep accumulating.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'death3',
      style: 'normal',
      children: [{ _type: 'span', _key: 'death3span', text: "I've watched this play out dozens of times. It's painful. And it's often avoidable.", marks: [] }],
      markDefs: []
    },

    // H2: Your 3 Options
    {
      _type: 'block',
      _key: 'h2options',
      style: 'h2',
      children: [{ _type: 'span', _key: 'h2optionsspan', text: 'Your 3 Options for Selling a House with Code Violations in Bethlehem', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'opt1span', text: "Let's get practical. You have three real paths forward. Each has tradeoffs.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3opt1',
      style: 'h3',
      children: [{ _type: 'span', _key: 'h3opt1span', text: 'Option 1: Fix Everything and Sell Retail', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt1aspan1', text: 'What it involves: ', marks: ['strong'] },
        { _type: 'span', _key: 'opt1aspan2', text: 'Hire contractors. Pull necessary permits. Complete all repairs. Schedule re-inspections. Get violations cleared. List on MLS for full market value.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt1bspan1', text: 'The upside: ', marks: ['strong'] },
        { _type: 'span', _key: 'opt1bspan2', text: "You'll get top dollar.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1c',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt1cspan1', text: 'The downside: ', marks: ['strong'] },
        { _type: 'span', _key: 'opt1cspan2', text: "Time and cash. You need both. Contractor schedules in the Lehigh Valley are backed up. Permits take time. Re-inspections can fail. If you've got $15,000-$50,000 in repairs and 3-6 months to spare, this path makes sense.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3opt2',
      style: 'h3',
      children: [{ _type: 'span', _key: 'h3opt2span', text: 'Option 2: Offer a Repair Credit to a Buyer', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2aspan1', text: 'What it involves: ', marks: ['strong'] },
        { _type: 'span', _key: 'opt2aspan2', text: 'List the property "as-is." Disclose all violations upfront. Negotiate a price reduction or repair credit at closing. Let the buyer handle the fixes after they own it.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2bspan1', text: 'The upside: ', marks: ['strong'] },
        { _type: 'span', _key: 'opt2bspan2', text: 'You avoid the repair work yourself.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2c',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2cspan1', text: 'The downside: ', marks: ['strong'] },
        { _type: 'span', _key: 'opt2cspan2', text: "Finding a buyer willing to take this on is tough. Their lender may not approve the loan. And you'll typically sell for 10-20% below market value anyway.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'h3opt3',
      style: 'h3',
      children: [{ _type: 'span', _key: 'h3opt3span', text: 'Option 3: Sell As-Is to a Cash Buyer', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt3aspan1', text: 'What it involves: ', marks: ['strong'] },
        { _type: 'span', _key: 'opt3aspan2', text: 'Contact a company like ClearEdge Home Buyers. We evaluate your property and make a fair cash offer. You accept, we close on your timeline. We assume responsibility for all violations.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt3bspan1', text: 'The upside: ', marks: ['strong'] },
        { _type: 'span', _key: 'opt3bspan2', text: 'No repairs. No cleaning. No waiting for lender approval. No daily fines piling up. Close in days, not months.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3c',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt3cspan1', text: 'The downside: ', marks: ['strong'] },
        { _type: 'span', _key: 'opt3cspan2', text: "You won't get full retail value. Cash buyers account for the cost and risk of handling violations. But when you factor in the repairs you'd have to make, the fines you'd accumulate, and the months you'd wait, the numbers often come out closer than you'd think.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3link',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt3linkspan1', text: 'Learn more about our simple 3-step process on our ', marks: [] },
        { _type: 'span', _key: 'opt3linkspan2', text: 'How It Works page', marks: ['howLink'] },
        { _type: 'span', _key: 'opt3linkspan3', text: '.', marks: [] }
      ],
      markDefs: [{ _type: 'link', _key: 'howLink', href: '/how-it-works' }]
    },

    // H2: How We Handle Bethlehem Code Violations
    {
      _type: 'block',
      _key: 'h2handle',
      style: 'h2',
      children: [{ _type: 'span', _key: 'h2handlespan', text: 'How We Handle Bethlehem Code Violations at ClearEdge', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'handle1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'handle1span', text: "Let me pull back the curtain. When we buy a house with IPMC violations in Bethlehem, here's what happens:", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'handle2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'handle2span1', text: 'Step 1: We Evaluate Everything. ', marks: ['strong'] },
        { _type: 'span', _key: 'handle2span2', text: 'We look at the violation list. We estimate repair costs. We account for the time and risk involved.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'handle3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'handle3span1', text: 'Step 2: We Make You a Fair Offer. ', marks: ['strong'] },
        { _type: 'span', _key: 'handle3span2', text: "Our offer reflects the property's current condition. No surprises. No games.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'handle4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'handle4span1', text: 'Step 3: We Close Fast. ', marks: ['strong'] },
        { _type: 'span', _key: 'handle4span2', text: "Because we pay cash, there's no lender to satisfy. We can close in as few as 7 days if you need us to.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'handle5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'handle5span1', text: 'Step 4: We Become Responsible. ', marks: ['strong'] },
        { _type: 'span', _key: 'handle5span2', text: 'Once we own the property, the violations become our problem. We work with the city. We make the repairs. We get the Certificate of Occupancy. You walk away clean.', marks: [] }
      ],
      markDefs: []
    },

    // H2: The Real Cost of Waiting
    {
      _type: 'block',
      _key: 'h2cost',
      style: 'h2',
      children: [{ _type: 'span', _key: 'h2costspan', text: 'The Real Cost of Waiting', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'cost1span', text: 'Let me give you a real example.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'cost2span', text: "A homeowner in West Bethlehem contacted me last year. She'd inherited a property from her mother. The house had been vacant for 8 months.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost3',
      style: 'normal',
      children: [{ _type: 'span', _key: 'cost3span', text: 'During that time, the city had cited it for: High weeds (8 violations over 8 months), Missing GFCI outlets in kitchen and bathroom, Peeling exterior paint, Non-functioning smoke detectors, and Unsafe basement handrail.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost4',
      style: 'normal',
      children: [{ _type: 'span', _key: 'cost4span', text: 'Total estimated repair cost: $12,000. Accumulated fines: $8,400.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost5',
      style: 'normal',
      children: [{ _type: 'span', _key: 'cost5span', text: 'She thought she could "wait it out" and sell in the spring. By the time she called me, she was underwater.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost6',
      style: 'normal',
      children: [{ _type: 'span', _key: 'cost6span', text: 'We bought the property. Paid off her fines. Handled all the repairs. She walked away with a check instead of a debt.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cost7',
      style: 'normal',
      children: [{ _type: 'span', _key: 'cost7span', text: "That's what waiting costs.", marks: ['strong'] }],
      markDefs: []
    },

    // H2: When a Cash Sale Makes Sense
    {
      _type: 'block',
      _key: 'h2when',
      style: 'h2',
      children: [{ _type: 'span', _key: 'h2whenspan', text: 'When a Cash Sale Makes Sense', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'when1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'when1span', text: 'A cash sale to ClearEdge Home Buyers makes sense when:', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'when2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'when2span', text: "• You don't have $10,000+ for repairs\n• You can't wait 3-6 months for contractors and re-inspections\n• Daily fines are accumulating\n• You've inherited a property with violations\n• You're an out-of-state owner dealing with Bethlehem's local agent requirement\n• Your property has failed inspection and the buyer's loan fell through\n• You need to move quickly for work, divorce, or other life changes", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'when3',
      style: 'normal',
      children: [{ _type: 'span', _key: 'when3span', text: "It doesn't make sense if:", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'when4',
      style: 'normal',
      children: [{ _type: 'span', _key: 'when4span', text: "• You have time and money to fix everything\n• The violations are minor and won't affect financing\n• You want to maximize every dollar (and don't mind the wait)", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'when5',
      style: 'normal',
      children: [{ _type: 'span', _key: 'when5span', text: "I'm not here to convince you one way is better than another. I'm here to give you options.", marks: [] }],
      markDefs: []
    },

    // H2: Ready to Sell
    {
      _type: 'block',
      _key: 'h2ready',
      style: 'h2',
      children: [{ _type: 'span', _key: 'h2readyspan', text: 'Ready to Sell Your Bethlehem Home—Violations and All?', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ready1',
      style: 'normal',
      children: [{ _type: 'span', _key: 'ready1span', text: "Look, I've been doing this for nearly a decade.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ready2',
      style: 'normal',
      children: [{ _type: 'span', _key: 'ready2span', text: "I've seen every type of violation Bethlehem's code enforcement can throw at a property.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ready3',
      style: 'normal',
      children: [{ _type: 'span', _key: 'ready3span', text: "I've helped homeowners who thought they were stuck. And I've never once seen a situation that was truly hopeless.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ready4',
      style: 'normal',
      children: [{ _type: 'span', _key: 'ready4span', text: "If you're dealing with IPMC violations in Bethlehem and you want to explore your options, let's talk.", marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ready5',
      style: 'normal',
      children: [{ _type: 'span', _key: 'ready5span', text: 'No pressure. No obligation. Just a conversation to see if we can help.', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ready6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ready6span1', text: 'Request your free, no-obligation cash offer on our ', marks: [] },
        { _type: 'span', _key: 'ready6span2', text: 'homepage', marks: ['homeLink'] },
        { _type: 'span', _key: 'ready6span3', text: '.', marks: [] }
      ],
      markDefs: [{ _type: 'link', _key: 'homeLink', href: '/' }]
    },

    // About the Author
    {
      _type: 'block',
      _key: 'h2author',
      style: 'h2',
      children: [{ _type: 'span', _key: 'h2authorspan', text: 'About the Author', marks: [] }],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'author1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'author1span1', text: 'Tyler Swenson', marks: ['strong'] },
        { _type: 'span', _key: 'author1span2', text: ' is the founder of ClearEdge Home Buyers, a cash home buying company serving Eastern Pennsylvania including NEPA, Lehigh Valley, and the Poconos. Since 2016, Tyler has helped over 200 homeowners navigate difficult selling situations, from inherited properties to homes with code violations.', marks: [] }
      ],
      markDefs: []
    },

    // Final line
    {
      _type: 'block',
      _key: 'final',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'finalspan1', text: 'Selling a house with International Property Maintenance Code violations Bethlehem', marks: ['strong'] },
        { _type: 'span', _key: 'finalspan2', text: " doesn't have to be a nightmare—when you know your options and work with someone who's been through it before.", marks: [] }
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
  const locationSlugs = ['bethlehem', 'lehigh-valley']
  const locations = await client.fetch(
    `*[_type == "location" && slug.current in $slugs]{ _id, city, slug }`,
    { slugs: locationSlugs }
  )
  console.log('Found locations:', locations.map(l => l.city))

  // Fetch related situations
  console.log('\nFetching situation references...')
  const situationSlugs = ['code-violations']
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
    relatedSituations: situations.length > 0 ? situations.map(sit => ({
      _type: 'reference',
      _ref: sit._id,
      _key: `sit-${sit.slug.current}`
    })) : undefined
  }

  console.log('\nCreating blog post...')
  const result = await client.create(doc)
  console.log('\n✅ Blog post created successfully!')
  console.log('Document ID:', result._id)
  console.log('\nView at: https://www.clearedgehomebuyers.com/blog/selling-house-international-property-maintenance-code-violations-bethlehem')
}

main().catch(console.error)
