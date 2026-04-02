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
    name: "Baraka 2",
    address: "15 Rue Jean-Jacques Rousseau",
    city: "Argenteuil",
    arrondissement: "95100",
    hours: "Lun-Ven 6h30-20h, Sam-Dim 7h-20h",
    phone: "",
    mapUrl: "https://maps.google.com/?q=15+Rue+Jean-Jacques+Rousseau+95100+Argenteuil",
  },
  {
    id: 2,
    name: "Baraka 3",
    address: "109 Rue de l'Ambassadeur",
    city: "Conflans-Sainte-Honorine",
    arrondissement: "78700",
    hours: "Lun-Ven 6h30-20h, Sam-Dim 7h-20h",
    phone: "",
    mapUrl: "https://maps.google.com/?q=109+Rue+de+l+Ambassadeur+78700+Conflans-Sainte-Honorine",
  },
  {
    id: 3,
    name: "Boulangerie Baraka",
    address: "135 Rue de Conflans",
    city: "Herblay-sur-Seine",
    arrondissement: "95220",
    hours: "Lun-Ven 6h30-20h, Sam-Dim 7h-20h",
    phone: "",
    tag: "Boutique historique",
    mapUrl: "https://maps.google.com/?q=135+Rue+de+Conflans+95220+Herblay-sur-Seine",
  },
  {
    id: 4,
    name: "Baraka 5",
    address: "2 Chemin de la Croix de Bois",
    city: "Herblay-sur-Seine",
    arrondissement: "95220",
    hours: "Lun-Ven 6h30-20h, Sam-Dim 7h-20h",
    phone: "",
    mapUrl: "https://maps.google.com/?q=2+Chemin+de+la+Croix+de+Bois+95220+Herblay-sur-Seine",
  },
  {
    id: 5,
    name: "Baraka 6",
    address: "14 Av. de la Gare",
    city: "Beauchamp",
    arrondissement: "95250",
    hours: "Lun-Ven 6h30-20h, Sam-Dim 7h-20h",
    phone: "",
    mapUrl: "https://maps.google.com/?q=14+Avenue+de+la+Gare+95250+Beauchamp",
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
            {boutique.phone && (
              <div>
                <p className="font-dm text-xs text-ink/40 tracking-widest uppercase mb-2">
                  Téléphone
                </p>
                <p className="font-dm text-sm text-ink/70">{boutique.phone}</p>
              </div>
            )}
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
          {/* Left: header + décorative */}
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
              Cinq adresses en Île-de-France, ouvertes 7 jours sur 7
              dès l&apos;aube. Chaque boutique porte l&apos;identité Baraka
              tout en s&apos;ancrant dans son quartier.
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
                    5
                  </span>
                  <p className="font-cormorant text-lg text-ink/70 mt-1">
                    adresses en Île-de-France
                  </p>
                  <p className="font-dm text-xs text-ink/40 tracking-widest uppercase mt-1">
                    Argenteuil, Conflans, Herblay, Beauchamp
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
