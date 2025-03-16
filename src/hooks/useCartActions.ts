import { useRecoilState } from 'recoil';
import { cartState } from '@/recoil/cart';
import { Product } from '@/types/product';

export const useCartActions = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity
  };
};
