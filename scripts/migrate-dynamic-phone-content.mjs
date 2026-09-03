// Replace exact ClearEdge phone literals in known Sanity body/FAQ fields with
// the runtime {{phone}} token.
//
// DRY RUN BY DEFAULT — --apply is the only flag that permits writes:
//   node scripts/migrate-dynamic-phone-content.mjs
//   node scripts/migrate-dynamic-phone-content.mjs --apply
//
// Safety properties:
//   * Every document ID, type, slug, block key, and child/FAQ key is explicit.
//   * Each target must contain exactly one old literal or one finished token.
//   * Any unlisted old literal or token in the targeted content/FAQs aborts.
//   * No broad document-wide replacement is performed.
//   * Complete pre-change documents are backed up before an apply.
//   * All document patches commit in one revision-guarded transaction.
//   * A fresh useCdn:false read-back verifies every target and updatedAt value.

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(scriptDir, '../.env.local'), quiet: true })

const APPLY = process.argv.includes('--apply')
const OLD_PHONE = '(610) 904-8526'
const PHONE_TOKEN = '{{phone}}'
const STATIC_TEL_HREF = 'tel:+16109048526'
const BETHLEHEM_MARK_KEY = '77xvbpd2'

const TARGETS = [
  {
    id: 'iO1i7orThSvP4Bq9Z95YlH',
    type: 'blogPost',
    slug: 'cash-home-buyers-berks-county',
    content: [
      ['block31', 'span1770416838377752'],
      ['block105', 'span1770416838377889'],
    ],
  },
  {
    id: 'gIL6gG1KMduIaNHsMT5pOr',
    type: 'blogPost',
    slug: 'cash-home-buyers-lackawanna-county-no-fees',
    content: [
      ['block59', 'span1770416697362664'],
      ['block94', 'span1770416697362718'],
    ],
  },
  {
    id: 'Jm6EvedTeQqXrFYAX23iLG',
    type: 'blogPost',
    slug: 'hazleton-residential-occupancy-inspection-checklist',
    content: [['close3', 'span17704168458652060']],
  },
  {
    id: 'WmeOxgPqx5IsLkJXvpul99',
    type: 'blogPost',
    slug: 'sell-house-tax-lien-bethlehem-pa',
    content: [['nuvjtxpf', 'w11lgarh']],
    removeStaticTelMark: {
      blockKey: 'nuvjtxpf',
      childKey: 'w11lgarh',
      markKey: BETHLEHEM_MARK_KEY,
      href: STATIC_TEL_HREF,
    },
  },
  {
    id: 'Cmur3teVcxJx6cFlOiUnmz',
    type: 'blogPost',
    slug: 'sell-house-wilkes-barre-code-violations',
    content: [['close3', 'span17704168444881827']],
  },
  {
    id: '7dbbsPJQJngj2t3aDPMcyh',
    type: 'blogPost',
    slug: 'sell-inherited-house-allentown-pa',
    content: [
      ['kmn66d63c76', 'kmn66d63c74'],
      ['kmn66d63c7r', 'kmn66d63c7q'],
    ],
  },
  {
    id: 'Jm6EvedTeQqXrFYAX18MN6',
    type: 'blogPost',
    slug: 'sell-my-house-fast-lehigh-valley',
    content: [
      ['step1', 'step1s1'],
      ['close3', 'close3s0'],
    ],
  },
  {
    id: 'iO1i7orThSvP4Bq9Z8ciWZ',
    type: 'blogPost',
    slug: 'sell-my-house-fast-luzerne-county-pa',
    content: [
      ['block33', 'span1770416695700419'],
      ['block109', 'span1770416695700559'],
    ],
  },
  {
    id: '2a7c6139-6f68-4167-ab44-7b53953375f9',
    type: 'location',
    slug: 'scranton',
    faqs: ['67lpl4f3'],
  },
  {
    id: 'Kkwf7dGhrCPgC5ftH1YzPY',
    type: 'situation',
    slug: 'foreclosure',
    faqs: ['cdb2gb70'],
  },
  {
    id: 'Jm6EvedTeQqXrFYAX1LFl2',
    type: 'blogPost',
    slug: 'cash-home-buyers-pottsville-pa',
    content: [
      ['step1', 'span17704168405291086'],
      ['close3', 'span17704168405301238'],
    ],
  },
  {
    id: 'Cmur3teVcxJx6cFlOiDyrO',
    type: 'blogPost',
    slug: 'sell-my-house-fast-poconos-pa',
    content: [
      ['step1', 'span17704167021121070'],
      ['close3', 'span17704167021121120'],
    ],
  },
]

