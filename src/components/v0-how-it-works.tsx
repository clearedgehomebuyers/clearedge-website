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
    <section id="how-it-works" className="py-12 md:py-16 bg-white scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16 animate-on-scroll">
          <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
            Simple 3-Step Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-ce-ink mb-6 text-balance">
            How We Buy Your House for Cash
          </h2>
          <p className="text-ce-ink/70 text-lg">
            No repairs. No showings. No months of waiting for a maybe. Three steps between you and a cash closing check.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group animate-on-scroll" style={{ transitionDelay: `${(index + 1) * 100}ms` }}>
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(50%+60px)] w-[calc(100%-120px)] h-0.5 bg-gradient-to-r from-ce-green to-ce-blue">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-ce-blue rounded-full" />
                </div>
              )}

              <div className="bg-white rounded-2xl p-8 border border-ce-ink/10 shadow-sm hover:shadow-card-hover hover:border-ce-green/30 hover:-translate-y-0.5 transition-all duration-300 h-full">
                {/* Step Number & Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-10 h-10 bg-ce-green text-white rounded-full font-serif text-lg flex items-center justify-center flex-shrink-0">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-ce-blue-subtle flex items-center justify-center group-hover:bg-ce-blue/15 transition-colors">
                    <step.icon className="w-6 h-6 text-ce-blue" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-ce-ink mb-3">{step.title}</h3>
                <p className="text-ce-ink/70 leading-relaxed mb-4">{step.description}</p>

                <span className="inline-flex items-center px-3 py-1 rounded-full bg-ce-green-subtle text-ce-green text-sm font-medium">
                  {step.accent}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center items-center animate-on-scroll stagger-4">
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
            className="inline-flex items-center gap-2 bg-ce-green text-white px-8 py-4 rounded-full font-medium hover:bg-ce-green-hover shadow-green hover:shadow-green-lg hover:-translate-y-0.5 active:translate-y-0 transition-all group"
          >
            Get My Cash Offer
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-ce-green font-medium link-animated"
          >
            See the Full Process
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
