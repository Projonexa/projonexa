# Security Policy

## Supported Versions

Security updates are applied to the **latest release** on the `main` branch of this repository.

| Version | Supported |
|---------|-----------|
| Latest `main` | ✅ |
| Older tags / forks | ❌ |

---

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security issue in the Projonexa website, repository, or related infrastructure:

1. **Email:** [nisargalokhande@gmail.com](mailto:nisargalokhande@gmail.com)  
2. **Subject:** `Security Vulnerability — Projonexa`  
3. **Include:**
   - Description of the vulnerability  
   - Steps to reproduce  
   - Potential impact  
   - Affected URLs or components (if known)  
   - Your contact info (optional, for follow-up)  

We will acknowledge your report within **48 hours** and provide an initial assessment within **5 business days**.

---

## What to Report

- Cross-site scripting (XSS), CSRF, or injection flaws  
- Authentication or authorization bypasses  
- Exposure of secrets, API keys, or private data in the repo  
- Dependency vulnerabilities with demonstrable exploit paths  
- Misconfigured deployment or headers affecting this site  

---

## Out of Scope

- Social engineering or phishing against individuals  
- Denial-of-service attacks  
- Issues in third-party services (hosting, DNS) without a Projonexa-side fix  
- Client project code delivered outside this repository  
- Low-impact bugs with no security impact (use regular [issues](../../issues) instead)  

---

## Safe Harbor

We support responsible disclosure. We will not pursue legal action against researchers who:

- Act in good faith  
- Avoid privacy violations and data destruction  
- Give us reasonable time to fix the issue before public disclosure  

We appreciate the security community’s help in keeping Projonexa safe.

---

## Best Practices for Contributors

- Never commit `.env`, API keys, or credentials  
- Use `.env.example` for documented variables only  
- Keep dependencies updated (`npm audit`)  
- Review PRs for accidental secret exposure  

See also [`.gitignore`](.gitignore) and [CONTRIBUTING.md](CONTRIBUTING.md).

---

<div align="center">

**Projonexa** — *Where Innovation Meets Execution.*

</div>
