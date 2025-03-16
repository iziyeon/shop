// 기본 타입 선언
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

// 추가적인 타입 선언 통합
// Custom type declaration for 'daisyui'
declare module 'daisyui' {
  const daisyui: any;
  export default daisyui;
}

declare module 'daisyui';
declare module '@tailwindcss/forms';

export * from './route';
export * from './cart';
export * from './product';
export * from './api';

// 기본 인터페이스
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface AsyncState {
  isLoading: boolean;
  error: Error | null;
  data: unknown;
}

// API 관련 타입
export interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// 비즈니스 로직 인터페이스
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

// 장바구니 통계 타입 정의
export interface CartStats {
  totalItems: number;
  totalAmount: number;
  isEmpty: boolean;
}

// 장바구니 합계 타입 정의
export interface CartTotal {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}
