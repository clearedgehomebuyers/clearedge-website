# ClearEdge Phase 0 Spec — Tri-State SEO Foundation

Sep 26, 2026 · @Tyler

## Scope and locked decisions

Phase 0 is one launch that does two things at once: a complete redesign of everything already live (UI, UX, performance, copy structure) and the geographic and content spine for a four-state site on clearedgehomebuyers.com. It ships the design system, schemas, templates, breadcrumbs, sitemaps, the four state hubs, and the measurement baseline, and it re-renders every existing page on the new templates. No county, city, or situation×area page is published in Phase 0; those are Waves 1–5 and are governed by the county inventory workbook (clearedge-county-inventory.xlsx). The whole of Phase 0 is built on a staging deployment and goes live as a single release once every acceptance check passes.

Guiding rule: locations and situations are two connected ways to browse ClearEdge. Every location presents relevant situations; every situation presents relevant geographic coverage; dedicated combined pages are published where they give a seller a strong standalone answer. User experience decides structure. Existing URLs are preserved by preference, not by rule: a URL changes only for a documented benefit (consolidating overlapping pages, fixing a confusing structure), never just to make folders match the hierarchy, and always with the migration protocol in the deploy rules.

Locked decisions:

- Existing `/blog/` URLs stay. "Guides" is the navigation label only.
- One article collection with geography references, situation references, `scope`, and `primaryDestinationPage`.
- County and borough hubs are the geographic backbone. `tier` and `buildWave` are stored on the Sanity geography record, not in a doc.
- New York City contains all five boroughs (Queens, Brooklyn/Kings, Bronx, Staten Island/Richmond, Manhattan/New York). Long Island contains Nassau and Suffolk only.
- Featured guides render on every location and situation page.
- Location and situation pages get build priority. The conversion hypothesis (location and situation pages produce leads; blog produces reads) is a working assumption until the attribution check in the measurement section is run.
- Every county in the footprint gets a CMS record. Market priority never auto-publishes a page; publication is a separate field.
- Existing region hubs (`/locations/nepa`, `/locations/lehigh-valley`, `/locations/poconos`) remain the parents of the counties they already cover.

Existing inventory (live sitemap, 2026-09-26): 62 URLs = 22 location URLs (3 region hubs, 19 city pages), 9 situation pages, 20 articles, 11 core pages. The preservation list is generated from the actual URL inventory reconciled against Sanity and GSC, never from these counts.

The county inventory holds 82 records: 73 page records (65 counties/boroughs in PA, NJ, NY plus 8 CT legacy counties) and 9 statistical records (CT planning regions) that supply figures to CT page records and never render.

Out of scope for Phase 0: footer and homepage copy, credential claims, `/cashoffernj`, phone routing by state, GBP, and any compliance language. These go to the implementation backlog in the last section.

## Sanity schemas

Two connected models: geography (where) and content (what). Every page type is a document that references geography and situation records; nothing is hard-coded per page.

### `geoArea` (one document type, `level` discriminates)

| Field | Type | Notes |
| --- | --- | --- |
| `name` | string | Display name, e.g. "Montgomery County", "Queens" |
| `slug` | slug | Path segment only, e.g. `montgomery-county`, `queens` |
| `level` | enum | `state` · `region` · `county` · `city` · `neighborhood` |
| `recordType` | enum | `page` (may render a hub) · `statistical` (never renders; supplies figures). CT planning regions are `statistical` |
| `parent` | reference → geoArea | Required for every level except `state`. County parent = region hub where one exists, else state |
| `state` | reference → geoArea (level=state) | Denormalized for filtering |
| `geoid` | string | FIPS county code or CT planning-region code from the inventory. Empty for cities |
| `statisticalAreas` | array of references → geoArea (recordType=statistical) | CT county page records point at their planning regions; figures are rendered with the planning-region name, never relabeled as county figures |
| `tier` | enum | `existing-core` · `tier-1` · `tier-2` · `tier-3` |
| `buildWave` | number | 0–5, from the inventory; 0 = state hubs |
| `publishState` | enum | `record-only` · `planned` · `draft` · `published`. Only `published` renders a route |
| `existingPath` | string | For pages that already exist (e.g. `/locations/allentown`). Rendering uses this path and never generates a new one |
| `fullPath` | computed, unique | `existingPath` if set, else built by the route resolver (see URLs section). Uniqueness enforced at publish |
| `probateAuthority` | object | `name`, `url`, `note` — e.g. "Montgomery County Register of Wills" |
| `transferTaxNote` | text + `sourceUrl` | State/municipal transfer or conveyance tax as it applies here |
| `jurisdictionFacts` | array of `{claim, sourceUrl, verifiedOn}` | Every legal or procedural claim on the page maps to one entry. No entry, no claim |
| `marketSnapshot` | object | `medianValue`, `homeownershipRate` (owner ÷ occupied), `owners65Share`, `units14Share`, `homesSold`, `period`, `sourceUrl`, `geographyLabel` — imported from the inventory, never typed |
| `nearbyAreas` | array of references | Manual, max 6 |
| `relatedSituations` | array of references → situation | Drives situation links and situation×area pages |
| `featuredGuides` | array of references → article | Manual picks; automated fill from tags when empty |
| `heroContent`, `body` | portable text | Page copy |
| `caseStudies`, `trustSignals` | existing objects | Reuse the fields already on Reading/Easton |

### `situation`

Three layers, one resolver. The nine existing situation pages keep their URLs and are the universal layer. Add to each: `scope` (`universal` · `state`), `applicableStates` (references; empty = all four), `stateVariants` (array of `{state, summary, jurisdictionFacts}` rendered as sections below the existing copy), and `featuredGuides`. A dedicated state-specific situation page and a county-specific situation page are both `situationArea` records (below) at `state` or `county` level; they are optional and created only where the answer differs enough to deserve its own URL. Any location page links to the most specific published situation page that applies: situation×county, else situation×state, else the universal situation page. That rule is a single function, `resolveSituationLink(situation, geoArea)`, used everywhere a situation link renders; it returns only pages that are both published and applicable to the area.

