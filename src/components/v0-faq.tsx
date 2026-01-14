"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "How do you determine your cash offer?",
    answer:
      "We analyze recent comparable sales in your neighborhood, the current condition of your property, and local market trends. Our offers are fair and transparent — we'll walk you through exactly how we arrived at the number. No hidden formulas, no games.",
  },
  {
    question: "Do I need to make any repairs before selling?",
    answer:
      "Absolutely not. We buy houses in any condition — whether it needs minor cosmetic updates or major structural work. Foundation issues, roof problems, water damage, hoarding situations — we've seen it all and we'll still make you a fair offer.",
  },
  {
    question: "How fast can you actually close?",
    answer:
      "We can close in as fast as 7 days if you need to move quickly. However, we're also happy to work on your timeline — whether that's 2 weeks, 30 days, or 60 days. You're in control of the closing date.",
  },
  {
    question: "Are there any fees or commissions?",
    answer:
      "None. Zero. We don't charge any fees or commissions. We also cover all standard closing costs. The offer we make is the amount you walk away with (minus any existing liens or mortgages on the property).",
  },
  {
    question: "What if I still have a mortgage on the house?",
    answer:
      "No problem at all. Most homes we purchase have existing mortgages. At closing, the title company pays off your remaining mortgage balance and you receive the difference. We handle the coordination.",
  },
  {
    question: "Am I obligated to accept your offer?",
    answer:
      "Not at all. Our cash offer comes with zero obligation and zero pressure. If our offer doesn't work for your situation, no hard feelings. We're happy to have helped you understand what a cash sale could look like.",
  },
]

export function V0FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a1f1a] mb-6 text-balance">
            Everything You Need to Know
          </h2>
          <p className="text-[#1a1f1a]/60 text-lg">
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
                  ? "border-[#00b332]/20 bg-[#FAF8F5]"
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
                    openIndex === index ? "bg-[#00b332] text-white" : "bg-[#00b332]/10 text-[#00b332]"
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
          <p className="text-[#1a1f1a]/60 text-sm mb-4">
            We're here to help. Call Tyler directly or submit your info and we'll reach out.
          </p>
          <a href="tel:5709042059" className="text-[#00b332] font-medium hover:underline">
            (570) 904-2059
          </a>
        </div>
      </div>
    </section>
  )
}
