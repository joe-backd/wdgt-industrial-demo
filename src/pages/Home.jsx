import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import products from '../data/products.json';
import { add } from '../store/cartSlice';
import HeroCarousel from '../components/HeroCarousel';
import WLogoMark from '../components/WLogoMark';
import ProductImage from '../components/ProductImage';

const dollars = (cents) => (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CATEGORIES = [
  {
    name: 'Industrial Automation',
    desc: 'PLCs, HMIs, VFDs, servos, sensors, gateways',
    icon: '⚙️',
    count: 9,
  },
  {
    name: 'Material Handling',
    desc: 'Pallet jacks, conveyors, lift tables',
    icon: '🛠️',
    count: 1,
  },
  {
    name: 'Electrical & Power',
    desc: 'Power supplies, UPS, distribution',
    icon: '⚡',
    count: 2,
  },
  {
    name: 'Safety & Equipment',
    desc: 'PPE, guards, lockout/tagout, signage',
    icon: '🦺',
    count: 0,
  },
];

const STORE_STRIPS = [
  { icon: '🚚', label: 'Same-Day Shipping', sub: 'Orders placed by 2 PM CT' },
  { icon: '📞', label: 'Tech Support', sub: 'Mon–Fri 7 AM–6 PM CT' },
  { icon: '📋', label: 'Volume Quoting', sub: '24-hr turnaround on RFQs' },
  { icon: '↩️', label: '30-Day Returns', sub: 'Hassle-free return policy' },
];

const FOOTER_COLS = [
  {
    heading: 'Products',
    links: ['Industrial Automation', 'Material Handling', 'Electrical & Power', 'Safety & Equipment', 'New Arrivals'],
  },
  {
    heading: 'Services',
    links: ['Volume Quoting', 'Panel Build Services', 'Technical Support', 'Training & Docs', 'Warranty & Repair'],
  },
  {
    heading: 'Account',
    links: ['Sign In', 'Register', 'Order History', 'Quote Requests', 'Account Settings'],
  },
  {
    heading: 'Company',
    links: ['About WDGT', 'Careers', 'Press', 'Terms of Use', 'Privacy Policy'],
  },
];

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const stockLow = product.stock_status !== 'IN STOCK';

  return (
    <div
      className="group flex flex-col bg-white transition-colors"
      style={{ border: '1px solid #E5E1D8' }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1F1B16'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E1D8'}
    >
      <Link to={`/preview/${product.id}`} className="block relative" style={{ height: 160, background: '#F2EEE6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Tag chip */}
        <span
          className="absolute top-2 left-2 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#4A453E]"
          style={{ background: '#E5E1D8', padding: '2px 6px' }}
        >
          {product.tag}
        </span>
        {/* Stock chip */}
        {stockLow && (
          <span
            className="absolute bottom-2 right-2 font-mono text-[9px] font-bold uppercase tracking-[0.08em]"
            style={{ background: '#F7EDE7', color: '#A8533A', padding: '2px 6px' }}
          >
            {product.stock_status}
          </span>
        )}
        <ProductImage productId={product.id} size="md" />
      </Link>
      <div className="flex flex-1 flex-col p-4 gap-2">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#7A736A]">{product.sku}</p>
          <Link to={`/preview/${product.id}`}>
            <p className="mt-1 text-sm font-semibold leading-snug text-[#1F1B16] line-clamp-2 hover:underline">
              {product.name}
            </p>
          </Link>
          <p className="mt-1 text-xs text-[#4A453E] line-clamp-2">{product.short_desc}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="font-mono text-base font-bold text-[#1F1B16]">${dollars(product.retail_price_cents)}</p>
          <button
            type="button"
            onClick={() =>
              dispatch(add({
                id: product.id,
                name: product.name,
                image: product.icon,
                priceCents: product.retail_price_cents,
                size: 'each',
                brand: product.brand_name,
              }))
            }
            className="bg-[#1F1B16] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white hover:bg-[#4A453E]"
            style={{ borderRadius: 0 }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section style={{ background: '#F2EEE6', padding: '56px 0' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-stretch">
            {/* Left */}
            <div>
              <p
                className="font-mono text-xs uppercase tracking-[0.15em] font-semibold"
                style={{ color: '#A8533A' }}
              >
                Industrial B2B Equipment Distributor
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-[#1F1B16] lg:text-5xl">
                The equipment your line runs on.
                <br />
                <span style={{ color: '#A8533A' }}>On net terms.</span>
              </h1>
              <p className="mt-4 max-w-lg text-[15px] text-[#4A453E] leading-relaxed">
                WDGT Industrial stocks 2,400+ SKUs in Austin TX for same-day ship. BackdPayments Net 30 and extended terms available at checkout — no forms, no delays.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/explore"
                  className="bg-[#1F1B16] px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white hover:bg-[#4A453E]"
                  style={{ borderRadius: 0 }}
                >
                  Shop All Products →
                </Link>
                <Link
                  to="/explore"
                  className="border border-[#1F1B16] px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-[#1F1B16] hover:bg-[#E5E1D8]"
                  style={{ borderRadius: 0 }}
                >
                  Request a Quote
                </Link>
              </div>
            </div>

            {/* Right: hero carousel */}
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section style={{ background: '#FFFFFF', padding: '56px 0' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-xl font-bold text-[#1F1B16]">Shop by Category</h2>
            <Link
              to="/explore"
              className="font-mono text-xs uppercase tracking-[0.1em] text-[#7A736A] hover:text-[#1F1B16]"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to="/explore"
                className="group flex flex-col gap-3 p-5 transition-colors"
                style={{ border: '1px solid #E5E1D8', background: '#FAF8F4' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1F1B16';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E1D8';
                  e.currentTarget.style.background = '#FAF8F4';
                }}
              >
                <span style={{ fontSize: 32 }}>{cat.icon}</span>
                <div>
                  <p className="text-sm font-bold text-[#1F1B16]">{cat.name}</p>
                  <p className="mt-1 text-xs text-[#7A736A] leading-snug">{cat.desc}</p>
                </div>
                <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.1em] text-[#A8533A]">
                  {cat.count} products →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ background: '#FAF8F4', padding: '56px 0' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-xl font-bold text-[#1F1B16]">Featured Products</h2>
            <Link
              to="/explore"
              className="font-mono text-xs uppercase tracking-[0.1em] text-[#7A736A] hover:text-[#1F1B16]"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Store Strip */}
      <section style={{ background: '#1F1B16', padding: '40px 0' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STORE_STRIPS.map(({ icon, label, sub }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="text-2xl shrink-0">{icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-[#B8B2A8]">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#141210', borderTop: '1px solid #2A2520' }}>
        <div className="mx-auto max-w-[1200px] px-6 py-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
            {/* Logo col */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <WLogoMark size={36} />
                <div>
                  <div className="text-[12px] font-bold tracking-[0.08em] text-white leading-none">WDGT INDUSTRIAL</div>
                  <div className="font-mono text-[9px] text-[#7A736A] tracking-[0.05em] mt-0.5">B2B Equipment</div>
                </div>
              </div>
              <p className="font-mono text-[11px] text-[#7A736A] leading-relaxed">
                Austin, TX<br />
                1-800-WDGT-IND<br />
                supply@wdgt.io
              </p>
            </div>

            {/* Link cols */}
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#B8B2A8] mb-4">
                  {col.heading}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((lnk) => (
                    <li key={lnk}>
                      <a href="#" className="font-mono text-[11px] text-[#7A736A] hover:text-white">
                        {lnk}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="mt-10 pt-6 flex items-center justify-between"
            style={{ borderTop: '1px solid #2A2520' }}
          >
            <p className="font-mono text-[10px] text-[#4A453E]">
              © 2026 WDGT Industrial Supply, Inc. All rights reserved.
            </p>
            <p className="font-mono text-[10px] text-[#4A453E]">
              BNPL financing provided by BackdPayments
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
