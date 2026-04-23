# CivicFix

> Civic intelligence for citizens. Report local urban issues, track resolution, and hold your city accountable — with full transparency.

CivicFix is a world-class civic-tech platform that bridges citizens and municipal authorities. This repository contains **Phase 1 + Phase 2** of the build: the foundation, landing page, auth flow, citizen dashboard, multi-step report wizard, and community feed. Additional phases (admin dashboard, real-time Supabase, Resend emails, PWA, etc.) land in follow-up PRs.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, RSC) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | Framer Motion + GSAP-ready + Lottie (react) |
| 3D | Three.js via `@react-three/fiber` + `drei` |
| Particles | `@tsparticles/react` |
| Maps | React-Leaflet + OpenStreetMap (CARTO tiles) |
| Charts | Recharts + D3 |
| State | Zustand + TanStack Query |
| Forms | React Hook Form + Zod |
| Notifications | Sonner |
| Icons | Lucide React |
| Fonts | Inter (UI) + Space Grotesk (display — Cal Sans substitute) |

## Current Status

**Phase 1+2 shipped:**
- Design system (Civic Dark Premium) — tokens, glass, glows, gradients
- Landing page (hero with Three.js globe + tsParticles, stats, how-it-works, categories, live ticker, map preview, testimonials, footer)
- Auth (`/login`, `/signup`) — tab switcher, validation, OAuth button slots, success flip
- Citizen dashboard (`/dashboard`) — sidebar, topbar, welcome banner, stat cards with sparklines, interactive map, activity timeline, FAB with speed-dial
- Report submission wizard (`/report/new`) — 4 steps, animated progress, category picker, urgency selector, Leaflet pin-drop, photo uploads, confetti success
- Issue detail (`/report/[id]`) — hero, status timeline stepper, stats, department card, comments
- Community feed (`/feed`) — sticky filters, category chips, trending banner, animated card grid, infinite scroll, skeleton shimmer

**Phases still to land:**
- Supabase schema, RLS, Auth (real creds)
- Admin dashboard (charts, priority queue, live feed)
- Admin reports table + slide-in drawer
- Supabase Realtime subscriptions
- Resend transactional emails
- Leaderboard, heatmap, resolution timer, OG share cards
- PWA (manifest, service worker, offline queue)

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev
```

Then open http://localhost:3000.

### Commands

```bash
npm run dev     # Dev server
npm run build   # Production build
npm run start   # Start prod server
npm run lint    # Next.js lint (ESLint)
```

### Mock Data

The entire app currently runs on an in-memory mock data layer (`src/lib/mock-data.ts` + `src/lib/data-layer.ts`). The `data-layer.ts` functions (`getReports`, `createReport`, `upvoteReport`, `addComment`, etc.) form a clean API surface that will be swapped for Supabase client calls when real credentials are wired in. No UI changes will be required.

## Design System

CSS tokens live in `src/app/globals.css` and are mirrored into Tailwind via `tailwind.config.ts`. Key tokens:

```css
--bg-primary: #040812
--civic-blue: #3B82F6
--civic-orange: #F97316
--civic-purple: #8B5CF6
--civic-teal: #14B8A6
```

Utility classes: `.glass`, `.gradient-text`, `.glow-blue`, `.glow-orange`, `.dot-grid`, `.shimmer`, `.mesh-bg`.

## Structure

```
src/
├── app/
│   ├── page.tsx              Landing
│   ├── login/, signup/        Auth
│   ├── dashboard/             Citizen dashboard (with layout)
│   ├── report/new/, [id]/     Wizard + detail
│   └── feed/                  Community feed
├── components/
│   ├── ui/                    Primitives (button, badge, card, input, logo, status pill)
│   ├── landing/               Navbar, hero, globe, particles, stats, categories, ticker, map, testimonials, footer
│   ├── auth/                  Auth card
│   ├── dashboard/             Sidebar, topbar, stat card, timeline, FAB, dashboard map
│   ├── report/                Wizard + wizard map
│   └── feed/                  Report card, filters, feed page
└── lib/
    ├── types.ts               Shared types (User, Report, Comment, Status, etc.)
    ├── categories.ts          Category + status + urgency metadata
    ├── mock-data.ts           In-memory seed data
    ├── data-layer.ts          Swappable API surface
    └── utils.ts               cn, formatRelativeTime, compactNumber
```

## Contributing Notes

- Commits go through feature branches; never force-push main.
- ESLint + TypeScript strict must pass before PR.
- When adding new animations, prefer `transform` + `opacity` for 60fps.

---

© 2025 CivicFix. Built with ❤️ for citizens.
