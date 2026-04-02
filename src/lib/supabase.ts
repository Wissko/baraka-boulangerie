import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Commande = {
  id: string;
  created_at: string;
  type: string;
  date_evenement: string;
  personnes: string;
  description: string;
  allergies: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  statut: 'en_attente' | 'acceptee' | 'refusee';
  prix_total: number | null;
  acompte_envoye: boolean;
};
