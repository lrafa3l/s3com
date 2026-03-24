"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handler that updates state, localStorage, and DOM atomically
  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"

    // Update next-themes state (which handles localStorage)
    setTheme(newTheme)

    // Also update DOM class immediately to prevent any lag
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Avoid hydration mismatch - show placeholder with same dimensions
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-brand/20"
        disabled
      >
        <span className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="theme-toggle rounded-full hover:bg-brand/20"
      aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5 text-brand" />
      ) : (
        <Moon className="h-5 w-5 text-brand" />
      )}
    </Button>
  )
}
