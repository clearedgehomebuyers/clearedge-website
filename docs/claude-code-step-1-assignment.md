# ClearEdge Phase 0 — Step 1 assignment for Claude Code

Read the spec first: **ClearEdge Phase 0 Spec — Tri-State SEO Foundation** (Claude Doc; export to markdown and place at `docs/phase-0-spec.md` in the repo). The county inventory is `clearedge-county-inventory.xlsx`; place it at `docs/county-inventory.xlsx`.

The architecture in the spec is settled. Do not propose alternatives to it unless the build surfaces a specific, concrete problem; if it does, stop and report the problem with evidence rather than working around it.

Governing priorities, in order: accuracy and sourcing, discoverability, functional navigation and forms, accessibility, measurement, migration safeguards. Everything else is an editorial default or an experiment, as labeled in the spec.

## Hard constraints

- No production deploy in this step. All code lands on a `phase-0` branch and a staging deployment.
- No existing URL changes, redirects, or canonical changes.
- No new public routes render for any record whose `publishState` is not `published`.
- Crawler-access rules in the spec apply to public, published pages only. Staging, preview URLs, Sanity, internal API routes, and private records keep their existing access restrictions.
- Every legal, procedural, tax, or market claim you write into a record must reference a `source` record with a URL you actually opened. Do not invent sources. Draft claims may exist as `draft`; nothing draft renders.
- Log every change in `CHANGES.md` with the URLs touched, the target metric, and the expected first-signal date.

## Part 1 — Baseline (deliver before touching schemas)

1. **Preserved-URL list.** Reconcile `https://www.clearedgehomebuyers.com/sitemap.xml` (62 URLs on 2026-09-26) against every published Sanity document and every URL with impressions in GSC over the last 16 months. Output `docs/preserved-urls.csv` with columns: `url, source (sitemap|sanity|gsc), page_group, status`. Any URL in Sanity or GSC but not the sitemap is a finding, not something to fix yet.
2. **Baseline metrics.** `docs/baseline-2026-09.csv`, one row per preserved URL: top 10 queries with 90-day clicks/impressions/position (mobile), 90-day organic sessions, CTA clicks, form starts, `generate_lead` events, internal inbound link count, canonical, index status from the URL Inspection API, emitted schema types. Use the GSC MCP (`sc-domain:clearedgehomebuyers.com`) and the GA4 MCP (property `518214494`, launched via the absolute exe path). Apply the committed Hard Rule 4 scan-day exclusion script before aggregating.
3. **Situation-page targeting check.** For each of the nine `/situations/*` pages, list which states' queries it currently ranks for (GSC queries containing PA/NJ/NY/CT place names or state names). Output `docs/situation-targeting.md`. This decides which pages can be labeled `universal` and which are PA-scoped today.
4. **Lead attribution as it exists now.** Using GA4 `generate_lead` events (the only lead event that counts; `form_submit` is a funnel step) joined to whatever landing-page data exists, report leads by first-ever landing page group, session landing page group, and conversion page group, with an explicit `unattributed` bucket for leads with no usable history. Do not infer contribution where the identifiers are missing.
5. **Integrations inventory.** Confirm and record: GSC property status and whether generative AI features are enabled; Bing Webmaster Tools — does a verified account exist for the domain, and is the AI Performance report available; IndexNow — any existing key; robots.txt and Vercel firewall rules as they stand; which bots are allowed or blocked; GA4 referral sources already seen from chatgpt.com, perplexity.ai, claude.ai, gemini.google.com, copilot.
6. **Page-group dimension.** Add `pageGroup` (`home, state-hub, region-hub, county-hub, city, situation, situation-area, article, guide-hub, other`) to the weekly automated check-in, derived from URL pattern, and add an `existing-core` cohort row so regression on current pages is visible in one line.

