import { useCallback } from 'react';

interface NotificationOptions {
  duration?: number;
}

export const useNotification = () => {
  const show = useCallback(async (message: string, options: NotificationOptions = {}) => {
    const { duration = 3000 } = options;

    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return;
    }

    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      const notification = new Notification(message, {
        icon: '/vite.svg'
      });

      setTimeout(() => notification.close(), duration);
    }
  }, []);

  return { show };
};
