'use client'

import { Fragment } from 'react'
import { DynamicPhoneLink } from './DynamicPhone'
import { DYNAMIC_PHONE_TOKEN, replaceOwnedPhoneText } from '@/lib/phone-attribution'

interface DynamicPhoneContentProps {
  text: string
  callLocation: string
  linkClassName?: string
}

/** Renders only ClearEdge-owned numbers dynamically; agency numbers stay text. */
export function DynamicPhoneContent({
  text,
  callLocation,
  linkClassName = 'text-ce-green hover:underline font-medium',
}: DynamicPhoneContentProps) {
  const parts = replaceOwnedPhoneText(text, DYNAMIC_PHONE_TOKEN).split(DYNAMIC_PHONE_TOKEN)

  return parts.map((part, index) => (
    <Fragment key={`${index}-${part}`}>
      {part}
      {index < parts.length - 1 && (
        <DynamicPhoneLink className={linkClassName} callLocation={callLocation} />
      )}
    </Fragment>
  ))
}
