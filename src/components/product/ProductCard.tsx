import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { formatPrice } from '@/utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
  const { id, title, price, image } = product;

  return (
    <Link to={`/product/${id}`} className="card hover:shadow-lg transition-shadow">
      <div className="p-4 flex flex-col h-full">
        <div className="relative pb-[100%] mb-4">
          <img 
            src={image} 
            alt={title}
            className="absolute inset-0 w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="flex-grow">
          <h3 className="font-medium text-sm mb-2 line-clamp-2">{title}</h3>
          <p className="text-primary font-bold">{formatPrice(price)}</p>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';
