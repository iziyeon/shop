type AnyFunction = (...args: any[]) => any;

// 성능 최적화 유틸리티
export const throttle = <T extends AnyFunction>(fn: T, delay: number): T => {
  let lastRun = 0;
  let timeout: NodeJS.Timeout | null = null;

  return ((...args: Parameters<T>) => {
    const now = Date.now();
    
    if (now - lastRun >= delay) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      fn(...args);
      lastRun = now;
    } else if (!timeout) {
      timeout = setTimeout(() => {
        fn(...args);
        lastRun = Date.now();
        timeout = null;
      }, delay);
    }
  }) as T;
};

export const debounce = <T extends AnyFunction>(fn: T, delay: number): T => {
  let timer: NodeJS.Timeout;

  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
};

// 메모이제이션 with LRU
export const memoize = <T extends AnyFunction>(fn: T, maxSize = 100) => {
  const cache = new Map<string, { value: ReturnType<T>; time: number }>();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);

    if (cached) {
      cached.time = Date.now();
      return cached.value;
    }

    if (cache.size >= maxSize) {
      let oldest = Date.now();
      let oldestKey = '';
      cache.forEach((val, key) => {
        if (val.time < oldest) {
          oldest = val.time;
          oldestKey = key;
        }
      });
      cache.delete(oldestKey);
    }

    const result = fn(...args);
    cache.set(key, { value: result, time: Date.now() });
    return result;
  }) as T;
};

export const measurePerformance = async <T>(
  fn: () => Promise<T>,
  label: string
): Promise<T> => {
  performance.mark('start');
  const result = await fn();
  performance.mark('end');
  performance.measure(label, 'start', 'end');
  return result;
};

export const batch = <T>(
  items: T[],
  batchSize: number,
  callback: (items: T[]) => void
): void => {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    setTimeout(() => callback(batch), 0);
  }
};

// requestAnimationFrame을 사용한 성능 최적화
export const rafThrottle = <T extends (...args: any[]) => any>(fn: T): T => {
  let rafId: number | null = null;
  
  return ((...args: Parameters<T>) => {
    if (rafId) return;
    
    rafId = requestAnimationFrame(() => {
      fn(...args);
      rafId = null;
    });
  }) as T;
};
