import { useProducts } from '@/hooks/useProducts';
import ProductGrid from './ProductGrid';
import Loading from '../common/Loading';

interface FeaturedProductsProps {
  category: string;
  limit?: number;
}

export default function FeaturedProducts({ category, limit = 4 }: FeaturedProductsProps) {
  const { data: products, isLoading, error } = useProducts(category);

  if (isLoading) return <Loading />;
  if (error) return null;

  const filteredProducts = Array.isArray(products) 
    ? products.slice(0, limit)
    : [];

  return <ProductGrid products={filteredProducts} />;
}
