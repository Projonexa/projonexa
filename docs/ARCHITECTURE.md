# Projonexa Website — Architecture

## Tech Stack

| Layer        | Technology        |
|--------------|-------------------|
| Framework    | React 19          |
| Language     | TypeScript        |
| Build        | Vite 5            |
| Styling      | Tailwind CSS 3    |
| Animation    | Framer Motion     |
| Routing      | React Router 7    |
| SEO          | react-helmet-async|
| Icons        | Lucide React      |

## Folder Structure

```
projonexa/
├── public/                 # Static assets, robots.txt, sitemap.xml
├── docs/                   # Brand guidelines, architecture, SEO strategy
├── src/
│   ├── components/
│   │   ├── layout/         # Header, Footer, Layout shell
│   │   ├── sections/       # Page sections (Hero, Stats, Services, …)
│   │   ├── seo/            # SEO / structured data
│   │   └── ui/             # Button, Logo, Skeleton, SectionHeading
│   ├── context/            # ThemeProvider (dark/light)
│   ├── data/               # Content & configuration (single source of truth)
│   ├── hooks/              # useInView, useCountUp
│   ├── pages/              # Route-level page components
│   ├── App.tsx             # Router definition
│   ├── main.tsx            # Entry point
│   └── index.css           # Tailwind theme tokens & utilities
├── index.html
├── vite.config.ts
└── package.json
```

## Component Architecture

```
App
└── HelmetProvider
    └── ThemeProvider
        └── BrowserRouter
            └── Layout (Header + Outlet + Footer)
                ├── HomePage → [Hero, Stats, ServicesGrid, …]
                ├── AboutPage
                ├── ServicesPage
                └── … (one page component per route)
```

**Sections** are composable blocks used on Home and reused across pages (e.g. `Founder`, `CTA`, `Stats`).

**Data layer** (`src/data/`) centralizes copy, services, SEO metadata, and navigation — update content without touching layout code.

## Routing

| Path        | Page           |
|-------------|----------------|
| `/`         | Home           |
| `/about`    | About          |
| `/services` | Services       |
| `/projects` | Projects       |
| `/research` | Research       |
| `/blog`     | Blog           |
| `/portfolio`| Portfolio      |
| `/pricing`  | Pricing        |
| `/careers`  | Careers        |
| `/faq`      | FAQ            |
| `/contact`  | Contact        |

## Design System (CSS)

Custom tokens in `src/index.css` via Tailwind `@theme`:

- Brand colors: `--color-brand-primary`, etc.
- Utilities: `.text-gradient`, `.bg-brand-gradient`, `.glass`, `.section-padding`

## SEO Strategy

- Per-route meta via `SEO` component + `PAGE_SEO` in `src/data/seo.ts`
- JSON-LD Organization schema on every page
- `public/sitemap.xml` and `public/robots.txt`
- Canonical URLs use `BRAND.url` (update when domain is live)
- Target keywords embedded in titles, descriptions, and structured `knowsAbout`

## Deployment

1. `npm run build` → `dist/`
2. Deploy to Vercel, Netlify, or static host
3. Set `BRAND.url` in `src/data/brand.ts` to production domain
4. Add `public/og-image.png` (1200×630) for social previews

## Future Enhancements

- CMS for blog posts (Sanity, Contentlayer)
- Backend contact form API
- Real tech stack SVG logos (Simple Icons)
- Analytics (Plausible / GA4)
- i18n for regional audiences
