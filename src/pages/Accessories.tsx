import ProductList from '@/components/ProductList';
import { Helmet } from 'react-helmet-async';

export default function Accessories() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>액세서리 - React Shop</title>
      </Helmet>

      <h1 className="text-2xl font-bold mb-8">액세서리</h1>
      <ProductList category="accessories" />
    </div>
  );
}
