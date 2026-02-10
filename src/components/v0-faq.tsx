"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
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
  const sectionBgClass = sectionBg === "beige" ? "bg-surface-cream" : "bg-white"
  const cardBgOpen = sectionBg === "beige" ? "bg-white" : "bg-surface-cream"
  const cardBgClosed = sectionBg === "beige" ? "bg-white/80 hover:bg-white" : "bg-surface-cream/50 hover:bg-surface-cream"
  const footerBgClass = sectionBg === "beige" ? "bg-white" : "bg-surface-cream"

  return (
    <section className={`py-12 md:py-16 ${sectionBgClass}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 animate-on-scroll">
          <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-ce-ink mb-6 text-balance">
            {title}
          </h2>
          <p className="text-ce-ink/70 text-lg">
            {subtitle}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`animate-on-scroll border rounded-xl transition-all ${
                  isOpen
                    ? `border-ce-green/20 ${cardBgOpen}`
                    : `border-ce-ink/10 ${cardBgClosed}`
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-ce-ink pr-4">{faq.question}</span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? "bg-ce-green text-white" : "bg-ce-ink/5 text-ce-ink/40"
                    }`}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Smooth height animation */}
                <div className={`accordion-content ${isOpen ? 'is-open' : ''}`}>
                  <div>
                    <div className="px-6 pb-6">
                      <p className="text-ce-ink/70 leading-relaxed">
                        {faq.answer.replace(/\{\{phone\}\}/g, phone)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Still have questions */}
        <div className={`text-center mt-8 p-6 ${footerBgClass} rounded-xl border border-ce-ink/5 animate-on-scroll`}>
          <p className="text-ce-ink font-medium mb-2">Still have questions?</p>
          <p className="text-ce-ink/70 text-sm mb-4">
            We&apos;re here to help. Call Tyler directly or reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href={`tel:${phoneTel}`} className="text-ce-green font-medium link-animated">
              {phone}
            </a>
            <span className="hidden sm:inline text-ce-ink/30">|</span>
            <a href="/contact" className="text-ce-green font-medium link-animated">
              Have More Questions? &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
