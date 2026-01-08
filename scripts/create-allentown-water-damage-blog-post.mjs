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

// Helper to create a text block
const textBlock = (key, text, style = 'normal') => ({
  _type: 'block',
  _key: key,
  style,
  children: [{ _type: 'span', _key: `${key}s1`, text, marks: [] }],
  markDefs: []
})

// Helper to create a block with mixed content (bold, links, etc.)
const mixedBlock = (key, children, markDefs = [], style = 'normal') => ({
  _type: 'block',
  _key: key,
  style,
  children: children.map((child, i) => ({
    _type: 'span',
    _key: `${key}s${i}`,
    text: child.text,
    marks: child.marks || []
  })),
  markDefs
})

const blogPost = {
  _type: 'blogPost',
  title: 'Selling a Water-Damaged House in 18102 With Mold Issues: Your Complete Guide to Getting Out Fast',
  slug: { _type: 'slug', current: 'selling-water-damaged-house-18102-mold-issues' },
  metaTitle: 'Selling a Water-Damaged House in 18102 With Mold Issues | Cash Offer in 24hrs',
  metaDescription: 'Got water damage and mold in your Allentown 18102 home? Learn your selling options, PA disclosure laws, and how to get a fair cash offer in 24 hours. No repairs needed.',
  excerpt: 'Got water damage and mold in your Allentown 18102 home? Learn your selling options, PA disclosure laws, and how to get a fair cash offer fast. No repairs needed.',
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2025-10-28T10:00:00Z',
  category: 'situations',

  faqs: [
    {
      _key: 'faq1',
      question: 'Can I sell my house if it has active mold?',
      answer: 'Yes. You can absolutely sell a house with active mold in Pennsylvania. You must disclose the mold to any buyer, but there\'s no law requiring you to remediate before selling. Cash buyers like us purchase homes with active mold regularly.'
    },
    {
      _key: 'faq2',
      question: 'How much does water damage reduce home value?',
      answer: 'It depends on severity. Minor water staining might reduce value 5-10%. Significant damage with mold can reduce value 20-40% or more. In extreme cases with structural damage, reductions of 50%+ are possible.'
    },
    {
      _key: 'faq3',
      question: 'Do I need to fix water damage before selling?',
      answer: 'No. You can sell as-is without making any repairs. You must still disclose all known issues, but the buyer takes on responsibility for repairs. This is a common approach when selling to investors or cash home buyers.'
    },
    {
      _key: 'faq4',
      question: 'Will my homeowner\'s insurance cover mold remediation?',
      answer: 'Usually only if the mold resulted from a covered peril like a burst pipe or sudden storm damage. Insurance typically doesn\'t cover mold from gradual leaks, poor maintenance, or flooding from natural disasters (that requires separate flood insurance).'
    },
    {
      _key: 'faq5',
      question: 'How fast can you close on a water-damaged house?',
      answer: 'At ClearEdge Home Buyers, we can close in as little as 7 days. We handle all paperwork, pay any outstanding liens from proceeds, and work around your schedule. No bank approvals, no appraisal delays.'
    },
    {
      _key: 'faq6',
      question: 'What if I already paid for mold remediation?',
      answer: 'You still must disclose the history of mold and remediation work. Keep all documentation, receipts, and certificates from the remediation company. This shows buyers the work was done professionally, but many traditional buyers will still be hesitant.'
    },
    {
      _key: 'faq7',
      question: 'Do you buy houses with foundation damage from water?',
      answer: 'Yes. We buy houses with foundation issues, structural damage, water damage, mold, and virtually any other condition. Our team evaluates each property individually and makes a fair cash offer based on the actual scope of repairs needed.'
    },
    {
      _key: 'faq8',
      question: 'How do you calculate your offer on a damaged house?',
      answer: 'We look at the after-repair value based on comparable sales in your neighborhood, subtract our estimated repair costs, and factor in carrying costs and reasonable profit margin. The result is a fair cash offer that lets you walk away quickly without any repair burden.'
    }
  ],

  content: [
    // Intro
    mixedBlock('intro1', [
      { text: 'Selling a water-damaged house in 18102 with mold issues', marks: ['strong'] },
      { text: ' feels impossible when you\'re staring at those basement stains and smelling that musty air.' }
    ]),
    textBlock('intro2', 'I get it.'),
    textBlock('intro3', 'You\'re probably thinking: "Who\'s gonna buy this mess?"'),
    textBlock('intro4', 'Here\'s the truth.'),
    textBlock('intro5', 'I\'m Tyler Swenson, founder of ClearEdge Home Buyers.'),
    textBlock('intro6', 'Since 2016, I\'ve helped over 200 Eastern Pennsylvania homeowners sell properties in every condition imaginable.'),
    textBlock('intro7', 'Water damage.'),
    textBlock('intro8', 'Mold.'),
    textBlock('intro9', 'Flooded basements.'),
    textBlock('intro10', 'All of it.'),
    textBlock('intro11', 'And Allentown\'s 18102 zip code?'),
    textBlock('intro12', 'I know it well.'),
    textBlock('intro13', 'Those pre-war rowhouses.'),
    textBlock('intro14', 'Those brick foundations that act like sponges.'),
    textBlock('intro15', 'Those block walls that let water seep through every spring.'),
    textBlock('intro16', 'Let me show you exactly what you\'re dealing with and how to get out of this situation fast.'),

    // H2: Why 18102 Vulnerable
    textBlock('h2vuln', 'Why 18102 Properties Are Especially Vulnerable to Water Damage', 'h2'),
    textBlock('vuln1', 'Here\'s something most people don\'t realize about the 18102 zip code.'),
    textBlock('vuln2', 'Over 64% of homes in neighborhoods like Old Allentown and 1st Ward were built before 1939.'),
    textBlock('vuln3', 'In Old Fairgrounds?'),
    textBlock('vuln4', 'That number jumps to nearly 78%.'),
    textBlock('vuln5', 'These aren\'t cookie-cutter suburban homes.'),
    textBlock('vuln6', 'They\'re historic brick rowhouses with block foundations.'),
    textBlock('vuln7', 'Beautiful character.'),
    textBlock('vuln8', 'But terrible at keeping water out.'),
    mixedBlock('vuln9', [{ text: 'Common water entry points in 18102 homes:', marks: ['strong'] }]),
    mixedBlock('vuln10', [
      { text: '• ' },
      { text: 'Brick foundations', marks: ['strong'] },
      { text: ' – Brick absorbs moisture like a sponge' }
    ]),
    mixedBlock('vuln11', [
      { text: '• ' },
      { text: 'Block basement walls', marks: ['strong'] },
      { text: ' – Mortar joints crack and let water seep' }
    ]),
    mixedBlock('vuln12', [
      { text: '• ' },
      { text: 'Old plumbing', marks: ['strong'] },
      { text: ' – Cast iron pipes corrode after decades' }
    ]),
    mixedBlock('vuln13', [
      { text: '• ' },
      { text: 'Poor grading', marks: ['strong'] },
      { text: ' – Yards slope toward the house, not away' }
    ]),
    mixedBlock('vuln14', [
      { text: '• ' },
      { text: 'Aging gutters', marks: ['strong'] },
      { text: ' – Clogged or missing gutters dump water at the foundation' }
    ]),
    textBlock('vuln15', 'Add in the Lehigh Valley\'s notorious spring storms?'),
    textBlock('vuln16', 'The flooding events that hit Hamilton Street and Cedar Creek?'),
    textBlock('vuln17', 'It\'s no wonder I get calls from 18102 homeowners every week dealing with wet basements.'),

    // H2: Real Cost
    textBlock('h2cost', 'The Real Cost of Water Damage and Mold in Your Allentown Home', 'h2'),
    textBlock('cost1', 'Let\'s talk numbers.'),
    textBlock('cost2', 'Because this is where most sellers start panicking.'),
    mixedBlock('cost3', [{ text: 'Water damage restoration costs:', marks: ['strong'] }]),
    textBlock('cost4', '• Minor water damage: $1,200-$3,000'),
    textBlock('cost5', '• Flooded basement cleanup: $2,000-$10,000'),
    textBlock('cost6', '• Major flood with structural damage: $10,000-$50,000+'),
    mixedBlock('cost7', [{ text: 'Mold remediation costs:', marks: ['strong'] }]),
    textBlock('cost8', '• Small area (less than 10 sq ft): $500-$1,500'),
    textBlock('cost9', '• Moderate spread: $1,500-$6,000'),
    textBlock('cost10', '• Whole-home remediation: $10,000-$30,000'),
    textBlock('cost11', 'That\'s just to fix the problem.'),
    textBlock('cost12', 'It doesn\'t include the root cause.'),
    textBlock('cost13', 'Waterproofing your basement?'),
    textBlock('cost14', 'Add another $5,000-$15,000.'),
    textBlock('cost15', 'New French drain system?'),
    textBlock('cost16', '$3,000-$8,000.'),
    textBlock('cost17', 'Sump pump installation?'),
    textBlock('cost18', '$600-$2,500.'),
    textBlock('cost19', 'See how fast this adds up?'),
    textBlock('cost20', 'And here\'s the kicker.'),
    textBlock('cost21', 'Even after you spend $15,000-$40,000 fixing everything, you\'re STILL required to disclose the history of water damage and mold to any buyer.'),
    textBlock('cost22', 'That\'s Pennsylvania law.'),

    // H2: PA Disclosure Law
    textBlock('h2disc', 'Pennsylvania\'s Disclosure Law: What You MUST Tell Buyers', 'h2'),
    textBlock('disc1', 'Let\'s be crystal clear about this.'),
    textBlock('disc2', 'Pennsylvania\'s Real Estate Seller Disclosure Law (68 Pa.C.S. §§ 7301-7314) requires you to disclose ALL known material defects.'),
    textBlock('disc3', 'This includes:'),
    mixedBlock('disc4', [
      { text: '• ' },
      { text: 'Current water damage', marks: ['strong'] },
      { text: ' – active leaks, standing water' }
    ]),
    mixedBlock('disc5', [
      { text: '• ' },
      { text: 'Past water damage', marks: ['strong'] },
      { text: ' – even if it happened 20 years ago' }
    ]),
    mixedBlock('disc6', [
      { text: '• ' },
      { text: 'Mold history', marks: ['strong'] },
      { text: ' – even if it was professionally remediated' }
    ]),
    mixedBlock('disc7', [
      { text: '• ' },
      { text: 'Conditions that could lead to mold', marks: ['strong'] },
      { text: ' – humidity issues, poor ventilation' }
    ]),
    mixedBlock('disc8', [
      { text: '• ' },
      { text: 'Any remediation work performed', marks: ['strong'] },
      { text: ' – and who did it' }
    ]),
    textBlock('disc9', 'One storm in 2011 caused water to seep under your side door?'),
    textBlock('disc10', 'Disclose it.'),
    textBlock('disc11', 'Minor leak from old plumbing that you fixed yourself?'),
    textBlock('disc12', 'Disclose it.'),
    textBlock('disc13', 'The Pennsylvania Association of Realtors is clear: the word "any" means exactly what it says.'),
    mixedBlock('disc14', [{ text: 'What happens if you don\'t disclose?', marks: ['strong'] }]),
    textBlock('disc15', '• Buyers can sue for repair costs'),
    textBlock('disc16', '• You could face treble damages (3x the actual damage)'),
    textBlock('disc17', '• Lawsuits can be filed within 2 years of closing'),
    textBlock('disc18', '• You could lose far more than you saved'),
    textBlock('disc19', 'I\'ve seen sellers try to hide water damage.'),
    textBlock('disc20', 'Paint over stains.'),
    textBlock('disc21', 'Cover mold with drywall.'),
    textBlock('disc22', 'It never works.'),
    textBlock('disc23', 'Home inspectors find this stuff.'),
    textBlock('disc24', 'And then the deal falls apart, or worse, you get sued after closing.'),

    // H2: How It Affects Value
    textBlock('h2value', 'How Water Damage and Mold Affect Your Home\'s Value in 18102', 'h2'),
    textBlock('val1', 'Let\'s talk about what your house is actually worth with these issues.'),
    textBlock('val2', 'The median home value in 18102 sits around $140,000-$160,000.'),
    textBlock('val3', 'Lower than Allentown\'s overall average.'),
    textBlock('val4', 'Now factor in water damage and mold.'),
    mixedBlock('val5', [{ text: 'Typical value reductions:', marks: ['strong'] }]),
    textBlock('val6', '• Minor water staining, no mold: 5-10% reduction'),
    textBlock('val7', '• Moderate water damage with some mold: 10-20% reduction'),
    textBlock('val8', '• Significant damage requiring major remediation: 20-40% reduction'),
    textBlock('val9', '• Severe structural damage with extensive mold: 40-50%+ reduction'),
    textBlock('val10', 'So that $150,000 house with a wet basement and mold in the walls?'),
    textBlock('val11', 'You\'re looking at maybe $90,000-$120,000 on the open market.'),
    textBlock('val12', 'And that\'s IF you can find a buyer.'),
    textBlock('val13', 'Because here\'s the other problem.'),
    textBlock('val14', 'Most buyers in the $100,000-$200,000 range are using FHA or conventional loans.'),
    textBlock('val15', 'And those lenders?'),
    textBlock('val16', 'They don\'t finance houses with active water damage or visible mold.'),
    textBlock('val17', 'The appraisal kills the deal.'),

    // H2: Three Options
    textBlock('h2opt', 'Your Three Options for Selling a Water-Damaged House in 18102', 'h2'),
    textBlock('opt1', 'You\'ve got three paths forward.'),
    textBlock('opt2', 'Each has tradeoffs.'),
    textBlock('h3opt1', 'Option 1: Fix Everything, Then Sell Traditionally', 'h3'),
    mixedBlock('opt1a', [{ text: 'Pros:', marks: ['strong'] }]),
    textBlock('opt1b', '• Maximize sale price'),
    textBlock('opt1c', '• Broader buyer pool'),
    textBlock('opt1d', '• Faster closing once listed'),
    mixedBlock('opt1e', [{ text: 'Cons:', marks: ['strong'] }]),
    textBlock('opt1f', '• $15,000-$40,000+ in upfront repair costs'),
    textBlock('opt1g', '• 2-4 months for remediation work'),
    textBlock('opt1h', '• Still must disclose history'),
    textBlock('opt1i', '• No guarantee repairs increase value dollar-for-dollar'),
    textBlock('opt1j', 'This makes sense if:'),
    textBlock('opt1k', '• You have cash reserves for repairs'),
    textBlock('opt1l', '• You\'re not in a hurry'),
    textBlock('opt1m', '• The damage is relatively minor'),
    textBlock('opt1n', '• You can live elsewhere during remediation'),
    textBlock('h3opt2', 'Option 2: List As-Is With Full Disclosure', 'h3'),
    mixedBlock('opt2a', [{ text: 'Pros:', marks: ['strong'] }]),
    textBlock('opt2b', '• No upfront repair costs'),
    textBlock('opt2c', '• Faster time to market'),
    textBlock('opt2d', '• Attracts investors and flippers'),
    mixedBlock('opt2e', [{ text: 'Cons:', marks: ['strong'] }]),
    textBlock('opt2f', '• Drastically reduced price'),
    textBlock('opt2g', '• Limited buyer pool'),
    textBlock('opt2h', '• Longer time on market'),
    textBlock('opt2i', '• Endless lowball offers'),
    textBlock('opt2j', '• Buyers still want concessions at closing'),
    textBlock('opt2k', 'Here\'s what actually happens when you list a water-damaged house on the MLS.'),
    textBlock('opt2l', 'Most buyers scroll right past.'),
    textBlock('opt2m', 'The few who look want 30-40% off.'),
    textBlock('opt2n', 'Then during inspection, they find MORE issues.'),
    textBlock('opt2o', 'Now they want another $10,000 credit.'),
    textBlock('opt2p', 'You\'re stuck negotiating for months while the house sits.'),
    textBlock('h3opt3', 'Option 3: Sell Direct to a Cash Home Buyer', 'h3'),
    mixedBlock('opt3a', [{ text: 'Pros:', marks: ['strong'] }]),
    textBlock('opt3b', '• No repairs needed'),
    textBlock('opt3c', '• No showings or open houses'),
    textBlock('opt3d', '• Close in 7-14 days'),
    textBlock('opt3e', '• Cash in hand quickly'),
    textBlock('opt3f', '• No financing contingencies'),
    textBlock('opt3g', '• No appraisal issues'),
    mixedBlock('opt3h', [{ text: 'Cons:', marks: ['strong'] }]),
    textBlock('opt3i', '• Lower sale price than full retail'),
    textBlock('opt3j', '• Must research buyer legitimacy'),
    textBlock('opt3k', 'This is what I do at ClearEdge Home Buyers.'),
    textBlock('opt3l', 'We buy houses with water damage, mold, and every other issue you can imagine.'),
    textBlock('opt3m', 'No repairs.'),
    textBlock('opt3n', 'No cleaning.'),
    textBlock('opt3o', 'No waiting.'),
    textBlock('opt3p', 'We handle the disclosure paperwork.'),
    textBlock('opt3q', 'We pay the lien payoffs at closing.'),
    textBlock('opt3r', 'You walk away with cash.'),

    // H2: How We Buy
    textBlock('h2how', 'How We Buy Water-Damaged Houses in 18102', 'h2'),
    textBlock('how1', 'Here\'s exactly how our process works.'),
    mixedBlock('how2', [{ text: 'Step 1: You contact us', marks: ['strong'] }]),
    mixedBlock('how3', [
      { text: 'Call or fill out the form at ' },
      { text: 'clearedgehomebuyers.com', marks: ['homeLink'] },
      { text: '.' }
    ], [{ _type: 'link', _key: 'homeLink', href: '/' }]),
    textBlock('how4', 'Tell us about your property.'),
    textBlock('how5', 'Water damage, mold, structural issues – all of it.'),
    textBlock('how6', 'We don\'t scare easily.'),
    mixedBlock('how7', [{ text: 'Step 2: We evaluate', marks: ['strong'] }]),
    textBlock('how8', 'We\'ll visit your 18102 property.'),
    textBlock('how9', 'Look at the water damage.'),
    textBlock('how10', 'Assess the mold situation.'),
    textBlock('how11', 'Check the foundation, basement, and structure.'),
    textBlock('how12', 'This isn\'t an inspection to nitpick.'),
    textBlock('how13', 'It\'s to understand exactly what we\'re buying.'),
    mixedBlock('how14', [{ text: 'Step 3: Cash offer within 24 hours', marks: ['strong'] }]),
    textBlock('how15', 'We give you a fair cash offer based on:'),
    textBlock('how16', '• Current condition'),
    textBlock('how17', '• Repair costs we\'ll absorb'),
    textBlock('how18', '• Local market values'),
    textBlock('how19', '• Recent comparable sales'),
    textBlock('how20', 'No obligation.'),
    textBlock('how21', 'No pressure.'),
    textBlock('how22', 'If it works for you, great.'),
    textBlock('how23', 'If not, no hard feelings.'),
    mixedBlock('how24', [{ text: 'Step 4: Close on your timeline', marks: ['strong'] }]),
    textBlock('how25', 'Need to close in 7 days?'),
    textBlock('how26', 'We can do that.'),
    textBlock('how27', 'Need 30 days to sort out logistics?'),
    textBlock('how28', 'That works too.'),
    textBlock('how29', 'We work around YOUR schedule.'),
    mixedBlock('how30', [
      { text: 'Learn more about our simple 3-step process here: ' },
      { text: 'How It Works', marks: ['howLink'] }
    ], [{ _type: 'link', _key: 'howLink', href: '/how-it-works' }]),

    // H2: Hidden Danger
    textBlock('h2danger', 'The Hidden Danger: Why Waiting Makes Things Worse', 'h2'),
    textBlock('dang1', 'Here\'s what happens when you ignore water damage and mold.'),
    mixedBlock('dang2', [{ text: 'Within 24-48 hours of water exposure:', marks: ['strong'] }]),
    textBlock('dang3', '• Mold spores begin colonizing'),
    textBlock('dang4', '• Drywall starts absorbing moisture'),
    textBlock('dang5', '• Wood begins to swell'),
    mixedBlock('dang6', [{ text: 'Within 1-2 weeks:', marks: ['strong'] }]),
    textBlock('dang7', '• Mold spreads behind walls'),
    textBlock('dang8', '• Musty odors intensify'),
    textBlock('dang9', '• Secondary damage compounds'),
    mixedBlock('dang10', [{ text: 'Within 1-3 months:', marks: ['strong'] }]),
    textBlock('dang11', '• Structural wood begins rotting'),
    textBlock('dang12', '• Mold penetrates deep into porous materials'),
    textBlock('dang13', '• Remediation costs multiply'),
    mixedBlock('dang14', [{ text: 'Within 6-12 months:', marks: ['strong'] }]),
    textBlock('dang15', '• Major structural damage possible'),
    textBlock('dang16', '• Foundation issues accelerate'),
    textBlock('dang17', '• Property becomes increasingly difficult to sell'),
    textBlock('dang18', 'Every month you wait, the problem gets worse.'),
    textBlock('dang19', 'And more expensive.'),
    textBlock('dang20', 'That basement leak you\'re ignoring?'),
    textBlock('dang21', 'It\'s not going away on its own.'),

    // H2: Mold Types
    textBlock('h2mold', 'Understanding Mold Types in Lehigh Valley Homes', 'h2'),
    textBlock('mold1', 'Not all mold is created equal.'),
    textBlock('mold2', 'Here\'s what I typically see in 18102 properties:'),
    mixedBlock('mold3', [{ text: 'Aspergillus', marks: ['strong'] }, { text: ' – Most common. Found in damp basements and bathrooms. Causes allergic reactions.' }]),
    mixedBlock('mold4', [{ text: 'Penicillium', marks: ['strong'] }, { text: ' – Blue or green. Spreads fast in water-damaged areas. Strong allergen.' }]),
    mixedBlock('mold5', [{ text: 'Cladosporium', marks: ['strong'] }, { text: ' – Olive-green or brown. Grows on painted surfaces and ducts.' }]),
    mixedBlock('mold6', [{ text: 'Stachybotrys (Black Mold)', marks: ['strong'] }, { text: ' – The infamous one. Less common but produces mycotoxins. Requires professional remediation.' }]),
    textBlock('mold7', 'Here\'s the thing.'),
    textBlock('mold8', 'For selling purposes, it doesn\'t matter much which type you have.'),
    textBlock('mold9', 'ANY visible mold scares traditional buyers.'),
    textBlock('mold10', 'ANY mold requires disclosure.'),
    textBlock('mold11', 'And ANY mold remediation costs thousands.'),
    textBlock('mold12', 'The type affects remediation approach, but from a selling standpoint, mold is mold.'),

    // H2: Why Traditional Buyers Run
    textBlock('h2run', 'Why Traditional Buyers Run From Water-Damaged Homes', 'h2'),
    textBlock('run1', 'Put yourself in a traditional buyer\'s shoes.'),
    textBlock('run2', 'They\'re pre-approved for $175,000.'),
    textBlock('run3', 'They find your 18102 rowhouse listed at $145,000.'),
    textBlock('run4', 'Great price for the neighborhood.'),
    textBlock('run5', 'Then they read the disclosure.'),
    textBlock('run6', '"History of basement water intrusion."'),
    textBlock('run7', '"Mold remediation performed in 2023."'),
    textBlock('run8', 'Immediately, their mind races:'),
    textBlock('run9', '• "What if it comes back?"'),
    textBlock('run10', '• "What else is wrong?"'),
    textBlock('run11', '• "Will my lender approve this?"'),
    textBlock('run12', '• "What will the inspection find?"'),
    textBlock('run13', '• "Is this house going to make my family sick?"'),
    textBlock('run14', 'Even if you\'ve spent $15,000 fixing everything, they\'re spooked.'),
    textBlock('run15', 'They move on to the next listing.'),
    textBlock('run16', 'The ones who DO make offers?'),
    textBlock('run17', 'They want massive discounts.'),
    textBlock('run18', 'Because they\'re taking on perceived risk.'),
    textBlock('run19', 'And they\'ll use every inspection finding to negotiate you down further.'),
    textBlock('run20', 'This is why selling direct to a cash buyer like us makes sense.'),
    textBlock('run21', 'We\'re not emotional about water damage.'),
    textBlock('run22', 'We deal with it every week.'),
    textBlock('run23', 'We know exactly what it costs to fix.'),
    textBlock('run24', 'And we price our offers accordingly, without the drama.'),

    // H2: Real Talk 18102
    textBlock('h2real', 'Real Talk: What Makes 18102 Challenging (and Valuable)', 'h2'),
    mixedBlock('real1', [
      { text: 'The 18102 zip code covers some of ' },
      { text: 'Allentown\'s', marks: ['allentownLink'] },
      { text: ' most interesting neighborhoods.' }
    ], [{ _type: 'link', _key: 'allentownLink', href: '/locations/allentown' }]),
    mixedBlock('real2', [{ text: 'Old Allentown Historic District', marks: ['strong'] }, { text: ' – Victorian charm, walkable streets' }]),
    mixedBlock('real3', [{ text: 'Old Fairgrounds', marks: ['strong'] }, { text: ' – Pre-war character homes' }]),
    mixedBlock('real4', [{ text: '1st Ward', marks: ['strong'] }, { text: ' – Dense urban living near downtown' }]),
    mixedBlock('real5', [{ text: 'Center City', marks: ['strong'] }, { text: ' – Commercial corridor access' }]),
    textBlock('real6', 'These areas have real appeal.'),
    textBlock('real7', 'The housing stock has character you can\'t find in suburbs.'),
    textBlock('real8', 'But the older construction means ongoing maintenance challenges.'),
    mixedBlock('real9', [{ text: '18102 by the numbers:', marks: ['strong'] }]),
    textBlock('real10', '• Population: ~51,000'),
    textBlock('real11', '• Median household income: ~$40,000'),
    textBlock('real12', '• Median home value: ~$145,000'),
    textBlock('real13', '• Homes built before 1939: 64-78% (depending on neighborhood)'),
    textBlock('real14', '• Rental rate: ~65% renters'),
    textBlock('real15', '• Property tax rate: ~2% of assessed value'),
    textBlock('real16', 'The lower price points attract investors.'),
    textBlock('real17', 'The rental demand creates opportunity.'),
    textBlock('real18', 'But the aging housing stock means water and mold issues are extremely common.'),
    textBlock('real19', 'If you\'re dealing with these problems, you\'re not alone.'),

    // H2: Why Work With Us
    textBlock('h2why', 'Why Work With ClearEdge Home Buyers', 'h2'),
    textBlock('why1', 'I started ClearEdge Home Buyers in 2016 with a single duplex purchase in Scranton.'),
    textBlock('why2', 'Since then, I\'ve helped over 200 homeowners across Eastern PA sell their properties fast.'),
    textBlock('why3', 'Been featured in The Morning Call and Lehigh Valley Business.'),
    textBlock('why4', 'Speak regularly at REIA meetups throughout the Lehigh Valley.'),
    textBlock('why5', 'My free guides on selling distressed properties have been downloaded by over 5,000 Pennsylvania homeowners.'),
    textBlock('why6', 'When you\'re dealing with water damage and mold, you need someone who\'s seen it all.'),
    textBlock('why7', 'Who won\'t lowball you just because your basement\'s wet.'),
    textBlock('why8', 'Who understands 18102\'s housing stock.'),
    textBlock('why9', 'And who can close quickly so you can move on with your life.'),
    textBlock('why10', 'That\'s what we do.'),

    // H2: CTA
    textBlock('h2cta', 'Get Your Cash Offer Today', 'h2'),
    textBlock('cta1', 'Look, I know this situation feels overwhelming.'),
    textBlock('cta2', 'You\'ve got a house that\'s damaging itself more every day.'),
    textBlock('cta3', 'Traditional buyers don\'t want it.'),
    textBlock('cta4', 'And the repair estimates make your head spin.'),
    textBlock('cta5', 'But here\'s the good news.'),
    textBlock('cta6', 'You don\'t have to fix anything.'),
    textBlock('cta7', 'You don\'t have to deal with months of showings.'),
    textBlock('cta8', 'You don\'t have to negotiate with picky buyers.'),
    textBlock('cta9', 'Just reach out.'),
    textBlock('cta10', 'Tell us about your 18102 property.'),
    textBlock('cta11', 'We\'ll make you a fair cash offer within 24 hours.'),
    textBlock('cta12', 'No pressure.'),
    textBlock('cta13', 'No obligation.'),
    textBlock('cta14', 'And if it works for you, we can close in as little as a week.'),
    mixedBlock('cta15', [{ text: 'Ready to get out from under your water-damaged house?', marks: ['strong'] }]),
    mixedBlock('cta16', [
      { text: 'Request your free, no-obligation cash offer here: ' },
      { text: 'Get Your Offer', marks: ['homeLink2'] }
    ], [{ _type: 'link', _key: 'homeLink2', href: '/' }]),
    mixedBlock('cta17', [
      { text: 'Selling a water-damaged house in 18102 with mold issues', marks: ['strong'] },
      { text: ' doesn\'t have to be a nightmare – let ClearEdge Home Buyers show you the easier path forward.' }
    ]),

    // Author bio
    mixedBlock('bio', [
      { text: 'Tyler Swenson is the founder of ClearEdge Home Buyers, a cash home buying company serving Eastern Pennsylvania including NEPA, Lehigh Valley, and the Poconos. Since 2016, he has helped over 200 homeowners sell their properties quickly and hassle-free. Tyler is a recognized voice in Pennsylvania\'s real estate investment community, featured in The Morning Call and Lehigh Valley Business, and speaks regularly at REIA meetups throughout Eastern PA.', marks: ['em'] }
    ]),
  ]
}

