"use client"

import { FileText, Phone, HandshakeIcon, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Tell Us About Your Property",
    description:
      "Fill out our quick form with your address and a few details about your situation. Takes under 2 minutes. No commitment, no personal info required yet.",
    accent: "Under 2 minutes",
  },
  {
    number: "02",
    icon: Phone,
    title: "Get a Fair Cash Offer in 24 Hours",
    description:
      "Tyler personally reviews every property using local PA market data — not a national algorithm. You'll receive a transparent cash offer within 24 hours, with a clear breakdown of how we got the number.",
    accent: "Offer within 24 hours",
  },
  {
    number: "03",
    icon: HandshakeIcon,
    title: "Close on Your Timeline, Not Ours",
    description:
      "Accept your offer and pick your closing date — as fast as 7 days or up to 60 days. We pay all closing costs, handle the paperwork, and wire your funds directly.",
    accent: "You choose the date",
  },
]

export function V0HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 md:py-12 bg-white scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
          <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
            Simple 3-Step Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-6 text-balance">
            How We Buy Your House for Cash
          </h2>
          <p className="text-muted-foreground text-lg">
            No repairs. No showings. No months of waiting for a maybe. Three steps between you and a cash closing check.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(50%+60px)] w-[calc(100%-120px)] h-0.5 bg-[#008a29]/20">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#008a29] rounded-full" />
                </div>
              )}

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#008a29]/10 hover:shadow-md hover:border-[#008a29]/30 transition-all h-full">
                {/* Step Number & Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-serif font-medium text-[#008a29]/20">{step.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-[#008a29]/10 flex items-center justify-center group-hover:bg-[#008a29]/20 transition-colors">
                    <step.icon className="w-6 h-6 text-[#008a29]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{step.description}</p>

                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#008a29]/10 text-[#008a29] text-sm font-medium">
                  {step.accent}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA - green button */}
        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#lead-form"
            onClick={(e) => {
              e.preventDefault()
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'cta_click', {
                  event_category: 'CTA',
                  event_label: 'Get My Cash Offer - How It Works',
                  page_path: window.location.pathname
                });
              }
              document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 bg-[#008a29] text-white px-8 py-4 rounded-full font-medium hover:bg-[#007a24] transition-colors group"
          >
            Get My Cash Offer
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-[#008a29] font-medium hover:text-[#007a24] transition-colors"
          >
            See the Full Process
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
