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
  h1: 'Cash Home Buyers in Northeastern Pennsylvania — Fair Offers, Fast Closings',
  subheading: "Selling a house in NEPA shouldn't mean six months of showings, $30K in repairs, and praying a buyer's financing doesn't fall through. ClearEdge has bought 200+ homes across Scranton, Wilkes-Barre, Hazleton, and beyond since 2016 — and we can make you a fair cash offer within 24 hours.",
  metaTitle: 'Cash Home Buyers in NEPA | Fair Offer in 24 Hours | ClearEdge',
  metaDescription: "Cash home buyers in Northeastern Pennsylvania. ClearEdge buys houses as-is across Scranton, Wilkes-Barre, Hazleton & all NEPA. No fees, no repairs, close in 7–30 days. Get your offer today.",
  overviewContent: [
    "If you're trying to sell a house in Northeastern Pennsylvania, you already know the challenges. NEPA's housing stock is among the oldest in the state — most homes in Scranton, Wilkes-Barre, and surrounding communities were built before 1950. That means sellers frequently face expensive issues like knob-and-tube wiring, lead paint, asbestos, aging foundations, and outdated plumbing that scare off traditional buyers during inspection. Fixing these problems before listing can cost $20,000–$50,000 — money most homeowners don't have sitting around.",
    "NEPA's coal mining heritage adds another layer of complexity. Mine subsidence is a documented concern across Lackawanna and Luzerne counties, and properties built over former mine shafts may have structural complications that make mortgage lenders refuse to finance. For homeowners sitting on properties with these issues, the traditional listing process isn't just difficult — it's often impossible.",
    "Here's the frustrating part: NEPA's market is actually strong right now. Scranton saw approximately 10% price growth in recent years, making it one of the strongest performers in the Northeast. Demand outpaces inventory, and well-priced, move-in-ready homes sell in under 10 days. But that seller's market doesn't help you if your home needs work. The homes we specialize in — the ones with deferred maintenance, mine subsidence risk, code violations, or complicated ownership situations — face a completely different reality on the open market.",
    "That's why ClearEdge exists. Whether you're dealing with an inherited property in Scranton, a rental that's bleeding money in Wilkes-Barre, or a home with L&I violations in Hazleton, we provide a direct path to closing. No repairs, no commissions, no waiting for buyer financing. We've been buying homes across NEPA since 2016 — this is where Tyler started ClearEdge, and it's where we buy most frequently."
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
      answer: "Yes — and we're one of the few cash buyers in the region who will. Mine subsidence is documented across Lackawanna and Luzerne counties, and most traditional buyers (and their mortgage lenders) won't touch it. We assess the structural situation, factor it into our offer, and close as-is. You don't need to fix anything, get engineering reports, or file mine subsidence insurance claims first."
    },
    {
      question: 'How fast can you close on a house in Scranton or Wilkes-Barre?',
      answer: 'We can close in as few as 7 days when the title is clear. Most NEPA transactions close within 14 to 21 days. If there are title complications — like a probate that needs to be opened or a tax lien that needs resolved — we handle the coordination and typically close within 30 days. You choose the closing date that works for you.'
    },
    {
      question: 'Do you buy houses that need major renovations in NEPA?',
      answer: "That's actually our specialty. Many NEPA homes were built before 1950 and need work that would cost $20,000–$50,000+ to address — knob-and-tube wiring, lead paint, asbestos, foundation cracks, full gut renovations. Traditional buyers can't get financing on these properties, so they sit on the market for months. We buy them all as-is, in any condition."
    },
    {
      question: 'I inherited a house in NEPA. Can you help with probate?',
      answer: "Yes — inherited properties are one of the most common situations we handle in NEPA. We regularly buy during the probate process across Lackawanna, Luzerne, and surrounding counties. We can work directly with your estate attorney and close once Letters Testamentary are issued. If you haven't started probate yet, we can also refer you to local attorneys who handle it efficiently."
    },
    {
      question: 'What areas in NEPA does ClearEdge serve?',
      answer: 'We buy properties throughout Northeastern Pennsylvania, including Scranton, Wilkes-Barre, Hazleton, Pittston, Kingston, Nanticoke, Carbondale, Dunmore, Honesdale, Bloomsburg, and all surrounding communities in Lackawanna, Luzerne, Wayne, and Columbia counties. NEPA is where ClearEdge started in 2016 — it\'s where we buy most frequently and know every neighborhood.'
    },
  ],
  mapCenter: { lat: 41.35, lng: -75.75 },
  mapZoom: 8,
}

