import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCount } from '../store/cartSlice';
import BrandMark from './BrandMark';
import WLogoMark from './WLogoMark';

export default function Navbar() {
  const count = useSelector(selectCount);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40">

      {/* BackdPayments banner — homepage only, very top */}
      {pathname === '/' && (
        <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E4DC' }}>
          <div className="flex items-center justify-center gap-2 px-6 py-2">
            <BrandMark size="sm" />
            <span style={{ fontSize: 13, color: '#1F1B16' }}>
              Net terms or payment up to 24 months.
            </span>
            <a
              href="https://backdpayments.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: '#269374' }}
              className="hover:underline"
            >
              Learn More
            </a>
          </div>
        </div>
      )}

      {/* Utility bar */}
      <div style={{ background: '#ECE6D8', borderBottom: '1px solid #D8D3C7' }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-1.5">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-[#4A453E]">📞 1-800-WDGT-IND</span>
            <span className="text-[#D8D3C7]">|</span>
            <a href="#" className="font-mono text-[11px] text-[#4A453E] hover:text-[#1F1B16]">Help Center</a>
            <a href="#" className="font-mono text-[11px] text-[#4A453E] hover:text-[#1F1B16]">Order Status</a>
            <a href="#" className="font-mono text-[11px] text-[#4A453E] hover:text-[#1F1B16]">Track Order</a>
            <a href="#" className="font-mono text-[11px] text-[#4A453E] hover:text-[#1F1B16]">Quote Requests</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-[#4A453E]">Ship to: 78741</span>
            <span className="text-[#D8D3C7]">|</span>
            <a href="#" className="font-mono text-[11px] text-[#4A453E] hover:text-[#1F1B16]">Sign In / Register</a>
            <span className="text-[#D8D3C7]">|</span>
            <Link to="/cart" className="font-mono text-[11px] text-[#4A453E] hover:text-[#1F1B16]">
              Cart{count > 0 ? ` (${count})` : ''}
            </Link>
          </div>
        </div>
      </div>

      {/* Logo header */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E1D8' }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <WLogoMark size={44} />
            <div>
              <div className="text-[15px] font-bold tracking-[0.08em] text-[#1F1B16] leading-none">
                WDGT INDUSTRIAL
              </div>
              <div className="font-mono text-[10px] text-[#7A736A] tracking-[0.05em] mt-0.5">
                B2B Equipment &amp; Supply
              </div>
            </div>
          </Link>

          {/* Search */}
          <div className="flex flex-1 max-w-xs items-center">
            <input
              type="search"
              placeholder="Search SKU, product, brand…"
              className="w-full border border-[#E5E1D8] bg-[#FAF8F4] px-3 py-2 text-sm text-[#1F1B16] placeholder:text-[#7A736A] focus:border-[#1F1B16] focus:outline-none"
              style={{ borderRadius: 0 }}
            />
            <button
              type="button"
              className="border border-l-0 border-[#E5E1D8] bg-[#1F1B16] px-3 py-2 text-white text-sm font-mono hover:bg-[#4A453E]"
              style={{ borderRadius: 0 }}
            >
              →
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="border border-[#E5E1D8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#1F1B16] hover:border-[#1F1B16]"
              style={{ borderRadius: 0 }}
            >
              My Account
            </button>
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 border border-[#1F1B16] bg-[#1F1B16] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#4A453E]"
              style={{ borderRadius: 0 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Cart
              {count > 0 && (
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-[#A8533A] font-mono text-[10px] text-white"
                  style={{ minWidth: 16 }}
                >
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <div style={{ background: '#1F1B16' }}>
        <nav className="mx-auto flex max-w-[1200px] items-center gap-0 px-6">
          {[
            { to: '/', label: 'Home', end: true },
            { to: '/explore', label: 'Shop All' },
            { to: '/explore', label: 'Industrial Automation' },
            { to: '/explore', label: 'Material Handling' },
            { to: '/explore', label: 'Electrical & Power' },
            { to: '/explore', label: 'Safety & Equipment' },
            { to: '/explore', label: 'Quote Request' },
          ].map(({ to, label, end }) => (
            <NavLink
              key={label}
              to={to}
              end={end}
              className={({ isActive }) =>
                `px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                  isActive
                    ? 'border-b-2 border-[#A8533A] text-white'
                    : 'border-b-2 border-transparent text-[#B8B2A8] hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
