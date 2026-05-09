# SNKR hub — BackdPayments BNPL Demo

## What This Is

A Vite + React + Tailwind sneaker storefront ("SNKR hub") that demos the BackdPayments BNPL widget for Backd's internal sales walkthroughs to prospective merchants. Built as a parity recreation of `backd-bnpl-demo.vercel.app` with the original BackdPay branding swapped to BackdPayments and the cart/preview checkout module redesigned around a mint Net 30 / installments offer card.

## Core Value

**A prospective merchant watching a 5-minute demo concludes "BackdPayments would feel native in our checkout."** Everything in the project serves that one belief — visual polish in the BackdPayments-branded zones, plain-language copy, and a real BNPL flow that opens the modal and returns to a success page.

## Requirements

### Validated

<!-- Shipped to https://v0-joe-demo.vercel.app and confirmed working. -->

- ✓ **PARITY-01**: Vite + React 18 + Tailwind 3 + Redux Toolkit + RR6 stack matching the live site — Phase 1
- ✓ **PARITY-02**: Five client-side routes (`/`, `/explore`, `/preview/:id`, `/cart`, `/BackdPay`) — Phase 1
- ✓ **PARITY-03**: 80-product catalog extracted from the live bundle (goat.com schema with brand, name, price, sizes, story) — Phase 1
- ✓ **PARITY-04**: Cart with `add` / `remove` / `removeAll` actions, persisted to `localStorage["FinalCart"]` (same key as the live site) — Phase 1
- ✓ **PARITY-05**: BackdPayments widget script loaded from `sandbox.widget.bnpl.backd.com` in the page shell — Phase 1
- ✓ **PARITY-06**: SPA rewrite on Vercel so direct hits to `/cart`, `/preview/:id` etc. return 200 — Phase 1
- ✓ **REBRAND-01**: All user-facing copy says "BackdPayments" not "BackdPay" — Phase 2
- ✓ **REBRAND-02**: Widget logo's `<b>Pay</b>` DOM node rewritten to "Payments" via MutationObserver after each render — Phase 2
- ✓ **CHECKOUT-01**: Cart sidebar shows a mint-tinted offer card with `Net 30 / Up to 90 days` left, vertical mint divider with `OR` badge, `as low as $X.XX/mo` right (cart total ÷ 4), centered BackdPayments lockup — Phase 3
- ✓ **CHECKOUT-02**: Black `PROCEED TO CHECKOUT` CTA invokes `widgetBackd.initializeWidget()` with full live-site order shape (merchant, mode, items, callbacks); on success clears cart and navigates `/BackdPay` — Phase 3
- ✓ **CHECKOUT-03**: Widget-not-loaded fallback (300ms poll, 600ms timeout direct-nav) so the demo never feels broken — Phase 3
- ✓ **CHECKOUT-04**: Same offer card on `/preview/:id` (priced from the unit `retail_price_cents`); replaces the inline third-party widget render — Phase 3
- ✓ **DESIGN-01**: OKLCH color tokens (`mint-50` card, `mint-500` Payments text, `ink` CTA, `navy-900` body) — no `#000`/`#fff`, no gradient text, no glassmorphism — Phase 3
- ✓ **DEPLOY-01**: Live at `https://v0-joe-demo.vercel.app` under team `backdpayments` — Phase 4

### Active

<!-- No active scope. Next milestone TBD. -->

(None — milestone v1 shipped. Add via `/gsd-new-milestone` when next scope is defined.)

### Out of Scope

- **Real auth / accounts** — demo storefront, no user identity needed
- **Real payment / order persistence** — widget itself handles the BNPL flow; success just clears the cart and navigates to a static confirmation page
- **Real shipping / tax computation** — `tax_amount: 0`, `shipping_amount: 0` sent to widget; sample person hardcoded for shipping/billing
- **Mobile native app** — web-only, sales-demo context
- **Multi-merchant theming** — one storefront skin (SNKR hub) for now
- **A11y AAA contrast** — WCAG 2.1 AA only; AAA limits palette options without prospect benefit (per PRODUCT.md)

