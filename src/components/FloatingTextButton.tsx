'use client'

import { MessageCircle } from 'lucide-react'
import { useTrafficSource } from './TrafficSourceProvider'

export function FloatingTextButton() {
  const { phoneRaw, isLoaded } = useTrafficSource()

  // Hold until detection resolves. Rendering earlier would publish an sms:
  // link to the default number and hand a paid visitor the wrong line — this
  // is the only phone on the page that no host component can gate for us.
  // It is a fixed-position overlay, so deferring it shifts nothing.
  if (!isLoaded) return null

  return (
    <a
      href={`sms:${phoneRaw}`}
      onClick={() => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'click_to_text', {
            event_category: 'Contact',
            event_label: 'Floating Text Button',
            page_path: window.location.pathname
          });
        }
      }}
      className="fixed bottom-6 right-4 z-50 flex flex-col items-center md:hidden animate-fade-in-up"
      aria-label="Text us"
    >
      <div className="w-14 h-14 bg-[#008a29] rounded-full flex items-center justify-center shadow-lg hover:bg-[#007a24] transition-colors">
        <MessageCircle className="w-7 h-7 text-white" />
      </div>
      <span className="mt-1 text-sm font-semibold text-[#008a29] bg-white px-3 py-1 rounded-full shadow-sm">
        Text Us
      </span>
    </a>
  )
}
