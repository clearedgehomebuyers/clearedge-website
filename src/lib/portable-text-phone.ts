import {
  DYNAMIC_PHONE_TOKEN,
  isOwnedPhoneValue,
  replaceOwnedPhoneText,
} from './phone-attribution'

type PortableTextChild = {
  _key?: string
  _type?: string
  text?: string
  marks?: string[]
  [key: string]: unknown
}

type PortableTextBlock = {
  _key?: string
  _type?: string
  children?: PortableTextChild[]
  markDefs?: Array<{ _key?: string; href?: string; [key: string]: unknown }>
  [key: string]: unknown
}

/**
 * Converts first-party phone literals and the CMS {{phone}} token into a
 * dedicated inline Portable Text object. Third-party numbers are untouched.
 *
 * This is deliberately defensive: the renderer remains safe even if an editor
 * pastes a ClearEdge tracking number instead of the token. The Sanity integrity
 * guard still rejects that mistake so the CMS itself stays clean.
 */
export function preparePortableTextWithDynamicPhones(value: unknown): unknown {
  if (!Array.isArray(value)) return value

  return value.map((rawBlock) => {
    if (!rawBlock || typeof rawBlock !== 'object') return rawBlock

    const block = rawBlock as PortableTextBlock
    if (block._type !== 'block' || !Array.isArray(block.children)) return rawBlock

    const ownedTelMarkKeys = new Set(
      (block.markDefs || [])
        .filter((mark) => typeof mark.href === 'string' && mark.href.toLowerCase().startsWith('tel:') && isOwnedPhoneValue(mark.href))
        .map((mark) => mark._key)
        .filter((key): key is string => Boolean(key)),
    )

    const markDefs = (block.markDefs || []).filter((mark) => !mark._key || !ownedTelMarkKeys.has(mark._key))
    const children: PortableTextChild[] = []

    block.children.forEach((child, childIndex) => {
      if (child?._type !== 'span' || typeof child.text !== 'string') {
        children.push(child)
        return
      }

      const normalized = replaceOwnedPhoneText(child.text, DYNAMIC_PHONE_TOKEN)
      const marks = (child.marks || []).filter((mark) => !ownedTelMarkKeys.has(mark))
      const containsDynamicPhone = normalized.includes(DYNAMIC_PHONE_TOKEN)

      if (!containsDynamicPhone) {
        children.push(marks.length === (child.marks || []).length ? child : { ...child, marks })
        return
      }

      const parts = normalized.split(DYNAMIC_PHONE_TOKEN)

      parts.forEach((part, partIndex) => {
        if (part) {
          children.push({
            ...child,
            _key: `${child._key || `span-${childIndex}`}-text-${partIndex}`,
            text: part,
            marks,
          })
        }

        if (partIndex < parts.length - 1) {
          children.push({
            _type: 'dynamicPhone',
            _key: `${child._key || `span-${childIndex}`}-phone-${partIndex}`,
          })
        }
      })
    })

    return {
      ...block,
      children,
      markDefs,
    }
  })
}
