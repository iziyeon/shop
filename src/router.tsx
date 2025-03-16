import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import Home from '@/pages/Home';
import Category from '@/pages/Category';
import Product from '@/pages/Product';
import Cart from '@/pages/Cart';
import NotFound from '@/pages/NotFound';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Search from '@/pages/Search';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { 
        index: true, 
        element: <Home />
      },
      { path: 'category/:category', element: <Category /> },
      { path: 'product/:id', element: <Product /> },
      { path: 'cart', element: <Cart /> },
      { path: 'search', element: <Search /> },
      { path: '*', element: <NotFound /> }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

export default router;
