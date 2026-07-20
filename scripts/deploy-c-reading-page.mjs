// Execution Package #2, Deploy C — Reading/Berks inherited page (2026-07-26).
// Creates /blog/sell-inherited-house-reading-pa per Part 3 spec (cloned from the
// Allentown proof) + the bidirectional link set. Every local fact verified
// against official .gov sources — table: seo-audits/reading-page-facts.md.
// NO faqs array on purpose: blog/[slug] still emits FAQPage JSON-LD when faqs
// exist, and the spec says Article + LocalBusiness only.
//
// Dry-run by default; --yes to write. Grep-stable output: WRITTEN /
// VERIFIED-PRESENT / DRY-RUN / ERROR. Create-or-update by slug (idempotent).

import { createClient } from '@sanity/client'
import { randomBytes } from 'crypto'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2026-01-02',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const WRITE = process.argv.includes('--yes')
const SLUG = 'sell-inherited-house-reading-pa'
const PAGE = `/blog/${SLUG}`
const PROBATE = '/blog/sell-deceased-parents-house-without-probate-pennsylvania'
const DOCS = '/blog/documents-required-selling-inherited-property-pennsylvania'

let ctr = 0
const k = () => 'rdg' + Date.now().toString(36) + (ctr++).toString(36)
const key = () => randomBytes(6).toString('hex')

// p(segments): string | {bold} | {italic} | {text, link} | {text, link, bold}
function p(segments, style = 'normal') {
  const children = []
  const markDefs = []
  for (const seg of typeof segments === 'string' ? [segments] : segments) {
    if (typeof seg === 'string') {
      children.push({ _type: 'span', _key: k(), text: seg, marks: [] })
      continue
    }
    const marks = []
    if (seg.link) {
      const mk = k()
      markDefs.push({ _key: mk, _type: 'link', href: seg.link })
      marks.push(mk)
    }
    if (seg.bold) marks.push('strong')
    if (seg.italic) marks.push('em')
    children.push({ _type: 'span', _key: k(), text: seg.text, marks })
  }
  return { _type: 'block', _key: k(), style, children, markDefs }
}
const h2 = t => p(t, 'h2')
const h3 = t => p(t, 'h3')

