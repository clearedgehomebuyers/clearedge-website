"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Margaret S.",
    location: "Scranton, PA",
    text: "After my husband passed, I was overwhelmed with an inherited property I couldn't maintain. Tyler made the whole process so easy and stress-free. They gave me a fair offer and closed in two weeks. I can't thank them enough.",
    situation: "Inherited Property",
    rating: 5,
  },
  {
    name: "James & Linda R.",
    location: "Wilkes-Barre, PA",
    text: "We were facing foreclosure and felt completely hopeless. ClearEdge stepped in, made us a fair cash offer, and helped us avoid damaging our credit. They treated us with dignity when we needed it most.",
    situation: "Foreclosure",
    rating: 5,
  },
  {
    name: "Michael T.",
    location: "Allentown, PA",
    text: "I needed to relocate for work and didn't have time for the traditional selling process. ClearEdge bought my house completely as-is — no repairs needed. We closed in just 10 days. Highly recommend!",
    situation: "Job Relocation",
    rating: 5,
  },
  {
    name: "Patricia K.",
    location: "Bethlehem, PA",
    text: "Going through a divorce is hard enough without the stress of selling a house. Tyler was so understanding of our situation and made the sale simple. No showings, no staging, no drama. Just a clean transaction.",
    situation: "Divorce",
    rating: 5,
  },
]

export function V0Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="text-[#00b332] font-medium text-sm tracking-wide uppercase mb-4 block">Real Stories</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a1f1a] mb-6 text-balance">
            What Our Sellers Say
          </h2>
          <p className="text-[#1a1f1a]/60 text-lg">
            Don't just take our word for it. Here's what Pennsylvania homeowners say about selling to ClearEdge.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <div className="bg-[#FAF8F5] rounded-2xl shadow-xl shadow-[#1a1f1a]/5 p-8 md:p-12 border border-[#1a1f1a]/5">
            <div className="absolute top-6 right-6 md:top-8 md:right-8">
              <Quote className="w-10 h-10 text-[#005db4]/20" />
            </div>

            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#00b332] text-[#00b332]" />
              ))}
            </div>

            {/* Quote Text */}
            <blockquote className="text-xl md:text-2xl text-[#1a1f1a] leading-relaxed mb-8 font-serif">
              "{testimonials[currentIndex].text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#1a1f1a] text-lg">{testimonials[currentIndex].name}</div>
                <div className="text-sm text-[#1a1f1a]/60">
                  {testimonials[currentIndex].location} • {testimonials[currentIndex].situation}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-full border border-[#1a1f1a]/10 hover:bg-white hover:border-[#00b332]/30 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-[#1a1f1a]/60" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-full border border-[#1a1f1a]/10 hover:bg-white hover:border-[#00b332]/30 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-[#1a1f1a]/60" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "bg-[#00b332] w-6" : "bg-[#1a1f1a]/20 hover:bg-[#1a1f1a]/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-8">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#1a1f1a]/60 hover:text-[#00b332] transition-colors text-sm"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#00b332] text-[#00b332]" />
              ))}
            </div>
            <span>5.0 rating on Google Reviews</span>
          </a>
        </div>
      </div>
    </section>
  )
}
