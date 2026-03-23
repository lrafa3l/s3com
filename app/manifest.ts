import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sara3com",
    short_name: "Sara3com",
    description:
      "Sara3com — Tecnologia que Protege e Transforma o Futuro",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "pt-BR",
    categories: ["sports", "social", "lifestyle"],
    // BUG 13 FIX: Updated icon paths to match actual files in /public.
    // Previous paths referenced /icons/icon-*.png which don't exist.
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}