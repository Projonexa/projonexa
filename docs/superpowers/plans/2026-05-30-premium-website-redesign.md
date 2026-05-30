# Premium Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a modern, premium, globally presentable Projonexa website that serves both Clients and Students equally while making `Book a Consultation Call` the dominant conversion path.

**Architecture:** Keep the existing React + Vite + Tailwind structure, then incrementally refactor shared UI foundations (tokens, motion, CTA system) and homepage sections. Build section-level tests first, then implement minimal UI changes to pass tests before polishing animations and responsive behavior.

**Tech Stack:** React 18, TypeScript, Vite, TailwindCSS, Framer Motion, React Router, Vitest, Testing Library.

---

### Task 1: Testing Foundation for TDD Execution

**Files:**
- Create: `src/test/setup.ts`
- Create: `src/test/renderWithProviders.tsx`
- Modify: `package.json`
- Modify: `vite.config.ts`
- Modify: `tsconfig.app.json`

- [ ] **Step 1: Write the failing test setup smoke test**

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom/vitest'
```

```typescript
// src/test/renderWithProviders.tsx
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { ReactElement } from 'react'
import { ThemeProvider } from '@/context/ThemeContext'

export function renderWithProviders(ui: ReactElement) {
  return render(
    <ThemeProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>,
  )
}
```

- [ ] **Step 2: Run test command to verify current setup fails**

Run: `npm run test -- --runInBand`  
Expected: FAIL with `Missing script: "test"` or Vitest config error.

- [ ] **Step 3: Add minimal test tooling configuration**

```json
// package.json (scripts + devDependencies excerpt)
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run",
    "test:ui": "vitest --ui"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "jsdom": "^25.0.1",
    "vitest": "^2.1.8"
  }
}
```

```typescript
// vite.config.ts (test config excerpt)
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test/setup.ts',
  css: true,
}
```

- [ ] **Step 4: Run test command to verify setup is now green**

Run: `npm run test:run`  
Expected: PASS with `0 failed` (no test files yet).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.app.json src/test/setup.ts src/test/renderWithProviders.tsx
git commit -m "build: add vitest foundation for redesign tdd flow"
```

### Task 2: Premium Design Tokens and Motion Primitives

**Files:**
- Create: `src/lib/motion.ts`
- Modify: `src/index.css`

- [ ] **Step 1: Write the failing token/motion utility test**

```typescript
// src/lib/__tests__/motion.test.ts
import { motionTokens } from '@/lib/motion'

test('defines premium easing and duration tokens', () => {
  expect(motionTokens.duration.fast).toBe(0.2)
  expect(motionTokens.easing.premium).toEqual([0.22, 1, 0.36, 1])
})
```

- [ ] **Step 2: Run targeted test to verify failure**

Run: `npm run test:run -- src/lib/__tests__/motion.test.ts`  
Expected: FAIL with `Cannot find module '@/lib/motion'`.

- [ ] **Step 3: Implement minimal motion token module + CSS design tokens**

```typescript
// src/lib/motion.ts
export const motionTokens = {
  duration: {
    fast: 0.2,
    normal: 0.35,
    slow: 0.5,
  },
  easing: {
    premium: [0.22, 1, 0.36, 1] as const,
  },
}
```

```css
/* src/index.css (token excerpt) */
:root {
  --surface-0: #ffffff;
  --surface-1: #f4f6f8;
  --ink-1: #0f172a;
  --ink-2: #334155;
  --brand-primary: #00c8ff;
  --brand-secondary: #3d8bff;
  --radius-card: 1rem;
  --shadow-premium: 0 24px 64px -32px rgba(15, 23, 42, 0.35);
}

.premium-card {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-premium);
  background: color-mix(in srgb, var(--surface-0) 92%, transparent);
}
```

- [ ] **Step 4: Run targeted and full tests**

Run: `npm run test:run -- src/lib/__tests__/motion.test.ts`  
Expected: PASS.

Run: `npm run test:run`  
Expected: PASS with all discovered tests green.

- [ ] **Step 5: Commit**

```bash
git add src/lib/motion.ts src/lib/__tests__/motion.test.ts src/index.css
git commit -m "feat: add premium visual tokens and shared motion primitives"
```

