"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Hook to trigger animations when element enters viewport
 * Uses IntersectionObserver for performance
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: { threshold?: number; rootMargin?: string; triggerOnce?: boolean } = {}
) {
  const { threshold = 0.12, rootMargin = "0px", triggerOnce = true } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}

/**
 * Hook to track scroll position
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolled(window.scrollY > 60)
    }

    // Set initial value
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return { scrollY, isScrolled }
}

/**
 * Hook for hero entrance animation (triggers immediately)
 */
export function useHeroAnimation() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return isVisible
}
