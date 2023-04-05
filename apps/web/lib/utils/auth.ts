import userStorage from "./userStorage";

export function getToken() {
  const user = userStorage.get();
  if (!user) return null;
  return user;
}

export function logout() {
  userStorage.remove();
}

export function isLogin() {
  const user = userStorage.get();
  if (!user) return false;
  return !!user;
}
