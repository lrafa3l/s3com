"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        `absolute left-0 top-0 w-full h-[calc(100vh-71px)] flex justify-center items-center flex-col gap-4`,
        className
      )}
    >
      <div className="relative" style={{ width: 48, height: 48 }}>
        {/* Outer spinning ring */}
        <div
          className="loader-ring-outer absolute rounded-full"
          style={{ inset: -6 }}
        />
        {/* Inner counter-spinning ring */}
        <div
          className="loader-ring-inner absolute rounded-full"
          style={{ inset: -12 }}
        />
        <Image
          src="/logo.png"
          id="bigLogo"
          width={48}
          height={48}
          alt="logo"
          className="object-contain relative z-10"
          style={{ animation: "logo-spin 1.8s linear infinite" }}
        />
      </div>
      <span
        className="text-primary font-mono text-[11px] tracking-[0.25em] uppercase inline-block mt-6"
      >
        Carregando...
      </span>
    </div>
  )
}
