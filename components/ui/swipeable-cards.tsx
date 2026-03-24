"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SwipeableCardsProps {
  children: ReactNode[]
  className?: string
  cardClassName?: string
}

/**
 * Reusable swipeable cards component for mobile.
 * Uses CSS scroll snapping and IntersectionObserver to detect active card.
 * On desktop (md+), renders children in their natural layout.
 */
export function SwipeableCards({ children, className, cardClassName }: SwipeableCardsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // IntersectionObserver to detect which card is most visible
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = cardRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) {
              setActiveIndex(index)
            }
          }
        })
      },
      {
        root: container,
        threshold: 0.5,
      }
    )

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [children.length])

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index]
    if (card && scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth
      const cardWidth = card.offsetWidth
      const scrollLeft = card.offsetLeft - (containerWidth - cardWidth) / 2
      scrollRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" })
    }
  }

  return (
    <div className={cn("relative", className)}>
      {/* Mobile carousel */}
      <div
        ref={scrollRef}
        className={cn(
          // Mobile: horizontal scroll carousel
          "flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth",
          // Hide scrollbar
          "scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          // Touch scrolling
          "[WebkitOverflowScrolling:touch]",
          // Desktop: hide carousel, show grid
          "md:hidden",
          // Padding for card visibility
          "px-[7.5vw]"
        )}
      >
        {children.map((child, index) => (
          <div
            key={index}
            ref={(el) => { cardRefs.current[index] = el }}
            className={cn(
              // Mobile card sizing
              "flex-shrink-0 w-[85vw] snap-center",
              // Active/inactive states with smooth transition
              "transition-all duration-300 ease-out",
              activeIndex === index
                ? "scale-100 opacity-100"
                : "scale-[0.95] opacity-70",
              cardClassName
            )}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dot indicators - mobile only */}
      <div className="flex justify-center gap-2 mt-6 md:hidden">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            aria-label={`Go to card ${index + 1}`}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              activeIndex === index
                ? "bg-brand w-6"
                : "bg-brand/30 hover:bg-brand/50"
            )}
          />
        ))}
      </div>

      {/* Desktop: render children normally (handled by parent) */}
      <div className="hidden md:contents">
        {children}
      </div>
    </div>
  )
}