### `situationArea` (situation × county)

`situation` ref + `geoArea` ref (level `state` or `county`/borough) + `publishState` + `jurisdictionFacts` + `body`. Paths: state level `/situations/<situation-slug>/<state-slug>`; county level `/locations/<state>/<county>/<situation-slug>`. Publish gate, all four required and reviewed by a person: (1) a clear seller need and search intent the parent page does not already answer; (2) a complete standalone selling proposition (a seller landing here can understand the offer and submit without leaving); (3) substantive local relevance, which can be legal process, local buying conditions, property types, ClearEdge's own transactions, or demonstrated search demand, not only a change in law; (4) every legal or procedural claim sourced in `jurisdictionFacts`. Tier sets priority for building these, not a permanent bar: a valuable Tier 2 page is allowed.

### Evidence records (proof as infrastructure)

The geography and content models organize places and topics. These five record types hold the proof, so one documented deal can feed a county hub, a situation page, a case study, and a video without the facts drifting. Every commercial page pulls its proof from these records; none is typed into page copy.

| Record | Fields | Used by |
| --- | --- | --- |
| `transaction` | `geoArea` (county and city), `situations`, property type and condition, seller circumstance (anonymized), what ClearEdge did, milestones with dates (contact, offer, contract, close), outcome, `publishApproved` (seller consent on file), photos with rights, plus the boundary fields below | Case studies, county and situation pages, videos, and aggregate figures where the sample allows |
| `review` | Original wording (never paraphrased), source (Google, BBB, direct), date, reviewer first name and town if permitted, `situations`, `geoAreas`, link to source | Proof near the promise on matching pages; `aggregateRating` only when the real count and average are visible on the page |
| `businessFact` | The brand sentence, who answers the phone, hours, how offers are calculated, coverage by state, commitments (no fees, no repairs, timelines), each with `verifiedOn` | Entity consistency: rendered identically in schema, about page, footer, GBP, directories |
| `sellerQuestion` | The question in a seller's words, `origin` (`asked` from a call or form, `research` from search queries or public discussion, `anticipated` from Tyler's experience), approved answer, `situations`, `geoAreas`, `scope` | FAQ blocks and section headings. An `anticipated` or `research` question is never presented as something a customer asked; only `asked` questions may be attributed to sellers |
| `source` | Statute, court, agency, or dataset URL; what it substantiates; `verifiedOn`; next review date | Every `jurisdictionFact`, tax rate, timeline, and market figure references one; publish validation requires it |

### Boundaries on evidence

Every evidence record carries three limits, enforced at render time:

- `supports` — what the record can be used to claim: a situation experience, a local track record, a market condition, or a process detail.
- `appliesTo` — the geography the claim is valid in. A Montgomery County transaction supports "we have bought inherited houses in Montgomery County" and "we handle inherited property" anywhere; it never supports a track-record claim in Bergen County. Templates check `appliesTo` before rendering a record as local proof.
- `publishScope` — what may be shown: full case study, anonymized summary, aggregate only, or internal reference.

Two separations that must hold in the data model and in the copy:

1. **ClearEdge results are not market conditions.** Figures derived from `transaction` records describe ClearEdge's own experience and are labeled that way. County market conditions (median values, homes sold) come from `marketSnapshot` with its own source and period. The two never merge into one number.
2. **Aggregates carry their own metadata.** Any computed figure stores sample size, period, and the calculation definition, and renders those alongside it. Below the sample threshold in `siteSettings`, the page shows the documented cases instead of a statistic.

Records supply verified facts, not finished prose. Each page writes its own explanation around them; the CMS never repeats a whole case study across pages. The same transaction appears as a full case study on one page and as a one-line proof point elsewhere.

Two geography adjustments that fall out of this: `geoArea` gains `additionalCounties` for cities that span county lines (Bethlehem sits in both Lehigh and Northampton), and `resolveSituationLink` checks applicability as well as publication: a situation page whose `applicableStates` excludes the area is skipped even if it is published.

### `article` (the existing blog document, extended)

| Field | Type | Notes |
| --- | --- | --- |
| `scope` | enum | `universal` · `state` · `county` · `city`. Universal articles are written once and never cloned per state |
| `geoAreas` | array of references | Which areas the guide is relevant to (any level) |
| `situations` | array of references | Which situations it supports |
| `primaryDestinationPage` | reference → geoArea \| situation \| situationArea \| directory (`/locations`) | Exactly one. Universal guides usually point at the universal situation page they support, or the directory when no situation applies. The article's mid-body and end CTAs link here |
| `searchIntent` | string | The question the article answers |

URLs stay `/blog/<slug>`. Category hub pages (`/blog/<state-slug>`, `/blog/<situation-slug>`) are optional and off by default in Phase 0 (`siteSettings.enableGuideHubs`). When enabled: category slugs are reserved in the article slug validator so no article can collide with them; a hub renders `noindex` until it has enough tagged articles to be useful (editorial setting), and `noindex` hubs are excluded from sitemaps.

### `siteSettings` additions

`stateHubs` (ordered references to the four state records) for navigation, and `templateRevision` constant already enforced by CI for sitemap `lastModified`.

## Page relationships and internal-linking rules

Every link below is generated from references, so a new record wires itself in. Manual links are allowed on top; generated links can't be removed by editors.

