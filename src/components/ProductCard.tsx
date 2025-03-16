import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import LazyImage from './common/LazyImage';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* 상품 이미지 */}
        <div className="h-48 p-4 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <LazyImage
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>
        
        {/* 상품 정보 */}
        <div className="p-4">
          {/* 상품명 */}
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-2 h-10">
            {product.title}
          </h3>
          
          {/* 가격 */}
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
          
          {/* 별점 */}
          <div className="flex items-center mt-1">
            <div className="flex text-yellow-400">
              {[...Array(Math.round(product.rating.rate))].map((_, index) => (
                <span key={index}>★</span>
              ))}
              {[...Array(5 - Math.round(product.rating.rate))].map((_, index) => (
                <span key={index} className="text-gray-300 dark:text-gray-600">★</span>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.rating.count})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
