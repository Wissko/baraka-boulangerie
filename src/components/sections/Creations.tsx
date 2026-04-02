"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

type Category = "Tout" | "Pains" | "Viennoiseries" | "Pâtisseries" | "Sandwichs";

interface Product {
  id: number;
  name: string;
  category: Exclude<Category, "Tout">;
  description: string;
  image: string;
  tag?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Croissant pur beurre",
    category: "Viennoiseries",
    description: "Feuilletage traditionnel, beurre AOP Charentes-Poitou",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=85",
    tag: "Signature",
  },
  {
    id: 2,
    name: "Baguette tradition",
    category: "Pains",
    description: "Farine de blé Label Rouge, fermentation lente 16h",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=85",
    tag: "Bestseller",
  },
  {
    id: 3,
    name: "Tarte aux fraises",
    category: "Pâtisseries",
    description: "Crème pâtissière vanille Bourbon, fraises gariguette",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&q=85",
  },
  {
    id: 4,
    name: "Pain de campagne",
    category: "Pains",
    description: "Levain naturel maison, croûte craquante, mie aérée",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=85",
  },
  {
    id: 5,
    name: "Pain au chocolat",
    category: "Viennoiseries",
    description: "Chocolat Valrhona Guanaja 70%, feuilletage au beurre",
    image: "https://images.unsplash.com/photo-1604882737226-df7f9db6e5f3?w=800&q=85",
  },
  {
    id: 6,
    name: "Éclair au café",
    category: "Pâtisseries",
    description: "Pâte à choux légère, crème au café grand cru",
    image: "https://images.unsplash.com/photo-1661347561168-596d5cd45b28?w=800&q=85",
    tag: "Nouveauté",
  },
  {
    id: 7,
    name: "Sandwich jambon beurre",
    category: "Sandwichs",
    description: "Jambon de Paris supérieur, beurre demi-sel, baguette tradition",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&q=85",
  },
  {
    id: 8,
    name: "Kouign-amann",
    category: "Viennoiseries",
    description: "Recette bretonne authentique, caramélisation naturelle",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=85",
    tag: "Coup de coeur",
  },
  {
    id: 9,
    name: "Pain aux noix",
    category: "Pains",
    description: "Noix de Grenoble AOP, farine semi-complète, levain",
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800&q=85",
  },
  {
    id: 10,
    name: "Millefeuille vanille",
    category: "Pâtisseries",
    description: "Feuilletage inversé, crème diplomate vanille de Tahiti",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=85",
    tag: "Signature",
  },
  {
    id: 11,
    name: "Sandwich avocat saumon",
    category: "Sandwichs",
    description: "Saumon Label Rouge, avocat, citron vert, pain de mie brioché",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&q=85",
  },
  {
    id: 12,
    name: "Brioche feuilletée",
    category: "Viennoiseries",
    description: "Beurre de qualité supérieure, 24h de repos au froid",
    image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800&q=85",
  },
];

const categories: Category[] = ["Tout", "Pains", "Viennoiseries", "Pâtisseries", "Sandwichs"];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-warm">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/55 transition-colors duration-500" />

        {/* Product info overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 p-6">
          <motion.h3 className="font-cormorant text-2xl text-cream text-center leading-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
            {product.name}
          </motion.h3>
          <div className="w-8 h-px bg-gold mx-auto my-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
          <p className="font-dm text-xs text-cream/80 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-400 delay-100">
            {product.description}
          </p>
        </div>

        {/* Tag */}
        {product.tag && (
          <div className="absolute top-4 left-4 bg-gold px-3 py-1">
            <span className="font-dm text-xs text-ink tracking-widest uppercase">
              {product.tag}
            </span>
          </div>
        )}
      </div>

      {/* Bottom info (always visible) */}
      <div className="pt-4 pb-2">
        <h3 className="font-cormorant text-xl text-ink group-hover:text-brown transition-colors duration-300">
          {product.name}
        </h3>
        <p className="font-dm text-xs text-ink/50 mt-1 tracking-widest uppercase">
          {product.category}
        </p>
      </div>
    </motion.article>
  );
}

export default function Creations() {
  const [active, setActive] = useState<Category>("Tout");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    active === "Tout"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <section id="créations" className="py-32 md:py-40 bg-cream-warm">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-dancing text-gold text-lg mb-3">Nos créations</p>
            <div className="gold-divider mb-8" />
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-cormorant font-light text-ink leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              L&apos;excellence du quotidien
            </motion.h2>

            {/* Filter tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filtrer les créations"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active === cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2 text-xs tracking-widest uppercase font-dm transition-all duration-300 border ${
                    active === cat
                      ? "bg-gold border-gold text-ink"
                      : "border-ink/20 text-ink/60 hover:border-gold/60 hover:text-gold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center font-playfair italic text-ink/40 text-sm mt-16"
        >
          Créations saisonnières disponibles selon les arrivages
        </motion.p>
      </div>
    </section>
  );
}
