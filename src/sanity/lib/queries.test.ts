import { beforeEach, describe, expect, it, vi } from 'vitest'
import { REDIRECTED_BLOG_SLUGS } from '@/lib/blog-url-policy'

const fetchMock = vi.hoisted(() => vi.fn())

vi.mock('./client', () => ({
  client: {
    fetch: fetchMock,
  },
}))

import {
  getBlogPosts,
  getBlogPostsByLocation,
  getBlogPostsBySituation,
  getBlogPostSlugs,
  getRecentBlogPosts,
} from './queries'

type FetchParams = Record<string, unknown> | undefined

function lastFetchCall(): [string, FetchParams] {
  const call = fetchMock.mock.calls.at(-1)
  if (!call) throw new Error('Expected the Sanity client to be called')
  return call as [string, FetchParams]
}

function expectRedirectFilter(query: string, params: FetchParams) {
  expect(query).toContain('!(slug.current in $redirectedSlugs)')
  expect(params).toMatchObject({ redirectedSlugs: REDIRECTED_BLOG_SLUGS })
}

beforeEach(() => {
  fetchMock.mockReset()
  fetchMock.mockResolvedValue([])
})

describe('visible blog queries', () => {
  it('filters retired articles from the main blog listing', async () => {
    await getBlogPosts()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expectRedirectFilter(...lastFetchCall())
  })

  it('filters before limiting the recent-post result', async () => {
    await getRecentBlogPosts(7)

    const [query, params] = lastFetchCall()
    expectRedirectFilter(query, params)
    expect(params).toMatchObject({ limit: 7 })
    expect(query.indexOf('!(slug.current in $redirectedSlugs)')).toBeLessThan(
      query.indexOf('[0...$limit]'),
    )
  })

  it('filters retired articles from static generation', async () => {
    await getBlogPostSlugs()

    const [query, params] = lastFetchCall()
    expectRedirectFilter(query, params)
    expect(query).toContain('defined(slug.current)')
  })

  it('filters retired articles from situation recommendations', async () => {
    await getBlogPostsBySituation('major-repairs')

    const [query, params] = lastFetchCall()
    expectRedirectFilter(query, params)
    expect(query).toContain('$situationSlug')
    expect(params).toMatchObject({ situationSlug: 'major-repairs' })
  })

  it('filters retired articles from location recommendations', async () => {
    await getBlogPostsByLocation('poconos')

    const [query, params] = lastFetchCall()
    expectRedirectFilter(query, params)
    expect(query).toContain('$locationSlug')
    expect(params).toMatchObject({ locationSlug: 'poconos' })
  })
})