const content = [
  p([{ text: 'By Tyler Swenson, ClearEdge Home Buyers — we’ve bought 200+ Pennsylvania houses since 2016, including inherited and probate properties across Berks County.', italic: true }]),

  h2('Quick Answer: Can I Sell an Inherited House in Reading?'),
  p([
    'You can sell an inherited house in Reading once you have the legal authority to act for the estate — ',
    { text: 'Letters Testamentary', bold: true },
    ' (when there’s a will) or ',
    { text: 'Letters of Administration', bold: true },
    ' (when there isn’t), issued by the Berks County Register of Wills at 633 Court Street in Reading. From there, you can sell the house as-is to a cash buyer and close in as little as 7–30 days, or list it once it clears the City of Reading’s transfer requirements. If the property passed to you outside the estate — joint ownership with survivorship, a living trust, or a transfer-on-death arrangement — you may not need probate at all.',
  ]),

  h2('Step 1: Get the Legal Authority to Sell'),
  p([
    'Nothing else moves until the estate has a legal representative. If the will names you executor, the ',
    { text: 'Berks County Register of Wills', bold: true },
    ' probates the will and issues Letters Testamentary — the document title companies and buyers will ask for. If there’s no will, Pennsylvania law sets who may administer the estate, and the Register issues Letters of Administration instead.',
  ]),
  p([
    'The office is in the Berks County Services Center, 2nd Floor, 633 Court Street, Reading, PA 19601 — 610-478-6600, Monday–Friday 8:30 AM–4:00 PM. Berks County currently handles probate proceedings ',
    { text: 'virtually, by scheduled appointment', bold: true },
    ': you’re sworn in remotely, then mail or drop off the original documents and payment.',
  ]),
  p('Have these ready when you file: the original will (and any codicil), the original death certificate, the completed petition, witness oaths, your photo ID, renunciations if other heirs are waiving their right to administer, an estate information sheet, and the filing fees.'),
  p('If the estate hits a dispute — a contested will, disagreement between heirs, an inheritance tax appeal — that moves to the Orphans’ Court division, which audits executor accounts and rules on distributions. Most straightforward sales never go there.'),

  h2('Do You Actually Need Probate?'),
  p([
    'Not always. If the deed was held jointly with right of survivorship, the house passed automatically to the surviving owner. Property in a living trust is sold by the trustee under the trust’s terms. In those cases you can often sell without opening an estate. For the full decision tree — including small-estate shortcuts and what happens when the house is the only major asset — see our guide to ',
    { text: 'selling a house without probate in Pennsylvania', link: PROBATE },
    '.',
  ]),

  h2('PA Inheritance Tax on a Berks County House'),
  p([
    'Pennsylvania charges inheritance tax based on your relationship to the person who died: ',
    { text: '0% for a surviving spouse, 4.5% for children and grandchildren, 12% for siblings, and 15% for other heirs', bold: true },
    '. The tax is technically due at death and becomes delinquent nine months after — and there’s a 5% discount on the tax if you pay within three months. Factor the tax into your net before you commit sale proceeds elsewhere.',
  ]),
  h3('The Stepped-Up Basis Advantage'),
  p('Federal tax works in your favor here: your cost basis in an inherited house is generally its fair market value on the date of death, not what your parents paid decades ago. Sell reasonably soon after inheriting and there’s usually little or no capital gain to tax. (An alternate valuation date exists, but only if the executor files Form 706 and elects it — rare for typical estates.)'),

  {
    _type: 'ctaBlock',
    _key: key(),
    heading: 'Inherited a property in Reading or Berks County?',
    body: 'We buy inherited houses throughout Berks County as-is for cash — whether probate is open, closed, or hasn’t started. Get a cash offer within 24 hours: no repairs, no agent fees, close in as little as 7–30 days.',
    buttonText: 'Get My Cash Offer',
    ctaLocation: 'inherited_reading',
  },

  h2('Selling Inside the City of Reading: What the City Requires'),
  p([
    'Reading adds a layer most Berks County boroughs don’t. Before any property in the city is sold, the seller must apply for a ',
    { text: 'Certificate of Transfer', bold: true },
    ' — required for all properties sold in the city, regardless of use — and a Health & Safety Inspection is part of that process (the buyer or the seller may conduct it; limited exemptions exist). The seller also has to give the buyer the city’s property packet before the sale.',
  ]),
  p('After closing, the new owner must register the property with the city’s Property Maintenance Division within 30 days of the ownership change — failure to register carries a $100-per-unit surcharge under city code §308-102 (single-family owner-occupants confirm occupancy rather than registering as a rental). An experienced local cash buyer deals with these requirements on every Reading purchase — it’s one of the practical reasons an as-is sale is simpler here than in most PA cities.'),

  h2('The 5% Transfer Tax'),
  p([
    'Reading has one of the highest realty transfer taxes in Pennsylvania: 3.5% city + 0.5% school district + 1% state — ',
    { text: '5% of the sale price in total', bold: true },
    ', unchanged since January 15, 2006. On a $180,000 sale, that’s $9,000 coming out of the transaction before commissions or repairs. It’s a big reason the net math on ',
    { text: 'selling a house in Reading', link: '/locations/reading' },
    ' looks different from anywhere else in Berks County — and why a clean, fee-transparent offer matters more here.',
  ]),

  h2('Your Situation'),
  h3('Probate is open'),
  p('Once you hold Letters, you can list or accept an offer — the sale itself is an ordinary real estate transaction with the estate as seller. We regularly write offers while probate is in progress and close on the estate’s timeline.'),
  h3('Probate is closed — or the house was deeded to you'),
  p('If the property was distributed to you (or passed outside probate), you sell as a regular owner. The inheritance-tax and stepped-up-basis points above still apply to your net.'),
  h3('Probate hasn’t started'),
  p('You can line everything up — including a cash offer — before filing, but the sale can’t close until the Register of Wills issues Letters. Berks County’s virtual appointment process means straightforward filings move quickly; start there.'),
  h3('Multiple heirs'),
  p('Every heir with an ownership interest signs. Get the conversation about selling done early — disagreements between heirs are the single biggest source of delay, and unresolved ones end up in Orphans’ Court. A cash sale with a flexible closing date is often the compromise everyone can live with.'),
  h3('The house needs work'),
  p('Many inherited Reading houses haven’t been updated in decades. Selling as-is means no repairs, no city re-inspections after fix-ups, no contractor management from out of town — the condition is priced into the offer and the buyer takes it from there.'),
  h3('Tenant-occupied'),
  p('Inherited a house with tenants? We buy Reading rentals with tenants in place — leases transfer with the sale, and you don’t have to manage a vacancy or an eviction to sell.'),

  h2('Your Options for Selling'),
  h3('List with an agent'),
  p('Best gross price if the house is in good shape and you can carry it through a 60–120-day process: transfer certificate, inspection findings, repairs, showings, financing timelines — plus commissions and that 5% transfer tax against your net.'),
  h3('Sell as-is to a cash buyer'),
  p('Fastest and simplest: a fair offer within 24 hours, no repairs or clean-out, no agent fees, close in 7–30 days or on the estate’s schedule. The trade-off is a price below full retail — honest math means comparing your projected net, not the sticker.'),
  h3('For sale by owner'),
  p('Doable, but you carry Reading’s transfer requirements, the disclosure obligations of an estate sale, and buyer-financing risk yourself. Rarely worth it for an out-of-town heir.'),

  h2('The Bottom Line'),
  p([
    'Selling an inherited house in Reading comes down to sequence: get Letters from the Berks County Register of Wills, understand the inheritance-tax clock, satisfy the city’s transfer requirements, and choose the sale path that fits the estate’s timeline. If you want the as-is route, we’ll put a real number in front of you within 24 hours — and if listing is genuinely your better option, we’ll tell you that too.',
  ]),
  p([
    'Related reading: ',
    { text: 'selling a house without probate in Pennsylvania', link: PROBATE },
    ' · ',
    { text: 'documents required for selling inherited property in PA', link: DOCS },
    ' · ',
    { text: 'selling an inherited property in Pennsylvania', link: '/situations/inherited-property' },
    ' · ',
    { text: 'selling a house in Reading', link: '/locations/reading' },
  ]),
]

