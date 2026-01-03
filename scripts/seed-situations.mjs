import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const situations = [
  {
    _type: 'situation',
    title: 'Inherited Property',
    slug: { _type: 'slug', current: 'inherited-property' },
    metaTitle: 'Sell Inherited House PA | Cash Offer for Probate Property',
    metaDescription: 'Inherited a house in Pennsylvania? Get a fast cash offer and skip probate delays. We buy inherited properties as-is with no repairs, no fees, and flexible closing.',
    heroHeadline: 'Inherited a Property?',
    heroSubheadline: 'Skip the stress of probate, repairs, and listing. Get a fair cash offer for your inherited Pennsylvania home and close on your timeline.',
    problemDescription: [
      {
        _type: 'block',
        _key: 'ip1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ip1s', text: 'Inheriting a property can be emotionally overwhelming, especially when you\'re already dealing with the loss of a loved one. The last thing you need is the added stress of managing a house you didn\'t plan for—dealing with maintenance, property taxes, insurance, and the uncertainty of what to do next.' }]
      },
      {
        _type: 'block',
        _key: 'ip2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ip2s', text: 'Many inherited homes in Pennsylvania need significant repairs or updates before they can be listed on the market. Between cleanouts, renovations, and the traditional selling process, you could be looking at months of work and thousands in out-of-pocket expenses—money you may not have or want to spend.' }]
      },
      {
        _type: 'block',
        _key: 'ip3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ip3s', text: 'If the property is going through probate, selling through traditional methods becomes even more complicated. Court approvals, legal fees, and extended timelines can drag the process out for months. We work with estates in all stages of probate and can often close faster than you\'d expect.' }]
      }
    ],
    benefits: [
      { _key: 'b1', title: 'Skip the Cleanout', description: 'Leave behind furniture, belongings, and junk. We buy houses as-is and handle the cleanout ourselves.' },
      { _key: 'b2', title: 'No Repairs Needed', description: 'Don\'t spend money fixing up a property you don\'t want. We purchase homes in any condition.' },
      { _key: 'b3', title: 'Probate Assistance', description: 'We work with estates in all stages of probate and can coordinate with attorneys to ensure a smooth sale.' },
      { _key: 'b4', title: 'Fair Cash Offer', description: 'Get a competitive cash offer within 24 hours with no obligation to accept. Close when you\'re ready.' }
    ],
    faqs: [
      { _key: 'f1', question: 'Can I sell an inherited house before probate is complete in PA?', answer: 'In many cases, yes. Pennsylvania allows executors to sell property during probate with proper court authorization. We work with estates at all stages and can coordinate with your probate attorney to ensure a smooth transaction.' },
      { _key: 'f2', question: 'What if multiple family members inherited the property?', answer: 'We frequently work with multiple heirs. All parties with ownership interest will need to agree to the sale, but we can help facilitate communication and structure the deal to work for everyone involved.' },
      { _key: 'f3', question: 'Do I need to clean out the house before selling?', answer: 'No. We buy properties as-is, including any furniture, belongings, or items left behind. You can take what you want and leave the rest—we\'ll handle the cleanout.' },
      { _key: 'f4', question: 'How quickly can you close on an inherited property?', answer: 'We can typically close in as little as 7-14 days, though we\'re flexible and can work around your timeline. If probate is involved, timing may depend on court schedules.' },
      { _key: 'f5', question: 'Will I have to pay capital gains tax on an inherited home in PA?', answer: 'Inherited properties receive a "stepped-up" cost basis to fair market value at the time of inheritance, which often reduces or eliminates capital gains tax. We recommend consulting a tax professional for your specific situation.' }
    ]
  },
  {
    _type: 'situation',
    title: 'Foreclosure',
    slug: { _type: 'slug', current: 'foreclosure' },
    metaTitle: 'Sell House in Foreclosure PA | Stop Foreclosure Fast',
    metaDescription: 'Facing foreclosure in Pennsylvania? We can help you sell fast, avoid foreclosure on your credit, and walk away with cash. Get a no-obligation offer today.',
    heroHeadline: 'Facing Foreclosure?',
    heroSubheadline: 'Don\'t let the bank take your home. Sell fast, protect your credit, and walk away with cash in your pocket instead of nothing.',
    problemDescription: [
      {
        _type: 'block',
        _key: 'fc1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'fc1s', text: 'Falling behind on mortgage payments is stressful enough without the threat of losing your home. In Pennsylvania, the foreclosure process can move quickly, and once it\'s complete, you lose your home AND damage your credit for years. But there\'s still time to take control of the situation.' }]
      },
      {
        _type: 'block',
        _key: 'fc2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'fc2s', text: 'Many homeowners don\'t realize they have options even after receiving foreclosure notices. A traditional home sale takes 60-90 days minimum—time you may not have. And most buyers won\'t touch a property with foreclosure complications, leaving you with fewer options and less leverage.' }]
      },
      {
        _type: 'block',
        _key: 'fc3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'fc3s', text: 'We specialize in helping Pennsylvania homeowners facing foreclosure. We can close in as little as 7 days, pay off your mortgage directly, and help you avoid the devastating credit impact of a completed foreclosure. In many cases, sellers walk away with cash in hand.' }]
      }
    ],
    benefits: [
      { _key: 'b1', title: 'Stop Foreclosure Fast', description: 'We can close in 7-14 days, often before your foreclosure sale date, stopping the process in its tracks.' },
      { _key: 'b2', title: 'Protect Your Credit', description: 'A completed foreclosure stays on your credit for 7 years. Selling before completion can significantly reduce the damage.' },
      { _key: 'b3', title: 'Walk Away with Cash', description: 'If you have equity, you\'ll receive cash at closing instead of losing everything to the bank.' },
      { _key: 'b4', title: 'We Handle the Lender', description: 'We work directly with your mortgage company to pay off the loan and clear the title at closing.' }
    ],
    faqs: [
      { _key: 'f1', question: 'How long do I have to sell before foreclosure in Pennsylvania?', answer: 'Pennsylvania requires lenders to wait at least 120 days after you miss a payment before filing foreclosure. After filing, you typically have several months before the sheriff\'s sale. The sooner you act, the more options you have.' },
      { _key: 'f2', question: 'Can I sell my house if I\'m behind on payments?', answer: 'Yes. As long as you still own the property, you can sell it. We\'ll pay off your mortgage at closing, and if there\'s equity remaining, you\'ll receive the difference in cash.' },
      { _key: 'f3', question: 'What if I owe more than my house is worth?', answer: 'This is called being "underwater." We may still be able to help through a short sale, where the lender agrees to accept less than what\'s owed. We have experience negotiating with lenders on these transactions.' },
      { _key: 'f4', question: 'Will selling stop the foreclosure from appearing on my credit?', answer: 'If you sell before the foreclosure is complete, it won\'t show as a foreclosure on your credit report. Late payments may still appear, but the impact is far less severe than a completed foreclosure.' },
      { _key: 'f5', question: 'What happens if I just let the bank take the house?', answer: 'A completed foreclosure severely damages your credit for 7 years, you may still owe a deficiency balance, and you walk away with nothing. Selling gives you more control and often puts cash in your pocket.' }
    ]
  },
  {
    _type: 'situation',
    title: 'Divorce',
    slug: { _type: 'slug', current: 'divorce' },
    metaTitle: 'Sell House During Divorce PA | Fast Cash Sale',
    metaDescription: 'Going through a divorce in Pennsylvania? Sell your house fast for cash, split the proceeds, and move on. No repairs, no showings, no delays.',
    heroHeadline: 'Selling Due to Divorce?',
    heroSubheadline: 'Liquidate your shared property quickly and fairly. Get cash fast so both parties can move forward with their lives.',
    problemDescription: [
      {
        _type: 'block',
        _key: 'dv1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'dv1s', text: 'Divorce is already one of life\'s most stressful experiences. Adding a complicated home sale to the mix—with showings, negotiations, and months of uncertainty—only makes things harder. When emotions are running high, the last thing you need is a drawn-out selling process.' }]
      },
      {
        _type: 'block',
        _key: 'dv2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'dv2s', text: 'Traditional home sales require both parties to agree on everything: the listing price, which repairs to make, when to schedule showings, and which offer to accept. This can lead to delays, arguments, and additional legal fees. Plus, you\'re still making mortgage payments on a house neither of you may want.' }]
      },
      {
        _type: 'block',
        _key: 'dv3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'dv3s', text: 'A cash sale cuts through the complexity. We make one fair offer, close quickly, and wire the proceeds directly. No repairs, no showings, no waiting for buyer financing. Both parties can move forward with their lives faster and with less conflict.' }]
      }
    ],
    benefits: [
      { _key: 'b1', title: 'Quick Resolution', description: 'Close in as little as 7-14 days and remove the house from your divorce proceedings faster.' },
      { _key: 'b2', title: 'Fair & Transparent', description: 'One clear offer with no hidden fees. Both parties know exactly what they\'re getting.' },
      { _key: 'b3', title: 'No Showings Required', description: 'Avoid the stress and scheduling conflicts of traditional showings. We only need one brief visit.' },
      { _key: 'b4', title: 'Direct Proceeds Split', description: 'We can wire funds directly to both parties or their attorneys as specified in your agreement.' }
    ],
    faqs: [
      { _key: 'f1', question: 'Do both spouses need to agree to sell the house?', answer: 'If both names are on the deed, both parties must agree to the sale. However, a cash sale is often easier to agree on because the terms are simple and the timeline is fast.' },
      { _key: 'f2', question: 'Can we sell before the divorce is finalized?', answer: 'Yes. Many couples sell marital property before the divorce is final. We recommend working with your divorce attorneys to ensure the sale is handled properly within your proceedings.' },
      { _key: 'f3', question: 'How are the proceeds divided?', answer: 'That\'s typically determined by your divorce agreement or attorneys. We can structure the closing to wire funds directly to each party or to attorneys as specified.' },
      { _key: 'f4', question: 'What if one spouse isn\'t cooperating?', answer: 'If both names are on the deed, both signatures are required. However, our fast, no-hassle process often makes it easier for reluctant parties to agree since there\'s less to debate.' },
      { _key: 'f5', question: 'Can we sell if there\'s still a mortgage on the house?', answer: 'Absolutely. We pay off the existing mortgage at closing, and any remaining equity is distributed according to your agreement.' }
    ]
  },
  {
    _type: 'situation',
    title: 'Job Relocation',
    slug: { _type: 'slug', current: 'job-relocation' },
    metaTitle: 'Sell House Fast for Job Relocation PA | Quick Cash Sale',
    metaDescription: 'Relocating for work and need to sell your Pennsylvania home fast? Get a cash offer in 24 hours and close before your move date. No repairs needed.',
    heroHeadline: 'Relocating for Work?',
    heroSubheadline: 'Sell your Pennsylvania home fast and avoid the stress of managing a property from across the country. Close before your start date.',
    problemDescription: [
      {
        _type: 'block',
        _key: 'jr1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'jr1s', text: 'When a job opportunity requires you to move quickly, your house can become an anchor holding you back. Traditional home sales take 60-90 days on average—time you may not have when your new employer needs you to start soon.' }]
      },
      {
        _type: 'block',
        _key: 'jr2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'jr2s', text: 'Managing a home sale from another state is a nightmare. Coordinating repairs, scheduling showings, and handling inspections becomes exponentially harder when you\'re not local. Plus, you\'re paying for two housing situations—your new place and your old mortgage.' }]
      },
      {
        _type: 'block',
        _key: 'jr3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'jr3s', text: 'A cash sale lets you close before you leave—or shortly after. No repairs, no showings, no hoping a buyer\'s financing comes through. You can focus on your new job and life knowing your Pennsylvania house is sold and off your plate.' }]
      }
    ],
    benefits: [
      { _key: 'b1', title: 'Close Before You Move', description: 'We can close in as little as 7-14 days, allowing you to wrap up before your relocation date.' },
      { _key: 'b2', title: 'No Repairs Needed', description: 'Don\'t spend time and money fixing up a house you\'re leaving. We buy as-is.' },
      { _key: 'b3', title: 'Remote-Friendly Process', description: 'If you\'ve already moved, we can handle everything remotely including a mobile notary closing.' },
      { _key: 'b4', title: 'Stop Double Payments', description: 'Sell fast and stop paying a mortgage, taxes, and insurance on a home you no longer live in.' }
    ],
    faqs: [
      { _key: 'f1', question: 'How quickly can you close if I need to move in 2 weeks?', answer: 'We can close in as little as 7 days when needed. Let us know your timeline, and we\'ll do everything possible to close before your move date.' },
      { _key: 'f2', question: 'Can I sell after I\'ve already relocated?', answer: 'Yes. We can handle the entire process remotely, including virtual property assessment and mobile notary closing at your new location.' },
      { _key: 'f3', question: 'What if my company offers relocation assistance?', answer: 'Some company relocation packages include home buyout programs. If yours doesn\'t—or if their offer is too low—we provide an alternative that\'s often faster and more straightforward.' },
      { _key: 'f4', question: 'Do I need to empty the house before selling?', answer: 'No. Take what you want and leave the rest. We buy houses with furniture and belongings included and handle the cleanout ourselves.' },
      { _key: 'f5', question: 'What if my house needs work I don\'t have time to do?', answer: 'That\'s exactly why we\'re here. We buy houses in any condition—no repairs, cleaning, or updates required. Sell as-is and focus on your move.' }
    ]
  },
  {
    _type: 'situation',
    title: 'Tired Landlord',
    slug: { _type: 'slug', current: 'tired-landlord' },
    metaTitle: 'Sell Rental Property PA | Exit Landlord Business Fast',
    metaDescription: 'Ready to stop being a landlord in Pennsylvania? Sell your rental property fast for cash. We buy tenant-occupied properties with no repairs needed.',
    heroHeadline: 'Tired of Being a Landlord?',
    heroSubheadline: 'Exit the rental business on your terms. Sell your investment property fast—even with tenants in place—and get your time back.',
    problemDescription: [
      {
        _type: 'block',
        _key: 'tl1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'tl1s', text: 'What started as a good investment has become a constant headache. Late-night maintenance calls, chasing rent payments, dealing with problem tenants, and keeping up with Pennsylvania\'s landlord-tenant laws—the passive income dream has turned into a second job you never wanted.' }]
      },
      {
        _type: 'block',
        _key: 'tl2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'tl2s', text: 'Selling a rental property through traditional methods is complicated. You need to coordinate showings around tenant schedules (if they cooperate at all), make repairs that tenants may have deferred, and find a buyer willing to take on an occupied property or wait for the lease to end.' }]
      },
      {
        _type: 'block',
        _key: 'tl3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'tl3s', text: 'We buy rental properties with tenants in place. No need to end leases, evict anyone, or wait for vacancy. We handle the transition, you get cash, and your landlord days are officially over.' }]
      }
    ],
    benefits: [
      { _key: 'b1', title: 'Sell with Tenants in Place', description: 'No need to wait for vacancy or navigate tricky eviction processes. We buy occupied properties.' },
      { _key: 'b2', title: 'No Repairs Required', description: 'Sell the property as-is, even with deferred maintenance or tenant damage.' },
      { _key: 'b3', title: 'Get Your Time Back', description: 'No more late-night calls, rent collection hassles, or property management stress.' },
      { _key: 'b4', title: 'Quick Closing', description: 'Close in as little as 7-14 days and convert your rental headache into cash.' }
    ],
    faqs: [
      { _key: 'f1', question: 'Can I sell my rental property with tenants still living there?', answer: 'Yes. We buy tenant-occupied properties regularly. We\'ll handle the tenant relationship after closing—you don\'t need to evict anyone or wait for lease expiration.' },
      { _key: 'f2', question: 'What if my tenants have caused damage to the property?', answer: 'We buy properties in any condition, including those with tenant damage. No repairs or cleaning required on your part.' },
      { _key: 'f3', question: 'Do I need to notify my tenants before selling?', answer: 'Pennsylvania law doesn\'t require advance notice to tenants before selling. However, we\'ll work with you on communication timing to ensure a smooth transition.' },
      { _key: 'f4', question: 'What if my tenants aren\'t paying rent?', answer: 'Non-paying tenants make a property harder to sell traditionally, but we can still buy it. We have experience handling tenant situations and can take over the property as-is.' },
      { _key: 'f5', question: 'Will selling affect my tenants\' lease?', answer: 'Existing leases typically transfer to the new owner. Your tenants\' rights are protected, and we\'ll honor the terms of their current lease agreement.' }
    ]
  },
  {
    _type: 'situation',
    title: 'Major Repairs Needed',
    slug: { _type: 'slug', current: 'major-repairs' },
    metaTitle: 'Sell House Needing Repairs PA | As-Is Cash Buyer',
    metaDescription: 'House needs major repairs you can\'t afford? Sell as-is for cash in Pennsylvania. No fixing up required. Get a fair offer regardless of condition.',
    heroHeadline: 'House Needs Major Repairs?',
    heroSubheadline: 'Don\'t spend thousands fixing up a house just to sell it. We buy homes in any condition—as-is, no repairs required.',
    problemDescription: [
      {
        _type: 'block',
        _key: 'mr1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'mr1s', text: 'Major repairs can quickly turn a home into a money pit. Roof replacement, foundation issues, outdated electrical, or plumbing problems can cost tens of thousands of dollars—money you may not have or may not make back in the sale price.' }]
      },
      {
        _type: 'block',
        _key: 'mr2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'mr2s', text: 'Traditional buyers and their lenders are scared off by major repairs. FHA and conventional loans have strict property requirements that homes with significant issues can\'t meet. This leaves you with a house that\'s nearly impossible to sell on the open market.' }]
      },
      {
        _type: 'block',
        _key: 'mr3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'mr3s', text: 'We buy houses with any issue: fire damage, water damage, mold, structural problems, roof failures, foundation cracks—you name it. Our cash offers don\'t require financing approval or property inspections that kill deals. Sell as-is and let us handle the repairs.' }]
      }
    ],
    benefits: [
      { _key: 'b1', title: 'Sell 100% As-Is', description: 'No repairs, no cleaning, no updates. We buy houses in any condition whatsoever.' },
      { _key: 'b2', title: 'No Inspections', description: 'We don\'t require inspections that could kill your deal or reduce your offer after the fact.' },
      { _key: 'b3', title: 'Cash Offer in 24 Hours', description: 'Get a fair, no-obligation offer within 24 hours based on current condition.' },
      { _key: 'b4', title: 'We Handle Everything', description: 'Stop worrying about repair estimates and contractor quotes. That\'s our job after we buy.' }
    ],
    faqs: [
      { _key: 'f1', question: 'What kind of repairs do you accept?', answer: 'All of them. Roof damage, foundation issues, mold, fire damage, water damage, electrical problems, plumbing failures, structural issues—we\'ve seen it all and we still buy.' },
      { _key: 'f2', question: 'Will you reduce your offer after seeing the house?', answer: 'We base our initial offer on the information you provide. While we do need to verify the condition, we don\'t play games with bait-and-switch tactics. Our offers are fair and transparent.' },
      { _key: 'f3', question: 'Why would you buy a house with major problems?', answer: 'We\'re experienced investors with contractor relationships. We can often repair properties more cost-effectively than homeowners, and we see value where others see problems.' },
      { _key: 'f4', question: 'Can I sell a house with code violations?', answer: 'Yes. We buy houses with open permits, code violations, and municipal liens. We\'ll handle resolving these issues after purchase.' },
      { _key: 'f5', question: 'What if I don\'t know what repairs the house needs?', answer: 'That\'s okay. We\'ll evaluate the property ourselves. You don\'t need to get inspections or repair estimates—just tell us what you know and we\'ll figure out the rest.' }
    ]
  },
  {
    _type: 'situation',
    title: 'Tax Liens & Code Violations',
    slug: { _type: 'slug', current: 'tax-liens-code-violations' },
    metaTitle: 'Sell House with Tax Liens PA | Code Violation Property Buyers',
    metaDescription: 'Have tax liens or code violations on your PA property? We buy houses with liens and violations. Get a cash offer and we\'ll handle the legal complications.',
    heroHeadline: 'Tax Liens or Code Violations?',
    heroSubheadline: 'Don\'t let liens and violations trap you in a property you can\'t sell. We buy houses with title issues and handle the complications.',
    problemDescription: [
      {
        _type: 'block',
        _key: 'tv1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'tv1s', text: 'Tax liens and code violations can make your property feel like a trap. The debt keeps growing, fines keep accumulating, and the traditional selling process requires you to resolve everything before closing—money you may not have.' }]
      },
      {
        _type: 'block',
        _key: 'tv2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'tv2s', text: 'Pennsylvania municipalities are aggressive about code enforcement. What started as a minor violation can snowball into thousands in fines, and tax sales can take your property entirely. Meanwhile, title companies won\'t insure properties with unresolved liens, making conventional sales impossible.' }]
      },
      {
        _type: 'block',
        _key: 'tv3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'tv3s', text: 'We specialize in properties with complicated title situations. Our team knows how to work with municipalities to negotiate lien payoffs and violation resolutions. We can often close even when other buyers have walked away.' }]
      }
    ],
    benefits: [
      { _key: 'b1', title: 'We Handle Lien Negotiations', description: 'Our team works directly with tax offices and municipalities to negotiate and resolve outstanding liens.' },
      { _key: 'b2', title: 'Buy Despite Violations', description: 'We purchase properties with open code violations and handle the resolution process after closing.' },
      { _key: 'b3', title: 'Stop the Bleeding', description: 'Sell now before fines and interest continue to accumulate and eat into your equity.' },
      { _key: 'b4', title: 'Clear Title at Closing', description: 'We pay liens at closing so you walk away clean with no lingering obligations.' }
    ],
    faqs: [
      { _key: 'f1', question: 'Can you buy my house if it has a tax lien?', answer: 'Yes. We buy properties with property tax liens regularly. The lien amount is paid off at closing from the sale proceeds, and you receive any remaining equity.' },
      { _key: 'f2', question: 'What if the liens are more than the house is worth?', answer: 'This is a difficult situation, but we may still be able to help. Sometimes we can negotiate lien reductions, or there may be options like a short sale. Contact us to discuss your specific situation.' },
      { _key: 'f3', question: 'How do code violations affect selling my house?', answer: 'Code violations can make traditional sales nearly impossible since most buyers can\'t get financing on properties with open violations. We buy cash, so this isn\'t an issue for us.' },
      { _key: 'f4', question: 'Will I be responsible for violations after selling?', answer: 'No. Once we purchase the property, we take on responsibility for resolving any outstanding violations. You walk away clean.' },
      { _key: 'f5', question: 'How long does it take to close with liens on the property?', answer: 'Lien situations can add some time for title research and negotiation, but we typically close within 2-3 weeks. Complex situations may take slightly longer.' }
    ]
  },
  {
    _type: 'situation',
    title: 'Vacant Property',
    slug: { _type: 'slug', current: 'vacant-property' },
    metaTitle: 'Sell Vacant House PA | Cash Buyer for Empty Homes',
    metaDescription: 'Tired of paying for an empty house in Pennsylvania? Sell your vacant property fast for cash. No repairs, no insurance hassles, no more carrying costs.',
    heroHeadline: 'Vacant Property Costing You Money?',
    heroSubheadline: 'Stop paying mortgage, taxes, and insurance on an empty house. Sell fast and eliminate the carrying costs.',
    problemDescription: [
      {
        _type: 'block',
        _key: 'vp1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'vp1s', text: 'Every month an empty house sits, you\'re losing money. Mortgage payments, property taxes, insurance premiums, utility bills, and lawn care add up quickly—all for a property no one is using. Meanwhile, vacant homes are targets for vandalism, break-ins, and squatters.' }]
      },
      {
        _type: 'block',
        _key: 'vp2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'vp2s', text: 'Insurance companies hate vacant properties. Most standard policies won\'t cover homes empty for more than 30-60 days, and vacant home policies are expensive. One burst pipe or break-in could leave you with major damage and no coverage.' }]
      },
      {
        _type: 'block',
        _key: 'vp3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'vp3s', text: 'The longer a house sits vacant, the more problems develop. Small issues become big ones without anyone around to notice. We buy vacant properties quickly so you can stop the financial drain and move on with your life.' }]
      }
    ],
    benefits: [
      { _key: 'b1', title: 'End the Carrying Costs', description: 'Stop paying mortgage, taxes, insurance, and utilities on a property you\'re not using.' },
      { _key: 'b2', title: 'Reduce Liability Risk', description: 'Vacant properties are liability magnets. Transfer that risk to us and protect yourself.' },
      { _key: 'b3', title: 'No Clean-Up Needed', description: 'Property been sitting with junk or left-behind items? We\'ll buy it as-is and handle the cleanout.' },
      { _key: 'b4', title: 'Fast Cash Closing', description: 'Close in as little as 7-14 days and turn your vacant burden into cash.' }
    ],
    faqs: [
      { _key: 'f1', question: 'How long is too long to leave a house vacant?', answer: 'Most insurance policies cancel coverage after 30-60 days of vacancy. Beyond that, you\'re at risk for uninsured damage and municipal fines for property maintenance violations.' },
      { _key: 'f2', question: 'My vacant house has had some vandalism/damage. Can you still buy it?', answer: 'Yes. We buy properties in any condition, including those with vandalism damage, stolen copper, or break-in damage. No repairs needed on your part.' },
      { _key: 'f3', question: 'What if there\'s stuff left in the house?', answer: 'Leave it. We buy houses with all contents included and handle the cleanout ourselves. Take what you want and walk away.' },
      { _key: 'f4', question: 'I live out of state. How does selling a vacant PA property work?', answer: 'We handle everything remotely. You don\'t need to be present for showings or closing—we can arrange mobile notary services wherever you are.' },
      { _key: 'f5', question: 'Are there tax benefits to selling a vacant property?', answer: 'Selling can eliminate ongoing deductions that may be limited by tax laws, and any losses might be deductible depending on your situation. Consult a tax professional for advice specific to your circumstances.' }
    ]
  }
]

async function seedSituations() {
  console.log('Starting to seed situations...')

  for (const situation of situations) {
    try {
      const result = await client.create(situation)
      console.log(`Created: ${situation.title} (${result._id})`)
    } catch (error) {
      console.error(`Failed to create ${situation.title}:`, error.message)
    }
  }

  console.log('Done seeding situations!')
}

seedSituations()
