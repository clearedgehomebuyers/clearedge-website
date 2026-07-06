// Part 2 stage (b): de-optimization metaTitle changes (Sanity side).
// Poconos consolidation — east-stroudsburg and tannersville stop contesting
// generic-Stroudsburg "sell fast" queries; /locations/stroudsburg is the winner.
// The Lehigh Valley hub title is repo-coded (src/lib/regional-hub-data.ts), not here.
// Dry-run by default; pass --yes to write. Ship at least 3 days after stage (a).
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

const CHANGES = [
  {
    slug: 'east-stroudsburg',
    expectBefore: 'Sell Your East Stroudsburg House Fast for Cash | ClearEdge',
    metaTitle: 'Cash Home Buyers in East Stroudsburg, PA | ClearEdge',
  },
  {
    slug: 'tannersville',
    expectBefore: 'Sell Your Tannersville PA Home Fast for Cash | ClearEdge',
    metaTitle: 'Cash Home Buyers in Tannersville & Mount Pocono, PA | ClearEdge',
  },
]

async function main() {
  const write = process.argv.includes('--yes')

  for (const c of CHANGES) {
    const doc = await client.fetch(
      `*[_type == "location" && slug.current == $slug][0]{ _id, metaTitle }`,
      { slug: c.slug }
    )
    if (!doc) {
      console.log(`MISSING: location/${c.slug}`)
      continue
    }
    console.log(`location/${c.slug}`)
    console.log(`  before: ${doc.metaTitle}`)
    console.log(`  after:  ${c.metaTitle}`)
    if (doc.metaTitle === c.metaTitle) {
      console.log('  (already applied)')
      continue
    }
    if (doc.metaTitle !== c.expectBefore) {
      console.log(`  WARNING: current value differs from expected baseline ("${c.expectBefore}") — review before writing.`)
      if (write) {
        console.log('  NOT WRITTEN due to baseline mismatch.')
        continue
      }
    }
    if (write) {
      await client.patch(doc._id).set({ metaTitle: c.metaTitle }).commit()
      console.log('  WRITTEN')
    }
  }

  if (!write) console.log('\nDRY RUN — no changes written. Re-run with --yes to apply.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
