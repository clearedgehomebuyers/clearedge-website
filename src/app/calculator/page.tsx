"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Calculator, DollarSign, Home, ArrowRight, HelpCircle, ChevronDown, Check } from 'lucide-react'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { V0LeadForm } from '@/components/v0-lead-form'
import { V0FAQ } from '@/components/v0-faq'

// PA Counties with transfer tax rates AND property tax rates
const paCounties = [
  { value: '', label: 'Select your county', transferTaxRate: 0.01, propertyTaxRate: 0.025 },
  { value: 'lackawanna', label: 'Lackawanna County', transferTaxRate: 0.01, propertyTaxRate: 0.028 },
  { value: 'luzerne', label: 'Luzerne County', transferTaxRate: 0.01, propertyTaxRate: 0.029 },
  { value: 'lehigh', label: 'Lehigh County', transferTaxRate: 0.01, propertyTaxRate: 0.025 },
  { value: 'northampton', label: 'Northampton County', transferTaxRate: 0.01, propertyTaxRate: 0.024 },
  { value: 'monroe', label: 'Monroe County', transferTaxRate: 0.01, propertyTaxRate: 0.022 },
  { value: 'schuylkill', label: 'Schuylkill County', transferTaxRate: 0.01, propertyTaxRate: 0.027 },
  { value: 'berks', label: 'Berks County', transferTaxRate: 0.01, propertyTaxRate: 0.026 },
  { value: 'carbon', label: 'Carbon County', transferTaxRate: 0.01, propertyTaxRate: 0.025 },
  { value: 'pike', label: 'Pike County', transferTaxRate: 0.0125, propertyTaxRate: 0.018 },
  { value: 'wayne', label: 'Wayne County', transferTaxRate: 0.01, propertyTaxRate: 0.020 },
  { value: 'wyoming', label: 'Wyoming County', transferTaxRate: 0.01, propertyTaxRate: 0.023 },
  { value: 'columbia', label: 'Columbia County', transferTaxRate: 0.01, propertyTaxRate: 0.024 },
  { value: 'susquehanna', label: 'Susquehanna County', transferTaxRate: 0.005, propertyTaxRate: 0.021 },
]

