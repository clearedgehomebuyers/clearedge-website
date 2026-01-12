import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2026-01-02',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// First, fetch all locations to get their _id values for references
async function getLocationIds() {
  const locations = await client.fetch(`*[_type == "location"]{ _id, "slug": slug.current }`);
  const locationMap = {};
  locations.forEach(loc => {
    locationMap[loc.slug] = loc._id;
  });
  return locationMap;
}

// Helper to create location references
function createLocationRefs(slugs, locationMap) {
  return slugs
    .filter(slug => locationMap[slug])
    .map(slug => ({
      _type: 'reference',
      _ref: locationMap[slug],
      _key: slug,
    }));
}

// Helper to create a unique key
function key(prefix, index) {
  return `${prefix}-${Date.now()}-${index}`;
}

// Helper to create Portable Text blocks with optional links
function createPortableText(paragraphs) {
  return paragraphs.map((p, i) => {
    // Check if paragraph contains a markdown link
    const linkMatch = p.match(/\[([^\]]+)\]\(([^)]+)\)/);

    if (linkMatch) {
      const [fullMatch, linkText, href] = linkMatch;
      const beforeLink = p.substring(0, p.indexOf(fullMatch));
      const afterLink = p.substring(p.indexOf(fullMatch) + fullMatch.length);
      const linkKey = `link-${i}`;

      const children = [];
      if (beforeLink) {
        children.push({
          _type: 'span',
          _key: `span-before-${i}`,
          marks: [],
          text: beforeLink,
        });
      }
      children.push({
        _type: 'span',
        _key: `span-link-${i}`,
        marks: [linkKey],
        text: linkText,
      });
      if (afterLink) {
        children.push({
          _type: 'span',
          _key: `span-after-${i}`,
          marks: [],
          text: afterLink,
        });
      }

      return {
        _type: 'block',
        _key: `block-${i}`,
        style: 'normal',
        markDefs: [{
          _type: 'link',
          _key: linkKey,
          href: href,
        }],
        children,
      };
    }

    // Simple paragraph without links
    return {
      _type: 'block',
      _key: `block-${i}`,
      style: 'normal',
      markDefs: [],
      children: [{
        _type: 'span',
        _key: `span-${i}`,
        marks: [],
        text: p,
      }],
    };
  });
}

