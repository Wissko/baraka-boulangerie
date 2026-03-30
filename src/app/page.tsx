'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const;

export default function HomePage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax subtil : scale 1.0 → 1.08 au scroll (comme beurre-v2)
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main ref={ref} className="relative w-full h-screen overflow-hidden">
      {/* Background image avec parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale: imageScale }}
        initial={{ scale: 1.04 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 2.5, ease: EASE_LUXURY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&q=90"
          alt="Pain artisanal Baraka"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay crème semi-transparent (pas noir brutal — comme beurre-v2) */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(26,20,16,0.55), rgba(26,20,16,0.25))' }}
        />
      </motion.div>

      {/* Grain cinématographique */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.045,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Overline */}
        <motion.p
          className="text-white/60"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4, ease: EASE_LUXURY }}
        >
          Boulangerie artisanale · Île-de-France
        </motion.p>

        {/* Titre — curtain lift (comme beurre-v2) */}
        <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
          <motion.h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: '#FAF7F2',
              fontSize: 'clamp(80px, 13vw, 160px)',
              lineHeight: 1,
              letterSpacing: '0.06em',
              fontWeight: 400,
            }}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.8, delay: 0.6, ease: EASE_LUXURY }}
          >
            Baraka
          </motion.h1>
        </div>

        {/* Sous-titre */}
        <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
          <motion.p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              color: 'rgba(250,247,242,0.75)',
              fontSize: 'clamp(10px, 1.2vw, 14px)',
              letterSpacing: '0.55em',
              textTransform: 'uppercase',
            }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.1, ease: EASE_LUXURY }}
          >
            L&apos;art de la boulangerie française
          </motion.p>
        </div>

        {/* Ligne dorée animée */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.0, ease: EASE_LUXURY }}
          style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
            marginBottom: '2.5rem',
          }}
        />

        {/* Bouton Découvrir */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <Link href="/histoire" className="group relative inline-block">
            <span style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              color: 'rgba(250,247,242,0.85)',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}>
              Découvrir
            </span>
            <span
              className="absolute left-0 right-0 group-hover:right-0"
              style={{
                bottom: '-2px',
                left: 0,
                height: '1px',
                background: '#C9A96E',
                width: 0,
                transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)',
              }}
              // CSS approach via group hover
            />
            {/* Underline via after pseudo in Tailwind */}
            <span className="absolute bottom-[-2px] left-0 w-0 h-px bg-[#C9A96E] transition-[width] duration-500 group-hover:w-full" style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }} />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.2, duration: 1.0, ease: EASE_LUXURY }}
      >
        <span style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(250,247,242,0.6)',
          fontWeight: 300,
        }}>Scroll</span>
        <motion.div
          style={{
            width: '1px',
            height: '48px',
            background: 'rgba(201,169,110,0.5)',
          }}
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </main>
  );
}
