import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { API_URL } from '../config/constants';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const useProducts = (category: string = '') => {
  return useQuery<Product[]>({
    queryKey: ['products', category],
    queryFn: async () => {
      try {
        const endpoint = category ? `${API_URL}/products/category/${category}` : `${API_URL}/products`;
        const { data } = await axios.get<Product[]>(endpoint);
        return data;
      } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) throw new Error('Product ID is required');
      
      try {
        const { data } = await axios.get<Product>(`${API_URL}/products/${id}`);
        return data;
      } catch (error) {
        console.error(`Failed to fetch product with ID ${id}:`, error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
  });
};
