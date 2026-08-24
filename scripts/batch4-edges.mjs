// batch4-edges.mjs — THE EDGE LIST. Data only, no side effects.
//
// Single source of truth for Batch 4, consumed by both batch4-apply.mjs and the
// CHANGES.md log generator, so the log cannot drift from what was written.
//
// Every edge carries: from, to, anchor, finding. The audit specifically warns
// this batch is unreadable later without that, so `finding` is required.

// ---------------------------------------------------------------------------
// QW10 — 30 ungrammatical anchors, all in the SAME generated sentence:
//     "Learn more about selling {label} properties."
// Only the linked span is rewritten; the "Learn more about selling " prefix and
// the trailing "." stay, so the diff is one text node per edge.
//
// Two variants per situation, assigned deterministically by document slug, so
// 30 links do not become 7 exact-match anchors repeated 30 times — that trades
// one over-optimisation signal for another. Idempotent: the assignment is a
// pure function of the slug.
export const QW10_ANCHORS = {
  '/situations/vacant-property': [
    'a vacant property in Pennsylvania',
    'a vacant or abandoned house',
  ],
  '/situations/tax-liens-code-violations': [
    'a house with tax liens or code violations',
    'a property with unpaid taxes or citations',
  ],
  '/situations/tired-landlord': [
    'a rental property with tenants in place',
    'a rental property you are tired of managing',
  ],
  '/situations/foreclosure': [
    'a house in foreclosure',
    'a home before the foreclosure sale',
  ],
  // NOT city-qualified, deliberately — see CROSS_CLUSTER_GUARD below.
  '/situations/inherited-property': [
    'an inherited house',
    'a house you inherited',
  ],
  '/situations/job-relocation': [
    'a house for a job relocation',
    'a home when work moves you',
  ],
  '/situations/major-repairs': [
    'a house that needs major repairs',
    'a home with significant repair needs',
  ],
}

/** Deterministic variant pick — same slug always yields the same anchor. */
export function pickAnchor(dest, fromSlug) {
  const variants = QW10_ANCHORS[dest]
  if (!variants) return null
  let h = 0
  for (const ch of fromSlug) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return variants[h % variants.length]
}

// ---------------------------------------------------------------------------
// CROSS-CLUSTER GUARD (Tyler's constraint, quantified from GSC 2026-07-27..08-24).
//
// /situations/inherited-property took 202 impressions and ZERO clicks in 28
// days, and ~130 of those impressions are city-qualified queries a dedicated
// page already owns or should:
//     sell inherited house allentown            49 imp @ 14.0
//     how do i sell an inherited house reading pa  21 imp @ 10.2
//     how do i sell an inherited house berks county 21 imp @ 10.6
//     sell my inherited house lehighton pa      17 imp @  9.6
//     sell inherited house bethlehem            16 imp @ 14.6
//     sell my inhertied house berks county      11 imp @ 13.8
// Meanwhile /blog/sell-inherited-house-allentown-pa holds 1.7-1.9 on the same
// Allentown query. Both pages appear: that is the cannibalization.
//
// RULE: never add an INBOUND link to /situations/inherited-property with a
// city-qualified anchor. The hub may link OUT to city owners — that is the
// hand-off S2 asks for and it reduces the competition rather than feeding it.
export const NO_CITY_ANCHOR_INBOUND = new Set(['/situations/inherited-property'])

