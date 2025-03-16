import { Link } from 'react-router-dom';
import { CATEGORY } from '../config/constants';
import ProductList from './ProductList';

interface FeaturedProductsProps {
  category: string;
  title?: string;
  limit?: number;
}

const getCategoryKey = (categoryName: string): string => {
  // 카테고리 이름에 해당하는 CATEGORY 객체의 키 값을 반환
  const entry = Object.entries(CATEGORY).find(([_, value]) => 
    value.toLowerCase() === categoryName.toLowerCase()
  );
  return entry ? entry[0].toLowerCase() : categoryName;
};

const FeaturedProducts = ({ category, title, limit = 4 }: FeaturedProductsProps) => {
  const categoryKey = getCategoryKey(category);
  
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title || CATEGORY[categoryKey]}</h2>
        <Link 
          to={`/category/${category}`}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          더 보기 &rarr;
        </Link>
      </div>
      <ProductList category={category} limit={limit} />
    </section>
  );
};

export default FeaturedProducts;
