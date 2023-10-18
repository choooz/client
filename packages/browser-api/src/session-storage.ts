export const setSessionStorage = (key: string, value: string) =>
  typeof window !== "undefined" ? window.sessionStorage.setItem(key, value) : undefined;
export const getSessionStorage = (key: string) =>
  typeof window !== "undefined" ? window.sessionStorage.getItem(key) ?? null : null;
export const clearSessionStorage = (key: string): void =>
  typeof window !== "undefined" ? window.sessionStorage.removeItem(key) : undefined;

interface SessionStorageManagerInterface<T> {
  get(): T | null;
  set(data: T): void;
  remove(): void;
}

/**
 * SessionStorage를 사용하기 쉽게 만든 클래스
 * @example
 * const modalStorage = new SessionStorageManager('modalStorageKey');
 * modalStorage.set('value');
 * modalStorage.get(); // 'value'
 * modalStorage.remove();
 */
export class SessionStorageManager<T = string> implements SessionStorageManagerInterface<T> {
  private readonly storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  get(): T | null {
    const data = getSessionStorage(this.storageKey);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }

  set(data: T) {
    setSessionStorage(this.storageKey, JSON.stringify(data));
  }

  remove() {
    clearSessionStorage(this.storageKey);
  }
}
