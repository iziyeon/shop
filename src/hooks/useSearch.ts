import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../config/constants';
import { Product } from './useProducts';

export const useSearch = (searchTerm: string) => {
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 모든 제품을 가져옵니다
  const { data: allProducts, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const { data } = await axios.get<Product[]>(`${API_URL}/products`);
        return data;
      } catch (error) {
        console.error('Failed to fetch products for search:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
  });

  // 검색어에 따른 필터링된 결과를 계산합니다
  useEffect(() => {
    if (!searchTerm.trim() || !allProducts) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    const filtered = allProducts.filter(product => 
      product.title.toLowerCase().includes(normalizedSearchTerm) || 
      product.description.toLowerCase().includes(normalizedSearchTerm) ||
      product.category.toLowerCase().includes(normalizedSearchTerm)
    );
    
    setResults(filtered);
    setIsSearching(false);
  }, [searchTerm, allProducts]);

  return {
    results,
    isLoading: isLoading || isSearching,
    hasResults: results.length > 0,
  };
};
