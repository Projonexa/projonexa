# GitHub Repository — About & Community Setup

Complete guide to configure your Projonexa GitHub repository for a **professional, enterprise-grade** open-source presence.

---

## Repository About (GitHub UI)

Go to the repository home page → click **⚙️** next to **About** (or **Settings → General**).

### Description

```
Official website & platform for Projonexa — Where Innovation Meets Execution. End-to-end project development for students, colleges, startups, and innovators.
```

### Website

```
https://projonexa.com
```

### Topics (tags)

```
projonexa
final-year-project
engineering-projects
student-projects
academic-projects
ai-ml
machine-learning
startup-mvp
web-development
mobile-development
iot
research-paper
react
typescript
vite
tailwindcss
framer-motion
innovation
tech-startup
freelance
india
open-source
agpl-3.0
documentation
```

### Social preview

- Upload **1200×630** image: `public/og-image.png`
- **Settings → General → Social preview → Upload image**

### Custom properties (Organizations / Enterprise)

| Property | Value |
|----------|--------|
| `product` | Projonexa |
| `type` | website |
| `status` | active |
| `license` | AGPL-3.0 |
| `team` | engineering |
| `region` | India |
| `audience` | students, startups, colleges |

---

## Community health files (GitHub sidebar)

GitHub auto-detects these files and shows them under **Community standards**:

| File | GitHub shows | Purpose |
|------|--------------|---------|
| [`README.md`](../README.md) | Readme | Project overview |
| [`LICENSE`](../LICENSE) | AGPL-3.0 license | Legal license |
| [`CODE_OF_CONDUCT.md`](../CODE_OF_CONDUCT.md) | Code of conduct | Community behavior |
| [`CONTRIBUTING.md`](../CONTRIBUTING.md) | Contributing | How to contribute |
| [`SECURITY.md`](../SECURITY.md) | Security policy | Vulnerability reporting |
| [`SUPPORT.md`](../SUPPORT.md) | Support / help | Where to get help |

Additional governance files:

| File | Purpose |
|------|---------|
| [`MAINTAINERS.md`](../MAINTAINERS.md) | Maintainer list & responsibilities |
| [`CHANGELOG.md`](../CHANGELOG.md) | Version history |
| [`.github/CODEOWNERS`](../.github/CODEOWNERS) | Auto-request reviews |

---

## Issue templates

| Template | File | Labels |
|----------|------|--------|
| Bug Report | `.github/ISSUE_TEMPLATE/bug_report.yml` | `bug`, `needs-triage` |
| Feature Request | `.github/ISSUE_TEMPLATE/feature_request.yml` | `enhancement`, `needs-triage` |
| Documentation | `.github/ISSUE_TEMPLATE/documentation.yml` | `documentation`, `needs-triage` |
| Question | `.github/ISSUE_TEMPLATE/question.yml` | `question`, `needs-triage` |
| Config (contact links) | `.github/ISSUE_TEMPLATE/config.yml` | — |

**Recommended labels** (create in **Issues → Labels**):

| Label | Color | Use |
|-------|-------|-----|
| `bug` | `#d73a4a` | Defects |
| `enhancement` | `#a2eeef` | Features |
| `documentation` | `#0075ca` | Docs |
| `question` | `#d876e3` | Questions |
| `needs-triage` | `#fbca04` | Awaiting review |
| `good first issue` | `#7057ff` | Starter tasks |
| `help wanted` | `#008672` | Community help |
| `dependencies` | `#0366d6` | Dependabot PRs |
| `github-actions` | `#000000` | CI/CD |

---

## Pull requests

| File | Purpose |
|------|---------|
| [`.github/pull_request_template.md`](../.github/pull_request_template.md) | PR checklist & testing guide |

**Settings → Pull Requests:**

- [x] Allow squash merging  
- [x] Default to squash merge  
- [x] Automatically delete head branches  
- [x] Suggest updating pull request branches  

---

## Automation

| File | Purpose |
|------|---------|
| [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) | Build & typecheck on push/PR |
| [`.github/dependabot.yml`](../.github/dependabot.yml) | Weekly npm + monthly Actions updates |

**Enable branch protection** (Settings → Branches → Add rule for `main`):

- [x] Require pull request before merging  
- [x] Require status checks: **Build & Typecheck**  
- [x] Require branches to be up to date  

---

## Developer experience files

| File | Purpose |
|------|---------|
| [`.editorconfig`](../.editorconfig) | Consistent editor formatting |
| [`.nvmrc`](../.nvmrc) | Node.js 20 for local dev |
| [`.env.example`](../.env.example) | Safe env variable template |
| [`.gitignore`](../.gitignore) | Ignore secrets, build output, caches |

---

## Releases & changelog

1. Update [`CHANGELOG.md`](../CHANGELOG.md) for each release  
2. Create a GitHub Release: **Releases → Draft a new release**  
   - Tag: `v1.0.0`  
   - Title: `v1.0.0 — Initial public release`  
   - Paste changelog section  
3. Enable **Generate release notes** for future releases  

---

## Integrations (recommended)

| Service | Purpose |
|---------|---------|
| **Vercel** or **Netlify** | Deploy website from `main` |
| **GitHub Pages** | Alternative static hosting |
| **Dependabot** | Already configured via `.github/dependabot.yml` |
| **GitHub Discussions** | Optional Q&A (Settings → Features → Discussions) |

---

## Activity & Insights

Populated automatically from commits, PRs, issues, releases, and deployments.

For a healthy **Activity** graph:

- Enable CI (`.github/workflows/ci.yml`)  
- Connect deployment integration  
- Publish releases with tags  

---

## Complete checklist after push

### Repository About
- [ ] Description set  
- [ ] Website URL set  
- [ ] Topics/tags added  
- [ ] Social preview image uploaded  

### Community standards (all green)
- [ ] README  
- [ ] License (AGPL-3.0)  
- [ ] Code of conduct  
- [ ] Contributing  
- [ ] Security policy  
- [ ] Support (SUPPORT.md)  

### Templates & automation
- [ ] Issue templates visible (4 types + contact links)  
- [ ] PR template loads on new PR  
- [ ] CI workflow passes on `main`  
- [ ] Dependabot enabled (Settings → Code security → Dependabot)  
- [ ] Branch protection on `main` with required CI check  

### Optional polish
- [ ] Create `v1.0.0` release  
- [ ] Enable GitHub Discussions  
- [ ] Pin repository on profile  
- [ ] Add to GitHub organization profile (if applicable)  

---

<div align="center">

**Projonexa** — *Where Innovation Meets Execution.*

</div>
