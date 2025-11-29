"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, MapPin, MessageCircle, Clock, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-background via-40% to-brand-dark/10" />

      {/* AI-focused animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-br from-brand/20 to-brand-light/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1.3, 1.1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 -right-32 w-96 h-96 bg-gradient-to-tl from-brand-dark/30 to-brand/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/20 text-sm font-medium text-primary group hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/30 transition-all cursor-pointer shadow-lg glow-effect"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="h-2 w-2 rounded-full bg-gradient-to-r from-brand to-brand-light"
            />
            <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent font-semibold">
              Alimentado por Sara AI
            </span>
            <Sparkles className="h-3 w-3 text-brand" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance"
          >
            Acreditamos no{" "}
            <span className="bg-gradient-to-r from-brand via-brand-light to-brand bg-clip-text text-transparent animate-pulse">
              Futuro Inteligente
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl text-pretty max-w-2xl mx-auto"
          >
            SARA3COM oferece soluções de telecomunicações inovadoras{" "}
            <span className="font-semibold text-brand">integradas com IA</span>, fornecendo o melhor, mais rápido e mais
            inteligente suporte 24/7. Conectando Angola ao futuro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-brand to-brand-light text-white border-0 shadow-lg shadow-brand/25 hover:shadow-brand/50 hover:opacity-90 transition-shadow"
              >
                Ver Nossos Planos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-brand/30 bg-transparent hover:bg-brand/10 hover:border-brand/50"
              >
                <MessageCircle className="h-4 w-4" />
                Falar com Sara AI
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 mx-auto max-w-7xl px-4 mt-12"
      >
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-muted-foreground text-sm">
          <motion.div className="flex items-center gap-2 hover:text-foreground transition-colors" whileHover={{ x: 5 }}>
            <MapPin className="h-4 w-4 text-brand" />
            <span>Rua 28 Bairro Benfica, Luanda</span>
          </motion.div>
          <motion.div className="flex items-center gap-2 hover:text-foreground transition-colors" whileHover={{ x: 5 }}>
            <Phone className="h-4 w-4 text-brand" />
            <span>+244 924 456 001</span>
          </motion.div>
          <motion.div className="flex items-center gap-2 hover:text-foreground transition-colors" whileHover={{ x: 5 }}>
            <Clock className="h-4 w-4 text-brand" />
            <span>Seg-Sex, 8:00-18:00</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
