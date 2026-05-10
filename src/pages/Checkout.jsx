import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, selectTotalCents, removeAll } from '../store/cartSlice';
import PayLaterButton from '../components/PayLaterButton';
import BackdPaymentsModal from '../components/BackdPaymentsModal';

const dollars = (cents) => (cents / 100).toFixed(2);

const formatCardNumber = (raw) =>
  raw.replace(/\D/g, '').slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1 ').trim();

const formatExpiry = (raw) => {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const formatCvc = (raw) => raw.replace(/\D/g, '').slice(0, 4);

export default function Checkout() {
  const items = useSelector(selectItems);
  const totalCents = useSelector(selectTotalCents);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bnplOpen, setBnplOpen] = useState(false);
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '', zip: '' });

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center">
        <h1 className="text-xl font-semibold text-navy-900">No items to check out</h1>
        <p className="mt-2 text-sm text-navy-500">
          Your cart is empty. Add a pair before heading to checkout.
        </p>
        <Link
          to="/explore"
          className="mt-6 inline-block rounded-2xl bg-ink px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-ink-soft"
        >
          Explore drops
        </Link>
      </div>
    );
  }

  const completeOrder = () => {
    dispatch(removeAll());
    navigate('/BackdPay');
  };

  const onCardSubmit = (e) => {
    e.preventDefault();
    completeOrder();
  };

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <section aria-labelledby="checkout-heading" className="space-y-6">
          <h1 id="checkout-heading" className="text-2xl font-bold text-navy-900">
            Checkout
          </h1>

          <form onSubmit={onCardSubmit} className="space-y-4" autoComplete="on">
            <div>
              <label htmlFor="card-number" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-navy-500">
                Card number
              </label>
              <input
                id="card-number"
                name="cardnumber"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 1234 1234 1234"
                required
                value={card.number}
                onChange={(e) => setCard((c) => ({ ...c, number: formatCardNumber(e.target.value) }))}
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-navy-900 placeholder:text-navy-500/60 focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-500/30"
              />
            </div>

            <div>
              <label htmlFor="card-name" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-navy-500">
                Name on card
              </label>
              <input
                id="card-name"
                name="ccname"
                type="text"
                autoComplete="cc-name"
                placeholder="J. Demo"
                required
                value={card.name}
                onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-navy-900 placeholder:text-navy-500/60 focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-500/30"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label htmlFor="card-exp" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-navy-500">
                  Expiry
                </label>
                <input
                  id="card-exp"
                  name="cc-exp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  required
                  value={card.expiry}
                  onChange={(e) => setCard((c) => ({ ...c, expiry: formatExpiry(e.target.value) }))}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-navy-900 placeholder:text-navy-500/60 focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-500/30"
                />
              </div>
              <div>
                <label htmlFor="card-cvc" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-navy-500">
                  CVC
                </label>
                <input
                  id="card-cvc"
                  name="cvc"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  required
                  value={card.cvc}
                  onChange={(e) => setCard((c) => ({ ...c, cvc: formatCvc(e.target.value) }))}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-navy-900 placeholder:text-navy-500/60 focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-500/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="card-zip" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-navy-500">
                Billing ZIP
              </label>
              <input
                id="card-zip"
                name="postal-code"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="78704"
                required
                value={card.zip}
                onChange={(e) => setCard((c) => ({ ...c, zip: e.target.value.replace(/\D/g, '').slice(0, 5) }))}
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-navy-900 placeholder:text-navy-500/60 focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-500/30"
              />
            </div>

            <button
              type="submit"
              className="block w-full rounded-2xl bg-ink px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 ease-out-quart hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              Pay ${dollars(totalCents)}
            </button>
          </form>

          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-neutral-200" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy-500">OR</span>
            <span className="h-px flex-1 bg-neutral-200" />
          </div>

          <PayLaterButton onClick={() => setBnplOpen(true)} />
        </section>

        <aside className="h-fit space-y-5 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-navy-500">Order summary</h2>

          <ul className="divide-y divide-neutral-200">
            {items.map((it) => (
              <li
                key={`${it.id}-${it.size}`}
                className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-50">
                  <img src={it.image} alt={it.name} className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="text-[10px] uppercase tracking-wider text-navy-500">{it.brand}</p>
                  <p className="line-clamp-2 text-sm font-medium leading-snug text-navy-900">
                    {it.name}
                  </p>
                  <p className="text-xs text-navy-500">
                    US {it.size} · Qty {it.qty}
                  </p>
                </div>
                <p className="self-start text-sm font-semibold tabular-nums text-navy-900">
                  ${dollars(it.priceCents * it.qty)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="space-y-2.5 border-t border-neutral-200 pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-navy-500">Subtotal</dt>
              <dd className="tabular-nums text-navy-900">${dollars(totalCents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-navy-500">Shipping</dt>
              <dd className="text-navy-900">Free</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-neutral-200 pt-3">
              <dt className="text-base font-bold text-navy-900">Total</dt>
              <dd className="text-xl font-bold tabular-nums text-navy-900">
                ${dollars(totalCents)}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <BackdPaymentsModal
        open={bnplOpen}
        onClose={() => setBnplOpen(false)}
        onSuccess={() => {
          setBnplOpen(false);
          completeOrder();
        }}
        onFail={() => setBnplOpen(false)}
      />
    </>
  );
}
