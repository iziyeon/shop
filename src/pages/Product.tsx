import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

import { useProduct } from '../hooks/useProducts';
import { cartState } from '../recoil/cart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Rating from '../components/common/Rating';
import Breadcrumbs from '../components/common/Breadcrumbs';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useRecoilState(cartState);
  
  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="text-red-500">상품을 불러오는데 문제가 발생했습니다.</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate('/')}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }
  
  if (!product) return null;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };

  const addToCart = () => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // 이미 장바구니에 있는 경우 수량만 증가
      const newCart = [...cart];
      newCart[existingItemIndex] = {
        ...newCart[existingItemIndex],
        quantity: newCart[existingItemIndex].quantity + quantity
      };
      setCart(newCart);
    } else {
      // 장바구니에 새로 추가
      setCart([...cart, { id: product.id, product, quantity }]);
    }
    
    toast.success('장바구니에 상품이 추가되었습니다!');
  };

  return (
    <>
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-10">
        <Helmet>
          <title>{product.title} | React Shop</title>
        </Helmet>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* 제품 이미지 - 배경색을 항상 흰색으로 설정 */}
          <div className="md:w-1/2 h-96 bg-white rounded-lg overflow-hidden shadow-sm">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-contain p-8" 
            />
          </div>
          
          {/* 제품 정보 */}
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            
            <div className="mb-4">
              <Rating 
                value={product.rating.rate}
                count={product.rating.count}
                size="lg"
              />
            </div>
            
            <p className="text-3xl font-bold text-primary mb-6">
              ${product.price.toFixed(2)}
            </p>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {product.description}
            </p>
            
            <div className="flex items-center mb-6">
              <label htmlFor="quantity" className="mr-4">수량:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 p-1 border rounded text-center dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={addToCart}
                className="btn btn-primary"
              >
                장바구니에 추가
              </button>
              
              <button
                onClick={() => navigate('/cart')}
                className="btn btn-outline"
              >
                장바구니로 이동
              </button>
            </div>
            
            <div className="mt-8">
              <h3 className="font-semibold mb-2">카테고리:</h3>
              <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