## Context

- **Origin:** Reverse-engineered from `https://backd-bnpl-demo.vercel.app/cart` (production-built Vite bundle). No source access via the Vercel API token in `.env` — the project lives under a different team. Source recovered by mining the minified bundle for routes, Redux action types, product data, widget config, and modal trigger callbacks.
- **Brand context:** A separate `PRODUCT.md` at the project root captures the impeccable design context (register: product; personality: friendly/approachable/transparent; anti-references: generic SaaS dashboard cream). Read it before any UI work.
- **Widget:** `https://sandbox.widget.bnpl.backd.com` ships a 3.9MB UMD bundle exposing `window.widgetBackd` with `initializeWidget(props)`, `PDP.getPDP_display(publicKey)`, and `open()`. Public test API key `pk_b3cf33a316e546ee86103b97bc795a91` is hardcoded in the live bundle — preserved here.
- **Widget rebrand limitation:** The widget bundle has zero "BackdPayments" string. Logo is composed in the DOM (`<b>Backd</b>` + `<b>Pay</b>` green span). Our `BackdPayWidget` component used a MutationObserver to patch "Pay" → "Payments" after each widget render. With Phase 3 the inline widget no longer mounts on cart/preview — only via the click-triggered modal — so the in-app branding is now fully drawn by our own code.
- **Communication system:** A workspace-level inbox lives at `/Users/joekessler/Sites/backd/.inbox/` (untracked, local-only). The CLI is `/Users/joekessler/Sites/backd/.inbox/bin/inbox`. Other backd sub-projects can `inbox send --to demo-site-sandbox` to leave messages here.

## Constraints

- **Tech stack**: React 18 + Vite 5 + Tailwind 3 + Redux Toolkit 2 + React Router 6 + styled-components 6 — Mirrors the live site's recovered stack so behavior matches.
- **Hosting**: Vercel (project `backdpayments/v0-joe-demo`) — Linked via `vercel link`; framework override to Vite via `vercel.json` (project default was Next.js because v0.dev created it).
- **Design system**: OKLCH-source color tokens declared in `tailwind.config.js`; Montserrat from Google Fonts; no pure black/white; no gradient text; no glassmorphism — Per impeccable design laws and PRODUCT.md anti-references.
- **A11y**: WCAG 2.1 AA — Body contrast ≥4.5:1, large/UI ≥3:1; visible focus rings; respects `prefers-reduced-motion`.
- **Secrets**: `.env` ignored by git AND `.vercelignore`; only contains `VERCEL_API_KEY` (a "limited" scope token belonging to xvukel — not used in builds).

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Build a parity site rather than mirror the static dist | The user wants editable React source, not a frozen copy | ✓ Good — enabled later checkout craft + rebrand |
| Use the live bundle's recovered config shape (`Ne`) verbatim for `initializeWidget` | Minimizes risk of widget rejecting the order; behavior matches the real product | ✓ Good — modal opens, initializes, and round-trips |
| DOM-patch the widget's "Pay" → "Payments" via MutationObserver | Widget bundle has no BackdPayments branding; can't change `data-type` to fix it | ⚠️ Revisit — superseded in Phase 3 (inline widget no longer mounts on cart/preview) |
| Override the Vercel project's framework via `vercel.json` rather than reconfiguring the dashboard | Project was created by v0.dev with Next.js preset; in-repo override is reproducible | ✓ Good — deploys cleanly |
| Skip browser-screenshot critique loop after the checkout craft | User chose "skip critique — just redeploy now" | — Pending — verify in production walkthrough |
| Use `.planning/` (not Next.js conventions) for project context | Following GSD workflow, retroactively initialized | — Pending — first GSD milestone |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-09 after retroactive GSD initialization (v1 milestone shipped)*
