'use client'

import { MessageCircle } from 'lucide-react'

export function FloatingTextButton() {
  return (
    <a
      href="sms:5709042059"
      className="fixed bottom-4 right-4 z-50 flex flex-col items-center md:hidden animate-fade-in-up"
      aria-label="Text us"
    >
      <div className="w-14 h-14 bg-[#00b332] rounded-full flex items-center justify-center shadow-lg hover:bg-[#009929] transition-colors">
        <MessageCircle className="w-7 h-7 text-white" />
      </div>
      <span className="mt-1 text-xs font-semibold text-[#00b332] bg-white px-2 py-0.5 rounded-full shadow-sm">
        Text Us
      </span>
    </a>
  )
}
