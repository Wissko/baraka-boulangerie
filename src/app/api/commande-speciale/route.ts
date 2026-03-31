import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const dateFormatted = new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Email à la boulangerie
    await transporter.sendMail({
      from: `"Baraka Site" <${process.env.SMTP_USER}>`,
      to: process.env.BAKERY_EMAIL,
      replyTo: email,
      subject: `[Baraka] Nouvelle demande de commande speciale - ${type} - ${dateFormatted}`,
      text: `Nouvelle demande recue via le site.

Type : ${type}
Date souhaitee : ${dateFormatted}
Nombre de personnes : ${personnes}
Client : ${prenom} ${nom}
Email : ${email}
Telephone : ${telephone}

Description :
${description}

Allergies / contraintes :
${allergies || 'Aucune'}

---
Repondre directement a cet email pour contacter le client.`,
    });

    // Email de confirmation au client
    await transporter.sendMail({
      from: `"Baraka Boulangeries" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Baraka - Votre demande de commande speciale a bien ete recue`,
      text: `Cher(e) ${prenom},

Nous avons bien recu votre demande pour ${type} prevu(e) le ${dateFormatted}.

Notre equipe l'examinera et reviendra vers vous sous 48h pour confirmer la disponibilite et discuter des details de votre creation.

A tres bientot,
L'equipe Baraka Boulangeries`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API commande-speciale:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre demande.' },
      { status: 500 }
    );
  }
}
