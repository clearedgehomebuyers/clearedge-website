"use client"

import Link from "next/link"

const locationsByRegion = {
  'NEPA': [
    { name: 'Scranton', href: '/locations/scranton' },
    { name: 'Wilkes-Barre', href: '/locations/wilkes-barre' },
    { name: 'Hazleton', href: '/locations/hazleton' },
    { name: 'Pittston', href: '/locations/pittston' },
    { name: 'Kingston', href: '/locations/kingston' },
    { name: 'Nanticoke', href: '/locations/nanticoke' },
    { name: 'Carbondale', href: '/locations/carbondale' },
    { name: 'Dunmore', href: '/locations/dunmore' },
    { name: 'Honesdale', href: '/locations/honesdale' },
    { name: 'Bloomsburg', href: '/locations/bloomsburg' },
  ],
  'Lehigh Valley': [
    { name: 'Allentown', href: '/locations/allentown' },
    { name: 'Bethlehem', href: '/locations/bethlehem' },
    { name: 'Easton', href: '/locations/easton' },
    { name: 'Reading', href: '/locations/reading' },
    { name: 'Pottsville', href: '/locations/pottsville' },
    { name: 'Lehigh Valley', href: '/locations/lehigh-valley' },
  ],
  'Poconos': [
    { name: 'Stroudsburg', href: '/locations/stroudsburg' },
    { name: 'East Stroudsburg', href: '/locations/east-stroudsburg' },
    { name: 'Pocono Pines', href: '/locations/pocono-pines' },
    { name: 'Tannersville', href: '/locations/tannersville' },
    { name: 'Poconos', href: '/locations/poconos' },
  ],
}

export function V0ServiceAreas() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-16 lg:py-20 bg-[#FAF8F5]" id="service-areas">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1f1a] mb-4">
            Serving All of Eastern Pennsylvania
          </h2>
          <p className="text-lg text-[#1a1f1a]/70 max-w-3xl mx-auto">
            We purchase properties throughout NEPA, the Lehigh Valley, and the Poconos. If you own a house in any of these areas, we&apos;d love to make you a fair cash offer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {Object.entries(locationsByRegion).map(([region, cities]) => (
            <div key={region} className="bg-[#FAF8F5] rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#1a1f1a] mb-4 border-b-2 border-[#00b332] pb-2">
                {region}
              </h3>
              <ul className="space-y-2">
                {cities.map((city) => (
                  <li key={city.href}>
                    <Link
                      href={city.href}
                      className="text-[#1a1f1a]/70 hover:text-[#00b332] transition-colors"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center mt-10">
          <button
            onClick={scrollToForm}
            className="text-[#00b332] hover:text-[#009929] font-semibold"
          >
            Don&apos;t see your city? Request an offer anyway &rarr;
          </button>
        </p>
      </div>
    </section>
  )
}
