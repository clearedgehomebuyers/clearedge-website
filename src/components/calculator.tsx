"use client"

import { useState, useEffect, useRef } from 'react'
import { Calculator as CalculatorIcon, DollarSign, Home, ArrowRight, HelpCircle, ChevronDown, Check } from 'lucide-react'
import { trackMetaCTAClick } from '@/lib/meta-pixel'
import {
  calculateTraditionalSaleScenario,
  calculateWrittenCashNet,
  compareRoundedNetEstimates,
} from '@/lib/calculator-comparison'

// County is used for local context and related resources. Transfer-tax rates
// vary below the county level, so the math uses the visitor's editable input.
const paCounties = [
  { value: '', label: 'Select your county' },
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

// Repair categories with checkbox items
const repairCategories = [
  {
    id: 'structure',
    name: 'Structure / Foundation',
    items: [
      { id: 'foundation-cracks', name: 'Foundation cracks or bowing walls', cost: 12500, range: '$7,000–$18,000' },
      { id: 'settling', name: 'Settling / sinking (needs piers)', cost: 23500, range: '$12,000–$35,000' },
      { id: 'waterproofing', name: 'Basement waterproofing', cost: 9000, range: '$4,000–$14,000' },
    ],
  },
  {
    id: 'roof',
    name: 'Roof',
    items: [
      { id: 'roof-full', name: 'Full roof replacement', cost: 17500, range: '$10,000–$25,000' },
      { id: 'roof-partial', name: 'Partial roof repair / leaks', cost: 4000, range: '$2,000–$6,000' },
    ],
  },
  {
    id: 'hvac',
    name: 'HVAC / Mechanical',
    items: [
      { id: 'furnace', name: 'Furnace / boiler replacement', cost: 8250, range: '$4,500–$12,000' },
      { id: 'ac', name: 'Central AC replacement', cost: 6500, range: '$4,000–$9,000' },
      { id: 'hvac-full', name: 'Full HVAC system (furnace + AC)', cost: 11500, range: '$7,000–$16,000' },
      { id: 'water-heater', name: 'Water heater', cost: 2500, range: '$1,500–$3,500' },
    ],
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    items: [
      { id: 'plumbing-major', name: 'Major plumbing overhaul (pipe replacement)', cost: 12000, range: '$6,000–$18,000' },
      { id: 'sewer', name: 'Sewer line replacement', cost: 7000, range: '$4,000–$10,000' },
      { id: 'plumbing-minor', name: 'Minor plumbing repairs', cost: 1900, range: '$800–$3,000' },
    ],
  },
  {
    id: 'electrical',
    name: 'Electrical',
    items: [
      { id: 'rewiring', name: 'Full rewiring + panel upgrade', cost: 17500, range: '$10,000–$25,000' },
      { id: 'panel', name: 'Panel upgrade only (100 to 200 amp)', cost: 3400, range: '$1,800–$5,000' },
      { id: 'electrical-minor', name: 'Minor electrical work', cost: 1550, range: '$600–$2,500' },
    ],
  },
  {
    id: 'interior',
    name: 'Interior',
    items: [
      { id: 'kitchen-full', name: 'Kitchen remodel (full)', cost: 35000, range: '$25,000–$45,000' },
      { id: 'kitchen-cosmetic', name: 'Kitchen update (cosmetic)', cost: 16000, range: '$10,000–$22,000' },
      { id: 'bathroom-full', name: 'Bathroom remodel (full, per bathroom)', cost: 27500, range: '$15,000–$40,000' },
      { id: 'bathroom-cosmetic', name: 'Bathroom update (cosmetic, per bathroom)', cost: 8500, range: '$5,000–$12,000' },
      { id: 'flooring', name: 'Flooring throughout', cost: 8000, range: '$4,000–$12,000' },
      { id: 'paint', name: 'Paint throughout (interior)', cost: 4250, range: '$2,500–$6,000' },
      { id: 'drywall', name: 'Drywall / plaster repair', cost: 3250, range: '$1,500–$5,000' },
    ],
  },
  {
    id: 'exterior',
    name: 'Exterior',
    items: [
      { id: 'siding', name: 'Siding replacement', cost: 14000, range: '$8,000–$20,000' },
      { id: 'windows', name: 'Window replacement (per window)', cost: 1150, range: '$650–$1,650 per window' },
      { id: 'concrete', name: 'Concrete / driveway', cost: 4750, range: '$2,500–$7,000' },
      { id: 'landscaping', name: 'Landscaping / grading / drainage', cost: 3750, range: '$1,500–$6,000' },
    ],
  },
  {
    id: 'environmental',
    name: 'Environmental / Code',
    items: [
      { id: 'mold', name: 'Mold remediation', cost: 7500, range: '$3,000–$12,000' },
      { id: 'asbestos', name: 'Asbestos abatement', cost: 11000, range: '$4,000–$18,000' },
      { id: 'lead', name: 'Lead paint remediation', cost: 6500, range: '$3,000–$10,000' },
      { id: 'code', name: 'Code violation remediation', cost: 7500, range: '$3,000–$12,000' },
      { id: 'septic', name: 'Septic system replacement', cost: 12500, range: '$7,000–$18,000' },
    ],
  },
]

// Guided condition assessment questions
const conditionQuestions = [
  {
    id: 'systems',
    question: 'Roof, HVAC, windows, siding, and major systems',
    options: [
      { value: -1, label: 'Select one...' },
      { value: 0, label: 'All in good shape', hint: 'Roof under 10 years old, no leaks. Heat and AC work well. No drafts around windows. Siding clean, no cracks. Hot water is strong.' },
      { value: 1, label: 'Working but aging', hint: 'Roof 10+ years old, shingles curling but no leaks yet. Heat and AC work but weaker than before. Drafty windows, some hard to open. Hot water runs out faster. Siding faded.' },
      { value: 2, label: 'One or more need replacing', hint: 'Roof leaking or missing shingles. Furnace or AC can\'t keep up. Hot water tank may be leaking. Windows foggy, cracked, or letting air in. Siding has holes or damage.' },
      { value: 3, label: 'Multiple systems failing', hint: 'Two or more big systems need full replacement — roof, heat, AC, windows, or siding. A buyer would walk away after inspection.' },
    ],
  },
  {
    id: 'interior',
    question: 'Kitchen, bathrooms, and interior',
    options: [
      { value: -1, label: 'Select one...' },
      { value: 0, label: 'Updated in the last 5 years', hint: 'Kitchen and all bathrooms professionally remodeled in the last 5 years. Fresh paint, no cracks or water stains. Floors look new.' },
      { value: 1, label: 'Dated but functional', hint: 'Original kitchen and bathrooms — everything works but looks its age. Scuffed floors, dripping faucets, slow drains, yellowed caulk. A buyer would redo the kitchen and baths.' },
      { value: 2, label: 'Noticeably outdated', hint: 'Kitchen and bathrooms clearly from a different era. You\'d be embarrassed showing it as-is. Cracked walls, water stains, or peeling paint. A buyer would want them gutted.' },
      { value: 3, label: 'Need complete renovation', hint: 'Kitchen or bathrooms aren\'t usable — missing fixtures, exposed pipes or wiring. May have low water pressure, old wiring, or soft/bouncy floors.' },
    ],
  },
  {
    id: 'structural',
    question: 'Foundation, structure, and environment',
    options: [
      { value: -1, label: 'Select one...' },
      { value: 0, label: 'No known issues', hint: 'Basement stays dry, no musty smell even after heavy rain. No cracks in walls or floor. Driveway and sidewalks in good shape. Doors and windows open easily.' },
      { value: 1, label: 'Minor concerns', hint: 'Thin cracks in basement walls or floor. Some dampness or musty smell after heavy rain — maybe you run a dehumidifier. Driveway has cracks or uneven spots. Common in older PA homes.' },
      { value: 2, label: 'Known issues needing repair', hint: 'Water gets in the basement regularly and keeps coming back. Real cracks in the foundation, not just hairlines. Doors won\'t close right, floors feel uneven. Driveway badly cracked or sinking.' },
      { value: 3, label: 'Significant problems', hint: 'Foundation shifting — bowing walls, sloping floors, or cracks getting worse. Sewage backs up or drains are slow and gurgling. Possible mold, asbestos, or code violations.' },
    ],
  },
]

// Guided answer → repair item mappings (uses actual checklist item IDs)
const guidedRepairMappings: Record<string, Record<number, { items: string[]; windowCount?: number }>> = {
  systems: {
    0: { items: [] },
    1: { items: ['roof-partial', 'water-heater'], windowCount: 4 },
    2: { items: ['roof-full', 'ac', 'water-heater'], windowCount: 8 },
    3: { items: ['roof-full', 'hvac-full', 'water-heater', 'siding'], windowCount: 15 },
  },
  interior: {
    0: { items: [] },
    1: { items: ['electrical-minor', 'plumbing-minor', 'kitchen-cosmetic', 'bathroom-cosmetic', 'drywall', 'paint'] },
    2: { items: ['kitchen-full', 'bathroom-full', 'paint', 'drywall', 'plumbing-minor', 'electrical-minor'] },
    3: { items: ['kitchen-full', 'bathroom-full', 'flooring', 'paint', 'drywall', 'rewiring', 'plumbing-major'] },
  },
  structural: {
    0: { items: [] },
    1: { items: ['landscaping', 'concrete', 'waterproofing'] },
    2: { items: ['landscaping', 'concrete', 'waterproofing', 'foundation-cracks'] },
    3: { items: ['landscaping', 'concrete', 'waterproofing', 'settling', 'sewer', 'code'] },
  },
}

// Look up a repair item cost by ID from the checklist
function getRepairItemCost(itemId: string): number {
  for (const category of repairCategories) {
    const item = category.items.find(i => i.id === itemId)
    if (item) return item.cost
  }
  return 0
}

// Calculate guided repair estimate from answer mappings
function getGuidedRepairEstimate(answers: Record<string, number>): number {
  let total = 0
  for (const [questionId, answerValue] of Object.entries(answers)) {
    if (answerValue < 0) continue
    const mapping = guidedRepairMappings[questionId]?.[answerValue]
    if (!mapping) continue
    for (const itemId of mapping.items) {
      total += getRepairItemCost(itemId)
    }
    if (mapping.windowCount) {
      total += mapping.windowCount * getRepairItemCost('windows')
    }
  }
  return total
}

// Timeline options
const timelineOptions = [
  { value: 'asap', label: 'Need to sell ASAP (under 30 days)' },
  { value: 'flexible', label: 'Some flexibility (1-3 months)' },
  { value: 'no-rush', label: 'No rush (3+ months)' },
]

// Format number with commas as user types
function formatWithCommas(value: string, maxDigits: number): string {
  const numericOnly = value.replace(/[^0-9]/g, '')
  const limited = numericOnly.slice(0, maxDigits)
  return limited.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Tooltip component for result line items
function Tooltip({ label, tip, children }: { label: string; tip: string; children?: React.ReactNode }) {
  const [show, setShow] = useState(false)

  return (
    <span
      className="relative cursor-help border-b border-dotted border-current"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onTouchStart={() => setShow(prev => !prev)}
    >
      {label}
      {show && (
        <span className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-ce-ink text-white text-xs rounded-xl shadow-lg z-50 leading-relaxed font-normal">
          {tip}
          <span className="absolute top-full left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-ce-ink" />
        </span>
      )}
      {children}
    </span>
  )
}

// Custom styled dropdown for condition questions
function ConditionSelect({ options, value, onChange, error }: {
  options: { value: number; label: string; hint?: string }[]
  value: number
  onChange: (val: number) => void
  error?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = options.find(o => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500' : 'border-ce-ink/10'} focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none transition-all text-base bg-white text-left flex items-center justify-between gap-2`}
      >
        <span className={selected && selected.value >= 0 ? 'text-ce-ink' : 'text-ce-ink/40'}>
          {selected && selected.value >= 0 ? selected.label : 'Select one...'}
        </span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-ce-ink/40 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-xl border border-ce-ink/10 shadow-xl overflow-hidden max-h-[70vh] overflow-y-auto">
          {options.filter(o => o.value >= 0).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full px-4 py-3 text-left transition-colors border-b border-ce-ink/5 last:border-b-0 ${
                value === opt.value ? 'bg-ce-green-subtle' : 'hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm font-semibold text-ce-ink">{opt.label}</span>
                {value === opt.value && <Check className="w-3.5 h-3.5 text-ce-green shrink-0" />}
              </span>
              {opt.hint && <span className="block text-xs text-ce-ink/45 italic mt-0.5 leading-relaxed">{opt.hint}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
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

// ─── Calculator Component Props ───
export interface CalculatorProps {
  ctaScrollTarget?: string
  ctaEventLabel?: string
  ctaLocation?: string
  onCountyChange?: (countyValue: string) => void
  showResultsCTA?: boolean
}

export function Calculator({
  ctaScrollTarget = 'lead-form',
  ctaEventLabel = 'Get Your Real Cash Offer - Calculator Results',
  ctaLocation = 'calculator_results',
  onCountyChange,
  showResultsCTA = true,
}: CalculatorProps) {
  // Form state
  const [homeValue, setHomeValue] = useState('')
  const [county, setCounty] = useState('')
  const [hasMortgage, setHasMortgage] = useState<'yes' | 'no' | ''>('')
  const [mortgageBalance, setMortgageBalance] = useState('')
  const [timeline, setTimeline] = useState('flexible')
  const [customRepairCost, setCustomRepairCost] = useState('')
  const [cashOfferInput, setCashOfferInput] = useState('')
  const [commissionRateInput, setCommissionRateInput] = useState('5')
  const [transferTaxRateInput, setTransferTaxRateInput] = useState('1')
  const [settlementCostsInput, setSettlementCostsInput] = useState('0')
  const [inspectionConcessionsInput, setInspectionConcessionsInput] = useState('0')
  const [traditionalMonthsInput, setTraditionalMonthsInput] = useState('2')
  const [monthlyHoldingCostInput, setMonthlyHoldingCostInput] = useState('0')
  const [cashSellerCostsInput, setCashSellerCostsInput] = useState('0')
  const [conditionAnswers, setConditionAnswers] = useState<Record<string, number>>({})
  const [showDetailedRepairs, setShowDetailedRepairs] = useState(false)

  // Repair checkboxes state
  const [checkedRepairs, setCheckedRepairs] = useState<Set<string>>(new Set())
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [bathroomQuantities, setBathroomQuantities] = useState<Record<string, number>>({})

  // Validation state
  const [countyError, setCountyError] = useState(false)
  const [homeValueError, setHomeValueError] = useState(false)
  const [mortgageError, setMortgageError] = useState('')
  const [conditionError, setConditionError] = useState(false)
  const [mortgageWarning, setMortgageWarning] = useState('')

  // Results state
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{
    traditional: {
      salePrice: number
      repairs: number
      commission: number
      commissionRate: number
      transferTax: number
      transferTaxRate: number
      settlementFees: number
      inspectionConcessions: number
      carryingCosts: number
      carryingMonths: number
      mortgagePayoff: number
      netProceeds: number
    }
    cash: null | {
      offer: number
      sellerCosts: number
      mortgagePayoff: number
      netProceeds: number
    }
    difference: number | null
    cashBetter: boolean
    tied: boolean
  } | null>(null)

  const resultsRef = useRef<HTMLDivElement>(null)

  // IDs that support per-bathroom quantity
  const quantityItemIds = ['bathroom-full', 'bathroom-cosmetic', 'windows']

  // Calculate total from checked repairs
  const checkedRepairsTotal = Array.from(checkedRepairs).reduce((sum, itemId) => {
    for (const category of repairCategories) {
      const item = category.items.find(i => i.id === itemId)
      if (item) {
        const qty = quantityItemIds.includes(itemId) ? (bathroomQuantities[itemId] || 1) : 1
        return sum + item.cost * qty
      }
    }
    return sum
  }, 0)

  // Parse custom amount
  const customAmount = parseFloat(customRepairCost.replace(/[^0-9.]/g, '')) || 0

  // Guided condition assessment repair estimate
  const allQuestionsAnswered = conditionQuestions.every(q => conditionAnswers[q.id] !== undefined && conditionAnswers[q.id] >= 0)
  const baseGuidedEstimate = allQuestionsAnswered ? getGuidedRepairEstimate(conditionAnswers) : 0
  const guidedRepairEstimate = Math.round(baseGuidedEstimate)

  // Keep itemized costs exactly as selected. A blanket home-age or size
  // multiplier can distort unrelated jobs and double-count quantities.
  const detailedRepairEstimate = Math.round(checkedRepairsTotal + customAmount)
  const totalRepairs = showDetailedRepairs ? detailedRepairEstimate : guidedRepairEstimate

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
      if (quantityItemIds.includes(itemId)) {
        setBathroomQuantities(prev => {
          const next = { ...prev }
          delete next[itemId]
          return next
        })
      }
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

    if (hasMortgage === '') {
      setMortgageError('Please select whether you have a mortgage')
      hasError = true
    } else if (hasMortgage === 'yes') {
      const balVal = parseFloat(mortgageBalance.replace(/[^0-9.]/g, '')) || 0
      if (balVal <= 0) {
        setMortgageError('Please enter your remaining mortgage balance')
        hasError = true
      } else {
        setMortgageError('')
      }
    } else {
      setMortgageError('')
    }

    if (!showDetailedRepairs && !allQuestionsAnswered) {
      setConditionError(true)
      hasError = true
    } else {
      setConditionError(false)
    }

    if (hasError) return

    // Check for negative equity warning (non-blocking)
    const mortgageVal = hasMortgage === 'yes' ? (parseFloat(mortgageBalance.replace(/[^0-9.]/g, '')) || 0) : 0
    if (mortgageVal > homeVal) {
      setMortgageWarning('Your mortgage balance exceeds your home value — this may indicate negative equity')
    } else {
      setMortgageWarning('')
    }

    const repairs = totalRepairs

    // Every assumption below is visible and editable in the form. Do not
    // silently manufacture a sale-price discount, inspection concession,
    // municipal tax rate, or holding-cost estimate.
    const expectedSalePrice = homeVal
    const commissionRate = Math.max(0, parseFloat(commissionRateInput) || 0)
    const transferTaxRate = Math.max(0, parseFloat(transferTaxRateInput) || 0)
    const settlementFees = parseFloat(settlementCostsInput.replace(/[^0-9.]/g, '')) || 0
    const inspectionConcessions = parseFloat(inspectionConcessionsInput.replace(/[^0-9.]/g, '')) || 0
    const carryingMonths = Math.max(0, parseFloat(traditionalMonthsInput) || 0)
    const monthlyHoldingCost = parseFloat(monthlyHoldingCostInput.replace(/[^0-9.]/g, '')) || 0
    const traditionalScenario = calculateTraditionalSaleScenario({
      moveInReadyValue: expectedSalePrice,
      repairs,
      agentCompensationPercent: commissionRate,
      sellerTransferTaxPercent: transferTaxRate,
      otherSellerSettlementCosts: settlementFees,
      inspectionConcessions,
      holdingMonths: carryingMonths,
      monthlyHoldingCosts: monthlyHoldingCost,
      mortgagePayoff: mortgageVal,
    })
    const traditionalNet = traditionalScenario.netProceeds

    // A real written cash offer is optional. If the visitor does not have one,
    // we calculate only the traditional scenario instead of inventing an offer.
    const cashOffer = parseFloat(cashOfferInput.replace(/[^0-9.]/g, '')) || 0
    const cashSellerCosts = parseFloat(cashSellerCostsInput.replace(/[^0-9.]/g, '')) || 0
    const cashNet = cashOffer > 0
      ? calculateWrittenCashNet(cashOffer, mortgageVal, cashSellerCosts)
      : null
    const comparison = cashNet === null
      ? null
      : compareRoundedNetEstimates(traditionalNet, cashNet)

    setResults({
      traditional: {
        salePrice: homeVal,
        repairs,
        commission: Math.round(traditionalScenario.agentCompensation),
        commissionRate,
        transferTax: Math.round(traditionalScenario.sellerTransferTax),
        transferTaxRate,
        settlementFees: Math.round(settlementFees),
        inspectionConcessions: Math.round(inspectionConcessions),
        carryingCosts: Math.round(traditionalScenario.holdingCosts),
        carryingMonths,
        mortgagePayoff: Math.round(mortgageVal),
        netProceeds: comparison?.traditionalNet ?? Math.round(traditionalNet),
      },
      cash: comparison ? {
        offer: Math.round(cashOffer),
        sellerCosts: Math.round(cashSellerCosts),
        mortgagePayoff: Math.round(mortgageVal),
        netProceeds: comparison.cashNet,
      } : null,
      difference: comparison?.difference ?? null,
      cashBetter: comparison?.winner === 'cash',
      tied: comparison?.winner === 'tie',
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
        has_mortgage: hasMortgage,
        mortgage_balance: mortgageVal,
      })
    }
  }

  const scrollToForm = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        event_label: ctaEventLabel,
        page_path: window.location.pathname,
        cta_location: ctaLocation
      })
    }
    trackMetaCTAClick(ctaEventLabel, ctaLocation)
    document.getElementById(ctaScrollTarget)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Dynamic context message — personalized based on user inputs
  const getDynamicMessage = () => {
    if (!results) return null

    if (!results.cash) {
      return (
        <div className="bg-surface-cream border-l-4 border-ce-green p-6 rounded-r-2xl space-y-3">
          <p className="text-ce-ink/80">
            <span className="font-semibold text-ce-ink">Your estimated traditional-sale net is ${results.traditional.netProceeds.toLocaleString()}.</span> That number uses the repair budget and the editable cost assumptions you entered.
          </p>
          <p className="text-ce-ink/80">
            We did not estimate a ClearEdge offer from a hidden percentage or label either route the winner. Enter a written cash offer above, or <button onClick={scrollToForm} className="text-ce-green hover:underline font-medium">request a no-obligation ClearEdge offer</button> and compare the actual contract terms.
          </p>
        </div>
      )
    }

    const diff = results.difference ?? 0
    const months = results.traditional.carryingMonths
    const hasMtg = results.traditional.mortgagePayoff > 0
    const isAsap = timeline === 'asap'

    // Path 0a: Both routes show negative equity
    if (results.traditional.netProceeds < 0 && results.cash.netProceeds < 0) {
      return (
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-2xl space-y-3">
          <p className="text-ce-ink/80">
            <span className="font-semibold text-ce-ink">Both modeled routes show negative proceeds with the numbers entered.</span> In each scenario, the mortgage payoff and seller costs are greater than the expected sale proceeds.
          </p>
          <p className="text-ce-ink/80">
            Recheck the payoff amount, expected sale price, repairs, and seller-paid costs before relying on this result. A lender, attorney, or housing counselor can explain options that depend on your loan and circumstances.
          </p>
          <p className="text-ce-ink/80">
            <span className="font-semibold text-ce-ink">Useful next steps:</span>
          </p>
          <ul className="text-ce-ink/80 space-y-1.5 pl-4">
            <li>&bull; <span className="font-medium">Ask your lender for a current written payoff</span> so the largest deduction is accurate</li>
            <li>&bull; <span className="font-medium">Compare actual offers and contracts</span> rather than relying on an estimated sale price</li>
            {isAsap && <li>&bull; <span className="font-medium">Include timing in the comparison</span> because each additional month may change the holding costs you entered</li>}
            <li>&bull; <span className="font-medium">Get independent advice when needed</span> before considering a short sale or other loan-related option</li>
          </ul>
          <p className="text-ce-ink/80">
            These are estimates, not a valuation or legal, tax, or financial advice. <button onClick={scrollToForm} className="text-ce-green hover:underline font-medium">Request a free, no-obligation property review →</button>
          </p>
        </div>
      )
    }

    // Path 0b: Traditional is negative but cash still nets positive
    if (results.traditional.netProceeds < 0 && results.cash.netProceeds >= 0) {
      return (
        <div className="bg-ce-green-subtle border-l-4 border-ce-green p-6 rounded-r-2xl space-y-3">
          <p className="text-ce-ink/80">
            <span className="font-semibold text-ce-ink">The traditional-sale scenario shows negative proceeds with the assumptions entered.</span> The written cash offer shows an estimated net of <span className="font-semibold text-ce-green">${results.cash.netProceeds.toLocaleString()}</span> after the mortgage payoff and cash-contract seller costs you entered.
          </p>
          <p className="text-ce-ink/80">
            Verify the traditional sale price and costs, then review the cash contract&apos;s repair terms, contingencies, closing date, and every seller-paid item before deciding{hasMtg && <>. The model deducts your ${results.traditional.mortgagePayoff.toLocaleString()} entered mortgage payoff from both routes</>}.
          </p>
          <p className="text-ce-ink/80">
            <button onClick={scrollToForm} className="text-ce-green hover:underline font-medium">Request a no-obligation ClearEdge offer →</button>
          </p>
        </div>
      )
    }

    // Close outcomes: emphasize that timing and contract terms can matter as much as the estimate.
    if (diff < 10000) {
      return (
        <div className="bg-ce-green-subtle border-l-4 border-ce-green p-6 rounded-r-2xl space-y-3">
          <p className="text-ce-ink/80">
            <span className="font-semibold text-ce-ink">
              {results.tied
                ? 'These two routes have the same estimated net.'
                : <>These two routes are essentially a wash — within ${diff.toLocaleString()} of each other.</>}
            </span>
          </p>
          <p className="text-ce-ink/80">
            The traditional route uses the {months}-month timeline and holding-cost assumption you entered. A financed offer may be subject to financing, appraisal, inspection, and other contract terms. Review the written cash offer&apos;s own timing, contingencies, assignment language, and seller-paid costs.
          </p>
          {isAsap && (
            <p className="text-ce-ink/80">
              You mentioned needing to sell fast. Compare the closing date in the written cash offer with the traditional timeline you entered.
            </p>
          )}
          <p className="text-ce-ink/80">
            For a difference this small, compare the timing and contract terms as well as the estimated proceeds. <button onClick={scrollToForm} className="text-ce-green hover:underline font-medium">Get your no-obligation cash offer →</button>
          </p>
        </div>
      )
    }

    const winnerLabel = results.cashBetter ? 'The written cash offer' : 'The traditional-sale scenario'
    const winnerClass = results.cashBetter ? 'text-ce-green' : 'text-ce-ink'

    return (
      <div className={`${results.cashBetter ? 'bg-ce-green-subtle border-ce-green' : 'bg-surface-cream border-ce-ink/30'} border-l-4 p-6 rounded-r-2xl space-y-3`}>
        <p className="text-ce-ink/80">
          <span className={`font-semibold ${winnerClass}`}>{winnerLabel} has the higher modeled net by ${diff.toLocaleString()}.</span>
        </p>
        <p className="text-ce-ink/80">
          This result comes only from the sale prices, repairs, mortgage payoff, timeline, and seller costs entered above. Change any uncertain assumption to see how sensitive the difference is.
        </p>
        {isAsap && (
          <p className="text-ce-ink/80">
            You indicated that timing matters. Compare the cash contract&apos;s stated closing date with the {months}-month traditional timeline you entered.
          </p>
        )}
        <p className="text-ce-ink/80">
          Compare the written offer&apos;s price, repair terms, closing date, contingencies, assignment language, and seller-paid costs before treating the modeled difference as final{hasMtg && <>, and confirm the current mortgage payoff with your lender</>}. <button onClick={scrollToForm} className="text-ce-green hover:underline font-medium">Request a no-obligation ClearEdge offer →</button>
        </p>
      </div>
    )
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Input Form */}
        <div className="bg-surface-cream rounded-2xl p-6 md:p-8 border border-ce-ink/5 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-ce-green/10 rounded-xl flex items-center justify-center">
              <CalculatorIcon className="w-6 h-6 text-ce-green" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-medium text-ce-ink">Enter Your Property Details</h2>
              <p className="text-sm text-ce-ink/60">Required fields are marked with *</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Home Value Input */}
            <div>
              <label className="block text-sm font-medium text-ce-ink mb-2">
                Estimated Home Value <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ce-ink/40" />
                <input
                  type="text"
                  inputMode="numeric"
                  value={homeValue}
                  onChange={(e) => {
                    setHomeValue(formatWithCommas(e.target.value, 8))
                    setHomeValueError(false)
                  }}
                  placeholder="280,000"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white ${homeValueError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-ce-ink/10 focus:border-ce-green focus:ring-ce-green/20'} focus:ring-2 outline-none transition-all text-lg`}
                />
              </div>
              {homeValueError && (
                <p className="mt-1.5 text-sm text-red-500">Please enter your estimated home value.</p>
              )}
              <p className="mt-1.5 text-sm text-ce-ink/50 flex items-start gap-1">
                <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                What would your home be worth in move-in-ready condition?
              </p>
            </div>

            {/* County Dropdown - Required */}
            <div>
              <label className="block text-sm font-medium text-ce-ink mb-2">
                PA County <span className="text-red-500">*</span>
              </label>
              <select
                value={county}
                onChange={(e) => {
                  setCounty(e.target.value)
                  setCountyError(false)
                  onCountyChange?.(e.target.value)
                }}
                className={`w-full px-4 py-3 rounded-xl border ${countyError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-ce-ink/10 focus:border-ce-green focus:ring-ce-green/20'} focus:ring-2 outline-none transition-all text-lg bg-white`}
              >
                {paCounties.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {countyError && (
                <p className="mt-1.5 text-sm text-red-500">Please select your county.</p>
              )}
              <p className="mt-1.5 text-sm text-ce-ink/50 flex items-start gap-1">
                <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                We use this to show relevant local resources. Transfer taxes vary by municipality and contract, so you can enter your own seller share below.
              </p>
            </div>

            {/* Mortgage Section */}
            <div>
              <label className="block text-sm font-medium text-ce-ink mb-2">
                Do you have a mortgage? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    hasMortgage === 'yes'
                      ? 'border-ce-green bg-ce-green-subtle'
                      : 'border-ce-ink/10 bg-white hover:border-ce-green/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasMortgage"
                    value="yes"
                    checked={hasMortgage === 'yes'}
                    onChange={() => {
                      setHasMortgage('yes')
                      setMortgageError('')
                    }}
                    className="w-4 h-4 text-ce-green focus:ring-ce-green"
                  />
                  <span className="text-ce-ink/80">Yes, I have a mortgage</span>
                </label>

                {/* Mortgage Balance Input - nested under "Yes" */}
                {hasMortgage === 'yes' && (
                  <div className="ml-7 pl-4 border-l-2 border-ce-green/20">
                    <label className="block text-sm font-medium text-ce-ink mb-2">
                      Approximate Mortgage Balance
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ce-ink/40" />
                      <input
                        type="text"
                        inputMode="numeric"
                        value={mortgageBalance}
                        onChange={(e) => {
                          setMortgageBalance(formatWithCommas(e.target.value, 7))
                          setMortgageError('')
                          setMortgageWarning('')
                        }}
                        placeholder="150,000"
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white ${mortgageError && hasMortgage === 'yes' ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-ce-ink/10 focus:border-ce-green focus:ring-ce-green/20'} focus:ring-2 outline-none transition-all text-lg`}
                      />
                    </div>
                    <p className="mt-1.5 text-sm text-ce-ink/50 flex items-start gap-1">
                      <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      This is only used to calculate your net proceeds — we don&apos;t store or share this information.
                    </p>
                    {mortgageWarning && (
                      <p className="mt-1.5 text-sm text-yellow-600">{mortgageWarning}</p>
                    )}
                  </div>
                )}

                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    hasMortgage === 'no'
                      ? 'border-ce-green bg-ce-green-subtle'
                      : 'border-ce-ink/10 bg-white hover:border-ce-green/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasMortgage"
                    value="no"
                    checked={hasMortgage === 'no'}
                    onChange={() => {
                      setHasMortgage('no')
                      setMortgageBalance('')
                      setMortgageError('')
                      setMortgageWarning('')
                    }}
                    className="w-4 h-4 text-ce-green focus:ring-ce-green"
                  />
                  <span className="text-ce-ink/80">No, I own it free and clear</span>
                </label>
              </div>
              {mortgageError && (
                <p className="mt-1.5 text-sm text-red-500">{mortgageError}</p>
              )}
            </div>

            {/* Property Condition Assessment */}
            <div>
              <label className="block text-sm font-medium text-ce-ink mb-2">
                Property Condition
              </label>

              {!showDetailedRepairs && (
                <div className="space-y-4">
                  <p className="text-sm text-ce-ink/60">
                    Answer a few quick questions about your home&apos;s condition.
                  </p>

                  {/* Guided Questions — Custom Dropdowns */}
                  {conditionQuestions.map((q) => {
                    const unanswered = conditionError && (conditionAnswers[q.id] === undefined || conditionAnswers[q.id] < 0)
                    return (
                      <div key={q.id}>
                        <label className="block text-sm font-medium text-ce-ink mb-1.5">{q.question}</label>
                        <ConditionSelect
                          options={q.options}
                          value={conditionAnswers[q.id] ?? -1}
                          onChange={(val) => {
                            setConditionAnswers(prev => ({ ...prev, [q.id]: val }))
                            setConditionError(false)
                          }}
                          error={unanswered}
                        />
                      </div>
                    )
                  })}
                  {conditionError && (
                    <p className="text-red-500 text-sm">Please answer all three condition questions</p>
                  )}

                  {/* Guided Estimate Result */}
                  {allQuestionsAnswered && (
                    <div className="bg-white border border-ce-ink/10 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-ce-ink">Estimated repair costs:</span>
                        <span className="text-xl font-bold text-ce-green">
                          ${guidedRepairEstimate.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Toggle for detailed repairs */}
              <button
                type="button"
                onClick={() => {
                  const next = !showDetailedRepairs
                  setShowDetailedRepairs(next)
                  if (next) {
                    setConditionAnswers({})
                  } else {
                    setCheckedRepairs(new Set())
                    setCustomRepairCost('')
                    setBathroomQuantities({})
                  }
                }}
                className="mt-3 text-sm text-ce-green hover:text-ce-green-hover font-medium flex items-center gap-1 transition-colors"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${showDetailedRepairs ? 'rotate-180' : ''}`} />
                {showDetailedRepairs ? 'Use quick assessment instead' : 'I know my specific repairs — let me itemize'}
              </button>

              {/* Detailed Repair Estimator (collapsed by default) */}
              {showDetailedRepairs && (
                <div className="mt-4 pt-4 border-t border-ce-ink/10">
                  <p className="text-sm text-ce-ink/60 mb-4">
                    Select the repairs your home needs. Prices are PA averages from HomeAdvisor, Angi, and local contractors.
                  </p>

                  {/* Repair Categories Accordion */}
                  <div className="space-y-2 mb-4">
                    {repairCategories.map((category) => {
                      const isExpanded = expandedCategories.has(category.id)
                      const checkedCount = getCategoryCheckedCount(category)

                      return (
                        <div key={category.id} className="border border-ce-ink/10 rounded-xl overflow-hidden bg-white">
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-surface-cream transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-ce-ink">{category.name}</span>
                              {checkedCount > 0 && (
                                <span className="bg-ce-green text-white text-xs px-2 py-0.5 rounded-full">
                                  {checkedCount} selected
                                </span>
                              )}
                            </div>
                            <ChevronDown className={`w-5 h-5 text-ce-ink/40 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>

                          {isExpanded && (
                            <div className="border-t border-ce-ink/10 p-4 space-y-3">
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
                                          ? 'bg-ce-green border-ce-green'
                                          : 'border-ce-ink/20 group-hover:border-ce-green/50'
                                      }`}
                                    >
                                      {checkedRepairs.has(item.id) && (
                                        <Check className="w-3.5 h-3.5 text-white" />
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <span className="text-ce-ink group-hover:text-ce-green transition-colors">
                                        {item.name}
                                      </span>
                                      <span className="font-semibold text-ce-ink whitespace-nowrap">
                                        ${(quantityItemIds.includes(item.id) && checkedRepairs.has(item.id)
                                          ? item.cost * (bathroomQuantities[item.id] || 1)
                                          : item.cost
                                        ).toLocaleString()}
                                      </span>
                                    </div>
                                    {quantityItemIds.includes(item.id) && checkedRepairs.has(item.id) && (
                                      <div className="flex items-center gap-2 mt-1.5">
                                        <span className="text-xs text-ce-ink/60">{item.id === 'windows' ? 'Windows:' : 'Bathrooms:'}</span>
                                        <div className="inline-flex items-center border border-ce-ink/15 rounded-lg overflow-hidden">
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.preventDefault()
                                              e.stopPropagation()
                                              setBathroomQuantities(prev => ({
                                                ...prev,
                                                [item.id]: Math.max(1, (prev[item.id] || 1) - 1)
                                              }))
                                            }}
                                            className="w-7 h-7 flex items-center justify-center text-ce-ink/60 hover:bg-surface-cream transition-colors text-sm font-medium"
                                          >
                                            −
                                          </button>
                                          <span className="w-7 h-7 flex items-center justify-center text-sm font-semibold text-ce-ink border-x border-ce-ink/15 bg-white">
                                            {bathroomQuantities[item.id] || 1}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.preventDefault()
                                              e.stopPropagation()
                                              setBathroomQuantities(prev => ({
                                                ...prev,
                                                [item.id]: Math.min(item.id === 'windows' ? 25 : 5, (prev[item.id] || 1) + 1)
                                              }))
                                            }}
                                            className="w-7 h-7 flex items-center justify-center text-ce-ink/60 hover:bg-surface-cream transition-colors text-sm font-medium"
                                          >
                                            +
                                          </button>
                                        </div>
                                        <span className="text-xs text-ce-ink/40">
                                          × ${item.cost.toLocaleString()} each
                                        </span>
                                      </div>
                                    )}
                                    <span className="text-xs text-ce-ink/50">
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
                  <div className="bg-white border border-ce-ink/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-ce-ink">Selected Repairs Total:</span>
                      <span className="text-xl font-bold text-ce-ink">
                        ${checkedRepairsTotal.toLocaleString()}
                      </span>
                    </div>

                    {/* Custom Amount Input */}
                    <div>
                      <label className="block text-sm text-ce-ink/70 mb-2">
                        Have other repair costs? Add a custom amount:
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ce-ink/40" />
                        <input
                          type="text"
                          inputMode="numeric"
                          value={customRepairCost}
                          onChange={(e) => setCustomRepairCost(formatWithCommas(e.target.value, 6))}
                          placeholder="0"
                          className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Grand Total */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-ce-ink/10">
                      <span className="font-semibold text-ce-ink">Grand Total Repairs:</span>
                      <span className="text-2xl font-bold text-ce-green">
                        ${totalRepairs.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Timeline Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-ce-ink mb-3">
                Timeline Flexibility
              </label>
              <div className="space-y-2">
                {timelineOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      timeline === option.value
                        ? 'border-ce-green bg-ce-green-subtle'
                        : 'border-ce-ink/10 bg-white hover:border-ce-green/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="timeline"
                      value={option.value}
                      checked={timeline === option.value}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-4 h-4 text-ce-green focus:ring-ce-green"
                    />
                    <span className="text-ce-ink/80">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Optional real offer and editable comparison assumptions */}
            <div className="rounded-2xl border border-ce-green/20 bg-ce-green-subtle/40 p-5 space-y-5">
              <div>
                <h3 className="font-semibold text-ce-ink">Make the comparison yours</h3>
                <p className="text-sm text-ce-ink/60 mt-1">
                  Every cost below is visible and editable. Leave the cash-offer field blank if you do not have a written offer yet—we will calculate the traditional-sale estimate without inventing a cash number.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ce-ink mb-1.5">Written cash offer to compare (optional)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ce-ink/40" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cashOfferInput}
                      onChange={(e) => setCashOfferInput(formatWithCommas(e.target.value, 8))}
                      placeholder="e.g. 190,000"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ce-ink mb-1.5">Seller costs in that cash contract</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ce-ink/40" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cashSellerCostsInput}
                      onChange={(e) => setCashSellerCostsInput(formatWithCommas(e.target.value, 7))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ce-ink mb-1.5">Total agent compensation (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="15"
                    step="0.1"
                    value={commissionRateInput}
                    onChange={(e) => setCommissionRateInput(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ce-ink mb-1.5">Seller transfer-tax share (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={transferTaxRateInput}
                    onChange={(e) => setTransferTaxRateInput(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ce-ink mb-1.5">Other seller settlement costs</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ce-ink/40" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={settlementCostsInput}
                      onChange={(e) => setSettlementCostsInput(formatWithCommas(e.target.value, 7))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ce-ink mb-1.5">Expected inspection concessions</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ce-ink/40" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={inspectionConcessionsInput}
                      onChange={(e) => setInspectionConcessionsInput(formatWithCommas(e.target.value, 7))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ce-ink mb-1.5">Months until traditional closing</label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={traditionalMonthsInput}
                    onChange={(e) => setTraditionalMonthsInput(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ce-ink mb-1.5">Monthly holding costs</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ce-ink/40" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={monthlyHoldingCostInput}
                      onChange={(e) => setMonthlyHoldingCostInput(formatWithCommas(e.target.value, 7))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none bg-white"
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-ce-ink/60">
                The 5% commission and 1% seller transfer-tax share are editable starting assumptions, not promises or statewide rules. Compensation is negotiable; local transfer-tax rates and the buyer/seller allocation depend on the municipality and purchase agreement. Title insurance is not charged to the seller by default here.
              </p>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculate}
              className="w-full py-4 bg-ce-green hover:bg-ce-green-hover text-white font-semibold text-lg rounded-full shadow-lg shadow-green transition-all hover:shadow-xl hover:shadow-green hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <CalculatorIcon className="w-5 h-5" />
              Calculate My Net Proceeds
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && results && (
          <div ref={resultsRef} className="scroll-mt-32">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Your Results
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                Estimated Net Proceeds Comparison
              </h2>
            </div>

            {/* Results Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Traditional Sale Card */}
              <div className="bg-white rounded-2xl p-6 border border-ce-ink/10 shadow-lg">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-ce-ink/10">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-gray-600" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-ce-ink">Traditional Sale with Realtor</h3>
                </div>

                {/* Visitor-entered move-in-ready value */}
                <div className="mb-4 text-sm">
                  <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                    <span className="font-semibold text-ce-ink">Move-in-ready value entered:</span>
                    <span className="font-bold text-ce-ink text-lg">${results.traditional.salePrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-ce-ink/10 pt-3 mb-6">
                  <p className="text-xs text-ce-ink/50 mb-3 uppercase tracking-wide font-medium">Deductions from sale price</p>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-red-600">
                      <Tooltip label="Repairs" tip="Homes typically need to be in show-ready condition to sell at full market value. These are the repair costs you selected in the estimator above." />
                      <span>-${results.traditional.repairs.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <Tooltip label={`Agent compensation (${results.traditional.commissionRate}%)`} tip="The editable total percentage you entered. Broker compensation is negotiable and should match your listing agreement and any seller-paid buyer-broker compensation you expect." />
                      <span>-${results.traditional.commission.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <Tooltip label={`Seller transfer-tax share (${results.traditional.transferTaxRate}%)`} tip="The editable share you entered. Pennsylvania has a 1% state tax plus local tax, and the buyer/seller allocation can be set by contract. Municipality—not county alone—affects the local rate." />
                      <span>-${results.traditional.transferTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <Tooltip label="Other seller settlement costs" tip="The editable amount you entered for seller-paid settlement or contract costs. The calculator does not automatically charge the seller for the buyer's title-insurance policy." />
                      <span>-${results.traditional.settlementFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <Tooltip label="Inspection concessions" tip="The editable amount you entered. It defaults to $0 because an inspection does not automatically result in a seller credit." />
                      <span>-${results.traditional.inspectionConcessions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <Tooltip label={`Holding costs (${results.traditional.carryingMonths} months)`} tip="Your editable monthly amount multiplied by your editable timeline. Use costs that will not already be captured in the final mortgage payoff." />
                      <span>-${results.traditional.carryingCosts.toLocaleString()}</span>
                    </div>
                    <div className={`flex justify-between ${results.traditional.mortgagePayoff > 0 ? 'text-red-600' : 'text-ce-green'}`}>
                      <Tooltip label="Mortgage payoff" tip={results.traditional.mortgagePayoff > 0 ? "Your remaining mortgage balance must be paid off from sale proceeds at closing before you receive your net." : "No mortgage to pay off — you keep more of your sale proceeds."} />
                      <span>{results.traditional.mortgagePayoff > 0 ? '-' : ''}${results.traditional.mortgagePayoff.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-ce-ink/10">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-ce-ink/10">
                    <Tooltip label="ESTIMATED TRADITIONAL NET" tip="Estimated sale proceeds after the costs shown above and the mortgage balance you entered. This is not reduced by a speculative fall-through percentage. Liens, delinquent taxes, prorations, and other property-specific obligations are not included." />
                    <span className="text-2xl font-bold text-ce-ink">
                      <AnimatedNumber value={results.traditional.netProceeds} />
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-ce-ink/60">
                      <span>Total timeline (repairs → closing):</span>
                      <span>~{results.traditional.carryingMonths} months</span>
                    </div>
                    <div className="flex justify-between text-ce-ink/60">
                      <span>Out of pocket upfront:</span>
                      <span>${results.traditional.repairs.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-ce-ink/60">
                      <span>Contract contingencies:</span>
                      <span>May apply</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Written cash-offer comparison, or a neutral prompt if absent */}
              {results.cash ? (
                <div className="bg-ce-green-subtle rounded-2xl p-6 border-2 border-ce-green/30 shadow-lg relative">
                  <div className="absolute -top-3 right-4 bg-ce-green text-white text-xs font-bold px-3 py-1 rounded-full">
                    WRITTEN OFFER ENTERED
                  </div>

                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-ce-green/20">
                    <div className="w-10 h-10 bg-ce-green/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-ce-green" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-ce-ink">Cash Offer You Entered</h3>
                  </div>

                  <div className="space-y-2.5 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-ce-ink/70">Written cash offer:</span>
                      <span className="font-medium">${results.cash.offer.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-ce-green">
                      <span>Upfront repairs:</span>
                      <span>$0</span>
                    </div>
                    <div className="flex justify-between text-ce-green">
                      <span>Agent compensation:</span>
                      <span>$0</span>
                    </div>
                    <div className={`flex justify-between ${results.cash.sellerCosts > 0 ? 'text-red-600' : 'text-ce-green'}`}>
                      <span>Seller costs entered:</span>
                      <span>{results.cash.sellerCosts > 0 ? '-' : ''}${results.cash.sellerCosts.toLocaleString()}</span>
                    </div>
                    <div className={`flex justify-between ${results.cash.mortgagePayoff > 0 ? 'text-red-600' : 'text-ce-green'}`}>
                      <span>Mortgage payoff:</span>
                      <span>{results.cash.mortgagePayoff > 0 ? '-' : ''}${results.cash.mortgagePayoff.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-ce-green/20">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-ce-ink">ESTIMATED CASH NET*:</span>
                      <span className="text-2xl font-bold text-ce-green">
                        <AnimatedNumber value={results.cash.netProceeds} />
                      </span>
                    </div>
                    <p className="text-sm text-ce-ink/60">
                      Review the offer&apos;s timing, contingencies, and cost allocation before treating this as a final closing amount.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-ce-green-subtle rounded-2xl p-6 border-2 border-ce-green/30 shadow-lg flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-ce-green/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-ce-green" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-ce-ink">Cash Offer Comparison</h3>
                  </div>
                  <p className="text-ce-ink/70 mb-4">
                    No written cash offer was entered, so this calculator did not invent one or declare a winner.
                  </p>
                  <button onClick={scrollToForm} className="text-left text-ce-green hover:underline font-medium">
                    Request a no-obligation ClearEdge offer to compare →
                  </button>
                </div>
              )}
            </div>

            <p className="text-sm text-ce-ink/60 text-center -mt-3 mb-6">
              *The estimate subtracts the mortgage balance entered. Final proceeds may also reflect liens, delinquent taxes, prorations, and other property-specific obligations shown on the closing statement.
            </p>

            {/* Difference Summary */}
            {results.cash && results.difference !== null && (
              <div className="bg-ce-ink text-white rounded-2xl p-6 mb-8 text-center">
                {results.tied ? (
                  <p className="text-lg"><span className="font-bold text-2xl">Same estimated net</span> for both routes</p>
                ) : (
                  <p className="text-lg">
                    <span className="font-bold text-2xl">${results.difference.toLocaleString()}</span>{' '}
                    more with the{' '}
                    <span className="font-semibold">{results.cashBetter ? 'cash' : 'traditional'}</span> route
                  </p>
                )}
              </div>
            )}

            {/* Dynamic Context Message */}
            <div className="mb-8">
              {getDynamicMessage()}
            </div>

            {/* CTA */}
            {showResultsCTA && (
              <div className="bg-surface-cream rounded-2xl p-6 md:p-8 text-center">
                <h3 className="font-serif text-2xl font-medium text-ce-ink mb-4">
                  Want to see your REAL number?
                </h3>
                <p className="text-ce-ink/70 mb-6 max-w-xl mx-auto">
                  This calculator models the numbers you enter. Request a no-obligation property review to receive a written ClearEdge offer, then compare that written amount and its contract terms here.
                </p>
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center gap-2 bg-ce-green text-white px-8 py-4 rounded-full font-medium hover:bg-ce-green-hover transition-all shadow-lg shadow-green hover:shadow-xl hover:-translate-y-0.5"
                >
                  Get Your Real Cash Offer
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-ce-ink/50 text-center">
            This is an educational scenario calculator, not an appraisal, settlement statement, tax opinion, or ClearEdge offer. It uses the values and editable assumptions you enter. Actual sale price, contract costs, mortgage payoff, liens, taxes, prorations, repairs, timing, and proceeds can differ. Review a written agreement and closing estimate before deciding.
          </p>
        </div>
      </div>
    </section>
  )
}
