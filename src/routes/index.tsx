import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import Loading from '@/components/common/Loading';
import Home from '@/pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        )
      }
    ]
  }
]);
