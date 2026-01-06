import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const blogPostContent = [
  // Intro
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you\'re trying to avoid foreclosure in Scranton PA, you\'re probably scared.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Maybe angry.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Definitely stressed.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I get it.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You\'re behind on payments. The bank is calling. Letters are piling up.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You don\'t know what happens next — and that\'s the worst part.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'m Tyler Swenson, founder of ClearEdge Home Buyers.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Since 2016, I\'ve helped dozens of Scranton and NEPA homeowners facing foreclosure find a way out.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Some saved their homes. Some sold and walked away with cash. Some avoided a disaster that would\'ve haunted their credit for years.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'The point is: they had options.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'And so do you.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let me walk you through exactly what those options are.' }],
  },
  // H2: What Happens When You Miss Payments
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'What Happens When You Miss Mortgage Payments in Pennsylvania' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'First, let\'s get clear on the timeline. Because foreclosure doesn\'t happen overnight.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Day 1-30: ', marks: ['strong'] },
      { _type: 'span', text: 'You miss a payment. The lender charges a late fee. They start calling.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Day 31-60: ', marks: ['strong'] },
      { _type: 'span', text: 'Second missed payment. More calls. A letter arrives saying you\'re in default.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Day 61-90: ', marks: ['strong'] },
      { _type: 'span', text: 'Third missed payment. The lender sends a formal "Notice of Intent to Foreclose."' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Day 90-120: ', marks: ['strong'] },
      { _type: 'span', text: 'The lender files a foreclosure complaint with the court. You get served.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Day 120+: ', marks: ['strong'] },
      { _type: 'span', text: 'If you don\'t respond, the court can issue a judgment. Your home goes to sheriff\'s sale.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Sheriff\'s Sale: ', marks: ['strong'] },
      { _type: 'span', text: 'Your house is auctioned. You lose everything.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s the thing. Pennsylvania is a judicial foreclosure state. That means the lender has to go through the courts. This gives you TIME. The whole process typically takes 6-12 months — sometimes longer.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'That\'s 6-12 months to fix this. But you have to act. The clock is ticking.' }],
  },
  // H2: 7 Ways to Avoid Foreclosure
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: '7 Ways to Avoid Foreclosure in Scranton PA' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You have more options than you think. Let me break down each one.' }],
  },
  // H3: Option 1 - Reinstatement
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '1. Reinstatement — Pay What You Owe and Catch Up' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This is the simplest option. You pay all the missed payments, late fees, and any legal costs. The lender reinstates your loan like nothing happened.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'When this works: ', marks: ['strong'] },
      { _type: 'span', text: 'You had a temporary hardship (job loss, medical emergency), you\'ve recovered and have the cash to catch up, you\'re only a few months behind.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'When it doesn\'t work: ', marks: ['strong'] },
      { _type: 'span', text: 'You\'re too far behind, you can\'t afford the lump sum, the underlying problem isn\'t fixed.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you can do this, do it. But most people reading this probably can\'t. That\'s okay. Keep reading.' }],
  },
  // H3: Option 2 - Loan Modification
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '2. Loan Modification — Change the Terms of Your Mortgage' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'A loan modification changes your original loan terms to make payments more affordable.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'The lender might: ', marks: ['strong'] },
      { _type: 'span', text: 'Lower your interest rate, extend your loan term (30 years becomes 40), add missed payments to the end of the loan, reduce the principal balance (rare, but possible).' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'How to get one: ', marks: ['strong'] },
      { _type: 'span', text: 'Call your lender\'s loss mitigation department, ask about modification programs, submit a hardship letter explaining your situation, provide financial documents (pay stubs, bank statements, tax returns), wait for approval (this can take weeks or months).' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Pro tip: ', marks: ['strong'] },
      { _type: 'span', text: 'Don\'t stop making payments while you wait. Keep paying what you can.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Reality check: ', marks: ['strong'] },
      { _type: 'span', text: 'Lenders deny a LOT of modification requests. Have a backup plan.' },
    ],
  },
  // H3: Option 3 - Forbearance
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '3. Forbearance Agreement — Temporary Payment Pause' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Forbearance is a temporary pause or reduction in your mortgage payments. The lender agrees to not foreclose while you get back on your feet.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'What you need to know: ', marks: ['strong'] },
      { _type: 'span', text: 'This is NOT forgiveness — you still owe the money. Missed payments are usually due at the end of forbearance. It\'s a short-term fix, not a permanent solution.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'When it works: ', marks: ['strong'] },
      { _type: 'span', text: 'You have a temporary hardship with a clear end date, you\'ll be able to catch up after the forbearance period, you need breathing room to figure out your next move.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Be honest with yourself about what you can actually afford.' }],
  },
  // H3: Option 4 - Repayment Plan
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '4. Repayment Plan — Spread Out What You Owe' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'A repayment plan lets you catch up on missed payments over time. Instead of paying a lump sum, you pay extra each month until you\'re current.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Example: ', marks: ['strong'] },
      { _type: 'span', text: 'You\'re $6,000 behind. The lender agrees to a 12-month repayment plan. You pay your normal mortgage + $500/month for 12 months.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'When it works: ', marks: ['strong'] },
      { _type: 'span', text: 'You can afford your regular payment PLUS extra, you\'re only a few months behind, your income has stabilized.' },
    ],
  },
  // H3: Option 5 - Refinance
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '5. Refinance — Replace Your Current Loan' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Refinancing means getting a new mortgage to pay off the old one. If you qualify, you might get lower interest rate, lower monthly payment, or cash out equity to pay off debts.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'The catch: ', marks: ['strong'] },
      { _type: 'span', text: 'You need decent credit and equity to refinance. If you\'re behind on payments, your credit is probably damaged. If you\'re underwater (owe more than the house is worth), refinancing isn\'t an option.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Alternative: ', marks: ['strong'] },
      { _type: 'span', text: 'FHA has programs for homeowners facing hardship. Ask a mortgage broker about FHA Streamline or FHA-HAMP.' },
    ],
  },
  // H3: Option 6 - Sell Your House
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '6. Sell Your House Before Foreclosure' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s the truth most people don\'t want to hear. Sometimes the best move is to sell.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Why selling might be your best option: ', marks: ['strong'] },
      { _type: 'span', text: 'You walk away with cash instead of nothing, you avoid foreclosure on your credit (stays there 7 years), you control the timeline, you can move on with your life.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Two ways to sell:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Option A: List with a realtor — ', marks: ['strong'] },
      { _type: 'span', text: 'Takes 60-90+ days (you might not have that long), you\'ll pay 6% in commissions + closing costs, buyers might demand repairs you can\'t afford, financing can fall through.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Option B: Sell to a cash buyer — ', marks: ['strong'] },
      { _type: 'span', text: 'Close in as little as 7-14 days, no commissions, no fees, sell as-is, no repairs, certain, guaranteed closing.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'At ClearEdge Home Buyers, we buy houses from homeowners facing foreclosure all the time. We can often close before the sheriff\'s sale — putting cash in your pocket and stopping the foreclosure.' }],
  },
  // H3: Option 7 - Deed in Lieu
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '7. Deed in Lieu of Foreclosure — Give the House Back' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'A deed in lieu means you voluntarily transfer the property to the lender. In exchange, they cancel the debt and don\'t foreclose.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Pros: ', marks: ['strong'] },
      { _type: 'span', text: 'Faster than foreclosure, less damaging to your credit than foreclosure, you avoid the public embarrassment of sheriff\'s sale.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Cons: ', marks: ['strong'] },
      { _type: 'span', text: 'You lose the house, you get no cash, not all lenders accept deed in lieu, you may still owe money if the house is worth less than you owe (deficiency).' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This is a last resort. But it\'s better than foreclosure.' }],
  },
  // H2: Foreclosure Timeline in Lackawanna County
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'The Foreclosure Timeline in Lackawanna County' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you\'re in Scranton or anywhere in Lackawanna County, here\'s what to expect:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 1: Pre-Foreclosure (Day 1-120) — ', marks: ['strong'] },
      { _type: 'span', text: 'Missed payments pile up, lender sends notices, you\'re still in control — all options are open.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 2: Foreclosure Complaint Filed — ', marks: ['strong'] },
      { _type: 'span', text: 'Lender files with Lackawanna County Court of Common Pleas, you get served with legal papers, you have 20 days to respond.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 3: Conciliation Conference — ', marks: ['strong'] },
      { _type: 'span', text: 'Pennsylvania requires a conciliation conference for owner-occupied homes. This is a meeting with the lender to explore alternatives. SHOW UP. This is your chance to negotiate.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 4: Judgment — ', marks: ['strong'] },
      { _type: 'span', text: 'If no agreement is reached, the court issues a judgment. The lender can schedule a sheriff\'s sale.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 5: Sheriff\'s Sale — ', marks: ['strong'] },
      { _type: 'span', text: 'Your house is auctioned at the Lackawanna County Courthouse. Highest bidder wins. You must vacate.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Important: ', marks: ['strong'] },
      { _type: 'span', text: 'You can stop this process at almost any point by working out a deal with the lender OR selling the house.' },
    ],
  },
  // H2: How Selling Stops Foreclosure
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'How Selling Your House Stops Foreclosure' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let me explain exactly how this works.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'When you sell your house: ', marks: ['strong'] },
      { _type: 'span', text: 'The buyer (us or someone else) pays off your mortgage at closing, the mortgage is satisfied, the foreclosure case is dismissed, you keep any remaining equity.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Example: ', marks: ['strong'] },
      { _type: 'span', text: 'You owe $120,000 on your mortgage. Your house is worth $150,000. You sell to a cash buyer for $140,000. At closing, $120,000 pays off the bank. You walk away with $20,000 cash.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'That $20,000 is yours. To start over. To move. To breathe.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Compare that to foreclosure where you get nothing — and your credit is destroyed for 7 years.' }],
  },
  // H2: Credit Impact
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'What Foreclosure Does to Your Credit' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let\'s talk about the real cost of foreclosure.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Foreclosure stays on your credit report for 7 years.', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'During that time: Your credit score drops 100-150+ points, you can\'t get a conventional mortgage for 7 years, FHA loans require a 3-year waiting period, higher interest rates on everything (cars, credit cards), some landlords won\'t rent to you, some employers check credit for hiring decisions.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Selling before foreclosure is different.', marks: ['strong'] },
      { _type: 'span', text: ' A regular sale doesn\'t show as foreclosure on your credit. Yes, the missed payments hurt your score. But you avoid the foreclosure marker.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You could potentially buy another house in 2-3 years instead of 7. That\'s a massive difference.' }],
  },
  // H2: Real Story
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Real Story: Scranton Homeowner Facing Foreclosure' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let me tell you about a situation we handled last year.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'A guy in South Scranton — let\'s call him Mike — was 5 months behind on his mortgage. He\'d lost his job during COVID. Found a new one, but at lower pay. The bank had already filed foreclosure. Sheriff\'s sale was scheduled in 6 weeks.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Mike called us in a panic.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s what we found: He owed $85,000 on the mortgage. House was worth about $110,000. He had $25,000 in equity — but was about to lose it all.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We made him a cash offer of $95,000. Closed in 11 days.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'After paying off the mortgage and back payments, Mike walked away with about $8,000 cash. Not life-changing money. But enough for first/last/security on an apartment and some breathing room.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'More importantly: no foreclosure on his record.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'He called me six months later to say thank you. He was back on his feet.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'That\'s why I do this work.', marks: ['strong'] }],
  },
  // H2: Warning Signs
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Warning Signs You\'re Headed Toward Foreclosure' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Catch this early. Here\'s what to watch for:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Financial warning signs:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Using credit cards to pay the mortgage' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Borrowing from retirement accounts' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Skipping other bills to make the mortgage' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Counting on "next month" to catch up' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Avoiding looking at bank statements' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Communication warning signs:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Ignoring calls from the lender' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Throwing away letters without opening them' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Hoping it will "work itself out"' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Not telling your spouse or family' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Life warning signs:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Job loss or reduced hours' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Divorce or separation' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Medical emergency or disability' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Death of a co-borrower' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Unexpected major expense' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If any of these sound familiar, take action NOW. Don\'t wait until the sheriff is at your door.' }],
  },
  // H2: Resources
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Resources for Scranton Homeowners Facing Foreclosure' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here are free resources that can help:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'HUD-Approved Housing Counselors — ', marks: ['strong'] },
      { _type: 'span', text: 'Free foreclosure prevention counseling. Find one at: hud.gov/counseling. They can negotiate with lenders on your behalf.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Pennsylvania Housing Finance Agency (PHFA) — ', marks: ['strong'] },
      { _type: 'span', text: 'Homeowners Emergency Mortgage Assistance Program (HEMAP). Provides loans to help catch up on payments. Call: 1-800-822-1174.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'NeighborWorks Northeastern Pennsylvania — ', marks: ['strong'] },
      { _type: 'span', text: 'Local nonprofit in Scranton. Free foreclosure prevention services. Website: nwnepa.org.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Lackawanna County Bar Association — ', marks: ['strong'] },
      { _type: 'span', text: 'Lawyer referral service. Free or low-cost consultations. Can help you understand your legal rights.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Use these resources. They\'re free and they exist specifically to help people like you.' }],
  },
  // H2: Bottom Line
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'The Bottom Line' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let me be real with you.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Foreclosure is serious. But it\'s not inevitable.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'You have options: ', marks: ['strong'] },
      { _type: 'span', text: 'Reinstatement, loan modification, forbearance, repayment plan, refinance, sell your house, deed in lieu.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'The worst thing you can do is nothing. The second worst thing is waiting too long.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you\'re facing foreclosure in Scranton, Wilkes-Barre, or anywhere in NEPA — take action today.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Call your lender. Talk to a HUD counselor. Explore your options.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Or if you want to know what your house is worth and whether selling makes sense...' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Get a free, no-obligation cash offer at ClearEdge Home Buyers.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We\'ve helped dozens of NEPA homeowners avoid foreclosure by selling fast for cash.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'No pressure. No judgment. Just honest answers about your situation.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you need help to avoid foreclosure in Scranton PA, we\'re here.' }],
  },
]

