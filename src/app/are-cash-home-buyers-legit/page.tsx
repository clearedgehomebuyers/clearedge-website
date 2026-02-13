import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, CheckCircle, XCircle, AlertTriangle, Phone, Check, X, Shield, Eye, Users, Building, FileText } from 'lucide-react'
import { V0Header } from '@/components/v0-header'
import { TrackedCTALink } from '@/components/TrackedCTALink'

const V0Footer = dynamic(() => import('@/components/v0-footer').then(mod => ({ default: mod.V0Footer })), { ssr: true })
const V0LeadForm = dynamic(() => import('@/components/v0-lead-form').then(mod => ({ default: mod.V0LeadForm })), { ssr: true })
const V0FAQ = dynamic(() => import('@/components/v0-faq').then(mod => ({ default: mod.V0FAQ })), { ssr: true })
const DynamicPhoneLink = dynamic(() => import('@/components/DynamicPhone').then(mod => ({ default: mod.DynamicPhoneLink })), { ssr: true })

export const metadata: Metadata = {
  title: 'Are Cash Home Buyers Legit? 8 Red Flags to Watch (2026 PA Guide)',
  description: "Are cash home buyers legit or a scam? A PA cash buyer with 200+ purchases explains the 8 red flags and what to look for before you sell your house.",
  keywords: ['are cash home buyers legit', 'we buy houses scam', 'cash home buyer scam Pennsylvania', 'how to tell if cash buyer is legit', 'is selling house for cash safe', 'cash buyer red flags'],
  openGraph: {
    title: 'Are Cash Home Buyers Legit? 8 Red Flags to Watch (2026 PA Guide)',
    description: "Are cash home buyers legit or a scam? A PA cash buyer with 200+ purchases explains the 8 red flags and what to look for before you sell your house.",
    url: 'https://www.clearedgehomebuyers.com/are-cash-home-buyers-legit',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: 'https://www.clearedgehomebuyers.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Are Cash Home Buyers Legit? - ClearEdge Home Buyers',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.clearedgehomebuyers.com/are-cash-home-buyers-legit',
  },
}

const faqs = [
  {
    question: 'Are "We Buy Houses" companies legitimate?',
    answer: "Most are legitimate businesses. Cash home buying has been a standard part of real estate for decades. However, scams and unethical operators exist. Always verify proof of funds, check Google reviews, and ask how the offer was calculated before signing anything.",
  },
  {
    question: 'How do I know if a cash offer is fair?',
    answer: "A fair cash offer typically falls between 70-85% of after-repair market value, minus estimated repair costs. The key is transparency — a legitimate buyer should show you exactly how they arrived at the number. Get 2-3 offers from different buyers to compare. You can also get a no-obligation offer from ClearEdge to use as a benchmark.",
  },
  {
    question: 'Do cash buyers in Pennsylvania charge fees?',
    answer: "Legitimate cash buyers do not charge sellers any fees. If a company asks for \"processing fees,\" \"administrative charges,\" or any upfront payment, that's a major red flag. ClearEdge never charges sellers a single dollar — we cover all closing costs.",
  },
  {
    question: 'Should I sell to a cash buyer or use a realtor?',
    answer: "It depends on your situation. If your home is in good condition and you have 90+ days, a realtor may net you more money. If you need to sell quickly, the property needs major repairs, or you're dealing with foreclosure, liens, probate, or other complications, a cash buyer may be the better path.",
  },
  {
    question: "What's the difference between a cash buyer and a wholesaler?",
    answer: "A cash buyer purchases your property directly with their own funds. A wholesaler puts your house under contract, then tries to assign (sell) that contract to another investor. The risk with wholesalers is that if they can't find an end buyer, the deal falls through. ClearEdge is a direct buyer — we purchase every property ourselves.",
  },
  {
    question: 'Has the PA Attorney General warned about home buying scams?',
    answer: "Yes. The PA Attorney General's office has issued consumer alerts about fraudulent deed transfers and home-buying scams. This is why vetting your buyer is critical. Always verify identity, check reviews, get everything in writing, and never sign documents you don't fully understand.",
  },
]


