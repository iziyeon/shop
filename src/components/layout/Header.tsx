import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cartItemCountSelector } from '@/atoms/cartAtom';
import { useTheme } from '@/hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const cartItemCount = useRecoilValue(cartItemCountSelector);

  return (
    <div className="navbar bg-base-100 fixed top-0 z-50 shadow-lg">
      <div className="container mx-auto">
        <div className="navbar-start">
          <label htmlFor="drawer-menu" className="btn btn-ghost lg:hidden drawer-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <Link to="/" className="btn btn-ghost text-xl normal-case">React Shop</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/category/fashion">패션</Link></li>
            <li><Link to="/category/accessories">액세서리</Link></li>
            <li><Link to="/category/digital">디지털</Link></li>
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <Link to="/cart" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && <span className="badge badge-sm indicator-item">{cartItemCount}</span>}
            </div>
          </Link>
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </div>
  );
}
