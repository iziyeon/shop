import axios from 'axios';
import type { Product } from '@/types/product';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000
});

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await api.get('/products');
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
};
