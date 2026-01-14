"use client"

import { ArrowRight, Shield, Clock, DollarSign, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function V0Hero() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative pt-28 pb-8 lg:pb-12 px-4 overflow-hidden bg-[#FAF8F5]">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fillOpacity='1' fillRule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Main content grid - left side content, right side widget */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left column - main content */}
          <div className="lg:col-span-8 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 text-foreground/70 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Trusted by 200+ Pennsylvania Homeowners Since 2016
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground mb-5 leading-[1.1]">
              Sell Your House Fast.
              <br />
              <span className="text-primary">Skip the Hassle.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-light">
              Get a fair cash offer within 24 hours from a local, family-owned company. No repairs. No fees. No stress.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary-hover text-base px-8 py-6 rounded-full shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 group"
              >
                Get Your Free Cash Offer
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="text-base px-8 py-6 rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/5"
              >
                See How It Works
              </Button>
            </div>

            {/* Trust Bar - LEFT aligned, smaller text, fully visible */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground/60 whitespace-nowrap">Close in 7 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground/60 whitespace-nowrap">Zero Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground/60 whitespace-nowrap">No Obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground/60 whitespace-nowrap">Local PA Company</span>
              </div>
            </div>
          </div>

          {/* Right column - Property widget (desktop only) */}
          <div className="hidden lg:flex lg:col-span-4 justify-end items-end">
            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-[#1a1f1a]/10 overflow-hidden w-[260px] transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="relative aspect-[4/3]">
                <img
                  src="/properties/scranton-pa-cash-home-buyers-clearedge-1.jpg"
                  alt="Recently purchased home in Scranton, PA"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <span className="inline-block px-2 py-0.5 bg-[#00b332] text-white text-xs font-bold rounded-full mb-1">
                    Just Closed
                  </span>
                  <p className="text-base font-bold">Scranton, PA</p>
                  <p className="text-sm text-white/90">14 Days to Close</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile property card */}
        <div className="lg:hidden mt-8">
          <div className="bg-white rounded-xl shadow-lg border border-[#1a1f1a]/10 overflow-hidden max-w-xs mx-auto">
            <div className="relative aspect-[16/9]">
              <img
                src="/properties/scranton-pa-cash-home-buyers-clearedge-1.jpg"
                alt="Recently purchased home in Scranton, PA"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <span className="inline-block px-2 py-0.5 bg-[#00b332] text-white text-xs font-bold rounded-full mb-1">
                  Just Closed
                </span>
                <p className="text-sm font-bold">Scranton, PA &bull; 14 Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
