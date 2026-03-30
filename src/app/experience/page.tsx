'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    id: 1,
    number: '01',
    title: 'Le Savoir-Faire',
    subtitle: 'Des mains expertes, un geste ancestral',
    body: "Chaque matin, nos boulangers prennent le temps. Pétrir la pâte, la laisser lever lentement, la façonner avec précision. C'est un travail qui ne se délègue pas aux machines. C'est l'art de ceux qui ont appris à écouter la farine, l'eau, le levain.",
    src: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1600&q=80',
  },
  {
    id: 2,
    number: '02',
    title: 'Les Ingrédients',
    subtitle: 'Sélectionnés avec exigence',
    body: "Nous ne faisons aucun compromis sur la qualité. Farines moulues sur pierre, beurre AOP, levains naturels entretenus depuis des années. Chaque ingrédient est choisi pour ce qu'il apporte de meilleur au produit final.",
    src: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=1600&q=80',
  },
  {
    id: 3,
    number: '03',
    title: 'La Passion',
    subtitle: "L'âme de Baraka",
    body: "Derrière chaque baguette, chaque croissant, chaque pâtisserie, il y a une histoire. Celle de boulangers qui ont choisi ce métier par amour. Baraka, c'est cette énergie collective, cette fierté du travail bien fait, transmise de génération en génération.",
    src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&q=80',
  },
];

function PillarSection({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Image background avec parallax */}
      <motion.div
        style={{ position: 'absolute', inset: 0, y: imageY }}
        className="z-0"
      >
        <Image
          src={pillar.src}
          alt={pillar.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay sombre */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(26,20,16,0.88) 0%, rgba(26,20,16,0.55) 100%)',
        }} />
      </motion.div>

      {/* Grain */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
        opacity: 0.04,
      }} />

      {/* Contenu */}
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '640px',
          padding: 'clamp(3rem, 8vw, 6rem)',
          marginLeft: index % 2 === 0 ? '0' : 'auto',
        }}
      >
        {/* Numéro */}
        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic',
          fontSize: '1rem',
          color: '#C9A96E',
          letterSpacing: '0.3em',
          marginBottom: '1.5rem',
          opacity: 0.7,
        }}>
          {pillar.number}
        </p>

        {/* Titre */}
        <h2 style={{
          fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          color: '#FAF7F2',
          lineHeight: 1.1,
          letterSpacing: '0.03em',
          marginBottom: '0.5rem',
          fontWeight: 400,
        }}>
          {pillar.title}
        </h2>

        {/* Ligne dorée */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
          style={{
            width: '48px',
            height: '1px',
            background: '#C9A96E',
            marginBottom: '1.5rem',
            transformOrigin: 'left',
          }}
        />

        {/* Sous-titre */}
        <p style={{
          fontFamily: 'var(--font-playfair)',
          fontStyle: 'italic',
          fontSize: '1.05rem',
          color: '#C9A96E',
          letterSpacing: '0.05em',
          marginBottom: '1.5rem',
        }}>
          {pillar.subtitle}
        </p>

        {/* Corps */}
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 300,
          fontSize: '0.95rem',
          color: 'rgba(250,247,242,0.75)',
          lineHeight: 1.9,
          letterSpacing: '0.02em',
        }}>
          {pillar.body}
        </p>
      </motion.div>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <main style={{
      background: '#1A1410',
      scrollSnapType: 'y mandatory',
      overflowY: 'scroll',
      height: '100vh',
    }}>
      {/* Intro */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        scrollSnapAlign: 'start',
        position: 'relative',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: '2rem',
          }}
        >
          Ce qui nous distingue
        </motion.p>

        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              color: '#FAF7F2',
              letterSpacing: '0.04em',
              lineHeight: 1,
              fontWeight: 400,
            }}
          >
            L&apos;Expérience
          </motion.h1>
        </div>

        <div style={{ overflow: 'hidden', marginTop: '0.5rem' }}>
          <motion.h2
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
              color: '#C9A96E',
              letterSpacing: '0.04em',
              lineHeight: 1,
              fontWeight: 300,
            }}
          >
            Baraka
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(250,247,242,0.5)',
          }}>Défiler</span>
          <motion.div
            style={{ width: '1px', height: '40px', background: 'rgba(201,169,110,0.5)' }}
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Les 3 piliers */}
      {pillars.map((pillar, i) => (
        <PillarSection key={pillar.id} pillar={pillar} index={i} />
      ))}
    </main>
  );
}
