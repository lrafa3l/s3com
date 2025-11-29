"use client"

import { Wifi, Shield, Phone, Server, Zap, Globe } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Zap,
    title: "IA Integrada 24/7",
    description:
      "Sara AI oferece suporte inteligente e instantâneo. Resolução rápida de problemas com respostas personalizadas.",
  },
  {
    icon: Wifi,
    title: "Internet Ultra Rápida",
    description:
      "Conexão fibra óptica com velocidades até 1Gbps. Estabilidade e velocidade garantidas com IA otimizada.",
  },
  {
    icon: Phone,
    title: "Telefonia Inteligente",
    description:
      "Soluções de telefonia com tecnologia IA. Chamadas cristalinas e tarifas inteligentes que se adaptam ao seu uso.",
  },
  {
    icon: Shield,
    title: "Segurança com IA",
    description:
      "Proteção avançada com inteligência artificial. Detecção de ameaças em tempo real e firewall inteligente.",
  },
  {
    icon: Server,
    title: "Cloud Inteligente",
    description: "Infraestrutura de TI com IA. Data centers automanageáveis e escalabilidade automática.",
  },
  {
    icon: Globe,
    title: "Cobertura Nacional Conectada",
    description: "Presente em todas as províncias de Angola. Rede conectada inteligentemente para melhor desempenho.",
  },
]

export function Features() {
  return (
    <section id="services" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-brand-dark/5" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Dot with animation */}
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
                Produtos & Serviços
              </span>
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Soluções Completas{" "}
              <span className="bg-gradient-to-r from-brand via-brand-light to-brand bg-clip-text text-transparent">
                Inteligentes em Telecomunicações
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Tecnologia de ponta com IA integrada. O suporte mais rápido, melhor e mais inteligente.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl border border-brand/20 bg-gradient-to-br from-card to-card/50 p-6 transition-all duration-300 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-1 hover:glow-effect"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/5 to-brand-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-light shadow-lg shadow-brand/25">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