const EXPECTED_DOCUMENTS = 12
const EXPECTED_TARGETS = 19

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function countOccurrences(value, needle) {
  if (typeof value !== 'string' || !needle) return 0
  return value.split(needle).length - 1
}

function countStringLeaves(value, needle) {
  if (typeof value === 'string') return countOccurrences(value, needle)
  if (Array.isArray(value)) {
    return value.reduce((total, child) => total + countStringLeaves(child, needle), 0)
  }
  if (value && typeof value === 'object') {
    return Object.values(value).reduce(
      (total, child) => total + countStringLeaves(child, needle),
      0,
    )
  }
  return 0
}

function updatedAtState(doc) {
  return Object.prototype.hasOwnProperty.call(doc, 'updatedAt')
    ? { present: true, value: doc.updatedAt }
    : { present: false }
}

function sameUpdatedAt(before, after) {
  const beforeState = updatedAtState(before)
  const afterState = updatedAtState(after)
  return beforeState.present === afterState.present
    && (!beforeState.present || beforeState.value === afterState.value)
}

function exactOne(items, predicate, label, problems) {
  const matches = items.filter(predicate)
  if (matches.length !== 1) {
    problems.push(`${label}: expected exactly one match, found ${matches.length}`)
    return null
  }
  return matches[0]
}

function classifyText(text, label, problems) {
  const oldCount = countOccurrences(text, OLD_PHONE)
  const tokenCount = countOccurrences(text, PHONE_TOKEN)

  if (oldCount === 1 && tokenCount === 0) return 'pending'
  if (oldCount === 0 && tokenCount === 1) return 'done'

  problems.push(
    `${label}: expected exactly one old literal or one finished token; found old=${oldCount}, token=${tokenCount}`,
  )
  return 'invalid'
}

function replaceExactLiteral(text) {
  const index = text.indexOf(OLD_PHONE)
  return `${text.slice(0, index)}${PHONE_TOKEN}${text.slice(index + OLD_PHONE.length)}`
}

function findContentTarget(doc, blockKey, childKey, label, problems) {
  if (!Array.isArray(doc.content)) {
    problems.push(`${label}: content is not an array`)
    return null
  }

  const block = exactOne(
    doc.content,
    (candidate) => candidate?._key === blockKey,
    `${label}.block`,
    problems,
  )
  if (!block) return null
  if (block._type !== 'block') {
    problems.push(`${label}.block: expected _type=block`)
    return null
  }
  if (!Array.isArray(block.children)) {
    problems.push(`${label}.block: children is not an array`)
    return null
  }

  const child = exactOne(
    block.children,
    (candidate) => candidate?._key === childKey,
    `${label}.child`,
    problems,
  )
  if (!child) return null
  if (child._type !== 'span' || typeof child.text !== 'string') {
    problems.push(`${label}.child: expected a text span`)
    return null
  }

  return { block, child }
}

function findFaqTarget(doc, faqKey, label, problems) {
  if (!Array.isArray(doc.faqs)) {
    problems.push(`${label}: faqs is not an array`)
    return null
  }

  const faq = exactOne(
    doc.faqs,
    (candidate) => candidate?._key === faqKey,
    `${label}.faq`,
    problems,
  )
  if (!faq) return null
  if (typeof faq.answer !== 'string') {
    problems.push(`${label}.faq: answer is not a string`)
    return null
  }
  return faq
}

