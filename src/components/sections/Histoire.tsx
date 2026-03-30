"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "14", label: "Boutiques", sub: "en France" },
  { value: "15", label: "Années", sub: "d'artisanat" },
  { value: "4h", label: "Du matin", sub: "chaque jour" },
  { value: "100%", label: "Farines", sub: "françaises" },
];

function AnimatedStat({
  value,
  label,
  sub,
  delay,
}: {
  value: string;
  label: string;
  sub: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center text-center"
    >
      <span className="font-cormorant font-light text-5xl md:text-6xl text-gold">
        {value}
      </span>
      <span className="font-cormorant text-lg text-ink mt-1">{label}</span>
      <span className="font-dm text-xs text-ink/50 tracking-widest uppercase mt-1">
        {sub}
      </span>
    </motion.div>
  );
}

export default function Histoire() {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const imageInView = useInView(imageRef, { once: true, margin: "-80px" });

  return (
    <section id="histoire" className="py-32 md:py-40 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="font-dancing text-gold text-lg mb-3">Notre histoire</p>
          <div className="gold-divider" />
        </motion.div>

        {/* Asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-cormorant font-light text-ink leading-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              L&apos;âme d&apos;une maison,{" "}
              <span className="italic text-brown">
                façonnée à la main
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="space-y-5 font-dm text-ink/70 text-base leading-relaxed"
            >
              <p>
                Baraka est née d&apos;une conviction simple : la boulangerie
                artisanale est un art de vivre. Fondée en 2010 par une famille
                passionnée, notre maison s&apos;est construite autour d&apos;un
                respect absolu des traditions françaises.
              </p>
              <p>
                Chaque matin, avant l&apos;aube, nos artisans boulangers
                pétrissent les pâtes à la main, sélectionnent les meilleures
                farines de meuniers partenaires, et façonnent avec soin les
                croissants, les baguettes et les pièces qui font la fierté de
                nos boutiques.
              </p>
              <p>
                Baraka, en arabe et en langue berbère, signifie la bénédiction.
                C&apos;est cette grâce discrète que nous cherchons à insuffler
                dans chaque création — un pain qui nourrit, une viennoiserie
                qui réjouit, un moment qui dure.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex items-center gap-6"
            >
              <div className="gold-divider-lg" />
              <p className="font-playfair italic text-gold text-sm">
                Fait à la main, chaque jour
              </p>
            </motion.div>
          </div>

          {/* Image column */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 30 }}
            animate={imageInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2 relative"
          >
            {/* Large image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=85"
                alt="Artisan boulanger Baraka au travail"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
            </div>

            {/* Floating label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={imageInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-cream-warm border border-gold/20 p-6 shadow-lg"
            >
              <p className="font-dancing text-gold text-base">
                Levain naturel
              </p>
              <p className="font-cormorant text-ink text-2xl mt-1">
                72h de fermentation
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-28 md:mt-36 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 pt-16 border-t border-gold/20">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} delay={0.1 * i} />
          ))}
        </div>
      </div>
    </section>
  );
}
