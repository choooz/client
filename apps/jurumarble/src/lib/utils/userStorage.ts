export const USER_STORAGE_KEY = "JURUMARBLE_USER";

interface Token {
  accessToken: string;
}

const userStorage = {
  get() {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem(USER_STORAGE_KEY);
      try {
        if (!user) {return null;}
        const parsedUser = JSON.parse(user) as Token;
        return parsedUser;
      } catch (e) {
        localStorage.removeItem(USER_STORAGE_KEY);
        return null;
      }
    }
  },
  set(user: Token) {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  },
  remove() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  },
};

export default userStorage;
