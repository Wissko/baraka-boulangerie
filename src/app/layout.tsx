import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  DM_Sans,
  Dancing_Script,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Baraka Boulangeries — L'art de la boulangerie française",
  description:
    "Baraka, maison de boulangerie française artisanale. Croissants, pains au levain, viennoiseries et pâtisseries d'exception. Découvrez nos adresses à Paris et en France.",
  keywords: [
    "boulangerie artisanale",
    "pain au levain",
    "croissant",
    "pâtisserie française",
    "Paris",
    "Baraka",
  ],
  openGraph: {
    title: "Baraka Boulangeries — L'art de la boulangerie française",
    description:
      "Maison de boulangerie française artisanale. L'excellence au quotidien.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable} ${dancing.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
