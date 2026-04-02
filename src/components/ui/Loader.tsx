"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE_LUXURY = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE_LUXURY }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: "#1A1410" }}
        >
          {/* Subtle grain overlay */}
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
              animate={{ width: 48, opacity: 0.4 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE_LUXURY }}
            />

            {/* Baraka SVG stroke draw */}
            <div className="mt-8 mb-2">
              <svg viewBox="0 0 260 60" className="w-52 md:w-64" fill="none">
                {/* "BARAKA" stroke draw */}
                <motion.text
                  x="130"
                  y="32"
                  textAnchor="middle"
                  fontFamily="var(--font-cormorant), Georgia, serif"
                  fontSize="30"
                  fontWeight="300"
                  letterSpacing="12"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="0.6"
                  initial={{ strokeDasharray: 800, strokeDashoffset: 800 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  BARAKA
                </motion.text>

                {/* Fill in after stroke */}
                <motion.text
                  x="130"
                  y="32"
                  textAnchor="middle"
                  fontFamily="var(--font-cormorant), Georgia, serif"
                  fontSize="30"
                  fontWeight="300"
                  letterSpacing="12"
                  fill="#C9A96E"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  BARAKA
                </motion.text>
              </svg>
            </div>

            {/* Subtitle */}
            <motion.p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(201, 169, 110, 0.3)",
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8, ease: EASE_LUXURY }}
            >
              Boulangerie artisanale
            </motion.p>

            {/* Bottom gold line */}
            <motion.div
              className="h-px mt-8"
              style={{ backgroundColor: "#C9A96E" }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 48, opacity: 0.4 }}
              transition={{ duration: 1, delay: 2, ease: EASE_LUXURY }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
