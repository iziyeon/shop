import type { CartItem } from '@/types/cart';

export const calculateCartTotal = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 3000;
  const tax = Math.round(subtotal * 0.1);
  
  return {
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax
  };
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(price);
};
