'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Triptych items ─────────────────────────────────────── */
const triptych = [
  { src: '/images/patisseries.jpg', label: 'Patisseries' },
  { src: '/images/fraisier.jpg',    label: 'Fraisier' },
  { src: '/images/mangues.jpg',     label: 'Entremets' },
];



/* ── Triptych item ───────────────────────────────────────────────────────── */
function TriptychItem({ item }: { item: typeof triptych[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '1 1 0',
        position: 'relative',
        height: '60vh',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <motion.div
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Image
          src={item.src}
          alt={item.label}
          fill
          style={{ objectFit: 'cover', borderRadius: 0 }}
          sizes="33vw"
        />
      </motion.div>

      {/* Caption overlay on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.25rem',
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#FAF7F2',
          }}
        >
          {item.label}
        </p>
      </motion.div>

      {/* Bottom gradient for caption legibility */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(26,20,16,0.55) 0%, transparent 40%)',
          zIndex: 1,
        }}
      />
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function CreationsPage() {
  return (
    <main style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>

      {/* ── Section 1 : Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-cream)',
          paddingTop: 'clamp(100px, 15vw, 160px)',
          paddingBottom: 'clamp(64px, 8vw, 100px)',
          textAlign: 'center',
          padding: 'clamp(100px, 15vw, 160px) 2rem clamp(64px, 8vw, 100px)',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.62rem',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'var(--color-rouge)',
            marginBottom: '1.25rem',
          }}
        >
          Savoir-faire artisanal
        </motion.p>

        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 'clamp(3.5rem, 9vw, 7rem)',
              color: '#1A1410',
              fontWeight: 400,
              letterSpacing: '0.04em',
              lineHeight: 1,
              margin: 0,
            }}
          >
            Nos Créations
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            letterSpacing: '0.12em',
            color: 'rgba(26,20,16,0.5)',
            marginTop: '1.5rem',
          }}
        >
          Pâtisserie &middot; Viennoiserie &middot; Boulangerie
        </motion.p>
      </section>

      {/* ── Section 2 : Cinematic Strip Carousel ──────────────────────── */}
      <section style={{ background: '#1A1410', padding: 'clamp(4rem,8vw,7rem) 0', overflow: 'hidden' }}>

        {/* Overline + titre */}
        <div style={{ textAlign: 'center', padding: '0 2rem clamp(2.5rem,5vw,4rem)' }}>
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '0.58rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#E81C1C',
            marginBottom: '0.75rem',
          }}>Savoir-faire artisanal</p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            color: '#FAF7F2',
          }}>Nos Créations</h2>
        </div>

        {/* Strip */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>

          {/* Fade edges */}
          <div aria-hidden style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '160px', zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to right, #1A1410, transparent)',
          }} />
          <div aria-hidden style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '160px', zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to left, #1A1410, transparent)',
          }} />

          {/* Track — duplicated 3x for seamless loop */}
          <div className="baraka-strip" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            width: 'max-content',
            animation: 'baraka-scroll 28s linear infinite',
            paddingLeft: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}>
            {[
              { src: '/images/fraisier.jpg',     name: 'Fraisier',          cat: 'Pâtisserie' },
              { src: '/images/patisseries.jpg',  name: 'Vitrine du Jour',   cat: 'Sélection' },
              { src: '/images/mangues.jpg',      name: 'Entremets Mangue',  cat: 'Signature' },
              { src: '/images/vitrine-noel.jpg', name: 'Collection Fêtes',  cat: 'Édition Limitée' },
              { src: '/images/baguettes.jpg',    name: 'Boulangerie',       cat: 'Artisanat' },
              { src: '/images/vitrine.jpg',      name: 'Notre Vitrine',     cat: 'Quotidien' },
              // Duplicate
              { src: '/images/fraisier.jpg',     name: 'Fraisier',          cat: 'Pâtisserie' },
              { src: '/images/patisseries.jpg',  name: 'Vitrine du Jour',   cat: 'Sélection' },
              { src: '/images/mangues.jpg',      name: 'Entremets Mangue',  cat: 'Signature' },
              { src: '/images/vitrine-noel.jpg', name: 'Collection Fêtes',  cat: 'Édition Limitée' },
              { src: '/images/baguettes.jpg',    name: 'Boulangerie',       cat: 'Artisanat' },
              { src: '/images/vitrine.jpg',      name: 'Notre Vitrine',     cat: 'Quotidien' },
            ].map((item, i) => (
              <div key={i} style={{
                flexShrink: 0,
                width: 'clamp(260px, 26vw, 380px)',
              }}>
                {/* Image */}
                <div style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                }}>
                  <img
                    src={item.src}
                    alt={item.name}
                    loading={i < 6 ? 'eager' : 'lazy'}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.8s ease',
                    }}
                    onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')}
                    onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
                  />
                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(26,20,16,0.7) 0%, transparent 50%)',
                    pointerEvents: 'none',
                  }} />
                  {/* Name overlay */}
                  <div style={{
                    position: 'absolute', bottom: '1.25rem', left: '1.25rem',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontWeight: 400,
                      fontSize: '0.55rem',
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: '#E81C1C',
                      marginBottom: '0.3rem',
                    }}>{item.cat}</p>
                    <p style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontStyle: 'italic',
                      fontWeight: 300,
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                      color: '#FAF7F2',
                      lineHeight: 1.1,
                    }}>{item.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @keyframes baraka-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .baraka-strip:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </section>

      {/* ── Section 3 : Statement éditorial ─────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-cream)',
          padding: 'clamp(80px, 10vw, 120px) 2rem',
          textAlign: 'center',
          maxWidth: '720px',
          margin: '0 auto',
        }}
      >
        {/* Gold separator top */}
        <div
          style={{
            width: '48px',
            height: '1px',
            background: 'var(--color-gold)',
            margin: '0 auto 2.5rem',
          }}
        />

        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            color: '#1A1410',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '0.03em',
            margin: '0 0 1.5rem',
          }}
        >
          Chaque pièce est façonnée à la main.
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
            lineHeight: 1.8,
            color: 'rgba(26,20,16,0.58)',
            letterSpacing: '0.03em',
          }}
        >
          De la pâte levée feuilletée aux entremets glaçage miroir, chaque création naît d&apos;un geste précis
          et d&apos;un soin constant pour la matière. Nos boulangers et pâtissiers travaillent chaque matin
          pour que la vitrine raconte quelque chose de vrai.
        </p>

        {/* Gold separator bottom */}
        <div
          style={{
            width: '48px',
            height: '1px',
            background: 'var(--color-gold)',
            margin: '2.5rem auto 0',
          }}
        />
      </section>

      {/* ── Section 4 : Triptych ─────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-cream)',
          display: 'flex',
          gap: 0,
          overflow: 'hidden',
        }}
      >
        {triptych.map((item) => (
          <TriptychItem key={item.src} item={item} />
        ))}
      </section>

      {/* ── Section 5 : CTA ──────────────────────────────────────────────── */}
      <section
        style={{
          background: '#1A1410',
          padding: 'clamp(80px, 10vw, 120px) 2rem',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#FAF7F2',
            fontWeight: 400,
            letterSpacing: '0.04em',
            lineHeight: 1,
            margin: '0 0 2.5rem',
          }}
        >
          Passez nous voir.
        </h2>

        <Link
          href="/adresses"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#FAF7F2',
            background: 'var(--color-rouge)',
            padding: '0.9rem 2.2rem',
            textDecoration: 'none',
            transition: 'opacity 0.3s',
          }}
        >
          Voir nos adresses
        </Link>
      </section>

    </main>
  );
}
