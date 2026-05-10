import { useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import products from '../data/products.json';
import { add } from '../store/cartSlice';
import BackdOfferCard from '../components/BackdOfferCard';

export default function Preview() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useMemo(() => products.find((p) => String(p.id) === String(id)), [id]);
  const sizes = useMemo(() => {
    if (!product) return [];
    return [...(product.size_range || [])].sort((a, b) => a - b);
  }, [product]);
  const [size, setSize] = useState(null);

  if (!product) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-navy-900">Not found</h1>
        <p className="text-navy-500">No product with id {id}.</p>
        <Link to="/explore" className="text-sm font-medium text-navy-900 underline">
          Back to Explore
        </Link>
      </div>
    );
  }

  const onAdd = () => {
    if (!size) return;
    dispatch(
      add({
        id: product.id,
        name: product.name,
        image: product.grid_picture_url,
        priceCents: product.retail_price_cents,
        size,
        brand: product.brand_name,
      })
    );
    navigate('/cart');
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-2xl bg-neutral-50 p-6">
          <img
            src={product.main_picture_url}
            alt={product.name}
            className="mx-auto h-full w-full object-contain"
          />
        </div>

        {product.story_html && (
          <section aria-labelledby="story-heading" className="space-y-2">
            <h2 id="story-heading" className="text-sm font-semibold uppercase tracking-wider text-navy-500">
              Story
            </h2>
            <p className="text-sm leading-relaxed text-navy-700">{product.story_html}</p>
          </section>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-navy-500">{product.brand_name}</p>
          <h1 className="mt-1 text-2xl font-bold text-navy-900">{product.name}</h1>
          <p className="mt-1 text-sm text-navy-500">{product.details}</p>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-navy-900">Select size</p>
          <div className="grid grid-cols-5 gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded-lg border py-2 text-xs font-medium transition-colors ${
                  size === s
                    ? 'border-ink bg-ink text-white'
                    : 'border-neutral-200 text-navy-700 hover:border-neutral-400'
                }`}
              >
                US {s}
              </button>
            ))}
          </div>
        </div>

        <p className="text-2xl font-bold tabular-nums text-navy-900">
          ${(product.retail_price_cents / 100).toFixed(2)}
        </p>

        <BackdOfferCard totalCents={product.retail_price_cents} />

        <button
          type="button"
          onClick={onAdd}
          disabled={!size}
          className="block w-full rounded-2xl bg-ink px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 ease-out-quart hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-300 motion-reduce:transition-none"
        >
          {size ? 'Add to Cart' : 'Select a size'}
        </button>
      </div>
    </div>
  );
}
