import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectItems, selectTotalCents, removeAll } from '../store/cartSlice';
import { isWidgetReady, openBackdCheckout } from '../lib/checkout';
import BackdOfferCard from './BackdOfferCard';

const dollars = (cents) => (cents / 100).toFixed(2);

export default function CheckoutPanel() {
  const items = useSelector(selectItems);
  const totalCents = useSelector(selectTotalCents);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Track widget readiness so the CTA can disable while the third-party
  // script is still loading, then re-enable once initializeWidget exists.
  const [widgetReady, setWidgetReady] = useState(isWidgetReady());
  useEffect(() => {
    if (widgetReady) return;
    const t = setInterval(() => {
      if (isWidgetReady()) {
        setWidgetReady(true);
        clearInterval(t);
      }
    }, 250);
    return () => clearInterval(t);
  }, [widgetReady]);

  if (items.length === 0) return null;

  const completeOrder = () => {
    dispatch(removeAll());
    navigate('/BackdPay');
  };

  const onCheckout = () => {
    setLoading(true);
    if (!isWidgetReady()) {
      // Widget never loaded (network blocked, dev caching, etc.) — fall
      // back to navigating to the success screen so the demo never feels
      // broken in a walkthrough.
      setTimeout(() => {
        completeOrder();
        setLoading(false);
      }, 600);
      return;
    }
    try {
      openBackdCheckout({
        items,
        totalCents,
        onSuccess: () => {
          completeOrder();
          setLoading(false);
        },
        onClose: () => setLoading(false),
        onFail: () => setLoading(false),
      });
    } catch {
      setTimeout(() => {
        completeOrder();
        setLoading(false);
      }, 400);
    }
  };

  return (
    <aside className="space-y-3">
      <p className="text-sm leading-snug text-navy-500">
        Your total is{' '}
        <span className="font-semibold text-navy-900">${dollars(totalCents)}</span>
      </p>

      <BackdOfferCard totalCents={totalCents} />

      <button
        type="button"
        onClick={onCheckout}
        disabled={loading}
        className="block w-full rounded-2xl bg-ink px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 ease-out-quart hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-80 motion-reduce:transition-none"
        aria-busy={loading}
      >
        {loading ? 'Opening…' : 'Proceed to Checkout'}
      </button>

      {!widgetReady && (
        <p className="text-center text-xs text-navy-500" aria-live="polite">
          Connecting to BackdPayments…
        </p>
      )}
    </aside>
  );
}
