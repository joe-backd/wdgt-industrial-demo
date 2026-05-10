import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItems, selectTotalCents } from '../store/cartSlice';
import BackdOfferCard from './BackdOfferCard';

const dollars = (cents) => (cents / 100).toFixed(2);

export default function CheckoutPanel() {
  const items = useSelector(selectItems);
  const totalCents = useSelector(selectTotalCents);

  if (items.length === 0) return null;

  return (
    <aside className="space-y-3">
      <p className="text-sm leading-snug text-navy-500">
        Your total is{' '}
        <span className="font-semibold text-navy-900">${dollars(totalCents)}</span>
      </p>

      <BackdOfferCard totalCents={totalCents} />

      <Link
        to="/checkout"
        className="block w-full rounded-2xl bg-ink px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 ease-out-quart hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        Proceed to Checkout
      </Link>
    </aside>
  );
}
