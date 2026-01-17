"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

interface LocationFAQAccordionProps {
  faqs: FAQ[]
  cityName: string
}

export function LocationFAQAccordion({ faqs, cityName }: LocationFAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a1f1a] mb-6 text-balance">
            Questions About Selling in {cityName}
          </h2>
          <p className="text-[#1a1f1a]/70 text-lg">
            We believe in complete transparency. Here are answers to the questions we hear most often.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-all ${
                openIndex === index
                  ? "border-[#008a29]/20 bg-[#FAF8F5]"
                  : "border-[#1a1f1a]/10 bg-[#FAF8F5]/50 hover:bg-[#FAF8F5]"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-[#1a1f1a] pr-4">{faq.question}</span>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    openIndex === index ? "bg-[#008a29] text-white" : "bg-[#008a29]/10 text-[#008a29]"
                  }`}
                >
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-[#1a1f1a]/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="text-center mt-10 p-6 bg-[#FAF8F5] rounded-xl border border-[#1a1f1a]/5">
          <p className="text-[#1a1f1a] font-medium mb-2">Still have questions?</p>
          <p className="text-[#1a1f1a]/70 text-sm mb-4">
            We&apos;re here to help. Call Tyler directly or reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href="tel:+15709042059" className="text-[#008a29] font-medium hover:underline">
              (570) 904-2059
            </a>
            <span className="hidden sm:inline text-[#1a1f1a]/30">|</span>
            <a href="/contact" className="text-[#008a29] font-medium hover:underline">
              Have More Questions? &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
