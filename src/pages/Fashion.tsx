import ProductList from '@/components/ProductList';
import { Helmet } from 'react-helmet-async';

export default function Fashion() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>패션 - React Shop</title>
        <meta name="description" content="React Shop의 패션 상품 목록입니다." />
      </Helmet>

      <h1 className="text-2xl font-bold mb-8">패션</h1>
      <ProductList category="fashion" />
    </div>
  );
}
