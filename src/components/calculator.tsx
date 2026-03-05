"use client"

import { useState, useEffect, useRef } from 'react'
import { Calculator as CalculatorIcon, DollarSign, Home, ArrowRight, HelpCircle, ChevronDown, Check } from 'lucide-react'

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
    0: { items: ['roof-partial'] },
    1: { items: ['roof-partial', 'water-heater'], windowCount: 4 },
    2: { items: ['roof-full', 'ac', 'water-heater'], windowCount: 8 },
    3: { items: ['roof-full', 'hvac-full', 'water-heater', 'siding'], windowCount: 15 },
  },
  interior: {
    0: { items: ['paint', 'drywall'] },
    1: { items: ['electrical-minor', 'plumbing-minor', 'kitchen-cosmetic', 'bathroom-cosmetic', 'drywall', 'paint'] },
    2: { items: ['kitchen-full', 'bathroom-full', 'paint', 'drywall', 'plumbing-minor', 'electrical-minor'] },
    3: { items: ['kitchen-full', 'bathroom-full', 'flooring', 'paint', 'drywall', 'rewiring', 'plumbing-major'] },
  },
  structural: {
    0: { items: ['landscaping'] },
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

// Age-based repair multiplier — slight nudge, not a major swing
function getAgeMultiplier(yearBuilt: number): number {
  if (yearBuilt <= 0) return 1.0
  if (yearBuilt >= 2000) return 0.90
  if (yearBuilt >= 1980) return 1.0
  if (yearBuilt >= 1960) return 1.08
  if (yearBuilt >= 1940) return 1.15
  return 1.22
}

// Sqft-based repair multiplier (base ~1,800 sqft typical PA home)
function getSqftMultiplier(sqft: number): number {
  if (sqft <= 0) return 1.0
  return Math.max(0.85, Math.min(1.3, sqft / 1800))
}

// Timeline options
const timelineOptions = [
  { value: 'asap', label: 'Need to sell ASAP (under 30 days)', monthsAdjust: -1 },
  { value: 'flexible', label: 'Some flexibility (1-3 months)', monthsAdjust: 0 },
  { value: 'no-rush', label: 'No rush (3+ months)', monthsAdjust: 1 },
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

// Get cash offer percentage based on repair total (investor-math-based ARV tiers)
function getCashOfferPercent(totalRepairs: number): number {
  if (totalRepairs <= 15000) return 0.68
  if (totalRepairs <= 35000) return 0.60
  if (totalRepairs <= 65000) return 0.50
  if (totalRepairs <= 100000) return 0.40
  return 0.32
}

// Sale-to-list price ratio — buyers negotiate down, especially on homes needing work
function getSaleToListRatio(totalRepairs: number): number {
  if (totalRepairs === 0) return 0.98
  if (totalRepairs <= 15000) return 0.97
  if (totalRepairs <= 35000) return 0.96
  if (totalRepairs <= 65000) return 0.95
  if (totalRepairs <= 100000) return 0.94
  return 0.93
}

// Get months on market based on repair total
function getMonthsOnMarket(totalRepairs: number): number {
  if (totalRepairs === 0) return 3
  if (totalRepairs <= 10000) return 4
  if (totalRepairs <= 25000) return 5
  if (totalRepairs <= 40000) return 6
  return 7
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
  onCountyChange?: (countyValue: string) => void
  showResultsCTA?: boolean
}

export function Calculator({
  ctaScrollTarget = 'lead-form',
  ctaEventLabel = 'Get Your Real Cash Offer - Calculator Results',
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
  const [yearBuilt, setYearBuilt] = useState('')
  const [sqft, setSqft] = useState('')
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
      negotiationDiscount: number
      repairs: number
      commission: number
      transferTax: number
      titleInsurance: number
      settlementFees: number
      inspectionConcessions: number
      warrantyCompliance: number
      carryingCosts: number
      carryingMonths: number
      mortgagePayoff: number
      netProceeds: number
      riskAdjustedNet: number
      countyName: string
    }
    cash: {
      offer: number
      mortgagePayoff: number
      netProceeds: number
    }
    difference: number
    cashBetter: boolean
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
  const yearVal = parseInt(yearBuilt) || 0
  const sqftVal = parseInt(sqft.replace(/[^0-9]/g, '')) || 0
  const ageMultiplier = getAgeMultiplier(yearVal)
  const sqftMultiplier = getSqftMultiplier(sqftVal)
  const guidedRepairEstimate = baseGuidedEstimate > 0
    ? Math.round(baseGuidedEstimate * ageMultiplier * sqftMultiplier)
    : 0

  // Grand total repairs — apply age/sqft multipliers to both methods
  const detailedRepairEstimate = (checkedRepairsTotal + customAmount) > 0
    ? Math.round((checkedRepairsTotal + customAmount) * ageMultiplier * sqftMultiplier)
    : 0
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

    const selectedCounty = paCounties.find(c => c.value === county)!
    const repairs = totalRepairs

    // Traditional sale calculation — apply sale-to-list ratio (buyers negotiate down)
    const saleToListRatio = getSaleToListRatio(repairs)
    const expectedSalePrice = homeVal * saleToListRatio
    const negotiationDiscount = homeVal - expectedSalePrice

    const agentCommission = expectedSalePrice * 0.0581
    const transferTax = expectedSalePrice * selectedCounty.transferTaxRate
    const titleInsurance = calculateTitleInsurance(expectedSalePrice)
    const settlementFees = 1575 // Fixed amount
    const inspectionConcessions = expectedSalePrice * 0.0225
    const warrantyCompliance = 850 // Fixed amount

    // Carrying costs calculation
    const baseMonths = getMonthsOnMarket(repairs)
    const timelineAdjust = timelineOptions.find(t => t.value === timeline)?.monthsAdjust || 0
    const carryingMonths = Math.max(2, baseMonths + timelineAdjust)

    // Monthly carrying costs — use actual mortgage balance instead of assumed 70% LTV
    const monthlyMortgage = hasMortgage === 'yes' ? (mortgageVal * 0.065) / 12 : 0
    const monthlyPropertyTax = (homeVal * selectedCounty.propertyTaxRate) / 12
    const monthlyInsurance = 135
    const monthlyUtilities = 225
    const monthlyMaintenance = 100
    const monthlyCarrying = monthlyMortgage + monthlyPropertyTax + monthlyInsurance + monthlyUtilities + monthlyMaintenance
    const carryingCosts = monthlyCarrying * carryingMonths

    const traditionalNet = expectedSalePrice - repairs - agentCommission - transferTax - titleInsurance - settlementFees - inspectionConcessions - warrantyCompliance - carryingCosts - mortgageVal

    // Risk-adjusted traditional net — 18% of PA deals fall through, costing time, money, and restarting
    const riskAdjustedNet = traditionalNet * 0.82

    // Cash offer calculation
    const cashPercent = getCashOfferPercent(repairs)
    const cashOffer = homeVal * cashPercent
    const cashNet = cashOffer - mortgageVal

    // Compare using risk-adjusted traditional net
    const difference = riskAdjustedNet - cashNet
    const cashBetter = difference < 0

    setResults({
      traditional: {
        salePrice: homeVal,
        negotiationDiscount: Math.round(negotiationDiscount),
        repairs,
        commission: Math.round(agentCommission),
        transferTax: Math.round(transferTax),
        titleInsurance: Math.round(titleInsurance),
        settlementFees,
        inspectionConcessions: Math.round(inspectionConcessions),
        warrantyCompliance,
        carryingCosts: Math.round(carryingCosts),
        carryingMonths,
        mortgagePayoff: Math.round(mortgageVal),
        netProceeds: Math.round(traditionalNet),
        riskAdjustedNet: Math.round(riskAdjustedNet),
        countyName: selectedCounty.label,
      },
      cash: {
        offer: Math.round(cashOffer),
        mortgagePayoff: Math.round(mortgageVal),
        netProceeds: Math.round(cashNet),
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
        page_path: window.location.pathname
      })
    }
    document.getElementById(ctaScrollTarget)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Dynamic context message — personalized based on user inputs
  const getDynamicMessage = () => {
    if (!results) return null

    const diff = results.difference
    const repairs = results.traditional.repairs
    const months = results.traditional.carryingMonths
    const monthlyCarry = months > 0 ? Math.round(results.traditional.carryingCosts / months) : 0
    const hasMtg = results.traditional.mortgagePayoff > 0
    const isAsap = timeline === 'asap'

    // Path 0a: Both routes show negative equity
    if (results.traditional.netProceeds < 0 && results.cash.netProceeds < 0) {
      return (
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-2xl space-y-3">
          <p className="text-ce-ink/80">
            <span className="font-semibold text-ce-ink">We want to be upfront with you — both routes show negative equity at these numbers.</span> That means the combination of your mortgage balance, repair costs, and selling expenses would exceed what the home brings in.
          </p>
          <p className="text-ce-ink/80">
            This is more common than most people realize, especially with older homes that need significant work. It doesn&apos;t mean you&apos;re out of options — it means you need the right guidance before making a move.
          </p>
          <p className="text-ce-ink/80">
            <span className="font-semibold text-ce-ink">Here are paths forward worth exploring:</span>
          </p>
          <ul className="text-ce-ink/80 space-y-1.5 pl-4">
            <li>&bull; <span className="font-medium">Talk to your lender about a short sale</span> — they may accept less than the full payoff to avoid foreclosure costs</li>
            <li>&bull; <span className="font-medium">Get a real offer before deciding</span> — our estimate is conservative, and your actual property may appraise differently</li>
            {isAsap && <li>&bull; <span className="font-medium">Act sooner rather than later</span> — carrying costs are adding to the gap every month you wait</li>}
            <li>&bull; <span className="font-medium">Request a no-obligation consultation</span> — we&apos;ve helped sellers in this exact situation find a path that works</li>
          </ul>
          <p className="text-ce-ink/80">
            Every situation is different, and these numbers are estimates. Let us look at your specific property — there may be more equity here than the calculator shows. <button onClick={scrollToForm} className="text-ce-green hover:underline font-medium">Get a free, no-obligation consultation →</button>
          </p>
        </div>
      )
    }

    // Path 0b: Traditional is negative but cash still nets positive
    if (results.traditional.netProceeds < 0 && results.cash.netProceeds >= 0) {
      return (
        <div className="bg-ce-green-subtle border-l-4 border-ce-green p-6 rounded-r-2xl space-y-3">
          <p className="text-ce-ink/80">
            <span className="font-semibold text-ce-ink">The traditional route would actually cost you money at these numbers</span> — by the time you pay for repairs, commissions, closing costs, and {months} months of carrying expenses, you&apos;d walk away in the negative.
          </p>
          <p className="text-ce-ink/80">
            A cash sale is the only path that puts money in your pocket here: <span className="font-semibold text-ce-green">${results.cash.netProceeds.toLocaleString()}</span> with zero out-of-pocket costs, no repairs, and a guaranteed close in 14–30 days{hasMtg && <>. Your ${results.traditional.mortgagePayoff.toLocaleString()} mortgage gets paid off at closing</>}.
          </p>
          <p className="text-ce-ink/80">
            This estimate is based on the condition you described — your actual offer may be higher once we evaluate the property. <button onClick={scrollToForm} className="text-ce-green hover:underline font-medium">Get your guaranteed cash offer →</button>
          </p>
        </div>
      )
    }

    // Path 1: Traditional wins by $30K+
    if (!results.cashBetter && diff >= 30000) {
      return (
        <div className="bg-surface-cream border-l-4 border-ce-ink/30 p-6 rounded-r-2xl space-y-3">
          <p className="text-ce-ink/80">
            <span className="font-semibold text-ce-ink">Based on these estimates, listing with a local agent likely nets you more.</span> That&apos;s an honest answer, and we&apos;ll always give you one.
          </p>
          <p className="text-ce-ink/80">
            But keep in mind what this estimate assumes: a {months}-month process from start to closing — that includes{repairs > 0 && <> time to complete ${repairs.toLocaleString()} in repairs before you can even list,</>} time on the market waiting for offers, buyer inspections and negotiations, and 30–45 days to close. During all {months} months, you&apos;re paying ~${monthlyCarry.toLocaleString()}/month in mortgage, taxes, insurance, and utilities whether the home is listed or not. It also assumes no price reductions, no second round of buyer negotiations, and no deal falling through — which happens 15–20% of the time in PA.
          </p>
          {isAsap && (
            <p className="text-ce-ink/80">
              You mentioned needing to sell quickly. The traditional route&apos;s {months}-month timeline may not align with your situation.
            </p>
          )}
          <p className="text-ce-ink/80">
            If certainty and speed matter, it&apos;s still worth seeing your real number. <button onClick={scrollToForm} className="text-ce-green hover:underline font-medium">Get your guaranteed cash offer →</button>
          </p>
        </div>
      )
    }

    // Path 2: Traditional wins by $20K–$30K
    if (!results.cashBetter && diff >= 20000) {
      return (
        <div className="bg-surface-cream border-l-4 border-yellow-600 p-6 rounded-r-2xl space-y-3">
          <p className="text-ce-ink/80">
            <span className="font-semibold text-ce-ink">The traditional route shows a higher net on paper — but look at what it takes to get there.</span>
          </p>
          <p className="text-ce-ink/80">
            The full process takes roughly {months} months{repairs > 0 && <> — first you&apos;d spend ${repairs.toLocaleString()} getting the home repair-ready, then listing, showings, negotiations, inspection, and closing</>}. Every one of those months you&apos;re paying ~${monthlyCarry.toLocaleString()} in mortgage, property taxes, insurance, and utilities. That&apos;s ${results.traditional.carryingCosts.toLocaleString()} in carrying costs{hasMtg && <>, on top of your ${results.traditional.mortgagePayoff.toLocaleString()} mortgage payoff</>}.
          </p>
          {isAsap && (
            <p className="text-ce-ink/80">
              You indicated you need to sell quickly — waiting {months} months may not be realistic for your timeline.
            </p>
          )}
          <p className="text-ce-ink/80">
            Many sellers in this range choose the certainty of a guaranteed close over the risk of a traditional sale. <button onClick={scrollToForm} className="text-ce-green hover:underline font-medium">Get your guaranteed cash offer →</button>
          </p>
        </div>
      )
    }

    // Path 3: Traditional wins by $10K–$20K
    if (!results.cashBetter && diff >= 10000) {
      return (
        <div className="bg-surface-cream border-l-4 border-yellow-500 p-6 rounded-r-2xl space-y-3">
          <p className="text-ce-ink/80">
            <span className="font-semibold text-ce-ink">The gap is thinner than most sellers expect.</span> The traditional route shows ${diff.toLocaleString()} more — but that difference shrinks fast when you factor in reality.
          </p>
          <p className="text-ce-ink/80">
            {repairs > 0 && <>You&apos;d need to spend ${repairs.toLocaleString()} on repairs before you can even list. </>}From there, it&apos;s showings, offers, inspections, negotiations, and closing — the entire process runs about {months} months start to finish. During all of it, you&apos;re paying ~${monthlyCarry.toLocaleString()}/month in mortgage, taxes, insurance, and utilities. One price reduction, one buyer walking away, or one failed inspection — and that ${diff.toLocaleString()} advantage disappears.
          </p>
          {isAsap && (
            <p className="text-ce-ink/80">
              Given your timeline urgency, a guaranteed close in 14–30 days may be worth more than a slightly higher number {months} months from now.
            </p>
          )}
          <p className="text-ce-ink/80">
            <button onClick={scrollToForm} className="text-ce-green hover:underline font-medium">See what ClearEdge can guarantee you →</button>
          </p>
        </div>
      )
    }

    // Path 4: Within $10K either way
    if (diff < 10000) {
      return (
        <div className="bg-ce-green-subtle border-l-4 border-ce-green p-6 rounded-r-2xl space-y-3">
          <p className="text-ce-ink/80">
            <span className="font-semibold text-ce-ink">These two routes are essentially a wash — within ${diff.toLocaleString()} of each other.</span>
          </p>
          <p className="text-ce-ink/80">
            The difference is how you get there. The traditional route takes about {months} months from start to finish —{repairs > 0 && <> repairs, then</>} listing, showings, negotiations, inspection, and closing — and you&apos;re paying ~${monthlyCarry.toLocaleString()}/month in mortgage, taxes, insurance, and utilities the entire time. There&apos;s also a 15–20% chance the deal falls through and you start over. A cash offer closes in 14–30 days, guaranteed — with zero out-of-pocket costs{hasMtg && <> and your mortgage paid off at closing</>}.
          </p>
          {isAsap && (
            <p className="text-ce-ink/80">
              You mentioned needing to sell fast. For essentially the same net, cash gets you there in weeks instead of months.
            </p>
          )}
          <p className="text-ce-ink/80">
            For a difference this small, most sellers choose certainty. <button onClick={scrollToForm} className="text-ce-green hover:underline font-medium">Get your guaranteed cash offer →</button>
          </p>
        </div>
      )
    }

    // Path 5: Cash wins by up to $15K
    if (results.cashBetter && diff < 15000) {
      return (
        <div className="bg-ce-green-subtle border-l-4 border-ce-green p-6 rounded-r-2xl space-y-3">
          <p className="text-ce-ink/80">
            <span className="font-semibold text-ce-green">A cash sale puts more money in your pocket — ${diff.toLocaleString()} more.</span> And that&apos;s before accounting for the risk, stress, and time cost of the traditional route.
          </p>
          <p className="text-ce-ink/80">
            With a cash offer, you skip the entire {months}-month process — no repairs, no listing, no showings, no negotiations. You stop paying ~${monthlyCarry.toLocaleString()}/month in mortgage, taxes, insurance, and utilities{repairs > 0 && <>, and avoid ${repairs.toLocaleString()} in out-of-pocket repair costs</>}. Close in 14–30 days with zero risk of the deal falling through{hasMtg && <>. Your ${results.traditional.mortgagePayoff.toLocaleString()} mortgage gets paid off at closing</>}.
          </p>
          <p className="text-ce-ink/80">
            <button onClick={scrollToForm} className="text-ce-green hover:underline font-medium">Get your guaranteed cash offer →</button>
          </p>
        </div>
      )
    }

    // Path 6: Cash wins by $15K+
    return (
      <div className="bg-ce-green-subtle border-l-4 border-ce-green p-6 rounded-r-2xl space-y-3">
        <p className="text-ce-ink/80">
          <span className="font-semibold text-ce-green">At this condition level, cash is the clear financial winner — ${diff.toLocaleString()} more in your pocket.</span>
        </p>
        <p className="text-ce-ink/80">
          The traditional route takes about {months} months start to finish —{repairs > 0 && <> repairs, then</>} listing, showings, inspections, negotiations, and closing. During all of it you&apos;re paying ~${monthlyCarry.toLocaleString()}/month in mortgage, taxes, insurance, and utilities. Add commissions, transfer taxes, and closing costs{repairs > 0 && <> — plus ${repairs.toLocaleString()} in repairs you&apos;d need to pay out of pocket before you can even list</>} — and the math clearly favors selling as-is.
        </p>
        <p className="text-ce-ink/80">
          You&apos;d close in 14–30 days, skip all repairs and fees{hasMtg && <>, and your ${results.traditional.mortgagePayoff.toLocaleString()} mortgage gets paid off at closing</>}. <button onClick={scrollToForm} className="text-ce-green hover:underline font-medium">Get your guaranteed cash offer →</button>
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
                <p className="mt-1.5 text-sm text-red-500">Please select your county for accurate local pricing.</p>
              )}
              <p className="mt-1.5 text-sm text-ce-ink/50 flex items-start gap-1">
                <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Selecting your county gives you a more accurate estimate based on local transfer tax rates.
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

              {/* Optional: Year Built & Sqft */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs text-ce-ink/50 mb-1">Year built (optional)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={yearBuilt}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 4)
                      setYearBuilt(v)
                    }}
                    placeholder="e.g. 1965"
                    className="w-full px-3 py-2 rounded-lg border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none transition-all text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-ce-ink/50 mb-1">Approx. sq ft (optional)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={sqft}
                    onChange={(e) => {
                      setSqft(formatWithCommas(e.target.value, 4))
                    }}
                    placeholder="e.g. 1,800"
                    className="w-full px-3 py-2 rounded-lg border border-ce-ink/10 focus:border-ce-green focus:ring-2 focus:ring-ce-green/20 outline-none transition-all text-sm bg-white"
                  />
                </div>
              </div>

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
                      {(yearVal > 0 || sqftVal > 0) && baseGuidedEstimate > 0 && (
                        <p className="text-xs text-ce-ink/50 mt-2">
                          Adjusted for {yearVal > 0 ? `${yearVal} build` : ''}{yearVal > 0 && sqftVal > 0 ? ' and ' : ''}{sqftVal > 0 ? `${sqftVal.toLocaleString()} sq ft` : ''}
                        </p>
                      )}
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
                    {(yearVal > 0 || sqftVal > 0) && (checkedRepairsTotal + customAmount) > 0 && totalRepairs !== (checkedRepairsTotal + customAmount) && (
                      <p className="text-xs text-ce-ink/50 mt-2">
                        Adjusted for {yearVal > 0 ? `${yearVal} build` : ''}{yearVal > 0 && sqftVal > 0 ? ' and ' : ''}{sqftVal > 0 ? `${sqftVal.toLocaleString()} sq ft` : ''}
                      </p>
                    )}
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

                {/* List price → Expected sale price */}
                <div className="mb-4 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-ce-ink/70">Your list price:</span>
                    <span className="text-ce-ink/70">${results.traditional.salePrice.toLocaleString()}</span>
                  </div>
                  <p className="text-ce-ink/50 text-xs mb-2">
                    PA homes sell for ~{Math.round((1 - results.traditional.negotiationDiscount / results.traditional.salePrice) * 100)}% of asking price on average. Based on market data, your expected sale price:
                  </p>
                  <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                    <span className="font-semibold text-ce-ink">Expected sale price:</span>
                    <span className="font-bold text-ce-ink text-lg">${(results.traditional.salePrice - results.traditional.negotiationDiscount).toLocaleString()}</span>
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
                      <Tooltip label="Agent commissions (5.81%)" tip="The combined PA average for listing agent + buyer's agent. Even after the 2024 NAR settlement, most PA sellers still offer buyer's agent commission to attract more showings." />
                      <span>-${results.traditional.commission.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <Tooltip label={`Transfer tax (${results.traditional.countyName})`} tip="PA charges a real estate transfer tax split between buyer and seller. Your county's rate is applied to the full sale price." />
                      <span>-${results.traditional.transferTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <Tooltip label="Title insurance" tip="PA title insurance rates are state-regulated — every company charges the same. The seller typically pays for the owner's policy protecting the buyer's lender." />
                      <span>-${results.traditional.titleInsurance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <Tooltip label="Settlement &amp; recording fees" tip="Title company and county fees to process your sale: settlement fee, title search, document prep, notary, recording fees, and municipal lien letter." />
                      <span>-${results.traditional.settlementFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <Tooltip label="Inspection concessions (2.25%)" tip="After the buyer's home inspection, they almost always negotiate credits or repairs. In Eastern PA's older housing stock, this averages 2–3% of the sale price." />
                      <span>-${results.traditional.inspectionConcessions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <Tooltip label="Home warranty + compliance" tip="Buyers frequently request a home warranty (~$500), plus you'll need a use & occupancy inspection, smoke/CO compliance, and pest inspection." />
                      <span>-${results.traditional.warrantyCompliance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <Tooltip label={`Carrying costs (${results.traditional.carryingMonths} months)`} tip={`From the day you decide to sell until closing day, you're paying mortgage interest, property taxes, insurance, utilities, and maintenance every single month. This covers the full timeline: completing repairs, listing, showings, accepting an offer, inspections, negotiations, and closing — roughly ${results.traditional.carryingMonths} months start to finish.`} />
                      <span>-${results.traditional.carryingCosts.toLocaleString()}</span>
                    </div>
                    <div className={`flex justify-between ${results.traditional.mortgagePayoff > 0 ? 'text-red-600' : 'text-ce-green'}`}>
                      <Tooltip label="Mortgage payoff" tip={results.traditional.mortgagePayoff > 0 ? "Your remaining mortgage balance must be paid off from sale proceeds at closing before you receive your net." : "No mortgage to pay off — you keep more of your sale proceeds."} />
                      <span>{results.traditional.mortgagePayoff > 0 ? '-' : ''}${results.traditional.mortgagePayoff.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-ce-ink/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-ce-ink">IF EVERYTHING GOES PERFECTLY:</span>
                    <span className="text-xl font-bold text-ce-ink">
                      <AnimatedNumber value={results.traditional.netProceeds} />
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-ce-ink/10">
                    <Tooltip label="RISK-ADJUSTED ESTIMATE" tip="18% of home sales in PA fall through after going under contract — failed inspections, financing issues, buyer cold feet. When a deal falls through, you restart the process, adding months of carrying costs and often accepting a lower price. This estimate accounts for that real probability." />
                    <span className="text-2xl font-bold text-red-600">
                      <AnimatedNumber value={results.traditional.riskAdjustedNet} />
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
                      <span>Risk of deal falling through:</span>
                      <span>15–20%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cash Offer Card */}
              <div className="bg-ce-green-subtle rounded-2xl p-6 border-2 border-ce-green/30 shadow-lg relative">
                <div className="absolute -top-3 right-4 bg-ce-green text-white text-xs font-bold px-3 py-1 rounded-full">
                  GUARANTEED
                </div>

                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-ce-green/20">
                  <div className="w-10 h-10 bg-ce-green/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-ce-green" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-ce-ink">ClearEdge Cash Offer</h3>
                </div>

                <div className="space-y-2.5 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ce-ink/70">ClearEdge cash offer:</span>
                    <span className="font-medium">${results.cash.offer.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-ce-green">
                    <span>Repairs:</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between text-ce-green">
                    <span>Commissions:</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between text-ce-green">
                    <span>Closing costs:</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between text-ce-green">
                    <span>Carrying costs:</span>
                    <span>$0</span>
                  </div>
                  <div className={`flex justify-between ${results.cash.mortgagePayoff > 0 ? 'text-red-600' : 'text-ce-green'}`}>
                    <span>Mortgage payoff:</span>
                    <span>{results.cash.mortgagePayoff > 0 ? '-' : ''}${results.cash.mortgagePayoff.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-ce-green/20">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-ce-ink">YOUR ESTIMATED NET:</span>
                    <span className="text-2xl font-bold text-ce-green">
                      <AnimatedNumber value={results.cash.netProceeds} />
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-ce-ink/60">
                      <span>Timeline:</span>
                      <span className="text-ce-green font-medium">14–30 days</span>
                    </div>
                    <div className="flex justify-between text-ce-ink/60">
                      <span>Out of pocket:</span>
                      <span className="text-ce-green font-medium">$0</span>
                    </div>
                    <div className="flex justify-between text-ce-ink/60">
                      <span>Risk of deal falling through:</span>
                      <span className="text-ce-green font-medium">0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Difference Summary */}
            <div className="bg-ce-ink text-white rounded-2xl p-6 mb-8 text-center">
              <p className="text-lg">
                <span className="font-bold text-2xl">${results.difference.toLocaleString()}</span>{' '}
                more with the{' '}
                <span className="font-semibold">{results.cashBetter ? 'cash' : 'traditional'}</span> route
              </p>
            </div>

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
                  This calculator gives you an estimate. To get your real number, request a no-obligation cash offer — we&apos;ll explain exactly how we calculated it, and you&apos;ll have 30 days to decide.
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
            This calculator provides estimates based on PA market data and averages. Your actual results will vary based on property condition, negotiations, and market conditions. ClearEdge&apos;s actual cash offer may be higher or lower than the estimate shown. For an accurate number, request a no-obligation offer.
          </p>
        </div>
      </div>
    </section>
  )
}
