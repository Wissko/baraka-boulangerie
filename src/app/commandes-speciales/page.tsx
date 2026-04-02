'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent } from 'react';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TYPES = [
  'Gateau de mariage',
  "Gateau d'anniversaire",
  'Autre occasion',
];

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans)',
  fontWeight: 300,
  fontSize: '0.58rem',
  letterSpacing: '0.32em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '0.75rem',
  transition: 'color 0.35s',
};

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().split('T')[0];
}

function isDateTooSoon(dateStr: string): boolean {
  if (!dateStr) return false;
  const chosen = new Date(dateStr);
  const min = new Date();
  min.setDate(min.getDate() + 14);
  min.setHours(0, 0, 0, 0);
  return chosen < min;
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '1px' }}>
      <circle cx="7.5" cy="7.5" r="6.5" stroke="#C9A96E" strokeWidth="0.9" />
      <path d="M7.5 4.2V7.5L9.8 8.9" stroke="#C9A96E" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AnimatedCheckmark() {
  return (
    <motion.svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: '0 auto 2.5rem', display: 'block' }}
    >
      <motion.circle
        cx="36"
        cy="36"
        r="33"
        stroke="#C9A96E"
        strokeWidth="0.8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      />
      <motion.path
        d="M22 36L30.5 44.5L50 26"
        stroke="#C9A96E"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.65, ease: EASE }}
      />
    </motion.svg>
  );
}

