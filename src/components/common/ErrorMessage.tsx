import { memo } from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage = memo(({ message, className = '' }: ErrorMessageProps) => (
  <div className={`text-red-500 text-sm mt-1 ${className}`}>
    {message}
  </div>
));

ErrorMessage.displayName = 'ErrorMessage';
