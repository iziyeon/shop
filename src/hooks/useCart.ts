import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, cartTotalSelector } from '@/atoms/cartAtom';
import type { Product } from '@/types/product';
import { useMessage } from './useMessage';

import type { CartItem } from '@/types/cart';

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const totals = useRecoilValue(cartTotalSelector);
  const { success } = useMessage();

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart(current => {
      const existingItem = current.find(item => item.id === product.id);
      if (existingItem) {
        return current.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { ...product, quantity }];
    });
    success('장바구니에 추가되었습니다');
  }, [setCart, success]);

  const removeFromCart = (productId: number) => {
    setCart(current => current.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(current =>
      current.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return {
    cart,
    totals,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart: () => setCart([])
  };
};
