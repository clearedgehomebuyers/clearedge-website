/**
 * Restore the two Reading sales-message fields changed during the autumn audit.
 *
 * DRY RUN BY DEFAULT — pass --apply only after reviewing the plan.
 * The optimized divorce H1, corrected code-enforcement answer, and duplicate-FAQ
 * removal are deliberately left untouched.
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
const TARGET = {
  id: '1vG1cAehNv3GJkhfGeEAvi',
  type: 'location',
  slug: 'reading',
}

const HERO_CURRENT = 'Reading’s combined realty transfer tax rate is 5%. ClearEdge buys Reading houses in any condition for cash and covers the seller’s agreed share of transfer tax and closing costs under our purchase agreement — no repairs or commissions.'
const HERO_RESTORED = 'Reading has the highest transfer tax in Eastern PA — 5% total. ClearEdge buys Reading houses in any condition for cash. No transfer tax, no repairs, no fees, no waiting.'

const TRANSFER_FAQ_KEY = 'rfaq1'
const TRANSFER_FAQ_CURRENT = 'Reading’s combined realty transfer tax rate is 5%: 3.5% city, 0.5% school district, and 1% state. The purchase agreement states how the buyer and seller will allocate that cost. ClearEdge’s written offer states which seller-side transfer tax and closing costs it will cover, so you can compare the offer’s expected net proceeds with a traditional sale.'
const TRANSFER_FAQ_RESTORED = 'Reading has the highest real estate transfer tax in Eastern PA — 5% total, broken down as 3.5% to the city, 0.5% to the school district, and 1% to the state. In a traditional sale, you and the buyer typically split this 50/50, so you’d pay 2.5%. On a $150,000 home, that’s $3,750 out of your pocket on top of agent commissions and closing costs. When you sell to ClearEdge, we cover the entire 5% transfer tax — you pay $0.'

const clone = (value) => JSON.parse(JSON.stringify(value))

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]))
}

function digest(value) {
  return createHash('sha256').update(JSON.stringify(canonicalize(value))).digest('hex')
}

function withoutTargets(doc) {
  const copy = clone(doc)
  delete copy._rev
  delete copy._updatedAt
  delete copy.heroSubheadline
  if (Array.isArray(copy.faqs)) {
    copy.faqs = copy.faqs.map((faq) => {
      if (faq?._key !== TRANSFER_FAQ_KEY) return faq
      const next = clone(faq)
      delete next.answer
      return next
    })
  }
  return copy
}

function findTransferFaq(doc) {
  return (doc?.faqs || []).find((faq) => faq?._key === TRANSFER_FAQ_KEY)
}

function identityMatches(doc) {
  return doc?._id === TARGET.id
    && doc?._type === TARGET.type
    && doc?.slug?.current === TARGET.slug
}

function isRestored(doc) {
  return doc?.heroSubheadline === HERO_RESTORED
    && findTransferFaq(doc)?.answer === TRANSFER_FAQ_RESTORED
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

  const before = await client.fetch('*[_id == $id][0]', { id: TARGET.id })
  console.log(`=== RESTORE AUTUMN SALES MESSAGING — ${APPLY ? 'APPLY' : 'DRY RUN (no writes)'} ===`)

  if (!identityMatches(before)) {
    console.error('ABORT: exact Reading document identity did not match. Nothing written.')
    process.exitCode = 2
    return
  }
  if (isRestored(before)) {
    console.log('SKIP — the two requested sales-message fields are already restored.')
    return
  }

  const transferFaq = findTransferFaq(before)
  const baselineProblems = []
  if (before.heroSubheadline !== HERO_CURRENT) baselineProblems.push('heroSubheadline')
  if (!transferFaq || transferFaq.answer !== TRANSFER_FAQ_CURRENT) baselineProblems.push(`FAQ ${TRANSFER_FAQ_KEY}`)
  if (baselineProblems.length) {
    console.error(`ABORT: exact current baseline did not match for ${baselineProblems.join(', ')}. Nothing written.`)
    process.exitCode = 2
    return
  }

  const restoredFaqs = clone(before.faqs).map((faq) => (
    faq?._key === TRANSFER_FAQ_KEY ? { ...faq, answer: TRANSFER_FAQ_RESTORED } : faq
  ))
  console.log('PLAN: restore the Reading hero sales message and transfer-tax FAQ only.')
  console.log('KEEP: divorce H1, code-enforcement FAQ, and duplicate-FAQ removal.')

  if (!APPLY) {
    console.log('DRY RUN PASSED — 1 document would change. Nothing written.')
    return
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupDir = resolve(scriptDir, '../backups')
  const backupPath = resolve(backupDir, `restore-autumn-sales-messaging-${stamp}.json`)
  mkdirSync(backupDir, { recursive: true })
  writeFileSync(backupPath, JSON.stringify([before], null, 2))
  console.log(`Backup written: ${backupPath}`)

  await client
    .patch(before._id)
    .ifRevisionId(before._rev)
    .set({ heroSubheadline: HERO_RESTORED, faqs: restoredFaqs })
    .commit()

  const after = await client.fetch('*[_id == $id][0]', { id: TARGET.id })
  const errors = []
  if (!identityMatches(after)) errors.push('document identity')
  if (!isRestored(after)) errors.push('restored field values')
  if (digest(withoutTargets(after)) !== digest(withoutTargets(before))) errors.push('non-target content')
  if (errors.length) {
    console.error(`READ-BACK FAILED: ${errors.join(', ')}`)
    process.exitCode = 1
    return
  }

  console.log('READ-BACK PASSED — the two fields were restored and all non-target content was preserved.')
}

main().catch(() => {
  console.error('ABORT: the Sanity request failed. Raw error details were not printed; verify connectivity before retrying.')
  process.exitCode = 1
})
