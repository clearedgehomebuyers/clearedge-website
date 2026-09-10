/**
 * Guarded Sanity content-integrity corrections for the September 2026 autumn sprint.
 *
 * DRY RUN BY DEFAULT — pass --apply only after reviewing the plan.
 *   node scripts/autumn-sanity-integrity.mjs
 *   node scripts/autumn-sanity-integrity.mjs --apply
 *
 * WRITE SCOPE:
 *   * Align the divorce-page H1 with the seller-intent query already earning
 *     mobile impressions. The template renders heroHeadline + title.
 *   * Clarify Reading's transfer-tax offer without implying the tax vanishes.
 *   * Replace the matching transfer-tax FAQ's unconditional contract promise.
 *   * Replace one overbroad Reading code-violation FAQ answer.
 *   * Remove one exact duplicate Reading FAQ while retaining the balanced copy.
 *
 * SAFETY:
 *   * Exact document ids, slugs, field values, and FAQ baselines must match.
 *   * --apply requires the Sanity write token from .env.local.
 *   * One backup contains every complete pre-change document.
 *   * All writes commit in one revision-guarded transaction.
 *   * A fresh useCdn:false read-back verifies the final state and confirms that
 *     no non-target fields changed.
 *   * A successful re-run reports SKIP rather than duplicating work.
 *   * Editorial updatedAt values are intentionally preserved.
 */

import { createClient } from '@sanity/client'
import { createHash } from 'node:crypto'
import dotenv from 'dotenv'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(scriptDir, '../.env.local'), quiet: true })

const APPLY = process.argv.includes('--apply')

const DIVORCE = {
  id: '1vG1cAehNv3GJkhfGdDbVC',
  type: 'situation',
  slug: 'divorce',
  oldHeroHeadline: "The House Doesn't Have to Be the Hardest Part of Your Divorce.",
  nextHeroHeadline: 'Sell Your House Fast During a',
}

const READING = {
  id: '1vG1cAehNv3GJkhfGeEAvi',
  type: 'location',
  slug: 'reading',
  oldHeroSubheadline: 'Reading has the highest transfer tax in Eastern PA — 5% total. ClearEdge buys Reading houses in any condition for cash. No transfer tax, no repairs, no fees, no waiting.',
  nextHeroSubheadline: 'Reading’s combined realty transfer tax rate is 5%. ClearEdge buys Reading houses in any condition for cash and covers the seller’s agreed share of transfer tax and closing costs under our purchase agreement — no repairs or commissions.',
}

const CODE_FAQ = {
  key: 'rwtbmfoj',
  question: "What about Reading's code enforcement and I-30 violations?",
  oldAnswer: "We buy properties with open code violations and I-30 quality-of-life violations in Reading regularly. The violations transfer to us at closing and you're released from all obligations, including accumulated fines.",
  nextAnswer: 'We buy Reading properties with open code violations and I-30 quality-of-life violations. Before closing, ClearEdge and the title company review the City’s records to identify which liens, fines, correction requirements, or other obligations must be resolved, can be paid from the sale proceeds, or may be handled under the purchase agreement. Do not assume every violation or fine automatically transfers to the buyer; the answer depends on the property and the City’s requirements.',
}

const TRANSFER_TAX_FAQ = {
  key: 'rfaq1',
  question: 'How does Reading’s 5% transfer tax affect my sale?',
  oldAnswer: 'Reading has the highest real estate transfer tax in Eastern PA — 5% total, broken down as 3.5% to the city, 0.5% to the school district, and 1% to the state. In a traditional sale, you and the buyer typically split this 50/50, so you’d pay 2.5%. On a $150,000 home, that’s $3,750 out of your pocket on top of agent commissions and closing costs. When you sell to ClearEdge, we cover the entire 5% transfer tax — you pay $0.',
  nextAnswer: 'Reading’s combined realty transfer tax rate is 5%: 3.5% city, 0.5% school district, and 1% state. The purchase agreement states how the buyer and seller will allocate that cost. ClearEdge’s written offer states which seller-side transfer tax and closing costs it will cover, so you can compare the offer’s expected net proceeds with a traditional sale.',
}

