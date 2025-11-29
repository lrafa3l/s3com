"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeMeta() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const themeColor = resolvedTheme === "dark" ? "#6252f9" : "#6252f9"
    let meta = document.querySelector("meta[name='theme-color']")

    if (!meta) {
      meta = document.createElement("meta")
      meta.setAttribute("name", "theme-color")
      document.head.appendChild(meta)
    }

    meta.setAttribute("content", themeColor)
  }, [resolvedTheme])

  return null
}
