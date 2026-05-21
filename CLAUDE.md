# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

## Commands

```bash
npm run dev      # start Vite dev server (localhost:5173)
npm run build    # production build → dist/
npm run preview  # serve dist/ locally after build
```

No test runner is configured.

## Architecture

### Routing & Entry

`src/main.jsx` bootstraps the app: hydrates the Redux cart from `localStorage["FinalCart"]`, subscribes to persist cart changes, then mounts `<Provider>` → `<BrowserRouter>` → `<App>`.

`src/App.jsx` defines six routes under a `<Navbar>` + `max-w-6xl` container:

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Marketing splash |
| `/explore` | Explore | Product grid |
| `/preview/:id` | Preview | PDP with Add to Cart |
| `/cart` | Cart | Cart with `BackdOfferCard` sidebar |
| `/checkout` | Checkout | CC form + BNPL modal launcher |
| `/BackdPay` | BackdPay | Order success; clears cart on mount |

`/BackdPay` doubles as the BNPL `order_success_url` target — both the CC form submit and BNPL modal success navigate here.

### Redux Store (`src/store/`)

Two slices:

**`cartSlice`** — Items keyed by `(id, size)` so the same shoe in different sizes is a separate line item. Cart is persisted to/from `localStorage["FinalCart"]`. Selectors: `selectItems`, `selectCount`, `selectTotalCents`.

**`applicationSlice`** — Drives the multi-step BNPL application flow. `currentStep` progresses through: `landing → business-info → financial-info → terms-selection → review → success`. Contains business/financial form data, selected terms, and submission state.

### BNPL Flow

The BNPL widget is a locally-owned React component tree (previously an iframe to `sandbox.bnpl.backd.com`):

1. `PayLaterButton` on `/checkout` opens `BackdPaymentsModal`
2. `BackdPaymentsModal` — dialog wrapper (ESC closes, backdrop click closes, body scroll locked, resets `applicationSlice` to `landing` on open) — renders `BackdPaymentsApp` inside
3. `BackdPaymentsApp` — step router driven by `applicationSlice.currentStep`, renders: `LandingPage` → `BusinessInfoForm` → `FinancialInfoForm` → `TermsSelection` → `ApplicationReview` → `ApplicationSuccess`
4. On success, `BackdPaymentsModal` calls `onSuccess` → modal closes → `completeOrder()` navigates to `/BackdPay`

### Rate Logic (`src/lib/rates.js`)

`asLowAsMonthlyCents(totalCents)` computes the 24-month monthly payment (rate 1.33) displayed as "as low as $X/mo" in `BackdOfferCard`. `netThirtyTotalCents` is interest-free (rate 1.0). These are the only two values surfaced in the demo UI.

### Design Tokens

Defined in `tailwind.config.js`. Key custom tokens:

- `mint-500` (`#269374`) — BackdPayments brand green; used for focus rings, accents, brand elements
- `navy-900/700/500` (OKLCH) — primary text hierarchy
- `ink` / `ink-soft` (OKLCH) — near-black for primary action buttons
- `paper` (OKLCH) — near-white page background
- `forest-900/950/line` — dark background for the BNPL modal interior
- `gold-500/600` — CTA button color on the BNPL landing card

Custom easing: `ease-out-quart`, `ease-out-expo` for transitions. Always pair with `motion-reduce:transition-none`.

The hex grid background in `BackdPaymentsApp` uses two offset SVG `<pattern>` layers (IDs `bnpl-hex-a` / `bnpl-hex-b`) to approximate a honeycomb tessellation — SVG patterns can't natively stagger rows, so two passes composite it.

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