// Repair categories with checkbox items
const repairCategories = [
  {
    id: 'structure',
    name: 'Structure / Foundation',
    items: [
      { id: 'foundation-cracks', name: 'Foundation cracks or bowing walls', cost: 10000, range: '$5,000–$15,000' },
      { id: 'settling', name: 'Settling / sinking (needs piers)', cost: 18000, range: '$10,000–$30,000' },
      { id: 'waterproofing', name: 'Basement waterproofing', cost: 7000, range: '$3,000–$12,000' },
    ],
  },
  {
    id: 'roof',
    name: 'Roof',
    items: [
      { id: 'roof-full', name: 'Full roof replacement', cost: 12500, range: '$8,000–$20,000' },
      { id: 'roof-partial', name: 'Partial roof repair / leaks', cost: 3000, range: '$1,500–$5,000' },
    ],
  },
  {
    id: 'hvac',
    name: 'HVAC / Mechanical',
    items: [
      { id: 'furnace', name: 'Furnace / boiler replacement', cost: 6500, range: '$3,800–$10,000' },
      { id: 'ac', name: 'Central AC replacement', cost: 5500, range: '$3,300–$7,800' },
      { id: 'hvac-full', name: 'Full HVAC system (furnace + AC)', cost: 10000, range: '$5,000–$14,000' },
      { id: 'water-heater', name: 'Water heater', cost: 1800, range: '$1,200–$2,800' },
    ],
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    items: [
      { id: 'plumbing-major', name: 'Major plumbing overhaul (pipe replacement)', cost: 8500, range: '$5,000–$15,000' },
      { id: 'sewer', name: 'Sewer line replacement', cost: 5500, range: '$3,000–$8,000' },
      { id: 'plumbing-minor', name: 'Minor plumbing repairs', cost: 1500, range: '$500–$2,500' },
    ],
  },
  {
    id: 'electrical',
    name: 'Electrical',
    items: [
      { id: 'rewiring', name: 'Full rewiring + panel upgrade', cost: 13000, range: '$8,000–$20,000' },
      { id: 'panel', name: 'Panel upgrade only (100 to 200 amp)', cost: 2500, range: '$1,300–$4,000' },
      { id: 'electrical-minor', name: 'Minor electrical work', cost: 1200, range: '$500–$2,000' },
    ],
  },
  {
    id: 'interior',
    name: 'Interior',
    items: [
      { id: 'kitchen-full', name: 'Kitchen remodel (full)', cost: 25000, range: '$30,000–$65,000' },
      { id: 'kitchen-cosmetic', name: 'Kitchen update (cosmetic)', cost: 12000, range: '$8,000–$18,000' },
      { id: 'bathroom-full', name: 'Bathroom remodel (full, per bathroom)', cost: 15000, range: '$12,000–$35,000' },
      { id: 'bathroom-cosmetic', name: 'Bathroom update (cosmetic, per bathroom)', cost: 6000, range: '$4,000–$10,000' },
      { id: 'flooring', name: 'Flooring throughout', cost: 6000, range: '$3,000–$10,000' },
      { id: 'paint', name: 'Paint throughout (interior)', cost: 3500, range: '$2,000–$5,000' },
      { id: 'drywall', name: 'Drywall / plaster repair', cost: 2500, range: '$1,000–$4,000' },
    ],
  },
  {
    id: 'exterior',
    name: 'Exterior',
    items: [
      { id: 'siding', name: 'Siding replacement', cost: 10000, range: '$6,000–$16,000' },
      { id: 'windows', name: 'Window replacement (all)', cost: 13000, range: '$8,000–$20,000' },
      { id: 'concrete', name: 'Concrete / driveway', cost: 3500, range: '$2,000–$6,000' },
      { id: 'landscaping', name: 'Landscaping / grading / drainage', cost: 2500, range: '$1,000–$5,000' },
    ],
  },
  {
    id: 'environmental',
    name: 'Environmental / Code',
    items: [
      { id: 'mold', name: 'Mold remediation', cost: 5000, range: '$2,000–$10,000' },
      { id: 'asbestos', name: 'Asbestos abatement', cost: 8000, range: '$3,000–$15,000' },
      { id: 'lead', name: 'Lead paint remediation', cost: 5000, range: '$2,000–$8,000' },
      { id: 'code', name: 'Code violation remediation', cost: 5000, range: '$2,000–$10,000' },
      { id: 'septic', name: 'Septic system replacement', cost: 10000, range: '$5,000–$15,000' },
    ],
  },
]

// Timeline options
const timelineOptions = [
  { value: 'asap', label: 'Need to sell ASAP (under 30 days)', monthsAdjust: -1 },
  { value: 'flexible', label: 'Some flexibility (1-3 months)', monthsAdjust: 0 },
  { value: 'no-rush', label: 'No rush (3+ months)', monthsAdjust: 1 },
]

// FAQ data
const faqs = [
  {
    question: 'How accurate is this home sale calculator?',
    answer: "Our calculator uses PA-regulated title insurance rates, county-specific transfer tax data, and current contractor pricing from sources like HomeAdvisor and Angi. It provides a realistic estimate, but your actual costs may vary based on your specific property, negotiations, and market conditions. For your exact cash offer number, request a free, no-obligation offer from ClearEdge.",
  },
  {
    question: 'Why are traditional sale costs so high?',
    answer: "Most sellers only think about agent commissions. But commissions are just the start — transfer taxes, title insurance, settlement fees, inspection concessions, carrying costs, and repairs all add up. On a typical Eastern PA home, total selling costs run 8–12% of the sale price before repairs.",
  },
  {
    question: 'How does ClearEdge calculate cash offers?',
    answer: "We evaluate your home's market value and condition, then make an offer based on the property's as-is state. Our offer accounts for the repairs we'll need to make and our operating costs. We cover all closing costs, commissions, and fees — the number we quote is the number you receive at closing.",
  },
  {
    question: 'Do I need to make repairs before selling to ClearEdge?',
    answer: "No. We buy properties in any condition — foundation issues, roof damage, outdated systems, code violations, environmental concerns. You don't need to fix, clean, or update anything.",
  },
  {
    question: 'What if the traditional route nets me more money?',
    answer: "Then you should list with an agent, and we'll tell you that. We built this calculator to help you make the best decision for your situation — not to pressure you into a cash sale. If the numbers say listing is better for you, that's the right move.",
  },
  {
    question: 'How do the repair cost estimates work?',
    answer: "Our repair estimates use current Pennsylvania contractor pricing from HomeAdvisor, Angi, This Old House, and PA-based contractors. We use the midpoint of published price ranges — not the high end — to provide realistic estimates. Your actual costs may be higher or lower depending on your property's specific conditions and the contractors you hire.",
  },
]

