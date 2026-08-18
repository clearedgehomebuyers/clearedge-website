// check-template-revision.mjs — enforces playbook Hard Rule 13.
//
// Fails when a commit changes what a sitemap-listed TEMPLATE renders without
// also bumping TEMPLATE_REVISION in src/app/sitemap.ts.
//
// WHY THIS EXISTS: the sitemap's lastmod for template-rendered URLs is floored
// by TEMPLATE_REVISION, because a Sanity _updatedAt cannot see a repo-side
// change. Deploy P3-1 (2026-08-10) altered the location/situation/blog
// templates and moved no Sanity document; a week later ten URLs were still
// serving pre-fix schema, last crawled Jul 21 - Aug 6. A stale constant does
// not error - it produces a well-formed, complete, validating sitemap that
// quietly tells Google nothing changed. That is undetectable by inspection,
// which is why it is checked mechanically.
//
// The watched set is COMPUTED, not hardcoded: it is the transitive import
// closure of the template entry points, so a newly-added shared component is
// covered the day it is imported, and the rule cannot drift from the check.
//
// Usage:
//   node scripts/check-template-revision.mjs                  # HEAD~1..HEAD
//   node scripts/check-template-revision.mjs --base=A --head=B
//
// Escape hatch: put [no-template-revision] in a commit message in the range.
// It passes the check and prints a prominent notice — a deliberate, recorded
// decision, not a silent bypass.

import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'

const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [k, ...v] = a.replace(/^--/, '').split('='); return [k, v.join('=')]
}))

const REPO = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..')
const git = (...a) => execFileSync('git', a, { cwd: REPO, encoding: 'utf8' }).trim()

const SITEMAP = 'src/app/sitemap.ts'

/** Files whose rendered output lands on sitemap-listed template URLs. */
const ENTRY_POINTS = [
  'src/app/locations/[slug]/page.tsx',
  'src/app/situations/[slug]/page.tsx',
  'src/app/blog/[slug]/page.tsx',
  'src/components/Schema.tsx',
  'src/components/RegionalHubPage.tsx',
]

const EXTS = ['.tsx', '.ts', '.jsx', '.js']

function resolveImport(spec, fromFile) {
  let base
  if (spec.startsWith('@/')) base = join(REPO, 'src', spec.slice(2))
  else if (spec.startsWith('.')) base = resolve(dirname(join(REPO, fromFile)), spec)
  else return null // package import — not ours
  for (const e of ['', ...EXTS]) {
    const p = base + e
    if (existsSync(p) && !p.endsWith('/')) {
      try { if (readFileSync(p).length >= 0) return relative(REPO, p).replace(/\\/g, '/') } catch {}
    }
  }
  for (const e of EXTS) {
    const p = join(base, 'index' + e)
    if (existsSync(p)) return relative(REPO, p).replace(/\\/g, '/')
  }
  return null
}

/** Transitive import closure of the entry points, within src/. */
function templateClosure() {
  const seen = new Set()
  const queue = ENTRY_POINTS.filter(f => existsSync(join(REPO, f)))
  while (queue.length) {
    const file = queue.shift()
    if (seen.has(file)) continue
    seen.add(file)
    let src
    try { src = readFileSync(join(REPO, file), 'utf8') } catch { continue }
    const specs = [
      ...src.matchAll(/(?:^|\s)(?:import|export)[\s\S]*?from\s*['"]([^'"]+)['"]/g),
      ...src.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g),
    ].map(m => m[1])
    for (const spec of specs) {
      const r = resolveImport(spec, file)
      if (r && !seen.has(r)) queue.push(r)
    }
  }
  return seen
}

function revisionAt(ref) {
  let text
  try { text = git('show', `${ref}:${SITEMAP}`) } catch { return null }
  const m = text.match(/TEMPLATE_REVISION\s*=\s*['"]([^'"]+)['"]/)
  return m ? m[1] : null
}

