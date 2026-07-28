// Deploy G — documents-blog factual rider: TOD-deed + all-heirs corrections.
//
// SCOPE CAME FROM A CLAIM-SCOPED SWEEP, NOT A GUESS. `scripts/claim-sweep.mjs`
// searched all 66 published Sanity documents of every type for six claim
// families on 2026-07-28. On this document it returned EIGHT text spans across
// two claims — five more than the three we knew about. That is the whole point
// of the new method (playbook §3.11): search by claim, then scope the fix to
// what the search returns.
//
// TOD — Pennsylvania has no transfer-on-death deed for real estate. The
// legislature never adopted the Uniform Real Property Transfer on Death Act;
// Title 20's TOD provisions cover securities and bank accounts. Deploy B
// corrected this on the probate blog (Sanity + repo answer box) and Deploy C on
// /situations/inherited-property. This document kept it in FIVE places because
// Deploy B's Sanity rider was hard-scoped to the probate blogPost and its repo
// rider only touched this page's answer box:
//   block13  span…747  non-probate path list names a TOD deed as a route
//   block65  span…851  sub-heading "If Property Had a Transfer on Death Deed:"
//   block65  span…852  the document list for that non-existent route
//   block101 span…920  "Trusts and TOD deeds save your heirs months of waiting"
//   block119 span…962  Bottom Line summary repeats "trust document or TOD deed"
//
// HEIRS — 20 Pa.C.S. §3351: the personal representative may generally sell
// estate real property that was not specifically devised, without every heir
// signing; specifically devised property needs the devisee to join. Deploy E
// corrected this on /situations/inherited-property faqs[otwr3a8r] and in this
// page's repo answer box, but its stale-string gate matched ONE phrasing, so
// two more survived on the page it reported as fixed:
//   block89  span…898  "Mistake #5: Assuming all heirs agree"
//   block89  span…899  "Get written agreement from all heirs before listing"
//   faqs[faq2].answer  "All heirs typically need to sign … if the will grants
//                       that authority" — understates §3351, which is the
//                       source of the power, not the will
//
// SOURCING — no NEW statutory assertion is made here. Every legal claim in the
// replacement copy is propagated verbatim in substance from copy already shipped
// and .gov-verified: the TOD/URPTODA language from Deploy B (legis.state.pa.us,
// adversarially re-fetched 5/5, 2026-07-20) and the §3351 language from Deploy E
// (verified 2026-07-25), which is live on /situations/inherited-property now.
// HONEST NOTE: palegis.us would not render statute text through automated fetch
// on 2026-07-28 (JS-driven page), so this pass did NOT achieve an independent
// re-fetch. It relies on the prior verifications. If any claim here were new,
// that would not be good enough — none is.
//
// Dry-run by default; --yes to write. Baseline-guarded per span: exact old text
// required before writing; already-corrected => VERIFIED-PRESENT; anything else
// => ERROR (refuses to write blind). One patch for the document.
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
const SLUG = 'documents-required-selling-inherited-property-pennsylvania'

