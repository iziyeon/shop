import type { Product } from './product';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartOperation {
  type: 'ADD' | 'REMOVE' | 'UPDATE';
  productId: number;
  quantity?: number;
}

export interface CartViewProps {
  product?: Product;
}
