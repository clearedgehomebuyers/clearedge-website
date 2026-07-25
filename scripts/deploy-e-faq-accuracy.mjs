// Deploy E — FAQ legal-accuracy corrections across the situation docs.
// Follow-on to the 2026-07-25 audit (memory: clearedge-content-accuracy-audit).
// Every situation FAQ renders into FAQPage JSON-LD, so each of these claims is
// currently published as machine-readable structured data.
//
// Five corrections in four Sanity documents (a sixth, matching correction to the
// documents-blog answer box, ships repo-side on branch deploy-e-faq-fix):
//
//  fixRev1500   inherited-property faqs[t0bw68na] — "REU-500" is not a PA form.
//               PA DOR uses REV-1500 (inheritance tax return) and REV-516
//               (Notice of Transfer, securities/accounts held in beneficiary
//               form). REV-516 is deliberately NOT cited here: it does not apply
//               to a real-estate closing. The tax attaches to inherited real
//               estate, so title requires proof of payment or an escrow.
//               Rates/deadline/discount confirmed on pa.gov: due at death,
//               delinquent at 9 months, 5% discount inside 3 months.
//  fixCodeViol  tax-liens-code-violations faqs[bvt0m9pr] — "released from all
//               violation-related obligations" was overbroad AND contradicted
//               faqs[ksyhtorx] on the same page. Now consistent with it:
//               forward compliance transfers, previously-issued citations can
//               remain personal and are resolved at closing.
//  fixWaiting   foreclosure faqs[42n4olli] — "qualify for a new mortgage in as
//               little as 2 years instead of 7" doesn't match any loan program's
//               waiting period, and misses the actual point: a sale that pays
//               off the loan creates no foreclosure and so no waiting period at
//               all. Deliberately states no program-specific year counts.
//  fixPRSale    inherited-property faqs[otwr3a8r] — "all parties with legal
//               authority must agree" ignores 20 Pa.C.S. §3351: the personal
//               representative may sell real property not specifically devised;
//               specifically devised property needs the devisee's joinder.
//  fixPartition divorce faqs[ietherjp] — "petition the court for a
//               partition sale" names the wrong mechanism during a pending
//               divorce. Marital property is divided by equitable distribution
//               (23 Pa.C.S. §3502(a)); §3502(e)(4) lets the court "order and
//               direct the transfer or sale of any property required in order to
//               comply with the court's order". Replaced with accurate general
//               language only — any specific procedural claim must be
//               attorney-drafted before it goes back in.
//
// Sources re-fetched 2026-07-25: legis.state.pa.us (20 Pa.C.S. §3351,
// 23 Pa.C.S. §3502), pa.gov revenue inheritance-tax page, revenue.pa.gov forms
// index. The inheritance-tax lien on real property is stated in practical terms
// (title will require payment or escrow) rather than by section number — the
// governing sections are unconsolidated Title 72 P.S. and were not verifiable on
// a first-party .gov page, so no statute cite is made for that point.
//
// Dry-run by default; --yes to write. Baseline-guarded: each op requires its
// known-bad sentence before writing; already-corrected => VERIFIED-PRESENT;
// anything else => ERROR (refuses to write blind). One patch per document.
// Grep-stable output: WRITTEN / VERIFIED-PRESENT / DRY-RUN / ERROR.

import { createClient } from '@sanity/client'
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

