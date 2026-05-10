import BrandMark from './BrandMark';

// Mirrors the BackdPayments app's first page from the team's Figma:
// dark forest background with a subtle hex grid, white card centered,
// BackdPayments + vendor lockup at top, payment-terms stats, general
// requirements, two gold CTAs. Renders as a React component so the
// 'Pay Later' modal launches our own UI instead of iframing the
// external sandbox URL — fully editable in this repo.

export default function BackdPaymentsApp({
  vendorName = 'SNKR hub',
  vendorLogoSrc = '/official-store.png',
  onSelectTerms,
  onApply,
}) {
  return (
    <div className="relative h-full w-full overflow-y-auto bg-forest-900">
      {/* Two layered hex patterns offset by half a tile to approximate the
          honeycomb tessellation in the Figma. SVG <pattern> can't natively
          stagger alternating rows, so we composite two passes. */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="bnpl-hex-a" width="48" height="56" patternUnits="userSpaceOnUse">
            <polygon
              points="12,1 36,1 47,28 36,55 12,55 1,28"
              fill="none"
              stroke="#234638"
              strokeWidth="1"
              opacity="0.7"
            />
          </pattern>
          <pattern id="bnpl-hex-b" width="48" height="56" patternUnits="userSpaceOnUse" x="24" y="28">
            <polygon
              points="12,1 36,1 47,28 36,55 12,55 1,28"
              fill="none"
              stroke="#234638"
              strokeWidth="1"
              opacity="0.7"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bnpl-hex-a)" />
        <rect width="100%" height="100%" fill="url(#bnpl-hex-b)" />
      </svg>

      <div className="relative flex min-h-full items-center justify-center p-5 sm:p-6">
        <div className="w-full rounded-3xl bg-white px-8 py-10 shadow-2xl sm:px-10 sm:py-12">
          <div className="flex flex-col items-center gap-4">
            <BrandMark size="lg" />
            <span aria-hidden="true" className="text-2xl font-light leading-none text-navy-500">
              +
            </span>
            <div className="flex items-center gap-3">
              <img
                src={vendorLogoSrc}
                alt=""
                className="h-11 w-11 shrink-0 rounded-md object-contain"
              />
              <span className="text-xl font-bold uppercase tracking-tight text-navy-900">
                {vendorName}
              </span>
            </div>
          </div>

          <section className="mt-9 rounded-2xl border border-neutral-200 px-5 py-5 sm:px-6">
            <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-mint-500">
              Get Payment Terms
            </h2>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <Stat eyebrow="Approvals up to" value="$1.5M" caption="$50K instantly" />
              <Stat eyebrow="Qualify for" value="Net 30" caption="No-cost terms" />
              <Stat eyebrow="Financing up to" value="24 mo" caption="Custom timeline" />
            </div>

            <p className="mt-5 text-center text-sm">
              <a
                href="#learn-more"
                className="font-medium text-navy-900 underline underline-offset-2 transition-colors hover:text-mint-600"
              >
                Learn more from {vendorName}
              </a>
            </p>
          </section>

          <section className="mt-3 rounded-2xl border border-neutral-200 px-5 py-3">
            <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-mint-500">
              General Requirements
            </h2>
            <p className="mt-2 text-center text-sm text-navy-900">
              <span className="whitespace-nowrap">U.S. business</span>
              <span className="mx-3 text-mint-500" aria-hidden="true">•</span>
              <span className="whitespace-nowrap">1+ years operating</span>
              <span className="mx-3 text-mint-500" aria-hidden="true">•</span>
              <span className="whitespace-nowrap">$100K annual revenue</span>
            </p>
          </section>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onSelectTerms}
              className="rounded-xl bg-gold-500 px-6 py-3 text-base font-bold text-navy-900 transition-colors duration-200 ease-out-quart hover:bg-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              Select Terms
            </button>
            <button
              type="button"
              onClick={onApply}
              className="rounded-xl bg-gold-500 px-6 py-3 text-base font-bold text-navy-900 transition-colors duration-200 ease-out-quart hover:bg-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              Apply Now
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-navy-500">
            <a
              href="#privacy"
              className="underline underline-offset-2 transition-colors hover:text-navy-900"
            >
              Privacy Policy
            </a>
            <span className="mx-2 text-neutral-300" aria-hidden="true">|</span>
            <a
              href="#terms"
              className="underline underline-offset-2 transition-colors hover:text-navy-900"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ eyebrow, value, caption }) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-navy-500">{eyebrow}</p>
      <p className="mt-1.5 text-3xl font-bold leading-none text-navy-900">{value}</p>
      <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-navy-500">
        {caption}
      </p>
    </div>
  );
}