const RETAINED_AGENT_FAQ = {
  key: 'x7a258lt',
  question: 'Is it worth listing my Reading house with an agent?',
  answer: "It depends on your property's condition. If it's move-in ready, an agent may net you more. But if your Reading home needs $15,000+ in repairs, factor in the repair cost, 5–6% commission, 2–4% closing costs, and 90+ days of carrying costs. For many Reading properties, a cash sale nets comparable proceeds without the upfront expense and wait.",
}

const DUPLICATE_AGENT_FAQ = {
  key: 'rfaq3',
  question: 'Is it worth listing my Reading house with an agent?',
  answer: 'It depends on the property. A well-maintained home in Wyomissing or West Reading with minimal repair needs will likely net more on the open market. But for a South Reading row home, an inherited property, or any home needing $20,000+ in repairs, the math changes fast. Between the 5% transfer tax, 6% commission, closing costs, and repairs, the gap between a traditional sale and a cash offer shrinks to almost nothing — and once repairs pass $30K–$40K, the cash offer actually nets you more.',
}

const READING_OLD_FAQS = [
  {
    key: 'huw0jk8d',
    question: 'Can you buy my Reading house with a tax lien?',
    answer: "Yes. Berks County tax liens get paid from the sale proceeds at closing — you don't need to pay them before selling. We can often close fast enough to prevent a scheduled judicial tax sale. Contact Tyler immediately if your property has a sale date approaching.",
  },
  {
    key: 'y07ttfpz',
    question: 'Does ClearEdge buy row homes in Reading?',
    answer: 'Yes. Row homes are the most common property type we buy in Reading. Shared walls, aging infrastructure, and deferred maintenance are challenges we handle every day. We buy row homes in any condition, as-is.',
  },
  {
    key: CODE_FAQ.key,
    question: CODE_FAQ.question,
    answer: CODE_FAQ.oldAnswer,
  },
  RETAINED_AGENT_FAQ,
  {
    key: TRANSFER_TAX_FAQ.key,
    question: TRANSFER_TAX_FAQ.question,
    answer: TRANSFER_TAX_FAQ.oldAnswer,
  },
  {
    key: 'rfaq2',
    question: 'What if I owe back taxes and my property is on the Berks County judicial sale list?',
    answer: 'We can often close fast enough to prevent the judicial sale. When ClearEdge buys your property, the outstanding tax liens are paid from the proceeds at closing. You keep the remaining equity instead of losing everything at auction. Time is critical — contact us as soon as possible.',
  },
  DUPLICATE_AGENT_FAQ,
]

const clone = (value) => JSON.parse(JSON.stringify(value))
const slugOf = (doc) => doc?.slug?.current || ''

function normalizeFaqs(faqs) {
  return (faqs || []).map((faq) => ({
    key: faq?._key,
    question: faq?.question,
    answer: faq?.answer,
  }))
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
  )
}

function digest(value) {
  return createHash('sha256').update(JSON.stringify(canonicalize(value))).digest('hex')
}

function nonTargetDigest(doc, mutableFields) {
  const copy = clone(doc)
  for (const field of ['_rev', '_updatedAt', ...mutableFields]) delete copy[field]
  return digest(copy)
}

function exactDocument(doc, target) {
  return doc?._id === target.id && doc?._type === target.type && slugOf(doc) === target.slug
}