const faqs = [
  {
    _key: 'faq1',
    question: 'How long do I have before I lose my house to foreclosure in Pennsylvania?',
    answer: 'The process typically takes 6-12 months from the first missed payment to sheriff\'s sale. Pennsylvania\'s judicial foreclosure process is slower than some states, giving you time to explore options.',
  },
  {
    _key: 'faq2',
    question: 'Can I sell my house if I\'m behind on payments?',
    answer: 'Yes. You can sell your house at any point before the sheriff\'s sale. The mortgage gets paid off from the sale proceeds. If you have equity, you keep the rest.',
  },
  {
    _key: 'faq3',
    question: 'What if I owe more than my house is worth?',
    answer: 'You may be able to do a short sale, where the lender accepts less than what\'s owed. This requires lender approval but is often better for everyone than foreclosure.',
  },
  {
    _key: 'faq4',
    question: 'Will foreclosure affect my spouse\'s credit?',
    answer: 'If your spouse is on the mortgage, yes. If they\'re not on the mortgage but you\'re married, it depends on how your other accounts are structured.',
  },
  {
    _key: 'faq5',
    question: 'Can I file bankruptcy to stop foreclosure?',
    answer: 'Bankruptcy can temporarily stop foreclosure (called an automatic stay), but it\'s not a permanent solution unless you can catch up on payments through a Chapter 13 plan. Talk to a bankruptcy attorney.',
  },
  {
    _key: 'faq6',
    question: 'What happens to my stuff if I\'m foreclosed on?',
    answer: 'You\'ll need to remove your belongings before the new owner takes possession. You typically have until the sheriff\'s sale, but check with an attorney for exact timelines.',
  },
  {
    _key: 'faq7',
    question: 'Can I just walk away from my house?',
    answer: 'You can, but you may still owe money (deficiency judgment) if the house sells for less than you owe. Plus foreclosure destroys your credit for 7 years.',
  },
  {
    _key: 'faq8',
    question: 'How fast can a cash buyer close?',
    answer: 'At ClearEdge Home Buyers, we can close in as little as 7 days. More typically 10-14 days. Fast enough to beat most sheriff\'s sales.',
  },
]

