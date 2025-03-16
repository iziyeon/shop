import { Link } from 'react-router-dom';
import type { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="card card-compact bg-base-100 transition-shadow hover:shadow-xl"
        >
          <figure className="relative w-full pt-[100%]">
            <img
              src={product.image}
              alt={product.title}
              className="absolute top-0 left-0 w-full h-full object-contain p-4"
            />
          </figure>
          <div className="card-body p-4">
            <h2 className="card-title text-sm line-clamp-1">{product.title}</h2>
            <div className="flex justify-between items-center mt-2">
              <div className="badge badge-outline">{product.category}</div>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
