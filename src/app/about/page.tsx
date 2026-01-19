import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { V0FAQ } from '@/components/v0-faq'
import { V0LeadForm } from '@/components/v0-lead-form'

export const metadata: Metadata = {
  title: 'About ClearEdge Home Buyers | Local Cash Home Buyers Since 2016',
  description: "Meet Tyler and the ClearEdge team. Family-owned cash home buyers based in Scranton, serving NEPA, Lehigh Valley & Poconos since 2016.",
  keywords: ['about ClearEdge', 'cash home buyers Scranton', 'Tyler ClearEdge', 'local home buyers PA'],
  openGraph: {
    title: 'About ClearEdge Home Buyers | Local Cash Home Buyers Since 2016',
    description: 'Meet Tyler and the ClearEdge team. Family-owned cash home buying company serving Eastern PA since 2016.',
    url: 'https://www.clearedgehomebuyers.com/about',
    siteName: 'ClearEdge Home Buyers',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.clearedgehomebuyers.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClearEdge Home Buyers - Sell Your House Fast for Cash in Pennsylvania',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.clearedgehomebuyers.com/about',
  },
}


const situations = [
  { name: 'Facing Foreclosure', href: '/situations/foreclosure' },
  { name: 'Inherited Property', href: '/situations/inherited-property' },
  { name: 'Going Through Divorce', href: '/situations/divorce' },
  { name: 'Job Relocation', href: '/situations/job-relocation' },
  { name: 'Major Repairs Needed', href: '/situations/major-repairs' },
  { name: 'Tax Liens or Code Violations', href: '/situations/tax-liens-code-violations' },
  { name: 'Tired Landlord', href: '/situations/tired-landlord' },
  { name: 'Vacant Property', href: '/situations/vacant-property' },
]


const faqs = [
  {
    question: 'Is ClearEdge a franchise or national company?',
    answer: "No. We're a local, family-owned business founded in Scranton in 2016. We're not affiliated with any franchise or corporate buyer network."
  },
  {
    question: 'Who will I work with?',
    answer: "You'll work directly with Tyler from the first call through closing. No hand-offs, no rotating salespeople."
  },
  {
    question: 'How do you make money?',
    answer: 'We buy properties, renovate them, and resell them. Our profit comes from the difference between what we pay you and what we eventually sell the property for — minus repair and holding costs.'
  },
  {
    question: 'Do you buy houses in any condition?',
    answer: "Yes. Foundation issues, fire damage, mold, hoarding, code violations — condition doesn't disqualify you. We factor repairs into our offer."
  },
  {
    question: 'What areas do you serve?',
    answer: 'We buy houses throughout Eastern Pennsylvania — NEPA (Scranton, Wilkes-Barre, Hazleton), Lehigh Valley (Allentown, Bethlehem, Easton, Reading), and the Poconos (Stroudsburg and surrounding areas).'
  },
]