export default function AreCashHomeBuyersLegitPage() {
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
                '@type': 'Article',
                '@id': 'https://www.clearedgehomebuyers.com/are-cash-home-buyers-legit/#article',
                headline: 'Are Cash Home Buyers Legit? An Honest Answer from a PA Cash Buyer',
                description: "The industry has real problems. Here's how to tell the difference between a legitimate local buyer and a scam — from someone who's been doing this since 2016.",
                author: {
                  '@type': 'Person',
                  name: 'Tyler Swenson',
                },
                publisher: {
                  '@id': 'https://www.clearedgehomebuyers.com/#organization',
                },
                datePublished: '2026-02-06',
                dateModified: '2026-02-06',
                mainEntityOfPage: 'https://www.clearedgehomebuyers.com/are-cash-home-buyers-legit',
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://www.clearedgehomebuyers.com/are-cash-home-buyers-legit/#breadcrumb',
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
                    name: 'Are Cash Home Buyers Legit?',
                    item: 'https://www.clearedgehomebuyers.com/are-cash-home-buyers-legit',
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://www.clearedgehomebuyers.com/are-cash-home-buyers-legit/#faq',
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
        <section className="relative pt-32 pb-10 md:pb-12 px-4 overflow-hidden bg-surface-cream">
          <div className="relative max-w-4xl mx-auto text-center">
            <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
              Trust & Transparency
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium text-ce-ink mb-6 leading-tight">
              Are Cash Home Buyers Legit? An Honest Answer from a PA Cash Buyer
            </h1>
            <p className="text-xl text-ce-ink/70 mb-8 max-w-3xl mx-auto">
              The industry has real problems. Here&apos;s how to tell the difference between a legitimate local buyer and a scam — from someone who&apos;s been doing this since 2016.
            </p>
            <a
              href="#clearedge-difference"
              className="inline-flex items-center justify-center text-base px-8 py-4 rounded-full text-ce-ink/80 hover:text-ce-ink hover:bg-ce-ink/5 font-medium border border-ce-ink/10"
            >
              Skip ahead — see how ClearEdge is different
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </section>


        {/* SECTION 1: THE SHORT ANSWER */}
        <section id="short-answer" className="py-12 md:py-14 bg-white scroll-mt-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                The Short Answer
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                Yes, Most Cash Home Buyers Are Legitimate
              </h2>
            </div>
            <div className="text-lg text-ce-ink/70 space-y-6 leading-relaxed">
              <p>
                According to the <a href="https://www.nar.realtor/" target="_blank" rel="noopener noreferrer" className="text-ce-green hover:underline">National Association of Realtors</a>, roughly 29% of all U.S. home sales in late 2025 were all-cash transactions — the highest share in over a decade. Cash buying is a real, established part of the housing market, not some fringe scheme.
              </p>
              <p>
                That said, the industry has a trust problem — and it&apos;s earned. Scammers use the same &quot;We Buy Houses&quot; signs, postcards, and cold calls that legitimate buyers use. The <a href="https://www.attorneygeneral.gov/" target="_blank" rel="noopener noreferrer" className="text-ce-green hover:underline">PA Attorney General&apos;s office</a> has issued consumer alerts about home-buying scams. And some operators, while technically legal, use high-pressure tactics, hidden fees, and lowball offers that leave homeowners feeling ripped off.
              </p>
              <p>
                The goal of this page is to help you tell the difference. I&apos;m Tyler, the founder of <Link href="/about" className="text-ce-green hover:underline">ClearEdge Home Buyers</Link>. I&apos;ve been buying homes across Eastern Pennsylvania since 2016. I&apos;m going to be completely transparent about how this industry works — the good and the bad — so you can make an informed decision.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: HOW LEGITIMATE CASH HOME BUYING WORKS */}
        <section id="how-it-works" className="py-12 md:py-14 bg-surface-cream scroll-mt-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                The Process
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                How Legitimate Cash Home Buying Works
              </h2>
            </div>
            <div className="text-lg text-ce-ink/70 space-y-6 leading-relaxed">
              <p>
                A legitimate cash home buyer purchases properties directly from homeowners using their own funds (or a private credit line), without relying on mortgage financing. Here&apos;s the standard process:
              </p>

              <div className="space-y-4">
                {[
                  { step: '1', title: 'You contact the buyer', desc: '(or they contact you through marketing). You share basic property details.' },
                  { step: '2', title: 'The buyer researches your property', desc: '— comps, condition, repair estimates, local market data.' },
                  { step: '3', title: 'You receive a written cash offer', desc: 'This should come within 24-72 hours for most companies.' },
                  { step: '4', title: 'You accept or decline', desc: "There should be zero pressure. If a company won't give you time to think, that's a red flag." },
                  { step: '5', title: 'The buyer does a property walkthrough', desc: 'to verify condition.' },
                  { step: '6', title: 'You close on your timeline', desc: 'Typically 7-30 days. The buyer covers closing costs. You get paid.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 bg-white rounded-xl p-5 border border-ce-ink/5">
                    <div className="w-10 h-10 bg-ce-green rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-ce-ink">{item.title}</span>
                      <span className="text-ce-ink/70"> {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border-l-4 border-ce-green p-6 rounded-r-2xl">
                <p className="text-ce-ink/80">
                  <span className="font-semibold text-ce-ink">The trade-off is straightforward:</span> you accept a lower price (typically 70-85% of after-repair market value) in exchange for speed, certainty, zero repairs, zero commissions, and zero hassle. For many homeowners — especially those facing <Link href="/situations/foreclosure" className="text-ce-green hover:underline">foreclosure</Link>, <Link href="/situations/inherited-property" className="text-ce-green hover:underline">inherited properties</Link>, <Link href="/situations/major-repairs" className="text-ce-green hover:underline">major repairs</Link>, or time pressure — that trade-off makes sense.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE 8 RED FLAGS */}
        <section id="red-flags" className="py-12 md:py-14 bg-white scroll-mt-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Protect Yourself
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                The 8 Red Flags That Signal a Scam or Bad Operator
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  number: '1',
                  title: 'They ask YOU for money.',
                  desc: 'A cash buyer is supposed to be paying you. If anyone asks for "processing fees," "administrative costs," or any upfront payment before closing, walk away immediately. This is the #1 scam indicator.',
                },
                {
                  number: '2',
                  title: "They won't show proof of funds.",
                  desc: "A legitimate buyer can prove they have the cash to close. If they dodge this request or provide vague reassurances instead of documentation, they may not actually have the money.",
                },
                {
                  number: '3',
                  title: 'They pressure you to sign immediately.',
                  desc: '"This offer expires today." "I have another property I\'m looking at so I can\'t wait." Any artificial urgency is a manipulation tactic. Legitimate buyers give you time — 30 days or more — to decide.',
                },
                {
                  number: '4',
                  title: "They won't explain how they calculated the offer.",
                  desc: 'If you ask "how did you arrive at this number?" and get a vague answer like "that\'s what the property is worth to us," you\'re not dealing with a transparent operator. You deserve to see the math.',
                },
                {
                  number: '5',
                  title: "They're a wholesaler pretending to be a buyer.",
                  desc: 'Wholesalers put your house under contract, then flip that contract to another investor for a fee. They never intended to buy it themselves. The risk: if they can\'t find a buyer, the deal falls through and you\'ve wasted weeks or months. Ask directly: "Are you buying this property yourself with your own funds, or are you assigning the contract?"',
                },
                {
                  number: '6',
                  title: 'No local presence or track record.',
                  desc: 'National call centers route leads to random local investors. The "company" might be a guy with a website and a Google Voice number. Look for: a real office or local address, Google reviews from real people in your area, a history of actual purchases, and a human who answers the phone.',
                },
                {
                  number: '7',
                  title: 'The contract has "walk away" contingencies.',
                  desc: "Some buyers include broad clauses that let them cancel the deal for practically any reason — even after you've taken your house off the market. Read the contract carefully. A legitimate cash offer should be firm.",
                },
                {
                  number: '8',
                  title: 'They renegotiate after you accept.',
                  desc: '"We found some issues during the walkthrough so we need to drop the price by $15,000." This bait-and-switch tactic is unfortunately common. The walkthrough should confirm what was already discussed — not be used as leverage to lower the price.',
                },
              ].map((flag) => (
                <div key={flag.number} className="bg-red-50 rounded-2xl p-6 border border-red-200">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{flag.number}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-800 mb-2">Red Flag #{flag.number}: {flag.title}</h3>
                      <p className="text-red-700/80">{flag.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: WHAT LEGITIMATE CASH BUYERS LOOK LIKE */}
        <section id="legit-buyers" className="py-12 md:py-14 bg-surface-cream scroll-mt-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Green Flags
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                What Legitimate Cash Buyers Look Like
              </h2>
            </div>

            <p className="text-lg text-ce-ink/70 mb-8 text-center max-w-2xl mx-auto">
              Here&apos;s what you SHOULD see when dealing with a real, reputable cash home buyer:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: Building, title: 'Local presence', desc: 'They live and work in your area. They know the neighborhoods, the market, and the local contractors.' },
                { icon: Users, title: 'Verifiable track record', desc: "Google reviews from real homeowners (not just first-name-only reviews). A history of actual property purchases in your county." },
                { icon: Eye, title: 'Transparent offer process', desc: 'They walk you through the calculation: after-repair value, estimated repairs, closing costs, their margin. You see every line item.' },
                { icon: Shield, title: 'No fees, ever', desc: 'Zero out-of-pocket cost to you. No commissions, no processing fees, no surprises at closing.' },
                { icon: FileText, title: 'Written offer with time to decide', desc: 'The offer is documented, explained, and good for at least 30 days.' },
                { icon: CheckCircle, title: 'Proof of funds on request', desc: 'They can show bank statements or a line of credit letter proving they can close.' },
                { icon: Building, title: 'They buy properties themselves', desc: "Not wholesaling. Not assigning contracts. They're the actual end buyer." },
                { icon: Phone, title: 'They answer the phone', desc: 'You talk to a real person, not a call center script reader.' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-ce-ink/5 flex gap-4">
                  <div className="w-10 h-10 bg-ce-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-ce-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ce-ink mb-1">{item.title}</h3>
                    <p className="text-sm text-ce-ink/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: HOW CLEAREDGE IS DIFFERENT */}
        <section id="clearedge-difference" className="py-12 md:py-14 bg-white scroll-mt-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Our Approach
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                How ClearEdge Is Different
              </h2>
            </div>

            <p className="text-lg text-ce-ink/70 mb-8 text-center max-w-2xl mx-auto">
              I&apos;m not going to pretend every cash buyer is a scam — most aren&apos;t. But I also know this industry has earned its reputation for opacity. Here&apos;s how we operate differently:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: 'We show you the math.',
                  desc: 'Every ClearEdge offer comes with a breakdown: the after-repair value, our estimated repair costs, closing and carrying costs, and our margin. You see every line item. No black box.',
                  link: { href: '/how-it-works', text: 'See our full calculation process' },
                },
                {
                  title: 'We provide proof of funds.',
                  desc: "Ask us. We'll show you.",
                  link: null,
                },
                {
                  title: 'Zero fees. Always.',
                  desc: "We've never charged a seller a single dollar. No commissions, no processing fees, no closing costs. That's not a promotion — it's how we operate.",
                  link: null,
                },
                {
                  title: 'Local, family-owned since 2016.',
                  desc: "I'm Tyler. I started this business with a single duplex on Birch Street in Scranton. We've purchased over 200 homes across 21 Eastern PA communities. We're not a national franchise or a wholesaler. We buy properties ourselves with our own capital.",
                  link: { href: '/about', text: "Read Tyler's story" },
                },
                {
                  title: '5.0 Google rating.',
                  desc: 'Our reviews are from real homeowners in Scranton, Allentown, Bethlehem, and across Eastern PA who\'ve actually sold their houses to us.',
                  link: { href: '/testimonials', text: 'Read our reviews' },
                },
                {
                  title: '30-day offer validity.',
                  desc: "Our offers are good for 30 days. Take your time. Get other offers. Compare. We're not going anywhere.",
                  link: null,
                },
                {
                  title: "We'll tell you when we're NOT your best option.",
                  desc: "If your house is in good shape and you have time, a realtor will likely get you more money. We've told homeowners this directly.",
                  link: { href: '/cash-buyer-vs-realtor', text: 'See our honest cash buyer vs. realtor comparison' },
                },
                {
                  title: 'Tyler answers the phone.',
                  desc: 'Not a receptionist. Not a call center. Me.',
                  phone: true,
                },
              ].map((item, i) => (
                <div key={i} className="bg-ce-green-subtle rounded-xl p-5 border border-ce-green/20">
                  <div className="flex gap-4">
                    <Check className="w-6 h-6 text-ce-green flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-ce-ink mb-1">{item.title}</h3>
                      <p className="text-ce-ink/70 mb-2">{item.desc}</p>
                      {item.link && (
                        <Link href={item.link.href} className="text-ce-green hover:underline text-sm font-medium inline-flex items-center gap-1">
                          {item.link.text} <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                      {item.phone && (
                        <DynamicPhoneLink
                          className="text-ce-green hover:underline text-sm font-medium"
                          showIcon={false}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: VETTING CHECKLIST */}
        <section id="checklist" className="py-12 md:py-14 bg-surface-cream scroll-mt-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-3 block">
                Before You Sign
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-ce-ink">
                How to Vet ANY Cash Buyer (Checklist)
              </h2>
            </div>

            <p className="text-lg text-ce-ink/70 mb-8 text-center">
              Before accepting any cash offer in Pennsylvania, run through this checklist:
            </p>

            <div className="bg-white rounded-2xl p-8 border border-ce-ink/5">
              <ul className="space-y-4">
                {[
                  'Google the company name + "reviews" — read at least 5 recent reviews from real people',
                  'Check the Better Business Bureau for complaints (not just the rating — read the actual complaints)',
                  'Ask: "Are you buying this property yourself, or assigning the contract?"',
                  'Ask: "Can you provide proof of funds?"',
                  'Ask: "Can you walk me through how you calculated this offer?"',
                  'Read every line of the contract before signing — look for broad cancellation clauses',
                  'Verify the company has a local address and a real person you can reach',
                  'Get at least 2-3 offers from different buyers to compare',
                  'Never pay any fees upfront — a real buyer pays YOU, not the other way around',
                  'Take your time — if they pressure you, walk away',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 border-2 border-ce-green rounded flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <span className="text-ce-green text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-ce-ink/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 text-center">
              <p className="text-ce-ink/70 mb-6">
                Want a baseline to compare against? Get a no-obligation offer from ClearEdge — it&apos;s free, transparent, and comes with zero pressure.
              </p>
              <TrackedCTALink
                href="#lead-form"
                label="Get Your Free Cash Offer to Compare"
                eventLabel="Get Free Cash Offer - Checklist Section"
              />
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ */}
        <section id="faq" className="scroll-mt-32">
          <V0FAQ
            faqs={faqs}
            title="Common Questions About Cash Home Buyers"
            subtitle="Here are the questions homeowners ask most when vetting cash buyers."
            sectionBg="white"
          />
        </section>


        {/* LEAD FORM */}
        <V0LeadForm />


        <V0Footer />
      </main>
    </>
  )
}
