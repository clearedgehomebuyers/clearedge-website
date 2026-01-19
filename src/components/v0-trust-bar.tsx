import { Home, Calendar, Star, Award } from "lucide-react"

const stats = [
  {
    icon: Calendar,
    value: "Since 2016",
    label: "Serving PA",
  },
  {
    icon: Home,
    value: "200+",
    label: "Homes Purchased",
  },
  {
    icon: Star,
    value: "5.0",
    label: "Google Rating",
  },
  {
    icon: Award,
    value: "A+",
    label: "BBB Rating",
  },
]

export function V0TrustBar() {
  return (
    <section className="py-6 md:py-8 bg-gradient-to-b from-[#f5f7f5] to-[#f0f4f1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-4 md:gap-6 items-center lg:items-start">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-xl sm:text-2xl md:text-4xl font-serif font-medium text-[#1a2e1a] mb-0.5 md:mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
