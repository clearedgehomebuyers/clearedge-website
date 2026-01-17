'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-[#FAF8F5] rounded-2xl border border-[#1a1f1a]/5 overflow-hidden transition-all duration-200"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-[#1a1f1a]/[0.02] transition-colors"
            aria-expanded={openIndex === index}
          >
            <h3 className="text-lg font-semibold text-[#1a1f1a] pr-4">
              {faq.question}
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-[#008a29] flex-shrink-0 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-6 text-[#1a1f1a]/70 leading-relaxed">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
