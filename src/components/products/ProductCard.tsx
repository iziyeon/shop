import { Link } from 'react-router-dom';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="card bg-base-100 hover:shadow-xl transition-shadow"
    >
      <figure className="relative w-full pt-[100%]">
        <div className="absolute inset-0 bg-white dark:bg-white"> {/* 다크모드에서도 흰색 배경 유지 */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4"
          />
        </div>
      </figure>
      <div className="card-body px-6 pt-4 pb-6 bg-base-100">
        <h2 className="card-title text-base line-clamp-2 h-12">
          {product.title}
        </h2>
        <div className="flex justify-between items-center mt-2">
          <div className="badge badge-outline">{product.category}</div>
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
