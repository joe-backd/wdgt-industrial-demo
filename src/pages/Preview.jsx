import { useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import products from '../data/products.json';
import { add } from '../store/cartSlice';
import BackdOfferCard from '../components/BackdOfferCard';
import ProductImage from '../components/ProductImage';

const dollars = (cents) =>
  (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TABS = ['Description', 'Technical Specs', 'Documentation'];

export default function Preview() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useMemo(() => products.find((p) => String(p.id) === String(id)), [id]);
  const fbtProducts = useMemo(() => {
    if (!product) return [];
    return (product.frequently_bought_with || [])
      .map((fid) => products.find((p) => p.id === fid))
      .filter(Boolean);
  }, [product]);

  const [tab, setTab] = useState('Description');
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <h1 className="text-2xl font-bold text-[#1F1B16]">Product not found</h1>
        <p className="mt-2 text-sm text-[#4A453E]">No product with id {id}.</p>
        <Link to="/explore" className="mt-4 inline-block text-sm font-medium text-[#A8533A] underline">
          Back to Explore
        </Link>
      </div>
    );
  }

  const onAdd = () => {
    dispatch(
      add({
        id: product.id,
        name: product.name,
        image: product.icon,
        priceCents: product.retail_price_cents,
        size: 'each',
        brand: product.brand_name,
        qty,
      })
    );
    navigate('/cart');
  };

  const specEntries = Object.entries(product.specs || {});
  const stockLow = product.stock_status !== 'IN STOCK';

  return (
    <div style={{ background: '#FAF8F4', minHeight: '60vh' }}>
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#7A736A]">
          <Link to="/" className="hover:text-[#1F1B16]">Home</Link>
          <span>/</span>
          <Link to="/explore" className="hover:text-[#1F1B16]">Shop</Link>
          <span>/</span>
          <Link to="/explore" className="hover:text-[#1F1B16]">{product.category}</Link>
          <span>/</span>
          <span className="text-[#1F1B16]">{product.sku}</span>
        </nav>

        {/* Main grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left: gallery + tabs */}
          <div>
            {/* Main image area */}
            <div
              className="relative flex items-center justify-center"
              style={{ background: '#F2EEE6', height: 420 }}
            >
              <span
                className="absolute top-3 left-3 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-white"
                style={{ background: '#1F1B16', padding: '3px 8px' }}
              >
                UL-Listed
              </span>
              <ProductImage productId={product.id} size="lg" />
            </div>

            {/* Thumbnails */}
            <div className="mt-2 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-center cursor-pointer transition-colors"
                  style={{
                    height: 64,
                    background: '#F2EEE6',
                    border: i === 0 ? '2px solid #1F1B16' : '1px solid #E5E1D8',
                  }}
                >
                  <ProductImage productId={product.id} size="sm" />
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-6">
              <div
                className="flex"
                style={{ borderBottom: '2px solid #E5E1D8' }}
              >
                {TABS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className="px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
                    style={{
                      borderBottom: tab === t ? '2px solid #1F1B16' : '2px solid transparent',
                      marginBottom: -2,
                      color: tab === t ? '#1F1B16' : '#7A736A',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-sm text-[#4A453E] leading-relaxed">
                {tab === 'Description' && (
                  <div>
                    <p>{product.story_html}</p>
                    <ul className="mt-4 space-y-1 pl-4">
                      {specEntries.slice(0, 3).map(([k, v]) => (
                        <li key={k} className="list-disc text-xs text-[#4A453E]">
                          <span className="font-semibold">{k}:</span> {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tab === 'Technical Specs' && (
                  <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
                    <tbody>
                      {specEntries.map(([k, v], i) => (
                        <tr key={k} style={{ background: i % 2 === 0 ? '#F2EEE6' : '#FFFFFF' }}>
                          <td className="font-mono font-semibold text-[#1F1B16] px-3 py-2 w-40" style={{ borderBottom: '1px solid #E5E1D8' }}>{k}</td>
                          <td className="text-[#4A453E] px-3 py-2" style={{ borderBottom: '1px solid #E5E1D8' }}>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {tab === 'Documentation' && (
                  <div className="flex flex-col gap-3">
                    <div
                      className="flex items-center gap-3 p-4"
                      style={{ border: '1px solid #E5E1D8', background: '#FFFFFF' }}
                    >
                      <span className="text-xl">📄</span>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-[#1F1B16]">Product Spec Sheet</p>
                        <p className="text-[10px] text-[#7A736A] font-mono">PDF — Request required</p>
                      </div>
                      <button
                        type="button"
                        className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#A8533A] hover:underline"
                      >
                        Request →
                      </button>
                    </div>
                    <p className="font-mono text-[11px] text-[#7A736A]">
                      Spec sheets, CAD files, and wiring diagrams available upon request.
                      Contact technical support at 1-800-WDGT-SUP.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Key Specs */}
            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#7A736A] mb-2">Key Specs</p>
              <div className="grid grid-cols-2 gap-px" style={{ background: '#E5E1D8' }}>
                {specEntries.map(([k, v]) => (
                  <div key={k} className="px-3 py-2" style={{ background: '#FFFFFF' }}>
                    <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#7A736A]">{k}</p>
                    <p className="font-mono text-[11px] font-semibold text-[#1F1B16] mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Short desc */}
            <p className="mt-4 text-sm text-[#4A453E] leading-relaxed">{product.short_desc}</p>
          </div>

          {/* Right: product info */}
          <div className="space-y-5">
            {/* Category breadcrumb */}
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#7A736A]">
              {product.category} / {product.subcategory}
            </p>

            {/* Title */}
            <h1 className="text-[28px] font-bold leading-tight text-[#1F1B16]">
              {product.name}
            </h1>

            {/* Stars + reviews */}
            <div className="flex items-center gap-2">
              <span style={{ color: '#A8533A', fontSize: 15 }}>★★★★★</span>
              <span className="font-mono text-[11px] text-[#7A736A]">(24 reviews)</span>
            </div>

            {/* SKU / Brand / Status */}
            <div
              className="flex flex-wrap items-center gap-x-5 gap-y-1 py-3"
              style={{ borderTop: '1px solid #E5E1D8', borderBottom: '1px solid #E5E1D8' }}
            >
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#7A736A]">SKU </span>
                <span className="font-mono text-[10px] text-[#1F1B16]">{product.sku}</span>
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#7A736A]">Brand </span>
                <span className="font-mono text-[10px] text-[#1F1B16]">{product.brand_name}</span>
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#7A736A]">Status </span>
                <span
                  className="font-mono text-[10px] font-bold"
                  style={{ color: stockLow ? '#A8533A' : '#269374' }}
                >
                  {product.stock_status}
                </span>
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="font-mono text-3xl font-bold text-[#1F1B16]">
                ${dollars(product.retail_price_cents)}
              </p>
              <p className="font-mono text-[10px] text-[#7A736A] mt-0.5">/ each · Free shipping</p>
            </div>

            {/* BackdOfferCard */}
            <BackdOfferCard totalCents={product.retail_price_cents} />

            {/* Buy box */}
            <div
              className="space-y-4 p-4"
              style={{ background: '#F2EEE6', border: '1px solid #E5E1D8' }}
            >
              {/* Stock + delivery */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#7A736A]">Availability</p>
                  <p className="mt-1 flex items-center gap-1.5 font-semibold text-[#1F1B16]">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: stockLow ? '#A8533A' : '#269374' }}
                    />
                    {stockLow
                      ? `${product.stock_status} — ${product.stock_count} units`
                      : `In Stock — ${product.stock_count} units`}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#7A736A]">Est. Delivery</p>
                  <p className="mt-1 font-semibold text-[#1F1B16]">{product.estimated_delivery}</p>
                </div>
              </div>

              {/* Qty + Add */}
              <div className="flex items-center gap-3">
                <div className="flex items-center" style={{ border: '1px solid #D8D3C7' }}>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-9 text-base font-bold text-[#1F1B16] hover:bg-[#E5E1D8] flex items-center justify-center"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-10 h-9 text-center font-mono text-sm font-bold text-[#1F1B16] focus:outline-none"
                    style={{ background: '#FFFFFF', border: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="w-8 h-9 text-base font-bold text-[#1F1B16] hover:bg-[#E5E1D8] flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={onAdd}
                  className="flex-1 bg-[#1F1B16] py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-[#4A453E]"
                  style={{ borderRadius: 0 }}
                >
                  Add to Cart
                </button>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: '★', label: 'Save to List' },
                  { icon: '⊞', label: 'Add to Quote' },
                  { icon: '⎙', label: 'Spec Sheet' },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    className="flex flex-col items-center gap-1 py-2 text-center transition-colors hover:bg-[#E5E1D8]"
                    style={{ border: '1px solid #D8D3C7', background: '#FFFFFF' }}
                  >
                    <span className="text-sm">{icon}</span>
                    <span className="font-mono text-[9px] text-[#7A736A]">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Meta row */}
            <div className="space-y-1 text-xs text-[#7A736A]">
              <p><span className="font-mono uppercase tracking-[0.08em]">Category:</span> {product.category} / {product.subcategory}</p>
              <p><span className="font-mono uppercase tracking-[0.08em]">Tag:</span> {product.tag}</p>
              <p><span className="font-mono uppercase tracking-[0.08em]">Lead Time:</span> Ships {product.estimated_delivery}</p>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together */}
        {fbtProducts.length > 0 && (
          <section className="mt-12">
            <div
              className="mb-5 flex items-baseline justify-between pb-3"
              style={{ borderBottom: '2px solid #1F1B16' }}
            >
              <h2 className="text-base font-bold uppercase tracking-[0.08em] text-[#1F1B16]">
                Frequently Bought Together
              </h2>
              <Link
                to="/explore"
                className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#7A736A] hover:text-[#1F1B16]"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {fbtProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col bg-white transition-colors"
                  style={{ border: '1px solid #E5E1D8' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1F1B16'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E1D8'}
                >
                  <Link
                    to={`/preview/${p.id}`}
                    className="flex items-center justify-center"
                    style={{ height: 80, background: '#F2EEE6' }}
                  >
                    <ProductImage productId={p.id} size="sm" />
                  </Link>
                  <div className="p-3 flex flex-1 flex-col gap-1">
                    <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#7A736A]">{p.sku}</p>
                    <Link to={`/preview/${p.id}`}>
                      <p className="text-[11px] font-semibold leading-snug text-[#1F1B16] line-clamp-2 hover:underline">
                        {p.name}
                      </p>
                    </Link>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <p className="font-mono text-xs font-bold text-[#1F1B16]">${dollars(p.retail_price_cents)}</p>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            add({
                              id: p.id,
                              name: p.name,
                              image: p.icon,
                              priceCents: p.retail_price_cents,
                              size: 'each',
                              brand: p.brand_name,
                            })
                          )
                        }
                        className="bg-[#1F1B16] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-white hover:bg-[#4A453E]"
                        style={{ borderRadius: 0 }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
