type StorageType = 'local' | 'session';

const storage = {
  get: <T>(key: string, type: StorageType = 'local'): T | null => {
    try {
      const store = type === 'local' ? localStorage : sessionStorage;
      const item = store.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: <T>(key: string, value: T, type: StorageType = 'local'): void => {
    try {
      const store = type === 'local' ? localStorage : sessionStorage;
      store.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  remove: (key: string, type: StorageType = 'local'): void => {
    try {
      const store = type === 'local' ? localStorage : sessionStorage;
      store.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },

  clear: (type: StorageType = 'local'): void => {
    try {
      const store = type === 'local' ? localStorage : sessionStorage;
      store.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  }
};

export { storage };
