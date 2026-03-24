"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"
import { LogoLoader } from "./logo-loader"

type ImageLoaderProps = ImageProps & { wrapperClassName?: string }

export function ImageLoader({ wrapperClassName = "", className, ...props }: ImageLoaderProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={{ background: "rgba(var(--color-primary), 0.04)" }}
    >
      {/* Logo pulse shown while image loads */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LogoLoader size={24} showRing={false} />
        </div>
      )}

      <Image
        {...props}
        onLoad={(e) => {
          setLoaded(true)
          // Call original onLoad if provided
          if (props.onLoad) {
            props.onLoad(e)
          }
        }}
        className={`transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className ?? ""}`}
      />
    </div>
  )
}
