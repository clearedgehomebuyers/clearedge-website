"use client"

const reasons = [
  {
    number: "1",
    title: "Local, Not a Franchise",
    description: "We started in 2016 on Birch Street in Scranton — not a call center in another state. Tyler still answers the phone.",
  },
  {
    number: "2",
    title: "Transparent Pricing",
    description: "We show you exactly how we calculate our offer. No mystery math. No pressure. Just honest numbers.",
  },
  {
    number: "3",
    title: "Your Timeline, Not Ours",
    description: "Need to close in 7 days? We can do that. Need 60 days to find your next place? That works too.",
  },
  {
    number: "4",
    title: "White-Glove Service",
    description: "From the first call to the closing table, you work directly with Tyler — not a rotating cast of salespeople.",
  },
]

export function V0WhyClearEdge() {
  return (
    <section className="py-16 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1f1a] mb-12 text-center">
          Why Homeowners Choose ClearEdge
        </h2>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="bg-white rounded-xl p-8 shadow-sm border border-[#1a1f1a]/5 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#e6f7eb] rounded-full flex items-center justify-center mb-4">
                <span className="text-[#00b332] font-bold text-xl">{reason.number}</span>
              </div>
              <h3 className="text-xl font-bold text-[#1a1f1a] mb-3">{reason.title}</h3>
              <p className="text-[#1a1f1a]/70">
                {reason.description}
                {reason.number === "4" && (
                  <>
                    {" "}Call him now:{" "}
                    <a href="tel:+15709042059" className="text-[#00b332] hover:text-[#009929] font-semibold">
                      (570) 904-2059
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
