import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeAll } from '../store/cartSlice';

// The live site's /BackdPay route is the order_success_url the widget config
// points at. On arrival here, treat the order as fulfilled and clear the cart.
export default function BackdPay() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeAll());
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-white p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        ✓
      </div>
      <h1 className="mt-4 text-xl font-bold">Payment scheduled</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Your BackdPayments plan has been created and your order is on the way. You'll get an email
        confirmation with the four installment dates.
      </p>
      <Link
        to="/explore"
        className="mt-6 inline-block rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white"
      >
        Keep shopping
      </Link>
    </div>
  );
}
