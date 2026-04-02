"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const EASE_LUXURY = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE_LUXURY }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: "#1A1410" }}
        >
          {/* Grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />

          <div className="flex flex-col items-center relative z-10">
            {/* Top gold line */}
            <motion.div
              className="h-px"
              style={{ backgroundColor: "#C9A96E" }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 48, opacity: 0.35 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE_LUXURY }}
            />

            {/* Logo circle with glow */}
            <motion.div
              className="mt-10 mb-6 relative"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: EASE_LUXURY }}
            >
              {/* Soft glow behind logo */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
                  transform: "scale(1.6)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              />
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden">
                <Image
                  src="/images/logo.jpg"
                  alt="Baraka"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* BARAKA text — stroke draw */}
            <div className="mb-2">
              <svg viewBox="0 0 260 40" className="w-48 md:w-56" fill="none">
                <motion.text
                  x="130"
                  y="28"
                  textAnchor="middle"
                  fontFamily="var(--font-cormorant), Georgia, serif"
                  fontSize="24"
                  fontWeight="300"
                  letterSpacing="14"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="0.5"
                  initial={{ strokeDasharray: 600, strokeDashoffset: 600 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
                >
                  BARAKA
                </motion.text>
                <motion.text
                  x="130"
                  y="28"
                  textAnchor="middle"
                  fontFamily="var(--font-cormorant), Georgia, serif"
                  fontSize="24"
                  fontWeight="300"
                  letterSpacing="14"
                  fill="#C9A96E"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2 }}
                >
                  BARAKA
                </motion.text>
              </svg>
            </div>

            {/* Subtitle */}
            <motion.p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.5rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(201, 169, 110, 0.25)",
              }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.2, ease: EASE_LUXURY }}
            >
              Boulangerie artisanale
            </motion.p>

            {/* Bottom gold line */}
            <motion.div
              className="h-px mt-8"
              style={{ backgroundColor: "#C9A96E" }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 48, opacity: 0.35 }}
              transition={{ duration: 1, delay: 2.4, ease: EASE_LUXURY }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
