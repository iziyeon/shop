import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { CATEGORY } from '../config/constants';
import Slider from '../components/common/Slider';
import ProductList from '../components/ProductList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard'; // 추가: ProductCard 컴포넌트 가져오기

const Home = () => {
  const { data: electronicsProducts, isLoading: loadingElectronics } = useProducts(CATEGORY.ELECTRONICS);
  const { data: jewelryProducts, isLoading: loadingJewelry } = useProducts(CATEGORY.JEWELRY);
  const { data: menClothingProducts, isLoading: loadingMenClothing } = useProducts(CATEGORY.MEN_CLOTHING);
  const { data: womenClothingProducts, isLoading: loadingWomenClothing } = useProducts(CATEGORY.WOMEN_CLOTHING);

  const isLoading = loadingElectronics || loadingJewelry || loadingMenClothing || loadingWomenClothing;

  const renderProductSection = (title: string, category: string, products: any[]) => {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
            <Link 
              to={`/category/${category}`} 
              className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
            >
              더 보기 &rarr;
            </Link>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products?.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <>
      <Helmet>
        <title>React Shop | 홈</title>
      </Helmet>

      {/* 슬라이더 섹션 */}
      <section className="mb-8">
        <Slider />
      </section>

      {/* 전자제품 섹션 */}
      {renderProductSection("전자제품", CATEGORY.ELECTRONICS, electronicsProducts || [])}

      {/* 쥬얼리 섹션 */}
      {renderProductSection("쥬얼리", CATEGORY.JEWELRY, jewelryProducts || [])}

      {/* 남성 의류 섹션 */}
      {renderProductSection("남성 의류", CATEGORY.MEN_CLOTHING, menClothingProducts || [])}

      {/* 여성 의류 섹션 */}
      {renderProductSection("여성 의류", CATEGORY.WOMEN_CLOTHING, womenClothingProducts || [])}
    </>
  );
};

export default Home;
