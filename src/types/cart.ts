import { Product } from './product';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface CartStats {
  totalItems: number;
  totalAmount: number;
  isEmpty: boolean;
}

export interface CartTotal {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface CartViewProps {
  product?: Product;
}

export interface CartListProps {
  cart?: CartItem[];
}
