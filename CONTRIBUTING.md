# Contributing to Projonexa

Thank you for your interest in Projonexa. This repository hosts the **official Projonexa website** and related open-source assets. We welcome thoughtful contributions that improve the platform, documentation, and developer experience.

---

## Ways to Contribute

| Type | Who | How |
|------|-----|-----|
| **Website & docs** | Developers | Fork, branch, PR (see below) |
| **Bug reports** | Anyone | [Open an issue](../../issues/new?template=bug_report.yml) |
| **Feature ideas** | Students, partners | [Open an issue](../../issues/new?template=feature_request.yml) |
| **Freelancer network** | Developers, designers | [Careers / Apply](https://projonexa.com/careers) or email us |
| **Project clients** | Students & startups | [Contact](https://projonexa.com/contact) — not via PR |

> **Note:** Client project work (final year projects, MVPs, etc.) is delivered through Projonexa services — not through this GitHub repo. See [projonexa.com](https://projonexa.com).

---

## Development Setup

```bash
git clone https://github.com/nikobuddy/projonexa.git
cd projonexa
npm install
npm run dev
```

Requirements: **Node.js 18+**, npm.

Verify before submitting:

```bash
npm run build
```

---

## Pull Request Guidelines

1. **Fork** the repository and create a branch from `main`  
   - `feature/short-description`  
   - `fix/short-description`  
   - `docs/short-description`  

2. **Keep changes focused** — one logical change per PR  

3. **Match existing style** — TypeScript, Tailwind, component patterns in `src/`  

4. **Update docs** if you change architecture, env vars, or setup steps  

5. **Do not commit** secrets, `.env` files, or client-specific content  

6. **Write clear PR descriptions** — what, why, and how to test  

---

## Code Standards

- Use TypeScript for all new source files  
- Prefer reusable components in `src/components/`  
- Put static copy and config in `src/data/`  
- Follow brand colors and patterns in [`docs/BRAND_GUIDELINES.md`](docs/BRAND_GUIDELINES.md)  
- Ensure responsive layout and dark/light theme compatibility  
- Keep accessibility in mind (semantic HTML, labels, focus states)  

---

## Commit Messages

Use clear, imperative messages:

```
feat: add research page FAQ section
fix: mobile nav overflow on small screens
docs: update SEO strategy for blog routes
```

---

## Issues

Before opening an issue, search existing ones and read [SUPPORT.md](SUPPORT.md) to choose the right channel.

| Template | Use for |
|----------|---------|
| [Bug report](../../issues/new?template=bug_report.yml) | Website or repo defects |
| [Feature request](../../issues/new?template=feature_request.yml) | New website features |
| [Documentation](../../issues/new?template=documentation.yml) | Missing or unclear docs |
| [Question](../../issues/new?template=question.yml) | Repo / dev setup questions |

**Not for GitHub issues:** client projects → [Contact](https://projonexa.com/contact)

---

## Community

All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Questions?

- **Website / tech:** [Open a GitHub issue](../../issues)  
- **Projects & services:** [nisargalokhande@gmail.com](mailto:nisargalokhande@gmail.com)  
- **Join as freelancer:** [Careers](https://projonexa.com/careers)  

---

<div align="center">

**Projonexa** — *Where Innovation Meets Execution.*

</div>