async function createBlogPost() {
  console.log('Starting blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)

  try {
    // Fetch location references
    console.log('\nFetching location references...')
    const locations = await client.fetch(
      `*[_type == "location" && slug.current in ["scranton", "wilkes-barre", "dunmore"]]{ _id, city, slug }`
    )
    console.log('Found locations:', locations.map(l => l.city))

    // Fetch situation references
    console.log('\nFetching situation references...')
    const situations = await client.fetch(
      `*[_type == "situation" && slug.current in ["foreclosure"]]{ _id, title, slug }`
    )
    console.log('Found situations:', situations.map(s => s.title))

    // Add _key to each content block
    const contentWithKeys = blogPostContent.map((block, index) => ({
      ...block,
      _key: `block${index}`,
      children: block.children?.map((child, childIndex) => ({
        ...child,
        _key: `child${index}_${childIndex}`,
      })),
    }))

    const blogPost = {
      _type: 'blogPost',
      title: 'How to Avoid Foreclosure in Scranton PA: 7 Options Before It\'s Too Late',
      slug: {
        _type: 'slug',
        current: 'avoid-foreclosure-scranton-pa',
      },
      metaTitle: 'Avoid Foreclosure Scranton PA | 7 Options to Save Your Home',
      metaDescription: 'Facing foreclosure in Scranton PA? Learn 7 ways to stop foreclosure, the PA timeline, and how selling your house fast can save your credit. Free guide.',
      excerpt: 'If you\'re trying to avoid foreclosure in Scranton PA, you have more options than you think. Here are 7 ways to stop foreclosure before it\'s too late — including one most people overlook.',
      author: 'Tyler Swenson',
      authorTitle: 'Founder, ClearEdge Home Buyers',
      publishedAt: '2026-01-02T18:00:00Z',
      category: 'situations',
      content: contentWithKeys,
      faqs: faqs,
      relatedLocations: locations.length > 0 ? locations.map((loc) => ({
        _type: 'reference',
        _ref: loc._id,
        _key: `loc_${loc._id}`,
      })) : [],
      relatedSituations: situations.length > 0 ? situations.map((sit) => ({
        _type: 'reference',
        _ref: sit._id,
        _key: `sit_${sit._id}`,
      })) : [],
    }

    console.log('\nCreating blog post...')
    const result = await client.create(blogPost)
    console.log('\n✅ Blog post created successfully!')
    console.log('Document ID:', result._id)
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/avoid-foreclosure-scranton-pa')

    return result
  } catch (error) {
    console.error('\n❌ Error creating blog post:', error.message)
    if (error.response) {
      console.error('Response:', error.response)
    }
    throw error
  }
}

createBlogPost()