export const lehighValleyHubData: RegionalHubData = {
  slug: 'lehigh-valley',
  regionName: 'Lehigh Valley',
  h1: 'Cash Home Buyers in the Lehigh Valley — Skip the Repairs, Commissions & Uncertainty',
  subheading: "The Lehigh Valley market is hot — if your home is move-in ready. If it's not, you're looking at $30K+ in repairs, 5–6% in commissions, and months of showings. ClearEdge buys Lehigh Valley houses as-is for cash. Fair offer in 24 hours, close in as few as 7 days.",
  metaTitle: 'Cash Home Buyers in Lehigh Valley | Fair Offer in 24 Hours | ClearEdge',
  metaDescription: "Cash home buyers in the Lehigh Valley. ClearEdge buys houses as-is in Allentown, Bethlehem, Easton, Reading & more. No fees, no repairs, close in 7–30 days. Get your cash offer today.",
  overviewContent: [
    "The Lehigh Valley is one of the fastest-growing regions in Pennsylvania — and that growth has made the housing market brutally competitive. The median home sales price hit $350,000, with single-family home prices up 5% year over year. Move-in-ready homes sell in just 22 days on average, often above asking price. But here's what the market reports don't tell you: that seller's market only works if your home is perfect.",
    "If your house needs significant repairs, has code violations, or comes with complicated circumstances like probate, tenant issues, or a divorce timeline — the Lehigh Valley market actually works against you. Buyers here are savvy and have options. They're not looking for projects. Properties that aren't turnkey sit on the market for months, rack up carrying costs in mortgage payments, taxes, and insurance, and often sell well below expectations after multiple price reductions. By the time you factor in the 5–6% agent commission, 2–4% closing costs, and the $20K–$40K in repairs the buyer's inspector will demand, that \"hot market\" advantage disappears.",
    "The Lehigh Valley's housing stock tells two stories. Beautiful historic homes line Bethlehem's south side and Easton's West Ward — but many are 80 to 100+ years old with expensive structural, electrical, and plumbing challenges lurking behind the charm. Allentown has increased municipal code enforcement, and the city's transfer tax is now 2.5% as of 2026, adding even more cost to the traditional selling process. If your property has deferred maintenance or open violations, the path to a traditional sale gets expensive fast.",
    "That's the gap ClearEdge fills. If you're sitting on a Lehigh Valley property with significant equity but can't afford the repairs needed to list traditionally — or you simply don't want to deal with 90 days of showings, negotiations, and uncertainty — we offer a direct path. Cash offer in 24 hours, no repairs, no commissions, and you choose your closing date. For homes that need work, homeowners often net more with us after factoring in the true cost of a traditional sale."
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
      question: "What's the Lehigh Valley housing market like in 2026?",
      answer: "It's a strong seller's market — but only for move-in-ready homes. Those sell in about 22 days at or above asking price. If your property needs repairs, has code violations, or comes with complications like probate or tenant issues, the traditional market works against you. Homes that aren't turnkey sit for 90+ days and often sell well below expectations after multiple price reductions. For those properties, a direct cash sale often nets you more after you factor in the $20K–$40K in repairs, 5–6% commissions, and months of carrying costs."
    },
    {
      question: 'Does ClearEdge buy houses in all Lehigh Valley communities?',
      answer: 'Yes. We buy throughout Lehigh and Northampton counties — Allentown, Bethlehem, Easton, and all surrounding townships and boroughs. We also serve Reading in Berks County and Pottsville in Schuylkill County. No property is too far if it\'s in our service area.'
    },
    {
      question: 'How does selling to ClearEdge compare to listing with a Lehigh Valley agent?',
      answer: "Here's the honest math: a traditional listing in the Lehigh Valley involves 5–6% commission ($17,500–$21,000 on a $350K home), 2–4% in closing costs, potential repairs of $10,000–$40,000, and 60–90 days on market while you keep paying the mortgage, taxes, and insurance. With ClearEdge, you get a cash offer in 24 hours, zero fees, zero repairs, and you choose your closing date. For homes that need work, the net proceeds are often comparable — without the 90 days of uncertainty."
    },
    {
      question: 'I just inherited a property in Bethlehem. What are my options?',
      answer: "We buy inherited properties regularly across the Lehigh Valley, including during probate. You don't need to clean it out, repair it, or even visit the property. We handle everything — from the initial walkthrough to coordinating with the title company and your estate attorney. If you haven't opened probate yet, we can connect you with local attorneys who handle it efficiently."
    },
    {
      question: 'Are there any fees when I sell to ClearEdge in the Lehigh Valley?',
      answer: "None. Zero commissions, zero closing costs, zero junk fees. The cash offer we make is exactly what you receive at closing. That's especially significant in the Lehigh Valley where Allentown's transfer tax alone is 2.5% — a cost we absorb completely."
    },
  ],
  mapCenter: { lat: 40.62, lng: -75.43 },
  mapZoom: 9,
}