function planDivorce(doc, aborts) {
  if (!exactDocument(doc, DIVORCE)) {
    aborts.push('situation/divorce: exact document identity mismatch')
    return null
  }
  if (doc.heroHeadline === DIVORCE.nextHeroHeadline) return null
  if (doc.heroHeadline !== DIVORCE.oldHeroHeadline) {
    aborts.push('situation/divorce.heroHeadline: exact baseline mismatch')
    return null
  }
  return {
    doc,
    patch: { heroHeadline: DIVORCE.nextHeroHeadline },
    mutableFields: ['heroHeadline'],
    actions: ['align the rendered H1 with the existing seller-intent query'],
  }
}

function readingFinalFaqs(oldFaqs) {
  return clone(oldFaqs)
    .filter((faq) => faq?._key !== DUPLICATE_AGENT_FAQ.key)
    .map((faq) => {
      if (faq?._key === CODE_FAQ.key) return { ...faq, answer: CODE_FAQ.nextAnswer }
      if (faq?._key === TRANSFER_TAX_FAQ.key) return { ...faq, answer: TRANSFER_TAX_FAQ.nextAnswer }
      return faq
    })
}

function readingIsFinal(doc) {
  const faqs = normalizeFaqs(doc?.faqs)
  const expectedFaqs = READING_OLD_FAQS
    .filter((faq) => faq.key !== DUPLICATE_AGENT_FAQ.key)
    .map((faq) => {
      if (faq.key === CODE_FAQ.key) return { ...faq, answer: CODE_FAQ.nextAnswer }
      if (faq.key === TRANSFER_TAX_FAQ.key) return { ...faq, answer: TRANSFER_TAX_FAQ.nextAnswer }
      return faq
    })
  return doc?.heroSubheadline === READING.nextHeroSubheadline
    && digest(faqs) === digest(expectedFaqs)
}

function planReading(doc, aborts) {
  if (!exactDocument(doc, READING)) {
    aborts.push('location/reading: exact document identity mismatch')
    return null
  }
  if (readingIsFinal(doc)) return null

  if (doc.heroSubheadline !== READING.oldHeroSubheadline) {
    aborts.push('location/reading.heroSubheadline: exact baseline mismatch')
  }
  if (digest(normalizeFaqs(doc.faqs)) !== digest(READING_OLD_FAQS)) {
    aborts.push('location/reading.faqs: exact ordered baseline mismatch')
  }
  if (aborts.length) return null

  return {
    doc,
    patch: {
      heroSubheadline: READING.nextHeroSubheadline,
      faqs: readingFinalFaqs(doc.faqs),
    },
    mutableFields: ['heroSubheadline', 'faqs'],
    actions: [
      'clarify how transfer tax and seller closing costs are handled under the purchase agreement',
      `replace the unconditional transfer-tax promise at FAQ key ${TRANSFER_TAX_FAQ.key}`,
      `replace the overbroad code-violation answer at FAQ key ${CODE_FAQ.key}`,
      `remove duplicate FAQ key ${DUPLICATE_AGENT_FAQ.key} and retain ${RETAINED_AGENT_FAQ.key}`,
    ],
  }
}

function verifyDivorce(doc) {
  const problems = []
  if (!exactDocument(doc, DIVORCE)) problems.push('situation/divorce: exact document identity mismatch')
  if (doc?.heroHeadline !== DIVORCE.nextHeroHeadline) {
    problems.push('situation/divorce.heroHeadline: corrected value is not exact')
  }
  return problems
}

function verifyReading(doc) {
  const problems = []
  if (!exactDocument(doc, READING)) problems.push('location/reading: exact document identity mismatch')
  if (doc?.heroSubheadline !== READING.nextHeroSubheadline) {
    problems.push('location/reading.heroSubheadline: corrected value is not exact')
  }
  if (!readingIsFinal(doc)) {
    problems.push('location/reading.faqs: corrected ordered state is not exact')
  }
  const retained = (doc?.faqs || []).filter((faq) => faq?._key === RETAINED_AGENT_FAQ.key)
  const removed = (doc?.faqs || []).filter((faq) => faq?._key === DUPLICATE_AGENT_FAQ.key)
  if (retained.length !== 1 || removed.length !== 0) {
    problems.push('location/reading.faqs: retained/removed duplicate keys are incorrect')
  }
  return problems
}

