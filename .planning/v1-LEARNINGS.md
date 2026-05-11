---
phase: v1
phase_name: "v1 Milestone (retroactive)"
project: "SNKR hub — BackdPayments BNPL Demo"
generated: "2026-05-11"
counts:
  decisions: 7
  lessons: 5
  patterns: 6
  surprises: 6
missing_artifacts:
  - "*-PLAN.md (no per-phase planning ran; project initialized retroactively after shipping)"
  - "*-SUMMARY.md (no per-phase execution ran through the GSD workflow)"
  - "*-VERIFICATION.md"
  - "*-UAT.md"
sources_used:
  - ".planning/PROJECT.md (Key Decisions table, Context section)"
  - ".planning/ROADMAP.md (phase descriptions and success criteria)"
  - ".planning/STATE.md (Open Items, Recent Activity)"
  - "git log (commit messages on main)"
  - "source code at the time of extraction"
  - "conversation history (project retrospective)"
deviation_note: "Strict /gsd-extract-learnings expects per-phase *-PLAN.md and *-SUMMARY.md, which weren't created by the retroactive /gsd-new-project. This file is adapted to the milestone level. Future milestones run through the full workflow will produce per-phase LEARNINGS.md files alongside this one."
---

# v1 Milestone Learnings: SNKR hub — BackdPayments BNPL Demo

## Decisions

### Build a parity site, not a static mirror

The starting input was the deployed `backd-bnpl-demo.vercel.app/cart`, with no source access. We chose to reverse-engineer it into an editable React codebase rather than serve a static copy of the deployed files.

**Rationale:** an editable codebase enabled everything that came after — rebranding, the new checkout panel, the offer card, the local BNPL clone. A static mirror would have frozen the work.
**Source:** `.planning/PROJECT.md` (Key Decisions table)

---

### Use the live bundle's recovered config shape verbatim for `initializeWidget`

When wiring `widgetBackd.initializeWidget()`, we mirrored the production order-config object (`merchant`, `mode`, `shipping`, `billing`, `items`, `tax_amount`, etc.) exactly as recovered from the minified bundle, instead of inventing a "minimal" version.

**Rationale:** minimizes the chance the widget rejects the call for missing fields; behavior matches the real product end-to-end.
**Source:** `.planning/PROJECT.md` (Key Decisions table)

---

### DOM-patch widget logo "Pay" → "Payments" via MutationObserver

The widget's logo is hardcoded as `<b>Pay</b>`. Rather than fork the widget bundle, we patched the rendered DOM after each widget paint.

**Rationale:** the bundle has zero "BackdPayments" strings; `data-type` doesn't gate the logo; live patching was the only available path that survived widget re-renders.
**Source:** `.planning/PROJECT.md` (Key Decisions table) — marked ⚠️ Revisit, superseded in Phase 3 once the inline widget mount was removed from cart and PDP.

---

### Override Vercel framework via in-repo `vercel.json`

The v0-joe-demo Vercel project was created by v0.dev with a stored Next.js preset. The first `vercel deploy` failed with "No Next.js version detected." Rather than reconfigure the project in the Vercel dashboard, we committed a `vercel.json` declaring `framework: "vite"` + SPA rewrite.

**Rationale:** in-repo config is reproducible, doesn't depend on Vercel UI state, and serves as documentation for future contributors.
**Source:** `.planning/PROJECT.md` (Key Decisions table); `vercel.json`

---

### Initialize GSD planning retroactively after v1 shipped

`/gsd-new-project` was invoked after the v1 milestone was already deployed. We chose to capture all four phases as `Validated` (already complete) rather than re-run them through the workflow.

**Rationale:** the work was done and shipped; running discovery/planning post-hoc would have been theater. The retroactive artifacts give future milestones a clean starting context.
**Source:** `.planning/PROJECT.md` (Key Decisions table); `.planning/STATE.md` (milestone_status: shipped)

---

### Replace the BNPL iframe with a local React clone

When the BackdPayments app needed a redesign per the Figma, we couldn't access the real `sandbox.bnpl.backd.com` source repo. Rather than block on engineering coordination, we built `BackdPaymentsApp.jsx` as a local React component that the `BackdPaymentsModal` renders directly (no iframe).

**Rationale:** unblocks the demo immediately, gives full design control, no waiting on access negotiations. Tradeoff: changes here don't ship to the real production BNPL app.
**Source:** conversation; `src/components/BackdPaymentsApp.jsx`; `src/components/BackdPaymentsModal.jsx`

---

### Lock BNPL "as low as" display to Tier 1, 24-month, rate 1.330

The rate sheet has 16 rows (8 terms × 2 frequencies). For the "as low as" prominent display, we use the Tier 1 longest-term monthly rate — the lowest monthly payment achievable.

**Rationale:** "as low as" advertising language calls for the absolute floor, which is always the longest term. Verified $155k cart → $8,589.58/mo, exact match against the sheet.
**Source:** `src/lib/rates.js`; commit `feat(rates): wire 'as low as' to Tier 1 24-month rate (1.330)`

---

## Lessons

### "Limited" Vercel API tokens look valid but can't enumerate

