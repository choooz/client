import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "lib/constants";
import userStorage from "lib/utils/userStorage";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

export interface HttpClient extends AxiosInstance {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

export const http: HttpClient = axiosInstance;

http.interceptors.response.use(
  (response) => response,
  (originalError) => Promise.reject(originalError),
);

http.interceptors.request.use((config) => {
  if (!config?.headers) {
    throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
  }

  const tokens = userStorage.get();
  if (!tokens) throw new Error("No tokens found");
  const { accessToken } = tokens;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
