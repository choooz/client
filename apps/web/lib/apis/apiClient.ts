"use client";

import axios from "axios";
import { getToken } from "lib/utils/auth";
import { SERVER_URL } from "../constants";

const apiClient = axios.create();

apiClient.defaults.baseURL = `${SERVER_URL}`;

apiClient.interceptors.request.use(
  (config) => {
    if (!config?.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }

    const accessToken = getToken();
    if (!accessToken) throw new Error("No tokens found");

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
