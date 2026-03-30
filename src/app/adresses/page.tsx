'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const boutiques = [
  {
    id: 1,
    name: 'Baraka 2',
    address: '15 Rue Jean-Jacques Rousseau',
    city: '95100 Argenteuil',
    tag: null,
    maps: 'https://maps.app.goo.gl/Y7MEwSpZpWUAQoYg7',
  },
  {
    id: 2,
    name: 'Baraka 3',
    address: "109 Rue de l'Ambassadeur",
    city: '78700 Conflans-Sainte-Honorine',
    tag: null,
    maps: 'https://maps.app.goo.gl/ijXosgpgPYeo883K6',
  },
  {
    id: 3,
    name: 'Boulangerie Baraka',
    address: '135 Rue de Conflans',
    city: '95220 Herblay-sur-Seine',
    tag: 'Boutique historique',
    maps: 'https://maps.app.goo.gl/ei9QVUhi2Ka5nAFJ9',
  },
  {
    id: 4,
    name: 'Baraka 5',
    address: '2 Chemin de la Croix de Bois',
    city: '95220 Herblay-sur-Seine',
    tag: null,
    maps: 'https://maps.app.goo.gl/DssKM4oBcM84hKFS6',
  },
  {
    id: 5,
    name: 'Baraka 6',
    address: '14 Av. de la Gare',
    city: '95250 Beauchamp',
    tag: null,
    maps: 'https://maps.app.goo.gl/gM8r5p8ijoqGA6pb8',
  },
];

export default function AdressesPage() {
  return (
    <main style={{ background: '#FAF7F2', minHeight: '100vh', paddingTop: '120px', paddingBottom: '120px' }}>
      {/* Titre */}
      <section style={{ textAlign: 'center', marginBottom: '80px', padding: '0 2rem' }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: '1rem',
          }}
        >
          5 adresses en Île-de-France
        </motion.p>

        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              color: '#1A1410',
              letterSpacing: '0.04em',
              lineHeight: 1,
              fontWeight: 400,
            }}
          >
            Nos Adresses
          </motion.h1>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
            margin: '1.5rem auto 0',
          }}
        />
      </section>

      {/* Layout split */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>

          {/* Liste boutiques */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {boutiques.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
              >
                <a
                  href={b.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <div
                    style={{
                      padding: '1.8rem 2rem',
                      border: '1px solid rgba(201,169,110,0.25)',
                      background: '#FFFFFF',
                      transition: 'border-color 0.3s, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#C9A96E';
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(6px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.25)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                    }}
                  >
                    {/* Header card */}
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <h3 style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontStyle: 'italic',
                        fontSize: '1.4rem',
                        color: '#1A1410',
                        letterSpacing: '0.04em',
                        fontWeight: 400,
                      }}>
                        {b.name}
                      </h3>
                      {b.tag && (
                        <span style={{
                          fontFamily: 'var(--font-dm-sans)',
                          fontWeight: 400,
                          fontSize: '0.6rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: '#C9A96E',
                          border: '1px solid rgba(201,169,110,0.4)',
                          padding: '0.25rem 0.6rem',
                        }}>
                          {b.tag}
                        </span>
                      )}
                    </div>

                    <p style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontWeight: 300,
                      fontSize: '0.85rem',
                      color: '#1A1410',
                      opacity: 0.7,
                      lineHeight: 1.7,
                    }}>
                      {b.address}<br />{b.city}
                    </p>

                    <p style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontWeight: 300,
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      color: '#C9A96E',
                      marginTop: '1rem',
                      textTransform: 'uppercase',
                    }}>
                      Voir sur Google Maps →
                    </p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Image sticky droite */}
          <div style={{ position: 'sticky', top: '140px' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{ position: 'relative', height: '580px', overflow: 'hidden' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=80"
                alt="Boutique Baraka"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(26,20,16,0.3), transparent)',
              }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ marginTop: '2rem', textAlign: 'right' }}
            >
              <p style={{
                fontFamily: 'var(--font-playfair)',
                fontStyle: 'italic',
                fontSize: '1rem',
                color: '#8B6F47',
                lineHeight: 1.8,
              }}>
                « Chaque boutique est un lieu de vie,<br />
                un point de rencontre dans le quartier. »
              </p>
            </motion.div>
          </div>

        </div>
      </section>
    </main>
  );
}
