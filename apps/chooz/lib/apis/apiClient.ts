"use client";

import axios from "axios";
import { logout } from "lib/utils/auth";
import userStorage from "lib/utils/userStorage";
import { SERVER_URL } from "../constants";
import { reIssuanceTokenAPI } from "./auth";

const apiClient = axios.create();

apiClient.defaults.baseURL = `${SERVER_URL}`;

apiClient.interceptors.request.use(
  (config) => {
    if (!config?.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }

    const tokens = userStorage.get();
    if (!tokens) throw new Error("No tokens found");
    const { accessToken } = tokens;

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    switch (status) {
      case 401:
        const originalRequest = config;

        const tokens = userStorage.get();
        if (!tokens) throw new Error("No tokens found");
        const { refreshToken } = tokens;

        try {
          const { token: newAccessToken } = await reIssuanceTokenAPI({
            tokenType: "ACCESS",
            refreshToken,
          });

          const user = userStorage.get();
          if (!user) throw new Error("No user found");

          const choozUser = {
            accessToken: newAccessToken,
            refreshToken,
          };

          userStorage.set(choozUser);

          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

          // 실패했던 요청 새로운 accessToken으로 재요청
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        } catch (e) {
          logout();
        }
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
export default apiClient;