function validateBethlehemMark(target, located, state, problems) {
  const spec = target.removeStaticTelMark
  if (!spec) return

  const { block, child } = located
  const markDefs = Array.isArray(block.markDefs) ? block.markDefs : []
  const childMarks = Array.isArray(child.marks) ? child.marks : []
  const markDefsWithKey = markDefs.filter((mark) => mark?._key === spec.markKey)
  const childMarkCount = childMarks.filter((mark) => mark === spec.markKey).length
  const allBlockReferences = (block.children || []).reduce(
    (count, candidate) => count
      + (Array.isArray(candidate?.marks)
        ? candidate.marks.filter((mark) => mark === spec.markKey).length
        : 0),
    0,
  )
  const label = `${target.slug}.${spec.blockKey}/${spec.childKey}`

  if (state === 'pending') {
    if (
      markDefsWithKey.length !== 1
      || markDefsWithKey[0]?._type !== 'link'
      || markDefsWithKey[0]?.href !== spec.href
      || childMarkCount !== 1
      || allBlockReferences !== 1
    ) {
      problems.push(`${label}: static telephone mark baseline does not match exactly`)
    }
    return
  }

  if (state === 'done' && (markDefsWithKey.length !== 0 || allBlockReferences !== 0)) {
    problems.push(`${label}: finished token still has the retired static telephone mark`)
  }
}

function removeBethlehemMark(target, located) {
  const spec = target.removeStaticTelMark
  if (!spec) return

  located.child.marks = (located.child.marks || []).filter((mark) => mark !== spec.markKey)
  located.block.markDefs = (located.block.markDefs || []).filter(
    (mark) => mark?._key !== spec.markKey,
  )
}

function inspectDocument(originalDoc, target, problems) {
  const nextDoc = clone(originalDoc)
  const actions = []
  let pending = 0
  let done = 0

  for (const [blockKey, childKey] of target.content || []) {
    const label = `${target.slug}.content[${blockKey}]/${childKey}`
    const located = findContentTarget(nextDoc, blockKey, childKey, label, problems)
    if (!located) continue

    const state = classifyText(located.child.text, label, problems)
    validateBethlehemMark(target, located, state, problems)
    if (state === 'pending') {
      located.child.text = replaceExactLiteral(located.child.text)
      removeBethlehemMark(target, located)
      actions.push(`content ${blockKey}/${childKey}`)
      pending += 1
    } else if (state === 'done') {
      done += 1
    }
  }

  for (const faqKey of target.faqs || []) {
    const label = `${target.slug}.faqs[${faqKey}]`
    const faq = findFaqTarget(nextDoc, faqKey, label, problems)
    if (!faq) continue

    const state = classifyText(faq.answer, label, problems)
    if (state === 'pending') {
      faq.answer = replaceExactLiteral(faq.answer)
      actions.push(`FAQ ${faqKey}`)
      pending += 1
    } else if (state === 'done') {
      done += 1
    }
  }

  const targetCount = (target.content?.length || 0) + (target.faqs?.length || 0)
  if (pending + done !== targetCount) {
    problems.push(`${target.slug}: only ${pending + done}/${targetCount} targets validated`)
  }

  const relevantCurrent = {
    content: originalDoc.content,
    faqs: originalDoc.faqs,
  }
  const currentOldCount = countStringLeaves(relevantCurrent, OLD_PHONE)
  const currentTokenCount = countStringLeaves(relevantCurrent, PHONE_TOKEN)
  if (currentOldCount !== pending || currentTokenCount !== done) {
    problems.push(
      `${target.slug}: unlisted body/FAQ occurrence detected (old=${currentOldCount}, token=${currentTokenCount})`,
    )
  }

  const relevantNext = { content: nextDoc.content, faqs: nextDoc.faqs }
  const nextOldCount = countStringLeaves(relevantNext, OLD_PHONE)
  const nextTokenCount = countStringLeaves(relevantNext, PHONE_TOKEN)
  if (nextOldCount !== 0 || nextTokenCount !== targetCount) {
    problems.push(
      `${target.slug}: planned result is not exact (old=${nextOldCount}, token=${nextTokenCount})`,
    )
  }

  const patch = {}
  if (actions.some((action) => action.startsWith('content '))) patch.content = nextDoc.content
  if (actions.some((action) => action.startsWith('FAQ '))) patch.faqs = nextDoc.faqs

  return { originalDoc, target, patch, actions, pending, done }
}

