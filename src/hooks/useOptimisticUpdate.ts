import { useState, useCallback } from 'react';

interface OptimisticUpdateOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  rollbackOnError?: boolean;
}

export const useOptimisticUpdate = <T>(options: OptimisticUpdateOptions<T> = {}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = useCallback(async (
    updateFn: () => Promise<T>,
    optimisticData: T
  ) => {
    const { onSuccess, onError, rollbackOnError = true } = options;
    setIsUpdating(true);
    setError(null);

    try {
      const result = await updateFn();
      onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Update failed');
      setError(error);
      onError?.(error);
      if (rollbackOnError) {
        return optimisticData;
      }
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, [options]);

  return { update, isUpdating, error };
};
