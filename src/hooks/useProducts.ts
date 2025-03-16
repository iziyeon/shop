import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../types/product';
import { API_URL } from '../config/constants';

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get(`${API_URL}/products`);
  return data;
};

// 모든 상품 또는 특정 카테고리 상품 가져오기
export const useProducts = (category?: string) => {
  return useQuery<Product[], Error>({
    queryKey: ['products', category],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5분간 캐시
    select: data => {
      if (category) {
        return data.filter(product => product.category === category);
      }
      return data;
    }
  });
};

// 단일 상품 정보 가져오기
export const useProduct = (id: number | string | undefined) => {
  return useQuery<Product, Error>({
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
    staleTime: 1000 * 60 * 5 // 5분 동안 데이터 유지
  });
};