// Format number with commas as user types
function formatWithCommas(value: string, maxDigits: number): string {
  const numericOnly = value.replace(/[^0-9]/g, '')
  const limited = numericOnly.slice(0, maxDigits)
  return limited.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Calculate PA-regulated title insurance
function calculateTitleInsurance(homeValue: number): number {
  if (homeValue <= 100000) return homeValue * 0.00575
  if (homeValue <= 500000) return (100000 * 0.00575) + ((homeValue - 100000) * 0.005)
  if (homeValue <= 1000000) return (100000 * 0.00575) + (400000 * 0.005) + ((homeValue - 500000) * 0.0045)
  return (100000 * 0.00575) + (400000 * 0.005) + (500000 * 0.0045) + ((homeValue - 1000000) * 0.0035)
}

// Get cash offer percentage based on repair total
function getCashOfferPercent(totalRepairs: number): number {
  if (totalRepairs === 0) return 0.78
  if (totalRepairs <= 10000) return 0.74
  if (totalRepairs <= 25000) return 0.72
  if (totalRepairs <= 40000) return 0.70
  if (totalRepairs <= 60000) return 0.68
  return 0.65
}

// Get months on market based on repair total
function getMonthsOnMarket(totalRepairs: number): number {
  if (totalRepairs === 0) return 3
  if (totalRepairs <= 10000) return 4
  if (totalRepairs <= 25000) return 5
  if (totalRepairs <= 40000) return 6
  return 7
}

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

  return <span>{prefix}{displayValue.toLocaleString()}</span>
}

