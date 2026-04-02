'use client';

import {
  Cormorant_Garamond,
  Playfair_Display,
  DM_Sans,
  Dancing_Script,
  Work_Sans,
} from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import BarakaMenu from "@/components/ui/BarakaMenu";
import Loader from "@/components/ui/Loader";
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

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-work-sans",
  display: "swap",
});

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable} ${dancing.variable} ${workSans.variable}`}
    >
      <head>
        <title>Baraka Boulangeries, L&apos;art de la boulangerie française</title>
        <meta
          name="description"
          content="Baraka, maison de boulangerie française artisanale. Croissants, pains au levain, viennoiseries et pâtisseries d'exception. 5 boutiques en Île-de-France."
        />
        <meta property="og:title" content="Baraka Boulangeries" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
      </head>
      <body>
        <Loader />
        <BarakaMenu />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: EASE_LUXURY }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
