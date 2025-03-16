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

export const CATEGORY = {
  ALL: '',
  ELECTRONICS: 'electronics',
  JEWELRY: 'jewelery',
  MEN_CLOTHING: "men's clothing",
  WOMEN_CLOTHING: "women's clothing",
};

export const ROUTES = {
  HOME: '/',
  PRODUCT: '/product/:id',
  CATEGORY: '/category/:category',
  CART: '/cart',
  SEARCH: '/search',
};

export const CATEGORY_TITLE: { [key: string]: string } = {
  [CATEGORY.ALL]: '전체 상품',
  [CATEGORY.ELECTRONICS]: '전자제품',
  [CATEGORY.JEWELRY]: '쥬얼리',
  [CATEGORY.MEN_CLOTHING]: '남성의류',
  [CATEGORY.WOMEN_CLOTHING]: '여성의류',
};
