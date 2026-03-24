"use client"

import { Suspense, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Particle = {
  left: number
  size: number
  delay: number
  duration: number
}

function generateParticles(): Particle[] {
  return Array.from({ length: 80 }).map(() => ({
    left: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 20,
    duration: Math.random() * 20 + 15,
  }))
}

function BackgroundInner({ children, className }: { children: React.ReactNode; className?: string }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(generateParticles())
  }, [])

  return (
    <>
      {/* Background layer - fixed behind content with -z-10 */}
      <div className="animated-bg" aria-hidden="true">
        <div className="absolute inset-0" />

        {particles.map((p, i) => (
          <div
            key={i}
            className="particle absolute"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Content layer - rendered OUTSIDE the fixed background */}
      <div className={cn("relative min-h-screen", className)}>
        {children}
      </div>
    </>
  )
}

export function Background({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <BackgroundInner className={className}>{children}</BackgroundInner>
    </Suspense>
  )
}