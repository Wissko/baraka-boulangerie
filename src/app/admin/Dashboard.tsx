'use client';

import { useEffect, useState } from 'react';
import type { Commande } from '@/lib/supabase';

const STATUT_LABEL: Record<string, string> = {
  en_attente: 'En attente',
  acceptee: 'Acceptée',
  refusee: 'Refusée',
};

const STATUT_COLOR: Record<string, string> = {
  en_attente: '#C4954A',
  acceptee: '#2D6A2D',
  refusee: '#E81C1C',
};

// Données fictives pour la démo
const FAKE_COMMANDES: Commande[] = [
  {
    id: '1',
    created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
    type: 'Gateau de mariage',
    date_evenement: '2026-06-14',
    personnes: '80',
    description: 'Gâteau 3 étages, thème floral blanc et or, saveur framboise et vanille. Inscription "Sophie & Thomas".',
    allergies: 'Pas de gluten pour 2 personnes',
    prenom: 'Sophie',
    nom: 'Martin',
    email: 'sophie.martin@gmail.com',
    telephone: '06 12 34 56 78',
    statut: 'en_attente',
    prix_total: null,
    acompte_envoye: false,
  },
  {
    id: '2',
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
    type: "Gateau d'anniversaire",
    date_evenement: '2026-04-20',
    personnes: '15',
    description: 'Gâteau anniversaire 40 ans, thème voyage, chocolat noir.',
    allergies: 'Aucune',
    prenom: 'Karim',
    nom: 'Benali',
    email: 'k.benali@outlook.fr',
    telephone: '07 98 76 54 32',
    statut: 'acceptee',
    prix_total: 180,
    acompte_envoye: true,
  },
  {
    id: '3',
    created_at: new Date(Date.now() - 3 * 24 * 3600000).toISOString(),
    type: 'Autre occasion',
    date_evenement: '2026-05-01',
    personnes: '30',
    description: 'Assortiment de macarons et éclairs pour cocktail professionnel.',
    allergies: 'Sans fruits à coque',
    prenom: 'Amélie',
    nom: 'Durand',
    email: 'amelie.durand@entreprise.com',
    telephone: '01 23 45 67 89',
    statut: 'en_attente',
    prix_total: null,
    acompte_envoye: false,
  },
];

