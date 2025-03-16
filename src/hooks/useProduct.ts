import { useQuery } from '@tanstack/react-query';
import { getProduct, getProducts } from '@/api';
import type { Product } from '@/types/product';

export const useProducts = (category?: string) => {
  return useQuery<Product[]>({
    queryKey: ['products', category],
    queryFn: () => getProducts(),
    select: data => category ? data.filter(p => p.category === category) : data,
    staleTime: 5 * 60 * 1000
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product | null>({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  });
};
