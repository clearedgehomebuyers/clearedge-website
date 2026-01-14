"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, HelpCircle, Calendar, Users, User, ArrowRight, ArrowLeft, Check, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const steps = [
  { id: 1, title: "Property", icon: MapPin },
  { id: 2, title: "Situation", icon: HelpCircle },
  { id: 3, title: "Timeline", icon: Calendar },
  { id: 4, title: "Occupancy", icon: Users },
  { id: 5, title: "Contact", icon: User },
]

const situations = [
  "Inherited Property",
  "Facing Foreclosure",
  "Divorce",
  "Relocating",
  "Tired Landlord",
  "Needs Major Repairs",
  "Behind on Taxes",
  "Other",
]

const timelines = ["ASAP (within 2 weeks)", "1–2 months", "3–6 months", "Just exploring options"]

const occupancies = ["I live here", "It's vacant", "Tenant occupied", "Family member lives here"]

export function V0LeadForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    situation: "",
    timeline: "",
    occupancy: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <section id="lead-form" className="py-20 md:py-28 bg-gradient-to-b from-[#f4faf5] to-[#e8f5eb]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-[#00b332] flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1a1f1a] mb-4">You're All Set!</h2>
          <p className="text-[#1a1f1a]/70 text-lg mb-8">
            Tyler will personally review your property and reach out within 24 hours with your no-obligation cash offer.
            Keep an eye on your phone and email.
          </p>
          <div className="bg-white rounded-xl p-6 max-w-md mx-auto border border-[#00b332]/10 shadow-sm">
            <p className="text-[#1a1f1a]/60 text-sm mb-2">Need to talk sooner?</p>
            <a href="tel:5709042059" className="text-[#00b332] text-lg font-medium hover:underline">
              (570) 904-2059
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="lead-form" className="py-20 md:py-28 bg-gradient-to-b from-[#f4faf5] to-[#e8f5eb]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 text-[#00b332] text-sm font-medium mb-4 px-4 py-2 bg-white rounded-full border border-[#00b332]/10 shadow-sm">
            <Shield className="w-4 h-4" />
            100% Free & No Obligation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a1f1a] mb-4 text-balance">
            Get Your Cash Offer Today
          </h2>
          <p className="text-[#1a1f1a]/60 text-lg max-w-xl mx-auto">
            Complete these 5 quick questions and we'll have your offer within 24 hours.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-10 relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#1a1f1a]/10">
            <div
              className="h-full bg-[#00b332] transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            />
          </div>

          {steps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= step.id
                    ? "bg-[#00b332] text-white shadow-lg shadow-[#00b332]/20"
                    : "bg-white text-[#1a1f1a]/40 border border-[#1a1f1a]/10"
                }`}
              >
                {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span
                className={`text-xs mt-2 hidden sm:block transition-colors font-medium ${
                  currentStep >= step.id ? "text-[#1a1f1a]" : "text-[#1a1f1a]/40"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-[#1a1f1a]/5 p-6 md:p-10 border border-[#1a1f1a]/5">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Address */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">Where is your property?</h3>
                  <p className="text-[#1a1f1a]/60 text-sm">
                    We use this to pull local market data for your personalized offer.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                      Street Address
                    </label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                      className="w-full h-12 border-[#1a1f1a]/10 focus:border-[#00b332] focus:ring-[#00b332]/20 rounded-xl bg-[#FAF8F5]/50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                      City, State ZIP
                    </label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Scranton, PA 18505"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      className="w-full h-12 border-[#1a1f1a]/10 focus:border-[#00b332] focus:ring-[#00b332]/20 rounded-xl bg-[#FAF8F5]/50"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Situation */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">What's your situation?</h3>
                  <p className="text-[#1a1f1a]/60 text-sm">This helps us understand how we can best serve you.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {situations.map((situation) => (
                    <button
                      key={situation}
                      type="button"
                      onClick={() => updateFormData("situation", situation)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.situation === situation
                          ? "border-[#00b332] bg-[#00b332]/5 text-[#1a1f1a] ring-2 ring-[#00b332]/20"
                          : "border-[#1a1f1a]/10 hover:border-[#00b332]/30 text-[#1a1f1a]/70 hover:text-[#1a1f1a] bg-[#FAF8F5]/50 hover:bg-[#FAF8F5]"
                      }`}
                    >
                      {situation}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Timeline */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">When do you need to sell?</h3>
                  <p className="text-[#1a1f1a]/60 text-sm">We can work with any timeline — you're in control.</p>
                </div>
                <div className="space-y-3">
                  {timelines.map((timeline) => (
                    <button
                      key={timeline}
                      type="button"
                      onClick={() => updateFormData("timeline", timeline)}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        formData.timeline === timeline
                          ? "border-[#00b332] bg-[#00b332]/5 text-[#1a1f1a] ring-2 ring-[#00b332]/20"
                          : "border-[#1a1f1a]/10 hover:border-[#00b332]/30 text-[#1a1f1a]/70 hover:text-[#1a1f1a] bg-[#FAF8F5]/50 hover:bg-[#FAF8F5]"
                      }`}
                    >
                      {timeline}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Occupancy */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">Who lives at the property?</h3>
                  <p className="text-[#1a1f1a]/60 text-sm">This helps us plan the closing process smoothly.</p>
                </div>
                <div className="space-y-3">
                  {occupancies.map((occupancy) => (
                    <button
                      key={occupancy}
                      type="button"
                      onClick={() => updateFormData("occupancy", occupancy)}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        formData.occupancy === occupancy
                          ? "border-[#00b332] bg-[#00b332]/5 text-[#1a1f1a] ring-2 ring-[#00b332]/20"
                          : "border-[#1a1f1a]/10 hover:border-[#00b332]/30 text-[#1a1f1a]/70 hover:text-[#1a1f1a] bg-[#FAF8F5]/50 hover:bg-[#FAF8F5]"
                      }`}
                    >
                      {occupancy}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Contact */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1f1a] mb-2">Almost there! How can we reach you?</h3>
                  <p className="text-[#1a1f1a]/60 text-sm">
                    We'll send your personalized cash offer to this contact info.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      className="h-12 border-[#1a1f1a]/10 focus:border-[#00b332] focus:ring-[#00b332]/20 rounded-xl bg-[#FAF8F5]/50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      className="h-12 border-[#1a1f1a]/10 focus:border-[#00b332] focus:ring-[#00b332]/20 rounded-xl bg-[#FAF8F5]/50"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(570) 555-0123"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="h-12 border-[#1a1f1a]/10 focus:border-[#00b332] focus:ring-[#00b332]/20 rounded-xl bg-[#FAF8F5]/50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1a1f1a] mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="h-12 border-[#1a1f1a]/10 focus:border-[#00b332] focus:ring-[#00b332]/20 rounded-xl bg-[#FAF8F5]/50"
                    required
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-[#1a1f1a]/5">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex items-center gap-2 h-12 px-6 border-[#1a1f1a]/10 text-[#1a1f1a] hover:bg-[#FAF8F5] bg-transparent rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#00b332] text-white hover:bg-[#009929] flex items-center gap-2 h-12 px-8 rounded-full shadow-lg shadow-[#00b332]/20"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-[#00b332] text-white hover:bg-[#009929] flex items-center gap-2 h-12 px-8 rounded-full shadow-lg shadow-[#00b332]/20"
                >
                  Get My Cash Offer
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-10 text-[#1a1f1a]/50 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#00b332]" />
            <span>Your info is 100% secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00b332]" />
            <span>Response within 24 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#00b332]" />
            <span>No obligation to accept</span>
          </div>
        </div>
      </div>
    </section>
  )
}