async function main() {
  console.log('Starting Allentown 18102 water damage/mold blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

  try {
    // Fetch location references for Allentown/Lehigh County
    console.log('\nFetching Allentown location references...')
    const locations = await client.fetch(
      `*[_type == "location" && (
        city == "Allentown" ||
        slug.current == "allentown" ||
        county == "Lehigh County"
      )]{ _id, city, county, slug }`
    )

    console.log(`Found ${locations.length} location(s):`)
    locations.forEach(loc => {
      console.log(`  - ${loc.city} (${loc.county || 'No county'}) - slug: ${loc.slug?.current}`)
    })

    // Fetch situation references
    console.log('\nFetching situation references...')
    const situations = await client.fetch(
      `*[_type == "situation" && (
        slug.current in ["water-damage", "mold", "repairs-needed", "as-is"]
      )]{ _id, title, slug }`
    )
    console.log('Found situations:', situations.map(s => s.title))

    // Build location references
    const locationRefs = locations.map(loc => ({
      _type: 'reference',
      _ref: loc._id,
      _key: `loc_${loc._id.replace(/[^a-zA-Z0-9]/g, '_')}`
    }))

    // Build situation references
    const situationRefs = situations.map(sit => ({
      _type: 'reference',
      _ref: sit._id,
      _key: `sit_${sit._id.replace(/[^a-zA-Z0-9]/g, '_')}`
    }))

    // Build the complete document
    const doc = {
      ...blogPost,
      relatedLocations: locationRefs,
      relatedSituations: situationRefs
    }

    console.log('\nCreating blog post...')
    const result = await client.create(doc)
    console.log('\n✅ Blog post created successfully!')
    console.log('Document ID:', result._id)
    console.log('Title:', result.title)
    console.log('Slug:', result.slug.current)
    console.log('Published Date:', result.publishedAt)
    console.log(`\nRelated Locations: ${locationRefs.length}`)
    console.log(`Related Situations: ${situationRefs.length}`)
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/selling-water-damaged-house-18102-mold-issues')

    // Verify the creation
    console.log('\nVerifying creation...')
    const verifyPost = await client.fetch(
      `*[_id == $id][0]{
        _id,
        title,
        slug,
        publishedAt,
        "locationCount": count(relatedLocations),
        "situationCount": count(relatedSituations),
        "relatedLocations": relatedLocations[]->{ city, county }
      }`,
      { id: result._id }
    )

    console.log('\nVerification:')
    console.log('  Title:', verifyPost.title)
    console.log('  Published:', verifyPost.publishedAt)
    console.log('  Location tags:', verifyPost.locationCount)
    if (verifyPost.relatedLocations) {
      verifyPost.relatedLocations.forEach(loc => {
        console.log(`    - ${loc.city} (${loc.county})`)
      })
    }
    console.log('  Situation tags:', verifyPost.situationCount)

    return result
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', error.response)
    }
    throw error
  }
}

main()