The token in `.env` returned `{ "limited": true }` on `whoami`. It could identify the user but `GET /v9/projects`, `GET /v6/deployments`, and `GET /v2/teams` all returned 0 results or `team_unauthorized`. Discovering this took several minutes of API probing.

**Context:** influenced the whole strategy — we pivoted from "use the Vercel API to pull source" to "scrape the deployed bundle." Token scope is invisible until you hit a specific endpoint.
**Source:** conversation (early API probes); `.env`

---

### v0.dev-created Vercel projects retain a Next.js framework preset

The first production deploy failed because Vercel had `framework: nextjs` stored on `v0-joe-demo` from when v0.dev created it. The local package.json's stack didn't override that — Vercel honored its own stored config until a `vercel.json` was committed.

**Context:** any Vercel project that originated in v0.dev needs a `vercel.json` framework override if it's later used for a non-Next.js app.
**Source:** conversation (first deploy failure)

---

### Minified production bundles still leak rich data

The 395KB minified JS bundle yielded: full React/Redux/Tailwind/styled-components stack identification, every route path, every Redux action type, 80 complete product records with full goat.com schema, the widget integration code, the widget's order config shape with hardcoded merchant API key, and the modal-trigger function signature.

**Context:** for parity builds against deployed Vite/Webpack sites, treat the production bundle as the source of truth. Patterns like `path:"/foo"`, `createSlice`, `"BrandName"` survive minification. `!0` and `!1` are minified `true`/`false`; identifier keys are unquoted (need post-processing for JSON parsing).
**Source:** `/tmp/backd-bnpl-scrape/extract.mjs` (the extraction script); conversation

---

### Figma MCP requires plan-level membership, not just file-share access

`joe@backd.com` has personal access to the `BACKD - Showcase` file via direct share, but the Figma MCP server returned `could not be accessed` for both `get_design_context` and `get_screenshot`. Per Figma's docs: the authenticated user must be on the **plan that owns the file**, not just have view permission on the file itself.

**Context:** sharing a Figma URL to a teammate isn't enough for MCP automation — you need them as a plan member. View seats also cap MCP usage at 6 tool calls/month regardless of plan tier.
**Source:** conversation (Figma access debugging); `file://figma/docs/rate-limits-access.md` (MCP resource)

---

### "Copy as JSON" isn't a vanilla Figma feature

When asked how to share the design, the user offered "Copy/Paste as JSON" — but Figma doesn't ship that option in its right-click menu. It's available via plugins or the REST API, but not as a built-in shortcut. Mismatched expectations cost a round-trip.

**Context:** when proposing options to non-developer users, verify the tool actually supports them before listing. PNG export is the only built-in Figma share-to-LLM path that works without plugins.
**Source:** conversation (Figma share negotiation)

---

## Patterns

### Scrape-then-mine for parity builds against deployed sites

Sequence: (1) curl the HTML shell and bundle files; (2) grep the bundle for framework/library signatures, route literals, Redux action names, external URLs; (3) write a small Node script to extract structured data (arrays of objects near known anchor strings, e.g. product image URLs); (4) post-process minification artifacts (`!0`→`true`, quote identifier keys); (5) save as JSON for the new project to consume.

**When to use:** rebuilding an editable copy of any Vite/Webpack/Rollup-built React/Vue/Svelte site that you don't have source access to. Works because production bundlers preserve a lot of structural information even when minified.
**Source:** `/tmp/backd-bnpl-scrape/extract.mjs`; conversation

---

### Replace third-party iframes with local React clones when source is blocked

When you need to redesign an embedded third-party widget/app but can't access its source: build a local React component matching the design, swap the iframe for the component in your modal wrapper, preserve the same callback contract (`onSuccess`, `onClose`, `onFail`). The wrapper modal's UX stays identical from the user's perspective.

**When to use:** sales-demo or marketing-showcase contexts where shipping to the *real* third-party service isn't necessary. Don't use for production embeds where the third-party logic matters.
**Source:** `src/components/BackdPaymentsApp.jsx` + `BackdPaymentsModal.jsx`

---

### MutationObserver for runtime patching of third-party widget DOM

Pattern: wrap the third-party mount node with a React ref, set up a `MutationObserver` on it watching `childList + subtree + characterData`, and re-apply the text patch idempotently (check current value before mutating to avoid observer loops). Cleanup observer on unmount.

**When to use:** the widget's DOM is fixed but you need specific text/style overrides at runtime, and forking the widget bundle isn't an option.
**Source:** `src/components/BackdPayWidget.jsx` (deleted, but preserved in git history at commit `feat(checkout)…`)

---

### Per-tier rate tables as a single data module

Encode external rate cards as plain JS objects in one file (`src/lib/rates.js`), with the source rate sheet documented as a comment block and helper functions (`asLowAsMonthlyCents`, `netThirtyTotalCents`) that derive display values from the constants. A future tier addition is a one-file edit.

**When to use:** any financial UI that displays values derived from a third-party rate table (BNPL, leasing, financing, interest rates).
**Source:** `src/lib/rates.js`

---

### Vendor-parameterized BNPL landing component

