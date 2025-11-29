"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

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

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer id="contact" className="border-t border-border bg-card">
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

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br">
                <span className="text-lg font-bold text-white">
                  <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                </span>
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">SARA3COM</span>
                <p className="text-xs text-muted-foreground">Telecomunicações</p>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Conectando Angola ao futuro digital com soluções inovadoras em telecomunicações.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-brand" />
                <span>Rua 30 Bairro Benfica, Luanda, Angola</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-brand" />
                <span>+244 924 456 001 / +244 924 456 002</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-brand" />
                <span>info@sara3com.co.ao</span>
              </div>
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-foreground">{category}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-brand">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 SARA3COM-LDA — Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
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

            <Button
              onClick={scrollToTop}
              size="icon"
              className="rounded-full bg-gradient-to-br from-brand to-brand-dark shadow-lg hover:opacity-90"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
