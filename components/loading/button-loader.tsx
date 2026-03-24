"use client"

import { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ButtonLoaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean
  label: string
  loadingLabel?: string
}

export function ButtonLoader({
  loading,
  label,
  loadingLabel,
  className = "",
  disabled,
  ...props
}: ButtonLoaderProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 transition-opacity",
        className
      )}
      disabled={loading || disabled}
      style={{
        opacity: loading ? 0.85 : 1,
        transition: "opacity 0.2s",
      }}
      {...props}
    >
      {loading ? (
        <>
          {/* Spinning logo replaces spinner */}
          <div style={{ position: "relative", width: 16, height: 16, flexShrink: 0 }}>
            <div
              style={{
                position: "absolute",
                inset: -2,
                borderRadius: "50%",
                border: "1.5px solid transparent",
                borderTopColor: "currentColor",
                opacity: 0.5,
                animation: "logo-spin 0.8s linear infinite",
              }}
            />
            <Image
              src="/logo.png"
              width={16}
              height={16}
              alt=""
              className="object-contain"
              style={{ animation: "logo-spin 1.2s linear infinite" }}
            />
          </div>
          {loadingLabel ?? label}
        </>
      ) : (
        label
      )}
    </button>
  )
}