function verifyFinishedDocument(doc, target, beforeDoc) {
  const problems = []

  if (!doc) return [`${target.slug}: document missing during read-back`]
  if (doc._id !== target.id || doc._type !== target.type || doc?.slug?.current !== target.slug) {
    problems.push(`${target.slug}: ID/type/slug changed during migration`)
    return problems
  }
  if (!sameUpdatedAt(beforeDoc, doc)) {
    problems.push(`${target.slug}: custom updatedAt field changed`)
  }

  let verifiedTargets = 0
  for (const [blockKey, childKey] of target.content || []) {
    const label = `${target.slug}.content[${blockKey}]/${childKey}`
    const located = findContentTarget(doc, blockKey, childKey, label, problems)
    if (!located) continue
    if (classifyText(located.child.text, label, problems) === 'done') verifiedTargets += 1
    validateBethlehemMark(target, located, 'done', problems)
  }
  for (const faqKey of target.faqs || []) {
    const label = `${target.slug}.faqs[${faqKey}]`
    const faq = findFaqTarget(doc, faqKey, label, problems)
    if (!faq) continue
    if (classifyText(faq.answer, label, problems) === 'done') verifiedTargets += 1
  }

  const targetCount = (target.content?.length || 0) + (target.faqs?.length || 0)
  const relevant = { content: doc.content, faqs: doc.faqs }
  if (verifiedTargets !== targetCount) {
    problems.push(`${target.slug}: only ${verifiedTargets}/${targetCount} targets verified`)
  }
  if (countStringLeaves(relevant, OLD_PHONE) !== 0) {
    problems.push(`${target.slug}: old phone literal remains in content/FAQs`)
  }
  if (countStringLeaves(relevant, PHONE_TOKEN) !== targetCount) {
    problems.push(`${target.slug}: token count does not match its target count`)
  }

  return problems
}

