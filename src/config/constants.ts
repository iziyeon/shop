export const API_URL = import.meta.env.VITE_API_URL || 'https://fakestoreapi.com';

export const APP_CONFIG = {
  name: 'React Shop',
  description: 'React와 TailwindCSS로 만든 쇼핑몰입니다.',
  api: {
    baseUrl: import.meta.env.VITE_API_URL,
    timeout: 5000
  },
  pagination: {
    itemsPerPage: 12
  },
  theme: {
    storageKey: 'theme',
    default: 'light' as const
  },
  cart: {
    storageKey: 'cart'
  }
} as const;

// 카테고리 상수
export const CATEGORY = {
  ELECTRONICS: 'electronics',
  JEWELRY: 'jewelery',
  MEN_CLOTHING: "men's clothing", 
  WOMEN_CLOTHING: "women's clothing"
};

// 카테고리 제목 매핑
export const CATEGORY_TITLE = {
  'electronics': '전자제품',
  'jewelery': '주얼리',
  "men's clothing": '남성 의류',
  "women's clothing": '여성 의류',
  '': '전체 상품'
};

export const ROUTES = {
  HOME: '/',
  PRODUCT: '/product/:id',
  CATEGORY: '/category/:category',
  CART: '/cart',
  SEARCH: '/search',
};
