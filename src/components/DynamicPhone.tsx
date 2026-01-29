'use client'

import { useTrafficSource } from './TrafficSourceProvider'
import { Phone } from 'lucide-react'

interface DynamicPhoneLinkProps {
  className?: string
  showIcon?: boolean
  iconClassName?: string
  children?: React.ReactNode
}

/**
 * Client component for displaying dynamic phone numbers based on traffic source.
 * Use this in server components where you need the phone number to be dynamic.
 */
export function DynamicPhoneLink({
  className = '',
  showIcon = false,
  iconClassName = 'w-5 h-5',
  children
}: DynamicPhoneLinkProps) {
  const { phone, phoneTel } = useTrafficSource()

  return (
    <a href={`tel:${phoneTel}`} className={className}>
      {showIcon && <Phone className={iconClassName} />}
      {children || phone}
    </a>
  )
}

interface DynamicPhoneTextProps {
  className?: string
}

/**
 * Client component for displaying just the phone number text (no link).
 */
export function DynamicPhoneText({ className = '' }: DynamicPhoneTextProps) {
  const { phone } = useTrafficSource()

  return <span className={className}>{phone}</span>
}

interface DynamicPhoneButtonProps {
  className?: string
  children?: React.ReactNode
}

/**
 * Client component for a phone CTA button with dynamic number.
 */
export function DynamicPhoneButton({ className = '', children }: DynamicPhoneButtonProps) {
  const { phone, phoneTel } = useTrafficSource()

  return (
    <a href={`tel:${phoneTel}`} className={className}>
      {children || (
        <>
          <Phone className="w-5 h-5 mr-2" />
          {phone}
        </>
      )}
    </a>
  )
}
