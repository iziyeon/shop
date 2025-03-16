import { Suspense, lazy } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { ThemeProvider } from './contexts/ThemeContext'; // 상대 경로로 변경
import { ROUTES } from './config/constants';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import './App.css';

// 지연 로딩을 사용한 페이지 임포트
const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product'));
const Category = lazy(() => import('./pages/Category'));
const Cart = lazy(() => import('./pages/Cart'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <ErrorBoundary>
          <Helmet>
            <title>React Shop</title>
            <meta name="description" content="React와 TailwindCSS로 만든 쇼핑몰입니다." />
          </Helmet>

          <BrowserRouter>
            <Header />
            <main className="min-h-screen pt-16 pb-16">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path={ROUTES.HOME} element={<Home />} />
                  <Route path={ROUTES.PRODUCT} element={<Product />} />
                  <Route path={ROUTES.CATEGORY} element={<Category />} />
                  <Route path={ROUTES.CART} element={<Cart />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