| From | Links to | Rule |
| --- | --- | --- |
| Home | "Where we buy" directory, "Selling situations", "Guides" | Header nav; the four state hubs listed in the footer |
| Where we buy (`/locations`) | Four state hubs; existing region hubs | Static directory, indexable |
| State hub | Its regions (if any), every published county/borough hub, applicable situation pages via `resolveSituationLink`, featured guides | Unpublished counties appear as a plain-text "also serving" list, never as links |
| Region hub (existing) | Its counties and cities as today | No changes to existing links; breadcrumb added |
| County/borough hub | Parent, `nearbyAreas`, its published city pages, related situations via `resolveSituationLink`, featured guides, lead form | Links only to published targets |
| City page | Nearest published ancestor (county if published, else region, else state), nearby cities, related situations, featured guides, lead form | Existing city pages get the ancestor link and breadcrumb in Phase 0; further improvements follow the entry-experience section |
| Situation page | State variants (in-page), published `situationArea` pages grouped by state, featured guides | Existing situation URLs unchanged |
| Situation×area | Parent situation, parent geo area, sibling `situationArea` pages, featured guides | Publish gate as defined in Schemas |
| Article | `primaryDestinationPage` (mid-body and end CTA), tagged `geoAreas` and `situations` | CTA renders only when `primaryDestinationPage` is set |
| Featured guides block | Manual `featuredGuides`; else top 3 articles matching the page's geography and situation tags, ordered by `_updatedAt` | Rendered on every location, situation, and situation×area page |

Every generated link runs through one helper that returns null for any target whose `publishState` is not `published`; null links render as text or are omitted. That is what keeps Phase 0's unpublished county records from ever being linked.

Link volume is an editorial judgment, not a validation rule: a page links to what a seller in that place would plausibly want next, and nothing else. The Related Articles cap lifts from 3 to 6 (carried over from Batch 5). All `#lead-form` CTAs keep the `onClick` + `scrollIntoView` rule already on the site.

## Templates

Six templates. Each is a Next.js App Router route backed by one document type. Shared shell: header, breadcrumbs, lead form module, featured guides module, footer.

| Template | Route | Required content sections (in order) |
| --- | --- | --- |
| State hub | `/locations/[state]` | Answer-first summary (does ClearEdge buy here, where, how); coverage grid (regions, published county hubs, text list of the rest); selling options compared (cash offer vs listing vs other); how it works; proof (testimonials, case studies); related situations via `resolveSituationLink`, with a short state-specific inheritance/probate note and sourced facts; featured guides filtered to the state; lead form |
| County/borough hub | `/locations/[state]/[segment]` | Answer-first summary; county probate authority + process (from `probateAuthority`, `jurisdictionFacts`); local transfer tax note; market snapshot (rendered from `marketSnapshot` with `geographyLabel`, period, and source); cities served; related situations; case studies/trust signals; featured guides; lead form |
| City page | `/locations/[state]/[segment]` (new) or `existingPath` (old) | Same as county hub minus probate section, plus neighborhood/housing-stock notes. Existing 19 city pages keep their current template; Phase 0 adds breadcrumb and ancestor link; layout and copy improvements are scheduled per the entry-experience section |
| Situation page | `/situations/[slug]` | Existing template, plus a state-variants module rendered below the current copy, plus featured guides |
| Situation×area | `/situations/[slug]/[state]` or `/locations/[state]/[county]/[slug]` | Situation answer scoped to the area; `jurisdictionFacts` with sources; timeline; what we do; sibling links; featured guides; lead form |
| Article | `/blog/[slug]` | Existing template plus `primaryDestinationPage` CTA (mid-body after the second H2, and end), rendered only when the field is set |

Validation in Sanity, enforced before `publishState=published`: any page that renders a legal or procedural claim requires matching `jurisdictionFacts` with `sourceUrl`; county hub requires `probateAuthority`; `marketSnapshot.period`, `sourceUrl`, and `geographyLabel` present if the snapshot renders; `fullPath` unique; every article requires `scope` and at least one geography or situation tag (universal articles exempt from geography). Minimum-count settings (jurisdiction facts, guide-hub article count) live in `siteSettings` as editorial defaults and can be overridden with a reviewer note. There is no word-count target; a page is complete when it answers the intent it was created for.

Rendering: ISR with the existing revalidation fix; all new templates read `templateRevision` so sitemap `lastModified` moves on template changes, not just content edits.

## AI search and citation standard (every page)

