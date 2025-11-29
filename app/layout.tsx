import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Inter, Geist_Mono, Ubuntu as Font_Ubuntu, Geist_Mono as Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _ubuntu = Font_Ubuntu({ subsets: ['latin'], weight: ["300","400","500","700"] })
const _geistMono = Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

const _inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "Sara3com",
  description:
    "Sua Conexão, Nossa Inovação. Tecnologia que Protege e Transforma o Futuro.",
  keywords: [
    "sara3com",
    "telecomunicações",
    "provedor de internet",
    "voz sobre IP",
    "VOIP",
    "VPN",
    "segurança de rede",
    "infraestrutura de TI",
    "comunicação corporativa",
    "conectividade empresarial",
    "internet dedicada",
    "soluções de rede",
    "tecnologia de comunicação",
    "inovação tecnológica",
    "automação de redes",
    "gestão de dados",
    "monitoramento de sistemas",
    "IoT",
    "inteligência artificial aplicada",
    "suporte técnico",
  ],
  authors: [{ name: "Equipe Sara3com" }],
  creator: "Sara3com",
  publisher: "Sara3com",
  metadataBase: new URL("https://sara3com.vercel.app"),

  openGraph: {
    title: "Sara3com — Tecnologia que Protege e Transforma o Futuro",
    description:
      "Sua Conexão, Nossa Inovação. Tecnologia que Protege e Transforma o Futuro.",
    url: "https://sara3com.vercel.app",
    siteName: "Sara3com",
    images: [
      {
        url: "/cloud-company-logo.png", // (1200x630)
        width: 1200,
        height: 630,
        alt: "Sara3com — Tecnologia que Protege e Transforma o Futuro",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sara3com — Tecnologia que Protege e Transforma o Futuro",
    description:
      "Sua Conexão, Nossa Inovação. Tecnologia que Protege e Transforma o Futuro.",
    images: ["/og-image.jpg"],
    creator: "@sara3com",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  themeColor: "#6252f9",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
