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
    children: [{ _type: 'span', text: 'Can I sell my deceased parents\' house without probate?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'It\'s the first question most people ask after losing a parent and inheriting property.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'And the answer is: sometimes yes, sometimes no.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Depends on how the house was titled.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'m Tyler Swenson, founder of ClearEdge Home Buyers.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Since 2016, I\'ve helped dozens of families across Eastern Pennsylvania sell inherited properties — many while navigating the probate process.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Some needed full probate. Some skipped it entirely.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let me break down exactly how it works so you know where you stand.' }],
  },
  // H2: What Is Probate
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'What Is Probate (And Why Everyone Wants to Avoid It)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Probate is the legal process of transferring a deceased person\'s assets to their heirs.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'A court oversees everything.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'They validate the will (if there is one).' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'They appoint an executor.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'They make sure debts get paid.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Then — and only then — can property be transferred or sold.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Why people hate it:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Takes 6-12 months minimum in Pennsylvania' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Costs 3-7% of the estate value in legal fees' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Requires court appearances and paperwork' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Everything becomes public record' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• You can\'t sell the house until it\'s resolved (usually)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'So yeah. If you can avoid it, you want to.' }],
  },
  // H2: When You CAN Sell Without Probate
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'When You CAN Sell Without Probate in Pennsylvania' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s the good news.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'There are several situations where you can skip probate entirely and sell your parents\' house right away.' }],
  },
  // H3: Joint Tenancy
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '1. Joint Tenancy With Right of Survivorship' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If your parent owned the house jointly with a spouse (or you) with "right of survivorship," the property transfers automatically when they die.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'No probate needed.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You just need a death certificate and an affidavit to update the deed.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Then you can sell.' }],
  },
  // H3: Living Trust
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '2. The House Was in a Living Trust' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If your parents put the house in a revocable living trust, it bypasses probate completely.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'The successor trustee (probably you) can sell the property immediately following the trust terms.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'No court involvement.' }],
  },
  // H3: TOD Deed
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '3. Transfer on Death (TOD) Deed' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Pennsylvania allows Transfer on Death deeds.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If your parent filed one, the house transfers directly to the named beneficiary when they die.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Just record the death certificate with the county and you own it.' }],
  },
  // H3: Small Estate
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '4. Small Estate Simplified Process' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If your parent\'s entire estate is worth less than $50,000 (not including real estate that passes outside probate), Pennsylvania has a simplified process.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'But here\'s the catch — real estate usually still needs to go through probate unless one of the above applies.' }],
  },
  // H2: When You MUST Go Through Probate
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'When You MUST Go Through Probate' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If the house was titled solely in your deceased parent\'s name with no TOD deed, no trust, and no joint ownership...' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You\'re going through probate.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'There\'s no way around it.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'The house cannot legally be sold until:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '1. The court appoints an executor/administrator' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '2. The executor gets "Letters Testamentary" (or Letters of Administration if no will)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '3. The executor is granted authority to sell real estate' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This typically takes 2-4 months minimum before you can even list the property.' }],
  },
  // H2: How to Sell During Probate
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'How to Sell an Inherited House During Probate' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s what most people don\'t realize.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'You don\'t have to wait until probate is completely finished to sell.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Once the executor has authority (those Letters Testamentary), you can sell the house while probate is still open.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'The process:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '1. Get appointed as executor by the court' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '2. Receive Letters Testamentary' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '3. Get the house appraised (required in PA)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '4. List the house or get cash offers' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '5. Accept an offer' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '6. Court may need to approve the sale (depends on will language)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '7. Close and distribute proceeds according to the will' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'The proceeds from the sale become part of the estate and get distributed to heirs after debts are paid.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Pro tip: ', marks: ['strong'] },
      { _type: 'span', text: 'If the will gives the executor "independent administration" powers, you may not need court approval for the sale. Check with the estate attorney.' },
    ],
  },
  // H2: Cash Buyer During Probate
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Selling to a Cash Buyer During Probate (The Fast Option)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Traditional sales during probate are a nightmare.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Buyers get nervous. Financing falls through. Inspections drag on.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Meanwhile you\'re paying:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Property taxes' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Homeowners insurance' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Utilities' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Lawn care and maintenance' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Mortgage payments (if there\'s still a loan)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Every month the house sits, it costs you money.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Cash buyers like us solve this.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'At ClearEdge Home Buyers, we regularly purchase properties in probate.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s why it works:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'We buy as-is', marks: ['strong'] },
      { _type: 'span', text: ' — no cleaning out, no repairs, no updates' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'We close fast', marks: ['strong'] },
      { _type: 'span', text: ' — as soon as the executor has authority' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'We\'re flexible', marks: ['strong'] },
      { _type: 'span', text: ' — we work around court timelines' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'We pay cash', marks: ['strong'] },
      { _type: 'span', text: ' — no financing contingencies that fall through' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'We know the process', marks: ['strong'] },
      { _type: 'span', text: ' — we\'ve done this dozens of times' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you\'re an executor dealing with an inherited property in Eastern PA, we can make you an offer within 24 hours.' }],
  },
  // H2: What About Other Heirs
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'What About the Other Heirs?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This is where things get messy.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If multiple siblings inherited the house, everyone typically needs to agree on the sale.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'One sibling wants to sell. One wants to keep it. One lives in California and won\'t return calls.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Sound familiar?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Options when heirs disagree:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Buyout', marks: ['strong'] },
      { _type: 'span', text: ' — One heir buys out the others\' shares' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Negotiate', marks: ['strong'] },
      { _type: 'span', text: ' — Come to an agreement on sale terms' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Partition action', marks: ['strong'] },
      { _type: 'span', text: ' — Force a court-ordered sale (expensive, takes forever)' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Sell to a cash buyer', marks: ['strong'] },
      { _type: 'span', text: ' — Often the fastest path to everyone getting their share and moving on' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We\'ve helped families stuck in exactly this situation.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Two sisters. One in New York, one in California. Parents\' house sitting vacant in Allentown.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Neither could afford to fly back for showings. Neither wanted to manage repairs remotely.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We made them a fair offer. Closed in 12 days. They split the proceeds and finally got closure.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Sometimes the fastest solution is the best solution.' }],
  },
  // H2: Tax Implications
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Tax Implications of Selling an Inherited House' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Quick note on taxes because everyone asks.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'The good news: You get a "stepped-up basis."', marks: ['strong'] },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This means your cost basis for the house is the fair market value at the date of death — not what your parents originally paid.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Example:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Parents bought the house for $80,000 in 1985' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• House is worth $250,000 when they die' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• You inherit it and sell for $255,000' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Your taxable gain is only $5,000 (not $175,000)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This is a huge tax benefit.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'But talk to a CPA. I\'m a real estate investor, not a tax advisor. Your situation may have specifics that affect this.' }],
  },
  // H2: Pennsylvania Inheritance Tax
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Pennsylvania Inheritance Tax on Real Estate' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'One more thing PA folks need to know.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Pennsylvania has an inheritance tax that applies to inherited property:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• 0% for surviving spouses' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• 4.5% for direct descendants (children, grandchildren)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• 12% for siblings' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• 15% for everyone else' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This tax is due within 9 months of death.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you sell the house quickly, proceeds can be used to pay this tax.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you hold onto it, you\'ll need cash from somewhere else.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Another reason some families choose to sell fast.' }],
  },
  // H2: How Long Does This Take
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'How Long Does All This Take?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let me give you realistic timelines.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you can skip probate:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Get death certificate: 1-2 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Update deed/title: 2-4 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Sell to cash buyer: 1-2 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Total: 4-8 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you need probate:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• File probate petition: 1-2 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Court appoints executor: 4-8 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Get Letters Testamentary: Same time' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Sell to cash buyer: 1-2 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Distribute proceeds: 2-4 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Total: 3-6 months' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you need probate AND list with a realtor:', marks: ['strong'] }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Probate process: 2-4 months' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Repairs and prep: 2-4 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Time on market: 2-3 months' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Buyer financing and closing: 6-8 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Total: 6-12 months' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'See why cash sales are popular with inherited properties?' }],
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
    children: [{ _type: 'span', text: 'Can you sell your deceased parents\' house without probate in Pennsylvania?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Yes', marks: ['strong'] },
      { _type: 'span', text: ' — if the house was in a trust, had a TOD deed, or was jointly owned with right of survivorship.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'No', marks: ['strong'] },
      { _type: 'span', text: ' — if it was solely in your parent\'s name with none of those arrangements.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Either way, you have options.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you\'re dealing with an inherited property in Eastern Pennsylvania and want to skip the hassle of repairs, showings, and months of waiting...' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We can help.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Get a free, no-obligation cash offer at ClearEdge Home Buyers or learn more about our simple 3-step process.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'No pressure. No judgment. Just a fair offer and a fast closing if you want it.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you\'re asking "can I sell my deceased parents\' house without probate," now you have the answer.' }],
  },
]