The evidence converges on one conclusion: there is no separate AI algorithm to optimize for. Google's May 2026 guide states its generative features run on core Search ranking, retrieval-augmented generation, and query fan-out, and that no special format, markup, file, or page length is required. Cyrus Shepard's May 2026 synthesis of 54 studies (scores assigned by hand with AI assistance, so an interpretation of evidence, not measured weights) puts URL accessibility, search rank, fan-out rank, preview controls, and query-answer match at the top and llms.txt at the bottom. Off-site, every dataset points the same direction: brands that outside sources talk about consistently get recommended more; the exact percentages (AirOps' sample of commercial-discovery queries, NP Digital's marketer survey, Ahrefs' mention correlation that includes linked mentions) describe those samples and do not set a budget split. So the site's job is to be a well-ranked, extractable, accurate source for each seller question, and the off-site job is to build a public track record that outside sources corroborate. Rules below are labeled by purpose: required, editorial default, or experiment.

### Standards by page type (editorial defaults, not one formula)

| Page type | The opening must accomplish | What follows |
| --- | --- | --- |
| Homepage | Who ClearEdge helps, where it buys, how to reach it | Credibility, process, paths to locations and situations |
| Location page | Confirm ClearEdge buys here and state the offer plainly | Local experience and proof, buying considerations, relevant situations, next step |
| Situation page | Recognize the seller's problem and lay out the options | How ClearEdge helps, evidence, conditions that matter, relevant geography |
| Situation × area | A complete answer to that seller need in that place | Substantive local detail and matching proof |
| Guide | Answer the informational question promptly | Explanation, examples, sources, a contextual route to the right commercial page (never an aggressive landing page) |

Editorial defaults that apply where they help the seller, not by quota:

1. **Answer first.** The important answer sits in the first screen because sellers need it immediately; that it also suits extraction is a bonus, not the justification. A headline like "Sell your inherited house in Montgomery County" is fine; it does not have to be phrased as a question.
2. **Offer and phone in the first screen**, with the outcome, timeline, and effort stated plainly and only where provable from `businessFact` and `transaction` records.
3. **Proof near the promise:** a real review, a documented transaction, or an identifiable person, drawn from evidence records.
4. **Headings that match how sellers think.** Questions when they read naturally, statements when they don't. Each section should stand on its own and be specific: exact rates, court names, timelines, and dollar examples where they affect the decision, each backed by a `source` record.
5. **Extractable formats where the content is genuinely a set:** a comparison table when there is a real comparison to make (cash vs listing with net-proceeds math), numbered steps for the process, and an FAQ that resolves remaining concerns, with no compulsory count, sourced from `sellerQuestion` records of any origin.
6. **Original evidence over aggregates.** One accurately documented transaction with its circumstances beats an "average days to close" computed from two deals. County statistics render only when the sample is meaningful (threshold set in `siteSettings`); otherwise the page shows the documented cases.
7. **Essential content in the initial HTML.** Copy, links, and business facts must be server-rendered. Accessible accordions and tabs are allowed for mobile usability when the content is present in the HTML; the prohibition is on content that only exists after client-side JavaScript runs.
8. **Related pages** (the fan-out layer): sibling situation×area pages, the county hub, and the guides that answer the sub-questions, resolved by applicability and publication.
9. **Dated and maintained.** `dateModified` reflects real edits. Pages are reviewed quarterly; they are updated when facts change, when there is new experience to add, or when a better answer exists, not on a timer.

### Technical rules

- Crawler access (required): three bot classes, decided separately. Search indexers (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot) and user-triggered fetchers (ChatGPT-User, Perplexity-User) are allowed on public, published pages only; staging deployments, preview URLs, Sanity, internal API routes, and private records keep their existing access restrictions (auth, noindex, robots disallow); training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot) are a business decision recorded in `siteSettings`, defaulting to allow. robots.txt and the Vercel firewall must agree.
- Verification (required): a CI fetch of each money page with each allowed user-agent string tests the request path only. Production logs and each provider's published verification (IP ranges, reverse DNS) confirm that the real infrastructure gets through; reviewed monthly.
- Rendering (required): essential copy, links, and business facts present in the initial HTML, verified by a no-JavaScript fetch in CI. Google can process JavaScript, so this is an engineering choice that removes a retrieval dependency across every fetcher, not a claimed citation lever. Interactive enhancements are fine on top.
- Preview controls (required): CI checks that intended public landing pages carry no `nosnippet`, `data-nosnippet`, `max-snippet`, or `noindex` by accident; deliberate use on private or legal pages is allowed and logged.
- Bing Webmaster Tools (required): confirm whether an account exists and is verified for the domain; set up if not, and turn on the AI Performance report. Bing's index feeds ChatGPT Search and Copilot.
- IndexNow (required): notify on public URLs that are added, updated, or deleted; never resubmit unchanged pages because a deploy happened. Google ignores IndexNow; that is fine.
- Search Console: generative AI features stay enabled; the Generative AI performance report is part of weekly reporting.
- Structured data (required for accuracy): Organization, Person, BreadcrumbList, Article, FAQPage only where the FAQ is visible. Schema is a modest, consistent signal; never mark up what isn't on the page.
- Not required by any platform: llms.txt, content chunking, AI-specific rewrites, Markdown mirrors, a page per query phrasing. An llms.txt may exist as a cheap curated index; nothing is tracked or claimed for it.
- Entity consistency (required): one legal name, one brand name, one phone per state, one brand sentence from `businessFact`, identical in schema, about page, footer, GBP, directories, profiles, and press.

### Query research per market

Before a county hub or situation×area page is written, build its question set from: GSC queries on the parent pages, People Also Ask, and Google Trends' rebuilt Explore (compares up to eight terms, doubles the rising queries, and now has an official API). The output is the H2 list for the page. Pages are written to that list, not to a template.

### Off-site program (runs alongside the build)

The purpose is a credible public track record that outside sources corroborate. Channels are evaluated against that purpose; none is mandatory because a survey or a single experiment favored it.

- Google Business Profile: one profile with accurate categories, services, hours, and a service area that follows Google's guidance (roughly two hours' drive with stated exceptions; the address is shown or hidden per Google's rules for service-area businesses, not per a ranking rumor). GBP governs the profile, not the website's coverage boundary. Posts and Q&A kept current.
- Reviews: requested after every closing through one repeatable process; useful reviews name the situation, the town, and the outcome; every review gets a response. Stored as `review` records.
- Editorial and directory inclusion: listings on the comparison pages and directories that already appear for "cash home buyers in \[state/county\]" queries, and on investor and consumer directories with consistent facts. Whitespark's survey ranks best-of list presence highly for AI visibility; treat that as a reason to pursue relevant inclusion, not proof of return.
- Communities: participate as Tyler where real seller questions get asked (r/RealEstate, r/personalfinance, local subreddits, BiggerPockets), answering the question; mention ClearEdge only when it is the answer. The widely cited Reddit citation-lift experiment used a spam vendor and fake accounts for a SaaS brand and its effect faded when the campaign stopped; it is not evidence for this plan. Experiment.
- Video: one short video per situation and per state hub, titled to the query, embedded on the matching page with a transcript in the HTML. Experiment.
- Local press and podcasts: Tyler as a named source on inherited-property sales in each state, repeating the same brand sentence.
- Author entity: Tyler's bio page with photo, history, and licenses, linked as author from every page; `Person` schema tied to `Organization`. This establishes accountability; it does not by itself establish E-E-A-T, which comes from the documented transactions and reviews.
- Content specificity: answer the questions sellers in a county actually ask or would plausibly ask, from `sellerQuestion` records of any origin, rather than generic topics. New markets start with research and anticipated questions and replace them with asked ones as leads arrive.

### Measurement

Two connected views, never merged, because coverage and attribution differ:

