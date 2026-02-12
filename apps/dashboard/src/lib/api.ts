import axios from 'axios';
import { env } from '@/env';

export const api = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoginPage = window.location.pathname === '/connexion';
      if (!isLoginPage) {
        window.location.href = '/connexion';
      }
    }
    return Promise.reject(error);
  }
);
