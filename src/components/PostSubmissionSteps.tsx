"use client"

const steps = [
  {
    number: 1,
    title: "Quick Discovery Call",
    description:
      "Someone on our team will reach out right away for a brief phone call. We'll ask about your property's condition, who's living there, anything owed against it, and any unique circumstances. We've done this hundreds of times so we know exactly what to ask — this helps us present the most accurate offer possible.",
  },
  {
    number: 2,
    title: "We Do Our Homework",
    description:
      "Behind the scenes, our team reviews everything — your submission, our phone call notes, public property data, local market trends, expected renovation costs, and what it takes to bring the property back to good standing. This is where we build your offer.",
  },
  {
    number: 3,
    title: "Your No-Obligation Cash Offer",
    subtitle: "Within 24 Hours",
    description:
      "Within 24 hours of our discovery call, we'll present your all-cash, no-obligation offer — good for 30 days. We don't just hand you a number. We walk you through it, explain how we got there, and genuinely consult with you on your best options — even if that means suggesting an alternative that works better for your situation.",
  },
  {
    number: 4,
    title: "Quick Property Walkthrough",
    description:
      "Once you accept, we send a team member for a brief walkthrough to verify the property matches our research. This isn't to reduce your price — it's to confirm what we're working with and get photos to coordinate our contractors and partners.",
  },
  {
    number: 5,
    title: "You Pick the Closing Date",
    description:
      "After that, you choose the closing timeline that works for you. We handle all the paperwork, explain everything clearly, and cover every closing cost. All you do is show up on your chosen date and walk away with cash in hand.",
  },
]

interface PostSubmissionStepsProps {
  bgColor?: "white" | "cream"
}

export function PostSubmissionSteps({ bgColor = "white" }: PostSubmissionStepsProps) {
  const bgClass = bgColor === "cream" ? "bg-[#FAF8F5]" : "bg-white"

  return (
    <section className={`py-12 md:py-14 ${bgClass}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-4">
            What Happens After You Submit Your Info
          </h2>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#008a29]/20 hidden md:block" />

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex gap-4 md:gap-6">
                {/* Step number circle */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#008a29] text-white flex items-center justify-center font-bold text-lg z-10">
                  {step.number}
                </div>

                {/* Content */}
                <div className={`flex-1 ${bgColor === "cream" ? "bg-white" : "bg-[#FAF8F5]"} rounded-2xl p-5 md:p-6 border border-[#1a1f1a]/5`}>
                  <h3 className="text-lg font-semibold text-[#1a1f1a] mb-1">
                    {step.title}
                    {step.subtitle && (
                      <span className="text-[#008a29] font-medium text-sm ml-2">
                        ({step.subtitle})
                      </span>
                    )}
                  </h3>
                  <p className="text-[#1a1f1a]/70 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
