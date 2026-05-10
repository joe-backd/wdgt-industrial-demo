import BrandMark from './BrandMark';

// Branded "Pay Later with BackdPayments" CTA. Mint-tinted surface with
// the lockup centered — sits above the credit-card form on /checkout
// as the BackdPayments-preferred path. The icon-and-wordmark sit flush
// per brand spec (no space between the B-mark and the "B" in BackdPayments).
export default function PayLaterButton({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group flex w-full items-center justify-center rounded-2xl bg-mint-50 px-6 py-4 text-base font-semibold text-navy-900 ring-1 ring-mint-200 transition-all duration-200 ease-out-quart hover:bg-mint-100 hover:ring-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
    >
      <span className="font-bold text-navy-900">Pay Later</span>
      <span className="font-medium text-navy-500">&nbsp;with&nbsp;</span>
      <BrandMark size="md" />
    </button>
  );
}
