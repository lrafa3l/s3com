"use client"

import React from "react"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"

const stats = [
  { label: "Anos de Expertise", value: 6, suffix: "+" },
  { label: "Clientes Ativos", value: 200, suffix: "+" },
  { label: "Regiões Cobertas", value: 2, suffix: "+" },
  { label: "Projetos Entregues", value: 12, suffix: "+" },
]

const values = [
  {
    title: "Inovação",
    description: "Tecnologia de ponta que transforma ideias em soluções reais",
    icon: "🚀",
  },
  {
    title: "Confiabilidade",
    description: "Serviços 24/7 com uptime de 99.9%",
    icon: "🛡️",
  },
  {
    title: "Excelência",
    description: "Qualidade premium em cada projeto",
    icon: "⭐",
  },
  {
    title: "Parcerias",
    description: "Relacionamento de longo prazo",
    icon: "🤝",
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="about" ref={ref} className="py-20 sm:py-32 overflow-hidden" aria-labelledby="about-heading">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-brand/5 rounded-full blur-3xl"
          animate={{
            y: mousePosition.y ? mousePosition.y * 0.01 : 0,
          }}
          transition={{ type: "tween", duration: 0.3 }}
        />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-brand-light/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-2 mb-6 hover:border-brand/50 hover:bg-brand/15 transition-all shadow-lg"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="h-2 w-2 rounded-full bg-brand"
            />
            <span className="text-sm font-medium text-brand">Sobre SARA3COM</span>
          </motion.div>

          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-balance mb-4"
          >
            Conectando Angola ao{" "}
            <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
              Futuro Digital
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">
            Com uma equipe especializada e tecnologia de ponta, conectamos comunidades e empresas através de soluções
            seguras e confiáveis.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative group"
          >
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-brand/30 to-brand-light/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-brand/20">
              <Image
                src="/team-working-on-telecommunications-network-infrast.jpg"
                alt="Equipe SARA3COM em ação"
                width={500}
                height={400}
                className="object-cover w-full h-64 sm:h-80 transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </motion.div>

          {/* Text & Stats Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3"
            >
              <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                A <span className="font-semibold text-brand">SARA3COM-LDA</span> é pioneira em soluções de{" "}
                <span className="font-semibold bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  telecomunicações
                </span>{" "}
                em Angola.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-foreground/80">
                Oferecemos infraestrutura de classe mundial, internet de alta velocidade, telefonia confiável e
                segurança de rede avançada.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="relative overflow-hidden rounded-lg bg-gradient-to-br from-card to-card/50 border border-brand/15 p-3 text-center group hover:border-brand/40 transition-all duration-300"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <motion.div
                      className="text-lg sm:text-xl font-bold bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent tabular-nums"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + i * 0.08, type: "spring", stiffness: 100 }}
                    >
                      {isInView && <Counter to={stat.value} suffix={stat.suffix} />}
                    </motion.div>
                    <p className="mt-0.5 text-xs font-medium text-muted-foreground">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-center mb-6 text-foreground">Nossos Valores</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                onMouseEnter={() => setHoveredValue(i)}
                onMouseLeave={() => setHoveredValue(null)}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative overflow-hidden rounded-lg bg-gradient-to-br from-card/60 to-card/30 border border-brand/15 p-3 group hover:border-brand/40 transition-all duration-300 cursor-pointer"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="relative space-y-1.5"
                  animate={hoveredValue === i ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    animate={hoveredValue === i ? { scale: 1.2, rotate: 12 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg"
                  >
                    {value.icon}
                  </motion.div>
                  <h4 className="text-xs font-semibold text-foreground">{value.title}</h4>
                  <p className="text-xs text-foreground/70 leading-tight">{value.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  React.useEffect(() => {
    const target = to
    const increment = target / 20

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment
        return next >= target ? target : next
      })
    }, 60)

    return () => clearInterval(timer)
  }, [to])

  return (
    <span className="tabular-nums">
      {Math.floor(count)}
      {suffix && <span className="text-lg ml-0.5 opacity-75">{suffix}</span>}
    </span>
  )
}
