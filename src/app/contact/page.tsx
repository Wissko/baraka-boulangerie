'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

const inputStyle = {
  fontFamily: 'var(--font-dm-sans)',
  fontWeight: 300,
  fontSize: '0.9rem',
  color: '#1A1410',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(26,20,16,0.2)',
  padding: '0.8rem 0',
  width: '100%',
  outline: 'none',
  letterSpacing: '0.03em',
  transition: 'border-color 0.3s',
};

export default function ContactPage() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <main style={{ background: '#FAF7F2', minHeight: '100vh', paddingTop: '140px', paddingBottom: '120px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Titre */}
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
            color: '#E81C1C',
            marginBottom: '1rem',
          }}
        >
          Baraka Boulangeries
        </motion.p>

        <div style={{ overflow: 'hidden', marginBottom: '0.5rem' }}>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              color: '#1A1410',
              letterSpacing: '0.04em',
              lineHeight: 1,
              fontWeight: 400,
            }}
          >
            Nous Contacter
          </motion.h1>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          style={{
            width: '48px',
            height: '1px',
            background: '#E81C1C',
            marginBottom: '3rem',
            transformOrigin: 'left',
          }}
        />

        {/* Formulaire */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Nom */}
          <div>
            <label style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: focused === 'nom' ? '#E81C1C' : 'rgba(26,20,16,0.45)',
              display: 'block',
              marginBottom: '0.3rem',
              transition: 'color 0.3s',
            }}>
              Nom
            </label>
            <input
              type="text"
              style={{
                ...inputStyle,
                borderBottomColor: focused === 'nom' ? '#E81C1C' : 'rgba(26,20,16,0.2)',
              }}
              onFocus={() => setFocused('nom')}
              onBlur={() => setFocused(null)}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: focused === 'email' ? '#E81C1C' : 'rgba(26,20,16,0.45)',
              display: 'block',
              marginBottom: '0.3rem',
              transition: 'color 0.3s',
            }}>
              Email
            </label>
            <input
              type="email"
              style={{
                ...inputStyle,
                borderBottomColor: focused === 'email' ? '#E81C1C' : 'rgba(26,20,16,0.2)',
              }}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
            />
          </div>

          {/* Message */}
          <div>
            <label style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: focused === 'message' ? '#E81C1C' : 'rgba(26,20,16,0.45)',
              display: 'block',
              marginBottom: '0.3rem',
              transition: 'color 0.3s',
            }}>
              Message
            </label>
            <textarea
              rows={5}
              style={{
                ...inputStyle,
                borderBottom: `1px solid ${focused === 'message' ? '#E81C1C' : 'rgba(26,20,16,0.2)'}`,
                resize: 'none',
                lineHeight: 1.8,
              }}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              alignSelf: 'flex-start',
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#FAF7F2',
              background: '#1A1410',
              border: 'none',
              padding: '1rem 2.5rem',
              cursor: 'pointer',
              transition: 'background 0.3s, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#E81C1C';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#1A1410';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Envoyer
          </button>
        </motion.form>

        {/* Séparateur */}
        <div style={{ borderTop: '1px solid rgba(26,20,16,0.08)', margin: '5rem 0 3rem' }} />

        {/* Réseaux sociaux */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(26,20,16,0.4)',
            marginBottom: '1.5rem',
          }}>
            Suivez-nous
          </p>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Instagram', handle: '@baraka_boulangeries', href: 'https://instagram.com/baraka_boulangeries' },
              { label: 'TikTok', handle: '@bh.boulangeries', href: 'https://tiktok.com/@bh.boulangeries' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <span style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 300,
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(26,20,16,0.4)',
                  display: 'block',
                  marginBottom: '0.3rem',
                }}>
                  {s.label}
                </span>
                <span style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontStyle: 'italic',
                  fontSize: '1.2rem',
                  color: '#E81C1C',
                  letterSpacing: '0.03em',
                }}>
                  {s.handle}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
