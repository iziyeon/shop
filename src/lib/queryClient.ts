import { QueryClient } from '@tanstack/react-query';
import { reportError } from '@/utils/errorReporting';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 300000, // 5분
      cacheTime: 600000, // 10분
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      suspense: false,
      onError: (error) => {
        reportError(error as Error);
      }
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        reportError(error as Error);
      }
    }
  }
});
