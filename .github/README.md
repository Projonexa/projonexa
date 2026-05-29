# .github

GitHub community, automation, and governance configuration for the **Projonexa** official website repository.

## Structure

```
.github/
├── CODEOWNERS                 # Default reviewer: @nikobuddy
├── dependabot.yml             # npm + GitHub Actions updates
├── pull_request_template.md   # PR checklist
├── ISSUE_TEMPLATE/
│   ├── config.yml             # Contact links (projects, careers, security)
│   ├── bug_report.yml
│   ├── feature_request.yml
│   ├── documentation.yml
│   └── question.yml
└── workflows/
    └── ci.yml                 # Build & typecheck on push/PR
```

## Related root files

| File | Purpose |
|------|---------|
| `CODE_OF_CONDUCT.md` | Community standards |
| `CONTRIBUTING.md` | Contribution guide |
| `SECURITY.md` | Vulnerability reporting |
| `SUPPORT.md` | Help routing (projects vs repo) |
| `MAINTAINERS.md` | Maintainer responsibilities |
| `CHANGELOG.md` | Release history |
| `LICENSE` | AGPL-3.0 |

## Setup guide

See [`docs/GITHUB_REPOSITORY_SETUP.md`](../docs/GITHUB_REPOSITORY_SETUP.md) for the full About section, labels, branch protection, and launch checklist.
