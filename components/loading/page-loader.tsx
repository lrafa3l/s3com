"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const hide = () => {
      setTimeout(() => {
        setFading(true)
        setTimeout(() => setVisible(false), 500)
      }, 800)
    }

    if (document.readyState === "complete") {
      hide()
    } else {
      window.addEventListener("load", hide, { once: true })
    }

    return () => window.removeEventListener("load", hide)
  }, [])

  if (!visible) return null

  return (
    <div
      className="bg-background"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 28,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Triple ring spinner */}
      <div style={{ position: "relative", width: 80, height: 80 }}>
        {/* Ring 1 - outer, slow */}
        <div
          className="loader-ring-outer absolute rounded-full"
          style={{ inset: 0, animationDuration: "1.4s" }}
        />

        {/* Ring 2 - middle, medium reverse */}
        <div
          className="loader-ring-inner absolute rounded-full"
          style={{ inset: 8, animationDuration: "1s" }}
        />

        {/* Ring 3 - inner, fast */}
        <div
          className="loader-ring-fast absolute rounded-full"
          style={{ inset: 16 }}
        />

        {/* Logo in center - spins slowly */}
        <div
          style={{
            position: "absolute",
            inset: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/logo.png"
            width={36}
            height={36}
            alt="Sara3com"
            className="object-contain"
            style={{ animation: "logo-spin 3s linear infinite" }}
          />
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="bg-border/30"
        style={{
          width: 160,
          height: 2,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          className="bg-gradient-to-r from-primary to-accent"
          style={{
            height: "100%",
            borderRadius: 2,
            animation: "progress-fill 1s cubic-bezier(0.4,0,0.2,1) forwards",
          }}
        />
      </div>
    </div>
  )
}
