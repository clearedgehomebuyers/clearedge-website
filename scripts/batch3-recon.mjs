// batch3-recon.mjs — READ-ONLY. Establishes ground truth for Batch 3 before
// anything is written: current inbound links to the orphan page, the state of
// the water-damaged post's auto-linker defect, and whether Sanity actually
// carries usable modification dates for QW6.
//
// Never writes. Run: node scripts/batch3-recon.mjs

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const TARGET = 'are-cash-home-buyers-legit'

// 1 — who links to the orphan page, anywhere in any document
const all = await client.fetch(`*[_type in ["blogPost","location","situation"]]{
  ..., "slug": slug.current
}`)

console.log('=== 1. INBOUND LINKS TO /' + TARGET + ' (Sanity content) ===')
const linkers = []
for (const doc of all) {
  const s = JSON.stringify(doc)
  const n = (s.match(new RegExp(TARGET, 'g')) || []).length
  if (n > 0) linkers.push({ type: doc._type, slug: doc.slug, occurrences: n })
}
if (linkers.length === 0) console.log('  NONE — no Sanity document links to it')
else linkers.forEach(l => console.log(`  ${l.type.padEnd(10)} ${String(l.slug).padEnd(55)} x${l.occurrences}`))

// 2 — the water-damaged post's auto-linker defect
console.log('\n=== 2. WATER-DAMAGED POST: auto-linker defect ===')
const wd = all.find(d => d.slug === 'selling-water-damaged-house-18102-mold-issues')
if (!wd) {
  console.log('  POST NOT FOUND in Sanity')
} else {
  const s = JSON.stringify(wd)
  const epaLinks = (s.match(/epa\.gov/g) || []).length
  console.log('  epa.gov link occurrences :', epaLinks)
  // Find the literal split-word artifacts: "epa" as its own linked span inside
  // a word like "repair" / "NEPA".
  const marks = []
  const walk = (blocks) => {
    if (!Array.isArray(blocks)) return
    for (const b of blocks) {
      if (b && b._type === 'block' && Array.isArray(b.children)) {
        const texts = b.children.map(c => c.text || '')
        for (let i = 0; i < texts.length; i++) {
          if (/^epa$/i.test(texts[i].trim())) {
            marks.push((texts[i - 1] || '').slice(-14) + '[' + texts[i] + ']' + (texts[i + 1] || '').slice(0, 14))
          }
        }
      }
    }
  }
  walk(wd.content)
  console.log('  split-word "epa" spans   :', marks.length)
  marks.slice(0, 8).forEach(m => console.log('    ' + JSON.stringify(m)))
}

// 3 — QW6 date availability
console.log('\n=== 3. QW6 DATE AVAILABILITY ===')
for (const t of ['blogPost', 'location', 'situation']) {
  const docs = all.filter(d => d._type === t)
  const withSys = docs.filter(d => d._updatedAt).length
  const withPub = docs.filter(d => d.publishedAt).length
  const withUpd = docs.filter(d => d.updatedAt).length
  const dates = docs.map(d => d._updatedAt).filter(Boolean).sort()
  console.log(`  ${t.padEnd(10)} n=${String(docs.length).padEnd(3)} _updatedAt=${withSys} publishedAt=${withPub} updatedAt=${withUpd}`)
  console.log(`    _updatedAt range: ${dates[0]}  ..  ${dates[dates.length - 1]}`)
}

// 4 — prune targets present?
console.log('\n=== 4. PRUNE TARGETS IN SANITY ===')
const prunes = [
  'sell-my-house-fast-luzerne-county-pa',
  'cash-home-buyers-lackawanna-county-no-fees',
  'cash-home-buyers-pottsville-pa',
  'selling-water-damaged-house-18102-mold-issues',
]
for (const p of prunes) {
  const d = all.find(x => x.slug === p)
  console.log(`  ${d ? 'PRESENT' : 'MISSING'}  ${p}${d ? '  _updatedAt=' + d._updatedAt : ''}`)
}
