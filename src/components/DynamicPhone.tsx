'use client'

import { useTrafficSource } from './TrafficSourceProvider'
import { Phone } from 'lucide-react'
import { trackClickToCall } from '@/lib/analytics-events'

interface DynamicPhoneLinkProps {
  className?: string
  showIcon?: boolean
  iconClassName?: string
  children?: React.ReactNode
  callLocation?: string
  eventLabel?: string
}

/**
 * Client component for displaying dynamic phone numbers based on traffic source.
 * Use this in server components where you need the phone number to be dynamic.
 */
export function DynamicPhoneLink({
  className = '',
  showIcon = false,
  iconClassName = 'w-5 h-5',
  children,
  callLocation = 'dynamic_phone_link',
  eventLabel = 'Dynamic Phone Link',
}: DynamicPhoneLinkProps) {
  const { phone, phoneTel, trafficSource, isLoaded } = useTrafficSource()

  return (
    <a
      href={`tel:${phoneTel}`}
      aria-hidden={!isLoaded}
      tabIndex={isLoaded ? undefined : -1}
      style={{ visibility: isLoaded ? 'visible' : 'hidden', pointerEvents: isLoaded ? 'auto' : 'none' }}
      onClick={() => trackClickToCall({
        eventLabel,
        callLocation,
        trafficSource,
        phoneLine: phoneTel,
      })}
      className={className}
    >
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
  const { phone, isLoaded } = useTrafficSource()

  return (
    <span className={className} aria-hidden={!isLoaded} style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
      {phone}
    </span>
  )
}

interface DynamicPhoneButtonProps {
  className?: string
  children?: React.ReactNode
  callLocation?: string
  eventLabel?: string
}

/**
 * Client component for a phone CTA button with dynamic number.
 */
export function DynamicPhoneButton({
  className = '',
  children,
  callLocation = 'dynamic_phone_button',
  eventLabel = 'Dynamic Phone Button',
}: DynamicPhoneButtonProps) {
  const { phone, phoneTel, trafficSource, isLoaded } = useTrafficSource()

  return (
    <a
      href={`tel:${phoneTel}`}
      aria-hidden={!isLoaded}
      tabIndex={isLoaded ? undefined : -1}
      style={{ visibility: isLoaded ? 'visible' : 'hidden', pointerEvents: isLoaded ? 'auto' : 'none' }}
      onClick={() => trackClickToCall({
        eventLabel,
        callLocation,
        trafficSource,
        phoneLine: phoneTel,
      })}
      className={className}
    >
      {children || (
        <>
          <Phone className="w-5 h-5 mr-2" />
          {phone}
        </>
      )}
    </a>
  )
}
