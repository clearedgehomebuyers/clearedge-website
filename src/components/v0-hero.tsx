"use client"

import { ArrowRight, Shield, Clock, DollarSign, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function V0Hero() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 pb-16 px-4 overflow-hidden bg-[#FAF8F5]">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fillOpacity='1' fillRule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 text-foreground/70 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Trusted by 200+ Pennsylvania Homeowners Since 2016
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-foreground mb-6 leading-[1.05]">
            Sell Your House Fast.
            <br />
            <span className="text-primary">Skip the Hassle.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Get a fair cash offer within 24 hours from a local, family-owned company. No repairs. No fees. No stress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary-hover text-lg px-10 py-7 rounded-full shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 group"
            >
              Get Your Free Cash Offer
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-10 py-7 rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/5"
            >
              See How It Works
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-sm text-muted-foreground max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="whitespace-nowrap">Close in 7 Days</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <DollarSign className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="whitespace-nowrap">Zero Fees</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="whitespace-nowrap">No Obligation</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="whitespace-nowrap">Local PA Company</span>
            </div>
          </div>
        </div>

        <div className="hidden xl:block absolute top-32 right-0 2xl:-right-4">
          <div className="bg-card/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-border/50 max-w-[240px]">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src="/properties/scranton-pa-cash-home-buyers-clearedge-1.jpg"
                  alt="Recently purchased home"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Just Closed</p>
                <p className="text-sm font-medium text-foreground">Scranton, PA</p>
                <p className="text-xs text-primary font-semibold">14 Days to Close</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
