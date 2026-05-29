# Projonexa Brand Guidelines

## Brand Identity

**Name:** Projonexa  
**Tagline:** Where Innovation Meets Execution.

Projonexa positions itself as a premium technology startup — not a generic academic service. Visual and verbal identity should feel comparable to Stripe, Vercel, Linear, and Apple: clean, confident, minimal, and futuristic.

## Color Palette

| Role       | Hex       | Usage                                      |
|------------|-----------|--------------------------------------------|
| Primary    | `#00C8FF` | CTAs, links, accents, highlights             |
| Secondary  | `#6C63FF` | Gradients, secondary accents               |
| Dark       | `#0A0F1C` | Dark mode background                       |
| Light      | `#FFFFFF` | Light mode background                      |
| Accent     | `#67E8F9` | Hover states, subtle highlights            |
| Mid Blue   | `#3D8BFF` | Gradient midpoint                          |

### Official Gradient

```css
linear-gradient(135deg, #00C8FF 0%, #3D8BFF 50%, #6C63FF 100%);
```

## Typography

- **Primary font:** Inter (400, 500, 600, 700, 800)
- **Headlines:** Bold, tight tracking (`tracking-tight`)
- **Body:** Regular/Medium, relaxed line height for readability
- **Eyebrows:** Uppercase, wide letter-spacing (`tracking-widest`), brand primary color

## Logo

- Wordmark: **Projo** (default) + **nexa** (gradient text)
- Icon: Rounded square with gradient background and white “P”
- Minimum clear space: height of the “P” icon on all sides

## Voice & Tone

- **Professional** — credible to investors and institutions
- **Empowering** — speaks to student ambition without condescension
- **Clear** — no jargon without purpose
- **Confident** — outcomes-focused, not salesy

## UI Patterns

- **Glassmorphism:** `border-white/10`, `bg-white/5`, `backdrop-blur-xl`
- **Cards:** Rounded `2xl`, subtle border, hover glow on primary actions
- **Buttons:** Pill-shaped (`rounded-full`), gradient primary, outline secondary
- **Motion:** Framer Motion — fade-up on scroll, subtle scale on hover (max 1.02–1.05)
- **Dark/Light:** System preference default; user toggle persisted in `localStorage`

## Imagery

- Prefer abstract gradients, grid overlays, and soft blurs over stock photos
- Founder section uses initials avatar until professional headshot is available
- Technology section uses branded initial badges per stack (replace with SVG logos when assets are ready)

## Do / Don't

| Do | Don't |
|----|-------|
| Use brand gradient for primary CTAs | Use flat random colors |
| Keep sections spacious with clear hierarchy | Crowd pages with dense text blocks |
| Highlight metrics (100+, 150+) | Use vague “many clients” language |
| Link to real founder social profiles | Use placeholder lorem ipsum |

## Contact & Social

- **Email:** nisargalokhande@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/nslokhande/
- **GitHub:** https://github.com/nikobuddy/
- **Location:** Maharashtra, India
