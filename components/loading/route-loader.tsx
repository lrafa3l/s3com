"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Image from "next/image"

export function RouteLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Every time route changes, flash the loader
    setFading(false)
    setLoading(true)

    const timer = setTimeout(() => {
      setFading(true)
      setTimeout(() => setLoading(false), 400)
    }, 600)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  if (!loading) return null

  return (
    <div
      className="bg-background/92 backdrop-blur-md"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 24,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.4s ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Triple ring + spinning logo */}
      <div style={{ position: "relative", width: 72, height: 72 }}>
        {/* Outer ring - slow clockwise */}
        <div
          className="loader-ring-outer absolute rounded-full"
          style={{ inset: 0, animationDuration: "1.2s" }}
        />

        {/* Middle ring - counter-clockwise */}
        <div
          className="loader-ring-inner absolute rounded-full"
          style={{ inset: 8, animationDuration: "0.9s" }}
        />

        {/* Inner ring - fast clockwise */}
        <div
          className="loader-ring-fast absolute rounded-full"
          style={{ inset: 16, animationDuration: "0.6s" }}
        />

        {/* Logo center - slow spin */}
        <div
          style={{
            position: "absolute",
            inset: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/logo.png"
            width={32}
            height={32}
            alt="Sara3com"
            className="object-contain"
            style={{ animation: "logo-spin 2.5s linear infinite" }}
          />
        </div>
      </div>

      {/* Route bar - thin progress line at top of screen */}
      <div
        className="bg-border/30"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 9999,
          overflow: "hidden",
        }}
      >
        <div
          className="bg-gradient-to-r from-primary via-accent to-primary"
          style={{
            height: "100%",
            backgroundSize: "200% 100%",
            animation: "route-bar 0.8s ease-out forwards, bar-shimmer 1s linear infinite",
          }}
        />
      </div>
    </div>
  )
}
