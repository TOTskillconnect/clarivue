import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  async get<T>(url: string) {
    const response = await instance.get<T>(url);
    return response;
  },

  async post<T>(url: string, data?: unknown) {
    const response = await instance.post<T>(url, data);
    return response;
  },

  async put<T>(url: string, data?: unknown) {
    const response = await instance.put<T>(url, data);
    return response;
  },

  async delete(url: string) {
    const response = await instance.delete(url);
    return response;
  },
}; 