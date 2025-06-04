import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from '@/config/env';
import { APIError, APIErrorResponse, APIResponse } from './types';

class APIClient {
  private static instance: APIClient;
  private client: AxiosInstance;

  private constructor() {
    this.client = axios.create({
      baseURL: env.API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Get token from storage
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<APIErrorResponse>) => {
        if (error.response) {
          // Handle specific error cases
          switch (error.response.status) {
            case 401:
              // Handle unauthorized
              localStorage.removeItem('auth_token');
              window.location.href = '/login';
              break;
            case 403:
              // Handle forbidden
              break;
            case 404:
              // Handle not found
              break;
            case 429:
              // Handle rate limit
              break;
            default:
              // Handle other errors
              break;
          }

          throw new APIError(
            error.response.data?.error?.message || error.message,
            error.response.status,
            error.response.data?.error?.code,
            error.response.data?.error?.details
          );
        }

        if (error.request) {
          // Handle network errors
          throw new APIError(
            'Network error. Please check your connection.',
            0
          );
        }

        throw error;
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.get<APIResponse<T>>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.post<APIResponse<T>>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.put<APIResponse<T>>(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.patch<APIResponse<T>>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.delete<APIResponse<T>>(url, config);
    return response.data;
  }
}

export const api = APIClient.getInstance(); 