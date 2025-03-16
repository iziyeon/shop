import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import LoadingSpinner from './common/LoadingSpinner';

interface ProductListProps {
  category?: string;
  limit?: number;
}

const ProductList = ({ category = '', limit }: ProductListProps) => {
  const { data: products, isLoading, error } = useProducts(category);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500">상품을 불러오는데 문제가 발생했습니다.</p>;
  }

  if (!products || products.length === 0) {
    return <p>상품이 없습니다.</p>;
  }

  // 필요한 경우 상품 개수 제한
  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
