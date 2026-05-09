<!-- GSD:project-start source:PROJECT.md -->
## Project

**SNKR hub — BackdPayments BNPL Demo**

A Vite + React + Tailwind sneaker storefront ("SNKR hub") that demos the BackdPayments BNPL widget for Backd's internal sales walkthroughs to prospective merchants. Built as a parity recreation of `backd-bnpl-demo.vercel.app` with the original BackdPay branding swapped to BackdPayments and the cart/preview checkout module redesigned around a mint Net 30 / installments offer card.

**Core Value:** **A prospective merchant watching a 5-minute demo concludes "BackdPayments would feel native in our checkout."** Everything in the project serves that one belief — visual polish in the BackdPayments-branded zones, plain-language copy, and a real BNPL flow that opens the modal and returns to a success page.

### Constraints

- **Tech stack**: React 18 + Vite 5 + Tailwind 3 + Redux Toolkit 2 + React Router 6 + styled-components 6 — Mirrors the live site's recovered stack so behavior matches.
- **Hosting**: Vercel (project `backdpayments/v0-joe-demo`) — Linked via `vercel link`; framework override to Vite via `vercel.json` (project default was Next.js because v0.dev created it).
- **Design system**: OKLCH-source color tokens declared in `tailwind.config.js`; Montserrat from Google Fonts; no pure black/white; no gradient text; no glassmorphism — Per impeccable design laws and PRODUCT.md anti-references.
- **A11y**: WCAG 2.1 AA — Body contrast ≥4.5:1, large/UI ≥3:1; visible focus rings; respects `prefers-reduced-motion`.
- **Secrets**: `.env` ignored by git AND `.vercelignore`; only contains `VERCEL_API_KEY` (a "limited" scope token belonging to xvukel — not used in builds).
<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->
## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
