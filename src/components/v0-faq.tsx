"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { useTrafficSource } from "./TrafficSourceProvider"

type FAQ = {
  question: string
  answer: string
}

const defaultFaqs: FAQ[] = [
  {
    question: "How quickly can ClearEdge close on my Pennsylvania house?",
    answer:
      "We can close in as few as 7 days when you need to move quickly. The exact timeline depends on title work, but most straightforward sales close within 14 to 30 days. If you need more time, we'll work around your schedule.",
  },
  {
    question: "What types of properties does ClearEdge buy?",
    answer:
      "We buy single-family homes, duplexes, and small multi-family properties throughout Eastern Pennsylvania. Condition doesn't matter — we purchase properties with foundation issues, fire damage, code violations, and major repairs needed. We also buy properties with complicated title situations, including estate sales and properties in probate.",
  },
  {
    question: "How does ClearEdge determine its cash offer?",
    answer:
      "We calculate offers based on what your house will be worth after it's fully renovated, minus the cost of repairs, holding costs, and our operating margin. We'll walk you through exactly how we arrived at the number — no mystery, no hidden math.",
  },
  {
    question: "Is there any obligation if I request an offer?",
    answer:
      "No. You can request an offer, review it, and decide it's not for you. Our offers are valid for 30 days. There's no cost, no commitment, and no follow-up pressure. We believe you should have all the information to make the right decision.",
  },
  {
    question: "Can I sell my Pennsylvania house if I still have a mortgage?",
    answer:
      "Yes. Most homeowners who sell to us still have a mortgage. At closing, the title company pays off your existing loan from the sale proceeds. If you owe more than your home is worth, we can discuss options — in some cases, lenders will approve a short sale.",
  },
]

interface V0FAQProps {
  faqs?: FAQ[]
  title?: string
  subtitle?: string
  sectionBg?: "white" | "beige"
}

export function V0FAQ({
  faqs = defaultFaqs,
  title = "Everything You Need to Know",
  subtitle = "We believe in complete transparency. Here are answers to the questions we hear most often.",
  sectionBg = "white"
}: V0FAQProps) {
  const { phone, phoneTel } = useTrafficSource()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Background classes based on sectionBg prop
  const sectionBgClass = sectionBg === "beige" ? "bg-[#FAF8F5]" : "bg-white"
  const cardBgOpen = sectionBg === "beige" ? "bg-white" : "bg-[#FAF8F5]"
  const cardBgClosed = sectionBg === "beige" ? "bg-white/80 hover:bg-white" : "bg-[#FAF8F5]/50 hover:bg-[#FAF8F5]"
  const footerBgClass = sectionBg === "beige" ? "bg-white" : "bg-[#FAF8F5]"

  return (
    <section className={`py-12 md:py-12 ${sectionBgClass}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-6">
          <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a1f1a] mb-6 text-balance">
            {title}
          </h2>
          <p className="text-[#1a1f1a]/70 text-lg">
            {subtitle}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-all ${
                openIndex === index
                  ? `border-[#008a29]/20 ${cardBgOpen}`
                  : `border-[#1a1f1a]/10 ${cardBgClosed}`
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
        <div className={`text-center mt-6 p-6 ${footerBgClass} rounded-xl border border-[#1a1f1a]/5`}>
          <p className="text-[#1a1f1a] font-medium mb-2">Still have questions?</p>
          <p className="text-[#1a1f1a]/70 text-sm mb-4">
            We&apos;re here to help. Call Tyler directly or reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href={`tel:${phoneTel}`} className="text-[#008a29] font-medium hover:underline">
              {phone}
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
