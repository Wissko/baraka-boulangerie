'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const boutiques = [
  {
    id: 1,
    num: '01',
    name: 'Baraka 2',
    address: '15 Rue Jean-Jacques Rousseau',
    city: '95100 Argenteuil',
    tag: null,
    maps: 'https://maps.app.goo.gl/Y7MEwSpZpWUAQoYg7',
  },
  {
    id: 2,
    num: '02',
    name: 'Baraka 3',
    address: "109 Rue de l'Ambassadeur",
    city: '78700 Conflans-Sainte-Honorine',
    tag: null,
    maps: 'https://maps.app.goo.gl/ijXosgpgPYeo883K6',
  },
  {
    id: 3,
    num: '03',
    name: 'Boulangerie Baraka',
    address: '135 Rue de Conflans',
    city: '95220 Herblay-sur-Seine',
    tag: 'Boutique historique',
    maps: 'https://maps.app.goo.gl/ei9QVUhi2Ka5nAFJ9',
  },
  {
    id: 4,
    num: '04',
    name: 'Baraka 5',
    address: '2 Chemin de la Croix de Bois',
    city: '95220 Herblay-sur-Seine',
    tag: null,
    maps: 'https://maps.app.goo.gl/DssKM4oBcM84hKFS6',
  },
  {
    id: 5,
    num: '05',
    name: 'Baraka 6',
    address: '14 Av. de la Gare',
    city: '95250 Beauchamp',
    tag: null,
    maps: 'https://maps.app.goo.gl/gM8r5p8ijoqGA6pb8',
  },
];

export default function AdressesPage() {
  return (
    <main style={{ background: '#FAF7F2', minHeight: '100vh', overflow: 'hidden' }}>

      {/* ── Hero éditorial ── */}
      <section style={{
        background: '#1A1410',
        padding: 'clamp(7rem,14vw,11rem) clamp(1.5rem,6vw,5rem) clamp(4rem,8vw,6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Image de fond discrète */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&q=80"
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.12 }}
            sizes="100vw"
          />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-dm-sans)', fontWeight: 400,
              fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase',
              color: '#E81C1C', marginBottom: '1.25rem',
            }}
          >5 adresses en Île-de-France</motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300,
              fontSize: 'clamp(3.5rem, 9vw, 7rem)', color: '#FAF7F2',
              letterSpacing: '-0.02em', lineHeight: 0.9,
            }}
          >
            Nos<br />Adresses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-dm-sans)', fontWeight: 300,
              fontSize: '0.9rem', color: 'rgba(250,247,242,0.5)',
              marginTop: '1.5rem', lineHeight: 1.7, maxWidth: '420px',
            }}
          >
            Retrouvez-nous dans le Val-d&apos;Oise et les Yvelines — chaque boutique, un lien avec le quartier.
          </motion.p>
        </div>
      </section>

      {/* ── Liste éditoriale ── */}
      <section style={{ padding: 'clamp(3rem,8vw,6rem) 0' }}>
        {boutiques.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }}
          >
            <a
              href={b.maps}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(1rem, 4vw, 3rem)',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 6vw, 5rem)',
                  borderBottom: '1px solid rgba(26,20,16,0.08)',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(26,20,16,0.03)';
                  const arrow = e.currentTarget.querySelector('.addr-arrow') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translate(4px, -4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  const arrow = e.currentTarget.querySelector('.addr-arrow') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translate(0, 0)';
                }}
              >
                {/* Numéro */}
                <span style={{
                  fontFamily: 'var(--font-dm-sans)', fontWeight: 400,
                  fontSize: '0.65rem', letterSpacing: '0.2em',
                  color: '#E81C1C', opacity: 0.7,
                  flexShrink: 0, minWidth: '2rem',
                }}>{b.num}</span>

                {/* Contenu */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300,
                      fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: '#1A1410',
                      letterSpacing: '-0.01em', lineHeight: 1, margin: 0,
                    }}>{b.name}</h3>
                    {b.tag && (
                      <span style={{
                        fontFamily: 'var(--font-dm-sans)', fontWeight: 400,
                        fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: '#E81C1C', border: '1px solid rgba(232,28,28,0.3)',
                        padding: '0.2rem 0.55rem', flexShrink: 0,
                      }}>{b.tag}</span>
                    )}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-dm-sans)', fontWeight: 300,
                    fontSize: '0.85rem', color: 'rgba(26,20,16,0.55)', lineHeight: 1.6,
                  }}>{b.address}, {b.city}</p>
                </div>

                {/* Arrow */}
                <span className="addr-arrow" style={{
                  fontFamily: 'var(--font-dm-sans)', fontWeight: 300,
                  fontSize: '0.75rem', color: '#E81C1C',
                  flexShrink: 0, transition: 'transform 0.3s ease',
                  display: 'none',
                }}>→</span>
              </div>
            </a>
          </motion.div>
        ))}
      </section>

      {/* ── Photo plein-bleed finale ── */}
      <section style={{ position: 'relative', height: 'clamp(280px, 45vw, 500px)', overflow: 'hidden' }}>
        <Image
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1400&q=80"
          alt="Baraka Boulangeries"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
          sizes="100vw"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(26,20,16,0.5) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 'clamp(1.5rem,4vw,3rem)', left: 'clamp(1.5rem,6vw,5rem)',
        }}>
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(1.1rem, 3vw, 1.8rem)', color: '#FAF7F2', lineHeight: 1.3,
          }}>
            L&apos;artisanat, au coin de votre rue.
          </p>
        </div>
      </section>

      <style>{`
        @media (min-width: 640px) {
          .addr-arrow { display: block !important; }
        }
      `}</style>
    </main>
  );
}
