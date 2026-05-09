import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCount } from '../store/cartSlice';

const linkBase = 'px-3 py-2 text-sm font-medium tracking-wide';
const linkActive = 'text-black';
const linkIdle = 'text-neutral-500 hover:text-black';

export default function Navbar() {
  const count = useSelector(selectCount);
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold tracking-tight">
          SNKR <span className="text-neutral-400">hub</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
            Home
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
            Explore
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
            Cart{count > 0 ? ` (${count})` : ''}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
