import type { Product } from './product';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartStats {
  totalItems: number;
  totalAmount: number;
  isEmpty: boolean;
}

export interface CartViewProps {
  product?: Product;
}

export interface CartListProps {
  cart?: CartItem[];
}
