"use client"

import { Star, Home, Calendar, MapPin } from "lucide-react"

const stats = [
  {
    icon: Star,
    value: "5.0",
    label: "Google Rating",
  },
  {
    icon: Home,
    value: "200+",
    label: "Homes Purchased",
  },
  {
    icon: Calendar,
    value: "Since 2016",
    label: "Trusted Local Buyer",
  },
  {
    icon: MapPin,
    value: "21",
    label: "PA Communities Served",
  },
]

const reviews = [
  {
    text: "Tyler and his team bought it completely as-is. We closed in under two weeks. It's rare to find someone who actually does exactly what they say they're going to do.",
    name: "Lawrence G.",
    location: "Allentown",
  },
  {
    text: "He was incredibly patient, explained the whole process, and gave us a fair cash offer that allowed our family to move on without doing a single repair.",
    name: "Nicole V.",
    location: "Scranton",
  },
  {
    text: "Tyler and his team were the first to take the time to explain the process and make me feel comfortable. We got a very fair number for our property.",
    name: "Gavin S.",
    location: "",
  },
]

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-white text-white" />
      ))}
    </div>
  )
}

export function SocialProofWall() {
  return (
    <section className="bg-[#008a29] py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-14">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-serif font-medium text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/80 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <StarRating />
              <blockquote className="mt-4 text-white/90 leading-relaxed italic">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <div className="mt-4 text-white font-semibold">
                — {review.name}
                {review.location && (
                  <span className="font-normal text-white/70">, {review.location}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
