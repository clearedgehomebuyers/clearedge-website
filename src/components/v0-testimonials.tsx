"use client"


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

export function V0Testimonials() {
  return (
    <section id="testimonials" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1f1a] mb-12 text-center">
          What Our Clients Say
        </h2>

        {/* Featured Testimonial */}
        <div className="bg-[#FAF8F5] rounded-2xl shadow-lg p-8 lg:p-12 mb-10 border border-[#1a1f1a]/5">
          <div className="max-w-4xl mx-auto">
            <svg className="w-12 h-12 text-[#00b332] mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-xl lg:text-2xl text-[#1a1f1a]/80 leading-relaxed mb-6">
              &ldquo;{featuredTestimonial.text}&rdquo;
            </blockquote>
            <div className="flex items-center">
              <div>
                <p className="font-bold text-[#1a1f1a]">{featuredTestimonial.name}</p>
                <p className="text-[#1a1f1a]/70 text-sm">{featuredTestimonial.subtitle}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#FAF8F5] rounded-xl shadow-sm p-6 border border-[#1a1f1a]/5">
              <svg className="w-8 h-8 text-[#00b332] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-[#1a1f1a]/70 mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <p className="font-semibold text-[#1a1f1a]">{testimonial.name}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/testimonials"
            className="inline-flex items-center gap-2 bg-[#00b332] text-white px-8 py-4 rounded-full font-medium hover:bg-[#009929] transition-colors"
          >
            Read More Success Stories
            <span aria-hidden="true">&rarr;</span>
          </a>
          <a
            href="https://www.google.com/maps/place/ClearEdge+Home+Buyers/@40.8549074,-77.1384488,8z/data=!3m1!4b1!4m6!3m5!1s0x86c99f735e7188af:0x29be5485d539b1f9!8m2!3d40.8603424!4d-75.8193544!16s%2Fg%2F11l299ntxm?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00b332] hover:text-[#009929] font-semibold"
          >
            See Google Reviews &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
