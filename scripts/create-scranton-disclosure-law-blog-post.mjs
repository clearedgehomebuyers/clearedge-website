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
  title: 'Scranton PA Major Structural Damage Disclosure Law 2026: The Complete Seller\'s Guide',
  slug: { _type: 'slug', current: 'scranton-pa-major-structural-damage-disclosure-law-2026' },
  metaTitle: 'Scranton PA Major Structural Damage Disclosure Law 2026 | What Sellers Must Know',
  metaDescription: 'Selling a Scranton home with structural damage? Learn PA\'s disclosure requirements for 2026, what counts as major structural damage, and your legal obligations. Expert guide from a local investor.',
  excerpt: 'Selling a Scranton home with structural damage? Learn Pennsylvania\'s disclosure requirements, what counts as major structural damage, and your legal obligations under RESDL.',
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2026-01-08T10:00:00Z',
  category: 'situations',

  faqs: [
    {
      _key: 'faq1',
      question: 'What counts as major structural damage under Pennsylvania disclosure law?',
      answer: 'Major structural damage includes any issue affecting the foundation, load-bearing walls, roof framing, or other elements essential to the home\'s structural integrity. This encompasses foundation cracks wider than 1/4 inch, bowing or leaning basement walls, settlement or sinking, load-bearing wall modifications, sagging rooflines, and any damage that would significantly impact property value or create safety risks. Pennsylvania defines a "material defect" as something with "significant adverse impact on value" or "unreasonable risk to people."'
    },
    {
      _key: 'faq2',
      question: 'Can I sell my Scranton house "as-is" without disclosing structural problems?',
      answer: 'No. The Pennsylvania Superior Court ruled in Phelps v. Caperoon (2018) that "as-is" clauses do not exempt sellers from disclosure requirements. You can sell as-is without making repairs, but you must still complete the Seller Property Disclosure Statement and disclose all known structural problems. The word "shall" in the statute is mandatory – there are no exceptions for as-is sales.'
    },
    {
      _key: 'faq3',
      question: 'How long do buyers have to sue over undisclosed structural damage?',
      answer: 'Buyers have two years from the date of final settlement to file a claim under Pennsylvania\'s Real Estate Seller Disclosure Law. Claims can be proved through evidence like neighbor testimony, utility bills, former disclosure statements, inspection reports, warranty claims, or insurance claims. Some fraud claims may have longer limitation periods.'
    },
    {
      _key: 'faq4',
      question: 'Do I need to get a structural engineer report before selling?',
      answer: 'No. Pennsylvania law does not require sellers to inspect or investigate their property. You\'re only obligated to disclose defects you actually know about. However, you cannot claim ignorance if evidence suggests you knew – like past repair receipts, insurance claims, or contractor conversations. Some sellers choose to get inspections for peace of mind or to accurately describe issues to buyers.'
    },
    {
      _key: 'faq5',
      question: 'What are the penalties for not disclosing foundation problems in Pennsylvania?',
      answer: 'Penalties include actual damages (cost of repairs), potential treble damages (up to 3x actual damages) under the Unfair Trade Practices and Consumer Protection Law, and attorney\'s fees. A $25,000 foundation problem could result in $75,000+ in liability. Courts have consistently ruled against sellers who failed to disclose known structural defects.'
    },
    {
      _key: 'faq6',
      question: 'Does mine subsidence damage require disclosure in Scranton?',
      answer: 'Absolutely. Mine subsidence is considered a material defect requiring disclosure. If your property has experienced subsidence events, made mine subsidence insurance claims, received subsidence-related repairs, or sits over documented abandoned mine workings, you must disclose these facts. This is particularly relevant in Scranton where extensive anthracite mining occurred from the 1860s through 1966.'
    },
    {
      _key: 'faq7',
      question: 'Can I be sued if I didn\'t know about structural damage?',
      answer: 'Generally no, if you genuinely had no knowledge. Pennsylvania law only requires disclosure of defects "known to the seller." However, courts examine whether you "knew or had reason to know." Evidence of past repairs, insurance claims, or contractor conversations can prove knowledge. You also can\'t deliberately avoid learning about obvious problems to claim ignorance.'
    },
    {
      _key: 'faq8',
      question: 'How much does structural damage reduce home value in Scranton?',
      answer: 'Research shows minor foundation issues reduce value 2-5%, moderate structural damage reduces value 10-15%, and major structural problems reduce value 20-30% or more. For a $150,000 Scranton home, that translates to $3,000-$45,000+ in reduced value. The older housing stock in Scranton (52% built before 1940) makes structural issues particularly common.'
    },
    {
      _key: 'faq9',
      question: 'What if I inherited a house with structural problems in Scranton?',
      answer: 'As an executor or administrator handling a deceased person\'s estate, you may be exempt from completing the standard disclosure form under RESDL Section 7302(a)(1). However, you must still disclose any material defects you actually know about. If you\'ve discovered structural problems during the estate process, disclose them. Buyers understand estate sales may have limited information available.'
    },
    {
      _key: 'faq10',
      question: 'How can I sell a Scranton house with major structural damage fast?',
      answer: 'The fastest option is selling to a cash buyer like ClearEdge Home Buyers. We purchase homes with structural damage as-is, close in as few as 7 days, and handle all paperwork. No repairs needed, no showings, no financing contingencies. Traditional sales with structural damage often take 6-12 months due to limited buyer pool and negotiation challenges.'
    }
  ],

  content: [
    // Intro
    mixedBlock('intro1', [
      { text: 'Scranton PA major structural damage disclosure law 2026', marks: ['strong'] },
      { text: ' is something every homeowner in this city needs to understand before putting a house on the market.' }
    ]),
    textBlock('intro2', 'I\'m Tyler Swenson.'),
    textBlock('intro3', 'Founder of ClearEdge Home Buyers.'),
    textBlock('intro4', 'Since 2016, I\'ve bought over 200 homes across Eastern Pennsylvania.'),
    textBlock('intro5', 'Scranton included.'),
    textBlock('intro6', 'And I\'ve seen sellers make costly mistakes with structural damage disclosure more times than I can count.'),
    textBlock('intro7', 'Foundation cracks they thought were "cosmetic."'),
    textBlock('intro8', 'Bowing basement walls they figured nobody would notice.'),
    textBlock('intro9', 'Settlement issues they assumed would be overlooked.'),
    textBlock('intro10', 'Wrong.'),
    textBlock('intro11', 'Every single time.'),
    textBlock('intro12', 'Pennsylvania has some of the strictest seller disclosure laws in the country.'),
    textBlock('intro13', 'And in 2026, those rules haven\'t loosened up.'),
    textBlock('intro14', 'If anything, enforcement has gotten tighter.'),
    textBlock('intro15', 'So let me walk you through exactly what you need to know.'),

    // H2: What PA Law Says
    textBlock('h2law', 'What Pennsylvania\'s Seller Disclosure Law Actually Says About Structural Damage', 'h2'),
    textBlock('law1', 'Here\'s the deal.'),
    textBlock('law2', 'Pennsylvania\'s Real Estate Seller Disclosure Law (RESDL) – codified at 68 Pa.C.S. §§ 7301-7314 – requires sellers to disclose ALL known material defects.'),
    textBlock('law3', 'Not some.'),
    textBlock('law4', 'ALL.'),
    mixedBlock('law5', [{ text: 'A "material defect" is defined as:', marks: ['strong'] }]),
    textBlock('law6', 'A problem with the property that would have a significant adverse impact on the value of the property OR involves an unreasonable risk to people on the property.'),
    textBlock('law7', 'Major structural damage?'),
    textBlock('law8', 'That\'s textbook material defect territory.'),
    mixedBlock('law9', [{ text: 'The disclosure form specifically asks about:', marks: ['strong'] }]),
    textBlock('law10', '• Movement, shifting, or deterioration of walls, foundations, or structural components'),
    textBlock('law11', '• Additions, remodeling, and structural changes'),
    textBlock('law12', '• Past or present problems with load-bearing elements'),
    textBlock('law13', '• Basement and crawlspace issues'),
    textBlock('law14', '• Settlement or sinking'),
    textBlock('law15', 'The form uses the word "any" repeatedly.'),
    textBlock('law16', 'As in, "Are you aware of ANY past or present movement, shifting, deterioration or other problems with walls, foundations or other structural components?"'),
    textBlock('law17', 'The Pennsylvania Association of Realtors has been clear on this point.'),
    textBlock('law18', '"Any" means exactly what it says.'),

    // H2: What Counts as Major Structural
    textBlock('h2counts', 'What Counts as Major Structural Damage in Scranton Homes', 'h2'),
    mixedBlock('counts1', [
      { text: '' },
      { text: 'Scranton', marks: ['scrantonLink'] },
      { text: ' is different from most cities.' }
    ], [{ _type: 'link', _key: 'scrantonLink', href: '/locations/scranton' }]),
    textBlock('counts2', 'You need to understand why.'),
    mixedBlock('counts3', [{ text: 'Over 52% of homes in Scranton were built before 1940.', marks: ['strong'] }]),
    textBlock('counts4', 'The median construction year for housing here is 1938.'),
    textBlock('counts5', 'That\'s nearly 90-year-old homes.'),
    textBlock('counts6', 'These properties have unique vulnerabilities:'),
    mixedBlock('counts7', [{ text: 'Foundation Issues Common in Scranton:', marks: ['strong'] }]),
    mixedBlock('counts8', [
      { text: '• ' },
      { text: 'Horizontal cracks in basement walls', marks: ['strong'] },
      { text: ' – Often caused by soil pressure pushing inward' }
    ]),
    mixedBlock('counts9', [
      { text: '• ' },
      { text: 'Stair-step cracks in block foundations', marks: ['strong'] },
      { text: ' – Indicates settlement or lateral movement' }
    ]),
    mixedBlock('counts10', [
      { text: '• ' },
      { text: 'Bowing or leaning basement walls', marks: ['strong'] },
      { text: ' – Walls that curve inward more than 1 inch signal serious problems' }
    ]),
    mixedBlock('counts11', [
      { text: '• ' },
      { text: 'Vertical cracks wider than 1/4 inch', marks: ['strong'] },
      { text: ' – Can indicate foundation shifting' }
    ]),
    mixedBlock('counts12', [
      { text: '• ' },
      { text: 'Floor sloping or unevenness', marks: ['strong'] },
      { text: ' – Points to support failure underneath' }
    ]),
    mixedBlock('counts13', [{ text: 'Load-Bearing Wall Problems:', marks: ['strong'] }]),
    textBlock('counts14', '• Cracks radiating from door/window corners'),
    textBlock('counts15', '• Doors and windows that stick or won\'t close'),
    textBlock('counts16', '• Visible separation between walls and ceilings'),
    textBlock('counts17', '• Sagging or dipping along wall lines'),
    mixedBlock('counts18', [{ text: 'Roof Structure Issues:', marks: ['strong'] }]),
    textBlock('counts19', '• Sagging rooflines'),
    textBlock('counts20', '• Cracked or splitting rafters/trusses'),
    textBlock('counts21', '• Signs of past modifications to roof framing'),
    textBlock('counts22', '• Visible deflection in ceiling joists'),
    mixedBlock('counts23', [{ text: 'The Mine Subsidence Factor:', marks: ['strong'] }]),
    textBlock('counts24', 'This is critical for Scranton.'),
    textBlock('counts25', 'The city sits on top of abandoned anthracite coal mines.'),
    textBlock('counts26', 'Active mining occurred here from the 1860s through 1966.'),
    textBlock('counts27', 'Pennsylvania\'s DEP reports that mine subsidence damage – which includes foundation cracking, structural settling, and ground collapse – is a documented risk throughout Lackawanna County.'),
    mixedBlock('counts28', [{ text: 'Mine subsidence absolutely requires disclosure.', marks: ['strong'] }]),
    textBlock('counts29', 'If your property has experienced subsidence events or shows signs of mining-related damage, you must disclose it.'),
    textBlock('counts30', 'Period.'),

    // H2: As-Is Myth
    textBlock('h2myth', 'The "As-Is" Myth: Why It Won\'t Protect You', 'h2'),
    textBlock('myth1', 'Here\'s where sellers get themselves into trouble.'),
    textBlock('myth2', 'They think, "I\'ll just sell as-is and I don\'t have to disclose anything."'),
    textBlock('myth3', 'Wrong.'),
    mixedBlock('myth4', [{ text: 'The Pennsylvania Superior Court settled this definitively in Phelps v. Caperoon (2018).', marks: ['strong'] }]),
    textBlock('myth5', 'In that case, a seller sold a 165-year-old home "as-is" without providing a disclosure statement.'),
    textBlock('myth6', 'The buyer discovered undisclosed structural defects after purchase.'),
    textBlock('myth7', 'The seller argued the "as-is" clause protected him.'),
    mixedBlock('myth8', [{ text: 'The court disagreed.', marks: ['strong'] }]),
    textBlock('myth9', 'The ruling was clear:'),
    textBlock('myth10', '"RESDL contains no exceptions to the disclosure requirements, including the presence of an \'as is\' clause in an agreement to transfer residential real estate."'),
    textBlock('myth11', 'The court emphasized that the word "shall" in the statute is mandatory.'),
    textBlock('myth12', 'Sellers SHALL disclose known material defects.'),
    textBlock('myth13', 'No exceptions for "as-is" sales.'),
    mixedBlock('myth14', [{ text: 'Bottom line:', marks: ['strong'] }]),
    textBlock('myth15', 'You can sell your house "as-is" without making repairs.'),
    textBlock('myth16', 'But you CANNOT sell "as-is" without disclosing known structural problems.'),

    // H2: What You Must Disclose
    textBlock('h2must', 'Exactly What You Must Disclose Under Pennsylvania Law', 'h2'),
    textBlock('must1', 'Let me be specific.'),
    textBlock('must2', 'If you know about any of these issues, Pennsylvania law requires disclosure:'),
    mixedBlock('must3', [{ text: 'Foundation and Structural:', marks: ['strong'] }]),
    textBlock('must4', '• Any cracks in the foundation (even if repaired)'),
    textBlock('must5', '• Past or present basement water infiltration'),
    textBlock('must6', '• Wall bowing, bulging, or leaning'),
    textBlock('must7', '• Settlement or sinking issues'),
    textBlock('must8', '• Structural modifications (load-bearing walls removed, additions, etc.)'),
    textBlock('must9', '• Any unpermitted construction work'),
    textBlock('must10', '• Previous structural repairs (include who did the work and when)'),
    mixedBlock('must11', [{ text: 'Mine Subsidence Specific:', marks: ['strong'] }]),
    textBlock('must12', '• Any history of mine subsidence on the property'),
    textBlock('must13', '• Claims filed with Mine Subsidence Insurance'),
    textBlock('must14', '• Ground movement, sinkholes, or settling related to mining'),
    textBlock('must15', '• Whether the property sits over abandoned mine workings'),
    mixedBlock('must16', [{ text: 'Related Damage:', marks: ['strong'] }]),
    textBlock('must17', '• Cracks in interior walls or ceilings'),
    textBlock('must18', '• Doors/windows that don\'t operate properly due to structural movement'),
    textBlock('must19', '• Uneven or sloping floors'),
    textBlock('must20', '• Separation between walls and ceiling/floor'),
    mixedBlock('must21', [{ text: 'The key phrase is "known to the seller."', marks: ['strong'] }]),
    textBlock('must22', 'You\'re not required to hire an inspector or investigate problems.'),
    textBlock('must23', 'But if you KNOW about an issue – or have reason to know – you must disclose it.'),
    textBlock('must24', 'Courts have held that sellers can\'t claim ignorance when evidence suggests otherwise, like past repair records, insurance claims, or conversations with contractors.'),

    // H2: Penalties
    textBlock('h2pen', 'Penalties for Failing to Disclose Structural Damage', 'h2'),
    textBlock('pen1', 'Let me be direct about what\'s at stake.'),
    mixedBlock('pen2', [{ text: 'Actual Damages:', marks: ['strong'] }]),
    textBlock('pen3', 'Buyers can sue to recover the cost of repairs they had to make.'),
    textBlock('pen4', 'If you sold a house without disclosing a $25,000 foundation problem, you could be on the hook for that $25,000 plus legal fees.'),
    mixedBlock('pen5', [{ text: 'Treble Damages:', marks: ['strong'] }]),
    textBlock('pen6', 'Pennsylvania courts have ruled that RESDL violations can also violate the Unfair Trade Practices and Consumer Protection Law (UTPCPL).'),
    textBlock('pen7', 'Under UTPCPL, buyers can recover up to THREE TIMES their actual damages.'),
    textBlock('pen8', 'That $25,000 foundation problem?'),
    textBlock('pen9', 'Could become $75,000.'),
    mixedBlock('pen10', [{ text: 'Two-Year Statute of Limitations:', marks: ['strong'] }]),
    textBlock('pen11', 'Buyers have two years from the date of final settlement to file a claim.'),
    textBlock('pen12', 'A claim can be proved through:'),
    textBlock('pen13', '• Information from neighbors'),
    textBlock('pen14', '• Utility bills'),
    textBlock('pen15', '• Former disclosure statements'),
    textBlock('pen16', '• Failed inspection reports'),
    textBlock('pen17', '• Home warranty claims'),
    textBlock('pen18', '• Insurance claims'),
    mixedBlock('pen19', [{ text: 'Legal Fees:', marks: ['strong'] }]),
    textBlock('pen20', 'If the buyer wins, you may be responsible for their attorney\'s fees as well.'),
    textBlock('pen21', 'I\'ve seen disclosure lawsuits cost sellers $50,000+ when everything is tallied up.'),
    textBlock('pen22', 'Not worth the risk.'),

    // H2: Value Impact
    textBlock('h2value', 'How Structural Damage Affects Home Value in Scranton', 'h2'),
    textBlock('val1', 'Let\'s talk numbers.'),
    mixedBlock('val2', [{ text: 'The Scranton Market:', marks: ['strong'] }]),
    textBlock('val3', '• Median home value: approximately $145,000-$168,000'),
    textBlock('val4', '• 52% of homes built before 1940'),
    textBlock('val5', '• 15% vacancy rate in some areas'),
    textBlock('val6', '• Median household income: around $49,000'),
    mixedBlock('val7', [{ text: 'Value Impact of Structural Damage:', marks: ['strong'] }]),
    textBlock('val8', 'Research consistently shows:'),
    mixedBlock('val9', [
      { text: '• ' },
      { text: 'Minor foundation issues', marks: ['strong'] },
      { text: ' (hairline cracks, minor settling): 2-5% value reduction' }
    ]),
    mixedBlock('val10', [
      { text: '• ' },
      { text: 'Moderate structural damage', marks: ['strong'] },
      { text: ' (bowing walls, significant cracks): 10-15% reduction' }
    ]),
    mixedBlock('val11', [
      { text: '• ' },
      { text: 'Major structural problems', marks: ['strong'] },
      { text: ' (severe foundation failure, load-bearing damage): 20-30%+ reduction' }
    ]),
    textBlock('val12', 'For a $150,000 Scranton home:'),
    textBlock('val13', '• Minor damage = $3,000-$7,500 reduction'),
    textBlock('val14', '• Moderate damage = $15,000-$22,500 reduction'),
    textBlock('val15', '• Major damage = $30,000-$45,000+ reduction'),
    mixedBlock('val16', [{ text: 'The Repair Cost Reality:', marks: ['strong'] }]),
    textBlock('val17', 'Foundation and structural repairs aren\'t cheap:'),
    mixedBlock('val18', [{ text: '• Minor crack repair:', marks: ['strong'] }, { text: ' $250-$800 per crack' }]),
    mixedBlock('val19', [{ text: '• Foundation crack injection:', marks: ['strong'] }, { text: ' $500-$3,000' }]),
    mixedBlock('val20', [{ text: '• Wall anchors/tiebacks:', marks: ['strong'] }, { text: ' $500-$1,000 per anchor' }]),
    mixedBlock('val21', [{ text: '• Carbon fiber reinforcement:', marks: ['strong'] }, { text: ' $900-$2,000 per strip' }]),
    mixedBlock('val22', [{ text: '• Helical pier installation:', marks: ['strong'] }, { text: ' $2,000-$4,000 per pier' }]),
    mixedBlock('val23', [{ text: '• Complete foundation underpinning:', marks: ['strong'] }, { text: ' $10,000-$40,000' }]),
    mixedBlock('val24', [{ text: '• Major structural repair:', marks: ['strong'] }, { text: ' $15,000-$30,000+' }]),
    textBlock('val25', 'Most Scranton homes needing serious structural work require $10,000-$25,000 minimum in repairs.'),

    // H2: Three Options
    textBlock('h2opt', 'Your Three Options for Selling With Structural Damage', 'h2'),
    textBlock('opt1', 'When you have a Scranton home with major structural problems, you\'ve got three paths:'),
    textBlock('h3opt1', 'Option 1: Repair Everything, Then Sell Traditionally', 'h3'),
    mixedBlock('opt1a', [{ text: 'Pros:', marks: ['strong'] }]),
    textBlock('opt1b', '• Maximize your sale price'),
    textBlock('opt1c', '• Broader buyer pool (financing easier to obtain)'),
    textBlock('opt1d', '• Faster closing once listed'),
    mixedBlock('opt1e', [{ text: 'Cons:', marks: ['strong'] }]),
    textBlock('opt1f', '• $10,000-$40,000+ in upfront repair costs'),
    textBlock('opt1g', '• 2-6 weeks minimum for structural repairs'),
    textBlock('opt1h', '• You STILL must disclose the history of damage'),
    textBlock('opt1i', '• No guarantee repairs increase value dollar-for-dollar'),
    mixedBlock('opt1j', [{ text: 'Best for:', marks: ['strong'] }, { text: ' Sellers with cash reserves who aren\'t in a rush and have moderate damage.' }]),
    textBlock('h3opt2', 'Option 2: List As-Is With Full Disclosure', 'h3'),
    mixedBlock('opt2a', [{ text: 'Pros:', marks: ['strong'] }]),
    textBlock('opt2b', '• No upfront repair costs'),
    textBlock('opt2c', '• Can list immediately'),
    textBlock('opt2d', '• Attracts investors and flippers'),
    mixedBlock('opt2e', [{ text: 'Cons:', marks: ['strong'] }]),
    textBlock('opt2f', '• Significantly reduced price (10-30% below market)'),
    textBlock('opt2g', '• Very limited buyer pool'),
    textBlock('opt2h', '• Most financed buyers can\'t purchase (lenders won\'t approve)'),
    textBlock('opt2i', '• Longer time on market'),
    textBlock('opt2j', '• Endless lowball offers and negotiations'),
    mixedBlock('opt2k', [{ text: 'Reality check:', marks: ['strong'] }, { text: ' When you list a house with disclosed structural damage on the MLS, most buyers scroll past immediately. The few who inquire want massive discounts. Then during their inspection, they find MORE issues and demand further reductions.' }]),
    textBlock('opt2l', 'I\'ve seen these listings sit for 6-12 months.'),
    mixedBlock('opt2m', [{ text: 'Best for:', marks: ['strong'] }, { text: ' Sellers with time to spare and willingness to negotiate extensively.' }]),
    textBlock('h3opt3', 'Option 3: Sell Direct to a Cash Buyer', 'h3'),
    mixedBlock('opt3a', [{ text: 'Pros:', marks: ['strong'] }]),
    textBlock('opt3b', '• No repairs needed'),
    textBlock('opt3c', '• Close in 7-14 days'),
    textBlock('opt3d', '• No showings or open houses'),
    textBlock('opt3e', '• No financing contingencies'),
    textBlock('opt3f', '• No appraisal problems'),
    textBlock('opt3g', '• Cash in hand quickly'),
    mixedBlock('opt3h', [{ text: 'Cons:', marks: ['strong'] }]),
    textBlock('opt3i', '• Lower price than full retail value'),
    textBlock('opt3j', '• Must research buyer legitimacy'),
    mixedBlock('opt3k', [{ text: 'This is what we do at ClearEdge Home Buyers.', marks: ['strong'] }]),
    textBlock('opt3l', 'We buy houses with structural damage, foundation problems, and every other issue you can imagine.'),
    textBlock('opt3m', 'No repairs.'),
    textBlock('opt3n', 'No cleaning.'),
    textBlock('opt3o', 'No waiting.'),
    textBlock('opt3p', 'We handle the paperwork.'),
    textBlock('opt3q', 'You walk away with cash.'),
    mixedBlock('opt3r', [{ text: 'Best for:', marks: ['strong'] }, { text: ' Sellers who want speed, certainty, and zero repair hassle.' }]),

    // H2: Exemptions
    textBlock('h2exempt', 'Exemptions: When Disclosure Requirements DON\'T Apply', 'h2'),
    textBlock('ex1', 'The RESDL includes some limited exemptions.'),
    textBlock('ex2', 'You may NOT be required to complete a full disclosure if:'),
    mixedBlock('ex3', [{ text: '1. Fiduciary Transfers', marks: ['strong'] }]),
    textBlock('ex4', 'If you\'re an executor, administrator, or trustee selling a deceased person\'s estate, guardianship, or trust property, you\'re exempt from the standard disclosure form.'),
    textBlock('ex5', 'However – and this is important – you must still disclose any material defects you actually know about.'),
    mixedBlock('ex6', [{ text: '2. Foreclosure Sales', marks: ['strong'] }]),
    textBlock('ex7', 'Sales by lenders following foreclosure are exempt.'),
    mixedBlock('ex8', [{ text: '3. New Construction', marks: ['strong'] }]),
    textBlock('ex9', 'Newly built homes that have never been occupied, where the buyer receives a one-year warranty and the dwelling has been inspected for code compliance.'),
    mixedBlock('ex10', [{ text: '4. Family Transfers', marks: ['strong'] }]),
    textBlock('ex11', 'Certain transfers between family members.'),
    mixedBlock('ex12', [{ text: 'Important:', marks: ['strong'] }, { text: ' Even if exempt from the standard form, you can still be sued for fraud or misrepresentation if you actively conceal known defects.' }]),

    // H2: After Agreement
    textBlock('h2after', 'What Happens If Structural Damage Appears AFTER You Sign the Agreement', 'h2'),
    textBlock('aft1', 'Life happens.'),
    textBlock('aft2', 'What if you sign an agreement of sale and THEN discover a structural problem before closing?'),
    textBlock('aft3', 'Pennsylvania law addresses this.'),
    mixedBlock('aft4', [{ text: 'Section 7307 of RESDL:', marks: ['strong'] }]),
    textBlock('aft5', 'If information in your disclosure becomes inaccurate before settlement, you must amend the disclosure in writing.'),
    textBlock('aft6', 'This includes structural problems that develop or are discovered after the original disclosure.'),
    mixedBlock('aft7', [{ text: 'The duty to disclose continues until closing.', marks: ['strong'] }]),
    textBlock('aft8', 'If a storm causes new foundation cracking after you\'ve signed, you must disclose it.'),
    textBlock('aft9', 'If a home inspection finds structural issues you genuinely didn\'t know about, you need to update your disclosure.'),
    textBlock('aft10', 'Failing to amend creates the same liability as failing to disclose initially.'),

    // H2: Mine Subsidence Insurance
    textBlock('h2mine', 'The Mine Subsidence Insurance Question', 'h2'),
    textBlock('mine1', 'Since we\'re talking Scranton, I need to address mine subsidence specifically.'),
    mixedBlock('mine2', [{ text: 'What You Should Know:', marks: ['strong'] }]),
    textBlock('mine3', 'Pennsylvania\'s DEP offers Mine Subsidence Insurance through a state program.'),
    textBlock('mine4', 'It costs approximately $41.25/year for $150,000 in residential coverage.'),
    textBlock('mine5', 'Standard homeowner\'s insurance does NOT cover mine subsidence damage.'),
    mixedBlock('mine6', [{ text: 'Disclosure Requirements:', marks: ['strong'] }]),
    textBlock('mine7', 'If your property has:'),
    textBlock('mine8', '• Made a mine subsidence insurance claim'),
    textBlock('mine9', '• Received mine subsidence damage repairs'),
    textBlock('mine10', '• Sits over documented abandoned mine workings'),
    textBlock('mine11', '• Experienced any subsidence-related issues'),
    textBlock('mine12', 'You must disclose these facts.'),
    textBlock('mine13', 'The disclosure form specifically asks about hazardous conditions and geological issues.'),
    textBlock('mine14', 'Mine subsidence absolutely qualifies.'),
    mixedBlock('mine15', [{ text: 'Checking Your Risk:', marks: ['strong'] }]),
    textBlock('mine16', 'The DEP maintains the PA Historic Underground Mine Map Inventory System (PHUMMIS).'),
    textBlock('mine17', 'You can request a site-specific risk assessment to determine if your property sits over abandoned mines.'),
    textBlock('mine18', 'If you\'ve done this research, the results should inform your disclosure.'),

    // H2: How We Buy
    textBlock('h2how', 'How ClearEdge Buys Houses With Structural Damage', 'h2'),
    textBlock('how1', 'Let me explain our process.'),
    mixedBlock('how2', [{ text: 'Step 1: Contact Us', marks: ['strong'] }]),
    mixedBlock('how3', [
      { text: 'Call or visit ' },
      { text: 'clearedgehomebuyers.com', marks: ['homeLink'] },
      { text: '.' }
    ], [{ _type: 'link', _key: 'homeLink', href: '/' }]),
    textBlock('how4', 'Tell us about your property.'),
    textBlock('how5', 'Structural damage, foundation issues, mine subsidence history – all of it.'),
    textBlock('how6', 'We\'ve seen it all.'),
    mixedBlock('how7', [{ text: 'Step 2: We Evaluate', marks: ['strong'] }]),
    textBlock('how8', 'We\'ll visit your Scranton property.'),
    textBlock('how9', 'Look at the structural issues.'),
    textBlock('how10', 'Assess the foundation condition.'),
    textBlock('how11', 'This isn\'t to nitpick.'),
    textBlock('how12', 'It\'s to understand exactly what we\'re buying.'),
    mixedBlock('how13', [{ text: 'Step 3: Cash Offer Within 24 Hours', marks: ['strong'] }]),
    textBlock('how14', 'We give you a fair cash offer based on:'),
    textBlock('how15', '• Current condition'),
    textBlock('how16', '• Repair costs we\'ll absorb'),
    textBlock('how17', '• Local market values'),
    textBlock('how18', '• Comparable sales'),
    textBlock('how19', 'No obligation.'),
    textBlock('how20', 'No pressure.'),
    mixedBlock('how21', [{ text: 'Step 4: Close on Your Timeline', marks: ['strong'] }]),
    textBlock('how22', 'Need to close in 7 days? Done.'),
    textBlock('how23', 'Need 30 days? That works too.'),
    textBlock('how24', 'We work around YOUR schedule.'),
    mixedBlock('how25', [
      { text: 'Learn more about our simple 3-step process: ' },
      { text: 'How It Works', marks: ['howLink'] }
    ], [{ _type: 'link', _key: 'howLink', href: '/how-it-works' }]),

    // H2: Bottom Line
    textBlock('h2bottom', 'The Bottom Line on Scranton Structural Damage Disclosure', 'h2'),
    textBlock('bot1', 'Let me give it to you straight.'),
    textBlock('bot2', 'If you\'re selling a Scranton home with structural damage:'),
    mixedBlock('bot3', [{ text: '1. You MUST disclose what you know.', marks: ['strong'] }]),
    textBlock('bot4', 'The law is clear. Pennsylvania courts have enforced it repeatedly. "As-is" clauses won\'t protect you.'),
    mixedBlock('bot5', [{ text: '2. Trying to hide problems is expensive.', marks: ['strong'] }]),
    textBlock('bot6', 'The risk of treble damages, attorney\'s fees, and years of legal headaches far outweighs any short-term gain from non-disclosure.'),
    mixedBlock('bot7', [{ text: '3. You have options.', marks: ['strong'] }]),
    textBlock('bot8', 'Repair and sell traditionally. List as-is with full disclosure. Or sell directly to a cash buyer who handles the problem for you.'),
    mixedBlock('bot9', [{ text: '4. Scranton\'s housing stock creates unique challenges.', marks: ['strong'] }]),
    textBlock('bot10', 'With over half the homes built before 1940 and mine subsidence risk throughout the area, structural issues are common here. You\'re not alone in dealing with this.'),
    mixedBlock('bot11', [{ text: '5. Moving quickly often makes sense.', marks: ['strong'] }]),
    textBlock('bot12', 'Structural problems don\'t fix themselves. They get worse. And more expensive. Every month you wait, the situation deteriorates.'),
    textBlock('bot13', 'I\'ve been buying houses in Eastern Pennsylvania since 2016.'),
    textBlock('bot14', 'Featured in The Morning Call and Lehigh Valley Business.'),
    textBlock('bot15', 'Speak at REIA meetups throughout the region.'),
    textBlock('bot16', 'Over 5,000 homeowners have downloaded our free guides.'),
    textBlock('bot17', 'I\'ve seen every structural problem imaginable.'),
    textBlock('bot18', 'And I\'ve helped hundreds of sellers get out from under damaged properties quickly and fairly.'),
    mixedBlock('bot19', [{ text: 'Ready to explore your options?', marks: ['strong'] }]),
    mixedBlock('bot20', [
      { text: 'Request your free, no-obligation cash offer here: ' },
      { text: 'Get Your Offer', marks: ['homeLink2'] }
    ], [{ _type: 'link', _key: 'homeLink2', href: '/' }]),
    mixedBlock('bot21', [
      { text: 'Scranton PA major structural damage disclosure law 2026', marks: ['strong'] },
      { text: ' doesn\'t have to be complicated – just understand your obligations, make informed decisions, and work with people who know this market inside and out.' }
    ]),

    // Author bio
    mixedBlock('bio', [
      { text: 'Tyler Swenson is the founder of ClearEdge Home Buyers, a cash home buying company serving Eastern Pennsylvania including NEPA, Lehigh Valley, and the Poconos. Since 2016, he has helped over 200 homeowners sell their properties quickly and hassle-free. Tyler is a recognized voice in Pennsylvania\'s real estate investment community, featured in The Morning Call and Lehigh Valley Business, and speaks regularly at REIA meetups throughout Eastern PA.', marks: ['em'] }
    ]),
  ]
}

async function main() {
  console.log('Starting Scranton PA structural damage disclosure law blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

  try {
    // Fetch location references for Scranton/Lackawanna County
    console.log('\nFetching Scranton location references...')
    const locations = await client.fetch(
      `*[_type == "location" && (
        city == "Scranton" ||
        slug.current == "scranton" ||
        county == "Lackawanna County"
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
        slug.current in ["structural-damage", "foundation-problems", "repairs-needed", "as-is"]
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
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/scranton-pa-major-structural-damage-disclosure-law-2026')

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
