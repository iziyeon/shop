import { useParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import CartView from "@/components/carts/CartView";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProducts(id);

  if (isLoading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error.message}</div>;
  if (!product || Array.isArray(product)) return null;

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-10">
        <div className="flex flex-col md:flex-row gap-10">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full md:w-1/3 object-contain"
            loading="lazy"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="mt-4">{product.description}</p>
            <p className="text-xl font-semibold mt-4">
              ${product.price.toFixed(2)}
            </p>
            <CartView product={product} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ProductDetail;
