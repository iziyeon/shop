import { useParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import ProductsList from "@/components/products/ProductsList";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const { data: products, isLoading, error } = useProducts(category);

  if (error) {
    return <div className="text-center text-red-500 my-10">{error.message}</div>;
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-10">
        <h1 className="text-3xl font-bold mb-6 capitalize">{category}</h1>
        <ProductsList 
          products={Array.isArray(products) ? products : []} 
          isLoading={isLoading} 
        />
      </div>
    </ErrorBoundary>
  );
};

export default Category;
