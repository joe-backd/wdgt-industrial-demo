import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItems, selectTotalCents } from '../store/cartSlice';
import BackdOfferCard from './BackdOfferCard';

export const dollars = (cents) => (cents / 100).toFixed(2);

export default function CheckoutPanel() {
  const items = useSelector(selectItems);
  const totalCents = useSelector(selectTotalCents);

  if (items.length === 0) return null;

  const shipping = 0;
  const tax = 0;
  const grand = totalCents + shipping + tax;

  return (
    <aside
      style={{
        background: '#FFFFFF',
        border: '1px solid #D8D3C7',
        padding: 24,
        borderRadius: 0,
      }}
    >
      {/* Title */}
      <h2
        className="font-mono text-xs uppercase tracking-[0.12em] text-[#1F1B16]"
        style={{
          borderBottom: '2px solid #1F1B16',
          paddingBottom: 10,
          marginBottom: 16,
        }}
      >
        Cart Totals
      </h2>

      {/* Rows */}
      <dl className="space-y-2.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-[#4A453E]">Subtotal</dt>
          <dd className="font-mono tabular-nums text-[#1F1B16]">${dollars(totalCents)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[#4A453E]">Shipping</dt>
          <dd className="text-[#1F1B16]">Free</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[#4A453E]">Tax</dt>
          <dd className="font-mono tabular-nums text-[#1F1B16]">$0.00</dd>
        </div>
        <div
          className="flex items-baseline justify-between pt-3"
          style={{ borderTop: '2px solid #1F1B16' }}
        >
          <dt className="text-base font-bold text-[#1F1B16]">Total</dt>
          <dd className="font-mono text-xl font-bold tabular-nums text-[#1F1B16]">
            ${dollars(grand)}
          </dd>
        </div>
      </dl>

      {/* BackdOfferCard above checkout button */}
      <BackdOfferCard totalCents={totalCents} />

      {/* Proceed to Checkout */}
      <Link
        to="/checkout"
        className="block w-full bg-[#1F1B16] px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#4A453E]"
        style={{ borderRadius: 0 }}
      >
        Proceed to Checkout
      </Link>

      {/* Trust note */}
      <p className="mt-3 text-center font-mono text-[10px] text-[#7A736A]">
        Secure checkout · Net terms available
      </p>
    </aside>
  );
}
