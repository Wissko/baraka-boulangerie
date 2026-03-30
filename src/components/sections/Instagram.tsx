"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const feed = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
    alt: "Croissants frais du matin",
    likes: "1.2k",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    alt: "Pain au levain sorti du four",
    likes: "987",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    alt: "Gâteau de celebration",
    likes: "2.1k",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=600&q=80",
    alt: "Viennoiseries en vitrine",
    likes: "876",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&q=80",
    alt: "Atelier boulangerie",
    likes: "1.5k",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&q=80",
    alt: "Pâtisseries fines",
    likes: "1.8k",
  },
];

function FeedItem({
  item,
  index,
}: {
  item: (typeof feed)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.a
      ref={ref}
      href="https://www.instagram.com/baraka_boulangeries"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative aspect-square overflow-hidden block bg-cream-warm"
      aria-label={`Voir sur Instagram : ${item.alt}`}
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-colors duration-400 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
          {/* Instagram icon */}
          <svg
            className="w-8 h-8 text-cream/90 mx-auto mb-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
          </svg>
          <p className="font-dm text-xs text-cream/80 tracking-wide">
            {item.likes} likes
          </p>
        </div>
      </div>
    </motion.a>
  );
}

export default function Instagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="actualites" className="py-32 md:py-40 bg-cream-warm">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="font-dancing text-gold text-lg mb-3">
                Suivez-nous
              </p>
              <div className="gold-divider mb-6" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-cormorant font-light text-ink leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Le quotidien Baraka
            </motion.h2>
          </div>

          <motion.a
            href="https://www.instagram.com/baraka_boulangeries"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group inline-flex items-center gap-3 border border-ink/20 hover:border-gold px-6 py-3 transition-colors duration-400"
          >
            <svg
              className="w-4 h-4 text-ink/60 group-hover:text-gold transition-colors duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            <span className="font-dm text-xs tracking-widest uppercase text-ink/60 group-hover:text-gold transition-colors duration-300">
              @baraka_boulangeries
            </span>
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {feed.map((item, i) => (
            <FeedItem key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.instagram.com/baraka_boulangeries"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-dm text-xs tracking-widest uppercase text-gold hover:text-gold-dark transition-colors duration-300 luxury-link"
          >
            <span>Voir toutes nos publications</span>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path
                d="M0 5h14M10 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
