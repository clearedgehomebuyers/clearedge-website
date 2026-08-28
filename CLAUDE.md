# ClearEdge Home Buyers Website

## Project Context
- Next.js website for cash home buying company
- Serving Eastern Pennsylvania (21 markets)
- Hosted on Vercel, auto-deploys from GitHub
- Sanity CMS for content management

## Tech Stack
- Next.js 13+ App Router
- TypeScript
- Tailwind CSS
- Vercel hosting
- Google Analytics 4

## Development Rules
- Always use Opus model for SEO work
- All lead form CTAs must use onClick with scrollIntoView smooth behavior
- Preserve existing GA4 tracking
- Follow existing schema.org patterns
- Keep NAP consistent across all pages

## SEO Priorities
- LocalBusiness schema for all 21 location pages
- FAQ schema for 8 situation pages
- Review aggregation markup
- Meta descriptions must include location plus cash home buyers
  — **except the 21 location pages, where playbook Hard Rule 6 overrides this.**
  See below.

### Resolved conflict: meta descriptions on location pages
**Hard Rule 6 wins. Do not rewrite the 21 location meta descriptions to insert
the literal phrase "cash home buyers". Do not re-flag this.**

All 21 currently fail a literal reading of the rule above: they carry the city
and the cash-sale offer, but phrase it as "as-is for cash" or "Cash home buyer"
rather than the exact string. That is not a defect. Hard Rule 6 (§3.6 of the
playbook) is explicit that these exact SERPs are the excluded case:

> **CTR benchmarks require SERP context.** "we buy houses / sell my house fast /
> cash home buyers [city]" SERPs are ad + local-pack stacked: organic positions
> 6–20 legitimately earn ~0 CTR there. Those are rank problems, not meta
> problems. Meta/snippet work is only legitimate for true, stable positions 1–8
> on informational SERPs.

The descriptions are also deliberate work: 140–155 characters, each leading with
a city-specific hook (Reading's 5% transfer tax, Bloomsburg's BU rentals,
Hazleton's occupancy permits). Rewriting to satisfy a phrase check would flatten
21 hooks into one template and forfeit a known baseline for nothing.

Reviewed 2026-08-28. Read the rule above as "location + the cash-sale offer",
which all 21 already satisfy.

## The SEO playbook
`C:\Users\trs35\seo-audits\SEO-PLAYBOOK.md` — **its own local git repo at
`C:\Users\trs35\seo-audits`, not part of this one.** Hard Rules live in its §3.

Code in this repo cites it by number (`check-template-revision.mjs` enforces
Hard Rule 13; `qw8-orphan-links.mjs` cites Hard Rule 10) and there is no copy
here, so searching this repo for "playbook" finds nothing and it is easy to
conclude wrongly that it does not exist. It does. Read it before SEO work, and
where it conflicts with anything above, **the playbook wins** — record the
resolution here, as the meta-description conflict above is recorded.

That directory also holds the audit and deploy history (`FULL-SITE-AUDIT-*.md`,
`EXECUTION-PACKAGE-*.md`, per-deploy logs) and its own `CHANGES.md`, which is a
different file from this repo's.

<!-- VERCEL BEST PRACTICES START -->
## Best practices for developing on Vercel

These defaults are optimized for AI coding agents (and humans) working on apps that deploy to Vercel.

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons), use Blob or marketplace integrations for preserving state
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't start new projects on Vercel KV/Postgres (both discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly)
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips
- Tune Fluid Compute knobs (e.g., `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs)
- Use Runtime Cache for fast **regional** caching + tag invalidation (don't treat it as global KV)
- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET
- Use Vercel Blob for uploads/media; Use Edge Config for small, globally-read config
- If Enable Deployment Protection is enabled, use a bypass secret to directly access them
- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing, set AI_GATEWAY_API_KEY, using a model string (e.g. 'anthropic/claude-sonnet-4.6'), Gateway is already default in AI SDK
  needed. Always curl https://ai-gateway.vercel.sh/v1/models first; never trust model IDs from memory
- For durable agent loops or untrusted code: use Workflow (pause/resume/state) + Sandbox; use Vercel MCP for secure infra access
<!-- VERCEL BEST PRACTICES END -->
