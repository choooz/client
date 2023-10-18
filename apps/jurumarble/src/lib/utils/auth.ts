import Path from 'lib/Path';

import userStorage from './userStorage';

export function logout() {
  if (typeof window !== 'undefined') {
    userStorage.remove();
    window.location.replace(Path.MAIN_PAGE);
  }
}

export function isLogin() {
  if (typeof window !== 'undefined') {
    const user = userStorage.get();
    if (!user) {
      return false;
    }

    const { accessToken } = user;
    return !!accessToken;
  }
}
