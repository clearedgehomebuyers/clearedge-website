import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: resolve(__dirname, '../.env.local') })

// Read client (no token needed for public queries)
const readClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Write client (token required for mutations)
const writeClient = createClient({
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
    children: [
      { _type: 'span', text: 'If you\'re looking for ', marks: [] },
      { _type: 'span', text: 'cash home buyers in Berks County', marks: ['strong'] },
      { _type: 'span', text: ', you\'re probably done with the runaround.', marks: [] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Done waiting for buyers who never show. Done with lowball offers from tire-kickers. Done with agents who promise the world and deliver nothing.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I get it.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'m Tyler Swenson, founder of ClearEdge Home Buyers. Since 2016, I\'ve bought over 200 houses across Eastern Pennsylvania — Reading, Wyomissing, Kutztown, Birdsboro, Douglassville. I\'ve seen every situation you can imagine: inherited houses that sat empty for years, rentals with nightmare tenants, properties facing foreclosure with days on the clock.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This guide covers everything you need to know about selling your house for cash in Berks County — how it works, what we pay, which neighborhoods we buy in, and how to avoid getting ripped off by the wrong buyer.' }],
  },

  // H2: Why Berks County Homeowners Are Choosing Cash Buyers in 2026
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Why Berks County Homeowners Are Choosing Cash Buyers in 2026' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'The Berks County real estate market has shifted. Here\'s what\'s happening:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Buyers are pickier than ever.', marks: ['strong'] },
      { _type: 'span', text: ' With mortgage rates still in the low 6s, buyers have leverage. They want move-in ready. They want updated kitchens. They want concessions. If your house doesn\'t check every box, it sits.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Inventory is creeping up.', marks: ['strong'] },
      { _type: 'span', text: ' More homes on the market means more competition. Properties that would have sold in a weekend in 2021 are now taking 60-90 days — if they sell at all.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Inspection negotiations are brutal.', marks: ['strong'] },
      { _type: 'span', text: ' Buyers are using inspections as leverage to renegotiate prices. Sellers are giving up $10,000-$20,000 in credits after already accepting an offer.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Financing falls through.', marks: ['strong'] },
      { _type: 'span', text: ' Roughly 1 in 5 deals in Berks County falls apart before closing. Job changes, credit issues, appraisal problems. You\'re back to square one.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Cash buyers eliminate all of this. No financing contingency. No inspection negotiations. No waiting and hoping.' }],
  },

  // H2: The Real Cost of Selling the Traditional Way
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'The Real Cost of Selling the Traditional Way in Berks County' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let\'s look at what it actually costs to sell a $250,000 house the traditional way:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Traditional Sale Costs:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Agent commission (5-6%): $12,500-$15,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Closing costs (2-3%): $5,000-$7,500' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Repairs and staging: $5,000-$10,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Buyer concessions: $5,000-$10,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• 3-4 months holding costs: $6,000-$8,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Total out of pocket: $33,500-$50,500', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Cash Sale to ClearEdge:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Agent commission: $0' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Closing costs: $0 (we pay)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Repairs: $0' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Concessions: $0' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Holding costs: Minimal (close in 7-14 days)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Total out of pocket: $0', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'The math often comes out closer than you\'d think — especially when you factor in time, stress, and certainty.' }],
  },

  // H2: How Cash Home Buyers in Berks County Work
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'How Cash Home Buyers in Berks County Work' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s our process at ClearEdge Home Buyers:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 1: You reach out.', marks: ['strong'] },
      { _type: 'span', text: ' Call us at (570) 904-2059 or fill out our online form. Tell us about your property — address, condition, your situation, your timeline.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 2: We do our homework.', marks: ['strong'] },
      { _type: 'span', text: ' We research comparable sales, check property records, and estimate repair costs based on what you\'ve told us.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 3: Quick walkthrough.', marks: ['strong'] },
      { _type: 'span', text: ' We schedule a brief visit to confirm condition. Usually 15-20 minutes. No pressure, no sales pitch.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 4: You get an offer.', marks: ['strong'] },
      { _type: 'span', text: ' Usually within 24 hours of the walkthrough. We explain exactly how we calculated it — no hidden math.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 5: You decide.', marks: ['strong'] },
      { _type: 'span', text: ' No pressure. Take your time. Get other offers if you want. Compare apples to apples.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 6: Pick your closing date.', marks: ['strong'] },
      { _type: 'span', text: ' Need to close in 7 days? We can do that. Need 30 days to find a new place? No problem. You\'re in control.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Step 7: Get paid.', marks: ['strong'] },
      { _type: 'span', text: ' Show up to closing, sign the paperwork, get your check. We use a local title company and handle all the details.' },
    ],
  },

  // H2: What We Pay for Houses in Berks County
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'What We Pay for Houses in Berks County' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let me be straight with you: cash buyers pay less than retail value. That\'s how we make money.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Typically, we pay 70-85% of after-repair value (ARV)', marks: ['strong'] },
      { _type: 'span', text: ' depending on location and condition.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s how we calculate it:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• After-Repair Value (ARV): What your house would sell for fully renovated' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Minus repair costs: What it takes to get it there' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Minus our costs: Holding costs, selling costs, profit margin' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Equals your offer' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Example:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'A house in Reading that would sell for $200,000 after renovation. Needs $35,000 in work. We might offer $115,000-$125,000.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'That sounds low until you run the numbers from the comparison above. When you eliminate $30,000-$40,000 in fees, commissions, and holding costs, the net is often similar — and you have your money in 2 weeks instead of 4 months.' }],
  },

  // H2: What Makes Berks County Different
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'What Makes Berks County Different (And Why It Matters for Sellers)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'ve bought houses throughout Berks County. Each area has its own characteristics:' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Reading City' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Old housing stock, strong rental demand. Many row homes and twins built 80-100 years ago. Common issues: outdated electrical, aging roofs, lead paint. These properties struggle on the traditional market but work well for buy-and-hold investors.' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Wyomissing / Spring Township' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'More desirable area, higher price points. Properties here often need less work and command better offers. Good candidate for "wholetail" (light cosmetic updates and quick resale to retail buyer).' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Route 222 Corridor (Kutztown, Fleetwood, Topton)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Growing area with commuter appeal. Mix of older homes and newer construction. Properties with good bones but dated interiors do well here.' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Western Berks (Hamburg, Port Clinton)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'More rural, more land. Septic and well systems are common. Properties can take longer to sell traditionally because the buyer pool is smaller. Cash buyers provide certainty here.' }],
  },
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: 'Southern Berks (Birdsboro, Douglassville, Exeter)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Growing area near Chester County line. Good schools, family neighborhoods. Homes here often sell faster traditionally, but cash still makes sense for distressed situations.' }],
  },

  // H2: Situations Where Cash Buyers Make Sense
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Situations Where Cash Buyers Make the Most Sense' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Cash sales aren\'t for everyone. But they\'re ideal for:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Major repairs needed.', marks: ['strong'] },
      { _type: 'span', text: ' Foundation issues, roof replacement, mold, fire damage. Traditional buyers can\'t finance these properties.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Inherited property.', marks: ['strong'] },
      { _type: 'span', text: ' You don\'t want to deal with an estate house, especially from out of state. We handle everything.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Pre-foreclosure.', marks: ['strong'] },
      { _type: 'span', text: ' Clock is ticking. You need to sell fast to protect your credit and walk away with something.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Divorce.', marks: ['strong'] },
      { _type: 'span', text: ' Need to split assets quickly and move on. Neither party wants to manage a 6-month listing.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Problem tenants.', marks: ['strong'] },
      { _type: 'span', text: ' Non-paying tenants, property damage, eviction headaches. We buy tenant-occupied properties and take over the problem.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Tired landlord.', marks: ['strong'] },
      { _type: 'span', text: ' Done with 2am phone calls, done with repairs, done with being a landlord. We offer an exit.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Job relocation.', marks: ['strong'] },
      { _type: 'span', text: ' Need to move quickly and can\'t afford to carry two mortgages while waiting for a sale.' },
    ],
  },

  // H2: Red Flags
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Red Flags: How to Spot Sketchy Cash Buyers' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Not every cash buyer is legitimate. Watch out for:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'No proof of funds.', marks: ['strong'] },
      { _type: 'span', text: ' Real cash buyers can show bank statements or proof of funds letters. If they can\'t, they probably don\'t have the money.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'High-pressure tactics.', marks: ['strong'] },
      { _type: 'span', text: ' "Sign today or the offer expires." Legitimate buyers give you time to decide. We never pressure sellers.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'They\'re actually wholesalers.', marks: ['strong'] },
      { _type: 'span', text: ' Some "cash buyers" just flip your contract to someone else for a fee. Ask directly: "Are YOU buying this house, or are you assigning the contract?"' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Hidden fees at closing.', marks: ['strong'] },
      { _type: 'span', text: ' "No fees" should mean no fees. If charges appear at the closing table that weren\'t disclosed, walk away.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Lowball offers way below others.', marks: ['strong'] },
      { _type: 'span', text: ' Get multiple offers. If one is $20,000 below the rest, something\'s off.' },
    ],
  },

  // H2: Why Work With a Local Berks County Buyer
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Why Work With a Local Berks County Buyer' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You\'ve probably seen ads from national "We Buy Houses" companies. Here\'s why local is better:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'We know the neighborhoods.', marks: ['strong'] },
      { _type: 'span', text: ' I know the difference between a Reading row home and a Wyomissing single family. I know which Kutztown streets are better investments. National companies don\'t.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'We\'re accountable.', marks: ['strong'] },
      { _type: 'span', text: ' I live and work in Eastern PA. My reputation matters here. A national company doesn\'t care about one bad review in Reading.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Faster decisions.', marks: ['strong'] },
      { _type: 'span', text: ' No corporate approval needed. I make the decision. I write the check.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'We typically pay more.', marks: ['strong'] },
      { _type: 'span', text: ' Less overhead means we can offer more than companies with national marketing budgets and corporate layers.' },
    ],
  },

  // H2: Real Story
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Real Story: Reading Landlord Done With Tenants' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Mike owned a duplex in Reading. He\'d been a landlord for 12 years and was just done. The tenants were late every month, the property needed a new roof and HVAC, and he was spending every weekend dealing with something.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'He talked to an agent who told him he\'d need to evict the tenants, invest $25,000 in repairs, and list it — with no guarantee of what he\'d get.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We offered $105,000 for the property as-is, tenants included. We closed in 18 days. Mike walked away with a check, no eviction hassle, no repair headaches.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Was $105,000 less than he might have gotten after repairs and eviction? Probably. But he valued his time and sanity more than the extra few thousand — and he got certainty instead of risk.' }],
  },

  // H2: Common Questions
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Common Questions About Selling to Cash Buyers' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '"My house is a disaster. Will you still buy it?"', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Yes. Fire damage, water damage, mold, hoarder houses, foundation issues, no HVAC, no roof — we\'ve bought them all. The worse the condition, the more a cash sale makes sense.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '"I\'m behind on property taxes. Can you still buy?"', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Yes. We pay off tax liens at closing. The amount comes out of the sale price, but you walk away clean.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '"I\'m behind on my mortgage. Is it too late?"', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Usually not. We can often close before foreclosure goes through, helping you protect your credit and walk away with any remaining equity.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '"What about my tenants?"', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We buy tenant-occupied properties regularly. You don\'t need to evict anyone. We take over the lease and handle everything going forward.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '"Can I negotiate your offer?"', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Always. Our first offer isn\'t necessarily our best offer. If you\'ve got comparable sales data or other offers, share them. We want to make a deal that works.' }],
  },

  // Closing
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Ready to Get a Cash Offer on Your Berks County House?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you need to sell your house fast in Berks County, we\'re here to help.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'At ClearEdge Home Buyers, we\'ve been buying houses in Reading, Wyomissing, Kutztown, and all of Berks County since 2016. No commissions. No closing costs. No repairs. Just a fair cash offer and a fast, easy closing.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Here\'s how to get started:', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Visit our homepage and fill out the form for a cash offer' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Learn more about how our process works' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '• Or call us directly at (570) 904-2059' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We respond within 24 hours with a no-obligation cash offer.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'If you\'re looking for cash home buyers in Berks County, we\'re ready to make you an offer.', marks: ['strong'] },
    ],
  },

  // Author Bio
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'About the Author' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Tyler Swenson is the founder of ClearEdge Home Buyers, a cash home buying company serving Eastern Pennsylvania since 2016. He has helped over 200 homeowners sell their properties quickly and hassle-free across NEPA, Lehigh Valley, Berks County, and the Poconos.' }],
  },
]