// kind 'span'  -> content[_key==block].children[_key==span].text
// kind 'faq'   -> faqs[_key==key].answer
const FIXES = [
  {
    op: 'todPathList',
    kind: 'span',
    block: 'block13',
    span: 'span1770416699328747',
    label: 'block13 — non-probate path list names a TOD deed as a route',
    // Leading space is real — a bold span precedes this one inline. Preserved
    // on both sides; the sweep's normalized display hid it and the guard caught it.
    find: ' — This happens if the property was in a living trust, had a Transfer on Death deed, or was jointly owned with right of survivorship.',
    replace:
      ' — This happens if the property was in a living trust or was jointly owned with right of survivorship. Pennsylvania has no transfer-on-death deed for real estate, so that is not a third route here.',
  },
  {
    op: 'todHeading',
    kind: 'span',
    block: 'block65',
    span: 'span1770416699328851',
    label: 'block65 heading — presents a TOD deed as a working PA route',
    // Trailing space separates this bold heading span from the body span.
    find: 'If Property Had a Transfer on Death (TOD) Deed: ',
    replace: 'What About a Transfer on Death (TOD) Deed? ',
  },
  {
    op: 'todDocList',
    kind: 'span',
    block: 'block65',
    span: 'span1770416699328852',
    label: 'block65 body — document list for a route that does not exist in PA',
    find: "Death certificate (certified copy), The original TOD deed (recorded with the county), Affidavit of survivorship (confirms you're the named beneficiary), Your ID",
    replace:
      'Pennsylvania does not have one for real estate. The legislature never adopted the Uniform Real Property Transfer on Death Act, and Title 20’s transfer-on-death provisions cover securities and bank accounts, not houses. If you have read otherwise, that advice comes from one of the 20-plus states that do allow them. In Pennsylvania a house passes outside probate only through the other two routes in this section: a living trust, or joint ownership with right of survivorship.',
  },
  {
    op: 'todEstatePlanning',
    kind: 'span',
    block: 'block101',
    span: 'span1770416699328920',
    label: 'block101 — "Trusts and TOD deeds save your heirs months of waiting"',
    find: 'This is why proper estate planning matters. Trusts and TOD deeds save your heirs months of waiting.',
    replace:
      'This is why proper estate planning matters. In Pennsylvania it is a living trust or joint ownership with right of survivorship that saves your heirs months of waiting — there is no transfer-on-death deed for real estate here.',
  },
  {
    op: 'todBottomLine',
    kind: 'span',
    block: 'block119',
    span: 'span1770416699328962',
    label: 'block119 Bottom Line — repeats "trust document or TOD deed"',
    find: 'Death certificate, trust document or TOD deed, affidavit of survivorship, and your ID.',
    replace:
      'Death certificate, the trust document or the deed showing joint ownership with right of survivorship, affidavit of survivorship, and your ID.',
  },
  {
    op: 'heirsMistakeHeading',
    kind: 'span',
    block: 'block89',
    span: 'span1770416699328898',
    label: 'block89 heading — "Assuming all heirs agree"',
    find: 'Mistake #5: Assuming all heirs agree',
    replace: 'Mistake #5: Assuming every heir has to agree',
  },
  {
    op: 'heirsMistakeBody',
    kind: 'span',
    block: 'block89',
    span: 'span1770416699328899',
    label: 'block89 body — "Get written agreement from all heirs before listing"',
    find: ' — Get written agreement from all heirs before listing. One holdout can derail everything.',
    replace:
      ' — Confirm who actually holds authority to sell before assuming unanimous consent is required. Under 20 Pa.C.S. §3351 the personal representative can generally sell estate real estate that was not specifically left to a named beneficiary, without every heir signing; property that was specifically devised needs that beneficiary to join, and once the house has been distributed out of the estate every co-owner signs. Getting the family aligned early still saves time — but a single holdout does not automatically block a sale.',
  },
  {
    op: 'heirsFaq',
    kind: 'faq',
    key: 'faq2',
    label: 'faqs[faq2] — "all heirs typically need to sign … if the will grants that authority"',
    find: 'All heirs typically need to sign the deed or consent to the sale. One alternative: the executor can sell on behalf of the estate if the will grants that authority.',
    replace:
      'It depends on who holds the authority to sell. Under 20 Pa.C.S. §3351 the estate’s personal representative can generally sell real estate that was not specifically left to a named beneficiary in the will, without every heir signing — that power comes from the statute, not only from language in the will. Property that was specifically devised needs that beneficiary to join in the sale. Once the house has been distributed out of the estate, every co-owner signs.',
  },
]

console.log(`=== Deploy G documents-blog TOD + all-heirs rider (${WRITE ? 'WRITE' : 'dry-run'}) ===`)

const doc = await client.fetch(
  `*[_type=="blogPost" && slug.current==$slug][0]{_id, content, faqs}`,
  { slug: SLUG }
)
if (!doc) {
  console.log(`ERROR: blogPost/${SLUG} not found`)
  process.exit(1)
}

function currentValue(fix) {
  if (fix.kind === 'faq') {
    const f = (doc.faqs || []).find((x) => x._key === fix.key)
    return f ? f.answer : undefined
  }
  const b = (doc.content || []).find((x) => x._key === fix.block)
  if (!b) return undefined
  const s = (b.children || []).find((x) => x._key === fix.span)
  return s ? s.text : undefined
}

function pathOf(fix) {
  return fix.kind === 'faq'
    ? `faqs[_key=="${fix.key}"].answer`
    : `content[_key=="${fix.block}"].children[_key=="${fix.span}"].text`
}

const patch = {}
let pending = 0
let verified = 0
let errors = 0

for (const fix of FIXES) {
  const cur = currentValue(fix)
  if (cur === undefined) {
    console.log(`ERROR ${fix.op}: path not found — ${pathOf(fix)} (${fix.label})`)
    errors++
  } else if (cur === fix.replace) {
    console.log(`VERIFIED-PRESENT ${fix.op}: already corrected — ${fix.label}`)
    verified++
  } else if (cur === fix.find) {
    console.log(`${fix.op}: correcting — ${fix.label}`)
    patch[pathOf(fix)] = fix.replace
    pending++
  } else {
    console.log(`ERROR ${fix.op}: baseline mismatch at ${pathOf(fix)} — refusing to write blind`)
    console.log(`  expected: ${JSON.stringify(fix.find.slice(0, 120))}`)
    console.log(`  found   : ${JSON.stringify(String(cur).slice(0, 120))}`)
    errors++
  }
}

if (errors > 0) {
  console.log(`=== Deploy G ABORTED: ${errors} error(s); nothing written ===`)
  process.exit(1)
}

if (pending === 0) {
  console.log(`=== Deploy G done (all ${verified} corrections already present) ===`)
  process.exit(0)
}

if (!WRITE) {
  console.log(`DRY-RUN: would correct ${pending} span(s)/answer(s) in one patch (pass --yes)`)
  console.log('=== Deploy G done ===')
  process.exit(0)
}

await client.patch(doc._id).set(patch).commit()
console.log(`WRITTEN: ${pending} correction(s) applied in one patch`)
console.log('=== Deploy G done ===')