export default function CommandesSpecialesPage() {
  const [focused, setFocused] = useState<string | null>(null);
  const [type, setType] = useState(TYPES[0]);
  const [date, setDate] = useState('');
  const [personnes, setPersonnes] = useState('');
  const [description, setDescription] = useState('');
  const [allergies, setAllergies] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  const [dateError, setDateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  function handleDateChange(val: string) {
    setDate(val);
    setDateError(isDateTooSoon(val));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isDateTooSoon(date)) {
      setDateError(true);
      return;
    }
    setLoading(true);
    setServerError('');
    try {
      const res = await fetch('/api/commande-speciale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, date, personnes, description, allergies, prenom, nom, email, telephone }),
      });
      if (!res.ok) {
        const data = await res.json();
        setServerError(data.error || 'Une erreur est survenue.');
      } else {
        setSuccess(true);
      }
    } catch {
      setServerError('Une erreur reseau est survenue. Merci de reessayer.');
    } finally {
      setLoading(false);
    }
  }

  /* Progress step derived from form state */
  const formStep = (() => {
    if (description) return 3;
    if (date && personnes && !dateError) return 2;
    return 1;
  })();

  const inputBase: React.CSSProperties = {
    fontFamily: 'var(--font-dm-sans)',
    fontWeight: 300,
    fontSize: '0.9rem',
    color: '#1A1410',
    background: 'transparent',
    border: 'none',
    padding: '0.9rem 0',
    width: '100%',
    outline: 'none',
    letterSpacing: '0.03em',
  };

  function inputWrapperStyle(field: string, hasError = false): React.CSSProperties {
    const isFocused = focused === field;
    return {
      borderBottom: `1px solid ${hasError ? '#C41E3A' : isFocused ? '#C9A96E' : 'rgba(26,20,16,0.15)'}`,
      boxShadow: isFocused ? '0 1px 0 0 rgba(201,169,110,0.35)' : 'none',
      transition: 'border-color 0.4s, box-shadow 0.4s',
    };
  }

  const sectionHeaderStyle: React.CSSProperties = {
    fontFamily: 'var(--font-dm-sans)',
    fontWeight: 300,
    fontSize: '0.58rem',
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: 'rgba(26,20,16,0.35)',
    marginBottom: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const sectionNumberStyle: React.CSSProperties = {
    fontFamily: 'var(--font-cormorant)',
    fontStyle: 'italic',
    fontSize: '1.1rem',
    fontWeight: 400,
    color: '#C9A96E',
    letterSpacing: '0.05em',
    lineHeight: 1,
  };

  return (
    <main style={{ background: '#FAF7F2', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{
        background: '#1A1410',
        minHeight: '72vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(7rem, 15vw, 11rem) clamp(1.5rem, 7vw, 6rem) clamp(4rem, 7vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Top gold thin line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 1.4, ease: EASE }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.5) 30%, rgba(201,169,110,0.5) 70%, transparent 100%)',
            transformOrigin: 'left',
          }}
        />

        {/* Bottom gold line — more prominent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 1.3, ease: EASE }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1.5px',
            background: 'linear-gradient(90deg, #C9A96E 0%, rgba(201,169,110,0.6) 60%, transparent 100%)',
            transformOrigin: 'left',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.62rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: '1.5rem',
          }}
        >
          Baraka Boulangeries
        </motion.p>

        <div style={{ overflow: 'hidden', marginBottom: '0.5rem' }}>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 'clamp(4rem, 11vw, 8.5rem)',
              color: '#FAF7F2',
              letterSpacing: '-0.01em',
              lineHeight: 0.9,
              fontWeight: 400,
              whiteSpace: 'pre-line',
            }}
          >
            {'Sur\nMesure'}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
            color: 'rgba(201,169,110,0.75)',
            marginTop: '1.5rem',
            marginBottom: '0',
            fontWeight: 400,
            letterSpacing: '0.01em',
            lineHeight: 1.5,
          }}
        >
          L&apos;art de la creation unique, facon patisserie parisienne.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: EASE }}
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.82rem',
            color: 'rgba(250,247,242,0.45)',
            marginTop: '1.25rem',
            maxWidth: '480px',
            lineHeight: 1.8,
            letterSpacing: '0.02em',
          }}
        >
          Creations sur mesure pour vos moments les plus precieux. Chaque piece est concue en etroite collaboration avec notre atelier.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            right: 'clamp(1.5rem, 7vw, 6rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <div style={{ width: '1px', height: '20px', background: 'rgba(201,169,110,0.4)' }} />
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="rgba(201,169,110,0.5)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>

      </section>

      {/* ── FORM SECTION ── */}
      <section style={{
        maxWidth: '740px',
        margin: '0 auto',
        padding: 'clamp(3.5rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem) clamp(5rem, 11vw, 9rem)',
      }}>

        {/* ── Délai minimum notice ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
          style={{
            border: '1px solid rgba(201,169,110,0.45)',
            background: 'rgba(201,169,110,0.045)',
            padding: '1.4rem 1.75rem',
            marginBottom: '4rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
          }}
        >
          <ClockIcon />
          <div>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '0.58rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: '0.5rem',
            }}>
              Delai minimum
            </p>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '0.86rem',
              color: 'rgba(26,20,16,0.65)',
              lineHeight: 1.75,
              letterSpacing: '0.01em',
            }}>
              Nos creations sur mesure necessitent un delai minimum de{' '}
              <strong style={{ color: '#1A1410', fontWeight: 400 }}>14 jours</strong>{' '}
              avant la date de votre evenement.
            </p>
          </div>
        </motion.div>

        {/* ── SUCCESS STATE ── */}
        <AnimatePresence>
          {success && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.85, ease: EASE }}
              style={{
                textAlign: 'center',
                padding: 'clamp(3rem, 8vw, 6rem) 2rem',
              }}
            >
              <AnimatedCheckmark />

              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(2.2rem, 5.5vw, 3.2rem)',
                  color: '#1A1410',
                  fontWeight: 400,
                  marginBottom: '1.5rem',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                Demande transmise
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6, ease: EASE }}
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  color: 'rgba(26,20,16,0.55)',
                  lineHeight: 1.85,
                  maxWidth: '460px',
                  margin: '0 auto 2.5rem',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                }}
              >
                Votre demande a bien ete transmise. Nous reviendrons vers vous sous 48h pour confirmer la disponibilite et les details de votre creation.
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.3, duration: 0.9, ease: EASE }}
                style={{
                  width: '60px',
                  height: '1px',
                  background: '#C9A96E',
                  margin: '0 auto',
                  transformOrigin: 'center',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FORM ── */}
        {!success && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.75, ease: EASE }}
          >

            {/* Progress bar — 3 steps */}
            <div style={{
              display: 'flex',
              gap: '6px',
              marginBottom: '4rem',
              alignItems: 'center',
            }}>
              {[1, 2, 3].map((step) => (
                <div key={step} style={{ flex: 1, position: 'relative', height: '1px' }}>
                  <div style={{
                    width: '100%',
                    height: '1px',
                    background: 'rgba(26,20,16,0.1)',
                  }} />
                  <motion.div
                    animate={{ scaleX: formStep >= step ? 1 : 0 }}
                    initial={{ scaleX: step === 1 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: '#C9A96E',
                      transformOrigin: 'left',
                    }}
                  />
                </div>
              ))}
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 300,
                fontSize: '0.55rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(26,20,16,0.3)',
                whiteSpace: 'nowrap',
                marginLeft: '0.75rem',
              }}>
                {formStep} / 3
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

              {/* ── SECTION 1 : Votre creation ── */}
              <div style={{ marginBottom: '5rem' }}>
                <div style={{ ...sectionHeaderStyle, marginBottom: '2.5rem' }}>
                  <span style={sectionNumberStyle}>01</span>
                  <div style={{ flex: 1, height: '1px', background: '#C9A96E', opacity: 0.3 }} />
                  <span style={{ letterSpacing: '0.3em', fontSize: '0.55rem' }}>Votre creation</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

                  {/* Type de piece — radio */}
                  <div>
                    <label style={{ ...labelStyle, color: 'rgba(26,20,16,0.4)', marginBottom: '1.25rem' }}>
                      Type de piece
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {TYPES.map((t) => {
                        const isSelected = type === t;
                        return (
                          <label
                            key={t}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1.25rem',
                              cursor: 'pointer',
                              padding: '1rem 1.5rem',
                              border: `1px solid ${isSelected ? '#C9A96E' : 'rgba(26,20,16,0.1)'}`,
                              background: isSelected ? 'rgba(201,169,110,0.06)' : 'transparent',
                              transition: 'border-color 0.3s, background 0.3s',
                            }}
                          >
                            <div style={{
                              width: '14px',
                              height: '14px',
                              borderRadius: '50%',
                              border: `1px solid ${isSelected ? '#C41E3A' : 'rgba(26,20,16,0.25)'}`,
                              background: isSelected ? '#C41E3A' : 'transparent',
                              flexShrink: 0,
                              transition: 'all 0.25s',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              {isSelected && (
                                <div style={{
                                  width: '5px',
                                  height: '5px',
                                  borderRadius: '50%',
                                  background: '#FAF7F2',
                                }} />
                              )}
                            </div>
                            <input
                              type="radio"
                              name="type"
                              value={t}
                              checked={isSelected}
                              onChange={() => setType(t)}
                              style={{ display: 'none' }}
                            />
                            <span style={{
                              fontFamily: 'var(--font-dm-sans)',
                              fontWeight: isSelected ? 400 : 300,
                              fontSize: '0.92rem',
                              color: isSelected ? '#1A1410' : 'rgba(26,20,16,0.55)',
                              letterSpacing: '0.02em',
                              transition: 'color 0.25s, font-weight 0.25s',
                            }}>
                              {t}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label style={{ ...labelStyle, color: focused === 'date' ? '#C9A96E' : dateError ? '#C41E3A' : 'rgba(26,20,16,0.4)' }}>
                      Date souhaitee
                    </label>
                    <div style={inputWrapperStyle('date', dateError)}>
                      <input
                        type="date"
                        required
                        min={getMinDate()}
                        value={date}
                        onChange={(e) => handleDateChange(e.target.value)}
                        onFocus={() => setFocused('date')}
                        onBlur={() => setFocused(null)}
                        style={{
                          ...inputBase,
                          borderBottomColor: dateError ? '#C41E3A' : focused === 'date' ? '#C9A96E' : 'transparent',
                          colorScheme: 'light',
                        }}
                      />
                    </div>
                    {dateError && (
                      <p style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontWeight: 300,
                        fontSize: '0.76rem',
                        color: '#C41E3A',
                        marginTop: '0.6rem',
                        letterSpacing: '0.01em',
                        lineHeight: 1.6,
                      }}>
                        Nos creations sur mesure necessitent un delai minimum de 14 jours. Merci de choisir une date ulterieure.
                      </p>
                    )}
                  </div>

                  {/* Nombre de personnes */}
                  <div>
                    <label style={{ ...labelStyle, color: focused === 'personnes' ? '#C9A96E' : 'rgba(26,20,16,0.4)' }}>
                      Nombre de personnes
                    </label>
                    <div style={inputWrapperStyle('personnes')}>
                      <input
                        type="number"
                        min={10}
                        required
                        placeholder="Minimum 10 personnes"
                        value={personnes}
                        onChange={(e) => setPersonnes(e.target.value)}
                        onFocus={() => setFocused('personnes')}
                        onBlur={() => setFocused(null)}
                        style={{ ...inputBase }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Gold separator ── */}
              <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, #C9A96E 0%, rgba(201,169,110,0.2) 100%)',
                marginBottom: '5rem',
                opacity: 0.5,
              }} />

              {/* ── SECTION 2 : Votre vision ── */}
              <div style={{ marginBottom: '5rem' }}>
                <div style={{ ...sectionHeaderStyle, marginBottom: '2.5rem' }}>
                  <span style={sectionNumberStyle}>02</span>
                  <div style={{ flex: 1, height: '1px', background: '#C9A96E', opacity: 0.3 }} />
                  <span style={{ letterSpacing: '0.3em', fontSize: '0.55rem' }}>Votre vision</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

                  {/* Description */}
                  <div>
                    <label style={{ ...labelStyle, color: focused === 'description' ? '#C9A96E' : 'rgba(26,20,16,0.4)' }}>
                      Description et vision
                    </label>
                    <div style={{
                      ...inputWrapperStyle('description'),
                      borderBottom: `1px solid ${focused === 'description' ? '#C9A96E' : 'rgba(26,20,16,0.15)'}`,
                      boxShadow: focused === 'description' ? '0 1px 0 0 rgba(201,169,110,0.35)' : 'none',
                      transition: 'border-color 0.4s, box-shadow 0.4s',
                    }}>
                      <textarea
                        required
                        rows={5}
                        placeholder="Ex : Gateau a etages, fleurs en sucre, couleurs ivoire et rose..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onFocus={() => setFocused('description')}
                        onBlur={() => setFocused(null)}
                        style={{
                          ...inputBase,
                          border: 'none',
                          resize: 'none',
                          lineHeight: 1.85,
                        }}
                      />
                    </div>
                  </div>

                  {/* Allergies */}
                  <div>
                    <label style={{ ...labelStyle, color: focused === 'allergies' ? '#C9A96E' : 'rgba(26,20,16,0.4)' }}>
                      Allergies ou contraintes{' '}
                      <span style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontWeight: 300,
                        fontSize: '0.55rem',
                        letterSpacing: '0.15em',
                        color: 'rgba(26,20,16,0.28)',
                        marginLeft: '0.6rem',
                        textTransform: 'none',
                      }}>
                        Facultatif
                      </span>
                    </label>
                    <div style={{
                      borderBottom: `1px solid ${focused === 'allergies' ? '#C9A96E' : 'rgba(26,20,16,0.15)'}`,
                      boxShadow: focused === 'allergies' ? '0 1px 0 0 rgba(201,169,110,0.35)' : 'none',
                      transition: 'border-color 0.4s, box-shadow 0.4s',
                    }}>
                      <textarea
                        rows={3}
                        placeholder="Intolerances, restrictions alimentaires..."
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                        onFocus={() => setFocused('allergies')}
                        onBlur={() => setFocused(null)}
                        style={{
                          ...inputBase,
                          border: 'none',
                          resize: 'none',
                          lineHeight: 1.85,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Gold separator ── */}
              <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, #C9A96E 0%, rgba(201,169,110,0.2) 100%)',
                marginBottom: '5rem',
                opacity: 0.5,
              }} />

              {/* ── SECTION 3 : Vos coordonnees ── */}
              <div style={{ marginBottom: '4.5rem' }}>
                <div style={{ ...sectionHeaderStyle, marginBottom: '2.5rem' }}>
                  <span style={sectionNumberStyle}>03</span>
                  <div style={{ flex: 1, height: '1px', background: '#C9A96E', opacity: 0.3 }} />
                  <span style={{ letterSpacing: '0.3em', fontSize: '0.55rem' }}>Vos coordonnees</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

                  {/* Prenom + Nom */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2.5rem',
                  }}>
                    <div>
                      <label style={{ ...labelStyle, color: focused === 'prenom' ? '#C9A96E' : 'rgba(26,20,16,0.4)' }}>
                        Prenom
                      </label>
                      <div style={inputWrapperStyle('prenom')}>
                        <input
                          type="text"
                          required
                          value={prenom}
                          onChange={(e) => setPrenom(e.target.value)}
                          onFocus={() => setFocused('prenom')}
                          onBlur={() => setFocused(null)}
                          style={{ ...inputBase }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ ...labelStyle, color: focused === 'nom' ? '#C9A96E' : 'rgba(26,20,16,0.4)' }}>
                        Nom
                      </label>
                      <div style={inputWrapperStyle('nom')}>
                        <input
                          type="text"
                          required
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                          onFocus={() => setFocused('nom')}
                          onBlur={() => setFocused(null)}
                          style={{ ...inputBase }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ ...labelStyle, color: focused === 'email' ? '#C9A96E' : 'rgba(26,20,16,0.4)' }}>
                      Adresse email
                    </label>
                    <div style={inputWrapperStyle('email')}>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        style={{ ...inputBase }}
                      />
                    </div>
                  </div>

                  {/* Telephone */}
                  <div>
                    <label style={{ ...labelStyle, color: focused === 'telephone' ? '#C9A96E' : 'rgba(26,20,16,0.4)' }}>
                      Telephone
                    </label>
                    <div style={inputWrapperStyle('telephone')}>
                      <input
                        type="tel"
                        required
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        onFocus={() => setFocused('telephone')}
                        onBlur={() => setFocused(null)}
                        style={{ ...inputBase }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Server error */}
              {serverError && (
                <p style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 300,
                  fontSize: '0.82rem',
                  color: '#C41E3A',
                  marginBottom: '2rem',
                  letterSpacing: '0.01em',
                  lineHeight: 1.6,
                }}>
                  {serverError}
                </p>
              )}

              {/* ── SUBMIT ── */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 300,
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    color: '#FAF7F2',
                    background: loading ? 'rgba(196,30,58,0.55)' : '#C41E3A',
                    border: 'none',
                    padding: '1.2rem 3.5rem',
                    cursor: loading ? 'wait' : 'pointer',
                    transition: 'background 0.35s, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    letterSpacing: '0.28em',
                  }}
                  onMouseEnter={e => {
                    if (!loading) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = '#9e1830';
                      el.style.transform = 'translateY(-3px)';
                      el.style.boxShadow = '0 12px 32px rgba(196,30,58,0.22)';
                    }
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = loading ? 'rgba(196,30,58,0.55)' : '#C41E3A';
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{
                        display: 'inline-block',
                        width: '11px',
                        height: '11px',
                        border: '1px solid rgba(250,247,242,0.35)',
                        borderTopColor: '#FAF7F2',
                        borderRadius: '50%',
                        animation: 'spin 0.7s linear infinite',
                      }} />
                      Envoi en cours
                    </>
                  ) : 'Envoyer ma demande'}
                </button>

                <p style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 300,
                  fontSize: '0.72rem',
                  color: 'rgba(26,20,16,0.3)',
                  letterSpacing: '0.01em',
                  lineHeight: 1.6,
                  maxWidth: '260px',
                }}>
                  Reponse sous 48h. Aucun engagement avant confirmation.
                </p>
              </div>

            </form>
          </motion.div>
        )}

      </section>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.35;
          cursor: pointer;
          filter: sepia(1) hue-rotate(5deg);
        }
        input::placeholder,
        textarea::placeholder {
          color: rgba(26,20,16,0.22);
          font-weight: 300;
          font-family: var(--font-dm-sans);
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          opacity: 0.25;
        }
        textarea {
          font-family: var(--font-dm-sans);
          font-weight: 300;
          font-size: 0.9rem;
          color: #1A1410;
          background: transparent;
          border: none;
          padding: 0.9rem 0;
          width: 100%;
          outline: none;
          letter-spacing: 0.03em;
        }
      `}</style>
    </main>
  );
}
