"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    quote:
      "A SARA3COM transformou a conectividade da nossa empresa. A internet fibra é extremamente estável e o suporte técnico é excepcional.",
    author: "António Silva",
    role: "Director de TI, BancAngola",
    avatar: "/african-businessman-professional.jpg",
    company: "BancAngola",
    rating: 5,
  },
  {
    quote:
      "Desde que mudámos para a SARA3COM, não tivemos mais problemas de conexão. A equipa é muito profissional e sempre disponível.",
    author: "Maria Santos",
    role: "Gestora, Hotel Luanda",
    avatar: "/african-businesswoman-professional.jpg",
    company: "Hotel Luanda",
    rating: 5,
  },
  {
    quote:
      "Excelente relação qualidade-preço. Os planos empresariais são completos e o atendimento ao cliente é de primeira classe.",
    author: "João Fernandes",
    role: "CEO, TechAngola",
    avatar: "/african-executive-professional.jpg",
    company: "TechAngola",
    rating: 5,
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="testimonials" className="bg-gradient-to-b from-background via-primary/5 to-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/20 text-sm font-medium text-primary group hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/30 transition-all cursor-pointer shadow-lg glow-effect"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="h-2 w-2 rounded-full bg-gradient-to-r from-brand to-brand-light"
              />
              <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent font-semibold">Testemunhos</span>
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              O Que Dizem os Nossos <span className="gradient-text">Clientes</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Milhares de empresas e famílias angolanas confiam na SARA3COM para suas necessidades de telecomunicações.
            </p>
          </motion.div>
        </div>

        {/* Desktop Grid */}
        <div className="mt-16 hidden md:grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/30" />
                  <p className="mt-4 text-foreground leading-relaxed">"{testimonial.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="mt-16 md:hidden">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border bg-card">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg text-foreground leading-relaxed mb-6">"{testimonials[activeIndex].quote}"</p>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage
                      src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[activeIndex].author}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonials[activeIndex].author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{testimonials[activeIndex].author}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-primary" : "w-2 bg-primary/30"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