// Define all situation updates
const situationUpdates = {
  'foreclosure': {
    metaTitle: 'Facing Foreclosure in Pennsylvania? Sell Your House Fast & Walk Away with Cash | ClearEdge',
    metaDescription: 'Stop foreclosure before the sheriff sale. ClearEdge buys houses fast for cash in NEPA, Lehigh Valley & Poconos. Close in 7-14 days, protect your credit, keep your equity. Call Tyler: (570) 904-2059.',
    heroHeadline: "Foreclosure Doesn't Have to Mean Losing Everything",
    heroSubheadline: "If you're behind on payments and the notices are piling up, you still have options. We can close before the sheriff sale and put cash in your pocket — not the bank's.",
    problemDescriptionText: [
      "Getting that first Act 91 notice feels like a punch to the gut. Suddenly you're counting days, dodging calls, and wondering how it all went sideways. Maybe it was a job loss, medical bills, or a divorce that drained the savings. It doesn't matter how you got here — what matters is what you do next.",
      "Here's what most people don't realize: Pennsylvania's foreclosure timeline gives you more time than you think, but not as much as you'd hope. Once the sheriff sale is scheduled, the clock is real. Traditional listings take 60-90 days minimum. You probably don't have that kind of runway.",
      "We've helped homeowners across Scranton, Wilkes-Barre, Allentown, and the Poconos stop foreclosure and walk away with cash instead of a wrecked credit report. The process is simple, but you need to move while you still have options.",
      "[Read: How to Avoid Foreclosure in Scranton, PA](/blog/avoid-foreclosure-scranton-pa)",
    ],
    benefits: [
      { title: 'Close Before the Sheriff Sale', description: "We can typically close in 7-14 days — fast enough to beat most auction dates. Once you accept our offer, we handle the title work and coordinate directly with your lender." },
      { title: 'Protect Your Credit Score', description: 'A foreclosure stays on your credit for 7 years and tanks your score by 100-150 points. Selling before the sale goes through keeps that off your record.' },
      { title: 'Walk Away with Cash', description: "If you have equity, you keep it. We pay off your mortgage at closing and wire you the difference. No equity? We may still be able to help through a short sale." },
      { title: 'We Deal with the Lender', description: "Negotiating with mortgage companies is exhausting. We handle the payoff letters, lien releases, and closing coordination so you don't have to." },
    ],
    faqs: [
      { question: 'How long do I have before the sheriff sale?', answer: "In Pennsylvania, the foreclosure process typically takes 6-9 months from the first missed payment to sheriff sale, but it varies by county. Luzerne and Lackawanna counties tend to move faster than Lehigh or Monroe. The key is acting before the sale is scheduled — once it's on the calendar, your window shrinks fast." },
      { question: "Can I sell if I'm already behind on payments?", answer: "Yes. Being behind doesn't disqualify you. As long as the sale hasn't happened yet, you can still sell. We work with homeowners at every stage — from the first missed payment to the week before auction." },
      { question: 'What if I owe more than the house is worth?', answer: "This is called being 'underwater.' In some cases, we can negotiate a short sale with your lender, where they agree to accept less than what's owed. It's not guaranteed, but it's often better than letting the bank take the house." },
      { question: 'Will selling stop the foreclosure from hitting my credit?', answer: "If we close before the foreclosure is finalized, it won't show as a foreclosure on your credit report. You'll still show late payments, but that's far less damaging than a completed foreclosure." },
      { question: 'What happens if I just let the bank take it?', answer: 'You lose any equity you\'ve built, your credit takes a major hit, and in Pennsylvania, the bank can pursue a deficiency judgment for any remaining balance. Selling first lets you control the outcome.' },
    ],
    locationSlugs: ['scranton', 'wilkes-barre', 'hazleton', 'allentown', 'bethlehem', 'reading', 'stroudsburg'],
  },

  'inherited-property': {
    metaTitle: 'Sell Inherited House in Pennsylvania | Skip Probate Stress, Get Cash Fast | ClearEdge',
    metaDescription: "Inherited a house in PA you don't want or can't maintain? ClearEdge buys inherited properties for cash — during or after probate. No cleanout, no repairs, no family drama. Call Tyler: (570) 904-2059.",
    heroHeadline: 'You Inherited a House. Now What?',
    heroSubheadline: "Dealing with an estate is hard enough without worrying about repairs, cleanouts, and real estate agents. We buy inherited properties as-is and can close around probate timelines.",
    problemDescriptionText: [
      "Losing a parent or family member is already one of the hardest things you'll go through. Then comes the house — full of decades of memories, deferred maintenance, and decisions nobody wants to make.",
      "Maybe you live out of state and can't manage it from Texas like Kandra did when she inherited her father's Scranton property. Maybe there are multiple heirs who can't agree on anything. Maybe the house needs work you can't afford, or you just want to close this chapter and move on.",
      "Pennsylvania probate can take 6-12 months depending on the county and complexity. But you don't always have to wait — we work with estate attorneys regularly and can often close during probate with court approval, or immediately after letters testamentary are issued.",
      "We've helped families across Eastern PA — from Wilkes-Barre to Allentown to the Poconos — sell inherited properties without the cleanout, repairs, or stress of a traditional listing.",
      "[Read: Can You Sell a Deceased Parent's House Without Probate in PA?](/blog/sell-deceased-parents-house-without-probate-pennsylvania)",
      "[Read: Documents Required When Selling an Inherited Property in PA](/blog/documents-required-selling-inherited-property-pennsylvania)",
    ],
    benefits: [
      { title: 'Skip the Cleanout', description: "Leave the furniture, clothes, boxes — everything. We buy the property as-is, contents included. You don't need to spend weeks sorting through a lifetime of belongings." },
      { title: 'No Repairs Required', description: "Deferred maintenance, roof issues, outdated systems — doesn't matter. We factor the condition into our offer so you don't spend money fixing up a house you're selling." },
      { title: 'Close Around Probate', description: "We work with estate attorneys and can close during probate with court approval or immediately after. We understand the timeline constraints and won't pressure you." },
      { title: 'One Check, No Drama', description: "If there are multiple heirs, we can wire proceeds directly to each party. No awkward negotiations over who does what — just a clean split at closing." },
    ],
    faqs: [
      { question: 'Can I sell before probate is complete?', answer: "Sometimes, yes. Pennsylvania allows estate sales with orphans' court approval, even before probate closes. It depends on the estate's complexity and whether all heirs agree. We work with your attorney to navigate this." },
      { question: 'What if there are multiple heirs who disagree?', answer: 'This is common. All heirs with legal interest typically need to sign off on the sale. We can help structure the deal so everyone receives their share directly at closing, which often simplifies agreement.' },
      { question: 'Do I have to clean out the house first?', answer: 'No. We buy properties with contents included. If there are items you want to keep, take those. Everything else stays and becomes our responsibility after closing.' },
      { question: 'How long does closing take on an inherited property?', answer: "If probate is complete and you have clear authority to sell, we can close in 7-14 days. If you're still in probate, the timeline depends on court scheduling — usually 30-60 days once we have approval." },
      { question: 'What about Pennsylvania inheritance tax?', answer: 'Pennsylvania charges inheritance tax on estates: 4.5% for direct descendants (children), 12% for siblings, and 15% for others. This is separate from the property sale and handled through the estate. Your attorney can advise on specifics.' },
    ],
    locationSlugs: ['scranton', 'wilkes-barre', 'allentown', 'bethlehem', 'hazleton', 'stroudsburg', 'dunmore'],
  },

  'divorce': {
    metaTitle: 'Selling a House During Divorce in Pennsylvania | Fast Cash Sale, Clean Split | ClearEdge',
    metaDescription: 'Going through a divorce and need to sell the house fast? ClearEdge buys houses for cash in PA. Close in 14 days, split the proceeds, move on. No agents, no showings, no delays.',
    heroHeadline: "Divorce Is Hard. Selling the House Doesn't Have to Be.",
    heroSubheadline: 'When you\'re ready to split the asset and move forward, we make it simple. Fast cash offer, clean closing, proceeds wired to both parties.',
    problemDescriptionText: [
      "Divorce forces you to untangle a life you built together — and the house is usually the biggest knot. Who stays? Who goes? What's it worth? How do you split it when neither of you wants to deal with the other?",
      "Traditional listings make everything worse. Months of showings while you're both trying to move on. Negotiations over repairs. Disagreements about price drops. One spouse dragging their feet while the other hemorrhages patience.",
      "We've helped divorcing couples across Scranton, Wilkes-Barre, Allentown, and the Lehigh Valley cut through the mess. One offer, one closing, proceeds split however your agreement dictates. No extended timeline. No awkward showings while you're trying to separate your lives.",
      "The faster you close this chapter, the faster you can start the next one.",
    ],
    benefits: [
      { title: 'Close in 14 Days, Not 14 Weeks', description: "Traditional sales take 60-90 days minimum. We can close in as little as 7-14 days, so you're not stuck in limbo waiting for buyers, inspections, and mortgage approvals." },
      { title: 'Clean Proceeds Split', description: "Tell us how to divide the funds — 50/50, 60/40, whatever your agreement says — and we wire each party their share directly at closing. No joint checks, no coordination required." },
      { title: 'No Showings, No Strangers', description: 'The last thing you need during a divorce is a parade of strangers walking through your house asking questions. We visit once to assess the property, and that\'s it.' },
      { title: 'Works Even If One Spouse Is Difficult', description: "As long as both parties with legal ownership sign at closing, we can work around communication challenges. Your attorneys can coordinate if direct contact isn't possible." },
    ],
    faqs: [
      { question: 'Do both spouses have to agree to sell?', answer: "If both names are on the title, yes — both parties need to sign the sale documents. If only one spouse is on the title, that spouse can sell independently, though divorce proceedings may complicate this. Check with your attorney about your specific situation." },
      { question: 'Can we sell before the divorce is finalized?', answer: 'Yes. Many couples sell during the divorce process to liquidate the asset before finalizing. Your divorce agreement should specify how proceeds will be divided. We can close before or after finalization.' },
      { question: 'How do you handle splitting the money?', answer: "At closing, we can wire funds directly to separate accounts for each party based on whatever split you've agreed to. This avoids the awkwardness of one spouse receiving a check and having to distribute it." },
      { question: "What if my spouse won't cooperate with showings?", answer: "That's one of the main reasons people call us. We only need one brief property visit — not months of staged showings. And we can schedule around availability constraints." },
      { question: "What if there's still a mortgage?", answer: "We pay off the existing mortgage at closing. Whatever remains after the payoff is the equity you split. If you owe more than the house is worth, we can discuss short sale options." },
    ],
    locationSlugs: ['scranton', 'wilkes-barre', 'allentown', 'bethlehem', 'easton', 'reading'],
  },

  'job-relocation': {
    metaTitle: 'Sell Your House Fast for Job Relocation | Moving for Work in PA | ClearEdge',
    metaDescription: "Got a job offer that won't wait? Sell your Pennsylvania house fast for cash and relocate without the stress. Close before your start date. Call Tyler: (570) 904-2059.",
    heroHeadline: 'New Job. Tight Timeline. We Can Help.',
    heroSubheadline: "When the opportunity won't wait and you need to sell fast, we close on your schedule — even if that's before you leave town.",
    problemDescriptionText: [
      "You got the offer. Maybe it's the career move you've been waiting for, or maybe it's a transfer you didn't see coming. Either way, you've got a start date and a house that needs to sell — fast.",
      "Traditional listings don't work on relocation timelines. You're looking at 60-90 days minimum, plus the stress of managing showings, negotiations, and repairs from another state. And what happens if the deal falls through after you've already moved?",
      "We've helped homeowners across Eastern PA — from Hazleton to Allentown to the Poconos — sell fast and relocate with cash in hand. No repairs, no showings, no carrying two mortgages while you wait for a buyer. Just a fair offer and a closing date that works for your new job.",
      "Whether you're moving across the state or across the country, we can close before you go or handle everything remotely after you've left.",
    ],
    benefits: [
      { title: 'Close Before Your Start Date', description: "We can typically close in 7-14 days. If you've got 3 weeks before you need to report, we can make that work. No scrambling, no uncertainty." },
      { title: 'No Repairs, No Prep', description: "You've got enough to pack. Don't waste time fixing up a house you're leaving. We buy as-is — deferred maintenance, outdated kitchen, whatever." },
      { title: 'Remote-Friendly Closing', description: "Already moved? No problem. We use mobile notaries and can handle the entire closing remotely. You don't need to fly back for signatures." },
      { title: 'Stop the Double Payment Drain', description: 'Paying rent in your new city plus a mortgage back home gets expensive fast. A quick sale stops the bleeding and gives you cash to start fresh.' },
    ],
    faqs: [
      { question: 'Can you really close in 2 weeks?', answer: "Yes, if title is clear and there are no major complications. We've closed faster when the situation required it. The timeline depends partly on how quickly the title company can work, but 7-14 days is typical." },
      { question: "What if I've already moved out of state?", answer: "That's fine. We can do a virtual walkthrough, handle all paperwork electronically, and send a mobile notary to wherever you are for the closing documents. You never need to come back." },
      { question: "Does my company's relocation package affect this?", answer: "Some employers offer relocation buyout programs or guaranteed purchase options. If your company is offering something like that, compare it to our offer — sometimes we can do better, sometimes we can't. Either way, you should know your options." },
      { question: 'Do I need to empty the house before closing?', answer: "Take what you want and leave the rest. If moving everything isn't practical, we can buy the house with furniture and belongings included. It's one less thing to coordinate." },
      { question: "What if I can't sell before I have to leave?", answer: "We can still close after you've relocated using remote signing. However, the sooner you start the process, the better — even if closing happens after your move date." },
    ],
    locationSlugs: ['scranton', 'wilkes-barre', 'hazleton', 'allentown', 'bethlehem', 'stroudsburg'],
  },

  'major-repairs': {
    metaTitle: 'Sell House As-Is in Pennsylvania | We Buy Homes Needing Major Repairs | ClearEdge',
    metaDescription: "Foundation problems? Roof damage? Can't afford repairs? ClearEdge buys houses in any condition across Eastern PA. No fixing up required. Get a cash offer in 24 hours.",
    heroHeadline: "Your House Needs Work. We'll Buy It Anyway.",
    heroSubheadline: "Foundation cracks, roof damage, mold, outdated everything — we've seen it all and bought it all. No repairs needed. No inspection contingencies. Just a fair cash offer.",
    problemDescriptionText: [
      "That repair estimate isn't a typo. Foundation work really does cost $15,000. A new roof really is $12,000. And that mold remediation quote? Don't even get us started.",
      "Here's the problem: you can't afford to fix it, but you can't sell it broken — or so you've been told. Traditional buyers need mortgage approval, and lenders won't finance houses with major structural issues. So you're stuck with a money pit that's getting worse every month.",
      "We buy houses across Eastern PA that other buyers won't touch. Foundation problems in Scranton's old coal country. Roof damage from Pocono winters. Mold in Wilkes-Barre basements. We factor the repairs into our offer and handle the work after closing — so you don't have to find contractors, get permits, or spend another dollar.",
      "The house is worth something even with problems. Let us show you what we can offer.",
    ],
    benefits: [
      { title: 'Sell 100% As-Is', description: 'No repairs, no cleaning, no updates. We buy the house in its current condition — foundation cracks, roof leaks, mold, fire damage, whatever. You fix nothing.' },
      { title: 'No Inspection Contingencies', description: "Traditional buyers back out after inspections reveal problems. We don't. Our offer is based on current condition, and we don't renegotiate after walking through." },
      { title: 'Cash Offer in 24 Hours', description: "Send us some photos or schedule a quick walkthrough, and we'll have a written offer within 24 hours. No waiting weeks for buyers who might flake." },
      { title: 'We Handle Everything After', description: 'Permits, contractors, inspections — that all becomes our problem after closing. You sign, you get paid, you walk away.' },
    ],
    faqs: [
      { question: 'What kinds of repairs are too much for you?', answer: "Honestly? We haven't found one yet. We've bought houses with collapsed roofs, active mold, termite damage, fire damage, foundation failures, and complete gut-job interiors. If it's standing, we're interested." },
      { question: 'Will my offer be really low because of the condition?', answer: "Our offer reflects the repair costs, yes. But here's the math: spending $30,000 on repairs to list for $20,000 more doesn't make sense. We offer what the numbers support, and we're transparent about how we get there." },
      { question: 'What about houses with code violations?', answer: 'We buy those too. See our Tax Liens & Code Violations page for details. Violations don\'t disqualify you — they just factor into the offer.' },
      { question: 'Do you need to see the house before making an offer?', answer: "We can give you a preliminary offer based on photos and your description. If you accept, we'll do a brief walkthrough to confirm condition before finalizing. No lengthy inspection process." },
      { question: "What if I don't know everything that's wrong?", answer: "That's fine. We expect surprises in older properties. Our offer accounts for the unknown to some degree, and we don't renegotiate if we find additional issues during our walkthrough." },
    ],
    locationSlugs: ['scranton', 'wilkes-barre', 'hazleton', 'carbondale', 'nanticoke', 'pittston', 'dunmore'],
  },

  'tax-liens-code-violations': {
    metaTitle: 'Sell House with Tax Liens or Code Violations in PA | ClearEdge Buys Problem Properties',
    metaDescription: "Tax liens, code violations, or municipal fines piling up? ClearEdge buys houses with title problems across Pennsylvania. We handle the legal mess — you get cash at closing.",
    heroHeadline: "Liens and Violations Don't Have to Trap You",
    heroSubheadline: "Back taxes, code violations, municipal fines — they're piling up and you can't see a way out. We buy houses with title problems and handle the complications.",
    problemDescriptionText: [
      "It started with one missed tax payment. Or one code violation you couldn't afford to fix. Now the letters keep coming, the fines keep growing, and you're watching the hole get deeper every month.",
      "Here's what municipalities won't tell you: they'd rather you sell the property than let it go to tax sale. And here's what most buyers won't do: deal with the mess.",
      "We will. We've bought houses across Eastern PA with back taxes in the tens of thousands, active code violations, grass-cutting liens, water bills, and every other municipal headache you can imagine. Allentown's aggressive code enforcement? Handled. Scranton tax liens? Settled. Wilkes-Barre water authority bills? Cleared.",
      "At closing, we pay off the liens from the sale proceeds, negotiate with taxing authorities when needed, and you walk away clean. No more letters. No more fines. No more stress.",
    ],
    benefits: [
      { title: 'We Handle Lien Negotiations', description: 'Tax offices sometimes settle for less than owed, especially on older liens. We know how to negotiate and will work with the authorities on your behalf to minimize what comes out of your proceeds.' },
      { title: 'Buy Despite Active Violations', description: "Most buyers run from code violations. We don't. We buy the property and handle violations after closing — pulling permits, making repairs, satisfying the municipality." },
      { title: 'Stop the Bleeding Now', description: "Every month you wait, more fines accrue. Selling now caps your losses. Whatever the liens are today is better than what they'll be in six months." },
      { title: 'Walk Away Clean', description: 'At closing, liens get paid from proceeds, title gets cleared, and you have no further obligations. The property — and its problems — transfer to us.' },
    ],
    faqs: [
      { question: 'Can you really buy a house with tax liens?', answer: "Yes. Tax liens are paid off at closing through the title company. As long as there's enough equity to cover the liens (or we can negotiate them down), the sale proceeds as normal." },
      { question: 'What if the liens are more than the house is worth?', answer: "Sometimes we can still help. We've negotiated lien reductions with taxing authorities who prefer some payment over a property they'd have to maintain. It's not guaranteed, but it's worth exploring." },
      { question: 'What about code violations — who fixes those?', answer: 'We do, after closing. You\'re not responsible for resolving violations as a condition of sale. Once you sign, we take ownership and handle whatever the municipality requires.' },
      { question: 'Am I still responsible for anything after the sale?', answer: 'No. Any liens, violations, or municipal obligations tied to the property transfer to us. You walk away with no ongoing liability.' },
      { question: 'How long does closing take with liens?', answer: "Usually 14-30 days — longer than a clean title because we need to get lien payoff amounts and coordinate with taxing authorities. But once we start, we handle all that coordination." },
    ],
    locationSlugs: ['allentown', 'scranton', 'wilkes-barre', 'reading', 'hazleton', 'bethlehem'],
  },

  'tired-landlord': {
    metaTitle: 'Sell Rental Property in Pennsylvania | Exit the Landlord Business Fast | ClearEdge',
    metaDescription: "Done being a landlord? Sell your rental property for cash — even with tenants in place. ClearEdge buys investment properties across Eastern PA. No repairs, no evictions needed.",
    heroHeadline: 'Ready to Stop Being a Landlord?',
    heroSubheadline: "The midnight calls, the late rent, the repairs that never end — you've had enough. Sell your rental property and get your life back.",
    problemDescriptionText: [
      "Being a landlord sounded good in theory. Passive income. Building wealth. A solid investment for the future.",
      "Then reality hit: tenants who don't pay, toilets that break at midnight, turnover that costs thousands, and property management that's anything but passive. Every month it's something — and you're tired.",
      "Maybe you're holding onto a single rental that's more headache than it's worth. Maybe you've got a small portfolio and you're ready to liquidate everything. Either way, the thought of dealing with showings (around tenant schedules), repairs (that you've been deferring), and buyers (who want everything perfect) sounds exhausting.",
      "We buy rental properties across NEPA, the Lehigh Valley, and the Poconos — tenant-occupied or vacant, good condition or deferred maintenance. No evictions required. No repairs expected. Just a fair offer and a fast exit from the landlord business.",
    ],
    benefits: [
      { title: 'Sell with Tenants in Place', description: 'Don\'t go through the eviction process just to sell. We buy tenant-occupied properties and handle the transition after closing. Your tenants stay until we decide otherwise.' },
      { title: 'No Repairs Required', description: "Deferred maintenance is the landlord's curse. We don't expect you to fix years of wear and tear just to sell. We buy rentals as-is." },
      { title: 'Get Your Time Back', description: 'No more midnight emergencies, chasing rent, or coordinating repairs. Sell the property and reclaim your weekends, evenings, and peace of mind.' },
      { title: 'Quick, Certain Closing', description: 'We close in 7-14 days with cash. No mortgage contingencies, no financing fall-throughs, no buyer getting cold feet.' },
    ],
    faqs: [
      { question: 'Do I have to evict my tenants before selling?', answer: "No. We buy properties with tenants in place. Their lease transfers with the sale, and we handle any tenant transitions after closing. You don't need to deliver a vacant property." },
      { question: 'What if my tenants have caused damage?', answer: "We factor condition into our offer, including tenant damage. Holes in walls, stained carpets, broken appliances — we've seen it all and can work with it." },
      { question: "Do I have to tell my tenants I'm selling?", answer: "Pennsylvania doesn't require advance notice to tenants for a property sale, but their lease terms remain in effect. We can discuss timing and communication strategy based on your situation." },
      { question: "What if my tenants aren't paying rent?", answer: "Non-paying tenants are a problem, but not a dealbreaker. We've bought properties with tenants in active eviction proceedings. The situation factors into our offer, but we can still close." },
      { question: 'Can I sell just one property from a portfolio?', answer: "Yes. Whether you want to sell one property or ten, we can structure deals for individual properties or entire portfolios. We'll work with however you want to exit." },
    ],
    locationSlugs: ['scranton', 'wilkes-barre', 'allentown', 'bethlehem', 'reading', 'hazleton'],
  },

  'vacant-property': {
    metaTitle: 'Sell Vacant House in Pennsylvania | Stop Paying for an Empty Home | ClearEdge',
    metaDescription: "Tired of paying mortgage, taxes, and insurance on an empty house? ClearEdge buys vacant properties for cash across Eastern PA. Stop the carrying costs and get paid.",
    heroHeadline: 'That Empty House Is Costing You Every Month',
    heroSubheadline: "Mortgage, taxes, insurance, utilities, lawn care — it adds up fast when nobody's living there. Sell it, stop the bleeding, and move on.",
    problemDescriptionText: [
      "Every month that house sits empty, you write checks. Mortgage payment. Property taxes. Insurance — and vacant home insurance costs more. Utilities to keep pipes from freezing. Lawn service so the neighbors don't complain. Maybe security costs because you're worried about break-ins.",
      "You meant to do something with it. Rent it out. Fix it up. Move back in someday. But life happened, and now it's just a money pit 50 miles away that you can't deal with.",
      "Here's the other problem: the longer it sits vacant, the harder it is to sell traditionally. Insurance companies get nervous. Lenders get nervous. Buyers wonder what's wrong with it. And every month of vacancy is another month of decay — pipes freeze, mold grows, vandals notice.",
      "We buy vacant properties across Eastern PA — from Scranton to the Poconos to the Lehigh Valley. Any condition, any length of vacancy, any reason you're not using it. One offer, fast closing, no more monthly drain.",
    ],
    benefits: [
      { title: 'End the Carrying Costs', description: "Stop writing checks for a house nobody's using. Mortgage, taxes, insurance, utilities — all of it ends at closing." },
      { title: 'Reduce Your Liability', description: 'Vacant properties are liability magnets. Slip and falls, vandalism, squatters, fire — once you sell, that risk transfers to us.' },
      { title: 'No Clean-Up Needed', description: "If there's stuff left inside — furniture, boxes, junk — leave it. We buy properties with contents included. You don't need to organize a cleanout." },
      { title: 'Fast Cash, No Waiting', description: 'We close in 7-14 days with cash. No waiting for buyers to get approved, no negotiations over inspection items, no financing contingencies.' },
    ],
    faqs: [
      { question: "How long can a house be vacant before you won't buy it?", answer: "There's no time limit for us. We've bought houses that sat empty for months and houses that sat empty for years. Longer vacancy usually means more work for us, which affects our offer, but it doesn't disqualify the property." },
      { question: "What if there's been vandalism or damage from sitting empty?", answer: "We factor that into our offer. Broken windows, stolen copper, water damage from burst pipes — we've seen it all. The condition affects the price, but we can still close." },
      { question: 'Can I leave furniture and belongings inside?', answer: 'Yes. Take what you want and leave the rest. We handle disposal of anything remaining after closing.' },
      { question: 'What if I live out of state?', answer: 'No problem. We buy from out-of-state owners regularly. We can do the walkthrough ourselves, handle everything electronically, and use a mobile notary for closing documents.' },
      { question: "Is there any tax benefit to selling a property I'm not using?", answer: "Potentially. If you've been paying carrying costs, some may be deductible. And if the property has depreciated in value, you may be able to claim a loss. Consult your accountant about your specific situation." },
    ],
    locationSlugs: ['scranton', 'wilkes-barre', 'hazleton', 'stroudsburg', 'east-stroudsburg', 'pocono-pines'],
  },
};

