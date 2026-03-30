'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/histoire', label: 'Histoire' },
  { href: '/creations', label: 'Créations' },
  { href: '/experience', label: "L'Expérience" },
  { href: '/adresses', label: 'Adresses' },
  { href: '/contact', label: 'Contact' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BarakaMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [open]);

  return (
    <>
      {/* ── TRIGGER — languette gauche ── */}
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        animate={{ opacity: open ? 0 : 1, pointerEvents: open ? 'none' : 'auto' }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          zIndex: 200,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(26, 20, 16, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '0 20px 20px 0',
          padding: '20px 14px',
          boxShadow: '4px 0 24px rgba(26,20,16,0.15)',
          border: 'none',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {/* B. logo */}
        <span style={{
          fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: '18px',
          color: '#C9A96E',
          lineHeight: 1,
        }}>B.</span>

        {/* Separator */}
        <span style={{ display: 'block', width: '1px', height: '1px', background: 'rgba(201,169,110,0.3)' }} />

        {/* Menu — vertical writing */}
        <span style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '8px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(250,247,242,0.65)',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
        }}>Menu</span>

        {/* Hamburger */}
        <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ display: 'block', height: '1.5px', width: '16px', background: 'rgba(250,247,242,0.7)' }} />
          <span style={{ display: 'block', height: '1.5px', width: '10px', background: 'rgba(250,247,242,0.7)' }} />
        </span>
      </motion.button>

      {/* ── OVERLAY — plein écran sombre ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="baraka-menu-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.48, ease: EASE }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 190,
              backgroundColor: '#1A1410',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
            onClick={() => setOpen(false)}
          >
            {/* Grain subtil */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px',
              opacity: 0.03,
              pointerEvents: 'none',
            }} />

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              style={{
                position: 'absolute',
                top: '1.1rem',
                right: '1.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                zIndex: 10,
              }}
            >
              <span style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 400,
                fontSize: '0.55rem',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'rgba(250,247,242,0.4)',
              }}>Fermer</span>
              {/* X SVG */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <line x1="1" y1="1" x2="13" y2="13" stroke="rgba(250,247,242,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="13" y1="1" x2="1" y2="13" stroke="rgba(250,247,242,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Home link — top left */}
            <Link
              href="/"
              style={{
                position: 'absolute',
                top: '1.2rem',
                left: '1.5rem',
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                fontSize: '1.4rem',
                color: '#C9A96E',
                letterSpacing: '0.06em',
                zIndex: 10,
              }}
              onClick={() => setOpen(false)}
            >
              Baraka
            </Link>

            {/* Nav links */}
            <nav
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
                padding: 'clamp(5rem, 12vw, 8rem) clamp(1.5rem, 8vw, 5rem) clamp(3rem, 8vw, 5rem)',
              }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.07 * i + 0.12, duration: 0.42, ease: EASE }}
                  style={{ borderBottom: '1px solid rgba(201,169,110,0.1)' }}
                >
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontStyle: 'italic',
                      fontWeight: 300,
                      display: 'block',
                      fontSize: 'clamp(2.8rem, 9vw, 6.5rem)',
                      lineHeight: 1.15,
                      padding: 'clamp(0.6rem, 1.8vw, 1rem) 0',
                      color: pathname === link.href ? '#C9A96E' : '#FAF7F2',
                      transition: 'color 0.15s',
                      letterSpacing: '0.02em',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C9A96E')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = pathname === link.href ? '#C9A96E' : '#FAF7F2')}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom info */}
            <div
              style={{
                padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 8vw, 5rem)',
                borderTop: '1px solid rgba(201,169,110,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 300,
                fontSize: '0.75rem',
                color: 'rgba(250,247,242,0.35)',
                lineHeight: 1.8,
                letterSpacing: '0.05em',
              }}>
                <p>Argenteuil · Conflans · Herblay</p>
                <p>Beauchamp · Île-de-France</p>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {[
                  { label: '@baraka_boulangeries', href: 'https://instagram.com/baraka_boulangeries' },
                  { label: '@bh.boulangeries', href: 'https://tiktok.com/@bh.boulangeries' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontWeight: 300,
                      fontSize: '0.7rem',
                      color: '#C9A96E',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
