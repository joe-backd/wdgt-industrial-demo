import { useState } from 'react';
import BrandMark from '../components/BrandMark';

const TABS = ['Order History', 'Financing & Payments', 'Profile & Settings'];

const ORDERS = [
  { id: 'WDG-2026-0041', date: 'May 22, 2026', item: 'Allen-Bradley MicroLogix 1400 PLC', qty: 2, amount: '$5,990.00', status: 'Delivered' },
  { id: 'WDG-2026-0038', date: 'May 14, 2026', item: 'Siemens SINAMICS G120 VFD', qty: 1, amount: '$2,995.00', status: 'Delivered' },
  { id: 'WDG-2026-0031', date: 'Apr 29, 2026', item: 'Keyence CV-X Series Vision System', qty: 1, amount: '$4,450.00', status: 'Delivered' },
  { id: 'WDG-2026-0027', date: 'Apr 11, 2026', item: 'Phoenix Contact UPS 24VDC PSU', qty: 4, amount: '$2,196.00', status: 'Delivered' },
  { id: 'WDG-2026-0019', date: 'Mar 28, 2026', item: 'Omron NX1P2 Machine Automation Controller', qty: 1, amount: '$3,750.00', status: 'Delivered' },
];

const STATUS_COLORS = {
  Delivered:   { color: '#269374', bg: '#EDF7F4' },
  'In Transit': { color: '#A8533A', bg: '#F7EDE7' },
  Processing:  { color: '#7A736A', bg: '#F2EEE6' },
};

export default function Account() {
  const [tab, setTab] = useState('Order History');

  return (
    <div style={{ background: '#FAF8F4', minHeight: '60vh' }}>
      <div className="mx-auto max-w-[1200px] px-6 py-8">

        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1F1B16]">My Account</h1>
          <p className="mt-1 font-mono text-[11px] text-[#7A736A]">Acme Industrial Corp · acme@wdgt.io</p>
        </div>

        {/* Tab bar */}
        <div style={{ borderBottom: '2px solid #E5E1D8' }} className="flex">
          {TABS.map((t) => {
            const isPlaceholder = t === 'Profile & Settings';
            const isActive = tab === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => !isPlaceholder && setTab(t)}
                className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
                style={{
                  borderBottom: isActive ? '2px solid #1F1B16' : '2px solid transparent',
                  marginBottom: -2,
                  color: isPlaceholder ? '#B8B2A8' : isActive ? '#1F1B16' : '#7A736A',
                  cursor: isPlaceholder ? 'default' : 'pointer',
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="mt-6">

          {/* ── Order History ── */}
          {tab === 'Order History' && (
            <div style={{ border: '1px solid #E5E1D8', background: '#FFFFFF' }}>
              <div
                className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#1F1B16] px-5 py-3"
                style={{ borderBottom: '1px solid #E5E1D8', background: '#F2EEE6' }}
              >
                Recent Orders
              </div>

              {/* Table head */}
              <div
                className="grid font-mono text-[9px] uppercase tracking-[0.12em] text-[#7A736A] px-5 py-2.5"
                style={{ gridTemplateColumns: '130px 1fr 120px 100px 90px 120px', borderBottom: '1px solid #E5E1D8', background: '#FAF8F4' }}
              >
                <span>Order #</span>
                <span>Item</span>
                <span>Date</span>
                <span className="text-right">Amount</span>
                <span className="text-center">Status</span>
                <span className="text-right">Actions</span>
              </div>

              {ORDERS.map((o, i) => {
                const s = STATUS_COLORS[o.status] ?? STATUS_COLORS.Processing;
                return (
                  <div
                    key={o.id}
                    className="grid items-center px-5 py-3"
                    style={{
                      gridTemplateColumns: '130px 1fr 120px 100px 90px 120px',
                      borderBottom: i < ORDERS.length - 1 ? '1px solid #E5E1D8' : 'none',
                    }}
                  >
                    <span className="font-mono text-[10px] font-bold text-[#A8533A]">{o.id}</span>
                    <div className="pr-4 min-w-0">
                      <p className="text-xs font-semibold text-[#1F1B16] truncate">{o.item}</p>
                      <p className="font-mono text-[9px] text-[#7A736A]">Qty {o.qty}</p>
                    </div>
                    <span className="font-mono text-[10px] text-[#7A736A]">{o.date}</span>
                    <span className="text-right font-mono text-xs font-bold text-[#1F1B16]">{o.amount}</span>
                    <div className="flex justify-center">
                      <span
                        className="font-mono text-[9px] font-bold uppercase tracking-[0.06em] px-2 py-0.5"
                        style={{ color: s.color, background: s.bg }}
                      >
                        {o.status}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#7A736A] hover:text-[#1F1B16] underline"
                      >
                        Invoice
                      </button>
                      <button
                        type="button"
                        className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#7A736A] hover:text-[#1F1B16] underline"
                      >
                        Reorder
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Financing & Payments ── */}
          {tab === 'Financing & Payments' && (
            <div className="max-w-xl">
              <div style={{ border: '1px solid #D6E7E0', background: '#EDF7F4' }}>

                {/* Header — entire row is the portal link */}
                <a
                  href="https://merchant-portal-demo-eight.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-4 transition-opacity hover:opacity-70"
                  style={{ borderBottom: '1px solid #D6E7E0', display: 'flex' }}
                >
                  <BrandMark size="lg" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#4A7A6A]">Open Portal →</span>
                </a>

                {/* Stats */}
                <div className="grid grid-cols-3 divide-x divide-[#D6E7E0]">
                  {[
                    { label: 'Credit Line', value: '$50,000' },
                    { label: 'Available', value: '$47,005' },
                    { label: 'Next Payment', value: 'Jun 15, 2026' },
                  ].map(({ label, value }) => (
                    <div key={label} className="px-5 py-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#4A7A6A]">{label}</p>
                      <p className="mt-1 font-mono text-base font-bold text-[#0B372B]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
