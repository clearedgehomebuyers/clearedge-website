// Guarded Sanity cleanup for the historical-performance optimization sprint.
//
// DRY RUN BY DEFAULT — pass --apply only after reviewing the plan.
//   node scripts/historical-optimization-sanity.mjs
//   node scripts/historical-optimization-sanity.mjs --apply
//
// CURRENT WRITE SCOPE:
//   * Restore the canonical SEO/NAP phone number in two exact Lehigh Valley
//     guide blocks that were changed by easton-authority-apply.mjs.
//   * Repoint exact Lehigh Valley and Bethlehem water-damage links from a
//     redirected blog URL to the live major-repairs situation page.
//
// RECON-ONLY SCOPE:
//   * Report sanitized keys, hashes, and excerpts for Berks redemption-language
//     candidates. The live CMS body already states that there is no post-sale
//     redemption, so no Berks CMS mutation is encoded or permitted here.
//
// SAFETY:
//   * Exact keyed block text and mark baselines must match before any write.
//   * One backup contains the complete pre-change Sanity document.
//   * Every mutation commits in one revision-guarded transaction.
//   * A fresh useCdn:false read-back verifies the final state.
//   * A successful re-run reports SKIP rather than duplicating work.
//   * The editorial updatedAt field is intentionally not changed.
//   * Raw Sanity errors and client configuration are never printed.

import { createClient } from '@sanity/client'
import { createHash } from 'node:crypto'
import dotenv from 'dotenv'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(scriptDir, '../.env.local'), quiet: true })

const APPLY = process.argv.includes('--apply')
const OLD_PHONE = '(610) 628-0671'
const SEO_PHONE = '(610) 904-8526'
const OLD_WATER_URL = '/blog/selling-water-damaged-house-18102-mold-issues'
const MAJOR_REPAIRS_URL = '/situations/major-repairs'

const SLUGS = {
  lehigh: 'sell-my-house-fast-lehigh-valley',
  bethlehem: 'selling-house-international-property-maintenance-code-violations-bethlehem',
  berks: 'how-to-stop-berks-county-judicial-sale-2026',
}

const LEHIGH_PHONE_BLOCKS = [
  {
    blockKey: 'step1',
    oldText: 'Step 1: Contact us. Call (610) 628-0671 or fill out the form. Tell us about the property and your situation; there is no obligation to accept an offer.',
    nextText: 'Step 1: Contact us. Call (610) 904-8526 or fill out the form. Tell us about the property and your situation; there is no obligation to accept an offer.',
  },
  {
    blockKey: 'close3',
    oldText: 'Call (610) 628-0671 or fill out the form for a no-obligation cash offer. We will review the property and explain the next step so you can compare the offer with your other options.',
    nextText: 'Call (610) 904-8526 or fill out the form for a no-obligation cash offer. We will review the property and explain the next step so you can compare the offer with your other options.',
  },
]

const LEHIGH_WATER_LINK = {
  blockKey: 'sit4',
  markKey: 'link-wd-lehigh',
  blockText: "Major repairs needed — Foundation issues? Roof problems? Water damage or mold? We buy as-is. You don't have to fix anything.",
  oldHref: OLD_WATER_URL,
  nextHref: MAJOR_REPAIRS_URL,
}

const BETHLEHEM_WATER_LINK = {
  blockKey: 'when2',
  blockTextSha256: '7382c873afa51399efbe4c40eaa6e90ed4dc549ad20659d217f5eaf06b7c94d8',
  markKey: 'link-wd-bethlehem',
  oldHref: OLD_WATER_URL,
  nextHref: MAJOR_REPAIRS_URL,
}

const clone = (value) => JSON.parse(JSON.stringify(value))
const slugOf = (doc) => doc?.slug?.current || ''
const blockText = (block) => (block?.children || []).map((child) => child?.text || '').join('')
const digest = (value) => createHash('sha256').update(String(value)).digest('hex')

function safeKey(value) {
  return String(value || 'missing')
    .replace(/[^A-Za-z0-9_-]/g, '?')
    .slice(0, 80)
}

