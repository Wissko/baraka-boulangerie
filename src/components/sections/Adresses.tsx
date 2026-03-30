"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Boutique {
  id: number;
  name: string;
  address: string;
  city: string;
  arrondissement?: string;
  hours: string;
  phone: string;
  tag?: string;
  mapUrl: string;
}

const boutiques: Boutique[] = [
  {
    id: 1,
    name: "Baraka Marais",
    address: "34 rue de Bretagne",
    city: "Paris",
    arrondissement: "3e",
    hours: "Lun-Ven 7h-20h, Sam-Dim 7h-21h",
    phone: "+33 1 42 72 00 00",
    tag: "Boutique principale",
    mapUrl: "https://maps.google.com/?q=34+rue+de+Bretagne+Paris",
  },
  {
    id: 2,
    name: "Baraka Saint-Germain",
    address: "12 rue de Buci",
    city: "Paris",
    arrondissement: "6e",
    hours: "Lun-Ven 7h-20h, Sam-Dim 7h-21h",
    phone: "+33 1 43 26 00 00",
    tag: "Nouveau",
    mapUrl: "https://maps.google.com/?q=12+rue+de+Buci+Paris",
  },
  {
    id: 3,
    name: "Baraka Montmartre",
    address: "18 rue Lepic",
    city: "Paris",
    arrondissement: "18e",
    hours: "Mar-Dim 7h30-19h30",
    phone: "+33 1 46 06 00 00",
    mapUrl: "https://maps.google.com/?q=18+rue+Lepic+Paris",
  },
  {
    id: 4,
    name: "Baraka Batignolles",
    address: "56 avenue de Clichy",
    city: "Paris",
    arrondissement: "17e",
    hours: "Lun-Sam 7h-20h, Dim 8h-14h",
    phone: "+33 1 44 90 00 00",
    mapUrl: "https://maps.google.com/?q=56+avenue+de+Clichy+Paris",
  },
  {
    id: 5,
    name: "Baraka Lyon Presqu'ile",
    address: "24 rue de la République",
    city: "Lyon",
    hours: "Lun-Ven 7h-19h30, Sam-Dim 8h-20h",
    phone: "+33 4 72 41 00 00",
    mapUrl: "https://maps.google.com/?q=24+rue+de+la+République+Lyon",
  },
  {
    id: 6,
    name: "Baraka Bordeaux",
    address: "8 cours de l'Intendance",
    city: "Bordeaux",
    hours: "Lun-Dim 7h-20h",
    phone: "+33 5 56 44 00 00",
    tag: "Bientôt",
    mapUrl: "https://maps.google.com/?q=8+cours+de+l+Intendance+Bordeaux",
  },
];

function BoutiqueCard({
  boutique,
  index,
  isActive,
  onClick,
}: {
  boutique: Boutique;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <button
        onClick={onClick}
        className={`w-full text-left group transition-all duration-400 border-b ${
          isActive
            ? "border-gold bg-cream-warm"
            : "border-ink/10 hover:border-gold/40 hover:bg-cream-warm/50"
        } py-7 px-6`}
        aria-expanded={isActive}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {/* City + number */}
            <div className="flex items-center gap-3 mb-2">
              <span className="font-cormorant text-gold text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-dm text-xs text-ink/40 tracking-widest uppercase">
                {boutique.city}
                {boutique.arrondissement && ` — ${boutique.arrondissement}`}
              </span>
              {boutique.tag && (
                <span className="font-dm text-xs bg-gold/15 text-gold px-2 py-0.5 tracking-wide">
                  {boutique.tag}
                </span>
              )}
            </div>

            {/* Name */}
            <h3
              className={`font-cormorant text-2xl transition-colors duration-300 ${
                isActive ? "text-gold" : "text-ink group-hover:text-brown"
              }`}
            >
              {boutique.name}
            </h3>

            {/* Address (always visible) */}
            <p className="font-dm text-sm text-ink/60 mt-1">
              {boutique.address}, {boutique.city}
            </p>
          </div>

          {/* Expand icon */}
          <motion.div
            animate={{ rotate: isActive ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1 w-6 h-6 flex items-center justify-center text-gold flex-shrink-0"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="opacity-60"
            >
              <path
                d="M8 3v10M3 8h10"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </motion.div>
        </div>

        {/* Expanded content */}
        <motion.div
          initial={false}
          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden"
        >
          <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-dm text-xs text-ink/40 tracking-widest uppercase mb-2">
                Horaires
              </p>
              <p className="font-dm text-sm text-ink/70">{boutique.hours}</p>
            </div>
            <div>
              <p className="font-dm text-xs text-ink/40 tracking-widest uppercase mb-2">
                Téléphone
              </p>
              <p className="font-dm text-sm text-ink/70">{boutique.phone}</p>
            </div>
            <div className="sm:col-span-2">
              <a
                href={boutique.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-dm text-xs tracking-widest uppercase text-gold hover:text-gold-dark transition-colors duration-300 mt-1 luxury-link"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Voir sur Google Maps</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 10L10 2M4 2h6v6"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export default function Adresses() {
  const [activeId, setActiveId] = useState<number | null>(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const toggle = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="adresses" className="py-32 md:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: header + decorative */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="font-dancing text-gold text-lg mb-3">
                Nos adresses
              </p>
              <div className="gold-divider mb-8" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-cormorant font-light text-ink leading-tight mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Trouvez votre{" "}
              <span className="italic text-brown">Baraka</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-dm text-sm text-ink/60 leading-relaxed max-w-sm mb-12"
            >
              Nos boutiques sont ouvertes 7 jours sur 7, dès l&apos;aube.
              Chaque adresse est unique, conçue pour s&apos;intégrer dans son
              quartier tout en portant l&apos;identité Baraka.
            </motion.p>

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="hidden lg:block"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-cream-warm border border-gold/15" />
                <div className="absolute inset-6 flex flex-col justify-end p-4">
                  <span className="font-cormorant text-6xl font-light text-gold/20 leading-none">
                    14
                  </span>
                  <p className="font-cormorant text-lg text-ink/70 mt-1">
                    adresses en France
                  </p>
                  <p className="font-dm text-xs text-ink/40 tracking-widest uppercase mt-1">
                    Paris, Lyon, Bordeaux et bientôt plus
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: boutique list */}
          <div>
            <div className="border-t border-ink/10">
              {boutiques.map((b, i) => (
                <BoutiqueCard
                  key={b.id}
                  boutique={b}
                  index={i}
                  isActive={activeId === b.id}
                  onClick={() => toggle(b.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
