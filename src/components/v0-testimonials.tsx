"use client"

import { Star } from "lucide-react"

const featuredTestimonial = {
  name: "Kandra Gunter",
  subtitle: "Sold inherited property from Texas while caring for elderly father",
  text: "Selling a property from out of state can be incredibly stressful, but Tyler made it feel effortless. He handled everything — from coordinating with my dad's caregivers to managing repairs I couldn't oversee myself. I never felt pressured, and he kept me informed every step of the way. If you're dealing with an inherited property or just need someone you can trust, call Tyler.",
}

const testimonials = [
  {
    name: "Jewel Parago",
    text: "You made a difficult time simple and smooth.",
    rating: 5,
  },
  {
    name: "Gavin S.",
    text: "First to take time to explain the process and make me feel comfortable.",
    rating: 5,
  },
  {
    name: "Rita C.",
    text: "We closed in 30 days and have never been happier!",
    rating: 5,
  },
]

function GoldStarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
      ))}
    </div>
  )
}

function getInitials(name: string) {
  const parts = name.replace(/[^a-zA-Z ]/g, '').trim().split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return parts[0]?.[0]?.toUpperCase() || '?'
}

export function V0Testimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-16 bg-white scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 animate-on-scroll">
          <span className="text-ce-green font-medium text-sm tracking-wide uppercase mb-4 block">
            Real Results
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-ce-ink mb-4">
            What Our Clients Say
          </h2>
        </div>

        {/* Featured Testimonial */}
        <div className="bg-surface-cream rounded-2xl shadow-lg p-8 lg:p-12 mb-8 border-l-4 border-l-ce-blue border border-ce-ink/5 animate-on-scroll stagger-1">
          <div className="max-w-4xl mx-auto">
            <svg className="w-10 h-10 text-ce-green mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-xl lg:text-2xl text-ce-ink/80 leading-relaxed mb-6">
              &ldquo;{featuredTestimonial.text}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ce-green to-ce-blue text-white font-semibold text-sm flex items-center justify-center flex-shrink-0">
                {getInitials(featuredTestimonial.name)}
              </div>
              <div>
                <p className="font-bold text-ce-ink">{featuredTestimonial.name}</p>
                <p className="text-ce-ink/70 text-sm">{featuredTestimonial.subtitle}</p>
                <GoldStarRating />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-surface-cream rounded-2xl border border-ce-ink/5 shadow-sm p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 animate-on-scroll"
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <svg className="w-10 h-10 text-ce-green mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-ce-ink/70 leading-relaxed mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ce-green to-ce-blue text-white font-semibold text-sm flex items-center justify-center flex-shrink-0">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <p className="font-semibold text-ce-ink">{testimonial.name}</p>
                  <GoldStarRating />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center animate-on-scroll stagger-5">
          <a
            href="/testimonials"
            className="inline-flex items-center gap-2 bg-ce-green text-white px-8 py-4 rounded-full font-medium hover:bg-ce-green-hover shadow-green hover:shadow-green-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            Read More Success Stories
            <span aria-hidden="true">&rarr;</span>
          </a>
          <a
            href="https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8549074,-77.1384488,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ce-green font-semibold link-animated"
          >
            See Google Reviews &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
