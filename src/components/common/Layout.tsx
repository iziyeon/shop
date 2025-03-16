import { Link, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="drawer">
      <input id="drawer-left" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
      <div className="drawer-side z-50">
        <label htmlFor="drawer-left" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li><Link to="/category/fashion">패션</Link></li>
          <li><Link to="/category/accessories">액세서리</Link></li>
          <li><Link to="/category/digital">디지털</Link></li>
        </ul>
      </div>
    </div>
  );
}