// ---------------------------------------------------------------------------
// QW9 — measured gaps (9), not the audit's assumed 8+2.
//
// FIVE of the seven hub->spoke gaps are NOT missing links: the blog references
// the situation, but the Related Articles module renders only the top 3 by
// publishedAt (situations/[slug]/page.tsx:369). A Sanity reference edit cannot
// fix those — a body link can, and it also earns a query-aligned anchor the
// module's title-anchor never would.
export const QW9_EDGES = [
  // --- genuinely missing in both directions -------------------------------
  { from: '/situations/foreclosure', to: '/blog/pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights',
    anchor: 'how Act 135 conservatorship works in Pennsylvania',
    finding: 'QW9', kind: 'body', note: 'no body link and no reference — the only true two-way gap' },
  { from: '/blog/pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights', to: '/situations/foreclosure',
    anchor: 'selling a house in foreclosure',
    finding: 'QW9', kind: 'body', note: 'spoke->hub, plus add the relatedSituations reference' },
  { from: '/situations/vacant-property', to: '/blog/stop-govos-fines-poconos-house',
    anchor: 'GovOS vacant-property fines in the Poconos',
    finding: 'QW9', kind: 'body', note: 'no reference at all; hub has only 1 referenced spoke' },
  { from: '/blog/scranton-pa-major-structural-damage-disclosure-law-2026', to: '/situations/foundation-structural-issues',
    anchor: 'selling a house with foundation or structural damage',
    finding: 'QW9', kind: 'body', note: 'spoke->hub gap' },

  // --- referenced but cut by the module cap of 3 ---------------------------
  { from: '/situations/inherited-property', to: '/blog/documents-required-selling-inherited-property-pennsylvania',
    anchor: 'the documents you need to sell an inherited house',
    finding: 'QW9', kind: 'body', note: 'THE headline gap — site #2 page by impressions, and the two cannibalize each other' },
  { from: '/situations/tired-landlord', to: '/blog/luzerne-county-rental-property-registration-inspection-requirements-2026',
    anchor: 'Luzerne County rental registration and inspection rules',
    finding: 'QW9', kind: 'body', note: 'hub sits at mobile 57.0, this spoke at 7.0 — largest topical asset' },
  { from: '/situations/tired-landlord', to: '/blog/hazleton-residential-occupancy-inspection-checklist',
    anchor: 'Hazleton occupancy inspection requirements',
    finding: 'QW9', kind: 'body' },
  { from: '/situations/tax-liens-code-violations', to: '/blog/sell-house-wilkes-barre-code-violations',
    anchor: 'selling a Wilkes-Barre house with code violations',
    finding: 'QW9', kind: 'body' },
  // water-damaged is DELIBERATELY OMITTED — see DEFERRED below.
]

