'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { number: 5, label: 'Boutiques', suffix: '' },
  { number: 15, label: 'Années', suffix: '' },
  { number: 100, label: 'Artisanal', suffix: '%' },
  { label: 'Île-de-France', isText: true },
];

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function HistoirePage() {
  return (
    <main className="bg-[#FAF7F2] min-h-screen" style={{ paddingTop: '160px' }}>
      {/* Hero section 2 col */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Image gauche */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative overflow-hidden"
            style={{ height: '50vh', minHeight: '400px' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=900&q=80"
              alt="Artisan boulanger Baraka"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Texte droit */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            <h1
              className="font-[var(--font-cormorant)] text-6xl md:text-7xl text-[#1A1410] mb-4"
              style={{ letterSpacing: '0.05em', lineHeight: 1.1 }}
            >
              Notre{' '}
              <span className="text-[#C9A96E]">Histoire</span>
            </h1>

            <div className="w-16 h-px bg-gradient-to-r from-[#C9A96E] to-transparent mb-8" />

            <div
              className="text-[#1A1410]/80 leading-relaxed first-letter-drop"
              style={{ lineHeight: 1.8, fontSize: '1rem' }}
            >
              <p className="mb-6">
                Tout a commencé avec une passion simple : faire du bon pain. Baraka est née de cette conviction que la boulangerie artisanale mérite d&apos;être au cœur de chaque quartier, accessible à tous, sans jamais sacrifier la qualité.
              </p>
              <p className="mb-6">
                Depuis quinze ans, nos boulangers perpétuent un savoir-faire ancestral, levant chaque matin avant l&apos;aube pour pétrir, façonner et cuire. Chaque baguette, chaque croissant, chaque pain porte l&apos;empreinte de leur dévouement.
              </p>
              <p>
                Aujourd&apos;hui, Baraka compte cinq boutiques en Île-de-France, mais l&apos;âme reste la même : l&apos;excellence du fait maison, la chaleur humaine, et ce parfum irrésistible qui accueille nos clients chaque matin.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Citation */}
      <section className="py-24 px-8 bg-[#1A1410]">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p
            className="font-[var(--font-playfair)] italic text-[#FAF7F2] text-2xl md:text-3xl leading-relaxed"
            style={{ letterSpacing: '0.03em' }}
          >
            « Le pain est le premier aliment. Il nourrit le corps, rassemble les familles, et rappelle à chacun d&apos;où il vient. »
          </p>
          <div className="w-16 h-px bg-[#C9A96E] mx-auto mt-8" />
          <p className="mt-4 font-[var(--font-dm-sans)] text-[#C9A96E] text-sm tracking-[0.2em] uppercase">
            — Fondateur, Baraka Boulangeries
          </p>
        </motion.blockquote>
      </section>

      {/* Stats */}
      <section className="py-32 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div
                className="font-[var(--font-cormorant)] text-6xl md:text-7xl text-[#C9A96E] mb-3"
                style={{ letterSpacing: '0.02em' }}
              >
                {stat.isText ? (
                  <span className="text-4xl md:text-5xl">Île-de-France</span>
                ) : (
                  <CountUp target={stat.number!} suffix={stat.suffix} />
                )}
              </div>
              {!stat.isText && (
                <p
                  className="font-[var(--font-dm-sans)] text-[#1A1410]/60 text-xs tracking-[0.2em] uppercase"
                >
                  {stat.label}
                </p>
              )}
              {stat.isText && (
                <p className="font-[var(--font-dm-sans)] text-[#1A1410]/60 text-xs tracking-[0.2em] uppercase">
                  Présence
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
