'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const leftLinks = [
  { href: '/histoire', label: 'Histoire' },
  { href: '/creations', label: 'Créations' },
];

const rightLinks = [
  { href: '/experience', label: "L'Expérience" },
  { href: '/adresses', label: 'Adresses' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHero = pathname === '/';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHero
            ? 'nav-blur bg-[#FAF7F2]/90 border-b border-[#C9A96E]/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          {/* Left links */}
          <div className="hidden md:flex items-center gap-10">
            {leftLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} scrolled={scrolled} isHero={isHero} />
            ))}
          </div>

          {/* Logo centered */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/">
              <span
                className={`font-[var(--font-cormorant)] italic text-3xl tracking-[0.1em] transition-colors duration-300 ${
                  scrolled || !isHero ? 'text-[#1A1410]' : 'text-white'
                }`}
              >
                Baraka
              </span>
            </Link>
          </div>

          {/* Right links */}
          <div className="hidden md:flex items-center gap-10">
            {rightLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} scrolled={scrolled} isHero={isHero} />
            ))}
          </div>

          {/* Burger */}
          <button
            className="md:hidden ml-auto flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-px transition-all duration-300 ${
                scrolled || !isHero ? 'bg-[#1A1410]' : 'bg-white'
              } ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 ${
                scrolled || !isHero ? 'bg-[#1A1410]' : 'bg-white'
              } ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 ${
                scrolled || !isHero ? 'bg-[#1A1410]' : 'bg-white'
              } ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#1A1410] flex flex-col items-center justify-center"
          >
            {[...leftLinks, ...rightLinks].map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className="block py-4 text-center font-[var(--font-cormorant)] text-4xl text-[#FAF7F2] tracking-[0.1em] hover:text-[#C9A96E] transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  label,
  scrolled,
  isHero,
}: {
  href: string;
  label: string;
  scrolled: boolean;
  isHero: boolean;
}) {
  return (
    <Link href={href} className="relative group">
      <span
        className={`font-[var(--font-dm-sans)] text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
          scrolled || !isHero ? 'text-[#1A1410]' : 'text-white/90'
        } group-hover:text-[#C9A96E]`}
      >
        {label}
      </span>
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A96E] transition-all duration-400 group-hover:w-full" />
    </Link>
  );
}