**Visibility.** Google Search Console (clicks, impressions, position, plus the Generative AI performance report for AI Overview and AI Mode impressions), Bing Webmaster Tools (clicks plus the AI Performance report, which covers Microsoft experiences and selected partners, not all AI platforms), citation share per query family from Bing's report, server-log split of AI crawler vs AI assistant hits per URL, and branded search volume as a leading indicator. Reported per page and per query context where available. Prompt tracking only with large-sample tooling; single favorable answers are not positions.

**Business outcomes.** Identifiable visits → accepted inquiries → qualified opportunities → closed deals → realized revenue, by page group and state, joined from GA4 to ReSimpli on the `event_id` key. Leads without a key are reported as `unattributed`.

The two views are shown side by side and correlated over time. No report claims that a specific AI impression produced a specific seller; where the join does not exist, it is named as missing rather than modeled.

### Rule labels

- **Required:** accuracy and sourcing, discoverability (crawlable, indexable, rendered), functional navigation and forms, accessibility, measurement, migration safeguards.
- **Editorial default:** answer-first openings, proof near the promise, readable headings, comparisons where real, next-step links, quarterly review.
- **Experiment:** form presentation (button-then-form vs inline), video placement, answer length, specific off-site channels, any AI-citation tactic. Experiments have a hypothesis, a metric, and an end date in CHANGES.md.

### What this does not promise

All citation factors above are correlations across published studies, not confirmed ranking rules. Anything claimed as certain in this space is oversold; the standard here is built from the factors with the most repeated evidence and the fewest contradictions, and it is reviewed each quarter against new data.

## Design and performance standard

The differentiator is that the site looks and works clearly better than every other cash-buyer site, and a 65-year-old on a phone can use it without help. Every template, old and new, is built to this standard before launch.

### Design system first

Design tokens (color, type scale, spacing, radius, elevation, motion) are defined once in code and consumed by every template; no page carries its own styles. Components are built and reviewed in isolation before any page is assembled: buttons, form steps, cards, breadcrumb, nav, featured-guides block, market-snapshot block, testimonial, FAQ. The visual language keeps what already sets the site apart (polish, restraint, real photography, no stock-investor clichés) and raises legibility.

### Usability rules (the 65-year-old test)

- Body text at least 18px on mobile, line length 45–75 characters, no light-gray text on light backgrounds, no white text over busy photos without a solid overlay.
- Contrast meets WCAG AA (4.5:1 body, 3:1 large text and UI). Checked in CI on every template.
- Every tap target at least 44×44 px with visible spacing; one primary action per screen; the offer form and phone number reachable without scrolling and never hidden behind a menu.
- Multi-step form: one question per step, big controls, progress shown, back always available, plain-language error messages, phone-number keyboard for phone fields.
- Motion is decorative only, respects `prefers-reduced-motion`, and never delays content.
- Plain-language copy: short sentences, no industry jargon in headings, the offer and the next step stated in the first screen.
- Usability check before launch: five people over 60 complete the offer form on their own phones on staging without prompting; every failure becomes a fix.

### Performance budget (mobile, measured on the homepage and every template)

| Metric | Budget |
| --- | --- |
| Largest Contentful Paint | under 2.5 s on a mid-range phone over 4G |
| Interaction to Next Paint | under 200 ms |
| Cumulative Layout Shift | under 0.1 |
| HTML document | under 80 KB compressed; no base64 images inside `srcset` |
| JavaScript | under 250 KB compressed on first load; third-party scripts loaded after interaction |
| Hero image | one image, AVIF/WebP, sized to the viewport, `priority` preload, explicit dimensions |
| Fonts | at most two families, subset, `font-display: swap`, self-hosted |

Budgets are enforced with Lighthouse CI on every pull request against staging; a template that breaks a budget does not merge.

### Current homepage findings (2026-09-26, mobile HTML fetch)

- The HTML document is 286 KB uncompressed, of which 57 KB is four base64-encoded images inlined into `srcset` attributes; the actual hero image files are small (10–31 KB WebP). The document weight, not the image, is the likely cause of the slow mobile load.
- 16 script tags; roughly 735 KB of uncompressed JavaScript across the first 20 chunks.
- `/logo.webp` and `/og-image.png` return 404 while being referenced from the page.
- A full Lighthouse run is Step 1's job (the PageSpeed API quota was exhausted at the time of this fetch); these are the first three fixes regardless.

## Entry experience and navigation

Every important page is a complete entry point. A visitor landing anywhere should be able to answer three questions within one screen on mobile: am I in the right place (you buy where my property is, or you handle my situation), can you help me (offer, proof, trust), and what do I do next (get an offer, call, or read the one answer they need). Nobody should have to go back to the homepage to understand the business.

| Visitor need | Obvious next step on every page |
| --- | --- |
| Do you buy where my property is? | Where we buy → state → county/borough → selected cities; the current page's area is named in the first screen |
| Can you handle my problem? | Selling situations → the relevant situation, resolved to the most specific published version |
| How does this work? | How it works, summarized in-page with a link |
| Who am I dealing with? | About / seller stories, with proof in-page |
| I need an answer first | Featured guides and in-page FAQ |
| I'm ready | Get my offer (form) and call, visible without scrolling on mobile |

Page order for location, situation, and situation×area templates: answer-first summary naming the area or situation; offer CTA and phone; what we buy and how it works here; proof; related situations or areas (skip-level links allowed, e.g. state hub → county or situation directly); featured guides; nearby areas; form. Directory-style content (the full county list, the four-state grid) lives further down or on the directory pages, never in the first screen.

Mobile: short primary nav (Where we buy, Selling situations, How it works, Guides, Get my offer), sticky offer/call action, breadcrumbs for orientation only. Desktop can expand the same nav with state columns.

Every existing page is rebuilt on the new templates as part of the launch: layout, section order, copy structure, and internal links all change where the standard requires it. The constraint is measurement, not immutability: the baseline is captured before launch, page-level H1s and core copy meaning are preserved unless there is a reason to change them, and the first six weekly check-ins after launch compare every existing-core page against its baseline row.

## URLs, breadcrumbs, structured data

