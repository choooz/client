import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "lib/constants";
import userStorage from "lib/utils/userStorage";
import { logout } from "lib/utils/auth";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

// @NOTE 불필요한 타입 정의로 보여 제거함
// export interface HttpClient extends AxiosInstance {
//   get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
//   post<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//   put<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//   patch<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//   delete<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
// }

// export const http: HttpClient = axiosInstance;

export const http = axiosInstance;

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const {
      response: { status },
    } = error;

    switch (status) {
      case 401:
        const tokens = userStorage.get();
        if (!tokens) throw new Error("No tokens found");

        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");

        logout();

        break;

      case 409:
        throw new Error(error.response.data.message);

      case 500:
        throw new Error(error.response.data.message);

      default:
        throw new Error("Unknown Error");
    }
  },
);

axiosInstance.interceptors.request.use((config) => {
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
