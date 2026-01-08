const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "d78o4wq2",
  dataset: "production",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2024-01-01",
});

// Helper to create text blocks
function block(text, style = 'normal', markDefs = [], children = null) {
  const key = Math.random().toString(36).substring(2, 10);
  return {
    _type: 'block',
    _key: key,
    style,
    markDefs: markDefs,
    children: children || [{ _type: 'span', _key: key + 's', text, marks: [] }],
  };
}

function boldSpan(text) {
  const key = Math.random().toString(36).substring(2, 10);
  return { _type: 'span', _key: key, text, marks: ['strong'] };
}

function span(text, marks = []) {
  const key = Math.random().toString(36).substring(2, 10);
  return { _type: 'span', _key: key, text, marks };
}

// Build the content as Portable Text blocks
const content = [
  block('The Easton PA rental inspection checklist 2026 is 47 pages of municipal code that can shut down your rental business in a single failed inspection.'),
  block('Not exaggerating.'),
  block("I've watched landlords lose their rental licenses over a missing outlet cover."),
  block("Seen properties condemned because a smoke detector wasn't hardwired."),
  block("Watched guys who owned rentals for 20 years get slapped with $300-to-$1,000 daily fines because they didn't know the rules changed."),
  block("I'm Tyler Swenson."),
  block("I've been investing in Eastern PA real estate since 2016, starting with a single duplex in Scranton."),
  block("Since then, I've helped over 200 homeowners across the Lehigh Valley, NEPA, and the Poconos navigate exactly this kind of situation."),
  block("I've been featured in The Morning Call and Lehigh Valley Business."),
  block("I speak at REIA meetups throughout Eastern PA."),
  block("And I'm telling you: Easton's rental inspection program is one of the most aggressive in the region."),
  block("Here's everything you need to pass."),

  block('Why the Easton PA Rental Inspection Checklist 2026 Matters More Than Ever', 'h2'),
  block("Easton doesn't play games with landlords."),
  block('The city found that rental properties have "greater incidence and greater severity of violations" than owner-occupied homes.'),
  block("That's a direct quote from Ordinance #4954."),
  block("So they built a systematic inspection process with teeth."),
  {
    _type: 'block',
    _key: 'framework1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Here's the framework:")]
  },
  {
    _type: 'block',
    _key: 'fw1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Every rental unit must be registered annually"), span(" — no exceptions")]
  },
  {
    _type: 'block',
    _key: 'fw2',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Physical inspections happen at least once every four years")]
  },
  {
    _type: 'block',
    _key: 'fw3',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Fines range from $300 to $1,000 per violation")]
  },
  {
    _type: 'block',
    _key: 'fw4',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Each day a violation continues counts as a separate offense")]
  },
  block("Do the math."),
  block("A $500 fine on Monday becomes $1,000 by Tuesday."),
  block("$1,500 by Wednesday."),
  block("By the end of the month, you're looking at $15,000+ in accumulated penalties."),
  block("And that's just for one violation."),

  block("The Ward-Based Registration Deadlines You Can't Miss", 'h2'),
  block("Easton uses a staggered registration system based on which ward your property is in."),
  block("Miss your deadline and you'll pay penalty fees on top of your registration."),
  {
    _type: 'block',
    _key: 'deadlines',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("2026 Registration Deadlines:")]
  },
  block("College Hill: March 15 | Downtown: May 15 | South Side: July 15 | West Ward: September 15"),
  block("The registration year runs from August 15 to August 14 of the following year."),
  block("If you're not sure which ward you're in, call the Bureau of Codes at (610) 250-6724."),
  block("They're on the 2nd floor of City Hall at 123 S. Third Street, Easton, PA."),

  block("Easton PA Rental Inspection Checklist 2026: The Complete Breakdown", 'h2'),
  block("The city's official inspection guide is based on Chapter 435 (Property Maintenance Code) and Chapter 456 (Rental Property) of the City of Easton Code."),
  block("I've broken it down into three categories:"),
  {
    _type: 'block',
    _key: 'cat1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("1. Exterior inspection"), span(" — What they see before walking in")]
  },
  {
    _type: 'block',
    _key: 'cat2',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("2. Life safety systems"), span(" — The stuff that gets you condemned")]
  },
  {
    _type: 'block',
    _key: 'cat3',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("3. Interior habitability"), span(" — Everything else")]
  },
  block("Let's go through each one."),

  block("Exterior Inspection: Easton PA Rental Inspection Checklist 2026", 'h2'),
  block("The inspection starts at the curb."),
  block("Before the code officer even touches your front door, they're evaluating:"),

  block("Address Numbers", 'h3'),
  block("Must be installed on the front of the main structure. Must contrast with the background (white numbers on white siding = fail). No specific size requirement in Easton's code, but make them visible from the street."),

  block("Sidewalks and Yard", 'h3'),
  block("No tripping hazards. No debris, weeds, or high grass. No inoperable vehicles."),

  block("Main Structure Exterior", 'h3'),
  block("No peeling or chipped paint (especially important for pre-1978 buildings — lead hazard). No missing or damaged siding. No rotted wood anywhere. Windows intact — no broken glass. Gutters and downspouts in good repair. Roof in good condition. Chimneys structurally safe. Foundation free of excessive cracking. Crawlspace openings securely covered."),

  block("Accessory Structures", 'h3'),
  block("Detached garages must be structurally sound. Sheds must be in good repair. Fences must be solid and functional. All accessory structures get the same scrutiny as the main building."),

  block("Fire Escapes", 'h3'),
  {
    _type: 'block',
    _key: 'fire1',
    style: 'normal',
    markDefs: [],
    children: [span("Must be properly installed and maintained. "), boldSpan("Professional engineer inspection required every 5 years."), span(" Report must be submitted to Code Enforcement.")]
  },

  block("Life Safety Systems: The Section That Shuts Landlords Down", 'h2'),
  block("This is where most landlords fail."),
  block("And it's where the city shows no mercy."),

  block("Smoke Detector Requirements", 'h3'),
  block("Location Requirements: At least one detector in the hallway outside each sleeping area. One detector installed inside each bedroom. One detector on each story of the dwelling unit."),
  {
    _type: 'block',
    _key: 'smoke1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Technical Requirements: Hardwired (electric) detectors with battery backup."), span(" If a hardwired detector fails, you cannot replace it with a battery-only unit. Interconnected systems must be maintained in working order.")]
  },
  block("This trips up a lot of landlords."),
  block("Your tenant's smoke detector dies. They grab a $15 battery-powered unit from Home Depot. Problem solved, right?"),
  block("Wrong. That's now a code violation."),
  block("You need to replace it with a proper hardwired unit with battery backup."),

  block("Fire Extinguisher Requirements", 'h3'),
  block("Minimum 5-lb ABC fire extinguisher (rated 2A-10BC). Mounted in the kitchen area of each dwelling unit. Basements in multi-unit structures require their own extinguisher."),
  {
    _type: 'block',
    _key: 'ext1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("All fire extinguishers must be inspected annually by a certified professional."), span(" Keep the inspection tag current.")]
  },

  block("Fire Protection Systems (Multi-Unit Buildings)", 'h3'),
  block("Must be tested and inspected by a certified professional annually. Code Office must receive an NFPA 72 inspection sheet. Inspection must be completed by a minimum NICET Level III certified professional."),
  block("This isn't optional. No NFPA 72 documentation = no license renewal."),

  block("Door and Lock Requirements", 'h3'),
  {
    _type: 'block',
    _key: 'door1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("The Double-Keyed Lock Ban:"), span(" Double-keyed locks (keyed on both sides) are prohibited on exterior doors. This is a fire safety issue — people need to get out fast.")]
  },
  {
    _type: 'block',
    _key: 'door2',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Bedroom Locks:"), span(" Keyed locks are prohibited on the inside of bedroom doors. Doors must be readily openable without special tools, keys, or knowledge.")]
  },

  block("Handrail Requirements", 'h3'),
  block("Required on all stairs (interior and exterior) with four or more risers. Height: 30-42 inches measured from the tread nosing. Must be properly installed and in good repair."),
  block("Guards (railings on open sides): Required on any portion of stairs, landings, balconies, porches, decks, or ramps more than 30 inches above the floor or grade below. Height: minimum 30 inches above the walking surface."),

  block("Interior Habitability: Easton PA Rental Inspection Checklist 2026", 'h2'),
  block("Everything beyond life safety falls into habitability."),
  block('This is the "would a reasonable person live here" test.'),

  block("General Cleanliness", 'h3'),
  block('The city\'s official guide states "all surfaces must be clean." That includes: Walls, Windows, Countertops, Sinks, Tubs, Cabinets, Floors.'),
  block('I know what you\'re thinking. "But my tenant is a slob."'),
  block("Doesn't matter. You're responsible for presenting a clean unit at inspection time. Coordinate with your tenants."),

  block("Electrical Systems", 'h3'),
  block("Panel Box: Properly installed, labeled, blanks installed for missing knockouts and unused breaker openings."),
  block("All switch covers and outlet covers installed. No missing blanks."),
  {
    _type: 'block',
    _key: 'elec1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Extension Cord Ban:"), span(" Extension cords cannot be used as permanent wiring. Cannot power heaters, air conditioners, or similar equipment.")]
  },

  block("Bedroom Requirements", 'h3'),
  block("Minimum Size: 70 square feet for one occupant. For more than one occupant: minimum 50 square feet per person. Ceiling Height: Minimum 7 feet for all habitable spaces."),

  block("Bathroom Requirements", 'h3'),
  block("Sinks, tubs, and toilets clean and functional. Plumbing properly installed. No leakage under bathroom sink. Either an openable window OR mechanical ventilation is required."),

  block("Kitchen Requirements", 'h3'),
  block("All surfaces clean. Cabinets, countertops, storage areas in good repair. No leaks under sink. Trap installed under sink. Stove and refrigerator must be clean and in proper working order."),

  block("Water Heater Requirements", 'h3'),
  {
    _type: 'block',
    _key: 'water1',
    style: 'normal',
    markDefs: [],
    children: [span("Properly installed. If gas: properly vented. "), boldSpan("Temperature-pressure relief valve with discharge pipe."), span(" Discharge pipe must extend to within 6 inches of the floor.")]
  },

  block("Heating Systems", 'h3'),
  {
    _type: 'block',
    _key: 'heat1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Fuel-fired heating systems and chimneys must be inspected, cleaned, and certified by qualified professionals within the past 12 months."), span(" Signed copies of certificates must be provided to Code Enforcement.")]
  },
  block("This is another annual requirement that catches landlords off guard."),
  block("No furnace certification = failed inspection."),

  block("The Fee Schedule: What Easton Charges Landlords in 2026", 'h2'),
  block("Here's what you'll pay:"),
  block("Missed appointment / unable to gain entry: $100"),
  block("Reinstatement fee (per unit): $150"),
  block("Property Maintenance Board of Appeals: $500 (paid in advance)"),
  block("Buyer Notification Inspection (1-2 family): $150 per unit"),
  block("Violation tickets: $30 per violation"),
  {
    _type: 'block',
    _key: 'fine1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("And the big one: Fines for code violations: $300 to $1,000 per offense, plus costs.")]
  },
  block("Each day after notice = separate offense."),
  block("Up to 90 days imprisonment for serious violations."),

  block("The Inspection Process: What to Expect", 'h2'),
  {
    _type: 'block',
    _key: 'proc1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Initial Inspection:"), span(" Bureau of Codes contacts you to schedule. Owner or manager must accompany the code officer. Inspector evaluates against Chapter 435 requirements.")]
  },
  {
    _type: 'block',
    _key: 'proc2',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("If Violations Are Found:"), span(" You receive a written report. You get a deadline to correct violations. First re-check inspection is included in your registration fee.")]
  },
  {
    _type: 'block',
    _key: 'proc3',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("If You Fail the Re-Check:"), span(" Additional re-inspection fees apply. Continued failure can result in condemnation or declaration of premises as unfit for habitation.")]
  },

  block("Pre-1978 Buildings: Lead Paint Disclosure Requirements", 'h2'),
  block('If your property was built before 1978, federal law requires you to: Provide tenants with the EPA pamphlet "Protect Your Family from Lead in Your Home." Disclose any known lead-based paint or lead hazards. Include a Lead Warning Statement in the lease.'),
  block("This is federal — not just Easton."),
  block("And Easton inspectors will flag peeling paint in pre-1978 buildings as a potential lead hazard."),

  block("8 Most Common Easton Rental Inspection Failures", 'h2'),
  block("Based on my experience working with Lehigh Valley landlords, here are the violations I see most often:"),

  {
    _type: 'block',
    _key: 'fail1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("1. Smoke Detector Issues:"), span(" Battery-only units, missing detectors in bedrooms, non-interconnected systems. Fix: Install hardwired, interconnected smoke detectors with battery backup.")]
  },
  {
    _type: 'block',
    _key: 'fail2',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("2. Missing Fire Extinguisher Inspection Tags:"), span(" Extinguisher is there but hasn't been professionally inspected in years. Fix: Schedule annual professional inspection.")]
  },
  {
    _type: 'block',
    _key: 'fail3',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("3. No Furnace Certification:"), span(" You forgot to get the annual HVAC inspection. Fix: Schedule a cleaning and certification with a qualified HVAC professional.")]
  },
  {
    _type: 'block',
    _key: 'fail4',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("4. Peeling Exterior Paint:"), span(" Wood trim, window frames, or siding has chipped paint. Fix: Scrape, prime, and repaint. For pre-1978 buildings, use lead-safe work practices.")]
  },
  {
    _type: 'block',
    _key: 'fail5',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("5. Missing Outlet or Switch Covers:"), span(" The $0.50 cover plate that costs you $500 in fines. Fix: Walk through every room. Replace every missing cover.")]
  },
  {
    _type: 'block',
    _key: 'fail6',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("6. Water Heater Discharge Pipe Issues:"), span(" TPR valve has no discharge pipe, or pipe doesn't extend to within 6 inches of the floor. Fix: Install proper discharge pipe per code.")]
  },
  {
    _type: 'block',
    _key: 'fail7',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("7. Interior Locks on Bedroom Doors:"), span(" Keyed locks that could trap someone during a fire. Fix: Replace with privacy locks that can be opened from inside without a key.")]
  },
  {
    _type: 'block',
    _key: 'fail8',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("8. Window Screen Issues:"), span(" Missing, torn, or improperly installed screens. Fix: Replace screens. They're cheap.")]
  },

  block("Frequently Asked Questions", 'h2'),
  {
    _type: 'block',
    _key: 'faq1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Do I need to register vacant units?"), span(" Yes. If the unit is available for rent — even if currently empty — it must be registered.")]
  },
  {
    _type: 'block',
    _key: 'faq2',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("How often is the physical inspection?"), span(" Registration is annual. Physical inspections happen at least once every four years.")]
  },
  {
    _type: 'block',
    _key: 'faq3',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("What if I can't be at the inspection?"), span(" The owner or manager must accompany the code officer. If you don't show up or can't gain entry, you'll be charged a $100 fee.")]
  },
  {
    _type: 'block',
    _key: 'faq4',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Can I appeal a violation?"), span(" Yes. You can request a hearing before the Property Maintenance Board of Appeals. The fee is $500, paid in advance.")]
  },
  {
    _type: 'block',
    _key: 'faq5',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Do I need a business license?"), span(" Yes. A business license is required as part of the residential rental license process.")]
  },

  block("When Selling Makes More Sense Than Repairing", 'h2'),
  block("I work with landlords every week who are staring at thousands of dollars in code compliance repairs."),
  block("New HVAC system. Hardwired smoke detectors throughout. Lead paint remediation. Structural repairs. Fire escape engineering report."),
  block("Add up the costs. Factor in the time. Consider the stress of managing the inspection process while tenants are still in place."),
  block("Sometimes the math just doesn't work."),
  block("That's when selling as-is makes sense."),
  block("At ClearEdge Home Buyers, I buy rental properties in Easton with code violations."),
  block("As-is. No repairs required. No cleaning. No fire extinguisher inspections. No waiting for city approval."),
  block("I handle the violations after closing."),
  {
    _type: 'block',
    _key: 'cta1',
    style: 'normal',
    markDefs: [{ _type: 'link', _key: 'homeLink', href: '/' }],
    children: [span("If your Easton rental has inspection issues and you're done dealing with the city, "), span("get a free, no-obligation cash offer here", ['homeLink']), span(".")]
  },

  block("The Bottom Line on the Easton PA Rental Inspection Checklist 2026", 'h2'),
  block("Easton's rental inspection program exists for good reasons. Tenants deserve safe housing."),
  block("But for landlords, it means staying on top of: Annual registration (by your ward deadline), Four-year inspection cycles, Annual furnace certifications, Annual fire extinguisher inspections, NFPA 72 documentation for fire systems, Five-year fire escape engineering reports, Smoke detector compliance, Lead paint disclosure (pre-1978 buildings), And dozens of property maintenance requirements."),
  block("Miss any of these and you're looking at fines, re-inspection fees, and potentially losing your rental license."),
  block("The properties that pass inspection are the ones where landlords stay proactive."),
  block("Schedule your own walk-through before the city does. Use this checklist. Fix problems before they become violations."),
  block("And if the repairs don't make financial sense, there's always another option."),
  block("For questions about Easton rental requirements, contact the Bureau of Codes at (610) 250-6724."),
  {
    _type: 'block',
    _key: 'ctafinal',
    style: 'normal',
    markDefs: [{ _type: 'link', _key: 'homeLink2', href: '/' }],
    children: [span("For a cash offer on your Easton rental property — violations and all — "), span("request your offer here", ['homeLink2']), span(".")]
  },
  block("This guide covers the Easton PA rental inspection checklist 2026 based on current city ordinances and Chapter 435 of the City of Easton Code. Requirements may change — always verify current requirements with the Bureau of Codes.", 'normal'),
];

