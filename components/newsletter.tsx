"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Check, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus("success")
    setEmail("")
    setTimeout(() => setStatus("idle"), 3000)
  }

  return (
    <section className="relative py-20 md:py-24 overflow-hidden bg-gradient-to-br from-brand/20 via-brand-dark/30 to-brand/10">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-96 h-96 bg-brand/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div
        animate={{
          scale: [1.1, 1.4, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-brand-light/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium">
            <Mail className="w-4 h-4" />
            Mantenha-se Informado
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Receba Novidades em{" "}
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Primeira Mão</span>
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Inscreva-se na nossa newsletter e fique por dentro das últimas inovações, atualizações tecnológicas e
            ofertas exclusivas da <span className="font-semibold text-white">SARA3COM</span>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl mx-auto pt-4">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Mail className="h-5 w-5 text-white/60" />
              </div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu.email@exemplo.com"
                disabled={status === "loading"}
                className="w-full h-14 pl-12 pr-4 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20 focus:ring-2 focus:ring-white/50 backdrop-blur-md rounded-xl"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={status === "loading" || status === "success"}
              className="h-14 px-6 md:px-8 bg-white text-brand font-semibold shadow-lg rounded-xl hover:bg-white/90"
            >
              {status === "loading" ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full"
                />
              ) : status === "success" ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Inscrito!
                </>
              ) : (
                <>
                  Subscrever
                  <Send className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs md:text-sm text-white/60 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Seus dados estão seguros. Cancelar inscrição a qualquer momento.
          </p>

          <div className="flex items-center justify-center gap-8 pt-6 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-white/80" />
              <span>
                <strong className="text-white">500+</strong> Inscritos
              </span>
            </div>
            <div className="w-px h-4 bg-white/30" />
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-white/80" />
              <span>
                <strong className="text-white">Sem</strong> Spam
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
