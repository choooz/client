import { createHttpFetch } from "@mogakko/http-fetch";
import { SERVER_URL } from "lib/env";
import { logout } from "lib/utils/auth";
import userStorage from "lib/utils/userStorage";

export const httpFetch = createHttpFetch({
  baseUrl: SERVER_URL,
});

export const authHttpFetch = createHttpFetch({
  baseUrl: SERVER_URL,
  interceptors: {
    response: async (response) => {
      if (response.status === 401) {
        const tokens = userStorage.get();
        if (!tokens) {
          throw new Error("No tokens found");
        }
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        logout();
      }
      return response;
    },
    request: async (args) => {
      const tokens = userStorage.get();
      if (!tokens) {
        throw new Error("No tokens found");
      }

      const { accessToken } = tokens;

      if (accessToken) {
        args[1] = {
          ...args[1],
          headers: {
            ...args[1]?.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }

      return args;
    },
  },
});
