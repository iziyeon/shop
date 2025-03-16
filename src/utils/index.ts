import { formatPrice, formatDate } from './formatters';
import { storage } from './storage';
import * as validators from './validation';
import * as arrays from './arrays';
import * as performance from './performance';

export const utils = {
  format: { price: formatPrice, date: formatDate },
  storage,
  validators,
  arrays,
  performance,
  
  // 공통 유틸리티
  createId: () => `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  isServer: typeof window === 'undefined',
  isDev: process.env.NODE_ENV === 'development',
  
  // 타입 가드
  isError: (error: unknown): error is Error => error instanceof Error
};

export * from './arrays';
export * from './formatters';
export * from './validation';
export * from './performance';
