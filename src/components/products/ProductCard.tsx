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
        <div data-theme="light" className="absolute inset-0 flex items-center justify-center p-4 bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-full object-contain"
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