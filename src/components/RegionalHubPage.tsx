"use client"

import Link from 'next/link'
import { Star, Home, Calendar, MapPin, ArrowRight } from 'lucide-react'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { V0LeadForm } from '@/components/v0-lead-form'
import { V0FAQ } from '@/components/v0-faq'
import { RegionalCoverageMapWrapper } from '@/components/RegionalCoverageMapWrapper'
import { DynamicPhoneLink } from '@/components/DynamicPhone'
import type { RegionalHubData } from '@/lib/regional-hub-data'

// Trust stats for the hero section
const trustStats = [
  { icon: Star, value: '5.0', label: 'Google Rating' },
  { icon: Home, value: '200+', label: 'PA Homes Purchased Since 2016' },
  { icon: Calendar, value: '14 Days', label: 'Average Time to Close' },
  { icon: MapPin, value: '21', label: 'Eastern PA Markets Served' },
]

interface RegionalHubPageProps {
  data: RegionalHubData
}

export function RegionalHubPage({ data }: RegionalHubPageProps) {
  const scrollToForm = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        event_label: `Get My Fair Cash Offer - ${data.regionName} Hub Hero`,
        page_path: window.location.pathname
      })
    }
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="bg-white">
      <V0Header />

      {/* Section 1: Hero */}
      <section className="relative pt-32 pb-12 md:pb-16 px-4 overflow-hidden bg-[#FAF8F5]">
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
            {data.regionName} Cash Home Buyers
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1a1f1a] mb-6 leading-tight">
            {data.h1}
          </h1>
          <p className="text-lg sm:text-xl text-[#1a1f1a]/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            {data.subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center bg-[#008a29] text-white hover:bg-[#007a24] text-base px-8 py-4 rounded-full shadow-lg shadow-[#008a29]/25 transition-all hover:shadow-xl hover:shadow-[#008a29]/30 hover:-translate-y-0.5 font-medium"
            >
              Get My Fair Cash Offer
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <DynamicPhoneLink
              className="inline-flex items-center justify-center text-base px-8 py-4 rounded-full text-[#1a1f1a]/80 hover:text-[#1a1f1a] hover:bg-[#1a1f1a]/5 font-medium border border-[#1a1f1a]/10"
              showIcon
              iconClassName="w-5 h-5 mr-2"
            />
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {trustStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className="w-5 h-5 text-[#008a29]" />
                <div className="text-left">
                  <p className="font-bold text-[#1a1f1a] text-sm">{stat.value}</p>
                  <p className="text-xs text-[#1a1f1a]/60">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Regional Overview */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">
              Local Market Knowledge
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
              Why Selling a House in {data.regionName} Is Harder Than You Think
            </h2>
          </div>

          <div className="space-y-6 text-lg text-[#1a1f1a]/70 leading-relaxed">
            {data.overviewContent.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Cities We Serve */}
      <section className="py-12 md:py-16 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">
              Service Area
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
              Communities We Serve in {data.regionName}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className="group bg-white rounded-2xl p-6 border border-[#1a1f1a]/5 hover:shadow-lg hover:border-[#008a29]/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-xl font-medium text-[#1a1f1a] group-hover:text-[#008a29] transition-colors">
                    {city.name}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-[#008a29] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[#1a1f1a]/70 text-sm leading-relaxed">
                  {city.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Regional Market Knowledge */}
      <section className="py-12 md:py-16 bg-[#FAF8F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">
            Why ClearEdge
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-6">
            You Talk to Tyler, Not a Call Center.
          </h2>
          <div className="bg-white rounded-2xl p-8 border border-[#1a1f1a]/5">
            <p className="text-lg text-[#1a1f1a]/70 leading-relaxed mb-6">
              I&apos;m Tyler, the founder of ClearEdge Home Buyers. Since 2016, I&apos;ve personally bought over 200 homes across Eastern Pennsylvania — from properties with serious structural issues to inherited homes full of decades of belongings. {data.regionName} isn&apos;t just a market we serve — I know the neighborhoods, understand the local challenges (mine subsidence in Lackawanna County, aging row homes in the valley, seasonal vacancies in the mountains), and have the contractor and title relationships to close deals that other cash buyers walk away from.
            </p>
            <p className="text-lg text-[#1a1f1a]/70 leading-relaxed">
              We&apos;re not a national franchise, a wholesaler, or an algorithm. When you call ClearEdge, you talk to me directly — not a sales team, not a call center. I personally review every property, make every offer, and show up at every closing. That&apos;s why every one of our Google reviews is 5 stars. <Link href="/how-it-works" className="text-[#008a29] hover:underline">See exactly how our 3-step process works</Link> or <Link href="/cash-buyer-vs-realtor" className="text-[#008a29] hover:underline">compare cash buyers vs. realtors with real math</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Regional Map */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">
              Coverage Area
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
              Our {data.regionName} Service Area
            </h2>
          </div>
          <RegionalCoverageMapWrapper
            regionSlug={data.slug}
            cities={data.cities.map(c => c.slug)}
            center={data.mapCenter}
            zoom={data.mapZoom}
          />
        </div>
      </section>

      {/* Section 7: FAQ */}
      <V0FAQ
        faqs={data.faqs}
        title={`${data.regionName} Home Selling Questions`}
        subtitle={`Common questions from ${data.regionName} homeowners about selling to ClearEdge.`}
        sectionBg="beige"
      />


      {/* Section 8: Lead Form */}
      <V0LeadForm />


      <V0Footer />
    </main>
  )
}
