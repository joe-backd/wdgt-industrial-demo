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
        <h1 className="text-2xl font-bold">Not found</h1>
        <p className="text-neutral-500">No product with id {id}.</p>
        <Link to="/explore" className="text-sm font-medium underline">
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
      <div className="rounded-2xl bg-neutral-50 p-6">
        <img src={product.main_picture_url} alt={product.name} className="mx-auto h-full w-full object-contain" />
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">{product.brand_name}</p>
          <h1 className="mt-1 text-2xl font-bold">{product.name}</h1>
          <p className="mt-1 text-sm text-neutral-500">{product.details}</p>
        </div>

        <p className="text-2xl font-semibold">${(product.retail_price_cents / 100).toFixed(2)}</p>

        <div>
          <p className="mb-2 text-sm font-medium">Select size</p>
          <div className="grid grid-cols-5 gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded-lg border py-2 text-xs font-medium transition ${
                  size === s
                    ? 'border-black bg-black text-white'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                US {s}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onAdd}
          disabled={!size}
          className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          {size ? 'Add to Cart' : 'Select a size'}
        </button>

        <BackdOfferCard totalCents={product.retail_price_cents} />

        {product.story_html && (
          <details className="text-sm text-neutral-700">
            <summary className="cursor-pointer font-medium text-black">Story</summary>
            <p className="mt-2 leading-relaxed">{product.story_html}</p>
          </details>
        )}
      </div>
    </div>
  );
}