Two URL patterns coexist by design: the 24 existing location URLs stay flat (`/locations/allentown`, `/locations/nepa`), and every new page nests under its state. Hierarchy is expressed by breadcrumbs and links, not by path depth.

| Page | URL |
| --- | --- |
| Directory | `/locations` |
| State hub | `/locations/pennsylvania` · `/locations/new-jersey` · `/locations/new-york` · `/locations/connecticut` |
| New region hubs | `/locations/new-york/new-york-city` · `/locations/new-york/long-island` (existing region hubs keep their flat paths) |
| County | `/locations/new-jersey/essex-county` |
| Borough | `/locations/new-york/queens` |
| Philadelphia | `/locations/pennsylvania/philadelphia` |
| New city | `/locations/pennsylvania/norristown` |
| Situation×state | `/situations/inherited-property/new-jersey` |
| Situation×county | `/locations/new-jersey/essex-county/inherited-property` |
| Guide category hubs (optional) | `/blog/new-jersey` · `/blog/inherited-property` |

Route resolver: `/locations/[state]/[segment]` and `/locations/[state]/[county]/[segment]` are resolved by one function that looks up `geoArea` (then `situationArea`) by `state` + `slug` and returns the record only if `publishState=published`; anything else is a 404. Uniqueness is enforced on `fullPath` at publish time, so a city and a county can never claim the same segment; county slugs carry the `-county` suffix (boroughs and Philadelphia are the named exceptions), which also keeps them distinct from city slugs. Existing flat paths are matched first via `existingPath` and take precedence over generated paths.

Breadcrumbs are rendered from the `parent` chain but skip any ancestor that is not published: in Phase 0 an existing city page shows Home → Where we buy → Pennsylvania → Lehigh Valley → Allentown, and the county crumb appears only once that county hub is published. `BreadcrumbList` schema mirrors exactly what is visible. Existing pages get the breadcrumb above their current content in Phase 0; other changes to them are logged individually.

Structured data per template:

- Every page: `BreadcrumbList` matching the visible breadcrumb exactly.
- Site-wide: one `Organization` (ClearEdge Properties LLC) with `areaServed` listing the four states as `State` entities. `LocalBusiness`/`RealEstateAgent` stays only where the site already emits it with the real address; no new `LocalBusiness` nodes for counties or states.
- State and county hubs: `WebPage` + `Service` (`serviceType`: "Cash home buying", `areaServed`: the geo entity) + `FAQPage` only when the visible FAQ exists; Google retired FAQ rich results on May 7, 2026, so the markup is kept only as a harmless page description, never as a visibility claim.
- Situation×county: `WebPage` + `FAQPage` when present. No `aggregateRating` anywhere without real reviews (carried over from the audit).
- Articles: `Article` with `author` = existing Person node, `about` = tagged situation, `spatialCoverage` = tagged geography.

Structured data must match visible content; a claim with no matching on-page text is a validation failure, not a nice-to-have.

## Sitemap index and crawl controls

Replace the single `sitemap.xml` with a sitemap index so each state's indexing can be watched separately in Search Console.

| File | Contents |
| --- | --- |
| `/sitemap.xml` | Index pointing to the files below |
| `/sitemap-core.xml` | Home, about, how-it-works, calculator, situations, existing region hubs |
| `/sitemap-pa.xml` | PA state hub + every published PA geo page (existing 21 city pages move here from the flat sitemap; URLs unchanged) |
| `/sitemap-nj.xml`, `/sitemap-ny.xml`, `/sitemap-ct.xml` | Same per state; created empty except the state hub in Phase 0 |
| `/sitemap-guides.xml` | Articles and guide category hubs |

Rules: only `publishState=published` documents appear, and never anything rendering `noindex`; `lastModified` = max(content `_updatedAt`, `templateRevision`); no `priority`/`changefreq`. `robots.txt` stays permissive. `record-only`, `planned`, and `draft` records never render a route (404, not noindex), so nothing thin is ever crawlable. Self-referencing canonicals on every page; no canonical pointing across the two URL patterns. A CI test diffs the preserved-URL list against the built sitemap index on every build.

## The four state hubs

The state hubs are the only new indexable pages Phase 0 publishes. Each one answers a commercial question first: does ClearEdge buy houses in this state, where, and how. Situation pages own the deeper problem-specific searches; the hub routes to them.

Each hub carries one state-specific section on inheritance, probate, and transfer costs, because those differ by state and are where the situation pages hand off. Every claim in that section maps to a `jurisdictionFacts` entry with a primary source (state statute, court, or revenue department URL) and a `verifiedOn` date. Draft claims are written from memory; none ships until sourced.

| State | State-specific facts the hub must source | Coverage shown |
| --- | --- | --- |
| Pennsylvania | Inheritance tax by beneficiary class; Register of Wills per county; realty transfer tax with municipal variation | Existing Lehigh Valley, NEPA, Poconos, Reading pages stay prominent; 28 counties named |
| New Jersey | Inheritance tax classes; tax waiver before real estate transfers; county Surrogate; attorney review period; realty transfer fee and mansion tax | All 21 counties named; 8 Tier 1 hubs planned |
| New York | Estate tax and its cliff; Surrogate's Court per county including the five boroughs; NYC and NYS transfer taxes; Peconic Bay tax on the East End; co-op vs house distinction | NYC (5 boroughs), Long Island (2), Westchester/Hudson Valley (9) |
| Connecticut | Estate tax; probate court districts rather than county courts; conveyance tax | 8 legacy counties named; figures cited by planning region |

The Pennsylvania hub links down to the existing situation pages and region hubs rather than restating their topics, so it never competes with pages that already rank.

Acceptance: each hub passes the swap test (replace the state name and the coverage grid, selling-options context, and jurisdiction facts must all change), validates structured data, and is submitted to GSC on publish.

## Measurement requirements

Three deliverables, in this order, because the first is the baseline every later comparison depends on.

### 1. Baseline inventory (before any deploy)

