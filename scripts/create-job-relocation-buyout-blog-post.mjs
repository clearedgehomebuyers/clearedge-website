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
  title: 'Pennsylvania Job Relocation Home Buyout and Fast Equity Release 2026: The Complete Guide for PA Homeowners',
  slug: { _type: 'slug', current: 'pennsylvania-job-relocation-home-buyout-fast-equity-release-2026' },
  metaTitle: 'Pennsylvania Job Relocation Home Buyout and Fast Equity Release 2026 | Complete Guide',
  metaDescription: 'Need to sell your Pennsylvania home fast for job relocation? Learn about employer buyout programs, cash home buyers, capital gains tax exemptions, and fast equity release options in this 2026 guide from Tyler Swenson of ClearEdge Home Buyers.',
  excerpt: 'Need to sell your Pennsylvania home fast for job relocation? Learn about employer buyout programs, cash home buyers, capital gains tax exemptions, and fast equity release options.',
  author: 'Tyler Swenson',
  authorTitle: 'Founder, ClearEdge Home Buyers',
  publishedAt: '2026-01-08T10:00:00Z',
  category: 'situations',

  faqs: [
    {
      _key: 'faq1',
      question: 'Can I sell my Pennsylvania home fast if I have a mortgage?',
      answer: 'Yes. The mortgage gets paid off at closing. As long as your sale price exceeds your mortgage balance (plus any closing costs), you\'ll receive the difference as equity.'
    },
    {
      _key: 'faq2',
      question: 'How quickly can a cash home buyer close in Pennsylvania?',
      answer: 'Reputable cash buyers can close in 7-14 days. Some buyers have closed in as little as 5 days when the seller needed it. The limitation is usually title work, not funding.'
    },
    {
      _key: 'faq3',
      question: 'Do I have to pay capital gains tax if I sell my house for job relocation?',
      answer: 'Possibly not. The IRS provides a partial exclusion for home sales due to job relocation. If your new job is 50+ miles farther from your home than your old job was, you likely qualify. Consult a tax professional for your specific situation.'
    },
    {
      _key: 'faq4',
      question: 'What if my employer doesn\'t offer a relocation buyout program?',
      answer: 'About one-third of employers don\'t offer home sale assistance. Your options are traditional listing, cash buyer sale, or potentially keeping the property as a rental. A cash buyer provides the fastest certainty.'
    },
    {
      _key: 'faq5',
      question: 'Will I get less money selling to a cash buyer versus listing with an agent?',
      answer: 'Usually yes, on a gross basis. But net proceeds are what matter. When you factor in 5-6% commission, 2-3% closing costs, repair requests, and months of mortgage payments while waiting to sell—the gap narrows significantly.'
    },
    {
      _key: 'faq6',
      question: 'How do appraisals work in employer relocation buyout programs?',
      answer: 'Most programs order two independent appraisals and average them to determine fair market value. This protects both the employer (from overpaying) and you (from lowball offers).'
    },
    {
      _key: 'faq7',
      question: 'Can I negotiate a job relocation buyout offer?',
      answer: 'With employer programs, limited negotiation is possible (primarily on timing and terms). With cash buyers, everything is negotiable. Always counteroffer if the initial number doesn\'t work for you.'
    },
    {
      _key: 'faq8',
      question: 'How long do employer relocation buyout programs take?',
      answer: 'BVO programs typically take 60-90 days from listing to close. GBO programs can close in 30-45 days since no outside buyer is required. Timelines vary by company policy.'
    },
    {
      _key: 'faq9',
      question: 'What happens if I\'m underwater on my mortgage and need to relocate?',
      answer: 'This is a short sale situation and significantly more complex. You\'ll need lender approval to sell for less than you owe. A real estate attorney should be involved. This process can take 60-120 days.'
    },
    {
      _key: 'faq10',
      question: 'Should I rent my Pennsylvania house instead of selling when I relocate?',
      answer: 'It depends on your cash needs and investment goals. Renting preserves long-term equity but ties up capital. If you need the equity for your next home purchase, selling is usually the better choice.'
    }
  ],

  content: [
    // Intro
    mixedBlock('intro1', [
      { text: 'Pennsylvania job relocation home buyout and fast equity release 2026', marks: ['strong'] },
      { text: ' is one of the most searched topics I see from homeowners across Eastern PA right now.' }
    ]),
    textBlock('intro2', 'And I get it.'),
    textBlock('intro3', 'You just got the call.'),
    textBlock('intro4', 'New job.'),
    textBlock('intro5', 'Better money.'),
    textBlock('intro6', 'One problem: You\'ve got 30 days to figure out what to do with your house.'),
    textBlock('intro7', 'Maybe it\'s 60 days if you\'re lucky.'),
    textBlock('intro8', 'I\'m Tyler Swenson, founder of ClearEdge Home Buyers, and I\'ve been helping Pennsylvania homeowners navigate exactly this situation since 2016.'),
    textBlock('intro9', 'Started with a single duplex on Birch Street in Scranton.'),
    textBlock('intro10', 'Now I\'ve helped over 200 homeowners across NEPA, Lehigh Valley, and the Poconos sell their properties when life throws them a curveball.'),
    textBlock('intro11', 'This guide breaks down everything you need to know about selling your Pennsylvania home fast when a job relocation is breathing down your neck.'),
    textBlock('intro12', 'No fluff.'),
    textBlock('intro13', 'Just what works.'),

    // H2: What Is Job Relocation Buyout
    textBlock('h2what', 'What Is a Job Relocation Home Buyout in Pennsylvania?', 'h2'),
    textBlock('what1', 'A job relocation home buyout is when a third party purchases your home so you can relocate for work without being stuck in real estate limbo.'),
    textBlock('what2', 'This can happen through your employer\'s corporate relocation program or through an independent cash home buyer.'),
    mixedBlock('what3', [{ text: 'Here\'s the deal: According to ARC Relocation, ', marks: [] }, { text: 'nearly 42% of relocating employees only have 0-30 days', marks: ['strong'] }, { text: ' to settle in before starting their new job.', marks: [] }]),
    textBlock('what4', 'That\'s not enough time to:'),
    textBlock('what5', '• List your house'),
    textBlock('what6', '• Stage it for showings'),
    textBlock('what7', '• Wait for a buyer\'s mortgage approval'),
    textBlock('what8', '• Navigate the 30-50 day closing process'),
    textBlock('what9', 'The traditional home sale takes 37-54 days on average in Pennsylvania according to 2025 market data.'),
    textBlock('what10', 'That math doesn\'t work when HR wants you in Pittsburgh by the 15th.'),
    textBlock('h3types', 'Types of Employer Relocation Home Buyout Programs', 'h3'),
    textBlock('type1', 'If your employer offers home sale assistance, it typically falls into one of two categories:'),
    mixedBlock('type2', [{ text: 'Buyer Value Option (BVO):', marks: ['strong'] }]),
    textBlock('type3', '• You list your home and find a buyer'),
    textBlock('type4', '• The relocation company purchases your home for the agreed price'),
    textBlock('type5', '• They immediately sell to the outside buyer'),
    textBlock('type6', '• Tax-protected transaction (this matters—more on that later)'),
    textBlock('type7', '• Most common option for mid-level employees'),
    mixedBlock('type8', [{ text: 'Guaranteed Buyout Option (GBO):', marks: ['strong'] }]),
    textBlock('type9', '• Two independent appraisals determine your home\'s value'),
    textBlock('type10', '• Relocation company offers to buy at the appraised value'),
    textBlock('type11', '• You can relocate immediately without finding a buyer first'),
    textBlock('type12', '• More expensive for employers, usually reserved for executives'),
    textBlock('type13', '• Provides the most certainty'),
    textBlock('type14', 'The catch?'),
    textBlock('type15', 'Not everyone gets these benefits.'),
    mixedBlock('type16', [{ text: 'According to WHR Global\'s benchmarking data, only about ', marks: [] }, { text: '67.5% of companies', marks: ['strong'] }, { text: ' offer relocation home sale benefits.', marks: [] }]),
    textBlock('type17', 'And that percentage drops significantly for new hires versus existing employees.'),

    // H2: Fast Equity Release Problem
    textBlock('h2prob', 'The Fast Equity Release Problem Pennsylvania Homeowners Face in 2026', 'h2'),
    textBlock('prob1', 'Let me tell you about a call I got last month.'),
    textBlock('prob2', 'Family in Bethlehem.'),
    textBlock('prob3', 'Dad just accepted a position in Charlotte.'),
    textBlock('prob4', 'Three kids.'),
    textBlock('prob5', 'Great opportunity.'),
    textBlock('prob6', 'They needed to access their $87,000 in home equity to put down on a house near the new job.'),
    textBlock('prob7', 'But their employer\'s relocation package?'),
    textBlock('prob8', 'A $5,000 lump sum.'),
    textBlock('prob9', 'That\'s it.'),
    textBlock('prob10', 'No home buyout program.'),
    textBlock('prob11', 'No equity advance.'),
    textBlock('prob12', 'Just "good luck and see you Monday."'),
    textBlock('prob13', 'This is the reality for most Pennsylvania homeowners relocating for work in 2026.'),
    textBlock('h3trad', 'Why Traditional Selling Doesn\'t Work for Job Relocation', 'h3'),
    textBlock('trad1', 'The Pennsylvania housing market in late 2025 shows:'),
    mixedBlock('trad2', [{ text: '• Median home price:', marks: ['strong'] }, { text: ' $308,300-$325,000 depending on the source' }]),
    mixedBlock('trad3', [{ text: '• Year-over-year price change:', marks: ['strong'] }, { text: ' +3.5% to +5.2%' }]),
    mixedBlock('trad4', [{ text: '• Average days on market:', marks: ['strong'] }, { text: ' 37-54 days' }]),
    mixedBlock('trad5', [{ text: '• Homes selling above list price:', marks: ['strong'] }, { text: ' 28.6%' }]),
    mixedBlock('trad6', [{ text: '• Inventory:', marks: ['strong'] }, { text: ' 3-4 months of supply (improving from 2024)' }]),
    mixedBlock('trad7', [{ text: '• Mortgage rates:', marks: ['strong'] }, { text: ' Averaging 6.3-6.6%' }]),
    textBlock('trad8', 'Sounds fast, right?'),
    textBlock('trad9', 'Here\'s what those numbers don\'t tell you:'),
    textBlock('trad10', '• Going to pending isn\'t closing'),
    textBlock('trad11', '• Mortgage-contingent buyers can fall through'),
    textBlock('trad12', '• Inspection negotiations add weeks'),
    textBlock('trad13', '• The actual closing takes another 30-45 days'),
    mixedBlock('trad14', [{ text: 'So "going pending in 9 days" actually means ', marks: [] }, { text: '45-60 days until you have cash in hand.', marks: ['strong'] }]),
    textBlock('trad15', 'And that assumes everything goes perfectly.'),
    textBlock('trad16', 'When you\'re relocating for work, "everything going perfectly" is not a bet you want to make.'),

    // H2: Options Breakdown
    textBlock('h2opt', 'Pennsylvania Job Relocation Home Sale Options: A Complete Breakdown', 'h2'),
    textBlock('opt1', 'When you need to sell fast for a job relocation, you\'ve got four realistic options.'),
    textBlock('opt2', 'Each has tradeoffs.'),
    textBlock('opt3', 'Let me break them down honestly.'),
    textBlock('h3opt1', 'Option 1: Employer Relocation Buyout Program', 'h3'),
    mixedBlock('opt1a', [{ text: 'Best for:', marks: ['strong'] }, { text: ' Employees with corporate relocation packages that include home sale assistance' }]),
    mixedBlock('opt1b', [{ text: 'Timeline:', marks: ['strong'] }, { text: ' 30-90 days depending on program type' }]),
    mixedBlock('opt1c', [{ text: 'Equity access:', marks: ['strong'] }, { text: ' Full appraised value (minus any program fees)' }]),
    mixedBlock('opt1d', [{ text: 'How it works:', marks: ['strong'] }]),
    textBlock('opt1e', '1. Your employer\'s relocation management company (RMC) orders two appraisals'),
    textBlock('opt1f', '2. They average the appraisals to determine fair market value'),
    textBlock('opt1g', '3. You either market the home (BVO) or accept the guaranteed offer (GBO)'),
    textBlock('opt1h', '4. The relocation company purchases your home'),
    textBlock('opt1i', '5. They handle the resale to an outside buyer'),
    mixedBlock('opt1j', [{ text: 'The upside:', marks: ['strong'] }]),
    textBlock('opt1k', '• Tax-protected transaction (huge benefit)'),
    textBlock('opt1l', '• Professional support throughout the process'),
    textBlock('opt1m', '• No commission or closing costs out of your pocket'),
    mixedBlock('opt1n', [{ text: 'The downside:', marks: ['strong'] }]),
    textBlock('opt1o', '• Not all employers offer this'),
    textBlock('opt1p', '• New hires often don\'t qualify'),
    textBlock('opt1q', '• You\'re locked into their timeline and process'),
    textBlock('h3opt2', 'Option 2: Cash Home Buyer', 'h3'),
    mixedBlock('opt2a', [{ text: 'Best for:', marks: ['strong'] }, { text: ' Homeowners who need to close in 7-14 days without employer assistance' }]),
    mixedBlock('opt2b', [{ text: 'Timeline:', marks: ['strong'] }, { text: ' 7-14 days from offer to closing' }]),
    mixedBlock('opt2c', [{ text: 'Equity access:', marks: ['strong'] }, { text: ' 70-85% of market value (varies by buyer and property condition)' }]),
    mixedBlock('opt2d', [{ text: 'How it works:', marks: ['strong'] }]),
    textBlock('opt2e', '1. You request a cash offer from a reputable buyer'),
    textBlock('opt2f', '2. They evaluate your property (often within 24-48 hours)'),
    textBlock('opt2g', '3. You receive a no-obligation cash offer'),
    textBlock('opt2h', '4. If you accept, you pick the closing date'),
    textBlock('opt2i', '5. They handle everything—no repairs, no cleaning, no staging'),
    mixedBlock('opt2j', [{ text: 'The upside:', marks: ['strong'] }]),
    textBlock('opt2k', '• Fastest possible sale'),
    textBlock('opt2l', '• Certainty of closing (no financing contingencies)'),
    textBlock('opt2m', '• Sell as-is, no repairs needed'),
    textBlock('opt2n', '• You choose the timeline'),
    mixedBlock('opt2o', [{ text: 'The downside:', marks: ['strong'] }]),
    textBlock('opt2p', '• Lower price than retail market'),
    textBlock('opt2q', '• Quality varies dramatically between buyers'),
    textBlock('opt2r', '• Some operators aren\'t transparent about fees'),
    textBlock('opt2s', 'I\'ll be direct: This is what we do at ClearEdge Home Buyers.'),
    textBlock('opt2t', 'I\'ve seen both sides—good operators and bad ones.'),
    textBlock('opt2u', 'The key is working with someone local who actually closes deals, not a national call center that wholesales your information to the highest bidder.'),
    textBlock('h3opt3', 'Option 3: Traditional Agent Listing with Price Reduction', 'h3'),
    mixedBlock('opt3a', [{ text: 'Best for:', marks: ['strong'] }, { text: ' Homeowners with 60+ days before relocation who can accept uncertainty' }]),
    mixedBlock('opt3b', [{ text: 'Timeline:', marks: ['strong'] }, { text: ' 45-90+ days' }]),
    mixedBlock('opt3c', [{ text: 'Equity access:', marks: ['strong'] }, { text: ' 90-94% of market value after commission and closing costs' }]),
    mixedBlock('opt3d', [{ text: 'The upside:', marks: ['strong'] }]),
    textBlock('opt3e', '• Highest potential sale price'),
    textBlock('opt3f', '• Full market exposure'),
    mixedBlock('opt3g', [{ text: 'The downside:', marks: ['strong'] }]),
    textBlock('opt3h', '• Uncertainty on timeline'),
    textBlock('opt3i', '• Buyer financing can fall through'),
    textBlock('opt3j', '• Showings while you\'re trying to pack and relocate'),
    textBlock('opt3k', '• Commission (5-6%) plus closing costs'),
    textBlock('h3opt4', 'Option 4: Keep the House and Rent It Out', 'h3'),
    mixedBlock('opt4a', [{ text: 'Best for:', marks: ['strong'] }, { text: ' Investors or homeowners who plan to return' }]),
    mixedBlock('opt4b', [{ text: 'Timeline:', marks: ['strong'] }, { text: ' Indefinite' }]),
    mixedBlock('opt4c', [{ text: 'Equity access:', marks: ['strong'] }, { text: ' Limited (you could potentially do a cash-out refinance)' }]),
    mixedBlock('opt4d', [{ text: 'The upside:', marks: ['strong'] }]),
    textBlock('opt4e', '• Build long-term equity'),
    textBlock('opt4f', '• Passive income stream'),
    textBlock('opt4g', '• Keep the option to return'),
    mixedBlock('opt4h', [{ text: 'The downside:', marks: ['strong'] }]),
    textBlock('opt4i', '• Tied up capital (can\'t use equity for new home)'),
    textBlock('opt4j', '• Property management headaches'),
    textBlock('opt4k', '• Pennsylvania landlord-tenant laws to navigate'),
    textBlock('opt4l', '• Responsible for maintenance, taxes, insurance'),

    // H2: Capital Gains Tax
    textBlock('h2tax', 'Capital Gains Tax Exemption for Job Relocation: What Pennsylvania Sellers Need to Know', 'h2'),
    textBlock('tax1', 'This is where I see people leave money on the table.'),
    mixedBlock('tax2', [{ text: 'The IRS allows homeowners to exclude up to ', marks: [] }, { text: '$250,000 in capital gains ($500,000 for married couples)', marks: ['strong'] }, { text: ' when selling a primary residence.', marks: [] }]),
    textBlock('tax3', 'Normal rules require you to:'),
    textBlock('tax4', '• Own the home for 2+ years'),
    textBlock('tax5', '• Live in it as your primary residence for 2+ of the last 5 years'),
    textBlock('tax6', '• Not have claimed the exclusion in the past 2 years'),
    textBlock('tax7', 'But here\'s what most people don\'t know:'),
    mixedBlock('tax8', [{ text: 'Job relocation qualifies for a partial exclusion even if you don\'t meet the full requirements.', marks: ['strong'] }]),
    textBlock('h3safe', 'The IRS Work-Related Move Safe Harbor', 'h3'),
    textBlock('safe1', 'According to IRS Publication 523, you qualify for a partial exclusion if:'),
    textBlock('safe2', '1. The sale is primarily due to a change in place of employment'),
    mixedBlock('safe3', [{ text: '2. Your new job is ', marks: [] }, { text: 'at least 50 miles farther', marks: ['strong'] }, { text: ' from your old home than your previous workplace was', marks: [] }]),
    textBlock('safe4', 'That second point is critical and often misunderstood.'),
    textBlock('safe5', 'It\'s not 50 miles from your old home to your new home.'),
    textBlock('safe6', 'It\'s 50 miles farther than your old commute.'),
    mixedBlock('safe7', [{ text: 'Example:', marks: ['strong'] }]),
    textBlock('safe8', '• Your old job was 10 miles from your Pennsylvania home'),
    textBlock('safe9', '• Your new job is in New Jersey, 65 miles from your Pennsylvania home'),
    textBlock('safe10', '• The difference is 55 miles'),
    textBlock('safe11', '• You qualify because 55 > 50'),
    textBlock('h3calc', 'How the Partial Exclusion Is Calculated', 'h3'),
    textBlock('calc1', 'If you owned and lived in your home for 12 months (half the required 24 months), you can exclude half the normal amount:'),
    textBlock('calc2', '• Single filer: $125,000 (half of $250,000)'),
    textBlock('calc3', '• Married filing jointly: $250,000 (half of $500,000)'),
    textBlock('calc4', 'The formula is simple:'),
    mixedBlock('calc5', [{ text: '(Months owned and lived in / 24) × Maximum exclusion = Your partial exclusion', marks: ['em'] }]),
    textBlock('calc6', 'Always keep documentation:'),
    textBlock('calc7', '• Offer letter from new employer'),
    textBlock('calc8', '• Old and new job addresses'),
    textBlock('calc9', '• Dates of employment change'),
    textBlock('calc10', '• Proof of primary residence'),

    // H2: PA Market 2026
    textBlock('h2market', 'The Pennsylvania Housing Market in 2026: What Relocating Sellers Should Know', 'h2'),
    textBlock('mkt1', 'Let me give you the honest picture of what you\'re working with.'),
    textBlock('h3snap', 'Pennsylvania Market Snapshot (Late 2025 Data)', 'h3'),
    mixedBlock('snap1', [{ text: '• Median sale price:', marks: ['strong'] }, { text: ' $308,300-$325,000' }]),
    mixedBlock('snap2', [{ text: '• Year-over-year price change:', marks: ['strong'] }, { text: ' +3.5% to +5.2%' }]),
    mixedBlock('snap3', [{ text: '• Average days on market:', marks: ['strong'] }, { text: ' 37-54 days' }]),
    mixedBlock('snap4', [{ text: '• Homes selling above list price:', marks: ['strong'] }, { text: ' 28.6%' }]),
    mixedBlock('snap5', [{ text: '• Inventory:', marks: ['strong'] }, { text: ' 3-4 months of supply' }]),
    mixedBlock('snap6', [{ text: '• Mortgage rates:', marks: ['strong'] }, { text: ' Averaging 6.3-6.6%' }]),
    textBlock('h3reg', 'Regional Variations That Matter', 'h3'),
    mixedBlock('reg1', [{ text: 'Scranton/NEPA:', marks: ['strong'] }, { text: ' Projected for approximately 10% price growth in 2026—one of the strongest performers in the Northeast. Average weekly wages lower ($1,063), but housing remains affordable.' }]),
    mixedBlock('reg2', [{ text: 'Lehigh Valley:', marks: ['strong'] }, { text: ' Stronger job market with healthcare, logistics, and manufacturing driving demand. Prices higher but equity positions generally stronger.' }]),
    mixedBlock('reg3', [{ text: 'Philadelphia Suburbs:', marks: ['strong'] }, { text: ' More competitive but longer days on market for some price points. Buyer pool is larger but more selective.' }]),
    mixedBlock('reg4', [{ text: 'Pittsburgh Area:', marks: ['strong'] }, { text: ' Market has plateaued around $240,000 median—below national average. Still below the national median of $350,000+, making it an affordable option.' }]),
    textBlock('h3mean', 'What This Means for Your Job Relocation Sale', 'h3'),
    textBlock('mean1', 'If you\'re in a hot submarket like Scranton right now, traditional sales are moving faster.'),
    textBlock('mean2', 'But "faster" in real estate still means 45-60 days minimum from listing to cash in hand.'),
    mixedBlock('mean3', [{ text: 'The real question is: ', marks: [] }, { text: 'Can your job relocation timeline accommodate that?', marks: ['strong'] }]),
    textBlock('mean4', 'If the answer is no, you need a guaranteed closing option.'),

    // H2: Evaluate Options
    textBlock('h2eval', 'How to Evaluate Your Pennsylvania Home Buyout Options', 'h2'),
    textBlock('eval1', 'Here\'s the framework I use when someone calls me about a job relocation sale.'),
    textBlock('h3step1', 'Step 1: Calculate Your True Equity Position', 'h3'),
    textBlock('step1a', 'Your equity = Current market value - Mortgage balance - Selling costs'),
    mixedBlock('step1b', [{ text: 'Don\'t forget selling costs:', marks: ['strong'] }]),
    textBlock('step1c', '• Traditional sale: 8-10% (commission + closing costs + repairs)'),
    textBlock('step1d', '• Cash buyer sale: 0-3% (closing costs only, if any)'),
    textBlock('step1e', '• Employer buyout: Varies by program'),
    textBlock('h3step2', 'Step 2: Determine Your Non-Negotiable Timeline', 'h3'),
    textBlock('step2a', 'Be honest with yourself.'),
    textBlock('step2b', 'When do you absolutely need to be out of this house?'),
    textBlock('step2c', 'Not when it would be "nice" to be out.'),
    mixedBlock('step2d', [{ text: 'When do you ', marks: [] }, { text: 'need', marks: ['strong'] }, { text: ' to be out?', marks: [] }]),
    textBlock('step2e', 'Work backward from there.'),
    textBlock('h3step3', 'Step 3: Assess Your Risk Tolerance', 'h3'),
    textBlock('step3a', 'Can you afford to:'),
    textBlock('step3b', '• Pay two mortgages if your house doesn\'t sell?'),
    textBlock('step3c', '• Lose a buyer at the last minute and start over?'),
    textBlock('step3d', '• Make price reductions if the market shifts?'),
    textBlock('step3e', 'If any of those make you nervous, certainty has real value.'),
    textBlock('h3step4', 'Step 4: Get Multiple Offers', 'h3'),
    textBlock('step4a', 'This is non-negotiable.'),
    textBlock('step4b', 'Get:'),
    textBlock('step4c', '• A cash offer from a reputable local buyer'),
    textBlock('step4d', '• A comparative market analysis from a local agent'),
    textBlock('step4e', '• Details on your employer\'s relocation package (if applicable)'),
    textBlock('step4f', 'Then you can make an informed decision.'),

    // H2: Fast Equity Strategies
    textBlock('h2fast', 'Fast Equity Release Strategies for Pennsylvania Job Relocations', 'h2'),
    textBlock('fast1', 'When you need to access your home equity quickly for a new home purchase, here are your realistic options.'),
    textBlock('h3bridge', 'Bridge Loans', 'h3'),
    textBlock('bridge1', 'A short-term loan that "bridges" the gap between buying your new home and selling your old one.'),
    mixedBlock('bridge2', [{ text: '• Typical terms:', marks: ['strong'] }, { text: ' 6-12 months' }]),
    mixedBlock('bridge3', [{ text: '• Interest rates:', marks: ['strong'] }, { text: ' Higher than traditional mortgages (often 2-4% above prime)' }]),
    mixedBlock('bridge4', [{ text: '• Best for:', marks: ['strong'] }, { text: ' Homeowners with strong credit and income who can qualify for the additional debt' }]),
    mixedBlock('bridge5', [{ text: 'The problem:', marks: ['strong'] }, { text: ' You\'re now carrying three obligations—old mortgage, new mortgage, and bridge loan. If your home sale takes longer than expected, you\'re in trouble.' }]),
    textBlock('h3heloc', 'Home Equity Line of Credit (HELOC)', 'h3'),
    textBlock('heloc1', 'Access your existing equity through a credit line.'),
    mixedBlock('heloc2', [{ text: '• Typical terms:', marks: ['strong'] }, { text: ' Variable rate, 10-20 year draw period' }]),
    mixedBlock('heloc3', [{ text: '• Best for:', marks: ['strong'] }, { text: ' Homeowners with 20%+ equity who started the process before getting the job offer' }]),
    mixedBlock('heloc4', [{ text: 'The problem:', marks: ['strong'] }, { text: ' You need to apply before you accept the new job. Lenders verify employment, and a pending relocation complicates approval.' }]),
    textBlock('h3lease', 'Cash Buyer Sale + Leaseback', 'h3'),
    textBlock('lease1', 'Sell your home to a cash buyer but negotiate to stay short-term as a tenant.'),
    mixedBlock('lease2', [{ text: '• Typical terms:', marks: ['strong'] }, { text: ' 7-30 days of rent-back' }]),
    mixedBlock('lease3', [{ text: '• Best for:', marks: ['strong'] }, { text: ' Homeowners who need cash immediately but haven\'t found new housing yet' }]),
    textBlock('lease4', 'This is something we offer at ClearEdge Home Buyers because I know the relocating seller\'s reality.'),
    textBlock('lease5', 'You need the cash to secure your new place.'),
    textBlock('lease6', 'But you also need somewhere to sleep while you finalize the move.'),
    textBlock('lease7', 'A leaseback bridges that gap.'),

    // H2: Red Flags
    textBlock('h2red', 'Red Flags to Watch for in Pennsylvania Home Buyout Offers', 'h2'),
    textBlock('red1', 'I\'ve been in this industry since 2016.'),
    textBlock('red2', 'I\'ve seen the good, the bad, and the outright predatory.'),
    textBlock('red3', 'Here\'s what to watch for:'),
    mixedBlock('red4', [{ text: 'Red Flag #1: "Guaranteed" Offers That Aren\'t', marks: ['strong'] }]),
    textBlock('red5', 'Some companies throw around the word "guaranteed" but bury contingencies in the contract.'),
    mixedBlock('red6', [{ text: 'Ask specifically:', marks: ['strong'] }, { text: ' "Under what circumstances can you reduce or withdraw this offer?"' }]),
    textBlock('red7', 'If the answer is anything other than "title issues or material misrepresentation," keep looking.'),
    mixedBlock('red8', [{ text: 'Red Flag #2: Hidden Fees', marks: ['strong'] }]),
    textBlock('red9', 'Your offer should be clear and all-in.'),
    textBlock('red10', 'Watch for:'),
    textBlock('red11', '• "Administrative fees"'),
    textBlock('red12', '• "Transaction fees"'),
    textBlock('red13', '• "Service charges"'),
    textBlock('red14', '• Mandatory use of their title company at inflated rates'),
    textBlock('red15', 'At ClearEdge, our offer is what you get. No games.'),
    mixedBlock('red16', [{ text: 'Red Flag #3: Pressure to Sign Immediately', marks: ['strong'] }]),
    textBlock('red17', 'Anyone who won\'t give you 24-48 hours to review a contract with your own attorney is not operating in good faith.'),
    textBlock('red18', 'Legitimate buyers understand this is a major decision.'),
    mixedBlock('red19', [{ text: 'Red Flag #4: No Local Presence', marks: ['strong'] }]),
    textBlock('red20', 'If the person you\'re dealing with has never been to Scranton, doesn\'t know the Lehigh Valley market, or can\'t name the counties in NEPA—that\'s a problem.'),
    textBlock('red21', 'National call centers often wholesale your information to the highest bidder.'),
    textBlock('red22', 'You want someone who actually buys houses in Pennsylvania, not someone who sells leads about houses in Pennsylvania.'),

    // H2: Recommended Process
    textBlock('h2rec', 'My Recommended Process for Pennsylvania Job Relocation Home Sales', 'h2'),
    textBlock('rec1', 'Based on helping 200+ homeowners navigate this exact situation, here\'s what I recommend:'),
    mixedBlock('rec2', [{ text: 'Week 1: Assessment and Documentation', marks: ['strong'] }]),
    textBlock('rec3', '• Gather your mortgage payoff amount'),
    textBlock('rec4', '• Find your home\'s deed and title insurance policy'),
    textBlock('rec5', '• Document any needed repairs'),
    textBlock('rec6', '• Review your employer\'s relocation benefits (if applicable)'),
    textBlock('rec7', '• Request your offer letter in writing'),
    mixedBlock('rec8', [{ text: 'Week 2: Get Your Options', marks: ['strong'] }]),
    textBlock('rec9', '• Request a cash offer from ClearEdge Home Buyers'),
    textBlock('rec10', '• Get a comparative market analysis from a local agent'),
    textBlock('rec11', '• Calculate your capital gains tax situation'),
    textBlock('rec12', '• Review IRS Publication 523 for exclusion eligibility'),
    mixedBlock('rec13', [{ text: 'Week 3: Make Your Decision', marks: ['strong'] }]),
    textBlock('rec14', '• Compare offers on net proceeds basis (not gross offers)'),
    textBlock('rec15', '• Factor in certainty and timeline'),
    textBlock('rec16', '• Consult with an accountant on tax implications'),
    textBlock('rec17', '• Choose your path'),
    mixedBlock('rec18', [{ text: 'Week 4+: Execute', marks: ['strong'] }]),
    textBlock('rec19', '• Sign contracts'),
    textBlock('rec20', '• Schedule closing'),
    textBlock('rec21', '• Coordinate movers'),
    textBlock('rec22', '• Handle utility transfers'),
    textBlock('rec23', '• Start your new chapter'),

    // H2: Bottom Line
    textBlock('h2bottom', 'The Bottom Line on Pennsylvania Job Relocation Home Buyouts in 2026', 'h2'),
    textBlock('bot1', 'Here\'s what I want you to take away from this:'),
    mixedBlock('bot2', [{ text: 'You have options.', marks: ['strong'] }]),
    textBlock('bot3', 'Whether your employer offers a relocation program or you\'re navigating this solo, you don\'t have to sacrifice your career opportunity because of a house.'),
    textBlock('bot4', 'The Pennsylvania market in 2026 offers multiple paths to equity release:'),
    textBlock('bot5', '• Employer buyout programs (if available)'),
    textBlock('bot6', '• Cash home buyers (fastest certainty)'),
    textBlock('bot7', '• Traditional listing (highest potential price, most risk)'),
    textBlock('bot8', '• Rental conversion (preserve equity long-term)'),
    textBlock('bot9', 'The right choice depends on your timeline, risk tolerance, and financial situation.'),
    textBlock('bot10', 'If you\'re facing a Pennsylvania job relocation and need to discuss your options, I\'m happy to give you a no-obligation cash offer and an honest assessment of what makes sense for your situation.'),
    textBlock('bot11', 'That\'s what I do.'),
    textBlock('bot12', 'It\'s what I\'ve done for over 200 families across NEPA, Lehigh Valley, and the Poconos since 2016.'),
    mixedBlock('bot13', [
      { text: 'Learn more about ClearEdge Home Buyers\' simple 3-step selling process here: ' },
      { text: 'How It Works', marks: ['howLink'] }
    ], [{ _type: 'link', _key: 'howLink', href: '/how-it-works' }]),
    mixedBlock('bot14', [
      { text: 'Want a FREE, no-obligation cash offer on your Eastern PA home? ' },
      { text: 'Request your offer here', marks: ['homeLink'] }
    ], [{ _type: 'link', _key: 'homeLink', href: '/' }]),
    mixedBlock('bot15', [
      { text: 'Pennsylvania job relocation home buyout and fast equity release 2026', marks: ['strong'] },
      { text: ' doesn\'t have to be a crisis—it can be a smooth transition to your next chapter.' }
    ]),

    // Author bio
    mixedBlock('bio', [
      { text: 'Tyler Swenson is the founder of ClearEdge Home Buyers, a cash home buying company serving Eastern Pennsylvania including NEPA, Lehigh Valley, and the Poconos. He has been featured in The Morning Call and Lehigh Valley Business, and regularly speaks at REIA meetups throughout Eastern PA. His free guides on selling distressed properties have been downloaded by over 5,000 Pennsylvania homeowners, and his YouTube channel has helped thousands navigate difficult selling situations.', marks: ['em'] }
    ]),
  ]
}

async function main() {
  console.log('Starting PA job relocation home buyout blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

  try {
    // Fetch location references - statewide article
    console.log('\nFetching Pennsylvania location references...')
    const locations = await client.fetch(
      `*[_type == "location" && (
        city in ["Scranton", "Allentown", "Bethlehem", "Wilkes-Barre", "Hazleton", "Easton"] ||
        county in ["Lehigh County", "Lackawanna County", "Luzerne County", "Northampton County"]
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
        slug.current in ["relocating", "job-transfer", "selling-fast"]
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
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/pennsylvania-job-relocation-home-buyout-fast-equity-release-2026')

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