function formatDate(str: string) {
  return new Date(str).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function timeAgo(str: string) {
  const diff = Date.now() - new Date(str).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return 'À l\'instant';
  if (h < 24) return `Il y a ${h}h`;
  return `Il y a ${Math.floor(h / 24)}j`;
}

export default function Dashboard() {
  const [commandes, setCommandes] = useState<Commande[]>(FAKE_COMMANDES);
  const [selected, setSelected] = useState<Commande | null>(null);
  const [prix, setPrix] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'toutes' | 'en_attente' | 'acceptee' | 'refusee'>('toutes');

  const filtered = filter === 'toutes' ? commandes : commandes.filter(c => c.statut === filter);
  const enAttente = commandes.filter(c => c.statut === 'en_attente').length;

  async function handleAccepter(cmd: Commande) {
    if (!prix || isNaN(Number(prix))) return;
    setLoading(true);
    // En prod : appel API Supabase + email Stripe
    // Pour la démo : mise à jour locale
    await new Promise(r => setTimeout(r, 800));
    setCommandes(prev => prev.map(c => c.id === cmd.id
      ? { ...c, statut: 'acceptee', prix_total: Number(prix), acompte_envoye: true }
      : c
    ));
    setSelected(null);
    setPrix('');
    setLoading(false);
  }

  async function handleRefuser(cmd: Commande) {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setCommandes(prev => prev.map(c => c.id === cmd.id ? { ...c, statut: 'refusee' } : c));
    setSelected(null);
    setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F4EF', fontFamily: 'var(--font-dm-sans)' }}>

      {/* Header */}
      <header style={{
        background: '#1A1410', padding: '1rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/images/Design sans titre.svg" alt="Baraka" style={{ width: 36, height: 36, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: '#FAF7F2', fontSize: '1.1rem', letterSpacing: '0.05em' }}>
            Baraka — Administration
          </span>
        </div>
        {enAttente > 0 && (
          <span style={{
            background: '#E81C1C', color: '#fff', borderRadius: 999,
            padding: '0.2rem 0.7rem', fontSize: '0.7rem', fontWeight: 500,
            letterSpacing: '0.05em',
          }}>
            {enAttente} en attente
          </span>
        )}
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'En attente', count: commandes.filter(c => c.statut === 'en_attente').length, color: '#C4954A' },
            { label: 'Acceptées', count: commandes.filter(c => c.statut === 'acceptee').length, color: '#2D6A2D' },
            { label: 'Refusées', count: commandes.filter(c => c.statut === 'refusee').length, color: '#E81C1C' },
          ].map(s => (
            <div key={s.label} style={{
              background: '#fff', border: '1px solid rgba(26,20,16,0.08)',
              borderRadius: 4, padding: '1.25rem 1.5rem',
              borderTop: `3px solid ${s.color}`,
            }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,20,16,0.45)', marginBottom: 8 }}>{s.label}</p>
              <p style={{ fontSize: '2rem', fontWeight: 600, color: '#1A1410', fontFamily: 'var(--font-cormorant)' }}>{s.count}</p>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {(['toutes', 'en_attente', 'acceptee', 'refusee'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '0.4rem 1rem', borderRadius: 999, border: '1px solid rgba(26,20,16,0.15)',
              background: filter === f ? '#1A1410' : 'transparent',
              color: filter === f ? '#FAF7F2' : '#1A1410',
              fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'capitalize',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {f === 'toutes' ? 'Toutes' : STATUT_LABEL[f]}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid rgba(26,20,16,0.08)', borderRadius: 4, overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '3rem', color: 'rgba(26,20,16,0.35)', fontSize: '0.85rem' }}>Aucune commande</p>
          ) : filtered.map((cmd, i) => (
            <div key={cmd.id} onClick={() => { setSelected(cmd); setPrix(cmd.prix_total?.toString() ?? ''); }}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 140px 100px 90px 90px',
                alignItems: 'center', gap: '1rem',
                padding: '1rem 1.5rem',
                borderBottom: i < filtered.length - 1 ? '1px solid rgba(26,20,16,0.06)' : 'none',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#FAF7F2')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div>
                <p style={{ fontWeight: 500, fontSize: '0.88rem', color: '#1A1410', marginBottom: 2 }}>{cmd.prenom} {cmd.nom}</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(26,20,16,0.45)' }}>{cmd.type}</p>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(26,20,16,0.6)' }}>{formatDate(cmd.date_evenement)}</p>
              <p style={{ fontSize: '0.78rem', color: 'rgba(26,20,16,0.6)' }}>{cmd.personnes} pers.</p>
              <p style={{ fontSize: '0.72rem', color: 'rgba(26,20,16,0.4)' }}>{timeAgo(cmd.created_at)}</p>
              <span style={{
                display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: 999,
                background: `${STATUT_COLOR[cmd.statut]}18`,
                color: STATUT_COLOR[cmd.statut],
                fontSize: '0.65rem', letterSpacing: '0.08em', fontWeight: 500,
                textAlign: 'center',
              }}>
                {STATUT_LABEL[cmd.statut]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Panel détail */}
      {selected && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 50,
          background: 'rgba(26,20,16,0.5)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        }} onClick={() => setSelected(null)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#FAF7F2', width: '100%', maxWidth: 520,
            height: '100vh', overflowY: 'auto', padding: '2rem',
            boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
          }}>
            {/* Header panel */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1.5rem', color: '#1A1410' }}>
                Détail de la commande
              </h2>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'rgba(26,20,16,0.4)' }}>✕</button>
            </div>

            {/* Statut */}
            <span style={{
              display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 999,
              background: `${STATUT_COLOR[selected.statut]}18`, color: STATUT_COLOR[selected.statut],
              fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '1.5rem',
            }}>
              {STATUT_LABEL[selected.statut]}
            </span>

            {/* Infos client */}
            <section style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,20,16,0.4)', marginBottom: 10 }}>Client</p>
              <Row label="Nom" value={`${selected.prenom} ${selected.nom}`} />
              <Row label="Email" value={selected.email} />
              <Row label="Téléphone" value={selected.telephone} />
            </section>

            <div style={{ height: 1, background: 'rgba(26,20,16,0.08)', marginBottom: '1.5rem' }} />

            {/* Infos commande */}
            <section style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,20,16,0.4)', marginBottom: 10 }}>Commande</p>
              <Row label="Type" value={selected.type} />
              <Row label="Date" value={formatDate(selected.date_evenement)} />
              <Row label="Personnes" value={`${selected.personnes} personnes`} />
              <Row label="Description" value={selected.description} multiline />
              {selected.allergies && <Row label="Allergies" value={selected.allergies} />}
            </section>

            <div style={{ height: 1, background: 'rgba(26,20,16,0.08)', marginBottom: '1.5rem' }} />

            {/* Actions (seulement si en attente) */}
            {selected.statut === 'en_attente' && (
              <section>
                <p style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,20,16,0.4)', marginBottom: 14 }}>Décision</p>
                <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,20,16,0.5)', marginBottom: 6 }}>
                  Prix total estimé (€)
                </label>
                <input
                  type="number"
                  value={prix}
                  onChange={e => setPrix(e.target.value)}
                  placeholder="ex: 350"
                  style={{
                    width: '100%', padding: '0.75rem 0',
                    background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26,20,16,0.25)',
                    outline: 'none', fontSize: '1.1rem', color: '#1A1410',
                    fontFamily: 'var(--font-cormorant)', marginBottom: 6,
                  }}
                />
                {prix && !isNaN(Number(prix)) && Number(prix) > 0 && (
                  <p style={{ fontSize: '0.75rem', color: '#C4954A', marginBottom: '1.25rem' }}>
                    Acompte 30% : <strong>{Math.round(Number(prix) * 0.3)}€</strong> — solde à la livraison : <strong>{Math.round(Number(prix) * 0.7)}€</strong>
                  </p>
                )}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button
                    onClick={() => handleAccepter(selected)}
                    disabled={!prix || isNaN(Number(prix)) || loading}
                    style={{
                      flex: 1, padding: '0.85rem',
                      background: '#1A1410', color: '#FAF7F2', border: 'none',
                      borderRadius: 2, cursor: 'pointer',
                      fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                      opacity: (!prix || loading) ? 0.5 : 1, transition: 'opacity 0.2s',
                    }}
                  >
                    {loading ? 'Envoi…' : 'Accepter & envoyer acompte'}
                  </button>
                  <button
                    onClick={() => handleRefuser(selected)}
                    disabled={loading}
                    style={{
                      padding: '0.85rem 1.25rem', background: 'transparent',
                      color: '#E81C1C', border: '1px solid #E81C1C',
                      borderRadius: 2, cursor: 'pointer',
                      fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                    }}
                  >
                    Refuser
                  </button>
                </div>
              </section>
            )}

            {/* Si déjà acceptée */}
            {selected.statut === 'acceptee' && selected.prix_total && (
              <section>
                <p style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,20,16,0.4)', marginBottom: 10 }}>Paiement</p>
                <Row label="Prix total" value={`${selected.prix_total}€`} />
                <Row label="Acompte 30%" value={`${Math.round(selected.prix_total * 0.3)}€`} />
                <Row label="Solde restant" value={`${Math.round(selected.prix_total * 0.7)}€`} />
                <p style={{ marginTop: 10, fontSize: '0.72rem', color: '#2D6A2D' }}>✓ Lien d'acompte envoyé au client</p>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: 10, alignItems: multiline ? 'flex-start' : 'center' }}>
      <p style={{ fontSize: '0.68rem', color: 'rgba(26,20,16,0.4)', minWidth: 90, flexShrink: 0, paddingTop: multiline ? 2 : 0 }}>{label}</p>
      <p style={{ fontSize: '0.82rem', color: '#1A1410', lineHeight: 1.5 }}>{value}</p>
    </div>
  );
}
