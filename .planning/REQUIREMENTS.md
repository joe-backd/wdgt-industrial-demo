# Requirements: SNKR hub — BackdPayments BNPL Demo

**Defined:** 2026-05-09 (retroactive)
**Core Value:** A prospective merchant watching a 5-minute demo concludes "BackdPayments would feel native in our checkout."

## v1 Requirements

All v1 requirements shipped to `https://v0-joe-demo.vercel.app`.

### Parity Build

<!-- Match the recovered backd-bnpl-demo.vercel.app stack and behavior. -->

- [x] **PARITY-01**: Vite + React 18 + Tailwind 3 + Redux Toolkit + React Router 6 + styled-components scaffold
- [x] **PARITY-02**: Five client-side routes (`/`, `/explore`, `/preview/:id`, `/cart`, `/BackdPay`)
- [x] **PARITY-03**: 80-product catalog (goat.com schema) extracted from the live bundle
- [x] **PARITY-04**: Cart slice with `add` / `remove` / `removeAll` actions, persisted to `localStorage["FinalCart"]`
- [x] **PARITY-05**: BackdPayments widget script tag in the page shell (`https://sandbox.widget.bnpl.backd.com`)
- [x] **PARITY-06**: SPA rewrite on Vercel so direct hits to nested routes return 200

### BackdPayments Rebrand

<!-- Replace BackdPay branding with BackdPayments throughout. -->

- [x] **REBRAND-01**: All static labels say "BackdPayments" (cart, preview, home hero, success page)
- [x] **REBRAND-02**: Widget logo's `<b>Pay</b>` text node rewritten to "Payments" via MutationObserver after each render

### Checkout Panel Craft

<!-- Replace generic Summary with the mint Net 30 / installments offer card matching image #4. -->

- [x] **CHECKOUT-01**: Mint-tinted offer card on `/cart` and `/preview/:id` with 3-row internal layout (Net 30 / OR divider / installments split, then horizontal divider, then BackdPayments lockup)
- [x] **CHECKOUT-02**: Black `PROCEED TO CHECKOUT` CTA on `/cart` invokes `widgetBackd.initializeWidget()` with full live-site order shape (merchant + mode + items + onSuccess/onClose/onFail callbacks); on success clears cart and navigates `/BackdPay`
- [x] **CHECKOUT-03**: Widget-readiness polling (250ms) and 600ms direct-nav fallback so the demo never feels broken
- [x] **CHECKOUT-04**: Reusable `BackdOfferCard` shared between cart and preview pages
- [x] **CHECKOUT-05**: Inline `.backd-pdp-root` widget removed from cart and preview (now drawn by our component); widget only loads on CTA click

### Design System

<!-- OKLCH tokens, anti-pattern compliance per impeccable laws. -->

- [x] **DESIGN-01**: OKLCH source color tokens (`mint`, `navy`, `ink`, `paper` scales) in `tailwind.config.js`
- [x] **DESIGN-02**: Montserrat font loaded from Google Fonts
- [x] **DESIGN-03**: No pure `#000`/`#fff` (ink CTA = `#0b0e10`, navy text = `#0b1219`)
- [x] **DESIGN-04**: WCAG 2.1 AA contrast on all text and UI; visible focus rings; `prefers-reduced-motion` respected
- [x] **DESIGN-05**: BackdPayments brand mark uses the widget's actual base64 SVG B-icon for visual consistency

### Deployment

- [x] **DEPLOY-01**: Production deploy to Vercel project `backdpayments/v0-joe-demo`, aliased `https://v0-joe-demo.vercel.app`
- [x] **DEPLOY-02**: `vercel.json` overrides framework to Vite (project default was Next.js from v0.dev creation) with SPA rewrite

## v2 Requirements

<!-- Plausible next-milestone scope. None committed; user confirms before promotion. -->

### Demo Polish

- **POLISH-01**: Real-feeling product copy and pricing curated for the demo (current data is verbatim from the bundle's goat schema with synthetic small prices)
- **POLISH-02**: Order receipt UI on `/BackdPay` showing the items + installment schedule (currently a generic "Payment scheduled" card)
- **POLISH-03**: Mobile responsive review at narrow viewports — verify the offer card's 1fr/auto/1fr grid holds at ≤360px

### Multi-Surface

- **SURFACE-01**: Multi-merchant theming (alternative storefront skin to demonstrate widget portability)
- **SURFACE-02**: Net 30 vs installments toggle (image #4 shows both as one panel; some merchants may want only one)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real authentication / accounts | Sales-demo storefront — no user identity needed |
| Real payment / order persistence | Widget handles BNPL flow; success just navigates to a static confirmation |
| Real shipping / tax computation | `tax_amount: 0`, `shipping_amount: 0`; sample person hardcoded for shipping/billing |
| Mobile native app | Web-only, sales-demo context |
| WCAG AAA contrast | Restricts palette without prospect benefit; AA is the floor (per PRODUCT.md) |
| Generic SaaS dashboard cream aesthetic | Explicit anti-reference in PRODUCT.md |
| Admin panel for editing the demo | Code-edit + redeploy is the editing path |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| PARITY-01 | Phase 1 | Complete |
| PARITY-02 | Phase 1 | Complete |
| PARITY-03 | Phase 1 | Complete |
| PARITY-04 | Phase 1 | Complete |
| PARITY-05 | Phase 1 | Complete |
| PARITY-06 | Phase 1 | Complete |
| REBRAND-01 | Phase 2 | Complete |
| REBRAND-02 | Phase 2 | Complete |
| CHECKOUT-01 | Phase 3 | Complete |
| CHECKOUT-02 | Phase 3 | Complete |
| CHECKOUT-03 | Phase 3 | Complete |
| CHECKOUT-04 | Phase 3 | Complete |
| CHECKOUT-05 | Phase 3 | Complete |
| DESIGN-01 | Phase 3 | Complete |
| DESIGN-02 | Phase 1 | Complete |
| DESIGN-03 | Phase 3 | Complete |
| DESIGN-04 | Phase 3 | Complete |
| DESIGN-05 | Phase 3 | Complete |
| DEPLOY-01 | Phase 4 | Complete |
| DEPLOY-02 | Phase 4 | Complete |

**Coverage:**
- v1 requirements: 20 total
- Mapped to phases: 20
- Complete: 20
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-09 (retroactive)*
*Last updated: 2026-05-09 after v1 milestone shipped*
