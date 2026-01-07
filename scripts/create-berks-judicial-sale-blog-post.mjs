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
  title: 'How to Stop Berks County Judicial Sale 2026: Your Complete Guide',
  slug: { current: 'how-to-stop-berks-county-judicial-sale-2026' },
  metaTitle: 'How to Stop Berks County Judicial Sale 2026 | Complete Guide',
  metaDescription: "Facing a Berks County Judicial Tax Sale in 2026? Learn 6 ways to stop the sale, save your equity, and protect your home. Free guide from local experts who've helped 200+ PA homeowners.",
  excerpt: "If your property is on the 2026 Berks County Judicial Sale list, you're facing the nuclear option of tax sales. Here's exactly how to stop it - 6 proven strategies from someone who's helped 200+ PA homeowners.",
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2026-01-07T10:00:00Z',
  category: 'situations',

  faqs: [
    {
      question: 'When is the 2026 Berks County Judicial Sale?',
      answer: 'Judicial Sales are typically held in mid-June. Based on 2025 patterns (ended June 13), expect around June 12, 2026. The exact date will be published on berkspa.gov and Bid4Assets several weeks before.'
    },
    {
      question: 'How much do I need to stop the Judicial Sale?',
      answer: 'Either (a) the full payoff amount, or (b) 25% of the total due to enter an installment agreement. For hardship cases, potentially 10%. Contact the Tax Claim Bureau at 610-478-6625 for your exact payoff.'
    },
    {
      question: "Can I still sell my house if it's on the Judicial Sale list?",
      answer: "Yes. You can sell any time before the sale is finalized. A cash buyer can close in 7-14 days and pay off your tax debt at closing. The key is acting early — don't wait until May."
    },
    {
      question: 'What happens to my mortgage if the house sells at Judicial Sale?',
      answer: 'It gets wiped out completely. The buyer gets the property free and clear. Your mortgage company loses their entire loan. You lose all your equity. Everyone loses except the winning bidder.'
    },
    {
      question: 'Will Berks County accept a partial payment to stop the sale?',
      answer: "For installment agreements, you need at least 25% down (or 10% with approved hardship). Partial payments without a formal agreement won't stop the sale. You need to formalize the payment plan with the Bureau."
    },
    {
      question: "What if I don't live in the property anymore?",
      answer: "You still owe the taxes and can still lose the property. If it's a rental, vacant, or inherited property, you have the same options — pay, negotiate, or sell before the auction."
    },
    {
      question: 'How do I find out if my property is on the Judicial Sale list?',
      answer: 'Check berkspa.gov/departments/tax-claim-bureau/tax-sale-information or call the Tax Claim Bureau at 610-478-6625. The sale list is typically published several weeks before the auction.'
    },
    {
      question: 'What happens if no one bids on my property at Judicial Sale?',
      answer: "It goes into the Repository for Unsold Properties. The county can sell it later without another auction — often for very low prices to investors. This is actually worse for you, because the property stays in limbo while you're still technically the owner."
    }
  ],

  content: [
    // Intro
    {
      _type: 'block',
      _key: 'intro1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro1a', text: "If you want to know how to stop Berks County Judicial Sale 2026, you're in the right place.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro2a', text: 'Your property is on a list.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro3a', text: 'A bright piece of paper just got tacked to your door in Reading.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro4a', text: 'Or maybe the certified mail finally caught up with you.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro5a', text: 'Either way, the Berks County Tax Claim Bureau is about to sell your house "free and clear."', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro6a', text: 'Not just of taxes.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro7a', text: 'Of everything.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro8a', text: 'Your mortgage. Your equity. Your ownership. Gone.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro9a', text: "I'm Tyler Swenson.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro10a', text: 'I founded ClearEdge Home Buyers in 2016 with a single duplex in Scranton.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro11a', text: "Since then, I've helped over 200 homeowners across Eastern Pennsylvania navigate exactly this situation.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro12a', text: 'Tax sales. Foreclosures. Properties with liens stacked three deep.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro13a', text: "I've seen it all.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro14a', text: "And I'm going to tell you exactly what you can do before that gavel drops this June.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'intro15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'intro15a', text: 'No fluff. No legal jargon. Just real options you can act on right now.', marks: [] }
      ],
      markDefs: []
    },

    // Section: What Is a Berks County Judicial Sale
    {
      _type: 'block',
      _key: 'h2what',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2whata', text: "What Is a Berks County Judicial Sale (And Why It's Different)", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what1a', text: "Let me be direct about what you're facing.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what2a', text: 'Berks County runs two types of tax sales every year:', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what3a', text: 'Upset Sale (September): ', marks: ['strong'] },
        { _type: 'span', _key: 'what3b', text: 'First auction. Buyer inherits your mortgage and other liens. Property doesn\'t sell "clean."', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what4a', text: 'Judicial Sale (June): ', marks: ['strong'] },
        { _type: 'span', _key: 'what4b', text: 'The nuclear option. Property sells free and clear of everything. All liens wiped. All mortgages gone.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what5a', text: "If you're on the 2026 Judicial Sale list, your property already failed to sell at the September 2025 Upset Sale.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what6a', text: 'The Tax Claim Bureau petitioned the Court of Common Pleas.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what7a', text: 'A judge approved the sale.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what8a', text: 'Now your property goes to auction on Bid4Assets in June 2026.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what9a', text: "Here's what makes a Judicial Sale devastating:", marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what10a', text: 'Say your house is worth $150,000.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what11a', text: 'You have an $85,000 mortgage.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what12a', text: 'You owe $18,000 in back taxes.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what13a', text: 'At Judicial Sale, an investor buys your house for $18,500.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what14a', text: 'That investor gets a $150,000 house for $18,500.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what15a', text: 'Your mortgage company loses their $85,000 loan.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what16',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what16a', text: 'You lose your $47,000 in equity.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what17',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what17a', text: 'You walk away with exactly $0.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'what18',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'what18a', text: "This isn't theory. This happens every June at the Berks County Services Center.", marks: [] }
      ],
      markDefs: []
    },

    // Section: Timeline
    {
      _type: 'block',
      _key: 'h2timeline',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2timelinea', text: 'The 2026 Berks County Judicial Sale Timeline', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline1a', text: "Based on the 2025 sale (which ended June 13, 2025), here's what to expect:", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline2a', text: '• Sale list published: Late April/Early May', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline3a', text: '• Bid4Assets registration deadline: ~May 29, 2026', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline4a', text: '• Tax Claim Bureau registration deadline: ~May 29, 2026 (4:00 PM)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline5a', text: '• Deposit deadline ($1,000 + $35 fee): ~June 5, 2026', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline6a', text: '• ', marks: [] },
        { _type: 'span', _key: 'timeline6b', text: 'Judicial Sale auction begins: ~June 12, 2026', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline7a', text: '• Full payment due from winning bidders: ~June 16, 2026 (4:00 PM)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline8a', text: '• Deed recorded: After payment confirmed', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline9a', text: 'The exact dates will be posted on berkspa.gov and Bid4Assets a few weeks before.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline10a', text: 'Critical point: ', marks: ['strong'] },
        { _type: 'span', _key: 'timeline10b', text: 'Pennsylvania has NO redemption period after a Judicial Tax Sale.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline11a', text: "Once the Court of Common Pleas confirms the sale, it's final.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline12a', text: 'You cannot buy your house back.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline13a', text: 'The buyer gets the deed.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'timeline14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'timeline14a', text: 'You get nothing.', marks: [] }
      ],
      markDefs: []
    },

    // Section: Tax Claim Bureau
    {
      _type: 'block',
      _key: 'h2bureau',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2bureaua', text: 'Berks County Tax Claim Bureau: Where to Go', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bureau1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bureau1a', text: 'Your first stop. Today if possible.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bureau2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bureau2a', text: 'Location:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bureau3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bureau3a', text: 'Berks County Services Center, 2nd Floor', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bureau4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bureau4a', text: '633 Court Street', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bureau5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bureau5a', text: 'Reading, PA 19601', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bureau6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bureau6a', text: 'Contact:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bureau7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bureau7a', text: '• Phone: 610-478-6625', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bureau8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bureau8a', text: '• Fax: 610-478-6644', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bureau9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bureau9a', text: '• Email: taxclaim@countyofberks.com', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bureau10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bureau10a', text: 'Hours: ', marks: ['strong'] },
        { _type: 'span', _key: 'bureau10b', text: 'The Bureau accepts appointments — in-person or virtual.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bureau11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bureau11a', text: 'Go there.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bureau12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bureau12a', text: 'Ask for your exact payoff amount in writing.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bureau13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bureau13a', text: "Know exactly what you're dealing with before you make any decisions.", marks: [] }
      ],
      markDefs: []
    },

    // Section: 6 Ways to Stop
    {
      _type: 'block',
      _key: 'h2ways',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2waysa', text: '6 Ways to Stop Berks County Judicial Sale 2026', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'ways1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'ways1a', text: 'Here are your real options. In order of simplicity.', marks: [] }
      ],
      markDefs: []
    },

    // Option 1
    {
      _type: 'block',
      _key: 'h3opt1',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'h3opt1a', text: 'Option 1: Pay in Full Before the Sale', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt1a1', text: 'The cleanest exit.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt1b1', text: 'Pay the entire delinquent tax amount plus interest, penalties, and fees before the sale date.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1c',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt1c1', text: 'Your property comes off the list immediately.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1d',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt1d1', text: 'The catch: ', marks: ['strong'] },
        { _type: 'span', _key: 'opt1d2', text: "If you had the cash to pay in full, you probably wouldn't be on this list.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1e',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt1e1', text: 'But consider:', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1f',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt1f1', text: '• 401k loan (you pay yourself back)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1g',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt1g1', text: '• Home equity line of credit (if you have one)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1h',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt1h1', text: '• Borrow from family', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1i',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt1i1', text: '• Liquidate other assets', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt1j',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt1j1', text: 'Even if it hurts, paying in full beats losing your entire equity.', marks: [] }
      ],
      markDefs: []
    },

    // Option 2
    {
      _type: 'block',
      _key: 'h3opt2',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'h3opt2a', text: 'Option 2: The 25% Installment Agreement (Section 603 of RETSL)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2a1', text: "Pennsylvania's Real Estate Tax Sale Law (72 P.S. § 5860.603) requires the Tax Claim Bureau to offer you a payment plan.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2b1', text: 'How it works:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2c',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2c1', text: 'Pay 25% of the total amount due upfront.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2d',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2d1', text: 'The Bureau removes your property from the sale list.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2e',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2e1', text: 'You pay the remaining 75% in no more than 3 installments over 12 months.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2f',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2f1', text: 'Example math:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2g',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2g1', text: '• $8,000 owed → $2,000 down → ~$500/month for 12 months', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2h',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2h1', text: '• $12,000 owed → $3,000 down → ~$750/month for 12 months', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2i',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2i1', text: '• $20,000 owed → $5,000 down → ~$1,250/month for 12 months', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2j',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2j1', text: 'Critical warnings:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2k',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2k1', text: '• Miss a single payment and you default', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2l',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2l1', text: "• After default, the Bureau must wait 90 days before selling — but then your property goes right back on the list", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2m',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2m1', text: '• If you default on an installment agreement, you cannot enter into a new one for 3 years (per Section 603)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2n',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2n1', text: "• The Bureau must notify you of this option — if they didn't, that's a legal challenge", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt2o',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt2o1', text: 'This is your best protection if you have some cash but not all of it.', marks: [] }
      ],
      markDefs: []
    },

    // Option 3
    {
      _type: 'block',
      _key: 'h3opt3',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'h3opt3a', text: 'Option 3: Hardship Agreement (10% Down)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt3a1', text: 'Berks County offers special assistance for genuine hardship cases.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt3b1', text: 'Requirements:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3c',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt3c1', text: '• Must be experiencing financial hardship due to health illness or injury', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3d',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt3d1', text: '• Must be a permanent resident of Pennsylvania', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3e',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt3e1', text: "• Must provide documentation (medical records, doctor's notes, etc.)", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3f',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt3f1', text: '• Must complete an application and potentially an interview', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3g',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt3g1', text: 'The benefit: ', marks: ['strong'] },
        { _type: 'span', _key: 'opt3g2', text: 'You may qualify for a 10% down payment instead of 25%.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3h',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt3h1', text: "This isn't automatic. You need to apply and prove your situation.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt3i',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt3i1', text: 'Ask the Tax Claim Bureau about the Delinquent Taxpayer Assistance Program.', marks: [] }
      ],
      markDefs: []
    },

    // Option 4
    {
      _type: 'block',
      _key: 'h3opt4',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'h3opt4a', text: 'Option 4: Call Your Mortgage Company Today', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt4a1', text: 'This sounds backwards.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt4b1', text: 'But your mortgage company is about to lose their entire investment.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4c',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt4c1', text: "If Berks County sells your house for $15,000 in back taxes, the bank's $100,000 mortgage gets completely wiped out.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4d',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt4d1', text: 'They lose everything.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4e',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt4e1', text: 'Banks hate that.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4f',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt4f1', text: 'What to do:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4g',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt4g1', text: 'Call your mortgage servicer.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4h',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt4h1', text: 'Say these exact words: "My property is scheduled for Judicial Tax Sale in Berks County, Pennsylvania. The sale wipes out your lien."', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4i',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt4i1', text: 'Watch how fast they respond.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4j',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt4j1', text: 'Most mortgage companies will pay your back taxes and add them to your loan balance.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt4k',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt4k1', text: 'Why? Because losing $12,000 in taxes is better than losing $100,000 in mortgage principal.', marks: [] }
      ],
      markDefs: []
    },

    // Option 5
    {
      _type: 'block',
      _key: 'h3opt5',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'h3opt5a', text: 'Option 5: File Exceptions (Legal Objections)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5a1', text: "If the Tax Claim Bureau didn't follow proper procedure, you can ask a judge to stop the sale.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5b1', text: 'The Bureau is required to (per RETSL Section 602):', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5c',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5c1', text: '• Mail notice via United States certified mail, restricted delivery, return receipt requested, at least 30 days before the sale', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5d',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5d1', text: '• Post notice on your property', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5e',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5e1', text: '• Publish the sale in two newspapers of general circulation', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5f',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5f1', text: '• Publish in the Berks County Law Journal', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5g',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5g1', text: '• For owner-occupied properties: personal service of written notice at least 10 days before the sale', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5h',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5h1', text: 'If they missed any step, the sale can be voided.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5i',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5i1', text: "Recent case law (Moreno v. Schuylkill County Tax Claim Bureau, 2024) shows courts will void sales when bureaus don't strictly comply.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5j',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5j1', text: 'Reality check:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5k',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5k1', text: '• This requires a lawyer', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5l',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5l1', text: '• It costs money', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5m',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5m1', text: "• It buys time but doesn't make the taxes disappear", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5n',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5n1', text: "• The Bureau rarely makes mistakes on Judicial Sales (they've already been through Upset Sale)", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt5o',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt5o1', text: 'Use this as a Hail Mary, not a primary strategy.', marks: [] }
      ],
      markDefs: []
    },

    // Option 6
    {
      _type: 'block',
      _key: 'h3opt6',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'h3opt6a', text: 'Option 6: Sell to a Cash Buyer Before the Sale', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6a1', text: "Sometimes the math just doesn't work.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6b1', text: 'You owe $25,000 in back taxes.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6c',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6c1', text: 'You have $0 in the bank.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6d',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6d1', text: "You don't qualify for hardship.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6e',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6e1', text: "Your mortgage company won't help.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6f',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6f1', text: 'What then?', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6g',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6g1', text: 'Sell the property before the sale date.', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6h',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6h1', text: "Here's how we handle it at ClearEdge Home Buyers:", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6i',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6i1', text: '1. You call us or fill out our form', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6j',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6j1', text: '2. We evaluate the property (condition, liens, equity)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6k',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6k1', text: '3. We make a cash offer that accounts for the back taxes', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6l',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6l1', text: '4. We close in as little as 7-14 days', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6m',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6m1', text: '5. We pay off 100% of the back taxes at closing', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6n',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6n1', text: '6. We pay off your mortgage', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6o',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6o1', text: '7. You keep whatever equity remains', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6p',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6p1', text: 'Compare the outcomes:', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6q',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6q1', text: '• Property sells at Judicial Sale: You get $0', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6r',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6r1', text: '• Sell to cash buyer before sale: Remaining equity after taxes/mortgage', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6s',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6s1', text: "If your house is worth $140,000, you owe $85,000 on the mortgage, and you have $18,000 in back taxes...", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6t',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6t1', text: 'At Judicial Sale: ', marks: ['strong'] },
        { _type: 'span', _key: 'opt6t2', text: 'You get $0.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6u',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6u1', text: 'Sell to us: ', marks: ['strong'] },
        { _type: 'span', _key: 'opt6u2', text: 'You could walk away with $25,000-$35,000 depending on condition.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6v',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6v1', text: "That's not nothing. That's a fresh start.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'opt6w',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'opt6w1', text: 'See how our 3-step process works →', marks: ['howItWorksLink'] }
      ],
      markDefs: [
        { _type: 'link', _key: 'howItWorksLink', href: '/how-it-works' }
      ]
    },

    // Real Story Section
    {
      _type: 'block',
      _key: 'h2story',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2storya', text: 'Real Story: A Reading Homeowner We Helped', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story1a', text: 'I want to share a real situation. Names changed for privacy.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story2a', text: "Maria's Story (19604 — Northeast Reading)", marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story3a', text: 'Maria inherited a row home on Moss Street from her mother.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story4a', text: 'She lived in New Jersey. Never lived in the house.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story5a', text: 'The property had:', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story6a', text: '• 3 years of back taxes ($14,200)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story7a', text: '• A small mortgage balance ($28,000)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story8a', text: '• Deferred maintenance (roof, plumbing)', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story9a', text: "• An active tenant who'd stopped paying rent", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story10a', text: 'She got the Judicial Sale notice and panicked.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story11a', text: "Called three agents. None would list it.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story12a', text: 'Too much work. Too many problems. Not enough time before the sale.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story13',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story13a', text: 'She found us through Google.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story14',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story14a', text: "Here's what we did:", marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story15',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story15a', text: '• Evaluated the property within 48 hours', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story16',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story16a', text: '• Made a cash offer of $52,000', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story17',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story17a', text: '• Closed in 11 days', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story18',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story18a', text: '• Paid off all $14,200 in back taxes at closing', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story19',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story19a', text: '• Paid off the $28,000 mortgage', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story20',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story20a', text: '• Handed Maria a check for $8,400', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story21',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story21a', text: 'Not life-changing money. But she kept her credit intact. Avoided the tax sale. And walked away with something instead of nothing.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'story22',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'story22a', text: 'The alternative? Watching the house sell at auction for $14,500 (just above the tax debt) while she got $0.', marks: [] }
      ],
      markDefs: []
    },

    // Zip Code Section
    {
      _type: 'block',
      _key: 'h2zip',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2zipa', text: 'Zip Code Breakdown: Where Tax Sales Hit Hardest in Berks County', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'zip1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'zip1a', text: 'Let me get specific about the Reading areas most affected.', marks: [] }
      ],
      markDefs: []
    },

    // 19604
    {
      _type: 'block',
      _key: 'h319604',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'h319604a', text: '19604 — Northeast Reading / Hampden Heights', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'zip19604a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'zip19604a1', text: 'Neighborhoods: ', marks: ['strong'] },
        { _type: 'span', _key: 'zip19604a2', text: 'Northeast Reading, Hampden Heights, areas near Reading High School and Albright College', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'zip19604b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'zip19604b1', text: 'Median home value: ~$128,000 | Median household income: ~$52,800 | Poverty rate: 15.8%', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'zip19604c',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'zip19604c1', text: 'Tax sale reality: ', marks: ['strong'] },
        { _type: 'span', _key: 'zip19604c2', text: 'Lower home values mean even modest tax debts can wipe out equity fast. A $12,000 tax bill on a $100,000 house represents 12% of the value.', marks: [] }
      ],
      markDefs: []
    },

    // 19601
    {
      _type: 'block',
      _key: 'h319601',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'h319601a', text: '19601 — Center City / Downtown Reading', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'zip19601a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'zip19601a1', text: 'Median home value: ~$133,000 | Median household income: ~$41,100 | Poverty rate: 24.2%', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'zip19601b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'zip19601b1', text: 'Tax sale reality: ', marks: ['strong'] },
        { _type: 'span', _key: 'zip19601b2', text: 'Many properties here are older with deferred maintenance. Traditional buyers are scarce because conventional financing is hard to get. Cash buyers dominate this market.', marks: [] }
      ],
      markDefs: []
    },

    // 19602
    {
      _type: 'block',
      _key: 'h319602',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'h319602a', text: '19602 — South Reading / Downtown South', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'zip19602a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'zip19602a1', text: 'Median home value: ~$101,000 (lowest in the Reading area) | Median household income: ~$38,200', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'zip19602b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'zip19602b1', text: 'Tax sale reality: ', marks: ['strong'] },
        { _type: 'span', _key: 'zip19602b2', text: "Your equity window is smaller. The gap between tax debt and property value is often narrow. If you're going to act, act fast.", marks: [] }
      ],
      markDefs: []
    },

    // 19607
    {
      _type: 'block',
      _key: 'h319607',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'h319607a', text: '19607 — Shillington / Kenhorst / Governor Mifflin Area', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'zip19607a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'zip19607a1', text: 'Median home value: ~$210,000-$238,000 | Median household income: ~$80,500 | Poverty rate: ~6-8%', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'zip19607b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'zip19607b1', text: 'Tax sale reality: ', marks: ['strong'] },
        { _type: 'span', _key: 'zip19607b2', text: "Higher values mean more equity at stake. If your property is on the Judicial Sale list, you're leaving serious money on the table.", marks: [] }
      ],
      markDefs: []
    },

    // 19608
    {
      _type: 'block',
      _key: 'h319608',
      style: 'h3',
      children: [
        { _type: 'span', _key: 'h319608a', text: '19608 — Sinking Spring / Spring Township / Wilson School District', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'zip19608a',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'zip19608a1', text: 'Median home value: ~$311,000-$354,000 | Median household income: ~$112,000', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'zip19608b',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'zip19608b1', text: 'Tax sale reality: ', marks: ['strong'] },
        { _type: 'span', _key: 'zip19608b2', text: 'Properties in 19608 almost never make it to Judicial Sale. If you somehow ended up on the list, you are sitting on substantial equity — likely $100,000+ even in a distressed situation. Do whatever it takes to stop the sale.', marks: [] }
      ],
      markDefs: []
    },

    // $250 Fee Section
    {
      _type: 'block',
      _key: 'h2fee',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2feea', text: 'The $250 Demolition Fund Fee: New for 2026', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fee1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'fee1a', text: 'Starting January 1, 2026, Berks County added a mandatory $250 fee to every property sold at tax sale or Sheriff\'s sale.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fee2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'fee2a', text: 'This fee supports the new County Demolition and Rehabilitation Fund.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'fee3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'fee3a', text: "What it signals: ", marks: ['strong'] },
        { _type: 'span', _key: 'fee3b', text: "The county is taking a harder stance on problem properties. Handle your taxes, or we'll handle your property.", marks: [] }
      ],
      markDefs: []
    },

    // Can I Buy Back
    {
      _type: 'block',
      _key: 'h2buyback',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2buybacka', text: 'Can I Buy My Own House Back at the Sale?', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'buyback1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'buyback1a', text: 'No.', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'buyback2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'buyback2a', text: "Pennsylvania's Real Estate Tax Sale Law specifically prohibits delinquent property owners from bidding on their own property.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'buyback3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'buyback3a', text: "You cannot bid directly, have a family member bid for you, use an LLC or shell company to buy it back, or have a friend buy it and transfer it to you later.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'buyback4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'buyback4a', text: "Don't try to game the system. Find a legitimate solution before the sale.", marks: [] }
      ],
      markDefs: []
    },

    // Redemption Period
    {
      _type: 'block',
      _key: 'h2redeem',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2redeema', text: 'What About After the Sale? Is There a Redemption Period?', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'redeem1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'redeem1a', text: 'No.', marks: ['strong'] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'redeem2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'redeem2a', text: 'This is critical: ', marks: ['strong'] },
        { _type: 'span', _key: 'redeem2b', text: 'Pennsylvania has NO redemption period after a Judicial Tax Sale.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'redeem3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'redeem3a', text: 'The Real Estate Tax Sale Law (RETSL) expressly prohibits redemption once the sale is confirmed.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'redeem4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'redeem4a', text: 'For you, the window closes at the Judicial Sale.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'redeem5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'redeem5a', text: "Once that deed is recorded to the new owner, it's over.", marks: [] }
      ],
      markDefs: []
    },

    // What to Do Right Now
    {
      _type: 'block',
      _key: 'h2action',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2actiona', text: 'What to Do Right Now', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'action1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'action1a', text: "Don't wait until May.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'action2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'action2a', text: "Here's your action plan:", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'action3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'action3a', text: 'Step 1: ', marks: ['strong'] },
        { _type: 'span', _key: 'action3b', text: 'Go to the Tax Claim Bureau at 633 Court Street, Reading TODAY. Ask for your total payoff amount in writing.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'action4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'action4a', text: 'Step 2: ', marks: ['strong'] },
        { _type: 'span', _key: 'action4b', text: 'Evaluate your options honestly. Can you pay in full? Can you come up with 25%? Do you qualify for hardship?', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'action5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'action5a', text: 'Step 3: ', marks: ['strong'] },
        { _type: 'span', _key: 'action5b', text: 'Call your mortgage company. Tell them: "My property is scheduled for Judicial Tax Sale in Berks County."', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'action6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'action6a', text: 'Step 4: ', marks: ['strong'] },
        { _type: 'span', _key: 'action6b', text: "If none of that works, call us. We've helped dozens of Berks County homeowners stop tax sales by buying their properties for cash before the auction.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'action7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'action7a', text: "It's not the outcome you wanted — but it's infinitely better than watching your house sell for pennies while you walk away with nothing.", marks: [] }
      ],
      markDefs: []
    },

    // CTA
    {
      _type: 'block',
      _key: 'h2cta',
      style: 'h2',
      children: [
        { _type: 'span', _key: 'h2ctaa', text: 'Get a Free Cash Offer', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cta1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cta1a', text: 'Want to see what your property is worth?', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cta2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cta2a', text: 'No obligation. No pressure. No games.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cta3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cta3a', text: 'Just real numbers so you can make an informed decision.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'cta4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'cta4a', text: 'Request your free cash offer here →', marks: ['homeLink'] }
      ],
      markDefs: [
        { _type: 'link', _key: 'homeLink', href: 'https://clearedgehomebuyers.com' }
      ]
    },

    // Bottom Line
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
        { _type: 'span', _key: 'bottom1a', text: "Here's exactly how to stop Berks County Judicial Sale 2026:", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom2',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom2a', text: '1. ', marks: ['strong'] },
        { _type: 'span', _key: 'bottom2b', text: 'Pay in full before the sale date', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom3',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom3a', text: '2. ', marks: ['strong'] },
        { _type: 'span', _key: 'bottom3b', text: 'Enter a 25% installment agreement and stick to the payment schedule', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom4',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom4a', text: '3. ', marks: ['strong'] },
        { _type: 'span', _key: 'bottom4b', text: 'Apply for hardship assistance (10% down) if you qualify', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom5',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom5a', text: '4. ', marks: ['strong'] },
        { _type: 'span', _key: 'bottom5b', text: 'Get your mortgage company to pay the taxes and add them to your loan', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom6',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom6a', text: '5. ', marks: ['strong'] },
        { _type: 'span', _key: 'bottom6b', text: "File legal exceptions if the Bureau didn't follow proper procedure", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom7',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom7a', text: '6. ', marks: ['strong'] },
        { _type: 'span', _key: 'bottom7b', text: 'Sell to a cash buyer and capture your equity before it evaporates', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom8',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom8a', text: 'The worst thing you can do is nothing.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom9',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom9a', text: 'The second worst thing is waiting until May.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom10',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom10a', text: 'The Judicial Sale will happen in June 2026. The clock is running.', marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom11',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom11a', text: "If you need help — or just want to understand your options — reach out. We've been doing this since 2016, and we've seen every situation you can imagine.", marks: [] }
      ],
      markDefs: []
    },
    {
      _type: 'block',
      _key: 'bottom12',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bottom12a', text: "That's exactly how to stop Berks County Judicial Sale 2026.", marks: ['strong'] }
      ],
      markDefs: []
    },

    // Author bio
    {
      _type: 'block',
      _key: 'bio1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'bio1a', text: "Tyler Swenson is the founder of ClearEdge Home Buyers, a cash home buying company serving Eastern Pennsylvania since 2016. He built the business from the ground up starting with a single duplex in Scranton. Since then, he has helped over 200 homeowners sell their properties quickly — including many facing tax sales, foreclosures, and other distressed situations. Tyler has been featured in The Morning Call and Lehigh Valley Business, and regularly speaks at REIA meetups throughout Eastern PA. His free guides on selling distressed properties have been downloaded by over 5,000 Pennsylvania homeowners.", marks: ['em'] }
      ],
      markDefs: []
    }
  ],

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
    const locationSlugs = ['berks-county', 'reading']
    const locations = await client.fetch(
      `*[_type == "location" && slug.current in $slugs]{ _id, slug }`,
      { slugs: locationSlugs }
    )
    console.log('Found locations:', locations.map(l => l.slug.current))

    // Fetch situation references
    console.log('\nFetching situation references...')
    const situationSlugs = ['tax-issues', 'delinquent-taxes', 'foreclosure', 'pre-foreclosure']
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
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/how-to-stop-berks-county-judicial-sale-2026')

  } catch (error) {
    console.error('Error creating blog post:', error)
    process.exit(1)
  }
}

createBlogPost()
