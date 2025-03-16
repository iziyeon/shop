import React from 'react';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

const Rating: React.FC<RatingProps> = ({ 
  value, 
  count = 0, 
  size = 'md', 
  showCount = true 
}) => {
  // 사이즈에 따른 클래스 결정
  const starSizeClass = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }[size];

  // 텍스트 사이즈 클래스
  const textSizeClass = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }[size];

  return (
    <div className="flex items-center">
      <div className="flex text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            xmlns="http://www.w3.org/2000/svg" 
            className={`${starSizeClass} ${i < Math.round(value) ? 'fill-current' : 'fill-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {showCount && count > 0 && (
        <span className={`text-gray-500 dark:text-gray-400 ml-1 ${textSizeClass}`}>
          ({count} 리뷰)
        </span>
      )}
    </div>
  );
};

export default Rating;
