import { useSearchParams } from 'react-router-dom';
import { SEO } from '@/components/common/SEO';
import ProductList from '@/components/products/ProductList';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <>
      <SEO 
        title={`'${query}' 검색결과 | React Shop`}
        description={`'${query}'에 대한 검색 결과입니다.`}
      />
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <h2 className="text-2xl font-bold mb-8">'{query}'에 대한 검색결과</h2>
        <ProductList searchTerm={query} />
      </div>
    </>
  );
}
