/**
 * Clarify that the existing Easton, Allentown, and Reading stories are real
 * transactions, as confirmed by the business owner on 2026-09-24.
 *
 * Dry-run by default. Pass --apply to make the three field-only CMS changes.
 * Uses exact document and text baselines, a full-document backup, one
 * revision-guarded transaction, fresh read-back, and idempotent SKIPs.
 * No case-study title, description, dollar amount, or timing is changed.
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: process.env.CLEAREDGE_ENV_FILE || resolve(scriptDir, '../.env.local'), quiet: true })

const apply = process.argv.includes('--apply')
const targets = [
  {
    id: 'Kkwf7dGhrCPgC5ftH1llbc',
    slug: 'allentown',
    city: 'Allentown',
    county: 'Lehigh County',
    before: 'These scenarios represent the types of situations we handle regularly across Lehigh County.',
  },
  {
    id: '1vG1cAehNv3GJkhfGdHKuw',
    slug: 'easton',
    city: 'Easton',
    county: 'Northampton County',
    before: 'These scenarios represent the types of situations we handle regularly across Northampton County.',
  },
  {
    id: '1vG1cAehNv3GJkhfGeEAvi',
    slug: 'reading',
    city: 'Reading',
    county: 'Berks County',
    before: 'These scenarios represent the types of situations we handle regularly across Berks County.',
  },
].map((target) => ({
  ...target,
  after: `These are actual ClearEdge transactions in ${target.county}. Seller names are omitted for privacy.`,
}))

function nonTargetFields(doc) {
  const copy = structuredClone(doc)
  delete copy._rev
  delete copy._updatedAt
  delete copy.caseStudiesDisclaimer
  return copy
}

async function main() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  if (projectId !== 'd78o4wq2' || dataset !== 'production') {
    throw new Error('Expected ClearEdge production Sanity project/dataset; nothing written.')
  }
  if (apply && !process.env.SANITY_API_TOKEN) {
    throw new Error('SANITY_API_TOKEN is required for --apply; nothing written.')
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2026-01-02',
    useCdn: false,
    token: apply ? process.env.SANITY_API_TOKEN : undefined,
  })
  const ids = targets.map((target) => target.id)
  const query = '*[_id in $ids]'
  const docs = await client.fetch(query, { ids })
  const byId = new Map(docs.map((doc) => [doc._id, doc]))
  const errors = []
  const plans = []

  for (const target of targets) {
    const doc = byId.get(target.id)
    if (!doc || doc._type !== 'location' || doc.slug?.current !== target.slug ||
        doc.city !== target.city || doc.county !== target.county ||
        doc.caseStudies?.length !== 3) {
      errors.push(`${target.slug}: document identity or case-study count changed`)
      continue
    }
    if (doc.caseStudiesDisclaimer === target.after) {
      console.log(`SKIP ${target.slug}: already says these are actual transactions`)
      continue
    }
    if (doc.caseStudiesDisclaimer !== target.before) {
      errors.push(`${target.slug}: exact disclaimer baseline changed`)
      continue
    }
    plans.push({ target, doc })
    console.log(`${apply ? 'APPLY' : 'WOULD UPDATE'} ${target.slug}:`)
    console.log(`  before: ${target.before}`)
    console.log(`  after:  ${target.after}`)
  }

  if (errors.length) throw new Error(`Aborting before any write:\n${errors.join('\n')}`)
  if (!plans.length) return console.log('All three disclaimers are already correct; nothing written.')
  if (!apply) return console.log(`Dry run passed: ${plans.length} field-only change(s). Nothing written.`)

  const backupDir = resolve(scriptDir, '../backups')
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupPath = resolve(backupDir, `clarify-real-case-studies-${stamp}.json`)
  mkdirSync(backupDir, { recursive: true })
  writeFileSync(backupPath, JSON.stringify(plans.map(({ doc }) => doc), null, 2))
  console.log(`Backup written: ${backupPath}`)

  let transaction = client.transaction()
  for (const { target, doc } of plans) {
    transaction = transaction.patch(doc._id, (patch) =>
      patch.ifRevisionId(doc._rev).set({ caseStudiesDisclaimer: target.after }),
    )
  }
  await transaction.commit()

  const afterDocs = await client.fetch(query, { ids })
  const afterById = new Map(afterDocs.map((doc) => [doc._id, doc]))
  for (const { target, doc } of plans) {
    const after = afterById.get(target.id)
    if (!after || after.caseStudiesDisclaimer !== target.after ||
        !isDeepStrictEqual(nonTargetFields(after), nonTargetFields(doc))) {
      throw new Error(`Read-back failed for ${target.slug}; inspect the backup and Sanity document.`)
    }
    console.log(`VERIFIED ${target.slug}: disclaimer updated; every non-target field unchanged`)
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
