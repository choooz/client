import Path from "lib/Path";
import userStorage from "./userStorage";

export function getTokens() {
  const user = userStorage.get();
  if (!user) return null;

  return user;
}

export function logout() {
  userStorage.remove();
  window.location.replace(Path.LOGIN_PAGE);
}

export function isLogin() {
  const user = userStorage.get();
  if (!user) return false;

  const { accessToken } = user;
  return !!accessToken;
}
