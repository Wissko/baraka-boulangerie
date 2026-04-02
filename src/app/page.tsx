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

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      {/* ─── HERO ─── */}
      <main ref={ref} className="relative w-full h-screen overflow-hidden">
        {/* Background image vitrine.jpg avec parallax */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale: imageScale }}
          initial={{ scale: 1.04 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 2.5, ease: EASE_LUXURY }}
        >
          <Image
            src="/images/vitrine.jpg"
            alt="Vitrine Baraka — pâtisseries et viennoiseries"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient sombre en bas pour lisibilité texte */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(26,20,16,0.35) 0%, rgba(26,20,16,0.15) 40%, rgba(26,20,16,0.72) 100%)' }}
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

          {/* Titre — curtain lift */}
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

          {/* Ligne rouge animée */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.0, ease: EASE_LUXURY }}
            style={{
              width: '80px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--color-rouge), transparent)',
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
              <span className="absolute bottom-[-2px] left-0 w-0 h-px transition-[width] duration-500 group-hover:w-full" style={{ background: 'var(--color-rouge)', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }} />
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
              background: 'rgba(196,30,58,0.6)',
            }}
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </main>

      {/* ─── SECTION SAVOIR-FAIRE — split 50/50 baguettes.jpg ─── */}
      <section
        style={{ background: '#FAF7F2' }}
        className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]"
      >
        {/* Image baguettes */}
        <div className="relative overflow-hidden" style={{ minHeight: '480px' }}>
          <Image
            src="/images/baguettes.jpg"
            alt="Baguettes sortant du four — fournil Baraka"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Texte */}
        <motion.div
          className="flex flex-col justify-center px-12 py-20"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: EASE_LUXURY }}
        >
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--color-rouge)',
            marginBottom: '1.5rem',
          }}>
            Le savoir-faire
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            color: '#1A1410',
            lineHeight: 1.1,
            letterSpacing: '0.04em',
            fontWeight: 400,
            marginBottom: '1.5rem',
          }}>
            Pétri à la main,<br />cuit à l&apos;âme
          </h2>
          <div style={{ width: '40px', height: '1px', background: 'var(--color-rouge)', marginBottom: '1.5rem' }} />
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.9rem',
            lineHeight: 1.9,
            color: 'rgba(26,20,16,0.7)',
            maxWidth: '420px',
          }}>
            Chaque baguette naît d&apos;une levée lente de douze heures, d&apos;une farine de terroir
            et d&apos;un geste transmis depuis trois générations. Rien n&apos;est précipité.
            Tout est juste.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/histoire" className="group relative inline-block">
              <span style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 400,
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#1A1410',
              }}>
                Notre histoire
              </span>
              <span className="absolute bottom-[-2px] left-0 w-0 h-px transition-[width] duration-500 group-hover:w-full" style={{ background: 'var(--color-rouge)', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION CRÉATIONS — fraisier plein-bleed ─── */}
      <section className="relative overflow-hidden" style={{ minHeight: '70vh' }}>
        <Image
          src="/images/fraisier.jpg"
          alt="Fraisier Baraka — création signature"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay sombre pour lisibilité */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(26,20,16,0.78) 0%, rgba(26,20,16,0.25) 60%, rgba(26,20,16,0.1) 100%)' }}
        />
        <motion.div
          className="relative z-10 flex flex-col justify-center h-full px-12 py-24 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.0, ease: EASE_LUXURY }}
        >
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--color-rouge)',
            marginBottom: '1.5rem',
          }}>
            Pâtisserie de saison
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            color: '#FAF7F2',
            lineHeight: 1.05,
            letterSpacing: '0.04em',
            fontWeight: 400,
            marginBottom: '1.5rem',
          }}>
            Créations<br />d&apos;exception
          </h2>
          <div style={{ width: '40px', height: '1px', background: 'var(--color-rouge)', marginBottom: '1.5rem' }} />
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.88rem',
            lineHeight: 1.9,
            color: 'rgba(250,247,242,0.75)',
          }}>
            Fraisier, tarte au citron, Paris-Brest... Chaque pièce est pensée
            comme une œuvre — équilibre des textures, précision du goût,
            beauté du geste.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/créations" className="group relative inline-block">
              <span style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 400,
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#FAF7F2',
              }}>
                Voir nos créations
              </span>
              <span className="absolute bottom-[-2px] left-0 w-0 h-px transition-[width] duration-500 group-hover:w-full" style={{ background: 'var(--color-rouge)', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION WOW — pâtisseries.jpg split inversé ─── */}
      <section
        style={{ background: '#FAF7F2' }}
        className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]"
      >
        {/* Texte à gauche */}
        <motion.div
          className="flex flex-col justify-center px-12 py-20 order-2 md:order-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: EASE_LUXURY }}
        >
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--color-rouge)',
            marginBottom: '1.5rem',
          }}>
            La vitrine
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            color: '#1A1410',
            lineHeight: 1.1,
            letterSpacing: '0.04em',
            fontWeight: 400,
            marginBottom: '1.5rem',
          }}>
            Macarons, tartelettes,<br />religieuses caramel
          </h2>
          <div style={{ width: '40px', height: '1px', background: 'var(--color-rouge)', marginBottom: '1.5rem' }} />
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.9rem',
            lineHeight: 1.9,
            color: 'rgba(26,20,16,0.7)',
            maxWidth: '420px',
          }}>
            Une vitrine qui change chaque matin. Des couleurs, des parfums,
            des textures — tout ce qu&apos;il faut pour commencer la journée
            avec le sourire.
          </p>
        </motion.div>

        {/* Image pâtisseries */}
        <div className="relative overflow-hidden order-1 md:order-2" style={{ minHeight: '480px' }}>
          <Image
            src="/images/pâtisseries.jpg"
            alt="Vitrine pâtisseries — macarons, tartelettes, religieuses"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ─── SECTION WOW — mangues plein-bleed ─── */}
      <section className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
        <Image
          src="/images/mangues.jpg"
          alt="Entremets mangue glaçage miroir — Baraka"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(26,20,16,0.45)' }}
        />
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8 py-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: EASE_LUXURY }}
        >
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            color: '#FAF7F2',
            letterSpacing: '0.06em',
            fontWeight: 400,
            marginBottom: '1rem',
          }}>
            La baraka, c&apos;est l&apos;instant.
          </p>
          <div style={{ width: '60px', height: '1px', background: 'var(--color-rouge)', margin: '0 auto 2rem' }} />
          <Link href="/créations" className="group relative inline-block">
            <span style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(250,247,242,0.85)',
            }}>
              Explorer la carte
            </span>
            <span className="absolute bottom-[-2px] left-0 w-0 h-px transition-[width] duration-500 group-hover:w-full" style={{ background: 'var(--color-rouge)', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }} />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
