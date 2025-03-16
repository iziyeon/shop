import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import Slider from "../components/common/Slider";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
  // const navigate = useNavigate(); // Removed unused variable

  return (
    <ErrorBoundary>
      <Helmet>
        <title>React Shop</title>
        <meta name="description" content="React와 TailwindCSS로 만든 쇼핑몰입니다." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 슬라이더 */}
        <Slider />
        
        {/* 카테고리별 상품 섹션 */}
        <div className="mt-12 space-y-16">
          <FeaturedProducts category="electronics" title="인기 전자제품" limit={4} />
          <FeaturedProducts category="jewelery" title="최신 주얼리" limit={4} />
          <FeaturedProducts category="men's clothing" title="남성 의류" limit={4} />
          <FeaturedProducts category="women's clothing" title="여성 의류" limit={4} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Home;
