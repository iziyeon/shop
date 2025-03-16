import { memo } from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const Loader = ({ size = 'md', color = 'blue-500', className = '' }: LoaderProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-2',
    lg: 'h-16 w-16 border-3'
  };

  return (
    <div className={`inline-flex justify-center items-center ${className}`}>
      <div 
        className={`animate-spin rounded-full border-t-transparent border-${color} ${sizeClasses[size]}`}
      />
      <span className="sr-only">로딩 중...</span>
    </div>
  );
};

export default memo(Loader);
