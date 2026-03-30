'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const categories = ['Tout', 'Pains', 'Viennoiseries', 'Pâtisseries', 'Sandwichs'];

const products = [
  { id: 1, name: 'Fraisier', category: 'Pâtisseries', price: '5,50 €', src: '/images/fraisier.jpg', size: 'large' },
  { id: 2, name: 'Macarons & Tartelettes', category: 'Pâtisseries', price: '—', src: '/images/patisseries.jpg', size: 'small' },
  { id: 3, name: 'Baguettes Tradition', category: 'Pains', price: '1,20 €', src: '/images/baguettes.jpg', size: 'small' },
  { id: 4, name: 'Entremets Mangue', category: 'Pâtisseries', price: '6,80 €', src: '/images/mangues.jpg', size: 'large' },
  { id: 5, name: 'Bûches & Créations Noël', category: 'Pâtisseries', price: '—', src: '/images/vitrine-noel.jpg', size: 'small' },
  { id: 6, name: 'Vitrine du jour', category: 'Viennoiseries', price: '—', src: '/images/vitrine.jpg', size: 'small' },
  { id: 7, name: 'Pain au Chocolat', category: 'Viennoiseries', price: '1,80 €', src: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=800&q=80', size: 'small' },
  { id: 8, name: 'Brioche', category: 'Viennoiseries', price: '2,40 €', src: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80', size: 'large' },
  { id: 9, name: 'Croissant', category: 'Viennoiseries', price: '1,60 €', src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80', size: 'small' },
  { id: 10, name: 'Sandwich Club', category: 'Sandwichs', price: '5,50 €', src: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&q=80', size: 'small' },
  { id: 11, name: 'Pain de Campagne', category: 'Pains', price: '2,80 €', src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80', size: 'small' },
  { id: 12, name: 'Pain au Seigle', category: 'Pains', price: '2,60 €', src: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=800&q=80', size: 'large' },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isLarge = product.size === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: EASE }}
      className={isLarge ? 'md:col-span-2' : 'md:col-span-1'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <div
        className="relative overflow-hidden"
        style={{ height: isLarge ? '420px' : '320px' }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Image
            src={product.src}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Overlay au hover */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{ background: 'rgba(26, 20, 16, 0.72)' }}
        >
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            color: '#FAF7F2',
            letterSpacing: '0.06em',
            marginBottom: '0.5rem',
          }}>
            {product.name}
          </p>
          <div style={{ width: '32px', height: '1px', background: 'var(--color-rouge)', margin: '0.5rem auto' }} />
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.85rem',
            color: 'var(--color-rouge)',
            letterSpacing: '0.2em',
          }}>
            {product.price}
          </p>
        </motion.div>
      </div>

      {/* Label sous l'image */}
      <div style={{ paddingTop: '0.75rem' }}>
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 300,
          fontSize: '0.75rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#1A1410',
          opacity: 0.55,
        }}>
          {product.name}
        </p>
      </div>
    </motion.div>
  );
}

export default function CreationsPage() {
  const [active, setActive] = useState('Tout');

  const filtered = active === 'Tout'
    ? products
    : products.filter(p => p.category === active);

  return (
    <main style={{ background: '#FAF7F2', minHeight: '100vh', paddingTop: '120px', paddingBottom: '120px' }}>
      {/* Titre */}
      <section style={{ textAlign: 'center', marginBottom: '64px', padding: '0 2rem' }}>
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
            color: 'var(--color-rouge)',
            marginBottom: '1rem',
          }}
        >
          Boulangerie Baraka
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
            Nos Créations
          </motion.h1>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--color-rouge), transparent)',
            margin: '1.5rem auto 0',
          }}
        />
      </section>

      {/* Filtres */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '64px', padding: '0 2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.6rem 1.4rem',
              border: `1px solid ${active === cat ? '#C41E3A' : 'rgba(26,20,16,0.15)'}`,
              background: active === cat ? '#C41E3A' : 'transparent',
              color: active === cat ? '#FAF7F2' : '#1A1410',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Grille éditoriale */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
}
