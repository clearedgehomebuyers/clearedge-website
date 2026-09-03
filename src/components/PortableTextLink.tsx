'use client'

import Link from 'next/link'
import { type ReactNode } from 'react'
import { DynamicPhoneLink } from './DynamicPhone'
import { isOwnedPhoneValue } from '@/lib/phone-attribution'

export function PortableTextLink({
  href,
  children,
  openInNewTab = true,
  callLocation = 'portable_text_phone_link',
}: {
  href: string
  children: ReactNode
  openInNewTab?: boolean
  callLocation?: string
}) {
  if (href.toLowerCase().startsWith('tel:') && isOwnedPhoneValue(href)) {
    return (
      <DynamicPhoneLink className="text-ce-green hover:underline font-medium" callLocation={callLocation} />
    )
  }

  if (href.toLowerCase().startsWith('tel:') || href.toLowerCase().startsWith('mailto:')) {
    return <a href={href} className="text-ce-green hover:underline font-medium">{children}</a>
  }

  if (href.startsWith('#')) {
    return (
      <a
        href={href}
        className="text-ce-green hover:underline font-medium"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        {children}
      </a>
    )
  }

  if (href.startsWith('/')) {
    return (
      <Link href={href} className="text-ce-green hover:underline font-medium">
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className="text-ce-green hover:underline font-medium"
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  )
}
