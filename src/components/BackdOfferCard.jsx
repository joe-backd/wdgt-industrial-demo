import BrandMark from './BrandMark';
import { asLowAsMonthlyCents } from '../lib/rates';

const dollars = (cents) => (cents / 100).toFixed(2);
const monthlyEstimate = (cents) => dollars(asLowAsMonthlyCents(cents));

// Below this synthetic floor the BNPL split doesn't make sense
// (demo prices range $16–$2k, but a $0 cart still mounts the panel).
const MIN_BNPL_CENTS = 100;

export default function BackdOfferCard({ totalCents }) {
  if (totalCents < MIN_BNPL_CENTS) {
    return (
      <div className="rounded-3xl bg-mint-50 px-7 py-6 text-center text-sm text-navy-700">
        BackdPayments available on orders over $1
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-mint-50 px-7 pb-6 pt-7">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-5">
        <div className="text-center">
          <p className="text-2xl font-bold leading-none text-navy-900">Net 30</p>
          <p className="mt-2 text-xs text-navy-500">Up to 90 days</p>
        </div>

        <div className="flex flex-col items-center gap-1.5" aria-hidden="true">
          <span className="block h-6 w-px bg-mint-200" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-navy-500">OR</span>
          <span className="block h-6 w-px bg-mint-200" />
        </div>

        <div className="text-center">
          <p className="text-xs text-navy-500">as low as</p>
          <p className="mt-2 text-2xl font-bold leading-none text-navy-900">
            ${monthlyEstimate(totalCents)}
            <span className="text-base font-semibold text-navy-500">/mo</span>
          </p>
        </div>
      </div>

      <hr className="my-5 border-0 border-t border-mint-200" />

      <p className="flex items-center justify-center gap-2 text-base text-navy-700">
        <span className="text-navy-500">with</span>
        <BrandMark size="md" />
      </p>
    </div>
  );
}
