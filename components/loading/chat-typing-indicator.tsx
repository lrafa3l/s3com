"use client"

import Image from "next/image"

export function ChatTypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
      {/* Sara avatar */}
      <div
        className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground"
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: "bold",
          flexShrink: 0,
        }}
      >
        S
      </div>

      {/* Bubble */}
      <div
        className="bg-muted/50 border border-border/50"
        style={{
          padding: "12px 16px",
          borderRadius: "14px 14px 14px 4px",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        {/* Spinning mini logo */}
        <div style={{ position: "relative", width: 18, height: 18, flexShrink: 0 }}>
          <div
            className="loader-ring-outer absolute rounded-full"
            style={{ inset: -3, animationDuration: "0.9s" }}
          />
          <Image
            src="/logo.png"
            width={18}
            height={18}
            alt=""
            className="object-contain"
            style={{ animation: "logo-spin 2s linear infinite" }}
          />
        </div>

        {/* Bouncing dots */}
        {[0, 0.2, 0.4].map((d, i) => (
          <span
            key={i}
            className="bg-primary"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              display: "inline-block",
              animation: `typing 1.2s ${d}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