function safeExcerpt(value, limit = 240) {
  const cleaned = String(value || '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return cleaned.length > limit ? `${cleaned.slice(0, limit)}…` : cleaned
}

function countHref(content, href) {
  return (content || []).reduce(
    (total, block) => total + (block?.markDefs || []).filter((mark) => mark?.href === href).length,
    0,
  )
}

function replacePhoneInExactBlock(block, baseline) {
  const matchingChildren = (block.children || []).filter((child) => (child?.text || '').includes(OLD_PHONE))
  if (matchingChildren.length !== 1) return false

  const child = matchingChildren[0]
  if (child.text.split(OLD_PHONE).length - 1 !== 1) return false
  child.text = child.text.replace(OLD_PHONE, SEO_PHONE)
  return blockText(block) === baseline.nextText
}

function reportBerksRecon(doc) {
  const claimPattern = /\b(?:redeem(?:ed|ing)?|redemption|post[-\s]?sale|(?:nine|9)[-\s]+months?)\b/i
  const matches = []

  for (const block of doc?.content || []) {
    const text = blockText(block)
    if (!claimPattern.test(text)) continue
    matches.push({ area: 'content', key: block?._key, style: block?.style, text })
  }

  for (const faq of doc?.faqs || []) {
    const text = `${faq?.question || ''} ${faq?.answer || ''}`.trim()
    if (!claimPattern.test(text)) continue
    matches.push({ area: 'faqs', key: faq?._key, style: 'faq', text })
  }

  console.log(`\nRECON-ONLY — ${SLUGS.berks}`)
  console.log(`  redemption-claim candidates: ${matches.length}`)
  for (const match of matches) {
    console.log(
      `  area=${match.area} key=${safeKey(match.key)} style=${safeKey(match.style)} textSha256=${digest(match.text)} text=${JSON.stringify(safeExcerpt(match.text))}`,
    )
  }
  console.log('  No Berks mutation is encoded or permitted by this script version.')
}

function planLehighChanges(doc, aborts) {
  const content = clone(doc?.content || [])
  const actions = []

  for (const baseline of LEHIGH_PHONE_BLOCKS) {
    const matches = content.filter((block) => block?._key === baseline.blockKey)
    if (matches.length !== 1) {
      aborts.push(`${SLUGS.lehigh}.${baseline.blockKey}: expected exactly one keyed block`)
      continue
    }

    const block = matches[0]
    const currentText = blockText(block)
    if (currentText === baseline.nextText) continue
    if (currentText !== baseline.oldText) {
      aborts.push(`${SLUGS.lehigh}.${baseline.blockKey}: exact text baseline mismatch`)
      continue
    }
    if (!replacePhoneInExactBlock(block, baseline)) {
      aborts.push(`${SLUGS.lehigh}.${baseline.blockKey}: guarded phone replacement could not be mapped`)
      continue
    }
    actions.push(`${baseline.blockKey}: restore canonical SEO/NAP phone`)
  }

  if (content.some((block) => blockText(block).includes(OLD_PHONE))) {
    aborts.push(`${SLUGS.lehigh}: a direct-attribution phone remains outside the completed exact replacements`)
  }

  const linkBlocks = content.filter((block) => block?._key === LEHIGH_WATER_LINK.blockKey)
  if (linkBlocks.length !== 1) {
    aborts.push(`${SLUGS.lehigh}.${LEHIGH_WATER_LINK.blockKey}: expected exactly one keyed block`)
  } else {
    const block = linkBlocks[0]
    if (blockText(block) !== LEHIGH_WATER_LINK.blockText) {
      aborts.push(`${SLUGS.lehigh}.${LEHIGH_WATER_LINK.blockKey}: exact text baseline mismatch`)
    } else {
      const marks = (block.markDefs || []).filter((mark) => mark?._key === LEHIGH_WATER_LINK.markKey)
      if (marks.length !== 1) {
        aborts.push(`${SLUGS.lehigh}.${LEHIGH_WATER_LINK.blockKey}: expected exact mark ${LEHIGH_WATER_LINK.markKey}`)
      } else if (marks[0].href === LEHIGH_WATER_LINK.oldHref) {
        const oldHrefCount = countHref(content, LEHIGH_WATER_LINK.oldHref)
        if (oldHrefCount !== 1) {
          aborts.push(`${SLUGS.lehigh}: expected exactly one old water-damage URL, found ${oldHrefCount}`)
        } else {
          marks[0].href = LEHIGH_WATER_LINK.nextHref
          actions.push(`${LEHIGH_WATER_LINK.blockKey}/${LEHIGH_WATER_LINK.markKey}: repoint redirected water-damage link`)
        }
      } else if (marks[0].href === LEHIGH_WATER_LINK.nextHref) {
        if (countHref(content, LEHIGH_WATER_LINK.oldHref) !== 0) {
          aborts.push(`${SLUGS.lehigh}: another old water-damage URL remains outside the guarded mark`)
        }
      } else {
        aborts.push(`${SLUGS.lehigh}.${LEHIGH_WATER_LINK.markKey}: exact href baseline mismatch`)
      }
    }
  }

  return actions.length ? { doc, patch: { content }, actions } : null
}

function planBethlehemChanges(doc, aborts) {
  const content = clone(doc?.content || [])
  const actions = []
  const blocks = content.filter((block) => block?._key === BETHLEHEM_WATER_LINK.blockKey)

  if (blocks.length !== 1) {
    aborts.push(`${SLUGS.bethlehem}.${BETHLEHEM_WATER_LINK.blockKey}: expected exactly one keyed block`)
    return null
  }

  const block = blocks[0]
  if (digest(blockText(block)) !== BETHLEHEM_WATER_LINK.blockTextSha256) {
    aborts.push(`${SLUGS.bethlehem}.${BETHLEHEM_WATER_LINK.blockKey}: exact text hash baseline mismatch`)
    return null
  }

  const marks = (block.markDefs || []).filter((mark) => mark?._key === BETHLEHEM_WATER_LINK.markKey)
  if (marks.length !== 1) {
    aborts.push(`${SLUGS.bethlehem}.${BETHLEHEM_WATER_LINK.blockKey}: expected exact mark ${BETHLEHEM_WATER_LINK.markKey}`)
    return null
  }

  if (marks[0].href === BETHLEHEM_WATER_LINK.oldHref) {
    const oldHrefCount = countHref(content, BETHLEHEM_WATER_LINK.oldHref)
    if (oldHrefCount !== 1) {
      aborts.push(`${SLUGS.bethlehem}: expected exactly one old water-damage URL, found ${oldHrefCount}`)
      return null
    }
    marks[0].href = BETHLEHEM_WATER_LINK.nextHref
    actions.push(`${BETHLEHEM_WATER_LINK.blockKey}/${BETHLEHEM_WATER_LINK.markKey}: repoint redirected water-damage link`)
  } else if (marks[0].href === BETHLEHEM_WATER_LINK.nextHref) {
    if (countHref(content, BETHLEHEM_WATER_LINK.oldHref) !== 0) {
      aborts.push(`${SLUGS.bethlehem}: another old water-damage URL remains outside the guarded mark`)
    }
  } else {
    aborts.push(`${SLUGS.bethlehem}.${BETHLEHEM_WATER_LINK.markKey}: exact href baseline mismatch`)
  }

  return actions.length ? { doc, patch: { content }, actions } : null
}

function verifyLehigh(doc) {
  const problems = []
  for (const baseline of LEHIGH_PHONE_BLOCKS) {
    const blocks = (doc?.content || []).filter((block) => block?._key === baseline.blockKey)
    if (blocks.length !== 1 || blockText(blocks[0]) !== baseline.nextText) {
      problems.push(`${SLUGS.lehigh}.${baseline.blockKey}: corrected text is not exact`)
    }
  }

  const linkBlocks = (doc?.content || []).filter((block) => block?._key === LEHIGH_WATER_LINK.blockKey)
  const mark = linkBlocks.length === 1
    ? (linkBlocks[0].markDefs || []).find((candidate) => candidate?._key === LEHIGH_WATER_LINK.markKey)
    : undefined
  if (linkBlocks.length !== 1 || blockText(linkBlocks[0]) !== LEHIGH_WATER_LINK.blockText || mark?.href !== MAJOR_REPAIRS_URL) {
    problems.push(`${SLUGS.lehigh}.${LEHIGH_WATER_LINK.blockKey}: corrected link is not exact`)
  }
  if (countHref(doc?.content, OLD_WATER_URL) !== 0) {
    problems.push(`${SLUGS.lehigh}: old water-damage URL remains`)
  }
  if ((doc?.content || []).some((block) => blockText(block).includes(OLD_PHONE))) {
    problems.push(`${SLUGS.lehigh}: direct-attribution phone remains in body copy`)
  }
  return problems
}

function verifyBethlehem(doc) {
  const problems = []
  const blocks = (doc?.content || []).filter((block) => block?._key === BETHLEHEM_WATER_LINK.blockKey)
  const mark = blocks.length === 1
    ? (blocks[0].markDefs || []).find((candidate) => candidate?._key === BETHLEHEM_WATER_LINK.markKey)
    : undefined

  if (blocks.length !== 1 || digest(blockText(blocks[0])) !== BETHLEHEM_WATER_LINK.blockTextSha256) {
    problems.push(`${SLUGS.bethlehem}.${BETHLEHEM_WATER_LINK.blockKey}: exact text baseline changed`)
  }
  if (mark?.href !== BETHLEHEM_WATER_LINK.nextHref) {
    problems.push(`${SLUGS.bethlehem}.${BETHLEHEM_WATER_LINK.markKey}: corrected link is not exact`)
  }
  if (countHref(doc?.content, BETHLEHEM_WATER_LINK.oldHref) !== 0) {
    problems.push(`${SLUGS.bethlehem}: old water-damage URL remains`)
  }
  return problems
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

  const docs = await client.fetch(
    '*[_type == "blogPost" && slug.current in $slugs]',
    { slugs: Object.values(SLUGS) },
  )
  const bySlug = new Map((docs || []).map((doc) => [slugOf(doc), doc]))

  console.log(`=== HISTORICAL OPTIMIZATION SANITY — ${APPLY ? 'APPLY' : 'DRY RUN (no writes)'} ===`)

  const missing = Object.values(SLUGS).filter((slug) => !bySlug.has(slug))
  if (missing.length) {
    console.error(`ABORT: ${missing.length} expected Sanity document(s) were not found. Nothing written.`)
    process.exitCode = 2
    return
  }

  reportBerksRecon(bySlug.get(SLUGS.berks))

  const aborts = []
  const lehighPlan = planLehighChanges(bySlug.get(SLUGS.lehigh), aborts)
  const bethlehemPlan = planBethlehemChanges(bySlug.get(SLUGS.bethlehem), aborts)
  const plans = [lehighPlan, bethlehemPlan].filter(Boolean)

  console.log('\nENCODED WRITE PLAN')
  if (!plans.length) console.log('  no changes needed')
  for (const plan of plans) {
    console.log(`  ${slugOf(plan.doc)}`)
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
    console.log('\nSKIP — every encoded correction is already present. Berks remained recon-only and unchanged.')
    return
  }

  if (!APPLY) {
    console.log(`\nDRY RUN PASSED — ${plans.length} document(s) would change. Berks remains recon-only.`)
    return
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupDir = resolve(scriptDir, '../backups')
  const backupPath = resolve(backupDir, `historical-optimization-sanity-${stamp}.json`)
  mkdirSync(backupDir, { recursive: true })
  writeFileSync(backupPath, JSON.stringify(plans.map(({ doc }) => doc), null, 2))
  console.log(`\nBackup written: ${backupPath}`)

  let transaction = client.transaction()
  for (const plan of plans) {
    transaction = transaction.patch(plan.doc._id, (patch) => patch.ifRevisionId(plan.doc._rev).set(plan.patch))
  }
  await transaction.commit()
  console.log(`Committed ${plans.length} document in one revision-guarded transaction.`)

  const afterDocs = await client.fetch(
    '*[_type == "blogPost" && slug.current in $slugs]',
    { slugs: Object.values(SLUGS) },
  )
  const afterBySlug = new Map((afterDocs || []).map((doc) => [slugOf(doc), doc]))
  const verificationErrors = [
    ...verifyLehigh(afterBySlug.get(SLUGS.lehigh)),
    ...verifyBethlehem(afterBySlug.get(SLUGS.bethlehem)),
  ]

  if (verificationErrors.length) {
    console.error('\nREAD-BACK FAILED:')
    for (const problem of verificationErrors) console.error(`  - ${problem}`)
    process.exitCode = 1
    return
  }

  console.log('\nREAD-BACK PASSED — encoded corrections match exactly; Berks remained recon-only and unchanged.')
}

main().catch(() => {
  console.error('ABORT: the Sanity request failed. No raw error details were printed; verify local configuration and connectivity.')
  process.exitCode = 1
})
