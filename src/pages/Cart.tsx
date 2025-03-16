import { useRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { cartState, cartItemCountSelector, cartTotalSelector } from '../recoil/cart';
import Modal from '../components/common/Modal';
import CheckoutForm from '../components/checkout/CheckoutForm';

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const cartItemCount = useRecoilValue(cartItemCountSelector);
  const cartTotal = useRecoilValue(cartTotalSelector);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // 수량 변경 처리
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // 상품 제거
  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // 장바구니 비우기
  const clearCart = () => {
    if (window.confirm('장바구니를 비우시겠습니까?')) {
      setCart([]);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[80vh] flex flex-col items-center justify-center">
        <Helmet>
          <title>장바구니 | React Shop</title>
        </Helmet>
        <ShoppingBagIcon className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-4">장바구니가 비어있습니다</h2>
        <p className="text-gray-500 mb-8">상품을 추가하고 쇼핑을 계속해보세요!</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
        >
          쇼핑 계속하기
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Helmet>
        <title>장바구니 | React Shop</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-8">장바구니</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 장바구니 상품 목록 */}
        <div className="lg:w-2/3">
          {/* 장바구니 헤더 */}
          <div className="hidden md:flex font-semibold border-b pb-3 mb-4 text-sm">
            <div className="w-2/5">상품</div>
            <div className="w-1/5 text-center">가격</div>
            <div className="w-1/5 text-center">수량</div>
            <div className="w-1/5 text-center">합계</div>
          </div>
          
          {/* 장바구니 아이템 */}
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-center py-4 border-b">
              {/* 상품 이미지 및 정보 */}
              <div className="w-full md:w-2/5 flex items-center mb-4 md:mb-0">
                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded overflow-hidden mr-4">
                  <img 
                    src={item.product.image} 
                    alt={item.product.title}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="flex-1">
                  <Link to={`/product/${item.id}`} className="font-medium text-sm line-clamp-2 hover:text-blue-600">
                    {item.product.title}
                  </Link>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 p-1 text-gray-400 hover:text-red-500 md:hidden"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              {/* 가격 */}
              <div className="w-full md:w-1/5 text-center mb-4 md:mb-0">
                <div className="md:hidden inline-block mr-2 font-semibold">가격:</div>
                ${item.product.price.toFixed(2)}
              </div>
              
              {/* 수량 */}
              <div className="w-full md:w-1/5 flex justify-center mb-4 md:mb-0">
                <div className="md:hidden inline-block mr-2 font-semibold">수량:</div>
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    className="w-12 h-8 text-center border-t border-b border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* 합계 & 삭제 버튼 */}
              <div className="w-full md:w-1/5 flex items-center justify-between md:justify-center">
                <div>
                  <div className="md:hidden inline-block mr-2 font-semibold">합계:</div>
                  <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="hidden md:block ml-4 p-1 text-gray-400 hover:text-red-500"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          
          {/* 장바구니 액션 버튼 */}
          <div className="mt-6 flex justify-between">
            <Link 
              to="/" 
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              쇼핑 계속하기
            </Link>
            <button 
              onClick={clearCart}
              className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              장바구니 비우기
            </button>
          </div>
        </div>
        
        {/* 주문 요약 */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">주문 요약</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>총 상품 수</span>
                <span>{cartItemCount}개</span>
              </div>
              <div className="flex justify-between">
                <span>상품 금액</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>배송비</span>
                <span>{cartTotal >= 50 ? '무료' : '$10.00'}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
              <div className="flex justify-between font-bold">
                <span>총계</span>
                <span>${(cartTotal >= 50 ? cartTotal : cartTotal + 10).toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {cartTotal >= 50 ? '무료 배송 적용' : `$${(50 - cartTotal).toFixed(2)}만큼 더 구매하시면 무료 배송!`}
              </p>
            </div>
            
            <button 
              className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
              onClick={() => setIsCheckoutModalOpen(true)}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>

      {/* 결제 모달 */}
      <Modal 
        isOpen={isCheckoutModalOpen} 
        onClose={() => setIsCheckoutModalOpen(false)}
        title="결제 정보" 
        size="lg"
      >
        <CheckoutForm onClose={() => setIsCheckoutModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Cart;
