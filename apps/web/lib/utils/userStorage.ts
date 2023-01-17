export const USER_STORAGE_KEY = "ACCESS_TOKEN";

const userStorage = {
  get() {
    const user = localStorage.getItem(USER_STORAGE_KEY);
    try {
      if (!user) return null;
      const parsedUser = JSON.parse(user) as string;
      return parsedUser;
    } catch (e) {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  },
  set(user: string) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },
  remove() {
    localStorage.removeItem(USER_STORAGE_KEY);
  },
};

export default userStorage;
