import axios from 'axios';
import { APP_CONFIG } from '@/config/constants';

const axiosInstance = axios.create({
  baseURL: APP_CONFIG.api.baseURL,
  timeout: APP_CONFIG.api.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      return Promise.reject(new Error('네트워크 오류가 발생했습니다.'));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
