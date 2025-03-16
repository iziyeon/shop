import ProductList from '@/components/ProductList';
import { Helmet } from 'react-helmet-async';

export default function Digital() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>디지털 - React Shop</title>
        <meta name="description" content="React Shop의 디지털 상품 목록입니다." />
      </Helmet>

      <h1 className="text-2xl font-bold mb-8">디지털</h1>
      <ProductList category="digital" />  {/* "electronics" -> "digital" 로 변경 */}
    </div>
  );
}
