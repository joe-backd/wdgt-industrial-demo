import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, selectTotalCents, removeAll } from '../store/cartSlice';
import BackdPaymentsModal from '../components/BackdPaymentsModal';
import BrandMark from '../components/BrandMark';
import ProductImage from '../components/ProductImage';

const dollars = (cents) =>
  (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
  const [paymentMethod, setPaymentMethod] = useState('backd');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' });
  const [poNumber, setPoNumber] = useState('');
  const [jobCode, setJobCode] = useState('');
  const [notes, setNotes] = useState('');

  if (items.length === 0) {
    return (
      <div style={{ background: '#FAF8F4', minHeight: '50vh' }}>
        <div className="mx-auto max-w-[1200px] px-6 py-16 text-center">
          <div
            className="inline-flex flex-col items-center p-12"
            style={{ border: '1px dashed #D8D3C7', background: '#FFFFFF' }}
          >
            <h1 className="text-xl font-bold text-[#1F1B16]">No items to check out</h1>
            <p className="mt-2 text-sm text-[#4A453E]">
              Your cart is empty. Add equipment before heading to checkout.
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

  const completeOrder = () => {
    dispatch(removeAll());
    navigate('/BackdPay');
  };

  const onCardSubmit = (e) => {
    e.preventDefault();
    completeOrder();
  };

  return (
    <div style={{ background: '#FAF8F4', minHeight: '60vh' }}>
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_480px] lg:items-start">

          {/* Left column */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1F1B16]">Checkout</h1>
              <p className="mt-1 text-sm text-[#4A453E]">
                Complete your order below. Flexible payment options are available at checkout.
              </p>
            </div>

            {/* PO Number / Job Code */}
            <div style={{ border: '1px solid #E5E1D8', background: '#FFFFFF' }}>
              <div
                className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#1F1B16] px-5 py-3"
                style={{ borderBottom: '1px solid #E5E1D8', background: '#F2EEE6' }}
              >
                Order Reference
              </div>
              <div className="grid grid-cols-2 gap-4 p-5">
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-[#7A736A]">
                    PO Number
                  </label>
                  <input
                    type="text"
                    placeholder="PO-2026-0001"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    className="w-full border border-[#E5E1D8] px-3 py-2.5 text-sm text-[#1F1B16] placeholder:text-[#B8B2A8] focus:border-[#1F1B16] focus:outline-none"
                    style={{ borderRadius: 0 }}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-[#7A736A]">
                    Job Code
                  </label>
                  <input
                    type="text"
                    placeholder="LINE-4A"
                    value={jobCode}
                    onChange={(e) => setJobCode(e.target.value)}
                    className="w-full border border-[#E5E1D8] px-3 py-2.5 text-sm text-[#1F1B16] placeholder:text-[#B8B2A8] focus:border-[#1F1B16] focus:outline-none"
                    style={{ borderRadius: 0 }}
                  />
                </div>
                <div className="col-span-2">
                  <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-[#7A736A]">
                    Order Notes
                  </label>
                  <textarea
                    placeholder="Special instructions, delivery requirements, or contact info…"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full border border-[#E5E1D8] px-3 py-2.5 text-sm text-[#1F1B16] placeholder:text-[#B8B2A8] focus:border-[#1F1B16] focus:outline-none resize-none"
                    style={{ borderRadius: 0 }}
                  />
                </div>
              </div>
            </div>

            {/* Need Help box */}
            <div style={{ border: '1px solid #E5E1D8', background: '#FFFFFF' }}>
              <div
                className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#1F1B16] px-5 py-3"
                style={{ borderBottom: '1px solid #E5E1D8', background: '#F2EEE6' }}
              >
                Need Help?
              </div>
              <div className="p-5 space-y-2">
                {[
                  { icon: '📞', label: 'Phone', value: '1-800-WDGT-SUP (Mon–Fri 7 AM–6 PM CT)' },
                  { icon: '✉️', label: 'Email', value: 'orders@wdgt.io' },
                  { icon: '💬', label: 'Live Chat', value: 'Available on site during business hours' },
                  { icon: '🔧', label: 'Tech Support', value: 'techsupport@wdgt.io' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-base shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#7A736A]">{label}</p>
                      <p className="text-xs text-[#1F1B16]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: order summary + payment */}
          <div className="space-y-4">
            {/* Your Order */}
            <div style={{ border: '1px solid #E5E1D8', background: '#FFFFFF' }}>
              <div
                className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#1F1B16] px-5 py-3"
                style={{ borderBottom: '1px solid #E5E1D8', background: '#F2EEE6' }}
              >
                Your Order
              </div>

              {/* Line items */}
              <ul className="divide-y divide-[#E5E1D8]">
                {items.map((it) => (
                  <li
                    key={`${it.id}-${it.size}`}
                    className="flex items-center gap-3 px-5 py-3"
                  >
                    <div className="shrink-0 flex items-center justify-center overflow-hidden" style={{ width: 44, height: 44, background: '#F2EEE6' }}>
                      <ProductImage productId={it.id} size="sm" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-[#1F1B16] line-clamp-1">{it.name}</p>
                      <p className="font-mono text-[9px] text-[#7A736A]">Qty {it.qty}</p>
                    </div>
                    <p className="font-mono text-xs font-bold tabular-nums text-[#1F1B16] shrink-0">
                      ${dollars(it.priceCents * it.qty)}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className="px-5 py-4 space-y-2.5" style={{ borderTop: '1px solid #E5E1D8' }}>
                <div className="flex justify-between text-sm">
                  <span className="text-[#4A453E]">Subtotal</span>
                  <span className="font-mono tabular-nums text-[#1F1B16]">${dollars(totalCents)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#4A453E]">Shipping</span>
                  <span className="text-[#1F1B16]">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#4A453E]">Tax</span>
                  <span className="font-mono tabular-nums text-[#1F1B16]">$0.00</span>
                </div>
                <div
                  className="flex items-baseline justify-between pt-3"
                  style={{ borderTop: '2px solid #1F1B16' }}
                >
                  <span className="text-base font-bold text-[#1F1B16]">Total</span>
                  <span className="font-mono text-xl font-bold tabular-nums text-[#1F1B16]">
                    ${dollars(totalCents)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div style={{ border: '1px solid #E5E1D8', background: '#FFFFFF' }}>
              <div
                className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#1F1B16] px-5 py-3"
                style={{ borderBottom: '1px solid #E5E1D8', background: '#F2EEE6' }}
              >
                Payment
              </div>
              <div className="divide-y divide-[#E5E1D8]">
                {/* BackdPayments option */}
                <div
                  className="cursor-pointer transition-colors"
                  style={{
                    background: paymentMethod === 'backd' ? '#f2fff7' : '#FFFFFF',
                    padding: '16px 20px',
                  }}
                  onClick={() => setPaymentMethod('backd')}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
                      style={{
                        borderColor: paymentMethod === 'backd' ? '#A8533A' : '#D8D3C7',
                        background: paymentMethod === 'backd' ? '#A8533A' : '#FFFFFF',
                      }}
                    >
                      {paymentMethod === 'backd' && (
                        <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                      <span style={{ fontSize: 15, color: '#1F1B16' }}>
                        Access <strong>Net Terms Instantly</strong> with
                      </span>
                      <BrandMark size="md" />
                    </div>
                  </div>
                  {paymentMethod === 'backd' && (
                    <div className="mt-4 space-y-3 pl-7">
                      <p className="text-xs text-[#4A453E]">
                        Complete a quick application for flexible payment terms. Most approvals take under 2 minutes.
                      </p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setBnplOpen(true); }}
                        className="flex w-full items-center justify-center gap-2 border-[1.5px] border-[#C8E6DC] bg-white transition-all hover:border-[#269374] hover:bg-[#f2fff7] hover:shadow-sm active:scale-[0.99]"
                        style={{ borderRadius: 10, padding: '12px 22px', cursor: 'pointer' }}
                      >
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#1F1B16' }}>Pay Later</span>
                        <span style={{ fontSize: 14, fontWeight: 400, color: '#1F1B16' }}>with</span>
                        <BrandMark size="md" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Credit Card option */}
                <div
                  className="p-5 cursor-pointer transition-colors"
                  style={{ background: paymentMethod === 'cc' ? '#FAF8F4' : '#FFFFFF' }}
                  onClick={() => setPaymentMethod('cc')}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
                      style={{
                        borderColor: paymentMethod === 'cc' ? '#1F1B16' : '#D8D3C7',
                        background: paymentMethod === 'cc' ? '#1F1B16' : '#FFFFFF',
                      }}
                    >
                      {paymentMethod === 'cc' && (
                        <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#1F1B16]">Credit Card</span>
                        <span className="font-mono text-[10px] text-[#7A736A]">Visa, MC, Amex</span>
                      </div>
                      {paymentMethod === 'cc' && (
                        <form onSubmit={onCardSubmit} className="mt-3 space-y-3" autoComplete="on">
                          <div>
                            <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.1em] text-[#7A736A]">
                              Card Number
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
                              onChange={(e) =>
                                setCard((c) => ({ ...c, number: formatCardNumber(e.target.value) }))
                              }
                              onClick={(e) => e.stopPropagation()}
                              className="w-full border border-[#E5E1D8] px-3 py-2.5 text-sm text-[#1F1B16] placeholder:text-[#B8B2A8] focus:border-[#1F1B16] focus:outline-none"
                              style={{ borderRadius: 0 }}
                            />
                          </div>
                          <div>
                            <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.1em] text-[#7A736A]">
                              Name on Card
                            </label>
                            <input
                              id="card-name"
                              name="ccname"
                              type="text"
                              autoComplete="cc-name"
                              placeholder="J. Smith"
                              required
                              value={card.name}
                              onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                              onClick={(e) => e.stopPropagation()}
                              className="w-full border border-[#E5E1D8] px-3 py-2.5 text-sm text-[#1F1B16] placeholder:text-[#B8B2A8] focus:border-[#1F1B16] focus:outline-none"
                              style={{ borderRadius: 0 }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.1em] text-[#7A736A]">
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
                                onChange={(e) =>
                                  setCard((c) => ({ ...c, expiry: formatExpiry(e.target.value) }))
                                }
                                onClick={(e) => e.stopPropagation()}
                                className="w-full border border-[#E5E1D8] px-3 py-2.5 text-sm text-[#1F1B16] placeholder:text-[#B8B2A8] focus:border-[#1F1B16] focus:outline-none"
                                style={{ borderRadius: 0 }}
                              />
                            </div>
                            <div>
                              <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.1em] text-[#7A736A]">
                                CVV
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
                                onChange={(e) =>
                                  setCard((c) => ({ ...c, cvc: formatCvc(e.target.value) }))
                                }
                                onClick={(e) => e.stopPropagation()}
                                className="w-full border border-[#E5E1D8] px-3 py-2.5 text-sm text-[#1F1B16] placeholder:text-[#B8B2A8] focus:border-[#1F1B16] focus:outline-none"
                                style={{ borderRadius: 0 }}
                              />
                            </div>
                          </div>
                          <button
                            type="submit"
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-[#1F1B16] py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-[#4A453E]"
                            style={{ borderRadius: 0 }}
                          >
                            Place Order — ${dollars(totalCents)}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security badge */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ border: '1px solid #E5E1D8', background: '#FFFFFF' }}
            >
              <span className="text-base">🔒</span>
              <p className="font-mono text-[10px] text-[#7A736A]">
                Secure checkout · 256-bit SSL · PCI DSS compliant
              </p>
            </div>
          </div>
        </div>
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
    </div>
  );
}
