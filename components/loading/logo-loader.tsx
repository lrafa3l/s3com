"use client"

import Image from "next/image"
import { useState } from "react"

interface LogoLoaderProps {
  size?: number
  showRing?: boolean
  showText?: boolean
  label?: string
  className?: string
}

export function LogoLoader({
  size = 40,
  showRing = true,
  showText = false,
  label = "Carregando...",
  className = "",
}: LogoLoaderProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Outer spinning ring */}
        {showRing && (
          <div
            className="loader-ring-outer absolute rounded-full"
            style={{ inset: -6 }}
          />
        )}

        {/* Inner counter-spinning ring */}
        {showRing && (
          <div
            className="loader-ring-inner absolute rounded-full"
            style={{ inset: -12 }}
          />
        )}

        {/* The logo itself - spins slowly */}
        <Image
          src="/logo.png"
          width={size}
          height={size}
          alt="Sara3com"
          onLoad={() => setLoaded(true)}
          className="object-contain relative z-10"
          style={{
            animation: loaded ? "none" : "logo-spin 1.8s linear infinite",
            opacity: loaded ? 1 : 0.9,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      {showText && (
        <span
          className="text-primary"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            animation: "logo-pulse-scale 1.8s ease-in-out infinite",
            display: "inline-block",
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
