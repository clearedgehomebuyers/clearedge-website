// claim-sweep.mjs — READ-ONLY. Search every Sanity document, of every type, for
// a registry of factual claims. Never writes.
//
// WHY THIS EXISTS: every factual-correction rider on this site so far has missed
// a surface, and always for the same reason — the fix was scoped to a DOCUMENT
// instead of to the CLAIM. Deploy B's TOD rider was hard-scoped to the probate
// blogPost, so /situations/inherited-property kept the false claim until Deploy
// C; Deploy C was scoped to that one situation doc, so the documents blog kept
// it until Deploy G; Deploy E's stale-string gate matched one phrasing of the
// all-heirs error, so a second phrasing survived on the same page it "fixed".
//
// The standard (playbook §3.11): search by claim across ALL content FIRST, then
// scope the fix to exactly what the search returns.
//
// Usage:  node scripts/claim-sweep.mjs            # all claims
//         node scripts/claim-sweep.mjs tod heirs  # only these claim ids
//
// Repo surfaces are NOT covered here — grep them separately (they are a handful
// of .tsx files); this tool owns the CMS side, which is where the misses happen.

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

// Patterns are deliberately BROAD — this is an inventory pass, so a false
// positive costs one line of reading and a false negative costs a live false
// claim. Apostrophes are avoided so curly/straight drift cannot hide a hit.
const CLAIMS = [
  {
    id: 'tod',
    label: 'Transfer-on-death / TOD deed (PA has none for real estate)',
    patterns: [/transfer[\s-]?on[\s-]?death/i, /\bTOD\b/],
  },
  {
    id: 'reu500',
    label: 'REU-500 (form does not exist; PA uses REV-1500)',
    patterns: [/REU[\s-]?500/i],
  },
  {
    id: 'heirs',
    label: 'All-heirs agreement language (ignores 20 Pa.C.S. 3351 PR sale power)',
    patterns: [
      /all (of the )?heirs/i,
      /every heir/i,
      /all parties with legal authority/i,
      /all (the )?(siblings|co-owners|beneficiaries) (must|have to|need to) agree/i,
      /everyone (typically )?needs to agree/i,
    ],
  },
  {
    id: 'smallestate',
    label: 'Small-estate / $50,000 claim (personal property only, excludes real estate)',
    patterns: [/small[\s-]?estate/i, /\$ ?50,?000/, /3102/],
  },
  {
    id: 'foreclosure',
    label: 'Foreclosure mortgage waiting-period claim',
    patterns: [/waiting period/i, /years instead of/i, /qualify for a new mortgage/i],
  },
  {
    id: 'partition',
    label: 'Divorce partition claim (equitable distribution is the mechanism)',
    patterns: [/partition/i],
  },
]

const only = process.argv.slice(2).filter((a) => !a.startsWith('-'))
const claims = only.length ? CLAIMS.filter((c) => only.includes(c.id)) : CLAIMS
if (!claims.length) {
  console.log(`ERROR: no claim ids matched. Known ids: ${CLAIMS.map((c) => c.id).join(', ')}`)
  process.exit(1)
}

const SKIP_KEYS = new Set(['_id', '_type', '_key', '_ref', '_rev', '_createdAt', '_updatedAt'])

// Walk any nested shape, yielding [path, string] for every string leaf.
function* strings(node, path = '') {
  if (typeof node === 'string') {
    yield [path, node]
    return
  }
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      const child = node[i]
      const label = child && typeof child === 'object' && child._key ? `[_key=="${child._key}"]` : `[${i}]`
      yield* strings(child, `${path}${label}`)
    }
    return
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (SKIP_KEYS.has(k)) continue
      yield* strings(v, path ? `${path}.${k}` : k)
    }
  }
}

const docs = await client.fetch('*[]')
const published = docs.filter((d) => !d._id.startsWith('drafts.'))
const drafts = docs.filter((d) => d._id.startsWith('drafts.'))

const byType = {}
for (const d of published) byType[d._type] = (byType[d._type] || 0) + 1

console.log('=== CLAIM SWEEP (read-only) ===')
console.log(`Documents scanned: ${published.length} published (${Object.entries(byType).map(([t, n]) => `${t} ${n}`).join(', ')}) + ${drafts.length} draft`)
console.log(`Claims: ${claims.map((c) => c.id).join(', ')}`)

let grandTotal = 0

for (const claim of claims) {
  const hits = []
  for (const doc of docs) {
    const isDraft = doc._id.startsWith('drafts.')
    for (const [path, text] of strings(doc)) {
      if (claim.patterns.some((p) => p.test(text))) {
        hits.push({
          type: doc._type,
          id: doc._id,
          slug: doc.slug?.current || doc.title || '(no slug)',
          isDraft,
          path,
          text,
        })
      }
    }
  }
  grandTotal += hits.length
  console.log(`\n\n########## CLAIM: ${claim.id} — ${claim.label}`)
  console.log(`########## ${hits.length} hit(s)`)
  if (!hits.length) {
    console.log('  (clean)')
    continue
  }
  const grouped = {}
  for (const h of hits) {
    const k = `${h.type} / ${h.slug}${h.isDraft ? '  [DRAFT]' : ''}  (${h.id})`
    ;(grouped[k] = grouped[k] || []).push(h)
  }
  for (const [docKey, list] of Object.entries(grouped)) {
    console.log(`\n  --- ${docKey}`)
    for (const h of list) {
      const t = h.text.replace(/\s+/g, ' ').trim()
      console.log(`    field: ${h.path}`)
      console.log(`    text : ${t.length > 700 ? t.slice(0, 700) + ' …[truncated]' : t}`)
    }
  }
}

console.log(`\n\n=== TOTAL: ${grandTotal} hit(s) across ${claims.length} claim(s) ===`)
