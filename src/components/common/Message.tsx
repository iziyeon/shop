import { memo } from 'react';
import classNames from 'classnames';

interface MessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}

const Message = memo(({ type, message, onClose }: MessageProps) => (
  <div
    className={classNames(
      'fixed top-4 right-4 p-4 rounded shadow-lg z-50 transition-all duration-300',
      {
        'bg-green-500 text-white': type === 'success',
        'bg-red-500 text-white': type === 'error',
        'bg-blue-500 text-white': type === 'info',
      }
    )}
  >
    <div className="flex items-center">
      <span className="mr-2">{message}</span>
      {onClose && (
        <button 
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ✕
        </button>
      )}
    </div>
  </div>
));

Message.displayName = 'Message';

export default Message;
