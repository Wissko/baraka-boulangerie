import { NextRequest, NextResponse } from 'next/server';

const TBS_DASHBOARD_URL = process.env.TBS_DASHBOARD_URL || 'https://tbs-dashboard-wisskos-projects.vercel.app';
const TBS_API_KEY = process.env.TBS_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type,
      date,
      personnes,
      description,
      allergies,
      prenom,
      nom,
      email,
      telephone,
    } = body;

    // Validation : délai minimum 14 jours
    const dateChoisie = new Date(date);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 14);
    minDate.setHours(0, 0, 0, 0);

    if (dateChoisie < minDate) {
      return NextResponse.json(
        { error: 'La date doit être au minimum 14 jours à partir d\'aujourd\'hui.' },
        { status: 400 }
      );
    }

    // Envoyer la commande au TBS Dashboard
    const dashboardResponse = await fetch(`${TBS_DASHBOARD_URL}/api/commandes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TBS_API_KEY,
      },
      body: JSON.stringify({
        type,
        date_evenement: date,
        personnes: String(personnes),
        description,
        allergies: allergies || '',
        prenom,
        nom,
        email,
        telephone,
      }),
    });

    if (!dashboardResponse.ok) {
      const errorData = await dashboardResponse.json().catch(() => ({}));
      console.error('Erreur TBS Dashboard:', dashboardResponse.status, errorData);
      return NextResponse.json(
        { error: 'Une erreur est survenue lors de l\'envoi de votre demande.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API commande-speciale:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre demande.' },
      { status: 500 }
    );
  }
}
