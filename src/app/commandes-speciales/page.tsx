'use client';

import { motion } from 'framer-motion';
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
  fontSize: '0.6rem',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '0.3rem',
  transition: 'color 0.3s',
};

const inputBase: React.CSSProperties = {
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

  return (
    <main style={{ background: '#FAF7F2', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{
        background: '#1A1410',
        minHeight: '55vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(6rem, 15vw, 10rem) clamp(1.5rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1.1, ease: EASE }}
          style={{
            position: 'absolute',
            bottom: '0',
            left: 0,
            right: 0,
            height: '1px',
            background: 'rgba(201,169,110,0.2)',
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
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: '1.25rem',
          }}
        >
          Baraka Boulangeries
        </motion.p>

        <div style={{ overflow: 'hidden', marginBottom: '0.25rem' }}>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
              color: '#FAF7F2',
              letterSpacing: '-0.01em',
              lineHeight: 0.92,
              fontWeight: 400,
              whiteSpace: 'pre-line',
            }}
          >
            {'Commandes\nSpeciales'}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.85rem',
            color: 'rgba(250,247,242,0.55)',
            marginTop: '1.5rem',
            maxWidth: '460px',
            lineHeight: 1.7,
            letterSpacing: '0.02em',
          }}
        >
          Creations sur mesure pour vos moments les plus precieux. Chaque gateau est concu en collaboration etroite avec notre equipe.
        </motion.p>
      </section>

      {/* ── FORM SECTION ── */}
      <section style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 10vw, 8rem)',
      }}>

        {/* Délai minimum — notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
          style={{
            borderLeft: '2px solid #C9A96E',
            paddingLeft: '1.25rem',
            marginBottom: '3.5rem',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: '0.5rem',
          }}>
            Delai minimum
          </p>
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 300,
            fontSize: '0.88rem',
            color: 'rgba(26,20,16,0.65)',
            lineHeight: 1.7,
            letterSpacing: '0.01em',
          }}>
            Nos creations sur mesure necessitent un delai minimum de <strong style={{ color: '#1A1410', fontWeight: 400 }}>14 jours</strong> avant la date de votre evenement.
          </p>
        </motion.div>

        {/* SUCCESS STATE */}
        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
            }}
          >
            <div style={{
              width: '48px',
              height: '1px',
              background: '#C9A96E',
              margin: '0 auto 2rem',
            }} />
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#1A1410',
              fontWeight: 400,
              marginBottom: '1.25rem',
              lineHeight: 1.1,
            }}>
              Demande transmise
            </h2>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              fontSize: '0.9rem',
              color: 'rgba(26,20,16,0.65)',
              lineHeight: 1.8,
              maxWidth: '480px',
              margin: '0 auto',
              letterSpacing: '0.02em',
            }}>
              Votre demande a bien ete transmise. Nous reviendrons vers vous sous 48h pour confirmer la disponibilite.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
          >

            {/* ── SECTION 1 : Votre creation ── */}
            <div style={{ marginBottom: '3rem' }}>
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 300,
                fontSize: '0.58rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(26,20,16,0.35)',
                marginBottom: '2rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(26,20,16,0.08)',
              }}>
                01 — Votre creation
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {/* Type de piece */}
                <div>
                  <label style={{ ...labelStyle, color: 'rgba(26,20,16,0.45)', marginBottom: '1rem' }}>
                    Type de piece
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {TYPES.map((t) => (
                      <label
                        key={t}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.9rem',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: `1px solid ${type === t ? '#C41E3A' : 'rgba(26,20,16,0.25)'}`,
                          background: type === t ? '#C41E3A' : 'transparent',
                          flexShrink: 0,
                          transition: 'all 0.25s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {type === t && (
                            <div style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: '#FAF7F2',
                            }} />
                          )}
                        </div>
                        <input
                          type="radio"
                          name="type"
                          value={t}
                          checked={type === t}
                          onChange={() => setType(t)}
                          style={{ display: 'none' }}
                        />
                        <span style={{
                          fontFamily: 'var(--font-dm-sans)',
                          fontWeight: 300,
                          fontSize: '0.88rem',
                          color: type === t ? '#1A1410' : 'rgba(26,20,16,0.6)',
                          letterSpacing: '0.02em',
                          transition: 'color 0.25s',
                        }}>
                          {t}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label style={{ ...labelStyle, color: focused === 'date' ? '#C41E3A' : dateError ? '#C41E3A' : 'rgba(26,20,16,0.45)' }}>
                    Date souhaitee
                  </label>
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
                      borderBottomColor: dateError ? '#C41E3A' : focused === 'date' ? '#C41E3A' : 'rgba(26,20,16,0.2)',
                      colorScheme: 'light',
                    }}
                  />
                  {dateError && (
                    <p style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontWeight: 300,
                      fontSize: '0.78rem',
                      color: '#C41E3A',
                      marginTop: '0.5rem',
                      letterSpacing: '0.01em',
                      lineHeight: 1.5,
                    }}>
                      Nos creations sur mesure necessitent un delai minimum de 14 jours. Merci de choisir une date ulterieure.
                    </p>
                  )}
                </div>

                {/* Nombre de personnes */}
                <div>
                  <label style={{ ...labelStyle, color: focused === 'personnes' ? '#C41E3A' : 'rgba(26,20,16,0.45)' }}>
                    Nombre de personnes
                  </label>
                  <input
                    type="number"
                    min={10}
                    required
                    placeholder="Minimum 10 personnes"
                    value={personnes}
                    onChange={(e) => setPersonnes(e.target.value)}
                    onFocus={() => setFocused('personnes')}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputBase,
                      borderBottomColor: focused === 'personnes' ? '#C41E3A' : 'rgba(26,20,16,0.2)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── SECTION 2 : Votre vision ── */}
            <div style={{ marginBottom: '3rem' }}>
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 300,
                fontSize: '0.58rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(26,20,16,0.35)',
                marginBottom: '2rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(26,20,16,0.08)',
              }}>
                02 — Votre vision
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {/* Description */}
                <div>
                  <label style={{ ...labelStyle, color: focused === 'description' ? '#C41E3A' : 'rgba(26,20,16,0.45)' }}>
                    Description / vision
                  </label>
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
                      borderBottom: `1px solid ${focused === 'description' ? '#C41E3A' : 'rgba(26,20,16,0.2)'}`,
                      resize: 'none',
                      lineHeight: 1.8,
                    }}
                  />
                </div>

                {/* Allergies */}
                <div>
                  <label style={{ ...labelStyle, color: focused === 'allergies' ? '#C41E3A' : 'rgba(26,20,16,0.45)' }}>
                    Allergies ou contraintes
                    <span style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontWeight: 300,
                      fontSize: '0.58rem',
                      letterSpacing: '0.15em',
                      color: 'rgba(26,20,16,0.3)',
                      marginLeft: '0.6rem',
                      textTransform: 'none',
                    }}>
                      Facultatif
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Intolerances, restrictions alimentaires..."
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    onFocus={() => setFocused('allergies')}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputBase,
                      borderBottom: `1px solid ${focused === 'allergies' ? '#C41E3A' : 'rgba(26,20,16,0.2)'}`,
                      resize: 'none',
                      lineHeight: 1.8,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── SECTION 3 : Vos coordonnees ── */}
            <div style={{ marginBottom: '3.5rem' }}>
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 300,
                fontSize: '0.58rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(26,20,16,0.35)',
                marginBottom: '2rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(26,20,16,0.08)',
              }}>
                03 — Vos coordonnees
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {/* Prenom + Nom */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '2rem',
                }}>
                  <div>
                    <label style={{ ...labelStyle, color: focused === 'prenom' ? '#C41E3A' : 'rgba(26,20,16,0.45)' }}>
                      Prenom
                    </label>
                    <input
                      type="text"
                      required
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      onFocus={() => setFocused('prenom')}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...inputBase,
                        borderBottomColor: focused === 'prenom' ? '#C41E3A' : 'rgba(26,20,16,0.2)',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ ...labelStyle, color: focused === 'nom' ? '#C41E3A' : 'rgba(26,20,16,0.45)' }}>
                      Nom
                    </label>
                    <input
                      type="text"
                      required
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      onFocus={() => setFocused('nom')}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...inputBase,
                        borderBottomColor: focused === 'nom' ? '#C41E3A' : 'rgba(26,20,16,0.2)',
                      }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={{ ...labelStyle, color: focused === 'email' ? '#C41E3A' : 'rgba(26,20,16,0.45)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputBase,
                      borderBottomColor: focused === 'email' ? '#C41E3A' : 'rgba(26,20,16,0.2)',
                    }}
                  />
                </div>

                {/* Telephone */}
                <div>
                  <label style={{ ...labelStyle, color: focused === 'telephone' ? '#C41E3A' : 'rgba(26,20,16,0.45)' }}>
                    Telephone
                  </label>
                  <input
                    type="tel"
                    required
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    onFocus={() => setFocused('telephone')}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputBase,
                      borderBottomColor: focused === 'telephone' ? '#C41E3A' : 'rgba(26,20,16,0.2)',
                    }}
                  />
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
                marginBottom: '1.5rem',
                letterSpacing: '0.01em',
                lineHeight: 1.5,
              }}>
                {serverError}
              </p>
            )}

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 300,
                  fontSize: '0.7rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#FAF7F2',
                  background: loading ? 'rgba(196,30,58,0.6)' : '#C41E3A',
                  border: 'none',
                  padding: '1.1rem 3rem',
                  cursor: loading ? 'wait' : 'pointer',
                  transition: 'background 0.3s, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
                onMouseEnter={e => {
                  if (!loading) {
                    (e.currentTarget as HTMLElement).style.background = '#9e1830';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = loading ? 'rgba(196,30,58,0.6)' : '#C41E3A';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                {loading ? (
                  <>
                    <span style={{
                      display: 'inline-block',
                      width: '12px',
                      height: '12px',
                      border: '1.5px solid rgba(250,247,242,0.35)',
                      borderTopColor: '#FAF7F2',
                      borderRadius: '50%',
                      animation: 'spin 0.7s linear infinite',
                    }} />
                    Envoi en cours
                  </>
                ) : 'Envoyer ma demande'}
              </button>
            </div>

          </motion.form>
        )}

      </section>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.4;
          cursor: pointer;
        }
        input::placeholder, textarea::placeholder {
          color: rgba(26,20,16,0.25);
          font-weight: 300;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          opacity: 0.3;
        }
      `}</style>
    </main>
  );
}
