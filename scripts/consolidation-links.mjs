// Part 2 stage (a): cannibalization-consolidation internal linking pass (Sanity side).
// Loser pages link to their canonical winner with the contested query as anchor text;
// inherited cluster interlinks hub<->spokes. Repo-side links (homepage, footer, LV hub)
// are separate code edits — see EXECUTION-REVIEW-2026-07-06.md.
// Dry-run by default; pass --yes to write. Idempotent per (doc, href, anchor).
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

const PROBATE = '/blog/sell-deceased-parents-house-without-probate-pennsylvania'
const DOCS = '/blog/documents-required-selling-inherited-property-pennsylvania'
const INH_ALLENTOWN = '/blog/sell-inherited-house-allentown-pa'
const SIT_INHERITED = '/situations/inherited-property'

// segments: {text} = plain span, {text, href} = linked span
const TARGETS = [
  {
    desc: 'inherited-property situation -> probate blog (Move 1b)',
    type: 'situation', slug: 'inherited-property', field: 'problemDescription',
    segments: [
      { text: 'Wondering whether the estate even needs probate before you can sell? Our guide to ' },
      { text: "selling a deceased parent's house without probate in PA", href: PROBATE },
      { text: ' walks through every scenario — probate open, closed, or not yet started.' },
    ],
  },
  // docs blog and inh-allentown blog already interlink the full cluster (verified
  // 2026-07-06 via check-existing-links.mjs) — no ops needed there. The hub already
  // links docs + the situation page; its only missing spoke link is inh-allentown:
  {
    desc: 'probate blog (hub) -> inh-allentown spoke (link insertion only)',
    type: 'blogPost', slug: 'sell-deceased-parents-house-without-probate-pennsylvania', field: 'content',
    segments: [
      { text: 'Inherited a property in the Lehigh Valley? See our step-by-step guide to ' },
      { text: 'selling an inherited house in Allentown', href: INH_ALLENTOWN },
      { text: '.' },
    ],
  },
  {
    desc: 'east-stroudsburg -> stroudsburg winner (Poconos consolidation)',
    type: 'location', slug: 'east-stroudsburg', field: 'problemStatement',
    segments: [
      { text: 'In Stroudsburg proper instead? See how to ' },
      { text: 'sell your house fast in Stroudsburg', href: '/locations/stroudsburg' },
      { text: '.' },
    ],
  },
  {
    desc: 'tannersville -> stroudsburg winner (Poconos consolidation)',
    type: 'location', slug: 'tannersville', field: 'problemStatement',
    segments: [
      { text: "Closer to Stroudsburg than the Mount Pocono area? We're " },
      { text: 'cash home buyers in Stroudsburg', href: '/locations/stroudsburg' },
      { text: ' too.' },
    ],
  },
  // LV blog already links all three city pages (verified 2026-07-06). It does still
  // carry a stale href to the 308-redirected old Allentown blog; fixed via fixHref:
  {
    desc: 'LV blog: repoint stale /blog/sell-my-house-fast-allentown href to the location page',
    type: 'blogPost', slug: 'sell-my-house-fast-lehigh-valley', field: 'content',
    fixHref: { from: '/blog/sell-my-house-fast-allentown', to: '/locations/allentown' },
  },
  {
    desc: 'major-repairs situation -> Bethlehem/Allentown city pages (as-is split)',
    type: 'situation', slug: 'major-repairs', field: 'problemDescription',
    segments: [
      { text: 'Dealing with a specific market? See how to ' },
      { text: 'sell a house as-is in Bethlehem', href: '/locations/bethlehem' },
      { text: ' or ' },
      { text: 'sell a house as-is in Allentown', href: '/locations/allentown' },
      { text: '.' },
    ],
  },
  {
    desc: 'bethlehem location -> major-repairs situation (as-is split, reverse)',
    type: 'location', slug: 'bethlehem', field: 'problemStatement',
    segments: [
      { text: "House needs work first? Here's how " },
      { text: 'selling a house that needs major repairs', href: '/situations/major-repairs' },
      { text: ' works with a cash buyer.' },
    ],
  },
  {
    desc: 'allentown location -> major-repairs situation (as-is split, reverse)',
    type: 'location', slug: 'allentown', field: 'problemStatement',
    segments: [
      { text: "House needs work first? Here's how " },
      { text: 'selling a house that needs major repairs', href: '/situations/major-repairs' },
      { text: ' works with a cash buyer.' },
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
      console.log(`EMPTY FIELD   ${t.desc} — ${t.field} is empty/absent; appending would render an orphan sentence. SKIPPED, handle manually.`)
      missing++
      continue
    }
    if (t.fixHref) {
      const blocks = doc.field.map((block) => {
        if (!Array.isArray(block.markDefs)) return block
        return {
          ...block,
          markDefs: block.markDefs.map((md) =>
            md._type === 'link' && md.href === t.fixHref.from ? { ...md, href: t.fixHref.to } : md
          ),
        }
      })
      const hits = doc.field.filter((b) =>
        (b.markDefs || []).some((md) => md._type === 'link' && md.href === t.fixHref.from)
      ).length
      if (hits === 0) {
        console.log(`ALREADY FIXED ${t.desc} (no href ${t.fixHref.from} present)`)
        skipped++
        continue
      }
      console.log(`PLAN          ${t.desc}\n              rewrite ${hits} href(s) ${t.fixHref.from} -> ${t.fixHref.to}`)
      planned++
      if (write) {
        await client.patch(doc._id).set({ [t.field]: blocks }).commit()
        console.log('              WRITTEN')
      }
      continue
    }
    const json = JSON.stringify(doc.field)
    const firstHref = t.segments.find((s) => s.href).href
    if (json.includes(firstHref)) {
      console.log(`ALREADY LINKED ${t.desc} (found ${firstHref})`)
      skipped++
      continue
    }
    const sentence = t.segments.map((s) => (s.href ? `[${s.text}](${s.href})` : s.text)).join('')
    console.log(`PLAN          ${t.desc}\n              append to ${t.type}/${t.slug}.${t.field}: "${sentence}"`)
    planned++
    if (write) {
      await client
        .patch(doc._id)
        .setIfMissing({ [t.field]: [] })
        .append(t.field, [buildBlock(t.segments)])
        .commit()
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
