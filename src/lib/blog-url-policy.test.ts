import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  BLOG_REDIRECTS,
  REDIRECTED_BLOG_SLUGS,
  SITEMAP_EXCLUDED_BLOG_SLUGS,
} from './blog-url-policy'

const expectedRedirects = [
  {
    slug: 'sell-my-house-fast-poconos-pa',
    source: '/blog/sell-my-house-fast-poconos-pa',
    destination: '/locations/poconos',
  },
  {
    slug: 'cash-home-buyers-pottsville-pa',
    source: '/blog/cash-home-buyers-pottsville-pa',
    destination: '/locations/pottsville',
  },
  {
    slug: 'selling-water-damaged-house-18102-mold-issues',
    source: '/blog/selling-water-damaged-house-18102-mold-issues',
    destination: '/situations/major-repairs',
  },
  {
    slug: 'sell-house-fast-during-divorce-lehigh-county-pa',
    source: '/blog/sell-house-fast-during-divorce-lehigh-county-pa',
    destination: '/situations/divorce',
  },
] as const

describe('blog URL policy', () => {
  it('keeps the retired slugs and their canonical destinations exact', () => {
    expect(BLOG_REDIRECTS).toEqual(expectedRedirects)
    expect(REDIRECTED_BLOG_SLUGS).toEqual(expectedRedirects.map(({ slug }) => slug))
  })

  it('keeps every redirect source derivable from its slug and free of loops', () => {
    const sources = BLOG_REDIRECTS.map(({ source }) => source)
    const destinations = BLOG_REDIRECTS.map(({ destination }) => destination)

    expect(new Set(sources).size).toBe(BLOG_REDIRECTS.length)
    expect(new Set(REDIRECTED_BLOG_SLUGS).size).toBe(BLOG_REDIRECTS.length)

    for (const { slug, source, destination } of BLOG_REDIRECTS) {
      expect(source).toBe(`/blog/${slug}`)
      expect(destination).not.toBe(source)
      expect(sources).not.toContain(destination)
    }

    expect(new Set(destinations).size).toBe(destinations.length)
  })

  it('withholds the two live evidence-review pages plus every redirect from the sitemap', () => {
    expect(SITEMAP_EXCLUDED_BLOG_SLUGS).toEqual([
      'sell-my-house-fast-luzerne-county-pa',
      'cash-home-buyers-lackawanna-county-no-fees',
      ...REDIRECTED_BLOG_SLUGS,
    ])
    expect(new Set(SITEMAP_EXCLUDED_BLOG_SLUGS).size).toBe(
      SITEMAP_EXCLUDED_BLOG_SLUGS.length,
    )

    for (const slug of REDIRECTED_BLOG_SLUGS) {
      expect(SITEMAP_EXCLUDED_BLOG_SLUGS).toContain(slug)
    }
  })

  it('does not expose retired URLs from crawlable source components', () => {
    const sourceRoot = join(process.cwd(), 'src')
    const files: string[] = []
    const visit = (directory: string) => {
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name)
        if (entry.isDirectory()) visit(path)
        else if (/\.(?:ts|tsx)$/.test(entry.name)) files.push(path)
      }
    }
    visit(sourceRoot)

    const policyFile = join(sourceRoot, 'lib', 'blog-url-policy.ts')
    const testFile = join(sourceRoot, 'lib', 'blog-url-policy.test.ts')
    const crawlableSource = files
      .filter((file) => file !== policyFile && file !== testFile)
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n')

    for (const { source } of BLOG_REDIRECTS) {
      expect(crawlableSource).not.toContain(source)
    }
  })
})