// ---------------------------------------------------------------------------
// S2 — situation -> location. Scoped to cities the situation page ALREADY NAMES
// in prose (the audit's own specific observation), so every edge has a real
// sentence to live in rather than being bolted on. 19 edges.
//
// For inherited/Allentown and inherited/Reading the destination is the dedicated
// BLOG owner, not the location page: those are the exact queries the hub is
// cannibalizing, and the owner already holds 1.7-1.9 there.
export const S2_EDGES = [
  { from: '/situations/inherited-property', to: '/blog/sell-inherited-house-allentown-pa',
    anchor: 'selling an inherited house in Allentown', finding: 'S2', kind: 'body',
    note: 'HAND-OFF: hub is 14.0 on this query, owner is 1.7' },
  { from: '/situations/inherited-property', to: '/blog/sell-inherited-house-reading-pa',
    anchor: 'selling an inherited house in Reading', finding: 'S2', kind: 'body',
    note: 'HAND-OFF: hub is 10.2 on the Reading query' },
  { from: '/situations/inherited-property', to: '/locations/scranton',
    anchor: 'cash home buyers in Scranton', finding: 'S2', kind: 'body' },
  { from: '/situations/inherited-property', to: '/locations/wilkes-barre',
    anchor: 'cash home buyers in Wilkes-Barre', finding: 'S2', kind: 'body' },
  { from: '/situations/inherited-property', to: '/locations/lehigh-valley',
    anchor: 'we buy houses across the Lehigh Valley', finding: 'S2', kind: 'body' },

  { from: '/situations/tax-liens-code-violations', to: '/locations/scranton',
    anchor: 'cash home buyers in Scranton', finding: 'S2', kind: 'body' },
  { from: '/situations/tax-liens-code-violations', to: '/locations/bethlehem',
    anchor: 'cash home buyers in Bethlehem', finding: 'S2', kind: 'body' },
  { from: '/situations/tax-liens-code-violations', to: '/locations/hazleton',
    anchor: 'cash home buyers in Hazleton', finding: 'S2', kind: 'body' },
  { from: '/situations/tax-liens-code-violations', to: '/locations/allentown',
    anchor: 'cash home buyers in Allentown', finding: 'S2', kind: 'body' },
  { from: '/situations/tax-liens-code-violations', to: '/locations/wilkes-barre',
    anchor: 'cash home buyers in Wilkes-Barre', finding: 'S2', kind: 'body' },

  { from: '/situations/vacant-property', to: '/locations/scranton',
    anchor: 'we buy vacant houses in Scranton', finding: 'S2', kind: 'body' },
  { from: '/situations/vacant-property', to: '/locations/hazleton',
    anchor: 'we buy vacant houses in Hazleton', finding: 'S2', kind: 'body' },
  { from: '/situations/vacant-property', to: '/locations/allentown',
    anchor: 'we buy vacant houses in Allentown', finding: 'S2', kind: 'body' },
  { from: '/situations/vacant-property', to: '/locations/wilkes-barre',
    anchor: 'we buy vacant houses in Wilkes-Barre', finding: 'S2', kind: 'body' },

  { from: '/situations/major-repairs', to: '/locations/scranton',
    anchor: 'sell a house as-is in Scranton', finding: 'S2', kind: 'body' },
  { from: '/situations/major-repairs', to: '/locations/wilkes-barre',
    anchor: 'sell a house as-is in Wilkes-Barre', finding: 'S2', kind: 'body' },

  { from: '/situations/foundation-structural-issues', to: '/locations/scranton',
    anchor: 'cash home buyers in Scranton', finding: 'S2', kind: 'body' },
  { from: '/situations/foundation-structural-issues', to: '/locations/allentown',
    anchor: 'cash home buyers in Allentown', finding: 'S2', kind: 'body' },
  { from: '/situations/foundation-structural-issues', to: '/locations/wilkes-barre',
    anchor: 'cash home buyers in Wilkes-Barre', finding: 'S2', kind: 'body' },
]

// ---------------------------------------------------------------------------
// Water-damaged blog: the auto-linker matched "epa" INSIDE the word "repair",
// producing r[epa]ir with an epa.gov link on the middle three characters.
// 10 such anchors. The fix unwraps the link and restores the word; it does not
// touch the 33 legitimate mold/Mold epa.gov citations.
export const EPA_INWORD = {
  slug: 'selling-water-damaged-house-18102-mold-issues',
  finding: 'linker-defect',
  action: 'unwrap link marks whose anchor text is exactly "epa"/"EPA" and is inside a word',
}

// ---------------------------------------------------------------------------
// DEFERRED — proposed and deliberately NOT shipped in this batch.
export const DEFERRED = [
  { item: 'QW9: /situations/major-repairs -> water-damaged-18102',
    why: 'that post is SITEMAP-PRUNED (Batch 3 §2.6). Adding a hub link to a page deliberately withheld from crawl submission sends contradictory signals. Reinstate the URL first or leave the gap.' },
  { item: 'S2 reverse direction: location -> situation body links (~12)',
    why: 'location.relatedSituations already holds 117 references across 21 pages, but the field is NOT in the location schema and is never fetched or rendered. Rendering the existing data is a far better lever than hand-writing 12 body links, and it is a template change that belongs in its own deploy.' },
  { item: 'Render situation.relatedLocations (49 refs across 9 pages)',
    why: 'getSituationBySlug ALREADY fetches it (queries.ts:55) and the template discards it. One template change would create ~49 situation->location links. Template-rendered, so it needs a TEMPLATE_REVISION bump and its own attribution window.' },
  { item: 'Raise or curate the Related Articles cap of 3',
    why: '5 of 7 hub->spoke gaps are cap casualties, not missing links. Template change; the body links in QW9_EDGES route around it for the 4 that matter most.' },
]
