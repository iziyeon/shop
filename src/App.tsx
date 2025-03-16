import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { ThemeProvider } from './contexts/ThemeContext';
import { ROUTES } from './config/constants';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import MainLayout from './layouts/MainLayout'; // 경로 확인
import './App.css';

import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Category from './pages/Category';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Helmet>
          <title>React Shop</title>
          <meta name="description" content="React와 TailwindCSS로 만든 쇼핑몰입니다." />
        </Helmet>

        <Router>
          <Header />
          <main className="min-h-screen pt-16 pb-16">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="product/:id" element={<Product />} />
                  <Route path="category/:category" element={<Category />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