const faqs = [
  {
    _key: 'faq1',
    question: 'How fast can cash home buyers close in Berks County?',
    answer: 'We can close in as little as 7 days if the title is clear. Typical closing is 10-14 days. If you need more time, we\'re flexible — you pick the date.',
  },
  {
    _key: 'faq2',
    question: 'Do cash home buyers in Berks County pay fair prices?',
    answer: 'Cash buyers typically pay 70-85% of after-repair market value. However, when you factor in zero commissions, zero closing costs, zero repairs, and no holding costs, many sellers net the same or more than a traditional sale.',
  },
  {
    _key: 'faq3',
    question: 'What types of houses do you buy in Berks County?',
    answer: 'We buy all types — single family, duplexes, multi-family, any condition. Fire damage, water damage, mold, foundation issues, hoarder houses, tenant-occupied. If it\'s in Berks County, we\'ll make an offer.',
  },
  {
    _key: 'faq4',
    question: 'Do I need to clean out the house before selling?',
    answer: 'No. Take what you want, leave the rest. We handle all cleanouts, junk removal, and debris. You don\'t need to lift a finger.',
  },
  {
    _key: 'faq5',
    question: 'Can I sell my house if I still owe money on the mortgage?',
    answer: 'Yes. We pay off your mortgage at closing. You keep any remaining equity. If you\'re underwater, we may still be able to help with a short sale.',
  },
  {
    _key: 'faq6',
    question: 'What areas of Berks County do you buy in?',
    answer: 'All of Berks County — Reading, Wyomissing, West Reading, Shillington, Sinking Spring, Kutztown, Fleetwood, Hamburg, Birdsboro, Douglassville, Exeter Township, Muhlenberg, and everywhere in between.',
  },
  {
    _key: 'faq7',
    question: 'Are there any fees when selling to a cash buyer?',
    answer: 'With ClearEdge Home Buyers, there are zero fees. No commissions, no closing costs, no junk fees. Our offer is your net (minus your mortgage payoff).',
  },
  {
    _key: 'faq8',
    question: 'How do I know you\'re a legitimate cash buyer?',
    answer: 'Ask for proof of funds. Check our reviews. Verify we\'re a real local company. We\'ve been buying houses in Eastern PA since 2016 and have helped over 200 homeowners.',
  },
]