// Every `find` below is deliberately apostrophe-free so curly/straight quote
// drift in the CMS can never cause a false baseline mismatch.
const FIXES = [
  {
    op: 'fixRev1500',
    slug: 'inherited-property',
    key: 't0bw68na',
    label: 'inherited-property faqs[t0bw68na] — REU-500 is not a real PA form',
    find: 'The REU-500 tax waiver may be required by the title company at closing.',
    replace: 'Because the tax attaches to the inherited real estate, the title company will typically require proof it was paid — or hold an escrow from the sale proceeds — at closing. The estate files Form REV-1500, Pennsylvania’s inheritance tax return.',
  },
  {
    op: 'fixCodeViol',
    slug: 'tax-liens-code-violations',
    key: 'bvt0m9pr',
    label: 'tax-liens faqs[bvt0m9pr] — overbroad liability release, contradicted faqs[ksyhtorx]',
    find: 'You are released from all violation-related obligations at closing.',
    replace: 'Going forward, compliance is our responsibility rather than yours. Fines or citations already issued to you before the sale can remain your personal obligation depending on the municipality — those are identified and typically resolved at closing through the title company.',
  },
  {
    op: 'fixWaiting',
    slug: 'foreclosure',
    key: '42n4olli',
    label: 'foreclosure faqs[42n4olli] — invented mortgage waiting period',
    find: 'no foreclosure mark, no deficiency judgment risk, and you can qualify for a new mortgage in as little as 2 years instead of 7.',
    replace: 'no foreclosure mark and no deficiency judgment risk. Because the sale pays off the loan, there is no foreclosure-related waiting period before you can finance another home — a completed foreclosure, by contrast, triggers a multi-year waiting period that varies by loan program.',
  },
  {
    op: 'fixPRSale',
    slug: 'inherited-property',
    key: 'otwr3a8r',
    label: 'inherited-property faqs[otwr3a8r] — ignores 20 Pa.C.S. §3351 PR sale power',
    find: 'When multiple heirs inherit a property, all parties with legal authority must agree to sell.',
    replace: 'Who actually has to sign depends on how the estate is set up. Under 20 Pa.C.S. §3351 the estate’s personal representative can generally sell real estate that was not specifically left to a named beneficiary in the will, without every heir signing off; property that was specifically devised needs that beneficiary to join in the sale. Once the house has been distributed out of the estate, every co-owner signs.',
  },
  {
    op: 'fixPartition',
    slug: 'divorce',
    key: 'ietherjp',
    label: 'divorce faqs[ietherjp] — partition is the wrong mechanism during divorce',
    find: 'your attorney can petition the court for a partition sale or include the sale as part of the divorce order.',
    replace: 'the marital home is dealt with through equitable distribution under 23 Pa.C.S. §3502 — the divorce court divides marital property in the proportions it finds just, and it can order and direct the sale of property in order to carry out its order. The mechanism and the timing depend on the facts of your case, so your attorney is the one to map it.',
  },
]

async function main() {
  console.log(`=== Deploy E FAQ accuracy (${WRITE ? 'WRITE' : 'dry-run'}) ===`)

  const slugs = [...new Set(FIXES.map(f => f.slug))]
  let written = 0

  for (const slug of slugs) {
    const doc = await client.fetch(
      `*[_type == "situation" && slug.current == $slug][0]{ _id, faqs }`, { slug })
    if (!doc?._id) { console.log(`ERROR ${slug}: situation doc not found`); continue }

    const byKey = new Map((doc.faqs || []).map(f => [f._key, f]))
    const patch = {}

    for (const fix of FIXES.filter(f => f.slug === slug)) {
      const faq = byKey.get(fix.key)
      if (!faq) { console.log(`ERROR ${fix.op}: faq _key ${fix.key} not found on ${slug} — refusing`); continue }
      const cur = faq.answer
      if (typeof cur !== 'string') { console.log(`ERROR ${fix.op}: answer is not a string — refusing`); continue }

      if (cur.includes(fix.replace) && !cur.includes(fix.find)) {
        console.log(`VERIFIED-PRESENT ${fix.op}: already corrected — ${fix.label}`)
        continue
      }
      if (!cur.includes(fix.find)) {
        console.log(`ERROR ${fix.op}: baseline mismatch on ${fix.label}; refusing to write blind. Current: "${cur.slice(0, 110)}..."`)
        continue
      }
      console.log(`${fix.op}: correcting — ${fix.label}`)
      patch[`faqs[_key=="${fix.key}"].answer`] = cur.replace(fix.find, fix.replace)
    }

    const n = Object.keys(patch).length
    if (n === 0) continue
    if (!WRITE) { console.log(`DRY-RUN ${slug}: would correct ${n} answer(s) in one patch (pass --yes)`); continue }
    await client.patch(doc._id).set(patch).commit()
    console.log(`WRITTEN ${slug}: ${n} answer(s) corrected in one patch`)
    written += n
  }

  console.log(`=== Deploy E FAQ accuracy done${WRITE ? ` (${written} corrections written)` : ''} ===`)
}

main().catch(e => { console.log('ERROR fatal:', e.message); process.exit(1) })
