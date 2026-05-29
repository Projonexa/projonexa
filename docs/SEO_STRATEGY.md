# Projonexa SEO Strategy

## Primary Keywords

| Keyword | Target Page |
|---------|-------------|
| Final Year Projects | `/services`, `/` |
| Engineering Projects | `/services`, `/projects` |
| AI Projects | `/services`, `/blog` |
| Research Projects | `/research` |
| Startup MVP Development | `/services`, `/pricing` |
| Software Development | `/services`, `/portfolio` |
| Project Assistance | `/`, `/contact` |
| Academic Projects | `/services`, `/pricing` |

## Meta Titles & Descriptions

Configured in `src/data/seo.ts` and injected per route via `SEO` component.

| Page | Title Pattern |
|------|---------------|
| Home | Projonexa \| Where Innovation Meets Execution. |
| Services | Services \| Projonexa — Project Development |
| Contact | Contact Projonexa — Get Started |

## Open Graph & Twitter Cards

- `og:type` = website  
- `og:image` = `https://projonexa.com/og-image.png` (add 1200×630 asset)  
- Twitter `summary_large_image`  

## Structured Data

JSON-LD `Organization` schema on all pages:

- Name, URL, logo, description, slogan  
- Founder (`Person`)  
- `sameAs` social profiles  
- `knowsAbout` keyword array  

## Sitemap

- Static file: `public/sitemap.xml`  
- Update `lastmod` when content changes significantly  
- Submit to Google Search Console after deploy  

## Technical SEO Checklist

- [x] Semantic HTML (`header`, `main`, `nav`, `article`, `section`)  
- [x] Canonical URLs per page  
- [x] Mobile-responsive layout  
- [x] `robots.txt` with sitemap reference  
- [x] Fast Vite static build  
- [ ] Add `og-image.png` to `public/`  
- [ ] Configure HTTPS and custom domain  
- [ ] Google Search Console verification  
- [ ] Core Web Vitals monitoring post-launch  

## Content Strategy

1. Publish blog posts targeting long-tail queries (see `src/data/blog.ts`).  
2. Add case studies to Projects/Portfolio with real screenshots.  
3. Build backlinks from college tech clubs and hackathon communities.  
4. Local SEO: Maharashtra, India + "project development" queries.  

## Local Business (Optional)

When registered, add `LocalBusiness` schema with address and `areaServed`.
