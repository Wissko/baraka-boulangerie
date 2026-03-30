'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Carousel slides ─────────────────────────────────────────────────────── */
const slides = [
  { src: '/images/fraisier.jpg',     name: 'Fraisier',            category: 'Patisserie',       num: '01' },
  { src: '/images/patisseries.jpg',  name: 'Vitrine du Jour',     category: 'Selection',        num: '02' },
  { src: '/images/mangues.jpg',      name: 'Entremets Mangue',    category: 'Signature',        num: '03' },
  { src: '/images/vitrine-noel.jpg', name: 'Collection Fetes',    category: 'Edition Limitee',  num: '04' },
  { src: '/images/baguettes.jpg',    name: 'Boulangerie',         category: 'Artisanat',        num: '05' },
];

/* ── Triptych items ──────────────────────────────────────────────────────── */
const triptych = [
  { src: '/images/patisseries.jpg', label: 'Patisseries' },
  { src: '/images/fraisier.jpg',    label: 'Fraisier' },
  { src: '/images/mangues.jpg',     label: 'Entremets' },
];

/* ── Slide variants ──────────────────────────────────────────────────────── */
const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '110%' : '-110%',
    rotateY: dir > 0 ? 15 : -15,
    scale: 0.85,
    opacity: 0,
  }),
  center: {
    x: 0,
    rotateY: 0,
    scale: 1,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-110%' : '110%',
    rotateY: dir > 0 ? -15 : 15,
    scale: 0.85,
    opacity: 0,
  }),
};

/* ── ProgressBar ─────────────────────────────────────────────────────────── */
function ProgressBar({ running, onComplete }: { running: boolean; onComplete: () => void }) {
  const [width, setWidth] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 5000;

  useEffect(() => {
    setWidth(0);
    if (!running) return;
    startRef.current = null;

    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setWidth(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        onComplete();
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return (
    <div
      style={{
        width: '180px',
        height: '2px',
        background: 'rgba(250,247,242,0.12)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${width}%`,
          background: '#E81C1C',
          transition: 'none',
        }}
      />
    </div>
  );
}

/* ── StackCarousel ───────────────────────────────────────────────────────── */
function StackCarousel() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const go = useCallback((delta: number) => {
    setDir(delta);
    setCurrent((c) => (c + delta + slides.length) % slides.length);
    setProgressKey((k) => k + 1);
  }, []);

  const handleProgressComplete = useCallback(() => {
    if (!paused) go(1);
  }, [paused, go]);

  const prev = (current - 1 + slides.length) % slides.length;
  const next = (current + 1) % slides.length;

  const cardWidth = 'min(480px, 70vw)';

  return (
    <section
      style={{
        background: '#1A1410',
        padding: 'clamp(5rem,10vw,8rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* Overline */}
      <p
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 300,
          fontSize: '0.6rem',
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          color: '#E81C1C',
          marginBottom: '3rem',
          opacity: 0.9,
        }}
      >
        Nos Creations
      </p>

      {/* Stack carousel container */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'clamp(400px, 70vh, 600px)',
          perspective: '1200px',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Ghost prev card */}
        <div
          style={{
            position: 'absolute',
            width: cardWidth,
            aspectRatio: '3/4',
            transform: 'translateX(-15%) scale(0.88)',
            opacity: 0.4,
            pointerEvents: 'none',
            border: '1px solid rgba(250,247,242,0.08)',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <Image
            src={slides[prev].src}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            sizes="25vw"
          />
        </div>

        {/* Ghost next card */}
        <div
          style={{
            position: 'absolute',
            width: cardWidth,
            aspectRatio: '3/4',
            transform: 'translateX(15%) scale(0.88)',
            opacity: 0.4,
            pointerEvents: 'none',
            border: '1px solid rgba(250,247,242,0.08)',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <Image
            src={slides[next].src}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            sizes="25vw"
          />
        </div>

        {/* Active card */}
        <div style={{ position: 'relative', zIndex: 2, width: cardWidth }}>
          <AnimatePresence mode="popLayout" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: EASE }}
              style={{
                width: '100%',
                aspectRatio: '3/4',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(250,247,242,0.08)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
              }}
            >
              {/* Ken Burns image */}
              <Image
                src={slides[current].src}
                alt={slides[current].name}
                fill
                priority
                className="kb-active"
                style={{ objectFit: 'cover' }}
                sizes="min(480px, 70vw)"
              />

              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(26,20,16,0.75) 0%, rgba(26,20,16,0.15) 55%, transparent 100%)',
                  zIndex: 1,
                }}
              />

              {/* Text overlay bottom-left */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '1.75rem',
                  zIndex: 2,
                }}
              >
                {/* Number */}
                <p
                  style={{
                    fontFamily: 'var(--font-work-sans)',
                    fontWeight: 300,
                    fontSize: '0.65rem',
                    letterSpacing: '0.28em',
                    color: '#E81C1C',
                    opacity: 0.8,
                    marginBottom: '0.3rem',
                  }}
                >
                  {slides[current].num}
                </p>

                {/* Category */}
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 400,
                    fontSize: '0.55rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(250,247,242,0.45)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {slides[current].category}
                </p>

                {/* Name with clip reveal */}
                <div style={{ overflow: 'hidden' }}>
                  <motion.h2
                    key={`name-${current}`}
                    initial={{ clipPath: 'inset(0 0 100% 0)' }}
                    animate={{ clipPath: 'inset(0 0 0% 0)' }}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                      color: '#FAF7F2',
                      fontWeight: 400,
                      lineHeight: 1,
                      letterSpacing: '0.03em',
                      margin: 0,
                    }}
                  >
                    {slides[current].name}
                  </motion.h2>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
          marginTop: '2.5rem',
        }}
      >
        {/* Prev */}
        <button
          onClick={() => go(-1)}
          aria-label="Precedent"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(250,247,242,0.55)',
            padding: 0,
            transition: 'color 0.25s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF7F2')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,247,242,0.55)')}
        >
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
            <path d="M6 1L1 5L6 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="1" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '0.75rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Precedent
          </span>
        </button>

        {/* Progress + counter */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <ProgressBar
            key={progressKey}
            running={!paused}
            onComplete={handleProgressComplete}
          />
          <span
            style={{
              fontFamily: 'var(--font-work-sans)',
              fontWeight: 300,
              fontSize: '0.65rem',
              letterSpacing: '0.22em',
              color: 'rgba(250,247,242,0.35)',
            }}
          >
            {slides[current].num} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        {/* Next */}
        <button
          onClick={() => go(1)}
          aria-label="Suivant"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(250,247,242,0.55)',
            padding: 0,
            transition: 'color 0.25s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF7F2')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,247,242,0.55)')}
        >
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '0.75rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Suivant
          </span>
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
            <path d="M12 1L17 5L12 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="17" y1="5" x2="1" y2="5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}

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

      {/* ── Section 2 : Stack Carousel ───────────────────────────────────── */}
      <StackCarousel />

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
