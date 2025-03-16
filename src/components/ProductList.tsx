import { useProducts } from '@/hooks/useProducts';
import ProductCard from './ProductCard';
import LoadingSpinner from './common/LoadingSpinner';
import { Product } from '@/types';

interface ProductListProps {
  category?: string;
  limit?: number;
  products?: Product[]; // 외부에서 상품 목록을 직접 전달 가능하게 함
  isLoading?: boolean;   // 로딩 상태를 외부에서 관리 가능하게 함
}

const ProductList = ({ 
  category = '', 
  limit,
  products: externalProducts,
  isLoading: externalLoading
}: ProductListProps) => {
  // 외부에서 products와 isLoading을 받지 않은 경우에만 훅 사용
  const { data: internalProducts, isLoading: internalLoading, error } = 
    !externalProducts ? useProducts(category) : { data: undefined, isLoading: false, error: null };
  
  // 외부/내부 데이터 소스 통합
  const products = externalProducts || internalProducts;
  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

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
