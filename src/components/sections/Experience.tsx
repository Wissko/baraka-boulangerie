"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const pillars = [
  {
    number: "01",
    title: "Savoir-faire",
    subtitle: "Transmission & excellence",
    body: "Nos artisans sont formés selon les méthodes de la boulangerie française traditionnelle. Chaque geste est précis, chaque façonnage est réfléchi. Le temps ne se négocie pas — un croissant pur beurre demande 3 jours de travail.",
    accent: "3 jours pour un croissant",
  },
  {
    number: "02",
    title: "Ingrédients",
    subtitle: "Sélection rigoureuse",
    body: "Nous travaillons exclusivement avec des meuniers partenaires, des producteurs laitiers en agriculture raisonnée, et des chocolatiers artisanaux. Chaque ingrédient est tracé, sélectionné pour sa qualité intrinsèque.",
    accent: "100% terroir français",
  },
  {
    number: "03",
    title: "Passion",
    subtitle: "L'âme de la maison",
    body: "Baraka est née d'un amour sincère pour le pain. Cette passion se retrouve dans la régularité de nos produits, dans l'accueil de nos équipes, et dans le soin apporté à chaque détail — du façonnage à la présentation en vitrine.",
    accent: "Depuis 2010",
  },
];

function Pillar({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative"
    >
      {/* Number */}
      <span className="font-cormorant text-8xl font-light text-gold/15 leading-none select-none absolute -top-4 -left-2">
        {pillar.number}
      </span>

      <div className="relative pt-8 pl-4 border-l border-gold/30 hover:border-gold transition-colors duration-500">
        <p className="font-dancing text-gold text-sm mb-2">{pillar.subtitle}</p>
        <h3 className="font-cormorant font-light text-3xl md:text-4xl text-cream mb-5">
          {pillar.title}
        </h3>
        <p className="font-dm text-sm leading-relaxed text-cream/60 mb-6">
          {pillar.body}
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-gold/60" />
          <span className="font-playfair italic text-gold/80 text-sm">
            {pillar.accent}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.75, 0.7]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=2000&q=85"
          alt="Intérieur boulangerie artisanale"
          fill
          sizes="100vw"
          className="object-cover object-center scale-110"
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 z-10 bg-ink"
        style={{ opacity: overlayOpacity }}
      />

      {/* Texture overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-ink/30 via-transparent to-ink/30" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-dancing text-gold text-lg mb-3"
          >
            Ce qui nous distingue
          </motion.p>
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="gold-divider mb-8"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-cormorant font-light text-cream leading-tight max-w-2xl"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            L&apos;expérience Baraka
          </motion.h2>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {pillars.map((pillar, i) => (
            <Pillar key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 md:mt-32 text-center"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold/40 to-transparent mx-auto mb-8" />
          <blockquote className="font-cormorant italic text-2xl md:text-3xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Le bon pain, c&apos;est celui qui vous fait lever le matin
            avec le sourire.&rdquo;
          </blockquote>
          <p className="font-dancing text-gold mt-4 text-base">
            Karim Baraka, fondateur
          </p>
        </motion.div>
      </div>
    </section>
  );
}
