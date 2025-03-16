import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.tsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const fallbackRender = ({ error }: { error: Error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-red-600 mb-4">오류가 발생했습니다</h2>
      <p className="text-gray-700 mb-4">{error.message}</p>
      <button
        onClick={() => window.location.href = '/'}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallbackRender={fallbackRender}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <App />
            <ToastContainer position="bottom-right" autoClose={3000} />
            <ReactQueryDevtools initialIsOpen={false} />
          </HelmetProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </ErrorBoundary>
  </React.StrictMode>
);