const faqs = [
  {
    _key: 'faq1',
    question: 'Can I sell my parents\' house before probate is finished?',
    answer: 'Yes, once the executor has Letters Testamentary and authority to sell. You don\'t have to wait for probate to fully close.',
  },
  {
    _key: 'faq2',
    question: 'What if there\'s no will?',
    answer: 'The court appoints an administrator instead of an executor. The house passes according to Pennsylvania intestacy laws (usually to spouse first, then children). The process takes longer but you can still sell.',
  },
  {
    _key: 'faq3',
    question: 'What if there\'s a mortgage on the house?',
    answer: 'The mortgage doesn\'t disappear. It gets paid off from the sale proceeds. If the house is underwater, that\'s a more complicated situation — talk to a probate attorney.',
  },
  {
    _key: 'faq4',
    question: 'Can I live in my parents\' house during probate?',
    answer: 'Generally yes, but check with the estate attorney. You may need to pay fair market rent to the estate, especially if there are other heirs.',
  },
  {
    _key: 'faq5',
    question: 'What if the house needs major repairs?',
    answer: 'You can sell as-is to a cash buyer. We buy houses in any condition — foundation issues, roof damage, mold, hoarding situations, you name it.',
  },
  {
    _key: 'faq6',
    question: 'How do I find out how the house was titled?',
    answer: 'Check the deed. You can usually find this at the county recorder\'s office or through a title search. An attorney can help.',
  },
  {
    _key: 'faq7',
    question: 'What if one heir won\'t cooperate with selling?',
    answer: 'You may need to pursue a partition action, which forces a sale. It\'s expensive and slow. Often it\'s better to negotiate a buyout or compromise.',
  },
  {
    _key: 'faq8',
    question: 'Do I need a lawyer to sell an inherited house?',
    answer: 'For probate, yes — get a probate attorney. For the actual sale, you can sell without an agent (especially to a cash buyer), but having legal review of documents is smart.',
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
      `*[_type == "location" && slug.current in ["allentown", "scranton", "wilkes-barre"]]{ _id, city, slug }`
    )
    console.log('Found locations:', locations.map(l => l.city))

    // Fetch situation references - inherited-property is the main one
    console.log('\nFetching situation references...')
    const situations = await client.fetch(
      `*[_type == "situation" && slug.current in ["inherited-property"]]{ _id, title, slug }`
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
      title: 'Can I Sell My Deceased Parents\' House Without Probate in Pennsylvania?',
      slug: {
        _type: 'slug',
        current: 'sell-deceased-parents-house-without-probate-pennsylvania',
      },
      metaTitle: 'Sell Deceased Parents\' House Without Probate PA | Guide',
      metaDescription: 'Can you sell your deceased parents\' house without probate in PA? Learn when you can skip probate, when you can\'t, and how to sell fast during the process.',
      excerpt: 'Can you sell your deceased parents\' house without probate? Sometimes yes, sometimes no. Here\'s exactly how it works in Pennsylvania and your options for selling fast.',
      author: 'Tyler Swenson',
      authorTitle: 'Founder, ClearEdge Home Buyers',
      publishedAt: '2026-01-06T14:00:00Z',
      category: 'process-legal',
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
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/sell-deceased-parents-house-without-probate-pennsylvania')

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
