import { Link } from 'react-router-dom';
import products from '../data/products.json';

export default function Home() {
  const featured = products.slice(0, 6);
  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-black px-8 py-16 text-white">
        <p className="text-sm uppercase tracking-widest text-neutral-400">SNKR hub</p>
        <h1 className="mt-2 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
          Pay in 4. Wear them today.
        </h1>
        <p className="mt-4 max-w-xl text-neutral-300">
          A demo storefront for testing the BackdPayments BNPL widget. Pick a pair, head to checkout,
          and split it into four with no interest.
        </p>
        <Link
          to="/explore"
          className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
        >
          Explore drops →
        </Link>
      </section>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Just Dropped</h2>
          <Link to="/explore" className="text-sm text-neutral-500 hover:text-black">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.id}
              to={`/preview/${p.id}`}
              className="group rounded-2xl border border-neutral-200 bg-white p-4 transition hover:shadow-md"
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
                <p className="text-xs uppercase tracking-wider text-neutral-500">{p.brand_name}</p>
                <p className="mt-1 line-clamp-2 text-sm font-medium">{p.name}</p>
                <p className="mt-2 text-sm font-semibold">${(p.retail_price_cents / 100).toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
