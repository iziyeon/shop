import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export const useQueryString = <T extends Record<string, string>>(
  defaultValues: T
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParams = useCallback(() => {
    const params: Partial<T> = {};
    for (const key of Object.keys(defaultValues)) {
      const value = searchParams.get(key);
      if (value) {
        params[key as keyof T] = value as T[keyof T];
      }
    }
    return { ...defaultValues, ...params };
  }, [searchParams, defaultValues]);

  const setQueryParams = useCallback((updates: Partial<T>) => {
    const current = getQueryParams();
    const newParams = { ...current, ...updates };
    setSearchParams(newParams as unknown as URLSearchParams);
  }, [getQueryParams, setSearchParams]);

  return { params: getQueryParams(), setQueryParams };
};