Export every live URL from the sitemap (62 URLs on 2026-09-26) with: top 10 queries and 90-day clicks/impressions/position from GSC (mobile as the series of record); 90-day organic sessions, CTA clicks, and lead events from GA4; internal inbound link count; canonical; index status from the URL inspection API; emitted schema types. Save as `baseline-2026-09.csv` in the repo and reference it in CHANGES.md.

### 2. Page-group reporting in the weekly check-in

Add a `pageGroup` dimension derived from URL pattern: `home`, `state-hub`, `region-hub`, `county-hub`, `city`, `situation`, `situation-county`, `article`, `guide-hub`, `other`. The weekly automated check-in reports, per group and per state: impressions, clicks, average position (mobile), organic sessions, CTA clicks, form starts, leads. Existing-core pages are additionally reported as their own cohort so any regression after expansion deploys is visible in one row. Keep the Hard Rule 4 scan-day exclusion script as-is; it runs before grouping.

### 3. Lead-attribution check (verifies the working hypothesis)

Run once against full history, then quarterly. Definitions first, so the same submission is never counted twice:

- Authoritative lead event: `generate_lead` (already deduplicated against CAPI by `event_id`). `form_submit` and `form_start` are funnel steps, never counted as leads. Deduplication key: `event_id`, joined to the ReSimpli lead ID.
- CRM join key: the form writes GA4 `client_id`, `event_id`, first landing page, and session landing page into hidden fields that map to ReSimpli custom fields. Leads created before those fields existed carry no key and are reported as `unattributed`, never dropped and never guessed.
- Three page dimensions, reported separately: first-ever landing page (from `client_id` history), session landing page, and conversion page. Each is bucketed by `pageGroup`.
- Assisted: a lead counts as article-assisted at most once, if any prior session or the converting session touched an article before the lead event.
- Reliable window: from the date the current instrumentation shipped (recorded in CHANGES.md). Earlier periods are reported in a separate block labeled as pre-instrumentation, and missing history is never read as "no contribution."

Outputs: leads, qualified leads, contracts, and revenue by first-ever landing page group, by conversion page group, and by assist flag. The decision on article production for Wave 1 is made from those numbers when they exist; no threshold is fixed in advance.

### Instrumentation

New templates emit the existing `cta_click`, `form_start`, `form_submit`, and `generate_lead` events with `page_group`, `state`, and `geo_id` parameters. No new event names. The hidden attribution fields above ship with the templates, so every lead from Phase 0 onward carries a join key.

## Protecting the existing site

These rules are enforced in CI where possible and in review otherwise. A Phase 0 deploy that breaks any of them is reverted, not patched forward.

1. Preserve valuable URLs unless a documented benefit justifies changing them. The preserved-URL list (sitemap reconciled with Sanity and GSC) is committed to the repo and diffed against the built sitemap index in CI; a URL leaves that list only through the migration protocol below, and any other missing or altered URL fails the build.
2. Migration protocol for any URL change: written justification and expected benefit in CHANGES.md; direct 301 to the single best destination; internal links, canonicals, and sitemaps updated in the same deploy; GSC monitoring of the source and destination against the baseline for six weeks; rollback plan recorded. Temporary ranking movement is expected and is not by itself a reason to revert.
3. Existing pages may be improved (layout, section order, copy, internal links, modules) to meet the entry-experience standard. Each improvement to a ranking page is its own CHANGES.md entry with a target metric, so movement can be attributed.
4. Every deploy is one batch with a CHANGES.md entry listing URLs touched, the target metric, and the expected first-signal date.
5. No new page renders unless `publishState=published`; a record's existence never creates a URL.
6. Build is staged on a staging deployment: design system and components, then schemas, then templates with every existing page re-rendered, then the `/locations` directory and sitemap index, then the four state hubs. Launch is one production release after all acceptance checks pass; after launch, further changes ship in small logged batches.
7. Rollback: each stage is a tagged release; reverting a stage restores the prior sitemap and routes without touching content.

## Build sequence and acceptance criteria

Seven steps, each a separate Claude Code session and a separate deploy where it ships code.