export const poconosHubData: RegionalHubData = {
  slug: 'poconos',
  regionName: 'Poconos',
  h1: 'Cash Home Buyers in the Poconos — Cabins, Vacation Homes & Residential Properties',
  subheading: "Vacation homes, A-frames, lakefront properties, Airbnbs that stopped producing — whatever you own in the Poconos, ClearEdge buys it as-is for cash. No seasonal waiting, no buyer financing falling through, no $20K septic repair before you can list. Fair offer in 24 hours.",
  metaTitle: 'Cash Home Buyers in the Poconos | Fair Offer in 24 Hours | ClearEdge',
  metaDescription: "Cash home buyers in the Poconos. ClearEdge buys cabins, A-frames, lakefront homes & vacation properties as-is for cash. No fees, no repairs. Close in 7–30 days. Get your offer today.",
  overviewContent: [
    "Selling a Pocono property isn't like selling a house anywhere else in Eastern Pennsylvania. If you've tried — or even thought about trying — you already know the challenges: seasonal demand that disappears after Labor Day, vacation-home financing that shrinks your buyer pool, and property issues specific to mountain and lakefront living that scare off every traditional buyer who walks through the door.",
    "Here's the reality most Pocono sellers face: buyers shop in spring and summer. If you need to sell in the off-season, you could wait 4–6 months for serious interest. And because most Pocono purchases are second homes or investment properties, those buyers are pickier and more likely to walk away over inspection issues — this isn't their primary residence, so they have zero urgency to close. Financing is harder too, with second-home mortgages requiring 10–20% down payments, which eliminates a huge chunk of the buyer pool before you even get a showing.",
    "Then there are the property-specific complications that make traditional sales nearly impossible. Septic system failures cost $15,000–$30,000 to replace — and that's a deal-killer for any financed buyer. Well water issues, winterization damage from frozen pipes, aging A-frame structures with roof and insulation problems, and HOA transfer complications add more friction. ClearEdge has bought Pocono properties with all of these issues. They don't scare us — they're exactly what we specialize in.",
    "The short-term rental landscape has also shifted dramatically. Many Pocono property owners invested in Airbnb and VRBO properties during the pandemic boom, only to see bookings decline 30–40% and some townships crack down on STR regulations. If you're sitting on a vacation rental that's costing you more in maintenance, insurance, and management fees than it's generating in bookings, a cash sale lets you exit quickly without waiting for seasonal demand to come back.",
    "Whether you own a cabin in the woods, a lakefront home on Lake Wallenpaupack, a ski chalet in an HOA community, or a residential property in Stroudsburg or East Stroudsburg — ClearEdge can make you a fair cash offer and close on your timeline. No repairs, no seasonal waiting, no buyer financing contingencies."
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
      answer: "Yes — vacation properties are a major part of what we buy. A-frames, lakefront homes on Lake Wallenpaupack, ski chalets, HOA community properties, cabins, and standard residential homes. Condition doesn't matter. We've bought Pocono properties with failed septics, winterization damage, mold, and structural issues that no traditional buyer would touch."
    },
    {
      question: 'Can you buy my Pocono property if it has septic or well issues?',
      answer: "Absolutely — and this is actually one of the most common reasons Pocono owners call us. A failed septic system costs $15,000–$30,000 to replace, and that's a deal-killer for any financed buyer. Well water contamination and low-yield wells create similar problems. We factor these repair costs into our offer so you don't have to spend a dime or wait months for contractors."
    },
    {
      question: "I'm an out-of-state owner. Can you handle everything remotely?",
      answer: "Yes — and most of our Pocono sellers are out-of-state. Property owners in New Jersey, New York, Connecticut, and beyond call us specifically because they don't want to make the trip up to deal with repairs, cleanouts, or showings. We handle everything from the initial walkthrough to coordinating with the title company and managing any HOA transfer requirements. You can sign closing documents remotely through a mobile notary in your area."
    },
    {
      question: 'How does selling a Pocono vacation home differ from selling a primary residence?',
      answer: "Three major differences work against you: (1) seasonal demand means most buyers only shop spring through summer — listing in October means waiting until May for serious interest, (2) second-home mortgages require 10–20% down, which eliminates a large portion of the buyer pool, and (3) vacation-home buyers are pickier and more likely to walk away over inspection issues since this isn't their primary home. A cash sale to ClearEdge eliminates all three of these challenges — we buy year-round, don't need financing, and buy as-is."
    },
    {
      question: 'My Pocono property is in an HOA. Is that a problem?',
      answer: "Not at all. We regularly buy properties in Pocono HOA communities — including those with outstanding assessments, pending special assessments, or transfer fee requirements. We'll work directly with the association, handle all transfer paperwork, and cover any applicable fees."
    },
  ],
  mapCenter: { lat: 41.05, lng: -75.35 },
  mapZoom: 9,
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
