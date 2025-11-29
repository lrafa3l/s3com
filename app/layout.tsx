import type React from "react"
import type { Metadata } from "next"
import { Ubuntu } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import QueryClientProviderMain from "@/providers/QueryClientProvider"
import AuthProviderMain from "@/providers/AuthProvider"
import { ProgressProvider } from "@/providers/ProgressProvider"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/providers/theme-provider"

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
})

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
      <body className={`${ubuntu.variable} font-ubuntu antialiased`}>
        <QueryClientProviderMain>
          <AuthProviderMain>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ProgressProvider>
                {children}
                <Toaster />
              </ProgressProvider>
            </ThemeProvider>
          </AuthProviderMain>
        </QueryClientProviderMain>
        <Analytics />
      </body>
    </html>
  )
}
