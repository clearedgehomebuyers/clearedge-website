import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { V0Header } from '@/components/v0-header'
import { V0Footer } from '@/components/v0-footer'
import { V0FAQ } from '@/components/v0-faq'
import { V0LeadForm } from '@/components/v0-lead-form'
import { DynamicPhoneLink } from '@/components/DynamicPhone'
import { TrackedCTALink } from '@/components/TrackedCTALink'
import { LiteYouTube } from '@/components/LiteYouTube'

export const metadata: Metadata = {
  title: 'About Us | Local Cash Home Buyers Since 2016',
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
            '@type': 'VideoObject',
            name: 'Sell Your House Fast in PA | ClearEdge Home Buyers',
            description: 'Tyler from ClearEdge Home Buyers explains the easiest way to sell your house fast in Northeastern PA, the Lehigh Valley, and the Poconos. Get a full cash offer in 24 hours with no fees, no commissions, and no repairs needed.',
            thumbnailUrl: 'https://i.ytimg.com/vi/YS6uDgxIjiI/maxresdefault.jpg',
            uploadDate: '2026-01-27T08:00:00-05:00',
            duration: 'PT1M10S',
            contentUrl: 'https://www.youtube.com/watch?v=YS6uDgxIjiI',
            embedUrl: 'https://www.youtube.com/embed/YS6uDgxIjiI',
            publisher: {
              '@type': 'Organization',
              name: 'ClearEdge Home Buyers',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.clearedgehomebuyers.com/logo.webp',
              },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.clearedgehomebuyers.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'About',
                item: 'https://www.clearedgehomebuyers.com/about',
              },
            ],
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
            logo: 'https://www.clearedgehomebuyers.com/logo.webp',
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
            email: 'info@clearedgehomebuyers.com',
            areaServed: [
              { '@type': 'City', name: 'Scranton' },
              { '@type': 'City', name: 'Wilkes-Barre' },
              { '@type': 'City', name: 'Allentown' },
              { '@type': 'City', name: 'Bethlehem' },
              { '@type': 'City', name: 'Easton' },
              { '@type': 'City', name: 'Reading' },
              { '@type': 'City', name: 'Hazleton' },
              { '@type': 'City', name: 'Stroudsburg' },
              { '@type': 'City', name: 'East Stroudsburg' },
              { '@type': 'City', name: 'Honesdale' },
              { '@type': 'City', name: 'Carbondale' },
              { '@type': 'City', name: 'Pittston' },
              { '@type': 'City', name: 'Kingston' },
              { '@type': 'City', name: 'Nanticoke' },
              { '@type': 'City', name: 'Dunmore' },
              { '@type': 'City', name: 'Bloomsburg' },
              { '@type': 'City', name: 'Pottsville' },
              { '@type': 'City', name: 'Pocono Pines' },
              { '@type': 'City', name: 'Tannersville' },
              { '@type': 'Place', name: 'Lehigh Valley' },
              { '@type': 'Place', name: 'Poconos' },
              { '@type': 'AdministrativeArea', name: 'Lackawanna County' },
              { '@type': 'AdministrativeArea', name: 'Luzerne County' },
              { '@type': 'AdministrativeArea', name: 'Lehigh County' },
              { '@type': 'AdministrativeArea', name: 'Northampton County' },
              { '@type': 'AdministrativeArea', name: 'Berks County' },
              { '@type': 'AdministrativeArea', name: 'Monroe County' },
              { '@type': 'AdministrativeArea', name: 'Wayne County' },
              { '@type': 'AdministrativeArea', name: 'Columbia County' },
              { '@type': 'AdministrativeArea', name: 'Schuylkill County' },
              { '@type': 'AdministrativeArea', name: 'Carbon County' },
              { '@type': 'AdministrativeArea', name: 'Pike County' },
              { '@type': 'State', name: 'Pennsylvania' },
              { '@type': 'Place', name: 'Eastern Pennsylvania' },
              { '@type': 'Place', name: 'Northeastern Pennsylvania' },
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-610-904-8526',
              contactType: 'sales',
              areaServed: 'US',
              availableLanguage: 'English',
            },
            sameAs: [
              'https://www.facebook.com/profile.php?id=61578297005995',
              'https://www.instagram.com/clearedge_home_buyers/',
              'https://www.youtube.com/@ClearEdgeHomeBuyers',
              'https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8603424,-75.8193544,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm',
            ],
          }),
        }}
      />

      <main className="bg-white">
        <V0Header />

        {/* Hero Section - Cream */}
        <section className="relative pt-32 pb-10 md:pb-12 px-4 overflow-hidden bg-[#FAF8F5]">
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
            <TrackedCTALink
              href="#lead-form"
              label="Get My Cash Offer"
              eventLabel="Get My Cash Offer - About Hero"
            />
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

        {/* Meet Tyler Video - Cream */}
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
                Meet Tyler
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-4">
                A Quick Message From Our Founder
              </h2>
              <p className="text-[#1a1f1a]/70 text-lg max-w-2xl mx-auto">
                Watch this 60-second video to learn how we help Pennsylvania homeowners sell fast without the hassle.
              </p>
            </div>
            <LiteYouTube
              videoId="YS6uDgxIjiI"
              title="Sell Your House Fast in PA | ClearEdge Home Buyers"
            />
          </div>
        </section>

        {/* What Makes ClearEdge Different - White */}
        <section className="py-12 md:py-14 bg-white">
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
              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5">
                <div className="w-10 h-10 bg-[#008a29]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#008a29] font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-2">Local, Not Corporate</h3>
                <p className="text-[#1a1f1a]/70">
                  We&apos;re based in Scranton, not a call center in another state. When you call, you talk to Tyler — not a script reader.
                </p>
              </div>
              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5">
                <div className="w-10 h-10 bg-[#008a29]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#008a29] font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-2">Transparent Pricing</h3>
                <p className="text-[#1a1f1a]/70">
                  We show you exactly how we calculate our offer. No mystery math, no pressure tactics. If the numbers don&apos;t work for you, we&apos;ll tell you. <Link href="/how-it-works" className="text-[#008a29] hover:underline">See how our process works</Link>.
                </p>
              </div>
              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5">
                <div className="w-10 h-10 bg-[#008a29]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#008a29] font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-[#1a1f1a] mb-2">Your Timeline</h3>
                <p className="text-[#1a1f1a]/70">
                  Need to close in 7 days? We can do that. Need 60 days to find your next place? That works too. You&apos;re in control.
                </p>
              </div>
              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1a1f1a]/5">
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

        {/* Local Knowledge Section - Cream */}
        <section className="py-12 md:py-14 bg-[#FAF8F5]">
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
            <div className="mt-8 text-center">
              <p className="text-[#1a1f1a]/70">
                Want to learn more about selling in your specific situation? <Link href="/blog" className="text-[#008a29] hover:underline">Browse our guides and resources</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial Section - White */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="text-[#008a29] font-medium text-sm tracking-wide uppercase mb-4 block">
              Testimonial
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-6">
              What Homeowners Say
            </h2>
            <div className="bg-[#FAF8F5] rounded-2xl p-8 lg:p-12 border border-[#1a1f1a]/5">
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


        {/* Lead Form Section - Beige */}
        <section id="lead-form" className="py-8 md:py-10 bg-[#FAF8F5] scroll-mt-20 md:scroll-mt-24">
          <div className="max-w-3xl mx-auto px-6">
            <V0LeadForm />
            <p className="text-[#1a1f1a]/70 text-sm mt-8 text-center">
              Prefer to call? Reach Tyler directly:{' '}
              <DynamicPhoneLink className="font-semibold text-[#008a29] hover:underline" />
            </p>
          </div>
        </section>


        <V0Footer />
      </main>
    </>
  )
}