export default function CalculatorPage() {
  // Form state
  const [homeValue, setHomeValue] = useState('')
  const [county, setCounty] = useState('')
  const [timeline, setTimeline] = useState('flexible')
  const [customRepairCost, setCustomRepairCost] = useState('')

  // Repair checkboxes state
  const [checkedRepairs, setCheckedRepairs] = useState<Set<string>>(new Set())
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  // Validation state
  const [countyError, setCountyError] = useState(false)
  const [homeValueError, setHomeValueError] = useState(false)

  // Results state
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{
    traditional: {
      salePrice: number
      repairs: number
      commission: number
      transferTax: number
      titleInsurance: number
      settlementFees: number
      inspectionConcessions: number
      warrantyCompliance: number
      carryingCosts: number
      carryingMonths: number
      netProceeds: number
      countyName: string
    }
    cash: {
      offer: number
      netProceeds: number
    }
    difference: number
    cashBetter: boolean
  } | null>(null)

  const resultsRef = useRef<HTMLDivElement>(null)

  // Calculate total from checked repairs
  const checkedRepairsTotal = Array.from(checkedRepairs).reduce((sum, itemId) => {
    for (const category of repairCategories) {
      const item = category.items.find(i => i.id === itemId)
      if (item) return sum + item.cost
    }
    return sum
  }, 0)

  // Parse custom amount
  const customAmount = parseFloat(customRepairCost.replace(/[^0-9.]/g, '')) || 0

  // Grand total repairs
  const totalRepairs = checkedRepairsTotal + customAmount

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  // Toggle repair checkbox
  const toggleRepair = (itemId: string) => {
    const newChecked = new Set(checkedRepairs)
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId)
    } else {
      newChecked.add(itemId)
    }
    setCheckedRepairs(newChecked)
  }

  // Get count of checked items in category
  const getCategoryCheckedCount = (category: typeof repairCategories[0]) => {
    return category.items.filter(item => checkedRepairs.has(item.id)).length
  }

  // Calculate results
  const calculate = () => {
    const homeVal = parseFloat(homeValue.replace(/[^0-9.]/g, '')) || 0

    // Validation
    let hasError = false
    if (homeVal <= 0) {
      setHomeValueError(true)
      hasError = true
    } else {
      setHomeValueError(false)
    }

    if (!county) {
      setCountyError(true)
      hasError = true
    } else {
      setCountyError(false)
    }

    if (hasError) return

    const selectedCounty = paCounties.find(c => c.value === county)!
    const repairs = totalRepairs

    // Traditional sale calculation
    const agentCommission = homeVal * 0.0581
    const transferTax = homeVal * selectedCounty.transferTaxRate
    const titleInsurance = calculateTitleInsurance(homeVal)
    const settlementFees = 1575 // Fixed amount
    const inspectionConcessions = homeVal * 0.015
    const warrantyCompliance = 850 // Fixed amount

    // Carrying costs calculation
    const baseMonths = getMonthsOnMarket(repairs)
    const timelineAdjust = timelineOptions.find(t => t.value === timeline)?.monthsAdjust || 0
    const carryingMonths = Math.max(2, baseMonths + timelineAdjust)

    // Monthly carrying costs
    const monthlyMortgage = (homeVal * 0.70 * 0.065) / 12 // 70% LTV, 6.5% rate
    const monthlyPropertyTax = (homeVal * selectedCounty.propertyTaxRate) / 12
    const monthlyInsurance = 135
    const monthlyUtilities = 225
    const monthlyMaintenance = 100
    const monthlyCarrying = monthlyMortgage + monthlyPropertyTax + monthlyInsurance + monthlyUtilities + monthlyMaintenance
    const carryingCosts = monthlyCarrying * carryingMonths

    const traditionalNet = homeVal - repairs - agentCommission - transferTax - titleInsurance - settlementFees - inspectionConcessions - warrantyCompliance - carryingCosts

    // Cash offer calculation
    const cashPercent = getCashOfferPercent(repairs)
    const cashOffer = homeVal * cashPercent
    const cashNet = cashOffer

    const difference = traditionalNet - cashNet
    const cashBetter = difference < 0

    setResults({
      traditional: {
        salePrice: homeVal,
        repairs,
        commission: Math.round(agentCommission),
        transferTax: Math.round(transferTax),
        titleInsurance: Math.round(titleInsurance),
        settlementFees,
        inspectionConcessions: Math.round(inspectionConcessions),
        warrantyCompliance,
        carryingCosts: Math.round(carryingCosts),
        carryingMonths,
        netProceeds: Math.round(traditionalNet),
        countyName: selectedCounty.label,
      },
      cash: {
        offer: Math.round(cashOffer),
        netProceeds: Math.round(cashOffer),
      },
      difference: Math.round(Math.abs(difference)),
      cashBetter,
    })

    setShowResults(true)

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_used', {
        event_category: 'Calculator',
        event_label: 'Cost Comparison Calculator',
        home_value: homeVal,
        repair_costs: repairs,
        county: county,
      })
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

  // Dynamic context message
  const getDynamicMessage = () => {
    if (!results) return null

    const diff = results.difference
    const repairs = results.traditional.repairs
    const months = results.traditional.carryingMonths

    if (!results.cashBetter && diff >= 15000) {
      return (
        <div className="bg-[#FAF8F5] border-l-4 border-[#1a1f1a]/30 p-6 rounded-r-2xl">
          <p className="text-[#1a1f1a]/80">
            Based on these estimates, listing with a local agent may net you more — and that&apos;s okay. We always recommend the option that puts the most money in your pocket. But keep in mind: this estimate assumes everything goes perfectly. No price reductions, no second round of negotiations, no deal falling through. If certainty and speed matter to you, <button onClick={scrollToForm} className="text-[#008a29] hover:underline font-medium">get your real cash offer →</button>
          </p>
        </div>
      )
    } else if (!results.cashBetter && diff >= 5000) {
      return (
        <div className="bg-[#FAF8F5] border-l-4 border-yellow-500 p-6 rounded-r-2xl">
          <p className="text-[#1a1f1a]/80">
            The numbers are closer than most sellers expect. The traditional route shows a slightly higher net — but that comes with {months} months of carrying costs{repairs > 0 && `, $${repairs.toLocaleString()} in upfront repair spending`}, and a 15–20% chance the deal falls through entirely. Many sellers in this situation choose the certainty of a guaranteed cash offer. <button onClick={scrollToForm} className="text-[#008a29] hover:underline font-medium">Get your real cash offer →</button>
          </p>
        </div>
      )
    } else {
      return (
        <div className="bg-[#008a29]/5 border-l-4 border-[#008a29] p-6 rounded-r-2xl">
          <p className="text-[#1a1f1a]/80">
            At this repair level, a cash sale likely puts more money in your pocket — faster, with zero out-of-pocket costs and zero risk. The traditional route&apos;s commissions, closing costs, and carrying costs eat into what would otherwise be a higher sale price. <button onClick={scrollToForm} className="text-[#008a29] hover:underline font-medium">Get your real cash offer →</button>
          </p>
        </div>
      )
    }
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
                name: 'Pennsylvania Home Sale Calculator — Compare Net Proceeds',
                description: 'Free Pennsylvania home sale calculator. Compare your net proceeds from a traditional sale vs. cash offer with county-specific closing costs, itemized fees, and real PA contractor repair pricing.',
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
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.clearedgehomebuyers.com' },
                  { '@type': 'ListItem', position: 2, name: 'Sale Calculator', item: 'https://www.clearedgehomebuyers.com/calculator' },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://www.clearedgehomebuyers.com/calculator/#faq',
                mainEntity: faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: { '@type': 'Answer', text: faq.answer },
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
          <div className="relative max-w-4xl mx-auto text-center">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
              Free Calculator
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium text-[#1a1f1a] mb-6 leading-tight">
              How Much Will You Actually Net From Selling Your Home?
            </h1>
            <p className="text-xl text-[#1a1f1a]/70 mb-4 max-w-3xl mx-auto">
              Compare your estimated net proceeds from a traditional sale vs. a cash offer — with county-specific closing costs, itemized fees, and real Pennsylvania repair pricing.
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
                  <p className="text-sm text-[#1a1f1a]/60">Required fields are marked with *</p>
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
                      inputMode="numeric"
                      value={homeValue}
                      onChange={(e) => {
                        setHomeValue(formatWithCommas(e.target.value, 8))
                        setHomeValueError(false)
                      }}
                      placeholder="280,000"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${homeValueError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-[#008a29]/20'} focus:ring-2 outline-none transition-all text-lg`}
                    />
                  </div>
                  {homeValueError && (
                    <p className="mt-1.5 text-sm text-red-500">Please enter your estimated home value.</p>
                  )}
                  <p className="mt-1.5 text-sm text-[#1a1f1a]/50 flex items-start gap-1">
                    <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    What would your home be worth in move-in-ready condition?
                  </p>
                </div>

                {/* County Dropdown - Required */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1f1a] mb-2">
                    PA County <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={county}
                    onChange={(e) => {
                      setCounty(e.target.value)
                      setCountyError(false)
                    }}
                    className={`w-full px-4 py-3 rounded-xl border ${countyError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-[#008a29]/20'} focus:ring-2 outline-none transition-all text-lg bg-white`}
                  >
                    {paCounties.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  {countyError && (
                    <p className="mt-1.5 text-sm text-red-500">Please select your county for accurate local pricing.</p>
                  )}
                  <p className="mt-1.5 text-sm text-[#1a1f1a]/50 flex items-start gap-1">
                    <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    Selecting your county gives you a more accurate estimate based on local transfer tax rates.
                  </p>
                </div>

                {/* Repair Estimator */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1f1a] mb-2">
                    Repair Estimator
                  </label>
                  <p className="text-sm text-[#1a1f1a]/60 mb-4">
                    Select the repairs your home needs. Prices are PA averages from HomeAdvisor, Angi, and local contractors.
                  </p>

                  {/* Repair Categories Accordion */}
                  <div className="space-y-2 mb-4">
                    {repairCategories.map((category) => {
                      const isExpanded = expandedCategories.has(category.id)
                      const checkedCount = getCategoryCheckedCount(category)

                      return (
                        <div key={category.id} className="border border-[#1a1f1a]/10 rounded-xl overflow-hidden bg-white">
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-[#FAF8F5] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-[#1a1f1a]">{category.name}</span>
                              {checkedCount > 0 && (
                                <span className="bg-[#008a29] text-white text-xs px-2 py-0.5 rounded-full">
                                  {checkedCount} selected
                                </span>
                              )}
                            </div>
                            <ChevronDown className={`w-5 h-5 text-[#1a1f1a]/40 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>

                          {isExpanded && (
                            <div className="border-t border-[#1a1f1a]/10 p-4 space-y-3">
                              {category.items.map((item) => (
                                <label
                                  key={item.id}
                                  className="flex items-start gap-3 cursor-pointer group"
                                >
                                  <div className="flex-shrink-0 mt-0.5">
                                    <div
                                      onClick={(e) => {
                                        e.preventDefault()
                                        toggleRepair(item.id)
                                      }}
                                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                        checkedRepairs.has(item.id)
                                          ? 'bg-[#008a29] border-[#008a29]'
                                          : 'border-[#1a1f1a]/20 group-hover:border-[#008a29]/50'
                                      }`}
                                    >
                                      {checkedRepairs.has(item.id) && (
                                        <Check className="w-3.5 h-3.5 text-white" />
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <span className="text-[#1a1f1a] group-hover:text-[#008a29] transition-colors">
                                        {item.name}
                                      </span>
                                      <span className="font-semibold text-[#1a1f1a] whitespace-nowrap">
                                        ${item.cost.toLocaleString()}
                                      </span>
                                    </div>
                                    <span className="text-xs text-[#1a1f1a]/50">
                                      PA range: {item.range}
                                    </span>
                                  </div>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Running Repair Total */}
                  <div className="bg-white border border-[#1a1f1a]/10 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-[#1a1f1a]">Selected Repairs Total:</span>
                      <span className="text-xl font-bold text-[#1a1f1a]">
                        ${checkedRepairsTotal.toLocaleString()}
                      </span>
                    </div>

                    {/* Custom Amount Input */}
                    <div>
                      <label className="block text-sm text-[#1a1f1a]/70 mb-2">
                        Have other repair costs? Add a custom amount:
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a1f1a]/40" />
                        <input
                          type="text"
                          inputMode="numeric"
                          value={customRepairCost}
                          onChange={(e) => setCustomRepairCost(formatWithCommas(e.target.value, 6))}
                          placeholder="0"
                          className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-[#1a1f1a]/10 focus:border-[#008a29] focus:ring-2 focus:ring-[#008a29]/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Grand Total */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#1a1f1a]/10">
                      <span className="font-semibold text-[#1a1f1a]">Grand Total Repairs:</span>
                      <span className="text-2xl font-bold text-[#008a29]">
                        ${totalRepairs.toLocaleString()}
                      </span>
                    </div>
                  </div>
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

                    <div className="space-y-2.5 mb-6 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#1a1f1a]/70">Sale price:</span>
                        <span className="font-medium">${results.traditional.salePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Repairs:</span>
                        <span>-${results.traditional.repairs.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Agent commissions (5.81%):</span>
                        <span>-${results.traditional.commission.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Transfer tax ({results.traditional.countyName}):</span>
                        <span>-${results.traditional.transferTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Title insurance:</span>
                        <span>-${results.traditional.titleInsurance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Settlement &amp; recording fees:</span>
                        <span>-${results.traditional.settlementFees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Est. inspection concessions (1.5%):</span>
                        <span>-${results.traditional.inspectionConcessions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Home warranty + compliance:</span>
                        <span>-${results.traditional.warrantyCompliance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Carrying costs ({results.traditional.carryingMonths} months):</span>
                        <span>-${results.traditional.carryingCosts.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#1a1f1a]/10">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-[#1a1f1a]">YOUR ESTIMATED NET:</span>
                        <span className="text-2xl font-bold text-[#1a1f1a]">
                          <AnimatedNumber value={results.traditional.netProceeds} />
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-[#1a1f1a]/60">
                          <span>Timeline:</span>
                          <span>{results.traditional.carryingMonths} months</span>
                        </div>
                        <div className="flex justify-between text-[#1a1f1a]/60">
                          <span>Out of pocket upfront:</span>
                          <span>${results.traditional.repairs.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[#1a1f1a]/60">
                          <span>Risk of deal falling through:</span>
                          <span>15–20%</span>
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

                    <div className="space-y-2.5 mb-6 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#1a1f1a]/70">ClearEdge cash offer:</span>
                        <span className="font-medium">${results.cash.offer.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[#008a29]">
                        <span>Repairs:</span>
                        <span>$0</span>
                      </div>
                      <div className="flex justify-between text-[#008a29]">
                        <span>Commissions:</span>
                        <span>$0</span>
                      </div>
                      <div className="flex justify-between text-[#008a29]">
                        <span>Closing costs:</span>
                        <span>$0</span>
                      </div>
                      <div className="flex justify-between text-[#008a29]">
                        <span>Carrying costs:</span>
                        <span>$0</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#008a29]/20">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-[#1a1f1a]">YOUR ESTIMATED NET:</span>
                        <span className="text-2xl font-bold text-[#008a29]">
                          <AnimatedNumber value={results.cash.netProceeds} />
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-[#1a1f1a]/60">
                          <span>Timeline:</span>
                          <span className="text-[#008a29] font-medium">14–30 days</span>
                        </div>
                        <div className="flex justify-between text-[#1a1f1a]/60">
                          <span>Out of pocket:</span>
                          <span className="text-[#008a29] font-medium">$0</span>
                        </div>
                        <div className="flex justify-between text-[#1a1f1a]/60">
                          <span>Risk of deal falling through:</span>
                          <span className="text-[#008a29] font-medium">0%</span>
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
                    This calculator gives you an estimate. To get your real number, request a no-obligation cash offer — we&apos;ll explain exactly how we calculated it, and you&apos;ll have 30 days to decide.
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
                This calculator provides estimates based on PA market data and averages. Your actual results will vary based on property condition, negotiations, and market conditions. ClearEdge&apos;s actual cash offer may be higher or lower than the estimate shown. For an accurate number, request a no-obligation offer.
              </p>
            </div>
          </div>
        </section>

        {/* WHERE DO THESE NUMBERS COME FROM */}
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">
                Our Methodology
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                Where Do These Numbers Come From?
              </h2>
            </div>
            <div className="space-y-6 text-[#1a1f1a]/70">
              <p>
                This calculator uses real Pennsylvania data — PA-regulated title insurance rates, county-specific transfer taxes, current contractor pricing from sources like HomeAdvisor, Angi, This Old House, and PA-based contractors.
              </p>
              <p>
                ClearEdge built this calculator to help homeowners make informed decisions, not to push anyone toward a particular option. If the numbers say listing with an agent makes more sense for your situation, we&apos;ll tell you that.
              </p>
            </div>
          </div>
        </section>

        {/* COSTS MOST SELLERS DON'T EXPECT */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">
                The Full Picture
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                Costs Most Sellers Don&apos;t Expect
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="font-semibold text-[#1a1f1a] text-lg mb-3">Agent Commissions (5.81%)</h3>
                <p className="text-[#1a1f1a]/70">
                  This is the combined PA average for listing agent + buyer&apos;s agent commissions. Even after the 2024 NAR settlement that made buyer&apos;s agent commission technically negotiable, most PA sellers still offer it because homes that don&apos;t attract fewer showings. On a $280,000 home, that&apos;s over $16,000.
                </p>
              </div>

              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="font-semibold text-[#1a1f1a] text-lg mb-3">Transfer Tax (varies by county)</h3>
                <p className="text-[#1a1f1a]/70">
                  PA charges a real estate transfer tax split between buyer and seller. The state portion is 1% (you pay half — 0.5%). Your municipality adds its own local transfer tax on top. This varies by county, which is why we ask for yours. Example: In Lehigh County, your seller portion totals about 1.0% of the sale price.
                </p>
              </div>

              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="font-semibold text-[#1a1f1a] text-lg mb-3">Title Insurance</h3>
                <p className="text-[#1a1f1a]/70">
                  PA title insurance rates are regulated by the state — every title company charges the same rates. The seller typically pays for the owner&apos;s title insurance policy, which protects the buyer&apos;s lender. The rate is tiered: $5.75 per $1,000 on the first $100K, $5.00 per $1,000 from $100K–$500K, and lower rates above that. On a $280,000 home, that&apos;s approximately $1,475.
                </p>
              </div>

              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="font-semibold text-[#1a1f1a] text-lg mb-3">Settlement &amp; Recording Fees (~$1,575)</h3>
                <p className="text-[#1a1f1a]/70">
                  These are the fees charged by the title company and county to process your sale: settlement/closing fee ($650), title search ($300), document preparation ($150), notary ($100), recording fees ($200), and the municipal lien letter ($175) that confirms you have no outstanding water, sewer, trash, or code liens.
                </p>
              </div>

              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="font-semibold text-[#1a1f1a] text-lg mb-3">Post-Inspection Concessions (1.5%)</h3>
                <p className="text-[#1a1f1a]/70">
                  This is the cost most traditional sellers don&apos;t see coming. After a buyer&apos;s home inspector walks through, they almost always find issues and negotiate credits or repairs. In Eastern Pennsylvania — where much of the housing stock dates to the early 1900s — this averages 1.5% of the sale price, and can run 3%+ on older homes. That&apos;s $4,200 on a $280,000 home that wasn&apos;t in your plan.
                </p>
              </div>

              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="font-semibold text-[#1a1f1a] text-lg mb-3">Home Warranty + Compliance (~$850)</h3>
                <p className="text-[#1a1f1a]/70">
                  Buyers in PA frequently request a home warranty ($500), and sellers need to cover a use &amp; occupancy inspection ($150), smoke/CO detector compliance ($100), and pest/termite inspection ($100). Small individually, but they add up.
                </p>
              </div>

              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="font-semibold text-[#1a1f1a] text-lg mb-3">Carrying Costs (while listed)</h3>
                <p className="text-[#1a1f1a]/70">
                  Every month your house sits on the market, you&apos;re paying mortgage principal &amp; interest, property taxes, homeowner&apos;s insurance, utilities (must stay on for showings), and lawn/maintenance. For a $280,000 home in Lehigh County, that&apos;s approximately $1,720 per month. If your home needs repairs before listing, add 1–3 months of repair time before you even hit the market.
                </p>
              </div>

              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="font-semibold text-[#1a1f1a] text-lg mb-3">Repair Costs</h3>
                <p className="text-[#1a1f1a]/70">
                  The repair estimates in our calculator use current Pennsylvania contractor pricing sourced from HomeAdvisor, Angi, This Old House, and PA-based contractors. We use the midpoint of each range — not the high end — to give you a realistic (not inflated) estimate of what these repairs actually cost homeowners in Eastern PA.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE CALCULATE CASH OFFER */}
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">
                Transparent Pricing
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                How We Calculate the ClearEdge Cash Offer
              </h2>
            </div>
            <div className="space-y-6 text-[#1a1f1a]/70">
              <p>
                ClearEdge&apos;s offer is a percentage of your home&apos;s market value. That percentage adjusts based on the condition of the property — homes needing more work receive a lower percentage because ClearEdge takes on all repair costs and risk.
              </p>
              <p>
                The offer covers ALL closing costs, commissions, and fees. The number you see is the number you walk away with.
              </p>
              <div className="bg-white border-l-4 border-[#008a29] p-6 rounded-r-2xl">
                <p className="text-[#1a1f1a]/80">
                  This calculator gives you an estimate. To get your real number, request a no-obligation cash offer — we&apos;ll explain exactly how we calculated it, and you&apos;ll have 30 days to decide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT THIS CALCULATOR CAN'T ACCOUNT FOR */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-3 block">
                Honest Limitations
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                What This Calculator Can&apos;t Account For
              </h2>
            </div>
            <div className="space-y-4 text-[#1a1f1a]/70">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#008a29] rounded-full mt-2 flex-shrink-0" />
                <p><strong className="text-[#1a1f1a]">Price reductions:</strong> 30–40% of PA listings reduce price at least once. This calculator assumes you sell at full asking price.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#008a29] rounded-full mt-2 flex-shrink-0" />
                <p><strong className="text-[#1a1f1a]">Deal fall-through:</strong> 15–20% of traditional sales collapse after going under contract (financing falls through, inspection issues, buyer gets cold feet). This calculator assumes a clean close.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#008a29] rounded-full mt-2 flex-shrink-0" />
                <p><strong className="text-[#1a1f1a]">Multiple rounds of negotiation:</strong> Buyers often negotiate twice — once on price, once after inspection. This calculator only accounts for one round of inspection concessions.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#008a29] rounded-full mt-2 flex-shrink-0" />
                <p><strong className="text-[#1a1f1a]">Seasonal timing:</strong> Homes listed in winter in Eastern PA typically take longer to sell and may sell for less.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#008a29] rounded-full mt-2 flex-shrink-0" />
                <p><strong className="text-[#1a1f1a]">Emotional cost:</strong> The stress of keeping a home show-ready for months, coordinating with agents, managing repairs, and uncertainty isn&apos;t reflected in any number.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <V0FAQ
          faqs={faqs}
          title="Calculator FAQ"
          subtitle="Common questions about this calculator and getting a real offer."
          sectionBg="beige"
        />


        {/* LEAD FORM */}
        <V0LeadForm />


        <V0Footer />
      </main>
    </>
  )
}
