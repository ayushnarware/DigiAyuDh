import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG, AUTH_CONFIG } from '@/config/app.config';
import type { ApiError } from '@/types/auth.types';

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

class ApiClient {
  private instance: AxiosInstance;
  private refreshPromise: Promise<string> | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: API_CONFIG.baseUrl,
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as RetryConfig | undefined;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const newToken = await this.refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.instance(originalRequest);
          } catch {
            this.clearAuth();
            window.location.href = '/login';
          }
        }

        return Promise.reject(this.parseError(error));
      },
    );
  }

  private async refreshAccessToken(): Promise<string> {
    if (this.refreshPromise) return this.refreshPromise;

    this.refreshPromise = (async () => {
      const refreshToken = localStorage.getItem(AUTH_CONFIG.refreshTokenKey);
      if (!refreshToken) throw new Error('No refresh token');

      const { data } = await axios.post<{ accessToken: string }>(
        `${API_CONFIG.baseUrl}/auth/refresh`,
        { refreshToken },
      );

      localStorage.setItem(AUTH_CONFIG.tokenKey, data.accessToken);
      return data.accessToken;
    })();

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private parseError(error: AxiosError<ApiError>): ApiError {
    if (error.response?.data) {
      return {
        status: error.response.status,
        message: error.response.data.message ?? 'An error occurred',
        code: error.response.data.code,
        errors: error.response.data.errors,
      };
    }

    return {
      status: error.response?.status ?? 500,
      message: error.message ?? 'Network error',
    };
  }

  private clearAuth(): void {
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
    localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
    localStorage.removeItem(AUTH_CONFIG.userKey);
    localStorage.removeItem(AUTH_CONFIG.tokenExpiryKey);
  }

  get client(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient().client;