Component takes `vendorName` and `vendorLogoSrc` props. Default to the current merchant ("SNKR hub", `/official-store.png`), but the same component can showcase any merchant by swapping props — no template changes required.

**When to use:** demo/showcase contexts where one design needs to support multiple example merchants. Generalizes naturally to a real product where each integration has its own merchant config.
**Source:** `src/components/BackdPaymentsApp.jsx` (props `vendorName`, `vendorLogoSrc`)

---

### OKLCH source color tokens in `tailwind.config.js`

Define palette values as OKLCH literals (e.g. `oklch(0.962 0.022 175)`) in Tailwind's `theme.extend.colors`. Tailwind compiles them to sRGB hex for delivery, so browser compatibility is unchanged, but the source values are perceptually-uniform and easy to derive neighbors from (lighter, more saturated, hue-shifted) without weird brightness jumps.

**When to use:** any new project's color system, especially with `<no #000 / no #fff>` design discipline. Note: hand-picked brand colors (like the BackdPayments `#269374`) stay as hex in the same config so brand-exact values aren't lost in conversion.
**Source:** `tailwind.config.js` (mint, navy, ink, paper, forest, gold scales)

---

## Surprises

### Spent significant context on Figma access debugging before pivoting

Roughly three rounds of MCP attempts (different URL forms, different node IDs, `whoami` debugging, reading the rate-limits-access.md MCP resource) all returned the same `could not be accessed` error. The seat/plan-membership rule isn't obvious from the error message — only from the MCP docs.

**Impact:** delayed the BNPL app redesign. Switched approach to PNG-export-then-paste, which the user couldn't easily do because Figma's "Copy as JSON" option doesn't exist as imagined — ultimately resolved by a direct paste of a screenshot.
**Source:** conversation (three turns of Figma MCP probing)

---

### Widget bundle has zero "BackdPayments" strings

Searched both sandbox and production widget bundles for `BackdPayments` — 0 matches in either. The widget hardcodes "Backd" + "Pay" as separate DOM nodes. There's no `type` value or config flag that switches to "BackdPayments" branding. DOM patching was the only path.

**Impact:** required inventing the MutationObserver runtime-patch approach for the inline widget render, which was eventually superseded when the inline mount was removed entirely in favor of our own React render.
**Source:** conversation (widget bundle grep); `/tmp/backd-widget/widget.js` (3.9MB UMD bundle)

---

### Widget order shape uses dollars for `unit_price` but cents in the merchant config example

The live bundle's example `Ne` config had `items[0].unit_price: 3000` (which made sense as $30 in dollars given other surrounding values), and the cart's `retail_price_cents` was in cents. When wiring `initializeWidget`, we had to divide by 100 on the way in. Easy off-by-100 to make.

**Impact:** added a unit-conversion in `src/lib/checkout.js` (since deleted) and required a careful audit before the first modal trigger worked. Unit conventions in third-party APIs need verification with a small test, not assumption.
**Source:** `src/lib/checkout.js` (deleted in commit `feat(checkout)…`); `/tmp/backd-bnpl-scrape/assets/index-d2c0735c.js`

---

### Vercel CLI's `npx vercel deploy` is interactive even with `--yes`

The first deploy attempt prompted for project linking despite `--yes`. Had to run `vercel link --project v0-joe-demo --yes --scope backdpayments` as a separate step before `vercel deploy --prod --yes` succeeded. Documentation suggests `--yes` should cover both; in practice it doesn't on first-deploy of a project linked under a non-personal team.

**Impact:** one extra command in the deploy sequence; not blocking, just non-obvious.
**Source:** conversation (initial deploy session); `.vercel/project.json`

---

### SVG `<pattern>` can't natively offset alternating rows for honeycomb tiling

Wanted a true honeycomb pattern (rows staggered by half-hex) for the BNPL app background. SVG patterns repeat with a constant offset — no built-in "offset every other row" mode. Worked around with two `<pattern>` definitions layered via two `<rect>` fills, the second offset by half-tile on both axes. Approximates honeycomb without being exact.

**Impact:** small visual gap from the Figma's precise honeycomb tessellation, but reads correctly as "subtle hex texture" at low opacity.
**Source:** `src/components/BackdPaymentsApp.jsx` (`bnpl-hex-a` and `bnpl-hex-b` patterns)

---

### `/gsd-extract-learnings` strict workflow fails on retroactive projects

The workflow's critical rule "PLAN.md and SUMMARY.md are required — exit with clear error if missing" hard-blocks extraction when a project was initialized via retroactive `/gsd-new-project` (which doesn't create per-phase artifacts). The workflow's prescribed escape hatch is to exit with an error — there's no built-in adapted-extraction mode for retroactive milestones.

**Impact:** this very file required a manual deviation from the documented workflow. Future projects that go through the full discuss→plan→execute cycle per phase will produce the per-phase artifacts and run the strict extraction cleanly. Worth surfacing to the GSD maintainers as a gap.
**Source:** `/Users/joekessler/.claude/get-shit-done/workflows/extract-learnings.md` (critical_rules section); the extraction attempt that produced this file
