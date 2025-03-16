import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import ProductsList from "@/components/products/ProductsList";
import Slider from "@/components/common/Slider";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const Home = () => {
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useProducts();

  if (error) {
    return <div className="text-center text-red-500 my-10">{error.message}</div>;
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-10">
        <Slider />
        <div className="flex justify-center mt-6 space-x-4">
          <button 
            onClick={() => navigate("/category/men's clothing")} 
            className="btn btn-primary"
          >
            남성 의류
          </button>
          <button 
            onClick={() => navigate("/category/women's clothing")} 
            className="btn btn-primary"
          >
            여성 의류
          </button>
        </div>
        <ProductsList products={products || []} isLoading={isLoading} />
      </div>
    </ErrorBoundary>
  );
};

export default Home;
