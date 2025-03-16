import { useRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingBagIcon, XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { cartState, cartItemCountSelector, cartTotalSelector } from '../recoil/cart';
import Modal from '../components/common/Modal';
import CheckoutForm from '../components/checkout/CheckoutForm';

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const cartItemCount = useRecoilValue(cartItemCountSelector);
  const cartTotal = useRecoilValue(cartTotalSelector);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  
  // 선택된 상품 ID를 저장하는 상태 추가
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  
  // 수량 변경 처리
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // 체크박스 변경 처리
  const handleCheckboxChange = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  // 모든 항목 선택/해제 처리
  const handleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      // 모든 항목이 선택된 경우, 모두 해제
      setSelectedItems([]);
    } else {
      // 그렇지 않으면, 모든 항목 선택
      setSelectedItems(cart.map(item => item.id));
    }
  };

  // 선택된 항목 삭제 처리
  const removeSelectedItems = () => {
    if (selectedItems.length === 0) return;
    
    if (window.confirm(`선택한 ${selectedItems.length}개 상품을 삭제하시겠습니까?`)) {
      setCart(prevCart => prevCart.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    }
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
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{`장바구니 (${cartItemCount}) | React Shop`}</title>
      </Helmet>
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <ShoppingBagIcon className="w-6 h-6 mr-2" />
          장바구니
          <span className="text-sm text-gray-500 font-normal ml-2">({cartItemCount} 상품)</span>
        </h1>
        
        {/* 선택 삭제 버튼 */}
        {selectedItems.length > 0 && (
          <button 
            onClick={removeSelectedItems}
            className="flex items-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
          >
            <TrashIcon className="w-5 h-5 mr-1" />
            선택 삭제 ({selectedItems.length})
          </button>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 장바구니 상품 목록 */}
        <div className="lg:w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === cart.length && cart.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 accent-blue-600"
                      aria-label="모든 상품 선택"
                    />
                  </th>
                  <th className="py-3 px-4 text-left">상품</th>
                  <th className="py-3 px-4 text-center">수량</th>
                  <th className="py-3 px-4 text-right">가격</th>
                  <th className="py-3 px-4 text-center">삭제</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b dark:border-gray-700">
                    <td className="py-4 px-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                        className="w-4 h-4 accent-blue-600"
                        aria-label={`${item.product.title} 선택`}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Link to={`/product/${item.id}`} className="flex-shrink-0 mr-4">
                          <img 
                            src={item.product.image} 
                            alt={item.product.title}
                            className="w-16 h-16 object-contain"
                          />
                        </Link>
                        <Link to={`/product/${item.id}`} className="hover:text-blue-600">
                          <p className="line-clamp-2">{item.product.title}</p>
                        </Link>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border rounded-l flex items-center justify-center"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 h-8 border-t border-b text-center dark:bg-gray-700"
                        />
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border rounded-r flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t dark:border-gray-700 flex justify-between">
              <button 
                onClick={clearCart}
                className="text-red-500 hover:text-red-700"
              >
                장바구니 비우기
              </button>
              
              {cart.length > 0 && (
                <div className="text-sm text-gray-500">
                  {selectedItems.length > 0 ? 
                    `${selectedItems.length}개 상품 선택됨` : 
                    '선택할 상품을 체크하세요'}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 결제 정보 */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">주문 요약</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>상품 금액</span>
                <span>${cartTotal.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>배송비</span>
                <span>
                  {cartTotal.shipping === 0 ? '무료' : `$${cartTotal.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>세금</span>
                <span>${cartTotal.tax.toFixed(2)}</span>
              </div>
              <div className="border-t dark:border-gray-700 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>총 금액</span>
                  <span>${cartTotal.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors"
            >
              결제하기
            </button>
            
            <div className="mt-4 text-center">
              <Link to="/" className="text-blue-600 hover:text-blue-800">쇼핑 계속하기</Link>
            </div>
          </div>
        </div>
      </div>
      
      <Modal 
        isOpen={isCheckoutModalOpen} 
        onClose={() => setIsCheckoutModalOpen(false)}
        title="결제 정보 입력"
      >
        <CheckoutForm 
          onComplete={() => {
            setCart([]);
            setIsCheckoutModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Cart;
