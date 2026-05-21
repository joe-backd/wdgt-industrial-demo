import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import products from '../data/products.json';
import { add } from '../store/cartSlice';
import ProductImage from '../components/ProductImage';

const dollars = (cents) =>
  (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CATEGORIES = [
  'All',
  'Industrial Automation',
  'Electrical & Power',
  'Material Handling',
];

const CATEGORY_COUNTS = {
  All: 12,
  'Industrial Automation': 9,
  'Electrical & Power': 2,
  'Material Handling': 1,
};

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
];

export default function Explore() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category, setCategory] = useState('All');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [activePriceRange, setActivePriceRange] = useState(null);
  const [sort, setSort] = useState('default');

  const visible = useMemo(() => {
    let list = category === 'All'
      ? products
      : products.filter((p) => p.category === category);

    if (activePriceRange) {
      const [min, max] = activePriceRange;
      list = list.filter((p) => {
        const price = p.retail_price_cents / 100;
        if (min !== '' && price < Number(min)) return false;
        if (max !== '' && price > Number(max)) return false;
        return true;
      });
    }

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.retail_price_cents - b.retail_price_cents);
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.retail_price_cents - a.retail_price_cents);
    else if (sort === 'name-asc') list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [category, activePriceRange, sort]);

  const handlePriceGo = () => {
    setActivePriceRange([priceMin, priceMax]);
  };

  const handleAddToCart = (product) => {
    dispatch(
      add({
        id: product.id,
        name: product.name,
        image: product.icon,
        priceCents: product.retail_price_cents,
        size: 'each',
        brand: product.brand_name,
      })
    );
  };

  return (
    <div style={{ background: '#FAF8F4', minHeight: '60vh' }}>
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="grid gap-6" style={{ gridTemplateColumns: '220px 1fr' }}>
          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Categories */}
            <div style={{ border: '1px solid #E5E1D8', background: '#FFFFFF' }}>
              <div
                className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#1F1B16] px-4 py-3"
                style={{ borderBottom: '1px solid #E5E1D8', background: '#F2EEE6' }}
              >
                Categories
              </div>
              <ul className="py-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => setCategory(cat)}
                      className="flex w-full items-center justify-between px-4 py-2 text-left text-xs transition-colors hover:bg-[#F2EEE6]"
                      style={{
                        color: category === cat ? '#A8533A' : '#1F1B16',
                        fontWeight: category === cat ? 600 : 400,
                        background: category === cat ? '#F7EDE7' : 'transparent',
                      }}
                    >
                      <span>{cat}</span>
                      <span
                        className="font-mono text-[10px]"
                        style={{ color: '#7A736A' }}
                      >
                        {CATEGORY_COUNTS[cat]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div style={{ border: '1px solid #E5E1D8', background: '#FFFFFF' }}>
              <div
                className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#1F1B16] px-4 py-3"
                style={{ borderBottom: '1px solid #E5E1D8', background: '#F2EEE6' }}
              >
                Filter by Price
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min $"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full border border-[#E5E1D8] px-2 py-1.5 text-xs text-[#1F1B16] focus:border-[#1F1B16] focus:outline-none"
                    style={{ borderRadius: 0 }}
                  />
                  <span className="text-[#7A736A] text-xs">–</span>
                  <input
                    type="number"
                    placeholder="Max $"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full border border-[#E5E1D8] px-2 py-1.5 text-xs text-[#1F1B16] focus:border-[#1F1B16] focus:outline-none"
                    style={{ borderRadius: 0 }}
                  />
                </div>
                <button
                  type="button"
                  onClick={handlePriceGo}
                  className="w-full bg-[#1F1B16] py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#4A453E]"
                  style={{ borderRadius: 0 }}
                >
                  Apply
                </button>
                {activePriceRange && (
                  <button
                    type="button"
                    onClick={() => { setActivePriceRange(null); setPriceMin(''); setPriceMax(''); }}
                    className="w-full text-[10px] text-[#7A736A] underline hover:text-[#1F1B16]"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs text-[#7A736A]">
                <span className="font-bold text-[#1F1B16]">{visible.length}</span> results
                {category !== 'All' && (
                  <span> in <span className="text-[#1F1B16]">{category}</span></span>
                )}
              </p>
              <div className="flex items-center gap-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#7A736A]">
                  Sort:
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border border-[#E5E1D8] bg-white px-2 py-1.5 text-xs text-[#1F1B16] focus:border-[#1F1B16] focus:outline-none"
                  style={{ borderRadius: 0 }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 5-column product grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {visible.map((p) => {
                const stockLow = p.stock_status !== 'IN STOCK';
                return (
                  <div
                    key={p.id}
                    className="group flex flex-col bg-white transition-colors"
                    style={{ border: '1px solid #E5E1D8' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1F1B16'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E1D8'}
                  >
                    {/* Thumb */}
                    <Link
                      to={`/preview/${p.id}`}
                      className="relative flex items-center justify-center"
                      style={{ height: 130, background: '#F2EEE6' }}
                    >
                      <span
                        className="absolute top-1.5 left-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.08em] text-[#4A453E]"
                        style={{ background: '#E5E1D8', padding: '1px 5px' }}
                      >
                        {p.tag}
                      </span>
                      {stockLow && (
                        <span
                          className="absolute bottom-1.5 right-1.5 font-mono text-[8px] font-bold uppercase"
                          style={{ background: '#F7EDE7', color: '#A8533A', padding: '1px 5px' }}
                        >
                          {p.stock_status}
                        </span>
                      )}
                      <ProductImage productId={p.id} size="sm" />
                    </Link>

                    {/* Info */}
                    <div className="flex flex-1 flex-col p-3 gap-1.5">
                      <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-[#7A736A]">{p.sku}</p>
                      <Link to={`/preview/${p.id}`}>
                        <p className="text-[11px] font-semibold leading-snug text-[#1F1B16] line-clamp-2 hover:underline">
                          {p.name}
                        </p>
                      </Link>
                      <div className="mt-auto flex items-center justify-between pt-1.5">
                        <p className="font-mono text-sm font-bold text-[#1F1B16]">${dollars(p.retail_price_cents)}</p>
                        <button
                          type="button"
                          onClick={() => handleAddToCart(p)}
                          className="bg-[#1F1B16] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-white hover:bg-[#4A453E]"
                          style={{ borderRadius: 0 }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {visible.length === 0 && (
              <div
                className="flex flex-col items-center justify-center py-20 text-center"
                style={{ border: '1px dashed #D8D3C7' }}
              >
                <p className="font-mono text-xs text-[#7A736A]">No products match your filters.</p>
                <button
                  type="button"
                  onClick={() => { setCategory('All'); setActivePriceRange(null); setPriceMin(''); setPriceMax(''); }}
                  className="mt-4 bg-[#1F1B16] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white hover:bg-[#4A453E]"
                  style={{ borderRadius: 0 }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
