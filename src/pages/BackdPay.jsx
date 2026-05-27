import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeAll } from '../store/cartSlice';

// The /BackdPay route is the order_success_url the widget config points at.
// On arrival here, treat the order as fulfilled and clear the cart.
export default function BackdPay() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeAll());
  }, [dispatch]);

  return (
    <div style={{ background: '#FAF8F4', minHeight: '60vh' }}>
      <div className="mx-auto flex max-w-[560px] flex-col items-center px-6 py-20 text-center">
        {/* Check icon */}
        <div
          className="flex h-14 w-14 items-center justify-center text-2xl"
          style={{
            background: '#EDF7F4',
            border: '2px solid #D6E7E0',
          }}
        >
          ✓
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-2xl font-bold text-[#1F1B16]">Order Confirmed</h1>
        <p className="mt-3 text-sm text-[#4A453E] leading-relaxed max-w-sm">
          Your WDGT Supply order has been placed. You'll receive a confirmation and shipping notification by email.
        </p>

        {/* Order details card */}
        <div
          className="mt-8 w-full text-left"
          style={{ border: '1px solid #E5E1D8', background: '#FFFFFF' }}
        >
          <div
            className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#1F1B16] px-5 py-3"
            style={{ borderBottom: '1px solid #E5E1D8', background: '#F2EEE6' }}
          >
            What Happens Next
          </div>
          <div className="divide-y divide-[#E5E1D8]">
            {[
              { step: '01', label: 'Confirmation Email', desc: 'Check your inbox for order details and invoice.' },
              { step: '02', label: 'Processing', desc: 'Your order enters our warehouse queue immediately.' },
              { step: '03', label: 'Ships from Austin TX', desc: 'You\'ll receive a tracking number within 1 business day.' },
              { step: '04', label: 'Payment Schedule', desc: 'Your payment schedule will be emailed to you separately.' },
            ].map(({ step, label, desc }) => (
              <div key={step} className="flex items-start gap-4 px-5 py-3">
                <span
                  className="font-mono text-xs font-bold shrink-0 mt-0.5"
                  style={{ color: '#A8533A' }}
                >
                  {step}
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#1F1B16]">{label}</p>
                  <p className="font-mono text-[10px] text-[#7A736A] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/explore"
            className="bg-[#1F1B16] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-[#4A453E]"
            style={{ borderRadius: 0 }}
          >
            Continue Shopping →
          </Link>
          <Link
            to="/"
            className="border border-[#D8D3C7] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#1F1B16] hover:bg-[#F2EEE6]"
            style={{ borderRadius: 0 }}
          >
            Back to Home
          </Link>
        </div>

        {/* Support note */}
        <p className="mt-8 font-mono text-[10px] text-[#7A736A]">
          Questions? Call 1-800-WDGT-SUP or email orders@wdgt.io
        </p>
      </div>
    </div>
  );
}
