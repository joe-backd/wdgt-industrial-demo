# Roadmap: SNKR hub — BackdPayments BNPL Demo

**Milestone:** v1 (shipped)
**Created:** 2026-05-09 (retroactive)
**Coverage:** 20 / 20 v1 requirements mapped, 4 / 4 phases complete

## Phase Summary

| # | Phase | Goal | Requirements | Status |
|---|-------|------|--------------|--------|
| 1 | Parity Build | Recreate the live `backd-bnpl-demo` storefront from its production bundle | PARITY-01 .. PARITY-06, DESIGN-02 | ✓ Complete |
| 2 | BackdPayments Rebrand | Swap "BackdPay" for "BackdPayments" in copy and widget logo | REBRAND-01, REBRAND-02 | ✓ Complete |
| 3 | Checkout Panel Craft | Replace the cart's generic Summary with the mint Net 30 / installments offer card | CHECKOUT-01..05, DESIGN-01, DESIGN-03..05 | ✓ Complete |
| 4 | Vercel Deploy | Ship to a Vercel project with the right framework override and SPA rewrite | DEPLOY-01, DEPLOY-02 | ✓ Complete |

---

## Phase Details

### Phase 1: Parity Build
**Goal:** Recreate the live `backd-bnpl-demo` storefront locally from its production bundle so the demo is editable.
**Mode:** mvp
**Requirements:** PARITY-01, PARITY-02, PARITY-03, PARITY-04, PARITY-05, PARITY-06, DESIGN-02
**Success Criteria:**
1. All 5 routes (`/`, `/explore`, `/preview/:id`, `/cart`, `/BackdPay`) render and respond 200
2. Cart `add` / `remove` / `removeAll` work end-to-end with `localStorage["FinalCart"]` persistence matching the live site's key
3. The 80-product catalog (extracted from the live bundle) renders with images, prices, sizes, and stories
4. The BackdPayments widget script tag is in the page shell and loads without errors
5. Production build (`vite build`) compiles cleanly

### Phase 2: BackdPayments Rebrand
**Goal:** Replace every "BackdPay" reference with "BackdPayments" in user-visible copy AND the third-party widget's rendered logo.
**Mode:** mvp
**Requirements:** REBRAND-01, REBRAND-02
**Success Criteria:**
1. No user-visible string says "BackdPay" anywhere in the SPA (route paths and code identifiers OK)
2. The widget's composed logo renders as `[B] Backd Payments` with `Payments` in green (the bundle ships only `Pay`; we patch the DOM)
3. The MutationObserver-based patch survives widget re-renders triggered by total changes
4. No console errors after the patch lands

### Phase 3: Checkout Panel Craft
**Goal:** Redesign the `/cart` and `/preview/:id` BNPL summary to match image #4 — a mint-tinted Net 30 / installments offer card with a polished BackdPayments lockup and a black `PROCEED TO CHECKOUT` CTA — using the impeccable craft flow.
**Mode:** mvp
**Requirements:** CHECKOUT-01, CHECKOUT-02, CHECKOUT-03, CHECKOUT-04, CHECKOUT-05, DESIGN-01, DESIGN-03, DESIGN-04, DESIGN-05
**Success Criteria:**
1. Cart and preview both render the mint offer card with `Net 30 / Up to 90 days` left, vertical mint divider with `OR` badge, `as low as $X.XX/mo` right (cart total ÷ 4 for cart; unit price ÷ 4 for preview)
2. `PROCEED TO CHECKOUT` invokes `widgetBackd.initializeWidget()` with a complete order shape (merchant, mode, items, callbacks); modal opens and round-trips
3. If the widget script hasn't loaded, CTA falls back to direct `/BackdPay` navigation within ~600ms
4. OKLCH design tokens compile through Tailwind to clean values; no `#000`/`#fff`, no gradient text, no glassmorphism
5. Preview pages no longer mount the third-party `.backd-pdp-root` widget inline — the new offer card is fully drawn by our code

### Phase 4: Vercel Deploy
**Goal:** Ship a production deployment under the `backdpayments` team that other Backd folks can share.
**Mode:** mvp
**Requirements:** DEPLOY-01, DEPLOY-02
**Success Criteria:**
1. `https://v0-joe-demo.vercel.app` returns 200 on `/`, `/cart`, `/preview/473391`, `/BackdPay`
2. `vercel.json` declares Vite framework + SPA rewrite (project's stored preset was Next.js because v0.dev created it)
3. `.env` is excluded from upload via `.vercelignore`; no API token leaks into the deployed build
4. Deployment build size in a reasonable range (~330KB JS / 15.5KB CSS)

---

## Next Milestone

v1 is shipped and validated. To start the next milestone (e.g. demo polish, multi-surface, real product copy), run:

```
/gsd-new-milestone
```

That refreshes PROJECT.md context, gathers next-scope requirements, and creates a fresh ROADMAP.md for the next set of phases.

---
*Last updated: 2026-05-09 after retroactive GSD initialization*
