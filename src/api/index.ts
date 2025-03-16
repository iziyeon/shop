import axios from 'axios';
import { reportError } from '@/utils/errorReporting';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    reportError(error);
    return Promise.reject(error);
  }
);

export { getProducts, getProduct } from './products';
