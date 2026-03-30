"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleDiscover = () => {
    const el = document.getElementById("histoire");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[700px] overflow-hidden"
      aria-label="Baraka Boulangeries — Hero"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2400&q=90"
          alt="Boulangerie artisanale Baraka — Croissants et pains frais"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-110"
        />
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/80" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-ink/30 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Label cursif */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-dancing text-gold text-xl md:text-2xl mb-6 tracking-wide"
        >
          Maison artisanale depuis 2010
        </motion.p>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-cormorant font-light text-cream tracking-ultra-wide uppercase"
          style={{ fontSize: "clamp(4rem, 15vw, 12rem)", lineHeight: 0.9 }}
        >
          Baraka
        </motion.h1>

        {/* Ligne dorée */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6 mb-6 w-24 h-px bg-gold"
        />

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="font-playfair italic text-cream/80 text-xl md:text-2xl lg:text-3xl tracking-wide max-w-xl"
        >
          L&apos;art de la boulangerie française
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          onClick={handleDiscover}
          className="mt-14 group flex flex-col items-center gap-4"
          aria-label="Découvrir Baraka Boulangeries"
        >
          <span className="font-dm text-xs tracking-ultra-wide uppercase text-cream/70 group-hover:text-gold transition-colors duration-400">
            Découvrir
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-gold/80 to-transparent"
          />
        </motion.button>
      </motion.div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
