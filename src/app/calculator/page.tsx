"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Calculator, DollarSign, Clock, Shield, Home, ArrowRight, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { V0LeadForm } from '@/components/v0-lead-form'
import { V0FAQ } from '@/components/v0-faq'
import { PostSubmissionSteps } from '@/components/PostSubmissionSteps'

// PA Counties with transfer tax rates
const paCounties = [
  { value: '', label: 'Select county (optional)' },
  { value: 'lackawanna', label: 'Lackawanna County' },
  { value: 'luzerne', label: 'Luzerne County' },
  { value: 'lehigh', label: 'Lehigh County' },
  { value: 'northampton', label: 'Northampton County' },
  { value: 'monroe', label: 'Monroe County' },
  { value: 'schuylkill', label: 'Schuylkill County' },
  { value: 'berks', label: 'Berks County' },
  { value: 'carbon', label: 'Carbon County' },
  { value: 'pike', label: 'Pike County' },
  { value: 'wayne', label: 'Wayne County' },
  { value: 'wyoming', label: 'Wyoming County' },
  { value: 'columbia', label: 'Columbia County' },
  { value: 'susquehanna', label: 'Susquehanna County' },
]

// Repair level quick-select options
const repairOptions = [
  { value: 0, label: '$0 - Move-in ready' },
  { value: 10000, label: '$5K-$15K - Minor repairs' },
  { value: 22500, label: '$15K-$30K - Moderate repairs' },
  { value: 40000, label: '$30K-$50K+ - Major repairs' },
]

// Timeline options
const timelineOptions = [
  { value: 'asap', label: 'Need to sell ASAP (under 30 days)' },
  { value: 'flexible', label: 'Some flexibility (1-3 months)' },
  { value: 'no-rush', label: 'No rush (3+ months)' },
]

// FAQ data
const faqs = [
  {
    question: 'Is this calculator accurate?',
    answer: "It provides reasonable estimates based on PA market averages. Every property is different — for an exact number, request a no-obligation cash offer from ClearEdge.",
  },
  {
    question: 'Why does the cash offer seem lower than market value?',
    answer: "Cash buyers assume all risk, repair costs, and carrying costs. The trade-off is speed, certainty, and zero out-of-pocket expense. For many homeowners, the net difference after accounting for commissions, repairs, and carrying costs is much smaller than it appears.",
  },
  {
    question: 'Can I get a real cash offer to compare?',
    answer: "Absolutely. Our offer is free, comes with zero obligation, and we'll walk you through every line of the calculation. Many homeowners use our offer as a baseline to compare against listing with an agent.",
  },
]

