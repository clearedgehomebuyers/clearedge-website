import { describe, expect, it } from 'vitest'
import { preparePortableTextWithDynamicPhones } from './portable-text-phone'

describe('preparePortableTextWithDynamicPhones', () => {
  it('turns a ClearEdge number and token into dynamic inline objects', () => {
    const value = [{
      _type: 'block',
      _key: 'b1',
      markDefs: [],
      children: [{
        _type: 'span',
        _key: 's1',
        text: 'Call (610) 904-8526 or {{phone}} today.',
        marks: ['strong'],
      }],
    }]

    const result = preparePortableTextWithDynamicPhones(value) as Array<{ children: Array<Record<string, unknown>> }>
    expect(result[0].children.map((child) => child._type)).toEqual([
      'span',
      'dynamicPhone',
      'span',
      'dynamicPhone',
      'span',
    ])
    expect(result[0].children.filter((child) => child._type === 'span').map((child) => child.text)).toEqual([
      'Call ',
      ' or ',
      ' today.',
    ])
  })

  it('removes a hard-coded first-party tel mark without touching other links', () => {
    const value = [{
      _type: 'block',
      _key: 'b1',
      markDefs: [
        { _key: 'phoneLink', _type: 'link', href: 'tel:+16109048526' },
        { _key: 'sourceLink', _type: 'link', href: 'https://example.gov' },
      ],
      children: [{
        _type: 'span',
        _key: 's1',
        text: '(610) 904-8526',
        marks: ['phoneLink', 'strong'],
      }, {
        _type: 'span',
        _key: 's2',
        text: 'Official source',
        marks: ['sourceLink'],
      }],
    }]

    const result = preparePortableTextWithDynamicPhones(value) as Array<{
      children: Array<Record<string, unknown>>
      markDefs: Array<Record<string, unknown>>
    }>
    expect(result[0].markDefs).toEqual([{ _key: 'sourceLink', _type: 'link', href: 'https://example.gov' }])
    expect(result[0].children[0]).toMatchObject({ _type: 'dynamicPhone' })
    expect(result[0].children[1]).toMatchObject({ text: 'Official source', marks: ['sourceLink'] })
  })

  it('preserves government and agency phone numbers exactly', () => {
    const value = [{
      _type: 'block',
      _key: 'b1',
      markDefs: [],
      children: [{
        _type: 'span',
        _key: 's1',
        text: 'Call the Berks Tax Bureau at 610-478-6625 or fax 610-478-6644.',
        marks: [],
      }],
    }]

    expect(preparePortableTextWithDynamicPhones(value)).toEqual(value)
  })

  it('does not mutate the source value', () => {
    const value = [{
      _type: 'block',
      _key: 'b1',
      markDefs: [],
      children: [{ _type: 'span', _key: 's1', text: 'Call (610) 628-0671.', marks: [] }],
    }]
    const before = structuredClone(value)
    preparePortableTextWithDynamicPhones(value)
    expect(value).toEqual(before)
  })
})
