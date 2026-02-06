// Regional Hub Page Data
// Contains all content for the 3 regional hub pages: NEPA, Lehigh Valley, Poconos

export interface CityCard {
  name: string
  slug: string
  description: string
}

export interface SituationCard {
  title: string
  slug: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface RegionalHubData {
  slug: string
  regionName: string
  h1: string
  subheading: string
  metaTitle: string
  metaDescription: string
  overviewContent: string[]
  cities: CityCard[]
  situations: SituationCard[]
  faqs: FAQ[]
  mapCenter: { lat: number; lng: number }
  mapZoom: number
}

export const nepaHubData: RegionalHubData = {
  slug: 'nepa',
  regionName: 'NEPA',
  h1: 'Sell Your House Fast in Northeastern Pennsylvania',
  subheading: "ClearEdge Home Buyers serves homeowners across NEPA — from Scranton and Wilkes-Barre to Hazleton, Carbondale, and beyond. Get a fair cash offer in 24 hours.",
  metaTitle: 'Sell My House Fast NEPA | Cash Home Buyers | ClearEdge',
  metaDescription: "Need to sell your house fast in Northeastern Pennsylvania? ClearEdge Home Buyers provides fair cash offers in 24 hours across Scranton, Wilkes-Barre, Hazleton & all of NEPA. No fees, no repairs.",
  overviewContent: [
    "Northeastern Pennsylvania's housing market has its own set of challenges that make selling a home the traditional way difficult. NEPA's housing stock is among the oldest in the state — many homes in Scranton, Wilkes-Barre, and surrounding communities were built before 1950. That means sellers frequently face expensive issues like knob-and-tube wiring, lead paint, asbestos, aging foundations, and outdated plumbing that can derail a traditional sale during inspection.",
    "The region's coal mining heritage also left a lasting mark on the housing landscape. Mine subsidence is a real concern in parts of Lackawanna and Luzerne counties, and properties built over former mine shafts may have structural complications that scare off traditional buyers and their lenders. For homeowners sitting on properties with these issues, the traditional listing process becomes an expensive gamble.",
    "Despite these challenges, NEPA's real estate market has seen significant price growth — Scranton is projected for approximately 10% price growth, making it one of the strongest performers in the Northeast. Demand continues to outpace available inventory across Lackawanna and Luzerne counties, with well-priced homes selling in under 10 days. But that seller's market primarily benefits move-in-ready properties. Homes that need work — the kind we specialize in — face a very different reality.",
    "Whether you're dealing with an inherited property in Scranton, a rental that's become more trouble than it's worth in Wilkes-Barre, or a home with code violations in Hazleton, ClearEdge provides a straightforward path to selling. We've been buying homes across NEPA since 2016 — this is where we started, and it's where we buy most frequently."
  ],
  cities: [
    { name: 'Scranton', slug: 'scranton', description: 'Where ClearEdge started. We know every neighborhood from the Hill Section to Green Ridge.' },
    { name: 'Wilkes-Barre', slug: 'wilkes-barre', description: 'Strong demand but aging housing stock means many homes need significant updates before listing.' },
    { name: 'Hazleton', slug: 'hazleton', description: 'Growing community with a mix of older row homes and properties needing modernization.' },
    { name: 'Pittston', slug: 'pittston', description: 'Small-town charm, but older homes along the river corridor often face foundation and flooding concerns.' },
    { name: 'Kingston', slug: 'kingston', description: 'Residential borough across from Wilkes-Barre with many estate and inherited property situations.' },
    { name: 'Nanticoke', slug: 'nanticoke', description: 'Former coal town with affordable housing stock that often needs substantial renovation.' },
    { name: 'Carbondale', slug: 'carbondale', description: 'Northern Lackawanna County properties with rural character and aging infrastructure.' },
    { name: 'Dunmore', slug: 'dunmore', description: 'Scranton suburb with a mix of well-maintained and deferred-maintenance homes.' },
    { name: 'Honesdale', slug: 'honesdale', description: 'Wayne County seat with older Victorian-era properties and rural homes.' },
    { name: 'Bloomsburg', slug: 'bloomsburg', description: 'College town with investment properties and older homes throughout the borough.' },
  ],
  situations: [
    { title: 'Inherited Property', slug: 'inherited-property', description: 'NEPA has an aging population, making inherited homes one of the most common reasons people call us.' },
    { title: 'Major Repairs Needed', slug: 'major-repairs', description: 'Older housing stock means foundation issues, roof damage, and outdated systems are common.' },
    { title: 'Tax Liens & Code Violations', slug: 'tax-liens-code-violations', description: 'Municipal code enforcement has increased across Scranton and Wilkes-Barre.' },
    { title: 'Tired Landlord', slug: 'tired-landlord', description: 'Many NEPA properties were converted to rentals during the population decline. Some landlords are ready to exit.' },
    { title: 'Facing Foreclosure', slug: 'foreclosure', description: 'Rising costs and property taxes put pressure on homeowners with fixed or limited incomes.' },
  ],
  faqs: [
    {
      question: 'Does ClearEdge buy houses with mine subsidence issues in NEPA?',
      answer: "Yes. Mine subsidence is common across Lackawanna and Luzerne counties, and it doesn't stop us from making an offer. We assess the structural situation and factor it into our offer — you don't need to fix anything first."
    },
    {
      question: 'How fast can you close on a house in Scranton or Wilkes-Barre?',
      answer: 'We can close in as few as 7 days when the title is clear. Most NEPA transactions close within 14 to 30 days, depending on the complexity of the title work.'
    },
    {
      question: 'Do you buy houses that need major renovations in NEPA?',
      answer: "Absolutely. Many NEPA homes were built before 1950 and need significant work — knob-and-tube wiring, lead paint remediation, foundation repair, full gut renovations. We buy them all as-is."
    },
    {
      question: 'I inherited a house in NEPA. Can you help with probate?',
      answer: 'Yes. We regularly buy properties during the probate process across Lackawanna, Luzerne, and surrounding counties. We can work with your estate attorney to close once Letters Testamentary are issued.'
    },
    {
      question: 'What areas in NEPA does ClearEdge serve?',
      answer: 'We buy properties throughout Northeastern Pennsylvania, including Scranton, Wilkes-Barre, Hazleton, Pittston, Kingston, Nanticoke, Carbondale, Dunmore, Honesdale, Bloomsburg, and surrounding communities.'
    },
  ],
  mapCenter: { lat: 41.35, lng: -75.75 },
  mapZoom: 9,
}

export const lehighValleyHubData: RegionalHubData = {
  slug: 'lehigh-valley',
  regionName: 'Lehigh Valley',
  h1: 'Sell Your House Fast in the Lehigh Valley',
  subheading: "ClearEdge Home Buyers serves homeowners across the Lehigh Valley — from Allentown and Bethlehem to Easton, Reading, and beyond. Get a fair cash offer in 24 hours.",
  metaTitle: 'Sell My House Fast Lehigh Valley | Cash Home Buyers | ClearEdge',
  metaDescription: "Need to sell your house fast in the Lehigh Valley? ClearEdge Home Buyers provides fair cash offers in 24 hours across Allentown, Bethlehem, Easton & the entire Lehigh Valley. No fees.",
  overviewContent: [
    "The Lehigh Valley is one of the fastest-growing regions in Pennsylvania — and that growth has made the housing market increasingly competitive. The median home sales price hit $350,000 in 2025, with single-family home prices up 5% year over year. Homes that are move-in ready sell in just 22 days on average, and sellers are receiving over 100% of their asking price in many cases.",
    "But that seller's market doesn't benefit everyone equally. If your home needs significant repairs, has code violations, or comes with complicated circumstances like probate or tenant issues, the traditional market works against you. Buyers in the Lehigh Valley are savvy and competitive — they're not looking for projects. They want turnkey homes, and they have plenty to choose from. Properties that don't meet that standard sit on the market, rack up carrying costs, and often sell well below expectations after multiple price reductions.",
    "The Lehigh Valley's housing stock tells two stories. The region has beautiful historic homes in areas like Bethlehem's south side and Easton's West Ward — but many of these homes are 80 to 100+ years old and come with expensive structural, electrical, and plumbing challenges. Meanwhile, Allentown has seen increased municipal code enforcement and higher transfer taxes (now 2.5% as of 2026), adding even more cost to the traditional selling process.",
    "Housing affordability has also become a major concern. With the median home price stretching beyond what average household incomes can comfortably support, many homeowners are feeling the squeeze — particularly those who bought at lower prices and are now sitting on significant equity but can't afford the repairs needed to list traditionally. That's where we come in. ClearEdge offers a direct path to selling that skips the repair costs, agent commissions, and months of uncertainty."
  ],
  cities: [
    { name: 'Allentown', slug: 'allentown', description: "The Lehigh Valley's largest city with a diverse housing stock from downtown rowhomes to suburban single-families." },
    { name: 'Bethlehem', slug: 'bethlehem', description: 'Historic steel town with beautiful but aging homes that often need significant updates to list traditionally.' },
    { name: 'Easton', slug: 'easton', description: 'Revitalizing downtown, but many surrounding neighborhoods have older homes with deferred maintenance.' },
    { name: 'Reading', slug: 'reading', description: "Berks County seat with an affordable housing market and many properties needing renovation." },
    { name: 'Pottsville', slug: 'pottsville', description: "Schuylkill County's hub with coal-region housing stock and older multi-family properties." },
  ],
  situations: [
    { title: 'Job Relocation', slug: 'job-relocation', description: "The Lehigh Valley's growing economy means people move in and out frequently. When a new opportunity calls, you can't wait 90 days." },
    { title: 'Inherited Property', slug: 'inherited-property', description: "Managing an estate is hard enough without worrying about repairs and showings on a property you don't live in." },
    { title: 'Divorce', slug: 'divorce', description: "The Lehigh Valley's rising home values mean more equity to split. A quick cash sale means faster resolution for both parties." },
    { title: 'Major Repairs Needed', slug: 'major-repairs', description: 'Many homes are 80+ years old. The repair bill to list traditionally can exceed $30,000.' },
    { title: 'Vacant Property', slug: 'vacant-property', description: 'Empty houses cost money every month in taxes, insurance, and utilities. Stop the bleeding with a quick sale.' },
  ],
  faqs: [
    {
      question: "What's the Lehigh Valley housing market like right now?",
      answer: "Competitive for move-in ready homes — they sell in about 22 days at or above asking price. But homes needing repairs sit much longer and sell for less. If your property needs work, a direct cash sale often nets you more after you factor in repair costs, commissions, and carrying costs."
    },
    {
      question: 'Does ClearEdge buy houses in all Lehigh Valley communities?',
      answer: 'Yes. We buy throughout Lehigh and Northampton counties, including Allentown, Bethlehem, Easton, and surrounding townships and boroughs. We also serve Reading in Berks County and Pottsville in Schuylkill County.'
    },
    {
      question: 'How does selling to ClearEdge compare to listing with a Lehigh Valley agent?',
      answer: "Traditional listings in the Lehigh Valley involve 5-6% commission, potential repairs, staging, and 60-90 days on market. With ClearEdge, you get a cash offer in 24 hours, zero fees, zero repairs, and you choose your closing date. For homes that need work, the net proceeds are often comparable — without the hassle."
    },
    {
      question: 'I just inherited a property in Bethlehem. What are my options?',
      answer: "We buy inherited properties regularly, including during probate. You don't need to clean it out, repair it, or even visit. We handle everything and can work directly with your estate attorney."
    },
    {
      question: 'Are there any fees when I sell to ClearEdge in the Lehigh Valley?',
      answer: 'None. No commissions, no closing costs, no junk fees. The offer we make is what you receive at closing.'
    },
  ],
  mapCenter: { lat: 40.62, lng: -75.43 },
  mapZoom: 10,
}

export const poconosHubData: RegionalHubData = {
  slug: 'poconos',
  regionName: 'Poconos',
  h1: 'Sell Your House Fast in the Poconos',
  subheading: "ClearEdge Home Buyers helps Pocono property owners sell vacation homes, cabins, and residential properties fast for cash. Get a fair offer in 24 hours.",
  metaTitle: 'Sell My House Fast Poconos | Cash Home Buyers | ClearEdge',
  metaDescription: "Need to sell your Pocono house or vacation property fast? ClearEdge buys cabins, A-frames, lakefront homes & all Pocono properties for cash. No fees, no repairs. Offer in 24 hours.",
  overviewContent: [
    "The Poconos isn't like selling a house anywhere else in Eastern Pennsylvania. The market has unique dynamics that make traditional sales especially challenging — seasonal demand cycles, vacation home financing hurdles, and property issues that are specific to mountain and lakefront living.",
    "Most Pocono buyers shop in spring and summer. If you need to sell in the off-season, you could be waiting months for serious interest. And because most Pocono purchases are second homes or investment properties, buyers are pickier and more likely to walk away over inspection issues. They can afford to — this isn't their primary residence. Financing is harder too, with second-home mortgages requiring 10-20% down payments, which shrinks the buyer pool significantly.",
    "Pocono properties also come with complications that traditional buyers avoid. Septic system failures can cost $15,000-$30,000 to replace — and that's a deal-killer for most financed buyers. Well water issues, winterization damage from frozen pipes, aging A-frame structures, and HOA complications add more friction. We've bought Pocono properties with all of these issues and more. These complications don't scare us — they're exactly what we specialize in.",
    "The short-term rental landscape has also shifted. Many Pocono property owners invested in Airbnb and VRBO properties during the pandemic boom, only to see bookings decline and some townships crack down on STR regulations. If you're sitting on a vacation rental that's no longer producing the returns you expected, selling to a cash buyer lets you exit quickly without waiting for seasonal demand to pick back up.",
    "Whether you own a cabin in the woods, a lakefront home, a ski chalet in an HOA community, or a residential property in Stroudsburg or East Stroudsburg, ClearEdge can make you a fair cash offer and close on your timeline."
  ],
  cities: [
    { name: 'Stroudsburg', slug: 'stroudsburg', description: "The Poconos' main commercial hub with a mix of residential homes and investment properties." },
    { name: 'East Stroudsburg', slug: 'east-stroudsburg', description: 'University town with rental properties and older homes throughout the borough.' },
    { name: 'Pocono Pines', slug: 'pocono-pines', description: 'Lake community area with vacation homes, A-frames, and HOA properties.' },
    { name: 'Tannersville', slug: 'tannersville', description: 'Resort-adjacent community with ski chalets and seasonal properties.' },
  ],
  situations: [
    { title: 'Burden Vacation Home', slug: 'vacant-property', description: "You haven't used it in years. The kids don't come anymore. It's just an expense now — taxes, insurance, maintenance on a property you never visit." },
    { title: 'STR That\'s Not Working', slug: 'tired-landlord', description: "The Airbnb dream didn't pan out. Bookings are down, management is a nightmare, and the ROI isn't there anymore." },
    { title: 'Inherited Property', slug: 'inherited-property', description: 'A family cabin full of memories but also full of deferred maintenance. You need to settle the estate and move on.' },
    { title: 'Major Property Issues', slug: 'major-repairs', description: 'Septic, well, or winterization damage that makes traditional sales nearly impossible without massive repair investments.' },
    { title: 'Divorce', slug: 'divorce', description: 'The vacation home was for the family. Now you need to liquidate and split the proceeds quickly.' },
  ],
  faqs: [
    {
      question: 'Does ClearEdge buy vacation homes and cabins in the Poconos?',
      answer: "Yes. We buy all types of Pocono properties — A-frames, lakefront homes, ski chalets, HOA community properties, cabins, and standard residential homes. Condition doesn't matter."
    },
    {
      question: 'Can you buy my Pocono property if it has septic or well issues?',
      answer: 'Absolutely. Failed septic systems and well water problems are among the most common issues we see in Pocono properties. We factor the repair costs into our offer so you don\'t have to deal with any of it.'
    },
    {
      question: "I'm an out-of-state owner. Can you handle everything remotely?",
      answer: "Yes. Many Pocono property owners live in New Jersey, New York, or Connecticut. We handle everything — from the initial walkthrough to coordinating with the title company. You don't need to be present for any of it."
    },
    {
      question: 'How does selling a Pocono vacation home differ from selling a primary residence?',
      answer: 'Vacation homes face seasonal demand (most buyers shop spring/summer), tighter financing requirements (10-20% down for second homes), and pickier buyers who will walk away over any inspection issue. A cash sale eliminates all of these challenges.'
    },
    {
      question: 'My Pocono property is in an HOA. Is that a problem?',
      answer: "Not at all. We regularly buy properties in Pocono HOA communities. We'll work with the association on any transfer requirements and cover any fees."
    },
  ],
  mapCenter: { lat: 41.05, lng: -75.35 },
  mapZoom: 10,
}

// Export all hub data
export const allHubData: Record<string, RegionalHubData> = {
  'nepa': nepaHubData,
  'lehigh-valley': lehighValleyHubData,
  'poconos': poconosHubData,
}

// Map cities to their parent hub
export const cityToHub: Record<string, string> = {
  // NEPA cities
  'scranton': 'nepa',
  'wilkes-barre': 'nepa',
  'hazleton': 'nepa',
  'pittston': 'nepa',
  'kingston': 'nepa',
  'nanticoke': 'nepa',
  'carbondale': 'nepa',
  'dunmore': 'nepa',
  'honesdale': 'nepa',
  'bloomsburg': 'nepa',
  // Lehigh Valley cities
  'allentown': 'lehigh-valley',
  'bethlehem': 'lehigh-valley',
  'easton': 'lehigh-valley',
  'reading': 'lehigh-valley',
  'pottsville': 'lehigh-valley',
  // Poconos cities
  'stroudsburg': 'poconos',
  'east-stroudsburg': 'poconos',
  'pocono-pines': 'poconos',
  'tannersville': 'poconos',
}

// Hub display names
export const hubDisplayNames: Record<string, string> = {
  'nepa': 'NEPA',
  'lehigh-valley': 'Lehigh Valley',
  'poconos': 'Poconos',
}
