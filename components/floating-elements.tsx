"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
      {/* Floating Orb 1 - Top Left */}
      <motion.div
        animate={{
          x: mousePosition.x * 0.02 - 150,
          y: mousePosition.y * 0.02 - 150,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
        className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-brand/30 to-brand-light/20 rounded-full blur-3xl opacity-60"
      />

      {/* Floating Orb 2 - Bottom Right */}
      <motion.div
        animate={{
          x: mousePosition.x * -0.02 + 150,
          y: mousePosition.y * -0.02 + 150,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
        className="absolute bottom-32 right-10 w-56 h-56 bg-gradient-to-tl from-brand-light/25 to-brand/15 rounded-full blur-3xl opacity-50"
      />

      {/* Floating Orb 3 - Center Right */}
      <motion.div
        animate={{
          x: mousePosition.x * 0.015,
          y: mousePosition.y * 0.015,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 80 }}
        className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-b from-pink-600/15 to-brand/10 rounded-full blur-3xl opacity-40"
      />

      {/* Subtle animated accent line */}
      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 360],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-1/3 left-1/3 w-1 h-32 bg-gradient-to-b from-brand to-transparent rounded-full blur-sm"
      />
    </div>
  )
}
