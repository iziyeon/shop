import { useState, useCallback } from 'react';
import { AsyncState } from '@/types';

export function useAsync<T = unknown>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: false
  });

  const run = useCallback(async (promise: Promise<T>) => {
    try {
      setState({ data: null, error: null, isLoading: true });
      const data = await promise;
      setState({ data, error: null, isLoading: false });
      return data;
    } catch (error) {
      setState({ data: null, error: error as Error, isLoading: false });
      throw error;
    }
  }, []);

  return { ...state, run };
}
