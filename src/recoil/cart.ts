import { atom, selector } from 'recoil';
import { CartItem, CartStats, CartTotal } from '../types';

// 장바구니 상태 atom
export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});

// 장바구니 아이템 개수 selector
export const cartItemCountSelector = selector<number>({
  key: 'cartItemCount',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});

// 장바구니 통계 selector
export const cartStatsSelector = selector<CartStats>({
  key: 'cartStats',
  get: ({ get }) => {
    const cart = get(cartState);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = cart.reduce(
      (total, item) => total + item.product.price * item.quantity, 
      0
    );
    
    return {
      totalItems,
      totalAmount,
      isEmpty: cart.length === 0
    };
  },
});

// 장바구니 합계 정보 selector
export const cartTotalSelector = selector<CartTotal>({
  key: 'cartTotal',
  get: ({ get }) => {
    const cart = get(cartState);
    
    const subtotal = cart.reduce(
      (total, item) => total + item.product.price * item.quantity, 
      0
    );
    
    // 배송비 계산 (30달러 이상 무료, 그 외 5달러)
    const shipping = subtotal >= 30 ? 0 : 5;
    
    // 세금 계산 (총액의 10%)
    const tax = subtotal * 0.1;
    
    return {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax
    };
  },
});