const fieldHasHref = (field, href) => JSON.stringify(field || []).includes(href)

function buildBlock(segments) {
  const children = []
  const markDefs = []
  for (const seg of segments) {
    const marks = []
    if (seg.href) {
      const mk = key()
      markDefs.push({ _key: mk, _type: 'link', href: seg.href })
      marks.push(mk)
    }
    if (seg.bold) marks.push('strong')
    children.push({ _type: 'span', _key: key(), text: seg.text, marks })
  }
  return { _type: 'block', _key: key(), style: 'normal', children, markDefs }
}

async function createPost() {
  const refs = await client.fetch(
    `{ "loc": *[_type == "location" && slug.current == "reading"][0]._id,
       "sit": *[_type == "situation" && slug.current == "inherited-property"][0]._id }`)
  if (!refs.loc || !refs.sit) return console.log('ERROR post: reading location or inherited situation ref missing')

  const doc = {
    _type: 'blogPost',
    title: 'Sell an Inherited House in Reading, PA | Berks County Guide (2026)',
    slug: { _type: 'slug', current: SLUG },
    metaTitle: 'Sell an Inherited House in Reading, PA | Berks County Guide',
    metaDescription: 'Selling an inherited house in Reading or Berks County? Probate steps, the 5% transfer tax, city inspections, and how to sell as-is for cash — 2026 guide.',
    author: 'Tyler Swenson',
    authorTitle: 'Founder, ClearEdge Home Buyers',
    publishedAt: '2026-07-26T13:00:00.000Z',
    updatedAt: '2026-07-26T13:00:00.000Z',
    excerpt: 'How to sell an inherited house in Reading, PA: Letters from the Berks County Register of Wills, inheritance tax, city transfer requirements, the 5% transfer tax, and selling as-is for cash.',
    category: 'situations',
    content,
    relatedLocations: [{ _type: 'reference', _ref: refs.loc, _key: key() }],
    relatedSituations: [{ _type: 'reference', _ref: refs.sit, _key: key() }],
    // deliberately NO faqs: blog template still emits FAQPage JSON-LD when present
  }

  const existing = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]._id`, { slug: SLUG })
  console.log(`post: ${existing ? 'UPDATE existing ' + existing : 'CREATE new'} — ${content.length} content blocks, ctaBlock inherited_reading, no faqs`)
  if (!WRITE) return console.log('DRY-RUN post: would write (pass --yes)')
  if (existing) { await client.patch(existing).set(doc).commit(); console.log('WRITTEN post: updated', existing) }
  else { const r = await client.create(doc); console.log('WRITTEN post: created', r._id) }
}

async function ensureLink(op, type, slug, field, href, segments) {
  const doc = await client.fetch(
    `*[_type == $type && slug.current == $slug][0]{ _id, "field": ${field} }`, { type, slug })
  if (!doc?._id) return console.log(`ERROR ${op}: ${type}/${slug} not found`)
  if (fieldHasHref(doc.field, href))
    return console.log(`VERIFIED-PRESENT ${op}: ${type}/${slug} already links ${href}`)
  if (!Array.isArray(doc.field) || doc.field.length === 0)
    return console.log(`ERROR ${op}: target field empty on ${type}/${slug} — refusing to write`)
  console.log(`${op}: appending link ${href} to ${type}/${slug}`)
  if (!WRITE) return console.log(`DRY-RUN ${op}: would write (pass --yes)`)
  await client.patch(doc._id).append(field, [buildBlock(segments)]).commit()
  console.log(`WRITTEN ${op}: ${type}/${slug} -> ${href}`)
}

async function main() {
  console.log(`=== Deploy C (${WRITE ? 'WRITE' : 'dry-run'}) ===`)
  await createPost()
  // Part 3 link set INTO the new page (page's own outbound links are in content above)
  await ensureLink('linkProbate', 'blogPost', 'sell-deceased-parents-house-without-probate-pennsylvania', 'content', PAGE, [
    { text: 'Inherited property in Berks County? Our guide to ' },
    { text: 'selling an inherited house in Reading', href: PAGE },
    { text: ' covers the county-specific process — Register of Wills, city transfer requirements, and the 5% transfer tax.' },
  ])
  await ensureLink('linkDocs', 'blogPost', 'documents-required-selling-inherited-property-pennsylvania', 'content', PAGE, [
    { text: 'For Berks County specifics, see our guide to ' },
    { text: 'selling an inherited house in Reading, PA', href: PAGE },
    { text: '.' },
  ])
  await ensureLink('linkSituation', 'situation', 'inherited-property', 'problemDescription', PAGE, [
    { text: 'Inherited a property in Berks County? Our guide to ' },
    { text: 'selling an inherited house in Reading, PA', href: PAGE },
    { text: ' covers the Register of Wills process, city requirements, and taxes end to end.' },
  ])
  await ensureLink('linkReadingLoc', 'location', 'reading', 'enhancedContent', PAGE, [
    { text: 'Inherited a house in Reading?', bold: true },
    { text: ' Whether probate is open, closed, or hasn’t started, we buy inherited properties throughout Berks County as-is for cash. Read our step-by-step guide: ' },
    { text: 'selling an inherited house in Reading', href: PAGE },
    { text: '.' },
  ])
  console.log('=== Deploy C done ===')
}

main().catch(e => { console.log('ERROR fatal:', e.message); process.exit(1) })
