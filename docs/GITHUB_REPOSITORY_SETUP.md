# GitHub Repository — About & Community Setup

Use this guide to configure your GitHub repository **About** section and community health files so the repo looks complete and professional.

---

## Repository About (GitHub UI)

Go to **Repository → ⚙️ Settings** (or click the ⚙️ next to "About" on the repo home page) and fill in:

### Description

```
Official website & platform for Projonexa — Where Innovation Meets Execution. End-to-end project development for students, colleges, startups, and innovators.
```

### Website

```
https://projonexa.com
```

### Topics (tags)

Add these topics for discoverability:

```
projonexa
final-year-project
engineering-projects
student-projects
ai-ml
startup-mvp
web-development
react
typescript
vite
tailwindcss
innovation
academic-projects
research-assistance
iot
freelance
india
tech-startup
open-source
```

### Social preview

- Upload a **1200×630** Open Graph image when available (`public/og-image.png`)
- Enable **Releases**, **Packages**, and **Deployments** as needed

### Custom properties (GitHub Enterprise / org)

If your organization uses custom properties, suggested values:

| Property | Value |
|----------|--------|
| `product` | Projonexa |
| `type` | website |
| `status` | active |
| `team` | engineering |
| `region` | India |

---

## License

| Item | File | GitHub detection |
|------|------|------------------|
| **License** | [`LICENSE`](../LICENSE) | GNU AGPL v3 |

After pushing, GitHub will show **AGPL-3.0 license** in the repository sidebar.

To set manually: **Settings → General → Features → License → GNU Affero General Public License v3.0**

---

## Community health files

| File | Purpose | GitHub link |
|------|---------|-------------|
| [`README.md`](../README.md) | Project overview | Shown on repo home |
| [`LICENSE`](../LICENSE) | AGPL-3.0 | License badge |
| [`CODE_OF_CONDUCT.md`](../CODE_OF_CONDUCT.md) | Community standards | Community → Code of conduct |
| [`CONTRIBUTING.md`](../CONTRIBUTING.md) | How to contribute | Community → Contributing |
| [`SECURITY.md`](../SECURITY.md) | Vulnerability reporting | Community → Security policy |

GitHub auto-detects these at the **repository root** (or `.github/` for some templates).

---

## Issue & PR templates

| Path | Purpose |
|------|---------|
| `.github/ISSUE_TEMPLATE/bug_report.yml` | Structured bug reports |
| `.github/ISSUE_TEMPLATE/feature_request.yml` | Feature suggestions |
| `.github/ISSUE_TEMPLATE/config.yml` | Contact links for projects & security |
| `.github/pull_request_template.md` | PR checklist |

Enable in **Settings → General → Features → Issues → Set up templates**.

---

## Recommended repository settings

### General

- [x] Default branch: `main`
- [x] README visible on home page

### Features

- [x] Issues — for bugs and website features
- [ ] Wikis — optional (docs live in `/docs`)
- [ ] Projects — optional for internal roadmap

### Pull Requests

- [x] Allow squash merging
- [x] Suggest updating pull request branches

### Branches (optional protection)

Protect `main`:

- Require PR before merging
- Require status checks (`npm run build`) when CI is added

---

## Activity & insights

GitHub **Activity** and **Insights** populate automatically from:

- Commits and PRs
- Issues opened/closed
- Releases published
- Deployment events (Vercel/Netlify integration)

Connect **Vercel** or **Netlify** for deployment activity on the repo graph.

---

## Quick checklist after push

- [ ] About description and website URL set
- [ ] Topics/tags added
- [ ] License shows as **AGPL-3.0**
- [ ] Community standards show green checkmarks (README, CoC, Contributing, Security)
- [ ] Issue templates appear when creating new issue
- [ ] PR template loads on new pull requests

---

<div align="center">

**Projonexa** — *Where Innovation Meets Execution.*

</div>
