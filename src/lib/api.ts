'use client';
import { AuthApiType, AuthType } from '@/types/auth';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
export const API_URL = {
  base: process.env.NEXT_PUBLIC_API_BASE_URL,
  guest: 'api/v1/auth/guest-login',
  shows: 'api/v1/shows',
  my_reservations: 'api/v1/members/me/reservations',
  refresh: 'api/v1/refresh',
};

export const axiosInstance = axios.create({
  baseURL: API_URL.base,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const secureEndpoints = [`/${API_URL.my_reservations}`];
    const requiresAuth = secureEndpoints.some(endpoint => config.url?.startsWith(endpoint));

    if (requiresAuth) {
      // 서버 환경에서는 토큰이 필요한 요청을 차단
      if (typeof window === 'undefined') {
        return Promise.reject(new Error('Server-side request blocked'));
      }

      if (window.sessionStorage) {
        const sessionItem = sessionStorage.getItem('guest-1');
        if (sessionItem) {
          const guest: AuthType = JSON.parse(sessionItem);
          const token = guest.accessToken;
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          return Promise.reject(new Error('No auth token found'));
        }
      }
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 토큰 갱신 중인지 여부를 나타내는 플래그
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string | null) => void;
  reject: (reason?: AxiosError) => void;
}> = [];

// 대기 중인 모든 요청을 처리하는 함수
const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }

            if (!originalRequest.headers) {
              originalRequest.headers = {};
            }
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const sessionItem = sessionStorage.getItem('guest-1');
      if (sessionItem) {
        const guest: AuthType = JSON.parse(sessionItem);
        const refreshToken = guest.refreshToken;
        if (!refreshToken) {
          sessionStorage.clear();
          return Promise.reject(error);
        }

        try {
          const response = await axios.post(
            `${API_URL.base}/${API_URL.refresh}`,
            {
              refreshToken: refreshToken,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const data: AuthApiType = response.data;
          sessionStorage.setItem('guest-1', JSON.stringify(data.data));

          const newAccessToken = data.data.accessToken;
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          if (!originalRequest.headers) {
            originalRequest.headers = {};
          }

          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (e) {
          // 리프레쉬 토큰이 만료
          sessionStorage.clear();
          return Promise.reject(e);
        }
      }
    }
    return Promise.reject(error);
  }
);