const blogPost = {
  _type: "blogPost",
  title: "Easton PA Rental Inspection Checklist 2026: The Complete Landlord Survival Guide",
  slug: { current: "easton-pa-rental-inspection-checklist-2026" },
  metaTitle: "Easton PA Rental Inspection Checklist 2026 | Complete Landlord Guide",
  metaDescription: "Master the Easton PA rental inspection checklist 2026. Ward registration deadlines, Chapter 435 requirements, fee schedules, and how to pass your inspection the first time.",
  excerpt: "Complete 2026 guide to Easton's rental inspection requirements. Ward deadlines, smoke detector rules, fee schedules, and the 8 most common failures that cost landlords their licenses.",
  author: "Tyler Swenson",
  authorTitle: "Founder, ClearEdge Home Buyers",
  publishedAt: "2026-01-08T12:00:00Z",
  category: "locations",
  content: content,
  faqs: [
    {
      question: "Do I need to register vacant units in Easton?",
      answer: "Yes. If the unit is available for rent — even if currently empty — it must be registered with the Bureau of Codes."
    },
    {
      question: "How often is the physical rental inspection in Easton?",
      answer: "Registration is annual. Physical inspections happen at least once every four years."
    },
    {
      question: "What if I can't be at the Easton rental inspection?",
      answer: "The owner or manager must accompany the code officer. If you don't show up or can't gain entry, you'll be charged a $100 fee."
    },
    {
      question: "Can I appeal a violation in Easton?",
      answer: "Yes. You can request a hearing before the Property Maintenance Board of Appeals. The fee is $500, paid in advance."
    },
    {
      question: "What are the fines for Easton rental code violations?",
      answer: "Fines range from $300 to $1,000 per offense, plus costs. Each day a violation continues after notice counts as a separate offense."
    },
    {
      question: "What are the Easton rental registration deadlines by ward?",
      answer: "College Hill: March 15, Downtown: May 15, South Side: July 15, West Ward: September 15. The registration year runs August 15 to August 14."
    }
  ]
};

async function deployBlogPost() {
  try {
    console.log("Fetching Easton location reference...");
    const locations = await client.fetch(
      `*[_type == "location" && slug.current in $slugs]{ _id, city, slug }`,
      { slugs: ['easton', 'lehigh-valley'] }
    );
    console.log("Found locations:", locations.map(l => l.city));

    const doc = {
      ...blogPost,
      relatedLocations: locations.map(loc => ({
        _type: 'reference',
        _ref: loc._id,
        _key: `loc-${loc.slug.current}`
      }))
    };

    console.log("Creating blog post in Sanity...");
    const result = await client.create(doc);
    console.log("✅ Blog post created successfully!");
    console.log("Document ID:", result._id);
    console.log("URL: https://www.clearedgehomebuyers.com/blog/easton-pa-rental-inspection-checklist-2026");
    return result;
  } catch (error) {
    console.error("Error creating blog post:", error.message);
    throw error;
  }
}

deployBlogPost();