| Step | Deliverable | Done when |
| --- | --- | --- |
| 1. Baseline | `baseline-2026-09.csv`, page-group dimension in the weekly check-in; preserved-URL list (sitemap, Sanity, and GSC reconciled); Bing Webmaster Tools account status confirmed; geographic-targeting check of the nine situation pages (which states' queries each currently ranks for) before any is labeled universal | Weekly report shows the existing-core cohort row; baseline committed |
| 2. Schemas | `geoArea`, `situationArea`, extended `situation` and `article`, `siteSettings.stateHubs`, additionalCounties, the five evidence records with their supports / appliesTo / publishScope boundary fields, validation rules | Sanity deploys; validation blocks publish on a missing source, a duplicate full path, or an evidence record used outside its appliesTo |
| 3. Seed | Import the 82 inventory rows (73 page, 9 statistical) as `geoArea` records with `tier`, `buildWave`, `geoid`, `marketSnapshot`, `publishState`; attach the 22 existing location pages via `existingPath`; create the four state records and the NYC and Long Island region records; enter the first real evidence records (approved transactions, current reviews, business facts, sourced jurisdiction facts) | Every existing location page resolves to a geo record; no duplicates; no new routes |
| 4. Templates | Six templates, breadcrumbs, structured data, featured-guides module, primary-destination CTA on articles | Build passes; existing pages show only the permitted changes listed in the deploy rules (visual diff) |
| 5. Directory and sitemaps | `/locations` directory, sitemap index with six files, CI URL-diff test | All preserved URLs present; new sitemap files validate; GSC accepts the index |
| 6. State hubs | Four commercial hubs with sourced state-specific sections, published NJ → NY → CT → PA | Swap test passes; schema validates; each submitted to GSC; CHANGES.md entries logged |
| 7. Attribution check | Lead-attribution report with an unattributed block; article production level for Wave 1 recorded | Report in repo; article production level set for Wave 1 |

Between steps 4 and 5, build one vertical slice on staging: a state hub → one county hub → one situation×county page → one guide → the form, populated with real approved records rather than placeholder text. Review the content model and the seller experience together, on a phone, before the templates roll out site-wide. What that review finds feeds back into the schemas and templates; the rest of Phase 0 waits for it.

Phase 0 is complete when all seven rows are done and one weekly check-in has run with the new page-group reporting and no regression in the existing-core cohort. Wave 1 (SE PA county hubs) starts from the inventory the day after.

## Deferred to the implementation backlog

- Homepage, form, and footer copy that says "Eastern PA / 21 markets"; Scranton address treatment.
- Credential claims in the footer ("200+ homes", "since 2016") — verify, then rewrite.
- Phone routing and DNI by state; the blog posts with hardcoded numbers.
- `/cashoffernj` relationship to the NJ state hub (merge, redirect, or keep as a paid landing page).
- Google Business Profile service area.
- State compliance language on templates.
- Backfilling `primaryDestinationPage` on the 20 existing articles (the field and rendering ship in Phase 0; assignment is a Wave 1 editorial task).
- Guide category hubs: turn on when the article base justifies them.
- City and neighborhood page selection criteria — defined at Wave 1 kickoff using GSC query data from the state hubs.
- Inventory market-evidence columns: annual homes sold from Redfin Data Center county downloads; investor share only where the source geography matches the row.
- Blog-CTA rollout, still parked on its original criteria.

## Research notes: sources behind the AI search standard

What each body of work contributes, and how much weight it gets. Reviewed 2026-09-26; refresh quarterly.

| Source | What their body of work says | Weight and caveats |
| --- | --- | --- |
| Google Search Central (AI features page, May 2026 optimization guide, web.dev agent guide, FAQ deprecation notice) | AI features run on core Search ranking, RAG, and query fan-out; no special files, schema, chunking, format, or page length; don't build a page per phrasing; don't seek inauthentic mentions; preview controls limit AI use; accordions and tabs are permitted; agent-friendly = semantic HTML, stable layout, labeled forms, no hover-only actions; FAQ rich results retired May 7, 2026 | Highest. The platform's own statements |
| Cyrus Shepard, Zyppy (synthesis of 54 studies, May 2026) | 23 factors scored by hand with AI assistance: accessibility, search rank, fan-out rank, preview controls, query-answer match at the top; answer near top, specificity, cites sources, self-contained passages in the middle; schema modest; llms.txt at the bottom | High as an interpretation of evidence. Scores are judgments, not measured weights; the Gemini per-URL retrieval cap came from API tests and is not a universal rule |
| Lawrence Hitches (StudioHawk; articles, cheatsheets, own dashboards) | Five steps: get read, get extracted, get cited, get recommended, measure three channels. Bing feeds ChatGPT; Bing AI Performance report; IndexNow; live fetchers (ChatGPT-User) matter; entity consensus beats rankings for recommendations; prompt tracking needs large samples | High for practice. His "85% earned media" figure comes from AirOps' sample of commercial-discovery queries classifying outside vs owned sources, not a measurement of model training |
| Whitespark, Darren Shaw (2026 Local Search Ranking Factors, 47 experts, 187 factors) | GBP signals lead the local pack; primary category is the top factor; hours and address display entered the top ten; dedicated service pages are the top local organic factor; new AI visibility category with best-of list presence and citations rated highly; on-page \~24% of AI weight; AI Overviews appear on few strictly local queries and most hybrid ones | High for the local layer. Expert survey, so directional; not experiments |
| Neil Patel / NP Digital (AI visibility index, content-type survey, ChatGPT ranking study, GEO-by-engine) | Brand mentions across trusted sources predict ChatGPT recommendations; first-mention position and category breadth matter beyond raw counts; original research and comparisons are the formats marketers report as most cited | Medium. The 82%/76%/25% figures are from a survey of 500 marketers, not measured citation rates of pages; fintech results don't predict home sellers |
| Ahrefs (75k-brand mention study; 17M citation freshness study) | Web mentions (linked and unlinked) correlate with AI Overview visibility at \~0.66 vs backlinks \~0.22; AI-cited content is on average fresher, though Google AI Overviews cited relatively older content | Medium-high. Correlations, not isolated causal effects of unlinked mentions; freshness does not establish an update schedule |
| Bobby Kerr / LOC8 (podcasts, Inman, LinkedIn, YouTube) | AI cannot credit experience it cannot find; GBP as the local foundation; stronger reviews; profiles on trusted platforms; hyperlocal, niche-specific content; consistency and recency | Medium. Agent focus and a service to sell; his posting-frequency and inactivity timers are not platform rules |
| Alex Hormozi ($100M Offers/Leads, landing page videos) | Value equation; simple page designs; button-then-form opt-in; honest disqualification; proof at every CTA | Medium for copy and offer clarity only. Built for paid-traffic capture pages; not a reason to strip navigation from an organic site. Form presentation is an experiment |
| The Ecomm Guy / David Feldman (Google Trends reel) | Points at the 2026 Trends rebuild: Gemini side panel, eight-term comparison, more rising queries, official API | Low as a source; useful for wording, seasonality, and relative interest. Trends is not search volume and does not prove a county deserves a page |
| Search Engine Journal / Averi / Local SEO Guide (2026) | Reddit and YouTube are heavily cited in AI Overviews; a Reddit mention campaign lifted one brand's citation rate | Medium-low. The Reddit test used a spam vendor and fake accounts for a SaaS brand and the effect faded afterward |
| Yext (2025) | Most AI citations point at brand-managed sources: websites, listings, reviews, social | Medium. Vendor study; it is why listings and reviews stay in scope |

Where sources disagree: Hitches' "85% earned media" and Yext's "86% brand-managed" measure different things (what an LLM learns about a brand vs which URLs get cited) and both can be true; the standard treats on-site extractability and off-site corroboration as two halves of one job. Local pack visibility for a four-state footprint is structurally limited to the home market by GBP rules, so the site, citations, and mentions carry the rest.
