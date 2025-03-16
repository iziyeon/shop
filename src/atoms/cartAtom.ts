import { atom, selector } from 'recoil';
import type { CartItem, CartStats } from '@/types/cart';

const CART_KEY = 'shop-cart';

const getInitialCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error('Failed to load cart:', err);
    return [];
  }
};

export const cartState = atom<CartItem[]>({
  key: 'cart',
  default: getInitialCart(),
  effects: [
    ({ onSet }) => {
      onSet((newValue, _, isReset) => {
        if (typeof window === 'undefined') return;
        try {
          if (isReset) {
            localStorage.removeItem(CART_KEY);
          } else {
            localStorage.setItem(CART_KEY, JSON.stringify(newValue));
          }
        } catch (err) {
          console.error('Failed to save cart:', err);
        }
      });
    },
  ],
});

export const cartStatsSelector = selector<CartStats>({
  key: 'cartStats',
  get: ({ get }) => {
    const cart = get(cartState);
    return {
      totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      isEmpty: cart.length === 0
    };
  }
});

export const cartItemCountSelector = selector({
  key: 'cartItemCount',
  get: ({ get }) => {
    const stats = get(cartStatsSelector);
    return stats.totalItems;
  }
});

export const cartTotalSelector = selector({
  key: 'cartTotal',
  get: ({ get }) => {
    const cart = get(cartState);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 50000 ? 0 : 3000;
    const tax = Math.round(subtotal * 0.1);
    
    return {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax
    };
  }
});
