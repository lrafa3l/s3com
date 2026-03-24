"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import type { HTMLAttributes } from "react"

export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  size?: number
}

export const Loader = ({ className, size = 16, ...props }: LoaderProps) => (
  <div
    className={cn("relative inline-flex items-center justify-center", className)}
    style={{ width: size, height: size }}
    {...props}
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
