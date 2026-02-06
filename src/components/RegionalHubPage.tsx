"use client"

import Link from 'next/link'
import { Star, Home, Calendar, MapPin, ArrowRight, Building, Shield, Users, Clock, DollarSign, FileText } from 'lucide-react'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { V0LeadForm } from '@/components/v0-lead-form'
import { V0FAQ } from '@/components/v0-faq'
import { PostSubmissionSteps } from '@/components/PostSubmissionSteps'
import { RegionalCoverageMapWrapper } from '@/components/RegionalCoverageMapWrapper'
import { DynamicPhoneLink } from '@/components/DynamicPhone'
import type { RegionalHubData } from '@/lib/regional-hub-data'

// Trust stats for the hero section
const trustStats = [
  { icon: Star, value: '5.0', label: 'Google Rating' },
  { icon: Home, value: '200+', label: 'Homes Purchased' },
  { icon: Calendar, value: 'Since 2016', label: 'Trusted Buyer' },
  { icon: MapPin, value: '21', label: 'PA Communities' },
]

// Icon mapping for situations
const situationIcons: Record<string, typeof Building> = {
  'inherited-property': Building,
  'major-repairs': FileText,
  'tax-liens-code-violations': Shield,
  'tired-landlord': Home,
  'foreclosure': Shield,
  'job-relocation': MapPin,
  'divorce': Users,
  'vacant-property': Clock,
}

interface RegionalHubPageProps {
  data: RegionalHubData
}

export function RegionalHubPage({ data }: RegionalHubPageProps) {
  const scrollToForm = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        event_label: `Get Your Cash Offer - ${data.regionName} Hub Hero`,
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
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fillOpacity='1' fillRule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

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
              Get Your Cash Offer
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
              Regional Expertise
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
              Selling a House in {data.regionName} — What You Need to Know
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

      {/* Section 4: Common Selling Situations */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">
              We Can Help
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-4">
              Why {data.regionName} Homeowners Sell to ClearEdge
            </h2>
            <p className="text-[#1a1f1a]/70 max-w-2xl mx-auto">
              These are the most common reasons homeowners in {data.regionName} reach out to us.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.situations.map((situation) => {
              const Icon = situationIcons[situation.slug] || Building
              return (
                <Link
                  key={situation.slug}
                  href={`/situations/${situation.slug}`}
                  className="group relative bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5 hover:shadow-lg hover:border-[#008a29]/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#008a29]/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#008a29]" />
                  </div>
                  <h3 className="font-serif font-medium text-lg text-[#1a1f1a] mb-2 group-hover:text-[#008a29] transition-colors">
                    {situation.title}
                  </h3>
                  <p className="text-[#1a1f1a]/70 text-sm leading-relaxed">
                    {situation.description}
                  </p>
                  <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#008a29] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Regional Market Knowledge */}
      <section className="py-12 md:py-16 bg-[#FAF8F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">
            Why ClearEdge
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-6">
            Local Expertise. Real Results.
          </h2>
          <div className="bg-white rounded-2xl p-8 border border-[#1a1f1a]/5">
            <p className="text-lg text-[#1a1f1a]/70 leading-relaxed mb-6">
              I&apos;m Tyler, the founder of ClearEdge Home Buyers. Since 2016, I&apos;ve personally helped over 200 homeowners across Eastern Pennsylvania sell properties they no longer wanted or couldn&apos;t maintain. {data.regionName} isn&apos;t just a market we serve — it&apos;s where we know the neighborhoods, understand the local challenges, and have the relationships to close deals that other buyers walk away from.
            </p>
            <p className="text-lg text-[#1a1f1a]/70 leading-relaxed">
              We&apos;re not a national franchise or a call center. When you call ClearEdge, you talk to me directly. Every offer we make is backed by our local market knowledge and our commitment to treating every homeowner with honesty and respect.
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

      {/* Closing SEO - Sage gradient */}
      <section className="py-4 md:py-6 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#1a2e1a] font-medium">
            ClearEdge Home Buyers is your trusted local cash home buyer serving {data.regionName}. Get a fair offer and close on your timeline — no fees, no repairs, no hassle.
          </p>
        </div>
      </section>

      {/* Section 8: Lead Form */}
      <V0LeadForm />

      <PostSubmissionSteps bgColor="white" />

      <V0Footer />
    </main>
  )
}
