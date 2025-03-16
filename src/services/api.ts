import { api } from './axios';
import type { Product } from '@/types/product';

// 개별 상품 조회
export const fetchProduct = async (id: string | number): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

// 모든/카테고리별 상품 조회 
export const fetchProducts = async (category?: string): Promise<Product[]> => {
  const url = category ? `/products/category/${category}` : '/products';
  const { data } = await api.get(url);
  return data;
};
