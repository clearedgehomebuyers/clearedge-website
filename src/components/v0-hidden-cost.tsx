"use client"

export function V0HiddenCost() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1f1a] mb-4">
          The Hidden Cost of Waiting
        </h2>
        <p className="text-lg text-[#1a1f1a]/70 mb-8">
          When you list traditionally, you&apos;re not just waiting — you&apos;re paying.
          Here&apos;s what a typical 90-day listing actually costs compared to a cash sale.
        </p>

        <div className="overflow-x-auto rounded-xl border border-[#1a1f1a]/10 shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#1a1f1a] text-white">
                <th className="text-left py-4 px-6 font-semibold">Expense</th>
                <th className="text-center py-4 px-6 font-semibold">
                  Traditional Sale
                  <br />
                  <span className="font-normal text-white/70 text-sm">(90 Days)</span>
                </th>
                <th className="text-center py-4 px-6 font-semibold bg-[#008a29] text-white">
                  ClearEdge Sale
                  <br />
                  <span className="font-normal text-white/90 text-sm">(7–30 Days)</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-[#1a1f1a]">
              <tr className="border-b border-[#1a1f1a]/10">
                <td className="py-4 px-6 font-medium">Repairs Before Listing</td>
                <td className="py-4 px-6 text-center text-red-600 font-semibold">$15,000+</td>
                <td className="py-4 px-6 text-center text-[#008a29] font-semibold bg-[#e6f7eb]">$0</td>
              </tr>
              <tr className="border-b border-[#1a1f1a]/10 bg-[#FAF8F5]">
                <td className="py-4 px-6 font-medium">
                  Holding Costs
                  <br />
                  <span className="text-sm text-[#1a1f1a]/70">(Taxes, Utilities, Insurance, Mortgage)</span>
                </td>
                <td className="py-4 px-6 text-center text-red-600 font-semibold">$4,500+</td>
                <td className="py-4 px-6 text-center text-[#008a29] font-semibold bg-[#e6f7eb]">$0</td>
              </tr>
              <tr className="border-b border-[#1a1f1a]/10">
                <td className="py-4 px-6 font-medium">
                  Agent Commissions
                  <br />
                  <span className="text-sm text-[#1a1f1a]/70">(6% on a $200k home)</span>
                </td>
                <td className="py-4 px-6 text-center text-red-600 font-semibold">$12,000</td>
                <td className="py-4 px-6 text-center text-[#008a29] font-semibold bg-[#e6f7eb]">$0</td>
              </tr>
              <tr className="border-b border-[#1a1f1a]/10 bg-[#FAF8F5]">
                <td className="py-4 px-6 font-medium">Closing Cost Contributions</td>
                <td className="py-4 px-6 text-center text-red-600 font-semibold">$3,000+</td>
                <td className="py-4 px-6 text-center text-[#008a29] font-semibold bg-[#e6f7eb]">$0</td>
              </tr>
              <tr className="bg-[#1a1f1a] text-white">
                <td className="py-4 px-6 font-bold">Total Out-of-Pocket Risk</td>
                <td className="py-4 px-6 text-center font-bold text-red-400">$34,500+</td>
                <td className="py-4 px-6 text-center font-bold text-[#00ff4d] bg-[#007a24]">$0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[#1a1f1a]/70 text-sm mt-6 italic text-center">
          *Based on a $200,000 home with typical Eastern PA repair needs and 90-day market time. Your actual costs may vary.
        </p>
      </div>
    </section>
  )
}
