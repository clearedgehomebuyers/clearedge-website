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
    children: [{ _type: 'span', text: 'The documents required for selling inherited property can feel overwhelming when you\'re already dealing with grief.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Death certificate. Letters testamentary. Affidavit of heirship. Tax clearance certificates.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'It\'s a lot.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'And if you get it wrong, the sale falls apart.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'m Tyler Swenson, founder of ClearEdge Home Buyers.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Since 2016, I\'ve helped dozens of families across Eastern Pennsylvania sell inherited properties.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'ve seen deals delayed for months because of missing paperwork.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'ve also seen families close in two weeks because they had everything lined up.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'The difference? Knowing exactly what documents you need upfront.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Let me walk you through the complete checklist.' }],
  },
  // H2: The Two Paths
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'The Two Paths: Probate vs. Non-Probate' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Before we dive into documents, you need to know which situation you\'re in.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Path 1: The property went through probate (or is currently in probate)', marks: ['strong'] },
      { _type: 'span', text: ' — This is most common. If the house was solely in the deceased\'s name, probate is required.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Path 2: The property bypassed probate', marks: ['strong'] },
      { _type: 'span', text: ' — This happens if the property was in a living trust, had a Transfer on Death deed, or was jointly owned with right of survivorship.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Your document requirements depend on which path you\'re on.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'ll cover both.' }],
  },
  // H2: Documents Required - Probate Path
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Documents Required for Selling Inherited Property (Probate Path)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you\'re going through probate — or already went through it — here\'s what you\'ll need to sell.' }],
  },
  // H3: 1. Death Certificate
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '1. Death Certificate' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'What it is: ', marks: ['strong'] },
      { _type: 'span', text: 'Official document proving the property owner passed away.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Where to get it: ', marks: ['strong'] },
      { _type: 'span', text: 'Pennsylvania Department of Health, local register of wills, or the funeral home.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'How many you need: ', marks: ['strong'] },
      { _type: 'span', text: 'Get at least 5-6 certified copies. Banks, title companies, and buyers all want originals.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Cost: ', marks: ['strong'] },
      { _type: 'span', text: 'About $20 per certified copy in Pennsylvania.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Pro tip: ', marks: ['strong'] },
      { _type: 'span', text: 'Order more than you think you need. Running out mid-transaction is a headache.' },
    ],
  },
  // H3: 2. Letters Testamentary
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '2. Letters Testamentary (or Letters of Administration)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'What it is: ', marks: ['strong'] },
      { _type: 'span', text: 'Court document proving you have legal authority to act on behalf of the estate.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Letters Testamentary', marks: ['strong'] },
      { _type: 'span', text: ' = There was a will, and you\'re the named executor.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Letters of Administration', marks: ['strong'] },
      { _type: 'span', text: ' = No will existed, and the court appointed you as administrator.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Where to get it: ', marks: ['strong'] },
      { _type: 'span', text: 'The Register of Wills in the county where the deceased lived.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Why it matters: ', marks: ['strong'] },
      { _type: 'span', text: 'Without this, you cannot legally sell the property. Period.' },
    ],
  },
  // H3: 3. The Will
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '3. The Will (If One Exists)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'What it is: ', marks: ['strong'] },
      { _type: 'span', text: 'The deceased\'s legal document stating how assets should be distributed.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Where to get it: ', marks: ['strong'] },
      { _type: 'span', text: 'The original should be filed with the Register of Wills during probate.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Why it matters: ', marks: ['strong'] },
      { _type: 'span', text: 'The will may specify how real estate should be handled. Some wills give executors full authority to sell. Others require court approval.' },
    ],
  },
  // H3: 4. Proof of Identity
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '4. Proof of Your Identity' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'What you need: ', marks: ['strong'] },
      { _type: 'span', text: 'Government-issued photo ID (driver\'s license or passport), Social Security number' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Why it matters: ', marks: ['strong'] },
      { _type: 'span', text: 'Title companies verify your identity before transferring property.' },
    ],
  },
  // H3: 5. Property Deed
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '5. Property Deed' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'What it is: ', marks: ['strong'] },
      { _type: 'span', text: 'Legal document showing current ownership of the property.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Where to get it: ', marks: ['strong'] },
      { _type: 'span', text: 'County Recorder of Deeds office, or from the deceased\'s files.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Why it matters: ', marks: ['strong'] },
      { _type: 'span', text: 'This confirms the property was owned by the deceased and shows how it was titled.' },
    ],
  },
  // H3: 6. Title Search
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '6. Title Search / Title Report' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'What it is: ', marks: ['strong'] },
      { _type: 'span', text: 'A search of public records to verify ownership and uncover any liens, mortgages, or claims against the property.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Who orders it: ', marks: ['strong'] },
      { _type: 'span', text: 'Usually the title company or closing attorney handles this.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Why it matters: ', marks: ['strong'] },
      { _type: 'span', text: 'Clears the path for clean title transfer to the buyer.' },
    ],
  },
  // H3: 7. PA Inheritance Tax Clearance
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '7. PA Inheritance Tax Clearance (REV-1500)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'What it is: ', marks: ['strong'] },
      { _type: 'span', text: 'Certificate from Pennsylvania Department of Revenue showing inheritance taxes have been paid or are accounted for.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Where to get it: ', marks: ['strong'] },
      { _type: 'span', text: 'File Form REV-1500 with PA Department of Revenue.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Why it matters: ', marks: ['strong'] },
      { _type: 'span', text: 'In Pennsylvania, inheritance tax is due within 9 months of death. Title companies want proof this is handled before closing.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Tax rates in PA: ', marks: ['strong'] },
      { _type: 'span', text: '0% for surviving spouses, 4.5% for direct descendants (children, grandchildren), 12% for siblings, 15% for others' },
    ],
  },
  // H3: 8. Real Estate Tax Certification
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '8. Real Estate Tax Certification' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'What it is: ', marks: ['strong'] },
      { _type: 'span', text: 'Proof that property taxes are current.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Where to get it: ', marks: ['strong'] },
      { _type: 'span', text: 'County tax assessment office.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Why it matters: ', marks: ['strong'] },
      { _type: 'span', text: 'Outstanding property taxes create liens. These must be cleared at closing.' },
    ],
  },
  // H3: 9. Mortgage Payoff Statement
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '9. Mortgage Payoff Statement (If Applicable)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'What it is: ', marks: ['strong'] },
      { _type: 'span', text: 'Statement from the lender showing exact amount needed to pay off any remaining mortgage.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Where to get it: ', marks: ['strong'] },
      { _type: 'span', text: 'Contact the mortgage servicer directly.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Why it matters: ', marks: ['strong'] },
      { _type: 'span', text: 'The mortgage gets paid from sale proceeds at closing.' },
    ],
  },
  // H3: 10. Court Order
  {
    _type: 'block',
    style: 'h3',
    children: [{ _type: 'span', text: '10. Court Order Authorizing Sale (Sometimes Required)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'What it is: ', marks: ['strong'] },
      { _type: 'span', text: 'Formal court approval to sell the real estate.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'When you need it: ', marks: ['strong'] },
      { _type: 'span', text: 'If the will doesn\'t give the executor independent authority to sell, or if heirs dispute the sale.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Where to get it: ', marks: ['strong'] },
      { _type: 'span', text: 'File a petition with the Orphans\' Court in the county where probate is happening.' },
    ],
  },
  // H2: Non-Probate Path
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Documents Required for Selling Inherited Property (Non-Probate Path)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If the property bypassed probate, your document list is shorter.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'If Property Was in a Living Trust: ', marks: ['strong'] },
      { _type: 'span', text: 'Death certificate (certified copy), The trust document (shows you as successor trustee), Trustee certification (affidavit confirming your authority), Property deed (showing trust ownership), Your ID' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'If Property Had a Transfer on Death (TOD) Deed: ', marks: ['strong'] },
      { _type: 'span', text: 'Death certificate (certified copy), The original TOD deed (recorded with the county), Affidavit of survivorship (confirms you\'re the named beneficiary), Your ID' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'If Property Was Jointly Owned (Right of Survivorship): ', marks: ['strong'] },
      { _type: 'span', text: 'Death certificate (certified copy), The original deed (showing joint tenancy with right of survivorship), Affidavit of survivorship (to remove deceased from title), Your ID' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'In all these cases, no court involvement is needed. You update the title, then sell.' }],
  },
  // H2: Documents Buyer Will Want
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Documents the Buyer Will Want' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Beyond proving your authority to sell, buyers (or their lenders) typically request:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Property survey', marks: ['strong'] },
      { _type: 'span', text: ' — Shows exact boundaries and any encroachments' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Home inspection report', marks: ['strong'] },
      { _type: 'span', text: ' — Buyer usually orders this' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Seller\'s disclosure', marks: ['strong'] },
      { _type: 'span', text: ' — PA requires sellers to disclose known defects' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'HOA documents', marks: ['strong'] },
      { _type: 'span', text: ' — If applicable, includes rules and financials' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Utility information', marks: ['strong'] },
      { _type: 'span', text: ' — Account numbers for transfer' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Cash buyers like us don\'t require most of this. We buy as-is. No inspection contingencies. No lengthy disclosure negotiations. Just the documents proving you can legally sell.' }],
  },
  // H2: Out of State
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'How to Get Documents When You\'re Out of State' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Selling an inherited property from across the country? This is more common than you\'d think.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s how to handle the paperwork remotely:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '1. Hire a Pennsylvania Probate Attorney', marks: ['strong'] },
      { _type: 'span', text: ' — Even if you\'re in Texas or California, you need a PA attorney for probate. They can file documents, attend court hearings, and handle local requirements.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '2. Use a Title Company That Handles Remote Closings', marks: ['strong'] },
      { _type: 'span', text: ' — Many title companies offer mobile notary services (they come to you), remote online notarization (RON), and mail-away closings.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '3. Grant Power of Attorney', marks: ['strong'] },
      { _type: 'span', text: ' — You can give a trusted person in Pennsylvania power of attorney to sign documents on your behalf. This is common when multiple heirs are spread across the country.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: '4. Work With a Cash Buyer (Easiest Option)', marks: ['strong'] },
      { _type: 'span', text: ' — We regularly buy inherited properties from out-of-state sellers. We coordinate with local attorneys and title companies. You sign remotely. We handle everything else.' },
    ],
  },
  // H2: Common Mistakes
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Common Document Mistakes That Delay Sales' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'I\'ve seen these kill deals or add months to the timeline:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Mistake #1: Not getting enough death certificates', marks: ['strong'] },
      { _type: 'span', text: ' — Order 5-6 minimum. Every institution wants their own certified copy.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Mistake #2: Waiting to file for Letters Testamentary', marks: ['strong'] },
      { _type: 'span', text: ' — Start the probate process immediately. This is the bottleneck.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Mistake #3: Not checking the title early', marks: ['strong'] },
      { _type: 'span', text: ' — Hidden liens, old mortgages, or judgment creditors can surprise you at closing. Run a title search upfront.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Mistake #4: Missing the inheritance tax deadline', marks: ['strong'] },
      { _type: 'span', text: ' — PA inheritance tax is due within 9 months. Miss it and you pay penalties plus interest.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Mistake #5: Assuming all heirs agree', marks: ['strong'] },
      { _type: 'span', text: ' — Get written agreement from all heirs before listing. One holdout can derail everything.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Mistake #6: Losing the original will', marks: ['strong'] },
      { _type: 'span', text: ' — If you can\'t find the original will, probate gets complicated. Search safe deposit boxes, attorney offices, and home safes.' },
    ],
  },
  // H2: Timeline
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Timeline: How Long Does It Take to Get These Documents?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Here\'s a realistic timeline for Pennsylvania:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Death certificate: 1-2 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Letters Testamentary: 3-6 weeks (after filing)' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Title search: 1-2 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Inheritance tax clearance: 2-4 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Mortgage payoff statement: 1-2 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: '• Court order (if needed): 4-8 weeks' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Total time before you can sell (probate path): ', marks: ['strong'] },
      { _type: 'span', text: '2-4 months minimum' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Total time before you can sell (non-probate path): ', marks: ['strong'] },
      { _type: 'span', text: '2-4 weeks' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'This is why proper estate planning matters. Trusts and TOD deeds save your heirs months of waiting.' }],
  },
  // H2: Missing Documents
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'What If You\'re Missing Documents?' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Don\'t panic.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Missing the will? ', marks: ['strong'] },
      { _type: 'span', text: 'The estate goes through "intestate" probate. Property passes according to PA law (spouse first, then children, then other relatives).' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Missing the deed? ', marks: ['strong'] },
      { _type: 'span', text: 'The county Recorder of Deeds has copies of all recorded deeds. You can request a certified copy.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Missing death certificate? ', marks: ['strong'] },
      { _type: 'span', text: 'Order new copies from PA Department of Health or the local Register of Wills.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Missing Letters Testamentary? ', marks: ['strong'] },
      { _type: 'span', text: 'If probate was completed years ago, contact the Register of Wills in the county where it was filed. They keep records.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Can\'t find mortgage information? ', marks: ['strong'] },
      { _type: 'span', text: 'Check the deceased\'s mail, email, and bank statements. The servicer\'s name will appear somewhere.' },
    ],
  },
  // H2: Selling to Cash Buyer
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Selling Inherited Property to a Cash Buyer: What Documents We Need' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'At ClearEdge Home Buyers, we\'ve simplified this process.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'When you sell to us, here\'s what we need:' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'From you: ', marks: ['strong'] },
      { _type: 'span', text: 'Death certificate (certified copy), Letters Testamentary or Letters of Administration, Your photo ID, Signed purchase agreement' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'We handle: ', marks: ['strong'] },
      { _type: 'span', text: 'Title search, Title insurance, Closing coordination, All paperwork' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'That\'s it. No bank appraisals. No buyer financing documents. No inspection reports.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'We close as soon as probate allows — often within 2 weeks of receiving Letters Testamentary.' }],
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
    children: [{ _type: 'span', text: 'The documents required for selling inherited property depend on your situation.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Probate path: ', marks: ['strong'] },
      { _type: 'span', text: 'Death certificate, Letters Testamentary, the will, deed, title search, tax clearances, and possibly court approval.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'Non-probate path: ', marks: ['strong'] },
      { _type: 'span', text: 'Death certificate, trust document or TOD deed, affidavit of survivorship, and your ID.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'Either way, start gathering documents immediately.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'The sooner you have everything, the faster you can sell and move on.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'If you\'re dealing with an inherited property in Eastern Pennsylvania and want to skip the hassle of repairs, showings, and buyer financing...' }],
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
    children: [{ _type: 'span', text: 'We\'ve helped dozens of families navigate this exact situation.' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: 'When you need to know the documents required for selling inherited property, now you have the complete checklist.' }],
  },
]

