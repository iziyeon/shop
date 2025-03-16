import { Link } from 'react-router-dom';
import ProductList from './ProductList';
import { CATEGORY_TITLE } from '../config/constants';

interface FeaturedProductsProps {
  category: string;
  title?: string;
  limit?: number;
}

const FeaturedProducts = ({ category, title, limit = 4 }: FeaturedProductsProps) => {
  const categoryTitle = title || CATEGORY_TITLE[category] || category;
  
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{categoryTitle}</h2>
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
