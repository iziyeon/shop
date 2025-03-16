import { useNavigate } from 'react-router-dom';
import LazyImage from './common/LazyImage'; // 경로 수정
import Rating from './common/Rating';

import { Product } from '../hooks/useProducts';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  // 제품 제목 길이 제한
  const truncateTitle = (title: string, maxLength: number = 40) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  return (
    <div 
      className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <figure className="h-48 p-4 bg-base-200 dark:bg-base-300">
        <LazyImage
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-sm">{truncateTitle(product.title)}</h3>
        <p className="text-lg font-bold mt-1">${product.price.toFixed(2)}</p>
        <div className="mt-1">
          <Rating 
            value={product.rating.rate} 
            count={product.rating.count}
            size="sm" 
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
