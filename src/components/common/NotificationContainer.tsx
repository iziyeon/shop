import { memo } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose: () => void;
}

const NotificationContainer = memo(({ notifications, onClose }: 
  { notifications: NotificationProps[], onClose: (id: string) => void }) => {
  return createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(({ id, type, message }) => (
        <div
          key={id}
          className={classNames(
            'p-4 rounded-md shadow-lg transition-all duration-300',
            {
              'bg-green-500': type === 'success',
              'bg-red-500': type === 'error',
              'bg-blue-500': type === 'info',
              'bg-yellow-500': type === 'warning',
            }
          )}
        >
          <div className="flex items-center text-white">
            <span>{message}</span>
            <button
              onClick={() => onClose(id)}
              className="ml-4 hover:opacity-75"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>,
    document.body
  );
});

NotificationContainer.displayName = 'NotificationContainer';

export default NotificationContainer;
