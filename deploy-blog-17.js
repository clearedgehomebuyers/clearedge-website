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
  block("To stop GovOS fines Poconos house owners are now facing, you need to move faster than the township's automated enforcement software."),
  block("I'm not exaggerating."),
  block("The letter probably arrived last week. Maybe yesterday."),
  block('Inside was a notice from the township saying you\'re operating an "illegal short-term rental."'),
  block('And you\'re thinking: "Wait, I bought this house specifically to Airbnb it."'),
  block("Now you're staring at $500 to $1,000 in daily fines."),
  block("Growing while you sleep."),
  block("Growing while you figure out what happened."),
  block("Growing while you call the township and get put on hold."),
  block("I'm Tyler Swenson."),
  block("I've been investing in Eastern Pennsylvania real estate since 2016, starting with a single duplex in Scranton."),
  block("Since then, I've helped over 200 homeowners across the Poconos, Lehigh Valley, and NEPA exit exactly this kind of situation."),
  block("I've been featured in The Morning Call and Lehigh Valley Business."),
  block("I speak at REIA meetups throughout Eastern PA."),
  block("And right now, I'm watching Poconos STR owners get blindsided by enforcement technology they didn't know existed."),
  block("Here's everything you need to know."),

  block("What Is GovOS and Why Is It Flagging Your Poconos House?", 'h2'),
  block("GovOS is compliance software that townships use to identify unlicensed short-term rentals."),
  block("It works by scraping Airbnb, VRBO, and other booking platforms."),
  block("The software matches property addresses against municipal records."),
  block("If your listing shows an active calendar but no STR license on file, you get flagged automatically."),
  block("The township doesn't need to send an inspector. The township doesn't need a neighbor complaint. The computer does the work."),
  {
    _type: 'block',
    _key: 'govos1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Here's what GovOS captures:")]
  },
  block("Property address from your listing. Number of bedrooms advertised. Active booking calendar. Photos that can identify the property. Review history confirming rentals occurred."),
  block('According to GovOS\'s own marketing, their system identifies 98% of all STRs using "human-eye verification."'),
  block("One Poconos township achieved a 93% compliance rate and generated over $8.8 million in tax revenue and licensing fees in their first year using this software."),
  block("That money came from somewhere. It came from owners like you."),

  block("The 2019 Court Case That Changed Everything", 'h2'),
  {
    _type: 'block',
    _key: 'court1',
    style: 'normal',
    markDefs: [],
    children: [span("In 2019, the Pennsylvania Supreme Court ruled in "), boldSpan("Slice of Life, LLC v. Hamilton Township Zoning Hearing Board"), span(".")]
  },
  block('The court upheld that local zoning ordinances could "clearly and unambiguously" exclude "purely transient uses of property."'),
  block("Translation: Townships can ban short-term rentals in residential zones. And they have been."),
  block("Since that ruling, townships across Monroe County and Pike County have been rewriting their ordinances."),
  block("Some created licensing programs with strict requirements. Others banned STRs entirely in R-1 and R-2 residential zones."),
  block("And if you bought a Poconos vacation property between 2020 and 2024 without checking the latest ordinances, you might be holding an asset you can no longer legally use."),

  block("Township-by-Township Breakdown: Where You Stand in 2026", 'h2'),
  block("The Poconos isn't one jurisdiction. It's a patchwork of townships, each with different rules. Here's the current landscape:"),

  block("Tobyhanna Township (Monroe County)", 'h3'),
  {
    _type: 'block',
    _key: 'toby1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Includes:"), span(" Pocono Pines (18350), Pocono Lake, Blakeslee")]
  },
  {
    _type: 'block',
    _key: 'toby2',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Status:"), span(" STR ordinance enacted 2022, revised February 2024")]
  },
  block("Ordinance No. 569 requires STR permits. Occupancy limit: 2 per bedroom + 2 additional. Over 1,200 STR licenses issued. Fines reduced in 2024 to comply with state guidelines."),
  {
    _type: 'block',
    _key: 'toby3',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("The Catch:"), span(" Licenses are NOT transferable. If you buy a property with an existing license, that license terminates. You go to the back of the line.")]
  },

  block("Lehman Township (Pike County)", 'h3'),
  {
    _type: 'block',
    _key: 'lehman1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Includes:"), span(" Bushkill (18324)")]
  },
  {
    _type: 'block',
    _key: 'lehman2',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Status:"), span(" Complete freeze on new STR licenses")]
  },
  block("As of January 2025, NO new short-term rentals are permitted in any residential zone. Existing licenses (~200 total) are grandfathered."),
  {
    _type: 'block',
    _key: 'lehman3',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("The Reality:"), span(" If you bought in Lehman Township planning to STR and the property didn't have an existing license, you're locked out. Period.")]
  },

  block("Jackson Township (Monroe County)", 'h3'),
  block("License freeze in residential districts. New STR licenses are not being issued in residential zones. Initial permit fee: $1,000. Annual renewal fee: $750."),

  block("Coolbaugh Township (Monroe County)", 'h3'),
  block("Relatively STR-friendly. STRs allowed in residential zones with permits. Maximum occupancy: 2 per bedroom + 2. One parking space per bedroom, up to six."),

  block("Stroud Township (Monroe County)", 'h3'),
  block("Highly restrictive. STRs only allowed in two communities: Penn Estates and Blue Mountain Lake Estates. All other residential areas: banned."),

  block("How to Stop GovOS Fines Poconos House Penalties Right Now", 'h2'),
  block("If you just received a Notice of Violation, the clock is ticking. Every day you wait is another day of fines accumulating."),
  block("Here's your immediate action plan:"),

  block("Step 1: Take Down Your Listings Immediately", 'h3'),
  block("Don't just \"snooze\" your calendar. Don't just block off dates."),
  {
    _type: 'block',
    _key: 'step1a',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Delete the listing entirely.")]
  },
  block("GovOS is looking for active calendars. The software doesn't care if you have no bookings. If the listing exists and shows availability, you're advertising an illegal rental."),
  block('Under most Poconos township ordinances, "advertising" a rental is a violation—even if no guests ever stay there.'),

  block("Step 2: Verify Your Zoning", 'h3'),
  block("Call the township zoning office and ask: What zone is my property in? Are STRs permitted in this zone? Is there a grandfathering provision?"),

  block("Step 3: Address the Active Violation Status", 'h3'),
  block("The township won't stop assessing fines until they verify the property is no longer being used as an STR."),
  block("This often requires: Written confirmation that all listings are removed. Physical inspection to ensure no guests are present. Payment or settlement of accumulated fines."),

  block("Step 4: Understand That Fines Stay With the Property", 'h3'),
  {
    _type: 'block',
    _key: 'step4a',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("This is critical.")]
  },
  block("In Pennsylvania, municipal fines and liens typically attach to the property, not the owner."),
  block("If you try to sell without addressing the fines, they transfer to the new owner—which means: Retail buyers will discover them during title search. Mortgage lenders won't close with outstanding municipal liens. Your sale will fall through."),

  block("The Three Options You Actually Have", 'h2'),
  block("If your Poconos STR dream has collided with 2026 enforcement reality, you have three paths forward:"),

  block("Option 1: Pivot to Long-Term Rental", 'h3'),
  block("You can convert to a 12-month lease tenant."),
  {
    _type: 'block',
    _key: 'opt1a',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("The math problem:"), span(" Your ROI will likely drop 50% or more compared to STR income.")]
  },
  block("A 3-bedroom that was grossing $4,000/month on Airbnb might rent for $1,800/month to a long-term tenant."),

  block("Option 2: List With a Realtor (Retail Sale)", 'h3'),
  block("You can try to sell on the open market."),
  {
    _type: 'block',
    _key: 'opt2a',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("The complications:"), span(" You'll need to pass a Certificate of Occupancy inspection. Outstanding violations must be disclosed. Fines and liens appear on title search. Retail buyers will either walk away or demand massive price reductions.")]
  },

  block("Option 3: The Cash Exit", 'h3'),
  block("This is where we come in."),
  block("At ClearEdge Home Buyers, we buy Poconos houses with active zoning violations and GovOS fines."),
  block("We close fast enough to stop the daily fines from continuing to accumulate."),
  block("We don't require inspections. We take the property as-is—Airbnb furniture and all."),

  block("The Pennsylvania MCOCA Rules That Make Cash Sales Possible", 'h2'),
  block("Here's what most Poconos STR owners don't know."),
  {
    _type: 'block',
    _key: 'mcoca1',
    style: 'normal',
    markDefs: [],
    children: [span("Pennsylvania has a law called the "), boldSpan("Municipal Code and Ordinance Compliance Act (MCOCA)"), span(".")]
  },
  block("It was amended in 2016 (Act 133) and again in 2024 (Act 93)."),
  block("MCOCA establishes rules for how municipalities handle property sales when code violations exist."),

  block("The Three Types of Certificates", 'h3'),
  {
    _type: 'block',
    _key: 'cert1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("1. Full Use & Occupancy (U&O):"), span(" The house passed inspection. No issues. New owner moves in immediately.")]
  },
  {
    _type: 'block',
    _key: 'cert2',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("2. Temporary Use & Occupancy:"), span(" Issued for minor violations. Allows the buyer to live in the house while fixing issues. 12 months to complete repairs.")]
  },
  {
    _type: 'block',
    _key: 'cert3',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("3. Temporary Access Certificate:"), span(' This is the "Investor Special." Issued for substantial violations. Prevents anyone from living there. Gives the buyer legal access to perform repairs. 12 months to bring into compliance.')]
  },

  block("The 12-Month Grace Period Rule", 'h3'),
  {
    _type: 'block',
    _key: 'grace1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("This is the most important part.")]
  },
  block("According to MCOCA, once a property is sold, the municipality must give the new owner 12 months from the date of purchase to bring the property into compliance."),
  {
    _type: 'block',
    _key: 'grace2',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Why retail buyers can't use this:"), span(' Their mortgage lender won\'t close if the house is "unfit for habitation." Banks require properties to meet minimum habitability standards. The loan falls through.')]
  },
  {
    _type: 'block',
    _key: 'grace3',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Why cash buyers can:"), span(" We don't have a bank. We can sign a \"Temporary Access\" agreement with the municipality. We take the legal responsibility for repairs onto our own shoulders. You walk away with cash in days. We spend the next 12 months fixing everything.")]
  },

  block("The Real Cost of Ignoring GovOS Fines", 'h2'),
  block("Let me show you the math."),
  block("Scenario: You own a 4-bedroom in Pocono Pines. You've been STR'ing without a license since 2023. The township sends a Notice of Violation in January 2026."),
  {
    _type: 'block',
    _key: 'cost1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("Conservative fine structure:"), span(" $500/day")]
  },
  block("Day 1: $500. Day 30: $15,000. Day 60: $30,000. Day 90: $45,000."),
  block("By the time you figure out your options, hire an attorney, and try to negotiate, you could be looking at $50,000+ in accumulated fines."),
  block("That's equity evaporating."),
  block("And here's the worse news: In Monroe County, unpaid municipal fines can become a lien on your property."),
  block("Eventually, they can lead to: Sheriff sale. Revocation of all future permits for that address. Difficulty selling to anyone."),

  block("Stop GovOS Fines Poconos House: Critical FAQs", 'h2'),
  {
    _type: 'block',
    _key: 'faq1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan('"Can I fight the GovOS data in court?"'), span(" It's extremely difficult. Most Poconos townships have updated their ordinances to state that \"advertising\" a rental is a violation—even if no guest ever stays there. The evidence is your own listing.")]
  },
  {
    _type: 'block',
    _key: 'faq2',
    style: 'normal',
    markDefs: [],
    children: [boldSpan('"Will the fines go away if I sell the house?"'), span(" No. Fines typically stay with the property as a lien. However, we routinely negotiate with townships to settle fines at closing so you can walk away clean.")]
  },
  {
    _type: 'block',
    _key: 'faq3',
    style: 'normal',
    markDefs: [],
    children: [boldSpan('"What if I just ignore the violation letter?"'), span(" Don't. In Monroe County, unpaid municipal fines can eventually lead to: Municipal lien on title. Sheriff sale. Revocation of all future permits.")]
  },
  {
    _type: 'block',
    _key: 'faq4',
    style: 'normal',
    markDefs: [],
    children: [boldSpan('"Can I get a permit now and make this go away?"'), span(" Depends on the township. In Lehman Township: No. They've stopped issuing new licenses entirely. In Tobyhanna Township: Maybe, if you're under the license cap. But getting a permit doesn't erase past violations. You still owe the fines.")]
  },
  {
    _type: 'block',
    _key: 'faq5',
    style: 'normal',
    markDefs: [],
    children: [boldSpan('"My property has an existing STR license from the previous owner. Am I safe?"'), span(" Not automatically. In Tobyhanna Township, licenses do NOT transfer. The previous owner's license terminated at sale.")]
  },
  {
    _type: 'block',
    _key: 'faq6',
    style: 'normal',
    markDefs: [],
    children: [boldSpan('"How fast can you actually close?"'), span(" We've closed in as little as 7 days when sellers need to stop the bleeding immediately. More typically, 14-21 days.")]
  },

  block("When Selling to ClearEdge Makes the Most Sense", 'h2'),
  block("The math is simple."),
  block("Add up: Current accumulated fines. Estimated fines over next 90 days while you figure out other options. Cost to bring property into full compliance. Cost of annual STR license fees going forward. Lost income during compliance period. Legal fees to fight violations. Risk of retail sale falling through due to disclosed violations."),
  block("If that total approaches or exceeds what you'd lose selling to a cash buyer, the decision makes itself."),
  {
    _type: 'block',
    _key: 'sell1',
    style: 'normal',
    markDefs: [],
    children: [boldSpan("At ClearEdge Home Buyers, we:")]
  },
  block("Buy houses with active zoning violations. Buy houses with GovOS fines. Buy houses with failed inspections. Buy houses that can't pass Certificate of Occupancy. Close in 7-21 days. Take the property as-is. Handle municipal negotiations ourselves. Let you walk away clean."),
  {
    _type: 'block',
    _key: 'cta1',
    style: 'normal',
    markDefs: [{ _type: 'link', _key: 'howLink', href: '/how-it-works' }],
    children: [span("See how our simple 3-step process works on our "), span("How It Works page", ['howLink']), span(".")]
  },

  block("Take Action Before the Next $1,000 Letter", 'h2'),
  block("If your Poconos dream has turned into a GovOS nightmare, don't wait."),
  block("Every day of inaction is another day of fines."),
  block("I'll give you a fair, cash offer to take the property—and the violations—off your plate."),
  block("No inspections required. No Certificate of Occupancy needed. No waiting for township approval."),
  {
    _type: 'block',
    _key: 'ctafinal',
    style: 'normal',
    markDefs: [{ _type: 'link', _key: 'homeLink', href: '/' }],
    children: [span("Request your free, no-obligation cash offer on our "), span("homepage", ['homeLink']), span(".")]
  },
  {
    _type: 'block',
    _key: 'final1',
    style: 'normal',
    markDefs: [],
    children: [span("We are the fastest way to "), boldSpan("stop GovOS fines Poconos house"), span(" owners are struggling with in 2026.")]
  },
  block("This guide reflects current Poconos STR regulations as of January 2026. Township ordinances change frequently—always verify current requirements with your specific municipality. This is not legal advice.", 'normal'),
];

