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
          className="card hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-indigo-500/10 transition-all duration-300"
        >
          <figure className="px-4 pt-4">
            <div className="bg-white dark:bg-gray-700 rounded-xl w-full h-[240px] flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </figure>
          <div className="card-body p-4">
            <h2 className="card-title text-base line-clamp-2 h-12 dark:text-gray-100">
              {product.title}
            </h2>
            <div className="flex justify-between items-center mt-2">
              <div className="badge badge-outline">{product.category}</div>
              <p className="text-lg font-bold dark:text-gray-200">${product.price.toFixed(2)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
