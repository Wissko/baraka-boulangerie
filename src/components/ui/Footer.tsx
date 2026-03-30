"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const navLinks = [
  { label: "Notre Histoire", href: "#histoire" },
  { label: "Nos Créations", href: "#creations" },
  { label: "L'Expérience", href: "#experience" },
  { label: "Nos Adresses", href: "#adresses" },
  { label: "Actualités", href: "#actualites" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/baraka_boulangeries",
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/barakaboulangeries",
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

const legalLinks = [
  { label: "Mentions légales", href: "#" },
  { label: "Politique de confidentialité", href: "#" },
  { label: "CGV", href: "#" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-ink text-cream/70">
      {/* Top separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="md:col-span-1"
          >
            <div className="mb-6">
              <p className="font-dancing text-gold text-base mb-1">Maison</p>
              <h2 className="font-cormorant font-semibold text-cream text-4xl tracking-widest uppercase">
                Baraka
              </h2>
            </div>
            <p className="font-playfair italic text-cream/50 text-base leading-relaxed mb-8">
              L&apos;art de la boulangerie française
            </p>
            <div className="w-16 h-px bg-gold/40 mb-8" />
            <p className="font-dm text-xs text-cream/40 leading-relaxed max-w-xs">
              Maison artisanale fondée en 2010. Pains, viennoiseries et
              pâtisseries d&apos;exception, façonnés à la main chaque matin.
            </p>
          </motion.div>

          {/* Navigation column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="font-dm text-xs tracking-widest uppercase text-gold/70 mb-6">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="font-dm text-sm text-cream/50 hover:text-gold transition-colors duration-300 luxury-link text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact + Social column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="font-dm text-xs tracking-widest uppercase text-gold/70 mb-6">
              Contact
            </p>
            <div className="space-y-3 mb-10">
              <p className="font-dm text-sm text-cream/50">
                contact@baraka-boulangeries.fr
              </p>
              <p className="font-dm text-sm text-cream/50">+33 1 42 00 00 00</p>
              <p className="font-dm text-sm text-cream/50">
                34 rue de Bretagne, 75003 Paris
              </p>
            </div>

            <p className="font-dm text-xs tracking-widest uppercase text-gold/70 mb-4">
              Réseaux sociaux
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-cream/40 hover:text-gold transition-colors duration-300 p-2 border border-cream/10 hover:border-gold/40"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="font-dm text-xs text-cream/30 tracking-wide">
            2024 Baraka Boulangeries. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-dm text-xs text-cream/30 hover:text-gold/70 transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