// ── resolve the range ──────────────────────────────────────────────────────
const ZERO = '0000000000000000000000000000000000000000'
let base = args.base && args.base !== ZERO ? args.base : null
const head = args.head || 'HEAD'
if (!base) {
  try { base = git('rev-parse', `${head}~1`) } catch { base = null }
}
if (!base) {
  console.log('check-template-revision: no comparable base commit — skipping.')
  process.exit(0)
}

const changed = git('diff', '--name-only', base, head).split('\n').map(s => s.trim()).filter(Boolean)
if (changed.length === 0) {
  console.log('check-template-revision: no changed files — pass.')
  process.exit(0)
}

const closure = templateClosure()
const touched = changed.filter(f => closure.has(f))

console.log(`check-template-revision: ${changed.length} changed file(s), template closure = ${closure.size} file(s).`)

if (touched.length === 0) {
  console.log('No template-rendering file changed — TEMPLATE_REVISION not required. Pass.')
  process.exit(0)
}

const before = revisionAt(base)
const after = revisionAt(head)

// A changed value is a bump; so is INTRODUCING the constant, which is what the
// commit that first added it does (before is null there, not a stale date).
if (after !== null && before !== after) {
  console.log(`TEMPLATE_REVISION ${before === null ? 'introduced as' : 'bumped ' + before + ' ->'} ${after}. Pass.`)
  process.exit(0)
}

// Deliberate, recorded override.
let messages = ''
try { messages = git('log', '--format=%B', `${base}..${head}`) } catch {}
if (/\[no-template-revision\]/i.test(messages)) {
  console.log('')
  console.log('!! TEMPLATE_REVISION override in effect ([no-template-revision]) !!')
  console.log('   Template files changed and the constant was NOT bumped.')
  console.log('   Files:', touched.join(', '))
  console.log('   This is allowed only when the change provably does not alter rendered')
  console.log('   output for any sitemap-listed URL. If that is not demonstrably true,')
  console.log('   remove the override and bump the constant.')
  console.log('')
  process.exit(0)
}

console.error(`
────────────────────────────────────────────────────────────────────────────
FAIL — template changed, TEMPLATE_REVISION did not.   (playbook Hard Rule 13)
────────────────────────────────────────────────────────────────────────────

These changed files render into sitemap-listed template URLs:

${touched.map(f => '  - ' + f).join('\n')}

TEMPLATE_REVISION in ${SITEMAP} is still ${after === null ? '(unreadable)' : `"${after}"`}.

WHAT TO DO
  Set TEMPLATE_REVISION to today's date, in this same commit:

      const TEMPLATE_REVISION = 'YYYY-MM-DD' // <short reason>

WHY IT MATTERS
  The sitemap's lastmod for /locations/*, /situations/* and /blog/* is floored
  by this constant. Sanity's _updatedAt cannot see a repo-side change, so
  without a bump those URLs keep advertising an older date and Google is told
  nothing changed.

  This already happened. Deploy P3-1 (2026-08-10) stripped aggregateRating
  from these templates and moved no Sanity document. A week later the
  2026-08-17 check-in found ten URLs still serving the pre-fix schema, last
  crawled Jul 21 - Aug 6, still returning Review snippets — the manual-action
  risk the deploy existed to remove was still live in Google's index.

  A stale constant throws no error. The sitemap stays well-formed, complete
  and valid, and carries a lastmod on every URL. It is indistinguishable from
  a working one except by reading the dates against what actually shipped.

AFTER DEPLOYING
  Fetch /sitemap.xml and confirm the affected URLs carry the new date. Use a
  HEADFUL browser — the site 403s curl and headless Chrome behind Vercel's
  Security Checkpoint, which reads like an outage and is not one.

IF THIS CHANGE GENUINELY DOES NOT ALTER RENDERED OUTPUT
  Add [no-template-revision] to the commit message, with a one-line reason.
  It passes and is logged loudly, so the decision stays visible.
────────────────────────────────────────────────────────────────────────────
`)
process.exit(1)
