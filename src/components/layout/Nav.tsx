import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import CartView from "@/components/carts/CartView";
import { useTheme } from '@/hooks/useTheme';

import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  useScrollToTop();
  
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    console.log("Current theme:", theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <nav className="navbar sticky top-0 z-10 bg-base-100 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">React Shop</Link>
          <div className="flex items-center gap-4">
            <ul className="hidden md:flex items-center gap-4">
              <li><Link to="/category/fashion" className="hover:text-primary">패션</Link></li>
              <li><Link to="/category/accessories" className="hover:text-primary">액세서리</Link></li>
              <li><Link to="/category/digital" className="hover:text-primary">디지털</Link></li>
            </ul>
            <CartView />
            <button 
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle"
            >
              {theme === 'dark' ? '🌙' : '☀️'}  
            </button>
          </div>
        </div>
      </nav>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;