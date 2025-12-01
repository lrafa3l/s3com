"use client"

import { motion } from "framer-motion"

const partners = [
  { name: "NetFlow", logo: "NF" },
  { name: "CloudSync", logo: "CS" },
  { name: "DataVault", logo: "DV" },
  { name: "SecureNet", logo: "SN" },
  { name: "FastComm", logo: "FC" },
  { name: "GlobalLink", logo: "GL" },
]

export function PartnersSection() {
  const duplicatedPartners = [...partners, ...partners, ...partners]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/20 text-sm font-medium text-primary group hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/30 transition-all cursor-pointer shadow-lg glow-effect"
          >
            {/* Animated Glowing Dot */}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="h-2 w-2 rounded-full bg-gradient-to-r from-brand to-brand-light"
            />

            {/* Text */}
            <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent font-semibold">
              Nossos Parceiros
            </span>
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Confiados por Milhares de Empresas Produtivas
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            As melhores organizações escolhem a Sara3com para conectividade premium
          </p>
        </motion.div>

        {/* Scrolling Partner Logos */}
        <div className="relative overflow-hidden py-1.5">
          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: [0, -100 * partners.length] }}
            transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="flex gap-8 md:gap-12"
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 h-24 sm:h-28 w-32 sm:w-40 rounded-lg border border-border bg-card/50 flex items-center justify-center cursor-pointer hover:bg-card transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-muted flex items-center justify-center mb-2 mx-auto">
                    <span className="text-sm sm:text-base font-bold text-muted-foreground">{partner.logo}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground">{partner.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