async function main() {
  if (TARGETS.length !== EXPECTED_DOCUMENTS) {
    throw new Error('internal target document count mismatch')
  }
  const encodedTargetCount = TARGETS.reduce(
    (total, target) => total + (target.content?.length || 0) + (target.faqs?.length || 0),
    0,
  )
  if (encodedTargetCount !== EXPECTED_TARGETS) {
    throw new Error('internal field target count mismatch')
  }

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('ABORT: Sanity project configuration is missing. Nothing written.')
    process.exitCode = 2
    return
  }
  if (APPLY && !process.env.SANITY_API_TOKEN) {
    console.error('ABORT: SANITY_API_TOKEN is required for --apply. Nothing written.')
    process.exitCode = 2
    return
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2026-01-02',
    token: process.env.SANITY_API_TOKEN || undefined,
    useCdn: false,
  })

  console.log(`=== DYNAMIC PHONE CONTENT MIGRATION — ${APPLY ? 'APPLY' : 'DRY RUN (no writes)'} ===`)

  const ids = TARGETS.map((target) => target.id)
  const docs = await client.fetch('*[_id in $ids]', { ids })
  const docsById = new Map((docs || []).map((doc) => [doc._id, doc]))
  const problems = []

  if (docsById.size !== TARGETS.length || docs.length !== TARGETS.length) {
    problems.push(`expected ${TARGETS.length} unique documents, fetched ${docs.length}`)
  }

  const inspected = []
  for (const target of TARGETS) {
    const doc = docsById.get(target.id)
    if (!doc) {
      problems.push(`${target.slug}: expected document ID is missing`)
      continue
    }
    if (doc._id !== target.id || doc._type !== target.type || doc?.slug?.current !== target.slug) {
      problems.push(`${target.slug}: exact ID/type/slug baseline mismatch`)
      continue
    }
    if (typeof doc._rev !== 'string' || !doc._rev) {
      problems.push(`${target.slug}: revision ID is missing`)
      continue
    }
    inspected.push(inspectDocument(doc, target, problems))
  }

  if (problems.length) {
    console.error(`ABORT: ${problems.length} exact baseline check(s) failed:`)
    for (const problem of problems) console.error(`  - ${problem}`)
    console.error('Nothing written.')
    process.exitCode = 2
    return
  }

  const plans = inspected.filter((item) => item.pending > 0)
  const pendingTargets = plans.reduce((total, item) => total + item.pending, 0)
  const completedTargets = inspected.reduce((total, item) => total + item.done, 0)

  console.log(`Validated documents: ${inspected.length}`)
  console.log(`Validated targets: ${encodedTargetCount}`)
  console.log(`Pending replacements: ${pendingTargets}`)
  console.log(`Already tokenized: ${completedTargets}`)
  for (const plan of plans) {
    console.log(`  ${plan.target.type}/${plan.target.slug}: ${plan.pending} target(s) would change`)
  }

  if (!plans.length) {
    console.log('SKIP — all 19 exact targets are already tokenized and the static Bethlehem link mark is absent.')
    return
  }

  if (!APPLY) {
    console.log(`DRY RUN PASSED — ${plans.length} document(s), ${pendingTargets} exact target(s) would change.`)
    console.log('No backup or Sanity write was performed. Re-run with --apply only after review.')
    return
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupDir = resolve(scriptDir, '../backups')
  const backupPath = resolve(backupDir, `dynamic-phone-content-${stamp}.json`)
  mkdirSync(backupDir, { recursive: true })
  writeFileSync(
    backupPath,
    JSON.stringify(plans.map(({ originalDoc }) => originalDoc), null, 2),
    { encoding: 'utf8', flag: 'wx' },
  )
  console.log(`Backup written: ${backupPath}`)

  let transaction = client.transaction()
  for (const plan of plans) {
    transaction = transaction.patch(plan.originalDoc._id, (patch) => (
      patch.ifRevisionId(plan.originalDoc._rev).set(plan.patch)
    ))
  }
  await transaction.commit({ visibility: 'sync' })
  console.log(`Committed one revision-guarded transaction for ${plans.length} document(s).`)

  const afterDocs = await client.fetch('*[_id in $ids]', { ids })
  const afterById = new Map((afterDocs || []).map((doc) => [doc._id, doc]))
  const verificationProblems = []
  for (const item of inspected) {
    verificationProblems.push(
      ...verifyFinishedDocument(afterById.get(item.target.id), item.target, item.originalDoc),
    )
  }

  if (verificationProblems.length) {
    console.error(`READ-BACK FAILED: ${verificationProblems.length} verification check(s) failed.`)
    for (const problem of verificationProblems) console.error(`  - ${problem}`)
    process.exitCode = 1
    return
  }

  console.log(`READ-BACK PASSED — ${EXPECTED_DOCUMENTS} documents and ${EXPECTED_TARGETS} exact targets verified.`)
  console.log('The custom updatedAt field was preserved on every document.')
}

main().catch(() => {
  console.error(
    APPLY
      ? 'ABORT: the apply operation could not be confirmed. Do not retry blindly; run the dry-run audit first.'
      : 'ABORT: the read-only Sanity audit could not be completed. Nothing written.',
  )
  process.exitCode = 1
})
