"use client"

import { MapPin, Heart, Users, Phone } from "lucide-react"
import { useTrafficSource } from "./TrafficSourceProvider"

const values = [
  {
    icon: MapPin,
    title: "Born & Raised in NEPA",
    description:
      "We're not a national franchise or out-of-state investor. We live here, raise our families here, and invest in our communities.",
  },
  {
    icon: Heart,
    title: "People Over Profits",
    description:
      "Every homeowner's situation is unique. We listen first and create solutions that genuinely help — even if that means referring you elsewhere.",
  },
  {
    icon: Users,
    title: "Work With the Owner",
    description:
      "When you call ClearEdge, you talk to Tyler — not a call center. We believe in personal relationships, not transactional ones.",
  },
]

export function V0AboutSection() {
  const { phone, phoneTel } = useTrafficSource()

  return (
    <section id="about" className="py-12 md:py-12 bg-[#FAF8F5] scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative flex items-center gap-6">
              {/* Left property photos - stacked vertically */}
              <div className="hidden md:flex flex-col gap-4">
                <div className="w-36 lg:w-44 rounded-xl overflow-hidden shadow-lg -rotate-3 transform hover:rotate-0 transition-transform duration-300">
                  <img
                    src="/properties/wilkes-barre-pa-inherited-property-sale-3.jpg"
                    alt="Inherited property in Wilkes-Barre, PA purchased by ClearEdge Home Buyers"
                    className="w-full h-48 lg:h-56 object-cover"
                  />
                </div>
                <div className="w-36 lg:w-44 rounded-xl overflow-hidden shadow-lg rotate-2 transform hover:rotate-0 transition-transform duration-300">
                  <img
                    src="/properties/allentown-pa-sell-house-fast-as-is-2.jpg"
                    alt="As-is property in Allentown, PA purchased by ClearEdge Home Buyers"
                    className="w-full h-48 lg:h-56 object-cover"
                  />
                </div>
              </div>

              {/* Main Tyler photo */}
              <div className="relative">
                <div className="relative w-56 md:w-64 lg:w-72 rounded-2xl overflow-hidden shadow-2xl shadow-[#1a1f1a]/15 ring-4 ring-white">
                  <img
                    src="/tyler.jpg"
                    alt="Tyler - Founder of ClearEdge Home Buyers"
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Subtle accent behind */}
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#008a29]/10 rounded-2xl -z-10" />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div>
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
                About ClearEdge
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1a1f1a] mb-6 text-balance">
                Real People. Local Roots.
                <span className="text-[#008a29] block">Honest Offers.</span>
              </h2>
              <div className="space-y-4 text-[#1a1f1a]/70 text-lg leading-relaxed">
                <p>
                  I'm Tyler, and I started ClearEdge Home Buyers in 2016 because I saw too many Pennsylvania families
                  get taken advantage of by out-of-state investors making lowball offers.
                </p>
                <p>
                  I knew there had to be a better way — one built on transparency, fair pricing, and treating people the
                  way I'd want my own family treated. That's the ClearEdge promise.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="space-y-5 pt-2">
              {values.map((value, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-[#008a29]/10">
                    <value.icon className="w-5 h-5 text-[#008a29]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1f1a] mb-1">{value.title}</h3>
                    <p className="text-[#1a1f1a]/70 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Contact */}
            <div className="pt-4">
              <a
                href={`tel:${phoneTel}`}
                className="inline-flex items-center gap-3 text-[#008a29] font-medium hover:gap-4 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-[#008a29]/10 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                Call Tyler directly: {phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
