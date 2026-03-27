'use client'

import Link from 'next/link'
import { type ReactNode } from 'react'

export function PortableTextLink({ href, children }: { href: string; children: ReactNode }) {
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
    <a href={href} className="text-ce-green hover:underline font-medium" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
