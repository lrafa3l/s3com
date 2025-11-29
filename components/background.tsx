// components/Background.tsx
"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import "../styles/background.css"

export function Background({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const spans = Array.from({ length: 300 })

  return (
    <>
      {/* Fixed full-screen animated particle background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <section className="section bg-fixed">
          {spans.map((_, i) => (
            <span
              key={i}
              className="span"
              style={{
                // Randomize animation delay for natural effect
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </section>
      </div>
      {/* Actual page content - now free to be on top */}
      <main className={cn("relative min-h-screen", className)}>{children}</main>
    </>
  )
}
