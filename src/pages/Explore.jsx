import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products.json';

export default function Explore() {
  const [brand, setBrand] = useState('All');
  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand_name).filter(Boolean));
    return ['All', ...[...set].sort()];
  }, []);
  const visible = useMemo(
    () => (brand === 'All' ? products : products.filter((p) => p.brand_name === brand)),
    [brand]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Explore</h1>
        <p className="text-sm text-neutral-500">{visible.length} pairs</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {brands.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setBrand(b)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
              brand === b
                ? 'border-black bg-black text-white'
                : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => (
          <Link
            key={p.id}
            to={`/preview/${p.id}`}
            className="group rounded-2xl border border-neutral-200 bg-white p-3 transition hover:shadow-md"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-neutral-50">
              <img
                src={p.grid_picture_url}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-contain transition group-hover:scale-105"
              />
            </div>
            <div className="mt-3">
              <p className="text-[10px] uppercase tracking-wider text-neutral-500">{p.brand_name}</p>
              <p className="mt-0.5 line-clamp-2 text-xs font-medium">{p.name}</p>
              <p className="mt-1.5 text-sm font-semibold">${(p.retail_price_cents / 100).toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
