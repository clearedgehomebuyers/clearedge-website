"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function V0Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#1a1f1a]/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex-shrink-0">
            <img src="/Primary.svg" alt="ClearEdge Home Buyers" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-[#1a1f1a]/60 hover:text-[#1a1f1a] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-[#1a1f1a]/60 hover:text-[#1a1f1a] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-[#1a1f1a]/60 hover:text-[#1a1f1a] transition-colors"
            >
              Reviews
            </Link>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              onClick={scrollToForm}
              className={`bg-[#00b332] text-white hover:bg-[#009929] rounded-full px-6 transition-all duration-300 ${
                isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              Get Your Cash Offer
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-[#1a1f1a]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-t border-[#1a1f1a]/5">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <Link
              href="#how-it-works"
              className="text-base font-medium text-[#1a1f1a]/60 hover:text-[#1a1f1a] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#about"
              className="text-base font-medium text-[#1a1f1a]/60 hover:text-[#1a1f1a] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="#testimonials"
              className="text-base font-medium text-[#1a1f1a]/60 hover:text-[#1a1f1a] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reviews
            </Link>
            <Button
              onClick={scrollToForm}
              className="bg-[#00b332] text-white hover:bg-[#009929] w-full mt-2 rounded-full"
            >
              Get Your Cash Offer
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
