"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Histoire", href: "#histoire" },
  { label: "Créations", href: "#creations" },
  { label: "Expérience", href: "#experience" },
  { label: "Adresses", href: "#adresses" },
  { label: "Actualités", href: "#actualites" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "nav-blur bg-cream/90 border-b border-gold/20 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-start group"
            aria-label="Baraka Boulangeries — Accueil"
          >
            <span className="font-dancing text-gold text-sm tracking-widest group-hover:text-gold-dark transition-colors duration-300">
              Maison
            </span>
            <span
              className={`font-cormorant font-semibold tracking-widest uppercase transition-all duration-500 ${
                scrolled ? "text-ink text-2xl" : "text-cream text-3xl"
              }`}
            >
              Baraka
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`font-dm text-xs tracking-ultra-wide uppercase luxury-link transition-colors duration-300 ${
                    scrolled
                      ? "text-ink/70 hover:text-gold"
                      : "text-cream/80 hover:text-gold"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={() => handleNavClick("#adresses")}
            className={`hidden md:block text-xs tracking-widest uppercase font-dm border px-6 py-2.5 transition-all duration-400 hover:bg-gold hover:border-gold hover:text-ink ${
              scrolled
                ? "border-gold/60 text-gold"
                : "border-cream/40 text-cream/80 hover:text-ink"
            }`}
          >
            Nos adresses
          </button>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-px transition-colors duration-300 ${
                scrolled ? "bg-ink" : "bg-cream"
              }`}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block w-4 h-px transition-colors duration-300 ${
                scrolled ? "bg-ink" : "bg-cream"
              }`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-px transition-colors duration-300 ${
                scrolled ? "bg-ink" : "bg-cream"
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink/95 nav-blur flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="font-cormorant text-4xl text-cream/90 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <span className="font-dancing text-gold text-lg">
                Maison Baraka
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
