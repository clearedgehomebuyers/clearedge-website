"use client"

import Link from "next/link"
import { CoverageMapWrapper } from './CoverageMapWrapper'

const locationsByRegion = {
  'NEPA': {
    hub: { name: 'View All NEPA', href: '/locations/nepa' },
    cities: [
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
  },
  'Lehigh Valley': {
    hub: { name: 'View All Lehigh Valley', href: '/locations/lehigh-valley' },
    cities: [
      { name: 'Allentown', href: '/locations/allentown' },
      { name: 'Bethlehem', href: '/locations/bethlehem' },
      { name: 'Easton', href: '/locations/easton' },
      { name: 'Reading', href: '/locations/reading' },
      { name: 'Pottsville', href: '/locations/pottsville' },
    ],
  },
  'Poconos': {
    hub: { name: 'View All Poconos', href: '/locations/poconos' },
    cities: [
      { name: 'Stroudsburg', href: '/locations/stroudsburg' },
      { name: 'East Stroudsburg', href: '/locations/east-stroudsburg' },
      { name: 'Pocono Pines', href: '/locations/pocono-pines' },
      { name: 'Tannersville', href: '/locations/tannersville' },
    ],
  },
}

export function V0ServiceAreas() {
  const scrollToForm = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        event_label: 'Request Offer Anyway - Service Areas',
        page_path: window.location.pathname
      });
    }
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-surface-green-wash to-surface-green-tint scroll-mt-20 md:scroll-mt-24" id="service-areas">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-on-scroll">
          <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
            Where We Buy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-ce-ink mb-4">
            Cash Home Buyers Across Eastern Pennsylvania
          </h2>
          <p className="text-lg text-ce-ink/70 max-w-3xl mx-auto">
            We buy houses in any condition throughout NEPA, the Lehigh Valley, and the Poconos — 21 markets and growing. If you own a property in Eastern PA, we want to make you a fair cash offer.
          </p>
        </div>

        {/* Interactive Coverage Map */}
        <div className="mb-10 animate-on-scroll stagger-1">
          <CoverageMapWrapper />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(locationsByRegion).map(([region, data], index) => (
            <div
              key={region}
              className="bg-white rounded-2xl p-6 border border-ce-ink/10 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 animate-on-scroll"
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <Link
                href={data.hub.href}
                className="block text-xl font-bold text-ce-ink mb-4 border-b-2 border-ce-green pb-2 hover:text-ce-green transition-colors"
              >
                {region}
              </Link>
              <ul className="space-y-2">
                {data.cities.map((city) => (
                  <li key={city.href}>
                    <Link
                      href={city.href}
                      className="text-ce-ink/70 hover:text-ce-green transition-colors"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={data.hub.href}
                className="inline-block mt-4 text-sm font-semibold text-ce-green hover:text-ce-green-hover transition-colors link-animated"
              >
                {data.hub.name} &rarr;
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 animate-on-scroll stagger-5">
          <button
            onClick={scrollToForm}
            className="text-ce-green hover:text-ce-green-hover font-semibold link-animated"
          >
            Don&apos;t see your city? We still buy throughout Eastern PA — get your offer &rarr;
          </button>
        </p>
      </div>
    </section>
  )
}
