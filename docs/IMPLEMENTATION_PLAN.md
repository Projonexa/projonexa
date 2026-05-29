# Projonexa — React Implementation Plan

## Phase 1: Foundation ✅

1. Scaffold Vite + React + TypeScript  
2. Configure Tailwind CSS with brand tokens  
3. Set up path aliases (`@/`)  
4. Implement `ThemeProvider` (dark/light + localStorage)  
5. Configure React Router with layout shell  

## Phase 2: Design System ✅

1. Global utilities: `.text-gradient`, `.glass`, `.section-padding`  
2. UI primitives: `Button`, `Logo`, `SectionHeading`, `PageHeader`, `Skeleton`  
3. Layout: `Header` (responsive nav + theme toggle), `Footer`  
4. SEO component with JSON-LD Organization schema  

## Phase 3: Data Layer ✅

Centralized content in `src/data/`:

- `brand.ts` — company, founder, vision, mission, stats  
- `services.ts` — 12 service cards with deliverables  
- `technologies.ts` — stack showcase by category  
- `projects.ts`, `blog.ts`, `faq.ts`, `pricing.ts`  
- `seo.ts` — per-page meta  
- `navigation.ts` — nav and footer links  

## Phase 4: Home Page Sections ✅

| Section | Component |
|---------|-----------|
| Hero | `Hero.tsx` |
| Statistics | `Stats.tsx` (animated counters) |
| Services preview | `ServicesGrid.tsx` |
| Technology | `TechnologyShowcase.tsx` |
| Why Choose | `WhyChoose.tsx` |
| Founder | `Founder.tsx` |
| Vision & Mission | `VisionMission.tsx` |
| CTA | `CTA.tsx` |

## Phase 5: Route Pages ✅

| Route | Page |
|-------|------|
| `/` | `HomePage` |
| `/about` | `AboutPage` |
| `/services` | `ServicesPage` |
| `/projects` | `ProjectsPage` |
| `/research` | `ResearchPage` |
| `/blog` | `BlogPage` |
| `/portfolio` | `PortfolioPage` |
| `/pricing` | `PricingPage` |
| `/careers` | `CareersPage` |
| `/faq` | `FAQPage` |
| `/contact` | `ContactPage` |

## Phase 6: SEO & Docs ✅

- `public/robots.txt`, `public/sitemap.xml`  
- `docs/BRAND_GUIDELINES.md`  
- `docs/SEO_STRATEGY.md`  
- `docs/ARCHITECTURE.md`  
- Premium `README.md`  

## Phase 7: Post-Launch (Recommended)

1. Add `public/og-image.png` (1200×630)  
2. Deploy to Vercel and connect `projonexa.com`  
3. Replace tech badges with Simple Icons SVGs  
4. Add founder professional photo  
5. Wire contact form to backend (Formspree / Resend)  
6. Connect blog to CMS  
7. Add Google Analytics / Plausible  

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```
