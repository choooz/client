import Cookies, { CookieSetOptions } from "universal-cookie";

export const getCookie = <T = string | null>(key: string, _cookies?: string): T => {
  if (_cookies) {
    const cookies = new Cookies(_cookies);
    return cookies.get(key);
  }
  const cookies = new Cookies();
  return cookies.get(key);
};

export const setCookie = (key: string, value: string, options?: CookieSetOptions): void => {
  const cookies = new Cookies();
  cookies.set(key, value, options);
};
