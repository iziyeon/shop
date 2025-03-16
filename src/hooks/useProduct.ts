import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getProducts } from '@/api';
import { Product } from '../types/product';
import { API_URL } from '../config/constants';

export const useProducts = (category?: string) => {
  return useQuery<Product[]>({
    queryKey: ['products', category],
    queryFn: () => getProducts(),
    select: data => category ? data.filter(p => p.category === category) : data,
    staleTime: 5 * 60 * 1000
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) throw new Error('Product ID is required');
      const { data } = await axios.get<Product>(`${API_URL}/products/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5
  });
};

export default useProduct;
