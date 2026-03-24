"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp, Phone, Mail, MapPin, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const footerLinks = {
  "Links Úteis": [
    { name: "Página Inicial", href: "#home" },
    { name: "Sobre Nós", href: "#about" },
    { name: "Serviços", href: "#services" },
    { name: "Suporte", href: "#support" },
  ],
  Serviços: [
    { name: "Internet Fibra", href: "#" },
    { name: "Telefonia", href: "#" },
    { name: "Empresarial", href: "#" },
    { name: "Cloud", href: "#" },
  ],
  Legal: [
    { name: "Privacidade", href: "#" },
    { name: "Termos de Uso", href: "#" },
    { name: "Cookies", href: "#" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook },
  { name: "Instagram", icon: Instagram },
  { name: "LinkedIn", icon: Linkedin },
  { name: "Twitter", icon: Twitter },
]

// Accordion section for mobile link columns
function AccordionSection({
  title,
  links,
  isOpen,
  onToggle,
}: {
  title: string
  links: { name: string; href: string }[]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-border md:border-0">
      {/* Mobile: clickable header */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 md:hidden"
        aria-expanded={isOpen}
      >
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <Minus className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Plus className="h-4 w-4 text-muted-foreground" />
          )}
        </motion.div>
      </button>

      {/* Desktop: always visible heading */}
      <h3 className="hidden md:block text-sm font-semibold text-foreground">{title}</h3>

      {/* Mobile: animated collapsible content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <ul className="space-y-3 pb-4">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: always visible links */}
      <ul className="hidden md:block mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-brand"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Scroll-to-top button (fixed on mobile)
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Mobile: fixed position button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          pointerEvents: isVisible ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-20 right-4 z-40 md:hidden p-3 rounded-full bg-gradient-to-br from-brand to-brand-dark text-white shadow-lg"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>

      {/* Desktop: inline button in footer */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="hidden md:flex rounded-full bg-gradient-to-br from-brand to-brand-dark shadow-lg hover:opacity-90"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </>
  )
}

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border bg-card">
      {/* Google Maps Embed */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d294969.0128073455!2d13.180150533830986!3d-9.009275929871047!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4e63961e29d2faae!2sSARA3COM!5e0!3m2!1sen!2sus!4v1570719844463!5m2!1sen!2sus"
        width="100%"
        height="560"
        className="border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localização SARA3COM"
      />

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full">
                <img src="/logo.png" alt="Logo" className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">SARA3COM</span>
                <p className="text-xs text-muted-foreground">Telecomunicações</p>
              </div>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground mt-3">
              Conectando Angola ao futuro digital com soluções inovadoras em telecomunicações.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-brand flex-shrink-0" />
                <span>Rua 30 Bairro Benfica, Luanda, Angola</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-brand flex-shrink-0" />
                <span>+244 932 230 002 / +244 223 510 002</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-brand flex-shrink-0" />
                <span>neide.costa@sara3com.co.ao</span>
              </div>
            </div>
          </motion.div>

          {/* Link columns - accordion on mobile, visible on desktop */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 md:gap-8">
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionSection
                  title={category}
                  links={links}
                  isOpen={openSection === category}
                  onToggle={() => toggleSection(category)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          {/* Mobile: stacked vertically, centered */}
          <div className="flex flex-col items-center gap-4 md:hidden">
            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="outline"
                  size="icon"
                  className="rounded-full border-border bg-transparent transition-all duration-300 hover:bg-brand hover:text-white hover:border-brand"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Sara3com — Todos os direitos reservados.
            </p>

            {/* Made by */}
            <p className="text-xs text-muted-foreground text-center">
              Made by Suimagem
            </p>
          </div>

          {/* Desktop: horizontal layout */}
          <div className="hidden md:flex items-center justify-between">
            {/* Copyright - left */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Sara3com — Todos os direitos reservados.
            </p>

            {/* Made by - center */}
            <p className="text-sm text-muted-foreground">
              Made by Suimagem
            </p>

            {/* Social icons + scroll button - right with margin to avoid chat button */}
            <div className="flex items-center gap-4 mr-20">
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className="rounded-full border-border bg-transparent transition-all duration-300 hover:bg-brand hover:text-white hover:border-brand"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>

              <ScrollToTopButton />
            </div>
          </div>
        </div>
      </div>

      {/* Oversized Wordmark - standalone last element */}
      <div
        className="w-full flex justify-center pointer-events-none select-none py-4 md:py-6"
        aria-hidden="true"
      >
        <span
          className={cn(
            "font-bold leading-none whitespace-nowrap",
            "text-foreground/10",
            // Responsive size: smaller on mobile, larger on desktop
            "text-[clamp(4rem,22vw,7rem)] md:text-[clamp(5rem,16vw,12rem)]"
          )}
        >
          Sara3com
        </span>
      </div>
    </footer>
  )
}
