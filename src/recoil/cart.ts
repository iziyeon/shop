import { atom, selector } from 'recoil';

import { Product } from '../hooks/useProducts';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

// 로컬 스토리지에서 장바구니 데이터 로드
const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
      return [];
    }
  }
  return [];
};

// 장바구니 상태 atom
export const cartState = atom<CartItem[]>({
  key: 'cart',
  default: loadCartFromLocalStorage(),
  effects: [
    ({ onSet }) => {
      onSet((newCart) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(newCart));
        }
      });
    },
  ],
});

// 장바구니 총 아이템 수 selector
export const cartItemCountSelector = selector({
  key: 'cartItemCount',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },
});

// 장바구니 총 금액 selector
export const cartTotalSelector = selector({
  key: 'cartTotal',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  },
});