async function updateSituations() {
  console.log('Fetching location IDs...');
  const locationMap = await getLocationIds();
  console.log(`Found ${Object.keys(locationMap).length} locations:`, Object.keys(locationMap));

  // Check for and delete probate situation if it exists
  console.log('\nChecking for probate situation to delete...');
  const probateSituation = await client.fetch(`*[_type == "situation" && slug.current == "probate"][0]`);
  if (probateSituation) {
    console.log('Found probate situation, deleting...');
    await client.delete(probateSituation._id);
    console.log('Deleted probate situation');
  } else {
    console.log('No probate situation found');
  }

  // Update each situation
  for (const [slug, data] of Object.entries(situationUpdates)) {
    console.log(`\nUpdating situation: ${slug}`);

    // First, get the existing document
    const existing = await client.fetch(`*[_type == "situation" && slug.current == $slug][0]`, { slug });

    if (!existing) {
      console.log(`  WARNING: No existing situation found with slug "${slug}"`);
      continue;
    }

    // Create the update object
    const update = {
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      heroHeadline: data.heroHeadline,
      heroSubheadline: data.heroSubheadline,
      problemDescription: createPortableText(data.problemDescriptionText),
      benefits: data.benefits.map((b, i) => ({
        _type: 'benefit',
        _key: `benefit-${i}`,
        title: b.title,
        description: b.description,
      })),
      faqs: data.faqs.map((f, i) => ({
        _type: 'faq',
        _key: `faq-${i}`,
        question: f.question,
        answer: f.answer,
      })),
      relatedLocations: createLocationRefs(data.locationSlugs, locationMap),
    };

    try {
      await client.patch(existing._id).set(update).commit();
      console.log(`  ✓ Updated ${slug}`);
      console.log(`    - ${data.benefits.length} benefits`);
      console.log(`    - ${data.faqs.length} FAQs`);
      console.log(`    - ${update.relatedLocations.length} related locations`);
    } catch (error) {
      console.error(`  ✗ Error updating ${slug}:`, error.message);
    }
  }

  console.log('\n✓ All situation updates complete!');
}

updateSituations().catch(console.error);
