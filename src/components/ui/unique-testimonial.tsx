"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    quote: "Ankit consistently creates intuitive designs that enhance user engagement.",
    author: "Anurag Bose",
    role: "Jr. Software Developer ",
    avatar: "/Anurag 1.png",
  },
  {
    id: 2,
    quote: "Transforms ideas into clean, functional, and visually appealing interfaces.",
    author: "Abhay Namdev",
    role: "Founder & CEO of Panther",
    avatar: "/Abhay.webp",
  },
  {
    id: 3,
    quote: "Great at turning feedback into polished, high-quality UI solutions.",
    author: "Abdul Reheman",
    role: "SAP Developer ",
    avatar: "/abdul.jpeg",
  },
]

export function UniqueTestimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote)
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Keep a ref always pointing to the latest activeIndex
  // so the interval closure never goes stale
  const activeIndexRef = useRef(activeIndex)
  activeIndexRef.current = activeIndex
  const isAnimatingRef = useRef(isAnimating)
  isAnimatingRef.current = isAnimating

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      if (isAnimatingRef.current) return
      const nextIndex = (activeIndexRef.current + 1) % testimonials.length
      setIsAnimating(true)
      setTimeout(() => {
        setDisplayedQuote(testimonials[nextIndex].quote)
        setDisplayedRole(testimonials[nextIndex].role)
        setActiveIndex(nextIndex)
        setTimeout(() => setIsAnimating(false), 400)
      }, 200)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [isPaused])

  const handleSelect = (index: number) => {
    if (index === activeIndex || isAnimating) return
    setIsAnimating(true)

    setTimeout(() => {
      setDisplayedQuote(testimonials[index].quote)
      setDisplayedRole(testimonials[index].role)
      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 400)
    }, 200)
  }

  return (
    <div
      className="flex flex-col items-center gap-12 py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Quote Container */}
      <div className="relative px-8 min-h-[140px] flex items-center justify-center">
        <span className="absolute -left-4 -top-8 text-8xl font-serif text-[#ff3b30]/10 select-none pointer-events-none italic">
          "
        </span>

        <p
          className={cn(
            "text-2xl md:text-3xl font-medium text-[#111] text-center max-w-2xl leading-relaxed transition-all duration-400 ease-out italic",
            isAnimating ? "opacity-0 blur-sm scale-[0.98]" : "opacity-100 blur-0 scale-100",
          )}
        >
          {displayedQuote}
        </p>

        <span className="absolute -right-4 -bottom-10 text-8xl font-serif text-[#ff3b30]/10 select-none pointer-events-none italic">
          "
        </span>
      </div>

      <div className="flex flex-col items-center gap-8 mt-4">
        {/* Role text */}
        <p
          className={cn(
            "text-[10px] text-[#ff3b30] font-black tracking-[0.3em] uppercase transition-all duration-500 ease-out",
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
          )}
        >
          {displayedRole}
        </p>

        <div className="flex items-center justify-center gap-4">
          {testimonials.map((testimonial, index) => {
            const isActive = activeIndex === index
            const isHovered = hoveredIndex === index && !isActive
            const showName = isActive || isHovered

            return (
              <button
                key={testimonial.id}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative flex items-center gap-0 rounded-full cursor-pointer",
                  "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isActive ? "bg-[#111] shadow-xl" : "bg-white/50 hover:bg-white border border-gray-200 shadow-sm",
                  showName ? "pr-5 pl-2 py-2" : "p-1",
                )}
              >
                {/* Avatar with smooth ring animation */}
                <div className="relative flex-shrink-0">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className={cn(
                      "w-10 h-10 rounded-full object-cover",
                      "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isActive ? "ring-2 ring-[#ff3b30]/50" : "ring-0",
                      !isActive && "hover:scale-110",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    showName ? "grid-cols-[1fr] opacity-100 ml-3" : "grid-cols-[0fr] opacity-0 ml-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className={cn(
                        "text-xs font-black whitespace-nowrap block uppercase tracking-tight",
                        "transition-colors duration-300",
                        isActive ? "text-white" : "text-[#111]",
                      )}
                    >
                      {testimonial.author}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
