# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build (also runs TypeScript check)
npm run start      # Serve production build
```

No test runner or linter is configured yet.

**Note:** If `npm install` fails with an EACCES cache error, use `--cache /tmp/npm-cache` as a workaround (root-owned npm cache issue on this machine).

## Stack

- **Next.js 16** with App Router, TypeScript, Tailwind CSS v4
- **No backend, no auth, no database** — currently a static landing page with mock data
- Path alias `@/*` maps to the project root

## Architecture

### Data flow
All content lives in `lib/mockData.ts` — listing cards, "How It Works" steps, and value proposition copy. Components import directly from there; there is no API layer yet.

### Component structure
- `app/page.tsx` — assembles sections in order; edit this to reorder or add/remove sections
- `components/` — one file per page section (Navbar, HeroSection, HowItWorks, etc.)
- `components/ui/` — small reusable primitives: `ItemCard` (listing card) and `Badge` (colored pill label)

### Styling
Tailwind v4 is configured via `@tailwindcss/postcss` in `postcss.config.mjs` — no `tailwind.config.js` file needed. Global styles are in `app/globals.css`. Brand color is `emerald`; search for `emerald` across components to swap it.

## Product context

PassOn is a community marketplace for renters to buy/sell furniture during move-in/move-out. Key future features not yet built: user auth, real listings database, and an AI room-photo-to-listing feature (teased in `FutureFeatureTeaser.tsx`).
