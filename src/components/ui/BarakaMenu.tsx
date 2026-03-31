'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/',           label: 'Accueil',       num: '01' },
  { href: '/histoire',   label: 'Histoire',       num: '02' },
  { href: '/creations',  label: 'Créations',      num: '03' },
  { href: '/experience', label: "L'Expérience",   num: '04' },
  { href: '/adresses',   label: 'Adresses',       num: '05' },
];

const socials = [
  { label: '@baraka_boulangeries', href: 'https://instagram.com/baraka_boulangeries' },
  { label: '@bh.boulangeries',     href: 'https://tiktok.com/@bh.boulangeries' },
];

export default function BarakaMenu() {
  const pathname  = usePathname();
  const isOpen    = useRef(false);  // source of truth — no async desync

  const navRef     = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef    = useRef<HTMLDivElement>(null);
  const panelsRef  = useRef<HTMLDivElement[]>([]);

  const fadeRef    = useRef<HTMLElement[]>([]);
  const btnTextRef = useRef<HTMLParagraphElement[]>([]);
  const btnIconRef = useRef<HTMLDivElement>(null);
  const tlRef      = useRef<any>(null);

  // Close on route change
  useEffect(() => { if (isOpen.current) closeNav(); }, [pathname]);

  // Escape key
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen.current) closeNav(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  async function gsapReady() {
    const { gsap } = await import('gsap');
    const { CustomEase } = await import('gsap/CustomEase');
    gsap.registerPlugin(CustomEase);
    if (!CustomEase.get('main')) {
      CustomEase.create('main', '0.65, 0.01, 0.05, 0.99');
    }
    gsap.defaults({ ease: 'main', duration: 0.7 });
    return gsap;
  }

  const openNav = useCallback(async () => {
    if (isOpen.current) return;
    isOpen.current = true;

    const gsap = await gsapReady();
    const nav = navRef.current;
    if (!nav) return;

    document.body.style.overflow = 'hidden';
    if (tlRef.current) tlRef.current.kill();

    tlRef.current = gsap.timeline()
      .set(nav, { display: 'block' })
      .set(menuRef.current, { xPercent: 0 })
      .fromTo(btnTextRef.current, { yPercent: 0 }, { yPercent: -100, stagger: 0.15 })
      .fromTo(btnIconRef.current, { rotate: 0 }, { rotate: 45 }, '<')
      .fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
      .fromTo(panelsRef.current, { xPercent: 101 }, { xPercent: 0, stagger: 0.1, duration: 0.55 }, '<')
      
      .fromTo(fadeRef.current.filter(Boolean), { autoAlpha: 0, yPercent: 40 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04 }, '<+=0.15');
  }, []);

  const closeNav = useCallback(async () => {
    if (!isOpen.current) return;
    isOpen.current = false;

    const gsap = await gsapReady();
    const nav = navRef.current;
    if (!nav) return;

    document.body.style.overflow = '';
    if (tlRef.current) tlRef.current.kill();

    tlRef.current = gsap.timeline()
      .to(overlayRef.current, { autoAlpha: 0 })
      .to(menuRef.current, { xPercent: 120 }, '<')
      .to(btnTextRef.current, { yPercent: 0 }, '<')
      .to(btnIconRef.current, { rotate: 0 }, '<')
      .set(nav, { display: 'none' });
  }, []);

  function toggle() {
    isOpen.current ? closeNav() : openNav();
  }

  return (
    <>
      {/* ── HEADER ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 110,
        padding: '1.25rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        {/* Logo BH */}
        <Link href="/" style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 600,
          fontSize: '1.5rem', letterSpacing: '-0.01em', textDecoration: 'none',
          display: 'flex', alignItems: 'baseline',
        }}>
          <span style={{ color: '#1A1410' }}>B</span>
          <span style={{ color: '#E81C1C' }}>H</span>
        </Link>

        {/* Menu button */}
        <button onClick={toggle} style={{
          background: 'rgba(250,247,242,0.92)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(26,20,16,0.1)',
          borderRadius: '999px',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          padding: '0.55rem 1rem',
        }}>
          <div style={{ height: '1.1rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            {['Menu', 'Fermer'].map((t, i) => (
              <p key={t} ref={el => { if (el) btnTextRef.current[i] = el; }} style={{
                fontFamily: 'var(--font-dm-sans)', fontWeight: 400,
                fontSize: '0.82rem', letterSpacing: '0.1em', color: '#1A1410',
                lineHeight: 1.3, margin: 0, flexShrink: 0,
              }}>{t}</p>
            ))}
          </div>
          <div ref={btnIconRef} style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <rect x="6.33" width="1.33" height="14" rx="0.5" fill="#1A1410"/>
              <rect y="6.33" width="14" height="1.33" rx="0.5" fill="#1A1410"/>
            </svg>
          </div>
        </button>
      </header>

      {/* ── NAV OVERLAY ── */}
      <div ref={navRef} style={{ display: 'none', position: 'fixed', inset: 0, zIndex: 100 }}>

        {/* Dark overlay */}
        <div ref={overlayRef} onClick={closeNav} style={{
          position: 'absolute', inset: 0,
          background: 'rgba(26,20,16,0.55)', cursor: 'pointer',
        }} />

        {/* Menu panel */}
        <div ref={menuRef} style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: 'min(34rem, 100%)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Staggered bg panels */}
          <div style={{ position: 'absolute', inset: 0 }}>
            {['#E81C1C', '#FAF7F2', '#FAF7F2'].map((bg, i) => (
              <div key={i} ref={el => { if (el) panelsRef.current[i] = el; }} style={{
                position: 'absolute', inset: 0, background: bg,
                borderTopLeftRadius: '1.5rem', borderBottomLeftRadius: '1.5rem',
              }} />
            ))}
          </div>

          {/* Content */}
          <div style={{
            position: 'relative', zIndex: 1,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            height: '100%',
            padding: 'clamp(5rem,12vw,7rem) 2.5rem 2.5rem',
            overflowY: 'auto',
          }}>
            {/* Logo BH dans le panel */}
            <div style={{
              position: 'absolute', top: '1.5rem', left: '2.5rem',
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 600,
              fontSize: '1.5rem', display: 'flex', alignItems: 'baseline',
            }}>
              <span style={{ color: '#1A1410' }}>B</span>
              <span style={{ color: '#E81C1C' }}>H</span>
              <span style={{
                fontFamily: 'var(--font-dm-sans)', fontStyle: 'normal', fontWeight: 300,
                fontSize: '0.55rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(26,20,16,0.35)', marginLeft: '0.6rem',
              }}>Boulangerie</span>
            </div>

            {/* Nav links */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
              {navLinks.map((link, i) => (
                <li key={link.href} style={{ borderBottom: '1px solid rgba(26,20,16,0.08)', overflow: 'hidden' }}>
                  <Link
                    href={link.href}

                    onClick={closeNav}
                    style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', padding: '0.55rem 0', textDecoration: 'none', position: 'relative' }}
                    onMouseEnter={e => {
                      const bg = e.currentTarget.querySelector('.link-bg') as HTMLElement;
                      const heading = e.currentTarget.querySelector('.link-heading') as HTMLElement;
                      if (bg) bg.style.transform = 'scale3d(1,1,1)';
                      if (heading) {
                        heading.style.color = '#FAF7F2';
                        heading.style.transform = 'translateY(-1em)';
                      }
                    }}
                    onMouseLeave={e => {
                      const bg = e.currentTarget.querySelector('.link-bg') as HTMLElement;
                      const heading = e.currentTarget.querySelector('.link-heading') as HTMLElement;
                      if (bg) bg.style.transform = 'scale3d(1,0,1)';
                      if (heading) {
                        heading.style.color = '#1A1410';
                        heading.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    <div className="link-bg" style={{
                      position: 'absolute', inset: 0, background: '#1A1410',
                      transformOrigin: '50% 100%', transform: 'scale3d(1,0,1)',
                      transition: 'transform 0.55s cubic-bezier(0.65, 0.05, 0, 1)', zIndex: 0,
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-dm-sans)', fontWeight: 400, fontSize: '0.7rem',
                      color: '#E81C1C', letterSpacing: '0.1em', position: 'relative', zIndex: 1, minWidth: '2rem',
                    }}>{link.num}</span>
                    <span className="link-heading" style={{
                      fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300,
                      fontSize: 'clamp(2.6rem, 7vw, 4.2rem)', lineHeight: 0.9,
                      textTransform: 'uppercase', color: '#1A1410',
                      position: 'relative', zIndex: 1,
                      transition: 'transform 0.55s cubic-bezier(0.65, 0.05, 0, 1), color 0s',
                      letterSpacing: '-0.02em',
                      display: 'block',
                    }}>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div style={{ paddingTop: '2rem' }}>
              <p ref={el => { if (el) fadeRef.current[0] = el; }} style={{
                fontFamily: 'var(--font-dm-sans)', fontWeight: 400, fontSize: '0.62rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(26,20,16,0.4)', marginBottom: '0.75rem',
              }}>Réseaux</p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {socials.map((s, i) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                    ref={el => { if (el) fadeRef.current[i + 1] = el; }}
                    style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400, fontSize: '0.82rem', color: '#1A1410', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#E81C1C')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#1A1410')}
                  >{s.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
