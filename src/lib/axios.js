import axios from 'axios';

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage.js';

export const publicApi = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const protectedApi = axios.create({
  baseURL: 'http://localhost:8080/api',
});

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

  if (!accessToken) {
    return request;
  }

  request.headers.Authorization = `Bearer ${accessToken}`;

  return request;
});

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !request._retry &&
      !request.url.includes('/users/auth/refresh-token')
    ) {
      request._retry = true;
      try {
        const response = await protectedApi.post('/users/auth/refresh-token', {
          refreshToken,
        });

        const newAccessToken = response.data?.accessToken;
        const newRefreshToken = response.data?.refreshToken;

        if (newAccessToken && newRefreshToken) {
          localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken);
          localStorage.setItem(
            LOCAL_STORAGE_REFRESH_TOKEN_KEY,
            newRefreshToken
          );
          request.headers.Authorization = `Bearer ${newAccessToken}`;
          return protectedApi(request); //refazer a mesma  request
        }
      } catch (error) {
        console.log('Erro ao atualizar o token de acesso:', error);
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
        window.dispatchEvent(new Event('auth:logout'));
      }
    }

    return Promise.reject(error);
  }
);
