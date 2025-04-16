import Cookies from "js-cookie";

export const getBearerToken = (): string | null => {
  return Cookies.get("access_token") || null;
};

export const setCookie = (
  key: string,
  value: any,
  expires?: number,
  path: string = "/"
): void => {
  Cookies.set(key, value, { expires, path });
};

export const getCookie = (key: string): any => {
  return Cookies.get(key);
};