const faqs = [
  {
    _key: 'faq1',
    question: 'Can I sell inherited property before probate is complete?',
    answer: 'Yes, once you have Letters Testamentary and authority to sell. You don\'t have to wait for probate to fully close.',
  },
  {
    _key: 'faq2',
    question: 'What if multiple heirs inherited the property?',
    answer: 'All heirs typically need to sign the deed or consent to the sale. One alternative: the executor can sell on behalf of the estate if the will grants that authority.',
  },
  {
    _key: 'faq3',
    question: 'Do I need a lawyer to sell inherited property?',
    answer: 'For probate, yes — get a probate attorney. For the actual sale to a cash buyer, a lawyer isn\'t required but can review documents if you want.',
  },
  {
    _key: 'faq4',
    question: 'What if there are liens on the property?',
    answer: 'Liens get paid from sale proceeds at closing. If liens exceed the property value, you\'ll need to negotiate with creditors or consider a short sale.',
  },
  {
    _key: 'faq5',
    question: 'How do I prove I\'m the rightful heir?',
    answer: 'Letters Testamentary (if there\'s a will) or Letters of Administration (if no will) plus the death certificate prove your authority.',
  },
  {
    _key: 'faq6',
    question: 'What\'s an affidavit of heirship?',
    answer: 'A sworn document identifying the deceased\'s heirs. Used when there\'s no will to establish who inherits.',
  },
  {
    _key: 'faq7',
    question: 'Do I need to pay inheritance tax before selling?',
    answer: 'You can sell before paying, but the title company will want assurance taxes will be paid from proceeds — or a tax clearance certificate.',
  },
  {
    _key: 'faq8',
    question: 'What if the property is in a trust but I can\'t find the trust document?',
    answer: 'Contact the attorney who created the trust. They should have copies. Also check safe deposit boxes and the deceased\'s important papers.',
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

    // Fetch situation references
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
      title: 'Documents Required for Selling Inherited Property in Pennsylvania',
      slug: {
        _type: 'slug',
        current: 'documents-required-selling-inherited-property-pennsylvania',
      },
      metaTitle: 'Documents Required for Selling Inherited Property in PA',
      metaDescription: 'Complete checklist of documents needed to sell inherited property in Pennsylvania. Death certificates, Letters Testamentary, tax clearances, and more.',
      excerpt: 'The documents required for selling inherited property can feel overwhelming. Here\'s the complete checklist for Pennsylvania — whether you\'re going through probate or not.',
      author: 'Tyler Swenson',
      authorTitle: 'Founder, ClearEdge Home Buyers',
      publishedAt: '2026-01-06T16:00:00Z',
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
    console.log('\nView at: https://www.clearedgehomebuyers.com/blog/documents-required-selling-inherited-property-pennsylvania')

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
