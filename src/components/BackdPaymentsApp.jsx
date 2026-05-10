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
    <div className="relative flex h-full w-full items-start justify-center overflow-y-auto bg-forest-900 p-6">
      {/* Subtle hex-grid background pattern */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <pattern id="bnpl-hex" x="0" y="0" width="64" height="74" patternUnits="userSpaceOnUse">
          <polygon
            points="32,4 60,20 60,52 32,68 4,52 4,20"
            fill="none"
            stroke="#234638"
            strokeWidth="1"
            opacity="0.55"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#bnpl-hex)" />
      </svg>

      <div className="relative w-full max-w-xl rounded-3xl bg-white px-8 py-10 shadow-2xl sm:px-10">
        <div className="flex flex-col items-center gap-5">
          <BrandMark size="lg" />
          <span aria-hidden="true" className="text-2xl font-light text-navy-500">+</span>
          <div className="flex items-center gap-3">
            <img
              src={vendorLogoSrc}
              alt=""
              className="h-12 w-12 shrink-0 rounded-md object-contain"
            />
            <span className="text-xl font-bold uppercase tracking-tight text-navy-900">
              {vendorName}
            </span>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-neutral-200 px-6 py-5">
          <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-mint-500">
            Get Payment Terms
          </h2>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <Stat eyebrow="Approvals up to" value="$1.5M" caption="Up to $50K instantly" />
            <Stat eyebrow="Qualify for up to" value="Net 30" caption="Payment terms at no cost" />
            <Stat eyebrow="Financing options up to" value="24" caption="Month timeline" />
          </div>

          <p className="mt-5 text-center text-sm">
            <a href="#learn-more" className="font-medium text-navy-900 underline underline-offset-2">
              Learn More from {vendorName}
            </a>
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-neutral-200 px-5 py-3">
          <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-mint-500">
            General Requirements:
          </h2>
          <p className="mt-2 text-center text-sm text-navy-900">
            <span className="whitespace-nowrap">• A U.S. based business</span>
            <span className="mx-2 text-navy-500" aria-hidden="true">·</span>
            <span className="whitespace-nowrap">• 1+ years in business</span>
            <span className="mx-2 text-navy-500" aria-hidden="true">·</span>
            <span className="whitespace-nowrap">• $100K annual revenue</span>
          </p>
        </section>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onSelectTerms}
            className="rounded-xl bg-gold-500 px-6 py-3 text-base font-semibold text-navy-900 transition-colors duration-200 ease-out-quart hover:bg-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            Select Terms
          </button>
          <button
            type="button"
            onClick={onApply}
            className="rounded-xl bg-gold-500 px-6 py-3 text-base font-semibold text-navy-900 transition-colors duration-200 ease-out-quart hover:bg-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            Apply Now
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-navy-500">
          <a href="#privacy" className="underline underline-offset-2 hover:text-navy-900">Privacy Policy</a>
          <span className="mx-2 text-neutral-300" aria-hidden="true">|</span>
          <a href="#terms" className="underline underline-offset-2 hover:text-navy-900">Terms of Service</a>
        </p>
      </div>
    </div>
  );
}

function Stat({ eyebrow, value, caption }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-navy-500">{eyebrow}</p>
      <p className="mt-1 text-3xl font-bold leading-none text-navy-900">{value}</p>
      <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-navy-500">
        {caption}
      </p>
    </div>
  );
}
