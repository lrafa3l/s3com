"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface SpinnerProps {
  className?: string
  size?: number
}

function Spinner({ className, size = 16 }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Spinning ring */}
      <div
        className="loader-ring-outer absolute rounded-full"
        style={{ inset: -2, animationDuration: "0.8s" }}
      />
      <Image
        src="/logo.png"
        width={size}
        height={size}
        alt=""
        className="object-contain"
        style={{ animation: "logo-spin 1.2s linear infinite" }}
      />
    </div>
  )
}

export { Spinner }
