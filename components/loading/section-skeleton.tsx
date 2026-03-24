"use client"

import { LogoLoader } from "./logo-loader"

interface SectionSkeletonProps {
  rows?: number
  columns?: number
  height?: number
}

export function SectionSkeleton({ rows = 1, columns = 3, height = 160 }: SectionSkeletonProps) {
  return (
    <div className="py-12">
      {/* Spinning logo centered above content */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
        <LogoLoader size={40} showRing showText label="A carregar secção..." />
      </div>

      {/* Skeleton title */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <div className="skeleton-shimmer rounded-md" style={{ width: 90, height: 12 }} />
        <div className="skeleton-shimmer rounded-md" style={{ width: 280, height: 28 }} />
      </div>

      {/* Skeleton cards */}
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="grid gap-6 mb-6"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, c) => (
            <div
              key={c}
              className="skeleton-shimmer rounded-xl"
              style={{
                height,
                animationDelay: `${(r * columns + c) * 0.08}s`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
