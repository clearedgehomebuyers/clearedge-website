"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

const situations = [
  {
    title: 'Foreclosure',
    slug: 'foreclosure',
    description: 'Facing a sheriff sale? We can often close before the auction date.',
  },
  {
    title: 'Inherited Property',
    slug: 'inherited-property',
    description: 'Managing an estate is hard enough. We buy during or after probate.',
  },
  {
    title: 'Divorce',
    slug: 'divorce',
    description: 'Split the proceeds and move forward. A quick sale means faster closure.',
  },
  {
    title: 'Job Relocation',
    slug: 'job-relocation',
    description: "The new opportunity won't wait. We close on your timeline.",
  },
  {
    title: 'Major Repairs Needed',
    slug: 'major-repairs',
    description: 'Foundation issues? Roof damage? Mold? We buy as-is. You fix nothing.',
  },
  {
    title: 'Tax Liens & Code Violations',
    slug: 'tax-liens-code-violations',
    description: "Outstanding liens or municipal violations don't stop us.",
  },
  {
    title: 'Tired Landlord',
    slug: 'tired-landlord',
    description: 'Done dealing with tenants? We buy rentals — occupied or vacant.',
  },
  {
    title: 'Vacant Property',
    slug: 'vacant-property',
    description: 'Empty house draining your wallet? Stop the bleeding with a quick sale.',
  },
]

export function V0Situations() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1f1a] mb-4">
            We Buy Houses in Any Situation
          </h2>
          <p className="text-lg text-[#1a1f1a]/70 max-w-2xl mx-auto">
            Every homeowner&apos;s situation is different. Here are the most common reasons people reach out to us.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {situations.map((situation) => (
            <Link
              key={situation.slug}
              href={`/situations/${situation.slug}`}
              className="relative bg-white border border-[#1a1f1a]/10 hover:border-[#00b332] rounded-xl p-6 pb-10 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group"
            >
              <h3 className="font-semibold text-[#1a1f1a] mb-2 group-hover:text-[#00b332] transition-colors">
                {situation.title}
              </h3>
              <p className="text-sm text-[#1a1f1a]/70">{situation.description}</p>
              <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 text-[#00b332] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