async function fetchTargets(client) {
  const docs = await client.fetch(
    '*[_id in $ids]',
    { ids: [DIVORCE.id, READING.id] },
  )
  return new Map((docs || []).map((doc) => [doc._id, doc]))
}

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('ABORT: Sanity project configuration is missing. Nothing written.')
    process.exitCode = 2
    return
  }
  if (APPLY && !process.env.SANITY_API_TOKEN) {
    console.error('ABORT: a Sanity write credential is required for --apply. Nothing written.')
    process.exitCode = 2
    return
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2026-01-02',
    token: APPLY ? process.env.SANITY_API_TOKEN : undefined,
    useCdn: false,
  })

  const beforeById = await fetchTargets(client)
  const divorce = beforeById.get(DIVORCE.id)
  const reading = beforeById.get(READING.id)

  console.log(`=== AUTUMN SANITY CONTENT INTEGRITY — ${APPLY ? 'APPLY' : 'DRY RUN (no writes)'} ===`)

  if (!divorce || !reading) {
    console.error('ABORT: one or more exact target documents were not found. Nothing written.')
    process.exitCode = 2
    return
  }

  const aborts = []
  const plans = [planDivorce(divorce, aborts), planReading(reading, aborts)].filter(Boolean)

  console.log('\nENCODED WRITE PLAN')
  if (!plans.length) console.log('  no changes needed')
  for (const plan of plans) {
    console.log(`  ${plan.doc._type}/${slugOf(plan.doc)}`)
    for (const action of plan.actions) console.log(`  - ${action}`)
  }

  if (aborts.length) {
    console.error('\nABORT — an exact encoded baseline did not match:')
    for (const problem of aborts) console.error(`  - ${problem}`)
    console.error('Nothing written.')
    process.exitCode = 2
    return
  }

  if (!plans.length) {
    console.log('\nSKIP — every encoded correction is already present.')
    return
  }

  if (!APPLY) {
    console.log(`\nDRY RUN PASSED — ${plans.length} document(s) would change. Nothing written.`)
    return
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupDir = resolve(scriptDir, '../backups')
  const backupPath = resolve(backupDir, `autumn-sanity-integrity-${stamp}.json`)
  mkdirSync(backupDir, { recursive: true })
  writeFileSync(backupPath, JSON.stringify(plans.map(({ doc }) => doc), null, 2))
  console.log(`\nBackup written: ${backupPath}`)

  let transaction = client.transaction()
  for (const plan of plans) {
    transaction = transaction.patch(plan.doc._id, (patch) =>
      patch.ifRevisionId(plan.doc._rev).set(plan.patch),
    )
  }
  await transaction.commit()
  console.log(`Committed ${plans.length} document(s) in one revision-guarded transaction.`)

  const afterById = await fetchTargets(client)
  const verificationErrors = [
    ...verifyDivorce(afterById.get(DIVORCE.id)),
    ...verifyReading(afterById.get(READING.id)),
  ]

  for (const plan of plans) {
    const after = afterById.get(plan.doc._id)
    if (after && nonTargetDigest(after, plan.mutableFields) !== nonTargetDigest(plan.doc, plan.mutableFields)) {
      verificationErrors.push(`${plan.doc._type}/${slugOf(plan.doc)}: a non-target field changed`)
    }
  }

  if (verificationErrors.length) {
    console.error('\nREAD-BACK FAILED:')
    for (const problem of verificationErrors) console.error(`  - ${problem}`)
    process.exitCode = 1
    return
  }

  console.log('\nREAD-BACK PASSED — every corrected field matches exactly and all non-target fields were preserved.')
}

main().catch(() => {
  console.error('ABORT: the Sanity request failed. Raw error details were not printed; verify configuration and connectivity before retrying.')
  process.exitCode = 1
})