Deliver Part 1 as a short written report plus the files above. Stop and wait for review before Part 2 only if a finding contradicts the spec (for example, a live URL the spec doesn't account for). Otherwise continue.

## Part 2 — Codebase inspection against the spec

Produce `docs/phase-0-gap-analysis.md` covering:

- Current Sanity schemas vs the spec's `geoArea`, `situationArea`, extended `situation` and `article`, the five evidence records (`transaction`, `review`, `businessFact`, `sellerQuestion`, `source`) with `supports` / `appliesTo` / `publishScope`, and `siteSettings` additions. For each: reuse as-is, extend, or create.
- Current templates and components vs the six templates in the spec. Identify what is reusable (the Reading/Easton enhanced fields, the featured-guides pattern on Bethlehem, the multi-step form, the `#lead-form` scroll rule), what changes, and what is new.
- Route handling today vs the resolver in the spec (`existingPath` precedence, `/locations/[state]/[segment]`, `fullPath` uniqueness, 404 for unpublished).
- Sitemap generation today vs the sitemap index.
- Rendering: which components hold essential copy client-side only (the homepage HTML is 286 KB with 57 KB of base64 images in `srcset`; find the cause).
- Migration dependencies and order: what must land before what, and where the risk to existing pages sits.

No code changes in Part 2 except the CHANGES.md entry for the analysis itself.

## Part 3 — Foundation on staging

Implement in this order, each as its own commit set with a CHANGES.md entry:

1. **Schemas.** All documents and fields from the spec, with validation: publish blocked on a missing `source` for any claim, a duplicate `fullPath`, an evidence record used outside its `appliesTo`, or an aggregate below the `siteSettings` sample threshold. `sellerQuestion.origin` is required (`asked | research | anticipated`); only `asked` may render with seller attribution.
2. **Seed.** Import the 82 inventory rows (73 page records, 9 statistical) with `tier`, `buildWave`, `geoid`, `marketSnapshot` (with `period`, `sourceUrl`, `geographyLabel`), `publishState = record-only`. Attach the 22 existing location pages via `existingPath`. Create the four state records and the NYC and Long Island region records. Set `additionalCounties` for Bethlehem (Lehigh + Northampton).
3. **Evidence records.** Enter the first real records from material Tyler provides: approved transactions (the Montgomery County deal once approved; existing PA deals with consent), current Google reviews verbatim with source links, business facts with `verifiedOn`, and sourced jurisdiction facts for the one county in the vertical slice. Where consent or a source is not yet in hand, the record stays `draft` and a list of what is missing goes in the report.
4. **Resolver and link helpers.** `resolveSituationLink(situation, geoArea)` returning the most specific page that is both published and applicable; a `publishedLink()` helper that returns null for unpublished targets; breadcrumbs that skip unpublished ancestors.
5. **Vertical slice on staging.** One complete flow with real records: Pennsylvania state hub → Montgomery County hub → Montgomery inherited-property page → one guide → the lead form with hidden attribution fields (`client_id`, `event_id`, first landing page, session landing page). Build these pages to the page-type standards in the spec. Existing pages are not re-templated in this step.
6. **Checks.** CI tests for: preserved-URL diff against the built sitemap (must pass with zero changes); no-JavaScript fetch of each slice page returns the essential copy, links, and business facts; each slice page carries no accidental `nosnippet` / `noindex`; Lighthouse CI budgets from the spec on each slice page; contrast and tap-target checks.

## Part 4 — Report

Deliver `docs/phase-0-step-1-report.md` with:

- What works, with staging URLs for each slice page and a phone-viewport screenshot of each.
- What changed, by commit, with CHANGES.md references.
- Baseline findings that affect later steps (URLs outside the sitemap, situation pages that are PA-scoped, leads that are unattributable, bots currently blocked, integrations missing).
- Decisions that need Tyler's input, each stated as a question with the options and your recommendation. Expected examples: consent status for specific transactions, which reviews may be used with names, Bing Webmaster Tools verification if no account exists, training-crawler policy.
- Anything in the build that contradicts the spec, with evidence. Do not resolve contradictions silently.

The next review evaluates the working implementation and the seller journey on a phone. It does not reopen the architecture without a specific problem found in the build.
