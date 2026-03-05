"use client"

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Calculator } from '@/components/calculator'
import { LiteYouTube } from '@/components/LiteYouTube'
import { SoftLeadForm } from '@/components/soft-lead-form'

// Auto-set SMS attribution if no UTM params present in URL
// Since this page is only reachable via SMS campaigns, bare /txt visits
// should still attribute correctly
function useAutoSMSAttribution() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const hasUtm = params.has('utm_source')

    if (!hasUtm) {
      // No UTM params — auto-attribute to SMS
      const smsUtm = {
        utm_source: 'sms',
        utm_medium: 'text',
        utm_campaign: '',
        utm_content: '',
        utm_term: '',
      }
      sessionStorage.setItem('trafficSource', 'sms')
      sessionStorage.setItem('utmParams', JSON.stringify(smsUtm))

      // Also save to localStorage for the 7-day attribution window
      try {
        localStorage.setItem('smsAttribution', JSON.stringify({
          source: 'sms',
          utmParams: smsUtm,
          landingPage: window.location.href,
          timestamp: Date.now(),
        }))
      } catch { /* localStorage unavailable */ }
    }
  }, [])
}

// Navigation button helper
function NavButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-3 px-5 py-4 bg-white rounded-xl border border-ce-ink/10 hover:border-ce-green/30 hover:shadow-md transition-all group"
    >
      <span className="font-medium text-ce-ink group-hover:text-ce-green transition-colors">{label}</span>
      <ArrowRight className="w-4 h-4 text-ce-ink/30 group-hover:text-ce-green transition-colors" />
    </Link>
  )
}

export default function TxtPage() {
  useAutoSMSAttribution()

  return (
    <main className="bg-white min-h-screen">
      {/* Minimal Header — logo only */}
      <header className="py-6 px-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <Link href="/">
            <Image
              src="/Primary.svg"
              alt="ClearEdge Home Buyers"
              width={200}
              height={48}
              priority
            />
          </Link>
        </div>
      </header>

      {/* Hero — headline + value prop */}
      <section className="pt-4 pb-8 md:pb-10 px-4 bg-surface-cream">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-ce-ink mb-4 leading-tight">
            Find Out What Your PA Home Is Worth in Cash
          </h1>
          <p className="text-lg text-ce-ink/70 max-w-2xl mx-auto">
            Use our free calculator to see exactly what you&apos;d walk away with — no sign-up, no obligation. Takes about 2 minutes.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <Calculator
        ctaScrollTarget="sms-lead-form"
        ctaEventLabel="Get Your Real Cash Offer - SMS Landing"
      />

      {/* Video Section — Meet Tyler */}
      <section className="py-12 md:py-16 bg-surface-cream">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-ce-ink mb-2">
              Meet Tyler
            </h2>
            <p className="text-ce-ink/60">
              60 seconds on who we are and how this works.
            </p>
          </div>
          <LiteYouTube videoId="YS6uDgxIjiI" title="Meet Tyler — ClearEdge Home Buyers" />
        </div>
      </section>

      {/* Soft Lead Form */}
      <SoftLeadForm />

      {/* Navigation Buttons */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-lg mx-auto px-4">
          <h2 className="font-serif text-xl font-medium text-ce-ink mb-6 text-center">
            Learn More About ClearEdge
          </h2>
          <div className="space-y-3">
            <NavButton href="/how-it-works" label="How It Works" />
            <NavButton href="/testimonials" label="Seller Reviews" />
            <NavButton href="/about" label="About ClearEdge" />
            <NavButton href="/blog" label="Guides & Articles" />
            <NavButton href="/locations/nepa" label="Areas We Serve" />
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-6 px-4 border-t border-ce-ink/5">
        <p className="text-center text-xs text-ce-ink/40">
          &copy; {new Date().getFullYear()} ClearEdge Home Buyers. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
