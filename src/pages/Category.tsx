import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { CATEGORY_TITLE } from '../config/constants';
import CategoryBanner from '../components/CategoryBanner';
import ProductList from '../components/ProductList';

const Category = () => {
  const { category = '' } = useParams<{ category: string }>();
  const categoryTitle = CATEGORY_TITLE[category] || '전체 상품';

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{categoryTitle} | React Shop</title>
        <meta name="description" content={`${categoryTitle} 제품 목록 - React Shop`} />
      </Helmet>
      
      <CategoryBanner category={category} />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{categoryTitle}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          다양한 {categoryTitle}을 둘러보세요.
        </p>
      </div>
      
      <ProductList category={category} />
    </div>
  );
};

export default Category;
