import { XCircle, CheckCircle, ArrowRight } from "lucide-react"

const problems = [
  "Expensive repairs before you can list",
  "Months of showings and open houses",
  "6% realtor commissions eating your equity",
  "Deals falling through at the last minute",
  "Uncertainty about when (or if) you'll sell",
]

const solutions = [
  "Sell completely as-is — we handle repairs",
  "One visit from us, that's it",
  "Zero fees, zero commissions, ever",
  "Guaranteed cash offer, no financing contingencies",
  "You choose your closing date",
]

export function V0ProblemSolution() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
            A Better Way to Sell
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a1f1a] mb-6 text-balance">
            Tired of the Traditional Home Selling Hassle?
          </h2>
          <p className="text-[#1a1f1a]/70 text-lg">
            We created ClearEdge because we knew there had to be a simpler, fairer way for homeowners to sell.
          </p>
        </div>

        {/* Problem / Solution Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Problem Card */}
          <div className="bg-[#FAF8F5] rounded-2xl p-8 border border-[#1a1f1a]/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1f1a]">Traditional Sale</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[#1a1f1a]/70">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#008a29]/5 rounded-2xl p-8 border border-[#008a29]/20 relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#008a29]/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#008a29]/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#008a29]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a1f1a]">The ClearEdge Way</h3>
              </div>
              <ul className="space-y-4">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#008a29] flex-shrink-0 mt-0.5" />
                    <span className="text-[#1a1f1a]">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 text-[#008a29] font-medium hover:gap-3 transition-all"
          >
            See if your property qualifies
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
