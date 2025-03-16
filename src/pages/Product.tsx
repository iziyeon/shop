import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Helmet } from 'react-helmet-async';

import { cartState } from '../recoil/cart';
import { useProduct } from '../hooks/useProducts'; // 올바른 경로로 수정
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Product as ProductType } from '../types';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useRecoilState(cartState);
  
  const { data: product, isLoading, error } = useProduct(id);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
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
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{product.title} | React Shop</title>
        <meta name="description" content={product.description.substring(0, 160)} />
      </Helmet>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* 상품 이미지 */}
        <div className="md:w-1/2">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-auto object-contain max-h-[500px]" 
          />
        </div>
        
        {/* 상품 정보 */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-4">{product.category}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{product.rating.rate} ({product.rating.count} 리뷰)</span>
          </div>
          <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4">수량:</label>
            <input 
              type="number" 
              id="quantity" 
              min="1" 
              value={quantity} 
              onChange={handleQuantityChange} 
              className="w-16 p-2 border rounded text-center dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          
          <button 
            onClick={addToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition"
          >
            장바구니에 담기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
