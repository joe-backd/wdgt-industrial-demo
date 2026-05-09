import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove, removeAll, selectItems } from '../store/cartSlice';
import CheckoutPanel from '../components/CheckoutPanel';

export default function Cart() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center">
        <h1 className="text-xl font-semibold text-navy-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-navy-500">
          Add a pair from the explore page to test the BackdPayments widget.
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

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-navy-900">Cart</h1>
          <button
            type="button"
            onClick={() => dispatch(removeAll())}
            className="text-xs font-medium text-navy-500 transition-colors hover:text-navy-900"
          >
            Clear all
          </button>
        </div>

        <ul className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
          {items.map((it) => (
            <li key={`${it.id}-${it.size}`} className="flex items-center gap-4 p-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-50">
                <img src={it.image} alt={it.name} className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-wider text-navy-500">{it.brand}</p>
                <p className="truncate text-sm font-medium text-navy-900">{it.name}</p>
                <p className="text-xs text-navy-500">US {it.size}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => dispatch(remove({ id: it.id, size: it.size }))}
                  className="h-7 w-7 rounded-full border border-neutral-300 text-sm leading-none text-navy-700 transition-colors hover:bg-neutral-100"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm tabular-nums">{it.qty}</span>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(
                      add({
                        id: it.id,
                        name: it.name,
                        image: it.image,
                        priceCents: it.priceCents,
                        size: it.size,
                        brand: it.brand,
                      })
                    )
                  }
                  className="h-7 w-7 rounded-full border border-neutral-300 text-sm leading-none text-navy-700 transition-colors hover:bg-neutral-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <p className="w-20 text-right text-sm font-semibold tabular-nums text-navy-900">
                ${((it.priceCents * it.qty) / 100).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <CheckoutPanel />
    </div>
  );
}
