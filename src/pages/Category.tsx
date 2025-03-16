import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import ProductList from '../components/ProductList';
import { CATEGORY_TITLE } from '../config/constants';

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const categoryName = category || '';
  const categoryTitle = CATEGORY_TITLE[categoryName] || categoryName;

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>{categoryTitle} | React Shop</title>
        </Helmet>
        
        <h1 className="text-3xl font-bold mb-8">{categoryTitle}</h1>
        
        {/* 중복 코드 없이 재사용 컴포넌트 사용 */}
        <ProductList category={categoryName} />
      </div>
    </ErrorBoundary>
  );
};

export default Category;
