// Disclosure-blog recovery, option (b): contextual in-body inbound links from
// topically-adjacent pages (it currently has only auto-generated card links).
// Dry-run by default; pass --yes to write. Idempotent per (doc, href).
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

const DISCLOSURE = '/blog/scranton-pa-major-structural-damage-disclosure-law-2026'

const TARGETS = [
  {
    desc: 'avoid-foreclosure-scranton blog -> disclosure blog',
    type: 'blogPost', slug: 'avoid-foreclosure-scranton-pa', field: 'content',
    segments: [
      { text: 'Selling to avoid foreclosure? Know ' },
      { text: "Scranton's structural damage disclosure requirements", href: DISCLOSURE },
      { text: ' before you sign anything — they apply even in a distressed sale.' },
    ],
  },
  {
    desc: 'dunmore mine-subsidence blog -> disclosure blog',
    type: 'blogPost', slug: 'sell-my-house-fast-dunmore-mine-subsidence', field: 'content',
    segments: [
      { text: 'Mine subsidence damage is a disclosable structural defect — see ' },
      { text: "PA's structural damage disclosure law for Scranton-area sellers", href: DISCLOSURE },
      { text: ' for exactly what the law requires.' },
    ],
  },
  {
    desc: 'foundation-structural-issues situation -> disclosure blog',
    type: 'situation', slug: 'foundation-structural-issues', field: 'problemDescription',
    segments: [
      { text: 'Selling in NEPA? Read up on ' },
      { text: "Pennsylvania's structural damage disclosure law", href: DISCLOSURE },
      { text: " — you must disclose known defects, but you don't have to repair them to sell for cash." },
    ],
  },
  {
    desc: 'scranton location -> disclosure blog',
    type: 'location', slug: 'scranton', field: 'problemStatement',
    segments: [
      { text: 'Worried about foundation cracks or settling? Here’s ' },
      { text: 'what Scranton sellers must disclose about structural damage', href: DISCLOSURE },
      { text: ' — and why it doesn’t stop a cash sale.' },
    ],
  },
]

const key = () => randomBytes(6).toString('hex')

function buildBlock(segments) {
  const markDefs = []
  const children = segments.map((seg) => {
    if (!seg.href) return { _type: 'span', _key: key(), text: seg.text, marks: [] }
    const markKey = key()
    markDefs.push({ _key: markKey, _type: 'link', href: seg.href })
    return { _type: 'span', _key: key(), text: seg.text, marks: [markKey] }
  })
  return { _type: 'block', _key: key(), style: 'normal', children, markDefs }
}

async function main() {
  const write = process.argv.includes('--yes')
  let planned = 0, skipped = 0, missing = 0

  for (const t of TARGETS) {
    const doc = await client.fetch(
      `*[_type == $type && slug.current == $slug][0]{ _id, "field": ${t.field} }`,
      { type: t.type, slug: t.slug }
    )
    if (!doc) {
      console.log(`MISSING DOC   ${t.desc} (${t.type}/${t.slug})`)
      missing++
      continue
    }
    if (!Array.isArray(doc.field) || doc.field.length === 0) {
      console.log(`EMPTY FIELD   ${t.desc} — ${t.field} is empty/absent. SKIPPED, handle manually.`)
      missing++
      continue
    }
    if (JSON.stringify(doc.field).includes(DISCLOSURE)) {
      console.log(`ALREADY LINKED ${t.desc}`)
      skipped++
      continue
    }
    const sentence = t.segments.map((s) => (s.href ? `[${s.text}](${s.href})` : s.text)).join('')
    console.log(`PLAN          ${t.desc}\n              append: "${sentence}"`)
    planned++
    if (write) {
      await client.patch(doc._id).append(t.field, [buildBlock(t.segments)]).commit()
      console.log('              WRITTEN')
    }
  }

  console.log(`\n${planned} planned, ${skipped} already linked, ${missing} missing/empty.`)
  if (!write) console.log('DRY RUN — no changes written. Re-run with --yes to apply.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