export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ClearEdge Home Buyers',
            legalName: 'ClearEdge Properties LLC',
            url: 'https://www.clearedgehomebuyers.com',
            logo: 'https://www.clearedgehomebuyers.com/logo.png',
            foundingDate: '2016',
            founder: {
              '@type': 'Person',
              name: 'Tyler',
            },
            address: {
              '@type': 'PostalAddress',
              addressRegion: 'PA',
              addressCountry: 'US',
            },
            areaServed: [
              { '@type': 'State', name: 'Pennsylvania' },
              { '@type': 'City', name: 'Scranton' },
              { '@type': 'City', name: 'Wilkes-Barre' },
              { '@type': 'City', name: 'Allentown' },
              { '@type': 'City', name: 'Bethlehem' },
              { '@type': 'City', name: 'Reading' },
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-570-904-2059',
              contactType: 'sales',
              areaServed: 'US',
              availableLanguage: 'English',
            },
            sameAs: [],
          }),
        }}
      />

      <main className="bg-white">
        <V0Header />

        {/* Hero Section - Cream with dot pattern */}
        <section className="relative pt-32 pb-16 md:pb-20 px-4 overflow-hidden bg-[#FAF8F5]">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fillOpacity='1' fillRule='evenodd'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
              About Us
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium text-[#1a1f1a] mb-6">
              We&apos;re Not a Franchise. We&apos;re Your Neighbors.
            </h1>
            <p className="text-xl text-[#1a1f1a]/70 mb-6 max-w-2xl mx-auto">
              ClearEdge Home Buyers is a family-owned business based in Eastern Pennsylvania. We&apos;ve been helping homeowners sell fast since 2016.
            </p>
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 bg-[#008a29] text-white px-8 py-4 rounded-full font-medium hover:bg-[#007a24] transition-all group shadow-lg shadow-[#008a29]/20"
            >
              Get My Cash Offer
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* Origin Story - White */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-6">
              How ClearEdge Started
            </h2>
            <div className="space-y-6 text-lg text-[#1a1f1a]/70">
              <p>
                I&apos;m Tyler, the founder of ClearEdge Home Buyers. In 2016, my high school friend and I bought our first property — a duplex on Birch Street in Scranton. We didn&apos;t have a business plan or investors. Just a belief that we could help homeowners while building something we&apos;d be proud of.
              </p>
              <p>
                That first deal taught us everything. We learned how to navigate title issues, work with estate attorneys, and close deals that other buyers walked away from. Most importantly, we learned that homeowners don&apos;t want to be treated like a transaction. They want someone who listens, explains the process, and actually does what they say they&apos;ll do.
              </p>
              <p>
                Since then, we&apos;ve helped more than 200 families across Eastern Pennsylvania sell properties they no longer wanted or couldn&apos;t maintain. We&apos;ve expanded from Scranton to the Lehigh Valley and the Poconos — but we still answer our own phones, and I&apos;m still personally involved in every deal.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes ClearEdge Different - Cream */}
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
                Our Difference
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                What Makes ClearEdge Different
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
                <div className="w-10 h-10 bg-[#008a29]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#008a29] font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-2">Local, Not Corporate</h3>
                <p className="text-[#1a1f1a]/70">
                  We&apos;re based in Scranton, not a call center in another state. When you call, you talk to Tyler — not a script reader.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
                <div className="w-10 h-10 bg-[#008a29]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#008a29] font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-2">Transparent Pricing</h3>
                <p className="text-[#1a1f1a]/70">
                  We show you exactly how we calculate our offer. No mystery math, no pressure tactics. If the numbers don&apos;t work for you, we&apos;ll tell you.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
                <div className="w-10 h-10 bg-[#008a29]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#008a29] font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-2">Your Timeline</h3>
                <p className="text-[#1a1f1a]/70">
                  Need to close in 7 days? We can do that. Need 60 days to find your next place? That works too. You&apos;re in control.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
                <div className="w-10 h-10 bg-[#008a29]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#008a29] font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-2">We Handle the Hard Stuff</h3>
                <p className="text-[#1a1f1a]/70">
                  Probate, liens, code violations, out-of-state sellers, tenant issues — we&apos;ve seen it all and know how to navigate it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Homeowners We Work With - White */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
                We Can Help
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-4">
                Homeowners We Work With
              </h2>
              <p className="text-lg text-[#1a1f1a]/70 max-w-2xl mx-auto">
                We buy houses in all kinds of situations. If any of these sound familiar, we can help:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {situations.map((situation) => (
                <Link
                  key={situation.href}
                  href={situation.href}
                  className="relative flex flex-col items-center justify-center text-center min-h-[100px] p-4 bg-[#FAF8F5] rounded-2xl hover:bg-[#008a29]/10 transition-colors group border border-[#1a1f1a]/5"
                >
                  <span className="text-[#1a1f1a]/70 group-hover:text-[#008a29] transition-colors font-medium">
                    {situation.name}
                  </span>
                  <ArrowRight className="absolute bottom-3 right-3 w-4 h-4 text-[#008a29] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Serving All of Eastern Pennsylvania - Cream */}
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
                Service Areas
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                Serving All of Eastern Pennsylvania
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-4 pb-2 border-b-2 border-[#008a29]">
                  NEPA
                </h3>
                <ul className="space-y-2">
                  <li><Link href="/locations/scranton" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Scranton</Link></li>
                  <li><Link href="/locations/wilkes-barre" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Wilkes-Barre</Link></li>
                  <li><Link href="/locations/hazleton" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Hazleton</Link></li>
                  <li><Link href="/locations/pittston" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Pittston</Link></li>
                  <li><Link href="/locations/kingston" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Kingston</Link></li>
                  <li><Link href="/locations/nanticoke" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Nanticoke</Link></li>
                  <li><Link href="/locations/carbondale" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Carbondale</Link></li>
                  <li><Link href="/locations/dunmore" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Dunmore</Link></li>
                  <li><Link href="/locations/honesdale" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Honesdale</Link></li>
                  <li><Link href="/locations/bloomsburg" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Bloomsburg</Link></li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-4 pb-2 border-b-2 border-[#008a29]">
                  Lehigh Valley
                </h3>
                <ul className="space-y-2">
                  <li><Link href="/locations/allentown" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Allentown</Link></li>
                  <li><Link href="/locations/bethlehem" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Bethlehem</Link></li>
                  <li><Link href="/locations/easton" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Easton</Link></li>
                  <li><Link href="/locations/reading" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Reading</Link></li>
                  <li><Link href="/locations/pottsville" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Pottsville</Link></li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#1a1f1a]/5">
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-4 pb-2 border-b-2 border-[#008a29]">
                  Poconos
                </h3>
                <ul className="space-y-2">
                  <li><Link href="/locations/stroudsburg" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Stroudsburg</Link></li>
                  <li><Link href="/locations/east-stroudsburg" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">East Stroudsburg</Link></li>
                  <li><Link href="/locations/pocono-pines" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Pocono Pines</Link></li>
                  <li><Link href="/locations/tannersville" className="text-[#1a1f1a]/70 hover:text-[#008a29] transition-colors">Tannersville</Link></li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center gap-2 bg-[#008a29] text-white px-8 py-4 rounded-full font-medium hover:bg-[#007a24] transition-all group shadow-lg shadow-[#008a29]/20"
              >
                Don&apos;t see your town? Reach out anyway
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* Local Knowledge Section - White */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-6">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
                Local Expertise
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a]">
                We Know Pennsylvania Real Estate
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#008a29]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-[#008a29]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1f1a] mb-1">Municipal Pre-Sale Inspections</h3>
                  <p className="text-[#1a1f1a]/70">Cities like Allentown require inspections before closing. We know which municipalities have requirements and how to navigate them.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#008a29]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-[#008a29]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1f1a] mb-1">Probate Process</h3>
                  <p className="text-[#1a1f1a]/70">Pennsylvania probate can take months. We work with estate attorneys regularly and can close during or after the process.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#008a29]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-[#008a29]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1f1a] mb-1">Mine Subsidence (NEPA)</h3>
                  <p className="text-[#1a1f1a]/70">Parts of Northeastern PA have underground mine issues. We understand the risks and factor them into our offers fairly.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#008a29]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-[#008a29]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1f1a] mb-1">Title &amp; Lien Issues</h3>
                  <p className="text-[#1a1f1a]/70">Tax liens, judgments, code violations — we&apos;ve closed deals with complicated title situations that scared off other buyers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section - Cream */}
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
              Testimonial
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-6">
              What Homeowners Say
            </h2>
            <div className="bg-white rounded-2xl p-8 lg:p-12 border border-[#1a1f1a]/5">
              <div className="text-[#008a29] text-6xl font-serif leading-none mb-4">&ldquo;</div>
              <blockquote className="text-xl lg:text-2xl text-[#1a1f1a]/70 leading-relaxed mb-6">
                First to take time to explain the process and make me feel comfortable.
              </blockquote>
              <p className="text-[#1a1f1a]/70">— Gavin S.</p>
            </div>
            <div className="mt-8">
              <Link href="/testimonials" className="text-[#008a29] hover:text-[#007a24] font-medium">
                Read all reviews &rarr;
              </Link>
            </div>
          </div>
        </section>


        {/* FAQ Section - White */}
        <V0FAQ
          faqs={faqs}
          title="Common Questions About ClearEdge"
          subtitle="Learn more about who we are and how we work."
        />

        {/* Closing SEO - Sage gradient */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-[#1a2e1a] font-medium">
              ClearEdge Home Buyers is a local, family-owned company helping Eastern Pennsylvania homeowners sell fast for cash. Founded in Scranton in 2016. Still here. Still answering our own phones.
            </p>
          </div>
        </section>

        {/* Lead Form Section - Beige */}
        <section id="lead-form" className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-6">
            <V0LeadForm />
            <p className="text-[#1a1f1a]/70 text-sm mt-8 text-center">
              Prefer to call? Reach Tyler directly:{' '}
              <a href="tel:+15709042059" className="font-semibold text-[#008a29] hover:underline">
                (570) 904-2059
              </a>
            </p>
          </div>
        </section>

        <V0Footer />
      </main>
    </>
  )
}