### Task 3: Navigation and Persistent Consultation CTA

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/data/navigation.ts`
- Modify: `src/components/ui/Button.tsx`

- [ ] **Step 1: Write failing header/footer CTA tests**

```typescript
// src/components/layout/__tests__/HeaderFooterCta.test.tsx
import { screen } from '@testing-library/react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { renderWithProviders } from '@/test/renderWithProviders'

test('shows consultation CTA in header', () => {
  renderWithProviders(<Header />)
  expect(screen.getByRole('link', { name: /book a consultation call/i })).toBeInTheDocument()
})

test('shows consultation CTA in footer area', () => {
  renderWithProviders(<Footer />)
  expect(screen.getByRole('link', { name: /book a consultation call/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run targeted test to verify failure**

Run: `npm run test:run -- src/components/layout/__tests__/HeaderFooterCta.test.tsx`  
Expected: FAIL because `Get Started` is still rendered.

- [ ] **Step 3: Implement minimal navigation + CTA copy updates**

```tsx
// Header.tsx (CTA excerpt)
<Button to="/contact" variant="primary">
  Book a Consultation Call
</Button>
```

```tsx
// Footer.tsx (new top CTA strip excerpt)
<div className="mb-10 flex items-center justify-between rounded-2xl border border-black/5 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
    Ready to discuss your project goals?
  </p>
  <Button to="/contact" variant="primary">
    Book a Consultation Call
  </Button>
</div>
```

```ts
// navigation.ts (nav excerpt)
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'For Clients', path: '/services#clients' },
  { label: 'For Students', path: '/services#students' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
] as const
```

- [ ] **Step 4: Run tests to confirm green**

Run: `npm run test:run -- src/components/layout/__tests__/HeaderFooterCta.test.tsx`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Footer.tsx src/data/navigation.ts src/components/ui/Button.tsx src/components/layout/__tests__/HeaderFooterCta.test.tsx
git commit -m "feat: promote consultation booking across global navigation and footer"
```

### Task 4: Hero Redesign With Dual Audience Entry

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/TrustStrip.tsx`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Write failing homepage hero structure test**

```typescript
// src/pages/__tests__/HomeHero.test.tsx
import { screen } from '@testing-library/react'
import { HomePage } from '@/pages/HomePage'
import { renderWithProviders } from '@/test/renderWithProviders'

test('home hero exposes client and student pathways', () => {
  renderWithProviders(<HomePage />)
  expect(screen.getByText(/for clients/i)).toBeInTheDocument()
  expect(screen.getByText(/for students/i)).toBeInTheDocument()
  expect(screen.getAllByRole('link', { name: /book a consultation call/i }).length).toBeGreaterThan(0)
})
```

- [ ] **Step 2: Run targeted test and verify failure**

Run: `npm run test:run -- src/pages/__tests__/HomeHero.test.tsx`  
Expected: FAIL because hero does not contain dual-path cards.

- [ ] **Step 3: Implement minimal hero + trust strip**

```tsx
// Hero.tsx (dual-path excerpt)
<div className="mt-10 grid w-full max-w-4xl gap-4 md:grid-cols-2">
  <article className="premium-card p-5">
    <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">For Clients</p>
    <h3 className="mt-2 text-lg font-semibold">Build reliable, scalable digital products</h3>
    <p className="mt-2 text-sm text-zinc-600">Strategy, delivery, and support for business outcomes.</p>
  </article>
  <article className="premium-card p-5">
    <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">For Students</p>
    <h3 className="mt-2 text-lg font-semibold">Deliver high-quality academic and innovation projects</h3>
    <p className="mt-2 text-sm text-zinc-600">Mentorship-led execution with practical guidance.</p>
  </article>
</div>
```

```tsx
// TrustStrip.tsx (new section excerpt)
export function TrustStrip() {
  return (
    <section className="border-y border-black/5 bg-zinc-50/80 py-4 dark:border-white/10 dark:bg-zinc-900/40">
      <div className="container-wide flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-zinc-600 dark:text-zinc-300">
        <span>Global-ready delivery standards</span>
        <span>Transparent communication</span>
        <span>24-hour response window</span>
        <span>Client + student support model</span>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run targeted tests**

Run: `npm run test:run -- src/pages/__tests__/HomeHero.test.tsx`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx src/components/sections/TrustStrip.tsx src/pages/HomePage.tsx src/pages/__tests__/HomeHero.test.tsx
git commit -m "feat: redesign hero with dual audience entry and trust strip"
```

### Task 5: Balanced Sections for Clients and Students

**Files:**
- Create: `src/components/sections/AudienceSplit.tsx`
- Create: `src/components/sections/ProcessTimeline.tsx`
- Create: `src/components/sections/Testimonials.tsx`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Write failing section-order and content test**

```typescript
// src/pages/__tests__/HomeFlow.test.tsx
import { renderWithProviders } from '@/test/renderWithProviders'
import { HomePage } from '@/pages/HomePage'
import { screen } from '@testing-library/react'

test('home page includes balanced audience and process sections', () => {
  renderWithProviders(<HomePage />)
  expect(screen.getByRole('heading', { name: /solutions for clients/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /growth for students/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /how we deliver/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run targeted test and confirm failure**

Run: `npm run test:run -- src/pages/__tests__/HomeFlow.test.tsx`  
Expected: FAIL because new sections are missing.

- [ ] **Step 3: Implement minimal balanced sections and wire order**

```tsx
// AudienceSplit.tsx (excerpt)
<section className="section-padding">
  <div className="container-wide grid gap-6 lg:grid-cols-2">
    <article className="premium-card p-8">
      <h2 className="text-2xl font-semibold">Solutions for Clients</h2>
      <p className="mt-3 text-sm text-zinc-600">Business-focused product development from discovery to deployment.</p>
    </article>
    <article className="premium-card p-8">
      <h2 className="text-2xl font-semibold">Growth for Students</h2>
      <p className="mt-3 text-sm text-zinc-600">Mentored project execution with practical and academic rigor.</p>
    </article>
  </div>
</section>
```

```tsx
// ProcessTimeline.tsx (excerpt)
const steps = ['Discovery', 'Strategy', 'Build', 'QA', 'Delivery', 'Support']
```

- [ ] **Step 4: Run targeted test and full suite**

Run: `npm run test:run -- src/pages/__tests__/HomeFlow.test.tsx`  
Expected: PASS.

Run: `npm run test:run`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/AudienceSplit.tsx src/components/sections/ProcessTimeline.tsx src/components/sections/Testimonials.tsx src/pages/HomePage.tsx src/pages/__tests__/HomeFlow.test.tsx
git commit -m "feat: add balanced client student sections and process storytelling"
```

### Task 6: Premium Refinement of Existing Core Sections

**Files:**
- Modify: `src/components/sections/ServicesGrid.tsx`
- Modify: `src/components/sections/TechnologyShowcase.tsx`
- Modify: `src/components/sections/WhyChoose.tsx`
- Modify: `src/components/sections/CTA.tsx`

- [ ] **Step 1: Write failing regression tests for CTA language and section headings**

```typescript
// src/components/sections/__tests__/CoreSections.test.tsx
import { renderWithProviders } from '@/test/renderWithProviders'
import { CTA } from '@/components/sections/CTA'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { screen } from '@testing-library/react'

test('cta uses consultation-first language', () => {
  renderWithProviders(<CTA />)
  expect(screen.getByRole('link', { name: /book a consultation call/i })).toBeInTheDocument()
})

test('services section headline keeps enterprise tone', () => {
  renderWithProviders(<ServicesGrid limit={3} />)
  expect(screen.getByText(/enterprise-grade/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run targeted test and verify failure**

Run: `npm run test:run -- src/components/sections/__tests__/CoreSections.test.tsx`  
Expected: FAIL due old `Start Your Project` copy.

- [ ] **Step 3: Implement minimal copy and visual refinement**

```tsx
// CTA.tsx (excerpt)
<h2 className="relative text-3xl font-bold text-white sm:text-4xl">
  Plan Your Next Build With Projonexa
</h2>
<Button to="/contact" variant="secondary" className="!bg-white !text-brand-dark">
  Book a Consultation Call
</Button>
```

```tsx
// ServicesGrid.tsx (heading excerpt)
title="Enterprise-grade delivery for clients and students"
description="Strategic planning, product build, and support delivered with global-quality standards."
```

- [ ] **Step 4: Run target test and visual build check**

Run: `npm run test:run -- src/components/sections/__tests__/CoreSections.test.tsx`  
Expected: PASS.

Run: `npm run build`  
Expected: PASS with Vite build completed.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ServicesGrid.tsx src/components/sections/TechnologyShowcase.tsx src/components/sections/WhyChoose.tsx src/components/sections/CTA.tsx src/components/sections/__tests__/CoreSections.test.tsx
git commit -m "refactor: align core sections to premium corporate tone"
```

### Task 7: Consultation-First Contact Experience

**Files:**
- Modify: `src/pages/ContactPage.tsx`
- Create: `src/pages/__tests__/ContactPage.test.tsx`

- [ ] **Step 1: Write failing form UX tests**

```typescript
// src/pages/__tests__/ContactPage.test.tsx
import { renderWithProviders } from '@/test/renderWithProviders'
import { ContactPage } from '@/pages/ContactPage'
import { screen } from '@testing-library/react'

test('contact page is consultation-led', () => {
  renderWithProviders(<ContactPage />)
  expect(screen.getByRole('heading', { name: /book a consultation call/i })).toBeInTheDocument()
})

test('submit action uses consultation language', () => {
  renderWithProviders(<ContactPage />)
  expect(screen.getByRole('button', { name: /book consultation/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run targeted tests to verify failure**

Run: `npm run test:run -- src/pages/__tests__/ContactPage.test.tsx`  
Expected: FAIL because current page still uses generic inquiry wording.

- [ ] **Step 3: Implement minimal consultation-first copy + robust states**

```tsx
// ContactPage.tsx (excerpt)
<PageHeader
  eyebrow="Consultation"
  title="Book a Consultation Call"
  description="Share your project goals and timeline. We will respond with a clear next-step plan."
/>

<Button type="submit" variant="primary" className="w-full">
  {submitted ? 'Preparing Your Consultation Email...' : 'Book Consultation'}
</Button>
```

- [ ] **Step 4: Run targeted and full tests**

Run: `npm run test:run -- src/pages/__tests__/ContactPage.test.tsx`  
Expected: PASS.

Run: `npm run test:run`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ContactPage.tsx src/pages/__tests__/ContactPage.test.tsx
git commit -m "feat: convert contact flow to consultation-first experience"
```

### Task 8: Final Verification, Accessibility, and Release Readiness

**Files:**
- Modify: `src/pages/HomePage.tsx` (only if final ordering tweaks needed)
- Modify: `docs/superpowers/specs/2026-05-30-premium-website-redesign-design.md` (append implementation status note)

- [ ] **Step 1: Write final integration smoke test first**

```typescript
// src/pages/__tests__/HomeConversion.test.tsx
import { renderWithProviders } from '@/test/renderWithProviders'
import { HomePage } from '@/pages/HomePage'
import { screen } from '@testing-library/react'

test('home page renders multiple consultation CTAs across funnel', () => {
  renderWithProviders(<HomePage />)
  expect(screen.getAllByRole('link', { name: /book a consultation call/i }).length).toBeGreaterThanOrEqual(3)
})
```

- [ ] **Step 2: Run integration test and confirm red**

Run: `npm run test:run -- src/pages/__tests__/HomeConversion.test.tsx`  
Expected: FAIL until all CTA placements are complete.

- [ ] **Step 3: Implement final minimal adjustments to pass integration test**

```tsx
// HomePage.tsx (section ordering excerpt)
<Hero />
<TrustStrip />
<ServicesGrid limit={6} showViewAll />
<AudienceSplit />
<TechnologyShowcase />
<ProcessTimeline />
<Testimonials />
<CTA />
```

- [ ] **Step 4: Run full verification suite**

Run: `npm run test:run`  
Expected: PASS.

Run: `npm run build`  
Expected: PASS.

Run: `npm run dev`  
Expected: Vite starts and homepage renders without runtime errors.

- [ ] **Step 5: Commit**

```bash
git add src docs/superpowers/specs/2026-05-30-premium-website-redesign-design.md
git commit -m "feat: deliver premium dual-audience redesign with consultation-first funnel"
```
