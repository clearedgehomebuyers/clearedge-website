'use client'

import { MessageCircle } from 'lucide-react'
import { useTrafficSource } from './TrafficSourceProvider'

export function MobileTextButton({ className = '' }: { className?: string }) {
  const { phoneRaw, isLoaded } = useTrafficSource()

  return (
    <a
      href={`sms:${phoneRaw}`}
      aria-hidden={!isLoaded}
      tabIndex={isLoaded ? undefined : -1}
      style={{ visibility: isLoaded ? 'visible' : 'hidden', pointerEvents: isLoaded ? 'auto' : 'none' }}
      onClick={() => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'click_to_text', {
            event_category: 'Contact',
            event_label: 'Floating Text Button',
            page_path: window.location.pathname
          });
        }
      }}
      className={`flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center rounded-lg text-ce-green transition-colors hover:bg-ce-green/10 ${className}`}
      aria-label="Text us"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-[10px] font-semibold leading-none">Text</span>
    </a>
  )
}
