import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove, removeAll, selectItems } from '../store/cartSlice';
import CheckoutPanel from '../components/CheckoutPanel';
import ProductImage from '../components/ProductImage';

const dollars = (cents) =>
  (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Cart() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState('');

  if (items.length === 0) {
    return (
      <div style={{ background: '#FAF8F4', minHeight: '50vh' }}>
        <div className="mx-auto max-w-[1200px] px-6 py-16 text-center">
          <div
            className="inline-flex flex-col items-center p-12"
            style={{ border: '1px dashed #D8D3C7', background: '#FFFFFF' }}
          >
            <span className="text-4xl">🛒</span>
            <h1 className="mt-4 text-xl font-bold text-[#1F1B16]">Your cart is empty</h1>
            <p className="mt-2 text-sm text-[#4A453E]">
              Browse and add equipment to your cart to get started.
            </p>
            <Link
              to="/explore"
              className="mt-6 inline-block bg-[#1F1B16] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-[#4A453E]"
              style={{ borderRadius: 0 }}
            >
              Browse Products →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#FAF8F4', minHeight: '60vh' }}>
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#1F1B16]">Shopping Cart</h1>
          <button
            type="button"
            onClick={() => dispatch(removeAll())}
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#7A736A] hover:text-[#A8533A] underline"
          >
            Clear all
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Left: items table */}
          <div>
            {/* Table */}
            <div style={{ border: '1px solid #E5E1D8', background: '#FFFFFF' }}>
              {/* Table head */}
              <div
                className="grid items-center font-mono text-[9px] uppercase tracking-[0.12em] text-[#7A736A]"
                style={{
                  gridTemplateColumns: '32px 1fr 90px 80px 90px',
                  gap: 0,
                  borderBottom: '2px solid #1F1B16',
                  padding: '10px 16px',
                  background: '#F2EEE6',
                }}
              >
                <span />
                <span>Product</span>
                <span className="text-right">Price</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Subtotal</span>
              </div>

              {/* Rows */}
              {items.map((it) => (
                <div
                  key={`${it.id}-${it.size}`}
                  className="grid items-center px-4 py-4"
                  style={{
                    gridTemplateColumns: '32px 1fr 90px 80px 90px',
                    gap: 0,
                    borderBottom: '1px solid #E5E1D8',
                  }}
                >
                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => {
                      for (let i = 0; i < it.qty; i++) {
                        dispatch(remove({ id: it.id, size: it.size }));
                      }
                    }}
                    className="flex h-6 w-6 items-center justify-center text-[#7A736A] hover:text-[#A8533A] transition-colors text-base"
                    aria-label="Remove item"
                  >
                    ×
                  </button>

                  {/* Product info */}
                  <div className="flex items-center gap-3 pr-3">
                    <div
                      className="shrink-0 flex items-center justify-center overflow-hidden"
                      style={{ width: 76, height: 76, background: '#F2EEE6', flexShrink: 0 }}
                    >
                      <ProductImage productId={it.id} size="sm" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-snug text-[#1F1B16] line-clamp-2">{it.name}</p>
                      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-[#7A736A]">{it.brand}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-right font-mono text-xs text-[#1F1B16]">
                    ${dollars(it.priceCents)}
                  </p>

                  {/* Qty */}
                  <div className="flex items-center justify-center">
                    <div
                      className="flex items-center"
                      style={{ border: '1px solid #D8D3C7' }}
                    >
                      <button
                        type="button"
                        onClick={() => dispatch(remove({ id: it.id, size: it.size }))}
                        className="w-6 h-7 text-sm font-bold text-[#1F1B16] hover:bg-[#F2EEE6] flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="w-7 text-center font-mono text-xs tabular-nums text-[#1F1B16]">
                        {it.qty}
                      </span>
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
                        className="w-6 h-7 text-sm font-bold text-[#1F1B16] hover:bg-[#F2EEE6] flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <p className="text-right font-mono text-xs font-bold text-[#1F1B16]">
                    ${dollars(it.priceCents * it.qty)}
                  </p>
                </div>
              ))}
            </div>

            {/* Coupon row */}
            <div
              className="mt-4 flex items-center gap-3 px-4 py-3"
              style={{ border: '1px solid #E5E1D8', background: '#FFFFFF' }}
            >
              <input
                type="text"
                placeholder="Coupon or PO reference code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 border border-[#E5E1D8] px-3 py-2 font-mono text-xs text-[#1F1B16] placeholder:text-[#B8B2A8] focus:border-[#1F1B16] focus:outline-none"
                style={{ borderRadius: 0 }}
              />
              <button
                type="button"
                className="bg-[#1F1B16] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-white hover:bg-[#4A453E]"
                style={{ borderRadius: 0 }}
              >
                Apply Code
              </button>
              <button
                type="button"
                className="border border-[#D8D3C7] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#4A453E] hover:bg-[#F2EEE6]"
                style={{ borderRadius: 0 }}
              >
                Update Cart
              </button>
            </div>

            {/* Delivery estimate bar */}
            <div
              className="mt-4 flex items-center gap-3 px-5 py-3"
              style={{ background: '#FFFFFF', border: '1px solid #E5E1D8', borderLeft: '3px solid #269374' }}
            >
              <span className="text-lg">🚚</span>
              <div>
                <p className="text-xs font-semibold text-[#1F1B16]">Standard Delivery — Free</p>
                <p className="font-mono text-[10px] text-[#7A736A]">Ships from Austin, TX · Estimated 2–4 business days</p>
              </div>
            </div>

            {/* Trust badges */}
            <div
              className="mt-4 grid grid-cols-2 divide-x divide-y"
              style={{ border: '1px solid #E5E1D8', background: '#FFFFFF' }}
            >
              {[
                { icon: '🔒', label: 'Secure Checkout', sub: 'SSL encrypted' },
                { icon: '↩️', label: '30-Day Returns', sub: 'No questions asked' },
                { icon: '📋', label: 'Net Terms', sub: 'Net 30 & extended terms' },
                { icon: '📞', label: 'Expert Support', sub: '1-800-WDGT-SUP' },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 px-4 py-3" style={{ borderColor: '#E5E1D8' }}>
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-[11px] font-semibold text-[#1F1B16]">{label}</p>
                    <p className="font-mono text-[9px] text-[#7A736A]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: checkout panel */}
          <CheckoutPanel />
        </div>
      </div>
    </div>
  );
}
