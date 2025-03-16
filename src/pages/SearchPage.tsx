import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { useSearch } from '../hooks/useSearch';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/common/EmptyState';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { results, isLoading, hasResults } = useSearch(query);

  return (
    <div className="container mx-auto px-4 py-10">
      <Helmet>
        <title>{`"${query}" 검색 결과 | React Shop`}</title>
      </Helmet>

      <h1 className="text-2xl font-bold mb-2">검색 결과</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        "{query}"에 대한 {results.length}개의 결과
      </p>

      {isLoading ? (
        <LoadingSpinner />
      ) : hasResults ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="검색 결과가 없습니다"
          message="다른 검색어로 시도해보세요."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
      )}
    </div>
  );
};

export default SearchPage;
