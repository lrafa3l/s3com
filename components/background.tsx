// components/Background.tsx
"use client"

import { cn } from "@/lib/utils"

export function Background({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const particles = Array.from({ length: 80 })

  return (
    <>
      {/* Background animado full-screen */}
      <div className="animated-bg">
        {/* Faixa de luz roxa que sobe e desce suavemente */}
        <div className="absolute inset-0" />

        {/* Partículas flutuando */}
        {particles.map((_, i) => (
          <div
            key={i}
            className="particle absolute"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 20 + 15}s`,
            }}
          />
        ))}
      </div>

      {/* Conteúdo da página por cima */}
      <main className={cn("relative min-h-screen", className)}>
        {children}
      </main>
    </>
  )
}