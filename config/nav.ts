/**
 * Shared navigation configuration — extracted from header.tsx and hero.tsx
 * to avoid duplication.
 */
export const navLinks = [
    { name: "Página Inicial", href: "#home" },
    { name: "Sobre Nós", href: "#about" },
    { name: "Serviços", href: "#services" },
    { name: "Planos", href: "#pricing" },
    { name: "Suporte", href: "#contact" },
]

/**
 * Smooth-scroll to the element matching `href` (a CSS selector like `#pricing`).
 * Returns true if the element was found and scrolled to.
 */
export function scrollToSection(href: string): boolean {
    const element = document.querySelector(href)
    if (element) {
        setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
        return true
    }
    return false
}
