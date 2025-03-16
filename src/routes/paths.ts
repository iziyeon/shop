export const ROUTES = {
  HOME: '/',
  CATEGORY: '/category/:category',
  PRODUCT: '/product/:id',
  CART: '/cart'
} as const;

export const createCategoryPath = (category: string) => `/category/${category}`;
export const createProductPath = (id: number | string) => `/product/${id}`;
