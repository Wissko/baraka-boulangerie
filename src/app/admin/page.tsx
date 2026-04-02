'use client';

import { useState } from 'react';
import Dashboard from './Dashboard';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
    } else {
      setError('Mot de passe incorrect.');
    }
    setLoading(false);
  }

  if (authed) return <Dashboard />;

  return (
    <div style={{
      minHeight: '100vh', background: '#FAF7F2',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-dm-sans)',
    }}>
      <div style={{
        background: '#fff', border: '1px solid rgba(26,20,16,0.1)',
        borderRadius: 4, padding: '3rem 3.5rem', width: '100%', maxWidth: 420,
        boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/images/Design sans titre.svg" alt="Baraka" style={{ width: 56, height: 56, objectFit: 'contain' }} />
          <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1.1rem', color: '#1A1410', marginTop: 8, letterSpacing: '0.05em' }}>Espace administration</p>
        </div>

        <div style={{ width: 32, height: 1, background: '#C9A96E', margin: '0 auto 2rem' }} />

        <form onSubmit={handleLogin}>
          <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,20,16,0.5)', marginBottom: 8 }}>
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            style={{
              width: '100%', padding: '0.75rem 0',
              background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26,20,16,0.2)',
              outline: 'none', fontSize: '0.95rem', color: '#1A1410',
              fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.05em',
              marginBottom: '1.5rem',
            }}
          />
          {error && <p style={{ color: '#E81C1C', fontSize: '0.75rem', marginBottom: '1rem' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '0.85rem',
              background: '#1A1410', color: '#FAF7F2',
              border: 'none', borderRadius: 2, cursor: 'pointer',
              fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
