// Read-only: list in-body link hrefs for pages touched by the consolidation pass.
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2026-01-02',
  useCdn: false,
})

const q = `{
  "blogs": *[_type=='blogPost' && slug.current in [
    'documents-required-selling-inherited-property-pennsylvania',
    'sell-inherited-house-allentown-pa',
    'sell-my-house-fast-lehigh-valley',
    'sell-deceased-parents-house-without-probate-pennsylvania'
  ]]{ 'slug': slug.current, 'hrefs': content[].markDefs[].href },
  "situations": *[_type=='situation' && slug.current in ['inherited-property','major-repairs']]{
    'slug': slug.current, 'hrefs': problemDescription[].markDefs[].href },
  "locations": *[_type=='location' && slug.current in ['allentown','bethlehem','east-stroudsburg','tannersville']]{
    'slug': slug.current, 'hrefs': problemStatement[].markDefs[].href }
}`

const r = await client.fetch(q)
for (const group of ['blogs', 'situations', 'locations']) {
  for (const d of r[group]) {
    console.log(`${group}/${d.slug}:`)
    for (const h of (d.hrefs || []).filter(Boolean)) console.log(`  ${h}`)
  }
}