async function createBlogPost() {
  console.log('Starting blog post creation...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)

  try {
    // Fetch location references (Reading exists)
    console.log('\nFetching location references...')
    const locations = await readClient.fetch(
      `*[_type == "location" && slug.current in ["reading"]]{ _id, city, slug }`
    )
    console.log('Found locations:', locations.map(l => l.city))

    // Fetch situation references
    console.log('\nFetching situation references...')
    const situations = await readClient.fetch(
      `*[_type == "situation" && slug.current in ["foreclosure", "inherited-property", "divorce", "tired-landlord"]]{ _id, title, slug }`
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
      title: 'Cash Home Buyers Berks County: The Complete 2026 Guide',
      slug: {
        _type: 'slug',
        current: 'cash-home-buyers-berks-county',
      },
      metaTitle: 'Cash Home Buyers Berks County PA | Get a Cash Offer in 24 Hours',
      metaDescription: 'Looking for cash home buyers in Berks County? Get a fair cash offer in 24 hours. We buy houses in Reading, Wyomissing, Kutztown & all of Berks County. No fees, close in 7 days.',
      excerpt: 'Looking for cash home buyers in Berks County? Here\'s the complete guide — how it works, what we pay, which neighborhoods we buy in, and how to avoid getting ripped off.',
      author: 'Tyler Swenson',
      authorTitle: 'Founder, ClearEdge Home Buyers',
      publishedAt: '2026-01-07T10:00:00Z',
      category: 'locations',
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
    const result = await writeClient.create(blogPost)
    console.log('\n✅ Blog post created successfully!')
    console.log('Document ID:', result._id)
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/cash-home-buyers-berks-county')

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
