import { memo } from 'react';
import { useQuery } from 'react-query';
import { getProducts } from '@/api/products';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';

interface Props {
  category?: string;
  limit?: number;
}

const ProductList = memo(({ category, limit }: Props) => {
  const { data: products = [], isLoading, error } = useQuery(
    ['products', category],
    () => getProducts(),
    {
      staleTime: 300000, // 5분 캐시
      select: (data) => {
        let filtered = category 
          ? data.filter(p => p.category === category)
          : data;
        return limit ? filtered.slice(0, limit) : filtered;
      }
    }
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});

ProductList.displayName = 'ProductList';

export default ProductList;
