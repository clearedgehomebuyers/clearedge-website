"use client"

import Image from "next/image"

const properties = [
  {
    src: "/properties/scranton-pa-cash-home-buyers-clearedge-1.jpg",
    alt: "Two-story home with covered porch in Scranton, PA - sold as-is to ClearEdge Home Buyers for cash",
    location: "Scranton, PA",
  },
  {
    src: "/properties/allentown-pa-sell-house-fast-as-is-2.jpg",
    alt: "Single-family house in Allentown, PA purchased by ClearEdge - no repairs needed before sale",
    location: "Allentown, PA",
  },
  {
    src: "/properties/wilkes-barre-pa-inherited-property-sale-3.jpg",
    alt: "Multi-unit property in Wilkes-Barre, PA - inherited home sold quickly for cash",
    location: "Wilkes-Barre, PA",
  },
  {
    src: "/properties/lehigh-valley-real-estate-investors-4.jpg",
    alt: "Distressed duplex in Lehigh Valley, PA - bought as-is by local cash home buyers",
    location: "Lehigh Valley, PA",
  },
  {
    src: "/properties/nepa-distressed-house-cleanout-service-5.jpg",
    alt: "NEPA property with deferred maintenance - ClearEdge bought with no cleanout required",
    location: "NEPA",
  },
]

export function V0PropertiesGallery() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1f1a] mb-3">
            Recent Properties We&apos;ve Purchased
          </h2>
          <p className="text-[#1a1f1a]/70">
            We buy houses in any condition throughout Eastern PA
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {properties.map((property, index) => (
            <div
              key={index}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden shadow-md group ${
                index === 4 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <Image
                src={property.src}
                alt={property.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="absolute bottom-2 left-2 text-white text-sm font-medium">
                  {property.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