// Animated number component
function AnimatedNumber({ value, prefix = '$', duration = 800 }: { value: number; prefix?: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  const prevValue = useRef(0)

  useEffect(() => {
    const startValue = prevValue.current
    const endValue = value
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startValue + (endValue - startValue) * easeOut)
      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        prevValue.current = endValue
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  return (
    <span>
      {prefix}{displayValue.toLocaleString()}
    </span>
  )
}

export default function CalculatorPage() {
  // Form state
  const [homeValue, setHomeValue] = useState('')
  const [repairCosts, setRepairCosts] = useState('')
  const [selectedRepairOption, setSelectedRepairOption] = useState<number | null>(null)
  const [county, setCounty] = useState('')
  const [timeline, setTimeline] = useState('flexible')

  // Results state
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{
    traditional: {
      startingPrice: number
      repairs: number
      commission: number
      closingCosts: number
      carryingCosts: number
      netProceeds: number
      timelineMonths: string
      outOfPocket: number
    }
    cash: {
      offer: number
      netProceeds: number
    }
    difference: number
    cashBetter: boolean
  } | null>(null)

  const resultsRef = useRef<HTMLDivElement>(null)

  // Handle repair quick-select
  const handleRepairOption = (value: number) => {
    setSelectedRepairOption(value)
    setRepairCosts(value.toString())
  }

  // Handle custom repair input
  const handleRepairInput = (value: string) => {
    setRepairCosts(value)
    setSelectedRepairOption(null)
  }

  // Calculate results
  const calculate = () => {
    const homeVal = parseFloat(homeValue.replace(/[^0-9.]/g, '')) || 0
    const repairs = parseFloat(repairCosts.replace(/[^0-9.]/g, '')) || 0

    if (homeVal <= 0) {
      alert('Please enter your estimated home value.')
      return
    }

    // Traditional sale calculation
    const agentCommissionRate = 0.0581 // 5.81% PA average
    const closingCostRate = 0.02 // 2% seller closing costs

    // Determine months based on repairs
    let carryingMonths = repairs > 0 ? 5 : 3
    // Carrying costs ~$1,500/month on a $280K home = ~6.4% annually = ~0.54%/month
    const monthlyCarryingRate = 0.0054 // ~6.4% annual carrying cost (mortgage, taxes, insurance, utilities)

    const commission = homeVal * agentCommissionRate
    const closingCosts = homeVal * closingCostRate
    const carryingCosts = homeVal * monthlyCarryingRate * carryingMonths

    const traditionalNet = homeVal - repairs - commission - closingCosts - carryingCosts

    // Timeline estimate
    let timelineEstimate = '3-5 months'
    if (repairs > 30000) {
      timelineEstimate = '5-7 months'
    } else if (repairs > 15000) {
      timelineEstimate = '4-6 months'
    } else if (repairs > 0) {
      timelineEstimate = '3-5 months'
    } else {
      timelineEstimate = '2-4 months'
    }

    // Cash offer calculation
    // Base multiplier adjusted by repair level
    let cashMultiplier = 0.75
    if (repairs === 0) {
      cashMultiplier = 0.82
    } else if (repairs <= 15000) {
      cashMultiplier = 0.78
    } else if (repairs <= 30000) {
      cashMultiplier = 0.75
    } else {
      cashMultiplier = 0.72
    }

    const cashOffer = homeVal * cashMultiplier
    const cashNet = cashOffer // No deductions

    const difference = traditionalNet - cashNet
    const cashBetter = difference < 0

    setResults({
      traditional: {
        startingPrice: homeVal,
        repairs,
        commission: Math.round(commission),
        closingCosts: Math.round(closingCosts),
        carryingCosts: Math.round(carryingCosts),
        netProceeds: Math.round(traditionalNet),
        timelineMonths: timelineEstimate,
        outOfPocket: repairs,
      },
      cash: {
        offer: Math.round(cashOffer),
        netProceeds: Math.round(cashOffer),
      },
      difference: Math.round(Math.abs(difference)),
      cashBetter,
    })

    setShowResults(true)

    // Scroll to results after a brief delay
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)

    // Track calculation event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_used', {
        event_category: 'Calculator',
        event_label: 'Cost Comparison Calculator',
        home_value: homeVal,
        repair_costs: repairs,
      })
    }
  }

  // Get dynamic messaging based on results
  const getDynamicMessage = () => {
    if (!results) return null

    const diff = results.difference
    const repairs = results.traditional.repairs

    if (!results.cashBetter && diff > 15000) {
      return (
        <div className="bg-[#FAF8F5] border-l-4 border-[#1a1f1a]/30 p-6 rounded-r-2xl">
          <p className="text-[#1a1f1a]/80">
            Based on your inputs, a traditional sale could net you significantly more — if your home is truly move-in ready and you have the time. If that&apos;s the case, listing with a local agent may be your best move. But if your situation changes or you want a guaranteed number to compare against, we&apos;re here.
          </p>
        </div>
      )
    } else if (!results.cashBetter && diff >= 5000) {
      return (
        <div className="bg-[#FAF8F5] border-l-4 border-yellow-500 p-6 rounded-r-2xl">
          <p className="text-[#1a1f1a]/80">
            The numbers are close. When you factor in the months of carrying costs, the risk of a deal falling through (15-20% of traditionally listed homes have deals collapse){repairs > 0 && `, and the $${repairs.toLocaleString()} you'd need to spend upfront`}, the gap narrows further. Many homeowners in this range choose the certainty of a cash offer.
          </p>
        </div>
      )
    } else {
      return (
        <div className="bg-[#008a29]/5 border-l-4 border-[#008a29] p-6 rounded-r-2xl">
          <p className="text-[#1a1f1a]/80">
            When you factor in repairs, commissions, carrying costs, and the risk of a deal falling through, a cash offer likely puts more money in your pocket — and you get it weeks sooner with zero out-of-pocket risk.
          </p>
        </div>
      )
    }
  }

  const scrollToForm = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        event_label: 'Get Your Real Cash Offer - Calculator Results',
        page_path: window.location.pathname
      })
    }
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebApplication',
                '@id': 'https://www.clearedgehomebuyers.com/calculator/#calculator',
                name: 'Home Sale Calculator: Cash Offer vs. Realtor',
                description: 'Compare your estimated net proceeds: selling your PA house with a realtor vs. accepting a cash offer.',
                url: 'https://www.clearedgehomebuyers.com/calculator',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
                provider: {
                  '@id': 'https://www.clearedgehomebuyers.com/#organization',
                },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://www.clearedgehomebuyers.com/calculator/#breadcrumb',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://www.clearedgehomebuyers.com',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Sale Calculator',
                    item: 'https://www.clearedgehomebuyers.com/calculator',
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://www.clearedgehomebuyers.com/calculator/#faq',
                mainEntity: faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />

      <main className="bg-white">
        <V0Header />

        {/* HERO SECTION */}
        <section className="relative pt-32 pb-10 md:pb-12 px-4 overflow-hidden bg-[#FAF8F5]">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fillOpacity='1' fillRule='evenodd'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative max-w-4xl mx-auto text-center">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
              Free Calculator
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium text-[#1a1f1a] mb-6 leading-tight">
              Home Sale Calculator: Cash Offer vs. Realtor
            </h1>
            <p className="text-xl text-[#1a1f1a]/70 mb-4 max-w-3xl mx-auto">
              See your estimated net proceeds side by side. Should you sell with a realtor or accept a cash offer? Enter your property details below.
            </p>
          </div>
        </section>

        {/* CALCULATOR SECTION */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Input Form */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 md:p-8 border border-[#1a1f1a]/5 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#008a29]/10 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-[#008a29]" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-medium text-[#1a1f1a]">Enter Your Property Details</h2>
                  <p className="text-sm text-[#1a1f1a]/60">All fields help us calculate your estimated proceeds</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Home Value Input */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1f1a] mb-2">
                    Estimated Home Value <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a1f1a]/40" />
                    <input
                      type="text"
                      value={homeValue}
                      onChange={(e) => setHomeValue(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="280,000"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-2 focus:ring-[#008a29]/20 outline-none transition-all text-lg"
                    />
                  </div>
                  <p className="mt-1.5 text-sm text-[#1a1f1a]/50 flex items-start gap-1">
                    <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    What do you think your home is worth in good, move-in-ready condition?
                  </p>
                </div>

                {/* Repair Costs Input */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1f1a] mb-2">
                    Estimated Repair Costs <span className="text-red-500">*</span>
                  </label>

                  {/* Quick-select buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                    {repairOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleRepairOption(option.value)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedRepairOption === option.value
                            ? 'bg-[#008a29] text-white'
                            : 'bg-white border border-[#1a1f1a]/10 text-[#1a1f1a]/70 hover:border-[#008a29]/30'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a1f1a]/40" />
                    <input
                      type="text"
                      value={repairCosts}
                      onChange={(e) => handleRepairInput(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="0"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-2 focus:ring-[#008a29]/20 outline-none transition-all text-lg"
                    />
                  </div>
                  <p className="mt-1.5 text-sm text-[#1a1f1a]/50 flex items-start gap-1">
                    <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    How much would it cost to make your home move-in ready? Include roof, foundation, HVAC, cosmetic updates, etc.
                  </p>
                </div>

                {/* County Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1f1a] mb-2">
                    PA County (Optional)
                  </label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-2 focus:ring-[#008a29]/20 outline-none transition-all text-lg bg-white"
                  >
                    {paCounties.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline Radio Buttons */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1f1a] mb-3">
                    Timeline Flexibility (Optional)
                  </label>
                  <div className="space-y-2">
                    {timelineOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          timeline === option.value
                            ? 'border-[#008a29] bg-[#008a29]/5'
                            : 'border-[#1a1f1a]/10 hover:border-[#008a29]/30'
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeline"
                          value={option.value}
                          checked={timeline === option.value}
                          onChange={(e) => setTimeline(e.target.value)}
                          className="w-4 h-4 text-[#008a29] focus:ring-[#008a29]"
                        />
                        <span className="text-[#1a1f1a]/80">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculate}
                  className="w-full py-4 bg-[#008a29] hover:bg-[#007a24] text-white font-semibold text-lg rounded-full shadow-lg shadow-[#008a29]/25 transition-all hover:shadow-xl hover:shadow-[#008a29]/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate My Net Proceeds
                </button>
              </div>
            </div>

            {/* Results Section */}
            {showResults && results && (
              <div ref={resultsRef} className="scroll-mt-32">
                <div className="text-center mb-8">
                  <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">
                    Your Results
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                    Estimated Net Proceeds Comparison
                  </h2>
                </div>

                {/* Results Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Traditional Sale Card */}
                  <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/10 shadow-lg">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1a1f1a]/10">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Home className="w-5 h-5 text-gray-600" />
                      </div>
                      <h3 className="font-serif text-lg font-medium text-[#1a1f1a]">Traditional Sale with Realtor</h3>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-[#1a1f1a]/70">Starting price:</span>
                        <span className="font-medium">${results.traditional.startingPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Repairs needed:</span>
                        <span>-${results.traditional.repairs.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Agent commission (5.81%):</span>
                        <span>-${results.traditional.commission.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Seller closing costs (~2%):</span>
                        <span>-${results.traditional.closingCosts.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Carrying costs ({results.traditional.timelineMonths}):</span>
                        <span>-${results.traditional.carryingCosts.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#1a1f1a]/10">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-[#1a1f1a]">Your estimated net:</span>
                        <span className="text-2xl font-bold text-[#1a1f1a]">
                          <AnimatedNumber value={results.traditional.netProceeds} />
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-[#1a1f1a]/60">
                          <span>Estimated timeline:</span>
                          <span>{results.traditional.timelineMonths}</span>
                        </div>
                        <div className="flex justify-between text-[#1a1f1a]/60">
                          <span>Out-of-pocket before closing:</span>
                          <span>${results.traditional.outOfPocket.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[#1a1f1a]/60">
                          <span>Risk of deal falling through:</span>
                          <span>15-20%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cash Offer Card */}
                  <div className="bg-[#008a29]/5 rounded-2xl p-6 border-2 border-[#008a29]/30 shadow-lg relative">
                    <div className="absolute -top-3 right-4 bg-[#008a29] text-white text-xs font-bold px-3 py-1 rounded-full">
                      GUARANTEED
                    </div>

                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#008a29]/20">
                      <div className="w-10 h-10 bg-[#008a29]/20 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-[#008a29]" />
                      </div>
                      <h3 className="font-serif text-lg font-medium text-[#1a1f1a]">ClearEdge Cash Offer</h3>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-[#1a1f1a]/70">Cash offer estimate:</span>
                        <span className="font-medium">${results.cash.offer.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[#008a29]">
                        <span>Repairs needed:</span>
                        <span>$0</span>
                      </div>
                      <div className="flex justify-between text-[#008a29]">
                        <span>Agent commission:</span>
                        <span>$0</span>
                      </div>
                      <div className="flex justify-between text-[#008a29]">
                        <span>Closing costs:</span>
                        <span>$0 (we cover them)</span>
                      </div>
                      <div className="flex justify-between text-[#008a29]">
                        <span>Carrying costs:</span>
                        <span>$0</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#008a29]/20">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-[#1a1f1a]">Your estimated net:</span>
                        <span className="text-2xl font-bold text-[#008a29]">
                          <AnimatedNumber value={results.cash.netProceeds} />
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-[#1a1f1a]/60">
                          <span>Estimated timeline:</span>
                          <span className="text-[#008a29] font-medium">14-30 days</span>
                        </div>
                        <div className="flex justify-between text-[#1a1f1a]/60">
                          <span>Out-of-pocket:</span>
                          <span className="text-[#008a29] font-medium">$0</span>
                        </div>
                        <div className="flex justify-between text-[#1a1f1a]/60">
                          <span>Risk of deal falling through:</span>
                          <span className="text-[#008a29] font-medium">0% (cash, no financing)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Difference Summary */}
                <div className="bg-[#1a1f1a] text-white rounded-2xl p-6 mb-8 text-center">
                  <p className="text-lg">
                    <span className="font-bold text-2xl">${results.difference.toLocaleString()}</span>{' '}
                    {results.cashBetter ? 'more' : 'less'} with the{' '}
                    <span className="font-semibold">{results.cashBetter ? 'cash' : 'traditional'}</span> route
                  </p>
                </div>

                {/* Dynamic Context Message */}
                <div className="mb-8">
                  {getDynamicMessage()}
                </div>

                {/* CTA */}
                <div className="bg-[#FAF8F5] rounded-2xl p-6 md:p-8 text-center">
                  <h3 className="font-serif text-2xl font-medium text-[#1a1f1a] mb-4">
                    Want to see your REAL number?
                  </h3>
                  <p className="text-[#1a1f1a]/70 mb-6 max-w-xl mx-auto">
                    This calculator uses estimates. Get an actual no-obligation cash offer from ClearEdge — we&apos;ll walk you through the exact math for your property.
                  </p>
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center justify-center gap-2 bg-[#008a29] text-white px-8 py-4 rounded-full font-medium hover:bg-[#007a24] transition-all shadow-lg shadow-[#008a29]/20 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Get Your Real Cash Offer
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-[#1a1f1a]/50 text-center">
                This calculator provides estimates based on PA state averages and general market data. Your actual results will vary based on property condition, local market conditions, and other factors. ClearEdge&apos;s actual cash offer may be higher or lower than the estimate shown here. For an accurate number, request a no-obligation offer.
              </p>
            </div>
          </div>
        </section>

        {/* HOW WE BUILT THIS CALCULATOR */}
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">
                Our Methodology
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                How We Built This Calculator
              </h2>
            </div>

            <div className="space-y-6 text-[#1a1f1a]/70">
              <p>
                This calculator uses real Pennsylvania market data to estimate your net proceeds. Here&apos;s where our numbers come from:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border border-[#1a1f1a]/5">
                  <h3 className="font-semibold text-[#1a1f1a] mb-2">Agent Commission: 5.81%</h3>
                  <p className="text-sm">PA state average per <a href="https://www.nar.realtor/" target="_blank" rel="noopener noreferrer" className="text-[#008a29] hover:underline">Clever Real Estate / Real Estate Witch 2025 survey</a></p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#1a1f1a]/5">
                  <h3 className="font-semibold text-[#1a1f1a] mb-2">Seller Closing Costs: ~2%</h3>
                  <p className="text-sm">Includes title insurance, transfer taxes, recording fees — PA average</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#1a1f1a]/5">
                  <h3 className="font-semibold text-[#1a1f1a] mb-2">Carrying Costs: ~1% annually</h3>
                  <p className="text-sm">Based on average mortgage, insurance, and tax rates for Eastern PA</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#1a1f1a]/5">
                  <h3 className="font-semibold text-[#1a1f1a] mb-2">Cash Offer Range: 70-85%</h3>
                  <p className="text-sm">Industry standard for legitimate cash buyers, adjusted by property condition</p>
                </div>
              </div>

              <p>
                For a detailed breakdown of how cash buyers compare to realtors, see our <Link href="/cash-buyer-vs-realtor" className="text-[#008a29] hover:underline">full comparison page</Link>. To learn more about vetting cash buyers, read our guide on <Link href="/are-cash-home-buyers-legit" className="text-[#008a29] hover:underline">whether cash home buyers are legit</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <V0FAQ
          faqs={faqs}
          title="Calculator FAQ"
          subtitle="Common questions about this calculator and getting a real offer."
          sectionBg="white"
        />

        {/* Closing SEO - Sage gradient */}
        <section className="py-4 md:py-6 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[#1a2e1a] font-medium">
              This calculator gives you an estimate. For an exact number you can take to the bank, request a no-obligation cash offer from ClearEdge. We&apos;ll show you every line of the calculation — <Link href="/how-it-works" className="text-[#008a29] hover:underline">see how our process works</Link>.
            </p>
          </div>
        </section>

        {/* LEAD FORM */}
        <V0LeadForm />

        <PostSubmissionSteps bgColor="white" />

        <V0Footer />
      </main>
    </>
  )
}
