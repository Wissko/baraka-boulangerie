import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

interface TokenPayload {
  email: string;
  prenom: string;
  type: string;
  date: string;
  exp: number;
}

function verifyToken(token: string): TokenPayload | null {
  const secret = process.env.ACCEPT_SECRET ?? 'dev-secret';
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encoded, signature] = parts;
  const expectedHmac = crypto
    .createHmac('sha256', secret)
    .update(encoded)
    .digest('hex');

  // Comparaison en temps constant pour éviter timing attacks
  const sigBuf = Buffer.from(signature, 'hex');
  const expectedBuf = Buffer.from(expectedHmac, 'hex');
  if (
    sigBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(sigBuf, expectedBuf)
  ) {
    return null;
  }

  try {
    // Restaurer le padding base64 standard
    const padded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const json = Buffer.from(padded, 'base64').toString('utf-8');
    const payload = JSON.parse(json) as TokenPayload;
    return payload;
  } catch {
    return null;
  }
}

function htmlPage(success: boolean, message: string): Response {
  const color = success ? '#2D5016' : '#8B0000';
  const icon = success ? '✅' : '❌';
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Baraka Boulangeries</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #FAF7F2;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Cormorant Garamond', Georgia, serif;
    }
    .card {
      background: #ffffff;
      border: 1px solid #E8E0D4;
      border-radius: 2px;
      padding: 3rem 4rem;
      max-width: 520px;
      width: 90%;
      text-align: center;
      box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    }
    .logo {
      font-size: 1.1rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #8C7B6B;
      margin-bottom: 2rem;
    }
    .icon {
      font-size: 2.5rem;
      margin-bottom: 1.25rem;
    }
    .message {
      font-size: 1.4rem;
      font-weight: 600;
      color: ${color};
      line-height: 1.5;
      margin-bottom: 1rem;
    }
    .sub {
      font-size: 1.05rem;
      font-style: italic;
      color: #8C7B6B;
    }
    .divider {
      width: 40px;
      height: 1px;
      background: #C9B99A;
      margin: 1.5rem auto;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">Baraka Boulangeries</div>
    <div class="divider"></div>
    <div class="icon">${icon}</div>
    <div class="message">${message}</div>
    <div class="divider"></div>
    <div class="sub">L'équipe Baraka Boulangeries</div>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: success ? 200 : 400,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return htmlPage(false, 'Lien invalide ou manquant.');
  }

  const payload = verifyToken(token);
  if (!payload) {
    return htmlPage(false, 'Signature invalide. Ce lien n\'est pas authentique.');
  }

  if (Date.now() > payload.exp) {
    return htmlPage(false, 'Ce lien a expiré. Veuillez contacter la boulangerie directement.');
  }

  const { email, prenom, type, date } = payload;

  const dateFormatted = new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Baraka Boulangeries" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Baraka — Votre commande sur mesure est confirmée !`,
      text: `Cher(e) ${prenom},

Bonne nouvelle ! Votre commande ${type} prévue le ${dateFormatted} a été acceptée par notre équipe.

Nous vous contacterons très prochainement pour finaliser les détails de votre création sur mesure.

À très bientôt,
L'équipe Baraka Boulangeries`,
    });

    return htmlPage(true, 'Commande confirmée. L\'email de confirmation a été envoyé au client.');
  } catch (error) {
    console.error('Erreur envoi email confirmation:', error);
    return htmlPage(false, 'Erreur lors de l\'envoi de l\'email de confirmation. Veuillez réessayer.');
  }
}