const blogPost = {
  _type: "blogPost",
  title: "Stop GovOS Fines Poconos House: The Complete 2026 Escape Guide for STR Owners",
  slug: { current: "stop-govos-fines-poconos-house" },
  metaTitle: "Stop GovOS Fines Poconos House | 2026 STR Escape Guide",
  metaDescription: "Stop GovOS fines Poconos house owners are facing in 2026. Township-by-township STR regulations, MCOCA 12-month rule, and how cash buyers can help you escape daily fines.",
  excerpt: "Poconos STR owners are getting blindsided by GovOS enforcement software. Learn how to stop accumulating fines, understand MCOCA's 12-month grace period, and discover the cash exit strategy that lets you walk away clean.",
  author: "Tyler Swenson",
  authorTitle: "Founder, ClearEdge Home Buyers",
  publishedAt: "2026-01-08T14:00:00Z",
  category: "situations",
  content: content,
  faqs: [
    {
      question: "Can I fight GovOS data in court?",
      answer: "It's extremely difficult. Most Poconos townships have updated their ordinances to state that \"advertising\" a rental is a violation—even if no guest ever stays there. The evidence is your own listing, screenshots of your calendar, and your reviews."
    },
    {
      question: "Will the fines go away if I sell the house?",
      answer: "No. Fines typically stay with the property as a lien. However, cash buyers like ClearEdge routinely negotiate with townships to settle fines at closing so you can walk away clean."
    },
    {
      question: "What if I just ignore the violation letter?",
      answer: "Don't. In Monroe County, unpaid municipal fines can eventually lead to: Municipal lien on title, Sheriff sale, and revocation of all future permits for that address."
    },
    {
      question: "Can I get a permit now and make the fines go away?",
      answer: "Depends on the township. In Lehman Township, they've stopped issuing new licenses entirely. In Tobyhanna Township, maybe if you're under the license cap. But getting a permit doesn't erase past violations—you still owe the fines."
    },
    {
      question: "How fast can ClearEdge actually close?",
      answer: "We've closed in as little as 7 days when sellers need to stop the bleeding immediately. More typically, 14-21 days. Either way, it's fast enough to stop months of additional fines from accumulating."
    },
    {
      question: "What is the MCOCA 12-month rule?",
      answer: "Pennsylvania's Municipal Code and Ordinance Compliance Act requires municipalities to give new property owners 12 months from the date of purchase to bring the property into compliance. Cash buyers can use this rule because they don't need bank approval."
    }
  ]
};

async function deployBlogPost() {
  try {
    console.log("Fetching Poconos location references...");
    const locations = await client.fetch(
      `*[_type == "location" && slug.current in $slugs]{ _id, city, slug }`,
      { slugs: ['pocono-pines', 'east-stroudsburg', 'stroudsburg'] }
    );
    console.log("Found locations:", locations.map(l => l.city));

    const doc = {
      ...blogPost,
      relatedLocations: locations.length > 0 ? locations.map(loc => ({
        _type: 'reference',
        _ref: loc._id,
        _key: `loc-${loc.slug.current}`
      })) : undefined
    };

    console.log("Creating blog post in Sanity...");
    const result = await client.create(doc);
    console.log("✅ Blog post created successfully!");
    console.log("Document ID:", result._id);
    console.log("URL: https://www.clearedgehomebuyers.com/blog/stop-govos-fines-poconos-house");
    return result;
  } catch (error) {
    console.error("Error creating blog post:", error.message);
    throw error;
  }
}

deployBlogPost();
