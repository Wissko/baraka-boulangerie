# Baraka Boulangeries

Site vitrine premium pour **Baraka Boulangeries** — groupe de boulangeries françaises artisanales.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** avec palette personnalisée luxe
- **Framer Motion** pour les animations
- **TypeScript**
- **Google Fonts** via `next/font` : Cormorant Garamond, Playfair Display, DM Sans, Dancing Script

## Lancer en développement

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Structure

```
src/
  app/
    layout.tsx        # Fonts, metadata, globals
    globals.css       # Tailwind base + custom utilities
    page.tsx          # Assemblage des sections
  components/
    sections/
      Hero.tsx         # Plein écran, parallax, CTA scroll
      Histoire.tsx     # Storytelling + stats + layout asymétrique
      Creations.tsx    # Grid filtrables 12 produits
      Experience.tsx   # Fond immersif + 3 piliers animés
      Adresses.tsx     # Accordion 6 boutiques
      Instagram.tsx    # Feed simulé 6 posts
    ui/
      Navigation.tsx   # Nav sticky blur + mobile menu
      Footer.tsx       # Footer premium 3 colonnes
```

## Direction Artistique

### Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | `#FAF7F2` | Fond principal |
| `cream-warm` | `#F5F0E8` | Surface cards |
| `gold` | `#C9A96E` | Accent doré |
| `ink` | `#1A1410` | Texte principal |
| `brown` | `#8B6F47` | Accent secondaire |

### Typographies
- **Cormorant Garamond** — titres, headlines (élégance française)
- **Playfair Display Italic** — sous-titres, citations
- **DM Sans** — corps de texte, labels, UI
- **Dancing Script** — accents cursifs, labels décoratifs

## Images

Actuellement : placeholders **Unsplash** (pain, croissant, pâtisserie).

Pour intégrer les vraies photos :
1. Placer les images dans `/public/images/`
2. Remplacer les URLs Unsplash dans chaque composant par les chemins locaux (`/images/nom-du-fichier.jpg`)
3. Supprimer le `remotePatterns` Unsplash de `next.config.js` si les images sont toutes locales

## Déploiement

Compatible **Vercel** en un clic. Variables d'environnement : aucune requise.

---

*Site créé par Nova — Baraka Boulangeries 2024*
